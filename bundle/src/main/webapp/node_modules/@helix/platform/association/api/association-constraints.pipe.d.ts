import { PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class RxAssociationConstraintsPipe implements PipeTransform {
    private translateService;
    constructor(translateService: TranslateService);
    transform(value: boolean): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxAssociationConstraintsPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<RxAssociationConstraintsPipe, "rxAssociationConstraintsPipe">;
}
