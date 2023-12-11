import { RxAssociatedRecordNodeSide } from '@helix/platform/association/api';
import { IFieldInstance, IRecordInstance } from '@helix/platform/record/api';
import { RxEvaluatedExpression } from '@helix/platform/shared/api';
import { RecordEditorState } from '../../../record-editor';
import { IBaseRecordEditorFieldComponentConfig } from '../../base-record-editor-field/runtime';
import { RxAssociationEditingMode } from '../association.types';
export interface IRxAssociationFilter {
    recordInstanceId: RxEvaluatedExpression<string>;
    associationDefinitionName: string;
}
export interface IRxAssociationConfig extends IBaseRecordEditorFieldComponentConfig {
    associationDefinitionName: string;
    associationFilter?: IRxAssociationFilter[];
    associatedRecordNodeSide?: RxAssociatedRecordNodeSide;
    editingMode: RxAssociationEditingMode;
    fields?: [];
    recordDefinitionName: string;
    state: RecordEditorState;
    useDefaultRoles: boolean;
    nodeARole: string;
    nodeBRole: string;
}
export interface IRolesConfig {
    useDefaultRoles: boolean;
    nodeARole: string;
    nodeBRole: string;
}
export interface IAssociationRecord {
    fieldInstances: IFieldInstance[];
    id: string;
    rolesConfig?: IRolesConfig;
}
export interface IAssociationApi {
    associate(associations: IRecordInstance[]): void;
}
