import { Component } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { InspectorControlBase } from '../../inspector/inspector-control-base.class';
import * as i0 from "@angular/core";
import * as i1 from "../../form-controls/optional-expression-control/optional-expression-control.component";
import * as i2 from "@angular/forms";
export class OptionalExpressionInspectorControlComponent extends InspectorControlBase {
    constructor() {
        super(...arguments);
        this.formControl = this.injector.get(NgControl).control;
    }
    ngOnInit() {
        this.patchOptions();
    }
    ngOnChanges(changes) {
        if (changes.optinos) {
            this.patchOptions();
        }
    }
    patchOptions() {
        this.optionalExpressionFormControlOptions = Object.assign(Object.assign({}, this.options), { dataDictionary$: this.designerItemModel.expressionConfigurator.getDataDictionary(this.propertyPath), operators: this.designerItemModel.expressionConfigurator.getOperators(this.propertyPath) });
    }
}
OptionalExpressionInspectorControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OptionalExpressionInspectorControlComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
OptionalExpressionInspectorControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: OptionalExpressionInspectorControlComponent, selector: "rx-optional-expression-inspector-control", providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: OptionalExpressionInspectorControlComponent,
            multi: true
        }
    ], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<rx-optional-expression-form-control\n  [formControl]=\"formControl\"\n  [propertyPath]=\"propertyPath\"\n  [options]=\"optionalExpressionFormControlOptions\"\n  (events)=\"events.emit($event)\"\n></rx-optional-expression-form-control>\n", components: [{ type: i1.OptionalExpressionControlComponent, selector: "rx-optional-expression-form-control", inputs: ["options", "propertyPath"], outputs: ["events"] }], directives: [{ type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OptionalExpressionInspectorControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-optional-expression-inspector-control',
                    templateUrl: './optional-expression-inspector-control.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: OptionalExpressionInspectorControlComponent,
                            multi: true
                        }
                    ]
                }]
        }] });
//# sourceMappingURL=optional-expression-inspector-control.component.js.map