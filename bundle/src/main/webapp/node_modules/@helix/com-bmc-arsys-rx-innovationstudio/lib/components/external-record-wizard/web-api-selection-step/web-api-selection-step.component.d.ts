import { OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { RxWizardModalComponent } from '@helix/platform/shared/components';
import { IRecordGridConfig, RecordGridComponent } from '@helix/platform/view/components';
import { RxExternalDataService } from '../../../services/external-data/external-data.service';
import { IExternalRecordWizardContext } from '../external-record-wizard.types';
import * as i0 from "@angular/core";
export declare class WebApiSelectionStepComponent implements OnInit, OnDestroy {
    private rxExternalDataService;
    private rxWizardModalComponent;
    private translateService;
    context: IExternalRecordWizardContext;
    recordGrid: RecordGridComponent;
    webApiNameCellTemplate: TemplateRef<any>;
    sectionLabel: string;
    recordGridConfig$: Observable<IRecordGridConfig>;
    private destroyed$;
    constructor(rxExternalDataService: RxExternalDataService, rxWizardModalComponent: RxWizardModalComponent, translateService: TranslateService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<WebApiSelectionStepComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WebApiSelectionStepComponent, "ax-web-api-selection-wizard-step", never, { "context": "context"; }, {}, never, never>;
}
