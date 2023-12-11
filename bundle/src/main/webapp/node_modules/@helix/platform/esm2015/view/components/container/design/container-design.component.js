import { Component, Input, ViewChild } from '@angular/core';
import { CanvasOutletComponent } from '@helix/platform/view/designer';
import { ContainerCanvasItemComponent } from './container-canvas-item.component';
import { ContainerDesignModel } from './container-design.model';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/designer";
import * as i2 from "@angular/common";
export class ContainerDesignComponent {
    constructor() {
        this.containerCanvasItemComponent = ContainerCanvasItemComponent;
        this.destroyed$ = new ReplaySubject(1);
    }
    ngAfterViewInit() {
        this.canvasOutletComponent.containerComponentInstance.columnResize
            .pipe(takeUntil(this.destroyed$))
            .subscribe((columnSizes) => {
            this.model.setContainerLayout(columnSizes);
        });
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
ContainerDesignComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ContainerDesignComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ContainerDesignComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ContainerDesignComponent, selector: "rx-container-design", inputs: { model: "model" }, viewQueries: [{ propertyName: "canvasOutletComponent", first: true, predicate: CanvasOutletComponent, descendants: true, static: true }], ngImport: i0, template: "<rx-canvas-outlet\n  class=\"border d-block\"\n  [class.has-children]=\"model.hasChildren$ | async\"\n  [containerComponent]=\"containerCanvasItemComponent\"\n></rx-canvas-outlet>\n", styles: [".has-children ::ng-deep>rx-container-canvas-item>as-split>as-split-area{min-height:auto}\n"], components: [{ type: i1.CanvasOutletComponent, selector: "rx-canvas-outlet", inputs: ["name", "skipParentPredicate", "containerComponent", "dropListOrientation", "dropPredicate"], outputs: ["beforeViewComponentDrop"] }], pipes: { "async": i2.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ContainerDesignComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-container-design',
                    templateUrl: './container-design.component.html',
                    styleUrls: ['./container-design.component.scss']
                }]
        }], propDecorators: { model: [{
                type: Input
            }], canvasOutletComponent: [{
                type: ViewChild,
                args: [CanvasOutletComponent, { static: true }]
            }] } });
//# sourceMappingURL=container-design.component.js.map