import { Component, Input } from '@angular/core';
import { BooleanFieldDesignModel } from './boolean-field-design.model';
import { BooleanFieldEditingMode } from '../boolean-field.types';
import { map, takeUntil } from 'rxjs/operators';
import { combineLatest, ReplaySubject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
export class BooleanFieldDesignComponent {
    constructor() {
        this.shouldDisplayAsCheckbox = false;
        this.destroyed$ = new ReplaySubject(1);
    }
    ngOnInit() {
        const editingMode$ = this.model.componentProperties$.pipe(map((componentProperties) => componentProperties.editingMode || BooleanFieldEditingMode.Switch));
        combineLatest([editingMode$, this.model.isRequired$])
            .pipe(takeUntil(this.destroyed$))
            .subscribe(([editingMode, isRequired]) => {
            this.shouldDisplayAsCheckbox = isRequired && editingMode === BooleanFieldEditingMode.Checkbox;
        });
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
BooleanFieldDesignComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BooleanFieldDesignComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
BooleanFieldDesignComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: BooleanFieldDesignComponent, selector: "rx-boolean-field-design", inputs: { model: "model" }, ngImport: i0, template: "<ng-container *ngIf=\"!shouldDisplayAsCheckbox\">\n  <div>\n    <strong>\n      {{ model.label$ | async }}\n      <span *ngIf=\"model.isRequired$ | async\" class=\"form-control-required\">(required)</span>\n    </strong>\n  </div>\n  <adapt-rx-switch [(ngModel)]=\"booleanValue\" [disabled]=\"true\"></adapt-rx-switch>\n</ng-container>\n\n<ng-container *ngIf=\"shouldDisplayAsCheckbox\">\n  <adapt-rx-checkbox\n    [(ngModel)]=\"booleanValue\"\n    [label]=\"model.label$ | async\"\n    [required]=\"model.isRequired$ | async\"\n    [disabled]=\"true\"\n  >\n  </adapt-rx-checkbox>\n</ng-container>\n", components: [{ type: i1.AdaptRxSwitchComponent, selector: "adapt-rx-switch", inputs: ["value", "size", "isLabelBefore", "checked"] }, { type: i1.AdaptRxCheckboxComponent, selector: "adapt-rx-checkbox", inputs: ["value", "checked", "indeterminate"], outputs: ["indeterminateChange"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i3.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }], pipes: { "async": i2.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BooleanFieldDesignComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-boolean-field-design',
                    templateUrl: './boolean-field-design.component.html'
                }]
        }], propDecorators: { model: [{
                type: Input
            }] } });
//# sourceMappingURL=boolean-field-design.component.js.map