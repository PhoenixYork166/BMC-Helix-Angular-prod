import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxShellActionDesignComponent } from './shell-action-design.component';
import { RX_SHELL, RxViewComponentRegistryService, ViewComponentPropertyType } from '@helix/platform/view/api';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { RxShellActionDesignModel } from './shell-action-design.model';
import { RxShellMenuItemExpressionConfigurator } from '../shell-menu-item/shell-menu-item-expression-configurator.class';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class RxShellActionDesignModule {
    constructor(rxViewComponentRegistryService, componentFactoryResolver) {
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        this.componentFactoryResolver = componentFactoryResolver;
        rxViewComponentRegistryService.register({
            type: RX_SHELL.navBar.action,
            properties: [
                {
                    name: 'menuItemName',
                    localizable: true
                },
                {
                    name: 'hidden',
                    designType: ViewComponentPropertyType.Boolean
                }
            ],
            name: 'Action',
            group: 'Shell navigation',
            icon: 'triangle_right_circle_o',
            index: 3,
            designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(RxShellActionDesignComponent),
            designComponentModel: RxShellActionDesignModel,
            bundleId: RX_APPLICATION.platformBundleId,
            expressionConfigurator: RxShellMenuItemExpressionConfigurator
        });
    }
}
RxShellActionDesignModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellActionDesignModule, deps: [{ token: i1.RxViewComponentRegistryService }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.NgModule });
RxShellActionDesignModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellActionDesignModule, declarations: [RxShellActionDesignComponent], imports: [CommonModule] });
RxShellActionDesignModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellActionDesignModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellActionDesignModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxShellActionDesignComponent],
                    imports: [CommonModule]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxViewComponentRegistryService }, { type: i0.ComponentFactoryResolver }]; } });
//# sourceMappingURL=shell-action-design.module.js.map