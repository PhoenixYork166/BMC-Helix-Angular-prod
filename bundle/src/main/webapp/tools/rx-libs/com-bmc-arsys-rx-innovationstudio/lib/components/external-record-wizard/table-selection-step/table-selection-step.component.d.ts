import { OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { RxWizardModalComponent } from '@helix/platform/shared/components';
import { IRecordGridConfig, RecordGridComponent } from '@helix/platform/view/components';
import { RxExternalDataService } from '../../../services/external-data/external-data.service';
import { IExternalRecordWizardContext } from '../external-record-wizard.types';
import * as i0 from "@angular/core";
export declare class TableSelectionStepComponent implements OnInit, OnDestroy {
    private rxExternalDataService;
    private rxWizardModalComponent;
    private translateService;
    context: IExternalRecordWizardContext;
    tableSelectionStepRecordGrid: RecordGridComponent;
    sectionLabel: string;
    tableSelectionRecordGridConfig$: Observable<IRecordGridConfig>;
    private destroyed$;
    private selectedRow;
    constructor(rxExternalDataService: RxExternalDataService, rxWizardModalComponent: RxWizardModalComponent, translateService: TranslateService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TableSelectionStepComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TableSelectionStepComponent, "ax-table-selection-step", never, { "context": "context"; }, {}, never, never>;
}
