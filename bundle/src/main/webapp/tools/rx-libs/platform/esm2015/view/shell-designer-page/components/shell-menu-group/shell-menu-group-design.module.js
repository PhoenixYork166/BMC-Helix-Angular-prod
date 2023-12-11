import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxShellMenuGroupDesignComponent } from './shell-menu-group-design.component';
import { RX_SHELL, RX_VIEW_DEFINITION, RxViewComponentRegistryService, ViewComponentPropertyType } from '@helix/platform/view/api';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { RxShellMenuGroupDesignModel } from './shell-menu-group-design.model';
import { RxComponentPermissionEditorWidgetModule, ViewDesignerCanvasModule } from '@helix/platform/view/designer';
import { AdaptDropdownModule } from '@bmc-ux/adapt-angular';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class RxShellMenuGroupDesignModule {
    constructor(rxViewComponentRegistryService, componentFactoryResolver) {
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        this.componentFactoryResolver = componentFactoryResolver;
        rxViewComponentRegistryService.register({
            type: RX_SHELL.navBar.menuGroup,
            properties: [
                {
                    name: 'menuGroupName',
                    localizable: true
                },
                {
                    name: 'hidden',
                    designType: ViewComponentPropertyType.Boolean
                }
            ],
            name: 'Menu',
            group: 'Shell navigation',
            icon: 'app_list',
            index: 1,
            designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(RxShellMenuGroupDesignComponent),
            designComponentModel: RxShellMenuGroupDesignModel,
            bundleId: RX_APPLICATION.platformBundleId,
            outlets: [
                {
                    name: RX_VIEW_DEFINITION.defaultOutletName
                }
            ]
        });
    }
}
RxShellMenuGroupDesignModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellMenuGroupDesignModule, deps: [{ token: i1.RxViewComponentRegistryService }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.NgModule });
RxShellMenuGroupDesignModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellMenuGroupDesignModule, declarations: [RxShellMenuGroupDesignComponent], imports: [CommonModule, ViewDesignerCanvasModule, RxComponentPermissionEditorWidgetModule, AdaptDropdownModule] });
RxShellMenuGroupDesignModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellMenuGroupDesignModule, imports: [[CommonModule, ViewDesignerCanvasModule, RxComponentPermissionEditorWidgetModule, AdaptDropdownModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellMenuGroupDesignModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxShellMenuGroupDesignComponent],
                    imports: [CommonModule, ViewDesignerCanvasModule, RxComponentPermissionEditorWidgetModule, AdaptDropdownModule]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxViewComponentRegistryService }, { type: i0.ComponentFactoryResolver }]; } });
//# sourceMappingURL=shell-menu-group-design.module.js.map