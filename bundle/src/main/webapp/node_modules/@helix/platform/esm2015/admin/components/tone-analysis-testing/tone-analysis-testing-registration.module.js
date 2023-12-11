import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdaptBadgeModule, AdaptButtonModule, AdaptRxCheckboxModule, AdaptRxCounterModule, AdaptRxLabelModule, AdaptRxSelectModule, AdaptRxSwitchModule, AdaptRxTextareaModule, AdaptTabsModule } from '@bmc-ux/adapt-angular';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { AdminSettingsModule } from '@helix/platform/shared/components';
import { DocumentToneAnalysisComponent } from './document-tone-analysis/document-tone-analysis.component';
import { ToneAnalysisTestingAdminComponent } from './tone-analysis-testing.component';
import { UserEngagementToneAnalysisComponent } from './user-engagement-tone-analysis/user-engagement-tone-analysis.component';
import { TranslateModule } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class ToneAnalysisTestingRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: 'rx-admin-tone-analysis-testing',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(ToneAnalysisTestingAdminComponent),
            name: 'Tone analysis testing',
            isPageComponent: true,
            availableInBundles: [RX_APPLICATION.settingsBundleId]
        });
    }
}
ToneAnalysisTestingRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ToneAnalysisTestingRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
ToneAnalysisTestingRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ToneAnalysisTestingRegistrationModule, declarations: [ToneAnalysisTestingAdminComponent, DocumentToneAnalysisComponent, UserEngagementToneAnalysisComponent], imports: [AdminSettingsModule,
        AdaptTabsModule,
        AdaptRxSelectModule,
        AdaptRxCheckboxModule,
        AdaptRxTextareaModule,
        AdaptRxTextareaModule,
        AdaptRxLabelModule,
        AdaptRxCounterModule,
        AdaptButtonModule,
        AdaptRxSwitchModule,
        AdaptBadgeModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule] });
ToneAnalysisTestingRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ToneAnalysisTestingRegistrationModule, imports: [[
            AdminSettingsModule,
            AdaptTabsModule,
            AdaptRxSelectModule,
            AdaptRxCheckboxModule,
            AdaptRxTextareaModule,
            AdaptRxTextareaModule,
            AdaptRxLabelModule,
            AdaptRxCounterModule,
            AdaptButtonModule,
            AdaptRxSwitchModule,
            AdaptBadgeModule,
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ToneAnalysisTestingRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ToneAnalysisTestingAdminComponent, DocumentToneAnalysisComponent, UserEngagementToneAnalysisComponent],
                    imports: [
                        AdminSettingsModule,
                        AdaptTabsModule,
                        AdaptRxSelectModule,
                        AdaptRxCheckboxModule,
                        AdaptRxTextareaModule,
                        AdaptRxTextareaModule,
                        AdaptRxLabelModule,
                        AdaptRxCounterModule,
                        AdaptButtonModule,
                        AdaptRxSwitchModule,
                        AdaptBadgeModule,
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        TranslateModule
                    ],
                    entryComponents: [ToneAnalysisTestingAdminComponent]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=tone-analysis-testing-registration.module.js.map