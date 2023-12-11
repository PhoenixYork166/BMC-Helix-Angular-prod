import { ElementRef, OnInit, Renderer2 } from '@angular/core';
import { BaseViewComponent, IViewComponentSetProperty } from '@helix/platform/view/runtime';
import { IContainerApi, IContainerConfig } from './container.types';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class ContainerComponent extends BaseViewComponent implements OnInit, IViewComponentSetProperty {
    private elementRef;
    private renderer;
    state: IContainerConfig;
    api: IContainerApi;
    constructor(elementRef: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
    setProperty(propertyPath: string, propertyValue: any): void | Observable<never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ContainerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ContainerComponent, "rx-container", never, {}, {}, never, never>;
}
