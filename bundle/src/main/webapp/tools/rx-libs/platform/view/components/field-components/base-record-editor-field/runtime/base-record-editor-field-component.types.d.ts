import { IRecordDefinition, IRecordInstance } from '@helix/platform/record/api';
import { RxEvaluatedExpression } from '@helix/platform/shared/api';
import { IRecordEditorApi } from '../../../record-editor/runtime/record-editor.types';
export interface IBaseRecordEditorFieldComponentConfig {
    fieldId: string;
    recordDefinition: RxEvaluatedExpression<IRecordDefinition>;
    recordInstance: RxEvaluatedExpression<IRecordInstance>;
    disabled: RxEvaluatedExpression<boolean>;
    hidden: RxEvaluatedExpression<boolean>;
    label: string;
    inReadState: RxEvaluatedExpression<boolean>;
    api: RxEvaluatedExpression<IRecordEditorApi>;
    value?: RxEvaluatedExpression<any>;
    styles?: string;
    associatedRecordPath?: string[];
}
