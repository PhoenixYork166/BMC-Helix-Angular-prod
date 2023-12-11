import { __decorate, __metadata } from "tslib";
import { Injectable, Injector } from '@angular/core';
import { RxGuidService } from '@helix/platform/utils';
import { RX_VIEW_DEFINITION, RxViewComponentRegistryService, RxViewLayout } from '@helix/platform/view/api';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { ComponentSandbox } from '../component-sandbox/component-sandbox.class';
import { viewComponentModelsSelector } from './view-designer.selectors';
import { RxViewDesignerModels } from '../core/view-designer-models.service';
import { getAllChildGuids, getChildGuidsFromModel } from '../core/layout-helpers';
import * as ViewComponentsActions from './view-component.actions';
import * as ViewComponentActions from './view-component.actions';
import { difference, forEach, includes, isEmpty, isEqual, isFunction, last, map as _map } from 'lodash';
import { RxViewDesignerInspectorService } from '../core/view-designer-inspector.service';
import { RxViewExpressionValidatorRegistryService } from '../validation/view-expression-validator-registry.service';
import * as ViewDesignerActions from './view-designer.actions';
import { RxViewDesignerStateHelperService } from './view-designer-state-helper.service';
import { RxViewDataDictionaryStoreService } from '../core/view-data-dictionary-store.service';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/effects";
import * as i2 from "../core/view-designer-models.service";
import * as i3 from "@helix/platform/utils";
import * as i4 from "@ngrx/store";
import * as i5 from "@helix/platform/view/api";
import * as i6 from "../core/view-designer-inspector.service";
import * as i7 from "../validation/view-expression-validator-registry.service";
import * as i8 from "./view-designer-state-helper.service";
import * as i9 from "../core/view-data-dictionary-store.service";
export class ViewDesignerComponentEffects {
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
        this.initializeComponentModel$ = this.actions$.pipe(ofType(ViewComponentActions.initializeComponentModels), tap((action) => {
            action.payload.forEach(({ componentModel }) => {
                const componentDescriptor = this.rxViewComponentRegistryService.get(componentModel.type);
                const sandbox = new ComponentSandbox(this.injector, componentModel.guid, componentDescriptor);
                const model = new componentDescriptor.designComponentModel(this.injector, sandbox);
                if (isFunction(model.rxInit)) {
                    model.rxInit();
                }
                this.viewDesignerModels.set(componentModel.guid, model);
            });
        }), map(() => ViewDesignerActions.viewModelsInitialized()));
        this.registerComponentsValidation$ = this.actions$.pipe(ofType(ViewComponentActions.initializeDataComponentModels, ViewComponentActions.initializeComponentModels), tap((action) => this.rxViewExpressionValidatorRegistryService.registerComponents(_map(action.payload, (payload) => payload.componentModel.guid))));
        this.onComponentsRemoved$ = this.actions$.pipe(ofType(ViewComponentActions.componentsRemoved), tap(({ guids }) => {
            this.rxViewExpressionValidatorRegistryService.unregisterComponents(guids);
            this.rxViewDataDictionaryStoreService.removeDataDictionaryForComponents(guids);
        }));
        this.unregisterAllComponentsValidation$ = this.actions$.pipe(ofType(ViewDesignerActions.initViewDesigner, ViewDesignerActions.destroyViewDesigner), tap(() => this.rxViewExpressionValidatorRegistryService.unregisterAllComponents()));
        this.insertComponent$ = this.actions$.pipe(ofType(ViewComponentsActions.insertComponent), map((payload) => {
            const newPayload = {
                insertIndex: payload.insertIndex,
                columnIndex: payload.columnIndex,
                outletName: payload.outletName,
                parentGuid: payload.targetGuid
            };
            return payload.data.guid
                ? ViewComponentsActions.moveComponent(Object.assign(Object.assign({}, newPayload), { guid: payload.data.guid }))
                : ViewComponentsActions.addNewComponents({
                    payload: [
                        Object.assign(Object.assign({}, newPayload), { type: payload.data.type, selectComponent: true, propertiesByName: payload.data.initialPropertiesByName })
                    ]
                });
        }));
        this.addNewComponent$ = this.actions$.pipe(ofType(ViewComponentsActions.addNewComponents), withLatestFrom(this.store$.select(viewComponentModelsSelector)), mergeMap(([action, viewComponentsState]) => {
            const initializeComponentModelPayloads = [];
            const initializeDataComponentModelPayloads = [];
            const componentGuidsToSelect = [];
            action.payload.forEach((component) => {
                this.processAddComponentPayload(component, initializeComponentModelPayloads, initializeDataComponentModelPayloads, componentGuidsToSelect, viewComponentsState);
            });
            return [
                initializeComponentModelPayloads.length
                    ? ViewComponentsActions.initializeComponentModels({ payload: initializeComponentModelPayloads })
                    : null,
                initializeDataComponentModelPayloads.length
                    ? ViewComponentsActions.initializeDataComponentModels({ payload: initializeDataComponentModelPayloads })
                    : null,
                componentGuidsToSelect.length
                    ? ViewComponentsActions.selectComponent({
                        guid: last(componentGuidsToSelect)
                    })
                    : null
            ].filter(Boolean);
        }));
        this.removeComponent$ = this.actions$.pipe(ofType(ViewComponentsActions.removeComponents), filter(({ guids }) => !isEmpty(guids)), withLatestFrom(this.store$.select(viewComponentModelsSelector)), mergeMap(([payload, viewComponentsState]) => {
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
            const actions = [ViewComponentsActions.componentsRemoved({ guids: [...removeGuidsSet] })];
            if (payload.selectParent) {
                const lastRemovedModel = viewComponentsState[last(payload.guids)];
                if (lastRemovedModel === null || lastRemovedModel === void 0 ? void 0 : lastRemovedModel.parentGuid) {
                    actions.push(ViewComponentsActions.selectComponent({
                        guid: lastRemovedModel.parentGuid
                    }));
                }
            }
            return actions;
        }));
        this.setChildren$ = this.actions$.pipe(ofType(ViewComponentActions.setChildComponents), map((action) => action.payload), withLatestFrom(this.store$.select(viewComponentModelsSelector)), mergeMap(([actionPayload, viewComponentsState]) => {
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
                    result.children = _map(action.children, (child) => getAddComponentPayload(child, action.guid));
                }
                return result;
            }
            if (componentGuidsToRemove.length) {
                actions.push(ViewComponentsActions.removeComponents({ guids: componentGuidsToRemove }));
            }
            if (addComponentsPayloadAll.length) {
                actions.push(ViewComponentsActions.addNewComponents({ payload: addComponentsPayloadAll }));
            }
            if (editComponentPayloadAll.length) {
                actions.push(ViewComponentsActions.setComponentData({ payload: editComponentPayloadAll }));
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
ViewDesignerComponentEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDesignerComponentEffects, deps: [{ token: i1.Actions }, { token: i0.Injector }, { token: i2.RxViewDesignerModels }, { token: i3.RxGuidService }, { token: i4.Store }, { token: i5.RxViewComponentRegistryService }, { token: i6.RxViewDesignerInspectorService }, { token: i7.RxViewExpressionValidatorRegistryService }, { token: i8.RxViewDesignerStateHelperService }, { token: i9.RxViewDataDictionaryStoreService }], target: i0.ɵɵFactoryTarget.Injectable });
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
        }], ctorParameters: function () { return [{ type: i1.Actions }, { type: i0.Injector }, { type: i2.RxViewDesignerModels }, { type: i3.RxGuidService }, { type: i4.Store }, { type: i5.RxViewComponentRegistryService }, { type: i6.RxViewDesignerInspectorService }, { type: i7.RxViewExpressionValidatorRegistryService }, { type: i8.RxViewDesignerStateHelperService }, { type: i9.RxViewDataDictionaryStoreService }]; }, propDecorators: { initializeComponentModel$: [], registerComponentsValidation$: [], onComponentsRemoved$: [], unregisterAllComponentsValidation$: [], insertComponent$: [], addNewComponent$: [], removeComponent$: [], setChildren$: [] } });
//# sourceMappingURL=view-designer-component.effects.js.map