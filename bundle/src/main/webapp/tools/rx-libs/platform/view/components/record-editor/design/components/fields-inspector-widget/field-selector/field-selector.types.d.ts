import { IRecordFieldDefinitionItem } from '../fields-inspector-widget.types';
export interface IFieldSelectorConfig {
    selectedFieldIds: string[];
    availableFields: IRecordFieldDefinitionItem[];
    hideSystemFields: boolean;
}
export interface IAvailableFieldsGroup {
    groupLabel: string;
    selectAllFieldsInGroupButtonLabel: string;
    fields: Pick<IRecordFieldDefinitionItem, 'id' | 'name'>[];
}
