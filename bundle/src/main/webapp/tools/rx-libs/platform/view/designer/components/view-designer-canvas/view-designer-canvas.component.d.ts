import { EventEmitter, OnInit } from '@angular/core';
import { DropComponentData } from './drop-component-data.class';
import { IViewComponentDropData, IViewDesignerCanvasLayout } from './interfaces/view-designer-canvas.interfaces';
import { ViewDesignerCanvasService } from './view-designer-canvas.service';
import * as i0 from "@angular/core";
export declare class ViewDesignerCanvasComponent implements OnInit {
    protected viewDesignerCanvasService: ViewDesignerCanvasService;
    layout: IViewDesignerCanvasLayout;
    isReadOnly: boolean;
    componentSelect: EventEmitter<any>;
    componentDrop: EventEmitter<DropComponentData>;
    componentRemove: EventEmitter<string>;
    beforeComponentDropInRoot: EventEmitter<IViewComponentDropData>;
    constructor(viewDesignerCanvasService: ViewDesignerCanvasService);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ViewDesignerCanvasComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ViewDesignerCanvasComponent, "rx-view-designer-canvas", never, { "layout": "layout"; "isReadOnly": "isReadOnly"; }, { "componentSelect": "componentSelect"; "componentDrop": "componentDrop"; "componentRemove": "componentRemove"; "beforeComponentDropInRoot": "beforeComponentDropInRoot"; }, never, never>;
}
