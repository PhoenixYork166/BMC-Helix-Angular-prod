import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageTenantAdminComponent } from './manage-tenant.component';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { AdminSettingsModule } from '@helix/platform/shared/components';
import { RecordGridModule } from '@helix/platform/view/components';
import { AdaptButtonModule, AdaptRxTextfieldModule } from '@bmc-ux/adapt-angular';
import { TenantEditorComponent } from './tenant-editor/tenant-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class ManageTenantRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: 'rx-admin-manage-tenant',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(ManageTenantAdminComponent),
            name: 'Manage tenant',
            isPageComponent: true,
            availableInBundles: [RX_APPLICATION.settingsBundleId]
        });
    }
}
ManageTenantRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ManageTenantRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
ManageTenantRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ManageTenantRegistrationModule, declarations: [ManageTenantAdminComponent, TenantEditorComponent], imports: [CommonModule,
        AdminSettingsModule,
        RecordGridModule,
        AdaptButtonModule,
        AdaptRxTextfieldModule,
        ReactiveFormsModule,
        TranslateModule] });
ManageTenantRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ManageTenantRegistrationModule, imports: [[
            CommonModule,
            AdminSettingsModule,
            RecordGridModule,
            AdaptButtonModule,
            AdaptRxTextfieldModule,
            ReactiveFormsModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ManageTenantRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ManageTenantAdminComponent, TenantEditorComponent],
                    imports: [
                        CommonModule,
                        AdminSettingsModule,
                        RecordGridModule,
                        AdaptButtonModule,
                        AdaptRxTextfieldModule,
                        ReactiveFormsModule,
                        TranslateModule
                    ],
                    entryComponents: [ManageTenantAdminComponent, TenantEditorComponent]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=manage-tenant-registration.module.js.map