import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdaptButtonModule } from '@bmc-ux/adapt-angular';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { TranslateModule } from '@ngx-translate/core';
import { ChatbotUserMappingComponent } from './chatbot-user-mapping.component';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
/**
 * This component is used by Chatbot to map users from a third party channel
 * as Slack, Skype for Enterprise to their Innovation Studio account.
 * Backend sends a link in Slack for example and when the user clicks on it,
 * a page on the rx.settings bundle will be displayed, leveraging this view component:
 * http://localhost:4200/helix/index.html#/com.bmc.arsys.rx.settings/view/com.bmc.arsys.rx.settings:BMCCloudVerification?encryptedChatUserAndChatId=12345&chatbotProvider=slack
 */
export class ChatbotUserMappingRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            // This is for retro compatibility to reuse the same view "com.bmc.arsys.rx.settings:BMCCloudVerification".
            type: 'com-bmc-arsys-rx-user-mapping',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(ChatbotUserMappingComponent),
            name: 'Chatbot User Mapping',
            availableInBundles: [RX_APPLICATION.settingsBundleId],
            hidden: true,
            properties: [
                {
                    name: 'encryptedChatUserAndChatId',
                    enableExpressionEvaluation: true
                },
                {
                    name: 'chatbotProvider',
                    enableExpressionEvaluation: true
                }
            ]
        });
    }
}
ChatbotUserMappingRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ChatbotUserMappingRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
ChatbotUserMappingRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ChatbotUserMappingRegistrationModule, declarations: [ChatbotUserMappingComponent], imports: [AdaptButtonModule, CommonModule, FormsModule, TranslateModule] });
ChatbotUserMappingRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ChatbotUserMappingRegistrationModule, imports: [[AdaptButtonModule, CommonModule, FormsModule, TranslateModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ChatbotUserMappingRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ChatbotUserMappingComponent],
                    imports: [AdaptButtonModule, CommonModule, FormsModule, TranslateModule],
                    entryComponents: [ChatbotUserMappingComponent]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=chatbot-user-mapping-registration.module.js.map