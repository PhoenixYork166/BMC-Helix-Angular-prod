import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
export declare class RxAssociatedRecordFieldNamePipe implements PipeTransform {
    transform(value: string, associatedRecordFieldNames: {
        [key: string]: string;
    }): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxAssociatedRecordFieldNamePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<RxAssociatedRecordFieldNamePipe, "rxAssociatedRecordFieldNamePipe">;
}
