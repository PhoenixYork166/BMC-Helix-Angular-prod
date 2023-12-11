import { Component, Injector } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RxCommandFactoryService, RxNotificationService } from '@helix/platform/shared/api';
import { RX_MODAL, RxModalClass, RxModalService } from '@helix/platform/ui-kit';
import { RxStringService } from '@helix/platform/utils';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'lodash';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RX_ISSUES } from '../application-issues.constant';
import { RxApplicationIssuesService } from '../application-issues.service';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@angular/forms";
import * as i3 from "../application-issues.service";
import * as i4 from "@helix/platform/shared/api";
import * as i5 from "@helix/platform/ui-kit";
import * as i6 from "@helix/platform/utils";
import * as i7 from "@ngx-translate/core";
import * as i8 from "@angular/common";
export class SubmitIssueToSupportComponent extends RxModalClass {
    constructor(activeModalRef, formBuilder, rxApplicationIssuesService, rxCommandFactoryService, rxModalService, rxNotificationService, rxStringService, translateService, injector) {
        super(activeModalRef, injector);
        this.activeModalRef = activeModalRef;
        this.formBuilder = formBuilder;
        this.rxApplicationIssuesService = rxApplicationIssuesService;
        this.rxCommandFactoryService = rxCommandFactoryService;
        this.rxModalService = rxModalService;
        this.rxNotificationService = rxNotificationService;
        this.rxStringService = rxStringService;
        this.translateService = translateService;
        this.injector = injector;
        this.issueSeverityOptions = [
            {
                name: this.translateService.instant('com.bmc.arsys.rx.client.admin.application-issues.submit-issue-to-support.severity-critical.message'),
                id: 1
            },
            {
                name: this.translateService.instant('com.bmc.arsys.rx.client.admin.application-issues.submit-issue-to-support.severity-high.message'),
                id: 2
            },
            {
                name: this.translateService.instant('com.bmc.arsys.rx.client.admin.application-issues.submit-issue-to-support.severity-medium.message'),
                id: 3
            },
            {
                name: this.translateService.instant('com.bmc.arsys.rx.client.admin.application-issues.submit-issue-to-support.severity-low.message'),
                id: 4
            }
        ];
    }
    ngOnInit() {
        super.ngOnInit();
        this.submitIssueForm = this.formBuilder.group({
            description: [],
            severity: []
        });
        this.issues = this.activeModalRef.getData().issues;
        this.rxApplicationIssuesService.getIssuesResource().subscribe((issues) => {
            const { errorReportingValue } = issues;
            this.supportCentralUrl = errorReportingValue.supportCentralUrl;
        });
        this.message = this.translateService.instant('com.bmc.arsys.rx.client.admin.application-issues.reported-issues.title', { numberOfIssues: this.issues.length });
    }
    isDirty() {
        return this.submitIssueForm.dirty;
    }
    initSearchQuery() {
        if (this.issues.length >= 1) {
            const errorMessage = this.issues[0][RX_ISSUES.issuesRecordFieldIds.errorMessage];
            const errorNumber = this.issues[0][RX_ISSUES.issuesRecordFieldIds.errorNumber];
            const applicationName = this.issues[0][RX_ISSUES.issuesRecordFieldIds.applicationName];
            const searchQuery = `?fromproduct=helixplatform#q=${errorMessage}%20OR%20${errorNumber}&t=All&sort=relevancy&f:@bmcproductname=[${applicationName}]`;
            window.open(this.supportCentralUrl + searchQuery);
        }
    }
    submit() {
        this.rxCommandFactoryService
            .forResourceType('com.bmc.arsys.rx.application.support.command.CreateSupportCaseCommand')
            .execute({
            description: this.submitIssueForm.get('description').value,
            recordIds: map(this.issues, RX_RECORD_DEFINITION.coreFieldIds.id),
            severity: this.submitIssueForm.get('severity').value[0].id
        })
            .pipe(catchError((error) => {
            if (error.error[0].messageNumber === RX_ISSUES.linkExpiredError.code) {
                this.rxNotificationService.addErrorMessage(RX_ISSUES.linkExpiredError.message);
            }
            return throwError(error);
        }))
            .subscribe(() => {
            this.rxNotificationService.addSuccessMessage(this.translateService.instant(RX_ISSUES.notificationMessages.caseSubmitted));
            this.activeModalRef.close('cancel');
        });
    }
    optionFormatter(severity) {
        return severity.name;
    }
    cancel() {
        if (this.submitIssueForm.get('description')) {
            this.rxModalService
                .confirm({
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                modalStyle: RX_MODAL.modalStyles.warning,
                message: this.translateService.instant('com.bmc.arsys.rx.client.admin.application-issues.submit-issue-to-support.cancel-submission.message')
            })
                .then((data) => {
                if (data)
                    this.activeModalRef.close();
            });
        }
        else {
            this.activeModalRef.close();
        }
    }
}
SubmitIssueToSupportComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SubmitIssueToSupportComponent, deps: [{ token: i1.ActiveModalRef }, { token: i2.FormBuilder }, { token: i3.RxApplicationIssuesService }, { token: i4.RxCommandFactoryService }, { token: i5.RxModalService }, { token: i4.RxNotificationService }, { token: i6.RxStringService }, { token: i7.TranslateService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
SubmitIssueToSupportComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: SubmitIssueToSupportComponent, selector: "rx-submit-issue-to-support", usesInheritance: true, ngImport: i0, template: "<div class=\"modal-body pt-0\">\n  <div class=\"row bg-info\" *ngIf=\"supportCentralUrl\">\n    <button\n      adapt-button\n      rx-id=\"knowledge-articles-button\"\n      type=\"button\"\n      class=\"btn btn-secondary m-2\"\n      size=\"xtra-small\"\n      (click)=\"initSearchQuery()\"\n    >\n      <span class=\"d-icon-lightbulb_o p-2\" aria-hidden=\"true\"></span>\n      {{\n        'com.bmc.arsys.rx.client.admin.application-issues.submit-issue-to-support.knowledge-articles.title' | translate\n      }}\n    </button>\n    <span class=\"mt-3 text-default-inverse\" rx-id=\"message\">{{\n      'com.bmc.arsys.rx.client.admin.application-issues.submit-issue-to-support.search-knowledge-articles.message'\n        | translate\n    }}</span>\n  </div>\n  <div class=\"row mt-2\">\n    <div class=\"col-md-12\">\n      <p rx-id=\"message\">{{ message }}</p>\n    </div>\n  </div>\n  <form [formGroup]=\"submitIssueForm\">\n    <div class=\"row\">\n      <div class=\"col-12\">\n        <adapt-rx-textarea\n          rx-id=\"description\"\n          formControlName=\"description\"\n          label=\"Description\"\n          placeholder=\"Enter Issue Description\"\n          rows=\"7\"\n          required\n        ></adapt-rx-textarea>\n      </div>\n    </div>\n\n    <div class=\"row mt-4 mb-4\">\n      <div class=\"col-4\">\n        <adapt-rx-select\n          rx-id=\"severity\"\n          formControlName=\"severity\"\n          [options]=\"issueSeverityOptions\"\n          [optionFormatter]=\"optionFormatter\"\n          label=\"Severity\"\n          required\n        ></adapt-rx-select>\n      </div>\n    </div>\n  </form>\n</div>\n<div class=\"modal-footer\">\n  <button\n    adapt-button\n    btn-type=\"primary\"\n    class=\"mr-2\"\n    rx-id=\"submit-case-button\"\n    [disabled]=\"submitIssueForm.invalid\"\n    (click)=\"submit()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.admin.application-issues.submit-issue-to-support.submit-case.label' | translate }}\n  </button>\n  <button rx-id=\"cancel-button\" adapt-button btn-type=\"secondary\" class=\"mr-2\" (click)=\"cancel()\">\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", components: [{ type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1.AdaptRxTextareaComponent, selector: "adapt-rx-textarea", inputs: ["rows", "maxRows", "autocomplete", "placeholder", "size", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }], directives: [{ type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }], pipes: { "translate": i7.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SubmitIssueToSupportComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-submit-issue-to-support',
                    templateUrl: './submit-issue-to-support.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveModalRef }, { type: i2.FormBuilder }, { type: i3.RxApplicationIssuesService }, { type: i4.RxCommandFactoryService }, { type: i5.RxModalService }, { type: i4.RxNotificationService }, { type: i6.RxStringService }, { type: i7.TranslateService }, { type: i0.Injector }]; } });
//# sourceMappingURL=submit-issue-to-support.component.js.map