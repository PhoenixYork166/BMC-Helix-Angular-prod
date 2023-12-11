import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { CognitiveSearchEditorAdminComponent } from './cognitive-search-editor/cognitive-search-editor.component';
import { CognitiveSearchAdminComponent } from './cognitive-search.component';
import { TranslateModule } from '@ngx-translate/core';
import { AdaptAlertModule, AdaptButtonModule, AdaptDropdownModule, AdaptRxCounterModule, AdaptRxLabelModule, AdaptRxSelectModule, AdaptRxTextfieldModule, AdaptRxValidatorsModule, AdaptBusyModule } from '@bmc-ux/adapt-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminSettingsModule } from '@helix/platform/shared/components';
import { RecordGridModule } from '@helix/platform/view/components';
import { RxDefinitionPickerModule } from '@helix/platform/shared/components';
import { RxDirectivesModule } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class CognitiveSearchRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: 'rx-admin-cognitive-search',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(CognitiveSearchAdminComponent),
            name: 'Cognitive search',
            isPageComponent: true,
            availableInBundles: [RX_APPLICATION.settingsBundleId]
        });
    }
}
CognitiveSearchRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CognitiveSearchRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
CognitiveSearchRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CognitiveSearchRegistrationModule, declarations: [CognitiveSearchAdminComponent, CognitiveSearchEditorAdminComponent], imports: [CommonModule,
        AdaptButtonModule,
        AdaptDropdownModule,
        AdaptRxCounterModule,
        AdaptRxSelectModule,
        AdaptRxTextfieldModule,
        ReactiveFormsModule,
        RecordGridModule,
        RxDirectivesModule,
        RxDefinitionPickerModule,
        TranslateModule,
        AdminSettingsModule,
        AdaptRxLabelModule,
        AdaptRxValidatorsModule,
        AdaptAlertModule,
        AdaptBusyModule] });
CognitiveSearchRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CognitiveSearchRegistrationModule, imports: [[
            CommonModule,
            AdaptButtonModule,
            AdaptDropdownModule,
            AdaptRxCounterModule,
            AdaptRxSelectModule,
            AdaptRxTextfieldModule,
            ReactiveFormsModule,
            RecordGridModule,
            RxDirectivesModule,
            RxDefinitionPickerModule,
            TranslateModule,
            AdminSettingsModule,
            AdaptRxLabelModule,
            AdaptRxValidatorsModule,
            AdaptAlertModule,
            AdaptBusyModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CognitiveSearchRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [CognitiveSearchAdminComponent, CognitiveSearchEditorAdminComponent],
                    imports: [
                        CommonModule,
                        AdaptButtonModule,
                        AdaptDropdownModule,
                        AdaptRxCounterModule,
                        AdaptRxSelectModule,
                        AdaptRxTextfieldModule,
                        ReactiveFormsModule,
                        RecordGridModule,
                        RxDirectivesModule,
                        RxDefinitionPickerModule,
                        TranslateModule,
                        AdminSettingsModule,
                        AdaptRxLabelModule,
                        AdaptRxValidatorsModule,
                        AdaptAlertModule,
                        AdaptBusyModule
                    ],
                    entryComponents: [CognitiveSearchAdminComponent]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=cognitive-search-registration.module.js.map