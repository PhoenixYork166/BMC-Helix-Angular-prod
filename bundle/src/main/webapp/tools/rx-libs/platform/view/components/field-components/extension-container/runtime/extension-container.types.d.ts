import { IContainerViewComponentDefinition, IViewDefinition } from '@helix/platform/view/api';
import { RxEvaluatedExpression } from '@helix/platform/shared/api';
import { IRecordEditorApi } from '../../../record-editor/runtime/record-editor.types';
export interface IRxViewDefinitionMap {
    viewDefinition: IViewDefinition;
    recordEditorComponentDefinition: IContainerViewComponentDefinition;
}
export interface IRxExtensionContainerSectionConfig {
    label: string;
    styles: string;
    associationDefinitionName: string;
    recordDefinitionName: string;
    api: RxEvaluatedExpression<IRecordEditorApi>;
    associatedRecordPath: string[];
}
export interface IRxExtensionContainerConfig {
    name: string;
    hidden: RxEvaluatedExpression;
    styles: string;
}
