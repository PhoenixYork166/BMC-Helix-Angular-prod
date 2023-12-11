import { EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { RuntimeLayoutItem } from '../../../layout/runtime-layout-item.class';
import { RuntimeViewCanvasService } from './runtime-view-canvas.service';
import { ICanvasComponentPropertyChanged } from '../interfaces/canvas-component-property-changed.interface';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export declare class RuntimeViewCanvasComponent implements OnInit, OnDestroy {
    private runtimeViewCanvasService;
    layout: RuntimeLayoutItem;
    componentPropertyChanged: EventEmitter<ICanvasComponentPropertyChanged>;
    destroy$: Subject<boolean>;
    constructor(runtimeViewCanvasService: RuntimeViewCanvasService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RuntimeViewCanvasComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RuntimeViewCanvasComponent, "rx-runtime-view-canvas", never, { "layout": "layout"; }, { "componentPropertyChanged": "componentPropertyChanged"; }, never, never>;
}
