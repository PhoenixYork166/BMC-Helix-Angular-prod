import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./design/action-button-design.module";
import * as i2 from "./runtime/action-button.module";
export declare class ActionButtonRegistrationModule {
    private componentFactoryResolver;
    private rxViewComponentRegistryService;
    constructor(componentFactoryResolver: ComponentFactoryResolver, rxViewComponentRegistryService: RxViewComponentRegistryService);
    static ɵfac: i0.ɵɵFactoryDeclaration<ActionButtonRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ActionButtonRegistrationModule, never, [typeof i1.ActionButtonDesignModule, typeof i2.ActionButtonModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ActionButtonRegistrationModule>;
}
