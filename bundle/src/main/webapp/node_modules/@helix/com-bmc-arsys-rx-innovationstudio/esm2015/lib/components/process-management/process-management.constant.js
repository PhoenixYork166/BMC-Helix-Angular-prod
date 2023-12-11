import moment from 'moment-es6';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { AX_PROCESS_DEFINITION_TAB } from '../process-definition-tab/process-definition-tab.constant';
const processInstanceGridColumns = {
    status: {
        title: 'com.bmc.arsys.rx.innovation-studio.process-management.grid-column.status.label',
        fieldId: 'status',
        visible: false,
        filterable: false,
        searchable: false,
        sortable: true
    },
    contextKey: {
        title: 'com.bmc.arsys.rx.innovation-studio.process-management.grid-column.context-key.label',
        fieldId: 'contextKey',
        searchable: false,
        sortable: false
    },
    instanceId: {
        title: 'com.bmc.arsys.rx.innovation-studio.process-management.grid-column.process-id.label',
        fieldId: 'instanceId',
        filterable: false,
        searchable: true,
        sortable: true
    },
    processDefinitionName: {
        title: 'com.bmc.arsys.rx.client.common.process-definition.label',
        fieldId: 'processDefinitionName',
        searchable: false,
        filterable: false,
        sortable: true
    },
    owner: {
        title: 'com.bmc.arsys.rx.innovation-studio.process-management.grid-column.owner.label',
        fieldId: 'owner',
        searchable: false,
        sortable: true
    },
    startTime: {
        title: 'com.bmc.arsys.rx.innovation-studio.process-management.grid-column.start-time.label',
        fieldId: 'startTime',
        searchable: false,
        filterable: false,
        sortable: true
    },
    endTime: {
        title: 'com.bmc.arsys.rx.innovation-studio.process-management.grid-column.completed-time.label',
        fieldId: 'endTime',
        searchable: false,
        filterable: false,
        sortable: true
    },
    isStartInstanceError: {
        title: 'com.bmc.arsys.rx.innovation-studio.process-management.grid-column.process-start-error.label',
        fieldId: 'isStartInstanceError',
        searchable: false,
        filterable: false,
        sortable: true
    }
};
const fieldDefinitions = {
    status: {
        id: processInstanceGridColumns.status.fieldId,
        resourceType: RX_RECORD_DEFINITION.resourceTypes.character
    },
    processDefinitionName: {
        id: processInstanceGridColumns.processDefinitionName.fieldId,
        resourceType: RX_RECORD_DEFINITION.resourceTypes.character
    },
    startTime: {
        id: processInstanceGridColumns.startTime.fieldId,
        resourceType: RX_RECORD_DEFINITION.resourceTypes.dateTime
    },
    endTime: {
        id: processInstanceGridColumns.endTime.fieldId,
        resourceType: RX_RECORD_DEFINITION.resourceTypes.dateTime
    },
    contextKey: {
        id: processInstanceGridColumns.contextKey.fieldId,
        resourceType: RX_RECORD_DEFINITION.resourceTypes.character
    },
    instanceId: {
        id: processInstanceGridColumns.instanceId.fieldId,
        resourceType: RX_RECORD_DEFINITION.resourceTypes.character
    },
    owner: {
        id: processInstanceGridColumns.owner.fieldId,
        resourceType: RX_RECORD_DEFINITION.resourceTypes.character
    },
    isStartInstanceError: {
        id: processInstanceGridColumns.isStartInstanceError.fieldId,
        resourceType: RX_RECORD_DEFINITION.resourceTypes.boolean
    }
};
export const AX_PROCESS_MANAGEMENT = {
    statusTabs: {
        [AX_PROCESS_DEFINITION_TAB.processInstanceStatuses.active]: {
            title: 'com.bmc.arsys.rx.innovation-studio.process-management.status.active.label',
            badgeType: 'primary',
            status: AX_PROCESS_DEFINITION_TAB.processInstanceStatuses.active,
            guid: 'rx-process-management-grid-active',
            gridColumns: [
                processInstanceGridColumns.contextKey,
                processInstanceGridColumns.instanceId,
                processInstanceGridColumns.processDefinitionName,
                processInstanceGridColumns.owner,
                processInstanceGridColumns.startTime,
                processInstanceGridColumns.status
            ],
            fieldDefinitions: [
                fieldDefinitions.contextKey,
                fieldDefinitions.instanceId,
                fieldDefinitions.processDefinitionName,
                fieldDefinitions.owner,
                fieldDefinitions.startTime,
                fieldDefinitions.status
            ]
        },
        [AX_PROCESS_DEFINITION_TAB.processInstanceStatuses.suspended]: {
            title: 'com.bmc.arsys.rx.innovation-studio.process-management.status.suspended.label',
            badgeType: 'warning',
            status: AX_PROCESS_DEFINITION_TAB.processInstanceStatuses.suspended,
            guid: 'rx-process-management-grid-suspended',
            gridColumns: [
                processInstanceGridColumns.contextKey,
                processInstanceGridColumns.instanceId,
                processInstanceGridColumns.processDefinitionName,
                processInstanceGridColumns.owner,
                processInstanceGridColumns.startTime,
                processInstanceGridColumns.status
            ],
            fieldDefinitions: [
                fieldDefinitions.contextKey,
                fieldDefinitions.instanceId,
                fieldDefinitions.processDefinitionName,
                fieldDefinitions.owner,
                fieldDefinitions.startTime,
                fieldDefinitions.status
            ]
        },
        [AX_PROCESS_DEFINITION_TAB.processInstanceStatuses.errored]: {
            title: 'com.bmc.arsys.rx.innovation-studio.process-management.status.errored.label',
            badgeType: 'danger',
            status: AX_PROCESS_DEFINITION_TAB.processInstanceStatuses.errored,
            guid: 'rx-process-management-grid-errored',
            gridColumns: [
                processInstanceGridColumns.contextKey,
                processInstanceGridColumns.instanceId,
                processInstanceGridColumns.processDefinitionName,
                processInstanceGridColumns.owner,
                processInstanceGridColumns.startTime,
                processInstanceGridColumns.isStartInstanceError,
                processInstanceGridColumns.status
            ],
            fieldDefinitions: [
                fieldDefinitions.contextKey,
                fieldDefinitions.instanceId,
                fieldDefinitions.processDefinitionName,
                fieldDefinitions.owner,
                fieldDefinitions.startTime,
                fieldDefinitions.isStartInstanceError,
                fieldDefinitions.status
            ]
        },
        [AX_PROCESS_DEFINITION_TAB.processInstanceStatuses.completed]: {
            title: 'com.bmc.arsys.rx.innovation-studio.process-management.status.completed.label',
            badgeType: 'success',
            status: AX_PROCESS_DEFINITION_TAB.processInstanceStatuses.completed,
            guid: 'rx-process-management-grid-completed',
            gridColumns: [
                processInstanceGridColumns.contextKey,
                processInstanceGridColumns.instanceId,
                processInstanceGridColumns.processDefinitionName,
                processInstanceGridColumns.owner,
                processInstanceGridColumns.startTime,
                processInstanceGridColumns.endTime,
                processInstanceGridColumns.status
            ],
            fieldDefinitions: [
                fieldDefinitions.contextKey,
                fieldDefinitions.instanceId,
                fieldDefinitions.processDefinitionName,
                fieldDefinitions.owner,
                fieldDefinitions.startTime,
                fieldDefinitions.endTime,
                fieldDefinitions.status
            ]
        }
    },
    timeframes: [
        {
            id: '$LASTHOUR$',
            label: 'com.bmc.arsys.rx.innovation-studio.process-management.timeframe.last-hour.label',
            value: moment.duration(1, 'hour')
        },
        {
            id: '$LASTDAY$',
            label: 'com.bmc.arsys.rx.innovation-studio.process-management.timeframe.last-day.label',
            value: moment.duration(1, 'day')
        },
        {
            id: '$LASTWEEK$',
            label: 'com.bmc.arsys.rx.innovation-studio.process-management.timeframe.last-week.label',
            value: moment.duration(1, 'week')
        },
        {
            id: '$LASTMONTH$',
            label: 'com.bmc.arsys.rx.innovation-studio.process-management.timeframe.last-month.label',
            value: moment.duration(1, 'month')
        },
        {
            id: '$LASTTHREEMONTHS$',
            label: 'com.bmc.arsys.rx.innovation-studio.process-management.timeframe.last-three-months.label',
            value: moment.duration(3, 'month')
        }
    ],
    processInstanceGridColumns
};
//# sourceMappingURL=process-management.constant.js.map