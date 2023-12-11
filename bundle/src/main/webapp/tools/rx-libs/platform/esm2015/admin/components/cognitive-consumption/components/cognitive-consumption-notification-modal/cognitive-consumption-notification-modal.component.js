import { Component, Injector, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActiveModalRef, AdaptModalService, DismissReasons } from '@bmc-ux/adapt-angular';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RxCurrentUserService, RxLogService, RxNotificationService } from '@helix/platform/shared/api';
import { RxModalClass } from '@helix/platform/ui-kit';
import { OpenViewActionModalSize } from '@helix/platform/view/api';
import { RecordGridComponent, RowSelectionMode } from '@helix/platform/view/components';
import { TranslateService } from '@ngx-translate/core';
import { add, compact, every, find, forEach, get, includes, inRange, isEmpty, map, merge, noop, omit, pullAt } from 'lodash';
import { EMPTY, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RX_COGNITIVE_CONSUMPTION } from '../../cognitive-consumption.constant';
import { RxCognitiveConsumptionService } from '../../cognitive-consumption.service';
import { CognitiveConsumptionNotificationHistoryModalComponent } from '../cognitive-consumption-notification-history-modal/cognitive-consumption-notification-history-modal.component';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "../../cognitive-consumption.service";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "@ngx-translate/core";
import * as i5 from "@helix/platform/ui-kit";
import * as i6 from "@helix/platform/view/components";
import * as i7 from "@angular/forms";
import * as i8 from "@angular/common";
export class CognitiveConsumptionNotificationModalComponent extends RxModalClass {
    constructor(activeModalRef, adaptModalService, rxCognitiveConsumptionService, rxCurrentUserService, rxLogService, rxNotificationService, translateService, injector) {
        super(activeModalRef, injector);
        this.activeModalRef = activeModalRef;
        this.adaptModalService = adaptModalService;
        this.rxCognitiveConsumptionService = rxCognitiveConsumptionService;
        this.rxCurrentUserService = rxCurrentUserService;
        this.rxLogService = rxLogService;
        this.rxNotificationService = rxNotificationService;
        this.translateService = translateService;
        this.injector = injector;
        this.isEdit = false;
        this.selectedEmailRecipients = [];
        this.thresholds = [
            {
                id: 1,
                value: 0
            },
            {
                id: 2,
                value: 0
            },
            {
                id: 3,
                value: 0
            }
        ];
        this.modalData = this.activeModalRef.getData();
        this.isAdministrator = this.rxCurrentUserService.isAdministrator();
    }
    ngOnInit() {
        super.ngOnInit();
        forEach(RX_COGNITIVE_CONSUMPTION.sections, (section) => {
            const group = find(section.groups, ['id', this.modalData.groupId]);
            if (group) {
                this.group = group;
            }
        });
        this.label = `${this.translateService.instant(this.group.label)} (${this.group.unit})`;
        this.entity = {
            action: this.modalData.groupId,
            capacity: 0,
            domain: 'com.bmc.dsm.innovationsuite.cognitive',
            emailIds: [],
            thresholds: [null, null, null]
        };
        this.busy = this.rxCognitiveConsumptionService
            .getCognitiveConsumptionNotificationConfig({
            action: this.entity.action,
            domain: this.entity.domain
        })
            .pipe(catchError((error) => {
            return get(error, 'error[0].messageNumber') === 302 ? EMPTY : throwError(error);
        }))
            .subscribe((config) => {
            this.isEdit = true;
            merge(this.entity, config.entity);
            this.thresholds = map(this.entity.thresholds, (threshold, index) => {
                return {
                    id: index + 1,
                    value: threshold || 0
                };
            });
            this.selectedEmailRecipients = this.entity.emailIds;
        });
        this.recordGridConfig = of({
            enableFiltering: false,
            recordDefinitionName: 'User',
            enableRowSelection: RowSelectionMode.Multiple,
            filterExpression: `('${RX_COGNITIVE_CONSUMPTION.settings.fields.emailsAddressFieldId}' != $NULL$)`,
            columns: [
                {
                    index: 0,
                    fieldId: String(RX_RECORD_DEFINITION.coreFieldIds.description),
                    title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-consumption-notification.full-name.title')
                },
                {
                    index: 1,
                    fieldId: String(RX_COGNITIVE_CONSUMPTION.settings.fields.emailsAddressFieldId),
                    title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-consumption-notification.primary-email-address.title')
                }
            ]
        });
    }
    isDirty() {
        return this.notificationForm.dirty;
    }
    canSelectRecipients() {
        const recipients = this.availableEmailNotificationRecipientsRecordGrid.api.getSelectedRows();
        return inRange(add(recipients.length, this.selectedEmailRecipients.length), 0, 11);
    }
    getEmptyCapacityValueValidator() {
        return (control) => {
            let result = null;
            if (control.touched && !control.value) {
                result = {
                    emptyCapacityValue: {
                        message: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-consumption-notification.capacity-empty-validation.message')
                    }
                };
            }
            return result;
        };
    }
    getEmptyThresholdValuesValidator() {
        return (control) => {
            let result = null;
            if (control.touched && !control.value && every(this.thresholds, ['value', 0])) {
                result = {
                    emptyThresholdValues: {
                        message: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-consumption-notification.capacity-threshold-validation.message')
                    }
                };
            }
            return result;
        };
    }
    isSaveButtonDisabled() {
        return this.notificationForm.invalid || isEmpty(this.selectedEmailRecipients);
    }
    onCloseClick() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
    onMoveToSelectedClick() {
        const recipients = this.availableEmailNotificationRecipientsRecordGrid.api.getSelectedRows();
        if (this.canSelectRecipients()) {
            forEach(recipients, (recipient) => {
                if (!includes(this.selectedEmailRecipients, recipient[RX_COGNITIVE_CONSUMPTION.settings.fields.emailsAddressFieldId])) {
                    this.selectedEmailRecipients.push(recipient[RX_COGNITIVE_CONSUMPTION.settings.fields.emailsAddressFieldId]);
                }
            });
        }
    }
    onNotificationHistoryClick() {
        this.adaptModalService
            .open({
            title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-consumption-notification.notification-history.title'),
            content: CognitiveConsumptionNotificationHistoryModalComponent,
            size: OpenViewActionModalSize.Large,
            data: {
                domain: this.entity.domain,
                groupId: this.modalData.groupId
            }
        })
            .catch(noop);
    }
    onRemoveRecipientClick(index) {
        pullAt(this.selectedEmailRecipients, [index]);
    }
    onSaveClick() {
        forEach(this.notificationForm.controls, (control) => {
            control.markAsTouched();
            control.updateValueAndValidity();
        });
        const entity = {
            action: this.entity.action,
            capacity: this.entity.capacity,
            domain: this.entity.domain,
            emailIds: this.selectedEmailRecipients,
            thresholds: compact(map(this.thresholds, 'value'))
        };
        if (this.notificationForm.valid) {
            if (this.isEdit) {
                this.rxCognitiveConsumptionService.putCognitiveConsumptionNotificationConfigEntity(entity).subscribe(() => {
                    this.activeModalRef.close();
                    this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.common.saved-successfully.message'));
                });
            }
            else {
                this.rxCognitiveConsumptionService.postCognitiveConsumptionNotificationConfigEntity(entity).subscribe(() => {
                    this.activeModalRef.close();
                    this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.common.saved-successfully.message'));
                });
            }
        }
    }
    onThresholdCounterModelChange() {
        const controls = omit(this.notificationForm.controls, 'capacity');
        forEach(controls, (control) => {
            control.markAsTouched();
            control.updateValueAndValidity();
        });
    }
}
CognitiveConsumptionNotificationModalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CognitiveConsumptionNotificationModalComponent, deps: [{ token: i1.ActiveModalRef }, { token: i1.AdaptModalService }, { token: i2.RxCognitiveConsumptionService }, { token: i3.RxCurrentUserService }, { token: i3.RxLogService }, { token: i3.RxNotificationService }, { token: i4.TranslateService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
CognitiveConsumptionNotificationModalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: CognitiveConsumptionNotificationModalComponent, selector: "rx-cognitive-consumption-notification-modal", viewQueries: [{ propertyName: "availableEmailNotificationRecipientsRecordGrid", first: true, predicate: ["availableEmailNotificationRecipientsRecordGrid"], descendants: true, static: true }, { propertyName: "notificationForm", first: true, predicate: ["notificationForm"], descendants: true, read: NgForm, static: true }], usesInheritance: true, ngImport: i0, template: "<div class=\"modal-body d-flex\">\n  <rx-busy-indicator [options]=\"{ busy: busy, loaderType: 'section' }\"></rx-busy-indicator>\n\n  <form class=\"d-flex flex-column\" #notificationForm=\"ngForm\">\n    <div class=\"mb-4\" [style.width.%]=\"32\">\n      <h5 class=\"m-0 mb-4\">\n        {{ 'com.bmc.arsys.rx.client.admin.cognitive-consumption-notification.capacity.title' | translate }}\n      </h5>\n\n      <adapt-rx-counter\n        name=\"capacity\"\n        [label]=\"label\"\n        placeholder=\"0\"\n        min=\"0\"\n        max=\"100\"\n        required\n        [rxCustomValidators]=\"getEmptyCapacityValueValidator()\"\n        [(ngModel)]=\"entity.capacity\"\n      >\n      </adapt-rx-counter>\n    </div>\n\n    <div class=\"mb-4\">\n      <h5 class=\"m-0 mb-4\">\n        {{ 'com.bmc.arsys.rx.client.admin.cognitive-consumption.capacity-consumption-thresholds.title' | translate }}\n      </h5>\n\n      <div class=\"d-flex justify-content-between\">\n        <adapt-rx-counter\n          *ngFor=\"let threshold of thresholds\"\n          [style.width.%]=\"32\"\n          name=\"threshold-{{ threshold.id }}\"\n          label=\"Threshold {{ threshold.id }} (%)\"\n          placeholder=\"0\"\n          min=\"0\"\n          max=\"100\"\n          adaptIntegerNumber\n          [rxCustomValidators]=\"getEmptyThresholdValuesValidator()\"\n          [(ngModel)]=\"threshold.value\"\n          (ngModelChange)=\"onThresholdCounterModelChange()\"\n        >\n        </adapt-rx-counter>\n      </div>\n    </div>\n\n    <div class=\"d-flex h-100\">\n      <div class=\"col-6 d-flex flex-column h-100 p-0\">\n        <h5 class=\"m-0 mb-4\">\n          {{\n            'com.bmc.arsys.rx.client.admin.cognitive-consumption-notification.available-email-recipient.title'\n              | translate\n          }}\n        </h5>\n\n        <rx-record-grid\n          class=\"flex-grow-1\"\n          [config]=\"recordGridConfig\"\n          #availableEmailNotificationRecipientsRecordGrid\n        ></rx-record-grid>\n      </div>\n\n      <button\n        class=\"d-icon-angle_right align-self-center mx-4\"\n        adapt-button\n        btn-type=\"secondary\"\n        type=\"button\"\n        rx-id=\"move-to-selected-button\"\n        [disabled]=\"!canSelectRecipients()\"\n        (click)=\"onMoveToSelectedClick()\"\n      ></button>\n\n      <div class=\"col d-flex flex-column h-100 p-0\">\n        <h5 class=\"m-0 mb-4\">\n          {{\n            'com.bmc.arsys.rx.client.admin.cognitive-consumption-notification.selected-email-recipient.title'\n              | translate\n          }}\n        </h5>\n\n        <ul *ngIf=\"selectedEmailRecipients.length\" class=\"list-group\">\n          <li\n            *ngFor=\"let recipient of selectedEmailRecipients; let $index = index\"\n            class=\"list-group-item d-flex justify-content-between p-0 px-2\"\n          >\n            {{ recipient }}\n\n            <button\n              class=\"d-icon-trash_adapt\"\n              adapt-button\n              btn-type=\"tertiary\"\n              type=\"button\"\n              rx-id=\"remove-recipient\"\n              (click)=\"onRemoveRecipientClick($index)\"\n            ></button>\n          </li>\n        </ul>\n\n        <div *ngIf=\"!selectedEmailRecipients.length\" class=\"card h-100\">\n          <div class=\"card-block\">\n            <adapt-empty-state\n              type=\"objects\"\n              label=\"{{\n                'com.bmc.arsys.rx.client.admin.cognitive-consumption-notification.recipient-not-selected.message'\n                  | translate\n              }}\"\n            ></adapt-empty-state>\n          </div>\n        </div>\n      </div>\n    </div>\n  </form>\n</div>\n\n<div class=\"modal-footer d-flex\">\n  <button\n    class=\"mr-auto\"\n    rx-id=\"notification-history-button\"\n    adapt-button\n    btn-type=\"secondary\"\n    type=\"button\"\n    (click)=\"onNotificationHistoryClick()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.admin.cognitive-consumption-notification.notification-history.title' | translate }}\n  </button>\n\n  <button\n    rx-id=\"save-button\"\n    adapt-button\n    btn-type=\"primary\"\n    type=\"button\"\n    [disabled]=\"isSaveButtonDisabled()\"\n    (click)=\"onSaveClick()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button rx-id=\"close-button\" adapt-button btn-type=\"secondary\" size=\"small\" type=\"button\" (click)=\"onCloseClick()\">\n    {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n  </button>\n</div>\n", styles: [":host ::ng-deep .card-block{display:flex;justify-content:center;align-items:center}\n"], components: [{ type: i5.RxBusyIndicatorComponent, selector: "rx-busy-indicator", inputs: ["options"] }, { type: i1.AdaptRxCounterComponent, selector: "adapt-rx-counter", inputs: ["prefix", "suffix", "max", "min", "step", "size", "placeholder", "disabledStyleForReadonlyState"] }, { type: i6.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }], directives: [{ type: i7.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i7.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i7.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i7.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i5.RxCustomValidatorsDirective, selector: "[rxCustomValidators][ngModel],[rxCustomValidators][formControl]", inputs: ["rxCustomValidators"] }, { type: i7.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i7.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i8.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i4.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CognitiveConsumptionNotificationModalComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-cognitive-consumption-notification-modal',
                    templateUrl: './cognitive-consumption-notification-modal.component.html',
                    styleUrls: ['./cognitive-consumption-notification-modal.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveModalRef }, { type: i1.AdaptModalService }, { type: i2.RxCognitiveConsumptionService }, { type: i3.RxCurrentUserService }, { type: i3.RxLogService }, { type: i3.RxNotificationService }, { type: i4.TranslateService }, { type: i0.Injector }]; }, propDecorators: { availableEmailNotificationRecipientsRecordGrid: [{
                type: ViewChild,
                args: ['availableEmailNotificationRecipientsRecordGrid', { static: true }]
            }], notificationForm: [{
                type: ViewChild,
                args: ['notificationForm', { static: true, read: NgForm }]
            }] } });
//# sourceMappingURL=cognitive-consumption-notification-modal.component.js.map