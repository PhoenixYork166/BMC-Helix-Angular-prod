import { ComponentFactoryResolver, EventEmitter, OnInit, OnDestroy, Type, ViewContainerRef } from '@angular/core';
import { DropListOrientation } from '@angular/cdk/drag-drop';
import { IViewDesignerCanvasItemApi } from '../../interfaces/view-designer-canvas-item-api.interface';
import { IViewComponentDropData, IViewComponentDropPredicateData } from '../../interfaces/view-designer-canvas.interfaces';
import { CanvasOutletHelperService } from './canvas-outlet-helper.service';
import * as i0 from "@angular/core";
export declare class CanvasOutletComponent implements OnInit, OnDestroy {
    private canvasItemApi;
    private parentOutletComponent;
    private canvasOutletHelperService;
    private componentFactoryResolver;
    containerComponentInstance: any;
    private destroyed$;
    name: string;
    skipParentPredicate: boolean;
    containerComponent: Type<any>;
    dropListOrientation: DropListOrientation;
    container: ViewContainerRef;
    beforeViewComponentDrop: EventEmitter<IViewComponentDropData>;
    dropPredicate: (data: IViewComponentDropPredicateData) => boolean;
    constructor(canvasItemApi: IViewDesignerCanvasItemApi, parentOutletComponent: CanvasOutletComponent, canvasOutletHelperService: CanvasOutletHelperService, componentFactoryResolver: ComponentFactoryResolver);
    ngOnDestroy(): void;
    ngOnInit(): void;
    canBeDropped(data: IViewComponentDropPredicateData): boolean;
    componentDropPredicate(data: IViewComponentDropPredicateData, skipPredicate?: boolean): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<CanvasOutletComponent, [null, { optional: true; skipSelf: true; }, null, null]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CanvasOutletComponent, "rx-canvas-outlet", never, { "name": "name"; "skipParentPredicate": "skipParentPredicate"; "containerComponent": "containerComponent"; "dropListOrientation": "dropListOrientation"; "dropPredicate": "dropPredicate"; }, { "beforeViewComponentDrop": "beforeViewComponentDrop"; }, never, never>;
}
