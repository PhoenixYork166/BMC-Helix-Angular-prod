import { IViewActionDesignProperties } from '@helix/platform/view/api';
export interface IDisassociateViewActionParams {
    recordDefinitionName: string;
    associationDefinitionName: string;
    associationDefinitionRole: string;
    associatedRecordId: string;
    disassociatedRecordIds: string | string[];
}
export interface IDisassociateViewActionDesignProperties extends IViewActionDesignProperties {
    recordDefinitionName: string;
    associationDefinitionName: string;
    associationDefinitionRole: string;
    associatedRecordId: string;
    disassociatedRecordIds: string;
}
