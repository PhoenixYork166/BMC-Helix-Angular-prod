const specialActionTypeNames = {
    connector: 'connector',
    webRequest: 'WebRequest',
    jitterbit: 'iPaaS Jitterbit',
    mulesoft: 'iPaaS MuleSoft'
};
const processElementResourceTypes = {
    boundaryEvent: 'com.bmc.arsys.rx.services.process.domain.BoundaryEventDefinition',
    callActivity: 'com.bmc.arsys.rx.services.process.domain.CallActivityDefinition',
    endEvent: 'com.bmc.arsys.rx.services.process.domain.EndEventDefinition',
    errorEvent: 'com.bmc.arsys.rx.services.process.domain.ErrorEventDefinition',
    exclusiveGateway: 'com.bmc.arsys.rx.services.process.domain.ExclusiveGatewayDefinition',
    parallelGateway: 'com.bmc.arsys.rx.services.process.domain.ParallelGatewayDefinition',
    processAction: 'com.bmc.arsys.rx.services.process.domain.ServiceTaskDefinition',
    receiveTask: 'com.bmc.arsys.rx.services.process.domain.ReceiveTaskDefinition',
    sequenceFlow: 'com.bmc.arsys.rx.services.process.domain.SequenceFlowDefinition',
    startEvent: 'com.bmc.arsys.rx.services.process.domain.StartEventDefinition',
    subProcess: 'com.bmc.arsys.rx.services.process.domain.SubProcessDefinition',
    textAnnotation: 'com.bmc.arsys.rx.services.process.domain.TextAnnotation',
    textAnnotationAssociation: 'com.bmc.arsys.rx.services.process.domain.TextAnnotationAssociation',
    timerEvent: 'com.bmc.arsys.rx.services.process.domain.TimerEventDefinition',
    userTask: 'com.bmc.arsys.rx.services.process.domain.UserTaskDefinition'
};
const processElementNamesByResourceType = {
    // process event resource types
    [processElementResourceTypes.boundaryEvent]: 'Boundary',
    [processElementResourceTypes.endEvent]: 'End',
    [processElementResourceTypes.errorEvent]: 'Error',
    [processElementResourceTypes.startEvent]: 'Start',
    [processElementResourceTypes.timerEvent]: 'Timer',
    // process element resource types
    [processElementResourceTypes.callActivity]: 'Call Activity',
    [processElementResourceTypes.exclusiveGateway]: 'Exclusive',
    [processElementResourceTypes.parallelGateway]: 'Parallel',
    [processElementResourceTypes.receiveTask]: 'Receive Task',
    [processElementResourceTypes.subProcess]: 'Sub-Process',
    [processElementResourceTypes.textAnnotation]: 'Annotation',
    [processElementResourceTypes.userTask]: 'User Task',
    // rule element resource types
    'com.bmc.arsys.rx.services.rule.domain.CancelProcessInstanceAction': 'Cancel Process',
    'com.bmc.arsys.rx.services.rule.domain.SignalProcessInstanceAction': 'Signal Process',
    'com.bmc.arsys.rx.services.rule.domain.StartProcessInstanceAction': 'Start Process',
    ruleQualificationResourceType: 'Qualification'
};
const standardProcessElementGroups = {
    activities: {
        name: 'Activities',
        priority: 1
    },
    annotations: {
        name: 'Annotations',
        priority: 2
    },
    events: {
        name: 'Events',
        priority: 3
    },
    gateways: {
        name: 'Gateways',
        priority: 4
    },
    platformActions: {
        name: 'Platform actions',
        priority: 5
    },
    default: {
        priority: 6
    }
};
const standardProcessElements = [
    {
        group: standardProcessElementGroups.annotations.name,
        resourceType: processElementResourceTypes.textAnnotation
    },
    {
        group: standardProcessElementGroups.events.name,
        resourceType: processElementResourceTypes.startEvent
    },
    {
        group: standardProcessElementGroups.events.name,
        resourceType: processElementResourceTypes.endEvent
    },
    {
        group: standardProcessElementGroups.events.name,
        resourceType: processElementResourceTypes.boundaryEvent,
        eventResourceType: processElementResourceTypes.timerEvent
    },
    {
        group: standardProcessElementGroups.events.name,
        resourceType: processElementResourceTypes.boundaryEvent,
        eventResourceType: processElementResourceTypes.errorEvent
    },
    {
        group: standardProcessElementGroups.events.name,
        resourceType: processElementResourceTypes.endEvent,
        eventResourceType: processElementResourceTypes.errorEvent
    },
    {
        group: standardProcessElementGroups.activities.name,
        resourceType: processElementResourceTypes.callActivity
    },
    {
        group: standardProcessElementGroups.activities.name,
        resourceType: processElementResourceTypes.processAction,
        actionTypeName: specialActionTypeNames.connector
    },
    {
        group: standardProcessElementGroups.activities.name,
        resourceType: processElementResourceTypes.receiveTask
    },
    {
        group: standardProcessElementGroups.activities.name,
        resourceType: processElementResourceTypes.subProcess
    },
    {
        group: standardProcessElementGroups.activities.name,
        resourceType: processElementResourceTypes.userTask
    },
    {
        group: standardProcessElementGroups.activities.name,
        resourceType: processElementResourceTypes.processAction,
        actionTypeName: specialActionTypeNames.webRequest
    },
    {
        group: standardProcessElementGroups.activities.name,
        resourceType: processElementResourceTypes.processAction,
        actionTypeName: specialActionTypeNames.jitterbit
    },
    {
        group: standardProcessElementGroups.activities.name,
        resourceType: processElementResourceTypes.processAction,
        actionTypeName: specialActionTypeNames.mulesoft
    },
    {
        group: standardProcessElementGroups.gateways.name,
        resourceType: processElementResourceTypes.parallelGateway
    },
    {
        group: standardProcessElementGroups.gateways.name,
        resourceType: processElementResourceTypes.exclusiveGateway
    }
];
export const RX_PROCESS_DEFINITION = {
    processElementDisplayNames: {
        endEvent: 'End',
        startEvent: 'Start'
    },
    processElementNamesByResourceType,
    processElementResourceTypes,
    processElementTypes: {
        endEvent: 'rx.EndEvent',
        processAction: 'rx.ProcessAction',
        startEvent: 'rx.StartEvent'
    },
    processElementGroups: [
        standardProcessElementGroups.activities,
        standardProcessElementGroups.annotations,
        standardProcessElementGroups.events,
        standardProcessElementGroups.gateways,
        standardProcessElementGroups.platformActions
    ],
    standardProcessElements,
    standardProcessElementGroups,
    processElementConfigurationProperties: [
        'actionTypeName',
        'calledProcessDefinitionName',
        'eventResourceType',
        'resourceType'
    ],
    processVariableSubTypes: {
        attachment: 11,
        character: 4
    },
    processVariableTypes: {
        record: 'com.bmc.arsys.rx.services.process.domain.record.RecordInstanceFieldType',
        default: 'com.bmc.arsys.rx.services.record.domain.DefaultFieldType'
    },
    runAsUser: {
        administrator: {
            definitionValue: false,
            modelValue: 'administrator'
        },
        currentUser: {
            definitionValue: true,
            modelValue: 'currentUser'
        },
        inheritFromProcess: {
            definitionValue: null,
            modelValue: 'inheritFromProcess'
        }
    }
};
//# sourceMappingURL=process-definition.constant.js.map