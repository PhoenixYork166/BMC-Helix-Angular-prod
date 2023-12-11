import { IRowDataItem } from '@helix/platform/view/api';
export interface IRenameAction {
    selectedRow: IRowDataItem;
    definitionNames: string[];
}
export interface ICustomAction {
    actionId: string;
    selectedRows: IRowDataItem[];
}
