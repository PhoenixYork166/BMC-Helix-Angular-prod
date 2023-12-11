import { Component } from '@angular/core';
import { BaseViewComponent } from '@helix/platform/view/runtime';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/runtime";
export class PageComponent extends BaseViewComponent {
    constructor() {
        super();
    }
}
PageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: PageComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
PageComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: PageComponent, selector: "rx-page", usesInheritance: true, ngImport: i0, template: "<rx-runtime-view-canvas-outlet></rx-runtime-view-canvas-outlet>\n", components: [{ type: i1.RuntimeViewCanvasOutletComponent, selector: "rx-runtime-view-canvas-outlet", inputs: ["name"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: PageComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-page',
                    templateUrl: './page.component.html'
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=page.component.js.map