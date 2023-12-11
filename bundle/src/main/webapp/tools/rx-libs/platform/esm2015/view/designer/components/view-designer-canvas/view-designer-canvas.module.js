import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CanvasItemContainerComponent } from './component/canvas-item-container/canvas-item-container.component';
import { CanvasItemComponent } from './component/canvas-item/canvas-item.component';
import { CanvasOutletComponent } from './component/canvas-outlet/canvas-outlet.component';
import { ViewDesignerCanvasComponent } from './view-designer-canvas.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CanvasItemColumnComponent } from './component/canvas-item-column/canvas-item-column.component';
import * as i0 from "@angular/core";
export class ViewDesignerCanvasModule {
}
ViewDesignerCanvasModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDesignerCanvasModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ViewDesignerCanvasModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDesignerCanvasModule, declarations: [ViewDesignerCanvasComponent,
        CanvasItemComponent,
        CanvasItemContainerComponent,
        CanvasOutletComponent,
        CanvasItemColumnComponent], imports: [CommonModule, DragDropModule], exports: [ViewDesignerCanvasComponent, CanvasOutletComponent, CanvasItemComponent, CanvasItemColumnComponent] });
ViewDesignerCanvasModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDesignerCanvasModule, imports: [[CommonModule, DragDropModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDesignerCanvasModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, DragDropModule],
                    exports: [ViewDesignerCanvasComponent, CanvasOutletComponent, CanvasItemComponent, CanvasItemColumnComponent],
                    declarations: [
                        ViewDesignerCanvasComponent,
                        CanvasItemComponent,
                        CanvasItemContainerComponent,
                        CanvasOutletComponent,
                        CanvasItemColumnComponent
                    ],
                    entryComponents: [CanvasItemComponent, CanvasItemContainerComponent, CanvasOutletComponent, CanvasItemColumnComponent]
                }]
        }] });
//# sourceMappingURL=view-designer-canvas.module.js.map