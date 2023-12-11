import { Component, Input } from '@angular/core';
import { ContainerDesignComponent } from '../../../container/design/container-design.component';
import { TabPanelDesignComponent } from '../tab-panel-design.component';
import { takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../tab-panel-design.component";
import * as i2 from "@helix/platform/view/designer";
export class TabContainerDesignComponent extends ContainerDesignComponent {
    constructor(tabPanelDesignComponent) {
        super();
        this.tabPanelDesignComponent = tabPanelDesignComponent;
    }
    ngOnInit() {
        this.tabPanelDesignComponent.model.selectedTabGuid$
            .pipe(takeUntil(this.destroyed$))
            .subscribe(this.model.selectedTabGuid$);
    }
}
TabContainerDesignComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TabContainerDesignComponent, deps: [{ token: i1.TabPanelDesignComponent }], target: i0.ɵɵFactoryTarget.Component });
TabContainerDesignComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: TabContainerDesignComponent, selector: "rx-tab-container-design", inputs: { model: "model" }, usesInheritance: true, ngImport: i0, template: "<rx-canvas-outlet [skipParentPredicate]=\"true\" [containerComponent]=\"containerCanvasItemComponent\"></rx-canvas-outlet>\n", components: [{ type: i2.CanvasOutletComponent, selector: "rx-canvas-outlet", inputs: ["name", "skipParentPredicate", "containerComponent", "dropListOrientation", "dropPredicate"], outputs: ["beforeViewComponentDrop"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TabContainerDesignComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-tab-container-design',
                    templateUrl: './tab-container-design.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.TabPanelDesignComponent }]; }, propDecorators: { model: [{
                type: Input
            }] } });
//# sourceMappingURL=tab-container-design.component.js.map