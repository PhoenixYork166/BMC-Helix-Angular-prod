import { Component, Input } from '@angular/core';
import { SelectGroupDesignModel } from './select-group-design.model';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
export class SelectGroupDesignComponent {
    trackByFn(index, item) {
        return item.data.guid;
    }
}
SelectGroupDesignComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectGroupDesignComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
SelectGroupDesignComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: SelectGroupDesignComponent, selector: "rx-select-group-design", inputs: { model: "model" }, ngImport: i0, template: "<ng-template [ngIf]=\"(model.fieldsDesignData$ | async).length\" [ngIfElse]=\"placeholderTemplate\">\n  <adapt-rx-textfield\n    *ngFor=\"let field of model.fieldsDesignData$ | async; trackBy: trackByFn\"\n    [label]=\"field.data.label || '<No Label>'\"\n    [required]=\"model.isFieldRequired(field) | async\"\n    [disabled]=\"true\"\n    ngModel\n    rx-id=\"select-group-field\"\n    class=\"form-group d-block\"\n  ></adapt-rx-textfield>\n</ng-template>\n\n<ng-template #placeholderTemplate>\n  <adapt-empty-state type=\"objects\" label=\"Add dependent fields in the Properties panel.\"></adapt-empty-state>\n</ng-template>\n", components: [{ type: i1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i3.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }], pipes: { "async": i2.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectGroupDesignComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-select-group-design',
                    templateUrl: './select-group-design.component.html'
                }]
        }], propDecorators: { model: [{
                type: Input
            }] } });
//# sourceMappingURL=select-group-design.component.js.map