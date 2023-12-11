import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./approval-configuration.component";
import * as i2 from "./approval-flow-configuration/approval-flow-configuration.component";
import * as i3 from "./associated-record-field-name.pipe";
import * as i4 from "./self-approval-configuration/self-approval-configuration.component";
import * as i5 from "./record-registration/record-registration.component";
import * as i6 from "./record-registration/field-definition-picker/field-definition-picker.component";
import * as i7 from "./flow-approvers-selector/flow-approvers-selector.component";
import * as i8 from "./approval-configuration-editor/approval-configuration-editor.component";
import * as i9 from "@bmc-ux/adapt-angular";
import * as i10 from "@helix/platform/shared/components";
import * as i11 from "@angular/common";
import * as i12 from "@helix/platform/view/components";
import * as i13 from "@helix/platform/ui-kit";
import * as i14 from "@ngx-translate/core";
import * as i15 from "@angular/forms";
import * as i16 from "@helix/platform/shared/api";
import * as i17 from "@angular/cdk/drag-drop";
export declare class ApprovalConfigurationRegistrationModule {
    private componentFactoryResolver;
    private rxViewComponentRegistryService;
    constructor(componentFactoryResolver: ComponentFactoryResolver, rxViewComponentRegistryService: RxViewComponentRegistryService);
    static ɵfac: i0.ɵɵFactoryDeclaration<ApprovalConfigurationRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ApprovalConfigurationRegistrationModule, [typeof i1.ApprovalConfigurationAdminComponent, typeof i2.ApprovalFlowConfigurationComponent, typeof i3.RxAssociatedRecordFieldNamePipe, typeof i4.SelfApprovalConfigurationComponent, typeof i5.RecordRegistrationComponent, typeof i6.RxFieldDefinitionPickerComponent, typeof i7.FlowApproversSelectorComponent, typeof i8.ApprovalConfigurationEditorComponent], [typeof i9.AdaptAlertModule, typeof i9.AdaptButtonModule, typeof i9.AdaptHighlightModule, typeof i9.AdaptRxSelectModule, typeof i9.AdaptRxTextfieldModule, typeof i9.AdaptTabsModule, typeof i10.AdminSettingsModule, typeof i11.CommonModule, typeof i10.ExpressionFormControlModule, typeof i12.RecordGridModule, typeof i13.RxBusyIndicatorModule, typeof i10.RxDefinitionPickerModule, typeof i14.TranslateModule, typeof i15.ReactiveFormsModule, typeof i9.AdaptRxLabelModule, typeof i15.FormsModule, typeof i9.AdaptDropdownModule, typeof i9.AdaptRxSearchModule, typeof i9.AdaptTreeModule, typeof i16.RxDefinitionModule, typeof i9.AdaptRxCounterModule, typeof i9.AdaptRxTextareaModule, typeof i9.AdaptPopoverModule, typeof i9.AdaptTooltipModule, typeof i17.DragDropModule, typeof i9.AdaptAccordionModule, typeof i9.AdaptRxRadiobuttonModule, typeof i9.AdaptBusyModule, typeof i10.RxSelectWithPaginationModule, typeof i9.AdaptRxCheckboxModule, typeof i9.AdaptRxValidatorsModule, typeof i9.AdaptEmptyStateModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ApprovalConfigurationRegistrationModule>;
}
