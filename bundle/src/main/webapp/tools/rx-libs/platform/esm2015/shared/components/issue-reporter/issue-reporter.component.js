import { Component, Injector } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActiveModalRef, DismissReasons } from '@bmc-ux/adapt-angular';
import { ReplaySubject } from 'rxjs';
import { RxIssueReporterService } from './issue-reporter.service';
import { takeUntil } from 'rxjs/operators';
import { RxNotificationService } from '@helix/platform/shared/api';
import { TranslateService } from '@ngx-translate/core';
import { RxModalClass } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@angular/forms";
import * as i3 from "./issue-reporter.service";
import * as i4 from "@helix/platform/shared/api";
import * as i5 from "@ngx-translate/core";
export class RxIssueReporterComponent extends RxModalClass {
    constructor(activeModalRef, formBuilder, rxIssueReporterService, rxNotificationService, translateService, injector) {
        super(activeModalRef, injector);
        this.activeModalRef = activeModalRef;
        this.formBuilder = formBuilder;
        this.rxIssueReporterService = rxIssueReporterService;
        this.rxNotificationService = rxNotificationService;
        this.translateService = translateService;
        this.injector = injector;
        this.destroyed$ = new ReplaySubject(1);
        this.data = this.activeModalRef.getData();
        this.initForm();
    }
    isDirty() {
        return this.reportForm.dirty;
    }
    reportIssue() {
        this.rxIssueReporterService
            .reportIssue(this.reportForm.get('text').value, this.data)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(() => {
            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.issue-reporter.issue-report-submitted.message'));
            this.activeModalRef.close();
        });
    }
    initForm() {
        this.reportForm = this.formBuilder.group({
            text: ['', Validators.required]
        });
    }
    cancel() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
RxIssueReporterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIssueReporterComponent, deps: [{ token: i1.ActiveModalRef }, { token: i2.FormBuilder }, { token: i3.RxIssueReporterService }, { token: i4.RxNotificationService }, { token: i5.TranslateService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
RxIssueReporterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxIssueReporterComponent, selector: "rx-issue-reporter", usesInheritance: true, ngImport: i0, template: "<form [formGroup]=\"reportForm\" autocomplete=\"off\" (ngSubmit)=\"reportIssue()\" class=\"modal-body\">\n  <div class=\"form-group\">\n    <p>\n      {{ 'com.bmc.arsys.rx.client.issue-reporter.dialog.issue-report-prepared.label' | translate }}\n    </p>\n    <p>\n      {{ 'com.bmc.arsys.rx.client.issue-reporter.dialog.describe-issue-details.label' | translate }}\n    </p>\n\n    <adapt-rx-textarea\n      placeholder=\"{{ 'com.bmc.arsys.rx.client.issue-reporter.dialog.description.placeholder' | translate }}\"\n      rows=\"15\"\n      formControlName=\"text\"\n    >\n    </adapt-rx-textarea>\n  </div>\n\n  <button adapt-button btn-type=\"secondary\" type=\"button\" (click)=\"cancel()\" class=\"ml-3 float-right\">\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n\n  <button adapt-button btn-type=\"primary\" type=\"submit\" [disabled]=\"reportForm.invalid\" class=\"float-right\">\n    {{ 'com.bmc.arsys.rx.client.issue-reporter.submit-report.label' | translate }}\n  </button>\n</form>\n", components: [{ type: i1.AdaptRxTextareaComponent, selector: "adapt-rx-textarea", inputs: ["rows", "maxRows", "autocomplete", "placeholder", "size", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }], pipes: { "translate": i5.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIssueReporterComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-issue-reporter',
                    templateUrl: './issue-reporter.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveModalRef }, { type: i2.FormBuilder }, { type: i3.RxIssueReporterService }, { type: i4.RxNotificationService }, { type: i5.TranslateService }, { type: i0.Injector }]; } });
//# sourceMappingURL=issue-reporter.component.js.map