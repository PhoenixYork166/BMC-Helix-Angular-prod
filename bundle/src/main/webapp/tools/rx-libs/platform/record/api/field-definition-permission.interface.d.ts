import { IPermissionOwnerId } from '@helix/platform/shared/api';
export interface IFieldDefinitionPermission {
    type: 'VIEW' | 'CHANGE';
    ownerId: IPermissionOwnerId;
}
