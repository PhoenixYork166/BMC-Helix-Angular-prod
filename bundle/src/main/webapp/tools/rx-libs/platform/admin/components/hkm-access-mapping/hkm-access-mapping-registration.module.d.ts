import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./hkm-access-mapping.component";
import * as i2 from "./hkm-access-map-editor/hkm-access-map-editor.component";
import * as i3 from "@helix/platform/shared/components";
import * as i4 from "@angular/forms";
import * as i5 from "@angular/common";
import * as i6 from "@ngx-translate/core";
import * as i7 from "@bmc-ux/adapt-angular";
import * as i8 from "@bmc-ux/adapt-table";
import * as i9 from "@helix/platform/view/components";
export declare class HkmAccessMappingRegistrationModule {
    private componentFactoryResolver;
    private rxViewComponentRegistryService;
    constructor(componentFactoryResolver: ComponentFactoryResolver, rxViewComponentRegistryService: RxViewComponentRegistryService);
    static ɵfac: i0.ɵɵFactoryDeclaration<HkmAccessMappingRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<HkmAccessMappingRegistrationModule, [typeof i1.HkmAccessMappingAdminComponent, typeof i2.HkmAccessMapEditorComponent], [typeof i3.AdminSettingsModule, typeof i4.FormsModule, typeof i4.ReactiveFormsModule, typeof i5.CommonModule, typeof i6.TranslateModule, typeof i7.AdaptButtonModule, typeof i7.AdaptRxTextfieldModule, typeof i7.AdaptRxListBuilderModule, typeof i7.AdaptEmptyStateModule, typeof i7.AdaptIconModule, typeof i7.AdaptRxSelectModule, typeof i7.AdaptPopoverModule, typeof i7.AdaptTabsModule, typeof i8.AdaptTableModule, typeof i7.AdaptDropdownModule, typeof i7.AdaptBadgeModule, typeof i7.AdaptAdvancedFilteringModule, typeof i7.AdaptTreeModule, typeof i7.AdaptSubnavModule, typeof i7.AdaptBusyModule, typeof i9.RecordGridModule, typeof i7.AdaptAlertModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<HkmAccessMappingRegistrationModule>;
}
