import { IAssociationDescriptor } from '@helix/platform/association/api';
import { IColumnEditorAvailableColumn } from '../../record-grid-column-editor.types';
export interface IAvailableColumnTreeData {
    associationDescriptor?: IAssociationDescriptor;
    availableColumn?: IColumnEditorAvailableColumn;
    allAvailableColumns?: IColumnEditorAvailableColumn[];
}
