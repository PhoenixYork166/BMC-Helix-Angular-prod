import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./process-instance-preview.component";
import * as i2 from "@angular/common";
import * as i3 from "@helix/platform/view/runtime";
import * as i4 from "@ngx-translate/core";
export declare class RxProcessInstancePreviewModule {
    private componentFactoryResolver;
    private rxViewComponentRegistryService;
    constructor(componentFactoryResolver: ComponentFactoryResolver, rxViewComponentRegistryService: RxViewComponentRegistryService);
    static ɵfac: i0.ɵɵFactoryDeclaration<RxProcessInstancePreviewModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<RxProcessInstancePreviewModule, [typeof i1.RxProcessInstancePreviewComponent], [typeof i2.CommonModule, typeof i3.RuntimeViewModule, typeof i4.TranslateModule], [typeof i1.RxProcessInstancePreviewComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<RxProcessInstancePreviewModule>;
}
