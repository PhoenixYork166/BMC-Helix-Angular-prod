import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RX_AVAILABLE_ON_DEVICES_PROP_DESC, RX_VIEW_DEFINITION, RxViewComponentRegistryService, RxViewComponentType } from '@helix/platform/view/api';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { RX_VIEW_DESIGNER } from '@helix/platform/view/designer';
import { RecordEditorModule } from './runtime/record-editor.module';
import { RecordEditorComponent } from './runtime/record-editor.component';
import { RecordEditorDesignModule } from './design/record-editor-design.module';
import { RecordEditorDesignComponent } from './design/record-editor-design.component';
import { RecordEditorDesignModel } from './design/record-editor-design.model';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class RecordEditorRegistrationModule {
    constructor(rxViewComponentRegistryService, componentFactoryResolver) {
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        this.componentFactoryResolver = componentFactoryResolver;
        rxViewComponentRegistryService.register({
            type: RxViewComponentType.RecordEditor,
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(RecordEditorComponent),
            properties: [
                {
                    name: 'recordInstanceId',
                    enableExpressionEvaluation: true
                },
                {
                    name: 'allowEdit',
                    enableExpressionEvaluation: true
                },
                {
                    name: 'label',
                    localizable: true
                },
                RX_AVAILABLE_ON_DEVICES_PROP_DESC
            ],
            outlets: [
                {
                    name: RX_VIEW_DEFINITION.defaultOutletName
                }
            ],
            name: 'Record editor',
            group: RX_VIEW_DESIGNER.stencilGroups.basicComponents.label,
            icon: 'file_text',
            designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(RecordEditorDesignComponent),
            designComponentModel: RecordEditorDesignModel,
            bundleId: RX_APPLICATION.platformBundleId
        });
    }
}
RecordEditorRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordEditorRegistrationModule, deps: [{ token: i1.RxViewComponentRegistryService }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.NgModule });
RecordEditorRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordEditorRegistrationModule, imports: [RecordEditorModule, RecordEditorDesignModule] });
RecordEditorRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordEditorRegistrationModule, imports: [[RecordEditorModule, RecordEditorDesignModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordEditorRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [RecordEditorModule, RecordEditorDesignModule]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxViewComponentRegistryService }, { type: i0.ComponentFactoryResolver }]; } });
//# sourceMappingURL=record-editor-registration.module.js.map