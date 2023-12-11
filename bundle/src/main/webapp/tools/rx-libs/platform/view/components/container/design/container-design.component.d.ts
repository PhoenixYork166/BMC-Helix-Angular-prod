import { AfterViewInit, OnDestroy } from '@angular/core';
import { CanvasOutletComponent } from '@helix/platform/view/designer';
import { ContainerCanvasItemComponent } from './container-canvas-item.component';
import { ContainerDesignModel } from './container-design.model';
import { ReplaySubject } from 'rxjs';
import * as i0 from "@angular/core";
export declare class ContainerDesignComponent implements OnDestroy, AfterViewInit {
    model: ContainerDesignModel;
    canvasOutletComponent: CanvasOutletComponent;
    containerCanvasItemComponent: typeof ContainerCanvasItemComponent;
    protected destroyed$: ReplaySubject<boolean>;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ContainerDesignComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ContainerDesignComponent, "rx-container-design", never, { "model": "model"; }, {}, never, never>;
}
