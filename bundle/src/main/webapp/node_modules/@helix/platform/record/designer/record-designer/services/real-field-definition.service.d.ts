import { IRecordDefinitionModel, IRecordFieldDefinitionModel } from '../../record-designer.types';
import { RxNumericFieldDefinitionService } from './numeric-field-definition.service';
import { IValidationIssue } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
export declare class RxRealFieldDefinitionService extends RxNumericFieldDefinitionService {
    resourceType: string;
    minPrecision: -1;
    maxPrecision: any;
    minValue: number;
    maxValue: number;
    allowOnlyInteger: boolean;
    private AR_PRECISION_NONE;
    getNewFieldDefinitionModel(fieldProperties: Partial<IRecordFieldDefinitionModel>): IRecordFieldDefinitionModel;
    validate(fieldModel: IRecordFieldDefinitionModel, definitionModel: IRecordDefinitionModel): IValidationIssue[];
    static ɵfac: i0.ɵɵFactoryDeclaration<RxRealFieldDefinitionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxRealFieldDefinitionService>;
}
