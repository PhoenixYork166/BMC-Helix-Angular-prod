import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RX_STANDARD_PROPS_DESC, RX_VIEW_DEFINITION, RxViewComponentRegistryService, RxViewComponentType } from '@helix/platform/view/api';
import { RX_VIEW_DESIGNER } from '@helix/platform/view/designer';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { ContainerModule } from './runtime/container.module';
import { ContainerComponent } from './runtime/container.component';
import { ContainerDesignModel } from './design/container-design.model';
import { ContainerDesignModule } from './design/container-design.module';
import { ContainerDesignComponent } from './design/container-design.component';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class ContainerRegistrationModule {
    constructor(rxViewComponentRegistryService, componentFactoryResolver) {
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        this.componentFactoryResolver = componentFactoryResolver;
        rxViewComponentRegistryService.register({
            type: RxViewComponentType.Container,
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(ContainerComponent),
            properties: RX_STANDARD_PROPS_DESC,
            outlets: [
                {
                    name: RX_VIEW_DEFINITION.defaultOutletName
                }
            ],
            name: 'Container',
            group: RX_VIEW_DESIGNER.stencilGroups.basicComponents.label,
            icon: 'layout',
            designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(ContainerDesignComponent),
            designComponentModel: ContainerDesignModel,
            options: {
                canBeEmbeddedInRecordEditor: true
            },
            bundleId: RX_APPLICATION.platformBundleId
        });
    }
}
ContainerRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ContainerRegistrationModule, deps: [{ token: i1.RxViewComponentRegistryService }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.NgModule });
ContainerRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ContainerRegistrationModule, imports: [ContainerModule, ContainerDesignModule] });
ContainerRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ContainerRegistrationModule, imports: [[ContainerModule, ContainerDesignModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ContainerRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ContainerModule, ContainerDesignModule]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxViewComponentRegistryService }, { type: i0.ComponentFactoryResolver }]; } });
//# sourceMappingURL=container-registration.module.js.map