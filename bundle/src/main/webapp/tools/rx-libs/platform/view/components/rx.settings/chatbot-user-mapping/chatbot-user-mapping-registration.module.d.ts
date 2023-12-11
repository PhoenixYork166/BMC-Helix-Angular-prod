import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./chatbot-user-mapping.component";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
import * as i5 from "@ngx-translate/core";
/**
 * This component is used by Chatbot to map users from a third party channel
 * as Slack, Skype for Enterprise to their Innovation Studio account.
 * Backend sends a link in Slack for example and when the user clicks on it,
 * a page on the rx.settings bundle will be displayed, leveraging this view component:
 * http://localhost:4200/helix/index.html#/com.bmc.arsys.rx.settings/view/com.bmc.arsys.rx.settings:BMCCloudVerification?encryptedChatUserAndChatId=12345&chatbotProvider=slack
 */
export declare class ChatbotUserMappingRegistrationModule {
    private componentFactoryResolver;
    private rxViewComponentRegistryService;
    constructor(componentFactoryResolver: ComponentFactoryResolver, rxViewComponentRegistryService: RxViewComponentRegistryService);
    static ɵfac: i0.ɵɵFactoryDeclaration<ChatbotUserMappingRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ChatbotUserMappingRegistrationModule, [typeof i1.ChatbotUserMappingComponent], [typeof i2.AdaptButtonModule, typeof i3.CommonModule, typeof i4.FormsModule, typeof i5.TranslateModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ChatbotUserMappingRegistrationModule>;
}
