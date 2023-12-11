import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RxViewComponentRegistryService, RxViewComponentType } from '@helix/platform/view/api';
import { RX_BASE_FIELD_PROPERTIES } from '../base-record-editor-field/runtime';
import { DateTimeFieldComponent } from './runtime/date-time-field.component';
import { RX_FIELD_COMPONENTS } from '../field-components.constant';
import { DateTimeFieldDesignComponent } from './design';
import { DateTimeFieldDesignModel } from './design/date-time-field-design.model';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { DateTimeFieldModule } from './runtime/date-time-field.module';
import { DateTimeFieldDesignModule } from './design/date-time-field-design.module';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class DateTimeFieldRegistrationModule {
    constructor(rxViewComponentRegistryService, componentFactoryResolver) {
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        this.componentFactoryResolver = componentFactoryResolver;
        rxViewComponentRegistryService.register({
            type: RxViewComponentType.DateTime,
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(DateTimeFieldComponent),
            properties: RX_BASE_FIELD_PROPERTIES,
            name: 'Date/Time',
            group: RX_FIELD_COMPONENTS.stencilGroupName,
            icon: 'calendar_clock_o',
            designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(DateTimeFieldDesignComponent),
            designComponentModel: DateTimeFieldDesignModel,
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
DateTimeFieldRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateTimeFieldRegistrationModule, deps: [{ token: i1.RxViewComponentRegistryService }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.NgModule });
DateTimeFieldRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateTimeFieldRegistrationModule, imports: [DateTimeFieldModule, DateTimeFieldDesignModule] });
DateTimeFieldRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateTimeFieldRegistrationModule, imports: [[DateTimeFieldModule, DateTimeFieldDesignModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateTimeFieldRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [DateTimeFieldModule, DateTimeFieldDesignModule]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxViewComponentRegistryService }, { type: i0.ComponentFactoryResolver }]; } });
//# sourceMappingURL=date-time-field-registration.module.js.map