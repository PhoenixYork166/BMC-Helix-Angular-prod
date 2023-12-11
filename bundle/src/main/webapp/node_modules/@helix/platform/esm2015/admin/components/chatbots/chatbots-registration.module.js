import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdaptAccordionModule, AdaptButtonModule, AdaptIconModule, AdaptRxSwitchModule } from '@bmc-ux/adapt-angular';
import { AdminSettingsModule } from '@helix/platform/shared/components';
import { RX_APPLICATION, RxDefinitionModule } from '@helix/platform/shared/api';
import { RecordGridModule } from '@helix/platform/view/components';
import { RxDirectivesModule } from '@helix/platform/ui-kit';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { TranslateModule } from '@ngx-translate/core';
import { ChatbotsAdminComponent } from './chatbots.component';
import { RenameDefinitionModalModule } from '@helix/platform/shared/components';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class ChatbotsRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: 'rx-admin-chatbots',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(ChatbotsAdminComponent),
            name: 'Chatbots',
            isPageComponent: true,
            availableInBundles: [RX_APPLICATION.settingsBundleId]
        });
    }
}
ChatbotsRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ChatbotsRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
ChatbotsRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ChatbotsRegistrationModule, declarations: [ChatbotsAdminComponent], imports: [AdaptAccordionModule,
        AdaptButtonModule,
        AdaptIconModule,
        AdaptRxSwitchModule,
        AdminSettingsModule,
        CommonModule,
        FormsModule,
        RecordGridModule,
        RenameDefinitionModalModule,
        RxDefinitionModule,
        RxDirectivesModule,
        TranslateModule] });
ChatbotsRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ChatbotsRegistrationModule, imports: [[
            AdaptAccordionModule,
            AdaptButtonModule,
            AdaptIconModule,
            AdaptRxSwitchModule,
            AdminSettingsModule,
            CommonModule,
            FormsModule,
            RecordGridModule,
            RenameDefinitionModalModule,
            RxDefinitionModule,
            RxDirectivesModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ChatbotsRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ChatbotsAdminComponent],
                    imports: [
                        AdaptAccordionModule,
                        AdaptButtonModule,
                        AdaptIconModule,
                        AdaptRxSwitchModule,
                        AdminSettingsModule,
                        CommonModule,
                        FormsModule,
                        RecordGridModule,
                        RenameDefinitionModalModule,
                        RxDefinitionModule,
                        RxDirectivesModule,
                        TranslateModule
                    ],
                    entryComponents: [ChatbotsAdminComponent]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=chatbots-registration.module.js.map