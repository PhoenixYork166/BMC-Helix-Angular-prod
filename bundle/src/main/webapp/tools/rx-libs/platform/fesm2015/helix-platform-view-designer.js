import * as i0 from '@angular/core';
import { Injectable, Component, Input, EventEmitter, Output, NgModule, InjectionToken, ViewContainerRef, Inject, ViewChild, ChangeDetectionStrategy, SkipSelf, Optional, InjectFlags, ElementRef, ViewChildren } from '@angular/core';
import * as i12 from '@helix/platform/association/api';
import * as i4$2 from '@helix/platform/named-list/api';
import { RxNamedListDefinitionCacheService } from '@helix/platform/named-list/api';
import * as i13 from '@helix/platform/process/api';
import * as i11 from '@helix/platform/record/api';
import { RX_RECORD_DEFINITION, RxRecordDefinitionCacheService } from '@helix/platform/record/api';
import * as i3 from '@helix/platform/shared/api';
import { ExpressionParserToken, RxExpressionConfigurator, ExpressionOperatorRowsByGroup, ExpressionOperatorGroup, Tooltip, RX_APPLICATION } from '@helix/platform/shared/api';
import * as i3$1 from '@helix/platform/shared/components';
import { RxRevertCustomizationModule, SelectFormControlComponent, TextFormControlComponent, TextareaFormControlComponent, RxDefinitionPickerComponent, RxDefinitionPickerType, TagsFormControlComponent, RxPermissionEditorComponent, ListFormControlComponent, RX_VALIDATION_FORM_CONTROL, RX_REVERT_CUSTOMIZATION, RX_EXPRESSION_EDITOR, ExpressionFormControlComponent, ExpressionEditorModule, RxFormBuilderModule, ValueAccessor, RxPermissionEditorModule, CustomizationOptionsModule, InspectorWidgetBase, OptionalExpressionInspectorControlComponent, FormControlsModule, RxDesignerHeaderModule, RxInspectorModule } from '@helix/platform/shared/components';
import * as i5$1 from '@helix/platform/ui-kit';
import { RX_MODAL, ValidationIssueType, RxModalClass, RxBladeModule, RxValidationIssuesModule, RxJsonViewerModule } from '@helix/platform/ui-kit';
import * as i5 from '@helix/platform/view/api';
import { RxViewLayout, RxViewComponentType, RX_AVAILABLE_ON_DEVICES_PROP_NAME, RX_STYLES_PROP_NAME, RX_EXPRESSION_FUNCTIONS, RxExpressionHelperService, RxDefaultExpressionEvaluatorService, RxViewComponentRegistryService, RX_VIEW_DEFINITION, BwfViewComponentType, ViewDefinitionType, RxViewActionRegistryService, OpenViewActionModalSize, RxDevice, RX_HIDDEN_PROP_NAME, RX_DISABLED_PROP_NAME, ViewComponentPropertyType, ViewActionDesignModule } from '@helix/platform/view/api';
import * as i6 from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { includes, some, uniq, map, flow, compact, isEmpty, omit, has, reject, sortBy, get, isFinite as isFinite$1, flatten, filter as filter$1, isFunction, transform, isUndefined, isObject, isPlainObject, isBoolean, isNumber, isArray, isEqual, find, take as take$1, findIndex, throttle, isString, mergeWith, reduce, groupBy, lowerCase, pick, toPath, set, cloneDeep, values, chain, pull, noop, without, castArray, merge as merge$1, every, last, difference, forEach, omitBy } from 'lodash';
import { ReplaySubject, Subject, of, merge, combineLatest, EMPTY, asapScheduler, BehaviorSubject, throwError, noop as noop$1 } from 'rxjs';
import { filter, map as map$1, shareReplay, switchMap, take, withLatestFrom, distinctUntilChanged, bufferToggle, takeUntil, switchMapTo, concatMapTo, skip, first, tap, concatMap, debounceTime, startWith, skipWhile, mapTo, publishReplay, refCount, mergeMap, catchError } from 'rxjs/operators';
import * as i2$1 from '@helix/platform/utils';
import * as i1 from '@ngrx/effects';
import { ofType, Actions, Effect, EffectsModule } from '@ngrx/effects';
import * as i2 from '@ngrx/store';
import { createAction, props, createFeatureSelector, createSelector, createReducer, on, StoreModule } from '@ngrx/store';
import * as i3$2 from '@angular/forms';
import { FormControl, ReactiveFormsModule, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i4 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i4$1 from '@angular/cdk/drag-drop';
import { CdkDropList, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import * as i3$3 from '@bmc-ux/adapt-angular';
import { AdaptAccordionModule, AdaptRxSearchModule, DismissReasons, AdaptButtonModule, AdaptModalModule, AdaptRxTextfieldModule, TreeWrap, toNumber, AdaptAccordionTabComponent, AdaptEmptyStateModule, AdaptIconModule, AdaptPopoverModule, AdaptTreeModule, AdaptCodeViewerModule, AdaptAlertModule, AdaptTabsModule } from '@bmc-ux/adapt-angular';
import { AdaptTextFieldModule } from '@bmc-ux/obsolete';
import { __decorate, __metadata } from 'tslib';

function findParentComponentModel(guid, components) {
    const currentComponent = components[guid];
    return components[currentComponent === null || currentComponent === void 0 ? void 0 : currentComponent.parentGuid];
}
function findAllParentComponentGuids(guid, components) {
    const result = [guid];
    let parentModel = findParentComponentModel(guid, components);
    let nextGuid = parentModel ? parentModel.guid : null;
    while (nextGuid) {
        result.unshift(nextGuid);
        parentModel = findParentComponentModel(nextGuid, components);
        nextGuid = parentModel ? parentModel.guid : null;
    }
    return result;
}
function findParentComponentByType(guid, componentType, components) {
    let result;
    let parentModel = findParentComponentModel(guid, components);
    let nextGuid = parentModel ? parentModel.guid : null;
    while (nextGuid) {
        if (parentModel.type === componentType) {
            result = parentModel;
            nextGuid = null;
        }
        else {
            parentModel = findParentComponentModel(nextGuid, components);
            nextGuid = parentModel ? parentModel.guid : null;
        }
    }
    return result;
}
function isComponentContainsChild(guid, componentModel) {
    if (componentModel.layout) {
        const hasChild = RxViewLayout.hasChild(componentModel.layout, guid);
        if (hasChild) {
            return true;
        }
    }
    if (componentModel.childDataComponentGuids) {
        return includes(componentModel.childDataComponentGuids, guid);
    }
    else {
        return false;
    }
}
function addChildComponent(componentModel, guid, outletName, insertIndex, columnIndex = 0, columnSpan = 0) {
    const newComponentModel = Object.assign({}, componentModel);
    newComponentModel.layout = {
        outlets: componentModel.layout.outlets.map((outlet) => {
            if (outlet.name === outletName) {
                const columns = [...outlet.columns];
                insertIndex = isFinite(insertIndex) ? insertIndex : columns[columnIndex].children.length;
                if (!columns[columnIndex]) {
                    columns[columnIndex] = {
                        children: []
                    };
                    if (columnSpan) {
                        columns[columnIndex].span = columnSpan;
                    }
                }
                // todo handle drop in non-first column
                columns[columnIndex] = {
                    children: [
                        ...columns[columnIndex].children.slice(0, insertIndex),
                        guid,
                        ...columns[columnIndex].children.slice(insertIndex)
                    ],
                    span: columns[columnIndex].span
                };
                return Object.assign(Object.assign({}, outlet), { columns });
            }
            else {
                return outlet;
            }
        })
    };
    return newComponentModel;
}
function removeChildComponent(componentGuidToRemove, parentComponentModel) {
    const newParentComponentModel = Object.assign({}, parentComponentModel);
    if (some(newParentComponentModel.childDataComponentGuids, (guid) => componentGuidToRemove === guid)) {
        newParentComponentModel.childDataComponentGuids = newParentComponentModel.childDataComponentGuids.filter((guid) => guid !== componentGuidToRemove);
    }
    if (parentComponentModel.layout && RxViewLayout.hasChild(parentComponentModel.layout, componentGuidToRemove)) {
        newParentComponentModel.layout = RxViewLayout.removeChildFromLayout(parentComponentModel.layout, componentGuidToRemove);
    }
    return newParentComponentModel;
}
function getChildGuidsFromModel(model) {
    const guids = [];
    if (model.childDataComponentGuids) {
        guids.push(...model.childDataComponentGuids);
    }
    if (model.layout) {
        guids.push(...RxViewLayout.getViewLayoutChildGuids(model.layout));
    }
    return uniq(guids);
}
function getAllChildGuids(parentComponent, componentModelsState) {
    const guids = getChildGuidsFromModel(parentComponent);
    return guids.reduce((result, guid) => {
        result.push(...getAllChildGuids(componentModelsState[guid], componentModelsState));
        return result;
    }, guids);
}

class RxViewDataDictionaryBuilderService {
    constructor() {
        this.componentIcon = 'd-icon-file_o';
        this.componentPropertyIcon = 'd-icon-file_o_gear';
        this.settablePropertiesIcon = 'd-icon-arrow_right_square_input';
        this.actionOutputIcon = 'd-icon-arrow_chart';
    }
    getActionOutputDataDictionaryBranch(actionName, dataDictionary) {
        return {
            label: actionName,
            icon: 'd-icon-arrow_chart',
            children: map(dataDictionary, (dataDictionaryBranch) => this.buildDataDictionaryBranch(dataDictionaryBranch, this.actionOutputIcon))
        };
    }
    getComponentCommonDataDictionaryBranch(branch) {
        return Object.assign(Object.assign({}, branch), { icon: this.componentIcon, children: flow((children) => map(children, (child) => this.buildDataDictionaryBranch(child, this.componentPropertyIcon)), compact)(branch.children) });
    }
    getSettablePropertiesDataDictionary(branches) {
        return map(branches, (branch) => this.buildDataDictionaryBranch(branch, this.settablePropertiesIcon));
    }
    buildDataDictionaryBranch(branch, icon) {
        const node = Object.assign({}, branch);
        if (branch.expression) {
            node.icon = icon;
        }
        if (branch.children) {
            node.children = flow((children) => map(children, (child) => this.buildDataDictionaryBranch(child, icon)), compact)(branch.children);
        }
        return node;
    }
}
RxViewDataDictionaryBuilderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDataDictionaryBuilderService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxViewDataDictionaryBuilderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDataDictionaryBuilderService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDataDictionaryBuilderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class RxViewDataDictionaryStoreService {
    constructor() {
        this.componentsCommon = null;
        this.componentsCommonSubject = new ReplaySubject(1);
        this.componentsCommon$ = this.componentsCommonSubject.asObservable();
        this.viewCommon = null;
        this.viewCommonSubject = new ReplaySubject(1);
        this.viewCommon$ = this.viewCommonSubject.asObservable();
        this.actionsOutput = [];
        this.actionsOutputSubject = new ReplaySubject(1);
        this.actionsOutput$ = this.actionsOutputSubject.asObservable();
        this.settableProperties = null;
        this.settablePropertiesSubject = new ReplaySubject(1);
        this.settableProperties$ = this.settablePropertiesSubject.asObservable();
    }
    setCommonDataDictionaryBranch(guid, dataDictionaryBranch) {
        this.setComponentCommon(isEmpty(dataDictionaryBranch)
            ? omit(this.componentsCommon, [guid])
            : Object.assign(Object.assign({}, this.componentsCommon), { [guid]: dataDictionaryBranch }));
    }
    setViewCommonDataDictionaryBranch(dataDictionaryBranch) {
        this.setViewCommon(dataDictionaryBranch);
    }
    setSettablePropertiesDataDictionary(items) {
        this.setSettableProperties(Object.assign(Object.assign({}, this.settableProperties), items.reduce((result, { guid, componentName, dataDictionary }) => {
            result[guid] = { componentName, dataDictionary };
            return result;
        }, {})));
    }
    removeDataDictionaryForComponents(guids) {
        if (guids.some((guid) => has(this.componentsCommon, guid))) {
            this.setComponentCommon(omit(this.componentsCommon, guids));
        }
        if (guids.some((guid) => has(this.settableProperties, guid))) {
            this.setSettableProperties(omit(this.settableProperties, guids));
        }
    }
    setActionOutputDataDictionaryBranch(guid, index, dataDictionaryBranch) {
        this.setActionsOutput(flow((actions) => [
            ...reject(actions, { guid }),
            { guid, index, dataDictionaryBranch }
        ], (actions) => sortBy(actions, 'index'))(this.actionsOutput));
    }
    updateActionOutputDataDictionaryBranchOrder(actions) {
        this.setActionsOutput(flow((actionsOutput) => map(actionsOutput, (actionOutput) => (Object.assign(Object.assign({}, actionOutput), { index: actions[actionOutput.guid] }))), (actionsOutput) => sortBy(actionsOutput, 'index'))(this.actionsOutput));
    }
    removeActionOutputDataDictionaryBranch(guid) {
        this.setActionsOutput(reject(this.actionsOutput, { guid }));
    }
    removeAllActionOutputDataDictionaryBranches() {
        this.setActionsOutput(null);
    }
    clear() {
        this.setComponentCommon(null);
        this.setViewCommon(null);
        this.setSettableProperties(null);
        this.setActionsOutput([]);
    }
    setComponentCommon(state) {
        this.componentsCommon = state;
        this.componentsCommonSubject.next(this.componentsCommon);
    }
    setViewCommon(state) {
        this.viewCommon = state;
        this.viewCommonSubject.next(this.viewCommon);
    }
    setActionsOutput(state) {
        this.actionsOutput = state;
        this.actionsOutputSubject.next(this.actionsOutput);
    }
    setSettableProperties(state) {
        this.settableProperties = state;
        this.settablePropertiesSubject.next(this.settableProperties);
    }
}
RxViewDataDictionaryStoreService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDataDictionaryStoreService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxViewDataDictionaryStoreService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDataDictionaryStoreService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDataDictionaryStoreService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class RxViewDesignerInspectorService {
    constructor() {
        this.onChangeSubject = new Subject();
        this.configs = new Map();
        this.onChange$ = this.onChangeSubject.asObservable();
    }
    clear() {
        this.configs.clear();
    }
    set(guid, config) {
        this.configs.set(guid, config);
        this.onChangeSubject.next({ guid, config });
    }
    get(guid) {
        return this.configs.get(guid);
    }
    delete(guid) {
        this.onChangeSubject.next({ guid, config: null });
        this.configs.delete(guid);
    }
}
RxViewDesignerInspectorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDesignerInspectorService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxViewDesignerInspectorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDesignerInspectorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDesignerInspectorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

const componentsRemoved = createAction('[View Component] Components Removed', props());
const initializeComponentModels = createAction('[View Component] Initialize Component Models', props());
const initializeDataComponentModels = createAction('[View Component] Initialize Data Component Models', props());
const setValidationIssues = createAction('[View Component] Set Validation Issues', props());
const setExpressionValidationIssues = createAction('[View Component] Set Expression Validation Issues', props());
const setComponentData = createAction('[View Component] Set Component Properties', props());
const setChildComponents = createAction('[View Component] Set Child Components', props());
const setBreadcrumbs = createAction('[View Component] Set Breadcrumbs', props());
const selectComponent = createAction('[View Component] Select Component', props());
const setComponentLayout = createAction('[View Component] Set Component Layout', props());
const moveComponent = createAction('[View Component] Move Component', props());
const insertComponent = createAction('[View Component] Insert Component', props());
const addNewComponents = createAction('[View Component] Add New Components', props());
const updateComponentModel = createAction('[View Component] Update Component Model', props());
const removeComponents = createAction('[View Component] Remove Components', props());

/**
 * Public class for dispatching actions
 * Protects ngrx store$ service from selecting data from the store
 */
class ViewDesignerDispatcher {
    constructor(store$) {
        this.store$ = store$;
    }
    dispatch(action) {
        this.store$.dispatch(action);
    }
}
ViewDesignerDispatcher.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDesignerDispatcher, deps: [{ token: i2.Store }], target: i0.ɵɵFactoryTarget.Injectable });
ViewDesignerDispatcher.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDesignerDispatcher, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDesignerDispatcher, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i2.Store }]; } });

const viewDefinitionSaveSuccess = createAction('[View Designer] View Definition Save Success', props());
const viewDefinitionSaveError = createAction('[View Designer] View Definition Save Error');
const viewDefinitionLoadSuccess = createAction('[View Designer] View Definition Load Success', props());
const viewDefinitionLoadError = createAction('[View Designer] View Definition Load Error');
const setGeneratedViewDefinition = createAction('[View Designer] Set Generated View Definition', props());
const loadViewDefinition = createAction('[View Designer] Load View Definition', props());
const friendlyBundleNameLoadSuccess = createAction('[View Designer] Bundle Friendly Name Load Success', props());
const friendlyBundleNameLoadError = createAction('[View Designer] Bundle Friendly Name Load Error', props());
const viewModelsInitialized = createAction('[View Designer] View Models Initialized');
const viewModelsUpdatedAfterSave = createAction('[View Designer] View Models Updated After Save');
const updateViewModel = createAction('[View Designer] Update View Model', props());
const setViewModel = createAction('[View Designer] Set View Model', props());
const selectInspectorTab = createAction('[View Designer] Select Inspector Tab', props());
const saveViewDefinition = createAction('[View Designer] Save View Definition', props());
const runPreview = createAction('[View Designer] Run Preview');
const loadFriendlyBundleName = createAction('[View Designer] Load Bundle Friendly Name');
const generateViewDefinition = createAction('[View Designer] Generate View Definition', props());
const clearCanvas = createAction('[View Designer] Clear Canvas');
const initViewDesigner = createAction('[View Designer] Init', props());
const destroyViewDesigner = createAction('[View Designer] Destroy');

const viewDesignerState = createFeatureSelector('viewDesigner');
const viewDesignerModelsSelector = createSelector(viewDesignerState, (viewDesigner) => viewDesigner.model);
const viewModelSelector = createSelector(viewDesignerModelsSelector, (models) => models.viewDesignModel);
const viewModelPropertyValueSelector = createSelector(viewModelSelector, (viewModel, { propertyName }) => get(viewModel, propertyName));
const viewComponentModelsSelector = createSelector(viewDesignerModelsSelector, (models) => models.viewComponentDesignModels);
const firstViewComponentModelTypeSelector = createSelector(viewDesignerModelsSelector, (models) => { var _a; return (_a = Object.values(models.viewComponentDesignModels)[0]) === null || _a === void 0 ? void 0 : _a.type; });
const viewComponentModelSelector = createSelector(viewComponentModelsSelector, (componentModels, { guid }) => componentModels[guid]);
const parentComponentModelGuidSelector = createSelector(viewComponentModelSelector, (componentModel) => componentModel === null || componentModel === void 0 ? void 0 : componentModel.parentGuid);
const componentPropertiesByNameSelector = createSelector(viewComponentModelsSelector, (componentModels, { guid, propertyName }) => componentModels[guid]
    ? propertyName
        ? get(componentModels[guid].propertiesByName, propertyName)
        : componentModels[guid].propertiesByName
    : null);
const componentTypeSelector = createSelector(viewComponentModelsSelector, (componentModels, { guid }) => componentModels[guid] ? componentModels[guid].type : null);
const componentLayoutSelector = createSelector(viewComponentModelSelector, (componentModel) => componentModel === null || componentModel === void 0 ? void 0 : componentModel.layout);
const componentPermissionsSelector = createSelector(viewComponentModelSelector, (componentModel) => componentModel === null || componentModel === void 0 ? void 0 : componentModel.permissions);
const childDataComponentGuidsSelector = createSelector(viewComponentModelSelector, (componentModel) => componentModel === null || componentModel === void 0 ? void 0 : componentModel.childDataComponentGuids);
const viewDesignerUISelector = createSelector(viewDesignerState, (viewDesigner) => viewDesigner.ui);
const isViewDefinitionLoadingSelector = createSelector(viewDesignerUISelector, (ui) => ui.isViewDefinitionLoading);
const bundleFriendlyNameSelector = createSelector(viewDesignerUISelector, (ui) => ui.friendlyBundleName);
const currentBundleIdSelector = createSelector(viewDesignerUISelector, (ui) => ui.currentBundleId);
const viewDefinitionSelector = createSelector(viewDesignerState, (viewDesigner) => viewDesigner.viewDefinition);
const validationIssuesSelector = createSelector(viewDesignerState, (viewDesigner) => viewDesigner.validation);
const breadcrumbsSelector = createSelector(viewDesignerState, (viewDesigner) => viewDesigner.breadcrumbs);
const selectedInspectorTabIdSelector = createSelector(viewDesignerUISelector, (ui) => ui.selectedInspectorTabId);
const selectedComponentGuidSelector = createSelector(viewDesignerUISelector, (ui) => ui.selectedComponentGuid);
const areViewModelsReadySelector = createSelector(viewDesignerUISelector, (ui) => ui.areViewModelsReady);
const selectedComponentPropsSelector = createSelector(selectedComponentGuidSelector, viewComponentModelsSelector, (selectedComponentGuid, componentModels) => {
    if (componentModels && selectedComponentGuid) {
        const componentDesignModel = componentModels[selectedComponentGuid];
        return componentDesignModel ? componentDesignModel.propertiesByName : null;
    }
    else {
        return null;
    }
});

class ViewDesignerFacade {
    constructor(dispatcher, store$, actions$, rxViewDesignerInspectorService, rxGuidService, rxViewDataDictionaryBuilderService, rxViewDataDictionaryService, rxOverlayService) {
        this.dispatcher = dispatcher;
        this.store$ = store$;
        this.actions$ = actions$;
        this.rxViewDesignerInspectorService = rxViewDesignerInspectorService;
        this.rxGuidService = rxGuidService;
        this.rxViewDataDictionaryBuilderService = rxViewDataDictionaryBuilderService;
        this.rxViewDataDictionaryService = rxViewDataDictionaryService;
        this.rxOverlayService = rxOverlayService;
        this.viewDefinition$ = this.store$.select(viewDefinitionSelector);
        this.validationIssues$ = this.store$.select(validationIssuesSelector);
        this.breadcrumbs$ = this.store$.select(breadcrumbsSelector);
        this.viewDesignerModelState$ = this.store$.select(viewDesignerModelsSelector);
        // filter operator is used to ignore the empty model when:
        // - the view definition has not been loaded for the first time, or
        // - the view definition is being saved.
        this.viewModel$ = this.store$.select(viewModelSelector).pipe(filter(Boolean));
        this.viewModelGuid$ = this.getViewPropertyValue('guid');
        this.viewComponentModels$ = this.store$.select(viewComponentModelsSelector);
        this.firstViewComponentModelType$ = this.store$.select(firstViewComponentModelTypeSelector);
        this.isExtensionView$ = this.getViewPropertyValue('targetViewDefinitionName').pipe(map$1(Boolean), shareReplay(1));
        this.isExtensionContainerSet$ = this.getViewPropertyValue('targetExtensionContainerGuid').pipe(map$1(Boolean), shareReplay(1));
        this.allComponentGuids$ = this.viewComponentModels$.pipe(map$1((models) => new Set(Object.keys(models))), shareReplay({
            refCount: true,
            bufferSize: 1
        }));
        this.selectedComponentGuid$ = this.store$.select(selectedComponentGuidSelector).pipe(switchMap((componentGuid) => this.viewModelGuid$.pipe(map$1((viewGuid) => (componentGuid === viewGuid ? null : componentGuid)), take(1))));
        this.selectedComponentProperties$ = this.selectedComponentGuid$.pipe(switchMap((guid) => (guid ? this.getComponentProperties(guid) : of(null))));
        this.isViewDefinitionLoading$ = this.store$.select(isViewDefinitionLoadingSelector);
        this.selectedInspectorTabId$ = this.store$.select(selectedInspectorTabIdSelector);
        this.bundleFriendlyName$ = this.store$.select(bundleFriendlyNameSelector);
        this.currentBundleId$ = this.store$.select(currentBundleIdSelector);
        this.viewInspectorLayout$ = merge(this.viewModelGuid$, this.rxViewDesignerInspectorService.onChange$.pipe(withLatestFrom(this.viewModelGuid$), filter(([config, guid]) => config.guid === guid), map$1(([config, guid]) => guid))).pipe(map$1((guid) => {
            const inspectorConfig = this.rxViewDesignerInspectorService.get(guid);
            return inspectorConfig ? inspectorConfig.inspectorSectionConfigs : null;
        }));
        this.selectedComponentInspectorLayout$ = merge(this.selectedComponentGuid$.pipe(distinctUntilChanged()), this.rxViewDesignerInspectorService.onChange$.pipe(withLatestFrom(this.selectedComponentGuid$), filter(([config, guid]) => config.guid === guid), map$1(([config, guid]) => guid))).pipe(map$1((guid) => {
            const inspectorConfig = this.rxViewDesignerInspectorService.get(guid);
            return inspectorConfig ? inspectorConfig.inspectorSectionConfigs : null;
        }));
        this.isViewReadOnly$ = combineLatest([
            this.viewModel$,
            this.currentBundleId$.pipe(switchMap((bundleId) => this.rxOverlayService.areNewDefinitionsAllowed(bundleId)))
        ]).pipe(map$1(([viewModel, areNewDefinitionsAllowed]) => !areNewDefinitionsAllowed || !this.rxOverlayService.isCustomizationEnabled('allowOverlay', viewModel)), distinctUntilChanged(), shareReplay(1));
        // Actions Stream
        this.viewDefinitionLoadError$ = this.actions$.pipe(ofType(viewDefinitionLoadError));
        this.viewDefinitionSaveSuccess$ = this.actions$.pipe(ofType(viewDefinitionSaveSuccess));
        this.initViewDesigner$ = this.actions$.pipe(ofType(initViewDesigner));
        this.destroyViewDesignerSubject = new Subject();
        this.destroyViewDesigner$ = this.destroyViewDesignerSubject.asObservable();
        this.viewModelsInitialized$ = this.actions$.pipe(ofType(viewModelsInitialized));
        this.areViewModelsReady$ = this.store$.select(areViewModelsReadySelector);
        this.viewCommonDataDictionaryState$ = this.rxViewDataDictionaryService.viewCommon$;
        this.componentsCommonDataDictionaryState$ = this.rxViewDataDictionaryService.componentsCommon$;
        this.actionsDataDictionaryState$ = this.rxViewDataDictionaryService.actionsOutput$;
        this.settablePropertiesDataDictionaryState$ = this.rxViewDataDictionaryService.settableProperties$;
        this.settablePropertiesDataDictionarySubject = new Subject();
        // for performance reasons grouping actions before sending them to store
        merge(this.settablePropertiesDataDictionarySubject.pipe(bufferToggle(this.initViewDesigner$, (v) => this.viewModelsInitialized$)), this.viewModelsInitialized$.pipe(switchMap(() => this.settablePropertiesDataDictionarySubject.pipe(map$1((data) => [data]), takeUntil(this.initViewDesigner$))))).subscribe((items) => {
            this.rxViewDataDictionaryService.setSettablePropertiesDataDictionary(items);
        });
    }
    getComponentModel(guid) {
        return this.store$.select(viewComponentModelSelector, { guid });
    }
    initViewDesigner(payload) {
        this.dispatcher.dispatch(initViewDesigner({
            payload
        }));
    }
    destroyViewDesigner() {
        this.destroyViewDesignerSubject.next();
        // trigger action after subject to allow store to be cleared after every component is destroyed
        // and its streams are completed
        this.dispatcher.dispatch(destroyViewDesigner());
    }
    selectComponent(guid) {
        this.dispatcher.dispatch(selectComponent({ guid }));
    }
    insertComponent(payload) {
        this.dispatcher.dispatch(insertComponent(Object.assign(Object.assign({ columnIndex: isFinite$1(payload.data && payload.data.columnIndex) ? payload.data.columnIndex : 0 }, payload), { data: {
                guid: payload.data.draggedViewComponentGuid,
                type: payload.data.draggedViewComponentDescriptor.type,
                initialPropertiesByName: payload.data.initialPropertiesByName
            } })));
    }
    selectInspectorTab(payload) {
        this.dispatcher.dispatch(selectInspectorTab(payload));
    }
    generateViewDefinition(payload) {
        this.dispatcher.dispatch(generateViewDefinition({ payload }));
    }
    updateComponentProperties(guid, componentProperties) {
        this.dispatcher.dispatch(updateComponentModel({
            payload: [
                {
                    guid,
                    partialModel: {
                        propertiesByName: componentProperties
                    }
                }
            ]
        }));
    }
    updateComponentModel(guid, payload) {
        this.dispatcher.dispatch(updateComponentModel({
            payload: [
                {
                    guid,
                    partialModel: payload
                }
            ]
        }));
    }
    getComponentProperties(guid) {
        return this.store$.select(componentPropertiesByNameSelector, { guid });
    }
    getComponentPropertyValue(guid, propertyName) {
        return this.store$.select(componentPropertiesByNameSelector, { guid, propertyName: propertyName }).pipe(withLatestFrom(this.getComponentModel(guid)), switchMap(([value, model]) => (model ? of(value) : EMPTY)));
    }
    getComponentType(guid) {
        return this.store$.select(componentTypeSelector, { guid });
    }
    getComponentPermissions(guid) {
        return this.store$.select(componentPermissionsSelector, { guid });
    }
    getComponentLayout(guid) {
        return this.store$.select(componentLayoutSelector, { guid });
    }
    updateSelectedComponentProperties(properties) {
        this.selectedComponentGuid$.pipe(take(1)).subscribe((guid) => {
            this.updateComponentProperties(guid, properties);
        });
    }
    saveViewDefinition(payload) {
        this.dispatcher.dispatch(saveViewDefinition({ payload }));
    }
    updateViewProperties(properties) {
        this.dispatcher.dispatch(updateViewModel({ payload: properties }));
    }
    setViewProperties(properties) {
        this.dispatcher.dispatch(setViewModel({ payload: properties }));
    }
    getViewPropertyValue(propertyName) {
        return this.store$.select(viewModelPropertyValueSelector, { propertyName }).pipe(switchMapTo(this.viewModel$.pipe(map$1((model) => model[propertyName]), take(1))), distinctUntilChanged());
    }
    runPreview() {
        this.dispatcher.dispatch(runPreview());
    }
    clearCanvas() {
        this.dispatcher.dispatch(clearCanvas());
    }
    setComponentInspector(guid, inspectorConfig) {
        this.rxViewDesignerInspectorService.set(guid, inspectorConfig);
    }
    setValidationIssues(guid, issues) {
        this.dispatcher.dispatch(setValidationIssues({ guid, issues }));
    }
    setExpressionValidationIssues(issues) {
        this.dispatcher.dispatch(setExpressionValidationIssues({ issues }));
    }
    setViewInspectorConfig(inspectorConfig) {
        this.viewModelGuid$.pipe(take(1)).subscribe((guid) => {
            this.setComponentInspector(guid, inspectorConfig);
        });
    }
    removeViewComponents(guids, selectParent) {
        if (guids.length) {
            this.dispatcher.dispatch(removeComponents({ guids, selectParent }));
        }
    }
    setComponentSettablePropertiesDataDictionary(guid, componentName, properties) {
        this.settablePropertiesDataDictionarySubject.next({
            guid,
            componentName,
            dataDictionary: this.rxViewDataDictionaryBuilderService.getSettablePropertiesDataDictionary(properties)
        });
    }
    setComponentCommonDataDictionaryBranch(guid, dataDictionaryBranch) {
        this.rxViewDataDictionaryService.setCommonDataDictionaryBranch(guid, dataDictionaryBranch
            ? this.rxViewDataDictionaryBuilderService.getComponentCommonDataDictionaryBranch(dataDictionaryBranch)
            : null);
    }
    setViewCommonDataDictionaryBranch(dataDictionaryBranch) {
        this.rxViewDataDictionaryService.setViewCommonDataDictionaryBranch(dataDictionaryBranch);
    }
    removeAllActionDataDictionaryBranches() {
        this.rxViewDataDictionaryService.removeAllActionOutputDataDictionaryBranches();
    }
    removeActionDataDictionaryBranch(actionGuid) {
        this.rxViewDataDictionaryService.removeActionOutputDataDictionaryBranch(actionGuid);
    }
    setActionDataDictionaryBranch(actionGuid, index, actionName, dataDictionary = null) {
        this.rxViewDataDictionaryService.setActionOutputDataDictionaryBranch(actionGuid, index, this.rxViewDataDictionaryBuilderService.getActionOutputDataDictionaryBranch(actionName, dataDictionary));
    }
    updateActionDataDictionaryBranchOrder(actions) {
        this.rxViewDataDictionaryService.updateActionOutputDataDictionaryBranchOrder(actions);
    }
    getChildComponentGuids(parentComponentGuid, recursive = false, filterPredicate) {
        // watch for layout and childDataComponentGuids properties change
        // TODO: store child component guids separately as a final result from layout and childDataComponentGuids
        return combineLatest([
            this.store$.select(componentLayoutSelector, { guid: parentComponentGuid }),
            this.store$.select(childDataComponentGuidsSelector, { guid: parentComponentGuid })
        ]).pipe(
        // get component model with actual data where layout and childDataComponentGuids are already updated
        switchMap(() => this.getComponentModel(parentComponentGuid).pipe(take(1))), switchMap((model) => model
            ? of(compact([
                ...(model.layout ? RxViewLayout.getViewLayoutChildGuids(model.layout) : []),
                ...(model.childDataComponentGuids || [])
            ]))
            : EMPTY), switchMap((guids) => guids.length && recursive
            ? combineLatest(guids.map((guid) => this.getChildComponentGuids(guid, true))).pipe(map$1(flatten), map$1((nestedGuids) => [...nestedGuids, ...guids]))
            : of(guids)), switchMap((guids) => guids.length
            ? this.viewComponentModels$.pipe(map$1((models) => {
                // The model of a removed component may be already unavailable, but the GUID may still be there.
                // This can happen when multiple nested components are removed from different
                // parent containers e.g. using record editor field selector dialog component.
                // In this case, we will get two observable emits for each removed component.
                // TODO: enhance getFlattenChildComponentGuids logic to reach a single observable emit.
                let availableComponentGuids = guids.filter((guid) => models[guid]);
                if (filterPredicate) {
                    availableComponentGuids = availableComponentGuids.filter((guid) => filterPredicate({
                        type: models[guid].type,
                        guid: models[guid].guid,
                        data: models[guid].propertiesByName
                    }));
                }
                return availableComponentGuids;
            }), take(1))
            : of(guids)));
    }
    getChildComponents(parentComponentGuid, filterPredicate) {
        return this.getChildComponentGuids(parentComponentGuid, false, filterPredicate).pipe(switchMap((guids) => guids.length
            ? combineLatest(guids.map((guid) => this.getComponentProperties(guid).pipe(withLatestFrom(this.getComponentModel(guid)), switchMap(([props, model]) => model
                ? of({
                    type: model.type,
                    data: props,
                    guid
                })
                : EMPTY))))
            : of([])));
    }
    getComponent(guid) {
        return this.getComponentModel(guid).pipe(map$1((model) => model
            ? {
                data: model.propertiesByName,
                guid: model.guid,
                type: model.type
            }
            : null));
    }
    getComponentsByType(type) {
        return this.viewComponentModels$.pipe(map$1((models) => filter$1(models, { type }).map((model) => ({
            guid: model.guid,
            data: model.propertiesByName,
            type: model.type
        }))));
    }
    getChildComponentTree(parentComponentGuid) {
        return this.viewComponentModels$.pipe(map$1((viewComponentModels) => {
            const getChildrenData = (model) => getChildGuidsFromModel(model).reduce((res, childGuid) => {
                if (viewComponentModels[childGuid]) {
                    res.push({
                        guid: childGuid,
                        data: viewComponentModels[childGuid].propertiesByName,
                        type: viewComponentModels[childGuid].type,
                        children: getChildrenData(viewComponentModels[childGuid])
                    });
                }
                return res;
            }, []);
            return viewComponentModels[parentComponentGuid]
                ? getChildrenData(viewComponentModels[parentComponentGuid])
                : [];
        }));
    }
    getParentComponentGuid(guid, componentType) {
        return this.store$
            .select(parentComponentModelGuidSelector, { guid })
            .pipe(switchMap((parentGuid) => parentGuid && componentType
            ? this.store$
                .select(componentTypeSelector, { guid: parentGuid })
                .pipe(switchMap((parentComponentType) => parentComponentType === componentType
                ? of(parentGuid)
                : this.getParentComponentGuid(parentGuid, componentType)))
            : of(parentGuid || null)));
    }
    setChildren(guid, data) {
        this.dispatcher.dispatch(setChildComponents({
            payload: {
                guid,
                data
            }
        }));
    }
}
ViewDesignerFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDesignerFacade, deps: [{ token: ViewDesignerDispatcher }, { token: i2.Store }, { token: i1.Actions }, { token: RxViewDesignerInspectorService }, { token: i2$1.RxGuidService }, { token: RxViewDataDictionaryBuilderService }, { token: RxViewDataDictionaryStoreService }, { token: i3.RxOverlayService }], target: i0.ɵɵFactoryTarget.Injectable });
ViewDesignerFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDesignerFacade, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDesignerFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: ViewDesignerDispatcher }, { type: i2.Store }, { type: i1.Actions }, { type: RxViewDesignerInspectorService }, { type: i2$1.RxGuidService }, { type: RxViewDataDictionaryBuilderService }, { type: RxViewDataDictionaryStoreService }, { type: i3.RxOverlayService }]; } });

