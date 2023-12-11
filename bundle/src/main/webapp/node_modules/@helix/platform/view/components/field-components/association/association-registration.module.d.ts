import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./runtime/association.module";
import * as i2 from "./design/association-design.module";
export declare class AssociationRegistrationModule {
    private rxViewComponentRegistryService;
    private componentFactoryResolver;
    constructor(rxViewComponentRegistryService: RxViewComponentRegistryService, componentFactoryResolver: ComponentFactoryResolver);
    static ɵfac: i0.ɵɵFactoryDeclaration<AssociationRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<AssociationRegistrationModule, never, [typeof i1.AssociationModule, typeof i2.AssociationDesignModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<AssociationRegistrationModule>;
}
