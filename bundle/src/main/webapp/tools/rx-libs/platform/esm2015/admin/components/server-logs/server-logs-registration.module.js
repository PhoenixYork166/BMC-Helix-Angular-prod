import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdaptBusyModule, AdaptButtonModule, AdaptRxCheckboxModule, AdaptRxCounterModule, AdaptRxValidatorsModule } from '@bmc-ux/adapt-angular';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { ServerLogsAdminComponent } from './server-logs.component';
import { AdminSettingsModule } from '@helix/platform/shared/components';
import { TranslateModule } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class ServerLogsRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: 'rx-admin-server-logs',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(ServerLogsAdminComponent),
            name: 'Server logs',
            isPageComponent: true,
            availableInBundles: [RX_APPLICATION.settingsBundleId]
        });
    }
}
ServerLogsRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ServerLogsRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
ServerLogsRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ServerLogsRegistrationModule, declarations: [ServerLogsAdminComponent], imports: [AdaptBusyModule,
        AdaptButtonModule,
        AdaptRxCheckboxModule,
        AdaptRxCounterModule,
        AdaptRxValidatorsModule,
        AdminSettingsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule] });
ServerLogsRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ServerLogsRegistrationModule, imports: [[
            AdaptBusyModule,
            AdaptButtonModule,
            AdaptRxCheckboxModule,
            AdaptRxCounterModule,
            AdaptRxValidatorsModule,
            AdminSettingsModule,
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ServerLogsRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ServerLogsAdminComponent],
                    imports: [
                        AdaptBusyModule,
                        AdaptButtonModule,
                        AdaptRxCheckboxModule,
                        AdaptRxCounterModule,
                        AdaptRxValidatorsModule,
                        AdminSettingsModule,
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        TranslateModule
                    ],
                    entryComponents: [ServerLogsAdminComponent]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=server-logs-registration.module.js.map