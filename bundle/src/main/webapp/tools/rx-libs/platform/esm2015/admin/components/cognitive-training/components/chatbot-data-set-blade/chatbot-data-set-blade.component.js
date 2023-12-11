import { Component, Injector, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DismissReasons, DockedPanelContext, UploaderMode } from '@bmc-ux/adapt-angular';
import { RX_RECORD_DEFINITION, RxRecordInstanceService } from '@helix/platform/record/api';
import { RX_CHATBOT, RxChatbotDefinitionDataPageService } from '@helix/platform/shared/api';
import { RxDefinitionPickerType } from '@helix/platform/shared/components';
import { assign, find, isEmpty } from 'lodash';
import moment from 'moment-es6';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { RxCognitiveTrainingUtilsService } from '../../cognitive-training-utils.service';
import { RX_COGNITIVE_TRAINING } from '../../cognitive-training.constant';
import { RxCognitiveTrainingService } from '../../cognitive-training.service';
import { TranslateService } from '@ngx-translate/core';
import { RxModalClass } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "../../cognitive-training.service";
import * as i4 from "../../cognitive-training-utils.service";
import * as i5 from "@helix/platform/record/api";
import * as i6 from "@ngx-translate/core";
import * as i7 from "@helix/platform/shared/components";
import * as i8 from "@angular/forms";
import * as i9 from "@angular/common";
export class ChatbotDataSetBladeComponent extends RxModalClass {
    constructor(dockedPanelContext, rxChatbotDefinitionDataPageService, rxCognitiveTrainingService, rxCognitiveTrainingUtilsService, rxRecordInstanceService, translateService, injector) {
        super(dockedPanelContext, injector);
        this.dockedPanelContext = dockedPanelContext;
        this.rxChatbotDefinitionDataPageService = rxChatbotDefinitionDataPageService;
        this.rxCognitiveTrainingService = rxCognitiveTrainingService;
        this.rxCognitiveTrainingUtilsService = rxCognitiveTrainingUtilsService;
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.translateService = translateService;
        this.injector = injector;
        this.chatbotDefinitionPickerOptions = {
            label: this.translateService.instant('com.bmc.arsys.rx.client.admin.chatbots.name.label'),
            definitionType: RxDefinitionPickerType.Chatbot,
            required: true
        };
        this.csvFileUploadMode = UploaderMode.Auto;
        this.chatbotDefinitionName$ = new BehaviorSubject('');
        this.chatbotDefinitions$ = this.rxChatbotDefinitionDataPageService
            .get({
            headers: {
                'default-bundle-scope': ''
            },
            params: {
                propertySelection: ['chatbotName', 'id', 'enableTranslation']
            }
        })
            .pipe(map((dataPage) => dataPage.data));
        this.chatbotDefinition$ = combineLatest([
            this.chatbotDefinitionName$,
            this.chatbotDefinitions$
        ]).pipe(map(([chatbotDefinitionName, chatbotDefinitions]) => find(chatbotDefinitions, { chatbotName: chatbotDefinitionName }) || null), shareReplay(1));
        this.isChatbotTranslationEnabled$ = this.chatbotDefinition$.pipe(map((chatbotDefinition) => (chatbotDefinition === null || chatbotDefinition === void 0 ? void 0 : chatbotDefinition.enableTranslation) === 1));
        this.chatbotLocaleOptions$ = this.chatbotDefinition$.pipe(switchMap((chatbotDefinition) => chatbotDefinition
            ? this.rxCognitiveTrainingService
                .getChatbotLocalesById(chatbotDefinition.id)
                .pipe(map((dataPageResult) => dataPageResult.data.map((localeFieldIds) => localeFieldIds[RX_CHATBOT.chatbotLocales.fieldIds.locale])))
            : of([])));
        this.optionFormatter = (opt) => opt;
        this.contextData = this.dockedPanelContext.getData().data;
    }
    ngOnInit() {
        super.ngOnInit();
        this.localeOptions = this.rxCognitiveTrainingUtilsService.getTrainingLocales(RX_COGNITIVE_TRAINING.settings.trainingTypes.chatbot.value);
        const dataSource = this.contextData.recordInstance.getFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.dataSource);
        this.dataSet = {
            dataSetName: this.contextData.recordInstance.getFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.dataSetName),
            description: this.contextData.recordInstance.getFieldValue(RX_RECORD_DEFINITION.coreFieldIds.description),
            csvFile: null,
            chatbotLocale: [this.contextData.recordInstance.getFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.locale)],
            chatbotDefinitionName: this.contextData.recordInstance.getFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.chatbotName),
            locale: [
                this.contextData.recordInstance.getFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.dataSetLocale) ||
                    RX_COGNITIVE_TRAINING.settings.defaultTrainingLocale
            ],
            lastSubmittedDate: this.contextData.recordInstance.getFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.dateLastSubmitted),
            status: find(RX_COGNITIVE_TRAINING.settings.trainingStatuses, {
                value: this.contextData.recordInstance.getFieldValue(RX_RECORD_DEFINITION.coreFieldIds.status)
            })
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
        if (this.dataSet.chatbotDefinitionName) {
            this.chatbotDefinitionName$.next(this.dataSet.chatbotDefinitionName);
        }
    }
    isDirty() {
        return this.chatbotDataSetForm.dirty;
    }
    ngOnDestroy() {
        this.chatbotDefinitionName$.complete();
    }
    onChatbotDefinitionNameChange(chatbotDefinitionName) {
        this.dataSet.chatbotLocale = [];
        this.dataSet.locale = [];
        this.chatbotDefinitionName$.next(chatbotDefinitionName);
    }
    onSaveClick() {
        this.contextData.recordInstance.setFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.dataSourceHistory, JSON.stringify({
            resourceType: this.contextData.dataSourceType.resourceType,
            fileName: this.dataSet.csvFile && this.dataSet.csvFile[0].data.name
        }));
        this.contextData.recordInstance.setFieldProp(RX_COGNITIVE_TRAINING.settings.fieldIds.dataSource, 'file', (!isEmpty(this.dataSet.csvFile) && this.dataSet.csvFile[0].data) || null);
        this.contextData.recordInstance.setFieldProp(RX_COGNITIVE_TRAINING.settings.fieldIds.dataSource, 'value', (!isEmpty(this.dataSet.csvFile) && this.dataSet.csvFile[0].data.name) || null);
        this.contextData.recordInstance.setFieldValue(RX_RECORD_DEFINITION.coreFieldIds.description, this.dataSet.description);
        this.contextData.recordInstance.setFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.dataSetLocale, this.dataSet.locale[0] || null);
        this.contextData.recordInstance.setFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.dateLastSubmitted, moment());
        if (this.contextData.isNewDataSet || this.contextData.copyDataSet) {
            this.contextData.recordInstance.setFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.bundleId, this.contextData.bundleId);
            this.contextData.recordInstance.setFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.dataSetName, this.dataSet.dataSetName);
            this.contextData.recordInstance.setFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.dataSetID, '');
            this.contextData.recordInstance.setFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.chatbotName, this.dataSet.chatbotDefinitionName);
            this.contextData.recordInstance.setFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.locale, this.dataSet.chatbotLocale[0]);
            this.contextData.recordInstance.setFieldValue(RX_RECORD_DEFINITION.coreFieldIds.status, RX_COGNITIVE_TRAINING.settings.trainingStatuses.untrained.value);
            this.contextData.recordInstance.setFieldValue(RX_COGNITIVE_TRAINING.settings.fieldIds.trainingType, RX_COGNITIVE_TRAINING.settings.trainingTypes.chatbot.value);
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
ChatbotDataSetBladeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ChatbotDataSetBladeComponent, deps: [{ token: i1.DockedPanelContext }, { token: i2.RxChatbotDefinitionDataPageService }, { token: i3.RxCognitiveTrainingService }, { token: i4.RxCognitiveTrainingUtilsService }, { token: i5.RxRecordInstanceService }, { token: i6.TranslateService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
ChatbotDataSetBladeComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ChatbotDataSetBladeComponent, selector: "rx-chatbot-data-set-blade", viewQueries: [{ propertyName: "chatbotDataSetForm", first: true, predicate: ["chatbotDataSetForm"], descendants: true, read: NgForm, static: true }], usesInheritance: true, ngImport: i0, template: "<div class=\"dp-body\">\n  <form #chatbotDataSetForm=\"ngForm\">\n    <div class=\"d-flex justify-content-between m-0 mb-4\" *ngIf=\"contextData.editDataSet\">\n      <label class=\"form-control-label\">\n        {{ 'com.bmc.arsys.rx.client.admin.cognitive-training.date-last-submitted.label' | translate }}\n      </label>\n\n      <div>{{ dataSet.lastSubmittedDate | date: 'medium' }}</div>\n    </div>\n\n    <adapt-rx-textfield\n      class=\"form-group d-block\"\n      name=\"data-set-name\"\n      label=\"{{ 'com.bmc.arsys.rx.client.admin.cognitive-search.data-set-name.label' | translate }}\"\n      rx-id=\"data-set-name-field\"\n      required\n      [(ngModel)]=\"dataSet.dataSetName\"\n    >\n    </adapt-rx-textfield>\n\n    <adapt-rx-textfield\n      class=\"form-group d-block\"\n      name=\"description\"\n      label=\"{{ 'com.bmc.arsys.rx.client.common.description.label' | translate }}\"\n      rx-id=\"description-field\"\n      required\n      [(ngModel)]=\"dataSet.description\"\n    >\n    </adapt-rx-textfield>\n\n    <adapt-rx-uploader\n      class=\"form-group d-block\"\n      name=\"csv-file\"\n      label=\"{{ 'com.bmc.arsys.rx.client.admin.cognitive-training.csv-file.label' | translate }}\"\n      rx-id=\"csv-file-field\"\n      required\n      reusable=\"true\"\n      [uploadMode]=\"csvFileUploadMode\"\n      [allowedTypes]=\"['csv']\"\n      [(ngModel)]=\"dataSet.csvFile\"\n    >\n    </adapt-rx-uploader>\n\n    <rx-definition-picker\n      class=\"form-group d-block\"\n      name=\"chatbot-name\"\n      rx-id=\"chatbot-name-field\"\n      required\n      [options]=\"chatbotDefinitionPickerOptions\"\n      [(ngModel)]=\"dataSet.chatbotDefinitionName\"\n      (ngModelChange)=\"onChatbotDefinitionNameChange($event)\"\n    >\n    </rx-definition-picker>\n\n    <div *ngIf=\"chatbotDefinition$ | async\">\n      <adapt-rx-select\n        class=\"form-group d-block\"\n        name=\"chatbot-locale\"\n        label=\"{{\n          'com.bmc.arsys.rx.client.admin.cognitive-training.chatbot-data-set-blade.chatbot-locale.label' | translate\n        }}\"\n        rx-id=\"chatbot-locale-field\"\n        required\n        [options]=\"(chatbotLocaleOptions$ | async) || []\"\n        [optionFormatter]=\"optionFormatter\"\n        [(ngModel)]=\"dataSet.chatbotLocale\"\n      >\n      </adapt-rx-select>\n\n      <adapt-rx-select\n        class=\"form-group d-block\"\n        *ngIf=\"isChatbotTranslationEnabled$ | async\"\n        name=\"locale\"\n        label=\"{{\n          'com.bmc.arsys.rx.client.admin.cognitive-training.chatbot-data-set-blade.data-set-locale.label' | translate\n        }}\"\n        rx-id=\"locale-field\"\n        required\n        [options]=\"localeOptions\"\n        [optionFormatter]=\"optionFormatter\"\n        [(ngModel)]=\"dataSet.locale\"\n      >\n      </adapt-rx-select>\n    </div>\n  </form>\n</div>\n\n<div class=\"dp-footer\">\n  <button\n    class=\"mr-2\"\n    type=\"button\"\n    rx-id=\"save-button\"\n    adapt-button\n    btn-type=\"primary\"\n    [disabled]=\"chatbotDataSetForm.pristine || chatbotDataSetForm.invalid\"\n    (click)=\"onSaveClick()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button class=\"mr-2\" type=\"button\" rx-id=\"close-button\" adapt-button btn-type=\"secondary\" (click)=\"onCloseClick()\">\n    {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n  </button>\n</div>\n", components: [{ type: i1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1.AdaptRxUploaderComponent, selector: "adapt-rx-uploader", inputs: ["uploadMode", "selectionMode", "enableFileDialog", "allowedTypes", "forbiddenTypes", "suppressParallel", "filesCount", "allowDuplicates", "showUploadFolderAlert", "visibleFiles", "reusable", "allowDeletion", "customErrors", "indeterminateFileLoader", "url", "deleteUrl", "droppableArea", "enableCustomDownload", "customDownload", "popoverAppendToBody", "showTypesRestriction", "showMinSizeRestriction", "showMaxSizeRestriction", "showFilesCountRestriction", "texts", "icons", "fileErrors", "enableDnD", "maxFileSize", "minFileSize", "chunkSize", "testID"], outputs: ["beforeFileDialogOpen", "afterFileDialogOpen", "beforeFilesAdded", "afterFilesAdded", "dropped", "dragOver", "startFileUploading", "processFileUploading", "endFileUploading", "errorFileUploading", "finishedFileUploading", "removedFileFromQueue", "deletedFile", "cancelUploading"] }, { type: i7.RxDefinitionPickerComponent, selector: "rx-definition-picker", inputs: ["options", "isDisabled"] }, { type: i1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i8.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i8.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i8.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i9.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i8.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i8.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i8.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i6.TranslatePipe, "date": i9.DatePipe, "async": i9.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ChatbotDataSetBladeComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-chatbot-data-set-blade',
                    templateUrl: './chatbot-data-set-blade.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.DockedPanelContext }, { type: i2.RxChatbotDefinitionDataPageService }, { type: i3.RxCognitiveTrainingService }, { type: i4.RxCognitiveTrainingUtilsService }, { type: i5.RxRecordInstanceService }, { type: i6.TranslateService }, { type: i0.Injector }]; }, propDecorators: { chatbotDataSetForm: [{
                type: ViewChild,
                args: ['chatbotDataSetForm', { static: true, read: NgForm }]
            }] } });
//# sourceMappingURL=chatbot-data-set-blade.component.js.map