import { Component, Input } from '@angular/core';
import { RxShellMenuItemDesignModel } from './shell-menu-item-design.model';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class RxShellMenuItemDesignComponent {
}
RxShellMenuItemDesignComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellMenuItemDesignComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
RxShellMenuItemDesignComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxShellMenuItemDesignComponent, selector: "rx-shell-menu-item-design", inputs: { model: "model" }, ngImport: i0, template: "<span class=\"label\" [ngClass]=\"model.iconClass$ | async\">{{ model.label$ | async }}</span>\n", styles: [":host{min-height:42px;display:flex;align-items:center}.label{padding:0 10px;font-size:14px;cursor:pointer}\n"], directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], pipes: { "async": i1.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellMenuItemDesignComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-shell-menu-item-design',
                    templateUrl: './shell-menu-item-design.component.html',
                    styleUrls: ['./shell-menu-item-design.component.scss']
                }]
        }], propDecorators: { model: [{
                type: Input
            }] } });
//# sourceMappingURL=shell-menu-item-design.component.js.map