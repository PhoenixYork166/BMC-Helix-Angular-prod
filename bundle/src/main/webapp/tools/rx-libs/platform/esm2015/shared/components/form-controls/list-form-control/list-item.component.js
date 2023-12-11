import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "../expression-form-control/expression-form-control.component";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
export class ListItemComponent {
    constructor() {
        this.events = new EventEmitter();
    }
    ngOnInit() {
        this.options = {
            label: this.config.label,
            dataDictionary$: this.config.dataDictionary$,
            operators: this.config.operators
        };
    }
}
ListItemComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ListItemComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ListItemComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ListItemComponent, selector: "rx-list-item", inputs: { config: "config", propertyPath: "propertyPath", control: "control" }, outputs: { events: "events" }, ngImport: i0, template: "<adapt-rx-textfield *ngIf=\"!config.dataDictionary$\" [label]=\"config.label\" [formControl]=\"control\">\n</adapt-rx-textfield>\n\n<rx-expression-form-control\n  *ngIf=\"config.dataDictionary$\"\n  [formControl]=\"control\"\n  [propertyPath]=\"propertyPath\"\n  [options]=\"options\"\n  (events)=\"events.emit($event)\"\n>\n</rx-expression-form-control>\n", components: [{ type: i1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i2.ExpressionFormControlComponent, selector: "rx-expression-form-control", inputs: ["options", "isDisabled", "propertyPath"], outputs: ["events"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ListItemComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-list-item',
                    templateUrl: './list-item.component.html'
                }]
        }], propDecorators: { config: [{
                type: Input
            }], propertyPath: [{
                type: Input
            }], control: [{
                type: Input
            }], events: [{
                type: Output
            }] } });
//# sourceMappingURL=list-item.component.js.map