import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { SummarizationTestingAdminComponent } from './summarization-testing.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdaptAccordionModule, AdaptAlertModule, AdaptButtonModule, AdaptPopoverModule, AdaptRxCounterModule, AdaptRxLabelModule, AdaptRxSelectModule, AdaptRxTextareaModule, AdaptRxTextfieldModule, AdaptRxValidatorsModule, AdaptBusyModule } from '@bmc-ux/adapt-angular';
import { CommonModule } from '@angular/common';
import { AdminSettingsModule, RxDefinitionPickerModule } from '@helix/platform/shared/components';
import { RecordGridModule } from '@helix/platform/view/components';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { TranslateModule } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class SummarizationTestingRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: 'rx-admin-summarization-testing',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(SummarizationTestingAdminComponent),
            name: 'Summarization testing',
            isPageComponent: true,
            availableInBundles: [RX_APPLICATION.settingsBundleId]
        });
    }
}
SummarizationTestingRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SummarizationTestingRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
SummarizationTestingRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SummarizationTestingRegistrationModule, declarations: [SummarizationTestingAdminComponent], imports: [AdminSettingsModule,
        AdaptAccordionModule,
        AdaptButtonModule,
        AdaptRxTextareaModule,
        AdaptRxSelectModule,
        AdaptRxCounterModule,
        AdaptRxTextfieldModule,
        AdaptRxLabelModule,
        AdaptAlertModule,
        CommonModule,
        ReactiveFormsModule,
        RxDefinitionPickerModule,
        RecordGridModule,
        ClipboardModule,
        AdaptPopoverModule,
        AdaptRxValidatorsModule,
        TranslateModule,
        AdaptBusyModule] });
SummarizationTestingRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SummarizationTestingRegistrationModule, imports: [[
            AdminSettingsModule,
            AdaptAccordionModule,
            AdaptButtonModule,
            AdaptRxTextareaModule,
            AdaptRxSelectModule,
            AdaptRxCounterModule,
            AdaptRxTextfieldModule,
            AdaptRxLabelModule,
            AdaptAlertModule,
            CommonModule,
            ReactiveFormsModule,
            RxDefinitionPickerModule,
            RecordGridModule,
            ClipboardModule,
            AdaptPopoverModule,
            AdaptRxValidatorsModule,
            TranslateModule,
            AdaptBusyModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SummarizationTestingRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [SummarizationTestingAdminComponent],
                    imports: [
                        AdminSettingsModule,
                        AdaptAccordionModule,
                        AdaptButtonModule,
                        AdaptRxTextareaModule,
                        AdaptRxSelectModule,
                        AdaptRxCounterModule,
                        AdaptRxTextfieldModule,
                        AdaptRxLabelModule,
                        AdaptAlertModule,
                        CommonModule,
                        ReactiveFormsModule,
                        RxDefinitionPickerModule,
                        RecordGridModule,
                        ClipboardModule,
                        AdaptPopoverModule,
                        AdaptRxValidatorsModule,
                        TranslateModule,
                        AdaptBusyModule
                    ],
                    entryComponents: [SummarizationTestingAdminComponent]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=summarization-testing-registration.module.js.map