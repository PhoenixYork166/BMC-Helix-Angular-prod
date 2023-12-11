import { OnInit, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { RuntimeViewCanvasItemService } from '../canvas-item/runtime-view-canvas-item.service';
import * as i0 from "@angular/core";
export declare class RuntimeViewCanvasOutletComponent implements OnInit {
    private runtimeViewCanvasItemService;
    private componentFactoryResolver;
    name: string;
    container: ViewContainerRef;
    constructor(runtimeViewCanvasItemService: RuntimeViewCanvasItemService, componentFactoryResolver: ComponentFactoryResolver);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RuntimeViewCanvasOutletComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RuntimeViewCanvasOutletComponent, "rx-runtime-view-canvas-outlet", never, { "name": "name"; }, {}, never, never>;
}
