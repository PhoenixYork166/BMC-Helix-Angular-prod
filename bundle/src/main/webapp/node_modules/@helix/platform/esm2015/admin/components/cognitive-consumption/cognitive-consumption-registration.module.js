import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdaptButtonModule, AdaptEmptyStateModule, AdaptModalModule, AdaptRxCounterModule, AdaptRxDatetimeModule, AdaptRxListBuilderModule, AdaptRxRadiobuttonModule } from '@bmc-ux/adapt-angular';
import { AdaptChartsModule } from '@bmc-ux/adapt-charts';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { RxBusyIndicatorModule, RxDirectivesModule } from '@helix/platform/ui-kit';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { RecordGridModule } from '@helix/platform/view/components';
import { AdminSettingsModule } from '@helix/platform/shared/components';
import { CognitiveConsumptionAdminComponent } from './cognitive-consumption.component';
import { CognitiveConsumptionChartComponent } from './components/cognitive-consumption-chart/cognitive-consumption-chart.component';
import { CognitiveConsumptionGroupComponent } from './components/cognitive-consumption-group/cognitive-consumption-group.component';
import { CognitiveConsumptionNotificationHistoryModalComponent } from './components/cognitive-consumption-notification-history-modal/cognitive-consumption-notification-history-modal.component';
import { CognitiveConsumptionNotificationModalComponent } from './components/cognitive-consumption-notification-modal/cognitive-consumption-notification-modal.component';
import { DownloadReportModalComponent } from './components/download-report-modal/download-report-modal.component';
import { TranslateModule } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class CognitiveConsumptionRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: 'rx-admin-cognitive-consumption',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(CognitiveConsumptionAdminComponent),
            name: 'Cognitive consumption',
            isPageComponent: true,
            availableInBundles: [RX_APPLICATION.settingsBundleId]
        });
    }
}
CognitiveConsumptionRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CognitiveConsumptionRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
CognitiveConsumptionRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CognitiveConsumptionRegistrationModule, declarations: [CognitiveConsumptionAdminComponent,
        CognitiveConsumptionChartComponent,
        CognitiveConsumptionGroupComponent,
        CognitiveConsumptionNotificationHistoryModalComponent,
        CognitiveConsumptionNotificationModalComponent,
        DownloadReportModalComponent], imports: [AdaptButtonModule,
        AdaptChartsModule,
        AdaptEmptyStateModule,
        AdaptModalModule,
        AdaptRxCounterModule,
        AdaptRxDatetimeModule,
        AdaptRxListBuilderModule,
        AdaptRxRadiobuttonModule,
        AdminSettingsModule,
        CommonModule,
        RecordGridModule,
        RxBusyIndicatorModule,
        RxDirectivesModule,
        FormsModule,
        TranslateModule] });
CognitiveConsumptionRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CognitiveConsumptionRegistrationModule, imports: [[
            AdaptButtonModule,
            AdaptChartsModule,
            AdaptEmptyStateModule,
            AdaptModalModule,
            AdaptRxCounterModule,
            AdaptRxDatetimeModule,
            AdaptRxListBuilderModule,
            AdaptRxRadiobuttonModule,
            AdminSettingsModule,
            CommonModule,
            RecordGridModule,
            RxBusyIndicatorModule,
            RxDirectivesModule,
            FormsModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CognitiveConsumptionRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        CognitiveConsumptionAdminComponent,
                        CognitiveConsumptionChartComponent,
                        CognitiveConsumptionGroupComponent,
                        CognitiveConsumptionNotificationHistoryModalComponent,
                        CognitiveConsumptionNotificationModalComponent,
                        DownloadReportModalComponent
                    ],
                    imports: [
                        AdaptButtonModule,
                        AdaptChartsModule,
                        AdaptEmptyStateModule,
                        AdaptModalModule,
                        AdaptRxCounterModule,
                        AdaptRxDatetimeModule,
                        AdaptRxListBuilderModule,
                        AdaptRxRadiobuttonModule,
                        AdminSettingsModule,
                        CommonModule,
                        RecordGridModule,
                        RxBusyIndicatorModule,
                        RxDirectivesModule,
                        FormsModule,
                        TranslateModule
                    ],
                    entryComponents: [
                        CognitiveConsumptionAdminComponent,
                        CognitiveConsumptionNotificationHistoryModalComponent,
                        CognitiveConsumptionNotificationModalComponent,
                        DownloadReportModalComponent
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=cognitive-consumption-registration.module.js.map