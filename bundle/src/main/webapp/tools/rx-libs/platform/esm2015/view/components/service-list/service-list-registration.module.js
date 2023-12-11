import { RxViewComponentRegistryService, RxViewComponentType, ViewComponentPropertyType } from '@helix/platform/view/api';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RX_VIEW_DESIGNER } from '@helix/platform/view/designer';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { ServiceListDesignComponent } from './design/service-list-design.component';
import { ServiceListDesignModule } from './design/service-list-design.module';
import { ServiceListDesignModel } from './design/service-list-design.model';
import { ServiceListComponent } from './runtime/service-list.component';
import { ServiceListModule } from './runtime/service-list.module';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class ServiceListRegistrationModule {
    constructor(rxViewComponentRegistryService, componentFactoryResolver) {
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService.register({
            type: RxViewComponentType.ServiceList,
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(ServiceListComponent),
            name: 'Service list',
            group: RX_VIEW_DESIGNER.stencilGroups.chatbotComponents.label,
            options: {
                canBeEmbeddedInRecordEditor: true
            },
            canBeInsertedInto(componentTypes) {
                return componentTypes.includes(RxViewComponentType.RecordEditor);
            },
            properties: [
                {
                    name: 'serviceRequestId',
                    enableExpressionEvaluation: true,
                    type: ViewComponentPropertyType.String
                },
                {
                    name: 'serviceRequestName',
                    enableExpressionEvaluation: true,
                    type: ViewComponentPropertyType.String
                },
                {
                    name: 'serviceRequestGuid',
                    enableExpressionEvaluation: true,
                    type: ViewComponentPropertyType.String
                }
            ],
            designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(ServiceListDesignComponent),
            designComponentModel: ServiceListDesignModel,
            icon: 'field_dropdown',
            bundleId: RX_APPLICATION.chatbotBundleId,
            availableInBundles: [RX_APPLICATION.chatbotBundleId]
        });
    }
}
ServiceListRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ServiceListRegistrationModule, deps: [{ token: i1.RxViewComponentRegistryService }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.NgModule });
ServiceListRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ServiceListRegistrationModule, imports: [ServiceListModule, ServiceListDesignModule] });
ServiceListRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ServiceListRegistrationModule, imports: [[ServiceListModule, ServiceListDesignModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ServiceListRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ServiceListModule, ServiceListDesignModule]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxViewComponentRegistryService }, { type: i0.ComponentFactoryResolver }]; } });
//# sourceMappingURL=service-list-registration.module.js.map