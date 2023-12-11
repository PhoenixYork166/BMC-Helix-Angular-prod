import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class RxJsonViewerComponent {
    constructor() {
        this.data = {};
    }
}
RxJsonViewerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxJsonViewerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
RxJsonViewerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxJsonViewerComponent, selector: "rx-json-viewer", inputs: { data: "data" }, ngImport: i0, template: "<textarea class=\"form-control\" readonly>{{ data | json }}</textarea>\n", styles: [":host{display:flex;padding:12px;flex-grow:1}.form-control{resize:none}\n"], pipes: { "json": i1.JsonPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxJsonViewerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-json-viewer',
                    templateUrl: './json-viewer.component.html',
                    styleUrls: ['./json-viewer.component.scss']
                }]
        }], propDecorators: { data: [{
                type: Input
            }] } });
//# sourceMappingURL=json-viewer.component.js.map