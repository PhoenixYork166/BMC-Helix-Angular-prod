import { IFieldDefinitionPermission, IRecordDefinitionPermission } from '@helix/platform/record/api';
import { IViewDefinitionPermission } from '@helix/platform/view/api';
import { IProcessDefinitionPermission } from '@helix/platform/process/api';
export interface IPermissionDescriptor {
    displayValue: string;
    value: number;
    applicationName?: string;
}
export interface IPermittedAction {
    [key: string]: boolean;
}
export interface IPermission {
    permittedActions: IPermittedAction;
    selectedPermissionDescriptor: IPermissionDescriptor[];
    type: string;
    permissionScope?: string;
    isWarningShown?: boolean;
}
export declare type PermissionOwner = IRecordDefinitionPermission | IFieldDefinitionPermission | IViewDefinitionPermission | IProcessDefinitionPermission;
