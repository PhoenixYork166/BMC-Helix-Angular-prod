import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RuntimeLayoutItem } from '../../../layout/runtime-layout-item.class';
import { RuntimeViewCanvasService } from './runtime-view-canvas.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./runtime-view-canvas.service";
import * as i2 from "../components/canvas-item/runtime-view-canvas-item.component";
import * as i3 from "@angular/common";
export class RuntimeViewCanvasComponent {
    constructor(runtimeViewCanvasService) {
        this.runtimeViewCanvasService = runtimeViewCanvasService;
        this.componentPropertyChanged = new EventEmitter();
        this.destroy$ = new Subject();
    }
    ngOnInit() {
        this.runtimeViewCanvasService.componentPropertyChanged$
            .pipe(takeUntil(this.destroy$))
            .subscribe((event) => {
            this.componentPropertyChanged.emit(event);
        });
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
RuntimeViewCanvasComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewCanvasComponent, deps: [{ token: i1.RuntimeViewCanvasService }], target: i0.ɵɵFactoryTarget.Component });
RuntimeViewCanvasComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RuntimeViewCanvasComponent, selector: "rx-runtime-view-canvas", inputs: { layout: "layout" }, outputs: { componentPropertyChanged: "componentPropertyChanged" }, providers: [RuntimeViewCanvasService], ngImport: i0, template: "<rx-runtime-view-canvas-item class=\"root-item\" *ngIf=\"layout\" [layout]=\"layout\"></rx-runtime-view-canvas-item>\n", components: [{ type: i2.RuntimeViewCanvasItemComponent, selector: "rx-runtime-view-canvas-item", inputs: ["layout"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewCanvasComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-runtime-view-canvas',
                    templateUrl: './runtime-view-canvas.component.html',
                    providers: [RuntimeViewCanvasService]
                }]
        }], ctorParameters: function () { return [{ type: i1.RuntimeViewCanvasService }]; }, propDecorators: { layout: [{
                type: Input
            }], componentPropertyChanged: [{
                type: Output
            }] } });
//# sourceMappingURL=runtime-view-canvas.component.js.map