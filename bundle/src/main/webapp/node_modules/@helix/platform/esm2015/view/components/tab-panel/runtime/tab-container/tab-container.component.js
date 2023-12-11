import { Component } from '@angular/core';
import { ContainerComponent } from '../../../container';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/runtime";
import * as i2 from "@angular/common";
export class RxTabContainerComponent extends ContainerComponent {
    constructor() {
        super(...arguments);
        this.state = {
            enableLazyLoading: false,
            label: ''
        };
    }
}
RxTabContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxTabContainerComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
RxTabContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxTabContainerComponent, selector: "rx-tab-container", usesInheritance: true, ngImport: i0, template: "<rx-runtime-view-canvas-outlet *ngIf=\"!state.hidden\"></rx-runtime-view-canvas-outlet>\n", styles: [":host{display:block}\n"], components: [{ type: i1.RuntimeViewCanvasOutletComponent, selector: "rx-runtime-view-canvas-outlet", inputs: ["name"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxTabContainerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-tab-container',
                    templateUrl: './tab-container.component.html',
                    styleUrls: ['./tab-container.component.scss']
                }]
        }] });
//# sourceMappingURL=tab-container.component.js.map