import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import moment from 'moment-es6';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class RxApprovalConsoleHelperService {
    constructor(datePipe) {
        this.datePipe = datePipe;
    }
    formatValue(value) {
        const timeFormat = 'h:mm:ss A';
        const dateFormat = 'M/D/YYYY';
        if (!/^\d+$/.test(value) && moment(value, [`${dateFormat} ${timeFormat}`, moment.ISO_8601], true).isValid()) {
            value = this.datePipe.transform(new Date(value), 'medium');
        }
        else if (moment(value, dateFormat, true).isValid()) {
            value = this.datePipe.transform(new Date(value), 'mediumDate');
        }
        else if (moment(value, timeFormat, true).isValid()) {
            value = moment(value, timeFormat).format('HH:mm A');
        }
        return value;
    }
}
RxApprovalConsoleHelperService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApprovalConsoleHelperService, deps: [{ token: i1.DatePipe }], target: i0.ɵɵFactoryTarget.Injectable });
RxApprovalConsoleHelperService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApprovalConsoleHelperService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApprovalConsoleHelperService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.DatePipe }]; } });
//# sourceMappingURL=approval-console-helper.service.js.map