import { AfterViewInit, ElementRef, EventEmitter, Renderer2 } from '@angular/core';
import { CanvasItemApi, CanvasItemContainerComponent, CanvasOutletHelperService } from '@helix/platform/view/designer';
import { IOutputData } from 'angular-split/lib/interface';
import * as i0 from "@angular/core";
export declare class ContainerCanvasItemComponent extends CanvasItemContainerComponent implements AfterViewInit {
    protected canvasItemApi: CanvasItemApi;
    protected canvasOutletHelperService: CanvasOutletHelperService;
    protected elementRef: ElementRef<HTMLElement>;
    private renderer;
    private splitComponent;
    private readonly maxNumberOfColumns;
    private readonly defaultGutterStep;
    percentSpanSize: number;
    gutterStep: number;
    columnResize: EventEmitter<number[]>;
    constructor(canvasItemApi: CanvasItemApi, canvasOutletHelperService: CanvasOutletHelperService, elementRef: ElementRef<HTMLElement>, renderer: Renderer2);
    onWindowResize(): void;
    ngAfterViewInit(): void;
    onDragEnd(event: IOutputData): void;
    getPercentToSpanSizes(percentSizes: number[]): number[];
    setSpanSizes(spans: number[]): void;
    private getSpanToPercentSizes;
    private setGutterStep;
    static ɵfac: i0.ɵɵFactoryDeclaration<ContainerCanvasItemComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ContainerCanvasItemComponent, "rx-container-canvas-item", never, {}, { "columnResize": "columnResize"; }, never, never>;
}
