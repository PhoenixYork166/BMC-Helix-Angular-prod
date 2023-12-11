import { IColumnEditorProperty } from './design/editors/record-grid-column-editor-control/record-grid-column-editor-modal/types/column-editor-property.types';
export declare const RX_RECORD_GRID: {
    type: string;
    version: string;
    defaultColumnMinWidth: number;
    defaultRowHeight: number;
    components: {
        filter: string;
        column: string;
        filterPreset: string;
        viewPreset: string;
        columnViewPreset: string;
    };
    columnAlignment: {
        left: string;
        right: string;
        center: string;
    };
    selectionTypes: {
        multiple: string;
        single: string;
    };
    userPreferences: {
        filters: string;
        columns: string;
    };
    cardLayoutWidthOptions: any[];
    actionsColumnProperties: {
        name: string;
        defaultValue: boolean;
        label: string;
    }[];
    columnProperties: IColumnEditorProperty[];
    sharedFilterPresets: {
        recordDefinitionName: string;
        fields: {
            recordGridGuid: number;
            name: number;
            filterExpression: number;
            sortOrder: number;
            isDefault: number;
        };
    };
    defaultFilter: string;
    associatedFieldIdPrefixPattern: string;
    defaultPageSize: number;
    rowActionsOutletName: string;
    actionsColumnFieldDefinition: {
        name: string;
        id: string;
    };
    numberOfFiltersOptions: any[];
    defaultTypeaheadKeystrokeCount: number;
    externalPresetFilterOptionId: string;
};
