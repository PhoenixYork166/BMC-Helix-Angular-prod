import { Component, Injector } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActiveModalRef, DismissReasons } from '@bmc-ux/adapt-angular';
import { RxModalClass } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@angular/forms";
import * as i3 from "@helix/platform/utils";
import * as i4 from "@angular/common";
import * as i5 from "@ngx-translate/core";
export class RenameViewPresetComponent extends RxModalClass {
    constructor(activeModalRef, injector) {
        super(activeModalRef, injector);
        this.activeModalRef = activeModalRef;
        this.injector = injector;
        this.viewPresetNameFormControl = new FormControl('');
        this.destroyed$ = new ReplaySubject(1);
        this.modalData = this.activeModalRef.getData();
        this.viewPresetNameFormControl.setValue(this.modalData.viewPresetName);
        this.viewPresetNameFormControl.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe((value) => {
            if (this.viewPresetNameFormControl.dirty && value === this.modalData.viewPresetName) {
                this.viewPresetNameFormControl.reset(this.modalData.viewPresetName);
            }
        });
    }
    ngOnInit() {
        super.ngOnInit();
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    save() {
        this.activeModalRef.close(this.generateUniqueViewPresetName(this.viewPresetNameFormControl.value));
    }
    cancel() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
    isViewPresetNameUnique(viewPresetName) {
        const trimmedViewPresetName = viewPresetName.trim();
        return !this.modalData.existingViewPresetNames.some((existingViewPresetName) => existingViewPresetName === trimmedViewPresetName);
    }
    generateUniqueViewPresetName(viewPresetName) {
        const trimmedViewPresetName = viewPresetName.trim();
        let uniqueViewPresetName = trimmedViewPresetName;
        let suffix = 1;
        while (!this.isViewPresetNameUnique(uniqueViewPresetName)) {
            uniqueViewPresetName = `${trimmedViewPresetName}-${suffix++}`;
        }
        return uniqueViewPresetName;
    }
}
RenameViewPresetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RenameViewPresetComponent, deps: [{ token: i1.ActiveModalRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
RenameViewPresetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RenameViewPresetComponent, selector: "rx-rename-view-preset", usesInheritance: true, ngImport: i0, template: "<div class=\"modal-body\">\n  <adapt-rx-textfield\n    [formControl]=\"viewPresetNameFormControl\"\n    [label]=\"modalData.fieldLabel\"\n    name=\"viewPresetName\"\n    rx-id=\"view-preset-name-field\"\n    [maxlength]=\"254\"\n    required=\"true\"\n    rxNoWhitespace\n    [autofocus]=\"true\"\n  >\n  </adapt-rx-textfield>\n\n  <p *ngIf=\"!isViewPresetNameUnique(viewPresetNameFormControl.value)\" class=\"text-info m-0 pt-1\">\n    {{\n      'com.bmc.arsys.rx.client.view-components.view-preset-selector.view-preset-already-exists.error.message'\n        | translate\n    }}\n  </p>\n</div>\n<div class=\"modal-footer\">\n  <button\n    adapt-button\n    btn-type=\"primary\"\n    type=\"button\"\n    rx-id=\"save-button\"\n    (click)=\"save()\"\n    [disabled]=\"viewPresetNameFormControl.invalid || viewPresetNameFormControl.pristine\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n  <button adapt-button btn-type=\"secondary\" type=\"button\" rx-id=\"cancel-button\" (click)=\"cancel()\">\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", components: [{ type: i1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i3.RxNoWhitespaceValidator, selector: "[rxNoWhitespace]", inputs: ["rxNoWhitespace"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i2.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i5.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RenameViewPresetComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-rename-view-preset',
                    templateUrl: './rename-view-preset.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveModalRef }, { type: i0.Injector }]; } });
//# sourceMappingURL=rename-view-preset.component.js.map