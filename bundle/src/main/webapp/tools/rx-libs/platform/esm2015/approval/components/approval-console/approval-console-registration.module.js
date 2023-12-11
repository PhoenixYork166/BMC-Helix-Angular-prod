import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { RX_APPLICATION, RxDefinitionModule } from '@helix/platform/shared/api';
import { ApprovalConsoleComponent } from './approval-console.component';
import { RecordGridModule } from '@helix/platform/view/components';
import { RxSelectWithPaginationModule } from '@helix/platform/shared/components';
import { ReadOnlyFieldModule, RxBusyIndicatorModule } from '@helix/platform/ui-kit';
import { AdaptAlertModule, AdaptBusyModule, AdaptButtonModule, AdaptDownloadModule, AdaptDropdownModule, AdaptEmptyStateModule, AdaptRxLabelModule, AdaptRxSwitchModule, AdaptRxTextareaModule, AdaptRxTextfieldModule, AdaptRxUploaderModule, AdaptTabsModule } from '@bmc-ux/adapt-angular';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ApprovalRequestGeneralDetailsComponent } from './approval-request-general-details/approval-request-general-details.component';
import { ApprovalRequestReassignComponent } from './approval-request-reassign/approval-request-reassign.component';
import { ApprovalRequestApproversComponent } from './approval-request-approvers/approval-request-approvers.component';
import { ApprovalRequestQuestionsComponent } from './approval-request-questions/approval-request-questions.component';
import { ApprovalRequestCommentsComponent } from './approval-request-comments/approval-request-comments.component';
import { ApprovalRequestAttachmentsComponent } from './approval-request-attachments/approval-request-attachments.component';
import { ApprovalRequestQuestionResponseComponent } from './approval-request-question-response/approval-request-question-response.component';
import { ApprovalRequestQuestionComponent } from './approval-request-question/approval-request-question.component';
import { ApprovalRequestCommentComponent } from './approval-request-comment/approval-request-comment.component';
import { ApprovalRequestActionReasonInputComponent } from './approval-request-action-reason-input/approval-request-action-reason-input.component';
import { RxApprovalConsoleHelperService } from './approval-console-helper.service';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class ApprovalConsoleRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: 'rx-approval-console',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(ApprovalConsoleComponent),
            name: 'Approval console',
            isPageComponent: true,
            availableInBundles: [RX_APPLICATION.approvalBundleId]
        });
    }
}
ApprovalConsoleRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalConsoleRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
ApprovalConsoleRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalConsoleRegistrationModule, declarations: [ApprovalConsoleComponent,
        ApprovalRequestGeneralDetailsComponent,
        ApprovalRequestReassignComponent,
        ApprovalRequestApproversComponent,
        ApprovalRequestQuestionsComponent,
        ApprovalRequestCommentsComponent,
        ApprovalRequestAttachmentsComponent,
        ApprovalRequestQuestionResponseComponent,
        ApprovalRequestQuestionComponent,
        ApprovalRequestCommentComponent,
        ApprovalRequestActionReasonInputComponent], imports: [CommonModule,
        RecordGridModule,
        AdaptButtonModule,
        AdaptDropdownModule,
        FormsModule,
        TranslateModule,
        AdaptTabsModule,
        ReadOnlyFieldModule,
        RxBusyIndicatorModule,
        RxDefinitionModule,
        RxSelectWithPaginationModule,
        AdaptEmptyStateModule,
        AdaptRxTextareaModule,
        AdaptRxUploaderModule,
        AdaptBusyModule,
        AdaptDownloadModule,
        AdaptRxLabelModule,
        AdaptRxSwitchModule,
        AdaptAlertModule,
        AdaptRxTextfieldModule] });
ApprovalConsoleRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalConsoleRegistrationModule, providers: [RxApprovalConsoleHelperService], imports: [[
            CommonModule,
            RecordGridModule,
            AdaptButtonModule,
            AdaptDropdownModule,
            FormsModule,
            TranslateModule,
            AdaptTabsModule,
            ReadOnlyFieldModule,
            RxBusyIndicatorModule,
            RxDefinitionModule,
            RxSelectWithPaginationModule,
            AdaptEmptyStateModule,
            AdaptRxTextareaModule,
            AdaptRxUploaderModule,
            AdaptBusyModule,
            AdaptDownloadModule,
            AdaptRxLabelModule,
            AdaptRxSwitchModule,
            AdaptAlertModule,
            AdaptRxTextfieldModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalConsoleRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        ApprovalConsoleComponent,
                        ApprovalRequestGeneralDetailsComponent,
                        ApprovalRequestReassignComponent,
                        ApprovalRequestApproversComponent,
                        ApprovalRequestQuestionsComponent,
                        ApprovalRequestCommentsComponent,
                        ApprovalRequestAttachmentsComponent,
                        ApprovalRequestQuestionResponseComponent,
                        ApprovalRequestQuestionComponent,
                        ApprovalRequestCommentComponent,
                        ApprovalRequestActionReasonInputComponent
                    ],
                    imports: [
                        CommonModule,
                        RecordGridModule,
                        AdaptButtonModule,
                        AdaptDropdownModule,
                        FormsModule,
                        TranslateModule,
                        AdaptTabsModule,
                        ReadOnlyFieldModule,
                        RxBusyIndicatorModule,
                        RxDefinitionModule,
                        RxSelectWithPaginationModule,
                        AdaptEmptyStateModule,
                        AdaptRxTextareaModule,
                        AdaptRxUploaderModule,
                        AdaptBusyModule,
                        AdaptDownloadModule,
                        AdaptRxLabelModule,
                        AdaptRxSwitchModule,
                        AdaptAlertModule,
                        AdaptRxTextfieldModule
                    ],
                    entryComponents: [ApprovalConsoleComponent],
                    providers: [RxApprovalConsoleHelperService]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=approval-console-registration.module.js.map