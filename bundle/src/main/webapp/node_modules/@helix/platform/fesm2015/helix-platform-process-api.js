import * as i0 from '@angular/core';
import { Injectable, NgModule } from '@angular/core';
import * as i3 from '@ngx-translate/core';
import { ReplaySubject, combineLatest, of, forkJoin } from 'rxjs';
import { map, shareReplay, take } from 'rxjs/operators';
import { reject, isEmpty, omit, last, forEach, find, filter, flatten, transform, map as map$1, pick } from 'lodash';
import * as i2 from '@helix/platform/utils';
import * as i1 from '@helix/platform/shared/api';
import { DataPage, RX_BUNDLE } from '@helix/platform/shared/api';
import { CommonModule } from '@angular/common';
import * as i1$1 from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

class RxProcessDataDictionaryService {
    constructor(rxDataDictionaryUtils, rxDesignerCacheService, rxGlobalCacheService, rxIdService, rxObjectUtilsService, translateService) {
        this.rxDataDictionaryUtils = rxDataDictionaryUtils;
        this.rxDesignerCacheService = rxDesignerCacheService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxIdService = rxIdService;
        this.rxObjectUtilsService = rxObjectUtilsService;
        this.translateService = translateService;
        this.commonActivities = null;
        this.commonActivitiesSubject = new ReplaySubject(1);
        this.commonActivities$ = this.commonActivitiesSubject.asObservable();
        this.commonActivitiesDataDictionaryStateClone$ = this.commonActivities$.pipe(map((activitiesDataDictionaryState) => activitiesDataDictionaryState ? this.rxObjectUtilsService.cloneDeep(activitiesDataDictionaryState) : {}), shareReplay(1));
        this.commonDataDictionary$ = this.getCommonDataDictionary();
    }
    clear() {
        this.setCommonActivities(null);
    }
    getCommonDataDictionary() {
        return combineLatest([
            this.commonActivitiesDataDictionaryStateClone$.pipe(map((componentsDataDictionaryState) => Object.values(componentsDataDictionaryState)))
        ]).pipe(map(([activitiesDataDictionaryBranches]) => {
            return [
                {
                    label: 'General',
                    children: [
                        {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.designer.keywords.current-date.label'),
                            icon: 'd-icon-dollar',
                            expression: '$DATE$'
                        },
                        {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.designer.keywords.current-date-time.label'),
                            icon: 'd-icon-dollar',
                            expression: '$TIMESTAMP$'
                        },
                        {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.designer.keywords.current-group-ids.label'),
                            icon: 'd-icon-dollar',
                            expression: '$GROUPIDS$'
                        },
                        {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.designer.keywords.current-groups.label'),
                            icon: 'd-icon-dollar',
                            expression: '$GROUPS$'
                        },
                        {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.designer.keywords.current-roles.label'),
                            icon: 'd-icon-dollar',
                            expression: '$ROLES$'
                        },
                        {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.designer.keywords.current-server-urls.label'),
                            icon: 'd-icon-dollar',
                            expression: '$SERVERURL$'
                        },
                        {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.designer.keywords.current-time.label'),
                            icon: 'd-icon-dollar',
                            expression: '$TIME$'
                        },
                        {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.designer.keywords.current-user.label'),
                            icon: 'd-icon-dollar',
                            expression: '$USER$'
                        },
                        {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.designer.keywords.current-user-locale.label'),
                            icon: 'd-icon-dollar',
                            expression: '$LOCALE$'
                        },
                        {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.designer.keywords.current-week-day.label'),
                            icon: 'd-icon-dollar',
                            expression: '$WEEKDAY$'
                        },
                        {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.designer.keywords.new-line.label'),
                            icon: 'd-icon-dollar',
                            expression: '$NEWLINE$'
                        },
                        {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.process-designer.keywords.process-correlation-id.label'),
                            icon: 'd-icon-dollar',
                            expression: '$PROCESSCORRELATIONID$'
                        },
                        {
                            label: 'NULL',
                            icon: 'd-icon-dollar',
                            expression: '$NULL$',
                            hidden: true
                        }
                    ]
                },
                {
                    label: 'Functions',
                    expanded: true,
                    children: reject(this.rxDataDictionaryUtils.getFunctionDataDictionaryBranch(this.rxDesignerCacheService.getFunctionDescriptorsSync()), { label: 'Rule Qualification' })
                },
                {
                    label: 'Activities',
                    expanded: true,
                    children: activitiesDataDictionaryBranches
                }
            ];
        }));
    }
    setCommonActivitiesDataDictionaryBranch(guid, activityDataDictionaryBranch) {
        activityDataDictionaryBranch.pipe(take(1)).subscribe((dataDictionaryBranch) => {
            this.setCommonActivities(isEmpty(dataDictionaryBranch)
                ? omit(this.commonActivities, [guid])
                : Object.assign(Object.assign({}, this.commonActivities), { [guid]: dataDictionaryBranch }));
        });
    }
    setCommonActivities(state) {
        this.commonActivities = state;
        this.commonActivitiesSubject.next(this.commonActivities);
    }
}
RxProcessDataDictionaryService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessDataDictionaryService, deps: [{ token: i1.RxDataDictionaryUtils }, { token: i1.RxDesignerCacheService }, { token: i1.RxGlobalCacheService }, { token: i2.RxIdService }, { token: i2.RxObjectUtilsService }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.Injectable });
RxProcessDataDictionaryService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessDataDictionaryService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessDataDictionaryService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxDataDictionaryUtils }, { type: i1.RxDesignerCacheService }, { type: i1.RxGlobalCacheService }, { type: i2.RxIdService }, { type: i2.RxObjectUtilsService }, { type: i3.TranslateService }]; } });

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
const RX_PROCESS_DEFINITION = {
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

class RxProcessElementRegistryService {
    constructor(rxLogService) {
        this.rxLogService = rxLogService;
        this.elementDescriptors = new Map();
    }
    get(type) {
        var _a;
        return ((_a = this.elementDescriptors.get(type)) !== null && _a !== void 0 ? _a : this.elementDescriptors.get(RX_PROCESS_DEFINITION.processElementTypes.processAction));
    }
    getAll() {
        return Array.from(this.elementDescriptors.values());
    }
    register(descriptor) {
        if (this.elementDescriptors.has(descriptor.type)) {
            this.rxLogService.warning(`Process element ${descriptor.type} is already registered.`);
        }
        else {
            joint.util.setByPath(joint.shapes.rx, descriptor.shapeType, descriptor.shapeClass, '.');
            joint.util.setByPath(joint.shapes.rx, descriptor.viewShapeType, descriptor.viewShapeClass, '.');
            this.elementDescriptors.set(descriptor.type, descriptor);
        }
    }
}
RxProcessElementRegistryService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessElementRegistryService, deps: [{ token: i1.RxLogService }], target: i0.ɵɵFactoryTarget.Injectable });
RxProcessElementRegistryService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessElementRegistryService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessElementRegistryService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxLogService }]; } });

