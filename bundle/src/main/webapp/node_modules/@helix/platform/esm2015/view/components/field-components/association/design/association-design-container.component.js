import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/designer";
import * as i2 from "@angular/common";
export class RxAssociationDesignContainerComponent {
}
RxAssociationDesignContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationDesignContainerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
RxAssociationDesignContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxAssociationDesignContainerComponent, selector: "rx-association-design-item-container", inputs: { outlet: "outlet", isReadOnly: "isReadOnly", layout: "layout" }, ngImport: i0, template: "<rx-canvas-item\n  *ngFor=\"let layout of outlet.columns[0].children\"\n  [interactive]=\"false\"\n  [layout]=\"layout\"\n  [isReadOnly]=\"isReadOnly\"\n  class=\"mr-1\"\n>\n</rx-canvas-item>\n", styles: [":host{display:flex}\n"], components: [{ type: i1.CanvasItemComponent, selector: "rx-canvas-item", inputs: ["layout", "interactive", "isReadOnly"] }], directives: [{ type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationDesignContainerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-association-design-item-container',
                    templateUrl: './association-design-container.component.html',
                    styleUrls: ['./association-design-container.component.scss']
                }]
        }], propDecorators: { outlet: [{
                type: Input
            }], isReadOnly: [{
                type: Input
            }], layout: [{
                type: Input
            }] } });
//# sourceMappingURL=association-design-container.component.js.map