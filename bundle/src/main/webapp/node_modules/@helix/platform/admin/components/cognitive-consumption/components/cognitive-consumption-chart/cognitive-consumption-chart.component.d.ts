import { OnInit } from '@angular/core';
import { IPlainObject } from '@helix/platform/shared/api';
import { RxStringService, RxUnitService } from '@helix/platform/utils';
import { ChartType, ICognitiveConsumptionChart, ICognitiveConsumptionChartConfig, ICognitiveConsumptionGroupData, ICognitiveLicenseUsageCount } from '../../cognitive-consumption.types';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class CognitiveConsumptionChartComponent implements OnInit {
    private rxStringService;
    private rxUnitService;
    private translateService;
    chart: ICognitiveConsumptionChart;
    groupData: ICognitiveConsumptionGroupData;
    licenceUsageCount: ICognitiveLicenseUsageCount[];
    capacity: IPlainObject;
    chartConfig: ICognitiveConsumptionChartConfig;
    areaChartType: ChartType;
    horizontalColumnChartType: ChartType;
    constructor(rxStringService: RxStringService, rxUnitService: RxUnitService, translateService: TranslateService);
    ngOnInit(): void;
    formatXAxisVal(xValue: any): string;
    isCapacityAvailable(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<CognitiveConsumptionChartComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CognitiveConsumptionChartComponent, "rx-cognitive-consumption-chart", never, { "chart": "chart"; "groupData": "groupData"; "licenceUsageCount": "licenceUsageCount"; }, {}, never, never>;
}
