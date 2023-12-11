import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { JitterbitApisAdminComponent } from './jitterbit-apis.component';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { IpaasBaseApisModule } from '../ipaas-base-apis/ipaas-base-apis.module';
import { JitterbitApiEditorComponent } from './jitterbit-api-editor.component';
import { RxBusyIndicatorModule } from '@helix/platform/ui-kit';
import { ReactiveFormsModule } from '@angular/forms';
import { AdaptButtonModule, AdaptRxLabelModule, AdaptRxSelectEditableModule, AdaptRxSelectModule, AdaptRxTextfieldModule, AdaptTabsModule } from '@bmc-ux/adapt-angular';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class JitterbitApisRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: 'rx-admin-jitterbit-apis',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(JitterbitApisAdminComponent),
            name: 'iPaaS Jitterbit APIs',
            isPageComponent: true,
            availableInBundles: [RX_APPLICATION.settingsBundleId]
        });
    }
}
JitterbitApisRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: JitterbitApisRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
JitterbitApisRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: JitterbitApisRegistrationModule, declarations: [JitterbitApisAdminComponent, JitterbitApiEditorComponent], imports: [IpaasBaseApisModule,
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
JitterbitApisRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: JitterbitApisRegistrationModule, imports: [[
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: JitterbitApisRegistrationModule, decorators: [{
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
                    declarations: [JitterbitApisAdminComponent, JitterbitApiEditorComponent],
                    entryComponents: [JitterbitApisAdminComponent]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=jitterbit-apis-registration.module.js.map