import { OnDestroy, OnInit } from '@angular/core';
import { IPlainObject, RxDefinitionNameService, RxSessionExpirationService } from '@helix/platform/shared/api';
import { RxWizardModalComponent } from '@helix/platform/shared/components';
import { RxStringService } from '@helix/platform/utils';
import { IRecordGridConfig } from '@helix/platform/view/components';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { DefinitionHistoryDataPageService } from './definition-history-data-page.service';
import * as i0 from "@angular/core";
export declare class SelectDefinitionsToDeleteWizardStepComponent implements OnInit, OnDestroy {
    private definitionHistoryDataPageService;
    private rxDefinitionNameService;
    private rxSessionExpirationService;
    private rxStringService;
    private rxWizardModalComponent;
    private translateService;
    options: IPlainObject;
    private recordNameCellTemplate;
    private recordGrid;
    selectedDefinitionCount: number;
    recordGridConfig$: Observable<IRecordGridConfig>;
    private destroyed$;
    constructor(definitionHistoryDataPageService: DefinitionHistoryDataPageService, rxDefinitionNameService: RxDefinitionNameService, rxSessionExpirationService: RxSessionExpirationService, rxStringService: RxStringService, rxWizardModalComponent: RxWizardModalComponent, translateService: TranslateService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onDataLoaded(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SelectDefinitionsToDeleteWizardStepComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SelectDefinitionsToDeleteWizardStepComponent, "ax-select-definitions-to-delete-wizard-step", never, { "options": "options"; }, {}, never, never>;
}