class RxViewDesignerModels {
    constructor() {
        this.models = new Map();
    }
    clear() {
        this.models.clear();
    }
    set(guid, model) {
        this.models.set(guid, model);
    }
    get(guid) {
        return this.models.get(guid);
    }
    delete(guid) {
        this.models.delete(guid);
    }
}
RxViewDesignerModels.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDesignerModels, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxViewDesignerModels.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDesignerModels, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDesignerModels, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class RxViewDefinitionGeneratorService {
    constructor(rxDefinitionNameService, rxBundleCacheService, viewDesignerModels, rxViewDefinitionLocalizationService) {
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxBundleCacheService = rxBundleCacheService;
        this.viewDesignerModels = viewDesignerModels;
        this.rxViewDefinitionLocalizationService = rxViewDefinitionLocalizationService;
    }
    generate(viewModel, componentModels, forSave = false) {
        const clonedViewModel = viewModel;
        const viewDefinition = omit(clonedViewModel, 'displayName', 'layout', 'layoutName', 'pageComponent', 'isAngularJsView');
        viewDefinition.name =
            viewDefinition.name ||
                this.rxDefinitionNameService.getDefinitionName(this.rxBundleCacheService.bundleId, clonedViewModel.displayName);
        viewDefinition.componentDefinitions = this.generateComponentDefinitions(clonedViewModel, componentModels);
        if (forSave) {
            viewDefinition.localizableStringsByComponentId =
                this.rxViewDefinitionLocalizationService.extractLocalizableStrings(viewDefinition);
        }
        delete viewDefinition.localizablePropertyToStringGuidMap;
        viewDefinition.layout = JSON.stringify(clonedViewModel.layout);
        return viewDefinition;
    }
    generateComponentDefinitions(model, componentModelItems) {
        return getChildGuidsFromModel(model).map((guid) => {
            const componentDefinition = Object.assign({}, componentModelItems[guid]);
            const componentModel = this.viewDesignerModels.get(guid);
            const propertiesByName = isFunction(componentModel === null || componentModel === void 0 ? void 0 : componentModel.getPropertiesByName)
                ? componentModel.getPropertiesByName(componentDefinition.propertiesByName)
                : componentDefinition.propertiesByName;
            componentDefinition.propertiesByName = this.serializeComponentDefinitionProperties(propertiesByName);
            delete componentDefinition.parentGuid;
            // Move name out of propertiesByName for all components except actions.
            if (componentDefinition.type !== RxViewComponentType.Action &&
                has(componentDefinition.propertiesByName, 'name')) {
                if (componentDefinition.propertiesByName.name) {
                    componentDefinition.name = componentDefinition.propertiesByName.name;
                }
                delete componentDefinition.propertiesByName.name;
            }
            if (componentDefinition.layout || componentDefinition.childDataComponentGuids) {
                componentDefinition.componentDefinitions = this.generateComponentDefinitions(componentDefinition, componentModelItems);
                delete componentDefinition.childDataComponentGuids;
            }
            if (componentDefinition.layout) {
                componentDefinition.layout = JSON.stringify(componentDefinition.layout);
            }
            return componentDefinition;
        });
    }
    serializeComponentDefinitionProperties(componentProperties) {
        return transform(componentProperties, (result, value, key) => {
            switch (true) {
                case isArray(value):
                case isNumber(value):
                case isBoolean(value):
                case isPlainObject(value):
                    result[key] = JSON.stringify(value);
                    break;
                case isObject(value):
                    // support Set, Map
                    const obj = Object.create(null);
                    value.forEach((v, k) => (obj[k] = v));
                    result[key] = JSON.stringify(obj);
                    break;
                case isFunction(value):
                case isUndefined(value):
                    result[key] = null;
                    break;
                default:
                    result[key] = value;
                    break;
            }
        }, {});
    }
}
RxViewDefinitionGeneratorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDefinitionGeneratorService, deps: [{ token: i3.RxDefinitionNameService }, { token: i3.RxBundleCacheService }, { token: RxViewDesignerModels }, { token: i5.RxViewDefinitionLocalizationService }], target: i0.ɵɵFactoryTarget.Injectable });
RxViewDefinitionGeneratorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDefinitionGeneratorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDefinitionGeneratorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i3.RxDefinitionNameService }, { type: i3.RxBundleCacheService }, { type: RxViewDesignerModels }, { type: i5.RxViewDefinitionLocalizationService }]; } });

function validateCssClassName(tag) {
    return !/^[a-z][-\w]+$/gi.test(isObject(tag) ? tag.data.value : tag);
}
function validateCssClassNames(styles) {
    const validationIssues = [];
    if (styles) {
        const tags = styles.split(' ');
        if (tags.some(validateCssClassName)) {
            validationIssues.push({
                type: 'error',
                propertyName: 'styles',
                description: 'CSS class name is invalid.'
            });
        }
    }
    return validationIssues;
}
function validateAvailableOnDevicesProp(value) {
    const validationIssues = [];
    if (!(value === null || value === void 0 ? void 0 : value.length)) {
        validationIssues.push({
            type: 'error',
            propertyName: RX_AVAILABLE_ON_DEVICES_PROP_NAME,
            description: 'At least one device must be selected.'
        });
    }
    return validationIssues;
}
function validateStandardProps(model) {
    return [
        ...validateCssClassNames(model[RX_STYLES_PROP_NAME]),
        ...validateAvailableOnDevicesProp(model[RX_AVAILABLE_ON_DEVICES_PROP_NAME])
    ];
}

class RxViewExpressionValidatorService {
    constructor(rxDefaultExpressionValidatorService, rxDefaultExpressionEvaluatorService, rxStringService, rxExpressionParserService, viewDesignerFacade) {
        this.rxDefaultExpressionValidatorService = rxDefaultExpressionValidatorService;
        this.rxDefaultExpressionEvaluatorService = rxDefaultExpressionEvaluatorService;
        this.rxStringService = rxStringService;
        this.rxExpressionParserService = rxExpressionParserService;
        this.viewDesignerFacade = viewDesignerFacade;
    }
    validate(expression, propertyName, propertyLabel = this.rxStringService.prettify(propertyName), expressionEvaluator = this.rxDefaultExpressionEvaluatorService) {
        let issues$ = of([]);
        if (this.rxDefaultExpressionValidatorService.isValid(expression, expressionEvaluator)) {
            if (this.rxStringService.isNonEmptyString(expression)) {
                const referencedComponentGuidsSet = new Set();
                this.rxExpressionParserService.parse(expression, (token, expressionFragment) => {
                    if (token === ExpressionParserToken.RxExpression || token === ExpressionParserToken.SingleQuoteRxExpression) {
                        // Extract <ID> from ${view.components.<ID>.<Path>}
                        const result = /\${view\.components\.([0-9a-z-]+)\..+}/.exec(expressionFragment);
                        if (result && result[1]) {
                            referencedComponentGuidsSet.add(result[1]);
                        }
                    }
                    return expressionFragment;
                });
                if (referencedComponentGuidsSet.size) {
                    const referencedComponentGuids = Array.from(referencedComponentGuidsSet);
                    issues$ = this.viewDesignerFacade.allComponentGuids$.pipe(map$1((guids) => referencedComponentGuids.filter((guid) => !guids.has(guid))), distinctUntilChanged(isEqual), map$1((guids) => guids.map(() => ({
                        type: 'error',
                        description: 'Expression references a non-existent view component.',
                        propertyName
                    }))));
                }
            }
        }
        else {
            issues$ = of([
                {
                    type: 'error',
                    description: `${propertyLabel} must be a valid expression.`,
                    propertyName
                }
            ]);
        }
        return issues$;
    }
}
RxViewExpressionValidatorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewExpressionValidatorService, deps: [{ token: i5.RxDefaultExpressionValidatorService }, { token: i5.RxDefaultExpressionEvaluatorService }, { token: i2$1.RxStringService }, { token: i3.RxExpressionParserService }, { token: ViewDesignerFacade }], target: i0.ɵɵFactoryTarget.Injectable });
RxViewExpressionValidatorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewExpressionValidatorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewExpressionValidatorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i5.RxDefaultExpressionValidatorService }, { type: i5.RxDefaultExpressionEvaluatorService }, { type: i2$1.RxStringService }, { type: i3.RxExpressionParserService }, { type: ViewDesignerFacade }]; } });

class RxViewDataDictionaryService {
    constructor(viewDesignerFacade, rxViewDataDictionaryBuilderService, rxViewComponentRegistryService, rxObjectUtilsService, rxDataDictionaryUtils) {
        this.viewDesignerFacade = viewDesignerFacade;
        this.rxViewDataDictionaryBuilderService = rxViewDataDictionaryBuilderService;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        this.rxObjectUtilsService = rxObjectUtilsService;
        this.rxDataDictionaryUtils = rxDataDictionaryUtils;
        this.componentsCommonDataDictionaryStateClone$ = this.viewDesignerFacade.componentsCommonDataDictionaryState$.pipe(map$1((componentsDataDictionaryState) => componentsDataDictionaryState ? this.rxObjectUtilsService.cloneDeep(componentsDataDictionaryState) : {}), shareReplay(1));
        this.viewCommonDataDictionaryStateClone$ = this.viewDesignerFacade.viewCommonDataDictionaryState$.pipe(filter(Boolean), map$1((viewDataDictionary) => this.rxObjectUtilsService.cloneDeep(viewDataDictionary)), shareReplay(1));
        this.commonDataDictionary$ = this.getCommonDataDictionary();
        this.settablePropertiesDataDictionary$ = this.viewDesignerFacade.settablePropertiesDataDictionaryState$.pipe(withLatestFrom(this.viewDesignerFacade.viewDesignerModelState$), map$1(([settablePropsDataDictionaryState, viewDesignerModelState]) => this.rxObjectUtilsService.cloneDeep(this.getSettablePropsDataDictionary(settablePropsDataDictionaryState, viewDesignerModelState))));
    }
    getActionDataDictionary(guid) {
        return combineLatest([this.viewDesignerFacade.actionsDataDictionaryState$, this.getCommonDataDictionary()]).pipe(map$1(([actionsDataDictionaryState, commonDataDictionary]) => {
            const currentActionData = find(actionsDataDictionaryState, { guid });
            return [
                {
                    label: 'Actions',
                    children: currentActionData
                        ? flow((branches) => take$1(branches, currentActionData.index), (branches) => map(branches, 'dataDictionaryBranch'), compact, (branches) => filter$1(branches, (branch) => { var _a; return (_a = branch.children) === null || _a === void 0 ? void 0 : _a.length; }), (branches) => this.rxObjectUtilsService.cloneDeep(branches))(actionsDataDictionaryState)
                        : []
                },
                ...commonDataDictionary
            ];
        }), 
        // TODO: performance
        distinctUntilChanged(isEqual));
    }
    getComponentCommonDataDictionary(guid) {
        return this.componentsCommonDataDictionaryStateClone$.pipe(map$1((state) => state[guid]));
    }
    getCommonDataDictionary(componentBranchToReplace) {
        return combineLatest([
            this.viewCommonDataDictionaryStateClone$,
            this.componentsCommonDataDictionaryStateClone$.pipe(map$1((componentsDataDictionaryState) => Object.values(componentBranchToReplace
                ? Object.assign(Object.assign({}, componentsDataDictionaryState), componentBranchToReplace) : componentsDataDictionaryState)))
        ]).pipe(map$1(([viewDataDictionaryBranch, componentDataDictionaryBranches]) => [
            {
                label: 'General',
                children: [
                    {
                        label: 'Current user',
                        icon: 'd-icon-dollar',
                        expression: '${keywords.user}'
                    },
                    {
                        label: 'New line',
                        icon: 'd-icon-dollar',
                        expression: '${keywords.newLine}'
                    }
                ]
            },
            {
                label: 'Functions',
                children: this.rxDataDictionaryUtils.getFunctionsDataDictionaryBranch(RX_EXPRESSION_FUNCTIONS)
            },
            Object.assign(Object.assign({}, viewDataDictionaryBranch), { children: [
                    { label: 'Components', children: compact(componentDataDictionaryBranches), expanded: true },
                    ...viewDataDictionaryBranch.children
                ] })
        ]));
    }
    getSettablePropsDataDictionary(settablePropsDataDictionaryState, viewDesignerModelState) {
        return getChildGuidsFromModel(viewDesignerModelState.viewDesignModel)
            .map((guid) => this.getSettablePropsDataDictionaryBranch(guid, viewDesignerModelState, settablePropsDataDictionaryState, true))
            .filter(Boolean);
    }
    getSettablePropsDataDictionaryBranch(guid, modelState, settablePropsState, expanded = false) {
        const componentPropsState = settablePropsState[guid];
        const model = modelState.viewComponentDesignModels[guid];
        const descriptor = this.rxViewComponentRegistryService.get(model.type);
        const childGuids = descriptor.outlets && model.layout ? RxViewLayout.getViewLayoutChildGuids(model.layout) : null;
        const componentsDataDictionary = map(childGuids, (componentGuid) => this.getSettablePropsDataDictionaryBranch(componentGuid, modelState, settablePropsState)).filter(Boolean);
        const propsDataDictionary = get(componentPropsState, 'dataDictionary', []);
        if (componentsDataDictionary.length || propsDataDictionary.length) {
            return {
                label: (componentPropsState === null || componentPropsState === void 0 ? void 0 : componentPropsState.componentName) || descriptor.name,
                expanded,
                children: componentsDataDictionary.length && propsDataDictionary.length
                    ? [
                        {
                            label: 'Components',
                            children: componentsDataDictionary
                        },
                        {
                            label: 'Properties',
                            children: propsDataDictionary
                        }
                    ]
                    : componentsDataDictionary.length
                        ? componentsDataDictionary
                        : propsDataDictionary
            };
        }
    }
}
RxViewDataDictionaryService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDataDictionaryService, deps: [{ token: ViewDesignerFacade }, { token: RxViewDataDictionaryBuilderService }, { token: i5.RxViewComponentRegistryService }, { token: i2$1.RxObjectUtilsService }, { token: i3.RxDataDictionaryUtils }], target: i0.ɵɵFactoryTarget.Injectable });
RxViewDataDictionaryService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDataDictionaryService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDataDictionaryService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: ViewDesignerFacade }, { type: RxViewDataDictionaryBuilderService }, { type: i5.RxViewComponentRegistryService }, { type: i2$1.RxObjectUtilsService }, { type: i3.RxDataDictionaryUtils }]; } });

class RxViewExpressionConfigurator extends RxExpressionConfigurator {
    constructor(injector) {
        super();
        this.injector = injector;
        this.rxExpressionHelperService = this.injector.get(RxExpressionHelperService);
    }
    getDefaultConfig() {
        return Object.assign(Object.assign({}, super.getDefaultConfig()), { dataDictionary$: this.commonDataDictionary$, operators: ExpressionOperatorRowsByGroup.get(ExpressionOperatorGroup.AllClient), validateExpression: (propertyName, expression) => {
                let isValid = true;
                const expressionEvaluator = this.getExpressionEvaluator(propertyName);
                try {
                    expressionEvaluator.parseExpression(this.rxExpressionHelperService.prepare(expression));
                }
                catch (e) {
                    isValid = false;
                }
                return of(isValid);
            } });
    }
}

class RxViewComponentExpressionConfigurator extends RxViewExpressionConfigurator {
    constructor(injector, componentGuid, componentModel, componentType) {
        super(injector);
        this.injector = injector;
        this.componentGuid = componentGuid;
        this.componentModel = componentModel;
        this.componentType = componentType;
        this.rxDefaultExpressionEvaluatorService = this.injector.get(RxDefaultExpressionEvaluatorService);
        this.rxViewDataDictionaryService = this.injector.get(RxViewDataDictionaryService);
        this.rxViewComponentRegistryService = this.injector.get(RxViewComponentRegistryService);
        this.commonDataDictionary$ = this.rxViewDataDictionaryService.commonDataDictionary$;
    }
    getExpressionEvaluator(propertyName) {
        var _a;
        const propertyDescriptor = this.componentType &&
            this.rxViewComponentRegistryService
                .get(this.componentType)
                .properties.find((property) => property.name === propertyName);
        return isFunction((_a = propertyDescriptor === null || propertyDescriptor === void 0 ? void 0 : propertyDescriptor.evaluatorService) === null || _a === void 0 ? void 0 : _a.parseExpression)
            ? propertyDescriptor.evaluatorService
            : this.rxDefaultExpressionEvaluatorService;
    }
    getCommonDataDictionary(componentBranchToReplace$, componentGuid = this.componentGuid) {
        return componentBranchToReplace$
            ? componentBranchToReplace$.pipe(switchMap((dataDictionary) => this.rxViewDataDictionaryService.getCommonDataDictionary({
                [componentGuid]: dataDictionary
            })))
            : this.commonDataDictionary$;
    }
    getComponentCommonDataDictionary(guid) {
        return this.rxViewDataDictionaryService.getComponentCommonDataDictionary(guid || this.componentGuid);
    }
}

class RxViewCustomizationOptionsComponent {
    constructor(viewDesignerFacade, rxOverlayService, translateService) {
        this.viewDesignerFacade = viewDesignerFacade;
        this.rxOverlayService = rxOverlayService;
        this.translateService = translateService;
        this.destroyed$ = new ReplaySubject(1);
    }
    ngOnInit() {
        combineLatest([
            this.viewDesignerFacade.getViewPropertyValue('allowOverlay'),
            this.viewDesignerFacade.getViewPropertyValue('scope'),
            this.viewDesignerFacade.getViewPropertyValue('overlayGroupId'),
            this.viewDesignerFacade.getViewPropertyValue('overlayDescriptor'),
            this.viewDesignerFacade.getViewPropertyValue('lastUpdateTime')
        ])
            .pipe(withLatestFrom(this.viewDesignerFacade.viewModel$), takeUntil(this.destroyed$))
            .subscribe(([[allowOverlay, scope, overlayGroupId, overlayDescriptor, lastUpdateTime], viewModel]) => {
            this.controlOptions = {
                allowOverlay,
                scope,
                overlayGroupId,
                overlayDescriptor,
                isDisabled: !this.rxOverlayService.isCustomizationEnabled('allowOverlay', viewModel),
                definitionTypeDisplayName: this.translateService.instant('com.bmc.arsys.rx.client.view-definition.label').toLowerCase()
            };
        });
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    setCustomization(customizationOptions) {
        this.viewDesignerFacade.updateViewProperties(customizationOptions);
    }
}
RxViewCustomizationOptionsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewCustomizationOptionsComponent, deps: [{ token: ViewDesignerFacade }, { token: i3.RxOverlayService }, { token: i6.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
RxViewCustomizationOptionsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxViewCustomizationOptionsComponent, selector: "rx-view-customization-options", inputs: { options: "options" }, ngImport: i0, template: "<rx-scope-customization-control\n  [options]=\"controlOptions\"\n  [(ngModel)]=\"value\"\n  (ngModelChange)=\"setCustomization($event)\"\n></rx-scope-customization-control>\n", components: [{ type: i3$1.CustomizationOptionsComponent, selector: "rx-scope-customization-control", inputs: ["options"] }], directives: [{ type: i3$2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3$2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewCustomizationOptionsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-view-customization-options',
                    templateUrl: './view-customization-options.component.html'
                }]
        }], ctorParameters: function () { return [{ type: ViewDesignerFacade }, { type: i3.RxOverlayService }, { type: i6.TranslateService }]; }, propDecorators: { options: [{
                type: Input
            }] } });

class RxViewRevertCustomizationComponent {
    constructor(viewDesignerFacade) {
        this.viewDesignerFacade = viewDesignerFacade;
        this.events = new EventEmitter();
        this.controlOptions$ = combineLatest([
            this.viewDesignerFacade.getViewPropertyValue('allowOverlay'),
            this.viewDesignerFacade.getViewPropertyValue('scope'),
            this.viewDesignerFacade.getViewPropertyValue('overlayGroupId'),
            this.viewDesignerFacade.getViewPropertyValue('overlayDescriptor')
        ]).pipe(map$1(([allowOverlay, scope, overlayGroupId, overlayDescriptor]) => ({
            allowOverlay,
            scope,
            overlayGroupId,
            overlayDescriptor
        })));
    }
}
RxViewRevertCustomizationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewRevertCustomizationComponent, deps: [{ token: ViewDesignerFacade }], target: i0.ɵɵFactoryTarget.Component });
RxViewRevertCustomizationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxViewRevertCustomizationComponent, selector: "rx-view-revert-customization", inputs: { options: "options", isDisabled: "isDisabled" }, outputs: { events: "events" }, ngImport: i0, template: "<rx-revert-customization\n  [options]=\"controlOptions$ | async\"\n  [isDisabled]=\"isDisabled\"\n  (events)=\"events.emit($event)\"\n></rx-revert-customization>\n", components: [{ type: i3$1.RxRevertCustomizationComponent, selector: "rx-revert-customization", inputs: ["options", "isDisabled"], outputs: ["events"] }], pipes: { "async": i4.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewRevertCustomizationComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-view-revert-customization',
                    templateUrl: './view-revert-customization.component.html'
                }]
        }], ctorParameters: function () { return [{ type: ViewDesignerFacade }]; }, propDecorators: { options: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }], events: [{
                type: Output
            }] } });

class RxViewRevertCustomizationModule {
}
RxViewRevertCustomizationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewRevertCustomizationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxViewRevertCustomizationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewRevertCustomizationModule, declarations: [RxViewRevertCustomizationComponent], imports: [CommonModule, RxRevertCustomizationModule] });
RxViewRevertCustomizationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewRevertCustomizationModule, imports: [[CommonModule, RxRevertCustomizationModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewRevertCustomizationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxViewRevertCustomizationComponent],
                    imports: [CommonModule, RxRevertCustomizationModule]
                }]
        }] });

