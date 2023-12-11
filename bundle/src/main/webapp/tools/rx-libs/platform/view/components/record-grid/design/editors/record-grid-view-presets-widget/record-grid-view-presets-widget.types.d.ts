import { IViewComponentDesignData } from '@helix/platform/view/designer';
import { IRecordDefinition } from '@helix/platform/record/api';
import { IGridViewColumnProperties } from '../../../common/types/record-grid.types';
export interface IPresetItem {
    name: string;
    guid: string;
}
export interface IRecordGridViewPresetsWidgetOptions {
    recordDefinition: IRecordDefinition;
}
export interface IRecordGridViewPresetColumnData extends IViewComponentDesignData<IGridViewColumnProperties> {
}
