import { RecordEditorMode, RecordEditorState } from '../common/record-editor.types';
import { IRxAvailableOnDevicesProp } from '@helix/platform/view/api';
export interface IRecordEditorProperties extends IRxAvailableOnDevicesProp {
    name?: string;
    label?: string;
    mode: RecordEditorMode;
    recordDefinitionName: string;
    associationDefinitionName?: string;
    recordInstanceId?: string;
    defaultState?: RecordEditorState;
    allowEdit?: string;
    styles: string;
}
export interface IRecordEditorDesignProperties extends IRecordEditorProperties {
    showReadOnlyState: boolean;
}
export declare type RecordEditorDesignProperties = Omit<IRecordEditorDesignProperties, 'fieldSelectorControlModel'>;