class RxViewModel {
    constructor(injector, viewDesignerFacade, rxStringService, rxOverlayService, rxViewComponentRegistryService, rxBundleCacheService, rxModalService, rxViewDefinitionCacheService, rxViewDefinitionParserService, rxGuidService, viewDesignerDispatcher, rxDefinitionNameService, rxViewExpressionValidatorService) {
        this.injector = injector;
        this.viewDesignerFacade = viewDesignerFacade;
        this.rxStringService = rxStringService;
        this.rxOverlayService = rxOverlayService;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxModalService = rxModalService;
        this.rxViewDefinitionCacheService = rxViewDefinitionCacheService;
        this.rxViewDefinitionParserService = rxViewDefinitionParserService;
        this.rxGuidService = rxGuidService;
        this.viewDesignerDispatcher = viewDesignerDispatcher;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxViewExpressionValidatorService = rxViewExpressionValidatorService;
        this.expressionConfigurator = new RxViewComponentExpressionConfigurator(this.injector, null, this);
        this.destroyed$ = new ReplaySubject(1);
        this.allViewDefinitionNamesByBundleId$ = this.viewDesignerFacade.currentBundleId$.pipe(filter(Boolean), switchMap((bundleId) => this.rxViewDefinitionCacheService
            .getViewDefinitionNames(bundleId)
            .pipe(map$1((names) => names.map((name) => this.rxDefinitionNameService.getDisplayNameForValidation(name))))));
        this.targetExtensionContainerOptions$ = this.viewDesignerFacade
            .getViewPropertyValue('targetViewDefinitionName')
            .pipe(switchMap((targetViewDefinitionName) => targetViewDefinitionName
            ? this.getTargetExtensionContainerOptions(targetViewDefinitionName).pipe(take(1))
            : of(null)), shareReplay(1));
        this.targetViewDefinition$ = this.viewDesignerFacade.getViewPropertyValue('targetViewDefinitionName').pipe(filter(Boolean), switchMap((targetViewDefinitionName) => this.rxViewDefinitionCacheService.getViewDefinition(targetViewDefinitionName)));
        this.init();
    }
    init() {
        // Initial model and inspector configuration.
        this.viewDesignerFacade.initViewDesigner$
            .pipe(concatMapTo(this.viewDesignerFacade.viewModelsInitialized$.pipe(switchMapTo(combineLatest([
            this.viewDesignerFacade.viewComponentModels$.pipe(map$1((viewComponentModels) => {
                const pageComponentModel = Object.values(viewComponentModels).find((model) => model.type === RxViewComponentType.Page);
                return pageComponentModel
                    ? viewComponentModels[pageComponentModel.childDataComponentGuids[0]].type
                    : null;
            })),
            this.viewDesignerFacade.viewModel$,
            this.targetExtensionContainerOptions$
        ]).pipe(take(1))))), takeUntil(this.destroyed$))
            .subscribe(([componentType, viewModel, targetExtensionContainerOptions]) => {
            this.viewDesignerFacade.updateViewProperties({
                pageComponent: componentType
            });
            this.viewDesignerFacade.setViewInspectorConfig(this.getInspector(Object.assign(Object.assign({}, viewModel), { pageComponent: componentType }), targetExtensionContainerOptions));
        });
        this.viewDesignerFacade.initViewDesigner$
            .pipe(switchMapTo(this.targetExtensionContainerOptions$.pipe(
        // Ignore initial property change.
        skip(1), withLatestFrom(this.viewDesignerFacade.viewModel$))), takeUntil(this.destroyed$))
            .subscribe(([options, viewModel]) => this.onTargetExtensionContainerOptionsChange(options, viewModel));
        this.viewDesignerFacade.initViewDesigner$
            .pipe(switchMapTo(this.viewDesignerFacade.getViewPropertyValue('pageComponent').pipe(
        // Ignore initial property change.
        skip(1), switchMapTo(combineLatest([
            this.viewDesignerFacade.viewModel$,
            this.viewDesignerFacade.viewComponentModels$,
            this.targetExtensionContainerOptions$
        ]).pipe(take(1))))), takeUntil(this.destroyed$))
            .subscribe(([viewModel, viewComponentModels, targetExtensionContainerOptions]) => this.onPageComponentChange(viewModel, viewComponentModels, targetExtensionContainerOptions));
        this.viewDesignerFacade.initViewDesigner$
            .pipe(switchMapTo(this.viewDesignerFacade.getViewPropertyValue('targetViewDefinitionName').pipe(skip(1))), switchMap(() => this.viewDesignerFacade.viewComponentModels$.pipe(first())), takeUntil(this.destroyed$))
            .subscribe((viewComponentModels) => {
            if (!isEmpty(viewComponentModels)) {
                this.viewDesignerFacade.clearCanvas();
            }
        });
        this.viewDesignerFacade.initViewDesigner$
            .pipe(switchMapTo(combineLatest([
            this.viewDesignerFacade.getViewPropertyValue('styles').pipe(map$1(validateCssClassNames)),
            this.validateDisplayName(),
            this.validateInputParams(),
            this.validateOutputParamExpressions(),
            this.validateExtensionContainer()
        ]).pipe(map$1(flatten), map$1(compact), withLatestFrom(this.viewDesignerFacade.viewModelGuid$))), takeUntil(this.destroyed$))
            .subscribe(([issues, guid]) => {
            this.viewDesignerFacade.setValidationIssues(guid, issues);
        });
        this.viewDesignerFacade.initViewDesigner$
            .pipe(switchMapTo(this.viewDesignerFacade.getViewPropertyValue('inputParams')), takeUntil(this.destroyed$))
            .subscribe((inputParams) => this.viewDesignerFacade.setViewCommonDataDictionaryBranch(this.getViewCommonDataDictionary(inputParams)));
        this.viewDesignerFacade
            .getViewPropertyValue('targetExtensionContainerGuid')
            .pipe(withLatestFrom(this.targetViewDefinition$), map$1(([targetExtensionContainerGuid, targetViewDefinition]) => this.getTargetRecordDefinitionName(targetViewDefinition, targetExtensionContainerGuid)), distinctUntilChanged(), switchMapTo(this.viewDesignerFacade.viewComponentModels$.pipe(take(1))), filter((viewComponentModels) => !isEmpty(viewComponentModels)), takeUntil(this.destroyed$))
            .subscribe(() => this.viewDesignerFacade.clearCanvas());
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    getTargetExtensionContainerOptions(targetViewDefinitionName) {
        return this.rxViewDefinitionCacheService.getViewDefinition(targetViewDefinitionName).pipe(map$1((viewDefinition) => this.rxViewDefinitionParserService
            .getComponents(viewDefinition)
            .filter(({ componentDefinition }) => componentDefinition.type === RxViewComponentType.ExtensionContainer)
            .map(({ componentDefinition }) => ({
            id: componentDefinition.guid,
            name: componentDefinition.propertiesByName.name || componentDefinition.name
        }))));
    }
    onTargetExtensionContainerOptionsChange(options, viewModel) {
        this.viewDesignerFacade.setViewInspectorConfig(this.getInspector(viewModel, options));
        // targetViewDefinitionName is not selected when options are not defined.
        if (!options) {
            this.viewDesignerFacade.updateViewProperties({
                targetExtensionContainerGuid: null
            });
        }
        else if (options.length === 1) {
            this.viewDesignerFacade.updateViewProperties({
                targetExtensionContainerGuid: options[0].id
            });
        }
    }
    onPageComponentChange(viewModel, componentModels, options) {
        const pageComponentModel = find(componentModels, { type: RxViewComponentType.Page });
        this.viewDesignerFacade.setViewInspectorConfig(this.getInspector(viewModel, options));
        const actions = [];
        if (viewModel.pageComponent) {
            if (pageComponentModel) {
                this.viewDesignerFacade.updateComponentModel(pageComponentModel.childDataComponentGuids[0], {
                    type: viewModel.pageComponent
                });
            }
            else {
                const pageComponentGuid = this.rxGuidService.generate();
                if (!isEmpty(componentModels)) {
                    this.viewDesignerFacade.removeViewComponents(getChildGuidsFromModel(viewModel));
                }
                actions.push(initializeComponentModels({
                    payload: [
                        {
                            componentModel: {
                                guid: pageComponentGuid,
                                resourceType: RX_VIEW_DEFINITION.resourceTypes.containerViewComponent,
                                type: RxViewComponentType.Page,
                                propertiesByName: {},
                                parentGuid: viewModel.guid
                            },
                            insertIndex: 0,
                            columnIndex: 0,
                            outletName: RX_VIEW_DEFINITION.defaultOutletName
                        }
                    ]
                }), initializeDataComponentModels({
                    payload: [
                        {
                            componentModel: {
                                guid: this.rxGuidService.generate(),
                                type: viewModel.pageComponent,
                                resourceType: RX_VIEW_DEFINITION.resourceTypes.viewComponent,
                                propertiesByName: {},
                                parentGuid: pageComponentGuid
                            }
                        }
                    ]
                }));
            }
            this.viewDesignerFacade.updateViewProperties({
                inputParams: [],
                outputParams: []
            });
        }
        else if (pageComponentModel) {
            this.viewDesignerFacade.removeViewComponents([pageComponentModel.guid]);
        }
        actions.forEach((action) => this.viewDesignerDispatcher.dispatch(action));
    }
    getInspector(viewDesignModel, targetExtensionContainerOptions = []) {
        const isExistingView = Boolean(viewDesignModel.lastUpdateTime);
        const isCustomizationAllowed = isExistingView
            ? this.rxOverlayService.isCustomizationEnabled('allowOverlay', viewDesignModel)
            : true;
        const availablePageComponents = this.rxViewComponentRegistryService
            .getBundlePageComponents(this.rxBundleCacheService.bundleId)
            .map((pageComponent) => ({
            id: pageComponent.type,
            name: pageComponent.name
        }));
        if (viewDesignModel.pageComponent && !this.rxViewComponentRegistryService.get(viewDesignModel.pageComponent)) {
            availablePageComponents.unshift({
                name: RX_VIEW_DEFINITION.unknownPageComponent.name,
                id: viewDesignModel.pageComponent
            });
        }
        const pageComponentControl = {
            name: 'pageComponent',
            component: SelectFormControlComponent,
            options: {
                label: 'Page component',
                options: availablePageComponents,
                beforeValueChange: (oldValue, newValue) => this.viewDesignerFacade.viewModel$
                    .pipe(take(1), withLatestFrom(this.viewDesignerFacade.viewComponentModels$), map$1(([viewModel, viewComponentModels]) => !(oldValue === null || oldValue === void 0 ? void 0 : oldValue.length) &&
                    newValue.length &&
                    (viewModel.inputParams.length || viewModel.outputParams.length || !isEmpty(viewComponentModels))))
                    .toPromise()
                    .then((isConfirmationRequired) => isConfirmationRequired
                    ? this.rxModalService.confirm({
                        title: 'Warning',
                        modalStyle: RX_MODAL.modalStyles.warning,
                        message: 'The view canvas, input and output parameters will be cleared. Do you want to continue?'
                    })
                    : true),
                emptyOption: true
            }
        };
        const extensionContainerControl = {
            name: 'targetExtensionContainerGuid',
            component: SelectFormControlComponent,
            options: {
                label: 'Extension container',
                tooltip: new Tooltip(`Select an extension container in the view to extend where record editor fields from this view will be injected.
            The records defined for the view to extend and for this view must be associated one-to-one.`),
                options: targetExtensionContainerOptions || [],
                required: true,
                beforeValueChange: (oldValue, newValue) => {
                    return this.isTargetRecordDefinitionChanged(oldValue, newValue)
                        .pipe(withLatestFrom(this.viewDesignerFacade.viewComponentModels$), map$1(([isRecordDefinitionChanged, viewComponentModels]) => !isEmpty(viewComponentModels) && isRecordDefinitionChanged), take(1))
                        .toPromise()
                        .then((isConfirmationRequired) => isConfirmationRequired
                        ? this.rxModalService.confirm({
                            title: 'Warning',
                            modalStyle: RX_MODAL.modalStyles.warning,
                            message: 'The view canvas will be cleared. Do you want to continue?'
                        })
                        : true);
                }
            }
        };
        const layout = [
            {
                label: 'General',
                controls: [
                    {
                        name: 'displayName',
                        component: TextFormControlComponent,
                        isDisabled: Boolean(viewDesignModel.lastUpdateTime),
                        options: {
                            required: true,
                            label: 'Name'
                        }
                    },
                    {
                        name: 'description',
                        component: TextareaFormControlComponent,
                        isDisabled: !isCustomizationAllowed,
                        options: {
                            label: 'Description',
                            rows: 3
                        }
                    },
                    {
                        name: 'layoutName',
                        component: TextFormControlComponent,
                        isDisabled: true,
                        options: {
                            label: 'Layout template'
                        }
                    },
                    {
                        name: 'targetViewDefinitionName',
                        component: RxDefinitionPickerComponent,
                        isDisabled: !isCustomizationAllowed,
                        options: {
                            label: 'View to extend',
                            tooltip: new Tooltip(`Select a view to extend in order to inject this view into it.
                The view to extend may be read-only, but must contain at least one Record editor with an Extension container.`),
                            definitionType: RxDefinitionPickerType.View,
                            beforeValueChange: (oldValue, newValue) => this.viewDesignerFacade.viewComponentModels$
                                .pipe(first(), withLatestFrom(this.viewDesignerFacade.viewModel$))
                                .toPromise()
                                .then(([components, viewModel]) => {
                                const isViewParametersPresent = Boolean(!(oldValue === null || oldValue === void 0 ? void 0 : oldValue.length) &&
                                    newValue.length &&
                                    (viewModel.inputParams.length || viewModel.outputParams.length));
                                let message;
                                if (!isEmpty(components) && isViewParametersPresent) {
                                    message =
                                        'The view canvas, input and output parameters will be cleared. Do you want to continue?';
                                }
                                else if (!isEmpty(components)) {
                                    message = 'The view canvas will be cleared. Do you want to continue?';
                                }
                                else if (isViewParametersPresent) {
                                    message = 'The input and output parameters will be cleared. Do you want to continue?';
                                }
                                return message
                                    ? this.rxModalService.confirm({
                                        title: 'Warning',
                                        modalStyle: RX_MODAL.modalStyles.warning,
                                        message: message
                                    })
                                    : true;
                            })
                        }
                    },
                    {
                        name: 'styles',
                        component: TagsFormControlComponent,
                        isDisabled: !isCustomizationAllowed,
                        options: {
                            label: 'CSS classes',
                            placeholder: 'Add CSS classes',
                            tooltip: new Tooltip('Enter CSS class names to apply to this view.'),
                            errorCheck: validateCssClassName
                        }
                    },
                    {
                        name: 'permissions',
                        component: RxPermissionEditorComponent,
                        isDisabled: !isCustomizationAllowed,
                        options: {
                            label: 'Permissions',
                            type: 'view'
                        }
                    },
                    {
                        component: RxViewRevertCustomizationComponent
                    },
                    {
                        component: RxViewCustomizationOptionsComponent
                    }
                ]
            },
            {
                label: 'Input parameters',
                controls: [
                    {
                        name: 'inputParams',
                        component: ListFormControlComponent,
                        isDisabled: !isCustomizationAllowed,
                        options: {
                            addItemText: 'Add',
                            emptyListText: 'No input parameters added.',
                            items: [
                                {
                                    label: 'Name',
                                    propertyName: 'name'
                                }
                            ]
                        }
                    }
                ]
            },
            {
                label: 'Output parameters',
                controls: [
                    {
                        name: 'outputParams',
                        component: ListFormControlComponent,
                        isDisabled: !isCustomizationAllowed,
                        options: {
                            addItemText: 'Add',
                            emptyListText: 'No output parameters added.',
                            items: [
                                {
                                    label: 'Name',
                                    propertyName: 'name'
                                },
                                {
                                    label: 'Source',
                                    propertyName: 'source',
                                    dataDictionary$: this.expressionConfigurator.getDataDictionary(),
                                    operators: this.expressionConfigurator.getOperators()
                                }
                            ]
                        }
                    }
                ]
            }
        ];
        if (availablePageComponents.length) {
            layout[0].controls.splice(2, 0, pageComponentControl);
        }
        // hide 'View to extend' and 'Extention container' controls if a page component is selected
        if (viewDesignModel.pageComponent) {
            layout.splice(1, 2);
            layout[0].controls.splice(findIndex(layout[0].controls, { name: 'targetViewDefinitionName' }), 1);
        }
        if (viewDesignModel.targetViewDefinitionName) {
            const targetViewDefinitionNameControlIndex = findIndex(layout[0].controls, { name: 'targetViewDefinitionName' });
            layout[0].controls.splice(targetViewDefinitionNameControlIndex + 1, 0, extensionContainerControl);
            // hide 'Page component' control if 'View to extend' is selected
            layout[0].controls.splice(findIndex(layout[0].controls, { name: 'pageComponent' }), 1);
            // hide 'Input parameters' and 'Output parameters' control if 'View to extend' is selected
            layout.splice(1, 2);
            this.viewDesignerFacade.updateViewProperties({
                inputParams: [],
                outputParams: []
            });
        }
        return {
            inspectorSectionConfigs: layout
        };
    }
    validateDisplayName() {
        // View definition names for validation will be loaded only in case if user changes view name.
        return this.viewDesignerFacade
            .getViewPropertyValue('displayName')
            .pipe(switchMap((displayName) => combineLatest([
            of(displayName
                ? RX_RECORD_DEFINITION.validDefinitionNameRegex.test(displayName)
                    ? null
                    : {
                        type: 'error',
                        propertyName: 'displayName',
                        description: 'View name can only contain letters, numbers, spaces, dashes, and underscores.'
                    }
                : {
                    type: 'error',
                    propertyName: 'displayName',
                    description: 'View name cannot be blank.'
                }),
            this.viewDesignerFacade.getViewPropertyValue('lastUpdateTime').pipe(switchMap((lastUpdateTime) => displayName && !lastUpdateTime
                ? this.allViewDefinitionNamesByBundleId$.pipe(map$1((viewDefinitionNames) => {
                    const isNameAlreadyExists = !lastUpdateTime &&
                        (viewDefinitionNames === null || viewDefinitionNames === void 0 ? void 0 : viewDefinitionNames.some((name) => this.rxStringService.caseInsensitiveIsEqual(displayName, name)));
                    return isNameAlreadyExists
                        ? {
                            type: 'error',
                            propertyName: 'displayName',
                            description: 'View definition with this name already exists.'
                        }
                        : null;
                }), take(1))
                : of(null)), take(1))
        ])))
            .pipe(map$1(compact));
    }
    validateInputParams() {
        return this.viewDesignerFacade.getViewPropertyValue('inputParams').pipe(map$1((inputParams) => {
            const notBlankInputParams = flow((params) => map(params, (param) => param.name), compact)(inputParams);
            const uniqueInputParams = uniq(notBlankInputParams);
            const validationIssues = [];
            if (inputParams.length && notBlankInputParams.length !== inputParams.length) {
                validationIssues.push({
                    type: 'error',
                    propertyName: 'inputParams',
                    description: 'Input parameter name cannot be blank.'
                });
            }
            if (notBlankInputParams.length !== uniqueInputParams.length) {
                validationIssues.push({
                    type: 'error',
                    propertyName: 'inputParams',
                    description: 'Input parameter names must be unique.'
                });
            }
            return validationIssues;
        }));
    }
    validateOutputParamExpressions() {
        return this.viewDesignerFacade.getViewPropertyValue('outputParams').pipe(map$1((outputParams) => map(outputParams, (param) => param.source).filter(Boolean)), distinctUntilChanged(isEqual), switchMap((sourceValues) => sourceValues.length
            ? combineLatest(sourceValues.map((value) => this.rxViewExpressionValidatorService.validate(value, 'source', 'Output parameter source'))).pipe(map$1(flatten))
            : of([])));
    }
    validateExtensionContainer() {
        return combineLatest([
            this.viewDesignerFacade.getViewPropertyValue('targetViewDefinitionName'),
            this.viewDesignerFacade.getViewPropertyValue('targetExtensionContainerGuid')
        ]).pipe(map$1(([targetViewDefinitionName, targetExtensionContainerGuid]) => targetViewDefinitionName && !targetExtensionContainerGuid
            ? {
                type: 'error',
                propertyName: 'targetExtensionContainerGuid',
                description: 'Extension container cannot be blank.'
            }
            : null));
    }
    getViewCommonDataDictionary(inputParams) {
        return {
            label: 'View',
            expression: '${view.api}',
            icon: 'd-icon-file_o',
            expanded: true,
            children: [
                ...(isEmpty(inputParams)
                    ? []
                    : [
                        {
                            label: 'Input parameters',
                            expanded: true,
                            children: inputParams
                                .filter((param) => param.name)
                                .map((param) => ({
                                label: param.name,
                                expression: `$\{view.inputParams.${param.name}}`,
                                icon: 'd-icon-arrow_right_square_input'
                            }))
                        }
                    ]),
                {
                    label: 'Properties',
                    expanded: true,
                    children: [
                        {
                            label: 'Is valid',
                            expression: '${view.isValid}',
                            icon: 'd-icon-arrow_right_square_input'
                        }
                    ]
                }
            ]
        };
    }
    isTargetRecordDefinitionChanged(previousTargetExtensionContainerGuid, currentTargetExtensionContainerGuid) {
        return this.targetViewDefinition$.pipe(map$1((viewDefinition) => {
            const previousTargetRecordDefinitionName = this.getTargetRecordDefinitionName(viewDefinition, previousTargetExtensionContainerGuid);
            const currentTargetRecordDefinitionName = this.getTargetRecordDefinitionName(viewDefinition, currentTargetExtensionContainerGuid);
            return previousTargetRecordDefinitionName !== currentTargetRecordDefinitionName;
        }));
    }
    getTargetRecordDefinitionName(viewDefinition, targetExtensionContainerGuid) {
        const targetRecordEditor = this.rxViewDefinitionParserService.findParentComponentDefinition(viewDefinition, { guid: targetExtensionContainerGuid }, (definition) => definition.type === RxViewComponentType.RecordEditor);
        return targetRecordEditor === null || targetRecordEditor === void 0 ? void 0 : targetRecordEditor.propertiesByName.recordDefinitionName;
    }
}
RxViewModel.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewModel, deps: [{ token: i0.Injector }, { token: ViewDesignerFacade }, { token: i2$1.RxStringService }, { token: i3.RxOverlayService }, { token: i5.RxViewComponentRegistryService }, { token: i3.RxBundleCacheService }, { token: i5$1.RxModalService }, { token: i5.RxViewDefinitionCacheService }, { token: i5.RxViewDefinitionParserService }, { token: i2$1.RxGuidService }, { token: ViewDesignerDispatcher }, { token: i3.RxDefinitionNameService }, { token: RxViewExpressionValidatorService }], target: i0.ɵɵFactoryTarget.Injectable });
RxViewModel.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewModel });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewModel, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: ViewDesignerFacade }, { type: i2$1.RxStringService }, { type: i3.RxOverlayService }, { type: i5.RxViewComponentRegistryService }, { type: i3.RxBundleCacheService }, { type: i5$1.RxModalService }, { type: i5.RxViewDefinitionCacheService }, { type: i5.RxViewDefinitionParserService }, { type: i2$1.RxGuidService }, { type: ViewDesignerDispatcher }, { type: i3.RxDefinitionNameService }, { type: RxViewExpressionValidatorService }]; } });

/* tslint:disable:variable-name */
const ViewDesignerCanvasItemApiToken = new InjectionToken('CanvasItemApi');

class CanvasItemApi {
    constructor() {
        this.core = null;
    }
    registerCoreApi(apiObject) {
        this.core = apiObject;
    }
}
CanvasItemApi.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CanvasItemApi, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
CanvasItemApi.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CanvasItemApi });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CanvasItemApi, decorators: [{
            type: Injectable
        }] });

class DropComponentData {
    constructor(data, targetGuid, outletName, insertIndex) {
        this.data = data;
        this.targetGuid = targetGuid;
        this.outletName = outletName;
        this.insertIndex = insertIndex;
    }
}

class ViewDesignerCanvasService {
    constructor() {
        this.componentSelectSubject = new ReplaySubject();
        this.componentRemoveSubject = new ReplaySubject();
        this.componentDropSubject = new ReplaySubject();
        this.componentDrop$ = this.componentDropSubject.asObservable();
        this.componentSelect$ = this.componentSelectSubject.asObservable();
        this.componentRemove$ = this.componentRemoveSubject.asObservable();
    }
    selectComponent(guid) {
        this.componentSelectSubject.next(guid);
    }
    removeComponent(guid) {
        this.componentRemoveSubject.next(guid);
    }
    dropComponent(data, targetGuid, outletName, insertIndex) {
        this.componentDropSubject.next(new DropComponentData(data, targetGuid, outletName, insertIndex));
    }
}
ViewDesignerCanvasService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDesignerCanvasService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ViewDesignerCanvasService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDesignerCanvasService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDesignerCanvasService, decorators: [{
            type: Injectable
        }] });

class CanvasItemComponent {
    constructor(injector, renderer, canvasItemApi, viewDesignerCanvasService) {
        this.injector = injector;
        this.renderer = renderer;
        this.canvasItemApi = canvasItemApi;
        this.viewDesignerCanvasService = viewDesignerCanvasService;
        this.interactive = true;
        this.childContainers = new Map();
    }
    ngOnInit() {
        this.initializeItemApi();
    }
    ngOnChanges(changes) {
        const layoutChange = changes.layout;
        if (layoutChange) {
            const prevGuid = get(layoutChange, 'previousValue.guid');
            const currGuid = get(layoutChange, 'currentValue.guid');
            const prevOutlets = get(layoutChange, 'previousValue.outlets');
            const currOutlets = get(layoutChange, 'currentValue.outlets');
            if (prevGuid !== currGuid) {
                if (this.componentReference) {
                    this.cleanUp();
                }
                this.renderViewComponent();
            }
            else if (!isEqual(prevOutlets, currOutlets)) {
                currOutlets.forEach((outlet) => {
                    const ref = this.childContainers.get(outlet.name);
                    if (ref) {
                        ref.instance.outlet = outlet;
                        ref.instance.layout = this.layout;
                    }
                });
            }
        }
    }
    ngOnDestroy() {
        this.cleanUp();
    }
    cleanUp() {
        this.componentReference.destroy();
        this.childContainers.clear();
    }
    registerOutlet(outletName, outletViewContainerRef, containerFactory) {
        const currentOutlet = this.layout.outlets.find((outlet) => outlet.name === outletName);
        const componentRef = this.renderContainerComponent(outletViewContainerRef, currentOutlet, containerFactory);
        this.childContainers.set(outletName, componentRef);
        return componentRef;
    }
    onSelectComponent(event) {
        if (this.interactive) {
            event.stopPropagation();
            this.viewDesignerCanvasService.selectComponent(this.layout.guid);
        }
    }
    dropComponent(transferData, insertIndex, outletName = RX_VIEW_DEFINITION.defaultOutletName) {
        this.viewDesignerCanvasService.dropComponent(transferData, this.layout.guid, outletName, insertIndex);
    }
    initializeItemApi() {
        this.canvasItemApi.registerCoreApi({
            dropComponent: this.dropComponent.bind(this),
            registerOutlet: this.registerOutlet.bind(this)
        });
    }
    renderViewComponent() {
        this.componentReference = this.container.createComponent(this.layout.factory, null, this.injector);
        const instance = this.componentReference.instance;
        const nativeElement = this.componentReference.location.nativeElement;
        instance.guid = this.layout.guid;
        instance.model = this.layout.model;
        instance.isReadOnly = this.isReadOnly;
        this.renderer.setAttribute(nativeElement, 'rx-view-component-id', this.layout.guid);
    }
    renderContainerComponent(outletViewContainerRef, outlet, containerFactory) {
        const containerRef = outletViewContainerRef.createComponent(containerFactory);
        containerRef.instance.outlet = outlet;
        containerRef.instance.layout = this.layout;
        containerRef.instance.isReadOnly = this.isReadOnly;
        return containerRef;
    }
}
CanvasItemComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CanvasItemComponent, deps: [{ token: i0.Injector }, { token: i0.Renderer2 }, { token: ViewDesignerCanvasItemApiToken }, { token: ViewDesignerCanvasService }], target: i0.ɵɵFactoryTarget.Component });
CanvasItemComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: CanvasItemComponent, selector: "rx-canvas-item", inputs: { layout: "layout", interactive: "interactive", isReadOnly: "isReadOnly" }, providers: [
        {
            provide: ViewDesignerCanvasItemApiToken,
            useClass: CanvasItemApi
        }
    ], viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true, read: ViewContainerRef, static: true }], usesOnChanges: true, ngImport: i0, template: "<div [hidden]=\"layout?.model?.hiddenOnCanvas$ | async\" (click)=\"onSelectComponent($event)\">\n  <ng-container #container></ng-container>\n</div>\n", pipes: { "async": i4.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CanvasItemComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-canvas-item',
                    templateUrl: './canvas-item.component.html',
                    providers: [
                        {
                            provide: ViewDesignerCanvasItemApiToken,
                            useClass: CanvasItemApi
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i0.Renderer2 }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [ViewDesignerCanvasItemApiToken]
                }] }, { type: ViewDesignerCanvasService }]; }, propDecorators: { layout: [{
                type: Input
            }], interactive: [{
                type: Input
            }], isReadOnly: [{
                type: Input
            }], container: [{
                type: ViewChild,
                args: ['container', { read: ViewContainerRef, static: true }]
            }] } });

class ViewDesignerCanvasComponent {
    constructor(viewDesignerCanvasService) {
        this.viewDesignerCanvasService = viewDesignerCanvasService;
        this.componentSelect = new EventEmitter();
        this.componentDrop = new EventEmitter();
        this.componentRemove = new EventEmitter();
        this.beforeComponentDropInRoot = new EventEmitter();
    }
    ngOnInit() {
        this.viewDesignerCanvasService.componentSelect$.subscribe((event) => {
            this.componentSelect.emit(event);
        });
        this.viewDesignerCanvasService.componentRemove$.subscribe((event) => {
            this.componentRemove.emit(event);
        });
        this.viewDesignerCanvasService.componentDrop$.subscribe((event) => {
            this.componentDrop.emit(event);
        });
    }
}
ViewDesignerCanvasComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDesignerCanvasComponent, deps: [{ token: ViewDesignerCanvasService }], target: i0.ɵɵFactoryTarget.Component });
ViewDesignerCanvasComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ViewDesignerCanvasComponent, selector: "rx-view-designer-canvas", inputs: { layout: "layout", isReadOnly: "isReadOnly" }, outputs: { componentSelect: "componentSelect", componentDrop: "componentDrop", componentRemove: "componentRemove", beforeComponentDropInRoot: "beforeComponentDropInRoot" }, providers: [ViewDesignerCanvasService], ngImport: i0, template: "<rx-canvas-item class=\"root-item\" *ngIf=\"layout\" [layout]=\"layout\" [isReadOnly]=\"isReadOnly\"></rx-canvas-item>\n", components: [{ type: CanvasItemComponent, selector: "rx-canvas-item", inputs: ["layout", "interactive", "isReadOnly"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDesignerCanvasComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-view-designer-canvas',
                    templateUrl: './view-designer-canvas.component.html',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [ViewDesignerCanvasService]
                }]
        }], ctorParameters: function () { return [{ type: ViewDesignerCanvasService }]; }, propDecorators: { layout: [{
                type: Input
            }], isReadOnly: [{
                type: Input
            }], componentSelect: [{
                type: Output
            }], componentDrop: [{
                type: Output
            }], componentRemove: [{
                type: Output
            }], beforeComponentDropInRoot: [{
                type: Output
            }] } });

class CanvasOutletHelperService {
    constructor() {
        this.beforeViewComponentDropSubject = new ReplaySubject();
        this.beforeViewComponentDrop$ = this.beforeViewComponentDropSubject.asObservable();
    }
    setBeforeViewComponentDropState(viewComponentDropData) {
        this.beforeViewComponentDropSubject.next(viewComponentDropData);
    }
    canBeDropped(data) {
        let canBeInsertedInto = true;
        if (isFunction(data.draggedViewComponentDescriptor.canBeInsertedInto)) {
            canBeInsertedInto = data.draggedViewComponentDescriptor.canBeInsertedInto(data.dropTargetViewComponentWithParents.map((component) => component.type));
        }
        if (canBeInsertedInto) {
            canBeInsertedInto =
                (!data.draggedViewComponentGuid ||
                    !this._isParentRecordEditorChanging(this.containerComponentInstance['layout'].viewComponentWithParents, data.draggedViewComponentParents)) &&
                    this.componentDropPredicate(data);
        }
        return canBeInsertedInto;
    }
    componentDropPredicate(data, skipPredicate = false) {
        return ((skipPredicate || this.dropPredicate(data)) &&
            (!this.parentOutletComponent || this.parentOutletComponent.componentDropPredicate(data, this.skipParentPredicate)));
    }
    _isParentRecordEditorChanging(targetContainerParentComponents, sourceComponentParentComponents) {
        const targetRecordEditor = find(targetContainerParentComponents, {
            type: RxViewComponentType.RecordEditor
        });
        const sourceRecordEditor = find(sourceComponentParentComponents, {
            type: RxViewComponentType.RecordEditor
        });
        const isMovingBetweenRecordEditors = Boolean(targetRecordEditor) && Boolean(sourceRecordEditor) && targetRecordEditor.guid !== sourceRecordEditor.guid;
        const isDroppingOutsideRecordEditor = !targetRecordEditor && Boolean(sourceRecordEditor);
        const isDroppingInsideRecordEditor = !sourceRecordEditor && Boolean(targetRecordEditor);
        return isMovingBetweenRecordEditors || isDroppingOutsideRecordEditor || isDroppingInsideRecordEditor;
    }
}
CanvasOutletHelperService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CanvasOutletHelperService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
CanvasOutletHelperService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CanvasOutletHelperService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CanvasOutletHelperService, decorators: [{
            type: Injectable
        }] });

class CanvasItemColumnComponent {
    constructor(viewDesignerCanvasService, canvasOutletHelperService) {
        this.viewDesignerCanvasService = viewDesignerCanvasService;
        this.canvasOutletHelperService = canvasOutletHelperService;
        this.dropListDropped = new EventEmitter();
        this.dropListEnterPredicateBind = throttle(this.dropListEnterPredicate.bind(this), 200);
    }
    ngOnInit() {
        this.dropListOrientation = this.canvasOutletHelperService.dropListOrientation;
    }
    getViewComponentDragData(layout) {
        return {
            draggedViewComponentGuid: layout.guid,
            draggedViewComponentDescriptor: layout.descriptor,
            draggedViewComponentParents: this.layout.viewComponentWithParents
        };
    }
    onDragEntered(event) {
        this.enforceDragToSelf(event.container);
    }
    onDragStarted(event) {
        this.enforceDragToSelf(event.source.dropContainer);
    }
    remove(event, layout) {
        event.stopPropagation();
        this.viewDesignerCanvasService.removeComponent(layout.guid);
    }
    onSelectComponent(event, layout) {
        event.stopPropagation();
        this.viewDesignerCanvasService.selectComponent(layout.guid);
    }
    trackByFn(index, item) {
        return item.guid;
    }
    dropListEnterPredicate(event) {
        return this.canvasOutletHelperService.canBeDropped(Object.assign(Object.assign({}, event.data), { dropTargetViewComponentWithParents: this.layout.viewComponentWithParents || [] }));
    }
    // todo remove after
    // https://github.com/angular/components/issues/16671
    // will be fixed
    enforceDragToSelf(dropList) {
        let siblings = dropList.connectedTo;
        siblings = siblings.reduce((result, item) => {
            if (isString(item)) {
                const listInstance = CdkDropList['_dropLists'].find((list) => list.id === item);
                if (listInstance) {
                    result.push(listInstance);
                }
            }
            return result;
        }, []);
        const dropListRef = dropList._dropListRef;
        asapScheduler.schedule(() => {
            dropListRef.connectedTo(siblings.map((list) => list._dropListRef));
        });
    }
}
CanvasItemColumnComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CanvasItemColumnComponent, deps: [{ token: ViewDesignerCanvasService }, { token: CanvasOutletHelperService }], target: i0.ɵɵFactoryTarget.Component });
CanvasItemColumnComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: CanvasItemColumnComponent, selector: "rx-canvas-item-column", inputs: { isReadOnly: "isReadOnly", colIndex: "colIndex", column: "column", layout: "layout" }, outputs: { dropListDropped: "dropListDropped" }, ngImport: i0, template: "<div\n  cdkDropList\n  [cdkDropListOrientation]=\"dropListOrientation\"\n  [cdkDropListConnectedTo]=\"column.dndListIds\"\n  (cdkDropListDropped)=\"dropListDropped.next($event)\"\n  [cdkDropListEnterPredicate]=\"dropListEnterPredicateBind\"\n  [cdkDropListData]=\"{ columnIndex: colIndex }\"\n  [id]=\"column.listId\"\n>\n  <!-- mw-100 class is used for DnD to restrict component width, see DRD21-5845 for more details -->\n  <div\n    class=\"canvas-item-wrapper mw-100 canvas-{{ layout.descriptor.type }}\"\n    cdkDrag\n    [cdkDragData]=\"getViewComponentDragData(layout)\"\n    [cdkDragDisabled]=\"isReadOnly || layout.descriptor.options?.static\"\n    (cdkDragEntered)=\"onDragEntered($event)\"\n    (cdkDragStarted)=\"onDragStarted($event)\"\n    *ngFor=\"let layout of column.children; let last = last; trackBy: trackByFn\"\n  >\n    <div class=\"canvas-item\" [class.active]=\"layout.isSelected$ | async\" (click)=\"onSelectComponent($event, layout)\">\n      <div class=\"canvas-item-header\" [hidden]=\"!(layout.isSelected$ | async)\" cdkDragHandle>\n        <span class=\"icon d-icon-dots mr-1\"></span>\n        <span class=\"label\">{{ layout.label }}</span>\n\n        <button\n          (click)=\"remove($event, layout)\"\n          *ngIf=\"!isReadOnly && !layout.descriptor.options?.static\"\n          class=\"remove-button btn btn-sm btn-link d-icon-cross_adapt p-0 px-1\"\n          type=\"button\"\n          aria-label=\"Close\"\n        ></button>\n      </div>\n\n      <rx-canvas-item [layout]=\"layout\" [isReadOnly]=\"isReadOnly\"></rx-canvas-item>\n    </div>\n  </div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:block}.cdk-drop-list{min-height:100px}.cdk-drop-list>.cdk-drag-placeholder{opacity:.5}.card-header{cursor:move}.canvas-item-wrapper.cdk-drag-preview{background:white;box-shadow:0 5px 5px -3px #0003,0 8px 10px 1px #00000024,0 3px 14px 2px #0000001f}.canvas-item{border:1px solid transparent;position:relative;padding:3px}.canvas-item.active{border-color:#20c997}.canvas-item-header{color:#fff;position:absolute;top:0;right:0;padding:1px 0 1px 5px;background:#20c997;cursor:move;z-index:1;display:flex}.canvas-item-header .label{white-space:nowrap}.remove-button{color:#fff}\n"], components: [{ type: CanvasItemComponent, selector: "rx-canvas-item", inputs: ["layout", "interactive", "isReadOnly"] }], directives: [{ type: i4$1.CdkDropList, selector: "[cdkDropList], cdk-drop-list", inputs: ["cdkDropListConnectedTo", "id", "cdkDropListEnterPredicate", "cdkDropListSortPredicate", "cdkDropListDisabled", "cdkDropListSortingDisabled", "cdkDropListAutoScrollDisabled", "cdkDropListOrientation", "cdkDropListLockAxis", "cdkDropListData", "cdkDropListAutoScrollStep"], outputs: ["cdkDropListDropped", "cdkDropListEntered", "cdkDropListExited", "cdkDropListSorted"], exportAs: ["cdkDropList"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4$1.CdkDrag, selector: "[cdkDrag]", inputs: ["cdkDragDisabled", "cdkDragStartDelay", "cdkDragLockAxis", "cdkDragConstrainPosition", "cdkDragPreviewClass", "cdkDragBoundary", "cdkDragRootElement", "cdkDragPreviewContainer", "cdkDragData", "cdkDragFreeDragPosition"], outputs: ["cdkDragStarted", "cdkDragReleased", "cdkDragEnded", "cdkDragEntered", "cdkDragExited", "cdkDragDropped", "cdkDragMoved"], exportAs: ["cdkDrag"] }, { type: i4$1.CdkDragHandle, selector: "[cdkDragHandle]", inputs: ["cdkDragHandleDisabled"] }, { type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "async": i4.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CanvasItemColumnComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-canvas-item-column',
                    templateUrl: './canvas-item-column.component.html',
                    styleUrls: ['./canvas-item-column.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: ViewDesignerCanvasService }, { type: CanvasOutletHelperService }]; }, propDecorators: { isReadOnly: [{
                type: Input
            }], colIndex: [{
                type: Input
            }], column: [{
                type: Input
            }], layout: [{
                type: Input
            }], dropListDropped: [{
                type: Output
            }] } });

class CanvasItemContainerComponent {
    constructor(canvasItemApi, canvasOutletHelperService) {
        this.canvasItemApi = canvasItemApi;
        this.canvasOutletHelperService = canvasOutletHelperService;
    }
    trackByColFn(index, item) {
        return item.listId;
    }
    onDropListDropped(event) {
        const viewComponentDropData = Object.assign(Object.assign({}, event.item.data), { initialPropertiesByName: {}, columnIndex: event.container.data.columnIndex });
        this.canvasOutletHelperService.setBeforeViewComponentDropState(viewComponentDropData);
        if (!viewComponentDropData.preventDrop) {
            this.canvasItemApi.core.dropComponent(viewComponentDropData, event.currentIndex, this.outlet.name);
        }
    }
}
CanvasItemContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CanvasItemContainerComponent, deps: [{ token: ViewDesignerCanvasItemApiToken }, { token: CanvasOutletHelperService }], target: i0.ɵɵFactoryTarget.Component });
CanvasItemContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: CanvasItemContainerComponent, selector: "rx-canvas-item-container", inputs: { outlet: "outlet", isReadOnly: "isReadOnly", layout: "layout" }, ngImport: i0, template: "<div class=\"row\">\n  <div\n    *ngFor=\"let column of outlet.columns; let colIndex = index; let isLastCol = last; trackBy: trackByColFn\"\n    class=\"{{ column.span ? 'col-' + column.span : 'col' }}\"\n    [ngClass]=\"{ 'col-border': !isLastCol }\"\n  >\n    <rx-canvas-item-column\n      [ngClass]=\"{ 'mb-3': !isLastCol }\"\n      [isReadOnly]=\"isReadOnly\"\n      [colIndex]=\"colIndex\"\n      [column]=\"column\"\n      [layout]=\"layout\"\n      (dropListDropped)=\"onDropListDropped($event)\"\n    ></rx-canvas-item-column>\n  </div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.col-border{border-right:1px dashed #d6d7d8}\n"], components: [{ type: CanvasItemColumnComponent, selector: "rx-canvas-item-column", inputs: ["isReadOnly", "colIndex", "column", "layout"], outputs: ["dropListDropped"] }], directives: [{ type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CanvasItemContainerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-canvas-item-container',
                    templateUrl: './canvas-item-container.component.html',
                    styleUrls: ['./canvas-item-container.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: CanvasItemApi, decorators: [{
                    type: Inject,
                    args: [ViewDesignerCanvasItemApiToken]
                }] }, { type: CanvasOutletHelperService }]; }, propDecorators: { outlet: [{
                type: Input
            }], isReadOnly: [{
                type: Input
            }], layout: [{
                type: Input
            }] } });

