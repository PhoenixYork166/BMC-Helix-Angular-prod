import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RX_DISABLED_PROP_DESC, RX_STANDARD_PROPS_DESC, RxViewComponentRegistryService, RxViewComponentType } from '@helix/platform/view/api';
import { RX_VIEW_DESIGNER } from '@helix/platform/view/designer';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { ActionButtonDesignModel } from './design/action-button-design.model';
import { ActionButtonDesignModule } from './design/action-button-design.module';
import { ActionButtonDesignComponent } from './design/action-button-design.component';
import { ActionButtonModule } from './runtime/action-button.module';
import { ActionButtonComponent } from './runtime/action-button.component';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class ActionButtonRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: RxViewComponentType.ActionButton,
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(ActionButtonComponent),
            properties: [
                {
                    name: 'recordDefinitionName'
                },
                {
                    name: 'fieldId'
                },
                {
                    name: 'recordInstance',
                    enableExpressionEvaluation: true
                },
                {
                    name: 'label',
                    localizable: true
                },
                RX_DISABLED_PROP_DESC,
                ...RX_STANDARD_PROPS_DESC
            ],
            name: 'Action button',
            isContainerComponent: true,
            options: {
                canBeEmbeddedInRecordEditor: true
            },
            group: RX_VIEW_DESIGNER.stencilGroups.basicComponents.label,
            icon: 'action_button_cursor',
            designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(ActionButtonDesignComponent),
            designComponentModel: ActionButtonDesignModel,
            bundleId: RX_APPLICATION.platformBundleId
        });
    }
}
ActionButtonRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionButtonRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
ActionButtonRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionButtonRegistrationModule, imports: [ActionButtonDesignModule, ActionButtonModule] });
ActionButtonRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionButtonRegistrationModule, imports: [[ActionButtonDesignModule, ActionButtonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionButtonRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ActionButtonDesignModule, ActionButtonModule]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=action-button-registration.module.js.map