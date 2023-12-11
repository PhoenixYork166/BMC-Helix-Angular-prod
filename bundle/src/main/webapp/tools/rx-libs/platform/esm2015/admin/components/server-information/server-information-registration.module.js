import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdaptRxTextfieldModule } from '@bmc-ux/adapt-angular';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { AdminSettingsModule } from '@helix/platform/shared/components';
import { ServerInformationAdminComponent } from './server-information.component';
import { TranslateModule } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class ServerInformationRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: 'rx-admin-server-information',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(ServerInformationAdminComponent),
            name: 'Server information',
            isPageComponent: true,
            availableInBundles: [RX_APPLICATION.settingsBundleId]
        });
    }
}
ServerInformationRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ServerInformationRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
ServerInformationRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ServerInformationRegistrationModule, declarations: [ServerInformationAdminComponent], imports: [AdminSettingsModule, AdaptRxTextfieldModule, CommonModule, FormsModule, TranslateModule] });
ServerInformationRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ServerInformationRegistrationModule, imports: [[AdminSettingsModule, AdaptRxTextfieldModule, CommonModule, FormsModule, TranslateModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ServerInformationRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ServerInformationAdminComponent],
                    imports: [AdminSettingsModule, AdaptRxTextfieldModule, CommonModule, FormsModule, TranslateModule],
                    entryComponents: [ServerInformationAdminComponent]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=server-information-registration.module.js.map