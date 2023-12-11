import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RX_STANDARD_PROPS_DESC, RX_VIEW_DEFINITION, RxViewComponentRegistryService, RxViewComponentType } from '@helix/platform/view/api';
import { RX_VIEW_DESIGNER } from '@helix/platform/view/designer';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { ButtonBarComponent } from './runtime/button-bar.component';
import { ButtonBarModule } from './runtime/button-bar.module';
import { ButtonBarDesignComponent } from './design/button-bar-design.component';
import { ButtonBarDesignModel } from './design/button-bar-design.model';
import { ButtonBarDesignModule } from './design/button-bar-design.module';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class ButtonBarRegistrationModule {
    constructor(rxViewComponentRegistryService, componentFactoryResolver) {
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        this.componentFactoryResolver = componentFactoryResolver;
        rxViewComponentRegistryService.register({
            type: RxViewComponentType.ButtonBar,
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(ButtonBarComponent),
            outlets: [
                {
                    name: RX_VIEW_DEFINITION.defaultOutletName
                }
            ],
            properties: RX_STANDARD_PROPS_DESC,
            name: 'Button bar',
            group: RX_VIEW_DESIGNER.stencilGroups.basicComponents.label,
            icon: 'button_panel_o',
            designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(ButtonBarDesignComponent),
            designComponentModel: ButtonBarDesignModel,
            options: {
                canBeEmbeddedInRecordEditor: true
            },
            bundleId: RX_APPLICATION.platformBundleId
        });
    }
}
ButtonBarRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ButtonBarRegistrationModule, deps: [{ token: i1.RxViewComponentRegistryService }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.NgModule });
ButtonBarRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ButtonBarRegistrationModule, imports: [ButtonBarModule, ButtonBarDesignModule] });
ButtonBarRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ButtonBarRegistrationModule, imports: [[ButtonBarModule, ButtonBarDesignModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ButtonBarRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ButtonBarModule, ButtonBarDesignModule]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxViewComponentRegistryService }, { type: i0.ComponentFactoryResolver }]; } });
//# sourceMappingURL=button-bar-registration.module.js.map