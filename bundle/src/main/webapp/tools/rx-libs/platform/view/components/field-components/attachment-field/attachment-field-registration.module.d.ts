import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./runtime/attachment-field.module";
import * as i2 from "./design/attachment-field-design.module";
export declare class AttachmentFieldRegistrationModule {
    private rxViewComponentRegistryService;
    private componentFactoryResolver;
    constructor(rxViewComponentRegistryService: RxViewComponentRegistryService, componentFactoryResolver: ComponentFactoryResolver);
    static ɵfac: i0.ɵɵFactoryDeclaration<AttachmentFieldRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<AttachmentFieldRegistrationModule, never, [typeof i1.AttachmentFieldModule, typeof i2.AttachmentFieldDesignModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<AttachmentFieldRegistrationModule>;
}