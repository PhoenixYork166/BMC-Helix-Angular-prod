import { PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class RxBooleanPipe implements PipeTransform {
    private translateService;
    constructor(translateService: TranslateService);
    transform(value: any, trueValueParam?: string, falseValueParam?: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxBooleanPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<RxBooleanPipe, "rxBoolean">;
}
