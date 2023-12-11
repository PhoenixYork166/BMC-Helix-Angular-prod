import { RxRecordGridUtilsService } from '@helix/platform/view/components';
import { Observable } from 'rxjs';
import { IRecordFields } from './field-definition-picker-component.types';
import { RxRecordDefinitionCacheService } from '@helix/platform/record/api';
import { RxDefinitionNameService } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
export declare class RxFieldDefinitionPickerService {
    private rxRecordGridUtilsService;
    private rxRecordDefinitionCacheService;
    private rxDefinitionNameService;
    constructor(rxRecordGridUtilsService: RxRecordGridUtilsService, rxRecordDefinitionCacheService: RxRecordDefinitionCacheService, rxDefinitionNameService: RxDefinitionNameService);
    getAssociatedRecordFields(recordDefinitionName: string): Observable<IRecordFields[]>;
    getRecordFields(recordDefinitionName: string): Observable<IRecordFields[]>;
    private getFieldDefinitions;
    private getFieldIdExpression;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxFieldDefinitionPickerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxFieldDefinitionPickerService>;
}
