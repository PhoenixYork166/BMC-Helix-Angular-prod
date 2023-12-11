import { RxListBuilderItem } from '@bmc-ux/adapt-angular';
export interface IFieldGroupsEditorState {
    fields: IFieldState[];
    groups: RxListBuilderItem[];
    selectedGroupName: string;
    isDirty: boolean;
}
export interface IFieldState {
    guid: string;
    name: string;
    groupName: string;
    fieldOrder: number;
    checked: boolean;
}
