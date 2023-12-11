import { Component, Injector } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DismissReasons, DockedPanelContext, LoaderType } from '@bmc-ux/adapt-angular';
import { RX_RECORD_DEFINITION, RxRecordInstanceService } from '@helix/platform/record/api';
import { RxBundleCacheService, RxNotificationService } from '@helix/platform/shared/api';
import { RxDefinitionPickerType } from '@helix/platform/shared/components';
import { TranslateService } from '@ngx-translate/core';
import { find, set } from 'lodash';
import moment from 'moment-es6';
import { RX_COGNITIVE_SEARCH } from '../cognitive-search.constant';
import { RxModalClass } from '@helix/platform/ui-kit';
import { RxCognitiveSearchProjectDataPageService } from '../cognitive-search-project-data-page.service';
import { RxCognitiveSearchCollectionDataPageService } from '../cognitive-search-collection-data-page.service';
import { distinctUntilChanged, filter, map, shareReplay, startWith, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@helix/platform/record/api";
import * as i4 from "@helix/platform/shared/api";
import * as i5 from "../cognitive-search-project-data-page.service";
import * as i6 from "../cognitive-search-collection-data-page.service";
import * as i7 from "@ngx-translate/core";
import * as i8 from "@helix/platform/shared/components";
import * as i9 from "@angular/common";
import * as i10 from "@helix/platform/ui-kit";
export class CognitiveSearchEditorAdminComponent extends RxModalClass {
    constructor(formBuilder, dockedPanelContext, rxRecordInstanceService, rxNotificationService, rxBundleCacheService, rxCognitiveSearchProjectDataPageService, rxCognitiveSearchCollectionDataPageService, translateService, injector) {
        super(dockedPanelContext, injector);
        this.formBuilder = formBuilder;
        this.dockedPanelContext = dockedPanelContext;
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.rxNotificationService = rxNotificationService;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxCognitiveSearchProjectDataPageService = rxCognitiveSearchProjectDataPageService;
        this.rxCognitiveSearchCollectionDataPageService = rxCognitiveSearchCollectionDataPageService;
        this.translateService = translateService;
        this.injector = injector;
        this.externalDatasetSourceOptions = [
            {
                value: '10',
                displayValue: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-search.rkm.label')
            },
            {
                value: '20',
                displayValue: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-search.other.label')
            }
        ];
        this.options = {
            label: this.translateService.instant('com.bmc.arsys.rx.client.common.record-definition-name.label'),
            definitionType: RxDefinitionPickerType.Record,
            required: true
        };
        this.searchLocaleOptions = ['en', 'ar', 'fr', 'de', 'ja', 'it', 'pt', 'es'];
    }
    ngOnInit() {
        super.ngOnInit();
        this.isEditMode = this.dockedPanelContext.getData().isEditMode;
        this.datasetType = this.dockedPanelContext.getData().datasetType;
        this.formatDataSource = this.dockedPanelContext.getData().formatDataSource;
        this.searchDatasetForm = this.formBuilder.group({
            datasetName: null,
            description: null,
            locale: [],
            recordDefinition: null,
            projectId: [],
            collectionId: [],
            externalDatasetSource: [],
            confidenceThreshold: 0
        });
        this.collections$ = this.searchDatasetForm.controls.projectId.valueChanges.pipe(distinctUntilChanged(), map((selection) => (this.isExternalDataset() ? selection === null || selection === void 0 ? void 0 : selection[0] : null)), filter(Boolean), switchMap((project) => this.rxCognitiveSearchCollectionDataPageService.get({
            params: { projectId: project.id }
        })), map((dataPage) => dataPage.data.sort((a, b) => a.name.localeCompare(b.name))), startWith([]), tap((collections) => {
            if (!this.isEditMode && this.isExternalDataset()) {
                this.searchDatasetForm.controls.collectionId.setValue([]);
                collections.length
                    ? this.searchDatasetForm.controls.collectionId.enable()
                    : this.searchDatasetForm.controls.collectionId.disable();
            }
        }));
        this.projects$ = this.rxCognitiveSearchProjectDataPageService.get().pipe(map((dataPage) => dataPage.data.sort((a, b) => a.name.localeCompare(b.name))), startWith([]), shareReplay(1), tap(() => {
            if (!this.isEditMode) {
                this.searchDatasetForm.controls.projectId.enable();
            }
        }), map((projects) => !this.isEditMode && this.isHelixPlatformDataset()
            ? projects.filter((project) => project.collectionCount < RX_COGNITIVE_SEARCH.maxCollectionsPerProject)
            : projects));
        if (this.isEditMode) {
            this.searchDatasetForm.get('datasetName').disable();
            this.searchDatasetForm.get('description').disable();
            this.searchDatasetForm.get('locale').disable();
            this.searchDatasetForm.get('recordDefinition').disable();
            this.searchDatasetForm.get('projectId').disable();
            this.searchDatasetForm.get('collectionId').disable();
            this.searchDatasetForm.get('externalDatasetSource').disable();
            const recordInstance$ = this.rxRecordInstanceService
                .get(RX_COGNITIVE_SEARCH.definitionName, this.dockedPanelContext.getData().recordId)
                .pipe(tap((recordInstance) => (this.recordInstance = recordInstance)));
            const subscription = forkJoin([recordInstance$, this.projects$])
                .pipe(switchMap(([recordInstance, projects]) => {
                const projectId = recordInstance.fieldInstances[RX_COGNITIVE_SEARCH.fields.projectId].value;
                const project = projects.find((project) => project.id === projectId);
                if (project) {
                    this.searchDatasetForm.controls.projectId.setValue([project]);
                }
                else {
                    this.searchDatasetForm.controls.projectId.setValue([
                        {
                            name: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-search.project-not-found.label'),
                            id: projectId
                        }
                    ], { emitEvent: false });
                }
                return project
                    ? this.rxCognitiveSearchCollectionDataPageService.get({ params: { projectId } })
                    : this.rxCognitiveSearchCollectionDataPageService.getEmptyDataPage();
            }), map((dataPage) => dataPage.data), withLatestFrom(recordInstance$))
                .subscribe(([collections, recordInstance]) => {
                const collectionId = recordInstance.fieldInstances[RX_COGNITIVE_SEARCH.fields.datasetId].value;
                const selectedCollection = collections.find((collection) => collection.id === collectionId);
                this.searchDatasetForm.controls.collectionId.setValue([
                    selectedCollection || {
                        name: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-search.collection-not-found.label'),
                        id: collectionId
                    }
                ]);
                this.setFormControlValues();
            });
            this.busyConfig = {
                busy: subscription,
                loaderType: LoaderType.SECTION,
                message: 'Loading'
            };
        }
        else {
            this.searchDatasetForm.get('locale').setValue([this.searchLocaleOptions[0]]);
            this.searchDatasetForm.get('confidenceThreshold').setValue(0);
            this.searchDatasetForm.get('projectId').disable();
            this.searchDatasetForm.get('collectionId').disable();
            if (this.isHelixPlatformDataset()) {
                this.searchDatasetForm.get('externalDatasetSource').disable();
            }
            else if (this.isExternalDataset()) {
                this.searchDatasetForm.get('recordDefinition').disable();
                this.searchDatasetForm
                    .get('externalDatasetSource')
                    .setValue([
                    find(this.externalDatasetSourceOptions, { value: RX_COGNITIVE_SEARCH.externalDatasetSourceTypes.rkm })
                ]);
            }
            this.rxRecordInstanceService
                .getNew(RX_COGNITIVE_SEARCH.definitionName)
                .subscribe((recordInstance) => (this.recordInstance = recordInstance));
        }
    }
    isDirty() {
        return this.searchDatasetForm.dirty;
    }
    isHelixPlatformDataset() {
        return this.datasetType === RX_COGNITIVE_SEARCH.datasetTypes.bmcHelixPlatForm;
    }
    isExternalDataset() {
        return this.datasetType === RX_COGNITIVE_SEARCH.datasetTypes.external;
    }
    setFormControlValues() {
        const status = find(RX_COGNITIVE_SEARCH.datasetStatus, {
            id: this.recordInstance.fieldInstances[RX_RECORD_DEFINITION.coreFieldIds.status].value
        });
        this.statusAlert = {
            content: this.translateService.instant(status.label),
            type: 'inline',
            variant: status.variant
        };
        this.failedReasonAlert = this.recordInstance.fieldInstances[RX_COGNITIVE_SEARCH.fields.datasetError].value
            ? {
                content: this.recordInstance.fieldInstances[RX_COGNITIVE_SEARCH.fields.datasetError].value,
                type: 'page',
                variant: 'warning',
                dismissible: false
            }
            : null;
        this.searchDatasetForm
            .get('datasetName')
            .setValue(this.recordInstance.fieldInstances[RX_COGNITIVE_SEARCH.fields.datasetName].value);
        this.searchDatasetForm
            .get('description')
            .setValue(this.recordInstance.fieldInstances[RX_RECORD_DEFINITION.coreFieldIds.description].value);
        this.searchDatasetForm
            .get('locale')
            .setValue([this.recordInstance.fieldInstances[RX_COGNITIVE_SEARCH.fields.locale].value]);
        if (this.isHelixPlatformDataset()) {
            this.searchDatasetForm
                .get('recordDefinition')
                .setValue(this.formatDataSource(this.recordInstance.fieldInstances[RX_COGNITIVE_SEARCH.fields.dataSource].value));
        }
        else if (this.isExternalDataset()) {
            this.searchDatasetForm.get('externalDatasetSource').setValue([
                find(this.externalDatasetSourceOptions, {
                    value: String(this.recordInstance.fieldInstances[RX_COGNITIVE_SEARCH.fields.externalDatasetSource].value)
                })
            ]);
        }
        this.searchDatasetForm
            .get('confidenceThreshold')
            .setValue(this.recordInstance.fieldInstances[RX_COGNITIVE_SEARCH.fields.confidenceThreshold].value);
    }
    optionFormatter(option) {
        return option.displayValue || option.name;
    }
    thresholdRangeValidator() {
        return (control) => {
            return control.value && !/^(0(\.[0-9]{1,6})?)|^(1(\.0{1,6})?)$/.test(control.value)
                ? {
                    thresholdOutOfRange: {
                        message: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-search.range-validation.message')
                    }
                }
                : null;
        };
    }
    saveSearchDataset() {
        this.searchDatasetForm.markAsPristine();
        if (!this.isEditMode) {
            this.recordInstance.fieldInstances[RX_COGNITIVE_SEARCH.fields.searchType].value = this.translateService.instant('com.bmc.arsys.rx.client.common.search.label');
            this.recordInstance.setFieldValue(RX_RECORD_DEFINITION.coreFieldIds.status, RX_COGNITIVE_SEARCH.datasetStatus.inProgress.id);
            this.recordInstance.setFieldValue(RX_RECORD_DEFINITION.coreFieldIds.description, this.searchDatasetForm.get('description').value);
            this.recordInstance.setFieldValue(RX_COGNITIVE_SEARCH.fields.datasetId, '');
            this.recordInstance.fieldInstances[RX_COGNITIVE_SEARCH.fields.datasetId].value =
                this.recordInstance.setFieldValue(RX_COGNITIVE_SEARCH.fields.datasetName, this.searchDatasetForm.get('datasetName').value);
            this.recordInstance.setFieldValue(RX_COGNITIVE_SEARCH.fields.bundleId, this.rxBundleCacheService.bundleId);
            this.recordInstance.setFieldValue(RX_COGNITIVE_SEARCH.fields.locale, this.searchDatasetForm.get('locale').value[0]);
            this.recordInstance.setFieldValue(RX_COGNITIVE_SEARCH.fields.dateLastSubmitted, moment());
            this.recordInstance.setFieldValue(RX_COGNITIVE_SEARCH.fields.searchDatasetType, this.datasetType);
            this.recordInstance.setFieldValue(RX_COGNITIVE_SEARCH.fields.projectId, [
                this.searchDatasetForm.get('projectId').value[0].id
            ]);
            if (this.isExternalDataset()) {
                this.recordInstance.setFieldValue(RX_COGNITIVE_SEARCH.fields.datasetId, [
                    this.searchDatasetForm.get('collectionId').value[0].id
                ]);
                this.recordInstance.setFieldValue(RX_COGNITIVE_SEARCH.fields.externalDatasetSource, this.searchDatasetForm.get('externalDatasetSource').value[0].value);
            }
            else if (this.isHelixPlatformDataset()) {
                this.recordInstance.setFieldValue(RX_COGNITIVE_SEARCH.fields.dataSource, JSON.stringify({
                    resourceType: RX_COGNITIVE_SEARCH.resourceType,
                    recordDefinitions: [this.searchDatasetForm.get('recordDefinition').value]
                }));
            }
            this.recordInstance.associationInstances = this.prepareAssociatedRecordInstance(this.recordInstance.fieldInstances[RX_COGNITIVE_SEARCH.fields.datasetName].value);
        }
        this.recordInstance.setFieldValue(RX_COGNITIVE_SEARCH.fields.confidenceThreshold, this.searchDatasetForm.get('confidenceThreshold').value);
        if (this.isEditMode) {
            this.rxRecordInstanceService.save(this.recordInstance).subscribe(() => this.successCallback());
        }
        else {
            this.rxRecordInstanceService.create(this.recordInstance).subscribe(() => this.successCallback());
        }
    }
    successCallback() {
        this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-search.search-data-save-successful.message'));
        this.dockedPanelContext.close(null);
    }
    prepareAssociatedRecordInstance(datasetName) {
        const associationOperations = set({}, 'nodeB', {
            pending: [
                {
                    recordDefinitionName: RX_COGNITIVE_SEARCH.templateDefinitionName,
                    isNewInstance: true,
                    id: RX_COGNITIVE_SEARCH.templateFields.templateType,
                    fieldInstances: {
                        [RX_COGNITIVE_SEARCH.templateFields.templateType]: {
                            id: RX_COGNITIVE_SEARCH.templateFields.templateType,
                            value: RX_COGNITIVE_SEARCH.templateTypes.webChannel
                        },
                        [RX_RECORD_DEFINITION.coreFieldIds.description]: {
                            id: RX_RECORD_DEFINITION.coreFieldIds.description,
                            value: 'Template for ' + datasetName
                        }
                    }
                },
                {
                    recordDefinitionName: RX_COGNITIVE_SEARCH.templateDefinitionName,
                    isNewInstance: true,
                    id: RX_COGNITIVE_SEARCH.templateFields.templateType,
                    fieldInstances: {
                        [RX_COGNITIVE_SEARCH.templateFields.templateType]: {
                            id: RX_COGNITIVE_SEARCH.templateFields.templateType,
                            value: RX_COGNITIVE_SEARCH.templateTypes.nonWebChannel
                        },
                        [RX_RECORD_DEFINITION.coreFieldIds.description]: {
                            id: RX_RECORD_DEFINITION.coreFieldIds.description,
                            value: 'Template for ' + datasetName
                        }
                    }
                }
            ]
        });
        return set({}, RX_COGNITIVE_SEARCH.templateAssociationDefinitionName, associationOperations);
    }
    cancel() {
        this.dockedPanelContext.dismiss(DismissReasons.CLOSE_BTN);
    }
}
CognitiveSearchEditorAdminComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CognitiveSearchEditorAdminComponent, deps: [{ token: i1.FormBuilder }, { token: i2.DockedPanelContext }, { token: i3.RxRecordInstanceService }, { token: i4.RxNotificationService }, { token: i4.RxBundleCacheService }, { token: i5.RxCognitiveSearchProjectDataPageService }, { token: i6.RxCognitiveSearchCollectionDataPageService }, { token: i7.TranslateService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
CognitiveSearchEditorAdminComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: CognitiveSearchEditorAdminComponent, selector: "rx-cognitive-search-editor", usesInheritance: true, ngImport: i0, template: "<div class=\"dp-body\" [ngBusy]=\"busyConfig\">\n  <div class=\"mb-1\" *ngIf=\"isEditMode && statusAlert\">\n    <label class=\"form-control-label\">\n      {{ 'com.bmc.arsys.rx.client.admin.cognitive-search.status.label' | translate }}\n    </label>\n    <adapt-alert [config]=\"statusAlert\"></adapt-alert>\n  </div>\n\n  <div class=\"mb-1\" *ngIf=\"isEditMode && failedReasonAlert\">\n    <label class=\"form-control-label\">\n      {{ 'com.bmc.arsys.rx.client.common.error.label' | translate }}\n    </label>\n    <adapt-alert [config]=\"failedReasonAlert\"></adapt-alert>\n  </div>\n\n  <form [formGroup]=\"searchDatasetForm\">\n    <adapt-rx-textfield\n      class=\"form-group d-block\"\n      rx-id=\"dataset-name\"\n      label=\"{{ 'com.bmc.arsys.rx.client.admin.cognitive-search.data-set-name.label' | translate }}\"\n      formControlName=\"datasetName\"\n      required=\"true\"\n    >\n    </adapt-rx-textfield>\n\n    <adapt-rx-textfield\n      class=\"form-group d-block\"\n      rx-id=\"description\"\n      label=\"{{ 'com.bmc.arsys.rx.client.common.description.label' | translate }}\"\n      formControlName=\"description\"\n      required=\"true\"\n    >\n    </adapt-rx-textfield>\n\n    <adapt-rx-select\n      class=\"form-group d-block\"\n      label=\"{{ 'com.bmc.arsys.rx.client.admin.cognitive-search.locale.label' | translate }}\"\n      rx-id=\"locale\"\n      formControlName=\"locale\"\n      [options]=\"searchLocaleOptions\"\n      required=\"true\"\n    >\n    </adapt-rx-select>\n\n    <adapt-rx-select\n      class=\"form-group d-block\"\n      label=\"{{ 'com.bmc.arsys.rx.client.admin.cognitive-search.project-id.label' | translate }}\"\n      rx-id=\"project-id\"\n      formControlName=\"projectId\"\n      [options]=\"projects$ | async\"\n      [optionFormatter]=\"optionFormatter\"\n      required=\"true\"\n      [tooltip]=\"\n        isHelixPlatformDataset()\n          ? {\n              iconName: 'question_circle_o',\n              content: 'com.bmc.arsys.rx.client.admin.cognitive-search.project-id.tooltip' | translate,\n              placement: 'right',\n              popoverMode: true\n            }\n          : null\n      \"\n    >\n    </adapt-rx-select>\n\n    <rx-definition-picker\n      *ngIf=\"isHelixPlatformDataset()\"\n      class=\"form-group d-block\"\n      [options]=\"options\"\n      formControlName=\"recordDefinition\"\n      rx-id=\"record-definition\"\n      required=\"true\"\n    >\n    </rx-definition-picker>\n\n    <adapt-rx-select\n      *ngIf=\"isExternalDataset()\"\n      class=\"form-group d-block\"\n      rx-id=\"collection-id\"\n      label=\"{{ 'com.bmc.arsys.rx.client.admin.cognitive-search.collection-id.label' | translate }}\"\n      formControlName=\"collectionId\"\n      [options]=\"collections$ | async\"\n      [optionFormatter]=\"optionFormatter\"\n      required=\"true\"\n    >\n    </adapt-rx-select>\n\n    <adapt-rx-select\n      *ngIf=\"isExternalDataset()\"\n      class=\"form-group d-block\"\n      label=\"{{ 'com.bmc.arsys.rx.client.admin.cognitive-search.external-data-set-source.label' | translate }}\"\n      rx-id=\"external-data-set-source\"\n      formControlName=\"externalDatasetSource\"\n      [options]=\"externalDatasetSourceOptions\"\n      [optionFormatter]=\"optionFormatter\"\n      required=\"true\"\n    >\n    </adapt-rx-select>\n\n    <adapt-rx-counter\n      adaptRange\n      class=\"form-group d-block\"\n      rx-id=\"confidence-threshold\"\n      label=\"{{ 'com.bmc.arsys.rx.client.admin.cognitive-search.confidence-threshold.label' | translate }}\"\n      [max]=\"1\"\n      [min]=\"0\"\n      [formControl]=\"searchDatasetForm.controls.confidenceThreshold\"\n      [rxCustomValidators]=\"thresholdRangeValidator()\"\n      [step]=\"0.1\"\n      [tooltip]=\"{\n        iconName: 'question_circle_o',\n        content: popoverContent,\n        placement: 'right',\n        popoverMode: true\n      }\"\n    >\n    </adapt-rx-counter>\n  </form>\n</div>\n\n<div class=\"dp-footer\">\n  <button\n    type=\"button\"\n    adapt-button\n    btn-type=\"primary\"\n    rx-id=\"save-button\"\n    class=\"mr-2\"\n    [disabled]=\"searchDatasetForm.pristine || searchDatasetForm.invalid\"\n    (click)=\"saveSearchDataset()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button type=\"button\" adapt-button (click)=\"cancel()\" btn-type=\"secondary\" rx-id=\"cancel-button\">Cancel</button>\n</div>\n\n<ng-template #popoverContent>\n  <div\n    style=\"white-space: pre-wrap\"\n    [innerHTML]=\"'com.bmc.arsys.rx.client.admin.cognitive-search.data-set-range.tooltip' | translate\"\n  ></div>\n</ng-template>\n", components: [{ type: i2.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i2.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i2.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i8.RxDefinitionPickerComponent, selector: "rx-definition-picker", inputs: ["options", "isDisabled"] }, { type: i2.AdaptRxCounterComponent, selector: "adapt-rx-counter", inputs: ["prefix", "suffix", "max", "min", "step", "size", "placeholder", "disabledStyleForReadonlyState"] }, { type: i2.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i2.AdaptBusyDirective, selector: "[adapt-busy], [ngBusy]", inputs: ["ngBusy", "adaptRadarDisableEventSending", "busyPromise", "determinate"] }, { type: i9.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i1.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i1.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i2.AdaptRangeValidatorDirective, selector: "[adaptRange][ngModel],[adaptRange][formControl]", inputs: ["adaptRange", "adaptRangeMessageFn"] }, { type: i1.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i10.RxCustomValidatorsDirective, selector: "[rxCustomValidators][ngModel],[rxCustomValidators][formControl]", inputs: ["rxCustomValidators"] }], pipes: { "translate": i7.TranslatePipe, "async": i9.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CognitiveSearchEditorAdminComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-cognitive-search-editor',
                    templateUrl: './cognitive-search-editor.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.FormBuilder }, { type: i2.DockedPanelContext }, { type: i3.RxRecordInstanceService }, { type: i4.RxNotificationService }, { type: i4.RxBundleCacheService }, { type: i5.RxCognitiveSearchProjectDataPageService }, { type: i6.RxCognitiveSearchCollectionDataPageService }, { type: i7.TranslateService }, { type: i0.Injector }]; } });
//# sourceMappingURL=cognitive-search-editor.component.js.map