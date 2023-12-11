import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DataTemplatesComponent } from './data-templates.component';
import { RecordGridModule } from '@helix/platform/view/components';
import { AdaptButtonModule, AdaptRxRadiobuttonModule, AdaptRxSelectModule, AdaptRxTextareaModule, AdaptRxTextfieldModule, AdaptRxUploaderModule } from '@bmc-ux/adapt-angular';
import { DataTemplateEditorComponent } from './data-template-editor/data-template-editor.component';
import { RxBusyIndicatorModule } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class DataTemplatesRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: 'dl-dataload-data-templates',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(DataTemplatesComponent),
            name: 'Data templates',
            isPageComponent: true,
            availableInBundles: [RX_APPLICATION.dataloadBundleId]
        });
    }
}
DataTemplatesRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataTemplatesRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
DataTemplatesRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataTemplatesRegistrationModule, declarations: [DataTemplatesComponent, DataTemplateEditorComponent], imports: [AdaptButtonModule,
        CommonModule,
        FormsModule,
        TranslateModule,
        RecordGridModule,
        AdaptRxSelectModule,
        ReactiveFormsModule,
        AdaptRxTextfieldModule,
        AdaptRxRadiobuttonModule,
        AdaptRxUploaderModule,
        AdaptRxTextareaModule,
        RxBusyIndicatorModule] });
DataTemplatesRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataTemplatesRegistrationModule, imports: [[
            AdaptButtonModule,
            CommonModule,
            FormsModule,
            TranslateModule,
            RecordGridModule,
            AdaptRxSelectModule,
            ReactiveFormsModule,
            AdaptRxTextfieldModule,
            AdaptRxRadiobuttonModule,
            AdaptRxUploaderModule,
            AdaptRxTextareaModule,
            RxBusyIndicatorModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataTemplatesRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [DataTemplatesComponent, DataTemplateEditorComponent],
                    imports: [
                        AdaptButtonModule,
                        CommonModule,
                        FormsModule,
                        TranslateModule,
                        RecordGridModule,
                        AdaptRxSelectModule,
                        ReactiveFormsModule,
                        AdaptRxTextfieldModule,
                        AdaptRxRadiobuttonModule,
                        AdaptRxUploaderModule,
                        AdaptRxTextareaModule,
                        RxBusyIndicatorModule
                    ],
                    entryComponents: [DataTemplatesComponent]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=data-templates-registration.module.js.map