class CanvasOutletComponent {
    constructor(canvasItemApi, parentOutletComponent, canvasOutletHelperService, componentFactoryResolver) {
        this.canvasItemApi = canvasItemApi;
        this.parentOutletComponent = parentOutletComponent;
        this.canvasOutletHelperService = canvasOutletHelperService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.containerComponentInstance = null;
        this.destroyed$ = new ReplaySubject(1);
        this.name = RX_VIEW_DEFINITION.defaultOutletName;
        this.skipParentPredicate = false;
        this.dropListOrientation = 'vertical';
        this.beforeViewComponentDrop = new EventEmitter();
        this.dropPredicate = () => true;
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    ngOnInit() {
        this.containerComponentInstance = this.canvasItemApi.core.registerOutlet(this.name, this.container, this.componentFactoryResolver.resolveComponentFactory(this.containerComponent || CanvasItemContainerComponent)).instance;
        this.canvasOutletHelperService.dropListOrientation = this.dropListOrientation;
        this.canvasOutletHelperService.parentOutletComponent = this.parentOutletComponent;
        this.canvasOutletHelperService.dropPredicate = this.dropPredicate;
        this.canvasOutletHelperService.skipParentPredicate = this.skipParentPredicate;
        this.canvasOutletHelperService.containerComponentInstance = this.containerComponentInstance;
        this.canvasOutletHelperService.beforeViewComponentDrop$.pipe(takeUntil(this.destroyed$)).subscribe((event) => {
            this.beforeViewComponentDrop.emit(event);
        });
    }
    canBeDropped(data) {
        return this.canvasOutletHelperService.canBeDropped(data);
    }
    componentDropPredicate(data, skipPredicate = false) {
        return this.canvasOutletHelperService.componentDropPredicate(data, skipPredicate);
    }
}
CanvasOutletComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CanvasOutletComponent, deps: [{ token: ViewDesignerCanvasItemApiToken }, { token: CanvasOutletComponent, optional: true, skipSelf: true }, { token: CanvasOutletHelperService }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.Component });
CanvasOutletComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: CanvasOutletComponent, selector: "rx-canvas-outlet", inputs: { name: "name", skipParentPredicate: "skipParentPredicate", containerComponent: "containerComponent", dropListOrientation: "dropListOrientation", dropPredicate: "dropPredicate" }, outputs: { beforeViewComponentDrop: "beforeViewComponentDrop" }, providers: [CanvasOutletHelperService], viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true, read: ViewContainerRef, static: true }], ngImport: i0, template: "<ng-container #container></ng-container>\n" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CanvasOutletComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-canvas-outlet',
                    templateUrl: './canvas-outlet.component.html',
                    providers: [CanvasOutletHelperService]
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [ViewDesignerCanvasItemApiToken]
                }] }, { type: CanvasOutletComponent, decorators: [{
                    type: SkipSelf
                }, {
                    type: Optional
                }] }, { type: CanvasOutletHelperService }, { type: i0.ComponentFactoryResolver }]; }, propDecorators: { name: [{
                type: Input
            }], skipParentPredicate: [{
                type: Input
            }], containerComponent: [{
                type: Input
            }], dropListOrientation: [{
                type: Input
            }], container: [{
                type: ViewChild,
                args: ['container', { read: ViewContainerRef, static: true }]
            }], beforeViewComponentDrop: [{
                type: Output
            }], dropPredicate: [{
                type: Input
            }] } });

class DesignerComponent {
    constructor(canvasItemComponent, viewDesignerCanvasComponent) {
        this.canvasItemComponent = canvasItemComponent;
        this.viewDesignerCanvasComponent = viewDesignerCanvasComponent;
        this.defaultOutletName = RX_VIEW_DEFINITION.defaultOutletName;
    }
    trackByFn(index, item) {
        return item.name;
    }
}
DesignerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DesignerComponent, deps: [{ token: CanvasItemComponent }, { token: ViewDesignerCanvasComponent }], target: i0.ɵɵFactoryTarget.Component });
DesignerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DesignerComponent, selector: "rx-designer", ngImport: i0, template: "<rx-canvas-outlet\n  [class.border]=\"canvasItemComponent.layout.outlets.length > 1\"\n  [class.default-outlet]=\"outlet.name === defaultOutletName\"\n  *ngFor=\"let outlet of canvasItemComponent.layout.outlets; trackBy: trackByFn\"\n  [name]=\"outlet.name\"\n  (beforeViewComponentDrop)=\"viewDesignerCanvasComponent.beforeComponentDropInRoot.emit($event)\"\n></rx-canvas-outlet>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}rx-canvas-outlet{display:block}rx-canvas-outlet.default-outlet:not(:only-child) ::ng-deep>rx-canvas-item-container>.row>*>rx-canvas-item-column>.cdk-drop-list{min-height:300px}rx-canvas-outlet.default-outlet:only-child ::ng-deep>rx-canvas-item-container>.row>*>rx-canvas-item-column>.cdk-drop-list{min-height:calc(100vh - 155px)}rx-canvas-outlet.border{border:1px solid #d6d7d8}rx-canvas-outlet+rx-canvas-outlet{margin-top:10px}\n"], components: [{ type: CanvasOutletComponent, selector: "rx-canvas-outlet", inputs: ["name", "skipParentPredicate", "containerComponent", "dropListOrientation", "dropPredicate"], outputs: ["beforeViewComponentDrop"] }], directives: [{ type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DesignerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-designer',
                    templateUrl: './designer.component.html',
                    styleUrls: ['./designer.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: CanvasItemComponent }, { type: ViewDesignerCanvasComponent }]; } });

class RxViewDesignerHelperService {
    constructor(viewDesignerFacade, rxViewComponentRegistryService, componentFactoryResolver, viewDesignerModels) {
        this.viewDesignerFacade = viewDesignerFacade;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.viewDesignerModels = viewDesignerModels;
        this.designerComponentFactory = this.componentFactoryResolver.resolveComponentFactory(DesignerComponent);
        this.canvasDndListIds = [];
        this.extensionViewAllowedComponentTypes = new Set([
            RxViewComponentType.Container,
            RxViewComponentType.RichText,
            RxViewComponentType.RecordEditor,
            RxViewComponentType.Character,
            RxViewComponentType.Textarea,
            RxViewComponentType.Boolean,
            RxViewComponentType.Date,
            RxViewComponentType.DateTime,
            RxViewComponentType.Time,
            RxViewComponentType.Decimal,
            RxViewComponentType.Floating,
            RxViewComponentType.Integer,
            RxViewComponentType.LocalizedCharacter,
            RxViewComponentType.Selection,
            RxViewComponentType.SelectGroup,
            RxViewComponentType.RichTextarea,
            BwfViewComponentType.DynamicNamedList
        ]);
        this.canvasLayout$ = this.getRecursiveViewLayoutGuids().pipe(switchMap((guids) => guids.length
            ? this.viewDesignerFacade.areViewModelsReady$.pipe(
            // Wait until component models will be instantiated after save view definition.
            filter(Boolean), switchMapTo(this.viewDesignerFacade.viewDesignerModelState$.pipe(take(1))))
            : this.viewDesignerFacade.viewDesignerModelState$.pipe(take(1))), map$1((designModelState) => {
            const viewModel = designModelState.viewDesignModel;
            const componentModels = designModelState.viewComponentDesignModels;
            this.canvasDndListIds.length = 0;
            return {
                guid: viewModel.guid,
                factory: this.designerComponentFactory,
                outlets: viewModel.layout.outlets.map((outlet) => ({
                    name: outlet.name,
                    columns: outlet.columns.map((column, i) => {
                        const listId = String(`${viewModel.guid}-${outlet.name}-${i}`);
                        // do not allow components to be dropped in the root of a SHELL view
                        if (viewModel.type !== ViewDefinitionType.Shell) {
                            this.canvasDndListIds.push(listId);
                        }
                        return Object.assign(Object.assign({}, column), { children: column.children.map((childGuid) => this.initializeCanvasItem(childGuid, componentModels, this.canvasDndListIds)), listId, dndListIds: this.canvasDndListIds });
                    })
                })),
                model: null,
                descriptor: null,
                isSelected$: of(false)
            };
        }), tap(() => {
            // required for DND
            // https://github.com/angular/components/issues/16671
            this.canvasDndListIds.reverse();
        }));
        this.viewBreadcrumbItem$ = this.viewDesignerFacade.getViewPropertyValue('displayName').pipe(concatMap((displayName) => of(displayName
            ? displayName === RX_APPLICATION.shellDefinitionName
                ? 'Application shell'
                : displayName
            : '<New view>')), withLatestFrom(this.viewDesignerFacade.viewModelGuid$), map$1(([viewBreadcrumbLabel, guid]) => ({
            label: viewBreadcrumbLabel,
            data: { guid }
        })));
        this.selectedComponentBreadcrumbItems$ = this.viewDesignerFacade.selectedComponentGuid$.pipe(switchMap((componentGuid) => componentGuid
            ? combineLatest([
                this.viewDesignerFacade.breadcrumbs$,
                this.viewDesignerFacade.getParentComponentGuid(componentGuid)
            ]).pipe(withLatestFrom(this.viewDesignerFacade.viewComponentModels$), map$1(([[breadcrumbs], viewComponentModels]) => 
            // Handle empty viewComponentModels state during view definition save.
            isEmpty(viewComponentModels)
                ? []
                : findAllParentComponentGuids(componentGuid, viewComponentModels).map((parentGuid) => {
                    let label = breadcrumbs[parentGuid];
                    if (!label) {
                        const component = viewComponentModels[parentGuid];
                        const descriptor = this.rxViewComponentRegistryService.get(component.type);
                        label = descriptor.name;
                    }
                    return { label, data: { guid: parentGuid } };
                })))
            : of([])));
        this.breadcrumbItems$ = combineLatest([this.viewBreadcrumbItem$, this.selectedComponentBreadcrumbItems$]).pipe(map$1(([viewItem, componentItems]) => [viewItem, ...componentItems]));
        this.validationIssues$ = this.viewDesignerFacade.validationIssues$.pipe(withLatestFrom(this.viewDesignerFacade.viewDesignerModelState$), map$1(([validationIssuesState, modelState]) => flow((state) => mergeWith(Object.assign({}, state.issues), state.expressionIssues, (issues = [], expressionIssues = []) => issues.concat(expressionIssues)), (issuesByComponentGuid) => reduce(issuesByComponentGuid, (result, issues, guid) => {
            var _a;
            let name;
            if (((_a = modelState.viewDesignModel) === null || _a === void 0 ? void 0 : _a.guid) === guid) {
                name = modelState.viewDesignModel.displayName || 'View designer';
            }
            else if (modelState.viewComponentDesignModels[guid]) {
                const type = modelState.viewComponentDesignModels[guid].type;
                const descriptor = this.rxViewComponentRegistryService.get(type);
                name = descriptor && descriptor.name;
            }
            if (name) {
                result.push({
                    title: name,
                    issues: issues.map((issue) => ({
                        type: issue.type,
                        description: issue.description,
                        disableCorrection: issue.disableCorrection,
                        data: {
                            guid,
                            propertyName: issue.propertyName,
                            data: issue.data
                        }
                    }))
                });
            }
            return result;
        }, []))(validationIssuesState)));
    }
    getLicensedComponents() {
        return this.rxViewComponentRegistryService.getLicensedComponents().pipe(first(), map$1((components) => components.filter((component) => !this.rxViewComponentRegistryService.isDataComponentDescriptor(component) &&
            !component.hidden &&
            !component.isPageComponent)));
    }
    getRecursiveViewLayoutGuids() {
        return this.viewDesignerFacade
            .getViewPropertyValue('layout')
            .pipe(switchMap((layout) => this.getRecursiveComponentLayoutGuids(layout)));
    }
    getRecursiveComponentLayoutGuids(layout) {
        const guids = RxViewLayout.getViewLayoutChildGuids(layout);
        return guids.length
            ? combineLatest(guids.map((guid) => this.viewDesignerFacade
                .getComponentLayout(guid)
                .pipe(switchMap((childLayout) => childLayout
                ? this.getRecursiveComponentLayoutGuids(childLayout).pipe(map$1((childGuids) => [...childGuids, ...guids]))
                : of(guids)))))
            : of([]);
    }
    initializeCanvasItem(componentGuid, componentModels, dndListIds) {
        const componentModel = componentModels[componentGuid];
        const descriptor = this.rxViewComponentRegistryService.get(componentModel.type);
        const canvasLayout = {
            guid: componentModel.guid,
            descriptor,
            factory: descriptor.designComponentFactory,
            model: this.viewDesignerModels.get(componentModel.guid),
            outlets: [],
            isSelected$: this.viewDesignerFacade.selectedComponentGuid$.pipe(map$1((guid) => guid === componentModel.guid)),
            label: descriptor.name
        };
        if (componentModel.layout) {
            canvasLayout.viewComponentWithParents = findAllParentComponentGuids(componentModel.guid, componentModels).map((guid) => ({ guid, type: componentModels[guid].type }));
            componentModel.layout.outlets.forEach((outlet) => {
                const canvasOutlet = {
                    name: outlet.name,
                    columns: outlet.columns.map((column, i) => {
                        const listId = `${componentModel.guid}-${outlet.name}-${i}`;
                        dndListIds.push(listId);
                        return {
                            children: column.children.map((childGuid) => this.initializeCanvasItem(childGuid, componentModels, dndListIds)),
                            span: column.span,
                            listId,
                            dndListIds
                        };
                    })
                };
                canvasLayout.outlets.push(canvasOutlet);
            });
        }
        return canvasLayout;
    }
}
RxViewDesignerHelperService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDesignerHelperService, deps: [{ token: ViewDesignerFacade }, { token: i5.RxViewComponentRegistryService }, { token: i0.ComponentFactoryResolver }, { token: RxViewDesignerModels }], target: i0.ɵɵFactoryTarget.Injectable });
RxViewDesignerHelperService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDesignerHelperService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDesignerHelperService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: ViewDesignerFacade }, { type: i5.RxViewComponentRegistryService }, { type: i0.ComponentFactoryResolver }, { type: RxViewDesignerModels }]; } });

const RX_VIEW_DESIGNER = {
    stencilGroups: {
        basicComponents: {
            label: 'Basic components'
        },
        chatbotComponents: {
            label: 'Chatbot components'
        },
        recordEditorInputs: {
            label: 'Record editor inputs'
        }
    },
    inspectorTabs: {
        viewProperties: {
            tabId: 0
        },
        componentProperties: {
            tabId: 1
        },
        validationIssues: {
            tabId: 2
        }
    }
};

class ViewDesignerPaletteComponent {
    constructor(stringService) {
        this.stringService = stringService;
        this.allowedDropListIds = [];
        this.filterFormControl = new FormControl();
        this.componentsSubject$ = new ReplaySubject(1);
    }
    set components(value) {
        this.componentsSubject$.next(value);
    }
    ngOnInit() {
        this.viewComponentGroups$ = combineLatest([
            this.filterFormControl.valueChanges.pipe(debounceTime(200), startWith(null)),
            this.componentsSubject$
        ]).pipe(map$1(([componentNameFilterText, viewComponentDescriptors]) => flow((descriptors) => groupBy(descriptors, (component) => component.group), (groupsByName) => map(groupsByName, (components, groupName) => ({
            name: groupName,
            components: sortBy(components, (component) => isFinite(component.index) ? component.index : component.name)
        })), (groups) => sortBy(groups, (group) => {
            if (group.name === RX_VIEW_DESIGNER.stencilGroups.basicComponents.label) {
                return '1';
            }
            else if (group.name === RX_VIEW_DESIGNER.stencilGroups.recordEditorInputs.label) {
                return '2';
            }
            else {
                return '3' + lowerCase(group.name);
            }
        }), (groups) => componentNameFilterText
            ? groups
                .map((group) => (Object.assign(Object.assign({}, group), { components: group.components.filter((component) => this.stringService.caseInsensitiveSearch(component.name, componentNameFilterText)) })))
                .filter((group) => group.components.length)
            : groups)(viewComponentDescriptors)));
    }
    getViewComponentDragData(descriptor) {
        return {
            draggedViewComponentDescriptor: descriptor
        };
    }
    trackByNameFn(index, item) {
        return item.name;
    }
    ngOnDestroy() {
        this.componentsSubject$.complete();
    }
}
ViewDesignerPaletteComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDesignerPaletteComponent, deps: [{ token: i2$1.RxStringService }], target: i0.ɵɵFactoryTarget.Component });
ViewDesignerPaletteComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ViewDesignerPaletteComponent, selector: "rx-view-designer-palette", inputs: { components: "components", allowedDropListIds: "allowedDropListIds" }, ngImport: i0, template: "<div class=\"search-field-container\">\n  <adapt-rx-search\n    [formControl]=\"filterFormControl\"\n    rx-id=\"stencil-search-field\"\n    placeholder=\"Search\"\n  ></adapt-rx-search>\n</div>\n\n<adapt-accordion [config]=\"{ multiselect: true, tabs: [] }\">\n  <adapt-accordion-tab\n    *ngFor=\"let viewComponentsGroup of viewComponentGroups$ | async; trackBy: trackByNameFn\"\n    [title]=\"viewComponentsGroup.name\"\n    [attr.rx-id]=\"stringService.toRxId(viewComponentsGroup.name)\"\n    [isOpen]=\"true\"\n  >\n    <div\n      class=\"group-items-container\"\n      cdkDropList\n      cdkDropListSortingDisabled\n      [cdkDropListConnectedTo]=\"allowedDropListIds\"\n    >\n      <div\n        *ngFor=\"let viewComponent of viewComponentsGroup.components; trackBy: trackByNameFn\"\n        [attr.rx-id]=\"viewComponent.type\"\n        class=\"group-item\"\n        cdkDrag\n        [cdkDragData]=\"getViewComponentDragData(viewComponent)\"\n      >\n        <div class=\"group-item-inner\">\n          <span class=\"item-image d-icon-{{ viewComponent.icon || 'wall' }}\"></span>\n\n          <span class=\"item-name\" title=\"{{ viewComponent.name }}\">\n            {{ viewComponent.name }}\n          </span>\n        </div>\n      </div>\n    </div>\n  </adapt-accordion-tab>\n</adapt-accordion>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:block}.group-items-container{display:flex;flex-wrap:wrap}.group-items-container .group-item.cdk-drag-placeholder{width:33.3%}.group-item{border-right:1px solid #d6d7d8;border-bottom:1px solid #d6d7d8;text-align:center;width:33.3%;cursor:move;height:90px;padding:3px 0}.group-item.cdk-drag-preview{background:white;box-shadow:0 5px 5px -3px #0003,0 8px 10px 1px #00000024,0 3px 14px 2px #0000001f}.group-item.cdk-drag-placeholder{border:0;width:100px;height:40px;padding:0;position:relative;z-index:3}.group-item.cdk-drag-placeholder .group-item-inner{border:1px solid #d6d7d8;background:#fff}.group-item:nth-child(3n){border-right:none}.group-item-inner{position:relative;display:flex;flex-direction:column}.item-image{color:#626668;font-size:40px;height:54px;flex-grow:1}.item-name{font-size:10px;overflow:hidden;height:34px}.cdk-drag-placeholder{opacity:1!important}adapt-accordion-tab ::ng-deep .card-block{padding:0}.form-group{margin:10px 20px}.search-field-container{padding:.9375rem}\n"], components: [{ type: i3$3.AdaptRxSearchComponent, selector: "adapt-rx-search", inputs: ["mode", "autocomplete", "placeholder", "size", "searchButton", "searchButtonText", "clearButtonText", "debounceTime", "ariaControlsPopupId", "ariaActiveDescendant", "initialAlign"], outputs: ["editModeChange"] }, { type: i3$3.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i3$3.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }], directives: [{ type: i3$2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3$2.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4$1.CdkDropList, selector: "[cdkDropList], cdk-drop-list", inputs: ["cdkDropListConnectedTo", "id", "cdkDropListEnterPredicate", "cdkDropListSortPredicate", "cdkDropListDisabled", "cdkDropListSortingDisabled", "cdkDropListAutoScrollDisabled", "cdkDropListOrientation", "cdkDropListLockAxis", "cdkDropListData", "cdkDropListAutoScrollStep"], outputs: ["cdkDropListDropped", "cdkDropListEntered", "cdkDropListExited", "cdkDropListSorted"], exportAs: ["cdkDropList"] }, { type: i4$1.CdkDrag, selector: "[cdkDrag]", inputs: ["cdkDragDisabled", "cdkDragStartDelay", "cdkDragLockAxis", "cdkDragConstrainPosition", "cdkDragPreviewClass", "cdkDragBoundary", "cdkDragRootElement", "cdkDragPreviewContainer", "cdkDragData", "cdkDragFreeDragPosition"], outputs: ["cdkDragStarted", "cdkDragReleased", "cdkDragEnded", "cdkDragEntered", "cdkDragExited", "cdkDragDropped", "cdkDragMoved"], exportAs: ["cdkDrag"] }], pipes: { "async": i4.AsyncPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDesignerPaletteComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-view-designer-palette',
                    templateUrl: './view-designer-palette.component.html',
                    styleUrls: ['./view-designer-palette.component.scss'],
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i2$1.RxStringService }]; }, propDecorators: { components: [{
                type: Input
            }], allowedDropListIds: [{
                type: Input
            }] } });

