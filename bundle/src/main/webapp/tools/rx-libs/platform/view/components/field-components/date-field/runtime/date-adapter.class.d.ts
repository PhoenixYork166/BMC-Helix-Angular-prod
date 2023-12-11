import { AdaptRxDatetimeAdapter, RxDatetimeStruct } from '@bmc-ux/adapt-angular';
import * as i0 from "@angular/core";
export declare class DateAdapter extends AdaptRxDatetimeAdapter<string> {
    private storeDateFormat;
    fromModel(dateString: string): RxDatetimeStruct;
    toModel(date: RxDatetimeStruct): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DateAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DateAdapter>;
}
