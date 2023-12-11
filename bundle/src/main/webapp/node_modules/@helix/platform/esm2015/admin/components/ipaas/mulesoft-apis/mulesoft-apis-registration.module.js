import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { MulesoftApisAdminComponent } from './mulesoft-apis.component';
import { IpaasBaseApisModule } from '../ipaas-base-apis/ipaas-base-apis.module';
import { MulesoftApiEditorComponent } from './mulesoft-api-editor.component';
import { RxBusyIndicatorModule } from '@helix/platform/ui-kit';
import { ReactiveFormsModule } from '@angular/forms';
import { AdaptButtonModule, AdaptRxLabelModule, AdaptRxSelectEditableModule, AdaptRxSelectModule, AdaptRxTextfieldModule, AdaptTabsModule } from '@bmc-ux/adapt-angular';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class MulesoftApisRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: 'rx-admin-mulesoft-apis',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(MulesoftApisAdminComponent),
            name: 'iPaaS MuleSoft APIs',
            isPageComponent: true,
            availableInBundles: [RX_APPLICATION.settingsBundleId]
        });
    }
}
MulesoftApisRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: MulesoftApisRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
MulesoftApisRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: MulesoftApisRegistrationModule, declarations: [MulesoftApisAdminComponent, MulesoftApiEditorComponent], imports: [IpaasBaseApisModule,
        RxBusyIndicatorModule,
        ReactiveFormsModule,
        AdaptRxLabelModule,
        AdaptRxSelectModule,
        AdaptRxSelectEditableModule,
        AdaptRxTextfieldModule,
        AdaptTabsModule,
        TranslateModule,
        AdaptButtonModule,
        CommonModule] });
MulesoftApisRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: MulesoftApisRegistrationModule, imports: [[
            IpaasBaseApisModule,
            RxBusyIndicatorModule,
            ReactiveFormsModule,
            AdaptRxLabelModule,
            AdaptRxSelectModule,
            AdaptRxSelectEditableModule,
            AdaptRxTextfieldModule,
            AdaptTabsModule,
            TranslateModule,
            AdaptButtonModule,
            CommonModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: MulesoftApisRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        IpaasBaseApisModule,
                        RxBusyIndicatorModule,
                        ReactiveFormsModule,
                        AdaptRxLabelModule,
                        AdaptRxSelectModule,
                        AdaptRxSelectEditableModule,
                        AdaptRxTextfieldModule,
                        AdaptTabsModule,
                        TranslateModule,
                        AdaptButtonModule,
                        CommonModule
                    ],
                    declarations: [MulesoftApisAdminComponent, MulesoftApiEditorComponent],
                    entryComponents: [MulesoftApisAdminComponent]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=mulesoft-apis-registration.module.js.map