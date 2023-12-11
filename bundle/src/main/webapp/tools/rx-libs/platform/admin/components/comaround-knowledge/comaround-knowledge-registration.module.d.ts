import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./comaround-knowledge.component";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@helix/platform/shared/components";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
import * as i6 from "@helix/platform/ui-kit";
import * as i7 from "@ngx-translate/core";
export declare class ComaroundKnowledgeRegistrationModule {
    private componentFactoryResolver;
    private rxViewComponentRegistryService;
    constructor(componentFactoryResolver: ComponentFactoryResolver, rxViewComponentRegistryService: RxViewComponentRegistryService);
    static ɵfac: i0.ɵɵFactoryDeclaration<ComaroundKnowledgeRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ComaroundKnowledgeRegistrationModule, [typeof i1.ComaroundKnowledgeAdminComponent], [typeof i2.AdaptButtonModule, typeof i2.AdaptRxTextfieldModule, typeof i2.AdaptRxSelectModule, typeof i2.AdaptAlertModule, typeof i2.AdaptAccordionModule, typeof i3.AdminSettingsModule, typeof i4.CommonModule, typeof i5.ReactiveFormsModule, typeof i6.RxConnectionTesterModule, typeof i6.RxDirectivesModule, typeof i7.TranslateModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ComaroundKnowledgeRegistrationModule>;
}
