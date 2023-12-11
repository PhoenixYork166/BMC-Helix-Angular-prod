import { Component, Input } from '@angular/core';
import { RxShellActionDesignModel } from './shell-action-design.model';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class RxShellActionDesignComponent {
}
RxShellActionDesignComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellActionDesignComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
RxShellActionDesignComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxShellActionDesignComponent, selector: "rx-shell-action-design", inputs: { model: "model" }, ngImport: i0, template: "<span class=\"label\" [ngClass]=\"model.iconClass$ | async\" [title]=\"model.label$ | async\"></span>\n", styles: [":host{min-height:42px;display:flex;align-items:center;justify-content:center;min-width:42px}.label{font-size:20px;cursor:pointer}\n"], directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], pipes: { "async": i1.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellActionDesignComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-shell-action-design',
                    templateUrl: './shell-action-design.component.html',
                    styleUrls: ['./shell-action-design.component.scss']
                }]
        }], propDecorators: { model: [{
                type: Input
            }] } });
//# sourceMappingURL=shell-action-design.component.js.map