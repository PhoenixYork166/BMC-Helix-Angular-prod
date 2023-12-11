import { OnInit } from '@angular/core';
import { ActiveModalRef, RxDatetimePickerMode, RxDatetimeStruct } from '@bmc-ux/adapt-angular';
import { IPlainObject } from '@helix/platform/shared/api';
import { RxCognitiveConsumptionService } from '../../cognitive-consumption.service';
import { CsvData, RxCsvService, RxFileService, RxUnitService } from '@helix/platform/utils';
import { ICognitiveLicenseUsageParams } from '../../cognitive-consumption.types';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class DownloadReportModalComponent implements OnInit {
    private activeModalRef;
    private rxCognitiveConsumptionService;
    private rxCsvService;
    private rxFileService;
    private rxUnitService;
    translateService: TranslateService;
    customRange: RxDatetimeStruct[];
    modalData: IPlainObject;
    period: string;
    dateTimePickerMode: RxDatetimePickerMode;
    parameters: ICognitiveLicenseUsageParams;
    periodOptions: {
        label: any;
        value: string;
    }[];
    csvData: CsvData;
    constructor(activeModalRef: ActiveModalRef, rxCognitiveConsumptionService: RxCognitiveConsumptionService, rxCsvService: RxCsvService, rxFileService: RxFileService, rxUnitService: RxUnitService, translateService: TranslateService);
    ngOnInit(): void;
    onDownloadClick(): void;
    onCancelClick(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DownloadReportModalComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DownloadReportModalComponent, "rx-download-report-modal", never, {}, {}, never, never>;
}
