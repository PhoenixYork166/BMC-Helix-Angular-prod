import { OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { RxSelectOption } from '@bmc-ux/adapt-angular';
import { RxWizardModalComponent } from '@helix/platform/shared/components';
import { IRowDataItem } from '@helix/platform/view/api';
import { IRecordGridConfig, RecordGridComponent } from '@helix/platform/view/components';
import { RxExternalDataService } from '../../../services/external-data/external-data.service';
import { IExternalRecordWizardContext } from '../external-record-wizard.types';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class RecordIdFieldsStepComponent implements OnDestroy, OnInit {
    private rxExternalDataService;
    private rxWizardModalComponent;
    private translateService;
    context: IExternalRecordWizardContext;
    recordIdFieldsStepRecordGrid: RecordGridComponent;
    externalColumnCellTemplate: TemplateRef<any>;
    externalColumnIdCellTemplate: TemplateRef<any>;
    externalColumns: RxSelectOption[];
    externalColumnIds: RxSelectOption[];
    recordIdFieldsRecordGridConfig$: Observable<IRecordGridConfig>;
    sectionLabel: string;
    sectionInfoLabel: string;
    sectionInfoTooltip: string;
    private internalFieldsForMapping;
    private rawExternalColumns;
    private gridRowsData;
    private destroyed$;
    constructor(rxExternalDataService: RxExternalDataService, rxWizardModalComponent: RxWizardModalComponent, translateService: TranslateService);
    ngOnInit(): void;
    externalColumnOptionFormatter: (externalColumnOption: RxSelectOption) => string;
    externalColumnIdOptionFormatter: (externalColumnOption: RxSelectOption) => string;
    onExternalColumnChange(rowDataItem: IRowDataItem): void;
    ngOnDestroy(): void;
    private setGridRowsData;
    static ɵfac: i0.ɵɵFactoryDeclaration<RecordIdFieldsStepComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RecordIdFieldsStepComponent, "ax-record-id-fields-step", never, { "context": "context"; }, {}, never, never>;
}