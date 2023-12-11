import { GridCardLayoutWidth } from './runtime/types/grid-card-layout-width.enum';
import { RecordGridColumnAlignment } from './common/types/record-grid-column-alignment.enum';
import { Tooltip } from '@helix/platform/shared/api';
import { RX_EXPRESSION_EVALUATOR } from '@helix/platform/view/api';
const defaultTypeaheadKeystrokeCount = 1;
const columnProperties = [
    {
        name: 'visible',
        defaultValue: true,
        label: 'Visible'
    },
    {
        name: 'sortable',
        defaultValue: true,
        label: 'Sortable',
        tooltip: new Tooltip('Sorting will be disabled for character fields longer than 4000 characters.')
    },
    {
        name: 'filterable',
        defaultValue: true,
        label: 'Filterable'
    },
    {
        name: 'searchable',
        label: 'Searchable',
        defaultValue: true
    },
    {
        name: 'width',
        label: '',
        defaultValue: null,
        options: {
            label: 'Width',
            defaultUnit: 'px',
            units: [
                {
                    name: 'pixels',
                    id: 'px'
                },
                {
                    name: 'percent',
                    id: '%'
                }
            ],
            stepperOptionByUnits: {
                px: {
                    minValue: 1
                },
                '%': {
                    minValue: 1,
                    maxValue: 100
                }
            }
        }
    },
    {
        name: 'wrapText',
        defaultValue: false,
        label: 'Wrap text'
    },
    {
        name: 'alignment',
        defaultValue: false,
        label: 'Alignment',
        selectionValues: [
            {
                name: 'Align left',
                value: RecordGridColumnAlignment.Left,
                icon: 'd-icon-align_left_adapt'
            },
            {
                name: 'Center',
                value: RecordGridColumnAlignment.Center,
                icon: 'd-icon-align_center_adapt'
            },
            {
                name: 'Align right',
                value: RecordGridColumnAlignment.Right,
                icon: 'd-icon-align_right_adapt'
            }
        ]
    },
    {
        name: 'typeaheadKeystrokeCount',
        label: '',
        defaultValue: defaultTypeaheadKeystrokeCount,
        options: {
            label: 'Typeahead keystroke count',
            options: [
                {
                    id: 0,
                    name: '0'
                },
                {
                    id: 1,
                    name: '1'
                },
                {
                    id: 2,
                    name: '2'
                },
                {
                    id: 3,
                    name: '3'
                },
                {
                    id: 4,
                    name: '4'
                },
                {
                    id: 5,
                    name: '5'
                }
            ],
            emptyOption: false
        }
    }
];
export const RX_RECORD_GRID = {
    type: 'rx-record-grid',
    version: '1.0',
    defaultColumnMinWidth: 45,
    defaultRowHeight: 37,
    components: {
        filter: 'rx-record-grid-filter',
        column: 'rx-record-grid-column',
        filterPreset: 'rx-record-grid-filter-preset',
        viewPreset: 'rx-record-grid-view-preset',
        columnViewPreset: 'rx-record-grid-column-view-preset'
    },
    columnAlignment: {
        left: 'Left',
        right: 'Right',
        center: 'Center'
    },
    selectionTypes: {
        multiple: 'multiple',
        single: 'single'
    },
    userPreferences: {
        filters: 'filters',
        columns: 'columns'
    },
    cardLayoutWidthOptions: [
        {
            id: GridCardLayoutWidth.Xsmall,
            name: 'Extra Small (450px)'
        },
        {
            id: GridCardLayoutWidth.Small,
            name: 'Small (650px)'
        },
        {
            id: GridCardLayoutWidth.Medium,
            name: 'Medium (800px)'
        },
        {
            id: GridCardLayoutWidth.Large,
            name: 'Large (1024px)'
        },
        {
            id: GridCardLayoutWidth.Xlarge,
            name: 'Extra Large (1200px)'
        },
        {
            id: GridCardLayoutWidth.Xxlarge,
            name: 'Extra Extra Large (1600px)'
        }
    ],
    actionsColumnProperties: [
        {
            name: 'visible',
            defaultValue: true,
            label: 'Visible'
        }
    ],
    columnProperties,
    sharedFilterPresets: {
        recordDefinitionName: 'Record Grid Filter Presets',
        fields: {
            recordGridGuid: 300000001,
            name: 300000002,
            filterExpression: 300000003,
            sortOrder: 300000004,
            isDefault: 300000005
        }
    },
    defaultFilter: '{}',
    associatedFieldIdPrefixPattern: RX_EXPRESSION_EVALUATOR.associatedFieldIdPrefixPattern,
    defaultPageSize: 50,
    rowActionsOutletName: 'ROW_ACTIONS',
    actionsColumnFieldDefinition: {
        name: 'Actions',
        id: '$ACTIONS$'
    },
    numberOfFiltersOptions: [
        {
            id: 0,
            name: 'None'
        },
        {
            id: 1,
            name: '1'
        },
        {
            id: 2,
            name: '2'
        },
        {
            id: 3,
            name: '3'
        },
        {
            id: 4,
            name: '4'
        },
        {
            id: 5,
            name: '5'
        }
    ],
    defaultTypeaheadKeystrokeCount,
    externalPresetFilterOptionId: '$EXTERNAL_PRESET$'
};
//# sourceMappingURL=record-grid.constant.js.map