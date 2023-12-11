import { AdaptRxDatetimeAdapter, RxDatetimeStruct } from '@bmc-ux/adapt-angular';
import * as i0 from "@angular/core";
export declare class TimeAdapter extends AdaptRxDatetimeAdapter<string> {
    private storeTimeFormat;
    fromModel(dateString: string): RxDatetimeStruct;
    toModel(date: RxDatetimeStruct): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<TimeAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TimeAdapter>;
}
