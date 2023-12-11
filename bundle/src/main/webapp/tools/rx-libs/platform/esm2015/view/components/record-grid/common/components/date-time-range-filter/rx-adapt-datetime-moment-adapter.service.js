import { Injectable } from '@angular/core';
import { AdaptRxDatetimeAdapter } from '@bmc-ux/adapt-angular';
import moment from 'moment-es6';
import * as i0 from "@angular/core";
// Adapt dropped moment and changed the signature of AdvancedFilterTimeDataType from [moment.Moment, moment.Moment] to [RxDatetimeStruct, RxDatetimeStruct].
// We need to extend the AdaptRxDatetimeAdapter class to implement the missing moment methods that we rely on.
export class RxAdaptDatetimeMomentAdapter extends AdaptRxDatetimeAdapter {
    /**
     * Converts moment.Moment => RxDatetimeStruct
     */
    fromModel(dateValue) {
        let adaptedValue = null;
        const date = moment(dateValue);
        if (date && date.isValid()) {
            adaptedValue = {
                year: date.year(),
                month: date.month(),
                date: date.date(),
                hours: date.hours(),
                minutes: date.minutes(),
                seconds: date.seconds()
            };
        }
        return adaptedValue;
    }
    /**
     * Converts RxDatetimeStruct => moment.Moment
     */
    toModel(date) {
        var _a, _b, _c, _d, _e, _f;
        let adaptedValue = null;
        if (date) {
            const currentDateTime = moment();
            adaptedValue = date.parseError
                ? moment.invalid({
                    invalidFormat: true,
                    parsedDateParts: [date.parseError.query],
                    meridiem: date.parseError.use12HoursTime ? '12' : '24'
                })
                : moment([
                    (_a = date.year) !== null && _a !== void 0 ? _a : currentDateTime.year(),
                    (_b = date.month) !== null && _b !== void 0 ? _b : currentDateTime.month(),
                    (_c = date.date) !== null && _c !== void 0 ? _c : currentDateTime.date(),
                    (_d = date.hours) !== null && _d !== void 0 ? _d : 0,
                    (_e = date.minutes) !== null && _e !== void 0 ? _e : 0,
                    (_f = date.seconds) !== null && _f !== void 0 ? _f : 0
                ]);
        }
        return adaptedValue;
    }
}
RxAdaptDatetimeMomentAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAdaptDatetimeMomentAdapter, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
RxAdaptDatetimeMomentAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAdaptDatetimeMomentAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAdaptDatetimeMomentAdapter, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=rx-adapt-datetime-moment-adapter.service.js.map