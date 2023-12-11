import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { head, last, upperFirst } from 'lodash';
import { ValueAccessor } from '../../form-builder/value-accessor';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "../expression-form-control/expression-form-control.component";
import * as i3 from "@angular/forms";
import * as i4 from "@angular/common";
export class OptionalExpressionControlComponent extends ValueAccessor {
    constructor() {
        super(...arguments);
        this.events = new EventEmitter();
        this.modelValues = {
            disable: '0',
            enable: '1'
        };
        this.selectValues = {
            all: 'all',
            condition: 'condition'
        };
        this.selectOptions = [
            {
                id: this.selectValues.all,
                name: 'At all times'
            },
            {
                id: this.selectValues.condition,
                name: 'When condition is true'
            }
        ];
        this.selectedCondition = [head(this.selectOptions)];
    }
    ngOnInit() {
        this.expressionFieldOptions = {
            label: 'Condition',
            expressionEditorPropertyName: this.options.expressionEditorPropertyName || upperFirst(this.propertyPath),
            dataDictionary$: this.options.dataDictionary$,
            operators: this.options.operators
        };
    }
    onWriteValue(modelValue) {
        this.conditionValue = '';
        this.selectedCondition = [head(this.selectOptions)];
        if (modelValue === this.modelValues.enable) {
            this.checkbox = true;
        }
        else if (modelValue === this.modelValues.disable) {
            this.checkbox = false;
        }
        else {
            this.checkbox = true;
            this.selectedCondition = [last(this.selectOptions)];
            this.conditionValue = modelValue;
        }
    }
    onSwitcherChange(modelValue) {
        this.selectedCondition = [head(this.selectOptions)];
        this.conditionValue = '';
        this.value = modelValue ? this.modelValues.enable : this.modelValues.disable;
    }
    onSelectChange(selectedValue) {
        this.selectedCondition = selectedValue;
        this.conditionValue = '';
        this.value = head(selectedValue).id === this.selectValues.all ? this.modelValues.enable : '';
    }
    onConditionChange(expressionValue) {
        this.value = expressionValue;
    }
    optionFormatter(option) {
        return option.name;
    }
}
OptionalExpressionControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OptionalExpressionControlComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
OptionalExpressionControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: OptionalExpressionControlComponent, selector: "rx-optional-expression-form-control", inputs: { options: "options", propertyPath: "propertyPath" }, outputs: { events: "events" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: OptionalExpressionControlComponent,
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: "<adapt-rx-control-label [label]=\"options.label\"></adapt-rx-control-label>\n\n<div class=\"clearfix\">\n  <adapt-rx-switch\n    [(ngModel)]=\"checkbox\"\n    (ngModelChange)=\"onSwitcherChange($event)\"\n    [disabled]=\"isDisabled\"\n  ></adapt-rx-switch>\n\n  <adapt-rx-select\n    *ngIf=\"checkbox\"\n    class=\"condition-select\"\n    [options]=\"selectOptions\"\n    [ngModel]=\"selectedCondition\"\n    (ngModelChange)=\"onSelectChange($event)\"\n    [disabled]=\"isDisabled\"\n    [optionFormatter]=\"optionFormatter\"\n  ></adapt-rx-select>\n</div>\n\n<rx-expression-form-control\n  *ngIf=\"selectedCondition[0].id === selectValues.condition\"\n  [options]=\"expressionFieldOptions\"\n  [propertyPath]=\"this.propertyPath\"\n  [disabled]=\"isDisabled\"\n  [(ngModel)]=\"conditionValue\"\n  (ngModelChange)=\"onConditionChange($event)\"\n  (events)=\"events.emit($event)\"\n>\n</rx-expression-form-control>\n", styles: [".condition-select{width:165px;float:right;margin-bottom:0;margin-top:2px}adapt-select ::ng-deep .dropdown_select__menu{left:auto;right:0}\n"], components: [{ type: i1.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i1.AdaptRxSwitchComponent, selector: "adapt-rx-switch", inputs: ["value", "size", "isLabelBefore", "checked"] }, { type: i1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i2.ExpressionFormControlComponent, selector: "rx-expression-form-control", inputs: ["options", "isDisabled", "propertyPath"], outputs: ["events"] }], directives: [{ type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OptionalExpressionControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-optional-expression-form-control',
                    templateUrl: './optional-expression-control.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: OptionalExpressionControlComponent,
                            multi: true
                        }
                    ],
                    styleUrls: ['./optional-expression-control.component.scss']
                }]
        }], propDecorators: { options: [{
                type: Input
            }], propertyPath: [{
                type: Input
            }], events: [{
                type: Output
            }] } });
//# sourceMappingURL=optional-expression-control.component.js.map