import { Component } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { InspectorControlBase } from '../../inspector/inspector-control-base.class';
import { ExpressionFormControlComponent } from '../../form-controls';
import * as i0 from "@angular/core";
import * as i1 from "../../form-controls/expression-form-control/expression-form-control.component";
import * as i2 from "@angular/forms";
export class ExpressionInspectorControlComponent extends InspectorControlBase {
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
        this.expressionFormControlOptions = Object.assign(Object.assign({}, this.options), { dataDictionary$: this.designerItemModel.expressionConfigurator.getDataDictionary(this.propertyPath), operators: this.designerItemModel.expressionConfigurator.getOperators(this.propertyPath) });
    }
}
ExpressionInspectorControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExpressionInspectorControlComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
ExpressionInspectorControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ExpressionInspectorControlComponent, selector: "rx-expression-inspector-form-control", providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: ExpressionFormControlComponent,
            multi: true
        }
    ], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<rx-expression-form-control\n  [formControl]=\"formControl\"\n  [propertyPath]=\"propertyPath\"\n  [options]=\"expressionFormControlOptions\"\n  (events)=\"events.emit($event)\"\n></rx-expression-form-control>\n", components: [{ type: i1.ExpressionFormControlComponent, selector: "rx-expression-form-control", inputs: ["options", "isDisabled", "propertyPath"], outputs: ["events"] }], directives: [{ type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExpressionInspectorControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-expression-inspector-form-control',
                    templateUrl: './expression-inspector-control.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: ExpressionFormControlComponent,
                            multi: true
                        }
                    ]
                }]
        }] });
//# sourceMappingURL=expression-inspector-control.component.js.map