class RxCallActivityRegistryService {
    constructor() {
        this.callActivityDescriptors = new Map();
    }
    getRegisteredCallActivities() {
        return this.callActivityDescriptors.values();
    }
    register(...callActivityDescriptors) {
        callActivityDescriptors.forEach((descriptor) => {
            this.callActivityDescriptors.set(descriptor.processDefinitionName, descriptor);
        });
    }
}
RxCallActivityRegistryService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCallActivityRegistryService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxCallActivityRegistryService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCallActivityRegistryService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCallActivityRegistryService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

var ElementVisibilityOptions;
(function (ElementVisibilityOptions) {
    ElementVisibilityOptions["Always"] = "Always";
    ElementVisibilityOptions["Never"] = "Never";
})(ElementVisibilityOptions || (ElementVisibilityOptions = {}));

class RxProcessApiModule {
    constructor(rxCallActivityRegistryService) {
        this.rxCallActivityRegistryService = rxCallActivityRegistryService;
        this.rxCallActivityRegistryService.register({
            displayName: 'Approval Process',
            processDefinitionName: 'com.bmc.arsys.rx.approval:Approval Process V2',
            callActivityManagerServiceName: 'apApprovalProcessCallActivityManager',
            visibility: ElementVisibilityOptions.Always
        });
    }
}
RxProcessApiModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessApiModule, deps: [{ token: RxCallActivityRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
RxProcessApiModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessApiModule, imports: [CommonModule] });
RxProcessApiModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessApiModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessApiModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule]
                }]
        }], ctorParameters: function () { return [{ type: RxCallActivityRegistryService }]; } });

