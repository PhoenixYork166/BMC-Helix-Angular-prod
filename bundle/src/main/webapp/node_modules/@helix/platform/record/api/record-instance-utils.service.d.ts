import { IPlainObject, RxLogService } from '@helix/platform/shared/api';
import { Observable } from 'rxjs';
import { IFieldInstance } from './field-instance.interface';
import { RxRecordInstanceDataPageService } from './record-instance-data-page.service';
import * as i0 from "@angular/core";
export declare class RxRecordInstanceUtilsService {
    private rxRecordInstanceDataPageService;
    private rxLogService;
    displayFieldsCache: {
        [serializedParams: string]: IPlainObject[];
    };
    constructor(rxRecordInstanceDataPageService: RxRecordInstanceDataPageService, rxLogService: RxLogService);
    convertFromDataPageRowToPlainRecordInstance(dataPageRow: IPlainObject): {
        fieldInstances: {
            [fieldId: number]: IFieldInstance;
        };
        id: string;
    };
    escapeTextWildcards(value: any): any;
    isFieldValueEqual(value: any, other: any): boolean;
    isNoRecordFoundError(error: Error): boolean;
    getFieldValues(recordDefinitionName: string, recordInstanceIds: string[], fieldIds: string[]): Observable<IPlainObject[]>;
    tryParseContentDisposition(contentDisposition: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxRecordInstanceUtilsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxRecordInstanceUtilsService>;
}
