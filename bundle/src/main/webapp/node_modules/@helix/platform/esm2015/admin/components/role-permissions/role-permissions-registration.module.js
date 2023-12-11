import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdaptBusyModule, AdaptButtonModule, AdaptRxCounterModule, AdaptRxFormControlModule, AdaptRxSelectModule, AdaptRxTextfieldModule, AdaptRxTypeaheadModule, AdaptRxValidatorsModule } from '@bmc-ux/adapt-angular';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { AdminSettingsModule } from '@helix/platform/shared/components';
import { RxDirectivesModule } from '@helix/platform/ui-kit';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { RecordGridModule } from '@helix/platform/view/components';
import { TranslateModule } from '@ngx-translate/core';
import { RoleEditorComponent } from './role-editor/role-editor.component';
import { RolePermissionsAdminComponent } from './role-permissions.component';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class RolePermissionsRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: 'rx-admin-role-permissions',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(RolePermissionsAdminComponent),
            name: 'Role permissions',
            isPageComponent: true,
            availableInBundles: [RX_APPLICATION.settingsBundleId]
        });
    }
}
RolePermissionsRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RolePermissionsRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
RolePermissionsRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RolePermissionsRegistrationModule, declarations: [RolePermissionsAdminComponent, RoleEditorComponent], imports: [AdaptBusyModule,
        AdaptButtonModule,
        AdaptRxCounterModule,
        AdaptRxFormControlModule,
        AdaptRxSelectModule,
        AdaptRxTextfieldModule,
        AdaptRxTypeaheadModule,
        AdaptRxValidatorsModule,
        AdminSettingsModule,
        CommonModule,
        FormsModule,
        RecordGridModule,
        RxDirectivesModule,
        TranslateModule] });
RolePermissionsRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RolePermissionsRegistrationModule, imports: [[
            AdaptBusyModule,
            AdaptButtonModule,
            AdaptRxCounterModule,
            AdaptRxFormControlModule,
            AdaptRxSelectModule,
            AdaptRxTextfieldModule,
            AdaptRxTypeaheadModule,
            AdaptRxValidatorsModule,
            AdminSettingsModule,
            CommonModule,
            FormsModule,
            RecordGridModule,
            RxDirectivesModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RolePermissionsRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RolePermissionsAdminComponent, RoleEditorComponent],
                    imports: [
                        AdaptBusyModule,
                        AdaptButtonModule,
                        AdaptRxCounterModule,
                        AdaptRxFormControlModule,
                        AdaptRxSelectModule,
                        AdaptRxTextfieldModule,
                        AdaptRxTypeaheadModule,
                        AdaptRxValidatorsModule,
                        AdminSettingsModule,
                        CommonModule,
                        FormsModule,
                        RecordGridModule,
                        RxDirectivesModule,
                        TranslateModule
                    ],
                    entryComponents: [RolePermissionsAdminComponent]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=role-permissions-registration.module.js.map