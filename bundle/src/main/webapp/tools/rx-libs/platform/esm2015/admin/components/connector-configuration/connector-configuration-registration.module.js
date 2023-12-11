import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AdaptAlertModule, AdaptButtonModule, AdaptRxSelectModule, AdaptRxTextfieldModule } from '@bmc-ux/adapt-angular';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { RecordGridModule } from '@helix/platform/view/components';
import { AdminSettingsModule } from '@helix/platform/shared/components';
import { ConnectorConfigurationEditorComponent } from './connector-configuration-editor/connector-configuration-editor.component';
import { ConnectorConfigurationAdminComponent } from './connector-configuration.component';
import { TranslateModule } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class ConnectorConfigurationRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: 'rx-admin-connector-configuration',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(ConnectorConfigurationAdminComponent),
            name: 'Connector configuration',
            isPageComponent: true,
            availableInBundles: [RX_APPLICATION.settingsBundleId]
        });
    }
}
ConnectorConfigurationRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConnectorConfigurationRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
ConnectorConfigurationRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConnectorConfigurationRegistrationModule, declarations: [ConnectorConfigurationAdminComponent, ConnectorConfigurationEditorComponent], imports: [CommonModule,
        AdaptButtonModule,
        AdminSettingsModule,
        RecordGridModule,
        AdaptRxTextfieldModule,
        ReactiveFormsModule,
        AdaptRxSelectModule,
        AdaptAlertModule,
        TranslateModule] });
ConnectorConfigurationRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConnectorConfigurationRegistrationModule, imports: [[
            CommonModule,
            AdaptButtonModule,
            AdminSettingsModule,
            RecordGridModule,
            AdaptRxTextfieldModule,
            ReactiveFormsModule,
            AdaptRxSelectModule,
            AdaptAlertModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConnectorConfigurationRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ConnectorConfigurationAdminComponent, ConnectorConfigurationEditorComponent],
                    imports: [
                        CommonModule,
                        AdaptButtonModule,
                        AdminSettingsModule,
                        RecordGridModule,
                        AdaptRxTextfieldModule,
                        ReactiveFormsModule,
                        AdaptRxSelectModule,
                        AdaptAlertModule,
                        TranslateModule
                    ],
                    entryComponents: [ConnectorConfigurationAdminComponent]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=connector-configuration-registration.module.js.map