import { IPermissionOwnerId } from '@helix/platform/shared/api';
export interface IRecordDefinitionPermission {
    ownerId: IPermissionOwnerId;
    type: 'VISIBLE' | 'HIDDEN';
}
