import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdaptRxSelectModule, AdaptRxTextfieldModule } from '@bmc-ux/adapt-angular';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { AdminSettingsModule } from '@helix/platform/shared/components';
import { RxConnectionMappingModule } from '../common/connection-mapping.module';
import { ConnectorMappingAdminComponent } from './connector-mapping.component';
import { TranslateModule } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class ConnectorMappingRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: 'rx-admin-connector-mapping',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(ConnectorMappingAdminComponent),
            name: 'Connector mapping',
            isPageComponent: true,
            availableInBundles: [RX_APPLICATION.settingsBundleId]
        });
    }
}
ConnectorMappingRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConnectorMappingRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
ConnectorMappingRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConnectorMappingRegistrationModule, declarations: [ConnectorMappingAdminComponent], imports: [AdminSettingsModule,
        AdaptRxTextfieldModule,
        AdaptRxSelectModule,
        CommonModule,
        FormsModule,
        RxConnectionMappingModule,
        TranslateModule] });
ConnectorMappingRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConnectorMappingRegistrationModule, imports: [[
            AdminSettingsModule,
            AdaptRxTextfieldModule,
            AdaptRxSelectModule,
            CommonModule,
            FormsModule,
            RxConnectionMappingModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConnectorMappingRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ConnectorMappingAdminComponent],
                    imports: [
                        AdminSettingsModule,
                        AdaptRxTextfieldModule,
                        AdaptRxSelectModule,
                        CommonModule,
                        FormsModule,
                        RxConnectionMappingModule,
                        TranslateModule
                    ],
                    entryComponents: [ConnectorMappingAdminComponent]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=connector-mapping-registration.module.js.map