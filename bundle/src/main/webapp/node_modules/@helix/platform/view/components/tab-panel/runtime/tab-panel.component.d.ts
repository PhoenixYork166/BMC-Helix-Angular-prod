import { OnInit } from '@angular/core';
import { BaseViewComponent, IViewComponentSetProperty, RuntimeViewCanvasItemComponent } from '@helix/platform/view/runtime';
import { ITabPanelApi, ITabPanelChildComponentData, ITabPanelState } from './tab-panel.types';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class RxTabPanelComponent extends BaseViewComponent implements OnInit, IViewComponentSetProperty {
    private runtimeCanvasItemComponent;
    childLayouts: ITabPanelChildComponentData[];
    state: ITabPanelState;
    api: ITabPanelApi;
    constructor(runtimeCanvasItemComponent: RuntimeViewCanvasItemComponent);
    ngOnInit(): void;
    setProperty(propertyPath: string, propertyValue: any): void | Observable<never>;
    trackByForTabs(index: number, item: ITabPanelChildComponentData): string;
    canRenderContentForTab(tab: ITabPanelChildComponentData): boolean;
    private getAllTabsData;
    isHiddenTab(tab: ITabPanelChildComponentData): boolean;
    getActiveTabIndexForAdaptTabset(): number;
    onActiveTabChanged(adaptTabsetIndex: number): void;
    private setActiveTabIndex;
    private activateTab;
    private ensureActiveTabIsSet;
    private trySetFirstVisibleTab;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxTabPanelComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxTabPanelComponent, "rx-tab-panel", never, {}, {}, never, never>;
}
