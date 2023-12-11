import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdaptButtonModule, AdaptDropdownModule, AdaptRxCheckboxModule, AdaptRxCounterModule, AdaptRxFormControlModule, AdaptRxRadiobuttonModule, AdaptRxSelectModule, AdaptRxTextfieldModule, AdaptRxValidatorsModule, AdaptTreeModule } from '@bmc-ux/adapt-angular';
import { RxDefinitionModule, RX_APPLICATION } from '@helix/platform/shared/api';
import { AdminSettingsModule, RxWizardModule } from '@helix/platform/shared/components';
import { RxConnectionTesterModule } from '@helix/platform/ui-kit';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { RecordGridModule } from '@helix/platform/view/components';
import { TranslateModule } from '@ngx-translate/core';
import { RxCustomDataSourceProviderPickerComponent } from './custom-data-source-provider-picker/custom-data-source-provider-picker.component';
import { DataSourceConnectionGeneralComponent } from './data-source-connection-general.component';
import { DataSourceConnectionPropertiesComponent } from './data-source-connection-properties.component';
import { DataSourceConnectionsAdminComponent } from './data-source-connections.component';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class DataSourceConnectionsRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: 'rx-admin-data-source-connections',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(DataSourceConnectionsAdminComponent),
            name: 'Data source connections',
            isPageComponent: true,
            availableInBundles: [RX_APPLICATION.settingsBundleId]
        });
    }
}
DataSourceConnectionsRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataSourceConnectionsRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
DataSourceConnectionsRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataSourceConnectionsRegistrationModule, declarations: [DataSourceConnectionsAdminComponent,
        DataSourceConnectionGeneralComponent,
        DataSourceConnectionPropertiesComponent,
        RxCustomDataSourceProviderPickerComponent], imports: [AdaptButtonModule,
        AdaptDropdownModule,
        AdaptRxCheckboxModule,
        AdaptRxCounterModule,
        AdaptRxFormControlModule,
        AdaptRxRadiobuttonModule,
        AdaptRxSelectModule,
        AdaptRxTextfieldModule,
        AdaptRxValidatorsModule,
        AdaptTreeModule,
        AdminSettingsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RecordGridModule,
        RxConnectionTesterModule,
        RxDefinitionModule,
        RxWizardModule,
        TranslateModule] });
DataSourceConnectionsRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataSourceConnectionsRegistrationModule, imports: [[
            AdaptButtonModule,
            AdaptDropdownModule,
            AdaptRxCheckboxModule,
            AdaptRxCounterModule,
            AdaptRxFormControlModule,
            AdaptRxRadiobuttonModule,
            AdaptRxSelectModule,
            AdaptRxTextfieldModule,
            AdaptRxValidatorsModule,
            AdaptTreeModule,
            AdminSettingsModule,
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            RecordGridModule,
            RxConnectionTesterModule,
            RxDefinitionModule,
            RxWizardModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataSourceConnectionsRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        DataSourceConnectionsAdminComponent,
                        DataSourceConnectionGeneralComponent,
                        DataSourceConnectionPropertiesComponent,
                        RxCustomDataSourceProviderPickerComponent
                    ],
                    imports: [
                        AdaptButtonModule,
                        AdaptDropdownModule,
                        AdaptRxCheckboxModule,
                        AdaptRxCounterModule,
                        AdaptRxFormControlModule,
                        AdaptRxRadiobuttonModule,
                        AdaptRxSelectModule,
                        AdaptRxTextfieldModule,
                        AdaptRxValidatorsModule,
                        AdaptTreeModule,
                        AdminSettingsModule,
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        RecordGridModule,
                        RxConnectionTesterModule,
                        RxDefinitionModule,
                        RxWizardModule,
                        TranslateModule
                    ],
                    entryComponents: [
                        DataSourceConnectionsAdminComponent,
                        DataSourceConnectionGeneralComponent,
                        DataSourceConnectionPropertiesComponent
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=data-source-connections-registration.module.js.map