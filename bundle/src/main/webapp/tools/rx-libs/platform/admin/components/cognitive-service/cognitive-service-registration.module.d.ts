import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./cognitive-service.component";
import * as i2 from "./components/administration-credentials/cognitive-service-administration-credentials.component";
import * as i3 from "./components/chatbot/cognitive-service-chatbot.component";
import * as i4 from "./components/connections/cognitive-service-connections.component";
import * as i5 from "./components/onboard/cognitive-service-onboard.component";
import * as i6 from "./components/regions/cognitive-service-regions.component";
import * as i7 from "./components/summarization/cognitive-service-summarization.component";
import * as i8 from "./components/tone-analyzer/cognitive-service-tone-analyzer.component";
import * as i9 from "@bmc-ux/adapt-angular";
import * as i10 from "@helix/platform/shared/components";
import * as i11 from "@angular/common";
import * as i12 from "@angular/forms";
import * as i13 from "@helix/platform/ui-kit";
import * as i14 from "@helix/platform/utils";
import * as i15 from "@ngx-translate/core";
export declare class CognitiveServiceRegistrationModule {
    private componentFactoryResolver;
    private rxViewComponentRegistryService;
    constructor(componentFactoryResolver: ComponentFactoryResolver, rxViewComponentRegistryService: RxViewComponentRegistryService);
    static ɵfac: i0.ɵɵFactoryDeclaration<CognitiveServiceRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<CognitiveServiceRegistrationModule, [typeof i1.CognitiveServiceAdminComponent, typeof i2.CognitiveServiceAdministrationCredentialsComponent, typeof i3.CognitiveServiceChatbotComponent, typeof i4.CognitiveServiceConnectionsComponent, typeof i5.CognitiveServiceOnboardComponent, typeof i6.CognitiveServiceRegionsComponent, typeof i7.CognitiveServiceSummarizationComponent, typeof i8.CognitiveServiceToneAnalyzerComponent], [typeof i9.AdaptAccordionModule, typeof i9.AdaptAlertModule, typeof i9.AdaptBusyModule, typeof i9.AdaptButtonModule, typeof i9.AdaptIconModule, typeof i9.AdaptPopoverModule, typeof i9.AdaptRxCheckboxModule, typeof i9.AdaptRxCounterModule, typeof i9.AdaptRxSelectModule, typeof i9.AdaptRxSwitchModule, typeof i9.AdaptRxTextareaModule, typeof i9.AdaptRxTextfieldModule, typeof i9.AdaptRxValidatorsModule, typeof i10.AdminSettingsModule, typeof i11.CommonModule, typeof i12.FormsModule, typeof i12.ReactiveFormsModule, typeof i13.RxConnectionTesterModule, typeof i14.RxJsonModule, typeof i15.TranslateModule, typeof i9.AdaptRxLabelModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<CognitiveServiceRegistrationModule>;
}
