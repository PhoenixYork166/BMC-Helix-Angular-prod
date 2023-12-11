import moment from 'moment-es6';
export declare const AX_PROCESS_MANAGEMENT: {
    statusTabs: {
        [x: string]: {
            title: string;
            badgeType: string;
            status: string;
            guid: string;
            gridColumns: {
                title: string;
                fieldId: string;
                searchable: boolean;
                sortable: boolean;
            }[];
            fieldDefinitions: {
                id: string;
                resourceType: string;
            }[];
        };
    };
    timeframes: {
        id: string;
        label: string;
        value: moment.Duration;
    }[];
    processInstanceGridColumns: {
        status: {
            title: string;
            fieldId: string;
            visible: boolean;
            filterable: boolean;
            searchable: boolean;
            sortable: boolean;
        };
        contextKey: {
            title: string;
            fieldId: string;
            searchable: boolean;
            sortable: boolean;
        };
        instanceId: {
            title: string;
            fieldId: string;
            filterable: boolean;
            searchable: boolean;
            sortable: boolean;
        };
        processDefinitionName: {
            title: string;
            fieldId: string;
            searchable: boolean;
            filterable: boolean;
            sortable: boolean;
        };
        owner: {
            title: string;
            fieldId: string;
            searchable: boolean;
            sortable: boolean;
        };
        startTime: {
            title: string;
            fieldId: string;
            searchable: boolean;
            filterable: boolean;
            sortable: boolean;
        };
        endTime: {
            title: string;
            fieldId: string;
            searchable: boolean;
            filterable: boolean;
            sortable: boolean;
        };
        isStartInstanceError: {
            title: string;
            fieldId: string;
            searchable: boolean;
            filterable: boolean;
            sortable: boolean;
        };
    };
};
