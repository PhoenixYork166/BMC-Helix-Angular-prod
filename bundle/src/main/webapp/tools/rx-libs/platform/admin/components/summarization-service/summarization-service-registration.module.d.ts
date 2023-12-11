import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./summarization-service.component";
import * as i2 from "@angular/common";
import * as i3 from "@helix/platform/shared/components";
import * as i4 from "@ngx-translate/core";
import * as i5 from "@bmc-ux/adapt-angular";
import * as i6 from "@angular/forms";
import * as i7 from "@helix/platform/ui-kit";
export declare class SummarizationServiceRegistrationModule {
    private componentFactoryResolver;
    private rxViewComponentRegistryService;
    constructor(componentFactoryResolver: ComponentFactoryResolver, rxViewComponentRegistryService: RxViewComponentRegistryService);
    static ɵfac: i0.ɵɵFactoryDeclaration<SummarizationServiceRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<SummarizationServiceRegistrationModule, [typeof i1.SummarizationServiceAdminComponent], [typeof i2.CommonModule, typeof i3.AdminSettingsModule, typeof i4.TranslateModule, typeof i5.AdaptRxTextfieldModule, typeof i6.ReactiveFormsModule, typeof i7.RxConnectionTesterModule, typeof i5.AdaptButtonModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<SummarizationServiceRegistrationModule>;
}
