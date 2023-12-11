import { Injectable } from '@angular/core';
import { RxBundleService, RxCurrentUserService, RxGlobalCacheService, RxLogService, RxNotificationService } from '@helix/platform/shared/api';
import { RxUtilityModalsService } from '@helix/platform/ui-kit';
import { RxJsonParserService, RxObjectUtilsService } from '@helix/platform/utils';
import { RxExpressionEvaluatorService, RxViewActionRegistryService, RxViewComponentRegistryService, RxViewComponentType, RxViewDefinitionCacheService, RxViewDefinitionParserService, RxViewDefinitionService, ViewComponentPropertyType } from '@helix/platform/view/api';
import { every, find, forEach, forIn, forOwn, get, groupBy, has, includes, intersection, isEmpty, isFunction, isNil, isObject, isString, keys, map as _map, set, some, sortBy, toNumber } from 'lodash';
import { asyncScheduler, BehaviorSubject, combineLatest, EMPTY, from, merge, Observable, of, ReplaySubject, Subject, throwError } from 'rxjs';
import { catchError, defaultIfEmpty, distinct, filter, map, reduce, switchMap, switchMapTo, take, tap } from 'rxjs/operators';
import { ComponentExpression } from './component/component-expression.class';
import { ViewComponentEventManager } from './event-manager/view-component-event-manager.class';
import { VIEW_COMPONENT_DEFAULT_EVENT_NAME } from './event-manager/view-component-event-manager.constant';
import { RxRuntimeViewUtilsService } from './runtime-view-utils.service';
import { RxViewDefinitionAdapterService } from './view-definition-adapter.service';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@helix/platform/view/api";
import * as i3 from "./view-definition-adapter.service";
import * as i4 from "./runtime-view-utils.service";
import * as i5 from "./event-manager/view-component-event-manager.class";
import * as i6 from "@helix/platform/ui-kit";
import * as i7 from "@helix/platform/utils";
export class RuntimeViewModel {
    constructor(rxBundleService, rxGlobalCacheService, rxViewComponentRegistryService, rxViewDefinitionAdapterService, rxViewDefinitionParserService, rxViewDefinitionService, rxRuntimeViewUtilsService, rxExpressionEvaluatorService, rxNotificationService, rxViewActionRegistryService, rxLogService, viewComponentEventManager, rxUtilityModalsService, rxViewDefinitionCacheService, rxObjectUtilsService, rxJsonParserService, rxCurrentUserService) {
        this.rxBundleService = rxBundleService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        this.rxViewDefinitionAdapterService = rxViewDefinitionAdapterService;
        this.rxViewDefinitionParserService = rxViewDefinitionParserService;
        this.rxViewDefinitionService = rxViewDefinitionService;
        this.rxRuntimeViewUtilsService = rxRuntimeViewUtilsService;
        this.rxExpressionEvaluatorService = rxExpressionEvaluatorService;
        this.rxNotificationService = rxNotificationService;
        this.rxViewActionRegistryService = rxViewActionRegistryService;
        this.rxLogService = rxLogService;
        this.viewComponentEventManager = viewComponentEventManager;
        this.rxUtilityModalsService = rxUtilityModalsService;
        this.rxViewDefinitionCacheService = rxViewDefinitionCacheService;
        this.rxObjectUtilsService = rxObjectUtilsService;
        this.rxJsonParserService = rxJsonParserService;
        this.rxCurrentUserService = rxCurrentUserService;
        // public api which available for runtime view client
        this.api = {
            save: this.save.bind(this),
            close: this.close.bind(this),
            cancel: this.cancel.bind(this),
            refresh: this.refresh.bind(this),
            canClose: this.canClose.bind(this),
            applyViewPreset: this.applyViewPreset.bind(this),
            deleteViewPreset: this.deleteViewPreset.bind(this),
            discardViewPresetChanges: this.discardViewPresetChanges.bind(this),
            saveViewPreset: this.saveViewPreset.bind(this)
        };
        this.saveSubject = new Subject();
        this.closeSubject = new Subject();
        this.cancelSubject = new Subject();
        this.save$ = this.saveSubject.asObservable();
        this.close$ = this.closeSubject.asObservable();
        this.cancel$ = this.cancelSubject.asObservable();
        this.viewComponentStates = new Map();
        // store all components state, needed for component expression re-evaluation
        this.evaluationData = {
            view: {
                api: this.api,
                components: {},
                inputParams: {},
                isValid: false
            },
            keywords: {
                user: this.rxCurrentUserService.getName(),
                newLine: '\n'
            }
        };
    }
    init(configuration) {
        this.configuration = configuration;
        this.clear();
        const viewDefinition$ = isString(configuration.viewDefinitionName)
            ? this.rxViewDefinitionCacheService.getViewDefinition(configuration.viewDefinitionName)
            : of(configuration.viewDefinitionName);
        return viewDefinition$.pipe(switchMap((viewDefinition) => {
            const viewComponents = this.rxViewDefinitionParserService.getComponents(viewDefinition, true);
            const ownerBundleIds = viewComponents.map((viewComponent) => viewComponent.componentDefinition.type === RxViewComponentType.Action
                ? this.rxViewActionRegistryService.getActionOwnerBundleId(viewComponent.componentDefinition.propertiesByName.name)
                : this.rxViewComponentRegistryService.getComponentOwnerBundleId(viewComponent.componentDefinition.type));
            return merge(...ownerBundleIds).pipe(filter(Boolean), distinct(), reduce((acc, bundleId) => {
                acc.push(bundleId);
                return acc;
            }, []), switchMap((bundleIds) => bundleIds.length
                ? this.rxBundleService.loadBundles(bundleIds, true).pipe(map(() => viewDefinition))
                : of(viewDefinition)), switchMap((viewDefinition) => this.rxViewComponentRegistryService.resolveAsyncDescriptors().pipe(map(() => viewDefinition))));
        }), switchMap((viewDefinition) => this.processViewDefinition(viewDefinition)));
    }
    clear() {
        this.viewComponentStates.clear();
        this.evaluationData.view.components = {};
        this.evaluationData.view.inputParams = {};
    }
    save(closeViewAfterSave = false) {
        return this.callRuntimeComponentsApi('save', closeViewAfterSave).pipe(tap({
            complete: () => this.saveSubject.next()
        }));
    }
    close() {
        const viewOutputParams = this.evaluateViewOutputParams();
        this.closeSubject.next(viewOutputParams);
        return of(viewOutputParams);
    }
    cancel(skipDirtyCheck) {
        if (skipDirtyCheck) {
            this.cancelSubject.next();
            return EMPTY;
        }
        else {
            return this.isDirtyView().pipe(switchMap((isDirty) => (isDirty ? this.rxUtilityModalsService.confirmUnsavedChanges() : of(true))), tap((canClose) => {
                if (canClose) {
                    this.cancelSubject.next();
                }
            }), switchMap((canClose) => {
                return canClose ? EMPTY : throwError(null);
            }));
        }
    }
    refresh() {
        return this.callRuntimeComponentsApi('refresh');
    }
    canClose() {
        let canClose = true;
        this.isDirtyView().subscribe((isDirty) => (canClose = !isDirty));
        return canClose;
    }
    applyViewPreset(viewPresetSelectorGuid, viewPresetGuid, sharedViewPresets) {
        return this.callRuntimeComponentsApi('applyViewPreset', viewPresetSelectorGuid, viewPresetGuid, sharedViewPresets).pipe(switchMap(() => EMPTY));
    }
    deleteViewPreset(viewPresetGuid) {
        return this.callRuntimeComponentsApi('deleteViewPreset', viewPresetGuid).pipe(switchMap(() => EMPTY));
    }
    discardViewPresetChanges(viewPresetGuid, sharedViewPresets) {
        return this.callRuntimeComponentsApi('discardViewPresetChanges', viewPresetGuid, sharedViewPresets).pipe(switchMap(() => EMPTY));
    }
    saveViewPreset(viewPresetGuid) {
        return this.callRuntimeComponentsApi('saveViewPreset', viewPresetGuid).pipe(switchMap(() => EMPTY));
    }
    shareViewPreset(viewPresetSelectorGuid) {
        return this.callRuntimeComponentsApi('shareViewPreset', viewPresetSelectorGuid).pipe(defaultIfEmpty([]), map((data) => data
            .filter((item) => Boolean(item === null || item === void 0 ? void 0 : item.data))
            .reduce((result, item) => {
            result[item.guid] = item.data;
            return result;
        }, {})));
    }
    // launch view component actions for particular event
    triggerViewActions(componentGuid, viewActionTriggerEventName) {
        let actionsResult = Promise.resolve();
        const viewComponentState = this.viewComponentStates.get(componentGuid);
        if (viewComponentState) {
            const eventState = viewComponentState.eventStates[viewActionTriggerEventName];
            if (eventState) {
                const actionStates = eventState.map((actionState) => ({
                    guid: actionState.guid,
                    name: actionState.name,
                    parameters: actionState.config
                }));
                // execute view component actions for particular event
                actionsResult = this.viewComponentEventManager.executeActions(actionStates, (actionState, result) => {
                    // hook which is called after each action execution
                    // update action shared state and re-evaluate dependent action view component
                    this.onViewComponentActionOutputChanged(componentGuid, actionState.guid, result);
                });
            }
            else {
                this.rxLogService.warning(`Cannot trigger view actions. View Action Trigger Event ${viewActionTriggerEventName} not found.`);
            }
        }
        else {
            this.rxLogService.warning(`Cannot trigger view actions. View Component ${componentGuid} not found.`);
        }
        return actionsResult;
    }
    // hook which is called when view component triggers "property changed" event
    onViewComponentPropertyChanged({ guid, propertyName, newValue }) {
        const viewComponentState = this.viewComponentStates.get(guid);
        viewComponentState.publicState[propertyName] = newValue;
        this.updateEvaluationData(viewComponentState);
        // update config if changed property exist in component properties descriptor
        if (propertyName !== 'api' && some(viewComponentState.componentDescriptor.properties, { name: propertyName })) {
            this.updateComponentConfigProperty(propertyName, newValue, viewComponentState);
            this.updateViewComponentConfig(viewComponentState);
        }
        const dependentViewComponentGuids = viewComponentState.dependentViewComponentsMap.get(propertyName);
        let dependentViewComponentStates;
        // find all view components which depend on changed view component based on expressions
        if (dependentViewComponentGuids) {
            // restore dependent components from the cache
            dependentViewComponentStates = dependentViewComponentGuids.map((viewComponentGuid) => this.viewComponentStates.get(viewComponentGuid));
        }
        else {
            dependentViewComponentStates = this.getDependentViewComponentStates((expression) => expression.hasDependency(guid, propertyName));
            // cache dependent view component guids
            viewComponentState.dependentViewComponentsMap.set(propertyName, dependentViewComponentStates.map((state) => state.guid));
        }
        // evaluate expressions for all dependent view components
        dependentViewComponentStates.forEach((dependentViewComponentState) => {
            this.evaluateDependentProperties(dependentViewComponentState, guid, propertyName);
        });
        // update config$ for all dependent view components
        dependentViewComponentStates
            .map((dependentViewComponentState) => {
            // if dependentViewComponentState is data view component
            // config$ should be updated for nearest parent view component with UI representation
            // i.e. if rx-record-grid-column is dependent component then rx-record-grid config$ should be update
            if (dependentViewComponentState.isDataViewComponent) {
                return this.getParentViewComponent(dependentViewComponentState);
            }
            else {
                return dependentViewComponentState;
            }
        })
            .forEach((dependentViewComponentState) => {
            this.updateViewComponentConfig(dependentViewComponentState);
        });
        if (propertyName === 'isValid') {
            this.triggerViewValidation(newValue);
        }
    }
    // ts guard - defines whether componentDescriptor is data view component
    isDataViewComponentDefinition(componentDescriptor) {
        return componentDescriptor.configPropertyName !== undefined;
    }
    getViewInputParameters() {
        return this.configuration.inputParams;
    }
    isDirtyView() {
        // Used a separate observable to handle scenario when callRuntimeComponentsApi observable
        // will be immediately completed. It can happen when no view components will have 'isDirty' API.
        const isDirtySubject = new ReplaySubject(1);
        let isDirtyView = false;
        if (this.isUserInteractionDetected) {
            this.callRuntimeComponentsApi('isDirty')
                .pipe(tap((result) => (isDirtyView = result.some(({ data }) => data))))
                .subscribe({
                complete: () => isDirtySubject.next(isDirtyView)
            });
        }
        else {
            isDirtySubject.next(isDirtyView);
        }
        return isDirtySubject.asObservable().pipe(take(1));
    }
    triggerViewValidation(isValid) {
        if (isValid) {
            isValid = Array.from(this.viewComponentStates.values())
                .filter((viewComponent) => has(viewComponent.publicState, 'isValid'))
                .every((viewComponent) => viewComponent.publicState.isValid);
        }
        if (this.evaluationData.view.isValid !== isValid) {
            this.evaluationData.view.isValid = isValid;
            let dependentViewComponentStates;
            if (this.dependentOnViewIsValidPropViewComponentGuids) {
                dependentViewComponentStates = this.dependentOnViewIsValidPropViewComponentGuids.map((guid) => this.viewComponentStates.get(guid));
            }
            else {
                dependentViewComponentStates = this.getDependentViewComponentStates((expression) => expression.hasViewIsValidToken());
                this.dependentOnViewIsValidPropViewComponentGuids = dependentViewComponentStates.map((state) => state.guid);
            }
            dependentViewComponentStates.forEach((viewComponentState) => {
                this.evaluateComponentExpressions(viewComponentState, (expression) => expression.hasViewIsValidToken());
            });
            // update view component configs in next javascript event loop, to avoid
            // 'ExpressionChangedAfterItHasBeenCheckedError' error in components,
            // dependent on the view isValid property e.g Action button disabled property
            asyncScheduler.schedule(() => {
                dependentViewComponentStates.forEach(this.updateViewComponentConfig.bind(this));
            });
        }
    }
    // return nearest parent view component with UI representation
    getParentViewComponent(viewComponentState) {
        let currentViewComponentState = viewComponentState;
        while (currentViewComponentState.isDataViewComponent) {
            currentViewComponentState = this.viewComponentStates.get(currentViewComponentState.parentViewComponentGuid);
        }
        return currentViewComponentState;
    }
    // return all view components which depend on particular expression
    getDependentViewComponentStates(expressionFilterFn) {
        return Array.from(this.viewComponentStates.values()).filter((viewComponentState) => {
            const isDependentComponentState = some(viewComponentState.expressions, expressionFilterFn);
            const isDependentEventState = some(viewComponentState.eventStates, (eventState) => some(eventState, (event) => some(event.expressions, expressionFilterFn)));
            return isDependentComponentState || isDependentEventState;
        });
    }
    // pass new view component config to the @Component
    updateViewComponentConfig(viewComponentState) {
        // finally update config
        viewComponentState.config$.next(this.buildComponentConfig(viewComponentState));
    }
    // build view component config based on configState and child data view component
    buildComponentConfig(viewComponentState) {
        const viewComponentConfigState = Object.assign({}, viewComponentState.configState);
        // build child data component states
        this.buildComponentChildDataConfig(viewComponentState, viewComponentConfigState);
        return viewComponentConfigState;
    }
    // recursively build view component config based on data view components
    buildComponentChildDataConfig(viewComponentState, viewComponentChildConfig = {}) {
        // find all child data view components
        const dataViewComponentChildStates = viewComponentState.childViewComponentGuids
            .map((viewComponentGuid) => this.viewComponentStates.get(viewComponentGuid))
            .filter((currentViewComponentState) => Boolean(currentViewComponentState))
            .filter((currentViewComponentState) => currentViewComponentState.isDataViewComponent);
        // group data view components on config property name
        const dataViewComponentChildStateGroups = groupBy(dataViewComponentChildStates, (dataViewComponentState) => dataViewComponentState.configPropertyName);
        // store each data view component config under corresponding config property name
        Object.keys(dataViewComponentChildStateGroups).forEach((configPropertyName) => {
            viewComponentChildConfig[configPropertyName] = dataViewComponentChildStateGroups[configPropertyName].map((dataViewComponentStateChild) => {
                const dataViewComponentChildState = Object.assign({}, dataViewComponentStateChild.configState);
                // recursively build data view component config
                this.buildComponentChildDataConfig(dataViewComponentStateChild, dataViewComponentChildState);
                return dataViewComponentChildState;
            });
        });
    }
    // update action view component shared state
    // re-evaluate all dependent action view components
    onViewComponentActionOutputChanged(componentGuid, actionGuid, viewActionOutput) {
        const viewComponentState = this.viewComponentStates.get(componentGuid);
        if (viewComponentState) {
            const actionState = viewComponentState.eventStates[VIEW_COMPONENT_DEFAULT_EVENT_NAME].find((currentAction) => {
                return currentAction.guid === actionGuid;
            });
            actionState.publicState.output = viewActionOutput;
            this.updateEvaluationData(viewComponentState);
            this.evaluateDependentProperties(viewComponentState, actionGuid, 'output');
        }
    }
    evaluateViewOutputParams() {
        return this.viewDefinition.outputParams.reduce((result, outputParam) => {
            result[outputParam.name] = this.rxExpressionEvaluatorService.tryEvaluate(outputParam.source, this.evaluationData);
            return result;
        }, {});
    }
    processViewDefinition(viewDefinition) {
        this.viewDefinition = this.rxObjectUtilsService.cloneDeep(viewDefinition);
        this.rxViewDefinitionAdapterService.preProcessViewDefinition(this.viewDefinition);
        const adapters$ = this.rxRuntimeViewUtilsService.runAdaptersForComponents(this.viewDefinition);
        return combineLatest(adapters$).pipe(switchMapTo(EMPTY), tap({
            complete: () => {
                this.rxViewDefinitionAdapterService.postProcessViewDefinition(this.viewDefinition);
                this.rxViewDefinitionParserService
                    .getComponents(this.viewDefinition)
                    .forEach(this.processComponentDefinition.bind(this));
                // evaluate expressions with keyword tokens
                this.viewComponentStates.forEach((viewComponent) => {
                    this.evaluateComponentExpressions(viewComponent, (componentExpression) => componentExpression.hasKeywordTokens());
                });
                // evaluate expressions without tokens
                this.viewComponentStates.forEach((viewComponent) => {
                    this.evaluateComponentExpressions(viewComponent, (componentExpression) => !componentExpression.hasTokens());
                });
                // evaluate expressions with view tokens
                this.viewComponentStates.forEach((viewComponent) => {
                    this.evaluateComponentExpressions(viewComponent, (componentExpression) => componentExpression.hasViewTokens());
                });
                // evaluate expressions with component tokens
                this.viewComponentStates.forEach((viewComponent) => {
                    this.evaluateComponentExpressions(viewComponent, (componentExpression) => componentExpression.hasComponentTokens());
                });
                // update all component configs
                this.viewComponentStates.forEach((viewComponentState) => {
                    this.updateViewComponentConfig(viewComponentState);
                });
            }
        }));
    }
    processComponentDefinition(componentDefinitionItem) {
        if (!componentDefinitionItem.parentComponentDefinition) {
            // process root component definition
            const configuredParamNames = _map(componentDefinitionItem.componentDefinition.inputParams, 'name');
            const passedParamNames = keys(this.configuration.inputParams);
            const onlyPositionalParams = passedParamNames.length > 0 && every(passedParamNames, (inputParamName) => /^\$[0-9]+\$$/.test(inputParamName));
            if (onlyPositionalParams && intersection(configuredParamNames, passedParamNames).length === 0) {
                forEach(passedParamNames, (inputParamName) => {
                    const paramIndex = Number(inputParamName.match(/^\$([0-9]+)\$$/)[1]);
                    const definitionParamName = get(componentDefinitionItem.componentDefinition, `inputParams[${paramIndex}].name`);
                    this.evaluationData.view.inputParams[definitionParamName] = this.configuration.inputParams[inputParamName];
                });
            }
            else {
                forEach(configuredParamNames, (inputParamName) => {
                    this.evaluationData.view.inputParams[inputParamName] = this.configuration.inputParams[inputParamName];
                });
            }
        }
        else {
            const componentDefinition = componentDefinitionItem.componentDefinition;
            const viewComponentState = this.buildViewComponentState(componentDefinitionItem);
            if (viewComponentState) {
                this.viewComponentStates.set(componentDefinition.guid, viewComponentState);
            }
        }
    }
    // generate view component state based on component definition
    buildViewComponentState(componentDefinitionItem) {
        const componentDefinition = componentDefinitionItem.componentDefinition;
        const componentDescriptor = this.rxViewComponentRegistryService.get(componentDefinition.type);
        if (componentDescriptor) {
            const viewComponentState = {
                guid: componentDefinition.guid,
                type: componentDefinition.type,
                config$: new BehaviorSubject({}),
                expressions: [],
                eventStates: {
                    [VIEW_COMPONENT_DEFAULT_EVENT_NAME]: []
                },
                configState: {},
                publicState: {},
                isDataViewComponent: false,
                configPropertyName: null,
                parentViewComponentGuid: componentDefinitionItem.parentComponentDefinition.guid,
                childViewComponentGuids: [],
                dependentViewComponentsMap: new Map(),
                componentDescriptor
            };
            if (this.isDataViewComponentDefinition(componentDescriptor)) {
                viewComponentState.isDataViewComponent = true;
                viewComponentState.configPropertyName = componentDescriptor.configPropertyName;
            }
            forOwn(componentDefinition.propertiesByName, (propertyValue, propertyName) => {
                const viewComponentPropertyDescriptor = find(componentDescriptor.properties, (descriptor) => propertyName === descriptor.name);
                const isExpressionEvaluationEnabled = viewComponentPropertyDescriptor && viewComponentPropertyDescriptor.enableExpressionEvaluation;
                // initialize view component expressions
                if (isExpressionEvaluationEnabled) {
                    // create expression for property
                    viewComponentState.expressions.push(new ComponentExpression(propertyName, propertyValue, this.rxExpressionEvaluatorService, viewComponentPropertyDescriptor.evaluatorService));
                }
                // update view component config state object
                this.updateComponentConfigProperty(propertyName, isExpressionEvaluationEnabled ? null : propertyValue, viewComponentState);
            });
            // add initial view component state to evaluationData
            this.updateEvaluationData(viewComponentState);
            if (this.isContainerComponentDefinition(componentDefinition)) {
                // set up view component events
                componentDefinition.componentDefinitions
                    .filter((currentComponentDefinition) => currentComponentDefinition.type === RxViewComponentType.Action)
                    .forEach((actionComponentDefinition) => {
                    const actionState = this.buildViewComponentActionState(actionComponentDefinition);
                    if (actionState) {
                        viewComponentState.eventStates[VIEW_COMPONENT_DEFAULT_EVENT_NAME].push(actionState);
                    }
                });
                // sort actions in correct order
                viewComponentState.eventStates[VIEW_COMPONENT_DEFAULT_EVENT_NAME] = sortBy(viewComponentState.eventStates[VIEW_COMPONENT_DEFAULT_EVENT_NAME], 'index');
                // set up child view component guids
                viewComponentState.childViewComponentGuids = componentDefinition.componentDefinitions
                    .filter((currentComponentDefinition) => currentComponentDefinition.type !== RxViewComponentType.Action)
                    .map((currentComponentDefinition) => currentComponentDefinition.guid);
            }
            return viewComponentState;
        }
        else if (componentDefinition.type !== RxViewComponentType.Action) {
            this.rxLogService.warning(`Cannot initialize view component. View Component Descriptor for ${componentDefinition.type} not found.`);
        }
    }
    // generate action view component state
    buildViewComponentActionState(actionComponentDefinition) {
        const actionDescriptor = this.rxViewActionRegistryService.get(actionComponentDefinition.propertiesByName.name);
        if (actionDescriptor) {
            const actionState = {
                guid: actionComponentDefinition.guid,
                name: actionComponentDefinition.propertiesByName.name,
                index: toNumber(actionComponentDefinition.propertiesByName.index) || 0,
                config: {},
                publicState: {},
                expressions: []
            };
            Object.keys(actionComponentDefinition.propertiesByName || {})
                .filter((parameterName) => parameterName !== 'name')
                .map((parameterName) => {
                const actionPropertyDescriptor = (actionDescriptor.parameters || []).find((descriptor) => parameterName === descriptor.name);
                const isExpressionEvaluationEnabled = actionPropertyDescriptor && actionPropertyDescriptor.enableExpressionEvaluation;
                // initialize action view component expressions
                if (isExpressionEvaluationEnabled) {
                    // create expression for property
                    this.initializeActionExpressionForProperty(actionState, actionPropertyDescriptor.evaluatorService, parameterName, actionComponentDefinition.propertiesByName[parameterName]);
                }
                // add initial action view component state to evaluationData
                this.updateActionConfigProperty(parameterName, isExpressionEvaluationEnabled ? null : actionComponentDefinition.propertiesByName[parameterName], actionState);
            });
            return actionState;
        }
    }
    initializeActionExpressionForProperty(actionState, evaluatorService, propertyName, propertyValue) {
        if (isObject(propertyValue)) {
            forIn(propertyValue, (value, name) => {
                this.initializeActionExpressionForProperty(actionState, evaluatorService, `${propertyName}.${name}`, value);
            });
        }
        else {
            actionState.expressions.push(new ComponentExpression(propertyName, propertyValue, this.rxExpressionEvaluatorService, evaluatorService));
        }
    }
    callRuntimeComponentsApi(methodName, ...args) {
        const resultSubject = new ReplaySubject(1);
        const errors = [];
        const apiCallResults = Array.from(this.viewComponentStates.values())
            .filter((viewComponent) => Boolean(viewComponent.publicState.api && isFunction(viewComponent.publicState.api[methodName])))
            .map((viewComponent) => {
            let result = viewComponent.publicState.api[methodName].apply(null, args);
            if (result && result.then) {
                result = from(result);
            }
            else if (!(result instanceof Observable)) {
                result = of(result);
            }
            return result.pipe(take(1), map((res) => ({
                guid: viewComponent.guid,
                data: res
            })), tap({
                error: (error) => errors.push(error)
            }), 
            // catch errors from each view component api call to allow to successfully finish other api calls.
            catchError(() => EMPTY));
        });
        combineLatest(apiCallResults).subscribe({
            next: (results) => resultSubject.next(results),
            complete: () => (isEmpty(errors) ? resultSubject.complete() : resultSubject.error(errors))
        });
        return resultSubject.asObservable();
    }
    evaluateComponentExpressions(viewComponent, expressionFilterFunc) {
        // update component expressions
        viewComponent.expressions.filter(expressionFilterFunc).forEach((componentExpression) => {
            this.updateComponentConfigProperty(componentExpression.propertyName, this.evaluateExpression(componentExpression), viewComponent);
        });
        this.updateEvaluationData(viewComponent);
        // update event expressions
        Object.keys(viewComponent.eventStates).forEach((eventName) => {
            viewComponent.eventStates[eventName].forEach((actionState) => {
                actionState.expressions.filter(expressionFilterFunc).forEach((componentExpression) => {
                    this.updateActionConfigProperty(componentExpression.propertyName, this.evaluateExpression(componentExpression), actionState);
                    this.updateEvaluationData(viewComponent);
                });
            });
        });
    }
    evaluateDependentProperties(viewComponent, guid, propertyName) {
        this.evaluateComponentExpressions(viewComponent, (componentExpression) => componentExpression.hasDependency(guid, propertyName));
    }
    evaluateExpression(componentExpression) {
        let evaluatedValue;
        try {
            evaluatedValue = componentExpression.evaluate(this.evaluationData);
        }
        catch (e) {
            evaluatedValue = null;
            this.rxNotificationService.addErrorMessage(e.message, '');
        }
        return evaluatedValue;
    }
    // update view component config property based on property descriptor
    updateComponentConfigProperty(propertyName, propertyValue, viewComponent) {
        const viewComponentDescriptor = this.rxViewComponentRegistryService.get(viewComponent.type);
        const viewComponentPropertyDescriptor = find(viewComponentDescriptor.properties, {
            name: propertyName
        });
        viewComponent.configState[propertyName] = this.processPropertyValue(propertyValue, viewComponentPropertyDescriptor);
    }
    // update action view component config property based on property descriptor
    updateActionConfigProperty(propertyName, propertyValue, actionComponent) {
        const viewActionDescriptor = this.rxViewActionRegistryService.get(actionComponent.name);
        let viewActionParameterDescriptor = find(viewActionDescriptor.parameters, {
            name: propertyName
        });
        if (!viewActionParameterDescriptor && includes(propertyName, '.')) {
            const primaryPropertyName = propertyName.split('.')[0];
            viewActionParameterDescriptor = find(viewActionDescriptor.parameters, { name: primaryPropertyName });
        }
        set(actionComponent.config, propertyName, this.processPropertyValue(propertyValue, viewActionParameterDescriptor));
    }
    // sync component data with expression data
    updateEvaluationData(viewComponent) {
        // update component data
        this.evaluationData.view.components[viewComponent.guid] = Object.assign(Object.assign({}, viewComponent.configState), viewComponent.publicState);
        // update component actions data
        Object.keys(viewComponent.eventStates).forEach((eventName) => {
            viewComponent.eventStates[eventName].forEach((actionState) => {
                this.evaluationData.view.components[actionState.guid] = actionState.publicState;
            });
        });
    }
    // cast property value to the type defined in the descriptor
    processPropertyValue(propertyValue, propertyDescriptor) {
        if (propertyDescriptor && propertyDescriptor.type && !isNil(propertyValue)) {
            // try to cast property value to type defined in component descriptor
            if (propertyDescriptor.type === ViewComponentPropertyType.Boolean) {
                if (includes(['0', 'false'], propertyValue)) {
                    propertyValue = false;
                }
                else {
                    propertyValue = Boolean(propertyValue);
                }
            }
            else if (propertyDescriptor.type === ViewComponentPropertyType.Number) {
                propertyValue = Number(propertyValue);
                if (Number.isNaN(propertyValue)) {
                    propertyValue = null;
                }
            }
            else if (propertyDescriptor.type === ViewComponentPropertyType.String) {
                propertyValue = String(propertyValue);
            }
            else if ([ViewComponentPropertyType.Array, ViewComponentPropertyType.Object].includes(propertyDescriptor.type)) {
                propertyValue = this.rxJsonParserService.tryParseJson(propertyValue);
            }
        }
        return propertyValue;
    }
    isContainerComponentDefinition(componentDefinition) {
        return componentDefinition.componentDefinitions !== undefined;
    }
}
RuntimeViewModel.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewModel, deps: [{ token: i1.RxBundleService }, { token: i1.RxGlobalCacheService }, { token: i2.RxViewComponentRegistryService }, { token: i3.RxViewDefinitionAdapterService }, { token: i2.RxViewDefinitionParserService }, { token: i2.RxViewDefinitionService }, { token: i4.RxRuntimeViewUtilsService }, { token: i2.RxExpressionEvaluatorService }, { token: i1.RxNotificationService }, { token: i2.RxViewActionRegistryService }, { token: i1.RxLogService }, { token: i5.ViewComponentEventManager }, { token: i6.RxUtilityModalsService }, { token: i2.RxViewDefinitionCacheService }, { token: i7.RxObjectUtilsService }, { token: i7.RxJsonParserService }, { token: i1.RxCurrentUserService }], target: i0.ɵɵFactoryTarget.Injectable });
RuntimeViewModel.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewModel });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewModel, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.RxBundleService }, { type: i1.RxGlobalCacheService }, { type: i2.RxViewComponentRegistryService }, { type: i3.RxViewDefinitionAdapterService }, { type: i2.RxViewDefinitionParserService }, { type: i2.RxViewDefinitionService }, { type: i4.RxRuntimeViewUtilsService }, { type: i2.RxExpressionEvaluatorService }, { type: i1.RxNotificationService }, { type: i2.RxViewActionRegistryService }, { type: i1.RxLogService }, { type: i5.ViewComponentEventManager }, { type: i6.RxUtilityModalsService }, { type: i2.RxViewDefinitionCacheService }, { type: i7.RxObjectUtilsService }, { type: i7.RxJsonParserService }, { type: i1.RxCurrentUserService }]; } });
//# sourceMappingURL=runtime-view.model.js.map