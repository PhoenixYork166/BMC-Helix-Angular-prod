import { RxBaseFieldDefinitionService } from './base-field-definition.service';
import { Injector } from '@angular/core';
import { IFormBuilderConfig } from '@helix/platform/shared/api';
import { IRecordDefinitionModel, IRecordFieldDefinitionModel } from '../../record-designer.types';
import { IValidationIssue } from '@helix/platform/ui-kit';
import { RxNumberUtilsService } from '@helix/platform/utils';
import * as i0 from "@angular/core";
export declare class RxLocalizedCharacterFieldDefinitionService extends RxBaseFieldDefinitionService {
    private rxNumberUtilsService;
    resourceType: string;
    constructor(injector: Injector, rxNumberUtilsService: RxNumberUtilsService);
    getNewFieldDefinitionModel(fieldProperties: Partial<IRecordFieldDefinitionModel>): IRecordFieldDefinitionModel;
    getFieldInspectorConfig(fieldModel: IRecordFieldDefinitionModel, definitionModel: IRecordDefinitionModel, isReadOnly: boolean): IFormBuilderConfig;
    validate(fieldModel: IRecordFieldDefinitionModel, definitionModel: IRecordDefinitionModel): IValidationIssue[];
    static ɵfac: i0.ɵɵFactoryDeclaration<RxLocalizedCharacterFieldDefinitionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxLocalizedCharacterFieldDefinitionService>;
}