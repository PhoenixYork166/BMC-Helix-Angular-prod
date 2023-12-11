import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ValueAccessor } from '../../form-builder/value-accessor';
import { MessageType } from './validation-form-control-options.types';
import { RX_VALIDATION_FORM_CONTROL } from './validation-form-control.constant';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@angular/common";
export class ValidationFormControlComponent extends ValueAccessor {
    constructor() {
        super(...arguments);
        this.events = new EventEmitter();
        this.messageType = MessageType;
    }
    correctIssue() {
        this.events.emit({
            type: RX_VALIDATION_FORM_CONTROL.events.correctValidationIssue,
            payload: {
                propertyName: this.options.propertyName,
                componentGuid: this.options.componentGuid
            }
        });
    }
}
ValidationFormControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ValidationFormControlComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
ValidationFormControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ValidationFormControlComponent, selector: "rx-validation-form-control", inputs: { options: "options" }, outputs: { events: "events" }, usesInheritance: true, ngImport: i0, template: "<p\n  [ngClass]=\"{\n    'text-danger': options.messageType === messageType.Error,\n    'text-warning': options.messageType === messageType.Warning,\n    'text-info': options.messageType === messageType.Info,\n    'text-success': options.messageType === messageType.Success\n  }\"\n  [ngStyle]=\"options.customStyle\"\n>\n  {{ options.text }}\n</p>\n\n<div *ngIf=\"options.componentGuid && !isDisabled\" class=\"text-right\">\n  <button type=\"button\" adapt-button size=\"small\" btn-type=\"tertiary\" (click)=\"correctIssue()\">Correct issue</button>\n</div>\n", components: [{ type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ValidationFormControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-validation-form-control',
                    templateUrl: './validation-form-control.component.html'
                }]
        }], propDecorators: { options: [{
                type: Input
            }], events: [{
                type: Output
            }] } });
//# sourceMappingURL=validation-form-control.component.js.map