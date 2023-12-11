import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./cognitive-search.component";
import * as i2 from "./cognitive-search-editor/cognitive-search-editor.component";
import * as i3 from "@angular/common";
import * as i4 from "@bmc-ux/adapt-angular";
import * as i5 from "@angular/forms";
import * as i6 from "@helix/platform/view/components";
import * as i7 from "@helix/platform/ui-kit";
import * as i8 from "@helix/platform/shared/components";
import * as i9 from "@ngx-translate/core";
export declare class CognitiveSearchRegistrationModule {
    private componentFactoryResolver;
    private rxViewComponentRegistryService;
    constructor(componentFactoryResolver: ComponentFactoryResolver, rxViewComponentRegistryService: RxViewComponentRegistryService);
    static ɵfac: i0.ɵɵFactoryDeclaration<CognitiveSearchRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<CognitiveSearchRegistrationModule, [typeof i1.CognitiveSearchAdminComponent, typeof i2.CognitiveSearchEditorAdminComponent], [typeof i3.CommonModule, typeof i4.AdaptButtonModule, typeof i4.AdaptDropdownModule, typeof i4.AdaptRxCounterModule, typeof i4.AdaptRxSelectModule, typeof i4.AdaptRxTextfieldModule, typeof i5.ReactiveFormsModule, typeof i6.RecordGridModule, typeof i7.RxDirectivesModule, typeof i8.RxDefinitionPickerModule, typeof i9.TranslateModule, typeof i8.AdminSettingsModule, typeof i4.AdaptRxLabelModule, typeof i4.AdaptRxValidatorsModule, typeof i4.AdaptAlertModule, typeof i4.AdaptBusyModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<CognitiveSearchRegistrationModule>;
}
