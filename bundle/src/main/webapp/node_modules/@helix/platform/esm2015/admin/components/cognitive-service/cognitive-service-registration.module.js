import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdaptAccordionModule, AdaptAlertModule, AdaptBusyModule, AdaptButtonModule, AdaptIconModule, AdaptPopoverModule, AdaptRxCheckboxModule, AdaptRxCounterModule, AdaptRxSelectModule, AdaptRxSwitchModule, AdaptRxTextareaModule, AdaptRxTextfieldModule, AdaptRxValidatorsModule, AdaptRxLabelModule } from '@bmc-ux/adapt-angular';
import { AdminSettingsModule } from '@helix/platform/shared/components';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { RxJsonModule } from '@helix/platform/utils';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { CognitiveServiceChatbotComponent } from './components/chatbot/cognitive-service-chatbot.component';
import { CognitiveServiceAdministrationCredentialsComponent } from './components/administration-credentials/cognitive-service-administration-credentials.component';
import { CognitiveServiceConnectionsComponent } from './components/connections/cognitive-service-connections.component';
import { CognitiveServiceOnboardComponent } from './components/onboard/cognitive-service-onboard.component';
import { CognitiveServiceRegionsComponent } from './components/regions/cognitive-service-regions.component';
import { CognitiveServiceSummarizationComponent } from './components/summarization/cognitive-service-summarization.component';
import { CognitiveServiceToneAnalyzerComponent } from './components/tone-analyzer/cognitive-service-tone-analyzer.component';
import { CognitiveServiceAdminComponent } from './cognitive-service.component';
import { RxConnectionTesterModule } from '@helix/platform/ui-kit';
import { TranslateModule } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
import * as i2 from "@bmc-ux/adapt-angular";
export class CognitiveServiceRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        this.rxViewComponentRegistryService.register({
            type: 'rx-admin-cognitive-service',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(CognitiveServiceAdminComponent),
            name: 'Cognitive service',
            isPageComponent: true,
            availableInBundles: [RX_APPLICATION.settingsBundleId]
        });
    }
}
CognitiveServiceRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CognitiveServiceRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
CognitiveServiceRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CognitiveServiceRegistrationModule, declarations: [CognitiveServiceAdminComponent,
        CognitiveServiceAdministrationCredentialsComponent,
        CognitiveServiceChatbotComponent,
        CognitiveServiceConnectionsComponent,
        CognitiveServiceOnboardComponent,
        CognitiveServiceRegionsComponent,
        CognitiveServiceSummarizationComponent,
        CognitiveServiceToneAnalyzerComponent], imports: [AdaptAccordionModule, i2.AdaptAlertModule, AdaptBusyModule,
        AdaptButtonModule,
        AdaptIconModule,
        AdaptPopoverModule,
        AdaptRxCheckboxModule,
        AdaptRxCounterModule,
        AdaptRxSelectModule,
        AdaptRxSwitchModule,
        AdaptRxTextareaModule,
        AdaptRxTextfieldModule,
        AdaptRxValidatorsModule,
        AdminSettingsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RxConnectionTesterModule,
        RxJsonModule,
        TranslateModule,
        AdaptRxLabelModule] });
CognitiveServiceRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CognitiveServiceRegistrationModule, imports: [[
            AdaptAccordionModule,
            AdaptAlertModule.forRoot(),
            AdaptBusyModule,
            AdaptButtonModule,
            AdaptIconModule,
            AdaptPopoverModule,
            AdaptRxCheckboxModule,
            AdaptRxCounterModule,
            AdaptRxSelectModule,
            AdaptRxSwitchModule,
            AdaptRxTextareaModule,
            AdaptRxTextfieldModule,
            AdaptRxValidatorsModule,
            AdminSettingsModule,
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            RxConnectionTesterModule,
            RxJsonModule,
            TranslateModule,
            AdaptRxLabelModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CognitiveServiceRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        CognitiveServiceAdminComponent,
                        CognitiveServiceAdministrationCredentialsComponent,
                        CognitiveServiceChatbotComponent,
                        CognitiveServiceConnectionsComponent,
                        CognitiveServiceOnboardComponent,
                        CognitiveServiceRegionsComponent,
                        CognitiveServiceSummarizationComponent,
                        CognitiveServiceToneAnalyzerComponent
                    ],
                    imports: [
                        AdaptAccordionModule,
                        AdaptAlertModule.forRoot(),
                        AdaptBusyModule,
                        AdaptButtonModule,
                        AdaptIconModule,
                        AdaptPopoverModule,
                        AdaptRxCheckboxModule,
                        AdaptRxCounterModule,
                        AdaptRxSelectModule,
                        AdaptRxSwitchModule,
                        AdaptRxTextareaModule,
                        AdaptRxTextfieldModule,
                        AdaptRxValidatorsModule,
                        AdminSettingsModule,
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        RxConnectionTesterModule,
                        RxJsonModule,
                        TranslateModule,
                        AdaptRxLabelModule
                    ],
                    entryComponents: [CognitiveServiceAdminComponent, CognitiveServiceOnboardComponent]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=cognitive-service-registration.module.js.map