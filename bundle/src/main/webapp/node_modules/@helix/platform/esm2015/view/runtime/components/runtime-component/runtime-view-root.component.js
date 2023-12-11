import { Component } from '@angular/core';
import { RuntimeViewCanvasItemComponent } from '../runtime-view-canvas/components/canvas-item/runtime-view-canvas-item.component';
import { RX_VIEW_DEFINITION, ViewLayoutRole } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "../runtime-view-canvas/components/canvas-item/runtime-view-canvas-item.component";
import * as i2 from "../runtime-view-canvas/components/canvas-item-container/runtime-view-canvas-item-container.component";
import * as i3 from "@angular/common";
export class RuntimeViewRootComponent {
    constructor(runtimeCanvasItemComponent) {
        this.runtimeCanvasItemComponent = runtimeCanvasItemComponent;
        this.defaultOutletName = RX_VIEW_DEFINITION.defaultOutletName;
        this.layoutRole = ViewLayoutRole;
    }
    isHidden(outlet) {
        return outlet.name === ViewLayoutRole.Header && outlet.columns[0].children.length === 0;
    }
}
RuntimeViewRootComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewRootComponent, deps: [{ token: i1.RuntimeViewCanvasItemComponent }], target: i0.ɵɵFactoryTarget.Component });
RuntimeViewRootComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RuntimeViewRootComponent, selector: "rx-runtime-view-root", ngImport: i0, template: "<rx-runtime-view-canvas-item-container\n  *ngFor=\"let outlet of runtimeCanvasItemComponent.layout.outlets\"\n  [hidden]=\"isHidden(outlet)\"\n  [columns]=\"outlet.columns\"\n  [outlet]=\"outlet\"\n  [ngClass]=\"{\n    'content-outlet': outlet.name === defaultOutletName,\n    'outlet-padding': [layoutRole.Header, layoutRole.Footer, defaultOutletName].includes(outlet.name)\n  }\"\n></rx-runtime-view-canvas-item-container>\n", styles: [":host{display:flex;flex-direction:column;height:100%;overflow:hidden}rx-runtime-view-canvas-item-container{padding:0 1rem}.outlet-padding{padding:1rem}.content-outlet{flex:1;overflow-y:auto;overflow-x:hidden}\n"], components: [{ type: i2.RuntimeViewCanvasItemContainerComponent, selector: "rx-runtime-view-canvas-item-container", inputs: ["columns", "outlet"] }], directives: [{ type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewRootComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-runtime-view-root',
                    templateUrl: './runtime-component.html',
                    styleUrls: ['./runtime-component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.RuntimeViewCanvasItemComponent }]; } });
//# sourceMappingURL=runtime-view-root.component.js.map