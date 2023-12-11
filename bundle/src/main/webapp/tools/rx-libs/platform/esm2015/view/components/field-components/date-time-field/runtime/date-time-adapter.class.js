import { Injectable } from '@angular/core';
import { AdaptRxDatetimeAdapter } from '@bmc-ux/adapt-angular';
import moment from 'moment-es6';
import * as i0 from "@angular/core";
export class DateTimeAdapter extends AdaptRxDatetimeAdapter {
    fromModel(dateString) {
        let adaptedValue = null;
        const date = moment(dateString);
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
    toModel(date) {
        return date
            ? date.parseError
                ? moment.invalid().toString()
                : moment([
                    date.year || 0,
                    date.month || 0,
                    date.date || 0,
                    date.hours || 0,
                    date.minutes || 0,
                    date.seconds || 0
                ]).toISOString()
            : null;
    }
}
DateTimeAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateTimeAdapter, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
DateTimeAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateTimeAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateTimeAdapter, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=date-time-adapter.class.js.map