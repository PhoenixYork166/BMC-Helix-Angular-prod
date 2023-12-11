import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RX_VIEW_DEFINITION, RxViewComponentRegistryService, RxViewComponentType } from '@helix/platform/view/api';
import { RX_BASE_FIELD_PROPERTIES } from '../base-record-editor-field/runtime/base-record-editor-field-properties.constant';
import { AssociationModule } from './runtime/association.module';
import { RxAssociationComponent } from './runtime/association.component';
import { RX_ASSOCIATION } from './association.types';
import { AssociationDesignModule } from './design/association-design.module';
import { RxAssociationDesignComponent } from './design/association-design.component';
import { RX_FIELD_COMPONENTS } from '../field-components.constant';
import { AssociationDesignModel } from './design/association-design.model';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { AssociationExpressionConfigurator } from './design/association-expression-configurator.class';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class AssociationRegistrationModule {
    constructor(rxViewComponentRegistryService, componentFactoryResolver) {
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        this.componentFactoryResolver = componentFactoryResolver;
        rxViewComponentRegistryService.register({
            type: RxViewComponentType.Association,
            isContainerComponent: true,
            designComponentModel: AssociationDesignModel,
            bundleId: RX_APPLICATION.platformBundleId,
            designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(RxAssociationDesignComponent),
            expressionConfigurator: AssociationExpressionConfigurator,
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(RxAssociationComponent),
            canBeInsertedInto(componentTypes) {
                return componentTypes.includes(RxViewComponentType.RecordEditor);
            },
            options: {
                canBeEmbeddedInRecordEditor: true
            },
            name: 'Association',
            group: RX_FIELD_COMPONENTS.stencilGroupName,
            icon: 'arrow_schema',
            properties: RX_BASE_FIELD_PROPERTIES.concat({
                name: 'recordInstance',
                enableExpressionEvaluation: true
            }),
            outlets: [
                {
                    name: RX_VIEW_DEFINITION.defaultOutletName
                }
            ]
        }, {
            type: RX_ASSOCIATION.componentTypes.associationFilter,
            configPropertyName: 'associationFilter',
            properties: [
                {
                    name: 'associationDefinitionName'
                },
                {
                    name: 'recordInstanceId',
                    enableExpressionEvaluation: true
                }
            ],
            isDataComponent: true
        }, {
            type: RX_ASSOCIATION.componentTypes.associatedRecordField,
            configPropertyName: 'associatedRecordField',
            isDataComponent: true,
            properties: [
                {
                    name: 'label',
                    localizable: true
                }
            ]
        });
    }
}
AssociationRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationRegistrationModule, deps: [{ token: i1.RxViewComponentRegistryService }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.NgModule });
AssociationRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationRegistrationModule, imports: [AssociationModule, AssociationDesignModule] });
AssociationRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationRegistrationModule, imports: [[AssociationModule, AssociationDesignModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [AssociationModule, AssociationDesignModule]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxViewComponentRegistryService }, { type: i0.ComponentFactoryResolver }]; } });
//# sourceMappingURL=association-registration.module.js.map