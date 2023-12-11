import { DatePipe } from '@angular/common';
import { PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class RxHumanizedDatePipe implements PipeTransform {
    private datePipe;
    private translateService;
    constructor(datePipe: DatePipe, translateService: TranslateService);
    transform(value: Date): any;
    private isYesterday;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxHumanizedDatePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<RxHumanizedDatePipe, "rxHumanizedDatePipe">;
}
