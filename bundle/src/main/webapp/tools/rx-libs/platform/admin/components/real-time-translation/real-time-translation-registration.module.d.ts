import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./real-time-translation.component";
import * as i2 from "@helix/platform/shared/components";
import * as i3 from "@bmc-ux/adapt-angular";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
import * as i6 from "@ngx-translate/core";
export declare class RealTimeTranslationRegistrationModule {
    private componentFactoryResolver;
    private rxViewComponentRegistryService;
    constructor(componentFactoryResolver: ComponentFactoryResolver, rxViewComponentRegistryService: RxViewComponentRegistryService);
    static ɵfac: i0.ɵɵFactoryDeclaration<RealTimeTranslationRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<RealTimeTranslationRegistrationModule, [typeof i1.RealTimeTranslationAdminComponent], [typeof i2.AdminSettingsModule, typeof i3.AdaptRxTextfieldModule, typeof i4.CommonModule, typeof i5.FormsModule, typeof i3.AdaptRxSelectModule, typeof i3.AdaptRxTextareaModule, typeof i3.AdaptButtonModule, typeof i6.TranslateModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<RealTimeTranslationRegistrationModule>;
}
