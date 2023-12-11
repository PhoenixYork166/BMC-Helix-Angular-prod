import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxShellUserMenuDesignComponent } from './shell-user-menu-design.component';
import { RX_SHELL, RX_VIEW_DEFINITION, RxViewComponentRegistryService } from '@helix/platform/view/api';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { RxShellUserMenuDesignModel } from './shell-user-menu-design.model';
import { ViewDesignerCanvasModule } from '@helix/platform/view/designer';
import { AdaptDropdownModule } from '@bmc-ux/adapt-angular';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class RxShellUserMenuDesignModule {
    constructor(rxViewComponentRegistryService, componentFactoryResolver) {
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        this.componentFactoryResolver = componentFactoryResolver;
        rxViewComponentRegistryService.register({
            type: RX_SHELL.navBar.userMenu,
            properties: [],
            name: 'User menu',
            hidden: true,
            group: 'Shell navigation',
            icon: 'cube_square',
            designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(RxShellUserMenuDesignComponent),
            designComponentModel: RxShellUserMenuDesignModel,
            bundleId: RX_APPLICATION.platformBundleId,
            outlets: [
                {
                    name: RX_VIEW_DEFINITION.defaultOutletName
                }
            ],
            options: {
                static: true
            }
        });
    }
}
RxShellUserMenuDesignModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellUserMenuDesignModule, deps: [{ token: i1.RxViewComponentRegistryService }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.NgModule });
RxShellUserMenuDesignModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellUserMenuDesignModule, declarations: [RxShellUserMenuDesignComponent], imports: [CommonModule, ViewDesignerCanvasModule, AdaptDropdownModule] });
RxShellUserMenuDesignModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellUserMenuDesignModule, imports: [[CommonModule, ViewDesignerCanvasModule, AdaptDropdownModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellUserMenuDesignModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxShellUserMenuDesignComponent],
                    imports: [CommonModule, ViewDesignerCanvasModule, AdaptDropdownModule]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxViewComponentRegistryService }, { type: i0.ComponentFactoryResolver }]; } });
//# sourceMappingURL=shell-user-menu-design.module.js.map