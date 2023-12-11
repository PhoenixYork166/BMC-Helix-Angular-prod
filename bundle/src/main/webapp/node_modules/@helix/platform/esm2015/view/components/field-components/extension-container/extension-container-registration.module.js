import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RxExtensionContainerComponent } from './runtime/extension-container.component';
import { RX_STANDARD_PROPS_DESC, RX_VIEW_DEFINITION, RxViewComponentRegistryService, RxViewComponentType } from '@helix/platform/view/api';
import { RX_EXTENSION_CONTAINER } from './extension-container.constant';
import { ExtensionContainerSectionComponent } from './runtime/extension-container-section/extension-container-section.component';
import { RX_FIELD_COMPONENTS } from '../field-components.constant';
import { ExtensionContainerDesignComponent } from './design';
import { ExtensionContainerDesignModel } from './design/extension-container-design.model';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { RxExtensionContainerModule } from './runtime/extension-container.module';
import { ExtensionContainerDesignModule } from './design/extension-container-design.module';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class ExtensionContainerRegistrationModule {
    constructor(rxViewComponentRegistryService, componentFactoryResolver) {
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService.register({
            type: RX_EXTENSION_CONTAINER.type,
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(RxExtensionContainerComponent),
            properties: RX_STANDARD_PROPS_DESC,
            outlets: [
                {
                    name: RX_VIEW_DEFINITION.defaultOutletName
                }
            ],
            name: 'Extension container',
            group: RX_FIELD_COMPONENTS.stencilGroupName,
            icon: 'widget',
            designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(ExtensionContainerDesignComponent),
            designComponentModel: ExtensionContainerDesignModel,
            options: {
                canBeEmbeddedInRecordEditor: true
            },
            canBeInsertedInto(componentTypes) {
                return componentTypes.includes(RxViewComponentType.RecordEditor);
            },
            bundleId: RX_APPLICATION.platformBundleId
        }, {
            type: RX_EXTENSION_CONTAINER.extensionContainerSectionComponent,
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(ExtensionContainerSectionComponent),
            properties: [
                {
                    name: 'api',
                    enableExpressionEvaluation: true
                }
            ],
            outlets: [
                {
                    name: RX_VIEW_DEFINITION.defaultOutletName
                }
            ]
        });
    }
}
ExtensionContainerRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExtensionContainerRegistrationModule, deps: [{ token: i1.RxViewComponentRegistryService }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.NgModule });
ExtensionContainerRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExtensionContainerRegistrationModule, imports: [RxExtensionContainerModule, ExtensionContainerDesignModule] });
ExtensionContainerRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExtensionContainerRegistrationModule, imports: [[RxExtensionContainerModule, ExtensionContainerDesignModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExtensionContainerRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [RxExtensionContainerModule, ExtensionContainerDesignModule]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxViewComponentRegistryService }, { type: i0.ComponentFactoryResolver }]; } });
//# sourceMappingURL=extension-container-registration.module.js.map