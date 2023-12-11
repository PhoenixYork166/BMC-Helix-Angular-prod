import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RxViewComponentRegistryService, RxViewComponentType } from '@helix/platform/view/api';
import { RX_BASE_FIELD_PROPERTIES } from '../base-record-editor-field/runtime';
import { DateFieldComponent } from './runtime/date-field.component';
import { RX_FIELD_COMPONENTS } from '../field-components.constant';
import { DateFieldDesignComponent } from './design/date-field-design.component';
import { DateFieldDesignModel } from './design/date-field-design.model';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { DateFieldModule } from './runtime/date-field.module';
import { DateFieldDesignModule } from './design/date-field-design.module';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class DateFieldRegistrationModule {
    constructor(rxViewComponentRegistryService, componentFactoryResolver) {
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        this.componentFactoryResolver = componentFactoryResolver;
        rxViewComponentRegistryService.register({
            type: RxViewComponentType.Date,
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(DateFieldComponent),
            properties: RX_BASE_FIELD_PROPERTIES,
            name: 'Date',
            group: RX_FIELD_COMPONENTS.stencilGroupName,
            icon: 'calendar',
            designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(DateFieldDesignComponent),
            designComponentModel: DateFieldDesignModel,
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
DateFieldRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateFieldRegistrationModule, deps: [{ token: i1.RxViewComponentRegistryService }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.NgModule });
DateFieldRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateFieldRegistrationModule, imports: [DateFieldModule, DateFieldDesignModule] });
DateFieldRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateFieldRegistrationModule, imports: [[DateFieldModule, DateFieldDesignModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateFieldRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [DateFieldModule, DateFieldDesignModule]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxViewComponentRegistryService }, { type: i0.ComponentFactoryResolver }]; } });
//# sourceMappingURL=date-field-registration.module.js.map