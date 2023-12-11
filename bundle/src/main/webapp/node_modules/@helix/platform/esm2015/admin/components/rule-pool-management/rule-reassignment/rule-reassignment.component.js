import { Component, Injector } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ReplaySubject } from 'rxjs';
import { finalize, takeUntil, take } from 'rxjs/operators';
import { ActiveModalRef, DismissReasons } from '@bmc-ux/adapt-angular';
import { RxNotificationService } from '@helix/platform/shared/api';
import { RxModalClass } from '@helix/platform/ui-kit';
import { RxRuleDefinitionService } from '@helix/platform/rule/api';
import { RxRulePoolManagementService } from '../rule-pool-management.service';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@helix/platform/rule/api";
import * as i4 from "../rule-pool-management.service";
import * as i5 from "@ngx-translate/core";
import * as i6 from "@angular/forms";
import * as i7 from "@angular/common";
export class RuleReassignmentComponent extends RxModalClass {
    constructor(activeModalRef, rxNotificationService, rxRuleDefinitionService, rxRulePoolManagementService, translateService, injector) {
        super(activeModalRef, injector);
        this.activeModalRef = activeModalRef;
        this.rxNotificationService = rxNotificationService;
        this.rxRuleDefinitionService = rxRuleDefinitionService;
        this.rxRulePoolManagementService = rxRulePoolManagementService;
        this.translateService = translateService;
        this.injector = injector;
        this.isSaveButtonDisabled = true;
        this.poolFormControl = new FormControl([]);
        this.destroyed$ = new ReplaySubject(1);
        this.poolFormControl.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe((selectedPools) => {
            this.selectedPoolId = selectedPools[0].id;
            this.isSaveButtonDisabled = false;
        });
    }
    ngOnInit() {
        super.ngOnInit();
        this.poolSelectOptions$ = this.rxRulePoolManagementService.getAvailablePoolOptions();
    }
    optionFormatter(selectOption) {
        return selectOption.name;
    }
    save() {
        this.allowDismiss = false;
        this.isSaveButtonDisabled = true;
        this.rxRulePoolManagementService
            .reassignRuleToPool(this.activeModalRef.getData().ruleName, this.selectedPoolId)
            .pipe(take(1), finalize(() => {
            this.allowDismiss = true;
            this.isSaveButtonDisabled = false;
        }))
            .subscribe(() => {
            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.admin.rule-pool-management.reassignment-saved.message'));
            this.activeModalRef.close(true);
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
RuleReassignmentComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuleReassignmentComponent, deps: [{ token: i1.ActiveModalRef }, { token: i2.RxNotificationService }, { token: i3.RxRuleDefinitionService }, { token: i4.RxRulePoolManagementService }, { token: i5.TranslateService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
RuleReassignmentComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RuleReassignmentComponent, selector: "rx-rule-reassignment", usesInheritance: true, ngImport: i0, template: "<div class=\"modal-header\">\n  <h5 class=\"modal-title\">\n    {{ 'com.bmc.arsys.rx.client.admin.rule-pool-management.reassignment-dialog.title' | translate }}\n  </h5>\n  <button\n    class=\"close dp-close\"\n    type=\"button\"\n    rx-id=\"x-button\"\n    [disabled]=\"!allowDismiss\"\n    (click)=\"cancel()\"\n  ></button>\n</div>\n\n<div class=\"modal-body\">\n  <adapt-rx-select\n    [formControl]=\"poolFormControl\"\n    [options]=\"poolSelectOptions$ | async\"\n    [optionFormatter]=\"optionFormatter\"\n    [label]=\"'com.bmc.arsys.rx.client.admin.rule-pool-management.assign-to.label' | translate\"\n  ></adapt-rx-select>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    adapt-button\n    btn-type=\"primary\"\n    type=\"button\"\n    rx-id=\"save-button\"\n    (click)=\"save()\"\n    [adaptInlineLoader]=\"!allowDismiss\"\n    [disabled]=\"isSaveButtonDisabled || !allowDismiss\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n  <button\n    adapt-button\n    btn-type=\"secondary\"\n    type=\"button\"\n    rx-id=\"cancel-button\"\n    (click)=\"cancel()\"\n    [disabled]=\"!allowDismiss\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", components: [{ type: i1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i1.AdaptInlineStandaloneDirective, selector: "[adaptInlineLoader]", inputs: ["adaptInlineLoader", "activeText"] }], pipes: { "translate": i5.TranslatePipe, "async": i7.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuleReassignmentComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-rule-reassignment',
                    templateUrl: './rule-reassignment.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveModalRef }, { type: i2.RxNotificationService }, { type: i3.RxRuleDefinitionService }, { type: i4.RxRulePoolManagementService }, { type: i5.TranslateService }, { type: i0.Injector }]; } });
//# sourceMappingURL=rule-reassignment.component.js.map