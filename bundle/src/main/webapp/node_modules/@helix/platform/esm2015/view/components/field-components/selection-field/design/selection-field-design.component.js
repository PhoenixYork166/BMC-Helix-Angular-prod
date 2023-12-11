import { Component, Input } from '@angular/core';
import { SelectionFieldDesignModel } from './selection-field-design.model';
import { RX_SELECTION_FIELD } from '../selection-field.constant';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
export class SelectionFieldDesignComponent {
    ngOnInit() {
        this.model.editingMode$.subscribe((mode) => {
            this.setMode(mode);
        });
    }
    setMode(mode) {
        this.isRadioButtonMode = mode === RX_SELECTION_FIELD.editingModeValue.radioButtons;
    }
}
SelectionFieldDesignComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectionFieldDesignComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
SelectionFieldDesignComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: SelectionFieldDesignComponent, selector: "rx-selection-field-design", inputs: { model: "model" }, ngImport: i0, template: "<adapt-rx-select\n  class=\"rx-pointer-events-none\"\n  [label]=\"model.label$ | async\"\n  [options]=\"[]\"\n  [disabled]=\"true\"\n  *ngIf=\"!isRadioButtonMode\"\n  [required]=\"model.isRequired$ | async\"\n  ngModel\n>\n</adapt-rx-select>\n\n<ng-container *ngIf=\"isRadioButtonMode\">\n  <div class=\"form-group\">\n    <label class=\"form-control-label\">\n      {{ model.label$ | async }}\n      <span *ngIf=\"model.isRequired$ | async\" class=\"form-control-required\">(required)</span>\n    </label>\n\n    <adapt-rx-radiobutton-group [(ngModel)]=\"isRadioButtonMode\" [disabled]=\"true\">\n      <adapt-rx-radiobutton *ngIf=\"!(model.isRequired$ | async)\" value=\"None\" label=\"None\"></adapt-rx-radiobutton>\n      <adapt-rx-radiobutton label=\"Option 1\"></adapt-rx-radiobutton>\n      <adapt-rx-radiobutton label=\"Option 2\"></adapt-rx-radiobutton>\n    </adapt-rx-radiobutton-group>\n  </div>\n</ng-container>\n", styles: ["::ng-deep adapt-select{width:100%}\n"], components: [{ type: i1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i1.AdaptRxRadiobuttonGroupComponent, selector: "adapt-rx-radiobutton-group", inputs: ["formControlName"] }, { type: i1.AdaptRxRadiobuttonComponent, selector: "adapt-rx-radiobutton", inputs: ["name", "label", "id", "value", "checked", "disabled", "ariaLabel", "ariaLabeledBy", "ariaDescribedBy", "testID", "tabIndex"], outputs: ["onFocus", "onBlur", "checkedChange"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i3.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }], pipes: { "async": i2.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectionFieldDesignComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-selection-field-design',
                    templateUrl: './selection-field-design.component.html',
                    styleUrls: ['./selection-field-design.component.scss']
                }]
        }], propDecorators: { model: [{
                type: Input
            }] } });
//# sourceMappingURL=selection-field-design.component.js.map