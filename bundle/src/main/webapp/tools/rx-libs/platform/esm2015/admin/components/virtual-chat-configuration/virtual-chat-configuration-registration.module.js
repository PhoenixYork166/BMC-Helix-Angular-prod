import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { VirtualChatConfigurationAdminComponent } from './virtual-chat-configuration.component';
import { AdminSettingsModule } from '@helix/platform/shared/components';
import { AdaptAccordionModule, AdaptButtonModule, AdaptRxTextfieldModule } from '@bmc-ux/adapt-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { RxConnectionTesterModule } from '@helix/platform/ui-kit';
import { TranslateModule } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class VirtualChatConfigurationRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: 'rx-admin-virtual-chat-configuration',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(VirtualChatConfigurationAdminComponent),
            name: 'Virtual Chat configuration',
            isPageComponent: true,
            availableInBundles: [RX_APPLICATION.settingsBundleId]
        });
    }
}
VirtualChatConfigurationRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: VirtualChatConfigurationRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
VirtualChatConfigurationRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: VirtualChatConfigurationRegistrationModule, declarations: [VirtualChatConfigurationAdminComponent], imports: [AdaptAccordionModule,
        AdaptButtonModule,
        AdaptRxTextfieldModule,
        AdminSettingsModule,
        CommonModule,
        ReactiveFormsModule,
        RxConnectionTesterModule,
        TranslateModule] });
VirtualChatConfigurationRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: VirtualChatConfigurationRegistrationModule, imports: [[
            AdaptAccordionModule,
            AdaptButtonModule,
            AdaptRxTextfieldModule,
            AdminSettingsModule,
            CommonModule,
            ReactiveFormsModule,
            RxConnectionTesterModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: VirtualChatConfigurationRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [VirtualChatConfigurationAdminComponent],
                    imports: [
                        AdaptAccordionModule,
                        AdaptButtonModule,
                        AdaptRxTextfieldModule,
                        AdminSettingsModule,
                        CommonModule,
                        ReactiveFormsModule,
                        RxConnectionTesterModule,
                        TranslateModule
                    ],
                    entryComponents: [VirtualChatConfigurationAdminComponent]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=virtual-chat-configuration-registration.module.js.map