import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class RxBladeComponent {
    isBladeCollapsed: boolean;
    title: string;
    set isExpanded(value: boolean);
    get isExpanded(): boolean;
    dockTo: 'left' | 'right';
    toggle: EventEmitter<any>;
    private isBladeExpanded;
    toggleBlade(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxBladeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxBladeComponent, "rx-blade", never, { "title": "title"; "isExpanded": "isExpanded"; "dockTo": "dockTo"; }, { "toggle": "toggle"; }, never, ["*"]>;
}
