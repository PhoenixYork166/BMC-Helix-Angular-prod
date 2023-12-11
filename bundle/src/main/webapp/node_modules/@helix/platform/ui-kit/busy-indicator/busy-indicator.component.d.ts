import { OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { BusyConfig } from '@bmc-ux/adapt-angular';
import * as i0 from "@angular/core";
export declare class RxBusyIndicatorComponent implements OnInit, OnChanges, OnDestroy {
    options?: BusyConfig;
    private defaultSubscription;
    private defaultOptions;
    config: BusyConfig;
    constructor();
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private updateConfig;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxBusyIndicatorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxBusyIndicatorComponent, "rx-busy-indicator", never, { "options": "options"; }, {}, never, never>;
}
