import { IViewActionDesignProperties } from '@helix/platform/view/api';
export interface IAssociateViewActionParams {
    recordDefinitionName: string;
    associationDefinitionName: string;
    associationDefinitionRole: string;
    associatedRecordId: string;
    viewDefinitionName: string;
    useDefaultRoles: boolean;
    nodeARole: string;
    nodeBRole: string;
}
export interface IAssociateViewActionDesignProperties extends IViewActionDesignProperties {
    recordDefinitionName: string;
    associationDefinitionName: string;
    associationDefinitionRole: string;
    associatedRecordId: string;
    viewDefinitionName: string;
    useDefaultRoles?: boolean;
    nodeARole?: string;
    nodeBRole?: string;
}
