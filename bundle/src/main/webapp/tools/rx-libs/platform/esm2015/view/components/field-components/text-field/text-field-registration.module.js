import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RxRecordQueryExpressionEvaluatorService, RxViewComponentRegistryService, RxViewComponentType, ViewComponentPropertyType } from '@helix/platform/view/api';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { RX_BASE_FIELD_PROPERTIES } from '../base-record-editor-field/runtime';
import { RX_FIELD_COMPONENTS } from '../field-components.constant';
import { TextFieldComponent } from './runtime/text-field.component';
import { TextFieldDesignComponent, TextFieldExpressionConfigurator } from './design';
import { TextFieldDesignModel } from './design/text-field-design.model';
import { TextFieldModule } from './runtime/text-field.module';
import { TextFieldDesignModule } from './design/text-field-design.module';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class TextFieldRegistrationModule {
    constructor(rxViewComponentRegistryService, componentFactoryResolver, rxRecordQueryExpressionEvaluatorService) {
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxRecordQueryExpressionEvaluatorService = rxRecordQueryExpressionEvaluatorService;
        rxViewComponentRegistryService.register({
            type: RxViewComponentType.Character,
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(TextFieldComponent),
            properties: [
                ...RX_BASE_FIELD_PROPERTIES,
                {
                    name: 'enableMultiSelection',
                    designType: ViewComponentPropertyType.Boolean
                },
                {
                    name: 'namedListDefinitionName',
                    designType: ViewComponentPropertyType.String
                },
                {
                    name: 'additionalQueryCriteria',
                    designType: ViewComponentPropertyType.String,
                    enableExpressionEvaluation: true,
                    evaluatorService: this.rxRecordQueryExpressionEvaluatorService
                }
            ],
            name: 'Text',
            group: RX_FIELD_COMPONENTS.stencilGroupName,
            icon: 'field_text',
            designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(TextFieldDesignComponent),
            designComponentModel: TextFieldDesignModel,
            expressionConfigurator: TextFieldExpressionConfigurator,
            options: {
                canBeEmbeddedInRecordEditor: true
            },
            canBeInsertedInto(componentTypes) {
                return componentTypes.includes(RxViewComponentType.RecordEditor);
            },
            bundleId: RX_APPLICATION.platformBundleId
        });
    }
}
TextFieldRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TextFieldRegistrationModule, deps: [{ token: i1.RxViewComponentRegistryService }, { token: i0.ComponentFactoryResolver }, { token: i1.RxRecordQueryExpressionEvaluatorService }], target: i0.ɵɵFactoryTarget.NgModule });
TextFieldRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TextFieldRegistrationModule, imports: [TextFieldModule, TextFieldDesignModule] });
TextFieldRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TextFieldRegistrationModule, imports: [[TextFieldModule, TextFieldDesignModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TextFieldRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [TextFieldModule, TextFieldDesignModule]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxViewComponentRegistryService }, { type: i0.ComponentFactoryResolver }, { type: i1.RxRecordQueryExpressionEvaluatorService }]; } });
//# sourceMappingURL=text-field-registration.module.js.map