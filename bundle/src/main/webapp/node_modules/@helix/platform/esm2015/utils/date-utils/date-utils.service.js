import { formatDate } from '@angular/common';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import * as i0 from "@angular/core";
export class RxDateUtilsService {
    constructor(locale) {
        this.locale = locale;
    }
    formatDate(date, format, locale) {
        return formatDate(date, format, locale !== null && locale !== void 0 ? locale : this.locale);
    }
    isTwelveHourClock() {
        const dateString = new Date().toLocaleString();
        return /am|pm/i.test(dateString);
    }
}
RxDateUtilsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDateUtilsService, deps: [{ token: LOCALE_ID }], target: i0.ɵɵFactoryTarget.Injectable });
RxDateUtilsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDateUtilsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDateUtilsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [LOCALE_ID]
                }] }]; } });
//# sourceMappingURL=date-utils.service.js.map