import { Injectable } from '@angular/core';
import { ViewDesignerFacade } from '../+state/view-designer.facade';
import { distinctUntilChanged, filter, map, shareReplay, withLatestFrom } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { RxDataDictionaryUtils } from '@helix/platform/shared/api';
import { compact, filter as _filter, find, flow, get, isEqual, map as _map, take } from 'lodash';
import { getChildGuidsFromModel } from '../core/layout-helpers';
import { RxViewDataDictionaryBuilderService } from '../core/view-data-dictionary-builder.service';
import { RX_EXPRESSION_FUNCTIONS, RxViewComponentRegistryService, RxViewLayout } from '@helix/platform/view/api';
import { RxObjectUtilsService } from '@helix/platform/utils';
import * as i0 from "@angular/core";
import * as i1 from "../+state/view-designer.facade";
import * as i2 from "../core/view-data-dictionary-builder.service";
import * as i3 from "@helix/platform/view/api";
import * as i4 from "@helix/platform/utils";
import * as i5 from "@helix/platform/shared/api";
export class RxViewDataDictionaryService {
    constructor(viewDesignerFacade, rxViewDataDictionaryBuilderService, rxViewComponentRegistryService, rxObjectUtilsService, rxDataDictionaryUtils) {
        this.viewDesignerFacade = viewDesignerFacade;
        this.rxViewDataDictionaryBuilderService = rxViewDataDictionaryBuilderService;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        this.rxObjectUtilsService = rxObjectUtilsService;
        this.rxDataDictionaryUtils = rxDataDictionaryUtils;
        this.componentsCommonDataDictionaryStateClone$ = this.viewDesignerFacade.componentsCommonDataDictionaryState$.pipe(map((componentsDataDictionaryState) => componentsDataDictionaryState ? this.rxObjectUtilsService.cloneDeep(componentsDataDictionaryState) : {}), shareReplay(1));
        this.viewCommonDataDictionaryStateClone$ = this.viewDesignerFacade.viewCommonDataDictionaryState$.pipe(filter(Boolean), map((viewDataDictionary) => this.rxObjectUtilsService.cloneDeep(viewDataDictionary)), shareReplay(1));
        this.commonDataDictionary$ = this.getCommonDataDictionary();
        this.settablePropertiesDataDictionary$ = this.viewDesignerFacade.settablePropertiesDataDictionaryState$.pipe(withLatestFrom(this.viewDesignerFacade.viewDesignerModelState$), map(([settablePropsDataDictionaryState, viewDesignerModelState]) => this.rxObjectUtilsService.cloneDeep(this.getSettablePropsDataDictionary(settablePropsDataDictionaryState, viewDesignerModelState))));
    }
    getActionDataDictionary(guid) {
        return combineLatest([this.viewDesignerFacade.actionsDataDictionaryState$, this.getCommonDataDictionary()]).pipe(map(([actionsDataDictionaryState, commonDataDictionary]) => {
            const currentActionData = find(actionsDataDictionaryState, { guid });
            return [
                {
                    label: 'Actions',
                    children: currentActionData
                        ? flow((branches) => take(branches, currentActionData.index), (branches) => _map(branches, 'dataDictionaryBranch'), compact, (branches) => _filter(branches, (branch) => { var _a; return (_a = branch.children) === null || _a === void 0 ? void 0 : _a.length; }), (branches) => this.rxObjectUtilsService.cloneDeep(branches))(actionsDataDictionaryState)
                        : []
                },
                ...commonDataDictionary
            ];
        }), 
        // TODO: performance
        distinctUntilChanged(isEqual));
    }
    getComponentCommonDataDictionary(guid) {
        return this.componentsCommonDataDictionaryStateClone$.pipe(map((state) => state[guid]));
    }
    getCommonDataDictionary(componentBranchToReplace) {
        return combineLatest([
            this.viewCommonDataDictionaryStateClone$,
            this.componentsCommonDataDictionaryStateClone$.pipe(map((componentsDataDictionaryState) => Object.values(componentBranchToReplace
                ? Object.assign(Object.assign({}, componentsDataDictionaryState), componentBranchToReplace) : componentsDataDictionaryState)))
        ]).pipe(map(([viewDataDictionaryBranch, componentDataDictionaryBranches]) => [
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
        const componentsDataDictionary = _map(childGuids, (componentGuid) => this.getSettablePropsDataDictionaryBranch(componentGuid, modelState, settablePropsState)).filter(Boolean);
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
RxViewDataDictionaryService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDataDictionaryService, deps: [{ token: i1.ViewDesignerFacade }, { token: i2.RxViewDataDictionaryBuilderService }, { token: i3.RxViewComponentRegistryService }, { token: i4.RxObjectUtilsService }, { token: i5.RxDataDictionaryUtils }], target: i0.ɵɵFactoryTarget.Injectable });
RxViewDataDictionaryService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDataDictionaryService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDataDictionaryService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.ViewDesignerFacade }, { type: i2.RxViewDataDictionaryBuilderService }, { type: i3.RxViewComponentRegistryService }, { type: i4.RxObjectUtilsService }, { type: i5.RxDataDictionaryUtils }]; } });
//# sourceMappingURL=view-data-dictionary.service.js.map