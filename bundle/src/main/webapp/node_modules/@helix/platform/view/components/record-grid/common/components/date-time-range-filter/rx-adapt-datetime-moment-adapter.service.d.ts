import { AdaptRxDatetimeAdapter, RxDatetimeStruct } from '@bmc-ux/adapt-angular';
import moment from 'moment-es6';
import * as i0 from "@angular/core";
export declare class RxAdaptDatetimeMomentAdapter extends AdaptRxDatetimeAdapter<moment.Moment> {
    /**
     * Converts moment.Moment => RxDatetimeStruct
     */
    fromModel(dateValue: moment.Moment | null): RxDatetimeStruct | null;
    /**
     * Converts RxDatetimeStruct => moment.Moment
     */
    toModel(date: RxDatetimeStruct | null): moment.Moment | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxAdaptDatetimeMomentAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxAdaptDatetimeMomentAdapter>;
}