const processDefinitionDataPageQuery = 'com.bmc.arsys.rx.application.process.datapage.ProcessDefinitionDataPageQuery';
class RxProcessDefinitionDataPageService extends DataPage {
    constructor(injector) {
        super(injector, processDefinitionDataPageQuery);
        this.injector = injector;
    }
}
RxProcessDefinitionDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessDefinitionDataPageService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxProcessDefinitionDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessDefinitionDataPageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessDefinitionDataPageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });

class RxProcessDefinitionService {
    constructor(httpClient, rxGuidService) {
        this.httpClient = httpClient;
        this.rxGuidService = rxGuidService;
    }
    get(processDefinitionName, options) {
        return this.httpClient.get(this.getUrl(processDefinitionName), options);
    }
    getNew() {
        return of({
            allowOverlay: false,
            artifacts: [],
            contextKeyParam: null,
            description: '',
            flowElements: [],
            guid: this.rxGuidService.generate('rx-'),
            inputParams: [],
            isEnabled: true,
            lastChangedBy: null,
            lastUpdateTime: null,
            layout: JSON.stringify({ cells: [] }),
            localVariables: [],
            localizableStrings: {},
            name: '',
            outputParams: [],
            overlayDescriptor: null,
            overlayGroupId: null,
            owner: null,
            permissions: [],
            runAsUser: false,
            scope: RX_BUNDLE.definitionScopeTypes.bundle,
            synchronous: null
        });
    }
    getServerActionModelType(actionTypeName) {
        return `rx.ProcessActions.${actionTypeName.replace(':', '.')}`;
    }
    getServerActionTypeName(modelType) {
        return last(modelType.split('.'));
    }
    update(processDefinition, options) {
        return this.httpClient.put(this.getUrl(processDefinition.name), processDefinition, options);
    }
    getOutputParams(processDefinitionName, options) {
        return this.httpClient.get(`/api/rx/application/process/processdefinition/${encodeURIComponent(processDefinitionName)}/outputParams`, options);
    }
    getInputParams(processDefinitionName, options) {
        return this.httpClient.get(`/api/rx/application/process/processdefinition/${encodeURIComponent(processDefinitionName)}/inputParams`, options);
    }
    getUrl(processDefinitionName) {
        return processDefinitionName
            ? `/api/rx/application/process/processdefinition/${encodeURIComponent(processDefinitionName)}`
            : '/api/rx/application/process/processdefinition';
    }
}
RxProcessDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessDefinitionService, deps: [{ token: i1$1.HttpClient }, { token: i2.RxGuidService }], target: i0.ɵɵFactoryTarget.Injectable });
RxProcessDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1$1.HttpClient }, { type: i2.RxGuidService }]; } });

var ListFieldDefinitionSubType;
(function (ListFieldDefinitionSubType) {
    ListFieldDefinitionSubType[ListFieldDefinitionSubType["Attachment"] = 11] = "Attachment";
    ListFieldDefinitionSubType[ListFieldDefinitionSubType["Character"] = 4] = "Character";
})(ListFieldDefinitionSubType || (ListFieldDefinitionSubType = {}));