const RX_VIEW_MODEL = new InjectionToken('RX_VIEW_MODEL');
class RxViewDesignerComponent {
    constructor(viewDesignerFacade, rxNotificationService, rxDefinitionPickerCacheService, rxNamedListDefinitionCacheService, rxModalService, translateService, rxUtilityModalsService, rxViewDesignerHelperService, rxExpressionEditorService, rxViewDefinitionService, rxComponentCanDeactivateGuard, rxViewDefinitionGeneratorService, rxViewDesignerModels, rxLogService, injector, renderer, rxRecordDefinitionCacheService, rxAssociationDefinitionCacheService, rxProcessDefinitionCacheService, rxViewDefinitionCacheService, rxGainsightConfiguratorService, rxDefinitionNameService, rxFeatureService) {
        this.viewDesignerFacade = viewDesignerFacade;
        this.rxNotificationService = rxNotificationService;
        this.rxDefinitionPickerCacheService = rxDefinitionPickerCacheService;
        this.rxNamedListDefinitionCacheService = rxNamedListDefinitionCacheService;
        this.rxModalService = rxModalService;
        this.translateService = translateService;
        this.rxUtilityModalsService = rxUtilityModalsService;
        this.rxViewDesignerHelperService = rxViewDesignerHelperService;
        this.rxExpressionEditorService = rxExpressionEditorService;
        this.rxViewDefinitionService = rxViewDefinitionService;
        this.rxComponentCanDeactivateGuard = rxComponentCanDeactivateGuard;
        this.rxViewDefinitionGeneratorService = rxViewDefinitionGeneratorService;
        this.rxViewDesignerModels = rxViewDesignerModels;
        this.rxLogService = rxLogService;
        this.injector = injector;
        this.renderer = renderer;
        this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
        this.rxAssociationDefinitionCacheService = rxAssociationDefinitionCacheService;
        this.rxProcessDefinitionCacheService = rxProcessDefinitionCacheService;
        this.rxViewDefinitionCacheService = rxViewDefinitionCacheService;
        this.rxGainsightConfiguratorService = rxGainsightConfiguratorService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxFeatureService = rxFeatureService;
        this.viewDefinitionSaved = new EventEmitter();
        this.viewDefinitionErrorLoading = new EventEmitter();
        this.closeDesigner = new EventEmitter();
        this.destroyed$ = new ReplaySubject(1);
        this.inspectorFocusEditorSubject = new Subject();
        this.isViewDefinitionChanged$ = new BehaviorSubject(false);
        this.validationIssues$ = this.rxViewDesignerHelperService.validationIssues$.pipe(shareReplay(1), takeUntil(this.destroyed$));
        this.breadcrumbItems$ = this.rxViewDesignerHelperService.breadcrumbItems$;
        this.canvasLayout$ = this.rxViewDesignerHelperService.canvasLayout$;
        this.canvasDndListIds = this.rxViewDesignerHelperService.canvasDndListIds;
        this.extensionViewRootComponentType = RxViewComponentType.RecordEditor;
        // Component UI State
        this.isDesignMode = true;
        this.isStencilExpanded = true;
        this.isInspectorExpanded = true;
        this.inspectorFocusEditor$ = this.inspectorFocusEditorSubject.asObservable();
        this.viewComponentInspectorEmptyText$ = this.viewDesignerFacade.selectedComponentInspectorLayout$.pipe(switchMap((selectedComponentLayout) => selectedComponentLayout
            ? of(null)
            : this.viewDesignerFacade.selectedComponentGuid$.pipe(withLatestFrom(this.viewDesignerFacade.viewModel$), map$1(([selectedComponentGuid, viewModel]) => selectedComponentGuid && selectedComponentGuid !== viewModel.guid
                ? 'Selected component has no properties.'
                : 'Select a component to view its properties here.'))), shareReplay({
            refCount: true,
            bufferSize: 1
        }));
        this.selectedComponentModel$ = this.viewDesignerFacade.selectedComponentGuid$.pipe(map$1((guid) => this.rxViewDesignerModels.get(guid)));
        this.isReadOnly$ = this.viewDesignerFacade.isViewReadOnly$;
        this.paletteComponents$ = combineLatest([
            this.viewDesignerFacade.isExtensionView$.pipe(tap((isExtensionView) => (this.isExtensionView = isExtensionView))),
            this.viewDesignerFacade.isExtensionContainerSet$.pipe(tap((isExtensionContainerSet) => (this.isExtensionContainerSet = isExtensionContainerSet))),
            this.rxViewDesignerHelperService
                .getLicensedComponents()
                .pipe(map$1((descriptors) => this.configuration.paletteComponentsPredicate
                ? descriptors.filter((descriptor) => this.configuration.paletteComponentsPredicate(descriptor))
                : descriptors))
        ]).pipe(switchMap(([isExtensionView, isExtensionContainerSet, componentDescriptors]) => isExtensionView
            ? this.viewDesignerFacade.firstViewComponentModelType$.pipe(map$1((firstViewComponentType) => firstViewComponentType === this.extensionViewRootComponentType
                ? componentDescriptors.filter(({ type }) => type !== this.extensionViewRootComponentType &&
                    this.rxViewDesignerHelperService.extensionViewAllowedComponentTypes.has(type))
                : componentDescriptors.filter(({ type }) => type === this.extensionViewRootComponentType)))
            : of(componentDescriptors)));
        const customViewModel = this.injector.get(RX_VIEW_MODEL, null, InjectFlags.Optional);
        this.rxViewModel = customViewModel || this.injector.get(RxViewModel);
        this.rxDefinitionPickerCacheService.registerConsumer();
        this.rxNamedListDefinitionCacheService.registerConsumer(this.destroyed$);
        this.rxAssociationDefinitionCacheService.registerConsumer(this.destroyed$);
        this.rxProcessDefinitionCacheService.registerConsumer(this.destroyed$);
        this.rxRecordDefinitionCacheService.registerConsumer(this.destroyed$);
        this.rxViewDefinitionCacheService.registerConsumer(this.destroyed$);
    }
    ngOnInit() {
        this.isPreviewAvailable$ = this.viewDesignerFacade.getViewPropertyValue('lastUpdateTime').pipe(map$1((lastUpdateTime) => !this.configuration.disablePreview &&
            (Boolean(lastUpdateTime) || !isUndefined(this.configuration.viewDefinitionName))), takeUntil(this.destroyed$));
        this.viewDefinitionName$ = this.viewDesignerFacade.getViewPropertyValue('name');
        this.viewDesignerFacade
            .getViewPropertyValue('pageComponent')
            .pipe(takeUntil(this.destroyed$))
            .subscribe((pageComponent) => {
            this.isPageView = Boolean(pageComponent);
        });
        this.viewDesignerFacade.viewDefinitionSaveSuccess$
            .pipe(takeUntil(this.destroyed$))
            .subscribe(({ viewDefinitionName }) => {
            this.rxNotificationService.addSuccessMessage('View definition saved successfully.');
            this.viewDefinitionSaved.emit(viewDefinitionName);
            this.initViewDesigner();
        });
        this.viewDesignerFacade.viewDefinitionLoadError$
            .pipe(takeUntil(this.destroyed$))
            .subscribe(() => this.viewDefinitionErrorLoading.emit());
        this.hasValidationErrors$ = this.validationIssues$.pipe(map$1((validationIssues) => Boolean(filter$1(validationIssues, {
            issues: [{ type: ValidationIssueType.Error }]
        }).length)), distinctUntilChanged());
        this.hasValidationWarning$ = this.validationIssues$.pipe(map$1((validationIssues) => Boolean(filter$1(validationIssues, {
            issues: [{ type: ValidationIssueType.Warning }]
        }).length)), distinctUntilChanged());
        this.isSaveButtonDisabled$ = combineLatest([
            this.hasValidationErrors$,
            this.viewDesignerFacade.areViewModelsReady$,
            this.isViewDefinitionChanged$,
            this.isReadOnly$
        ]).pipe(map$1(([hasValidationErrors, areViewModelsReady, isChanged, isReadOnly]) => hasValidationErrors || !areViewModelsReady || !isChanged || isReadOnly), startWith(true));
        this.isReadOnly$.pipe(takeUntil(this.destroyed$)).subscribe((isReadOnly) => {
            if (isReadOnly) {
                this.rxNotificationService.addWarningMessage(this.translateService.instant('com.bmc.arsys.rx.client.designer.read-only-definition-warning.message'));
            }
        });
        if (this.rxFeatureService.isFeatureEnabled('DRD21-11744')) {
            this.viewDefinitionName$.pipe(take(1)).subscribe((viewDefinitionName) => {
                this.rxGainsightConfiguratorService.updateGlobalContext({
                    subProductLevel1: {
                        name: 'Design'
                    },
                    subProductLevel2: {
                        name: this.rxDefinitionNameService.getDisplayName(viewDefinitionName) == RX_APPLICATION.shellDefinitionName
                            ? 'Shell designer'
                            : 'View designer'
                    }
                });
            });
        }
    }
    ngOnChanges(changes) {
        if (changes.configuration.currentValue) {
            this.initViewDesigner(true);
        }
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
        this.inspectorFocusEditorSubject.complete();
        this.isViewDefinitionChanged$.complete();
        this.rxDefinitionPickerCacheService.unRegisterConsumer();
        this.viewDesignerFacade.destroyViewDesigner();
        this.rxGainsightConfiguratorService.removeGlobalContext(['subProductLevel2', 'subProductLevel3']);
    }
    initViewDesigner(dispatchInitViewDesignerAction = false) {
        var _a;
        // Mark view definition as not changed if it's not. This needs for scenario when view designer
        // will be reinitialized with another view definition name and current view is dirty.
        if (this.isViewDefinitionChanged$.getValue()) {
            this.isViewDefinitionChanged$.next(false);
        }
        (_a = this.viewDefinitionChangeSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        if (dispatchInitViewDesignerAction) {
            this.viewDesignerFacade.initViewDesigner(pick(this.configuration, ['bundleId', 'viewDefinitionName', 'layoutTemplate']));
        }
        this.initViewDefinitionChangeSubscription();
    }
    initViewDefinitionChangeSubscription() {
        this.viewDefinitionChangeSubscription = this.viewDesignerFacade.areViewModelsReady$
            .pipe(
        // Wait until models state will be updated with view and view components data.
        filter(Boolean), take(1), switchMap(() => combineLatest([this.viewDesignerFacade.viewModel$, this.viewDesignerFacade.viewComponentModels$]).pipe(map$1(([viewModel, viewComponentModels]) => this.rxViewDefinitionGeneratorService.generate(viewModel, viewComponentModels)), distinctUntilChanged(isEqual), 
        // Skip first emit from distinctUntilChanged.
        skip(1), 
        // Complete after first emit, it's considered that view definition gets changed so no needs for further emits.
        take(1), takeUntil(this.destroyed$))), takeUntil(this.destroyed$))
            .subscribe(() => {
            this.isViewDefinitionChanged$.next(true);
        });
    }
    onSelectComponent(guid) {
        this.viewDesignerFacade.selectComponent(guid);
    }
    onDropComponent(data) {
        this.viewDesignerFacade.insertComponent(data);
    }
    onRemoveComponent(guid) {
        this.rxUtilityModalsService
            .confirm('Are you sure you want to delete this view component?')
            .then((isConfirmed) => {
            if (isConfirmed) {
                this.viewDesignerFacade.removeViewComponents([guid], true);
                if (this.isPageView) {
                    this.viewDesignerFacade.updateViewProperties({ pageComponent: null });
                }
            }
        });
    }
    onInspectorTabChange(event) {
        this.viewDesignerFacade.selectInspectorTab({ tabId: event.index });
    }
    toggleDesignMode() {
        if (this.isDesignMode) {
            this.viewDesignerFacade.generateViewDefinition();
        }
        this.isDesignMode = !this.isDesignMode;
    }
    onComponentPropertiesChange(properties) {
        this.viewDesignerFacade.updateSelectedComponentProperties(properties);
    }
    onEditorEvent(event, inspectorElementRef) {
        if (event.type === RX_VALIDATION_FORM_CONTROL.events.correctValidationIssue) {
            this.correctValidationIssue(event.payload.componentGuid, event.payload.propertyName);
        }
        if (event.type === RX_REVERT_CUSTOMIZATION.events.revertCustomization) {
            this.revertCustomization();
        }
        if (event.type === RX_EXPRESSION_EDITOR.events.openExpressionEditor) {
            this.openExpressionEditor(event.payload, inspectorElementRef);
        }
    }
    getExpressionProperties(inspectorElementRef) {
        return (this.viewComponentPropertyInspectorElementRef === inspectorElementRef
            ? this.viewDesignerFacade.selectedComponentProperties$
            : this.viewDesignerFacade.viewModel$).pipe(map$1((properties) => Array.from(this.renderer
            .selectRootElement(inspectorElementRef.nativeElement, true)
            .querySelectorAll('rx-expression-form-control')).map((element) => {
            const propertyPath = element.getAttribute('property-path');
            return {
                path: propertyPath,
                value: get(properties, propertyPath),
                label: element.getAttribute('property-label')
            };
        })));
    }
    openExpressionEditor(payload, inspectorElementRef) {
        const isComponentInspectorChange = this.viewComponentPropertyInspectorElementRef === inspectorElementRef;
        const props$ = isComponentInspectorChange
            ? this.viewDesignerFacade.selectedComponentProperties$
            : this.viewDesignerFacade.viewModel$;
        combineLatest([this.viewDesignerFacade.selectedComponentGuid$, props$])
            .pipe(take(1), switchMap(([componentGuid, properties]) => {
            const model = isComponentInspectorChange ? this.rxViewDesignerModels.get(componentGuid) : this.rxViewModel;
            const expressionConfigurator = model === null || model === void 0 ? void 0 : model.expressionConfigurator;
            if (expressionConfigurator) {
                return this.rxExpressionEditorService
                    .openEditor({
                    property: {
                        path: payload.propertyPath,
                        value: get(properties, payload.propertyPath),
                        label: payload.propertyLabel
                    },
                    isReadOnly: payload.isReadOnly,
                    expressionConfigurator,
                    legend: [
                        {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.function.label'),
                            icon: 'd-icon-mathematical_function'
                        },
                        {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.keyword.label'),
                            icon: 'd-icon-dollar'
                        },
                        {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.view-component.label'),
                            icon: 'd-icon-file_o'
                        },
                        {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.view-component-property.label'),
                            icon: 'd-icon-file_o_gear'
                        },
                        {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.view-input-parameter.label'),
                            icon: 'd-icon-arrow_right_square_input'
                        }
                    ],
                    expressionPropertyNavigator: {
                        getProperties: this.getExpressionProperties.bind(this, inspectorElementRef)
                    }
                })
                    .pipe(withLatestFrom(props$), map$1(([{ path, value }, props]) => {
                    if (props.hasOwnProperty(path)) {
                        return { [path]: value };
                    }
                    else {
                        // Don't override nested model properties e.g,
                        // when 'path' = "outputParams[1].source" and 'value' = "${bar}", model will be updated from:
                        // {..., outputParams: [{name: 'foo', source: ${foo}}, {name: 'bar', source: null}] } to:
                        // {..., outputParams: [{name: 'foo', source: ${foo}}, {name: 'bar', source: ${bar}}] }
                        const headPropertyName = toPath(path)[0];
                        // clone value because "set" mutates object, otherwise expression
                        // form control component will not be updated with new value.
                        return set({ [headPropertyName]: cloneDeep(props[headPropertyName]) }, path, value);
                    }
                }));
            }
            else {
                this.rxLogService.debug('View designer: Expression editor cannot be opened without expression configurator.');
                return EMPTY;
            }
        }), takeUntil(this.destroyed$))
            .subscribe((value) => isComponentInspectorChange
            ? this.viewDesignerFacade.updateSelectedComponentProperties(value)
            : this.viewDesignerFacade.updateViewProperties(value));
    }
    saveViewDefinition() {
        this.viewDesignerFacade.viewModel$
            .pipe(take(1), switchMap((viewModel) => {
            const message = viewModel.type === ViewDefinitionType.Shell
                ? 'If you save your changes now, you will not be able to run this application using the old UI. Do you want to continue?'
                : 'If you save this view definition, you will not be able to open it in the old view designer. Do you want to continue?';
            if (viewModel.isAngularJsView) {
                return this.rxModalService.confirm({
                    title: 'Warning',
                    modalStyle: RX_MODAL.modalStyles.warning,
                    message
                });
            }
            else {
                return of(true);
            }
        }), filter(Boolean), takeUntil(this.destroyed$))
            .subscribe(() => {
            this.viewDesignerFacade.saveViewDefinition();
        });
    }
    onCorrectIssue(validationIssue) {
        this.correctValidationIssue(validationIssue.data.guid, validationIssue.data.propertyName, validationIssue.data.data);
    }
    correctValidationIssue(guid, propertyName, data) {
        this.viewDesignerFacade.selectComponent(guid);
        // need to wait until inspector will be visible
        // there are no way to focus to invisible elements
        setTimeout(() => this.inspectorFocusEditorSubject.next({ editorName: propertyName, data }), 10);
    }
    revertCustomization() {
        this.viewDefinitionName$
            .pipe(switchMap((viewDefinitionName) => this.rxViewDefinitionService.revertCustomization(viewDefinitionName)), takeUntil(this.destroyed$))
            .subscribe(() => {
            this.rxComponentCanDeactivateGuard.disable();
            window.location.reload();
        });
    }
    onViewPropertiesChange(properties) {
        this.viewDesignerFacade.updateViewProperties(properties);
    }
    showPreview() {
        this.viewDesignerFacade.runPreview();
    }
    canDeactivate() {
        let canDeactivate = true;
        combineLatest([this.isViewDefinitionChanged$, this.isReadOnly$])
            .pipe(map$1(([isChanged, isReadOnly]) => !isChanged || isReadOnly), take(1))
            .subscribe((isPristineOrReadOnly) => {
            canDeactivate = isPristineOrReadOnly;
        });
        return canDeactivate;
    }
    onBeforeComponentDropInRoot(event) {
        if (this.isExtensionView) {
            if (!this.isExtensionContainerSet) {
                this.rxNotificationService.addWarningMessage('Select Extension container before adding view components.');
                event.preventDrop = true;
            }
            else if (event.draggedViewComponentDescriptor.type !== RxViewComponentType.RecordEditor) {
                this.rxNotificationService.addWarningMessage('This view component can only be added inside a Record editor.');
                event.preventDrop = true;
            }
        }
    }
}
RxViewDesignerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDesignerComponent, deps: [{ token: ViewDesignerFacade }, { token: i3.RxNotificationService }, { token: i3$1.RxDefinitionPickerCacheService }, { token: i4$2.RxNamedListDefinitionCacheService }, { token: i5$1.RxModalService }, { token: i6.TranslateService }, { token: i5$1.RxUtilityModalsService }, { token: RxViewDesignerHelperService }, { token: i3$1.RxExpressionEditorService }, { token: i5.RxViewDefinitionService }, { token: i3.RxComponentCanDeactivateGuard }, { token: RxViewDefinitionGeneratorService }, { token: RxViewDesignerModels }, { token: i3.RxLogService }, { token: i0.Injector }, { token: i0.Renderer2 }, { token: i11.RxRecordDefinitionCacheService }, { token: i12.RxAssociationDefinitionCacheService }, { token: i13.RxProcessDefinitionCacheService }, { token: i5.RxViewDefinitionCacheService }, { token: i3$1.RxGainsightConfiguratorService }, { token: i3.RxDefinitionNameService }, { token: i3.RxFeatureService }], target: i0.ɵɵFactoryTarget.Component });
RxViewDesignerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxViewDesignerComponent, selector: "rx-view-designer", inputs: { configuration: "configuration" }, outputs: { viewDefinitionSaved: "viewDefinitionSaved", viewDefinitionErrorLoading: "viewDefinitionErrorLoading", closeDesigner: "closeDesigner" }, providers: [RxViewModel], viewQueries: [{ propertyName: "viewPropertyInspectorElementRef", first: true, predicate: ["viewPropertyInspector"], descendants: true, read: ElementRef }, { propertyName: "viewComponentPropertyInspectorElementRef", first: true, predicate: ["viewComponentPropertyInspector"], descendants: true, read: ElementRef }], usesOnChanges: true, ngImport: i0, template: "<rx-designer-header\n  [bundleName]=\"viewDesignerFacade.bundleFriendlyName$ | async\"\n  [breadcrumbItems]=\"breadcrumbItems$ | async\"\n  [isDesignMode]=\"isDesignMode\"\n  [isPreviewAvailable]=\"isPreviewAvailable$ | async\"\n  [isSaveButtonDisabled]=\"isSaveButtonDisabled$ | async\"\n  (breadcrumbSelected)=\"onSelectComponent($event.data.guid)\"\n  (toggleDesignMode)=\"toggleDesignMode()\"\n  (showPreview)=\"showPreview()\"\n  (save)=\"saveViewDefinition()\"\n  (closeDesigner)=\"closeDesigner.emit()\"\n></rx-designer-header>\n\n<div class=\"rx-component-view-designer\" [hidden]=\"!isDesignMode\">\n  <rx-blade\n    [title]=\"'Palette'\"\n    rx-id=\"palette\"\n    (toggle)=\"isStencilExpanded = !isStencilExpanded\"\n    [isExpanded]=\"isStencilExpanded\"\n  >\n    <rx-view-designer-palette\n      *ngIf=\"!isPageView && !(isReadOnly$ | async)\"\n      [components]=\"paletteComponents$ | async\"\n      [allowedDropListIds]=\"canvasDndListIds\"\n    ></rx-view-designer-palette>\n\n    <adapt-alert\n      *ngIf=\"isPageView && !(isReadOnly$ | async)\"\n      class=\"p-3\"\n      [config]=\"{\n        content:\n          'There are no view components to display. View with a Page view component cannot contain any other view components.',\n        variant: 'info',\n        type: 'inline'\n      }\"\n    ></adapt-alert>\n\n    <adapt-alert\n      *ngIf=\"!(viewDesignerFacade.isViewDefinitionLoading$ | async) && isReadOnly$ | async\"\n      class=\"p-3\"\n      [config]=\"{\n        content: 'This view is not editable. There are no view components to display.',\n        variant: 'info',\n        type: 'inline'\n      }\"\n    ></adapt-alert>\n  </rx-blade>\n\n  <section class=\"rx-view-designer-container\">\n    <rx-view-designer-canvas\n      class=\"flex-grow-1\"\n      [layout]=\"canvasLayout$ | async\"\n      [isReadOnly]=\"isReadOnly$ | async\"\n      (componentSelect)=\"onSelectComponent($event)\"\n      (componentRemove)=\"onRemoveComponent($event)\"\n      (componentDrop)=\"onDropComponent($event)\"\n      (beforeComponentDropInRoot)=\"onBeforeComponentDropInRoot($event)\"\n    ></rx-view-designer-canvas>\n  </section>\n\n  <rx-blade\n    [title]=\"'Properties'\"\n    dockTo=\"right\"\n    rx-id=\"properties\"\n    (toggle)=\"isInspectorExpanded = !isInspectorExpanded\"\n    [isExpanded]=\"isInspectorExpanded\"\n  >\n    <adapt-tabset\n      [tab-active]=\"viewDesignerFacade.selectedInspectorTabId$ | async\"\n      (tab-active-changed)=\"onInspectorTabChange($event)\"\n      [class.has-validation-warning]=\"hasValidationWarning$ | async\"\n      [class.has-validation-errors]=\"hasValidationErrors$ | async\"\n      customCssTabContent=\"p-0\"\n      justify=\"justified\"\n    >\n      <adapt-tab-panel icon=\"d-icon-pencil\">\n        <rx-form-builder\n          #viewPropertyInspector\n          (modelChange)=\"onViewPropertiesChange($event)\"\n          (editorEvent)=\"onEditorEvent($event, viewPropertyInspectorElementRef)\"\n          [focusEditor$]=\"inspectorFocusEditor$\"\n          [config]=\"viewDesignerFacade.viewInspectorLayout$ | async\"\n          [model]=\"viewDesignerFacade.viewModel$ | async\"\n          [isReadOnly]=\"isReadOnly$ | async\"\n        ></rx-form-builder>\n      </adapt-tab-panel>\n\n      <adapt-tab-panel icon=\"d-icon-gear\">\n        <rx-form-builder\n          rxInspector\n          [designerItemModel]=\"selectedComponentModel$ | async\"\n          #viewComponentPropertyInspector\n          (modelChange)=\"onComponentPropertiesChange($event)\"\n          (editorEvent)=\"onEditorEvent($event, viewComponentPropertyInspectorElementRef)\"\n          [focusEditor$]=\"inspectorFocusEditor$\"\n          [config]=\"viewDesignerFacade.selectedComponentInspectorLayout$ | async\"\n          [model]=\"viewDesignerFacade.selectedComponentProperties$ | async\"\n          [guid]=\"viewDesignerFacade.selectedComponentGuid$ | async\"\n          [isReadOnly]=\"isReadOnly$ | async\"\n        ></rx-form-builder>\n\n        <adapt-alert\n          [hidden]=\"!(viewComponentInspectorEmptyText$ | async)\"\n          class=\"p-3\"\n          [config]=\"{\n            content: viewComponentInspectorEmptyText$ | async,\n            variant: 'info',\n            type: 'inline'\n          }\"\n        ></adapt-alert>\n      </adapt-tab-panel>\n\n      <adapt-tab-panel icon=\"d-icon-exclamation_triangle\">\n        <rx-validation-issues\n          [definitionTypeDisplayName]=\"'com.bmc.arsys.rx.client.view-definition.label' | translate\"\n          (correctIssue)=\"onCorrectIssue($event)\"\n          [issueSections]=\"validationIssues$ | async\"\n        ></rx-validation-issues>\n      </adapt-tab-panel>\n    </adapt-tabset>\n  </rx-blade>\n</div>\n\n<adapt-code-viewer\n  *ngIf=\"!isDesignMode\"\n  [code]=\"viewDesignerFacade.viewDefinition$ | async | json\"\n  [lang]=\"'javascript'\"\n  [hasToolbar]=\"false\"\n  [theme]=\"'light'\"\n  class=\"full-size\"\n>\n</adapt-code-viewer>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:flex;flex-direction:column;height:100%;width:100%}.rx-component-view-designer{display:flex;flex-grow:1;height:calc(100% - 50px);overflow:hidden}.rx-view-designer-container{display:flex;flex-direction:column;flex-grow:1;overflow:auto;padding:2.2rem 1rem 1rem}:host ::ng-deep .has-validation-warning:not(.has-validation-errors) .nav-link .d-icon-exclamation_triangle{color:#f1b521}:host ::ng-deep .has-validation-errors .nav-link .d-icon-exclamation_triangle{color:#f83200}:host ::ng-deep adapt-tabset .nav-tabs .nav-link-icon{margin-right:0}\n"], components: [{ type: i3$1.RxDesignerHeaderComponent, selector: "rx-designer-header", inputs: ["bundleName", "breadcrumbItems", "isDesignMode", "isPreviewAvailable", "isSaveButtonDisabled"], outputs: ["breadcrumbSelected", "toggleDesignMode", "showPreview", "save", "closeDesigner"] }, { type: i5$1.RxBladeComponent, selector: "rx-blade", inputs: ["title", "isExpanded", "dockTo"], outputs: ["toggle"] }, { type: ViewDesignerPaletteComponent, selector: "rx-view-designer-palette", inputs: ["components", "allowedDropListIds"] }, { type: i3$3.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: ViewDesignerCanvasComponent, selector: "rx-view-designer-canvas", inputs: ["layout", "isReadOnly"], outputs: ["componentSelect", "componentDrop", "componentRemove", "beforeComponentDropInRoot"] }, { type: i3$3.AdaptTabsComponent, selector: "adapt-tabset", inputs: ["showTabToolbar", "customCssTabContent", "fullHeight", "texts", "enableDnD", "customClassTabList", "allow-tabs-adding", "id", "testID", "dropdown-title", "fadeColor", "carouselMode", "justify", "type", "tab-active"], outputs: ["tab-index-closed", "tab-active-changed", "add-tab-clicked", "tabClicked", "tabDropped"], exportAs: ["adaptTabset"] }, { type: i3$3.AdaptTabsPanelComponent, selector: "adapt-tab-panel, div[tab-panel]", inputs: ["isActive", "badge-type", "animateBadge", "showBadgeAlert", "badgeAlertVariant", "badgeCustomClass", "adapt-tab-title", "disabled", "isHidden", "icon", "subtext", "icon-right", "icon-close", "aria-label", "aria-labelledby", "kebabMenu", "id", "renderContentWhenInactive", "badge"] }, { type: i3$1.FormBuilderComponent, selector: "rx-form-builder", inputs: ["config", "model", "guid", "isReadOnly", "focusEditor$"], outputs: ["modelChange", "editorEvent", "formInitialized"] }, { type: i5$1.RxValidationIssuesComponent, selector: "rx-validation-issues", inputs: ["definitionTypeDisplayName", "issueSections"], outputs: ["correctIssue"] }, { type: i3$3.AdaptCodeViewerComponent, selector: "adapt-code-viewer", inputs: ["code", "theme", "lang", "texts", "hasToolbar"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3$1.InspectorDirective, selector: "[rxInspector]", inputs: ["designerItemModel"] }], pipes: { "async": i4.AsyncPipe, "translate": i6.TranslatePipe, "json": i4.JsonPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDesignerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-view-designer',
                    templateUrl: './view-designer.component.html',
                    styleUrls: ['./view-designer.component.scss'],
                    providers: [RxViewModel]
                }]
        }], ctorParameters: function () { return [{ type: ViewDesignerFacade }, { type: i3.RxNotificationService }, { type: i3$1.RxDefinitionPickerCacheService }, { type: i4$2.RxNamedListDefinitionCacheService }, { type: i5$1.RxModalService }, { type: i6.TranslateService }, { type: i5$1.RxUtilityModalsService }, { type: RxViewDesignerHelperService }, { type: i3$1.RxExpressionEditorService }, { type: i5.RxViewDefinitionService }, { type: i3.RxComponentCanDeactivateGuard }, { type: RxViewDefinitionGeneratorService }, { type: RxViewDesignerModels }, { type: i3.RxLogService }, { type: i0.Injector }, { type: i0.Renderer2 }, { type: i11.RxRecordDefinitionCacheService }, { type: i12.RxAssociationDefinitionCacheService }, { type: i13.RxProcessDefinitionCacheService }, { type: i5.RxViewDefinitionCacheService }, { type: i3$1.RxGainsightConfiguratorService }, { type: i3.RxDefinitionNameService }, { type: i3.RxFeatureService }]; }, propDecorators: { configuration: [{
                type: Input
            }], viewDefinitionSaved: [{
                type: Output
            }], viewDefinitionErrorLoading: [{
                type: Output
            }], closeDesigner: [{
                type: Output
            }], viewPropertyInspectorElementRef: [{
                type: ViewChild,
                args: ['viewPropertyInspector', { read: ElementRef }]
            }], viewComponentPropertyInspectorElementRef: [{
                type: ViewChild,
                args: ['viewComponentPropertyInspector', { read: ElementRef }]
            }] } });

class ViewDesignerCanvasModule {
}
ViewDesignerCanvasModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDesignerCanvasModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ViewDesignerCanvasModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDesignerCanvasModule, declarations: [ViewDesignerCanvasComponent,
        CanvasItemComponent,
        CanvasItemContainerComponent,
        CanvasOutletComponent,
        CanvasItemColumnComponent], imports: [CommonModule, DragDropModule], exports: [ViewDesignerCanvasComponent, CanvasOutletComponent, CanvasItemComponent, CanvasItemColumnComponent] });
ViewDesignerCanvasModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDesignerCanvasModule, imports: [[CommonModule, DragDropModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDesignerCanvasModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, DragDropModule],
                    exports: [ViewDesignerCanvasComponent, CanvasOutletComponent, CanvasItemComponent, CanvasItemColumnComponent],
                    declarations: [
                        ViewDesignerCanvasComponent,
                        CanvasItemComponent,
                        CanvasItemContainerComponent,
                        CanvasOutletComponent,
                        CanvasItemColumnComponent
                    ],
                    entryComponents: [CanvasItemComponent, CanvasItemContainerComponent, CanvasOutletComponent, CanvasItemColumnComponent]
                }]
        }] });

class DesignerModule {
}
DesignerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DesignerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DesignerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DesignerModule, declarations: [DesignerComponent], imports: [ViewDesignerCanvasModule, CommonModule] });
DesignerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DesignerModule, imports: [[ViewDesignerCanvasModule, CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DesignerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ViewDesignerCanvasModule, CommonModule],
                    declarations: [DesignerComponent],
                    entryComponents: [DesignerComponent]
                }]
        }] });

class RxViewDesignerPaletteModule {
}
RxViewDesignerPaletteModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDesignerPaletteModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxViewDesignerPaletteModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDesignerPaletteModule, declarations: [ViewDesignerPaletteComponent], imports: [CommonModule,
        DragDropModule,
        ReactiveFormsModule,
        AdaptAccordionModule,
        AdaptTextFieldModule,
        AdaptRxSearchModule], exports: [ViewDesignerPaletteComponent] });
RxViewDesignerPaletteModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDesignerPaletteModule, imports: [[
            CommonModule,
            DragDropModule,
            ReactiveFormsModule,
            AdaptAccordionModule,
            AdaptTextFieldModule,
            AdaptRxSearchModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDesignerPaletteModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        DragDropModule,
                        ReactiveFormsModule,
                        AdaptAccordionModule,
                        AdaptTextFieldModule,
                        AdaptRxSearchModule
                    ],
                    exports: [ViewDesignerPaletteComponent],
                    declarations: [ViewDesignerPaletteComponent]
                }]
        }] });

class RuntimeViewParamsModalComponent extends RxModalClass {
    constructor(activeModalRef, injector) {
        super(activeModalRef, injector);
        this.activeModalRef = activeModalRef;
        this.injector = injector;
        this.inputParams = {};
        this.inputParamNames = this.activeModalRef.getData().inputParams;
    }
    isDirty() {
        return values(this.inputParams).some((paramValue) => paramValue);
    }
    cancel() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
}
RuntimeViewParamsModalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewParamsModalComponent, deps: [{ token: i3$3.ActiveModalRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
RuntimeViewParamsModalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RuntimeViewParamsModalComponent, selector: "rx-runtime-view-params-modal", usesInheritance: true, ngImport: i0, template: "<div class=\"modal-body\">\n  <div *ngFor=\"let inputParam of inputParamNames; first as isFirst; index as i\">\n    <adapt-rx-textfield\n      [attr.rx-id]=\"'input-param-' + (i + 1)\"\n      [label]=\"inputParam\"\n      [autofocus]=\"isFirst\"\n      [(ngModel)]=\"inputParams[inputParam]\"\n    >\n    </adapt-rx-textfield>\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <adapt-button btn-type=\"primary\" (click)=\"activeModalRef.close(inputParams)\" rx-id=\"ok-button\">\n    OK\n  </adapt-button>\n\n  <adapt-button btn-type=\"secondary\" (click)=\"cancel()\" rx-id=\"cancel-button\"> Cancel </adapt-button>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.modal-body{padding:20px}.modal-footer{display:flex;justify-content:flex-end;border-top:1px solid #d6d7d8;padding:10px 15px}.modal-footer adapt-button{margin-right:5px}\n"], components: [{ type: i3$3.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i3$3.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3$2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3$2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewParamsModalComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-runtime-view-params-modal',
                    templateUrl: './runtime-view-params-modal.component.html',
                    styleUrls: ['./runtime-view-params-modal.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i3$3.ActiveModalRef }, { type: i0.Injector }]; } });

class RuntimeViewParamsModalModule {
}
RuntimeViewParamsModalModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewParamsModalModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RuntimeViewParamsModalModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewParamsModalModule, declarations: [RuntimeViewParamsModalComponent], imports: [CommonModule, FormsModule, AdaptButtonModule, AdaptModalModule, AdaptRxTextfieldModule], exports: [RuntimeViewParamsModalComponent] });
RuntimeViewParamsModalModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewParamsModalModule, imports: [[CommonModule, FormsModule, AdaptButtonModule, AdaptModalModule, AdaptRxTextfieldModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewParamsModalModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, AdaptButtonModule, AdaptModalModule, AdaptRxTextfieldModule],
                    exports: [RuntimeViewParamsModalComponent],
                    declarations: [RuntimeViewParamsModalComponent],
                    entryComponents: [RuntimeViewParamsModalComponent]
                }]
        }] });

class RxViewActionExpressionConfigurator extends RxViewExpressionConfigurator {
    constructor(injector, actionType, actionGuid) {
        super(injector);
        this.injector = injector;
        this.actionType = actionType;
        this.actionGuid = actionGuid;
        this.rxViewDataDictionaryService = this.injector.get(RxViewDataDictionaryService);
        this.rxDefaultExpressionEvaluatorService = this.injector.get(RxDefaultExpressionEvaluatorService);
        this.rxViewActionRegistryService = this.injector.get(RxViewActionRegistryService);
        this.commonDataDictionary$ = this.rxViewDataDictionaryService.getActionDataDictionary(this.actionGuid);
    }
    getExpressionEvaluator(propertyName) {
        const propertyDescriptor = this.rxViewActionRegistryService
            .get(this.actionType)
            .parameters.find((param) => param.name === propertyName);
        return get(propertyDescriptor, 'evaluatorService', this.rxDefaultExpressionEvaluatorService);
    }
}

class NamedListFilterExpressionConfigurator extends RxViewExpressionConfigurator {
    constructor(fieldDefinition, injector) {
        super(injector);
        this.fieldDefinition = fieldDefinition;
        this.injector = injector;
        this.rxNamedListDefinitionCacheService = this.injector.get(RxNamedListDefinitionCacheService);
        this.rxRecordDefinitionCacheService = this.injector.get(RxRecordDefinitionCacheService);
        this.rxViewDataDictionaryService = this.injector.get(RxViewDataDictionaryService);
        this.rxDefaultExpressionEvaluatorService = this.injector.get(RxDefaultExpressionEvaluatorService);
        this.commonDataDictionary$ = this.rxNamedListDefinitionCacheService
            .getNamedListDefinition(this.fieldDefinition.namedListDefinition)
            .pipe(switchMap((namedListDefinition) => this.rxRecordDefinitionCacheService.getRecordDefinition(namedListDefinition.recordDefinitionName)), switchMap((recordDefinition) => this.getNamedListBranch(recordDefinition)), withLatestFrom(this.rxViewDataDictionaryService.getCommonDataDictionary()), map$1(([namedListBranch, dataDictionary]) => [namedListBranch, ...dataDictionary]));
    }
    getExpressionEvaluator() {
        return this.rxDefaultExpressionEvaluatorService;
    }
    getDefaultConfig() {
        return Object.assign(Object.assign({}, super.getDefaultConfig()), { operators: ExpressionOperatorRowsByGroup.get(ExpressionOperatorGroup.AllServer) });
    }
    getNamedListBranch(recordDefinition) {
        const namedListDictionaryNodes = chain(recordDefinition.fieldDefinitions)
            .reject({ resourceType: RX_RECORD_DEFINITION.resourceTypes.attachment })
            .map((fieldDefinition) => ({
            label: fieldDefinition.name,
            expression: `'${fieldDefinition.id}'`,
            icon: 'd-icon-file_o_gear',
            children: fieldDefinition.resourceType === RX_RECORD_DEFINITION.resourceTypes.selection
                ? [
                    {
                        label: 'Options',
                        children: map(fieldDefinition.optionNamesById, (optionName, optionValue) => ({
                            label: optionName,
                            expression: optionValue,
                            icon: 'd-icon-file_o_gear'
                        }))
                    }
                ]
                : []
        }))
            .sortBy('label')
            .value();
        return of({
            label: 'Filter by',
            expanded: true,
            children: namedListDictionaryNodes
        });
    }
}

class ActionSandbox {
    constructor(injector, descriptor, guid, initialProps) {
        this.injector = injector;
        this.descriptor = descriptor;
        this.guid = guid;
        this.initialProps = initialProps;
        this.destroyedSubject = new Subject();
        this.viewDesignerFacade = this.injector.get(ViewDesignerFacade);
        this.actionPropertyEditorConfigSubject = new BehaviorSubject([]);
        this.actionPropertiesSubject = new BehaviorSubject(this.initialProps);
        this.children = [];
        this.children$ = this.viewDesignerFacade.getChildComponents(this.guid);
        this.destroyed$ = this.destroyedSubject.asObservable();
        this.actionPropertyEditorConfig$ = this.actionPropertyEditorConfigSubject.pipe(takeUntil(this.destroyed$));
        this.actionProperties$ = this.actionPropertiesSubject.pipe(map$1(() => omit(this.getActionProperties(), ['name'])), distinctUntilChanged(isEqual), takeUntil(this.destroyed$));
        this.children$.pipe(first(), takeUntil(this.destroyed$)).subscribe((children) => {
            this.setChildren(children);
        });
    }
    updateActionProperties(props) {
        this.actionPropertiesSubject.next(Object.assign(Object.assign({}, this.actionPropertiesSubject.getValue()), props));
    }
    setActionProperties(props) {
        const { name, index } = this.actionPropertiesSubject.getValue();
        this.actionPropertiesSubject.next(Object.assign(Object.assign({ $condition$: null }, props), { name,
            index }));
    }
    getActionProperties() {
        return this.actionPropertiesSubject.getValue();
    }
    getActionPropertyValue(propertyName) {
        return this.actionPropertiesSubject.getValue()[propertyName];
    }
    setActionPropertyEditorConfig(actionEditorConfig) {
        const expressionConfigurator = new RxViewActionExpressionConfigurator(this.injector, this.descriptor.name, this.guid);
        actionEditorConfig = [
            {
                name: '$condition$',
                component: ExpressionFormControlComponent,
                options: {
                    label: 'Condition',
                    tooltip: new Tooltip('The action will execute if the condition is true, or if no condition is defined.'),
                    dataDictionary$: expressionConfigurator.getDataDictionary(),
                    operators: expressionConfigurator.getOperators()
                }
            },
            ...actionEditorConfig
        ];
        this.actionPropertyEditorConfigSubject.next(actionEditorConfig);
    }
    getActionPropertyEditorConfig() {
        return this.actionPropertyEditorConfigSubject.getValue();
    }
    setActionOutputDataDictionary(dataDictionary) {
        // check why index is coming as a string for existing actions
        this.viewDesignerFacade.setActionDataDictionaryBranch(this.guid, this.getActionPropertyValue('index'), this.descriptor.label, dataDictionary);
    }
    setChildren(data) {
        this.children = data;
    }
    getChildren() {
        return this.children;
    }
    onDestroy() {
        this.destroyedSubject.next();
        this.destroyedSubject.complete();
    }
}

class RxViewDesignerActionModel {
    constructor(injector, sandbox) {
        this.injector = injector;
        this.sandbox = sandbox;
        this.guid = this.sandbox.guid;
        this.expressionConfigurator = new RxViewActionExpressionConfigurator(this.injector, this.sandbox.descriptor.name, this.sandbox.guid);
    }
    getExpressionConfigurator() {
        return this.expressionConfigurator;
    }
    getPropertiesByName() {
        return this.sandbox.getActionProperties();
    }
    getChildren() {
        return this.sandbox.getChildren();
    }
    getOutputExpressionForPropertyPath(propertyPath) {
        return `\${view.components.${this.guid}.output.${propertyPath}}`;
    }
}

class RxViewDesignerDefaultActionModel extends RxViewDesignerActionModel {
    constructor(injector, sandbox) {
        super(injector, sandbox);
        this.injector = injector;
        this.sandbox = sandbox;
        this.defaultProps = this.sandbox.descriptor.parameters.reduce((initialProps, param) => {
            initialProps[param.name] = param.defaultValue;
            return initialProps;
        }, {});
        this.sandbox.actionProperties$.pipe(take(1)).subscribe((props) => {
            this.sandbox.updateActionProperties(Object.assign(Object.assign({}, this.defaultProps), props));
            this.sandbox.setActionPropertyEditorConfig(this.getActionEditorConfig());
        });
    }
    getActionEditorConfig() {
        return this.sandbox.descriptor.parameters
            .filter((param) => param.editor)
            .map((param) => ({
            name: param.name,
            component: param.editor,
            options: Object.assign({ label: param.label, isRequired: param.isRequired, tooltip: param.tooltip }, (param.editor === ExpressionFormControlComponent
                ? {
                    dataDictionary$: this.expressionConfigurator.getDataDictionary(param.name),
                    operators: this.expressionConfigurator.getOperators(param.name)
                }
                : param.editorOptions || {}))
        }));
    }
}

class RxActionListModelManagerService {
    constructor(injector) {
        this.injector = injector;
        this.models = new Map();
    }
    create(descriptor, guid, initialProps) {
        var _a;
        const sandbox = new ActionSandbox(this.injector, descriptor, guid, isFunction((_a = descriptor === null || descriptor === void 0 ? void 0 : descriptor.designModel) === null || _a === void 0 ? void 0 : _a.getInitialProperties)
            ? Object.assign(Object.assign({}, descriptor.designModel.getInitialProperties(omit(initialProps, ['index', 'name']))), { name: initialProps.name, index: initialProps.index }) : initialProps);
        const Model = descriptor.designModel || RxViewDesignerDefaultActionModel;
        const actionModel = new Model(this.injector, sandbox);
        this.models.set(guid, actionModel);
        return actionModel;
    }
    remove(guid) {
        this.models.delete(guid);
    }
    get(guid) {
        return this.models.get(guid);
    }
    ngOnDestroy() {
        this.models.forEach((model) => model.sandbox.onDestroy());
        this.models.clear();
    }
}
RxActionListModelManagerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxActionListModelManagerService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxActionListModelManagerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxActionListModelManagerService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxActionListModelManagerService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });

