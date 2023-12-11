export declare const RX_PROCESS_DEFINITION: {
    processElementDisplayNames: {
        endEvent: string;
        startEvent: string;
    };
    processElementNamesByResourceType: {
        [x: string]: string;
        'com.bmc.arsys.rx.services.rule.domain.CancelProcessInstanceAction': string;
        'com.bmc.arsys.rx.services.rule.domain.SignalProcessInstanceAction': string;
        'com.bmc.arsys.rx.services.rule.domain.StartProcessInstanceAction': string;
        ruleQualificationResourceType: string;
    };
    processElementResourceTypes: {
        boundaryEvent: string;
        callActivity: string;
        endEvent: string;
        errorEvent: string;
        exclusiveGateway: string;
        parallelGateway: string;
        processAction: string;
        receiveTask: string;
        sequenceFlow: string;
        startEvent: string;
        subProcess: string;
        textAnnotation: string;
        textAnnotationAssociation: string;
        timerEvent: string;
        userTask: string;
    };
    processElementTypes: {
        endEvent: string;
        processAction: string;
        startEvent: string;
    };
    processElementGroups: {
        name: string;
        priority: number;
    }[];
    standardProcessElements: ({
        group: string;
        resourceType: string;
        eventResourceType?: undefined;
        actionTypeName?: undefined;
    } | {
        group: string;
        resourceType: string;
        eventResourceType: string;
        actionTypeName?: undefined;
    } | {
        group: string;
        resourceType: string;
        actionTypeName: string;
        eventResourceType?: undefined;
    })[];
    standardProcessElementGroups: {
        activities: {
            name: string;
            priority: number;
        };
        annotations: {
            name: string;
            priority: number;
        };
        events: {
            name: string;
            priority: number;
        };
        gateways: {
            name: string;
            priority: number;
        };
        platformActions: {
            name: string;
            priority: number;
        };
        default: {
            priority: number;
        };
    };
    processElementConfigurationProperties: string[];
    processVariableSubTypes: {
        attachment: number;
        character: number;
    };
    processVariableTypes: {
        record: string;
        default: string;
    };
    runAsUser: {
        administrator: {
            definitionValue: boolean;
            modelValue: string;
        };
        currentUser: {
            definitionValue: boolean;
            modelValue: string;
        };
        inheritFromProcess: {
            definitionValue: any;
            modelValue: string;
        };
    };
};
