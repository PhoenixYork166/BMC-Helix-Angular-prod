import { IAssignmentExpression, IProcessActionElementModel } from '@helix/platform/shared/api';
import { IRecordServerActionInputMapModel } from '../record-server-action.types';
export interface IGetRecordServerActionModel extends IProcessActionElementModel {
    inputMap: IRecordServerActionInputMapModel;
}
export interface IGetRecordServerActionService {
    getDefinitionInputMapParam(inputParamName: string, inputParamValue: string): IAssignmentExpression;
    getInputMapFromDefinition(definition: any): IRecordServerActionInputMapModel;
}