class ActionListEditorDialogComponent extends RxModalClass {
    constructor(rxViewActionRegistryService, rxStringService, activeModalRef, viewDesignerFacade, rxActionListModelManagerService, rxExpressionEditorService, rxGuidService, translateService, injector) {
        super(activeModalRef, injector);
        this.rxViewActionRegistryService = rxViewActionRegistryService;
        this.rxStringService = rxStringService;
        this.activeModalRef = activeModalRef;
        this.viewDesignerFacade = viewDesignerFacade;
        this.rxActionListModelManagerService = rxActionListModelManagerService;
        this.rxExpressionEditorService = rxExpressionEditorService;
        this.rxGuidService = rxGuidService;
        this.translateService = translateService;
        this.injector = injector;
        this.availableActionDescriptors$ = this.rxViewActionRegistryService.getLicensedActions();
        this.selectedActions = [];
        this.config = this.activeModalRef.getData();
        this.treeWrap = TreeWrap.WrapAll;
        this.destroyed$ = new ReplaySubject(1);
        this.isEditorDirtySubject = new BehaviorSubject(false);
        this.isSaveButtonDisabled$ = this.isEditorDirtySubject.asObservable().pipe(map$1((isDirty) => !isDirty));
        this.availableActionTreeNodes$ = this.availableActionDescriptors$.pipe(map$1((actions) => actions
            .filter((action) => !action.hidden)
            .sort((a, b) => a.label.localeCompare(b.label))
            .map((action) => ({
            data: action,
            label: action.label
        }))));
        this.actionLabelsMap$ = this.availableActionDescriptors$.pipe(map$1((actions) => transform(actions, (result, action) => {
            result[action.name] = action.label;
        }, {})));
        this.config.selectedActions = map(this.config.selectedActions, (action) => (Object.assign(Object.assign({}, action), { data: Object.assign(Object.assign({}, action.data), { index: toNumber(action.data.index) }) })));
        this.selectedActions = flow((actions) => sortBy(actions, (action) => action.data.index), (actions) => map(actions, (action) => {
            const descriptor = this.rxViewActionRegistryService.get(action.data.name);
            this.viewDesignerFacade.setActionDataDictionaryBranch(action.guid, action.data.index, action.data.name);
            const model = this.rxActionListModelManagerService.create(descriptor, action.guid, action.data);
            return {
                isOpen: Boolean(this.config.actionToEdit) && action.guid === this.config.actionToEdit.guid,
                model,
                config$: model.sandbox.actionPropertyEditorConfig$.pipe(map$1((config) => [{ controls: config }])),
                name: descriptor.name
            };
        }))(this.config.selectedActions);
    }
    isDirty() {
        return this.isEditorDirtySubject.getValue();
    }
    addAction(actionDescriptor, index = this.selectedActions.length) {
        const guid = this.rxGuidService.generate();
        this.viewDesignerFacade.setActionDataDictionaryBranch(guid, index, actionDescriptor.name);
        const model = this.rxActionListModelManagerService.create(actionDescriptor, guid, {
            name: actionDescriptor.name,
            index
        });
        this.selectedActions.splice(index, 0, {
            isOpen: true,
            model,
            config$: model.sandbox.actionPropertyEditorConfig$.pipe(map$1((config) => [{ controls: config }])),
            name: actionDescriptor.name
        });
        this.updateIndexProp();
        this.markEditorAsDirty();
        setTimeout(() => {
            this.accordionTabEls.toArray()[index].nativeElement.scrollIntoView({
                block: 'nearest'
            });
        });
    }
    onSave() {
        const result = this.selectedActions.map((action) => {
            var _a, _b, _c;
            return ({
                guid: action.model.guid,
                data: action.model.getPropertiesByName(),
                children: (_c = (_b = (_a = action.model).getChildren) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : null
            });
        });
        this.activeModalRef.close(result);
    }
    removeAction(action) {
        pull(this.selectedActions, action);
        this.rxActionListModelManagerService.remove(action.model.guid);
        this.viewDesignerFacade.removeActionDataDictionaryBranch(action.model.guid);
        this.markEditorAsDirty();
    }
    moveAction(fromIndex, toIndex) {
        moveItemInArray(this.selectedActions, fromIndex, toIndex);
        this.updateIndexProp();
        this.markEditorAsDirty();
    }
    toggleOpen(expandAll) {
        this.selectedActions.forEach((action) => (action.isOpen = expandAll));
    }
    onSelectedActionsListDrop(event) {
        var _a;
        const data = event.item.data;
        if ((_a = data.model) === null || _a === void 0 ? void 0 : _a.guid) {
            this.moveAction(event.previousIndex, event.currentIndex);
        }
        else {
            this.addAction(data, event.currentIndex);
        }
    }
    openExpressionEditor(model, propertyPath, propertyLabel, isReadOnly = false, element) {
        this.rxExpressionEditorService
            .openEditor({
            property: {
                path: propertyPath,
                value: get(model.sandbox.getActionProperties(), propertyPath),
                label: propertyLabel
            },
            isReadOnly,
            expressionConfigurator: model.getExpressionConfigurator(),
            legend: [
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.function.label'),
                    icon: 'd-icon-mathematical_function'
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.keyword.label'),
                    icon: 'd-icon-dollar'
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.view-component.label'),
                    icon: 'd-icon-file_o'
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.view-component-property.label'),
                    icon: 'd-icon-file_o_gear'
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.view-input-parameter.label'),
                    icon: 'd-icon-arrow_right_square_input'
                }
            ],
            expressionPropertyNavigator: {
                getProperties: () => {
                    const properties = Array.from(element.querySelectorAll('rx-expression-form-control')).map((controlElement) => {
                        const path = controlElement.getAttribute('property-path');
                        return {
                            path,
                            value: get(model.sandbox.getActionProperties(), path),
                            label: controlElement.getAttribute('property-label')
                        };
                    });
                    return of(properties);
                }
            }
        })
            .pipe(map$1(({ path, value }) => {
            const props = model.sandbox.getActionProperties();
            const headPropertyName = path in props ? path : toPath(path)[0];
            return set({ [headPropertyName]: cloneDeep(props[headPropertyName]) }, path, value);
        }))
            .subscribe((props) => {
            model.sandbox.updateActionProperties(props);
            this.markEditorAsDirty();
        });
    }
    onEvent(event, model, element) {
        if (event.type === RX_EXPRESSION_EDITOR.events.openExpressionEditor) {
            this.openExpressionEditor(model, event.payload.propertyPath, event.payload.propertyLabel, event.payload.isReadOnly, element);
        }
    }
    updateIndexProp() {
        this.selectedActions.forEach((action, index) => {
            action.model.sandbox.updateActionProperties({
                index
            });
        });
        this.viewDesignerFacade.updateActionDataDictionaryBranchOrder(this.selectedActions.reduce((result, action, index) => {
            result[action.model.guid] = index;
            return result;
        }, {}));
    }
    markEditorAsDirty() {
        this.isEditorDirtySubject.next(true);
    }
    ngAfterViewInit() {
        const openActionIndex = findIndex(this.selectedActions, 'isOpen');
        if (openActionIndex !== -1) {
            this.accordionTabEls.toArray()[openActionIndex].nativeElement.scrollIntoView({
                block: 'nearest'
            });
        }
    }
    ngOnDestroy() {
        this.isEditorDirtySubject.complete();
        this.destroyed$.next(true);
        this.destroyed$.complete();
        this.viewDesignerFacade.removeAllActionDataDictionaryBranches();
    }
    cancel() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
}
ActionListEditorDialogComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionListEditorDialogComponent, deps: [{ token: i5.RxViewActionRegistryService }, { token: i2$1.RxStringService }, { token: i3$3.ActiveModalRef }, { token: ViewDesignerFacade }, { token: RxActionListModelManagerService }, { token: i3$1.RxExpressionEditorService }, { token: i2$1.RxGuidService }, { token: i6.TranslateService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
ActionListEditorDialogComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ActionListEditorDialogComponent, selector: "rx-action-list-editor-dialog", providers: [RxActionListModelManagerService], viewQueries: [{ propertyName: "accordionTabEls", predicate: AdaptAccordionTabComponent, descendants: true, read: ElementRef }], usesInheritance: true, ngImport: i0, template: "<div class=\"designer-modal-body modal-body d-flex mh-100\">\n  <div class=\"row flex-grow-1 w-100\">\n    <div *ngIf=\"!config.isReadOnly\" class=\"col-4 border-right d-flex flex-column mh-100\">\n      <div class=\"d-flex align-items-start justify-content-between\">\n        <h4 class=\"mt-2\">\n          {{ 'com.bmc.arsys.rx.client.view-components.action-list.available-actions.title' | translate }}\n        </h4>\n      </div>\n\n      <div class=\"rx-card card flex-grow-1 mt-2\">\n        <div class=\"card-block\" *ngIf=\"availableActionTreeNodes$ | async as availableActionTreeNodes\">\n          <div\n            *ngIf=\"availableActionTreeNodes.length; else adaptTreeEmptyStateTemplate\"\n            cdkDropList\n            cdkDropListSortingDisabled\n            [cdkDropListConnectedTo]=\"'selected-action-list'\"\n          >\n            <adapt-tree\n              [value]=\"availableActionTreeNodes\"\n              filter=\"true\"\n              [wrap]=\"treeWrap\"\n            >\n              <ng-template let-action adaptTreeNodeTemplate>\n                <div\n                  *ngIf=\"action.data\"\n                  class=\"rx-tree-draggable-node\"\n                  cdkDrag\n                  [cdkDragData]=\"action.data\"\n                >\n                  <div (dblclick)=\"addAction(action.data)\">\n                    <button\n                      type=\"button\"\n                      class=\"rx-button-unstyled d-icon-plus_circle\"\n                      (click)=\"addAction(action.data)\"\n                    ></button>\n\n                    <span class=\"rx-tree-node-label ml-3\">{{ action.data.label }}</span>\n                  </div>\n                </div>\n              </ng-template>\n            </adapt-tree>\n          </div>\n\n          <ng-template #adaptTreeEmptyStateTemplate>\n            <div class=\"d-flex justify-content-center h-100 align-items-center mt-2\">\n              <adapt-empty-state\n                class=\"w-100\"\n                label=\"{{ 'com.bmc.arsys.rx.client.view-components.action-list.available-actions.empty-state.message' | translate }}\"\n                type=\"search\"\n              ></adapt-empty-state>\n            </div>\n          </ng-template>         \n        </div>\n      </div>\n    </div>\n\n    <div class=\"d-flex flex-column mh-100 {{ config.isReadOnly ? 'col' : 'col-8' }}\">\n      <div class=\"d-flex align-items-start justify-content-between\">\n        <div class=\"d-flex align-items-center\">\n          <h4 class=\"mt-2\">\n            {{ 'com.bmc.arsys.rx.client.view-components.action-list.selected-actions.title' | translate }}\n          </h4>\n\n          <adapt-icon\n            class=\"ml-2\"\n            name=\"question_circle_o\"\n            adaptPopover=\"{{ 'com.bmc.arsys.rx.client.view-components.action-list.selected-actions.tooltip' | translate }}\"\n            appendToBody=\"true\"\n          >\n          </adapt-icon>\n        </div>\n\n        <div *ngIf=\"selectedActions.length\" class=\"btn-group\">\n          <button\n            adapt-button\n            btn-type=\"tertiary\"\n            type=\"button\"\n            rx-id=\"expand-all-button\"\n            (click)=\"toggleOpen(true)\"\n          >\n            {{ 'com.bmc.arsys.rx.client.common.expand-all.label' | translate }}\n          </button>\n\n          <button\n            adapt-button\n            btn-type=\"tertiary\"\n            type=\"button\"\n            rx-id=\"collapse-all-button\"\n            (click)=\"toggleOpen(false)\"\n          >\n            {{ 'com.bmc.arsys.rx.client.common.collapse-all.label' | translate }}\n          </button>\n        </div>\n      </div>\n\n      <div\n        id=\"selected-action-list\"\n        class=\"designer-modal-accordion-wrapper\"\n        cdkDropList\n        (cdkDropListDropped)=\"onSelectedActionsListDrop($event)\"\n      >\n        <adapt-accordion [multiselect]=\"true\">\n          <div\n            *ngFor=\"\n              let action of selectedActions;\n              let index = index;\n              let first = first;\n              let last = last;\n            \"\n            class=\"designer-modal-accordion-content\"\n            cdkDrag\n            cdkDragLockAxis=\"y\"\n            [cdkDragData]=\"action\"\n            [cdkDragDisabled]=\"config.isReadOnly\"\n            #container\n          >\n            <div *ngIf=\"!config.isReadOnly\" class=\"designer-modal-drag-handle d-icon-left-dots\" cdkDragHandle></div>\n\n            <adapt-accordion-tab\n              class=\"d-block\"\n              [isOpen]=\"action.isOpen\"\n              (open)=\"action.isOpen = true\"\n              (close)=\"action.isOpen = false\"\n            >\n              <div class=\"card-title-text w-100\">\n                <div class=\"designer-modal-card-title-content\">\n                  <div class=\"left-header-block\" [class.pl-0]=\"config.isReadOnly\">\n                    <div *ngIf=\"actionLabelsMap$ | async as actionLabelsMap\" class=\"rx-ellipsis\" [title]=\"actionLabelsMap[action.name]\"\n                      rx-id=\"card-title\">\n                      {{ actionLabelsMap[action.name] }}\n                    </div>\n                  </div>\n\n                  <div *ngIf=\"!config.isReadOnly\" class=\"right-header-block\">\n                    <div class=\"designer-modal-card-title-index-buttons\">\n                      <button\n                        class=\"d-icon-left-triangle_down rx-button-unstyled\"\n                        type=\"button\"\n                        [disabled]=\"last\"\n                        (click)=\"$event.stopPropagation(); moveAction(index, index + 1)\"\n                        rx-id=\"move-down-button\"\n                      ></button>\n\n                      <button\n                        class=\"d-icon-left-triangle_up rx-button-unstyled\"\n                        type=\"button\"\n                        [disabled]=\"first\"\n                        (click)=\"$event.stopPropagation(); moveAction(index, index - 1)\"\n                        rx-id=\"move-up-button\"\n                      ></button>\n                    </div>\n\n                    <button\n                      class=\"d-icon-left-cross_adapt p-1 pr-4 ml-3\"\n                      adapt-button\n                      size=\"small\"\n                      type=\"button\"\n                      (click)=\"$event.stopPropagation(); removeAction(action)\"\n                      rx-id=\"remove-button\"\n                    >\n                      {{ 'com.bmc.arsys.rx.client.common.remove.label' | translate }}\n                    </button>\n                  </div>\n                </div>\n              </div>\n\n              <rx-form-builder\n                class=\"d-block\"\n                [config]=\"action.config$ | async\"\n                [model]=\"action.model.sandbox.actionProperties$ | async\"\n                (modelChange)=\"action.model.sandbox.updateActionProperties($event); markEditorAsDirty()\"\n                (editorEvent)=\"onEvent($event, action.model, container)\"\n                [isReadOnly]=\"config.isReadOnly\"\n              ></rx-form-builder>\n            </adapt-accordion-tab>\n          </div>\n        </adapt-accordion>\n      </div>\n\n      <div *ngIf=\"!selectedActions.length\" class=\"d-flex justify-content-center h-100 align-items-center mt-2\">\n        <adapt-empty-state\n          class=\"w-100\"\n          label=\"{{ 'com.bmc.arsys.rx.client.view-components.action-list.selected-actions.empty-state.message' | translate }}\"\n          type=\"config\"\n        ></adapt-empty-state>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    *ngIf=\"!config.isReadOnly\"\n    adapt-button\n    btn-type=\"primary\"\n    type=\"button\"\n    rx-id=\"save-button\"\n    [disabled]=\"isSaveButtonDisabled$ | async\"\n    (click)=\"onSave()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button adapt-button btn-type=\"secondary\" type=\"button\" rx-id=\"cancel-button\" (click)=\"cancel()\">\n    {{ config.isReadOnly ? ('com.bmc.arsys.rx.client.common.close.label' | translate) :\n    ('com.bmc.arsys.rx.client.common.cancel.label' | translate) }}\n  </button>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.designer-modal-body{height:645px;min-height:calc(100% - 61px)!important}.designer-modal-accordion-wrapper{display:flex;flex-direction:column;height:100%;overflow:auto;padding-top:10px}.designer-modal-accordion-content{position:relative}.designer-modal-accordion-content.cdk-drag-preview{z-index:1200!important}.designer-modal-drag-handle{cursor:move;position:absolute;top:0;left:0;height:46px;padding:14px 10px 14px 14px;z-index:1}.designer-modal-card-title-content{width:100%;display:flex}.designer-modal-card-title-content .left-header-block,.designer-modal-card-title-content .right-header-block{display:flex;align-items:center}.designer-modal-card-title-content .left-header-block{flex-grow:1;min-width:0;font-size:14px;padding-left:22px}.designer-modal-card-sub-title{color:#7c7f81;font-weight:normal}.designer-modal-card-title-index-buttons{display:flex;font-size:19px}.rx-card{overflow:auto}.rx-tree-draggable-node{cursor:pointer}.rx-tree-draggable-node.cdk-drag-preview{z-index:1200!important}.rx-tree-draggable-node.cdk-drag{opacity:1}.rx-tree-node-label{word-break:break-all}rx-form-builder{max-width:400px}:host::ng-deep .a-tree__node_leaf .a-tree__toggle{display:none}\n"], components: [{ type: i3$3.AdaptTreeComponent, selector: "adapt-tree", inputs: ["value", "filter", "texts", "filterBtnClearText", "filterPlaceholder", "testID", "lazy", "lazyLoading", "trim", "wrap", "selectAllButton", "deselectAllButton", "treeScrollHeight", "adaptRadarDisableEventSending", "draggableScope", "droppableScope", "draggableNodes", "droppableNodes", "validateDrop"], outputs: ["onNodeDrop", "lazyLoad"] }, { type: i3$3.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }, { type: i3$3.AdaptIconComponent, selector: "adapt-icon", inputs: ["name", "classList", "description", "testID"] }, { type: i3$3.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i3$3.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i3$3.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }, { type: i3$1.FormBuilderComponent, selector: "rx-form-builder", inputs: ["config", "model", "guid", "isReadOnly", "focusEditor$"], outputs: ["modelChange", "editorEvent", "formInitialized"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4$1.CdkDropList, selector: "[cdkDropList], cdk-drop-list", inputs: ["cdkDropListConnectedTo", "id", "cdkDropListEnterPredicate", "cdkDropListSortPredicate", "cdkDropListDisabled", "cdkDropListSortingDisabled", "cdkDropListAutoScrollDisabled", "cdkDropListOrientation", "cdkDropListLockAxis", "cdkDropListData", "cdkDropListAutoScrollStep"], outputs: ["cdkDropListDropped", "cdkDropListEntered", "cdkDropListExited", "cdkDropListSorted"], exportAs: ["cdkDropList"] }, { type: i3$3.AdaptTreeNodeTemplateDirective, selector: "[adaptTreeNodeTemplate]", inputs: ["adaptTreeNodeTemplate"] }, { type: i4$1.CdkDrag, selector: "[cdkDrag]", inputs: ["cdkDragDisabled", "cdkDragStartDelay", "cdkDragLockAxis", "cdkDragConstrainPosition", "cdkDragPreviewClass", "cdkDragBoundary", "cdkDragRootElement", "cdkDragPreviewContainer", "cdkDragData", "cdkDragFreeDragPosition"], outputs: ["cdkDragStarted", "cdkDragReleased", "cdkDragEnded", "cdkDragEntered", "cdkDragExited", "cdkDragDropped", "cdkDragMoved"], exportAs: ["cdkDrag"] }, { type: i3$3.AdaptPopoverDirective, selector: "[adaptPopover]", inputs: ["adaptPopover", "popoverTitle", "placement", "fallbackPlacement", "triggers", "container", "appendToBody", "closeBtn", "popupDelay", "disablePopover", "popoverClass", "autoClose", "closeOnOutOfView", "maxWidth", "minWidth"], outputs: ["shown", "hidden"], exportAs: ["adaptPopover"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4$1.CdkDragHandle, selector: "[cdkDragHandle]", inputs: ["cdkDragHandleDisabled"] }], pipes: { "translate": i6.TranslatePipe, "async": i4.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionListEditorDialogComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-action-list-editor-dialog',
                    templateUrl: './action-list-editor-dialog.component.html',
                    styleUrls: ['./action-list-editor-dialog.component.scss'],
                    providers: [RxActionListModelManagerService]
                }]
        }], ctorParameters: function () { return [{ type: i5.RxViewActionRegistryService }, { type: i2$1.RxStringService }, { type: i3$3.ActiveModalRef }, { type: ViewDesignerFacade }, { type: RxActionListModelManagerService }, { type: i3$1.RxExpressionEditorService }, { type: i2$1.RxGuidService }, { type: i6.TranslateService }, { type: i0.Injector }]; }, propDecorators: { accordionTabEls: [{
                type: ViewChildren,
                args: [AdaptAccordionTabComponent, { read: ElementRef }]
            }] } });

class ActionListEditorDialogModule {
}
ActionListEditorDialogModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionListEditorDialogModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ActionListEditorDialogModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionListEditorDialogModule, declarations: [ActionListEditorDialogComponent], imports: [CommonModule,
        AdaptRxSearchModule,
        AdaptButtonModule,
        AdaptAccordionModule,
        DragDropModule,
        AdaptEmptyStateModule,
        ExpressionEditorModule,
        FormsModule,
        RxFormBuilderModule,
        AdaptIconModule,
        AdaptPopoverModule,
        TranslateModule,
        AdaptTreeModule], exports: [ActionListEditorDialogComponent] });
ActionListEditorDialogModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionListEditorDialogModule, imports: [[
            CommonModule,
            AdaptRxSearchModule,
            AdaptButtonModule,
            AdaptAccordionModule,
            DragDropModule,
            AdaptEmptyStateModule,
            ExpressionEditorModule,
            FormsModule,
            RxFormBuilderModule,
            AdaptIconModule,
            AdaptPopoverModule,
            TranslateModule,
            AdaptTreeModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionListEditorDialogModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ActionListEditorDialogComponent],
                    exports: [ActionListEditorDialogComponent],
                    entryComponents: [ActionListEditorDialogComponent],
                    imports: [
                        CommonModule,
                        AdaptRxSearchModule,
                        AdaptButtonModule,
                        AdaptAccordionModule,
                        DragDropModule,
                        AdaptEmptyStateModule,
                        ExpressionEditorModule,
                        FormsModule,
                        RxFormBuilderModule,
                        AdaptIconModule,
                        AdaptPopoverModule,
                        TranslateModule,
                        AdaptTreeModule
                    ]
                }]
        }] });

class ActionListControlComponent extends ValueAccessor {
    constructor(rxModalService, rxViewActionRegistryService) {
        super();
        this.rxModalService = rxModalService;
        this.rxViewActionRegistryService = rxViewActionRegistryService;
        this.availableActions$ = this.rxViewActionRegistryService.getLicensedActions();
        this.selectedActions = [];
        this.availableActions$.subscribe((actions) => {
            this.actionLabelsMap = transform(actions, (result, action) => {
                result[action.name] = action.label;
            }, {});
        });
    }
    focus(data) {
        if ((data === null || data === void 0 ? void 0 : data.actionIndex) >= 0) {
            this.openActionSelector(this.selectedActions.find((item) => item.data.index === data.actionIndex));
        }
        else {
            this.openActionSelector();
        }
    }
    openActionSelector(actionToEdit) {
        this.rxModalService
            .openModal({
            title: 'Edit actions',
            data: {
                selectedActions: this.value,
                actionToEdit,
                isReadOnly: this.isDisabled
            },
            content: ActionListEditorDialogComponent,
            size: OpenViewActionModalSize.Large,
            testID: 'edit-actions'
        })
            .then((actions) => {
            this.value = actions;
        })
            .catch(noop);
    }
    onSetValue() {
        this.updateSortedActionsList();
    }
    onWriteValue(value) {
        this.updateSortedActionsList();
    }
    removeAction(action) {
        this.value = without(this.value, action);
    }
    editAction(action) {
        this.openActionSelector(action);
    }
    updateSortedActionsList() {
        this.selectedActions = sortBy(this.value, (action) => action.data.index);
    }
}
ActionListControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionListControlComponent, deps: [{ token: i5$1.RxModalService }, { token: i5.RxViewActionRegistryService }], target: i0.ɵɵFactoryTarget.Component });
ActionListControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ActionListControlComponent, selector: "rx-action-list-control", inputs: { options: "options", tooltip: "tooltip" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: ActionListControlComponent,
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: "<adapt-button rx-id=\"open-modal-button\" btn-type=\"tertiary\" class=\"px-0 py-0 pb-1\" (click)=\"openActionSelector()\">\n  <adapt-icon name=\"plus_circle\" class=\"mr-1\"></adapt-icon>\n  Edit actions\n</adapt-button>\n\n<span *ngIf=\"tooltip\" class=\"align-middle\">\n  <span class=\"letter-space\"></span>\n  <adapt-icon [name]=\"'question_circle_o'\" [adaptPopover]=\"tooltip\" appendToBody=\"true\"></adapt-icon>\n</span>\n\n<div rx-id=\"columns\">\n  <span *ngIf=\"selectedActions.length === 0\" class=\"text-tertiary\">No actions added.</span>\n</div>\n\n<ul class=\"list-unstyled mb-0\" *ngIf=\"selectedActions.length > 0\">\n  <li class=\"border px-2 py-1 mb-1 d-flex align-items-center\" *ngFor=\"let action of selectedActions\">\n    <strong class=\"mr-auto\">{{ actionLabelsMap[action.data.name] }}</strong>\n\n    <button\n      class=\"d-icon-left-pencil p-1\"\n      adapt-button\n      btn-type=\"tertiary\"\n      size=\"small\"\n      type=\"button\"\n      (click)=\"editAction(action)\"\n    ></button>\n\n    <button\n      class=\"d-icon-left-cross_adapt p-1\"\n      adapt-button\n      btn-type=\"tertiary\"\n      size=\"small\"\n      type=\"button\"\n      *ngIf=\"!isDisabled\"\n      (click)=\"removeAction(action)\"\n    ></button>\n  </li>\n</ul>\n", components: [{ type: i3$3.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i3$3.AdaptIconComponent, selector: "adapt-icon", inputs: ["name", "classList", "description", "testID"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3$3.AdaptPopoverDirective, selector: "[adaptPopover]", inputs: ["adaptPopover", "popoverTitle", "placement", "fallbackPlacement", "triggers", "container", "appendToBody", "closeBtn", "popupDelay", "disablePopover", "popoverClass", "autoClose", "closeOnOutOfView", "maxWidth", "minWidth"], outputs: ["shown", "hidden"], exportAs: ["adaptPopover"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionListControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-action-list-control',
                    templateUrl: './action-list-control.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: ActionListControlComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i5$1.RxModalService }, { type: i5.RxViewActionRegistryService }]; }, propDecorators: { options: [{
                type: Input
            }], tooltip: [{
                type: Input
            }] } });

class ActionListControlModule {
}
ActionListControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionListControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ActionListControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionListControlModule, declarations: [ActionListControlComponent], imports: [CommonModule, AdaptIconModule, AdaptButtonModule, ActionListEditorDialogModule, AdaptPopoverModule], exports: [ActionListControlComponent] });
ActionListControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionListControlModule, imports: [[CommonModule, AdaptIconModule, AdaptButtonModule, ActionListEditorDialogModule, AdaptPopoverModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionListControlModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ActionListControlComponent],
                    exports: [ActionListControlComponent],
                    entryComponents: [ActionListControlComponent],
                    imports: [CommonModule, AdaptIconModule, AdaptButtonModule, ActionListEditorDialogModule, AdaptPopoverModule]
                }]
        }] });

class RxComponentPermissionEditorWidgetComponent {
    constructor(viewDesignerFacade) {
        this.viewDesignerFacade = viewDesignerFacade;
        this.permissions = [];
        this.destroyed$ = new ReplaySubject(1);
    }
    ngOnInit() {
        this.viewDesignerFacade
            .getComponentPermissions(this.options.componentGuid)
            .pipe(takeUntil(this.destroyed$))
            .subscribe((permissions) => {
            this.permissions = permissions;
        });
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    onPermissionsChange(permissions) {
        this.viewDesignerFacade.updateComponentModel(this.options.componentGuid, {
            permissions
        });
    }
}
RxComponentPermissionEditorWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxComponentPermissionEditorWidgetComponent, deps: [{ token: ViewDesignerFacade }], target: i0.ɵɵFactoryTarget.Component });
RxComponentPermissionEditorWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxComponentPermissionEditorWidgetComponent, selector: "rx-component-permission-editor-widget", inputs: { options: "options", isDisabled: "isDisabled" }, ngImport: i0, template: "<rx-permission-editor\n  [options]=\"options\"\n  [disabled]=\"isDisabled\"\n  [(ngModel)]=\"permissions\"\n  (ngModelChange)=\"onPermissionsChange($event)\"\n></rx-permission-editor>\n", components: [{ type: i3$1.RxPermissionEditorComponent, selector: "rx-permission-editor", inputs: ["options"] }], directives: [{ type: i3$2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3$2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxComponentPermissionEditorWidgetComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-component-permission-editor-widget',
                    templateUrl: './component-permission-editor-widget.component.html'
                }]
        }], ctorParameters: function () { return [{ type: ViewDesignerFacade }]; }, propDecorators: { options: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }] } });

class RxComponentPermissionEditorWidgetModule {
}
RxComponentPermissionEditorWidgetModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxComponentPermissionEditorWidgetModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxComponentPermissionEditorWidgetModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxComponentPermissionEditorWidgetModule, declarations: [RxComponentPermissionEditorWidgetComponent], imports: [CommonModule, FormsModule, RxPermissionEditorModule] });
RxComponentPermissionEditorWidgetModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxComponentPermissionEditorWidgetModule, imports: [[CommonModule, FormsModule, RxPermissionEditorModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxComponentPermissionEditorWidgetModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxComponentPermissionEditorWidgetComponent],
                    imports: [CommonModule, FormsModule, RxPermissionEditorModule]
                }]
        }] });

class RxViewCustomizationOptionsModule {
}
RxViewCustomizationOptionsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewCustomizationOptionsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxViewCustomizationOptionsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewCustomizationOptionsModule, declarations: [RxViewCustomizationOptionsComponent], imports: [CommonModule, FormsModule, CustomizationOptionsModule] });
RxViewCustomizationOptionsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewCustomizationOptionsModule, imports: [[CommonModule, FormsModule, CustomizationOptionsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewCustomizationOptionsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, CustomizationOptionsModule],
                    declarations: [RxViewCustomizationOptionsComponent]
                }]
        }] });

class ActionListWidgetComponent extends InspectorWidgetBase {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.actions = [];
        // @ts-ignore
        this.modelSandbox = this.designerItemModel.sandbox;
        this.destroyed$ = new ReplaySubject(1);
    }
    ngOnInit() {
        const actions$ = this.modelSandbox.getChildComponents();
        actions$.pipe(takeUntil(this.destroyed$)).subscribe((actions) => {
            this.actions = actions;
        });
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    onActionsChange(actions) {
        this.modelSandbox.setChildren(this.getActionComponentPayloads(actions));
    }
    focus(data) {
        this.actionListControlComponent.focus(data);
    }
    getActionComponentPayloads(actionInspectorModels) {
        return actionInspectorModels.map((model) => (Object.assign({ type: RxViewComponentType.Action }, model)));
    }
}
ActionListWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionListWidgetComponent, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
ActionListWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ActionListWidgetComponent, selector: "rx-action-list-widget", viewQueries: [{ propertyName: "actionListControlComponent", first: true, predicate: ActionListControlComponent, descendants: true }], usesInheritance: true, ngImport: i0, template: "<rx-action-list-control\n  [disabled]=\"modelSandbox.isViewReadOnly$ | async\"\n  [(ngModel)]=\"actions\"\n  (ngModelChange)=\"onActionsChange($event)\"\n  [tooltip]=\"options?.tooltip\"\n></rx-action-list-control>\n", components: [{ type: ActionListControlComponent, selector: "rx-action-list-control", inputs: ["options", "tooltip"] }], directives: [{ type: i3$2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3$2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "async": i4.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionListWidgetComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-action-list-widget',
                    templateUrl: './action-list-widget.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; }, propDecorators: { actionListControlComponent: [{
                type: ViewChild,
                args: [ActionListControlComponent]
            }] } });

class ActionListWidgetModule {
}
ActionListWidgetModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionListWidgetModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ActionListWidgetModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionListWidgetModule, declarations: [ActionListWidgetComponent], imports: [CommonModule, ActionListControlModule, FormsModule] });
ActionListWidgetModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionListWidgetModule, imports: [[CommonModule, ActionListControlModule, FormsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionListWidgetModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ActionListWidgetComponent],
                    imports: [CommonModule, ActionListControlModule, FormsModule]
                }]
        }] });

class ViewDesignerComponentModel {
    constructor(injector, sandbox) {
        this.injector = injector;
        this.sandbox = sandbox;
    }
    get expressionConfigurator() {
        if (!this._expressionConfigurator) {
            this._expressionConfigurator = new (this.sandbox.descriptor.expressionConfigurator ||
                RxViewComponentExpressionConfigurator)(this.injector, this.sandbox.guid, this, this.sandbox.descriptor.type);
        }
        return this._expressionConfigurator;
    }
    getExpressionForProperty(propertyPath) {
        return `\${view.components.${this.sandbox.guid}.${propertyPath}}`;
    }
}

