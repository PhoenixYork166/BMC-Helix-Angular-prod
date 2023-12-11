import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { IframeLoginEventComponent } from './iframe-login-event.component';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
/**
 * This component is used by view-loader.js script when the login cannot be achieved
 * in an iFrame (for example with Microsoft IDP).
 * In this case view-loader.js loads a view in a window popup that will require the user
 * to log in. Once the user is logged in, this View Component will send a PostMessage to
 * view-loader.js that will close the popup.
 */
export class IframeLoginEventRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            // This is for retro compatibility to reuse the same view "com.bmc.arsys.rx.settings:BMCLoginVerification".
            type: 'com-bmc-arsys-rx-settings-iframe-login-event',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(IframeLoginEventComponent),
            name: 'IFrame Login Event',
            availableInBundles: [RX_APPLICATION.settingsBundleId],
            hidden: true
        });
    }
}
IframeLoginEventRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IframeLoginEventRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
IframeLoginEventRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IframeLoginEventRegistrationModule, declarations: [IframeLoginEventComponent], imports: [CommonModule] });
IframeLoginEventRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IframeLoginEventRegistrationModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IframeLoginEventRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [IframeLoginEventComponent],
                    imports: [CommonModule],
                    entryComponents: [IframeLoginEventComponent]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=iframe-login-event-registration.module.js.map