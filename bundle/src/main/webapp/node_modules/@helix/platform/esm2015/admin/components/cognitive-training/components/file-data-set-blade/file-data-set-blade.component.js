import { Component, Injector, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { assign, find, isEmpty } from 'lodash';
import moment from 'moment-es6';
import { DismissReasons, DockedPanelContext, UploaderMode } from '@bmc-ux/adapt-angular';
import { RX_RECORD_DEFINITION, RxRecordInstanceService } from '@helix/platform/record/api';
import { RxModalClass } from '@helix/platform/ui-kit';
import { RX_COGNITIVE_TRAINING } from '../../cognitive-training.constant';
import { RxCognitiveTrainingUtilsService } from '../../cognitive-training-utils.service';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "../../cognitive-training-utils.service";
import * as i3 from "@helix/platform/record/api";
import * as i4 from "@angular/forms";
import * as i5 from "@angular/common";
import * as i6 from "@ngx-translate/core";
export class FileDataSetBladeComponent extends RxModalClass {
    constructor(dockedPanelContext, rxCognitiveTrainingUtilsService, rxRecordInstanceService, injector) {
        super(dockedPanelContext, injector);
        this.dockedPanelContext = dockedPanelContext;
        this.rxCognitiveTrainingUtilsService = rxCognitiveTrainingUtilsService;
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.injector = injector;
        this.csvFileUploadMode = UploaderMode.Auto;
        this.optionFormatter = (opt) => opt;
        this.contextData = this.dockedPanelContext.getData().data;
    }
    ngOnInit() {
        super.ngOnInit();
        this.localeOptions = this.rxCognitiveTrainingUtilsService.getTrainingLocales(this.contextData.trainingType.value);
        const dataSource = this.contextData.recordInstance.getFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.dataSource);
        this.dataSet = {
            dataSetName: this.contextData.recordInstance.getFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.dataSetName),
            description: this.contextData.recordInstance.getFieldValue(RX_RECORD_DEFINITION.coreFieldIds.description),
            csvFile: null,
            locale: [
                this.contextData.recordInstance.getFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.locale) ||
                    RX_COGNITIVE_TRAINING.settings.defaultTrainingLocale
            ],
            testDataPercent: this.contextData.isNewDataSet
                ? RX_COGNITIVE_TRAINING.settings.defaultTestDataPercentage
                : this.contextData.recordInstance.getFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.testDataPercent),
            trainDataPercent: this.contextData.isNewDataSet
                ? RX_COGNITIVE_TRAINING.settings.defaultTrainDataPercentage
                : this.contextData.recordInstance.getFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.trainDataPercent),
            status: find(RX_COGNITIVE_TRAINING.settings.trainingStatuses, {
                value: this.contextData.recordInstance.getFieldValue(RX_RECORD_DEFINITION.coreFieldIds.status)
            }),
            lastSubmittedDate: this.contextData.recordInstance.getFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.dateLastSubmitted),
            lastTrainedDate: this.contextData.recordInstance.getFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.dateLastTrained),
            machineLearningError: this.contextData.recordInstance.getFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.machineLearningError)
        };
        if (dataSource && (this.contextData.editDataSet || this.contextData.copyDataSet)) {
            this.rxRecordInstanceService
                .getAttachment(RX_COGNITIVE_TRAINING.settings.dataSetDefinitionName, RX_COGNITIVE_TRAINING.settings.fieldIds.dataSource, this.contextData.getAttachmentRecordInstanceId)
                .subscribe((blob) => {
                this.dataSet.csvFile = [
                    {
                        data: assign(blob, {
                            name: dataSource
                        }),
                        downloadURL: this.rxRecordInstanceService.getAttachmentDownloadUrl(RX_COGNITIVE_TRAINING.settings.dataSetDefinitionName, RX_COGNITIVE_TRAINING.settings.fieldIds.dataSource, this.contextData.recordInstance.id),
                        isUploading: true
                    }
                ];
            });
        }
    }
    isDirty() {
        return this.fileDataSetForm.dirty;
    }
    onTrainDataPercentCounterChange(trainDataPercent) {
        this.dataSet.testDataPercent = 100 - trainDataPercent;
    }
    onTestDataPercentCounterChange(testDataPercent) {
        this.dataSet.trainDataPercent = 100 - testDataPercent;
    }
    onSaveClick() {
        this.contextData.recordInstance.setFieldValue(RX_RECORD_DEFINITION.coreFieldIds.description, this.dataSet.description);
        this.contextData.recordInstance.setFieldProp(RX_COGNITIVE_TRAINING.settings.fieldIds.dataSource, 'file', (!isEmpty(this.dataSet.csvFile) && this.dataSet.csvFile[0].data) || null);
        this.contextData.recordInstance.setFieldProp(RX_COGNITIVE_TRAINING.settings.fieldIds.dataSource, 'value', (!isEmpty(this.dataSet.csvFile) && this.dataSet.csvFile[0].data.name) || null);
        this.contextData.recordInstance.setFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.dataSourceHistory, JSON.stringify({
            resourceType: this.contextData.dataSourceType.resourceType,
            fileName: this.dataSet.csvFile[0].data.name
        }));
        this.contextData.recordInstance.setFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.locale, this.dataSet.locale[0]);
        this.contextData.recordInstance.setFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.dateLastSubmitted, moment());
        this.contextData.recordInstance.setFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.testDataPercent, this.dataSet.testDataPercent);
        this.contextData.recordInstance.setFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.trainDataPercent, this.dataSet.trainDataPercent);
        if (this.contextData.isNewDataSet || this.contextData.copyDataSet) {
            this.contextData.recordInstance.setFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.bundleId, this.contextData.bundleId);
            this.contextData.recordInstance.setFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.dataSetName, this.dataSet.dataSetName);
            this.contextData.recordInstance.setFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.dataSetID, '');
            this.contextData.recordInstance.setFieldValue(RX_RECORD_DEFINITION.coreFieldIds.status, RX_COGNITIVE_TRAINING.settings.trainingStatuses.untrained.value);
            this.contextData.recordInstance.setFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.classificationServiceProvider, this.contextData.trainingType.uniqueValue);
            this.contextData.recordInstance.setFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.trainingType, this.contextData.trainingType.value);
            this.rxRecordInstanceService.create(this.contextData.recordInstance).subscribe(() => {
                this.dockedPanelContext.close('save');
            });
        }
        else if (this.contextData.editDataSet) {
            if (this.dataSet.status.value === RX_COGNITIVE_TRAINING.settings.trainingStatuses.trained.value ||
                this.dataSet.status.value === RX_COGNITIVE_TRAINING.settings.trainingStatuses.failed.value) {
                this.contextData.recordInstance.setFieldValue(RX_RECORD_DEFINITION.coreFieldIds.status, RX_COGNITIVE_TRAINING.settings.trainingStatuses.pendingRetraining.value);
            }
            this.rxRecordInstanceService.save(this.contextData.recordInstance).subscribe(() => {
                this.dockedPanelContext.close('save');
            });
        }
    }
    onCloseClick() {
        this.dockedPanelContext.dismiss(DismissReasons.CLOSE_BTN);
    }
}
FileDataSetBladeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FileDataSetBladeComponent, deps: [{ token: i1.DockedPanelContext }, { token: i2.RxCognitiveTrainingUtilsService }, { token: i3.RxRecordInstanceService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
FileDataSetBladeComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: FileDataSetBladeComponent, selector: "rx-file-data-set-blade", viewQueries: [{ propertyName: "fileDataSetForm", first: true, predicate: ["fileDataSetForm"], descendants: true, read: NgForm, static: true }], usesInheritance: true, ngImport: i0, template: "<div class=\"dp-body\">\n  <form #fileDataSetForm=\"ngForm\">\n    <div *ngIf=\"contextData.editDataSet\">\n      <div class=\"d-flex justify-content-between m-0 mb-3\">\n        <div>\n          <label class=\"form-control-label\">\n            {{ 'com.bmc.arsys.rx.client.admin.cognitive-training.status.label' | translate }}\n          </label>\n\n          <div>{{ dataSet.status.label }}</div>\n        </div>\n\n        <div>\n          <label class=\"form-control-label\">\n            {{ 'com.bmc.arsys.rx.client.admin.cognitive-training.date-last-submitted.label' | translate }}\n          </label>\n\n          <div>{{ dataSet.lastSubmittedDate | date: 'medium' }}</div>\n        </div>\n\n        <div>\n          <label class=\"form-control-label\">\n            {{ 'com.bmc.arsys.rx.client.admin.cognitive-training.date-last-trained.label' | translate }}\n          </label>\n\n          <div>{{ dataSet.lastTrainedDate | date: 'medium' }}</div>\n        </div>\n      </div>\n\n      <adapt-alert\n        *ngIf=\"dataSet.machineLearningError\"\n        [config]=\"{\n          content: dataSet.machineLearningError,\n          type: 'inline',\n          variant: 'danger'\n        }\"\n      ></adapt-alert>\n    </div>\n\n    <adapt-rx-textfield\n      class=\"form-group d-block\"\n      name=\"data-set-name\"\n      label=\"{{ 'com.bmc.arsys.rx.client.admin.cognitive-search.data-set-name.label' | translate }}\"\n      rx-id=\"data-set-name-field\"\n      required\n      [disabled]=\"contextData.editDataSet\"\n      [(ngModel)]=\"dataSet.dataSetName\"\n    >\n    </adapt-rx-textfield>\n\n    <adapt-rx-textfield\n      class=\"form-group d-block\"\n      name=\"description\"\n      label=\"{{ 'com.bmc.arsys.rx.client.admin.chatbots.description.title' | translate }}\"\n      rx-id=\"description-field\"\n      required\n      [(ngModel)]=\"dataSet.description\"\n    >\n    </adapt-rx-textfield>\n\n    <adapt-rx-textfield\n      class=\"form-group d-block\"\n      name=\"training-type\"\n      label=\"{{ 'com.bmc.arsys.rx.client.admin.cognitive-training.training-type.label' | translate }}\"\n      rx-id=\"training-type-field\"\n      required\n      disabled\n      [(ngModel)]=\"contextData.trainingType.displayName\"\n    >\n    </adapt-rx-textfield>\n\n    <adapt-rx-uploader\n      class=\"form-group d-block\"\n      name=\"csv-file\"\n      label=\"{{ 'com.bmc.arsys.rx.client.admin.cognitive-training.csv-file.label' | translate }}\"\n      rx-id=\"csv-file-field\"\n      required\n      reusable=\"true\"\n      [uploadMode]=\"csvFileUploadMode\"\n      [allowedTypes]=\"['csv']\"\n      [(ngModel)]=\"dataSet.csvFile\"\n    >\n    </adapt-rx-uploader>\n\n    <adapt-rx-select\n      class=\"form-group d-block\"\n      name=\"locale\"\n      label=\"{{ 'com.bmc.arsys.rx.client.admin.cognitive-search.locale.label' | translate }}\"\n      rx-id=\"locale-field\"\n      required\n      [options]=\"localeOptions\"\n      [optionFormatter]=\"optionFormatter\"\n      [(ngModel)]=\"dataSet.locale\"\n    >\n    </adapt-rx-select>\n\n    <adapt-rx-counter\n      class=\"form-group d-block\"\n      name=\"training-data\"\n      label=\"{{ 'com.bmc.arsys.rx.client.admin.cognitive-training.training-data.label' | translate }}\"\n      rx-id=\"training-data-field\"\n      placeholder=\"0\"\n      adaptMin=\"0\"\n      adaptMax=\"100\"\n      min=\"0\"\n      max=\"100\"\n      required\n      (ngModelChange)=\"onTrainDataPercentCounterChange($event)\"\n      [(ngModel)]=\"dataSet.trainDataPercent\"\n    >\n    </adapt-rx-counter>\n\n    <adapt-rx-counter\n      class=\"form-group d-block\"\n      name=\"test-data\"\n      label=\"{{ 'com.bmc.arsys.rx.client.admin.cognitive-training.test-data.label' | translate }}\"\n      rx-id=\"test-data-field\"\n      placeholder=\"0\"\n      adaptMin=\"0\"\n      adaptMax=\"100\"\n      min=\"0\"\n      max=\"100\"\n      required\n      (ngModelChange)=\"onTestDataPercentCounterChange($event)\"\n      [(ngModel)]=\"dataSet.testDataPercent\"\n    >\n    </adapt-rx-counter>\n  </form>\n</div>\n\n<div class=\"dp-footer\">\n  <button\n    class=\"mr-2\"\n    type=\"button\"\n    rx-id=\"save-button\"\n    adapt-button\n    btn-type=\"primary\"\n    [disabled]=\"fileDataSetForm.pristine || fileDataSetForm.invalid\"\n    (click)=\"onSaveClick()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button class=\"mr-2\" type=\"button\" rx-id=\"close-button\" adapt-button btn-type=\"secondary\" (click)=\"onCloseClick()\">\n    {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n  </button>\n</div>\n", components: [{ type: i1.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1.AdaptRxUploaderComponent, selector: "adapt-rx-uploader", inputs: ["uploadMode", "selectionMode", "enableFileDialog", "allowedTypes", "forbiddenTypes", "suppressParallel", "filesCount", "allowDuplicates", "showUploadFolderAlert", "visibleFiles", "reusable", "allowDeletion", "customErrors", "indeterminateFileLoader", "url", "deleteUrl", "droppableArea", "enableCustomDownload", "customDownload", "popoverAppendToBody", "showTypesRestriction", "showMinSizeRestriction", "showMaxSizeRestriction", "showFilesCountRestriction", "texts", "icons", "fileErrors", "enableDnD", "maxFileSize", "minFileSize", "chunkSize", "testID"], outputs: ["beforeFileDialogOpen", "afterFileDialogOpen", "beforeFilesAdded", "afterFilesAdded", "dropped", "dragOver", "startFileUploading", "processFileUploading", "endFileUploading", "errorFileUploading", "finishedFileUploading", "removedFileFromQueue", "deletedFile", "cancelUploading"] }, { type: i1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i1.AdaptRxCounterComponent, selector: "adapt-rx-counter", inputs: ["prefix", "suffix", "max", "min", "step", "size", "placeholder", "disabledStyleForReadonlyState"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i4.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i4.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i4.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i1.AdaptMinValidatorDirective, selector: "[adaptMin][ngModel],[adaptMin][formControl]", inputs: ["adaptMin", "adaptMinMessageFn"] }, { type: i1.AdaptMaxValidatorDirective, selector: "[adaptMax][ngModel],[adaptMax][formControl]", inputs: ["adaptMax", "adaptMaxMessageFn"] }], pipes: { "translate": i6.TranslatePipe, "date": i5.DatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FileDataSetBladeComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-file-data-set-blade',
                    templateUrl: './file-data-set-blade.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.DockedPanelContext }, { type: i2.RxCognitiveTrainingUtilsService }, { type: i3.RxRecordInstanceService }, { type: i0.Injector }]; }, propDecorators: { fileDataSetForm: [{
                type: ViewChild,
                args: ['fileDataSetForm', { static: true, read: NgForm }]
            }] } });
//# sourceMappingURL=file-data-set-blade.component.js.map