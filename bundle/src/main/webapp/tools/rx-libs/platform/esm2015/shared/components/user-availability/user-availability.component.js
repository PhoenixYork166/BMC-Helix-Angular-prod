import { Component } from '@angular/core';
import { RxCurrentUserService, RxNotificationService } from '@helix/platform/shared/api';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import { RX_RECORD_DEFINITION, RxRecordInstanceDataPageService, RxRecordInstanceService, RxRecordInstanceUpdateService } from '@helix/platform/record/api';
import { RX_USER_AVAILABILITY } from './user-availability.constants';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@helix/platform/record/api";
import * as i4 from "@ngx-translate/core";
import * as i5 from "@angular/forms";
export class RxUserAvailabilityComponent {
    constructor(rxCurrentUserService, activeModalRef, rxRecordInstanceDataPageService, rxRecordInstanceService, rxRecordInstanceUpdateService, rxNotificationService, translateService) {
        this.rxCurrentUserService = rxCurrentUserService;
        this.activeModalRef = activeModalRef;
        this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.rxRecordInstanceUpdateService = rxRecordInstanceUpdateService;
        this.rxNotificationService = rxNotificationService;
        this.translateService = translateService;
        this.isUserAvailableForAssignment = this.rxCurrentUserService.isAvailableForAssignment();
        this.isSaveInProgress = false;
    }
    updateAssignmentAvailability() {
        this.isSaveInProgress = true;
        this.rxRecordInstanceDataPageService
            .post({
            params: {
                recorddefinition: RX_USER_AVAILABILITY.ctmPeople.recordDefinitionName,
                queryExpression: "('" +
                    RX_USER_AVAILABILITY.ctmPeople.fieldIds.loginName +
                    '\' = "' +
                    this.rxCurrentUserService.getName() +
                    '")',
                propertySelection: [RX_RECORD_DEFINITION.coreFieldIds.id]
            }
        })
            .pipe(switchMap((dataPageResult) => this.rxRecordInstanceService.get(RX_USER_AVAILABILITY.ctmPeople.recordDefinitionName, dataPageResult.data[0][RX_RECORD_DEFINITION.coreFieldIds.id])), tap((recordInstance) => recordInstance.setFieldValue(RX_USER_AVAILABILITY.ctmPeople.fieldIds.assignmentAvailability, this.isUserAvailableForAssignment ? '0' : '1')), switchMap((recordInstance) => this.rxRecordInstanceUpdateService.execute(recordInstance)), finalize(() => (this.isSaveInProgress = false)))
            .subscribe(() => {
            this.rxCurrentUserService.setAssignmentAvailability(this.isUserAvailableForAssignment);
            this.activeModalRef.close();
            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.shell.my-availability-dialog.available-for-assignment-saved.message'));
        });
    }
    cancel() {
        this.activeModalRef.close();
    }
}
RxUserAvailabilityComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserAvailabilityComponent, deps: [{ token: i1.RxCurrentUserService }, { token: i2.ActiveModalRef }, { token: i3.RxRecordInstanceDataPageService }, { token: i3.RxRecordInstanceService }, { token: i3.RxRecordInstanceUpdateService }, { token: i1.RxNotificationService }, { token: i4.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
RxUserAvailabilityComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxUserAvailabilityComponent, selector: "rx-user-availability", ngImport: i0, template: "<div class=\"modal-body\">\n  <form name=\"userAvailabilityForm\" novalidate #userAvailabilityForm=\"ngForm\">\n    <adapt-rx-checkbox\n      class=\"d-block form-group\"\n      rx-id=\"user-availability\"\n      name=\"userAvailability\"\n      [(ngModel)]=\"isUserAvailableForAssignment\"\n      label=\"{{ 'com.bmc.arsys.rx.client.shell.my-availability-dialog.available-for-assignment.label' | translate }}\"\n    ></adapt-rx-checkbox>\n  </form>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    type=\"button\"\n    class=\"btn btn-primary btn-sm\"\n    [disabled]=\"this.isSaveInProgress || !userAvailabilityForm.dirty\"\n    (click)=\"updateAssignmentAvailability()\"\n    rx-id=\"save-button\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.apply.label' | translate }}\n  </button>\n  <button type=\"button\" class=\"btn btn-secondary btn-sm\" (click)=\"cancel()\" rx-id=\"cancel-button\">\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", components: [{ type: i2.AdaptRxCheckboxComponent, selector: "adapt-rx-checkbox", inputs: ["value", "checked", "indeterminate"], outputs: ["indeterminateChange"] }], directives: [{ type: i5.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i5.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i5.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i4.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserAvailabilityComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-user-availability',
                    templateUrl: './user-availability.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxCurrentUserService }, { type: i2.ActiveModalRef }, { type: i3.RxRecordInstanceDataPageService }, { type: i3.RxRecordInstanceService }, { type: i3.RxRecordInstanceUpdateService }, { type: i1.RxNotificationService }, { type: i4.TranslateService }]; } });
//# sourceMappingURL=user-availability.component.js.map