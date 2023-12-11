import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { RX_VIEW_DEFINITION, RxViewComponentRegistryService, RxViewComponentType } from '@helix/platform/view/api';
import { UnknownDesignComponent } from './design/unknown-design.component';
import { UnknownDesignModel } from './design/unknown-design.model';
import { UnknownDesignModule } from './design/unknown-design.module';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class UnknownRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: RxViewComponentType.Unknown,
            outlets: [
                {
                    name: RX_VIEW_DEFINITION.defaultOutletName
                }
            ],
            name: 'Unknown',
            designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(UnknownDesignComponent),
            designComponentModel: UnknownDesignModel,
            hidden: true,
            bundleId: RX_APPLICATION.platformBundleId
        });
    }
}
UnknownRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: UnknownRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
UnknownRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: UnknownRegistrationModule, imports: [UnknownDesignModule] });
UnknownRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: UnknownRegistrationModule, imports: [[UnknownDesignModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: UnknownRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [UnknownDesignModule]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=unknown-registration.module.js.map