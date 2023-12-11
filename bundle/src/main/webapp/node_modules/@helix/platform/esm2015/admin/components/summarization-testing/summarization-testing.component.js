import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { cloneDeep, isEmpty, omit } from 'lodash';
import { forkJoin, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RxSummarizationTestingService } from './summarization-testing.service';
import { RxNotificationService, RxSystemConfigurationService } from '@helix/platform/shared/api';
import { RxDefinitionPickerType } from '@helix/platform/shared/components';
import { RX_RECORD_DEFINITION, RxRecordDefinitionCacheService, RxRecordInstanceDataPageService } from '@helix/platform/record/api';
import { AdaptDockedPanelService } from '@bmc-ux/adapt-angular';
import { RecordGridComponent, RowSelectionMode } from '@helix/platform/view/components';
import { RxJsonParserService } from '@helix/platform/utils';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "./summarization-testing.service";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "@helix/platform/record/api";
import * as i5 from "@bmc-ux/adapt-angular";
import * as i6 from "@helix/platform/utils";
import * as i7 from "@ngx-translate/core";
import * as i8 from "@helix/platform/shared/components";
import * as i9 from "@helix/platform/view/components";
import * as i10 from "@angular/common";
import * as i11 from "@angular/cdk/clipboard";
export class SummarizationTestingAdminComponent {
    constructor(formBuilder, rxSummarizationTestingService, rxNotificationService, rxRecordDefinitionCacheService, rxRecordInstanceDataPageService, adaptDockedPanelService, rxSystemConfigurationService, rxJsonParserService, translateService) {
        this.formBuilder = formBuilder;
        this.rxSummarizationTestingService = rxSummarizationTestingService;
        this.rxNotificationService = rxNotificationService;
        this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
        this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
        this.adaptDockedPanelService = adaptDockedPanelService;
        this.rxSystemConfigurationService = rxSystemConfigurationService;
        this.rxJsonParserService = rxJsonParserService;
        this.translateService = translateService;
        this.textInputFieldOptions = [];
        this.summaryOutputFieldOptions = [];
        this.shouldShowGrid = false;
        this.dataSourceOptions = ['Email', 'Chat', 'Other'];
        this.index = 0;
        this.defaultSummarizationPercentage = 50;
        this.isSummarizationInProgress = false;
        this.isRecordSummarizationInProgress = false;
        this.disableContent = {
            variant: 'danger',
            title: this.translateService.instant('com.bmc.arsys.rx.client.admin.summarization-testing.summarization-service-disabled.message'),
            content: '',
            dismissible: false
        };
        this.recordDefinition = {
            fieldDefinitions: []
        };
        this.recordDefinitionPickerOptions = {
            label: this.translateService.instant('com.bmc.arsys.rx.client.admin.summarization-testing.record-definition.label'),
            definitionType: RxDefinitionPickerType.RegularRecord,
            required: true
        };
    }
    /*ngAfterViewInit(): void {
      this.dockedPanelId = this.adaptDockedPanelService.register({
        title: this.translateService.instant(
          'com.bmc.arsys.rx.client.admin.summarization-testing.summarization-details.label'
        ),
        content: this.viewSummarizationDetailsTemplate,
        size: 'lg'
      });
    }*/
    ngOnInit() {
        this.interactiveSummarizationTestingForm = this.createInteractiveSummarizationTestingForm();
        this.recordSummarizationTestingForm = this.createRecordSummarizationTestingForm();
        this.shouldShowGrid = true;
        this.rxSystemConfigurationService
            .getConfiguration('summarizationServiceTenantConfiguration')
            .subscribe((response) => {
            const summarizationConfiguration = this.rxJsonParserService.tryParseJson(response.value);
            this.defaultSummarizationPercentage =
                summarizationConfiguration['summarizationPercentage'] || this.defaultSummarizationPercentage;
            if (summarizationConfiguration) {
                this.isSummarizationServiceDisabled = !summarizationConfiguration['enableSummarization'];
                this.interactiveSummarizationTestingForm
                    .get('summarizationPercentage')
                    .setValue(summarizationConfiguration['summarizationPercentage']);
                this.recordSummarizationTestingForm
                    .get('summarizationPercentage')
                    .setValue(summarizationConfiguration['summarizationPercentage']);
            }
        });
        this.updateGridConfig(true);
        this.recordSummarizationTestingForm
            .get('recordDefinition')
            .valueChanges.subscribe((value) => this.onRecordDefinitionChange(value));
        this.recordSummarizationTestingForm
            .get('textInputField')
            .valueChanges.subscribe((value) => this.onTextInputFieldChange(value));
    }
    createInteractiveSummarizationTestingForm() {
        return this.formBuilder.group({
            text: ['', Validators.required],
            source: [[this.dataSourceOptions[0]], Validators.nullValidator],
            summarizationPercentage: [50, Validators.required],
            extractedSummaryText: ''
        });
    }
    createRecordSummarizationTestingForm() {
        return this.formBuilder.group({
            recordDefinition: ['', Validators.required],
            textInputField: [[], Validators.required],
            summaryOutputField: [[], Validators.required],
            source: [[this.dataSourceOptions[0]]],
            summarizationPercentage: [50]
        });
    }
    onRecordDefinitionChange(newRecordDefinitionName) {
        const oldRecordDefinitionName = this.recordSummarizationTestingForm.value.recordDefinition;
        if (newRecordDefinitionName !== oldRecordDefinitionName) {
            this.resetRecordSummarizationTestingForm();
            if (newRecordDefinitionName) {
                this.rxRecordDefinitionCacheService
                    .getRecordDefinition(newRecordDefinitionName)
                    .subscribe((recordDefinition) => {
                    this.initializeFormControls(recordDefinition);
                });
            }
        }
    }
    initializeFormControls(recordDefinition) {
        this.textInputFieldOptions = recordDefinition.fieldDefinitions
            ? recordDefinition.fieldDefinitions
                .filter(function (fieldDefinition) {
                return ((fieldDefinition.fieldOption !== RX_RECORD_DEFINITION.fieldOptions.system &&
                    fieldDefinition.resourceType === RX_RECORD_DEFINITION.resourceTypes.character) ||
                    fieldDefinition.resourceType === RX_RECORD_DEFINITION.resourceTypes.attachment);
            })
                .map((fieldDefinition) => {
                return {
                    id: fieldDefinition.id,
                    name: fieldDefinition.name,
                    resourceType: fieldDefinition.resourceType
                };
            })
            : [];
        this.summaryOutputFieldOptions = this.textInputFieldOptions.filter((fieldDefinition) => {
            return fieldDefinition.resourceType === RX_RECORD_DEFINITION.resourceTypes.character;
        });
    }
    optionFormatter(option) {
        return option.name;
    }
    onTextInputFieldChange(value) {
        if (value.length) {
            this.recordSummarizationTestingForm.get('summaryOutputField').setValue([]);
            this.summaryOutputFieldOptions = this.textInputFieldOptions.filter((fieldDefinition) => {
                return (fieldDefinition.resourceType === RX_RECORD_DEFINITION.resourceTypes.character &&
                    fieldDefinition.id !== value[0].id);
            });
            this.updateGridConfig(false);
        }
    }
    resetRecordSummarizationTestingForm() {
        this.recordSummarizationTestingForm.get('textInputField').reset([]);
        this.recordSummarizationTestingForm.get('summaryOutputField').reset([]);
        this.recordSummarizationTestingForm.get('source').reset([this.dataSourceOptions[0]]);
        this.recordSummarizationTestingForm.get('summarizationPercentage').reset(this.defaultSummarizationPercentage);
        this.updateGridConfig(true);
    }
    summarizeUsingText() {
        this.isSummarizationInProgress = true;
        this.interactiveSummarizationTestingForm.markAsPristine();
        this.rxSummarizationTestingService
            .getTextSummarization(this.transformFormControlData())
            .pipe(catchError((error) => {
            this.isSummarizationInProgress = false;
            return throwError(error);
        }))
            .subscribe((response) => {
            this.interactiveSummarizationTestingForm.get('extractedSummaryText').setValue(response[0]);
            this.rxNotificationService.addSuccessMessage('Summarization completed successfully.');
            this.isSummarizationInProgress = false;
        });
    }
    transformFormControlData() {
        const summarizationRecord = {
            texts: [],
            source: '',
            summarizationPercentage: 0
        };
        summarizationRecord.texts.push(this.interactiveSummarizationTestingForm.get('text').value);
        summarizationRecord.source = this.interactiveSummarizationTestingForm.get('source').value[0];
        summarizationRecord.summarizationPercentage =
            this.interactiveSummarizationTestingForm.get('summarizationPercentage').value;
        return summarizationRecord;
    }
    resetInteractiveSummarizationTestingForm() {
        this.interactiveSummarizationTestingForm.get('text').reset();
        this.interactiveSummarizationTestingForm.get('source').reset([this.dataSourceOptions[0]]);
        this.interactiveSummarizationTestingForm.get('summarizationPercentage').reset(this.defaultSummarizationPercentage);
        this.interactiveSummarizationTestingForm.get('extractedSummaryText').reset('');
    }
    isResetButtonDisabled() {
        return this.interactiveSummarizationTestingForm.pristine || this.interactiveSummarizationTestingForm.invalid;
    }
    getColumns() {
        return [
            {
                index: 0,
                fieldId: String(RX_RECORD_DEFINITION.coreFieldIds.id),
                title: 'Text input',
                filterable: false
            }
        ];
    }
    summarizeUsingRecordInstance() {
        this.isRecordSummarizationInProgress = true;
        const recordSummarizationTestingRecord = cloneDeep(this.recordSummarizationTestingForm.value);
        const payload = {
            recordDefinitionName: recordSummarizationTestingRecord.recordDefinition,
            inputFieldId: this.recordSummarizationTestingForm.get('textInputField').value[0].id,
            outputFieldId: this.recordSummarizationTestingForm.get('summaryOutputField').value[0].id,
            source: this.recordSummarizationTestingForm.get('source').value[0],
            summarizationPercentage: this.recordSummarizationTestingForm.get('summarizationPercentage').value
        };
        const observables$ = this.recordGridComponent.api.getSelectedRows().map((row) => {
            payload['recordID'] = row[RX_RECORD_DEFINITION.coreFieldIds.id];
            return this.rxSummarizationTestingService.getRecordInstanceSummarization(payload);
        });
        forkJoin(observables$)
            .pipe(catchError((error) => {
            this.isRecordSummarizationInProgress = false;
            return throwError(error);
        }))
            .subscribe(() => {
            this.rxRecordInstanceDataPageService
                .post({
                params: {
                    recorddefinition: this.recordSummarizationTestingForm.get('recordDefinition').value,
                    queryExpression: this.prepareQueryExpression()
                }
            })
                .subscribe((results) => {
                this.isRecordSummarizationInProgress = false;
                this.summarizedRecords = results;
                this.index = 0;
                // this.adaptDockedPanelService.open(this.dockedPanelId);
                this.adaptDockedPanelService.open({
                    title: this.translateService.instant('com.bmc.arsys.rx.client.admin.summarization-testing.summarization-details.label'),
                    content: this.viewSummarizationDetailsTemplate,
                    size: 'lg'
                });
            });
        });
    }
    prepareQueryExpression() {
        let expression = '';
        this.recordGridComponent.api.getSelectedRows().map((row) => {
            if (!isEmpty(expression)) {
                expression += ' OR ';
            }
            expression += `('${RX_RECORD_DEFINITION.coreFieldIds.id}' = "${row[RX_RECORD_DEFINITION.coreFieldIds.id]}")`;
        });
        return expression;
    }
    isSummarizeButtonDisabled() {
        return (this.isRecordSummarizationInProgress ||
            this.recordSummarizationTestingForm.invalid ||
            (this.recordGridComponent.api.getSelectedRows() && !this.recordGridComponent.api.getSelectedRows().length) ||
            this.recordGridComponent.api.getSelectedRows().length > 5);
    }
    previous() {
        this.index--;
    }
    next() {
        this.index++;
    }
    updateGridConfig(isEmptyGridRequired) {
        this.shouldShowGrid = false;
        this.gridConfig = isEmptyGridRequired ? this.createEmptyGridConfiguration() : this.prepareGridConfiguration();
        setTimeout(() => {
            this.shouldShowGrid = true;
        });
    }
    getRecordDefinition() {
        this.recordDefinition.fieldDefinitions = [
            {
                id: RX_RECORD_DEFINITION.coreFieldIds.id,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            }
        ];
        return this.recordDefinition;
    }
    getData(queryParams) {
        if (this.recordSummarizationTestingForm.get('recordDefinition').value) {
            return this.rxRecordInstanceDataPageService
                .post({
                params: Object.assign(Object.assign({}, omit(queryParams, ['searchText'])), { recorddefinition: this.recordSummarizationTestingForm.get('recordDefinition').value })
            })
                .pipe(map((result) => {
                result.data = result['data'].filter((recordInstance) => recordInstance[this.recordSummarizationTestingForm.get('textInputField').value[0].id] != null);
                return result;
            }));
        }
        else {
            return this.rxRecordInstanceDataPageService.getEmptyDataPage();
        }
    }
    createEmptyGridConfiguration() {
        return (this.gridConfig = of({
            actionButtons: [],
            getData: (queryParams) => this.rxRecordInstanceDataPageService.getEmptyDataPage(),
            getRecordDefinition: () => of(this.getRecordDefinition()),
            columns: this.getColumns(),
            enableFiltering: true,
            enableRowSelection: RowSelectionMode.Multiple
        }));
    }
    prepareGridConfiguration() {
        const columns = this.getColumns();
        const recordDefinition = this.getRecordDefinition();
        if (this.recordSummarizationTestingForm.get('textInputField').value.length) {
            const textInput = this.recordSummarizationTestingForm.get('textInputField').value[0];
            recordDefinition.fieldDefinitions[0] = {
                id: textInput.id,
                resourceType: textInput.resourceType,
                name: textInput.name
            };
            columns[0] = {
                index: 0,
                fieldId: String(textInput.id),
                title: `Text input:  ${textInput.name}`
            };
        }
        return of({
            actionButtons: [],
            getData: (queryParams) => this.getData(queryParams),
            getRecordDefinition: () => of(recordDefinition),
            columns: columns,
            enableFiltering: true,
            enableRowSelection: RowSelectionMode.Multiple
        });
    }
}
SummarizationTestingAdminComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SummarizationTestingAdminComponent, deps: [{ token: i1.FormBuilder }, { token: i2.RxSummarizationTestingService }, { token: i3.RxNotificationService }, { token: i4.RxRecordDefinitionCacheService }, { token: i4.RxRecordInstanceDataPageService }, { token: i5.AdaptDockedPanelService }, { token: i3.RxSystemConfigurationService }, { token: i6.RxJsonParserService }, { token: i7.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
SummarizationTestingAdminComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: SummarizationTestingAdminComponent, selector: "rx-admin-summarization-testing", viewQueries: [{ propertyName: "recordGridComponent", first: true, predicate: ["recordGrid"], descendants: true }, { propertyName: "viewSummarizationDetailsTemplate", first: true, predicate: ["viewSummarizationDetailsTemplate"], descendants: true, static: true }], ngImport: i0, template: "<rx-admin-settings header=\"{{ 'com.bmc.arsys.rx.client.admin.summarization-testing.header.title' | translate }}\">\n  <div class=\"row\" *ngIf=\"isSummarizationServiceDisabled; else summarizationTesting\">\n    <div class=\"col-md-12 form-group\">\n      <div class=\"disabled-warning\">\n        <adapt-alert [config]=\"disableContent\"></adapt-alert>\n      </div>\n    </div>\n  </div>\n\n  <ng-template #summarizationTesting>\n    <div class=\"row\">\n      <div class=\"col-md-12 form-group\">\n        <adapt-accordion [multiselect]=\"true\">\n          <adapt-accordion-tab\n            [title]=\"'com.bmc.arsys.rx.client.admin.summarization-testing.interactive-summarization.title' | translate\"\n            [isOpen]=\"true\"\n            rx-id=\"interactive-summarization\"\n          >\n            <form [formGroup]=\"interactiveSummarizationTestingForm\">\n              <div class=\"row\">\n                <div class=\"col-md-6\">\n                  <adapt-rx-select\n                    formControlName=\"source\"\n                    [options]=\"dataSourceOptions\"\n                    name=\"source\"\n                    rx-id=\"data-source\"\n                    label=\"{{ 'com.bmc.arsys.rx.client.admin.summarization-testing.data-source.label' | translate }}\"\n                    class=\"form-group d-block\"\n                  >\n                  </adapt-rx-select>\n                </div>\n              </div>\n              <div class=\"row\">\n                <div class=\"col-md-6\">\n                  <adapt-rx-textarea\n                    formControlName=\"text\"\n                    rx-id=\"text-input\"\n                    class=\"form-group d-block\"\n                    label=\"{{ 'com.bmc.arsys.rx.client.admin.summarization-testing.text-input.label' | translate }}\"\n                    rows=\"10\"\n                  >\n                  </adapt-rx-textarea>\n\n                  <div class=\"d-flex flex-wrap\">\n                    <div class=\"flex-grow-1 mr-2 summarization-percentage\">\n                      <adapt-rx-counter\n                        [formControl]=\"interactiveSummarizationTestingForm.controls.summarizationPercentage\"\n                        label=\"{{\n                          'com.bmc.arsys.rx.client.admin.summarization-testing.summarization-percentage.label'\n                            | translate\n                        }}\"\n                        rx-id=\"summarization-percentage\"\n                        required\n                        adaptRange\n                        [min]=\"1\"\n                        [max]=\"50\"\n                        [tooltip]=\"{\n                          iconName: 'question_circle_o',\n                          content:\n                            'com.bmc.arsys.rx.client.admin.summarization-testing.summarization-percentage.tooltip'\n                            | translate,\n                          placement: 'top',\n                          popoverMode: true\n                        }\"\n                      ></adapt-rx-counter>\n                    </div>\n                    <div>\n                      <button\n                        adapt-button\n                        btn-type=\"primary\"\n                        type=\"button\"\n                        rx-id=\"summarize-button\"\n                        class=\"mr-2 button-margin-top\"\n                        (click)=\"summarizeUsingText()\"\n                        [adaptInlineLoader]=\"isSummarizationInProgress\"\n                        [disabled]=\"\n                          interactiveSummarizationTestingForm.pristine || interactiveSummarizationTestingForm.invalid\n                        \"\n                      >\n                        {{ 'com.bmc.arsys.rx.client.admin.summarization-testing.summarize.button.label' | translate }}\n                      </button>\n                    </div>\n                    <div>\n                      <button\n                        adapt-button\n                        btn-type=\"secondary\"\n                        type=\"button\"\n                        rx-id=\"reset-button\"\n                        class=\"d-icon-reply button-margin-top\"\n                        (click)=\"resetInteractiveSummarizationTestingForm()\"\n                      >\n                        {{ 'com.bmc.arsys.rx.client.common.reset.label' | translate }}\n                      </button>\n                    </div>\n                  </div>\n                </div>\n\n                <div class=\"col-md-6\">\n                  <adapt-rx-textarea\n                    formControlName=\"extractedSummaryText\"\n                    rx-id=\"summary-output\"\n                    label=\"{{ 'com.bmc.arsys.rx.client.admin.summarization-testing.summary-output.label' | translate }}\"\n                    disabled=\"true\"\n                    class=\"form-group d-block\"\n                    rows=\"10\"\n                  ></adapt-rx-textarea>\n\n                  <button\n                    adapt-button\n                    btn-type=\"secondary\"\n                    type=\"button\"\n                    rx-id=\"copy-button\"\n                    class=\"mr-2 button-margin-top d-icon-files_copy_o\"\n                    [cdkCopyToClipboard]=\"interactiveSummarizationTestingForm.get('extractedSummaryText').value\"\n                    [disabled]=\"!interactiveSummarizationTestingForm.get('extractedSummaryText').value\"\n                  >\n                    {{ 'com.bmc.arsys.rx.client.common.copy.label' | translate }}\n                  </button>\n                </div>\n              </div>\n            </form>\n          </adapt-accordion-tab>\n\n          <adapt-accordion-tab\n            [title]=\"'com.bmc.arsys.rx.client.admin.summarization-testing.record-summarization.title' | translate\"\n            [isOpen]=\"true\"\n            rx-id=\"record-summarization\"\n          >\n            <form [formGroup]=\"recordSummarizationTestingForm\">\n              <div class=\"row\">\n                <div class=\"col-md-5\">\n                  <adapt-rx-control-label\n                    label=\"{{\n                      'com.bmc.arsys.rx.client.admin.summarization-testing.summarization-options.label' | translate\n                    }}\"\n                    class=\"mb-2 d-block\"\n                  ></adapt-rx-control-label>\n                  <rx-definition-picker\n                    [options]=\"recordDefinitionPickerOptions\"\n                    formControlName=\"recordDefinition\"\n                    rx-id=\"record-definition\"\n                    required=\"true\"\n                    class=\"form-group d-block\"\n                  >\n                  </rx-definition-picker>\n\n                  <adapt-rx-select\n                    [options]=\"textInputFieldOptions\"\n                    label=\"{{\n                      'com.bmc.arsys.rx.client.admin.summarization-testing.text-input-field.label' | translate\n                    }}\"\n                    name=\"textInputField\"\n                    [optionFormatter]=\"optionFormatter\"\n                    formControlName=\"textInputField\"\n                    rx-id=\"text-input-field\"\n                    class=\"form-group d-block\"\n                    [tooltip]=\"{\n                      iconName: 'question_circle_o',\n                      content:\n                        'com.bmc.arsys.rx.client.admin.summarization-testing.text-input-field.tooltip' | translate,\n                      placement: 'left',\n                      popoverMode: true\n                    }\"\n                  ></adapt-rx-select>\n\n                  <adapt-rx-select\n                    [options]=\"summaryOutputFieldOptions\"\n                    label=\"{{\n                      'com.bmc.arsys.rx.client.admin.summarization-testing.summary-output-field.label' | translate\n                    }}\"\n                    name=\"summaryOutputField\"\n                    [optionFormatter]=\"optionFormatter\"\n                    formControlName=\"summaryOutputField\"\n                    rx-id=\"summary-output-field\"\n                    class=\"form-group d-block\"\n                  ></adapt-rx-select>\n\n                  <adapt-rx-select\n                    formControlName=\"source\"\n                    [options]=\"dataSourceOptions\"\n                    name=\"source\"\n                    rx-id=\"data-source\"\n                    label=\"{{ 'com.bmc.arsys.rx.client.admin.summarization-testing.data-source.label' | translate }}\"\n                    class=\"form-group d-block\"\n                  >\n                  </adapt-rx-select>\n\n                  <div class=\"d-flex flex-wrap\">\n                    <div class=\"flex-grow-1 mr-2 summarization-percentage\">\n                      <adapt-rx-counter\n                        [formControl]=\"recordSummarizationTestingForm.controls.summarizationPercentage\"\n                        label=\"{{\n                          'com.bmc.arsys.rx.client.admin.summarization-testing.summarization-percentage.label'\n                            | translate\n                        }}\"\n                        rx-id=\"summarization-percentage\"\n                        required\n                        adaptRange\n                        [min]=\"1\"\n                        [max]=\"50\"\n                        [tooltip]=\"{\n                          iconName: 'question_circle_o',\n                          content:\n                            'com.bmc.arsys.rx.client.admin.summarization-testing.summarization-percentage.tooltip'\n                            | translate,\n                          placement: 'top',\n                          popoverMode: true\n                        }\"\n                      ></adapt-rx-counter>\n                    </div>\n                    <div>\n                      <button\n                        adapt-button\n                        btn-type=\"primary\"\n                        type=\"button\"\n                        class=\"mr-2 button-margin-top\"\n                        rx-id=\"summarize-button\"\n                        (click)=\"summarizeUsingRecordInstance()\"\n                        [disabled]=\"isSummarizeButtonDisabled()\"\n                        [adaptInlineLoader]=\"isRecordSummarizationInProgress\"\n                      >\n                        {{ 'com.bmc.arsys.rx.client.admin.summarization-testing.summarize.button.label' | translate }}\n                      </button>\n                    </div>\n                    <div>\n                      <button\n                        adapt-button\n                        btn-type=\"secondary\"\n                        type=\"button\"\n                        rx-id=\"reset-button\"\n                        class=\"d-icon-reply button-margin-top\"\n                        (click)=\"resetRecordSummarizationTestingForm()\"\n                      >\n                        {{ 'com.bmc.arsys.rx.client.common.reset.label' | translate }}\n                      </button>\n                    </div>\n                  </div>\n                </div>\n                <div class=\"col-md-7 d-flex flex-column\">\n                  <adapt-alert\n                    [config]=\"{\n                      title: '',\n                      content:\n                        'com.bmc.arsys.rx.client.admin.summarization-testing.select-records-alert.message' | translate,\n                      type: 'inline',\n                      variant: 'info'\n                    }\"\n                    adaptPopover=\"{{\n                      'com.bmc.arsys.rx.client.admin.summarization-testing.select-records-alert.tooltip' | translate\n                    }}\"\n                  >\n                  </adapt-alert>\n                  <rx-record-grid\n                    rx-id=\"record-grid\"\n                    #recordGrid\n                    [config]=\"gridConfig\"\n                    *ngIf=\"shouldShowGrid\"\n                    class=\"record-summarization-grid form-group\"\n                  ></rx-record-grid>\n                </div>\n              </div>\n            </form>\n          </adapt-accordion-tab>\n        </adapt-accordion>\n      </div>\n    </div>\n  </ng-template>\n</rx-admin-settings>\n\n<ng-template #viewSummarizationDetailsTemplate let-close=\"close\">\n  <div class=\"dp-content\">\n    <div class=\"row pt-4 px-4 pb-1 mr-0\">\n      <div class=\"col-12 form-inline\">\n        <button\n          type=\"button\"\n          adapt-button\n          btn-type=\"secondary\"\n          rx-id=\"previous-button\"\n          class=\"mr-2 d-icon-left-angle_left\"\n          (click)=\"previous()\"\n          [disabled]=\"!index\"\n          size=\"small\"\n        >\n          {{ 'com.bmc.arsys.rx.client.common.previous-step.label' | translate }}\n        </button>\n        <button\n          type=\"button\"\n          adapt-button\n          btn-type=\"secondary\"\n          rx-id=\"next-button\"\n          class=\"mr-2 d-icon-right-angle_right\"\n          (click)=\"next()\"\n          [disabled]=\"index === recordGridComponent.api.getSelectedRows().length - 1\"\n          size=\"small\"\n        >\n          {{ 'com.bmc.arsys.rx.client.common.next-step.label' | translate }}\n        </button>\n\n        <div class=\"mr-2 pl-3\">\n          Summarization {{ index + 1 }} of {{ recordGridComponent.api.getSelectedRows().length }}\n        </div>\n      </div>\n    </div>\n    <div class=\"dp-body\">\n      <div class=\"row\">\n        <div class=\"col-md-12\">\n          <adapt-rx-control-label\n            label=\"{{ 'Text input: ' + recordSummarizationTestingForm.get('textInputField').value[0].name }}\"\n            class=\"form-group\"\n          ></adapt-rx-control-label>\n\n          <div class=\"border-secondary form-group\" rx-id=\"text-input\">\n            {{ summarizedRecords.data[index][recordSummarizationTestingForm.get('textInputField').value[0].id] }}\n          </div>\n        </div>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"col-md-12\">\n          <adapt-rx-control-label\n            class=\"form-group\"\n            label=\"{{ 'Summary output: ' + recordSummarizationTestingForm.get('summaryOutputField').value[0].name }}\"\n          ></adapt-rx-control-label>\n\n          <div class=\"border-secondary form-group\" rx-id=\"summary-output\">\n            {{ summarizedRecords.data[index][recordSummarizationTestingForm.get('summaryOutputField').value[0].id] }}\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"dp-footer\">\n      <button type=\"button\" adapt-button (click)=\"close()\" btn-type=\"secondary\" rx-id=\"close-button\">\n        {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n      </button>\n    </div>\n  </div>\n</ng-template>\n", styles: [".summarized-details{max-height:200px;overflow-y:auto}.record-summarization-grid{height:300px}.button-margin-top{margin-top:1.5rem}.summarization-percentage{max-width:200px}\n"], components: [{ type: i8.AdminSettingsComponent, selector: "rx-admin-settings", inputs: ["header", "busy"] }, { type: i5.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i5.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i5.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }, { type: i5.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i5.AdaptRxTextareaComponent, selector: "adapt-rx-textarea", inputs: ["rows", "maxRows", "autocomplete", "placeholder", "size", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i5.AdaptRxCounterComponent, selector: "adapt-rx-counter", inputs: ["prefix", "suffix", "max", "min", "step", "size", "placeholder", "disabledStyleForReadonlyState"] }, { type: i5.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i5.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i8.RxDefinitionPickerComponent, selector: "rx-definition-picker", inputs: ["options", "isDisabled"] }, { type: i9.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }], directives: [{ type: i10.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i1.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i1.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i5.AdaptRangeValidatorDirective, selector: "[adaptRange][ngModel],[adaptRange][formControl]", inputs: ["adaptRange", "adaptRangeMessageFn"] }, { type: i1.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i5.AdaptInlineStandaloneDirective, selector: "[adaptInlineLoader]", inputs: ["adaptInlineLoader", "activeText"] }, { type: i11.CdkCopyToClipboard, selector: "[cdkCopyToClipboard]", inputs: ["cdkCopyToClipboard", "cdkCopyToClipboardAttempts"], outputs: ["cdkCopyToClipboardCopied"] }, { type: i5.AdaptPopoverDirective, selector: "[adaptPopover]", inputs: ["adaptPopover", "popoverTitle", "placement", "fallbackPlacement", "triggers", "container", "appendToBody", "closeBtn", "popupDelay", "disablePopover", "popoverClass", "autoClose", "closeOnOutOfView", "maxWidth", "minWidth"], outputs: ["shown", "hidden"], exportAs: ["adaptPopover"] }], pipes: { "translate": i7.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SummarizationTestingAdminComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-admin-summarization-testing',
                    templateUrl: './summarization-testing.component.html',
                    styleUrls: ['./summarization-testing.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.FormBuilder }, { type: i2.RxSummarizationTestingService }, { type: i3.RxNotificationService }, { type: i4.RxRecordDefinitionCacheService }, { type: i4.RxRecordInstanceDataPageService }, { type: i5.AdaptDockedPanelService }, { type: i3.RxSystemConfigurationService }, { type: i6.RxJsonParserService }, { type: i7.TranslateService }]; }, propDecorators: { recordGridComponent: [{
                type: ViewChild,
                args: ['recordGrid']
            }], viewSummarizationDetailsTemplate: [{
                type: ViewChild,
                args: ['viewSummarizationDetailsTemplate', { static: true }]
            }] } });
//# sourceMappingURL=summarization-testing.component.js.map