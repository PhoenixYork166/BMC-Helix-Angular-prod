import { IViewDesignerInspectorConfig } from '@helix/platform/view/designer';
import { Observable } from 'rxjs';
import { BaseRecordEditorFieldDesign } from '../../base-record-editor-field/design/base-record-editor-field-design.class';
import { IBaseRecordEditorFieldProperties } from '../../base-record-editor-field/design/base-record-editor-field-design.types';
export declare class AttachmentFieldDesignModel extends BaseRecordEditorFieldDesign {
    fieldResourceTypes: string[];
    static getInitialProperties(initialProperties?: IBaseRecordEditorFieldProperties): IBaseRecordEditorFieldProperties;
    getInspectorConfig(): Observable<IViewDesignerInspectorConfig>;
}
