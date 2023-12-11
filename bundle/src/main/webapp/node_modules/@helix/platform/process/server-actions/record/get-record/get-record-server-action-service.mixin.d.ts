import { Constructor } from '@helix/platform/utils';
import { IAssignmentExpression } from '@helix/platform/shared/api';
import { IRecordServerActionInputMapModel, IRecordServerActionService } from '../record-server-action.types';
export declare function RxGetRecordServerActionServiceMixin<TBase extends Constructor<IRecordServerActionService>>(Base: TBase): {
    new (...args: any[]): {
        getDefinitionInputMapParam(inputParamName: string, inputParamValue: string): IAssignmentExpression;
        getInputMapFromDefinition(definition: any): IRecordServerActionInputMapModel;
        getRecordDefinitionInputMapParam(inputParamName: string, inputParamValue: string): IAssignmentExpression;
        getRecordDefinitionNameFromInputMap(inputMap: IRecordServerActionInputMapModel): string;
        getRecordInputMapModel(definition: any): IRecordServerActionInputMapModel;
    };
} & TBase;
