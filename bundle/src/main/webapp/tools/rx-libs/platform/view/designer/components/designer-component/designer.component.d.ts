import { CanvasItemComponent } from '../view-designer-canvas/component/canvas-item/canvas-item.component';
import { IViewDesignerCanvasOutlet } from '../view-designer-canvas/interfaces/view-designer-canvas.interfaces';
import { ViewDesignerCanvasComponent } from '../view-designer-canvas/view-designer-canvas.component';
import * as i0 from "@angular/core";
export declare class DesignerComponent {
    canvasItemComponent: CanvasItemComponent;
    viewDesignerCanvasComponent: ViewDesignerCanvasComponent;
    defaultOutletName: string;
    constructor(canvasItemComponent: CanvasItemComponent, viewDesignerCanvasComponent: ViewDesignerCanvasComponent);
    trackByFn(index: number, item: IViewDesignerCanvasOutlet): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DesignerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DesignerComponent, "rx-designer", never, {}, {}, never, never>;
}
