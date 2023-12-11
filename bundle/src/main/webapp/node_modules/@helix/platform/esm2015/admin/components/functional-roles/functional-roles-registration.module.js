import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdaptBusyModule, AdaptButtonModule, AdaptRxFormControlModule, AdaptRxSelectModule, AdaptRxTextfieldModule, AdaptTreeModule } from '@bmc-ux/adapt-angular';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { AdminSettingsModule } from '@helix/platform/shared/components';
import { RxBusyIndicatorModule, RxDirectivesModule } from '@helix/platform/ui-kit';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { RecordGridModule } from '@helix/platform/view/components';
import { FunctionalRoleEditorComponent } from './functional-role-editor/functional-role-editor.component';
import { FunctionalRolesAdminComponent } from './functional-roles.component';
import { TranslateModule } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class FunctionalRolesRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: 'rx-admin-functional-roles',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(FunctionalRolesAdminComponent),
            name: 'Functional roles',
            isPageComponent: true,
            availableInBundles: [RX_APPLICATION.settingsBundleId]
        });
    }
}
FunctionalRolesRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FunctionalRolesRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
FunctionalRolesRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FunctionalRolesRegistrationModule, declarations: [FunctionalRolesAdminComponent, FunctionalRoleEditorComponent], imports: [CommonModule,
        FormsModule,
        AdminSettingsModule,
        RecordGridModule,
        AdaptRxTextfieldModule,
        AdaptButtonModule,
        AdaptBusyModule,
        AdaptRxSelectModule,
        AdaptRxFormControlModule,
        AdaptTreeModule,
        RxBusyIndicatorModule,
        TranslateModule,
        RxDirectivesModule] });
FunctionalRolesRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FunctionalRolesRegistrationModule, imports: [[
            CommonModule,
            FormsModule,
            AdminSettingsModule,
            RecordGridModule,
            AdaptRxTextfieldModule,
            AdaptButtonModule,
            AdaptBusyModule,
            AdaptRxSelectModule,
            AdaptRxFormControlModule,
            AdaptTreeModule,
            RxBusyIndicatorModule,
            TranslateModule,
            RxDirectivesModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FunctionalRolesRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [FunctionalRolesAdminComponent, FunctionalRoleEditorComponent],
                    imports: [
                        CommonModule,
                        FormsModule,
                        AdminSettingsModule,
                        RecordGridModule,
                        AdaptRxTextfieldModule,
                        AdaptButtonModule,
                        AdaptBusyModule,
                        AdaptRxSelectModule,
                        AdaptRxFormControlModule,
                        AdaptTreeModule,
                        RxBusyIndicatorModule,
                        TranslateModule,
                        RxDirectivesModule
                    ],
                    entryComponents: [FunctionalRolesAdminComponent]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=functional-roles-registration.module.js.map