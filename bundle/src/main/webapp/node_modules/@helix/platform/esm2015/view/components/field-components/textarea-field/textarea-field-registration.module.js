import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RxViewComponentRegistryService, RxViewComponentType } from '@helix/platform/view/api';
import { RX_BASE_FIELD_PROPERTIES } from '../base-record-editor-field/runtime';
import { TextareaFieldComponent } from './runtime/textarea-field.component';
import { RX_FIELD_COMPONENTS } from '../field-components.constant';
import { TextareaFieldDesignComponent } from './design';
import { TextareaFieldDesignModel } from './design/textarea-field-design.model';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { TextareaFieldModule } from './runtime/textarea-field.module';
import { TextareaFieldDesignModule } from './design/textarea-field-design.module';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class TextareaFieldRegistrationModule {
    constructor(rxViewComponentRegistryService, componentFactoryResolver) {
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        this.componentFactoryResolver = componentFactoryResolver;
        rxViewComponentRegistryService.register({
            type: RxViewComponentType.Textarea,
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(TextareaFieldComponent),
            properties: RX_BASE_FIELD_PROPERTIES,
            name: 'Textarea',
            group: RX_FIELD_COMPONENTS.stencilGroupName,
            icon: 'area_text',
            designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(TextareaFieldDesignComponent),
            designComponentModel: TextareaFieldDesignModel,
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
TextareaFieldRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TextareaFieldRegistrationModule, deps: [{ token: i1.RxViewComponentRegistryService }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.NgModule });
TextareaFieldRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TextareaFieldRegistrationModule, imports: [TextareaFieldModule, TextareaFieldDesignModule] });
TextareaFieldRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TextareaFieldRegistrationModule, imports: [[TextareaFieldModule, TextareaFieldDesignModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TextareaFieldRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [TextareaFieldModule, TextareaFieldDesignModule]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxViewComponentRegistryService }, { type: i0.ComponentFactoryResolver }]; } });
//# sourceMappingURL=textarea-field-registration.module.js.map