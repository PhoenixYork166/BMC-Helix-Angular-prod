import { Component, ComponentFactoryResolver, Input } from '@angular/core';
import { RxWizardModalComponent, RxWizardService } from '@helix/platform/shared/components';
import { FormBuilder, Validators } from '@angular/forms';
import { RxRecordInstanceService } from '@helix/platform/record/api';
import { DL_DATA_IMPORT } from '../data-import.constant';
import { distinctUntilChanged, filter, map, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { RxNotificationService } from '@helix/platform/shared/api';
import { TranslateService } from '@ngx-translate/core';
import { from, iif, NEVER, of, ReplaySubject, Subject, timer } from 'rxjs';
import { DataImportService } from '../data-import.service';
import { camelCase, forEach } from 'lodash';
import { DataImportMappingStepComponent } from '../data-import-mapping-step/data-import-mapping-step.component';
import { RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/record/api";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "../data-import.service";
import * as i4 from "@helix/platform/ui-kit";
import * as i5 from "@ngx-translate/core";
import * as i6 from "@angular/forms";
import * as i7 from "@helix/platform/shared/components";
import * as i8 from "@bmc-ux/adapt-angular";
import * as i9 from "@angular/common";
export class UploadDataFileStepComponent {
    constructor(rxRecordInstanceService, rxNotificationService, dataImportService, rxModalService, translateService, formBuilder, rxWizardModalComponent, rxWizardService, componentFactoryResolver) {
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.rxNotificationService = rxNotificationService;
        this.dataImportService = dataImportService;
        this.rxModalService = rxModalService;
        this.translateService = translateService;
        this.formBuilder = formBuilder;
        this.rxWizardModalComponent = rxWizardModalComponent;
        this.rxWizardService = rxWizardService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.isWorksheetProcessed = false;
        this.destroyed$ = new ReplaySubject(1);
        this.processCustomizedImport$ = new Subject();
        this.saveDataFileConfiguration = this.processCustomizedImport$
            .pipe(takeUntil(this.destroyed$), tap(() => {
            this.busy = NEVER.subscribe();
        }), switchMap(() => {
            if (this.isWorksheetProcessed) {
                return of(null);
            }
            else {
                return iif(() => !!this.context.createdRecordInstanceId, this.rxRecordInstanceService.get(DL_DATA_IMPORT.recordDefinitionName, this.context.createdRecordInstanceId), this.rxRecordInstanceService.getNew(DL_DATA_IMPORT.recordDefinitionName)).pipe(switchMap((recordInstance) => {
                    this.updateRecordInstanceFields(recordInstance);
                    return this.context.createdRecordInstanceId
                        ? this.rxRecordInstanceService.save(recordInstance)
                        : this.rxRecordInstanceService.create(recordInstance);
                }), tap((recordInstanceResponse) => {
                    if (!this.context.createdRecordInstanceId) {
                        this.context.createdRecordInstanceId = recordInstanceResponse === null || recordInstanceResponse === void 0 ? void 0 : recordInstanceResponse.id;
                    }
                }));
            }
        }), switchMap(() => this.isWorksheetProcessed
            ? of(null)
            : this.dataImportService.getDataRecordWorksheet(this.context.createdRecordInstanceId)), withLatestFrom(timer(0).pipe(switchMap(() => {
            var _a;
            return ((_a = this.context) === null || _a === void 0 ? void 0 : _a.clonedConfigurationInstanceId)
                ? this.rxRecordInstanceService.get(DL_DATA_IMPORT.recordDefinitionName, this.context.clonedConfigurationInstanceId)
                : of(null);
        }))), tap(() => {
            this.busy.unsubscribe();
        }), switchMap(([uploadedExcelFile, clonedRecordInstance]) => {
            if (this.isWorksheetProcessed) {
                return of({ gotoNextStep: true });
            }
            else if (uploadedExcelFile === null || uploadedExcelFile === void 0 ? void 0 : uploadedExcelFile.sheets) {
                this.isWorksheetProcessed = true;
                this.uploadedExcelSheets = uploadedExcelFile.sheets;
                this.rxWizardModalComponent.api.removeStep(1);
                forEach(this.uploadedExcelSheets, (sheet) => {
                    const stepId = camelCase(sheet.sheetName);
                    sheet.configurations.stepId = stepId;
                    this.context.excelSheetsConfiguration[sheet.sheetName] = sheet.configurations;
                    this.rxWizardModalComponent.api.addStep({
                        id: stepId,
                        name: sheet.sheetName,
                        options: {
                            sheetName: sheet.sheetName
                        },
                        componentFactory: this.componentFactoryResolver.resolveComponentFactory(DataImportMappingStepComponent)
                    });
                    this.context.dataImportContext.dataImportConfigurations.sheets.push(this.dataImportService.getEmptyCurrentSheetDataMapConfig(sheet.sheetName));
                });
                if (this.context.clonedConfigurationInstanceId) {
                    const clonedConfig = JSON.parse(clonedRecordInstance.fieldInstances[DL_DATA_IMPORT.fields.mappingConfig].value) || { dataImportConfigurations: { sheets: [] } };
                    const nonMatchedSheetNames = clonedConfig.dataImportConfigurations.sheets.filter((clonedSheet) => !uploadedExcelFile.sheets.some((excelSheet) => excelSheet.sheetName === clonedSheet.name));
                    if (clonedConfig.dataImportConfigurations.sheets.length !== uploadedExcelFile.sheets.length ||
                        nonMatchedSheetNames.length) {
                        return from(this.rxModalService.confirm({
                            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                            modalStyle: RX_MODAL.modalStyles.warning,
                            message: this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.configuration-mismatch.message'),
                            buttons: {
                                confirmButton: this.translateService.instant('com.bmc.arsys.rx.client.common.cancel.label'),
                                dismissButton: this.translateService.instant('com.bmc.arsys.rx.client.common.continue.label')
                            }
                        })).pipe(switchMap((result) => iif(() => result, this.deleteCreatedDataImportInstance(), of({ recordDeleted: false }))), tap((response) => {
                            if (response.recordDeleted) {
                                this.rxWizardModalComponent.api.markPristine();
                                this.rxWizardModalComponent.close();
                            }
                            else {
                                this.goToDataConfigurationStep();
                            }
                        }));
                    }
                    else {
                        this.context.dataImportContext.dataImportConfigurations.sheets =
                            clonedConfig.dataImportConfigurations.sheets;
                        this.context.isClonedConfigMatched = true;
                        return of({ gotoNextStep: true });
                    }
                }
                else {
                    return of({ gotoNextStep: true });
                }
            }
            else {
                this.isWorksheetProcessed = false;
                this.uploadDataFileForm.markAsDirty();
                this.rxNotificationService.addErrorMessage(this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.invalid-attachment-uploaded-error.message'));
                return this.deleteCreatedDataImportInstance();
            }
        }))
            .subscribe((response) => {
            if (response.gotoNextStep) {
                setTimeout(() => this.goToDataConfigurationStep());
            }
        });
    }
    ngOnInit() {
        this.rxWizardModalComponent.next$
            .pipe(filter((stepId) => stepId === DL_DATA_IMPORT.uploadFileStepId), takeUntil(this.destroyed$))
            .subscribe(() => {
            this.saveDataloadFileAndProceedToConfigurations();
        });
        this.rxWizardModalComponent.api.disableNextButton();
        this.uploadDataFileForm = this.formBuilder.group({
            importJobName: [null, [Validators.required, Validators.maxLength(254)]],
            importJobDescription: [null, Validators.maxLength(254)],
            dataFile: null,
            archivedWorksheetFileName: [null, [Validators.required, Validators.maxLength(254)]]
        });
        this.uploadDataFileForm.valueChanges.pipe(distinctUntilChanged(), takeUntil(this.destroyed$)).subscribe(() => {
            this.updateWizardButtons();
            const context = {
                importJobName: this.uploadDataFileForm.get('importJobName').value,
                importJobDescription: this.uploadDataFileForm.get('importJobDescription').value,
                attachmentType: this.isZipAttachmentUploaded
                    ? DL_DATA_IMPORT.attachmentTypes.zip.value
                    : DL_DATA_IMPORT.attachmentTypes.xlsx.value,
                archivedWorksheetFileName: this.uploadDataFileForm.get('archivedWorksheetFileName').value
            };
            this.rxWizardModalComponent.api.updateContext({
                importJobInfo: context
            });
        });
    }
    updateWizardButtons() {
        if (this.uploadDataFileForm.pristine || this.uploadDataFileForm.invalid) {
            this.rxWizardModalComponent.api.disableNextButton();
        }
        else {
            this.rxWizardModalComponent.api.enableNextButton();
        }
    }
    saveDataloadFile() {
        this.rxWizardModalComponent.api.disableNextButton();
        this.uploadDataFileForm.markAsPristine();
        this.rxWizardModalComponent.api.markPristine();
        this.rxRecordInstanceService
            .getNew(DL_DATA_IMPORT.recordDefinitionName)
            .pipe(switchMap((recordInstance) => {
            this.updateRecordInstanceFields(recordInstance);
            return this.rxRecordInstanceService.create(recordInstance);
        }))
            .subscribe(() => {
            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.data-record-saved.message'));
            this.rxWizardModalComponent.close();
        });
    }
    saveDataloadFileAndProceedToConfigurations() {
        this.isCustomizedImportStarted = true;
        this.rxWizardModalComponent.api.disableNextButton();
        this.uploadDataFileForm.markAsPristine();
        this.processCustomizedImport$.next();
    }
    handleWorksheetNameInput() {
        if (this.isZipAttachmentUploaded) {
            this.uploadDataFileForm.get('archivedWorksheetFileName').enable();
        }
        else {
            this.uploadDataFileForm.get('archivedWorksheetFileName').disable();
        }
    }
    onAfterFilesAdded(event) {
        if (event.length) {
            this.isWorksheetProcessed = false;
            this.isZipAttachmentUploaded = this.isZipExtension(event[0].data.name);
            this.handleWorksheetNameInput();
        }
    }
    onRemovedFileFromQueue() {
        this.isZipAttachmentUploaded = false;
        this.handleWorksheetNameInput();
        this.uploadDataFileForm.controls.archivedWorksheetFileName.setValue('');
    }
    getAllowedTypes() {
        return [DL_DATA_IMPORT.attachmentTypes.zip.extension, DL_DATA_IMPORT.attachmentTypes.xlsx.extension];
    }
    isZipExtension(fileName) {
        return fileName.split('.').pop().toLowerCase() === DL_DATA_IMPORT.attachmentTypes.zip.extension;
    }
    deleteCreatedDataImportInstance() {
        return this.rxRecordInstanceService
            .delete(DL_DATA_IMPORT.recordDefinitionName, this.context.createdRecordInstanceId)
            .pipe(tap(() => {
            this.context.createdRecordInstanceId = null;
        }), map(() => ({
            recordDeleted: true
        })));
    }
    goToDataConfigurationStep() {
        this.rxWizardModalComponent.next(true);
    }
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
    updateRecordInstanceFields(recordInstance) {
        recordInstance.setFieldValue(DL_DATA_IMPORT.fields.importJobName, this.uploadDataFileForm.get('importJobName').value);
        recordInstance.setFieldValue(DL_DATA_IMPORT.fields.importJobDescription, this.uploadDataFileForm.get('importJobDescription').value);
        recordInstance.setFieldValue(DL_DATA_IMPORT.fields.attachmentType, this.isZipAttachmentUploaded
            ? DL_DATA_IMPORT.attachmentTypes.zip.value
            : DL_DATA_IMPORT.attachmentTypes.xlsx.value);
        recordInstance.setFieldValue(DL_DATA_IMPORT.fields.dataFile, this.uploadDataFileForm.get('dataFile').value[0].data);
        recordInstance.setFieldValue(DL_DATA_IMPORT.fields.archivedWorksheetFileName, this.uploadDataFileForm.get('archivedWorksheetFileName').value);
    }
}
UploadDataFileStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: UploadDataFileStepComponent, deps: [{ token: i1.RxRecordInstanceService }, { token: i2.RxNotificationService }, { token: i3.DataImportService }, { token: i4.RxModalService }, { token: i5.TranslateService }, { token: i6.FormBuilder }, { token: i7.RxWizardModalComponent }, { token: i7.RxWizardService }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.Component });
UploadDataFileStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: UploadDataFileStepComponent, selector: "dl-upload-data-file-step", inputs: { context: "context" }, ngImport: i0, template: "<rx-busy-indicator [options]=\"{ busy: busy }\"></rx-busy-indicator>\n\n<form [formGroup]=\"uploadDataFileForm\" class=\"d-flex flex-column flex-fill h-100\">\n  <adapt-rx-textfield\n    class=\"d-block form-group\"\n    formControlName=\"importJobName\"\n    label=\"{{ 'com.bmc.arsys.rx.client.dataload.import.import-job-name.label' | translate }}\"\n    rx-id=\"import-job-name\"\n    [autofocus]=\"true\"\n  >\n  </adapt-rx-textfield>\n\n  <adapt-rx-textfield\n    class=\"d-block form-group\"\n    formControlName=\"importJobDescription\"\n    label=\"{{ 'com.bmc.arsys.rx.client.dataload.import.import-job-description.label' | translate }}\"\n    rx-id=\"import-job-description\"\n  >\n  </adapt-rx-textfield>\n\n  <adapt-rx-uploader\n    class=\"d-block form-group\"\n    label=\"{{ 'com.bmc.arsys.rx.client.dataload.import.data-file.label' | translate }}\"\n    formControlName=\"dataFile\"\n    [required]=\"true\"\n    [showMaxSizeRestriction]=\"false\"\n    [allowedTypes]=\"getAllowedTypes()\"\n    (afterFilesAdded)=\"onAfterFilesAdded($event)\"\n    (removedFileFromQueue)=\"onRemovedFileFromQueue()\"\n    rx-id=\"data-file\"\n  >\n  </adapt-rx-uploader>\n\n  <adapt-rx-textfield\n    *ngIf=\"isZipAttachmentUploaded\"\n    class=\"d-block mb-1\"\n    formControlName=\"archivedWorksheetFileName\"\n    label=\"{{ 'com.bmc.arsys.rx.client.dataload.import.attachment-type.zip.content-file.label' | translate }}\"\n    rx-id=\"archived-worksheet-file-name\"\n    [autofocus]=\"true\"\n    (onFocus)=\"updateWizardButtons()\"\n  >\n  </adapt-rx-textfield>\n\n  <div class=\"text-tertiary form-group\" *ngIf=\"isZipAttachmentUploaded\">\n    {{ 'com.bmc.arsys.rx.client.common.example.label' | translate }} Worksheet.xlsx\n  </div>\n\n  <button\n    adapt-button\n    class=\"mt-auto align-self-end\"\n    type=\"button\"\n    btn-type=\"primary\"\n    rx-id=\"quick-import-button\"\n    (click)=\"saveDataloadFile()\"\n    [disabled]=\"uploadDataFileForm.pristine || uploadDataFileForm.invalid || isCustomizedImportStarted\"\n  >\n    {{ 'com.bmc.arsys.rx.client.dataload.import.wizard.quick-data-import.label' | translate }}\n  </button>\n</form>\n", styles: [":host{position:relative;display:block;height:100%}\n"], components: [{ type: i4.RxBusyIndicatorComponent, selector: "rx-busy-indicator", inputs: ["options"] }, { type: i8.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i8.AdaptRxUploaderComponent, selector: "adapt-rx-uploader", inputs: ["uploadMode", "selectionMode", "enableFileDialog", "allowedTypes", "forbiddenTypes", "suppressParallel", "filesCount", "allowDuplicates", "showUploadFolderAlert", "visibleFiles", "reusable", "allowDeletion", "customErrors", "indeterminateFileLoader", "url", "deleteUrl", "droppableArea", "enableCustomDownload", "customDownload", "popoverAppendToBody", "showTypesRestriction", "showMinSizeRestriction", "showMaxSizeRestriction", "showFilesCountRestriction", "texts", "icons", "fileErrors", "enableDnD", "maxFileSize", "minFileSize", "chunkSize", "testID"], outputs: ["beforeFileDialogOpen", "afterFileDialogOpen", "beforeFilesAdded", "afterFilesAdded", "dropped", "dragOver", "startFileUploading", "processFileUploading", "endFileUploading", "errorFileUploading", "finishedFileUploading", "removedFileFromQueue", "deletedFile", "cancelUploading"] }, { type: i8.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i6.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i6.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i6.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i6.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i9.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i5.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: UploadDataFileStepComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'dl-upload-data-file-step',
                    templateUrl: './upload-data-file-step.component.html',
                    styleUrls: ['./upload-data-file-step.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.RxRecordInstanceService }, { type: i2.RxNotificationService }, { type: i3.DataImportService }, { type: i4.RxModalService }, { type: i5.TranslateService }, { type: i6.FormBuilder }, { type: i7.RxWizardModalComponent }, { type: i7.RxWizardService }, { type: i0.ComponentFactoryResolver }]; }, propDecorators: { context: [{
                type: Input
            }] } });
//# sourceMappingURL=upload-data-file-step.component.js.map