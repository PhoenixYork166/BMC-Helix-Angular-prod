import { HttpClient } from '@angular/common/http';
import { OnDestroy, OnInit } from '@angular/core';
import { IPlainObject, RxCommandFactoryService, RxServerErrorHandlerService } from '@helix/platform/shared/api';
import { RxWizardModalComponent } from '@helix/platform/shared/components';
import { RxUtilityModalsService } from '@helix/platform/ui-kit';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { AxBundleDeploymentService } from '../../../services/bundle-deployment/bundle-deployment.service';
import * as i0 from "@angular/core";
export declare class PackageWizardStepComponent implements OnInit, OnDestroy {
    private httpClient;
    private axBundleDeploymentService;
    private rxCommandFactoryService;
    private rxServerErrorHandlerService;
    private rxUtilityModalsService;
    private rxWizardModalComponent;
    translateService: TranslateService;
    options: IPlainObject;
    private queueCreateDeploymentPackageCommand;
    private guid;
    private destroyed$;
    private operationStatusSubject;
    operationStatus$: Observable<string>;
    operationStatusMessage: any;
    operationStatuses: {
        pending: any;
        failed: any;
        succeeded: any;
    };
    isApprovalConfigurationDataIncluded$: Observable<boolean>;
    isConfigurationDataIncluded$: Observable<any>;
    isDataImportOptionsByRecordDefinitionNameIncluded$: Observable<any>;
    isDefinitionsToDeleteByTypeIncluded$: Observable<any>;
    isDefinitionsToDeployByTypeIncluded$: Observable<any>;
    isPackageDataEmpty$: Observable<boolean>;
    isCreatePackageButtonDisabled$: Observable<boolean>;
    isAllPackageDataIncluded$: Observable<boolean>;
    constructor(httpClient: HttpClient, axBundleDeploymentService: AxBundleDeploymentService, rxCommandFactoryService: RxCommandFactoryService, rxServerErrorHandlerService: RxServerErrorHandlerService, rxUtilityModalsService: RxUtilityModalsService, rxWizardModalComponent: RxWizardModalComponent, translateService: TranslateService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    createPackage(forceStart?: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PackageWizardStepComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PackageWizardStepComponent, "ax-package-wizard-step", never, { "options": "options"; }, {}, never, never>;
}