import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { TranslateModule } from '@ngx-translate/core';
import { GainsightAdminOptInComponent } from './gainsight-admin-opt-in.component';
import { AdaptAgreementModule, AdaptRxSelectModule, AdaptRxSwitchModule, AdaptButtonModule, AdaptEmptyStateModule } from '@bmc-ux/adapt-angular';
import { FormsModule } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class GainsightAdminOptInRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: 'rx-gainsight-admin-opt-in',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(GainsightAdminOptInComponent),
            name: 'Gainsight Admin Opt In',
            hidden: true,
            availableInBundles: [RX_APPLICATION.settingsBundleId]
        });
    }
}
GainsightAdminOptInRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: GainsightAdminOptInRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
GainsightAdminOptInRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: GainsightAdminOptInRegistrationModule, declarations: [GainsightAdminOptInComponent], imports: [TranslateModule,
        AdaptAgreementModule,
        AdaptRxSelectModule,
        FormsModule,
        AdaptRxSwitchModule,
        CommonModule,
        AdaptButtonModule,
        AdaptEmptyStateModule] });
GainsightAdminOptInRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: GainsightAdminOptInRegistrationModule, imports: [[
            TranslateModule,
            AdaptAgreementModule,
            AdaptRxSelectModule,
            FormsModule,
            AdaptRxSwitchModule,
            CommonModule,
            AdaptButtonModule,
            AdaptEmptyStateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: GainsightAdminOptInRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [GainsightAdminOptInComponent],
                    imports: [
                        TranslateModule,
                        AdaptAgreementModule,
                        AdaptRxSelectModule,
                        FormsModule,
                        AdaptRxSwitchModule,
                        CommonModule,
                        AdaptButtonModule,
                        AdaptEmptyStateModule
                    ],
                    entryComponents: [GainsightAdminOptInComponent]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=gainsight-admin-opt-in-registration.module.js.map