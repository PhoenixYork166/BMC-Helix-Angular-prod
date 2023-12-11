import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RxViewComponentRegistryService, RxViewComponentType } from '@helix/platform/view/api';
import { RX_BASE_FIELD_PROPERTIES } from '../base-record-editor-field/runtime';
import { TimeFieldComponent } from './runtime/time-field.component';
import { RX_FIELD_COMPONENTS } from '../field-components.constant';
import { TimeFieldDesignComponent } from './design';
import { TimeFieldDesignModel } from './design/time-field-design.model';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { TimeFieldModule } from './runtime/time-field.module';
import { TimeFieldDesignModule } from './design/time-field-design.module';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class TimeFieldRegistrationModule {
    constructor(rxViewComponentRegistryService, componentFactoryResolver) {
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        this.componentFactoryResolver = componentFactoryResolver;
        rxViewComponentRegistryService.register({
            type: RxViewComponentType.Time,
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(TimeFieldComponent),
            properties: RX_BASE_FIELD_PROPERTIES,
            name: 'Time',
            group: RX_FIELD_COMPONENTS.stencilGroupName,
            icon: 'clock_o',
            designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(TimeFieldDesignComponent),
            designComponentModel: TimeFieldDesignModel,
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
TimeFieldRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TimeFieldRegistrationModule, deps: [{ token: i1.RxViewComponentRegistryService }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.NgModule });
TimeFieldRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TimeFieldRegistrationModule, imports: [TimeFieldModule, TimeFieldDesignModule] });
TimeFieldRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TimeFieldRegistrationModule, imports: [[TimeFieldModule, TimeFieldDesignModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TimeFieldRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [TimeFieldModule, TimeFieldDesignModule]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxViewComponentRegistryService }, { type: i0.ComponentFactoryResolver }]; } });
//# sourceMappingURL=time-field-registration.module.js.map