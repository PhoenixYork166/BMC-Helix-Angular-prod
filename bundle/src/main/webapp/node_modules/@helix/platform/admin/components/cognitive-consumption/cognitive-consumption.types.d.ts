import { AdaptChartAxis, AdaptChartHeader, AdaptChartLegend, AdaptChartSeries, AdaptChartSeriesFormat, AdaptStackedChartType } from '@bmc-ux/adapt-charts';
import { IPlainObject } from '@helix/platform/shared/api';
export declare enum ChartGroup {
    Chat = "chat",
    ChatByUser = "chatbyuser",
    Classify = "classify",
    SearchDiskUsage = "searchdiskusage",
    SearchDocumentUsage = "searchdocumentusage",
    Search = "search"
}
export declare enum ChartType {
    Area = "area",
    HorizontalColumn = "horizontal-column"
}
export interface ICognitiveConsumptionChart {
    title: string;
    type: string;
}
export interface ICognitiveConsumptionChartConfig {
    barWidth?: number;
    header: AdaptChartHeader;
    height?: number;
    legend?: AdaptChartLegend;
    series: AdaptChartSeries<IPlainObject>[];
    seriesDisplay?: AdaptChartSeriesFormat;
    showSlider?: boolean;
    slidePointsCount?: number;
    suppressLegend: boolean;
    type?: AdaptStackedChartType;
    width?: number;
    xAxis: AdaptChartAxis;
    yAxis: AdaptChartAxis;
}
export interface ICognitiveConsumptionGroupData {
    capacityName?: string;
    label: string;
    unit: string;
}
export interface ICognitiveConsumptionGroup extends ICognitiveConsumptionGroupData {
    charts: ICognitiveConsumptionChart[];
    id: string;
}
export interface ICognitiveConsumptionNotificationConfig {
    annotations?: any[];
    encoding?: string;
    entity: ICognitiveConsumptionNotificationEntity;
    language?: string;
    mediaType: IPlainObject;
    variant?: IPlainObject;
}
export interface ICognitiveConsumptionNotificationEntity {
    action: string;
    capacity: number;
    disabled?: boolean;
    domain: string;
    emailIds: string[];
    eventStatisticsGuid?: string;
    operation?: string;
    period?: string;
    thresholds: number[];
}
export interface ICognitiveConsumptionNotificationHistory {
    annotations?: any[];
    encoding?: string;
    entity: ICognitiveConsumptionNotificationEntity[];
    language?: string;
    mediaType: IPlainObject;
    variant?: IPlainObject;
}
export interface ICognitiveConsumptionNotificationParams {
    action: string;
    domain: string;
}
export interface ICognitiveConsumptionSection {
    groups: ICognitiveConsumptionGroup[];
    id: string;
    title: string;
}
export interface ICognitiveLicenseUsage {
    endDate: string;
    licenseUsageCount?: ICognitiveLicenseUsageCount[];
    operation: string;
    startDate: string;
}
export interface ICognitiveLicenseUsageCount {
    bundleId: string;
    capacity: number;
    count: IPlainObject;
    countType?: string;
    total: number;
}
export interface ICognitiveLicenseUsageParams {
    countType: string;
    endDate: string;
    startDate: string;
}
