import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { IssueReportingConfigurationAdminComponent } from './issue-reporting-configuration.component';
import { AdminSettingsModule } from '@helix/platform/shared/components';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AdaptAccordionModule, AdaptAlertModule, AdaptButtonModule, AdaptIconModule, AdaptRxTextfieldModule } from '@bmc-ux/adapt-angular';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class IssueReportingConfigurationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: 'rx-admin-issue-reporting-configuration',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(IssueReportingConfigurationAdminComponent),
            name: 'Issue reporting configuration',
            isPageComponent: true,
            availableInBundles: [RX_APPLICATION.settingsBundleId]
        });
    }
}
IssueReportingConfigurationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IssueReportingConfigurationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
IssueReportingConfigurationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IssueReportingConfigurationModule, declarations: [IssueReportingConfigurationAdminComponent], imports: [AdaptAccordionModule,
        AdaptAlertModule,
        AdaptButtonModule,
        AdaptIconModule,
        AdaptRxTextfieldModule,
        AdminSettingsModule,
        CommonModule,
        ReactiveFormsModule,
        TranslateModule] });
IssueReportingConfigurationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IssueReportingConfigurationModule, imports: [[
            AdaptAccordionModule,
            AdaptAlertModule,
            AdaptButtonModule,
            AdaptIconModule,
            AdaptRxTextfieldModule,
            AdminSettingsModule,
            CommonModule,
            ReactiveFormsModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IssueReportingConfigurationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AdaptAccordionModule,
                        AdaptAlertModule,
                        AdaptButtonModule,
                        AdaptIconModule,
                        AdaptRxTextfieldModule,
                        AdminSettingsModule,
                        CommonModule,
                        ReactiveFormsModule,
                        TranslateModule
                    ],
                    declarations: [IssueReportingConfigurationAdminComponent],
                    entryComponents: [IssueReportingConfigurationAdminComponent]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=issue-reporting-configuration-registration.module.js.map