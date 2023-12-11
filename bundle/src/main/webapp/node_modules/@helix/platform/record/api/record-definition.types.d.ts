import { IFieldDefinition, IFieldDefinitionsById } from './field-definition.interfaces';
import { IRecordDefinitionPermission } from './record-definition-permission.interface';
import { IDefinition, IOverlayDescriptor } from '@helix/platform/shared/api';
interface IAssociatedField {
    sourceFieldId: number;
    fieldId: number;
    fieldName: string;
    sourceNode: string;
    lastUpdateTime: string;
    mappedFieldIds: number[];
}
export interface IAssociatedAuditFieldsByAssociationName {
    [associationName: string]: IAssociatedField[];
}
export interface IAuditDescriptor {
    auditRecordDefinitionName: string;
    auditDataCriteria: string;
    isEnabled: boolean;
    associatedAuditFieldsByAssociationName: IAssociatedAuditFieldsByAssociationName;
}
export declare enum ArchiveType {
    CopyToArchiveAndDeleteFromSource = "COPY_TO_ARCHIVE_AND_DELETE_FROM_SOURCE",
    DeleteFromSource = "DELETE_FROM_SOURCE",
    None = "NONE"
}
export interface IArchiveDescriptor {
    ageQualifierFieldId: number;
    ageQualifierInDays: number;
    archiveRecordDefinitionName: string;
    description: string;
    archiveType: ArchiveType;
    includeAttachments: boolean;
    archiveDataCriteria: string;
    isEnabled: boolean;
}
interface IRecordDefinitionOverlayDescriptor extends IOverlayDescriptor {
    indexesOverlayType?: string;
}
export declare enum AssociationSelectionType {
    FollowParent = "FOLLOW_PARENT",
    Selected = "SPECIFIC_ONLY",
    AllEnforced = "ALL_ENFORCED",
    All = "ALL"
}
export interface IAssociationsToFollowForArchive {
    selectionType: AssociationSelectionType;
    specificAssociationNames: string[];
}
export interface IIndexDefinition {
    indexName: string;
    unique: boolean;
    indexFieldIds: number[];
    ignoreBlankValues: boolean;
}
export interface IRecordDefinition extends IDefinition {
    allowFieldsOverlay?: boolean;
    allowIndexesOverlay?: boolean;
    allowNonAdminToDeleteRecordInstances?: boolean;
    allowOtherPropertiesOverlay?: boolean;
    allowPermissionsOverlay?: boolean;
    auditDescriptor?: IAuditDescriptor;
    archiveDescriptor?: IArchiveDescriptor;
    associationsToFollowForArchive?: IAssociationsToFollowForArchive;
    auditSourceRecordDefinitionName?: any;
    enableCognitiveSearch?: boolean;
    fieldDefinitions?: IFieldDefinition[];
    fullPermissions?: IRecordDefinitionPermission[];
    guid?: string;
    displayFieldIdInAssociation?: string;
    indexDefinitions?: IIndexDefinition[];
    inheritanceDescriptor?: any;
    isAbstract?: boolean;
    isAuditRecordDefinition?: boolean;
    isFinal?: boolean;
    isSharedInstanceStorage?: boolean;
    joinCriteria?: string;
    joinType?: string;
    localizableStringsByFieldId?: object;
    overlayDescriptor?: IRecordDefinitionOverlayDescriptor;
    permissions?: IRecordDefinitionPermission[];
    primaryRecordDefinitionName?: string;
    recordInstancePrefix?: string;
    recordTypeName?: string;
    resourceType?: string;
    rowSecurityPropagations?: string[];
    secondaryRecordDefinitionName?: string;
    securityLabels?: ISecurityLabel[];
    shouldExportData?: boolean;
    upgradeVersion?: number;
    weightedRelevancyFields?: any;
    fieldDefinitionsById?: IFieldDefinitionsById;
    type?: string;
}
export interface ISecurityLabel {
    id: number;
    name: string;
    parent?: string;
    inherited?: boolean;
    child?: any;
    securityLabelMapping?: any;
}
export {};
