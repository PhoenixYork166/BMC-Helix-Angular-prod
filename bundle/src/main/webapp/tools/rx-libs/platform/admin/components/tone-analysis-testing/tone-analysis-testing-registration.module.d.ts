import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./tone-analysis-testing.component";
import * as i2 from "./document-tone-analysis/document-tone-analysis.component";
import * as i3 from "./user-engagement-tone-analysis/user-engagement-tone-analysis.component";
import * as i4 from "@helix/platform/shared/components";
import * as i5 from "@bmc-ux/adapt-angular";
import * as i6 from "@angular/common";
import * as i7 from "@angular/forms";
import * as i8 from "@ngx-translate/core";
export declare class ToneAnalysisTestingRegistrationModule {
    private componentFactoryResolver;
    private rxViewComponentRegistryService;
    constructor(componentFactoryResolver: ComponentFactoryResolver, rxViewComponentRegistryService: RxViewComponentRegistryService);
    static ɵfac: i0.ɵɵFactoryDeclaration<ToneAnalysisTestingRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ToneAnalysisTestingRegistrationModule, [typeof i1.ToneAnalysisTestingAdminComponent, typeof i2.DocumentToneAnalysisComponent, typeof i3.UserEngagementToneAnalysisComponent], [typeof i4.AdminSettingsModule, typeof i5.AdaptTabsModule, typeof i5.AdaptRxSelectModule, typeof i5.AdaptRxCheckboxModule, typeof i5.AdaptRxTextareaModule, typeof i5.AdaptRxTextareaModule, typeof i5.AdaptRxLabelModule, typeof i5.AdaptRxCounterModule, typeof i5.AdaptButtonModule, typeof i5.AdaptRxSwitchModule, typeof i5.AdaptBadgeModule, typeof i6.CommonModule, typeof i7.FormsModule, typeof i7.ReactiveFormsModule, typeof i8.TranslateModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ToneAnalysisTestingRegistrationModule>;
}
