import { IPermissionOwnerId } from '@helix/platform/shared/api';
export interface IViewDefinitionPermission {
    type: 'VISIBLE' | 'HIDDEN';
    ownerId: IPermissionOwnerId;
}
