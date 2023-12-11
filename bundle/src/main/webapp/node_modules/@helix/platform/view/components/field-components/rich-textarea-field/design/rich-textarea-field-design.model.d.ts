import { IViewDesignerInspectorConfig } from '@helix/platform/view/designer';
import { Observable } from 'rxjs';
import { BaseRecordEditorFieldDesign } from '../../base-record-editor-field/design';
export declare class RichTextareaFieldDesignModel extends BaseRecordEditorFieldDesign {
    fieldResourceTypes: string[];
    getInspectorConfig(): Observable<IViewDesignerInspectorConfig>;
}
