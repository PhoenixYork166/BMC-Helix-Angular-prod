import { Injectable } from '@angular/core';
import { RxOverlayService } from '@helix/platform/shared/api';
import { RxGuidService } from '@helix/platform/utils';
import { RxViewLayout } from '@helix/platform/view/api';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { compact, filter as _filter, flatten, isFinite } from 'lodash';
import { combineLatest, EMPTY, merge, of, Subject } from 'rxjs';
import { bufferToggle, distinctUntilChanged, filter, map, shareReplay, switchMap, switchMapTo, take, takeUntil, withLatestFrom } from 'rxjs/operators';
import { getChildGuidsFromModel } from '../core/layout-helpers';
import { RxViewDataDictionaryBuilderService } from '../core/view-data-dictionary-builder.service';
import { RxViewDataDictionaryStoreService } from '../core/view-data-dictionary-store.service';
import { RxViewDesignerInspectorService } from '../core/view-designer-inspector.service';
import * as ViewComponentsActions from './view-component.actions';
import { ViewDesignerDispatcher } from './view-designer-dispatcher.service';
import * as ViewDesignerActions from './view-designer.actions';
import { areViewModelsReadySelector, breadcrumbsSelector, bundleFriendlyNameSelector, childDataComponentGuidsSelector, componentLayoutSelector, componentPermissionsSelector, componentPropertiesByNameSelector, componentTypeSelector, currentBundleIdSelector, firstViewComponentModelTypeSelector, isViewDefinitionLoadingSelector, parentComponentModelGuidSelector, selectedComponentGuidSelector, selectedInspectorTabIdSelector, validationIssuesSelector, viewComponentModelSelector, viewComponentModelsSelector, viewDefinitionSelector, viewDesignerModelsSelector, viewModelPropertyValueSelector, viewModelSelector } from './view-designer.selectors';
import * as i0 from "@angular/core";
import * as i1 from "./view-designer-dispatcher.service";
import * as i2 from "@ngrx/store";
import * as i3 from "@ngrx/effects";
import * as i4 from "../core/view-designer-inspector.service";
import * as i5 from "@helix/platform/utils";
import * as i6 from "../core/view-data-dictionary-builder.service";
import * as i7 from "../core/view-data-dictionary-store.service";
import * as i8 from "@helix/platform/shared/api";
export class ViewDesignerFacade {
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
        this.isExtensionView$ = this.getViewPropertyValue('targetViewDefinitionName').pipe(map(Boolean), shareReplay(1));
        this.isExtensionContainerSet$ = this.getViewPropertyValue('targetExtensionContainerGuid').pipe(map(Boolean), shareReplay(1));
        this.allComponentGuids$ = this.viewComponentModels$.pipe(map((models) => new Set(Object.keys(models))), shareReplay({
            refCount: true,
            bufferSize: 1
        }));
        this.selectedComponentGuid$ = this.store$.select(selectedComponentGuidSelector).pipe(switchMap((componentGuid) => this.viewModelGuid$.pipe(map((viewGuid) => (componentGuid === viewGuid ? null : componentGuid)), take(1))));
        this.selectedComponentProperties$ = this.selectedComponentGuid$.pipe(switchMap((guid) => (guid ? this.getComponentProperties(guid) : of(null))));
        this.isViewDefinitionLoading$ = this.store$.select(isViewDefinitionLoadingSelector);
        this.selectedInspectorTabId$ = this.store$.select(selectedInspectorTabIdSelector);
        this.bundleFriendlyName$ = this.store$.select(bundleFriendlyNameSelector);
        this.currentBundleId$ = this.store$.select(currentBundleIdSelector);
        this.viewInspectorLayout$ = merge(this.viewModelGuid$, this.rxViewDesignerInspectorService.onChange$.pipe(withLatestFrom(this.viewModelGuid$), filter(([config, guid]) => config.guid === guid), map(([config, guid]) => guid))).pipe(map((guid) => {
            const inspectorConfig = this.rxViewDesignerInspectorService.get(guid);
            return inspectorConfig ? inspectorConfig.inspectorSectionConfigs : null;
        }));
        this.selectedComponentInspectorLayout$ = merge(this.selectedComponentGuid$.pipe(distinctUntilChanged()), this.rxViewDesignerInspectorService.onChange$.pipe(withLatestFrom(this.selectedComponentGuid$), filter(([config, guid]) => config.guid === guid), map(([config, guid]) => guid))).pipe(map((guid) => {
            const inspectorConfig = this.rxViewDesignerInspectorService.get(guid);
            return inspectorConfig ? inspectorConfig.inspectorSectionConfigs : null;
        }));
        this.isViewReadOnly$ = combineLatest([
            this.viewModel$,
            this.currentBundleId$.pipe(switchMap((bundleId) => this.rxOverlayService.areNewDefinitionsAllowed(bundleId)))
        ]).pipe(map(([viewModel, areNewDefinitionsAllowed]) => !areNewDefinitionsAllowed || !this.rxOverlayService.isCustomizationEnabled('allowOverlay', viewModel)), distinctUntilChanged(), shareReplay(1));
        // Actions Stream
        this.viewDefinitionLoadError$ = this.actions$.pipe(ofType(ViewDesignerActions.viewDefinitionLoadError));
        this.viewDefinitionSaveSuccess$ = this.actions$.pipe(ofType(ViewDesignerActions.viewDefinitionSaveSuccess));
        this.initViewDesigner$ = this.actions$.pipe(ofType(ViewDesignerActions.initViewDesigner));
        this.destroyViewDesignerSubject = new Subject();
        this.destroyViewDesigner$ = this.destroyViewDesignerSubject.asObservable();
        this.viewModelsInitialized$ = this.actions$.pipe(ofType(ViewDesignerActions.viewModelsInitialized));
        this.areViewModelsReady$ = this.store$.select(areViewModelsReadySelector);
        this.viewCommonDataDictionaryState$ = this.rxViewDataDictionaryService.viewCommon$;
        this.componentsCommonDataDictionaryState$ = this.rxViewDataDictionaryService.componentsCommon$;
        this.actionsDataDictionaryState$ = this.rxViewDataDictionaryService.actionsOutput$;
        this.settablePropertiesDataDictionaryState$ = this.rxViewDataDictionaryService.settableProperties$;
        this.settablePropertiesDataDictionarySubject = new Subject();
        // for performance reasons grouping actions before sending them to store
        merge(this.settablePropertiesDataDictionarySubject.pipe(bufferToggle(this.initViewDesigner$, (v) => this.viewModelsInitialized$)), this.viewModelsInitialized$.pipe(switchMap(() => this.settablePropertiesDataDictionarySubject.pipe(map((data) => [data]), takeUntil(this.initViewDesigner$))))).subscribe((items) => {
            this.rxViewDataDictionaryService.setSettablePropertiesDataDictionary(items);
        });
    }
    getComponentModel(guid) {
        return this.store$.select(viewComponentModelSelector, { guid });
    }
    initViewDesigner(payload) {
        this.dispatcher.dispatch(ViewDesignerActions.initViewDesigner({
            payload
        }));
    }
    destroyViewDesigner() {
        this.destroyViewDesignerSubject.next();
        // trigger action after subject to allow store to be cleared after every component is destroyed
        // and its streams are completed
        this.dispatcher.dispatch(ViewDesignerActions.destroyViewDesigner());
    }
    selectComponent(guid) {
        this.dispatcher.dispatch(ViewComponentsActions.selectComponent({ guid }));
    }
    insertComponent(payload) {
        this.dispatcher.dispatch(ViewComponentsActions.insertComponent(Object.assign(Object.assign({ columnIndex: isFinite(payload.data && payload.data.columnIndex) ? payload.data.columnIndex : 0 }, payload), { data: {
                guid: payload.data.draggedViewComponentGuid,
                type: payload.data.draggedViewComponentDescriptor.type,
                initialPropertiesByName: payload.data.initialPropertiesByName
            } })));
    }
    selectInspectorTab(payload) {
        this.dispatcher.dispatch(ViewDesignerActions.selectInspectorTab(payload));
    }
    generateViewDefinition(payload) {
        this.dispatcher.dispatch(ViewDesignerActions.generateViewDefinition({ payload }));
    }
    updateComponentProperties(guid, componentProperties) {
        this.dispatcher.dispatch(ViewComponentsActions.updateComponentModel({
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
        this.dispatcher.dispatch(ViewComponentsActions.updateComponentModel({
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
        this.dispatcher.dispatch(ViewDesignerActions.saveViewDefinition({ payload }));
    }
    updateViewProperties(properties) {
        this.dispatcher.dispatch(ViewDesignerActions.updateViewModel({ payload: properties }));
    }
    setViewProperties(properties) {
        this.dispatcher.dispatch(ViewDesignerActions.setViewModel({ payload: properties }));
    }
    getViewPropertyValue(propertyName) {
        return this.store$.select(viewModelPropertyValueSelector, { propertyName }).pipe(switchMapTo(this.viewModel$.pipe(map((model) => model[propertyName]), take(1))), distinctUntilChanged());
    }
    runPreview() {
        this.dispatcher.dispatch(ViewDesignerActions.runPreview());
    }
    clearCanvas() {
        this.dispatcher.dispatch(ViewDesignerActions.clearCanvas());
    }
    setComponentInspector(guid, inspectorConfig) {
        this.rxViewDesignerInspectorService.set(guid, inspectorConfig);
    }
    setValidationIssues(guid, issues) {
        this.dispatcher.dispatch(ViewComponentsActions.setValidationIssues({ guid, issues }));
    }
    setExpressionValidationIssues(issues) {
        this.dispatcher.dispatch(ViewComponentsActions.setExpressionValidationIssues({ issues }));
    }
    setViewInspectorConfig(inspectorConfig) {
        this.viewModelGuid$.pipe(take(1)).subscribe((guid) => {
            this.setComponentInspector(guid, inspectorConfig);
        });
    }
    removeViewComponents(guids, selectParent) {
        if (guids.length) {
            this.dispatcher.dispatch(ViewComponentsActions.removeComponents({ guids, selectParent }));
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
            ? combineLatest(guids.map((guid) => this.getChildComponentGuids(guid, true))).pipe(map(flatten), map((nestedGuids) => [...nestedGuids, ...guids]))
            : of(guids)), switchMap((guids) => guids.length
            ? this.viewComponentModels$.pipe(map((models) => {
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
        return this.getComponentModel(guid).pipe(map((model) => model
            ? {
                data: model.propertiesByName,
                guid: model.guid,
                type: model.type
            }
            : null));
    }
    getComponentsByType(type) {
        return this.viewComponentModels$.pipe(map((models) => _filter(models, { type }).map((model) => ({
            guid: model.guid,
            data: model.propertiesByName,
            type: model.type
        }))));
    }
    getChildComponentTree(parentComponentGuid) {
        return this.viewComponentModels$.pipe(map((viewComponentModels) => {
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
        this.dispatcher.dispatch(ViewComponentsActions.setChildComponents({
            payload: {
                guid,
                data
            }
        }));
    }
}
ViewDesignerFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDesignerFacade, deps: [{ token: i1.ViewDesignerDispatcher }, { token: i2.Store }, { token: i3.Actions }, { token: i4.RxViewDesignerInspectorService }, { token: i5.RxGuidService }, { token: i6.RxViewDataDictionaryBuilderService }, { token: i7.RxViewDataDictionaryStoreService }, { token: i8.RxOverlayService }], target: i0.ɵɵFactoryTarget.Injectable });
ViewDesignerFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDesignerFacade, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDesignerFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.ViewDesignerDispatcher }, { type: i2.Store }, { type: i3.Actions }, { type: i4.RxViewDesignerInspectorService }, { type: i5.RxGuidService }, { type: i6.RxViewDataDictionaryBuilderService }, { type: i7.RxViewDataDictionaryStoreService }, { type: i8.RxOverlayService }]; } });
//# sourceMappingURL=view-designer.facade.js.map