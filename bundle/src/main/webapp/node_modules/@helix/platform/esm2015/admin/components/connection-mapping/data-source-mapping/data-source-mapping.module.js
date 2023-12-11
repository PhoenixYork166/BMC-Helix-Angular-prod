import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdaptRxSelectModule, AdaptRxTextfieldModule } from '@bmc-ux/adapt-angular';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { AdminSettingsModule } from '@helix/platform/shared/components';
import { RxConnectionMappingModule } from '../common/connection-mapping.module';
import { DataSourceMappingAdminComponent } from './data-source-mapping.component';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class DataSourceMappingModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: 'rx-admin-data-source-mapping',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(DataSourceMappingAdminComponent),
            name: 'Data source mapping',
            isPageComponent: true,
            availableInBundles: [RX_APPLICATION.settingsBundleId]
        });
    }
}
DataSourceMappingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataSourceMappingModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
DataSourceMappingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataSourceMappingModule, declarations: [DataSourceMappingAdminComponent], imports: [CommonModule,
        AdminSettingsModule,
        AdaptRxSelectModule,
        FormsModule,
        AdaptRxTextfieldModule,
        RxConnectionMappingModule] });
DataSourceMappingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataSourceMappingModule, imports: [[
            CommonModule,
            AdminSettingsModule,
            AdaptRxSelectModule,
            FormsModule,
            AdaptRxTextfieldModule,
            RxConnectionMappingModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataSourceMappingModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [DataSourceMappingAdminComponent],
                    imports: [
                        CommonModule,
                        AdminSettingsModule,
                        AdaptRxSelectModule,
                        FormsModule,
                        AdaptRxTextfieldModule,
                        RxConnectionMappingModule
                    ],
                    entryComponents: [DataSourceMappingAdminComponent]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=data-source-mapping.module.js.map