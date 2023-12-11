import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RxViewComponentRegistryService, RxViewComponentType } from '@helix/platform/view/api';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { RX_BASE_FIELD_PROPERTIES } from '../base-record-editor-field/runtime/base-record-editor-field-properties.constant';
import { AttachmentFieldModule } from './runtime/attachment-field.module';
import { AttachmentFieldComponent } from './runtime/attachment-field.component';
import { AttachmentFieldDesignModule } from './design/attachment-field-design.module';
import { AttachmentFieldDesignComponent } from './design/attachment-field-design.component';
import { AttachmentFieldDesignModel } from './design/attachment-field-design.model';
import { RX_FIELD_COMPONENTS } from '../field-components.constant';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class AttachmentFieldRegistrationModule {
    constructor(rxViewComponentRegistryService, componentFactoryResolver) {
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        this.componentFactoryResolver = componentFactoryResolver;
        rxViewComponentRegistryService.register({
            type: RxViewComponentType.Attachment,
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(AttachmentFieldComponent),
            properties: RX_BASE_FIELD_PROPERTIES,
            name: 'Attachment',
            group: RX_FIELD_COMPONENTS.stencilGroupName,
            icon: 'paperclip',
            designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(AttachmentFieldDesignComponent),
            designComponentModel: AttachmentFieldDesignModel,
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
AttachmentFieldRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AttachmentFieldRegistrationModule, deps: [{ token: i1.RxViewComponentRegistryService }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.NgModule });
AttachmentFieldRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AttachmentFieldRegistrationModule, imports: [AttachmentFieldModule, AttachmentFieldDesignModule] });
AttachmentFieldRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AttachmentFieldRegistrationModule, imports: [[AttachmentFieldModule, AttachmentFieldDesignModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AttachmentFieldRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [AttachmentFieldModule, AttachmentFieldDesignModule]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxViewComponentRegistryService }, { type: i0.ComponentFactoryResolver }]; } });
//# sourceMappingURL=attachment-field-registration.module.js.map