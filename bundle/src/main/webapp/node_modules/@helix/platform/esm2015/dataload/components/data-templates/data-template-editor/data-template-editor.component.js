import { Component, Injector } from '@angular/core';
import { DismissReasons, DockedPanelContext } from '@bmc-ux/adapt-angular';
import { RxModalClass } from '@helix/platform/ui-kit';
import { RxRecordInstanceService } from '@helix/platform/record/api';
import { DL_DATA_TEMPLATES } from '../data-templates.constant';
import { RX_APPLICATION, RxGlobalCacheService, RxNotificationService } from '@helix/platform/shared/api';
import { iif, of, ReplaySubject } from 'rxjs';
import { map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { find } from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@helix/platform/record/api";
import * as i4 from "@bmc-ux/adapt-angular";
import * as i5 from "@angular/forms";
import * as i6 from "@helix/platform/ui-kit";
import * as i7 from "@angular/common";
export class DataTemplateEditorComponent extends RxModalClass {
    constructor(translateService, rxNotificationService, rxGlobalCacheService, rxRecordInstanceService, injector, dockedPanelContext, formBuilder) {
        super(dockedPanelContext, injector);
        this.translateService = translateService;
        this.rxNotificationService = rxNotificationService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.injector = injector;
        this.dockedPanelContext = dockedPanelContext;
        this.formBuilder = formBuilder;
        this.destroyed$ = new ReplaySubject(1);
        this.isEditMode = this.dockedPanelContext.getData().isEditMode;
        this.enableCustomDownload = true;
        this.applicationOptions$ = this.rxGlobalCacheService.getBundleDescriptors().pipe(takeUntil(this.destroyed$), map((bundleDescriptors) => {
            return bundleDescriptors
                .filter((bundleDescriptor) => ![RX_APPLICATION.innovationStudioBundleId, RX_APPLICATION.standardlib].includes(bundleDescriptor.id))
                .sort((a, b) => a.friendlyName.localeCompare(b.friendlyName))
                .map((bundleDescriptor) => ({
                displayValue: bundleDescriptor.friendlyName,
                value: bundleDescriptor.id
            }));
        }));
        this.downloadAttachment = () => {
            this.rxRecordInstanceService.downloadAttachment(DL_DATA_TEMPLATES.recordDefinitionName, DL_DATA_TEMPLATES.fields.template, this.dockedPanelContext.getData().templateRecordInstanceId, this.recordInstance.fieldInstances[DL_DATA_TEMPLATES.fields.template].value);
        };
    }
    isDirty() {
        return this.dataTemplateForm.dirty;
    }
    ngOnInit() {
        super.ngOnInit();
        this.dataTemplateForm = this.formBuilder.group({
            application: [[], Validators.required],
            templateName: [null, [Validators.required, Validators.maxLength(254)]],
            version: [null, [Validators.required, Validators.maxLength(254)]],
            isActive: null,
            description: [null, Validators.maxLength(500)],
            template: [null, Validators.required]
        });
        this.dataTemplateForm.get('isActive').setValue(0);
        this.busy = iif(() => this.isEditMode, this.rxRecordInstanceService.get(DL_DATA_TEMPLATES.recordDefinitionName, this.dockedPanelContext.getData().templateRecordInstanceId), this.rxRecordInstanceService.getNew(DL_DATA_TEMPLATES.recordDefinitionName))
            .pipe(tap((recordInstance) => {
            this.recordInstance = recordInstance;
            if (this.isEditMode) {
                this.setTemplateFormValues();
            }
        }), switchMap(() => iif(() => this.isEditMode, this.applicationOptions$.pipe(take(1)), of([]))), map((options) => find(options, {
            displayValue: this.recordInstance.fieldInstances[DL_DATA_TEMPLATES.fields.bundleFriendlyName].value
        })), tap((option) => {
            if (this.isEditMode) {
                this.dataTemplateForm.get('application').setValue([option]);
            }
        }))
            .subscribe();
    }
    setTemplateFormValues() {
        this.dataTemplateForm
            .get('templateName')
            .setValue(this.recordInstance.fieldInstances[DL_DATA_TEMPLATES.fields.templateName].value);
        this.dataTemplateForm
            .get('version')
            .setValue(this.recordInstance.fieldInstances[DL_DATA_TEMPLATES.fields.dataLoadTemplateVersion].value);
        this.dataTemplateForm
            .get('isActive')
            .setValue(this.recordInstance.fieldInstances[DL_DATA_TEMPLATES.fields.isActive].value);
        this.dataTemplateForm
            .get('description')
            .setValue(this.recordInstance.fieldInstances[DL_DATA_TEMPLATES.fields.dataloadTemplateDescription].value);
        this.dataTemplateForm.get('template').setValue([
            {
                data: new File([], this.recordInstance.fieldInstances[DL_DATA_TEMPLATES.fields.template].value),
                inUploading: false,
                inDeleting: false,
                uploaded: 100,
                error: false,
                errorText: '',
                allowDeletion: true
            }
        ]);
    }
    optionFormatter(option) {
        return option.displayValue;
    }
    saveTemplate() {
        this.recordInstance.setFieldValue(DL_DATA_TEMPLATES.fields.bundleFriendlyName, this.dataTemplateForm.get('application').value[0].displayValue);
        this.recordInstance.setFieldValue(DL_DATA_TEMPLATES.fields.bundleId, this.dataTemplateForm.get('application').value[0].value);
        this.recordInstance.setFieldValue(DL_DATA_TEMPLATES.fields.templateName, this.dataTemplateForm.get('templateName').value);
        this.recordInstance.setFieldValue(DL_DATA_TEMPLATES.fields.dataLoadTemplateVersion, this.dataTemplateForm.get('version').value);
        this.recordInstance.setFieldValue(DL_DATA_TEMPLATES.fields.isActive, this.dataTemplateForm.get('isActive').value);
        this.recordInstance.setFieldValue(DL_DATA_TEMPLATES.fields.dataloadTemplateDescription, this.dataTemplateForm.get('description').value);
        this.recordInstance.setFieldValue(DL_DATA_TEMPLATES.fields.template, this.dataTemplateForm.get('template').value[0].data);
        if (this.isEditMode) {
            this.rxRecordInstanceService.save(this.recordInstance).subscribe(() => this.successCallback());
        }
        else {
            this.rxRecordInstanceService.create(this.recordInstance).subscribe(() => this.successCallback());
        }
    }
    onRemovedFileFromQueue() {
        this.enableCustomDownload = false;
    }
    cancel() {
        this.dockedPanelContext.dismiss(DismissReasons.CLOSE_BTN);
    }
    successCallback() {
        this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.dataload.templates.template-saved.message'));
        this.dockedPanelContext.close(null);
    }
    getAllowedTypes() {
        return [DL_DATA_TEMPLATES.allowedFileTypes.xlsx, DL_DATA_TEMPLATES.allowedFileTypes.zip];
    }
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}
DataTemplateEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataTemplateEditorComponent, deps: [{ token: i1.TranslateService }, { token: i2.RxNotificationService }, { token: i2.RxGlobalCacheService }, { token: i3.RxRecordInstanceService }, { token: i0.Injector }, { token: i4.DockedPanelContext }, { token: i5.FormBuilder }], target: i0.ɵɵFactoryTarget.Component });
DataTemplateEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DataTemplateEditorComponent, selector: "dl-data-template-editor", usesInheritance: true, ngImport: i0, template: "<rx-busy-indicator [options]=\"{ busy: busy }\"></rx-busy-indicator>\n\n<div class=\"dp-body\">\n  <form [formGroup]=\"dataTemplateForm\">\n    <adapt-rx-select\n      class=\"form-group d-block\"\n      label=\"{{ 'com.bmc.arsys.rx.client.common.application.label' | translate }}\"\n      rx-id=\"application\"\n      formControlName=\"application\"\n      [options]=\"applicationOptions$ | async\"\n      [optionFormatter]=\"optionFormatter\"\n      [autofocus]=\"true\"\n    >\n    </adapt-rx-select>\n\n    <adapt-rx-textfield\n      class=\"form-group d-block\"\n      rx-id=\"template-name\"\n      label=\"{{ 'com.bmc.arsys.rx.client.dataload.templates.template-name.label' | translate }}\"\n      formControlName=\"templateName\"\n    >\n    </adapt-rx-textfield>\n\n    <adapt-rx-textfield\n      class=\"form-group d-block\"\n      rx-id=\"version\"\n      label=\"{{ 'com.bmc.arsys.rx.client.common.version.label' | translate }}\"\n      formControlName=\"version\"\n    >\n    </adapt-rx-textfield>\n\n    <adapt-rx-radiobutton-group\n      formControlName=\"isActive\"\n      label=\"{{ 'com.bmc.arsys.rx.client.dataload.templates.is-active-template.label' | translate }}\"\n    >\n      <adapt-rx-radiobutton\n        [value]=\"1\"\n        label=\"{{ 'com.bmc.arsys.rx.client.common.yes.label' | translate }}\"\n      ></adapt-rx-radiobutton>\n\n      <adapt-rx-radiobutton\n        [value]=\"0\"\n        label=\"{{ 'com.bmc.arsys.rx.client.common.no.label' | translate }}\"\n      ></adapt-rx-radiobutton>\n    </adapt-rx-radiobutton-group>\n\n    <adapt-rx-textarea\n      class=\"form-group d-block\"\n      rx-id=\"description\"\n      label=\"{{ 'com.bmc.arsys.rx.client.common.description.label' | translate }}\"\n      formControlName=\"description\"\n      rows=\"4\"\n    >\n    </adapt-rx-textarea>\n\n    <adapt-rx-uploader\n      label=\"{{ 'com.bmc.arsys.rx.client.common.template.label' | translate }}\"\n      formControlName=\"template\"\n      [showMaxSizeRestriction]=\"false\"\n      [enableCustomDownload]=\"enableCustomDownload\"\n      [customDownload]=\"downloadAttachment\"\n      (removedFileFromQueue)=\"onRemovedFileFromQueue()\"\n      [reusable]=\"true\"\n      [allowedTypes]=\"getAllowedTypes()\"\n    >\n    </adapt-rx-uploader>\n  </form>\n</div>\n\n<div class=\"dp-footer\">\n  <button\n    type=\"button\"\n    adapt-button\n    btn-type=\"primary\"\n    rx-id=\"save-button\"\n    class=\"mr-2\"\n    [disabled]=\"dataTemplateForm.pristine || dataTemplateForm.invalid\"\n    (click)=\"saveTemplate()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button type=\"button\" adapt-button (click)=\"cancel()\" btn-type=\"secondary\" rx-id=\"cancel-button\">\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", styles: [":host ::ng-deep adapt-rx-uploader .adapt-uploader-file-uploaded{display:none}\n"], components: [{ type: i6.RxBusyIndicatorComponent, selector: "rx-busy-indicator", inputs: ["options"] }, { type: i4.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i4.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i4.AdaptRxRadiobuttonGroupComponent, selector: "adapt-rx-radiobutton-group", inputs: ["formControlName"] }, { type: i4.AdaptRxRadiobuttonComponent, selector: "adapt-rx-radiobutton", inputs: ["name", "label", "id", "value", "checked", "disabled", "ariaLabel", "ariaLabeledBy", "ariaDescribedBy", "testID", "tabIndex"], outputs: ["onFocus", "onBlur", "checkedChange"] }, { type: i4.AdaptRxTextareaComponent, selector: "adapt-rx-textarea", inputs: ["rows", "maxRows", "autocomplete", "placeholder", "size", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i4.AdaptRxUploaderComponent, selector: "adapt-rx-uploader", inputs: ["uploadMode", "selectionMode", "enableFileDialog", "allowedTypes", "forbiddenTypes", "suppressParallel", "filesCount", "allowDuplicates", "showUploadFolderAlert", "visibleFiles", "reusable", "allowDeletion", "customErrors", "indeterminateFileLoader", "url", "deleteUrl", "droppableArea", "enableCustomDownload", "customDownload", "popoverAppendToBody", "showTypesRestriction", "showMinSizeRestriction", "showMaxSizeRestriction", "showFilesCountRestriction", "texts", "icons", "fileErrors", "enableDnD", "maxFileSize", "minFileSize", "chunkSize", "testID"], outputs: ["beforeFileDialogOpen", "afterFileDialogOpen", "beforeFilesAdded", "afterFilesAdded", "dropped", "dragOver", "startFileUploading", "processFileUploading", "endFileUploading", "errorFileUploading", "finishedFileUploading", "removedFileFromQueue", "deletedFile", "cancelUploading"] }, { type: i4.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i5.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i5.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i5.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }], pipes: { "translate": i1.TranslatePipe, "async": i7.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataTemplateEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'dl-data-template-editor',
                    templateUrl: './data-template-editor.component.html',
                    styleUrls: ['./data-template-editor.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.TranslateService }, { type: i2.RxNotificationService }, { type: i2.RxGlobalCacheService }, { type: i3.RxRecordInstanceService }, { type: i0.Injector }, { type: i4.DockedPanelContext }, { type: i5.FormBuilder }]; } });
//# sourceMappingURL=data-template-editor.component.js.map