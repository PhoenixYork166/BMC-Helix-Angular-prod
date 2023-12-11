import { IColumnEditorColumnData } from '../../../../editors/record-grid-column-editor-control/record-grid-column-editor.types';
import { IRecordGridColumnNamedFilterOptionDesign } from '../../../../../common/types/record-grid.types';
import { IViewComponentDesignData } from '@helix/platform/view/designer';
export interface INamedFilterOptionDesignData extends Omit<IViewComponentDesignData<IRecordGridColumnNamedFilterOptionDesign>, 'type'> {
}
export interface INamedFilterOptionsEditorConfig {
    namedFilterOptions: INamedFilterOptionDesignData[];
    isReadOnly: boolean;
    activeIndex?: number;
    column: IColumnEditorColumnData;
}
