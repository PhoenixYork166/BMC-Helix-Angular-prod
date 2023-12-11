import { Observable } from 'rxjs';
import { IExportedDataStatusInfo } from '../data-export.types';
import { RxRecordInstanceDataPageService } from '@helix/platform/record/api';
import { ColumnConfig } from '@bmc-ux/adapt-table';
import { DatePipe } from '@angular/common';
import { RxJsonParserService } from '@helix/platform/utils';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class ExportRecordStatusInfoComponent {
    private datePipe;
    private rxTranslateService;
    private rxJsonParserService;
    private activeModalRef;
    private rxRecordInstanceDataPageService;
    processStartInfo: string;
    exportConfiguredNotProcessedMsg: string;
    statusData$: Observable<IExportedDataStatusInfo[]>;
    columns: ColumnConfig[];
    constructor(datePipe: DatePipe, rxTranslateService: TranslateService, rxJsonParserService: RxJsonParserService, activeModalRef: ActiveModalRef, rxRecordInstanceDataPageService: RxRecordInstanceDataPageService);
    close(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ExportRecordStatusInfoComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ExportRecordStatusInfoComponent, "dl-export-record-status-info", never, {}, {}, never, never>;
}
