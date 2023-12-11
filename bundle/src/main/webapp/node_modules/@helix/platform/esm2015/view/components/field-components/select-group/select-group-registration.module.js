import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RX_BASE_FIELD_PROPERTIES } from '../base-record-editor-field/runtime';
import { SelectGroupComponent } from './runtime/select-group.component';
import { RX_AVAILABLE_ON_DEVICES_PROP_DESC, RX_VIEW_DEFINITION, RxViewComponentRegistryService, RxViewComponentType } from '@helix/platform/view/api';
import { SelectGroupFieldComponent } from './runtime/select-group-field.component';
import { SelectGroupDesignComponent } from './design/select-group-design.component';
import { RX_FIELD_COMPONENTS } from '../field-components.constant';
import { SelectGroupDesignModel } from './design/select-group-design.model';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { SelectGroupModule } from './runtime/select-group.module';
import { SelectGroupDesignModule } from './design/select-group-design.module';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class SelectGroupRegistrationModule {
    constructor(rxViewComponentRegistryService, componentFactoryResolver) {
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        this.componentFactoryResolver = componentFactoryResolver;
        rxViewComponentRegistryService.register({
            type: RxViewComponentType.SelectGroup,
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(SelectGroupComponent),
            properties: [RX_AVAILABLE_ON_DEVICES_PROP_DESC],
            outlets: [
                {
                    name: RX_VIEW_DEFINITION.defaultOutletName
                }
            ],
            name: 'Select group',
            designComponentFactory: componentFactoryResolver.resolveComponentFactory(SelectGroupDesignComponent),
            designComponentModel: SelectGroupDesignModel,
            isContainerComponent: true,
            group: RX_FIELD_COMPONENTS.stencilGroupName,
            icon: 'field_dropdowns',
            options: {
                canBeEmbeddedInRecordEditor: true
            },
            canBeInsertedInto(componentTypes) {
                return componentTypes.includes(RxViewComponentType.RecordEditor);
            },
            bundleId: RX_APPLICATION.platformBundleId
        }, {
            type: RxViewComponentType.SelectGroupField,
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(SelectGroupFieldComponent),
            properties: RX_BASE_FIELD_PROPERTIES,
            isDataComponent: true
        });
    }
}
SelectGroupRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectGroupRegistrationModule, deps: [{ token: i1.RxViewComponentRegistryService }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.NgModule });
SelectGroupRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectGroupRegistrationModule, imports: [SelectGroupModule, SelectGroupDesignModule] });
SelectGroupRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectGroupRegistrationModule, imports: [[SelectGroupModule, SelectGroupDesignModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectGroupRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [SelectGroupModule, SelectGroupDesignModule]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxViewComponentRegistryService }, { type: i0.ComponentFactoryResolver }]; } });
//# sourceMappingURL=select-group-registration.module.js.map