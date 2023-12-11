import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./iframe-login-event.component";
import * as i2 from "@angular/common";
/**
 * This component is used by view-loader.js script when the login cannot be achieved
 * in an iFrame (for example with Microsoft IDP).
 * In this case view-loader.js loads a view in a window popup that will require the user
 * to log in. Once the user is logged in, this View Component will send a PostMessage to
 * view-loader.js that will close the popup.
 */
export declare class IframeLoginEventRegistrationModule {
    private componentFactoryResolver;
    private rxViewComponentRegistryService;
    constructor(componentFactoryResolver: ComponentFactoryResolver, rxViewComponentRegistryService: RxViewComponentRegistryService);
    static ɵfac: i0.ɵɵFactoryDeclaration<IframeLoginEventRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<IframeLoginEventRegistrationModule, [typeof i1.IframeLoginEventComponent], [typeof i2.CommonModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<IframeLoginEventRegistrationModule>;
}
