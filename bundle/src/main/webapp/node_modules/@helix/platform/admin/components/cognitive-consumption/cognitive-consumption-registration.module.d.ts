import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./cognitive-consumption.component";
import * as i2 from "./components/cognitive-consumption-chart/cognitive-consumption-chart.component";
import * as i3 from "./components/cognitive-consumption-group/cognitive-consumption-group.component";
import * as i4 from "./components/cognitive-consumption-notification-history-modal/cognitive-consumption-notification-history-modal.component";
import * as i5 from "./components/cognitive-consumption-notification-modal/cognitive-consumption-notification-modal.component";
import * as i6 from "./components/download-report-modal/download-report-modal.component";
import * as i7 from "@bmc-ux/adapt-angular";
import * as i8 from "@bmc-ux/adapt-charts";
import * as i9 from "@helix/platform/shared/components";
import * as i10 from "@angular/common";
import * as i11 from "@helix/platform/view/components";
import * as i12 from "@helix/platform/ui-kit";
import * as i13 from "@angular/forms";
import * as i14 from "@ngx-translate/core";
export declare class CognitiveConsumptionRegistrationModule {
    private componentFactoryResolver;
    private rxViewComponentRegistryService;
    constructor(componentFactoryResolver: ComponentFactoryResolver, rxViewComponentRegistryService: RxViewComponentRegistryService);
    static ɵfac: i0.ɵɵFactoryDeclaration<CognitiveConsumptionRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<CognitiveConsumptionRegistrationModule, [typeof i1.CognitiveConsumptionAdminComponent, typeof i2.CognitiveConsumptionChartComponent, typeof i3.CognitiveConsumptionGroupComponent, typeof i4.CognitiveConsumptionNotificationHistoryModalComponent, typeof i5.CognitiveConsumptionNotificationModalComponent, typeof i6.DownloadReportModalComponent], [typeof i7.AdaptButtonModule, typeof i8.AdaptChartsModule, typeof i7.AdaptEmptyStateModule, typeof i7.AdaptModalModule, typeof i7.AdaptRxCounterModule, typeof i7.AdaptRxDatetimeModule, typeof i7.AdaptRxListBuilderModule, typeof i7.AdaptRxRadiobuttonModule, typeof i9.AdminSettingsModule, typeof i10.CommonModule, typeof i11.RecordGridModule, typeof i12.RxBusyIndicatorModule, typeof i12.RxDirectivesModule, typeof i13.FormsModule, typeof i14.TranslateModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<CognitiveConsumptionRegistrationModule>;
}
