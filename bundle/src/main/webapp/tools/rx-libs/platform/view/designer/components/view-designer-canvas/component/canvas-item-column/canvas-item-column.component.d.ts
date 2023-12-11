import { EventEmitter, OnInit } from '@angular/core';
import { IViewComponentDragData } from '../../interfaces/view-designer-canvas.interfaces';
import { IViewDesignerCanvasColumn, IViewDesignerCanvasLayout } from '../../interfaces/view-designer-canvas.interfaces';
import { CdkDrag, CdkDragDrop, CdkDragEnter, CdkDragStart } from '@angular/cdk/drag-drop';
import { ViewDesignerCanvasService } from '../../view-designer-canvas.service';
import { CanvasOutletHelperService } from '../canvas-outlet/canvas-outlet-helper.service';
import { DropListOrientation } from '@angular/cdk/drag-drop';
import * as i0 from "@angular/core";
export declare class CanvasItemColumnComponent implements OnInit {
    private viewDesignerCanvasService;
    private canvasOutletHelperService;
    isReadOnly: boolean;
    colIndex: number;
    column: IViewDesignerCanvasColumn;
    layout: IViewDesignerCanvasLayout;
    dropListDropped: EventEmitter<CdkDragDrop<{
        columnIndex: number;
    }, {
        columnIndex: number;
    }>>;
    dropListEnterPredicateBind: any;
    dropListOrientation: DropListOrientation;
    constructor(viewDesignerCanvasService: ViewDesignerCanvasService, canvasOutletHelperService: CanvasOutletHelperService);
    ngOnInit(): void;
    getViewComponentDragData(layout: IViewDesignerCanvasLayout): IViewComponentDragData;
    onDragEntered(event: CdkDragEnter): void;
    onDragStarted(event: CdkDragStart): void;
    remove(event: Event, layout: IViewDesignerCanvasLayout): void;
    onSelectComponent(event: Event, layout: IViewDesignerCanvasLayout): void;
    trackByFn(index: number, item: IViewDesignerCanvasLayout): string;
    dropListEnterPredicate(event: CdkDrag<IViewComponentDragData>): boolean;
    private enforceDragToSelf;
    static ɵfac: i0.ɵɵFactoryDeclaration<CanvasItemColumnComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CanvasItemColumnComponent, "rx-canvas-item-column", never, { "isReadOnly": "isReadOnly"; "colIndex": "colIndex"; "column": "column"; "layout": "layout"; }, { "dropListDropped": "dropListDropped"; }, never, never>;
}
