import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdaptRxSelectModule, AdaptRxTextfieldModule } from '@bmc-ux/adapt-angular';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { AdminSettingsModule } from '@helix/platform/shared/components';
import { RxConnectionMappingModule } from '../common/connection-mapping.module';
import { WebApiMappingAdminComponent } from './web-api-mapping.component';
import { TranslateModule } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class WebApiMappingRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: 'rx-admin-web-api-mapping',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(WebApiMappingAdminComponent),
            name: 'Web API mapping',
            isPageComponent: true,
            availableInBundles: [RX_APPLICATION.settingsBundleId]
        });
    }
}
WebApiMappingRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: WebApiMappingRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
WebApiMappingRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: WebApiMappingRegistrationModule, declarations: [WebApiMappingAdminComponent], imports: [AdminSettingsModule,
        AdaptRxTextfieldModule,
        AdaptRxSelectModule,
        CommonModule,
        FormsModule,
        RxConnectionMappingModule,
        TranslateModule] });
WebApiMappingRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: WebApiMappingRegistrationModule, imports: [[
            AdminSettingsModule,
            AdaptRxTextfieldModule,
            AdaptRxSelectModule,
            CommonModule,
            FormsModule,
            RxConnectionMappingModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: WebApiMappingRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [WebApiMappingAdminComponent],
                    imports: [
                        AdminSettingsModule,
                        AdaptRxTextfieldModule,
                        AdaptRxSelectModule,
                        CommonModule,
                        FormsModule,
                        RxConnectionMappingModule,
                        TranslateModule
                    ],
                    entryComponents: [WebApiMappingAdminComponent]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=web-api-mapping-registration.module.js.map