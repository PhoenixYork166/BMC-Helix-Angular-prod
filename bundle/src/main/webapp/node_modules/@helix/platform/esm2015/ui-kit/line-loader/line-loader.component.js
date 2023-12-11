import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class RxLineLoaderComponent {
    constructor() {
        this.loaderMessage = '';
    }
}
RxLineLoaderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLineLoaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
RxLineLoaderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxLineLoaderComponent, selector: "rx-line-loader", inputs: { loaderMessage: "loaderMessage" }, ngImport: i0, template: "<div class=\"adapt-alert-bar\">\n  <div class=\"progress-bar-intermediate lay1\"></div>\n  <div class=\"progress-bar-intermediate lay2\"></div>\n  <div class=\"progress-bar-intermediate lay3\"></div>\n</div>\n<p *ngIf=\"loaderMessage\" class=\"adapt-alert-bar__text\">{{ loaderMessage }}</p>\n", styles: [".adapt-alert-bar__text{text-align:center;padding:10px 0}\n"], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLineLoaderComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-line-loader',
                    templateUrl: './line-loader.component.html',
                    styleUrls: ['./line-loader.component.scss']
                }]
        }], propDecorators: { loaderMessage: [{
                type: Input
            }] } });
//# sourceMappingURL=line-loader.component.js.map