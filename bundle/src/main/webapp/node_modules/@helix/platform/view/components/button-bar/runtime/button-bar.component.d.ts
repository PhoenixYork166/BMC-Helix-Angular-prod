import { AfterViewInit, ChangeDetectorRef, ElementRef, NgZone, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { BaseViewComponent, IViewComponent, RuntimeViewCanvasItemComponent } from '@helix/platform/view/runtime';
import { Observable } from 'rxjs';
import { IButtonBarChildComponentData, IButtonBarConfig } from './button-bar.types';
import { RxButtonBarService } from '../button-bar.service';
import * as i0 from "@angular/core";
export declare class ButtonBarComponent extends BaseViewComponent implements OnInit, OnDestroy, IViewComponent, AfterViewInit {
    private elementRef;
    private runtimeCanvasItemComponent;
    private changeDetector;
    private ngZone;
    private rxButtonBarService;
    private renderer;
    private buttonItemsQueryList;
    private dropdownToggleButton;
    api: {
        setProperty: any;
    };
    config: Observable<IButtonBarConfig>;
    alignClass: string;
    childLayouts: IButtonBarChildComponentData[];
    isDropdownVisible: boolean;
    private resizeSensor;
    private resize$;
    private onResizeThrottled;
    constructor(elementRef: ElementRef<HTMLElement>, runtimeCanvasItemComponent: RuntimeViewCanvasItemComponent, changeDetector: ChangeDetectorRef, ngZone: NgZone, rxButtonBarService: RxButtonBarService, renderer: Renderer2);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    onResize(containerWidth: number): void;
    trackByFn(index: number, item: IButtonBarChildComponentData): string;
    setProperty(propertyPath: string, propertyValue: any): void | Observable<never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ButtonBarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ButtonBarComponent, "rx-button-bar", never, {}, {}, never, never>;
}
