import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RxViewComponentRegistryService, RxViewComponentType } from '@helix/platform/view/api';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { BooleanFieldModule } from './runtime/boolean-field.module';
import { BooleanFieldComponent } from './runtime/boolean-field.component';
import { BooleanFieldDesignModule } from './design/boolean-field-design.module';
import { BooleanFieldDesignModel } from './design/boolean-field-design.model';
import { BooleanFieldDesignComponent } from './design/boolean-field-design.component';
import { RX_BASE_FIELD_PROPERTIES } from '../base-record-editor-field/runtime/base-record-editor-field-properties.constant';
import { RX_FIELD_COMPONENTS } from '../field-components.constant';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class BooleanFieldRegistrationModule {
    constructor(rxViewComponentRegistryService, componentFactoryResolver) {
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        this.componentFactoryResolver = componentFactoryResolver;
        rxViewComponentRegistryService.register({
            type: RxViewComponentType.Boolean,
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(BooleanFieldComponent),
            properties: RX_BASE_FIELD_PROPERTIES,
            name: 'Boolean',
            group: RX_FIELD_COMPONENTS.stencilGroupName,
            icon: 'switcher_check',
            designComponentModel: BooleanFieldDesignModel,
            designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(BooleanFieldDesignComponent),
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
BooleanFieldRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BooleanFieldRegistrationModule, deps: [{ token: i1.RxViewComponentRegistryService }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.NgModule });
BooleanFieldRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BooleanFieldRegistrationModule, imports: [BooleanFieldModule, BooleanFieldDesignModule] });
BooleanFieldRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BooleanFieldRegistrationModule, imports: [[BooleanFieldModule, BooleanFieldDesignModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BooleanFieldRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [BooleanFieldModule, BooleanFieldDesignModule]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxViewComponentRegistryService }, { type: i0.ComponentFactoryResolver }]; } });
//# sourceMappingURL=boolean-field-registration.module.js.map