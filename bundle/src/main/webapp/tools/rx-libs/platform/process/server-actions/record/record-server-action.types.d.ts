import { IAssignmentExpression, IPlainObject } from '@helix/platform/shared/api';
export interface IRecordServerActionInputMapModel extends IPlainObject {
    recordDefinitionName: string;
    sampleRecordDefinitionName: string;
    recordID: string;
}
export interface IRecordServerActionService {
    getRecordDefinitionInputMapParam(inputParamName: string, inputParamValue: string): IAssignmentExpression;
    getRecordDefinitionNameFromInputMap(inputMap: IRecordServerActionInputMapModel): string;
    getRecordInputMapModel(definition: any): IRecordServerActionInputMapModel;
}
