import { Component, Input } from '@angular/core';
import { assign, constant, defaults, flow, forEach, head, keys, last, map, mapValues, reduce, split } from 'lodash';
import moment from 'moment-es6';
import { RX_SIZE_UNITS, RxStringService, RxUnitService } from '@helix/platform/utils';
import { ChartType } from '../../cognitive-consumption.types';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/utils";
import * as i2 from "@ngx-translate/core";
import * as i3 from "@bmc-ux/adapt-charts";
import * as i4 from "@angular/common";
export class CognitiveConsumptionChartComponent {
    constructor(rxStringService, rxUnitService, translateService) {
        this.rxStringService = rxStringService;
        this.rxUnitService = rxUnitService;
        this.translateService = translateService;
        this.areaChartType = ChartType.Area;
        this.horizontalColumnChartType = ChartType.HorizontalColumn;
    }
    ngOnInit() {
        this.chartConfig = {
            height: 400,
            width: 500,
            header: {
                title: this.translateService.instant(this.chart.title),
                allowHideLegend: true
            },
            suppressLegend: this.isCapacityAvailable(),
            xAxis: {
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-consumption.x-axis-months.title'),
                categories: []
            },
            yAxis: {
                title: `${this.translateService.instant(this.groupData.label)} (${this.groupData.unit})`
            },
            series: []
        };
        if (this.chart.type === ChartType.HorizontalColumn) {
            assign(this.chartConfig, {
                type: 'column',
                seriesDisplay: 'horizontal',
                showSlider: true,
                slidePointsCount: 3
            });
            const defaultCount = flow((licenceUsage) => map(licenceUsage, 'count'), (countData) => reduce(countData, assign, {}), (countData) => mapValues(countData, constant(0)))(this.licenceUsageCount);
            forEach(this.licenceUsageCount, (item) => {
                defaults(item.count, defaultCount);
            });
        }
        forEach(this.licenceUsageCount, (item) => {
            const name = this.groupData.capacityName || this.rxStringService.prettify(last(split(item.bundleId, '.')));
            const data = map(item.count, (key, value) => {
                let result;
                const countValue = this.groupData.unit === RX_SIZE_UNITS.gigabytes.unit
                    ? this.rxUnitService.getValueWithoutUnitsByUnitType(key, RX_SIZE_UNITS.gigabytes.unit)
                    : key;
                if (this.chart.type === ChartType.Area) {
                    result = {
                        x: moment(value).valueOf(),
                        y: countValue
                    };
                }
                else {
                    result = countValue;
                }
                return result;
            });
            this.chartConfig.series.push({
                name,
                data
            });
        });
        const firstLicenceUsageCount = head(this.licenceUsageCount);
        this.chartConfig.xAxis.categories = map(keys(firstLicenceUsageCount.count), (key) => {
            return moment(key).format('MMM YYYY');
        });
        if (this.isCapacityAvailable()) {
            this.capacity = {
                title: `Capacity (${this.groupData.unit})`,
                value: this.groupData.unit === RX_SIZE_UNITS.gigabytes.unit
                    ? this.rxUnitService.getValueWithoutUnitsByUnitType(firstLicenceUsageCount.capacity, RX_SIZE_UNITS.gigabytes.unit)
                    : firstLicenceUsageCount.capacity
            };
        }
    }
    formatXAxisVal(xValue) {
        return moment(xValue).format('MMM YYYY');
    }
    isCapacityAvailable() {
        return Boolean(this.groupData.capacityName);
    }
}
CognitiveConsumptionChartComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CognitiveConsumptionChartComponent, deps: [{ token: i1.RxStringService }, { token: i1.RxUnitService }, { token: i2.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
CognitiveConsumptionChartComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: CognitiveConsumptionChartComponent, selector: "rx-cognitive-consumption-chart", inputs: { chart: "chart", groupData: "groupData", licenceUsageCount: "licenceUsageCount" }, ngImport: i0, template: "<ng-container [ngSwitch]=\"chart.type\">\n  <adapt-stacked-chart\n    *ngSwitchCase=\"horizontalColumnChartType\"\n    [header]=\"chartConfig.header\"\n    [height]=\"chartConfig.height\"\n    [width]=\"chartConfig.width\"\n    [xAxis]=\"chartConfig.xAxis\"\n    [yAxis]=\"chartConfig.yAxis\"\n    [series]=\"chartConfig.series\"\n    [tooltip]=\"horizontalColumnChartTooltip\"\n    [type]=\"chartConfig.type\"\n    [showSlider]=\"chartConfig.showSlider\"\n    [slidePointsCount]=\"chartConfig.slidePointsCount\"\n    [seriesDisplay]=\"chartConfig.seriesDisplay\"\n    [suppressLegend]=\"chartConfig.suppressLegend\"\n    [thresholdLine]=\"isCapacityAvailable() ? capacity.value : null\"\n  >\n  </adapt-stacked-chart>\n\n  <adapt-area-graph\n    *ngSwitchCase=\"areaChartType\"\n    [header]=\"chartConfig.header\"\n    [height]=\"chartConfig.height\"\n    [width]=\"chartConfig.width\"\n    [xAxis]=\"chartConfig.xAxis\"\n    [yAxis]=\"chartConfig.yAxis\"\n    [series]=\"chartConfig.series\"\n    [tooltip]=\"areaChartTooltip\"\n    [suppressLegend]=\"chartConfig.suppressLegend\"\n    [thresholdLine]=\"isCapacityAvailable() ? capacity.value : null\"\n  >\n  </adapt-area-graph>\n</ng-container>\n\n<ng-template #horizontalColumnChartTooltip let-data=\"data\">\n  <div>\n    <span class=\"chart-tooltip-color-spot\" [style.background]=\"data?.color\"></span>\n    <span class=\"chart-tooltip-category\">{{ data.category }}</span>\n  </div>\n\n  <div>\n    {{ chartConfig.yAxis.title }}:\n    <span class=\"font-weight-semibold\">{{ data.value }}</span>\n  </div>\n\n  <div *ngIf=\"capacity\">\n    {{ capacity.title }}:\n    <span class=\"font-weight-semibold\">{{ capacity.value }}</span>\n  </div>\n</ng-template>\n\n<ng-template #areaChartTooltip let-data=\"data\">\n  <div>\n    <span class=\"chart-tooltip-color-spot\" [style.background]=\"data?.color\"></span>\n    <span class=\"chart-tooltip-category\">{{ data.category }}</span>\n  </div>\n\n  <div>\n    {{ chartConfig.xAxis.title }}:\n    <span class=\"font-weight-semibold\">{{ formatXAxisVal(data.xValue) }}</span>\n  </div>\n\n  <div>\n    {{ chartConfig.yAxis.title }}:\n    <span class=\"font-weight-semibold\">{{ data.yValue }}</span>\n  </div>\n\n  <div *ngIf=\"capacity\">\n    {{ capacity.title }}:\n    <span class=\"font-weight-semibold\">{{ capacity.value }}</span>\n  </div>\n</ng-template>\n", components: [{ type: i3.AdaptStackedChartComponent, selector: "adapt-stacked-chart", inputs: ["backgroundColor", "width", "height", "header", "suppressHeader", "suppressLegend", "tooltip", "dataBuilder", "type", "xAxis", "yAxis", "showSlider", "hasTotalLabels", "seriesDisplay", "totalLabelTextFormatter", "barWidth", "slidePointsCount", "hideAxises", "rotateXAxis", "xAxisTickFormatResolver", "scientificMode", "renderLegend", "thresholdLine", "showEmptyColIndicator", "series", "legend"], outputs: ["clickChart", "categoryShow", "categoryHide"] }, { type: i3.AdaptAreaGraphComponent, selector: "adapt-area-graph", inputs: ["formatXAxisValue", "getTooltipXValueTitle"], outputs: ["categoryShow", "categoryHide"] }], directives: [{ type: i4.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i4.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CognitiveConsumptionChartComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-cognitive-consumption-chart',
                    templateUrl: './cognitive-consumption-chart.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxStringService }, { type: i1.RxUnitService }, { type: i2.TranslateService }]; }, propDecorators: { chart: [{
                type: Input
            }], groupData: [{
                type: Input
            }], licenceUsageCount: [{
                type: Input
            }] } });
//# sourceMappingURL=cognitive-consumption-chart.component.js.map