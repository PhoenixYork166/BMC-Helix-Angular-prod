import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RxViewComponentRegistryService, RxViewComponentType } from '@helix/platform/view/api';
import { RX_BASE_FIELD_PROPERTIES } from '../base-record-editor-field/runtime';
import { IntegerFieldComponent } from './runtime/integer-field.component';
import { RX_FIELD_COMPONENTS } from '../field-components.constant';
import { IntegerFieldDesignComponent } from './design';
import { IntegerFieldDesignModel } from './design/integer-field-design.model';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { IntegerFieldModule } from './runtime/integer-field.module';
import { IntegerFieldDesignModule } from './design/integer-field-design.module';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class IntegerFieldRegistrationModule {
    constructor(rxViewComponentRegistryService, componentFactoryResolver) {
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        this.componentFactoryResolver = componentFactoryResolver;
        rxViewComponentRegistryService.register({
            type: RxViewComponentType.Integer,
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(IntegerFieldComponent),
            properties: RX_BASE_FIELD_PROPERTIES,
            name: 'Integer',
            group: RX_FIELD_COMPONENTS.stencilGroupName,
            icon: 'field_integer_number',
            designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(IntegerFieldDesignComponent),
            designComponentModel: IntegerFieldDesignModel,
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
IntegerFieldRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IntegerFieldRegistrationModule, deps: [{ token: i1.RxViewComponentRegistryService }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.NgModule });
IntegerFieldRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IntegerFieldRegistrationModule, imports: [IntegerFieldModule, IntegerFieldDesignModule] });
IntegerFieldRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IntegerFieldRegistrationModule, imports: [[IntegerFieldModule, IntegerFieldDesignModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IntegerFieldRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [IntegerFieldModule, IntegerFieldDesignModule]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxViewComponentRegistryService }, { type: i0.ComponentFactoryResolver }]; } });
//# sourceMappingURL=integer-field-registration.module.js.map