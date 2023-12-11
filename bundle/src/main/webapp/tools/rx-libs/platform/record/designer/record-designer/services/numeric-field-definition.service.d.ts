import { Injector } from '@angular/core';
import { IRecordDefinitionModel, IRecordFieldDefinitionModel } from '../../record-designer.types';
import { RxBaseFieldDefinitionService } from './base-field-definition.service';
import { IValidationIssue } from '@helix/platform/ui-kit';
import { IFormBuilderConfig } from '@helix/platform/shared/api';
import { RxNumberUtilsService } from '@helix/platform/utils';
import * as i0 from "@angular/core";
export declare abstract class RxNumericFieldDefinitionService extends RxBaseFieldDefinitionService {
    private rxNumberUtilsService;
    abstract readonly minPrecision: number;
    abstract readonly maxPrecision: number;
    abstract readonly minValue: number;
    abstract readonly maxValue: number;
    abstract readonly allowOnlyInteger: boolean;
    constructor(injector: Injector, rxNumberUtilsService: RxNumberUtilsService);
    validate(fieldModel: IRecordFieldDefinitionModel, definitionModel: IRecordDefinitionModel): IValidationIssue[];
    getFieldInspectorConfig(fieldModel: IRecordFieldDefinitionModel, definitionModel: IRecordDefinitionModel, isReadOnly: boolean): IFormBuilderConfig;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxNumericFieldDefinitionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxNumericFieldDefinitionService>;
}
