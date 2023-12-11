import { PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class RxCustomizationStatusPipe implements PipeTransform {
    private translateService;
    constructor(translateService: TranslateService);
    transform(value: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxCustomizationStatusPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<RxCustomizationStatusPipe, "rxCustomizationStatus">;
}
