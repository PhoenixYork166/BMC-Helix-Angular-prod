import { ComponentFactoryResolver, OnDestroy, OnInit } from '@angular/core';
import { RxWizardModalComponent, RxWizardService } from '@helix/platform/shared/components';
import { FileObj } from '@bmc-ux/adapt-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RxRecordInstanceService } from '@helix/platform/record/api';
import { RxNotificationService } from '@helix/platform/shared/api';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { IDataloadWizardContext } from '../data-import.types';
import { DataImportService } from '../data-import.service';
import { RxModalService } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
export declare class UploadDataFileStepComponent implements OnInit, OnDestroy {
    private rxRecordInstanceService;
    private rxNotificationService;
    private dataImportService;
    private rxModalService;
    private translateService;
    private formBuilder;
    private rxWizardModalComponent;
    private rxWizardService;
    private componentFactoryResolver;
    context: IDataloadWizardContext;
    private isWorksheetProcessed;
    isZipAttachmentUploaded: boolean;
    uploadDataFileForm: FormGroup;
    private uploadedExcelSheets;
    private destroyed$;
    private processCustomizedImport$;
    busy: Subscription;
    isCustomizedImportStarted: boolean;
    saveDataFileConfiguration: Subscription;
    constructor(rxRecordInstanceService: RxRecordInstanceService, rxNotificationService: RxNotificationService, dataImportService: DataImportService, rxModalService: RxModalService, translateService: TranslateService, formBuilder: FormBuilder, rxWizardModalComponent: RxWizardModalComponent, rxWizardService: RxWizardService, componentFactoryResolver: ComponentFactoryResolver);
    ngOnInit(): void;
    updateWizardButtons(): void;
    saveDataloadFile(): void;
    saveDataloadFileAndProceedToConfigurations(): void;
    private handleWorksheetNameInput;
    onAfterFilesAdded(event: FileObj[]): void;
    onRemovedFileFromQueue(): void;
    getAllowedTypes(): string[];
    private isZipExtension;
    private deleteCreatedDataImportInstance;
    private goToDataConfigurationStep;
    ngOnDestroy(): void;
    private updateRecordInstanceFields;
    static ɵfac: i0.ɵɵFactoryDeclaration<UploadDataFileStepComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UploadDataFileStepComponent, "dl-upload-data-file-step", never, { "context": "context"; }, {}, never, never>;
}