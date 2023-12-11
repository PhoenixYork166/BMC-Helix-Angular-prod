import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import { RxRecordInstanceDataPageService } from '@helix/platform/record/api';
import { ColumnConfig } from '@bmc-ux/adapt-table';
import { IImportedDataStatusInfo } from '../data-import.types';
import { RxJsonParserService } from '@helix/platform/utils';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class ImportRecordStatusInfoComponent {
    private datePipe;
    private rxTranslateService;
    private rxJsonParserService;
    private activeModalRef;
    private rxRecordInstanceDataPageService;
    processStartInfo: string;
    fileUploadedNotProcessedMsg: string;
    statusData$: Observable<IImportedDataStatusInfo[]>;
    columns: ColumnConfig[];
    constructor(datePipe: DatePipe, rxTranslateService: TranslateService, rxJsonParserService: RxJsonParserService, activeModalRef: ActiveModalRef, rxRecordInstanceDataPageService: RxRecordInstanceDataPageService);
    close(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ImportRecordStatusInfoComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ImportRecordStatusInfoComponent, "dl-import-record-status-info", never, {}, {}, never, never>;
}
