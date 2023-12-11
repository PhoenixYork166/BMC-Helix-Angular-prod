import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RX_SHELL, RxViewComponentRegistryService, ViewComponentPropertyType } from '@helix/platform/view/api';
import { RX_APPLICATION, RxDefinitionAdapterRegistryService } from '@helix/platform/shared/api';
import { RxShellMenuItemDesignComponent } from './shell-menu-item-design.component';
import { RxShellMenuItemDesignModel } from './shell-menu-item-design.model';
import { RxShellMenuItemExpressionConfigurator } from './shell-menu-item-expression-configurator.class';
import { RxShellMenuItemDesignAdapterService } from './shell-menu-item-design-adapter.service';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "./shell-menu-item-design-adapter.service";
export class RxShellMenuItemDesignModule {
    constructor(rxViewComponentRegistryService, componentFactoryResolver, rxDefinitionAdapterRegistryService, rxShellMenuItemDesignAdapterService) {
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxDefinitionAdapterRegistryService = rxDefinitionAdapterRegistryService;
        this.rxShellMenuItemDesignAdapterService = rxShellMenuItemDesignAdapterService;
        rxViewComponentRegistryService.register({
            type: RX_SHELL.navBar.menuItem,
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
            name: 'Menu item',
            group: 'Shell navigation',
            icon: 'list',
            index: 2,
            designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(RxShellMenuItemDesignComponent),
            designComponentModel: RxShellMenuItemDesignModel,
            bundleId: RX_APPLICATION.platformBundleId,
            expressionConfigurator: RxShellMenuItemExpressionConfigurator
        });
        this.rxDefinitionAdapterRegistryService.registerDesignAdapter(RX_SHELL.navBar.menuItem, this.rxShellMenuItemDesignAdapterService);
    }
}
RxShellMenuItemDesignModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellMenuItemDesignModule, deps: [{ token: i1.RxViewComponentRegistryService }, { token: i0.ComponentFactoryResolver }, { token: i2.RxDefinitionAdapterRegistryService }, { token: i3.RxShellMenuItemDesignAdapterService }], target: i0.ɵɵFactoryTarget.NgModule });
RxShellMenuItemDesignModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellMenuItemDesignModule, declarations: [RxShellMenuItemDesignComponent], imports: [CommonModule] });
RxShellMenuItemDesignModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellMenuItemDesignModule, providers: [RxShellMenuItemDesignAdapterService], imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellMenuItemDesignModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxShellMenuItemDesignComponent],
                    imports: [CommonModule],
                    providers: [RxShellMenuItemDesignAdapterService]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxViewComponentRegistryService }, { type: i0.ComponentFactoryResolver }, { type: i2.RxDefinitionAdapterRegistryService }, { type: i3.RxShellMenuItemDesignAdapterService }]; } });
//# sourceMappingURL=shell-menu-item-design.module.js.map