class RxProcessDefinitionCacheService {
    constructor(rxProcessDefinitionService) {
        this.rxProcessDefinitionService = rxProcessDefinitionService;
        this.consumers = new Set();
        this.processDefinitionCache = new Map();
        this.processDefinitionOutputParamCache = new Map();
    }
    getProcessDefinition(processDefinitionName) {
        if (!this.processDefinitionCache.has(processDefinitionName)) {
            const processDefinition$ = this.rxProcessDefinitionService
                .get(processDefinitionName, {
                headers: new HttpHeaders({ 'Design-Time': 'true' })
            })
                .pipe(shareReplay(1));
            this.processDefinitionCache.set(processDefinitionName, processDefinition$);
        }
        return this.processDefinitionCache.get(processDefinitionName);
    }
    getOutputParams(processDefinitionName) {
        if (!this.processDefinitionOutputParamCache.has(processDefinitionName)) {
            const processDefinitionOutputParams$ = this.rxProcessDefinitionService
                .getOutputParams(processDefinitionName, {
                headers: new HttpHeaders({ 'Design-Time': 'true' })
            })
                .pipe(shareReplay(1));
            this.processDefinitionOutputParamCache.set(processDefinitionName, processDefinitionOutputParams$);
        }
        return this.processDefinitionOutputParamCache.get(processDefinitionName);
    }
    registerConsumer(consumerDestroy$) {
        this.consumers.add(consumerDestroy$);
        consumerDestroy$.subscribe(() => {
            this.consumers.delete(consumerDestroy$);
            if (isEmpty(this.consumers)) {
                this.clearCache();
            }
        });
    }
    clearCache(processDefinitionNames) {
        if (processDefinitionNames) {
            forEach(processDefinitionNames, (processDefinitionName) => {
                this.processDefinitionCache.delete(processDefinitionName);
                this.processDefinitionOutputParamCache.delete(processDefinitionName);
            });
        }
        else {
            this.processDefinitionCache.clear();
            this.processDefinitionOutputParamCache.clear();
        }
    }
}
RxProcessDefinitionCacheService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessDefinitionCacheService, deps: [{ token: RxProcessDefinitionService }], target: i0.ɵɵFactoryTarget.Injectable });
RxProcessDefinitionCacheService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessDefinitionCacheService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessDefinitionCacheService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: RxProcessDefinitionService }]; } });

