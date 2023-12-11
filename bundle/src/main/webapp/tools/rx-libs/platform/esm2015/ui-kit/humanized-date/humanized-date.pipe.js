import { DatePipe } from '@angular/common';
import { Pipe } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment-es6';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@ngx-translate/core";
export class RxHumanizedDatePipe {
    constructor(datePipe, translateService) {
        this.datePipe = datePipe;
        this.translateService = translateService;
    }
    transform(value) {
        const now = moment();
        const date = moment(value);
        if (date.isSame(now, 'day')) {
            return this.translateService.instant('com.bmc.dsm.chatbot.common.today.label');
        }
        else if (this.isYesterday(date)) {
            return this.translateService.instant('com.bmc.dsm.chatbot.common.yesterday.label');
        }
        else {
            return this.datePipe.transform(value, 'fullDate');
        }
    }
    isYesterday(value) {
        const yesterday = moment().subtract(1, 'day').startOf('day');
        return value.isSame(yesterday, 'day');
    }
}
RxHumanizedDatePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxHumanizedDatePipe, deps: [{ token: i1.DatePipe }, { token: i2.TranslateService }], target: i0.ɵɵFactoryTarget.Pipe });
RxHumanizedDatePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxHumanizedDatePipe, name: "rxHumanizedDatePipe" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxHumanizedDatePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'rxHumanizedDatePipe'
                }]
        }], ctorParameters: function () { return [{ type: i1.DatePipe }, { type: i2.TranslateService }]; } });
//# sourceMappingURL=humanized-date.pipe.js.map