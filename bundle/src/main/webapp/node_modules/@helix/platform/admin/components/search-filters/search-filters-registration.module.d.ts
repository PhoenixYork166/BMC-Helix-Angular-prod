import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./search-filters.component";
import * as i2 from "./search-filters-editor/search-filters-editor.component";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
import * as i5 from "@ngx-translate/core";
import * as i6 from "@bmc-ux/adapt-angular";
import * as i7 from "@helix/platform/shared/components";
import * as i8 from "@helix/platform/view/components";
export declare class SearchFiltersRegistrationModule {
    private componentFactoryResolver;
    private rxViewComponentRegistryService;
    constructor(componentFactoryResolver: ComponentFactoryResolver, rxViewComponentRegistryService: RxViewComponentRegistryService);
    static ɵfac: i0.ɵɵFactoryDeclaration<SearchFiltersRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<SearchFiltersRegistrationModule, [typeof i1.RxSearchFiltersComponent, typeof i2.SearchFiltersEditorComponent], [typeof i3.CommonModule, typeof i4.ReactiveFormsModule, typeof i5.TranslateModule, typeof i6.AdaptButtonModule, typeof i6.AdaptMetatagModule, typeof i6.AdaptRxFormControlModule, typeof i6.AdaptRxSelectModule, typeof i6.AdaptRxTextfieldModule, typeof i6.AdaptTagModule, typeof i6.AdaptTruncatePipeModule, typeof i7.AdminSettingsModule, typeof i8.RecordGridModule], [typeof i1.RxSearchFiltersComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<SearchFiltersRegistrationModule>;
}
