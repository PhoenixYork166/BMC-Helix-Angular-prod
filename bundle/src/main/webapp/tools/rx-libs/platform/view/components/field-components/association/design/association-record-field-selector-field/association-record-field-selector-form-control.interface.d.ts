import { RxEvaluatedExpression } from '@helix/platform/shared/api';
import { IFieldDefinition } from '@helix/platform/record/api';
export interface IAssociationRecordFieldSelectorFormControlOptions {
    label?: string;
    fields?: IFieldDefinition[];
    required?: boolean;
}
export interface IAssociatedRecordFieldData {
    fieldId: string;
    label: string;
    index?: string;
    name?: string;
}
export interface IAssociationFilterData {
    recordInstanceId: RxEvaluatedExpression<string>;
    associationDefinitionName: string;
}
export interface IAssociatedRecordField {
    guid: string;
    type: string;
    data: IAssociatedRecordFieldData;
}
export interface IAssociationFilter {
    guid: string;
    type: string;
    data: IAssociationFilterData;
}
export interface IAssociationChild {
    guid: string;
    type: string;
    data: IAssociationFilterData | IAssociatedRecordFieldData;
}
