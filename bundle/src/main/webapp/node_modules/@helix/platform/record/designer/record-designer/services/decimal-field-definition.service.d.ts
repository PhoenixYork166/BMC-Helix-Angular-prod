import { IRecordDefinitionModel, IRecordFieldDefinitionModel } from '../../record-designer.types';
import { RxNumericFieldDefinitionService } from './numeric-field-definition.service';
import { IValidationIssue } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
export declare abstract class RxDecimalFieldDefinitionService extends RxNumericFieldDefinitionService {
    resourceType: string;
    minPrecision: number;
    maxPrecision: number;
    minValue: number;
    maxValue: number;
    allowOnlyInteger: boolean;
    getNewFieldDefinitionModel(fieldProperties: Partial<IRecordFieldDefinitionModel>): IRecordFieldDefinitionModel;
    validate(fieldModel: IRecordFieldDefinitionModel, definitionModel: IRecordDefinitionModel): IValidationIssue[];
    static ɵfac: i0.ɵɵFactoryDeclaration<RxDecimalFieldDefinitionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxDecimalFieldDefinitionService>;
}