class RxProcessElementSearchService {
    find(definition, predicate) {
        let processElement = this.findElementInDefinition(definition, predicate);
        if (!processElement) {
            processElement = find(this.flattenElements(definition), predicate);
        }
        return processElement;
    }
    findElementInDefinition(definition, predicate) {
        return find(definition.flowElements, predicate) || find(definition.artifacts, predicate);
    }
    findOwner(definition, guid) {
        const processElement = this.findElementInDefinition(definition, { guid: guid });
        let result;
        if (processElement) {
            result = definition;
        }
        else {
            result = find(this.flattenElements(definition), (element) => {
                return this.findElementInDefinition(element, { guid: guid });
            });
        }
        return result;
    }
    findByGuid(definition, guid) {
        return this.find(definition, { guid: guid });
    }
    filter(definition, predicate) {
        return filter(this.flattenElements(definition), predicate);
    }
    forEach(definition, iteratee) {
        return forEach(this.flattenElements(definition), iteratee);
    }
    flattenElements(definition) {
        return flatten(transform([].concat(definition.flowElements || [], definition.artifacts || []), (result, element) => {
            result.push(element);
            if (element.flowElements) {
                result.push(this.flattenElements(element));
            }
        }, []));
    }
}
RxProcessElementSearchService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessElementSearchService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxProcessElementSearchService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessElementSearchService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessElementSearchService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class RxProcessElementsService {
    constructor(rxActionTypeUtilsService, rxBundleCacheService, rxCallActivityRegistryService, rxDefinitionNameService, rxGlobalCacheService, rxStringService) {
        this.rxActionTypeUtilsService = rxActionTypeUtilsService;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxCallActivityRegistryService = rxCallActivityRegistryService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxStringService = rxStringService;
    }
    getActionElements(actionResourceType) {
        return forkJoin([
            this.rxBundleCacheService.getActionTypes(),
            this.rxGlobalCacheService.getBundleDescriptors()
        ]).pipe(map(([actionTypes, bundleDescriptors]) => {
            return map$1(actionTypes, (actionType) => {
                return {
                    group: this.rxActionTypeUtilsService.getActionTypeBundleFriendlyName(bundleDescriptors, actionType) ||
                        'Platform actions',
                    label: actionType.displayName || this.rxActionTypeUtilsService.prettifyActionTypeName(actionType.actionTypeName),
                    value: {
                        actionTypeName: actionType.actionTypeName,
                        resourceType: actionResourceType
                    }
                };
            });
        }));
    }
    getCallActivityElements() {
        return forkJoin([this.rxGlobalCacheService.getBundleDescriptors(), this.getVisibleCallActivities()]).pipe(map(([bundleDescriptors, visibleCallActivities]) => {
            const callActivityElements = [];
            forEach(visibleCallActivities, (visibleCallActivity) => {
                const bundle = find(bundleDescriptors, {
                    id: this.rxDefinitionNameService.getBundleId(visibleCallActivity.processDefinitionName)
                });
                if (bundle) {
                    callActivityElements.push({
                        group: bundle.friendlyName,
                        label: visibleCallActivity.displayName ||
                            this.rxStringService.prettify(this.rxDefinitionNameService.getDisplayName(visibleCallActivity.processDefinitionName)),
                        value: {
                            resourceType: RX_PROCESS_DEFINITION.processElementResourceTypes.callActivity,
                            calledProcessDefinitionName: visibleCallActivity.processDefinitionName
                        }
                    });
                }
            });
            return callActivityElements;
        }));
    }
    getProcessElements() {
        return [
            this.getActionElements(RX_PROCESS_DEFINITION.processElementResourceTypes.processAction),
            this.getCallActivityElements(),
            this.getStandardProcessElements()
        ];
    }
    getStandardProcessElements() {
        return of(map$1(RX_PROCESS_DEFINITION.standardProcessElements, (element) => {
            let label;
            if (element.resourceType === RX_PROCESS_DEFINITION.processElementResourceTypes.processAction) {
                label = this.rxActionTypeUtilsService.prettifyActionTypeName(element.actionTypeName);
            }
            else if (element.eventResourceType === RX_PROCESS_DEFINITION.processElementResourceTypes.errorEvent) {
                const errorEventLabel = RX_PROCESS_DEFINITION.processElementNamesByResourceType[RX_PROCESS_DEFINITION.processElementResourceTypes.errorEvent];
                const boundaryEventLabel = RX_PROCESS_DEFINITION.processElementNamesByResourceType[RX_PROCESS_DEFINITION.processElementResourceTypes.boundaryEvent];
                const endEventLabel = RX_PROCESS_DEFINITION.processElementNamesByResourceType[RX_PROCESS_DEFINITION.processElementResourceTypes.endEvent];
                label =
                    element.resourceType === RX_PROCESS_DEFINITION.processElementResourceTypes.boundaryEvent
                        ? `${errorEventLabel} ${boundaryEventLabel}`
                        : `${errorEventLabel} ${endEventLabel}`;
            }
            else if (element.resourceType === RX_PROCESS_DEFINITION.processElementResourceTypes.boundaryEvent) {
                label = RX_PROCESS_DEFINITION.processElementNamesByResourceType[element.eventResourceType];
            }
            else {
                label = RX_PROCESS_DEFINITION.processElementNamesByResourceType[element.resourceType];
            }
            return {
                group: element.group,
                label: label,
                value: pick(element, RX_PROCESS_DEFINITION.processElementConfigurationProperties)
            };
        }));
    }
    getVisibleCallActivities() {
        return of(filter(Array.from(this.rxCallActivityRegistryService.getRegisteredCallActivities()), {
            visibility: ElementVisibilityOptions.Always
        }));
    }
}
RxProcessElementsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessElementsService, deps: [{ token: i1.RxActionTypeUtilsService }, { token: i1.RxBundleCacheService }, { token: RxCallActivityRegistryService }, { token: i1.RxDefinitionNameService }, { token: i1.RxGlobalCacheService }, { token: i2.RxStringService }], target: i0.ɵɵFactoryTarget.Injectable });
RxProcessElementsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessElementsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessElementsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxActionTypeUtilsService }, { type: i1.RxBundleCacheService }, { type: RxCallActivityRegistryService }, { type: i1.RxDefinitionNameService }, { type: i1.RxGlobalCacheService }, { type: i2.RxStringService }]; } });

