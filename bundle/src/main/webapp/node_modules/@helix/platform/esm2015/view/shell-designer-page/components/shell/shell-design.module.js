import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxShellDesignComponent } from './shell-design.component';
import { RX_SHELL, RX_VIEW_DEFINITION, RxViewComponentRegistryService, ViewComponentPropertyType } from '@helix/platform/view/api';
import { RX_APPLICATION, RxDefinitionAdapterRegistryService } from '@helix/platform/shared/api';
import { RxShellDesignModel } from './shell-design.model';
import { ViewDesignerCanvasModule } from '@helix/platform/view/designer';
import { RxShellGlobalSearchRecordsControlModule } from './controls/shell-global-search-records-control/shell-global-search-records-control.module';
import { RxShellMenuItemsControlModule } from './controls/shell-menu-items-control/shell-menu-items-control.module';
import { RxShellDesignAdapterService } from './shell-design-adapter.service';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "./shell-design-adapter.service";
export class RxShellDesignModule {
    constructor(rxViewComponentRegistryService, componentFactoryResolver, rxDefinitionAdapterRegistryService, rxShellDesignAdapterService) {
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxDefinitionAdapterRegistryService = rxDefinitionAdapterRegistryService;
        this.rxShellDesignAdapterService = rxShellDesignAdapterService;
        rxViewComponentRegistryService.register({
            type: RX_SHELL.componentName,
            outlets: [
                {
                    name: RX_VIEW_DEFINITION.defaultOutletName
                },
                {
                    name: RX_SHELL.outlets.actions
                }
            ],
            properties: [
                {
                    name: 'allowAppSwitching',
                    designType: ViewComponentPropertyType.Boolean
                },
                {
                    name: 'globalSearchDisabled',
                    designType: ViewComponentPropertyType.Boolean
                },
                {
                    name: 'globalSearchUseDefault',
                    designType: ViewComponentPropertyType.Boolean
                },
                {
                    name: 'globalSearchRecords',
                    designType: ViewComponentPropertyType.Array
                }
            ],
            name: 'Navigation bar',
            hidden: true,
            group: 'Shell navigation',
            icon: 'layout',
            designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(RxShellDesignComponent),
            designComponentModel: RxShellDesignModel,
            bundleId: RX_APPLICATION.platformBundleId,
            options: {
                static: true
            }
        });
        this.rxDefinitionAdapterRegistryService.registerDesignAdapter(RX_SHELL.componentName, this.rxShellDesignAdapterService);
    }
}
RxShellDesignModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellDesignModule, deps: [{ token: i1.RxViewComponentRegistryService }, { token: i0.ComponentFactoryResolver }, { token: i2.RxDefinitionAdapterRegistryService }, { token: i3.RxShellDesignAdapterService }], target: i0.ɵɵFactoryTarget.NgModule });
RxShellDesignModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellDesignModule, declarations: [RxShellDesignComponent], imports: [CommonModule,
        ViewDesignerCanvasModule,
        RxShellGlobalSearchRecordsControlModule,
        RxShellMenuItemsControlModule] });
RxShellDesignModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellDesignModule, providers: [RxShellDesignAdapterService], imports: [[
            CommonModule,
            ViewDesignerCanvasModule,
            RxShellGlobalSearchRecordsControlModule,
            RxShellMenuItemsControlModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellDesignModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxShellDesignComponent],
                    imports: [
                        CommonModule,
                        ViewDesignerCanvasModule,
                        RxShellGlobalSearchRecordsControlModule,
                        RxShellMenuItemsControlModule
                    ],
                    providers: [RxShellDesignAdapterService]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxViewComponentRegistryService }, { type: i0.ComponentFactoryResolver }, { type: i2.RxDefinitionAdapterRegistryService }, { type: i3.RxShellDesignAdapterService }]; } });
//# sourceMappingURL=shell-design.module.js.map