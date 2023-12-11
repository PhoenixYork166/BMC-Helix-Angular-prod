import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { RX_EXPRESSION_EDITOR } from '../../expression-editor';
import { ValueAccessor } from '../../form-builder/value-accessor';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "../../definition-picker/definition-picker.component";
import * as i3 from "../expression-form-control/expression-form-control.component";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
import * as i6 from "@ngx-translate/core";
var DefinitionPickerOrExpressionComponentMode;
(function (DefinitionPickerOrExpressionComponentMode) {
    DefinitionPickerOrExpressionComponentMode["Definition"] = "Definition";
    DefinitionPickerOrExpressionComponentMode["Expression"] = "Expression";
})(DefinitionPickerOrExpressionComponentMode || (DefinitionPickerOrExpressionComponentMode = {}));
export class DefinitionPickerOrExpressionFormControlComponent extends ValueAccessor {
    constructor() {
        super(...arguments);
        this.events = new EventEmitter();
        this.componentMode = DefinitionPickerOrExpressionComponentMode;
        this.activeMode = DefinitionPickerOrExpressionComponentMode.Definition;
    }
    ngOnInit() {
        this.activeMode = this.isDynamicDefinitionName(this.value)
            ? DefinitionPickerOrExpressionComponentMode.Expression
            : DefinitionPickerOrExpressionComponentMode.Definition;
        this.definitionPickerOptions = {
            definitionType: this.options.definitionType,
            label: this.options.label
        };
        this.expressionFormControlOptions = {
            dataDictionary$: this.options.dataDictionary$,
            operators: this.options.operators,
            label: this.options.label
        };
    }
    selectMode(mode) {
        if (this.activeMode !== mode) {
            this.activeMode = mode;
            this.value = null;
        }
        else if (this.activeMode === mode && this.value) {
            this.events.emit({
                type: RX_EXPRESSION_EDITOR.events.openExpressionEditor,
                payload: {
                    propertyPath: this.propertyPath
                }
            });
        }
    }
    onModelValueChange(expressionValue) {
        this.value = expressionValue;
    }
    isDynamicDefinitionName(definitionName) {
        return Boolean(definitionName === null || definitionName === void 0 ? void 0 : definitionName.match(/\$\{.*\}/));
    }
}
DefinitionPickerOrExpressionFormControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DefinitionPickerOrExpressionFormControlComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
DefinitionPickerOrExpressionFormControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DefinitionPickerOrExpressionFormControlComponent, selector: "rx-definition-picker-or-expression-form-control", inputs: { options: "options", propertyPath: "propertyPath" }, outputs: { events: "events" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: DefinitionPickerOrExpressionFormControlComponent,
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: "<div class=\"d-flex flex-row-reverse row toggle-dropdown\">\n  <div class=\"dropdown\" adaptDropdown>\n    <button rx-id=\"toggle-button\" class=\"btn btn-link pl-0\" adaptDropdownToggle type=\"button\">\n      <span class=\"flex-grow-1 rx-ellipsis rx-selected-item\">\n        {{ 'com.bmc.arsys.rx.client.common.select.label' | translate }}\n      </span>\n    </button>\n\n    <div class=\"dropdown-menu\" adaptDropdownMenu>\n      <button\n        type=\"button\"\n        class=\"dropdown-item\"\n        (click)=\"selectMode(componentMode.Definition)\"\n        [class.active]=\"activeMode === componentMode.Definition\"\n      >\n        Select {{ options.definitionType }}\n      </button>\n\n      <button\n        type=\"button\"\n        class=\"dropdown-item\"\n        (click)=\"selectMode(componentMode.Expression)\"\n        [class.active]=\"activeMode === componentMode.Expression\"\n      >\n        {{ 'com.bmc.arsys.rx.client.expression-editor.edit-expression.title' | translate }}\n      </button>\n    </div>\n  </div>\n</div>\n\n<rx-definition-picker\n  *ngIf=\"activeMode === componentMode.Definition\"\n  [ngModel]=\"value\"\n  (ngModelChange)=\"onModelValueChange($event)\"\n  [options]=\"definitionPickerOptions\"\n  [isDisabled]=\"isDisabled\"\n>\n</rx-definition-picker>\n\n<rx-expression-form-control\n  *ngIf=\"activeMode === componentMode.Expression\"\n  [options]=\"expressionFormControlOptions\"\n  [propertyPath]=\"propertyPath\"\n  [disabled]=\"isDisabled\"\n  [ngModel]=\"value\"\n  (ngModelChange)=\"onModelValueChange($event)\"\n  (events)=\"events.emit($event)\"\n>\n</rx-expression-form-control>\n", styles: [".toggle-dropdown{margin-bottom:-29px}[rx-id=toggle-button]{margin-top:-9px;margin-right:5px}\n"], components: [{ type: i1.AdaptDropdownDirective, selector: "adapt-dropdown, [adaptDropdown]", inputs: ["autoClose", "customClass", "closeOnEscape", "placement", "animationPlacement", "holdFocusInMenu", "holdFocusOnOpen", "autoFocusFirst", "restoreFocusAfterClose", "focusNextElementAfterClose", "appendToBody", "appendTo", "positionTo", "anchorPositionTrackingIntervalMs", "enableAnchorPositionTracking", "recalculatePositionOnElementResize", "setMobileState", "mobileView"], outputs: ["onOpen", "onClose", "anchorPositionChange", "popupAnimationDone"], exportAs: ["adaptDropdown"] }, { type: i2.RxDefinitionPickerComponent, selector: "rx-definition-picker", inputs: ["options", "isDisabled"] }, { type: i3.ExpressionFormControlComponent, selector: "rx-expression-form-control", inputs: ["options", "isDisabled", "propertyPath"], outputs: ["events"] }], directives: [{ type: i1.AdaptDropdownToggleDirective, selector: "[adaptDropdownToggle]", inputs: ["showCaret", "dropdownTogglerType"] }, { type: i1.AdaptDropdownMenuDirective, selector: "[adaptDropdownMenu]" }, { type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i6.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DefinitionPickerOrExpressionFormControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-definition-picker-or-expression-form-control',
                    templateUrl: 'definition-picker-or-expression-form-control.component.html',
                    styleUrls: ['definition-picker-or-expression-form-control.component.scss'],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: DefinitionPickerOrExpressionFormControlComponent,
                            multi: true
                        }
                    ]
                }]
        }], propDecorators: { options: [{
                type: Input
            }], propertyPath: [{
                type: Input
            }], events: [{
                type: Output
            }] } });
//# sourceMappingURL=definition-picker-or-expression-form-control.component.js.map