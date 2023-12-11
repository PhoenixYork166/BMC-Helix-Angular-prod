import { IShellGlobalSearchRecord } from '../../../shell-design.types';
export interface IShellGlobalSearchRecordsModalConfig {
    selectedRecords: IShellGlobalSearchRecord[];
    recordToEdit?: IShellGlobalSearchRecord;
    isReadOnly: boolean;
}
export interface IShellGlobalSearchRecordItem {
    name: string;
    definitionName: string;
}
export interface IShellGlobalSearchSelectedItem extends IShellGlobalSearchRecord {
    isOpen: boolean;
}
