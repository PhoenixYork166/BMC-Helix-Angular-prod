import { OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { IPlainObject, RxDataPageFactoryService, RxDefinitionNameService, RxSessionExpirationService } from '@helix/platform/shared/api';
import { RxWizardModalComponent } from '@helix/platform/shared/components';
import { IRecordGridConfig, RecordGridComponent } from '@helix/platform/view/components';
import { ICreateContentPackageContext } from '../../bundle-details/bundle-details.types';
import * as i0 from "@angular/core";
export declare class SelectApprovalConfigurationsWizardStepComponent implements OnInit, OnDestroy {
    private rxDataPageService;
    private rxDefinitionNameService;
    private rxSessionExpirationService;
    private translateService;
    private rxWizardModalComponent;
    context: ICreateContentPackageContext;
    options: IPlainObject;
    recordGrid: RecordGridComponent;
    recordGridConfig$: Observable<IRecordGridConfig>;
    selectedDefinitionCount: number;
    private destroyed$;
    constructor(rxDataPageService: RxDataPageFactoryService, rxDefinitionNameService: RxDefinitionNameService, rxSessionExpirationService: RxSessionExpirationService, translateService: TranslateService, rxWizardModalComponent: RxWizardModalComponent);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onDataLoaded(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SelectApprovalConfigurationsWizardStepComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SelectApprovalConfigurationsWizardStepComponent, "ax-select-approval-configurations-wizard-step", never, { "context": "context"; "options": "options"; }, {}, never, never>;
}
