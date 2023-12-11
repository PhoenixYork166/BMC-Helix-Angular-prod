import { PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class RxAssociationCardinalityPipe implements PipeTransform {
    private translateService;
    constructor(translateService: TranslateService);
    transform(value: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxAssociationCardinalityPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<RxAssociationCardinalityPipe, "rxAssociationCardinalityPipe">;
}
