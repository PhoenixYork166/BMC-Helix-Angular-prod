import { IFieldDefinition } from '@helix/platform/record/api';
import * as i0 from "@angular/core";
export declare class RxDefaultRecordEditorInputType {
    resourceTypeFieldTypeMap: {};
    constructor();
    getFieldTypeByFieldDefinition(fieldDefinition: IFieldDefinition): string;
    private initResourceTypeFieldTypeMap;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxDefaultRecordEditorInputType, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxDefaultRecordEditorInputType>;
}
