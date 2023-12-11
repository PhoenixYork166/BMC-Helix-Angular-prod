import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdaptAccordionModule, AdaptAlertModule, AdaptBusyModule, AdaptButtonModule, AdaptDropdownModule, AdaptEmptyStateModule, AdaptHighlightModule, AdaptPopoverModule, AdaptRxCheckboxModule, AdaptRxCounterModule, AdaptRxLabelModule, AdaptRxRadiobuttonModule, AdaptRxSearchModule, AdaptRxSelectModule, AdaptRxTextareaModule, AdaptRxTextfieldModule, AdaptRxValidatorsModule, AdaptTabsModule, AdaptTooltipModule, AdaptTreeModule } from '@bmc-ux/adapt-angular';
import { RX_APPLICATION, RxDefinitionModule } from '@helix/platform/shared/api';
import { AdminSettingsModule, ExpressionFormControlModule, RxDefinitionPickerModule, RxSelectWithPaginationModule } from '@helix/platform/shared/components';
import { RxBusyIndicatorModule } from '@helix/platform/ui-kit';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { RecordGridModule } from '@helix/platform/view/components';
import { TranslateModule } from '@ngx-translate/core';
import { ApprovalConfigurationEditorComponent } from './approval-configuration-editor/approval-configuration-editor.component';
import { ApprovalConfigurationAdminComponent } from './approval-configuration.component';
import { ApprovalFlowConfigurationComponent } from './approval-flow-configuration/approval-flow-configuration.component';
import { RxAssociatedRecordFieldNamePipe } from './associated-record-field-name.pipe';
import { FlowApproversSelectorComponent } from './flow-approvers-selector/flow-approvers-selector.component';
import { RxFieldDefinitionPickerComponent } from './record-registration/field-definition-picker/field-definition-picker.component';
import { RecordRegistrationComponent } from './record-registration/record-registration.component';
import { SelfApprovalConfigurationComponent } from './self-approval-configuration/self-approval-configuration.component';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class ApprovalConfigurationRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: 'rx-admin-approval-configuration',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(ApprovalConfigurationAdminComponent),
            name: 'Approval configuration',
            isPageComponent: true,
            availableInBundles: [RX_APPLICATION.settingsBundleId]
        });
    }
}
ApprovalConfigurationRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalConfigurationRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
ApprovalConfigurationRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalConfigurationRegistrationModule, declarations: [ApprovalConfigurationAdminComponent,
        ApprovalFlowConfigurationComponent,
        RxAssociatedRecordFieldNamePipe,
        SelfApprovalConfigurationComponent,
        RecordRegistrationComponent,
        RxFieldDefinitionPickerComponent,
        FlowApproversSelectorComponent,
        ApprovalConfigurationEditorComponent], imports: [AdaptAlertModule,
        AdaptButtonModule,
        AdaptHighlightModule,
        AdaptRxSelectModule,
        AdaptRxTextfieldModule,
        AdaptTabsModule,
        AdminSettingsModule,
        CommonModule,
        ExpressionFormControlModule,
        RecordGridModule,
        RxBusyIndicatorModule,
        RxDefinitionPickerModule,
        TranslateModule,
        ReactiveFormsModule,
        AdaptRxLabelModule,
        FormsModule,
        AdaptDropdownModule,
        AdaptRxSearchModule,
        AdaptTreeModule,
        RxDefinitionModule,
        AdaptRxCounterModule,
        AdaptRxTextareaModule,
        AdaptPopoverModule,
        AdaptTooltipModule,
        DragDropModule,
        AdaptAccordionModule,
        AdaptRxRadiobuttonModule,
        AdaptBusyModule,
        RxSelectWithPaginationModule,
        AdaptRxCheckboxModule,
        AdaptRxValidatorsModule,
        AdaptEmptyStateModule] });
ApprovalConfigurationRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalConfigurationRegistrationModule, imports: [[
            AdaptAlertModule,
            AdaptButtonModule,
            AdaptHighlightModule,
            AdaptRxSelectModule,
            AdaptRxTextfieldModule,
            AdaptTabsModule,
            AdminSettingsModule,
            CommonModule,
            ExpressionFormControlModule,
            RecordGridModule,
            RxBusyIndicatorModule,
            RxDefinitionPickerModule,
            TranslateModule,
            ReactiveFormsModule,
            AdaptRxLabelModule,
            FormsModule,
            AdaptDropdownModule,
            AdaptRxSearchModule,
            AdaptTreeModule,
            RxDefinitionModule,
            AdaptRxCounterModule,
            AdaptRxTextareaModule,
            AdaptPopoverModule,
            AdaptTooltipModule,
            DragDropModule,
            AdaptAccordionModule,
            AdaptRxRadiobuttonModule,
            AdaptBusyModule,
            RxSelectWithPaginationModule,
            AdaptRxCheckboxModule,
            AdaptRxValidatorsModule,
            AdaptEmptyStateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalConfigurationRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        ApprovalConfigurationAdminComponent,
                        ApprovalFlowConfigurationComponent,
                        RxAssociatedRecordFieldNamePipe,
                        SelfApprovalConfigurationComponent,
                        RecordRegistrationComponent,
                        RxFieldDefinitionPickerComponent,
                        FlowApproversSelectorComponent,
                        ApprovalConfigurationEditorComponent
                    ],
                    imports: [
                        AdaptAlertModule,
                        AdaptButtonModule,
                        AdaptHighlightModule,
                        AdaptRxSelectModule,
                        AdaptRxTextfieldModule,
                        AdaptTabsModule,
                        AdminSettingsModule,
                        CommonModule,
                        ExpressionFormControlModule,
                        RecordGridModule,
                        RxBusyIndicatorModule,
                        RxDefinitionPickerModule,
                        TranslateModule,
                        ReactiveFormsModule,
                        AdaptRxLabelModule,
                        FormsModule,
                        AdaptDropdownModule,
                        AdaptRxSearchModule,
                        AdaptTreeModule,
                        RxDefinitionModule,
                        AdaptRxCounterModule,
                        AdaptRxTextareaModule,
                        AdaptPopoverModule,
                        AdaptTooltipModule,
                        DragDropModule,
                        AdaptAccordionModule,
                        AdaptRxRadiobuttonModule,
                        AdaptBusyModule,
                        RxSelectWithPaginationModule,
                        AdaptRxCheckboxModule,
                        AdaptRxValidatorsModule,
                        AdaptEmptyStateModule
                    ],
                    entryComponents: [ApprovalConfigurationAdminComponent, FlowApproversSelectorComponent]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=approval-configuration-registration.module.js.map