const RX_AVAILABLE_ON_DEVICES_OPTIONS = [
    {
        id: RxDevice.Desktop,
        name: 'Desktop'
    },
    {
        id: RxDevice.Tablet,
        name: 'Tablet'
    },
    {
        id: RxDevice.Mobile,
        name: 'Mobile'
    }
];
function getAvailableOnDevicesInspectorConfig() {
    return {
        name: RX_AVAILABLE_ON_DEVICES_PROP_NAME,
        component: SelectFormControlComponent,
        options: {
            label: 'Available on devices',
            options: RX_AVAILABLE_ON_DEVICES_OPTIONS,
            multiple: true,
            required: true,
            hideSelectAllButton: true,
            hideDeselectAllButton: true
        }
    };
}
function getHiddenFieldInspectorConfig() {
    return {
        name: RX_HIDDEN_PROP_NAME,
        component: OptionalExpressionInspectorControlComponent,
        options: {
            label: 'Hidden'
        }
    };
}
function getDisabledFieldInspectorConfig() {
    return {
        name: RX_DISABLED_PROP_NAME,
        component: OptionalExpressionInspectorControlComponent,
        options: {
            label: 'Disabled'
        }
    };
}
function getStylesFieldInspectorConfig(autocompleteValues = []) {
    return {
        name: RX_STYLES_PROP_NAME,
        component: TagsFormControlComponent,
        options: {
            label: 'CSS classes',
            placeholder: 'Add CSS classes',
            tooltip: new Tooltip('Enter CSS class names to apply to this view component.'),
            errorCheck: validateCssClassName,
            autocompleteValues: autocompleteValues
        }
    };
}
function getStandardPropsInspectorConfigs() {
    return [getHiddenFieldInspectorConfig(), getAvailableOnDevicesInspectorConfig(), getStylesFieldInspectorConfig()];
}

class RxViewActionValidatorService {
    constructor(rxViewActionRegistryService, rxStringService, rxLogService, rxViewExpressionValidatorService) {
        this.rxViewActionRegistryService = rxViewActionRegistryService;
        this.rxStringService = rxStringService;
        this.rxLogService = rxLogService;
        this.rxViewExpressionValidatorService = rxViewExpressionValidatorService;
    }
    validate(actionsDesignData, propertyName) {
        const issues = flow((actions) => actions.map(({ data }) => {
            const descriptor = this.rxViewActionRegistryService.get(data.name);
            return [
                of(this.validateRequiredProps(data, descriptor, propertyName)),
                this.performCustomValidation(data, descriptor, propertyName),
                this.validateExpressions(data, descriptor, propertyName)
            ];
        }), flatten)(actionsDesignData);
        return combineLatest([of(this.validateActionSequence(actionsDesignData, propertyName)), ...issues]).pipe(map$1(flatten));
    }
    performCustomValidation(actionProps, descriptor, issuePropertyName) {
        const designManager = this.rxViewActionRegistryService.getDesignManager(descriptor.name);
        return designManager
            ? designManager.validate(actionProps, issuePropertyName).pipe(map$1((issues) => issues.map((issue) => (Object.assign(Object.assign({}, issue), { data: {
                    actionIndex: actionProps.index
                } })))))
            : of([]);
    }
    validateRequiredProps(actionProps, descriptor, issuePropertyName) {
        return flow((descriptorParams) => descriptorParams.filter((param) => param.isRequired === true && this.rxStringService.isEmptySafe(actionProps[param.name])), (descriptorParams) => descriptorParams.map((param) => ({
            type: 'error',
            description: `${descriptor.label} action: ${param.label || param.name} cannot be blank.`,
            propertyName: issuePropertyName,
            data: {
                actionIndex: actionProps.index
            }
        })))(descriptor.parameters);
    }
    validateExpressions(actionProps, descriptor, issuePropertyName) {
        const actionIssues = descriptor.parameters
            .filter((paramDescriptor) => paramDescriptor.enableExpressionEvaluation === true && actionProps[paramDescriptor.name])
            .map((paramDescriptor) => this.rxViewExpressionValidatorService
            .validate(actionProps[paramDescriptor.name], issuePropertyName, paramDescriptor.label || paramDescriptor.name, paramDescriptor.evaluatorService)
            .pipe(map$1((issues) => issues.map((issue) => (Object.assign(Object.assign({}, issue), { description: `${descriptor.label} action: ${issue.description}`, data: {
                actionIndex: actionProps.index
            } }))))));
        return actionIssues.length ? combineLatest(actionIssues).pipe(map$1(flatten)) : of([]);
    }
    validateActionSequence(actions, issuePropertyName) {
        return flow((actionsDesignData) => map(actionsDesignData, ({ data }) => {
            const descriptor = this.rxViewActionRegistryService.get(data.name);
            return descriptor
                ? map(data, (propertyValue, propertyName) => {
                    var _a;
                    if (((_a = descriptor.parameters.find((param) => param.name === propertyName)) === null || _a === void 0 ? void 0 : _a.enableExpressionEvaluation) &&
                        this.rxStringService.isNonEmptyString(propertyValue)) {
                        // Extract <ID> from ${view.components.<ID>.<Path>}
                        const matches = propertyValue.match(/\${view\.components\.([0-9a-z-]+)\..+}/);
                        if (matches && matches[1]) {
                            const referencedAction = find(actionsDesignData, { guid: matches[1] });
                            if (Number(referencedAction === null || referencedAction === void 0 ? void 0 : referencedAction.data.index) > Number(data.index)) {
                                return {
                                    type: 'error',
                                    description: `${descriptor.label} action: invalid expression for ${propertyName}.`,
                                    propertyName: issuePropertyName
                                };
                            }
                        }
                    }
                })
                : [];
        }), flatten, compact)(actions);
    }
}
RxViewActionValidatorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewActionValidatorService, deps: [{ token: i5.RxViewActionRegistryService }, { token: i2$1.RxStringService }, { token: i3.RxLogService }, { token: RxViewExpressionValidatorService }], target: i0.ɵɵFactoryTarget.Injectable });
RxViewActionValidatorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewActionValidatorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewActionValidatorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i5.RxViewActionRegistryService }, { type: i2$1.RxStringService }, { type: i3.RxLogService }, { type: RxViewExpressionValidatorService }]; } });

class ComponentSandbox {
    constructor(injector, guid, descriptor) {
        this.injector = injector;
        this.guid = guid;
        this.descriptor = descriptor;
        this.viewDesignerFacade = this.injector.get(ViewDesignerFacade);
        this.systemActions$ = this.injector.get(Actions);
        this.viewDesignerDispatcher = this.injector.get(ViewDesignerDispatcher);
        this.rxViewDesignerModels = this.injector.get(RxViewDesignerModels);
        this.childModelsInitialized$ = new BehaviorSubject(false);
        this.dispatcher$ = new Subject();
        this.breadcrumbs$ = new ReplaySubject(1);
        this.setUpPublicStreams();
        this.viewDesignerFacade
            .getComponentType(guid)
            .pipe(take(1))
            .subscribe((componentType) => (this.componentType = componentType));
        this.viewDesignerFacade
            .getComponentModel(this.guid)
            .pipe(map$1((model) => Boolean(model.lastUpdateTime || model.name)), switchMap((isExistingViewComponent) => {
            if (isExistingViewComponent) {
                return this.viewDesignerFacade.viewModelsInitialized$;
            }
            else {
                return of(null);
            }
        }), take(1), takeUntil(this.destroyed$))
            .subscribe(() => {
            this.childModelsInitialized$.next(true);
        });
        this.viewModelsInitialized$ = this.viewDesignerFacade.viewModelsInitialized$.pipe(takeUntil(this.destroyed$));
        // for optimization reasons postpone emit of breadcrumbs till component gets selected
        this.isComponentSelected$
            .pipe(filter((isSelected) => isSelected), first(), switchMap(() => this.breadcrumbs$), distinctUntilChanged(), takeUntil(this.destroyed$))
            .subscribe((label) => {
            this.dispatcher$.next(setBreadcrumbs({
                guid: this.guid,
                label
            }));
        });
        merge(
        // skip initial batch of setValidationIssues actions that are emitted during view designer initialization with empty payload
        this.dispatcher$.pipe(ofType(setValidationIssues), skipWhile((action) => action.issues.length === 0)), this.dispatcher$.pipe(filter((action) => action.type !== setValidationIssues.type)))
            .pipe(takeUntil(this.destroyed$))
            .subscribe((action) => this.viewDesignerDispatcher.dispatch(action));
        // complete created subjects
        this.destroyed$.subscribe(() => {
            this.childModelsInitialized$.complete();
            this.dispatcher$.complete();
            this.breadcrumbs$.complete();
        });
    }
    createError(description, propertyName, disableCorrection) {
        return { type: 'error', description, propertyName, disableCorrection };
    }
    createWarning(description, propertyName, disableCorrection) {
        return { type: 'warning', description, propertyName, disableCorrection };
    }
    getComponent(guid) {
        return this.viewDesignerFacade.getComponent(guid);
    }
    getChildComponents(filterPredicate) {
        return this.childModelsInitialized$
            .asObservable()
            .pipe(filter(Boolean), switchMapTo(this.viewDesignerFacade.getChildComponents(this.guid, filterPredicate)), takeUntil(this.destroyed$));
    }
    getChildComponentsTree() {
        return this.childModelsInitialized$.asObservable().pipe(filter((isInitialized) => isInitialized), switchMapTo(this.viewDesignerFacade.getChildComponentTree(this.guid)), shareReplay(1), takeUntil(this.destroyed$));
    }
    getChildComponentGuids(filterPredicate, recursive = false) {
        return this.childModelsInitialized$
            .asObservable()
            .pipe(filter(Boolean), switchMapTo(this.viewDesignerFacade.getChildComponentGuids(this.guid, recursive, filterPredicate)), takeUntil(this.destroyed$));
    }
    setChildren(data, parentGuid) {
        this.dispatcher$.next(setChildComponents({
            payload: {
                guid: parentGuid || this.guid,
                data
            }
        }));
    }
    setChildrenByType(data, types) {
        this.dispatcher$.next(setChildComponents({
            payload: {
                guid: this.guid,
                data,
                types
            }
        }));
    }
    getParentComponentGuid(componentType) {
        return this.viewDesignerFacade
            .getParentComponentGuid(this.guid, componentType)
            .pipe(distinctUntilChanged(), takeUntil(this.destroyed$));
    }
    setValidationIssues(issues) {
        this.dispatcher$.next(setValidationIssues({ issues, guid: this.guid }));
    }
    updateComponentProperties(properties) {
        this.viewDesignerFacade.updateComponentProperties(this.guid, properties);
    }
    getComponentPropertyValue(propertyName, componentGuid = this.guid) {
        return this.viewDesignerFacade
            .getComponentPropertyValue(componentGuid, propertyName)
            .pipe(shareReplay(1), takeUntil(this.destroyed$));
    }
    getViewPropertyValue(propertyName) {
        return this.viewDesignerFacade.getViewPropertyValue(propertyName).pipe(shareReplay(1), takeUntil(this.destroyed$));
    }
    updateInspectorConfig(inspectorConfig) {
        this.viewDesignerFacade.setComponentInspector(this.guid, inspectorConfig);
    }
    setBreadcrumbs(label) {
        this.breadcrumbs$.next(label);
    }
    addComponent(data) {
        const dataArray = castArray(data);
        const actionPayload = dataArray.map((component) => (Object.assign(Object.assign({}, component), { parentGuid: this.guid })));
        this.dispatcher$.next(addNewComponents({ payload: actionPayload }));
    }
    selectComponent(guid) {
        this.dispatcher$.next(selectComponent({ guid }));
    }
    removeComponents(guids, selectParent) {
        this.viewDesignerFacade.removeViewComponents(guids, selectParent);
    }
    moveComponent(guid, insertIndex, targetGuid) {
        const data = { guid };
        const columnIndex = 0;
        const outletName = RX_VIEW_DEFINITION.defaultOutletName;
        this.dispatcher$.next(insertComponent({
            data,
            insertIndex,
            columnIndex,
            outletName,
            targetGuid
        }));
    }
    setLayout(cols) {
        this.dispatcher$.next(setComponentLayout({
            guid: this.guid,
            cols
        }));
    }
    getLayout(guid) {
        return this.viewDesignerFacade.getComponentLayout(guid).pipe(shareReplay(1), takeUntil(this.destroyed$));
    }
    setCommonDataDictionary(dataDictionaryBranch) {
        this.viewDesignerFacade.setComponentCommonDataDictionaryBranch(this.guid, dataDictionaryBranch);
    }
    setSettablePropertiesDataDictionary(componentName, dataDictionary) {
        this.viewDesignerFacade.setComponentSettablePropertiesDataDictionary(this.guid, componentName, dataDictionary);
    }
    getComponentModel(guid) {
        return this.rxViewDesignerModels.get(guid);
    }
    getComponentsByType(type) {
        return this.viewDesignerFacade
            .getComponentsByType(type)
            .pipe(takeUntil(this.destroyed$));
    }
    setUpPublicStreams() {
        const viewComponentsRemovedAction$ = this.systemActions$.pipe(ofType(componentsRemoved), filter((action) => action.guids.includes(this.guid)));
        this.destroyed$ = merge(viewComponentsRemovedAction$, this.viewDesignerFacade.initViewDesigner$, this.viewDesignerFacade.destroyViewDesigner$).pipe(mapTo(true), first());
        this.componentProperties$ = this.viewDesignerFacade
            .getComponentProperties(this.guid)
            .pipe(filter(Boolean), takeUntil(this.destroyed$), shareReplay(1));
        this.isComponentSelected$ = this.systemActions$.pipe(ofType(selectComponent), map$1(({ guid }) => guid === this.guid), distinctUntilChanged(), startWith(false), takeUntil(this.destroyed$), shareReplay(1));
        this.isViewReadOnly$ = this.viewDesignerFacade.isViewReadOnly$;
    }
}

class RxViewExpressionValidatorRegistryService {
    constructor(rxViewComponentRegistryService, viewDesignerFacade, rxViewExpressionValidatorService) {
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        this.viewDesignerFacade = viewDesignerFacade;
        this.rxViewExpressionValidatorService = rxViewExpressionValidatorService;
        this.issuesObservableMap = new Map();
    }
    registerComponents(guids) {
        guids.forEach((guid) => this.issuesObservableMap.set(guid, this.getComponentValidationIssues(guid)));
        this.initValidation();
    }
    unregisterComponents(guids) {
        guids.forEach((guid) => this.issuesObservableMap.delete(guid));
        this.initValidation();
    }
    unregisterAllComponents() {
        var _a;
        this.issuesObservableMap.clear();
        (_a = this.validateSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
    initValidation() {
        var _a;
        (_a = this.validateSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        this.validateSubscription = combineLatest(Array.from(this.issuesObservableMap.entries()).map(([guid, issues$]) => issues$.pipe(map$1((issues) => ({
            [guid]: issues
        })))))
            .pipe(map$1((issuesByComponentGuid) => merge$1({}, ...issuesByComponentGuid)), skipWhile((issuesByComponentGuid) => every(Object.values(issuesByComponentGuid), isEmpty)), 
        // debounceTime will allow Set expression validation issues action to be executed once for improved performance.
        debounceTime(0))
            .subscribe((issues) => {
            this.viewDesignerFacade.setExpressionValidationIssues(issues);
        });
    }
    getComponentValidationIssues(guid) {
        return this.viewDesignerFacade.getComponentType(guid).pipe(take(1), switchMap((componentType) => {
            const descriptor = this.rxViewComponentRegistryService.get(componentType);
            const expressionProps = filter$1(descriptor === null || descriptor === void 0 ? void 0 : descriptor.properties, {
                enableExpressionEvaluation: true
            });
            const expressionPropertyNames = map(expressionProps, 'name');
            const descriptorPropMap = new Map(expressionProps.map((prop) => [prop.name, prop]));
            return expressionPropertyNames.length
                ? combineLatest(expressionPropertyNames.map((propertyName) => this.viewDesignerFacade
                    .getComponentPropertyValue(guid, propertyName)
                    .pipe(switchMap((propertyValue) => this.rxViewExpressionValidatorService
                    .validate(propertyValue, propertyName, descriptorPropMap.get(propertyName).label, descriptorPropMap.get(propertyName).evaluatorService)
                    .pipe(takeUntil(this.viewDesignerFacade.allComponentGuids$.pipe(filter((guids) => !guids.has(guid))))))))).pipe(map$1(flatten))
                : of([]);
        }), publishReplay(1), refCount());
    }
}
RxViewExpressionValidatorRegistryService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewExpressionValidatorRegistryService, deps: [{ token: i5.RxViewComponentRegistryService }, { token: ViewDesignerFacade }, { token: RxViewExpressionValidatorService }], target: i0.ɵɵFactoryTarget.Injectable });
RxViewExpressionValidatorRegistryService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewExpressionValidatorRegistryService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewExpressionValidatorRegistryService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i5.RxViewComponentRegistryService }, { type: ViewDesignerFacade }, { type: RxViewExpressionValidatorService }]; } });

class RxViewDesignerStateHelperService {
    getInitialComponentProperties(initialProperties, componentDescriptor) {
        var _a;
        let result = initialProperties;
        if (isFunction((_a = componentDescriptor.designComponentModel) === null || _a === void 0 ? void 0 : _a.getInitialProperties)) {
            result = componentDescriptor.designComponentModel.getInitialProperties(initialProperties);
        }
        return result;
    }
    getDefaultComponentPermissions(componentDescriptor) {
        var _a;
        let permissions = null;
        if (isFunction((_a = componentDescriptor.designComponentModel) === null || _a === void 0 ? void 0 : _a.getDefaultPermissions)) {
            permissions = componentDescriptor.designComponentModel.getDefaultPermissions();
        }
        return permissions;
    }
}
RxViewDesignerStateHelperService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDesignerStateHelperService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxViewDesignerStateHelperService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDesignerStateHelperService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDesignerStateHelperService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class ViewDesignerComponentEffects {
    constructor(actions$, injector, viewDesignerModels, rxGuidService, store$, rxViewComponentRegistryService, rxViewDesignerInspectorService, rxViewExpressionValidatorRegistryService, rxViewDesignerStateHelperService, rxViewDataDictionaryStoreService) {
        this.actions$ = actions$;
        this.injector = injector;
        this.viewDesignerModels = viewDesignerModels;
        this.rxGuidService = rxGuidService;
        this.store$ = store$;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        this.rxViewDesignerInspectorService = rxViewDesignerInspectorService;
        this.rxViewExpressionValidatorRegistryService = rxViewExpressionValidatorRegistryService;
        this.rxViewDesignerStateHelperService = rxViewDesignerStateHelperService;
        this.rxViewDataDictionaryStoreService = rxViewDataDictionaryStoreService;
        this.initializeComponentModel$ = this.actions$.pipe(ofType(initializeComponentModels), tap((action) => {
            action.payload.forEach(({ componentModel }) => {
                const componentDescriptor = this.rxViewComponentRegistryService.get(componentModel.type);
                const sandbox = new ComponentSandbox(this.injector, componentModel.guid, componentDescriptor);
                const model = new componentDescriptor.designComponentModel(this.injector, sandbox);
                if (isFunction(model.rxInit)) {
                    model.rxInit();
                }
                this.viewDesignerModels.set(componentModel.guid, model);
            });
        }), map$1(() => viewModelsInitialized()));
        this.registerComponentsValidation$ = this.actions$.pipe(ofType(initializeDataComponentModels, initializeComponentModels), tap((action) => this.rxViewExpressionValidatorRegistryService.registerComponents(map(action.payload, (payload) => payload.componentModel.guid))));
        this.onComponentsRemoved$ = this.actions$.pipe(ofType(componentsRemoved), tap(({ guids }) => {
            this.rxViewExpressionValidatorRegistryService.unregisterComponents(guids);
            this.rxViewDataDictionaryStoreService.removeDataDictionaryForComponents(guids);
        }));
        this.unregisterAllComponentsValidation$ = this.actions$.pipe(ofType(initViewDesigner, destroyViewDesigner), tap(() => this.rxViewExpressionValidatorRegistryService.unregisterAllComponents()));
        this.insertComponent$ = this.actions$.pipe(ofType(insertComponent), map$1((payload) => {
            const newPayload = {
                insertIndex: payload.insertIndex,
                columnIndex: payload.columnIndex,
                outletName: payload.outletName,
                parentGuid: payload.targetGuid
            };
            return payload.data.guid
                ? moveComponent(Object.assign(Object.assign({}, newPayload), { guid: payload.data.guid }))
                : addNewComponents({
                    payload: [
                        Object.assign(Object.assign({}, newPayload), { type: payload.data.type, selectComponent: true, propertiesByName: payload.data.initialPropertiesByName })
                    ]
                });
        }));
        this.addNewComponent$ = this.actions$.pipe(ofType(addNewComponents), withLatestFrom(this.store$.select(viewComponentModelsSelector)), mergeMap(([action, viewComponentsState]) => {
            const initializeComponentModelPayloads = [];
            const initializeDataComponentModelPayloads = [];
            const componentGuidsToSelect = [];
            action.payload.forEach((component) => {
                this.processAddComponentPayload(component, initializeComponentModelPayloads, initializeDataComponentModelPayloads, componentGuidsToSelect, viewComponentsState);
            });
            return [
                initializeComponentModelPayloads.length
                    ? initializeComponentModels({ payload: initializeComponentModelPayloads })
                    : null,
                initializeDataComponentModelPayloads.length
                    ? initializeDataComponentModels({ payload: initializeDataComponentModelPayloads })
                    : null,
                componentGuidsToSelect.length
                    ? selectComponent({
                        guid: last(componentGuidsToSelect)
                    })
                    : null
            ].filter(Boolean);
        }));
        this.removeComponent$ = this.actions$.pipe(ofType(removeComponents), filter(({ guids }) => !isEmpty(guids)), withLatestFrom(this.store$.select(viewComponentModelsSelector)), mergeMap(([payload, viewComponentsState]) => {
            const guidsToRemove = payload.guids.reduce((result, guid) => {
                const removedComponentModel = viewComponentsState[guid];
                if (removedComponentModel) {
                    result.push(guid, ...getAllChildGuids(removedComponentModel, viewComponentsState));
                }
                return result;
            }, []);
            const removeGuidsSet = new Set(guidsToRemove);
            removeGuidsSet.forEach((guid) => {
                this.viewDesignerModels.delete(guid);
                this.rxViewDesignerInspectorService.delete(guid);
            });
            const actions = [componentsRemoved({ guids: [...removeGuidsSet] })];
            if (payload.selectParent) {
                const lastRemovedModel = viewComponentsState[last(payload.guids)];
                if (lastRemovedModel === null || lastRemovedModel === void 0 ? void 0 : lastRemovedModel.parentGuid) {
                    actions.push(selectComponent({
                        guid: lastRemovedModel.parentGuid
                    }));
                }
            }
            return actions;
        }));
        this.setChildren$ = this.actions$.pipe(ofType(setChildComponents), map$1((action) => action.payload), withLatestFrom(this.store$.select(viewComponentModelsSelector)), mergeMap(([actionPayload, viewComponentsState]) => {
            const actions = [];
            const componentGuidsToRemove = [];
            const addComponentsPayloadAll = [];
            const editComponentPayloadAll = [];
            processChildComponents(actionPayload);
            function processChildComponents(payload) {
                const componentsToSet = payload.data;
                const componentsGuidsToSet = componentsToSet.map((component) => component.guid);
                const hostComponent = viewComponentsState[payload.guid];
                let existingChildGuids = getChildGuidsFromModel(hostComponent);
                if (payload.types) {
                    existingChildGuids = existingChildGuids.filter((guid) => payload.types.includes(viewComponentsState[guid].type));
                }
                const componentGuidsToRemoveLocal = difference(existingChildGuids, componentsGuidsToSet);
                const componentGuidsToAdd = difference(componentsGuidsToSet, existingChildGuids);
                const componentsGuidsToUpdate = difference(existingChildGuids, componentGuidsToAdd, componentGuidsToRemoveLocal);
                componentGuidsToRemove.push(...componentGuidsToRemoveLocal);
                const addComponentsPayload = componentsToSet.reduce((result, action) => {
                    if (includes(componentGuidsToAdd, action.guid)) {
                        result.push(getAddComponentPayload(action, payload.guid));
                    }
                    return result;
                }, []);
                addComponentsPayloadAll.push(...addComponentsPayload);
                const editComponentPayload = componentsToSet.reduce((result, action) => {
                    if (includes(componentsGuidsToUpdate, action.guid)) {
                        const existingModel = viewComponentsState[action.guid];
                        if (!isEqual(existingModel.propertiesByName, action.data || {})) {
                            result.push({ guid: action.guid, data: action.data });
                        }
                        if (action.children) {
                            processChildComponents({
                                guid: action.guid,
                                data: action.children
                            });
                        }
                    }
                    return result;
                }, []);
                editComponentPayloadAll.push(...editComponentPayload);
            }
            function getAddComponentPayload(action, parentGuid) {
                const result = {
                    propertiesByName: action.data,
                    guid: action.guid,
                    parentGuid,
                    type: action.type,
                    columnIndex: action.columnIndex || 0,
                    insertIndex: action.insertIndex,
                    outletName: action.outletName || RX_VIEW_DEFINITION.defaultOutletName
                };
                if (action.children) {
                    result.children = map(action.children, (child) => getAddComponentPayload(child, action.guid));
                }
                return result;
            }
            if (componentGuidsToRemove.length) {
                actions.push(removeComponents({ guids: componentGuidsToRemove }));
            }
            if (addComponentsPayloadAll.length) {
                actions.push(addNewComponents({ payload: addComponentsPayloadAll }));
            }
            if (editComponentPayloadAll.length) {
                actions.push(setComponentData({ payload: editComponentPayloadAll }));
            }
            return actions;
        }));
    }
    processAddComponentPayload(component, initializeComponentModelPayload, initializeDataComponentModelPayloads, componentGuidsToSelect, viewComponentsState) {
        const componentDescriptor = this.rxViewComponentRegistryService.get(component.type);
        const payloadParent = initializeComponentModelPayload.find((payload) => payload.componentModel.guid === component.parentGuid);
        const modelParent = viewComponentsState[component.parentGuid];
        const parentWithoutLayout = (payloadParent && !payloadParent.componentModel.layout) || (modelParent && !modelParent.layout);
        const componentModel = {
            guid: component.guid || this.rxGuidService.generate(),
            type: component.type,
            parentGuid: component.parentGuid,
            propertiesByName: this.rxViewDesignerStateHelperService.getInitialComponentProperties(component.propertiesByName, componentDescriptor),
            permissions: this.rxViewDesignerStateHelperService.getDefaultComponentPermissions(componentDescriptor)
        };
        if (this.rxViewComponentRegistryService.isDataComponentDescriptor(componentDescriptor) || parentWithoutLayout) {
            componentModel.resourceType = componentDescriptor.isContainerComponent
                ? RX_VIEW_DEFINITION.resourceTypes.containerViewComponent
                : RX_VIEW_DEFINITION.resourceTypes.viewComponent;
            initializeDataComponentModelPayloads.push({
                componentModel: componentModel
            });
        }
        else {
            componentModel.resourceType =
                componentDescriptor.outlets || componentDescriptor.isContainerComponent
                    ? RX_VIEW_DEFINITION.resourceTypes.containerViewComponent
                    : RX_VIEW_DEFINITION.resourceTypes.viewComponent;
            if (componentDescriptor.outlets) {
                componentModel.layout = RxViewLayout.getEmptyViewLayoutForOutletNames(componentDescriptor.outlets);
            }
            initializeComponentModelPayload.push({
                componentModel: componentModel,
                insertIndex: component.insertIndex,
                columnIndex: component.columnIndex || 0,
                outletName: component.outletName || RX_VIEW_DEFINITION.defaultOutletName
            });
            if (component.selectComponent) {
                componentGuidsToSelect.push(componentModel.guid);
            }
        }
        forEach(component.children, (child) => {
            this.processAddComponentPayload(Object.assign(Object.assign({}, child), { parentGuid: componentModel.guid }), initializeComponentModelPayload, initializeDataComponentModelPayloads, componentGuidsToSelect, viewComponentsState);
        });
    }
}
ViewDesignerComponentEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDesignerComponentEffects, deps: [{ token: i1.Actions }, { token: i0.Injector }, { token: RxViewDesignerModels }, { token: i2$1.RxGuidService }, { token: i2.Store }, { token: i5.RxViewComponentRegistryService }, { token: RxViewDesignerInspectorService }, { token: RxViewExpressionValidatorRegistryService }, { token: RxViewDesignerStateHelperService }, { token: RxViewDataDictionaryStoreService }], target: i0.ɵɵFactoryTarget.Injectable });
ViewDesignerComponentEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDesignerComponentEffects });
__decorate([
    Effect(),
    __metadata("design:type", Object)
], ViewDesignerComponentEffects.prototype, "initializeComponentModel$", void 0);
__decorate([
    Effect({ dispatch: false }),
    __metadata("design:type", Object)
], ViewDesignerComponentEffects.prototype, "registerComponentsValidation$", void 0);
__decorate([
    Effect({ dispatch: false }),
    __metadata("design:type", Object)
], ViewDesignerComponentEffects.prototype, "onComponentsRemoved$", void 0);
__decorate([
    Effect({ dispatch: false }),
    __metadata("design:type", Object)
], ViewDesignerComponentEffects.prototype, "unregisterAllComponentsValidation$", void 0);
__decorate([
    Effect(),
    __metadata("design:type", Object)
], ViewDesignerComponentEffects.prototype, "insertComponent$", void 0);
__decorate([
    Effect(),
    __metadata("design:type", Object)
], ViewDesignerComponentEffects.prototype, "addNewComponent$", void 0);
__decorate([
    Effect(),
    __metadata("design:type", Object)
], ViewDesignerComponentEffects.prototype, "removeComponent$", void 0);
__decorate([
    Effect(),
    __metadata("design:type", Object)
], ViewDesignerComponentEffects.prototype, "setChildren$", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDesignerComponentEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Actions }, { type: i0.Injector }, { type: RxViewDesignerModels }, { type: i2$1.RxGuidService }, { type: i2.Store }, { type: i5.RxViewComponentRegistryService }, { type: RxViewDesignerInspectorService }, { type: RxViewExpressionValidatorRegistryService }, { type: RxViewDesignerStateHelperService }, { type: RxViewDataDictionaryStoreService }]; }, propDecorators: { initializeComponentModel$: [], registerComponentsValidation$: [], onComponentsRemoved$: [], unregisterAllComponentsValidation$: [], insertComponent$: [], addNewComponent$: [], removeComponent$: [], setChildren$: [] } });

