import { KeyValueObject } from '@bmc-ux/adapt-angular';
import { IAssignmentExpression, IMultiInstanceLoopDefinition, IOverlayDescriptor, IPermissionOwnerId } from '@helix/platform/shared/api';
import { RecordFieldOption } from '@helix/platform/record/api';
export interface IDefinitionLight {
    description: string;
    lastChangedBy: string;
    lastUpdateTime: string;
    name: string;
    overlayDescriptor: IOverlayDescriptor;
    overlayGroupId: string;
    owner: string;
    scope: string;
}
export interface IFieldDefinitionLight extends IDefinitionLight {
    defaultValue: string;
    fieldOption: RecordFieldOption;
    fieldTypeName: string;
    id: number;
    resourceType: string;
}
export interface IRecordInstanceFieldDefinitionLight extends IFieldDefinitionLight {
    recordDefinitionName: string;
    useSampleData: boolean;
}
export interface ISelectionFieldDefinitionLight extends IFieldDefinitionLight {
    optionNamesById: {
        [id: number]: string;
    };
}
export declare enum ListFieldDefinitionSubType {
    Attachment = 11,
    Character = 4
}
export interface IListFieldDefinitionLight extends IFieldDefinitionLight {
    subType: ListFieldDefinitionSubType;
}
export interface IArtifact {
    guid: string;
    resourceType: string;
}
export interface IProcessFlowElementDefinition extends IDefinitionLight {
    guid: string;
    resourceType: string;
}
export interface IActivityDefinition extends IProcessFlowElementDefinition {
    multiInstanceLoopDefinition: IMultiInstanceLoopDefinition;
}
export interface IServiceTaskDefinition extends IActivityDefinition {
    actionTypeName: string;
    inputMap: IAssignmentExpression[];
    outputMap: IAssignmentExpression[];
    runAsUser: boolean | null;
}
export interface IProcess {
    artifacts: IArtifact[];
    guid: string;
    flowElements: Array<ISubProcessDefinition | Partial<IProcessFlowElementDefinition>>;
    layout: string;
}
export interface ISubProcessDefinition extends IActivityDefinition, IProcess {
}
export interface IProcessDefinitionPermission {
    type: 'EXECUTE' | 'READ';
    ownerId: IPermissionOwnerId;
}
export interface IProcessLocalizableStrings extends KeyValueObject<string> {
}
export interface IProcessDefinition extends IDefinitionLight, IProcess {
    allowOverlay: boolean;
    contextKeyParam: string;
    inputParams: IFieldDefinitionLight[];
    isEnabled: boolean;
    localizableStrings: IProcessLocalizableStrings;
    localVariables: IFieldDefinitionLight[];
    outputParams: IFieldDefinitionLight[];
    permissions: IProcessDefinitionPermission[];
    runAsUser: boolean;
    synchronous: boolean;
}
