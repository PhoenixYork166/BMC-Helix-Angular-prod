import { ComponentFactoryResolver, ComponentRef, Injector, OnDestroy, ViewContainerRef } from '@angular/core';
import { RuntimeViewCanvasService } from '../../component/runtime-view-canvas.service';
import { RuntimeLayoutItem } from '../../../../layout/runtime-layout-item.class';
import { IViewComponent } from '../../../../interfaces/view-component.interface';
import { IChildColumn } from '../../interfaces/child-column.interface';
import { ComponentFactory } from '@angular/core';
import * as i0 from "@angular/core";
export declare class RuntimeViewCanvasItemService implements OnDestroy {
    private injector;
    private componentFactoryResolver;
    private runtimeViewCanvasService;
    container: ViewContainerRef;
    layout: RuntimeLayoutItem;
    componentRef: ComponentRef<any>;
    componentInstance: IViewComponent;
    hasMargin: boolean;
    hasAutoFill: boolean;
    hasAutoScroll: boolean;
    isHidden: boolean;
    private destroyed$;
    constructor(injector: Injector, componentFactoryResolver: ComponentFactoryResolver, runtimeViewCanvasService: RuntimeViewCanvasService);
    ngOnDestroy(): void;
    registerOutlet(outletName: string, outletViewContainerRef: ViewContainerRef, containerComponent?: ComponentFactory<any>): void;
    getChildren(outletName: string): IChildColumn[];
    renderViewComponent(): void;
    private renderContainerComponent;
    static ɵfac: i0.ɵɵFactoryDeclaration<RuntimeViewCanvasItemService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RuntimeViewCanvasItemService>;
}
