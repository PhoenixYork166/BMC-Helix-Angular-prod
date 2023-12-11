import { Injectable } from '@angular/core';
import { AdaptRxDatetimeAdapter } from '@bmc-ux/adapt-angular';
import moment from 'moment-es6';
import * as i0 from "@angular/core";
export class TimeAdapter extends AdaptRxDatetimeAdapter {
    constructor() {
        super(...arguments);
        this.storeTimeFormat = 'HH:mm:ss';
    }
    fromModel(dateString) {
        let adaptedValue = null;
        const date = moment(dateString, 'LTS');
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
                : moment({
                    hour: date.hours || 0,
                    minute: date.minutes || 0,
                    seconds: date.seconds || 0
                }).format(this.storeTimeFormat)
            : null;
    }
}
TimeAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TimeAdapter, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
TimeAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TimeAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TimeAdapter, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=time-adapter.class.js.map