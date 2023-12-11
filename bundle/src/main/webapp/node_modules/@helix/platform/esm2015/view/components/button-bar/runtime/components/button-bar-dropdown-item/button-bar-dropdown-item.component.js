import { Component, Input } from '@angular/core';
import { ActionButtonComponent } from '../../../../action-button/runtime/action-button.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class ButtonBarDropdownItemComponent extends ActionButtonComponent {
}
ButtonBarDropdownItemComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ButtonBarDropdownItemComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
ButtonBarDropdownItemComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ButtonBarDropdownItemComponent, selector: "rx-button-bar-dropdown-item-component", inputs: { guid: "guid", config: "config", runtimeViewModelApi: "runtimeViewModelApi" }, usesInheritance: true, ngImport: i0, template: "<button type=\"button\" class=\"dropdown-item\" *ngIf=\"!isHidden\" [disabled]=\"isDisabled\" (click)=\"api.click($event)\">\n  {{ state.label }}\n</button>\n", directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ButtonBarDropdownItemComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-button-bar-dropdown-item-component',
                    templateUrl: './button-bar-dropdown-item.component.html'
                }]
        }], propDecorators: { guid: [{
                type: Input
            }], config: [{
                type: Input
            }], runtimeViewModelApi: [{
                type: Input
            }] } });
//# sourceMappingURL=button-bar-dropdown-item.component.js.map