import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@angular/forms";
export class ColumnEditorAlignmentComponent {
    trackByForAlignmentOptions(index, alignment) {
        return alignment || index;
    }
}
ColumnEditorAlignmentComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ColumnEditorAlignmentComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ColumnEditorAlignmentComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ColumnEditorAlignmentComponent, selector: "rx-column-editor-alignment", inputs: { column: "column", isReadOnly: "isReadOnly", columnProperty: "columnProperty" }, ngImport: i0, template: "<div class=\"btn-group py-2 btn-group-toggle\" data-toggle=\"buttons\">\n  <label\n    class=\"btn btn-sm rounded btn-secondary {{ selectionValue.icon }}\"\n    *ngFor=\"let selectionValue of columnProperty.selectionValues; trackBy: trackByForAlignmentOptions\"\n    [class.active]=\"column.alignment === selectionValue.value\"\n    [class.disabled]=\"isReadOnly\"\n    [adaptTooltip]=\"selectionValue.name\"\n    [attr.rx-id]=\"selectionValue.name\"\n  >\n    <input\n      size=\"small\"\n      type=\"radio\"\n      name=\"selectionValue.name\"\n      [attr.rx-id]=\"selectionValue.value\"\n      [value]=\"selectionValue.value\"\n      [(ngModel)]=\"column.alignment\"\n      [disabled]=\"isReadOnly\"\n    />\n  </label>\n</div>\n", styles: [".alignment-field{min-width:140px}\n"], directives: [{ type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.AdaptTooltipDirective, selector: "[adaptTooltip]", inputs: ["popupDelay", "placement", "width", "minWidth", "useWidthFitting", "adaptRadarDisableEventSending", "adaptTooltip", "manual"], outputs: ["shown", "hidden"], exportAs: ["tooltip"] }, { type: i3.RadioControlValueAccessor, selector: "input[type=radio][formControlName],input[type=radio][formControl],input[type=radio][ngModel]", inputs: ["name", "formControlName", "value"] }, { type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ColumnEditorAlignmentComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-column-editor-alignment',
                    templateUrl: './column-editor-alignment.component.html',
                    styleUrls: ['./column-editor-alignment.component.scss']
                }]
        }], propDecorators: { column: [{
                type: Input
            }], isReadOnly: [{
                type: Input
            }], columnProperty: [{
                type: Input
            }] } });
//# sourceMappingURL=column-editor-alignment.component.js.map