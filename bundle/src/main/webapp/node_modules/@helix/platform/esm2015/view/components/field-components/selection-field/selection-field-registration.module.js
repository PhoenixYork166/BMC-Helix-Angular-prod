import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RxViewComponentRegistryService, RxViewComponentType } from '@helix/platform/view/api';
import { RX_BASE_FIELD_PROPERTIES } from '../base-record-editor-field/runtime';
import { SelectionFieldComponent } from './runtime/selection-field.component';
import { RX_FIELD_COMPONENTS } from '../field-components.constant';
import { SelectionFieldDesignComponent } from './design';
import { SelectionFieldDesignModel } from './design/selection-field-design.model';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { SelectionFieldModule } from './runtime/selection-field.module';
import { SelectionFieldDesignModule } from './design/selection-field-design.module';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class SelectionFieldRegistrationModule {
    constructor(rxViewComponentRegistryService, componentFactoryResolver) {
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        this.componentFactoryResolver = componentFactoryResolver;
        rxViewComponentRegistryService.register({
            type: RxViewComponentType.Selection,
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(SelectionFieldComponent),
            properties: RX_BASE_FIELD_PROPERTIES,
            name: 'Select',
            group: RX_FIELD_COMPONENTS.stencilGroupName,
            icon: 'field_dropdown',
            designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(SelectionFieldDesignComponent),
            designComponentModel: SelectionFieldDesignModel,
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
SelectionFieldRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectionFieldRegistrationModule, deps: [{ token: i1.RxViewComponentRegistryService }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.NgModule });
SelectionFieldRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectionFieldRegistrationModule, imports: [SelectionFieldModule, SelectionFieldDesignModule] });
SelectionFieldRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectionFieldRegistrationModule, imports: [[SelectionFieldModule, SelectionFieldDesignModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectionFieldRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [SelectionFieldModule, SelectionFieldDesignModule]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxViewComponentRegistryService }, { type: i0.ComponentFactoryResolver }]; } });
//# sourceMappingURL=selection-field-registration.module.js.map