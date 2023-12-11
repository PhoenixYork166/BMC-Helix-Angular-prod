import { Injectable } from '@angular/core';
import { AdaptRxDatetimeAdapter } from '@bmc-ux/adapt-angular';
import moment from 'moment-es6';
import * as i0 from "@angular/core";
export class DateAdapter extends AdaptRxDatetimeAdapter {
    constructor() {
        super(...arguments);
        this.storeDateFormat = 'YYYY-MM-DD'; // AR server only accepts this format for Date.
    }
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
                : moment([date.year || 0, date.month || 0, date.date || 0]).format(this.storeDateFormat)
            : null;
    }
}
DateAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateAdapter, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
DateAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateAdapter, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=date-adapter.class.js.map