class RxProcessInstanceService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    get(processDefinitionName, processInstanceId) {
        return this.httpClient.get(`/api/rx/application/process/processinstance/${encodeURIComponent(processDefinitionName)}/${processInstanceId}`);
    }
    getLog(processDefinitionName, processInstanceId) {
        return this.httpClient.get(`/api/rx/application/process/processinstance/log/${encodeURIComponent(processDefinitionName)}/${processInstanceId}/view`);
    }
    downloadLog(processDefinitionName, processInstanceId) {
        return this.httpClient.get(`/api/rx/application/process/processinstance/log/${encodeURIComponent(processDefinitionName)}/${processInstanceId}/download`, {
            responseType: 'blob'
        });
    }
}
RxProcessInstanceService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessInstanceService, deps: [{ token: i1$1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
RxProcessInstanceService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessInstanceService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessInstanceService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1$1.HttpClient }]; } });

class RxProcessInstanceCommandsService {
    constructor(rxCommandFactoryService) {
        this.rxCommandFactoryService = rxCommandFactoryService;
        this.startProcessCommand = this.rxCommandFactoryService.forResourceType('com.bmc.arsys.rx.application.process.command.StartProcessInstanceCommand');
    }
    start(processDefinitionName, processInputValues) {
        return this.startProcessCommand.execute({
            processDefinitionName,
            processInputValues
        }, {
            observe: 'response',
            responseType: 'text'
        });
    }
}
RxProcessInstanceCommandsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessInstanceCommandsService, deps: [{ token: i1.RxCommandFactoryService }], target: i0.ɵɵFactoryTarget.Injectable });
RxProcessInstanceCommandsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessInstanceCommandsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessInstanceCommandsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxCommandFactoryService }]; } });

class RxProcessInstanceDataPageService extends DataPage {
    constructor(injector) {
        super(injector, 'com.bmc.arsys.rx.application.process.datapage.ProcessInstanceDataPageQuery');
        this.injector = injector;
    }
}
RxProcessInstanceDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessInstanceDataPageService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxProcessInstanceDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessInstanceDataPageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessInstanceDataPageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });

class RxProcessInstanceCountsByStatusDataPageService extends DataPage {
    constructor(injector) {
        super(injector, 'com.bmc.arsys.rx.application.process.datapage.ProcessInstanceCountsByStatusDataPageQuery');
        this.injector = injector;
    }
}
RxProcessInstanceCountsByStatusDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessInstanceCountsByStatusDataPageService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxProcessInstanceCountsByStatusDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessInstanceCountsByStatusDataPageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessInstanceCountsByStatusDataPageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });

/**
 * Generated bundle index. Do not edit.
 */

export { ElementVisibilityOptions, ListFieldDefinitionSubType, RX_PROCESS_DEFINITION, RxCallActivityRegistryService, RxProcessApiModule, RxProcessDataDictionaryService, RxProcessDefinitionCacheService, RxProcessDefinitionDataPageService, RxProcessDefinitionService, RxProcessElementRegistryService, RxProcessElementSearchService, RxProcessElementsService, RxProcessInstanceCommandsService, RxProcessInstanceCountsByStatusDataPageService, RxProcessInstanceDataPageService, RxProcessInstanceService };
//# sourceMappingURL=helix-platform-process-api.js.map
