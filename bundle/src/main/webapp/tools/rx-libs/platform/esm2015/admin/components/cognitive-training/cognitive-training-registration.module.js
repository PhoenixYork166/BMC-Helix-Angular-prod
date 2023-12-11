import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdaptAccordionModule, AdaptAlertModule, AdaptButtonModule, AdaptDockedPanelModule, AdaptDropdownModule, AdaptModalModule, AdaptRxCounterModule, AdaptRxSelectModule, AdaptRxTextfieldModule, AdaptRxUploaderModule, AdaptRxValidatorsModule, AdaptTabsModule } from '@bmc-ux/adapt-angular';
import { RX_APPLICATION, RxDefinitionModule } from '@helix/platform/shared/api';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { ExpressionFormControlModule, GroupButtonFormControlModule, RxDefinitionPickerModule } from '@helix/platform/shared/components';
import { RecordGridDesignModule, RecordGridFilterSelectControlModule, RecordGridModule } from '@helix/platform/view/components';
import { AdminSettingsModule } from '@helix/platform/shared/components';
import { RxBusyIndicatorModule } from '@helix/platform/ui-kit';
import { CognitiveTrainingAdminComponent } from './cognitive-training.component';
import { CognitiveTrainingRecordGridComponent } from './components/cognitive-training-record-grid/cognitive-training-record-grid.component';
import { RecordDataSetBladeComponent } from './components/record-data-set-blade/record-data-set-blade.component';
import { FileDataSetBladeComponent } from './components/file-data-set-blade/file-data-set-blade.component';
import { ChatbotDataSetBladeComponent } from './components/chatbot-data-set-blade/chatbot-data-set-blade.component';
import { InteractiveEvaluationBladeComponent } from './components/interactive-evaluation-blade/interactive-evaluation-blade.component';
import { TranslateModule } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class CognitiveTrainingRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: 'rx-admin-cognitive-training',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(CognitiveTrainingAdminComponent),
            name: 'Cognitive training',
            isPageComponent: true,
            availableInBundles: [RX_APPLICATION.settingsBundleId]
        });
    }
}
CognitiveTrainingRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CognitiveTrainingRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
CognitiveTrainingRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CognitiveTrainingRegistrationModule, declarations: [ChatbotDataSetBladeComponent,
        CognitiveTrainingAdminComponent,
        CognitiveTrainingRecordGridComponent,
        FileDataSetBladeComponent,
        InteractiveEvaluationBladeComponent,
        RecordDataSetBladeComponent], imports: [AdaptAccordionModule,
        AdaptAlertModule,
        AdaptButtonModule,
        AdaptDockedPanelModule,
        AdaptDropdownModule,
        AdaptModalModule,
        AdaptRxCounterModule,
        AdaptRxSelectModule,
        AdaptRxTextfieldModule,
        AdaptRxUploaderModule,
        AdaptRxValidatorsModule,
        AdaptTabsModule,
        AdminSettingsModule,
        CommonModule,
        ExpressionFormControlModule,
        FormsModule,
        GroupButtonFormControlModule,
        RecordGridDesignModule,
        RecordGridModule,
        RxBusyIndicatorModule,
        RxDefinitionModule,
        RxDefinitionPickerModule,
        TranslateModule,
        RecordGridFilterSelectControlModule] });
CognitiveTrainingRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CognitiveTrainingRegistrationModule, imports: [[
            AdaptAccordionModule,
            AdaptAlertModule,
            AdaptButtonModule,
            AdaptDockedPanelModule,
            AdaptDropdownModule,
            AdaptModalModule,
            AdaptRxCounterModule,
            AdaptRxSelectModule,
            AdaptRxTextfieldModule,
            AdaptRxUploaderModule,
            AdaptRxValidatorsModule,
            AdaptTabsModule,
            AdminSettingsModule,
            CommonModule,
            ExpressionFormControlModule,
            FormsModule,
            GroupButtonFormControlModule,
            RecordGridDesignModule,
            RecordGridModule,
            RxBusyIndicatorModule,
            RxDefinitionModule,
            RxDefinitionPickerModule,
            TranslateModule,
            RecordGridFilterSelectControlModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CognitiveTrainingRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        ChatbotDataSetBladeComponent,
                        CognitiveTrainingAdminComponent,
                        CognitiveTrainingRecordGridComponent,
                        FileDataSetBladeComponent,
                        InteractiveEvaluationBladeComponent,
                        RecordDataSetBladeComponent
                    ],
                    imports: [
                        AdaptAccordionModule,
                        AdaptAlertModule,
                        AdaptButtonModule,
                        AdaptDockedPanelModule,
                        AdaptDropdownModule,
                        AdaptModalModule,
                        AdaptRxCounterModule,
                        AdaptRxSelectModule,
                        AdaptRxTextfieldModule,
                        AdaptRxUploaderModule,
                        AdaptRxValidatorsModule,
                        AdaptTabsModule,
                        AdminSettingsModule,
                        CommonModule,
                        ExpressionFormControlModule,
                        FormsModule,
                        GroupButtonFormControlModule,
                        RecordGridDesignModule,
                        RecordGridModule,
                        RxBusyIndicatorModule,
                        RxDefinitionModule,
                        RxDefinitionPickerModule,
                        TranslateModule,
                        RecordGridFilterSelectControlModule
                    ],
                    entryComponents: [
                        ChatbotDataSetBladeComponent,
                        CognitiveTrainingAdminComponent,
                        CognitiveTrainingRecordGridComponent,
                        FileDataSetBladeComponent,
                        InteractiveEvaluationBladeComponent,
                        RecordDataSetBladeComponent
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=cognitive-training-registration.module.js.map