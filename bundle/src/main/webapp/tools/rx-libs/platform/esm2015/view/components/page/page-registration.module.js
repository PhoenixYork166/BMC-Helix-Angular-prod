import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RX_VIEW_DEFINITION, RxViewComponentRegistryService, RxViewComponentType } from '@helix/platform/view/api';
import { RX_VIEW_DESIGNER } from '@helix/platform/view/designer';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { PageModule } from './runtime/page.module';
import { PageComponent } from './runtime/page.component';
import { PageDesignModule } from './design/page-design.module';
import { PageDesignComponent } from './design/page-design.component';
import { PageDesignModel } from './design/page-design.model';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class PageRegistrationModule {
    constructor(rxViewComponentRegistryService, componentFactoryResolver) {
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService.register({
            type: RxViewComponentType.Page,
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(PageComponent),
            outlets: [
                {
                    name: RX_VIEW_DEFINITION.defaultOutletName
                }
            ],
            name: 'Page',
            group: RX_VIEW_DESIGNER.stencilGroups.basicComponents.label,
            designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(PageDesignComponent),
            designComponentModel: PageDesignModel,
            hidden: true,
            bundleId: RX_APPLICATION.platformBundleId
        });
    }
}
PageRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: PageRegistrationModule, deps: [{ token: i1.RxViewComponentRegistryService }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.NgModule });
PageRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: PageRegistrationModule, imports: [PageModule, PageDesignModule] });
PageRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: PageRegistrationModule, imports: [[PageModule, PageDesignModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: PageRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [PageModule, PageDesignModule]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxViewComponentRegistryService }, { type: i0.ComponentFactoryResolver }]; } });
//# sourceMappingURL=page-registration.module.js.map