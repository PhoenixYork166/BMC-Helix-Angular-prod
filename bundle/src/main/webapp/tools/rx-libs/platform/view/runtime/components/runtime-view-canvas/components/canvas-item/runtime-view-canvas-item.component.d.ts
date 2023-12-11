import { OnChanges, SimpleChanges, ViewContainerRef } from '@angular/core';
import { RuntimeLayoutItem } from '../../../../layout/runtime-layout-item.class';
import { IChildColumn } from '../../interfaces/child-column.interface';
import { RuntimeViewCanvasItemService } from './runtime-view-canvas-item.service';
import * as i0 from "@angular/core";
export declare class RuntimeViewCanvasItemComponent implements OnChanges {
    private runtimeViewCanvasItemService;
    layout: RuntimeLayoutItem;
    container: ViewContainerRef;
    get hasMargin(): boolean;
    get hasAutoFill(): boolean;
    get hasAutoScroll(): boolean;
    constructor(runtimeViewCanvasItemService: RuntimeViewCanvasItemService);
    ngOnChanges(changes: SimpleChanges): void;
    registerOutlet(outletName: string, outletViewContainerRef: ViewContainerRef): void;
    getChildren(outletName: string): IChildColumn[];
    static ɵfac: i0.ɵɵFactoryDeclaration<RuntimeViewCanvasItemComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RuntimeViewCanvasItemComponent, "rx-runtime-view-canvas-item", never, { "layout": "layout"; }, {}, never, never>;
}
