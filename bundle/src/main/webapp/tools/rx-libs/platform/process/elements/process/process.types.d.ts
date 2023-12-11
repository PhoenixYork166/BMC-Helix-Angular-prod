import { ICustomizationControlValue, IOverlayDescriptor } from '@helix/platform/shared/api';
import { IFieldDefinitionLight, IProcessDefinitionPermission } from '@helix/platform/process/api';
export interface IProcessDefinitionModel {
    bundleId: string;
    contextKeyParam: string;
    customizationOptions: ICustomizationControlValue;
    description: string;
    guid: string;
    inputParams: IFieldDefinitionLight[];
    isEnabled: boolean;
    lastChangedBy: string;
    lastUpdateTime: string;
    localVariables: IFieldDefinitionLight[];
    name: string;
    outputParams: IFieldDefinitionLight[];
    overlayDescriptor: IOverlayDescriptor;
    overlayGroupId: string;
    owner: string;
    permissions: IProcessDefinitionPermission[];
    runAsUser: string;
}
