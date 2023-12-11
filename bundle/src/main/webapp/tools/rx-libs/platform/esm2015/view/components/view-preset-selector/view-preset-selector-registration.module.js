import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RX_AVAILABLE_ON_DEVICES_PROP_DESC, RxViewComponentRegistryService, RxViewComponentType, ViewComponentPropertyType } from '@helix/platform/view/api';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { RX_VIEW_DESIGNER } from '@helix/platform/view/designer';
import { ViewPresetSelectorComponent } from './runtime/view-preset-selector.component';
import { ViewPresetSelectorModule } from './runtime/view-preset-selector.module';
import { ViewPresetSelectorDesignComponent } from './design/view-preset-selector-design.component';
import { ViewPresetSelectorDesignModel } from './design/view-preset-selector-design.model';
import { ViewPresetSelectorDesignModule } from './design/view-preset-selector-design.module';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class ViewPresetSelectorRegistrationModule {
    constructor(rxViewComponentRegistryService, componentFactoryResolver) {
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        this.componentFactoryResolver = componentFactoryResolver;
        rxViewComponentRegistryService.register({
            type: RxViewComponentType.ViewPresetSelector,
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(ViewPresetSelectorComponent),
            properties: [
                {
                    name: 'styles'
                },
                {
                    name: 'enableSharing',
                    type: ViewComponentPropertyType.Boolean,
                    designType: ViewComponentPropertyType.Boolean
                },
                RX_AVAILABLE_ON_DEVICES_PROP_DESC
            ],
            isContainerComponent: true,
            name: 'View preset selector',
            group: RX_VIEW_DESIGNER.stencilGroups.basicComponents.label,
            icon: 'screens_triangle_down_circle',
            designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(ViewPresetSelectorDesignComponent),
            designComponentModel: ViewPresetSelectorDesignModel,
            bundleId: RX_APPLICATION.platformBundleId
        }, {
            type: RxViewComponentType.ViewPreset,
            configPropertyName: 'viewPresets',
            isDataComponent: true,
            properties: [
                {
                    name: 'label',
                    localizable: true
                },
                {
                    name: 'index',
                    designType: ViewComponentPropertyType.Number,
                    type: ViewComponentPropertyType.Number
                }
            ]
        });
    }
}
ViewPresetSelectorRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewPresetSelectorRegistrationModule, deps: [{ token: i1.RxViewComponentRegistryService }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.NgModule });
ViewPresetSelectorRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewPresetSelectorRegistrationModule, imports: [ViewPresetSelectorDesignModule, ViewPresetSelectorModule] });
ViewPresetSelectorRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewPresetSelectorRegistrationModule, imports: [[ViewPresetSelectorDesignModule, ViewPresetSelectorModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewPresetSelectorRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ViewPresetSelectorDesignModule, ViewPresetSelectorModule]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxViewComponentRegistryService }, { type: i0.ComponentFactoryResolver }]; } });
//# sourceMappingURL=view-preset-selector-registration.module.js.map