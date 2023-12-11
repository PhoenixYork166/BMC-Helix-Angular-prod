import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RxViewComponentRegistryService, RxViewComponentType } from '@helix/platform/view/api';
import { RX_BASE_FIELD_PROPERTIES } from '../base-record-editor-field/runtime';
import { DecimalFieldComponent } from './runtime/decimal-field.component';
import { RX_FIELD_COMPONENTS } from '../field-components.constant';
import { DecimalFieldDesignComponent } from './design';
import { DecimalFieldDesignModel } from './design/decimal-field-design.model';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { DecimalFieldModule } from './runtime/decimal-field.module';
import { DecimalFieldDesignModule } from './design/decimal-field-design.module';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class DecimalFieldRegistrationModule {
    constructor(rxViewComponentRegistryService, componentFactoryResolver) {
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        this.componentFactoryResolver = componentFactoryResolver;
        const decimalFieldComponentFactory = this.componentFactoryResolver.resolveComponentFactory(DecimalFieldComponent);
        rxViewComponentRegistryService.register({
            type: RxViewComponentType.Decimal,
            aliases: [RxViewComponentType.Floating],
            componentFactory: decimalFieldComponentFactory,
            properties: RX_BASE_FIELD_PROPERTIES,
            name: 'Decimal',
            group: RX_FIELD_COMPONENTS.stencilGroupName,
            icon: 'field_decimal_number',
            designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(DecimalFieldDesignComponent),
            designComponentModel: DecimalFieldDesignModel,
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
DecimalFieldRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DecimalFieldRegistrationModule, deps: [{ token: i1.RxViewComponentRegistryService }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.NgModule });
DecimalFieldRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DecimalFieldRegistrationModule, imports: [DecimalFieldModule, DecimalFieldDesignModule] });
DecimalFieldRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DecimalFieldRegistrationModule, imports: [[DecimalFieldModule, DecimalFieldDesignModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DecimalFieldRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [DecimalFieldModule, DecimalFieldDesignModule]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxViewComponentRegistryService }, { type: i0.ComponentFactoryResolver }]; } });
//# sourceMappingURL=decimal-field-registration.module.js.map