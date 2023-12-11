import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { RxViewComponentRegistryService, RxViewComponentType } from '@helix/platform/view/api';
import { RX_BASE_FIELD_PROPERTIES } from '../base-record-editor-field/runtime/base-record-editor-field-properties.constant';
import { RX_FIELD_COMPONENTS } from '../field-components.constant';
import { RichTextareaFieldDesignComponent } from './design/rich-textarea-field-design.component';
import { RichTextareaFieldDesignModule } from './design/rich-textarea-field-design.module';
import { RichTextareaFieldDesignModel } from './design/rich-textarea-field-design.model';
import { RichTextareaFieldComponent } from './runtime/rich-textarea-field.component';
import { RichTextareaFieldModule } from './runtime/rich-textarea-field.module';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class RichTextareaFieldRegistrationModule {
    constructor(rxViewComponentRegistryService, componentFactoryResolver) {
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        this.componentFactoryResolver = componentFactoryResolver;
        rxViewComponentRegistryService.register({
            type: RxViewComponentType.RichTextarea,
            properties: RX_BASE_FIELD_PROPERTIES,
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(RichTextareaFieldComponent),
            name: 'Rich text area',
            icon: 'text_colorpicker_adapt',
            group: RX_FIELD_COMPONENTS.stencilGroupName,
            designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(RichTextareaFieldDesignComponent),
            designComponentModel: RichTextareaFieldDesignModel,
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
RichTextareaFieldRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RichTextareaFieldRegistrationModule, deps: [{ token: i1.RxViewComponentRegistryService }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.NgModule });
RichTextareaFieldRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RichTextareaFieldRegistrationModule, imports: [RichTextareaFieldDesignModule, RichTextareaFieldModule] });
RichTextareaFieldRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RichTextareaFieldRegistrationModule, imports: [[RichTextareaFieldDesignModule, RichTextareaFieldModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RichTextareaFieldRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [RichTextareaFieldDesignModule, RichTextareaFieldModule]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxViewComponentRegistryService }, { type: i0.ComponentFactoryResolver }]; } });
//# sourceMappingURL=rich-textarea-field-registration.module.js.map