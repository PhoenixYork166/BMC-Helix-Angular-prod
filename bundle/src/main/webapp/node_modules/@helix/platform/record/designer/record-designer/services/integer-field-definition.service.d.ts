import { IFormBuilderConfig } from '@helix/platform/shared/api';
import { IRecordDefinitionModel, IRecordFieldDefinitionModel } from '../../record-designer.types';
import { RxNumericFieldDefinitionService } from './numeric-field-definition.service';
import * as i0 from "@angular/core";
export declare class RxIntegerFieldDefinitionService extends RxNumericFieldDefinitionService {
    resourceType: string;
    minPrecision: any;
    maxPrecision: any;
    minValue: number;
    maxValue: number;
    allowOnlyInteger: boolean;
    getNewFieldDefinitionModel(fieldProperties: Partial<IRecordFieldDefinitionModel>): IRecordFieldDefinitionModel;
    getFieldInspectorConfig(fieldModel: IRecordFieldDefinitionModel, definitionModel: IRecordDefinitionModel, isReadOnly: boolean): IFormBuilderConfig;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxIntegerFieldDefinitionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxIntegerFieldDefinitionService>;
}
