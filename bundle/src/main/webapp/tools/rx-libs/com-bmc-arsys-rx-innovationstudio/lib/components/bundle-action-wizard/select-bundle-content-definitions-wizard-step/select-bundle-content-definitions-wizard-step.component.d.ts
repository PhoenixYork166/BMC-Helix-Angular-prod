import { OnDestroy, OnInit } from '@angular/core';
import { RxRecordDefinitionDataPageService } from '@helix/platform/record/api';
import { IPlainObject, RxBundleCacheService, RxDataPageFactoryService, RxDefinitionNameService, RxSessionExpirationService } from '@helix/platform/shared/api';
import { RxWizardModalComponent } from '@helix/platform/shared/components';
import { RxStringService } from '@helix/platform/utils';
import { IRecordGridConfig } from '@helix/platform/view/components';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class SelectBundleContentDefinitionsWizardStepComponent implements OnInit, OnDestroy {
    private rxBundleCacheService;
    private rxDataPageService;
    private rxDefinitionNameService;
    private rxRecordDefinitionDataPageService;
    private rxSessionExpirationService;
    private rxStringService;
    private rxWizardModalComponent;
    private translateService;
    options: IPlainObject;
    private recordGrid;
    private displayTypeWithCellTemplate;
    selectedDefinitionCount: number;
    recordGridConfig$: Observable<IRecordGridConfig>;
    private currentBundleId;
    private destroyed$;
    constructor(rxBundleCacheService: RxBundleCacheService, rxDataPageService: RxDataPageFactoryService, rxDefinitionNameService: RxDefinitionNameService, rxRecordDefinitionDataPageService: RxRecordDefinitionDataPageService, rxSessionExpirationService: RxSessionExpirationService, rxStringService: RxStringService, rxWizardModalComponent: RxWizardModalComponent, translateService: TranslateService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onDataLoaded(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SelectBundleContentDefinitionsWizardStepComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SelectBundleContentDefinitionsWizardStepComponent, "ax-select-bundle-content-definitions-wizard-step", never, { "options": "options"; }, {}, never, never>;
}