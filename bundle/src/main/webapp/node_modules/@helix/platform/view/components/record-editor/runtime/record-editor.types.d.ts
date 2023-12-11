import { ValidatorFn } from '@angular/forms';
import { IAssociationRecords } from '@helix/platform/association/api';
import { IRecordDefinition, RecordInstance } from '@helix/platform/record/api';
import { IPlainObject, RxEvaluatedExpression } from '@helix/platform/shared/api';
import { IViewComponentIsDirty, IViewComponentIsValid, IViewComponentRefresh, IViewComponentSave, IViewComponentSetProperty } from '@helix/platform/view/runtime';
import { IRolesConfig } from '../../field-components/association/runtime/association.types';
import { RecordEditorMode, RecordEditorState } from '../common/record-editor.types';
import { RxAssociationManagerService } from './association-manager.class';
import { RecordEditorForm } from './record-editor-form.class';
import { RecordEditorFormControl } from './record-editor-form-control.class';
export interface IRecordEditorConfig {
    mode: RecordEditorMode;
    recordInstanceId: RxEvaluatedExpression<string>;
    recordDefinitionName: string;
    defaultState?: RecordEditorState;
    styles?: string;
    allowEdit: RxEvaluatedExpression;
}
export interface IRecordEditorState extends IRecordEditorConfig {
    recordInstance: RecordInstance;
    recordDefinition: IRecordDefinition;
    isDataLoading: boolean;
    isReadOnlyStateAvailable: boolean;
    currentState: RecordEditorState;
    form: RecordEditorForm;
    isDirty: boolean;
    isSaving: boolean;
    canSave: boolean;
    selectionFieldOptionNamesById: IPlainObject;
}
export interface IAssociationManagerConfig {
    allFieldIds?: boolean;
    associatedRecordNodeSide: string;
    associatedRecordInstanceId?: string;
    associatedRecordPath?: string[];
    associationDefinitionName: string;
    associationInstances?: IAssociationRecords;
    canLoadAssociations?: boolean;
    startIndex?: number;
    fieldIds?: any[];
    pageSize?: number;
    recordDefinitionName: string;
    rolesConfig?: IRolesConfig;
}
export interface IRxAssociationManagerMap {
    [name: string]: RxAssociationManagerService;
}
export interface IRecordEditorApi extends IViewComponentSave, IViewComponentIsDirty, IViewComponentIsValid, IViewComponentRefresh, IViewComponentSetProperty {
    getFieldControl(fieldId: number, guid: string, validator?: ValidatorFn | ValidatorFn[], associatedRecordPath?: string[]): RecordEditorFormControl;
    downloadAttachment(fieldId: number): void;
    getAttachmentDownloadUrl(fieldId: number): string;
    getPermissionType(fieldId: number, associatedRecordPath?: string[]): string;
    getAssociationManager(options: IAssociationManagerConfig): RxAssociationManagerService;
    isReady(): boolean;
    notifyComponentReady(componentId: string, isReady: boolean): void;
    setFieldValue(fieldId: number, value: any, associatedRecordPath?: string[], options?: {
        markAsDirty: boolean;
    }): void;
    getFieldValue(fieldId: number, associatedRecordPath?: string[]): any;
    getFieldInstanceProp(fieldId: number, prop: string, associatedRecordPath?: string[]): any;
    getRecordEditorMode(): RecordEditorMode;
    setFieldInstanceProp(fieldId: number, prop: string, value: any, associatedRecordPath?: string[]): void;
    markAsDirty(): void;
}
