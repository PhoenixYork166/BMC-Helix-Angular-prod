import { Component, Injector, Input, TemplateRef, ViewChild } from '@angular/core';
import { RxExpressionEditorService } from '@helix/platform/shared/components';
import { RxApprovalExpressionConfigurator } from '../approval-expression-configurator';
import { ExpressionOperatorGroup, RxDefinitionNameService, RxGlobalCacheService, RxNotificationService } from '@helix/platform/shared/api';
import { forkJoin, of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { RX_RECORD_DEFINITION, RxRecordDefinitionCacheService } from '@helix/platform/record/api';
import { FormBuilder } from '@angular/forms';
import { RecordGridComponent, RowSelectionMode } from '@helix/platform/view/components';
import { RX_APPROVAL_CONFIGURATION } from '../approval-configuration.constant';
import { RxApprovalMappingDataPageService } from './approval-mapping-data-page.service';
import { RxApprovalConfigurationService } from '../approval-configuration.service';
import { RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import { chain, find, get, map as _map, omit } from 'lodash';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@helix/platform/ui-kit";
import * as i3 from "@ngx-translate/core";
import * as i4 from "@helix/platform/shared/api";
import * as i5 from "@helix/platform/shared/components";
import * as i6 from "../approval-configuration.service";
import * as i7 from "@helix/platform/record/api";
import * as i8 from "./approval-mapping-data-page.service";
import * as i9 from "@bmc-ux/adapt-angular";
import * as i10 from "@helix/platform/view/components";
export class SelfApprovalConfigurationComponent {
    constructor(injector, formBuilder, rxModalService, translateService, rxGlobalCacheService, rxNotificationService, rxDefinitionNameService, rxExpressionEditorService, rxApprovalConfigurationService, rxRecordDefinitionCacheService, rxApprovalMappingDataPageService) {
        this.injector = injector;
        this.formBuilder = formBuilder;
        this.rxModalService = rxModalService;
        this.translateService = translateService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxNotificationService = rxNotificationService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxExpressionEditorService = rxExpressionEditorService;
        this.rxApprovalConfigurationService = rxApprovalConfigurationService;
        this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
        this.rxApprovalMappingDataPageService = rxApprovalMappingDataPageService;
        this.alertConfig = {
            content: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.self-approval.information'),
            type: 'inline',
            variant: 'info'
        };
        this.processOptions = [];
    }
    ngOnInit() {
        this.isUpdateButtonVisible = false;
        this.expressionConfigurator = new RxApprovalExpressionConfigurator(this.injector);
        this.expressionConfigurator.configureForProperty({
            propertyPath: 'approvalQualification',
            dataDictionary$: this.expressionConfigurator.approvalExpressionDataDictionary(this.registeredRecordDefinitionName),
            operators: this.expressionConfigurator.getOperatorRowsByGroup(ExpressionOperatorGroup.All)
        });
        this.options = {
            label: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.self-approval.approval-qualification-field.label'),
            dataDictionary$: this.expressionConfigurator.getDataDictionary('approvalQualification'),
            operators: this.expressionConfigurator.getOperators('approvalQualification'),
            isRequired: true
        };
        this.selfApprovalConfigurationForm = this.formBuilder.group({
            qualificationExpression: null,
            precedence: null,
            auditInformation: null,
            process: []
        });
        this.gridConfig = of({
            actionButtons: [
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.edit.label'),
                    style: 'tertiary',
                    icon: 'pencil',
                    actions: [
                        {
                            name: this.setCurrentRecordValuesToForm.bind(this)
                        }
                    ],
                    disabled: () => this.grid.api.getSelectedRowCount() > 1
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.delete.label'),
                    style: 'tertiary',
                    icon: 'trash',
                    actions: [
                        {
                            name: this.deleteConfiguration.bind(this)
                        }
                    ]
                }
            ],
            recordDefinitionName: RX_APPROVAL_CONFIGURATION.selfApproval.mapping.name,
            enableRowSelection: RowSelectionMode.Multiple,
            getData: (queryParams) => this.getData(queryParams),
            getRecordDefinition: () => of(this.getRecordDefinition()),
            columns: this.getColumns(),
            styles: 'flex-fill'
        });
        this.grid.adaptTable.selectionChange.subscribe(() => {
            this.isUpdateButtonVisible = false;
            this.clearFormValues();
        });
        this.loadProcesses();
    }
    getData(queryParams) {
        const params = Object.assign(Object.assign({}, omit(queryParams, ['searchText'])), { [RX_APPROVAL_CONFIGURATION.selfApproval.mapping.fields.recordDefinition]: this.registeredRecordDefinitionName });
        return this.rxApprovalMappingDataPageService.get({ params });
    }
    loadProcesses() {
        this.loadingProcesses = true;
        const queryParams = {
            recorddefinition: RX_APPROVAL_CONFIGURATION.selfApproval.flowList.name,
            propertySelection: [
                RX_APPROVAL_CONFIGURATION.selfApproval.flowList.fields.recordDefinition,
                RX_APPROVAL_CONFIGURATION.selfApproval.flowList.fields.selfApprovalFlowName,
                RX_APPROVAL_CONFIGURATION.selfApproval.flowList.fields.selfApprovalFlowProcessDefinitionGuid
            ].join(',')
        };
        this.rxApprovalMappingDataPageService
            .get({ params: queryParams })
            .pipe(map((response) => {
            const bundleInfoRequests = chain(response.data)
                .filter({
                [RX_APPROVAL_CONFIGURATION.selfApproval.flowList.fields.recordDefinition]: this.registeredRecordDefinitionName
            })
                .map((processData) => {
                const id = this.rxDefinitionNameService.getBundleId(processData[RX_APPROVAL_CONFIGURATION.selfApproval.flowList.fields.selfApprovalFlowName]);
                return this.rxGlobalCacheService.getBundleFriendlyName(id).pipe(map((friendlyName) => ({
                    id,
                    friendlyName
                })));
            })
                .value();
            forkJoin(bundleInfoRequests).subscribe((bundleIdNameData) => {
                this.processOptions = chain(response.data)
                    .filter({
                    [RX_APPROVAL_CONFIGURATION.selfApproval.flowList.fields.recordDefinition]: this.registeredRecordDefinitionName
                })
                    .map((processData) => {
                    return {
                        id: this.rxDefinitionNameService.getBundleId(processData[RX_APPROVAL_CONFIGURATION.selfApproval.flowList.fields.selfApprovalFlowName]),
                        processGuid: processData[RX_APPROVAL_CONFIGURATION.selfApproval.flowList.fields.selfApprovalFlowProcessDefinitionGuid],
                        value: processData[RX_APPROVAL_CONFIGURATION.selfApproval.flowList.fields.selfApprovalFlowName],
                        displayValue: this.rxDefinitionNameService.getDisplayName(processData[RX_APPROVAL_CONFIGURATION.selfApproval.flowList.fields.selfApprovalFlowName])
                    };
                })
                    .groupBy('id')
                    .map((options, id) => {
                    return {
                        name: find(bundleIdNameData, { id }).friendlyName,
                        children: _map(options, (option) => {
                            return {
                                value: option.value,
                                displayValue: option.displayValue,
                                processGuid: option.processGuid
                            };
                        })
                    };
                })
                    .value();
            }, () => { }, () => (this.loadingProcesses = false));
        }))
            .subscribe();
    }
    onEvent() {
        this.selectApprovalQualificationExpression();
    }
    selectApprovalQualificationExpression() {
        this.rxExpressionEditorService
            .openEditor({
            property: {
                path: 'approvalQualification',
                value: this.selfApprovalConfigurationForm.value.qualificationExpression,
                label: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.self-approval.approval-qualification-field.label')
            },
            expressionConfigurator: this.expressionConfigurator,
            legend: [
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.keyword.label'),
                    icon: 'd-icon-dollar'
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.field.label'),
                    icon: 'd-icon-field_text'
                }
            ]
        }, (dialogApi) => (this.dialogApi = dialogApi))
            .subscribe((expression) => {
            this.dialogApi = null;
            this.selfApprovalConfigurationForm.get('qualificationExpression').setValue(expression.value);
            this.selfApprovalConfigurationForm.get('qualificationExpression').markAsDirty();
        });
    }
    createSelfApprovalConfiguration() {
        this.selfApprovalConfigurationForm.markAsPristine();
        const configuration = this.getSelfApprovalConfiguration();
        this.rxApprovalConfigurationService.createSelfApprovalConfiguration(configuration).subscribe(() => {
            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.self-approval.expression-saved.message'));
            this.clearFormValues();
            this.grid.api.refresh().subscribe();
        });
    }
    updateSelfApprovalConfiguration() {
        this.selfApprovalConfigurationForm.markAsPristine();
        const configuration = this.getSelfApprovalConfiguration();
        configuration.id = this.grid.api.getFirstSelectedRow()[RX_RECORD_DEFINITION.coreFieldIds.id];
        this.rxApprovalConfigurationService
            .updateSelfApprovalConfiguration(this.grid.api.getFirstSelectedRow()[RX_RECORD_DEFINITION.coreFieldIds.id], configuration)
            .subscribe(() => {
            this.clearFormValues();
            this.isUpdateButtonVisible = false;
            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.self-approval.expression-updated.message'));
            this.grid.api.refresh().subscribe();
        });
    }
    getSelfApprovalConfiguration() {
        const selectedProcess = get(this.selfApprovalConfigurationForm.get('process').value, '[0]', {});
        return {
            auditText: this.selfApprovalConfigurationForm.value.auditInformation,
            precedence: this.selfApprovalConfigurationForm.value.precedence,
            qualification: this.selfApprovalConfigurationForm.value.qualificationExpression,
            description: this.registeredRecordDefinitionName,
            recordDefinition: this.registeredRecordDefinitionName,
            approvalFlowName: selectedProcess.value || '',
            approvalFlowProcessDefinitionGUID: selectedProcess.processGuid || '',
            approvalMappingRecordDefinition: RX_APPROVAL_CONFIGURATION.selfApproval.mapping.name
        };
    }
    setCurrentRecordValuesToForm() {
        this.isUpdateButtonVisible = true;
        const selectedRow = this.grid.api.getFirstSelectedRow();
        this.selfApprovalConfigurationForm
            .get('qualificationExpression')
            .setValue(selectedRow[RX_APPROVAL_CONFIGURATION.selfApproval.mapping.fields.qualification]);
        this.selfApprovalConfigurationForm
            .get('precedence')
            .setValue(selectedRow[RX_APPROVAL_CONFIGURATION.selfApproval.mapping.fields.precedence]);
        this.selfApprovalConfigurationForm
            .get('auditInformation')
            .setValue(selectedRow[RX_APPROVAL_CONFIGURATION.selfApproval.mapping.fields.auditInformation]);
        const process = selectedRow[RX_APPROVAL_CONFIGURATION.selfApproval.mapping.fields.approvalFlowName]
            ? [
                {
                    value: selectedRow[RX_APPROVAL_CONFIGURATION.selfApproval.mapping.fields.approvalFlowName],
                    displayValue: this.rxDefinitionNameService.getDisplayName(selectedRow[RX_APPROVAL_CONFIGURATION.selfApproval.mapping.fields.approvalFlowName])
                }
            ]
            : [];
        this.selfApprovalConfigurationForm.get('process').setValue(process);
    }
    deleteConfiguration() {
        this.rxModalService
            .confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.self-approval.expression-delete-confirmation.message')
        })
            .then((result) => {
            if (result) {
                const deleteRequests$ = this.grid.api
                    .getSelectedRows()
                    .map((record) => this.rxApprovalConfigurationService.deleteSelfApprovalConfiguration(record[RX_RECORD_DEFINITION.coreFieldIds.id]));
                forkJoin(deleteRequests$).subscribe(() => {
                    this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.self-approval.expression-deleted.message'));
                    this.clearFormValues();
                    this.isUpdateButtonVisible = false;
                    this.grid.api.refresh().subscribe();
                });
            }
        });
    }
    clearFormValues() {
        this.selfApprovalConfigurationForm.reset();
        this.selfApprovalConfigurationForm.get('process').setValue([]);
    }
    optionFormatter(option) {
        return option.displayValue;
    }
    getRecordDefinition() {
        return {
            fieldDefinitions: [
                {
                    id: RX_APPROVAL_CONFIGURATION.selfApproval.mapping.fields.hiddenQualification,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_APPROVAL_CONFIGURATION.selfApproval.mapping.fields.precedence,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.integer
                },
                {
                    id: RX_APPROVAL_CONFIGURATION.selfApproval.mapping.fields.auditInformation,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_APPROVAL_CONFIGURATION.selfApproval.mapping.fields.approvalFlowName,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_APPROVAL_CONFIGURATION.selfApproval.mapping.fields.qualification,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_APPROVAL_CONFIGURATION.selfApproval.mapping.fields.recordDefinition,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_APPROVAL_CONFIGURATION.selfApproval.mapping.fields.approvalFlowGuid,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_RECORD_DEFINITION.coreFieldIds.id,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                }
            ]
        };
    }
    getColumns() {
        return [
            {
                index: 0,
                fieldId: String(RX_APPROVAL_CONFIGURATION.selfApproval.mapping.fields.hiddenQualification),
                sortable: false,
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.selfApproval.grid.column.approvalExpression')
            },
            {
                index: 1,
                fieldId: String(RX_APPROVAL_CONFIGURATION.selfApproval.mapping.fields.precedence),
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.selfApproval.grid.column.precedence')
            },
            {
                index: 2,
                fieldId: String(RX_APPROVAL_CONFIGURATION.selfApproval.mapping.fields.auditInformation),
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.selfApproval.grid.column.auditInformation')
            },
            {
                index: 3,
                fieldId: String(RX_APPROVAL_CONFIGURATION.selfApproval.mapping.fields.approvalFlowName),
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.selfApproval.grid.column.processFlow')
            },
            {
                index: 4,
                fieldId: String(RX_APPROVAL_CONFIGURATION.selfApproval.mapping.fields.qualification),
                visible: false,
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.selfApproval.grid.column.expressionValue')
            },
            {
                index: 5,
                fieldId: String(RX_APPROVAL_CONFIGURATION.selfApproval.mapping.fields.recordDefinition),
                visible: false,
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.selfApproval.grid.column.recordDefinition'),
                cellTemplate: this.definitionNameCellTemplate
            },
            {
                index: 6,
                fieldId: String(RX_APPROVAL_CONFIGURATION.selfApproval.mapping.fields.approvalFlowGuid),
                visible: false,
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.selfApproval.grid.column.processFlowGUID')
            },
            {
                index: 7,
                fieldId: String(RX_RECORD_DEFINITION.coreFieldIds.id),
                visible: false,
                title: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.selfApproval.grid.column.id')
            }
        ];
    }
    isDirty() {
        var _a;
        return this.selfApprovalConfigurationForm.dirty || Boolean((_a = this.dialogApi) === null || _a === void 0 ? void 0 : _a.isDirty());
    }
}
SelfApprovalConfigurationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelfApprovalConfigurationComponent, deps: [{ token: i0.Injector }, { token: i1.FormBuilder }, { token: i2.RxModalService }, { token: i3.TranslateService }, { token: i4.RxGlobalCacheService }, { token: i4.RxNotificationService }, { token: i4.RxDefinitionNameService }, { token: i5.RxExpressionEditorService }, { token: i6.RxApprovalConfigurationService }, { token: i7.RxRecordDefinitionCacheService }, { token: i8.RxApprovalMappingDataPageService }], target: i0.ɵɵFactoryTarget.Component });
SelfApprovalConfigurationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: SelfApprovalConfigurationComponent, selector: "rx-self-approval-configuration", inputs: { registeredRecordDefinitionName: "registeredRecordDefinitionName" }, viewQueries: [{ propertyName: "definitionNameCellTemplate", first: true, predicate: ["definitionNameCellTemplate"], descendants: true, static: true }, { propertyName: "grid", first: true, predicate: ["grid"], descendants: true, static: true }], ngImport: i0, template: "<adapt-alert [config]=\"alertConfig\"></adapt-alert>\n\n<form [formGroup]=\"selfApprovalConfigurationForm\">\n  <rx-expression-form-control\n    class=\"d-block form-group\"\n    [options]=\"options\"\n    formControlName=\"qualificationExpression\"\n    (events)=\"onEvent()\"\n    required=\"true\"\n  ></rx-expression-form-control>\n\n  <div class=\"row\">\n    <div class=\"col-md-4 col-12\">\n      <div class=\"row\">\n        <div class=\"col-12 form-group\">\n          <adapt-rx-counter\n            rx-id=\"precedence\"\n            label=\"{{ 'com.bmc.arsys.rx.client.approval.configuration.precedence' | translate }}\"\n            required=\"true\"\n            formControlName=\"precedence\"\n          >\n          </adapt-rx-counter>\n        </div>\n\n        <div class=\"col-12 form-group\">\n          <adapt-rx-select\n            class=\"d-block\"\n            label=\"{{ 'com.bmc.arsys.rx.client.approval.configuration.selfApproval.process' | translate }}\"\n            rx-id=\"process\"\n            formControlName=\"process\"\n            [options]=\"processOptions\"\n            enableFilter=\"true\"\n            emptyOption=\"true\"\n            [optionFormatter]=\"optionFormatter\"\n            [loadingState]=\"loadingProcesses\"\n          >\n          </adapt-rx-select>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"col-md-8 col-12 form-group\">\n      <adapt-rx-textarea\n        label=\"{{ 'com.bmc.arsys.rx.client.approval.configuration.auditInformation' | translate }}\"\n        formControlName=\"auditInformation\"\n        rx-id=\"audit-information\"\n        required=\"true\"\n        rows=\"5\"\n      >\n      </adapt-rx-textarea>\n    </div>\n  </div>\n\n  <button\n    class=\"d-icon-plus_adapt form-group\"\n    type=\"button\"\n    adapt-button\n    btn-type=\"primary\"\n    rx-id=\"add-button\"\n    size=\"small\"\n    [hidden]=\"isUpdateButtonVisible\"\n    [disabled]=\"selfApprovalConfigurationForm.pristine || selfApprovalConfigurationForm.invalid\"\n    (click)=\"createSelfApprovalConfiguration()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.add.label' | translate }}\n  </button>\n\n  <button\n    class=\"form-group\"\n    type=\"button\"\n    adapt-button\n    btn-type=\"primary\"\n    rx-id=\"update-button\"\n    size=\"small\"\n    [hidden]=\"!isUpdateButtonVisible\"\n    [disabled]=\"selfApprovalConfigurationForm.pristine || selfApprovalConfigurationForm.invalid\"\n    (click)=\"updateSelfApprovalConfiguration()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.approval.update.button.label' | translate }}\n  </button>\n</form>\n\n<rx-record-grid #grid [config]=\"gridConfig\"></rx-record-grid>\n\n<ng-template #definitionNameCellTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n  {{ dataItem[column.field] | rxDefinitionNamePipe }}\n</ng-template>\n", styles: ["rx-record-grid{height:262px}:host::ng-deep rx-expression-form-control button{height:2rem}\n"], components: [{ type: i9.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i5.ExpressionFormControlComponent, selector: "rx-expression-form-control", inputs: ["options", "isDisabled", "propertyPath"], outputs: ["events"] }, { type: i9.AdaptRxCounterComponent, selector: "adapt-rx-counter", inputs: ["prefix", "suffix", "max", "min", "step", "size", "placeholder", "disabledStyleForReadonlyState"] }, { type: i9.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i9.AdaptRxTextareaComponent, selector: "adapt-rx-textarea", inputs: ["rows", "maxRows", "autocomplete", "placeholder", "size", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i9.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i10.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }], directives: [{ type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i1.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i1.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }], pipes: { "translate": i3.TranslatePipe, "rxDefinitionNamePipe": i4.RxDefinitionNamePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelfApprovalConfigurationComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-self-approval-configuration',
                    templateUrl: './self-approval-configuration.component.html',
                    styleUrls: ['./self-approval-configuration.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.FormBuilder }, { type: i2.RxModalService }, { type: i3.TranslateService }, { type: i4.RxGlobalCacheService }, { type: i4.RxNotificationService }, { type: i4.RxDefinitionNameService }, { type: i5.RxExpressionEditorService }, { type: i6.RxApprovalConfigurationService }, { type: i7.RxRecordDefinitionCacheService }, { type: i8.RxApprovalMappingDataPageService }]; }, propDecorators: { registeredRecordDefinitionName: [{
                type: Input
            }], definitionNameCellTemplate: [{
                type: ViewChild,
                args: ['definitionNameCellTemplate', { static: true }]
            }], grid: [{
                type: ViewChild,
                args: ['grid', { static: true }]
            }] } });
//# sourceMappingURL=self-approval-configuration.component.js.map