class ViewDesignerEffects {
    constructor(actions$, store$, rxBundleCacheService, rxDefinitionNameService, rxDefinitionUpdateService, rxGlobalCacheService, rxJsonParserService, rxViewComponentRegistryService, rxViewActionRegistryService, rxViewDefinitionService, viewDesignerModels, rxOldViewLayoutAdapterService, rxViewDefinitionParserService, rxLogService, rxModalService, errorHandler, rxUtilityModalsService, rxDefinitionAdapterRegistryService, rxViewDesignerInspectorService, rxViewDefinitionGeneratorService, rxViewDesignerStateHelperService, rxViewActionDefinitionAdapterRegistryService, rxGuidService, rxViewDataDictionaryStoreService) {
        this.actions$ = actions$;
        this.store$ = store$;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxDefinitionUpdateService = rxDefinitionUpdateService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxJsonParserService = rxJsonParserService;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        this.rxViewActionRegistryService = rxViewActionRegistryService;
        this.rxViewDefinitionService = rxViewDefinitionService;
        this.viewDesignerModels = viewDesignerModels;
        this.rxOldViewLayoutAdapterService = rxOldViewLayoutAdapterService;
        this.rxViewDefinitionParserService = rxViewDefinitionParserService;
        this.rxLogService = rxLogService;
        this.rxModalService = rxModalService;
        this.errorHandler = errorHandler;
        this.rxUtilityModalsService = rxUtilityModalsService;
        this.rxDefinitionAdapterRegistryService = rxDefinitionAdapterRegistryService;
        this.rxViewDesignerInspectorService = rxViewDesignerInspectorService;
        this.rxViewDefinitionGeneratorService = rxViewDefinitionGeneratorService;
        this.rxViewDesignerStateHelperService = rxViewDesignerStateHelperService;
        this.rxViewActionDefinitionAdapterRegistryService = rxViewActionDefinitionAdapterRegistryService;
        this.rxGuidService = rxGuidService;
        this.rxViewDataDictionaryStoreService = rxViewDataDictionaryStoreService;
        this.initViewDesigner$ = this.actions$.pipe(ofType(initViewDesigner), switchMap(({ payload }) => {
            const { viewDefinitionName, layoutTemplate } = payload;
            this.clearStorages();
            return [
                loadFriendlyBundleName(),
                loadViewDefinition({
                    viewDefinitionName,
                    layoutTemplate
                })
            ];
        }));
        this.destroyViewDesigner$ = this.actions$.pipe(ofType(destroyViewDesigner), tap(() => this.clearStorages()));
        this.loadFriendlyBundleName$ = this.actions$.pipe(ofType(loadFriendlyBundleName), switchMap(() => this.rxGlobalCacheService.getBundleDescriptor(this.rxBundleCacheService.bundleId)), switchMap((descriptor) => {
            let result$;
            if (descriptor) {
                result$ = of(friendlyBundleNameLoadSuccess({
                    friendlyBundleName: descriptor.friendlyName
                }));
            }
            else {
                result$ = throwError(`Bundle "${this.rxBundleCacheService.bundleId}" not found`);
            }
            return result$.pipe(catchError((error) => {
                this.errorHandler.handleError(error);
                return of(friendlyBundleNameLoadError({ payload: error }));
            }));
        }));
        this.loadViewDefinition$ = this.actions$.pipe(ofType(loadViewDefinition), switchMap(({ viewDefinitionName, layoutTemplate }) => {
            const viewDefinition$ = viewDefinitionName
                ? this.rxViewDefinitionService.get(viewDefinitionName)
                : this.rxViewDefinitionService.getNew(layoutTemplate);
            return viewDefinition$.pipe(map$1((viewDefinition) => viewDefinitionLoadSuccess({
                viewDefinition
            })), catchError((error) => {
                this.errorHandler.handleError(error);
                return of(viewDefinitionLoadError());
            }));
        }));
        this.viewDefinitionLoadSuccess$ = this.actions$.pipe(ofType(viewDefinitionLoadSuccess), withLatestFrom(this.store$.select(viewModelSelector)), mergeMap(([payload, viewModel]) => {
            // If viewModel isn't empty it's considered that view definition is loaded after save to update
            // existing view models with properties added by server e.g 'lastChangedBy', 'lastUpdateTime' and etc.
            return viewModel
                ? this.getActionsToUpdateExistingViewModels(payload.viewDefinition)
                : this.getActionsToInitializeViewModels(payload.viewDefinition);
        }));
        this.selectViewComponent$ = this.actions$.pipe(ofType(selectComponent), withLatestFrom(this.store$.select(viewModelSelector), this.store$.select(selectedInspectorTabIdSelector)), mergeMap(([action, viewModel, currentInspectorTabId]) => {
            const selectedInspectorTab = viewModel.guid === action.guid ? 0 : 1;
            if (selectedInspectorTab !== currentInspectorTabId) {
                return [
                    selectInspectorTab({
                        tabId: selectedInspectorTab
                    })
                ];
            }
            else {
                return [];
            }
        }));
        this.generateViewDefinition$ = this.actions$.pipe(ofType(generateViewDefinition), withLatestFrom(this.store$.select(viewModelSelector), this.store$.select(viewComponentModelsSelector), (action, viewModel, componentModels) => ({ viewModel, componentModels })), map$1(({ viewModel, componentModels }) => this.rxViewDefinitionGeneratorService.generate(viewModel, componentModels)), map$1((viewDefinition) => setGeneratedViewDefinition({ payload: viewDefinition })));
        this.saveViewDefinition$ = this.actions$.pipe(ofType(saveViewDefinition), withLatestFrom(this.store$.select(viewModelSelector), this.store$.select(viewComponentModelsSelector), (action, viewModel, components) => ({ viewModel, components })), switchMap(({ viewModel, components }) => {
            const viewDefinition = this.rxViewDefinitionGeneratorService.generate(viewModel, components, true);
            return (viewDefinition.lastUpdateTime
                ? this.rxDefinitionUpdateService.execute(this.rxViewDefinitionService.update.bind(this.rxViewDefinitionService, viewDefinition.name, viewDefinition))
                : this.rxViewDefinitionService.create(viewDefinition)).pipe(switchMap((response) => {
                const definitionName = decodeURIComponent(last(response === null || response === void 0 ? void 0 : response.headers.get('Location').split('/')) || '') || viewDefinition.name;
                return [
                    viewDefinitionSaveSuccess({ viewDefinitionName: definitionName }),
                    viewDefinition.lastUpdateTime
                        ? loadViewDefinition({
                            viewDefinitionName: viewDefinition.name
                        })
                        : null
                ].filter(Boolean);
            }), catchError((error) => {
                this.errorHandler.handleError(error);
                return of(viewDefinitionSaveError());
            }));
        }));
        this.clearCanvas$ = this.actions$.pipe(ofType(clearCanvas), withLatestFrom(this.store$.select(viewModelSelector)), map$1(([action, viewModel]) => removeComponents({ guids: getChildGuidsFromModel(viewModel) })));
        this.runPreview$ = this.actions$.pipe(ofType(runPreview), withLatestFrom(this.store$.select(viewModelSelector), (action, viewModel) => viewModel), switchMap((viewModel) => viewModel.targetViewDefinitionName
            ? this.rxViewDefinitionService.get(viewModel.targetViewDefinitionName)
            : of(viewModel)), tap((viewModel) => {
            const encodedViewDefinitionName = encodeURIComponent(viewModel.name);
            let url = `/helix/index.html#/${this.rxBundleCacheService.bundleId}/preview/${encodedViewDefinitionName}`;
            if (viewModel.inputParams.length) {
                this.rxModalService
                    .openModal({
                    title: 'Enter view parameter values',
                    content: RuntimeViewParamsModalComponent,
                    data: { inputParams: map(viewModel.inputParams, 'name') },
                    size: 'sm'
                })
                    .catch(noop$1)
                    .then((params) => {
                    const inputConfig = map(params, (value, name) => {
                        return `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
                    });
                    url += `?${inputConfig.join('&')}`;
                    if (params) {
                        window.open(url);
                    }
                });
            }
            else {
                window.open(url);
            }
        }));
    }
    clearStorages() {
        this.viewDesignerModels.clear();
        this.rxViewDesignerInspectorService.clear();
        this.rxViewDataDictionaryStoreService.clear();
    }
    convertViewDefinitionToModel(viewDefinition) {
        const isAngularJsView = Boolean(viewDefinition.lastUpdateTime) && !includes(viewDefinition.layout, '"outlets"');
        this.rxViewDefinitionParserService
            .getComponents(viewDefinition)
            .forEach((definition) => this.rxOldViewLayoutAdapterService.convertLayout(definition));
        const viewModel = omit(viewDefinition, ['componentDefinitions', 'layout']);
        const layout = this.rxJsonParserService.tryParseJson(viewDefinition.layout);
        viewModel.layout = RxViewLayout.getEmptyViewLayoutForOutlets(layout.outlets);
        viewModel.displayName = decodeURIComponent(this.rxDefinitionNameService.getDisplayName(viewModel.name));
        viewModel.layoutName = RxViewLayout.getLayoutName(viewModel.layout);
        viewModel.isAngularJsView = isAngularJsView;
        return viewModel;
    }
    convertComponentDefinitionToModel(definition, parentGuid, descriptor) {
        const componentModel = omit(definition, ['componentDefinitions', 'layout']);
        componentModel.parentGuid = parentGuid;
        this.processComponentDefinitionProperties(componentModel, descriptor);
        if (this.isComponentHasLayout(definition)) {
            const layout = this.rxJsonParserService.tryParseJson(definition.layout);
            componentModel.layout = RxViewLayout.getEmptyViewLayoutForOutlets(layout.outlets);
        }
        return componentModel;
    }
    processComponentDefinitionProperties(componentModel, descriptor) {
        componentModel.propertiesByName = transform(componentModel.propertiesByName, (result, propertyValue, propertyKey) => {
            const propertyDescriptor = find(descriptor.properties || descriptor.parameters, {
                name: propertyKey
            });
            if (propertyDescriptor && propertyDescriptor.designType) {
                switch (true) {
                    case propertyDescriptor.designType === ViewComponentPropertyType.String:
                        result[propertyKey] = propertyValue;
                        break;
                    default:
                        result[propertyKey] = this.rxJsonParserService.tryParseJson(propertyValue, propertyValue);
                        break;
                }
            }
            else {
                result[propertyKey] = propertyValue;
            }
            return result;
        }, {});
        if (!this.rxGuidService.isGuid(componentModel.name)) {
            componentModel.propertiesByName.name = componentModel.name;
        }
        if ('type' in descriptor) {
            componentModel.propertiesByName = this.rxViewDesignerStateHelperService.getInitialComponentProperties(componentModel.propertiesByName, descriptor);
        }
    }
    traverseByComponents(component, predicate) {
        const componentLayout = this.rxJsonParserService.tryParseJson(component.layout);
        const childComponentDefinitions = component.componentDefinitions;
        if (componentLayout) {
            componentLayout.outlets.forEach((outlet) => {
                outlet.columns.forEach((column, colIndex) => {
                    column.children.forEach((childComponentGuid, index) => {
                        const childComponentDefinition = childComponentDefinitions.find((definition) => definition.guid === childComponentGuid);
                        if (childComponentDefinition) {
                            predicate(childComponentDefinition, component.guid, outlet.name, index, colIndex, column.span);
                            if (childComponentDefinition.componentDefinitions) {
                                this.traverseByComponents(childComponentDefinition, predicate);
                            }
                        }
                    });
                });
            });
        }
        childComponentDefinitions
            .filter((definition) => {
            const descriptor = this.rxViewComponentRegistryService.get(definition.type);
            return (descriptor === null || descriptor === void 0 ? void 0 : descriptor.isDataComponent) || (descriptor === null || descriptor === void 0 ? void 0 : descriptor.isPageComponent);
        })
            .forEach((childComponentDefinition, index) => {
            predicate(childComponentDefinition, component.guid, null, index, 0, 0);
            if (childComponentDefinition.componentDefinitions) {
                this.traverseByComponents(childComponentDefinition, predicate);
            }
        });
    }
    isComponentHasLayout(definition) {
        return Boolean(definition.layout);
    }
    getActionsToInitializeViewModels(viewDefinition) {
        const viewDefinitionClone = cloneDeep(viewDefinition);
        const viewModel = this.convertViewDefinitionToModel(viewDefinitionClone);
        const initComponentModelsPayload = [];
        const initDataComponentModelsPayload = [];
        this.traverseByComponents(viewDefinitionClone, (componentDefinition, parentGuid, outletName, insertIndex, columnIndex, columnSpan) => {
            const componentDescriptor = this.rxViewComponentRegistryService.get(componentDefinition.type);
            if (componentDescriptor && !componentDescriptor.isPageComponent) {
                const adapter = componentDefinition.type === RxViewComponentType.Action
                    ? this.rxViewActionDefinitionAdapterRegistryService.getDesignAdapter(componentDefinition.propertiesByName.name)
                    : this.rxDefinitionAdapterRegistryService.getDesignAdapter(componentDefinition.type);
                adapter === null || adapter === void 0 ? void 0 : adapter.adaptDefinition(componentDefinition, viewDefinitionClone);
                let actionDescriptor;
                if (componentDefinition.type === RxViewComponentType.Action) {
                    actionDescriptor = this.rxViewActionRegistryService.get(componentDefinition.propertiesByName.name);
                    if (!actionDescriptor) {
                        actionDescriptor = this.rxViewActionRegistryService.registerUnknownAction(componentDefinition.propertiesByName.name);
                    }
                }
                const componentModel = this.convertComponentDefinitionToModel(componentDefinition, parentGuid, actionDescriptor || componentDescriptor);
                if (this.rxViewComponentRegistryService.isDataComponentDescriptor(componentDescriptor) ||
                    outletName === null) {
                    initDataComponentModelsPayload.push({
                        componentModel
                    });
                }
                else {
                    initComponentModelsPayload.push({
                        insertIndex,
                        columnIndex,
                        componentModel,
                        outletName,
                        columnSpan
                    });
                }
            }
            else if (this.rxViewDefinitionService.isPageView(viewDefinitionClone)) {
                let pageComponentChildDescriptor = this.rxViewComponentRegistryService.get(componentDefinition.type);
                if (!pageComponentChildDescriptor) {
                    pageComponentChildDescriptor = {
                        type: componentDefinition.type,
                        name: RX_VIEW_DEFINITION.unknownPageComponent.name
                    };
                }
                const componentModel = this.convertComponentDefinitionToModel(componentDefinition, parentGuid, pageComponentChildDescriptor);
                initDataComponentModelsPayload.push({
                    componentModel
                });
            }
            else {
                const unknownComponentDescriptor = Object.assign(Object.assign({}, this.rxViewComponentRegistryService.get(RxViewComponentType.Unknown)), { type: componentDefinition.type });
                this.rxViewComponentRegistryService.registerSync(unknownComponentDescriptor);
                const componentModel = this.convertComponentDefinitionToModel(componentDefinition, parentGuid, unknownComponentDescriptor);
                initComponentModelsPayload.push({
                    insertIndex,
                    columnIndex,
                    componentModel,
                    outletName,
                    columnSpan
                });
                this.rxLogService.warning(`Cannot initialize view component. View Component Descriptor for ${componentDefinition.type} not found.`);
            }
        });
        return [
            setViewModel({ payload: viewModel }),
            initComponentModelsPayload.length
                ? initializeComponentModels({ payload: initComponentModelsPayload })
                : null,
            initDataComponentModelsPayload.length
                ? initializeDataComponentModels({ payload: initDataComponentModelsPayload })
                : null,
            initComponentModelsPayload.length ? null : viewModelsInitialized()
        ].filter(Boolean);
    }
    getActionsToUpdateExistingViewModels(viewDefinition) {
        const viewDefinitionClone = cloneDeep(viewDefinition);
        const updateComponentModelPayloads = this.rxViewDefinitionParserService
            .getComponents(viewDefinitionClone, true)
            .map(({ componentDefinition }) => ({
            guid: componentDefinition.guid,
            partialModel: omit(componentDefinition, [
                'layout',
                'propertiesByName',
                'componentDefinitions'
            ])
        }));
        return [
            updateViewModel({
                payload: omit(viewDefinitionClone, ['layout', 'componentDefinitions'])
            }),
            updateComponentModelPayloads.length
                ? updateComponentModel({ payload: updateComponentModelPayloads })
                : null,
            viewModelsUpdatedAfterSave()
        ].filter(Boolean);
    }
}
ViewDesignerEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDesignerEffects, deps: [{ token: i1.Actions }, { token: i2.Store }, { token: i3.RxBundleCacheService }, { token: i3.RxDefinitionNameService }, { token: i3.RxDefinitionUpdateService }, { token: i3.RxGlobalCacheService }, { token: i2$1.RxJsonParserService }, { token: i5.RxViewComponentRegistryService }, { token: i5.RxViewActionRegistryService }, { token: i5.RxViewDefinitionService }, { token: RxViewDesignerModels }, { token: i5.RxOldViewLayoutAdapterService }, { token: i5.RxViewDefinitionParserService }, { token: i3.RxLogService }, { token: i5$1.RxModalService }, { token: i0.ErrorHandler }, { token: i5$1.RxUtilityModalsService }, { token: i3.RxDefinitionAdapterRegistryService }, { token: RxViewDesignerInspectorService }, { token: RxViewDefinitionGeneratorService }, { token: RxViewDesignerStateHelperService }, { token: i5.RxViewActionDefinitionAdapterRegistryService }, { token: i2$1.RxGuidService }, { token: RxViewDataDictionaryStoreService }], target: i0.ɵɵFactoryTarget.Injectable });
ViewDesignerEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDesignerEffects });
__decorate([
    Effect(),
    __metadata("design:type", Object)
], ViewDesignerEffects.prototype, "initViewDesigner$", void 0);
__decorate([
    Effect({ dispatch: false }),
    __metadata("design:type", Object)
], ViewDesignerEffects.prototype, "destroyViewDesigner$", void 0);
__decorate([
    Effect(),
    __metadata("design:type", Object)
], ViewDesignerEffects.prototype, "loadFriendlyBundleName$", void 0);
__decorate([
    Effect(),
    __metadata("design:type", Object)
], ViewDesignerEffects.prototype, "loadViewDefinition$", void 0);
__decorate([
    Effect(),
    __metadata("design:type", Object)
], ViewDesignerEffects.prototype, "viewDefinitionLoadSuccess$", void 0);
__decorate([
    Effect(),
    __metadata("design:type", Object)
], ViewDesignerEffects.prototype, "selectViewComponent$", void 0);
__decorate([
    Effect(),
    __metadata("design:type", Object)
], ViewDesignerEffects.prototype, "generateViewDefinition$", void 0);
__decorate([
    Effect(),
    __metadata("design:type", Object)
], ViewDesignerEffects.prototype, "saveViewDefinition$", void 0);
__decorate([
    Effect(),
    __metadata("design:type", Object)
], ViewDesignerEffects.prototype, "clearCanvas$", void 0);
__decorate([
    Effect({ dispatch: false }),
    __metadata("design:type", Object)
], ViewDesignerEffects.prototype, "runPreview$", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDesignerEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Actions }, { type: i2.Store }, { type: i3.RxBundleCacheService }, { type: i3.RxDefinitionNameService }, { type: i3.RxDefinitionUpdateService }, { type: i3.RxGlobalCacheService }, { type: i2$1.RxJsonParserService }, { type: i5.RxViewComponentRegistryService }, { type: i5.RxViewActionRegistryService }, { type: i5.RxViewDefinitionService }, { type: RxViewDesignerModels }, { type: i5.RxOldViewLayoutAdapterService }, { type: i5.RxViewDefinitionParserService }, { type: i3.RxLogService }, { type: i5$1.RxModalService }, { type: i0.ErrorHandler }, { type: i5$1.RxUtilityModalsService }, { type: i3.RxDefinitionAdapterRegistryService }, { type: RxViewDesignerInspectorService }, { type: RxViewDefinitionGeneratorService }, { type: RxViewDesignerStateHelperService }, { type: i5.RxViewActionDefinitionAdapterRegistryService }, { type: i2$1.RxGuidService }, { type: RxViewDataDictionaryStoreService }]; }, propDecorators: { initViewDesigner$: [], destroyViewDesigner$: [], loadFriendlyBundleName$: [], loadViewDefinition$: [], viewDefinitionLoadSuccess$: [], selectViewComponent$: [], generateViewDefinition$: [], saveViewDefinition$: [], clearCanvas$: [], runPreview$: [] } });

function getInitialState$4() {
    return null;
}
const reducer$4 = createReducer(getInitialState$4(), on(initViewDesigner, getInitialState$4), on(destroyViewDesigner, getInitialState$4), on(setGeneratedViewDefinition, (state, { payload }) => {
    return payload;
}));
function viewDefinitionReducer(state, action) {
    return reducer$4(state, action);
}

function getInitialState$3() {
    return {};
}
const reducer$3 = createReducer(getInitialState$3(), on(initViewDesigner, getInitialState$3), on(destroyViewDesigner, getInitialState$3), on(setBreadcrumbs, (state, { guid, label }) => {
    return Object.assign(Object.assign({}, state), { [guid]: label });
}), on(componentsRemoved, (state, { guids }) => {
    let newState = state;
    if (guids.some((guid) => has(state, guid))) {
        newState = omit(state, guids);
    }
    return newState;
}));
function viewDesignerBreadcrumbsReducer(state, action) {
    return reducer$3(state, action);
}

function getInitialState$2() {
    return {
        viewDesignModel: null,
        viewComponentDesignModels: {}
    };
}
function initializeComponentModel(newState, payload) {
    newState.viewComponentDesignModels = Object.assign(Object.assign({}, newState.viewComponentDesignModels), { [payload.componentModel.guid]: payload.componentModel });
    // update parent layout
    if (payload.componentModel.parentGuid === newState.viewDesignModel.guid) {
        newState.viewDesignModel = addChildComponent(newState.viewDesignModel, payload.componentModel.guid, payload.outletName, payload.insertIndex, payload.columnIndex, payload.columnSpan);
    }
    else {
        const parentComponentModel = newState.viewComponentDesignModels[payload.componentModel.parentGuid];
        if (parentComponentModel) {
            const newParentComponentModel = addChildComponent(parentComponentModel, payload.componentModel.guid, payload.outletName, payload.insertIndex, payload.columnIndex, payload.columnSpan);
            newState.viewComponentDesignModels[newParentComponentModel.guid] =
                newParentComponentModel;
        }
    }
}
const reducer$2 = createReducer(getInitialState$2(), on(initViewDesigner, getInitialState$2), on(destroyViewDesigner, getInitialState$2), on(initializeComponentModels, (state, { payload }) => {
    const newState = Object.assign({}, state);
    payload.forEach((data) => initializeComponentModel(newState, data));
    return newState;
}), on(initializeDataComponentModels, (state, { payload }) => {
    const newState = Object.assign(Object.assign({}, state), { viewComponentDesignModels: Object.assign({}, state.viewComponentDesignModels) });
    payload.forEach((item) => {
        const parentComponentModel = newState.viewComponentDesignModels[item.componentModel.parentGuid];
        if (parentComponentModel) {
            // add new component model
            newState.viewComponentDesignModels[item.componentModel.guid] = item.componentModel;
            // update parent to contain child reference
            const newParentComponentModel = Object.assign(Object.assign({}, parentComponentModel), { childDataComponentGuids: [...(parentComponentModel.childDataComponentGuids || []), item.componentModel.guid] });
            newState.viewComponentDesignModels[newParentComponentModel.guid] =
                newParentComponentModel;
        }
    });
    return newState;
}), on(moveComponent, (state, payload) => {
    const newState = Object.assign({}, state);
    // remove component from old parent layout
    if (isComponentContainsChild(payload.guid, state.viewDesignModel)) {
        newState.viewDesignModel = removeChildComponent(payload.guid, newState.viewDesignModel);
    }
    else {
        let oldParentComponentModel = findParentComponentModel(payload.guid, newState.viewComponentDesignModels);
        oldParentComponentModel = removeChildComponent(payload.guid, oldParentComponentModel);
        newState.viewComponentDesignModels = Object.assign(Object.assign({}, newState.viewComponentDesignModels), { [oldParentComponentModel.guid]: oldParentComponentModel });
    }
    // add component to new parent layout
    if (payload.parentGuid === newState.viewDesignModel.guid) {
        newState.viewDesignModel = addChildComponent(newState.viewDesignModel, payload.guid, payload.outletName, payload.insertIndex, payload.columnIndex);
    }
    else {
        let newParentComponentModel = newState.viewComponentDesignModels[payload.parentGuid];
        newParentComponentModel = addChildComponent(newParentComponentModel, payload.guid, payload.outletName, payload.insertIndex, payload.columnIndex);
        newState.viewComponentDesignModels = Object.assign(Object.assign({}, newState.viewComponentDesignModels), { [newParentComponentModel.guid]: newParentComponentModel });
    }
    // updating parentGuid for moved component
    newState.viewComponentDesignModels = Object.assign(Object.assign({}, newState.viewComponentDesignModels), { [payload.guid]: Object.assign(Object.assign({}, newState.viewComponentDesignModels[payload.guid]), { parentGuid: payload.parentGuid }) });
    return newState;
}), on(componentsRemoved, (state, { guids }) => {
    const newState = Object.assign(Object.assign({}, state), { viewComponentDesignModels: omit(state.viewComponentDesignModels, guids) });
    guids.forEach((guid) => {
        if (isComponentContainsChild(guid, state.viewDesignModel)) {
            newState.viewDesignModel = removeChildComponent(guid, newState.viewDesignModel);
        }
        else {
            let oldParentComponentModel = findParentComponentModel(guid, state.viewComponentDesignModels);
            if (oldParentComponentModel && newState.viewComponentDesignModels[oldParentComponentModel.guid]) {
                oldParentComponentModel = removeChildComponent(guid, newState.viewComponentDesignModels[oldParentComponentModel.guid]);
                newState.viewComponentDesignModels = Object.assign(Object.assign({}, newState.viewComponentDesignModels), { [oldParentComponentModel.guid]: oldParentComponentModel });
            }
        }
    });
    return newState;
}), on(setComponentLayout, (state, { guid, cols }) => {
    const componentModel = state.viewComponentDesignModels[guid];
    const defaultOutlet = componentModel.layout.outlets.find((item) => item.name === RX_VIEW_DEFINITION.defaultOutletName);
    const existingColumns = cloneDeep(defaultOutlet.columns);
    const removedColumns = existingColumns.splice(cols.length);
    cols.forEach((colSpan, i) => {
        if (existingColumns[i]) {
            existingColumns[i].span = colSpan;
        }
        else {
            existingColumns[i] = {
                span: colSpan,
                children: []
            };
        }
    });
    const removedColumnChildComponents = removedColumns.reduce((guids, col) => {
        guids.push(...col.children);
        return guids;
    }, []);
    if (removedColumnChildComponents.length) {
        const lastExistingCol = last(existingColumns);
        lastExistingCol.children = lastExistingCol.children.concat(removedColumnChildComponents);
    }
    return Object.assign(Object.assign({}, state), { viewComponentDesignModels: Object.assign(Object.assign({}, state.viewComponentDesignModels), { [guid]: Object.assign(Object.assign({}, componentModel), { layout: Object.assign(Object.assign({}, componentModel.layout), { outlets: componentModel.layout.outlets.map((outlet) => (Object.assign(Object.assign({}, outlet), { columns: existingColumns }))) }) }) }) });
}), on(setViewModel, (state, { payload }) => {
    return Object.assign(Object.assign({}, state), { viewDesignModel: payload });
}), on(updateViewModel, (state, { payload }) => {
    return Object.assign(Object.assign({}, state), { viewDesignModel: Object.assign(Object.assign({}, state.viewDesignModel), payload) });
}), on(viewDefinitionSaveSuccess, (state) => {
    if (state.viewDesignModel.isAngularJsView) {
        return Object.assign(Object.assign({}, state), { viewDesignModel: Object.assign(Object.assign({}, state.viewDesignModel), { isAngularJsView: false }) });
    }
    else {
        return state;
    }
}), on(setComponentData, (state, { payload }) => {
    return Object.assign(Object.assign({}, state), { viewComponentDesignModels: Object.assign(Object.assign({}, state.viewComponentDesignModels), payload.reduce((res, { guid, data }) => {
            res[guid] = Object.assign(Object.assign({}, state.viewComponentDesignModels[guid]), { propertiesByName: data });
            return res;
        }, {})) });
}), on(updateComponentModel, (state, { payload }) => {
    return Object.assign(Object.assign({}, state), { viewComponentDesignModels: Object.assign(Object.assign({}, state.viewComponentDesignModels), payload
            .filter((payload) => state.viewComponentDesignModels[payload.guid])
            .reduce((res, { guid, partialModel }) => {
            res[guid] = Object.assign(Object.assign(Object.assign({}, state.viewComponentDesignModels[guid]), partialModel), { propertiesByName: Object.assign(Object.assign({}, state.viewComponentDesignModels[guid].propertiesByName), partialModel.propertiesByName) });
            return res;
        }, {})) });
}));
function viewDesignerModelReducer(state, action) {
    return reducer$2(state, action);
}

function getInitialState$1() {
    return {
        selectedComponentGuid: null,
        selectedInspectorTabId: 0,
        currentBundleId: null,
        isViewDefinitionLoading: false,
        areViewModelsReady: false,
        friendlyBundleName: null
    };
}
const reducer$1 = createReducer(getInitialState$1(), on(initViewDesigner, (_, { payload }) => {
    return Object.assign(Object.assign({}, getInitialState$1()), { currentBundleId: payload.bundleId });
}), on(destroyViewDesigner, getInitialState$1), on(selectComponent, (state, { guid }) => {
    return Object.assign(Object.assign({}, state), { selectedComponentGuid: guid });
}), on(selectInspectorTab, (state, { tabId }) => {
    return Object.assign(Object.assign({}, state), { selectedInspectorTabId: tabId });
}), on(componentsRemoved, (state, { guids }) => {
    if (guids.includes(state.selectedComponentGuid)) {
        return Object.assign(Object.assign({}, state), { selectedComponentGuid: null });
    }
    else {
        return Object.assign({}, state);
    }
}), on(friendlyBundleNameLoadSuccess, (state, { friendlyBundleName }) => {
    return Object.assign(Object.assign({}, state), { friendlyBundleName: friendlyBundleName });
}), on(friendlyBundleNameLoadError, (state) => {
    return Object.assign(Object.assign({}, state), { friendlyBundleName: null });
}), on(saveViewDefinition, loadViewDefinition, (state) => {
    return Object.assign(Object.assign({}, state), { isViewDefinitionLoading: true, areViewModelsReady: false });
}), on(viewDefinitionSaveSuccess, viewDefinitionLoadSuccess, viewDefinitionLoadError, (state) => {
    return Object.assign(Object.assign({}, state), { isViewDefinitionLoading: false });
}), on(viewDefinitionSaveError, (state) => {
    return Object.assign(Object.assign({}, state), { isViewDefinitionLoading: false, areViewModelsReady: true });
}), on(viewModelsUpdatedAfterSave, viewModelsInitialized, (state) => {
    return Object.assign(Object.assign({}, state), { areViewModelsReady: true });
}), on(initializeComponentModels, (state) => {
    return Object.assign(Object.assign({}, state), { areViewModelsReady: false });
}));
function viewDesignerUiReducer(state, action) {
    return reducer$1(state, action);
}

function getInitialState() {
    return {
        issues: {},
        expressionIssues: {}
    };
}
const reducer = createReducer(getInitialState(), on(initViewDesigner, destroyViewDesigner, getInitialState), on(setValidationIssues, (state, { guid, issues }) => {
    if (issues.length) {
        return Object.assign(Object.assign({}, state), { issues: Object.assign(Object.assign({}, state.issues), { [guid]: issues }) });
    }
    else {
        let newState = state;
        if (has(newState.issues, guid)) {
            newState = Object.assign(Object.assign({}, state), { issues: omit(state.issues, [guid]) });
        }
        return newState;
    }
}), on(setExpressionValidationIssues, (state, { issues }) => {
    return isEmpty(issues)
        ? state
        : Object.assign(Object.assign({}, state), { expressionIssues: Object.assign(Object.assign({}, omit(state.expressionIssues, Object.keys(issues))), omitBy(issues, isEmpty)) });
}), on(componentsRemoved, (state, { guids }) => {
    let newState = state;
    if (guids.some((guid) => has(state.issues, guid))) {
        newState = Object.assign(Object.assign({}, state), { issues: omit(state.issues, guids) });
    }
    if (guids.some((guid) => has(state.expressionIssues, guid))) {
        newState = Object.assign(Object.assign({}, state), { expressionIssues: omit(state.expressionIssues, guids) });
    }
    return newState;
}));
function viewDesignerValidationReducer(state, action) {
    return reducer(state, action);
}

class ViewDesignerModule {
}
ViewDesignerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDesignerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ViewDesignerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDesignerModule, declarations: [RxViewDesignerComponent], imports: [CommonModule,
        AdaptCodeViewerModule, i3$3.AdaptTabsModule, RxBladeModule,
        RxFormBuilderModule,
        RxValidationIssuesModule,
        RxJsonViewerModule,
        RxViewDesignerPaletteModule,
        ViewDesignerCanvasModule,
        DesignerModule,
        FormControlsModule,
        RxPermissionEditorModule,
        RxRevertCustomizationModule,
        ViewActionDesignModule,
        RuntimeViewParamsModalModule,
        RxDesignerHeaderModule,
        AdaptAlertModule,
        RxInspectorModule,
        RxViewCustomizationOptionsModule,
        RxViewRevertCustomizationModule,
        TranslateModule, i2.StoreFeatureModule, i1.EffectsFeatureModule], exports: [RxViewDesignerComponent] });
ViewDesignerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDesignerModule, imports: [[
            CommonModule,
            AdaptCodeViewerModule,
            AdaptTabsModule.forRoot(),
            RxBladeModule,
            RxFormBuilderModule,
            RxValidationIssuesModule,
            RxJsonViewerModule,
            RxViewDesignerPaletteModule,
            ViewDesignerCanvasModule,
            DesignerModule,
            FormControlsModule,
            RxPermissionEditorModule,
            RxRevertCustomizationModule,
            ViewActionDesignModule,
            RuntimeViewParamsModalModule,
            RxDesignerHeaderModule,
            AdaptAlertModule,
            RxInspectorModule,
            RxViewCustomizationOptionsModule,
            RxViewRevertCustomizationModule,
            TranslateModule,
            StoreModule.forFeature('viewDesigner', {
                model: viewDesignerModelReducer,
                viewDefinition: viewDefinitionReducer,
                validation: viewDesignerValidationReducer,
                ui: viewDesignerUiReducer,
                breadcrumbs: viewDesignerBreadcrumbsReducer
            }),
            EffectsModule.forFeature([ViewDesignerEffects, ViewDesignerComponentEffects])
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDesignerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        AdaptCodeViewerModule,
                        AdaptTabsModule.forRoot(),
                        RxBladeModule,
                        RxFormBuilderModule,
                        RxValidationIssuesModule,
                        RxJsonViewerModule,
                        RxViewDesignerPaletteModule,
                        ViewDesignerCanvasModule,
                        DesignerModule,
                        FormControlsModule,
                        RxPermissionEditorModule,
                        RxRevertCustomizationModule,
                        ViewActionDesignModule,
                        RuntimeViewParamsModalModule,
                        RxDesignerHeaderModule,
                        AdaptAlertModule,
                        RxInspectorModule,
                        RxViewCustomizationOptionsModule,
                        RxViewRevertCustomizationModule,
                        TranslateModule,
                        StoreModule.forFeature('viewDesigner', {
                            model: viewDesignerModelReducer,
                            viewDefinition: viewDefinitionReducer,
                            validation: viewDesignerValidationReducer,
                            ui: viewDesignerUiReducer,
                            breadcrumbs: viewDesignerBreadcrumbsReducer
                        }),
                        EffectsModule.forFeature([ViewDesignerEffects, ViewDesignerComponentEffects])
                    ],
                    declarations: [RxViewDesignerComponent],
                    exports: [RxViewDesignerComponent]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { ActionListControlComponent, ActionListControlModule, ActionListEditorDialogComponent, ActionListEditorDialogModule, ActionListWidgetComponent, ActionListWidgetModule, CanvasItemApi, CanvasItemColumnComponent, CanvasItemComponent, CanvasItemContainerComponent, CanvasOutletComponent, CanvasOutletHelperService, DesignerComponent, DesignerModule, DropComponentData, NamedListFilterExpressionConfigurator, RX_AVAILABLE_ON_DEVICES_OPTIONS, RX_VIEW_DESIGNER, RX_VIEW_MODEL, RuntimeViewParamsModalComponent, RuntimeViewParamsModalModule, RxComponentPermissionEditorWidgetComponent, RxComponentPermissionEditorWidgetModule, RxViewActionExpressionConfigurator, RxViewActionValidatorService, RxViewComponentExpressionConfigurator, RxViewCustomizationOptionsComponent, RxViewCustomizationOptionsModule, RxViewDataDictionaryService, RxViewDesignerActionModel, RxViewDesignerComponent, RxViewDesignerDefaultActionModel, RxViewDesignerHelperService, RxViewDesignerPaletteModule, RxViewExpressionConfigurator, RxViewExpressionValidatorService, RxViewModel, RxViewRevertCustomizationComponent, RxViewRevertCustomizationModule, ViewDesignerCanvasComponent, ViewDesignerCanvasItemApiToken, ViewDesignerCanvasModule, ViewDesignerComponentModel, ViewDesignerFacade, ViewDesignerModule, ViewDesignerPaletteComponent, getAvailableOnDevicesInspectorConfig, getDisabledFieldInspectorConfig, getHiddenFieldInspectorConfig, getStandardPropsInspectorConfigs, getStylesFieldInspectorConfig, validateAvailableOnDevicesProp, validateCssClassName, validateCssClassNames, validateStandardProps };
//# sourceMappingURL=helix-platform-view-designer.js.map
