import { __decorate, __metadata } from "tslib";
import { ErrorHandler, Injectable } from '@angular/core';
import { RxBundleCacheService, RxDefinitionAdapterRegistryService, RxDefinitionNameService, RxDefinitionUpdateService, RxGlobalCacheService, RxLogService } from '@helix/platform/shared/api';
import { RxModalService, RxUtilityModalsService } from '@helix/platform/ui-kit';
import { RxGuidService, RxJsonParserService } from '@helix/platform/utils';
import { RX_VIEW_DEFINITION, RxOldViewLayoutAdapterService, RxViewActionDefinitionAdapterRegistryService, RxViewActionRegistryService, RxViewComponentRegistryService, RxViewComponentType, RxViewDefinitionParserService, RxViewDefinitionService, RxViewLayout, ViewComponentPropertyType } from '@helix/platform/view/api';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { cloneDeep, find, includes, last, map as _map, omit, transform } from 'lodash';
import { noop, of, throwError } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { RuntimeViewParamsModalComponent } from '../components/runtime-view-params-modal';
import { getChildGuidsFromModel } from '../core/layout-helpers';
import { RxViewDataDictionaryStoreService } from '../core/view-data-dictionary-store.service';
import { RxViewDefinitionGeneratorService } from '../core/view-definition-generator.service';
import { RxViewDesignerInspectorService } from '../core/view-designer-inspector.service';
import { RxViewDesignerModels } from '../core/view-designer-models.service';
import * as ViewComponentsActions from './view-component.actions';
import { RxViewDesignerStateHelperService } from './view-designer-state-helper.service';
import * as ViewDesignerActions from './view-designer.actions';
import { selectedInspectorTabIdSelector, viewComponentModelsSelector, viewModelSelector } from './view-designer.selectors';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/effects";
import * as i2 from "@ngrx/store";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "@helix/platform/utils";
import * as i5 from "@helix/platform/view/api";
import * as i6 from "../core/view-designer-models.service";
import * as i7 from "@helix/platform/ui-kit";
import * as i8 from "../core/view-designer-inspector.service";
import * as i9 from "../core/view-definition-generator.service";
import * as i10 from "./view-designer-state-helper.service";
import * as i11 from "../core/view-data-dictionary-store.service";
export class ViewDesignerEffects {
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
        this.initViewDesigner$ = this.actions$.pipe(ofType(ViewDesignerActions.initViewDesigner), switchMap(({ payload }) => {
            const { viewDefinitionName, layoutTemplate } = payload;
            this.clearStorages();
            return [
                ViewDesignerActions.loadFriendlyBundleName(),
                ViewDesignerActions.loadViewDefinition({
                    viewDefinitionName,
                    layoutTemplate
                })
            ];
        }));
        this.destroyViewDesigner$ = this.actions$.pipe(ofType(ViewDesignerActions.destroyViewDesigner), tap(() => this.clearStorages()));
        this.loadFriendlyBundleName$ = this.actions$.pipe(ofType(ViewDesignerActions.loadFriendlyBundleName), switchMap(() => this.rxGlobalCacheService.getBundleDescriptor(this.rxBundleCacheService.bundleId)), switchMap((descriptor) => {
            let result$;
            if (descriptor) {
                result$ = of(ViewDesignerActions.friendlyBundleNameLoadSuccess({
                    friendlyBundleName: descriptor.friendlyName
                }));
            }
            else {
                result$ = throwError(`Bundle "${this.rxBundleCacheService.bundleId}" not found`);
            }
            return result$.pipe(catchError((error) => {
                this.errorHandler.handleError(error);
                return of(ViewDesignerActions.friendlyBundleNameLoadError({ payload: error }));
            }));
        }));
        this.loadViewDefinition$ = this.actions$.pipe(ofType(ViewDesignerActions.loadViewDefinition), switchMap(({ viewDefinitionName, layoutTemplate }) => {
            const viewDefinition$ = viewDefinitionName
                ? this.rxViewDefinitionService.get(viewDefinitionName)
                : this.rxViewDefinitionService.getNew(layoutTemplate);
            return viewDefinition$.pipe(map((viewDefinition) => ViewDesignerActions.viewDefinitionLoadSuccess({
                viewDefinition
            })), catchError((error) => {
                this.errorHandler.handleError(error);
                return of(ViewDesignerActions.viewDefinitionLoadError());
            }));
        }));
        this.viewDefinitionLoadSuccess$ = this.actions$.pipe(ofType(ViewDesignerActions.viewDefinitionLoadSuccess), withLatestFrom(this.store$.select(viewModelSelector)), mergeMap(([payload, viewModel]) => {
            // If viewModel isn't empty it's considered that view definition is loaded after save to update
            // existing view models with properties added by server e.g 'lastChangedBy', 'lastUpdateTime' and etc.
            return viewModel
                ? this.getActionsToUpdateExistingViewModels(payload.viewDefinition)
                : this.getActionsToInitializeViewModels(payload.viewDefinition);
        }));
        this.selectViewComponent$ = this.actions$.pipe(ofType(ViewComponentsActions.selectComponent), withLatestFrom(this.store$.select(viewModelSelector), this.store$.select(selectedInspectorTabIdSelector)), mergeMap(([action, viewModel, currentInspectorTabId]) => {
            const selectedInspectorTab = viewModel.guid === action.guid ? 0 : 1;
            if (selectedInspectorTab !== currentInspectorTabId) {
                return [
                    ViewDesignerActions.selectInspectorTab({
                        tabId: selectedInspectorTab
                    })
                ];
            }
            else {
                return [];
            }
        }));
        this.generateViewDefinition$ = this.actions$.pipe(ofType(ViewDesignerActions.generateViewDefinition), withLatestFrom(this.store$.select(viewModelSelector), this.store$.select(viewComponentModelsSelector), (action, viewModel, componentModels) => ({ viewModel, componentModels })), map(({ viewModel, componentModels }) => this.rxViewDefinitionGeneratorService.generate(viewModel, componentModels)), map((viewDefinition) => ViewDesignerActions.setGeneratedViewDefinition({ payload: viewDefinition })));
        this.saveViewDefinition$ = this.actions$.pipe(ofType(ViewDesignerActions.saveViewDefinition), withLatestFrom(this.store$.select(viewModelSelector), this.store$.select(viewComponentModelsSelector), (action, viewModel, components) => ({ viewModel, components })), switchMap(({ viewModel, components }) => {
            const viewDefinition = this.rxViewDefinitionGeneratorService.generate(viewModel, components, true);
            return (viewDefinition.lastUpdateTime
                ? this.rxDefinitionUpdateService.execute(this.rxViewDefinitionService.update.bind(this.rxViewDefinitionService, viewDefinition.name, viewDefinition))
                : this.rxViewDefinitionService.create(viewDefinition)).pipe(switchMap((response) => {
                const definitionName = decodeURIComponent(last(response === null || response === void 0 ? void 0 : response.headers.get('Location').split('/')) || '') || viewDefinition.name;
                return [
                    ViewDesignerActions.viewDefinitionSaveSuccess({ viewDefinitionName: definitionName }),
                    viewDefinition.lastUpdateTime
                        ? ViewDesignerActions.loadViewDefinition({
                            viewDefinitionName: viewDefinition.name
                        })
                        : null
                ].filter(Boolean);
            }), catchError((error) => {
                this.errorHandler.handleError(error);
                return of(ViewDesignerActions.viewDefinitionSaveError());
            }));
        }));
        this.clearCanvas$ = this.actions$.pipe(ofType(ViewDesignerActions.clearCanvas), withLatestFrom(this.store$.select(viewModelSelector)), map(([action, viewModel]) => ViewComponentsActions.removeComponents({ guids: getChildGuidsFromModel(viewModel) })));
        this.runPreview$ = this.actions$.pipe(ofType(ViewDesignerActions.runPreview), withLatestFrom(this.store$.select(viewModelSelector), (action, viewModel) => viewModel), switchMap((viewModel) => viewModel.targetViewDefinitionName
            ? this.rxViewDefinitionService.get(viewModel.targetViewDefinitionName)
            : of(viewModel)), tap((viewModel) => {
            const encodedViewDefinitionName = encodeURIComponent(viewModel.name);
            let url = `/helix/index.html#/${this.rxBundleCacheService.bundleId}/preview/${encodedViewDefinitionName}`;
            if (viewModel.inputParams.length) {
                this.rxModalService
                    .openModal({
                    title: 'Enter view parameter values',
                    content: RuntimeViewParamsModalComponent,
                    data: { inputParams: _map(viewModel.inputParams, 'name') },
                    size: 'sm'
                })
                    .catch(noop)
                    .then((params) => {
                    const inputConfig = _map(params, (value, name) => {
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
            ViewDesignerActions.setViewModel({ payload: viewModel }),
            initComponentModelsPayload.length
                ? ViewComponentsActions.initializeComponentModels({ payload: initComponentModelsPayload })
                : null,
            initDataComponentModelsPayload.length
                ? ViewComponentsActions.initializeDataComponentModels({ payload: initDataComponentModelsPayload })
                : null,
            initComponentModelsPayload.length ? null : ViewDesignerActions.viewModelsInitialized()
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
            ViewDesignerActions.updateViewModel({
                payload: omit(viewDefinitionClone, ['layout', 'componentDefinitions'])
            }),
            updateComponentModelPayloads.length
                ? ViewComponentsActions.updateComponentModel({ payload: updateComponentModelPayloads })
                : null,
            ViewDesignerActions.viewModelsUpdatedAfterSave()
        ].filter(Boolean);
    }
}
ViewDesignerEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDesignerEffects, deps: [{ token: i1.Actions }, { token: i2.Store }, { token: i3.RxBundleCacheService }, { token: i3.RxDefinitionNameService }, { token: i3.RxDefinitionUpdateService }, { token: i3.RxGlobalCacheService }, { token: i4.RxJsonParserService }, { token: i5.RxViewComponentRegistryService }, { token: i5.RxViewActionRegistryService }, { token: i5.RxViewDefinitionService }, { token: i6.RxViewDesignerModels }, { token: i5.RxOldViewLayoutAdapterService }, { token: i5.RxViewDefinitionParserService }, { token: i3.RxLogService }, { token: i7.RxModalService }, { token: i0.ErrorHandler }, { token: i7.RxUtilityModalsService }, { token: i3.RxDefinitionAdapterRegistryService }, { token: i8.RxViewDesignerInspectorService }, { token: i9.RxViewDefinitionGeneratorService }, { token: i10.RxViewDesignerStateHelperService }, { token: i5.RxViewActionDefinitionAdapterRegistryService }, { token: i4.RxGuidService }, { token: i11.RxViewDataDictionaryStoreService }], target: i0.ɵɵFactoryTarget.Injectable });
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
        }], ctorParameters: function () { return [{ type: i1.Actions }, { type: i2.Store }, { type: i3.RxBundleCacheService }, { type: i3.RxDefinitionNameService }, { type: i3.RxDefinitionUpdateService }, { type: i3.RxGlobalCacheService }, { type: i4.RxJsonParserService }, { type: i5.RxViewComponentRegistryService }, { type: i5.RxViewActionRegistryService }, { type: i5.RxViewDefinitionService }, { type: i6.RxViewDesignerModels }, { type: i5.RxOldViewLayoutAdapterService }, { type: i5.RxViewDefinitionParserService }, { type: i3.RxLogService }, { type: i7.RxModalService }, { type: i0.ErrorHandler }, { type: i7.RxUtilityModalsService }, { type: i3.RxDefinitionAdapterRegistryService }, { type: i8.RxViewDesignerInspectorService }, { type: i9.RxViewDefinitionGeneratorService }, { type: i10.RxViewDesignerStateHelperService }, { type: i5.RxViewActionDefinitionAdapterRegistryService }, { type: i4.RxGuidService }, { type: i11.RxViewDataDictionaryStoreService }]; }, propDecorators: { initViewDesigner$: [], destroyViewDesigner$: [], loadFriendlyBundleName$: [], loadViewDefinition$: [], viewDefinitionLoadSuccess$: [], selectViewComponent$: [], generateViewDefinition$: [], saveViewDefinition$: [], clearCanvas$: [], runPreview$: [] } });
//# sourceMappingURL=view-designer.effects.js.map