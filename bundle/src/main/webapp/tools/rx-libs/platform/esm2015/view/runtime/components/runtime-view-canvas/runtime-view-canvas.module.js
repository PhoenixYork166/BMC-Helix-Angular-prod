import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RuntimeViewCanvasComponent } from './component/runtime-view-canvas.component';
import { RuntimeViewCanvasItemContainerComponent } from './components/canvas-item-container/runtime-view-canvas-item-container.component';
import { RuntimeViewCanvasItemComponent } from './components/canvas-item/runtime-view-canvas-item.component';
import { RuntimeViewCanvasOutletComponent } from './components/canvas-outlet/runtime-view-canvas-outlet.component';
import { FormsModule } from '@angular/forms';
import * as i0 from "@angular/core";
export class RuntimeViewCanvasModule {
}
RuntimeViewCanvasModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewCanvasModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RuntimeViewCanvasModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewCanvasModule, declarations: [RuntimeViewCanvasComponent,
        RuntimeViewCanvasItemComponent,
        RuntimeViewCanvasItemContainerComponent,
        RuntimeViewCanvasOutletComponent], imports: [CommonModule, FormsModule], exports: [RuntimeViewCanvasOutletComponent,
        RuntimeViewCanvasComponent,
        RuntimeViewCanvasItemComponent,
        RuntimeViewCanvasItemContainerComponent] });
RuntimeViewCanvasModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewCanvasModule, imports: [[CommonModule, FormsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewCanvasModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule],
                    declarations: [
                        RuntimeViewCanvasComponent,
                        RuntimeViewCanvasItemComponent,
                        RuntimeViewCanvasItemContainerComponent,
                        RuntimeViewCanvasOutletComponent
                    ],
                    exports: [
                        RuntimeViewCanvasOutletComponent,
                        RuntimeViewCanvasComponent,
                        RuntimeViewCanvasItemComponent,
                        RuntimeViewCanvasItemContainerComponent
                    ],
                    entryComponents: [RuntimeViewCanvasItemContainerComponent]
                }]
        }] });
//# sourceMappingURL=runtime-view-canvas.module.js.map