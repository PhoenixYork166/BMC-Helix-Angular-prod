import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./summarization-testing.component";
import * as i2 from "@helix/platform/shared/components";
import * as i3 from "@bmc-ux/adapt-angular";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
import * as i6 from "@helix/platform/view/components";
import * as i7 from "@angular/cdk/clipboard";
import * as i8 from "@ngx-translate/core";
export declare class SummarizationTestingRegistrationModule {
    private componentFactoryResolver;
    private rxViewComponentRegistryService;
    constructor(componentFactoryResolver: ComponentFactoryResolver, rxViewComponentRegistryService: RxViewComponentRegistryService);
    static ɵfac: i0.ɵɵFactoryDeclaration<SummarizationTestingRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<SummarizationTestingRegistrationModule, [typeof i1.SummarizationTestingAdminComponent], [typeof i2.AdminSettingsModule, typeof i3.AdaptAccordionModule, typeof i3.AdaptButtonModule, typeof i3.AdaptRxTextareaModule, typeof i3.AdaptRxSelectModule, typeof i3.AdaptRxCounterModule, typeof i3.AdaptRxTextfieldModule, typeof i3.AdaptRxLabelModule, typeof i3.AdaptAlertModule, typeof i4.CommonModule, typeof i5.ReactiveFormsModule, typeof i2.RxDefinitionPickerModule, typeof i6.RecordGridModule, typeof i7.ClipboardModule, typeof i3.AdaptPopoverModule, typeof i3.AdaptRxValidatorsModule, typeof i8.TranslateModule, typeof i3.AdaptBusyModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<SummarizationTestingRegistrationModule>;
}
