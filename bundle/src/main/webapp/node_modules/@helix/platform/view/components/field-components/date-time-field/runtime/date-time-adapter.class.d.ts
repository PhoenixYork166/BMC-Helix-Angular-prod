import { AdaptRxDatetimeAdapter, RxDatetimeStruct } from '@bmc-ux/adapt-angular';
import * as i0 from "@angular/core";
export declare class DateTimeAdapter extends AdaptRxDatetimeAdapter<string> {
    fromModel(dateString: string): RxDatetimeStruct;
    toModel(date: RxDatetimeStruct): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DateTimeAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DateTimeAdapter>;
}
