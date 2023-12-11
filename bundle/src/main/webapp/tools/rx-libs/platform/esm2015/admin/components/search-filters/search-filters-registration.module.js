import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AdaptButtonModule, AdaptMetatagModule, AdaptRxFormControlModule, AdaptRxSelectModule, AdaptRxTextfieldModule, AdaptTagModule, AdaptTruncatePipeModule } from '@bmc-ux/adapt-angular';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { AdminSettingsModule } from '@helix/platform/shared/components';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { RecordGridModule } from '@helix/platform/view/components';
import { TranslateModule } from '@ngx-translate/core';
import { SearchFiltersEditorComponent } from './search-filters-editor/search-filters-editor.component';
import { RxSearchFiltersComponent } from './search-filters.component';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class SearchFiltersRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: 'rx-search-filters',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(RxSearchFiltersComponent),
            name: 'Search filters',
            isPageComponent: true,
            availableInBundles: [RX_APPLICATION.settingsBundleId]
        });
    }
}
SearchFiltersRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SearchFiltersRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
SearchFiltersRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SearchFiltersRegistrationModule, declarations: [RxSearchFiltersComponent, SearchFiltersEditorComponent], imports: [CommonModule,
        ReactiveFormsModule,
        TranslateModule,
        AdaptButtonModule,
        AdaptMetatagModule,
        AdaptRxFormControlModule,
        AdaptRxSelectModule,
        AdaptRxTextfieldModule,
        AdaptTagModule,
        AdaptTruncatePipeModule,
        AdminSettingsModule,
        RecordGridModule], exports: [RxSearchFiltersComponent] });
SearchFiltersRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SearchFiltersRegistrationModule, imports: [[
            CommonModule,
            ReactiveFormsModule,
            TranslateModule,
            AdaptButtonModule,
            AdaptMetatagModule,
            AdaptRxFormControlModule,
            AdaptRxSelectModule,
            AdaptRxTextfieldModule,
            AdaptTagModule,
            AdaptTruncatePipeModule,
            AdminSettingsModule,
            RecordGridModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SearchFiltersRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxSearchFiltersComponent, SearchFiltersEditorComponent],
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        TranslateModule,
                        AdaptButtonModule,
                        AdaptMetatagModule,
                        AdaptRxFormControlModule,
                        AdaptRxSelectModule,
                        AdaptRxTextfieldModule,
                        AdaptTagModule,
                        AdaptTruncatePipeModule,
                        AdminSettingsModule,
                        RecordGridModule
                    ],
                    exports: [RxSearchFiltersComponent],
                    entryComponents: [RxSearchFiltersComponent]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=search-filters-registration.module.js.map