import { Component, Injector, ViewChild } from '@angular/core';
import { ActiveModalRef, DismissReasons } from '@bmc-ux/adapt-angular';
import { NgForm } from '@angular/forms';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RxDefinitionNameService } from '@helix/platform/shared/api';
import { RxModalClass } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
import * as i5 from "@helix/platform/ui-kit";
import * as i6 from "@helix/platform/utils";
import * as i7 from "@ngx-translate/core";
export class RenameDefinitionModalComponent extends RxModalClass {
    constructor(injector, activeModalRef, rxDefinitionNameService) {
        super(activeModalRef, injector);
        this.injector = injector;
        this.activeModalRef = activeModalRef;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.modalData = this.activeModalRef.getData();
    }
    ngOnInit() {
        super.ngOnInit();
        this.bundleId = this.rxDefinitionNameService.getBundleId(this.modalData.definitionName);
        this.definitionDisplayName = this.rxDefinitionNameService.getDisplayName(this.modalData.definitionName);
        this.oldDefinitionDisplayName = this.rxDefinitionNameService.getDisplayName(this.modalData.definitionName);
        this.definitionNames = this.modalData.definitionNames
            .map((definitionName) => this.rxDefinitionNameService.getDisplayName(definitionName))
            .filter((definitionName) => definitionName !== this.definitionDisplayName);
    }
    isDirty() {
        return this.renameDefinitionModalForm.form.dirty;
    }
    getCorrectDefinitionNameValidator() {
        return (control) => {
            let result = null;
            if (control.value && !RX_RECORD_DEFINITION.validDefinitionNameRegex.test(control.value)) {
                result = { invalidDefinitionName: { message: this.modalData.validationErrorText } };
            }
            return result;
        };
    }
    onCancelClick() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
    onSaveClick() {
        if (this.bundleId) {
            this.activeModalRef.close(this.rxDefinitionNameService.getDefinitionName(this.bundleId, this.definitionDisplayName));
        }
        else {
            this.activeModalRef.close(this.definitionDisplayName);
        }
    }
}
RenameDefinitionModalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RenameDefinitionModalComponent, deps: [{ token: i0.Injector }, { token: i1.ActiveModalRef }, { token: i2.RxDefinitionNameService }], target: i0.ɵɵFactoryTarget.Component });
RenameDefinitionModalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RenameDefinitionModalComponent, selector: "rx-rename-definition-modal", viewQueries: [{ propertyName: "renameDefinitionModalForm", first: true, predicate: ["renameDefinitionModalForm"], descendants: true, read: NgForm, static: true }], usesInheritance: true, ngImport: i0, template: "<div class=\"modal-body\">\n  <adapt-alert\n    *ngIf=\"modalData.infoText\"\n    [config]=\"{ title: modalData.infoText, type: 'inline', variant: 'warning' }\"\n  ></adapt-alert>\n\n  <form #renameDefinitionModalForm=\"ngForm\">\n    <adapt-rx-textfield\n      name=\"definitionDisplayName\"\n      [(ngModel)]=\"definitionDisplayName\"\n      [label]=\"modalData.fieldLabel\"\n      [rxCustomValidators]=\"getCorrectDefinitionNameValidator()\"\n      [maxlength]=\"modalData.maxLength || null\"\n      [rxUnique]=\"{\n        errorMessage:\n          'com.bmc.arsys.rx.client.rename-definition-modal.definition-already-exists.message'\n          | translate: { definitionType: modalData.definitionType },\n        items: definitionNames\n      }\"\n      adaptRequired\n      [autofocus]=\"modalData.autoFocus !== false\"\n    ></adapt-rx-textfield>\n  </form>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    rx-id=\"save-button\"\n    adapt-button\n    btn-type=\"primary\"\n    type=\"button\"\n    [disabled]=\"\n      !renameDefinitionModalForm.form.dirty ||\n      !renameDefinitionModalForm.form.valid ||\n      oldDefinitionDisplayName === definitionDisplayName\n    \"\n    (click)=\"onSaveClick()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button rx-id=\"cancel-button\" adapt-button btn-type=\"secondary\" type=\"button\" (click)=\"onCancelClick()\">\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", components: [{ type: i1.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i4.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i4.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i1.AdaptRequiredValidatorDirective, selector: "[adaptRequired][ngModel],[adaptRequired][formControl]", inputs: ["adaptRequiredMessageFn"] }, { type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i5.RxCustomValidatorsDirective, selector: "[rxCustomValidators][ngModel],[rxCustomValidators][formControl]", inputs: ["rxCustomValidators"] }, { type: i4.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { type: i6.RxUniqueValidator, selector: "[rxUnique]", inputs: ["rxUnique"] }], pipes: { "translate": i7.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RenameDefinitionModalComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-rename-definition-modal',
                    templateUrl: './rename-definition-modal.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.ActiveModalRef }, { type: i2.RxDefinitionNameService }]; }, propDecorators: { renameDefinitionModalForm: [{
                type: ViewChild,
                args: ['renameDefinitionModalForm', { static: true, read: NgForm }]
            }] } });
//# sourceMappingURL=rename-definition-modal.component.js.map