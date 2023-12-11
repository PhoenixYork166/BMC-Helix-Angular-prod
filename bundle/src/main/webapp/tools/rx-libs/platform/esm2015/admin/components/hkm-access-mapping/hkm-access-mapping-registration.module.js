import { ComponentFactoryResolver, NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { AdminSettingsModule } from '@helix/platform/shared/components';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HkmAccessMappingAdminComponent } from './hkm-access-mapping.component';
import { AdaptAlertModule, AdaptRxListBuilderModule, AdaptRxSelectModule } from '@bmc-ux/adapt-angular';
import { AdaptTableModule } from '@bmc-ux/adapt-table';
import { AdaptButtonModule, AdaptDropdownModule, AdaptPopoverModule, AdaptEmptyStateModule, AdaptIconModule, AdaptRxTextfieldModule, AdaptTabsModule, AdaptBadgeModule, AdaptAdvancedFilteringModule, AdaptTreeModule, ActiveModalRef, AdaptSubnavModule } from '@bmc-ux/adapt-angular';
import { HkmAccessMapEditorComponent } from './hkm-access-map-editor/hkm-access-map-editor.component';
import { AdaptBusyModule } from '@bmc-ux/adapt-angular';
import { RecordGridModule } from '@helix/platform/view/components';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class HkmAccessMappingRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: 'rx-admin-hkm-access-mapping',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(HkmAccessMappingAdminComponent),
            name: 'HKM Access Mapping',
            isPageComponent: true,
            availableInBundles: [RX_APPLICATION.settingsBundleId]
        });
    }
}
HkmAccessMappingRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: HkmAccessMappingRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
HkmAccessMappingRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: HkmAccessMappingRegistrationModule, declarations: [HkmAccessMappingAdminComponent, HkmAccessMapEditorComponent], imports: [AdminSettingsModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        TranslateModule,
        AdaptButtonModule,
        AdaptRxTextfieldModule,
        AdaptRxListBuilderModule,
        AdaptEmptyStateModule,
        AdaptIconModule,
        AdaptRxSelectModule,
        AdaptPopoverModule,
        AdaptTabsModule,
        AdaptTableModule,
        AdaptDropdownModule,
        AdaptBadgeModule,
        AdaptAdvancedFilteringModule,
        AdaptTreeModule,
        AdaptSubnavModule,
        AdaptBusyModule,
        RecordGridModule,
        AdaptAlertModule] });
HkmAccessMappingRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: HkmAccessMappingRegistrationModule, providers: [ActiveModalRef], imports: [[
            AdminSettingsModule,
            FormsModule,
            ReactiveFormsModule,
            CommonModule,
            TranslateModule,
            AdaptButtonModule,
            AdaptRxTextfieldModule,
            AdaptRxListBuilderModule,
            AdaptEmptyStateModule,
            AdaptIconModule,
            AdaptRxSelectModule,
            AdaptPopoverModule,
            AdaptTabsModule,
            AdaptTableModule,
            AdaptDropdownModule,
            AdaptBadgeModule,
            AdaptAdvancedFilteringModule,
            AdaptTreeModule,
            AdaptSubnavModule,
            AdaptBusyModule,
            RecordGridModule,
            AdaptAlertModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: HkmAccessMappingRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [HkmAccessMappingAdminComponent, HkmAccessMapEditorComponent],
                    imports: [
                        AdminSettingsModule,
                        FormsModule,
                        ReactiveFormsModule,
                        CommonModule,
                        TranslateModule,
                        AdaptButtonModule,
                        AdaptRxTextfieldModule,
                        AdaptRxListBuilderModule,
                        AdaptEmptyStateModule,
                        AdaptIconModule,
                        AdaptRxSelectModule,
                        AdaptPopoverModule,
                        AdaptTabsModule,
                        AdaptTableModule,
                        AdaptDropdownModule,
                        AdaptBadgeModule,
                        AdaptAdvancedFilteringModule,
                        AdaptTreeModule,
                        AdaptSubnavModule,
                        AdaptBusyModule,
                        RecordGridModule,
                        AdaptAlertModule
                    ],
                    providers: [ActiveModalRef],
                    entryComponents: [HkmAccessMappingAdminComponent]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=hkm-access-mapping-registration.module.js.map