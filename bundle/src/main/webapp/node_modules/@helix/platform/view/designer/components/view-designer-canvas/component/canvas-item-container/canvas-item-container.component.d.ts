import { IViewDesignerCanvasColumn, IViewDesignerCanvasLayout, IViewDesignerCanvasOutlet } from '../../interfaces/view-designer-canvas.interfaces';
import { CanvasItemApi } from '../canvas-item/canvas-item-api.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { CanvasOutletHelperService } from '../canvas-outlet/canvas-outlet-helper.service';
import * as i0 from "@angular/core";
export declare class CanvasItemContainerComponent {
    protected canvasItemApi: CanvasItemApi;
    protected canvasOutletHelperService: CanvasOutletHelperService;
    outlet: IViewDesignerCanvasOutlet;
    isReadOnly: boolean;
    layout: IViewDesignerCanvasLayout;
    constructor(canvasItemApi: CanvasItemApi, canvasOutletHelperService: CanvasOutletHelperService);
    trackByColFn(index: number, item: IViewDesignerCanvasColumn): string;
    onDropListDropped(event: CdkDragDrop<{
        columnIndex: number;
    }>): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CanvasItemContainerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CanvasItemContainerComponent, "rx-canvas-item-container", never, { "outlet": "outlet"; "isReadOnly": "isReadOnly"; "layout": "layout"; }, {}, never, never>;
}
