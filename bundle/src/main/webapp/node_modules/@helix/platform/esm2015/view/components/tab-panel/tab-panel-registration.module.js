import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RX_STANDARD_PROPS_DESC, RX_VIEW_DEFINITION, RxViewComponentRegistryService, RxViewComponentType, ViewComponentPropertyType } from '@helix/platform/view/api';
import { RX_VIEW_DESIGNER } from '@helix/platform/view/designer';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { RxTabPanelModule } from './runtime/tab-panel.module';
import { RxTabPanelComponent } from './runtime/tab-panel.component';
import { RxTabContainerComponent } from './runtime/tab-container/tab-container.component';
import { TabPanelDesignModule } from './design/tab-panel-design.module';
import { TabPanelDesignComponent } from './design/tab-panel-design.component';
import { TabContainerDesignComponent } from './design/tab-container-design/tab-container-design.component';
import { TabPanelDesignModel } from './design/tab-panel-design.model';
import { TabContainerDesignModel } from './design/tab-container-design/tab-container-design.model';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class TabPanelRegistrationModule {
    constructor(rxViewComponentRegistryService, componentFactoryResolver) {
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        this.componentFactoryResolver = componentFactoryResolver;
        rxViewComponentRegistryService.register({
            type: RxViewComponentType.TabPanel,
            componentFactory: componentFactoryResolver.resolveComponentFactory(RxTabPanelComponent),
            properties: RX_STANDARD_PROPS_DESC,
            outlets: [
                {
                    name: RX_VIEW_DEFINITION.defaultOutletName
                }
            ],
            options: {
                canBeEmbeddedInRecordEditor: true
            },
            name: 'Tab panel',
            group: RX_VIEW_DESIGNER.stencilGroups.basicComponents.label,
            icon: 'app_tab',
            designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(TabPanelDesignComponent),
            designComponentModel: TabPanelDesignModel,
            bundleId: RX_APPLICATION.platformBundleId
        }, {
            type: RxViewComponentType.TabContainer,
            componentFactory: componentFactoryResolver.resolveComponentFactory(RxTabContainerComponent),
            properties: [
                ...RX_STANDARD_PROPS_DESC,
                {
                    name: 'label',
                    type: ViewComponentPropertyType.String,
                    localizable: true
                },
                {
                    name: 'enableLazyLoading',
                    type: ViewComponentPropertyType.Boolean,
                    designType: ViewComponentPropertyType.Boolean,
                    enableExpressionEvaluation: true
                }
            ],
            outlets: [
                {
                    name: RX_VIEW_DEFINITION.defaultOutletName
                }
            ],
            name: 'Tab',
            group: RX_VIEW_DESIGNER.stencilGroups.basicComponents.label,
            hidden: true,
            icon: 'app_tab',
            designComponentFactory: componentFactoryResolver.resolveComponentFactory(TabContainerDesignComponent),
            designComponentModel: TabContainerDesignModel,
            bundleId: RX_APPLICATION.platformBundleId
        });
    }
}
TabPanelRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TabPanelRegistrationModule, deps: [{ token: i1.RxViewComponentRegistryService }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.NgModule });
TabPanelRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TabPanelRegistrationModule, imports: [RxTabPanelModule, TabPanelDesignModule] });
TabPanelRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TabPanelRegistrationModule, imports: [[RxTabPanelModule, TabPanelDesignModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TabPanelRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [RxTabPanelModule, TabPanelDesignModule]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxViewComponentRegistryService }, { type: i0.ComponentFactoryResolver }]; } });
//# sourceMappingURL=tab-panel-registration.module.js.map