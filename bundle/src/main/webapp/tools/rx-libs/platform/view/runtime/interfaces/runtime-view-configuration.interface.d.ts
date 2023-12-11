import { IRuntimeViewApi } from './runtime-view-api.interface';
import { IViewDefinition, IViewInputParams } from '@helix/platform/view/api';
export interface IRuntimeViewConfiguration {
    viewDefinitionName: string | IViewDefinition;
    inputParams?: IViewInputParams;
    onRegisterApi?(api: IRuntimeViewApi): any;
}
