import { ApplyGridFilterMode, RxViewComponentType } from '@helix/platform/view/api';
import { ViewDesignerFacade } from '@helix/platform/view/designer';
import { forkJoin, merge, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { RxApplyGridFilterActionName } from './apply-grid-filter-view-action.types';
import { distinctUntilChanged, filter, map, shareReplay, skip, switchMap, take, withLatestFrom } from 'rxjs/operators';
import { RxApplyGridFilterViewActionDesignModelClass } from './apply-grid-filter-view-action-design-model.class';
import { RX_RECORD_GRID, RxRecordGridDesignUtilsService, RxRecordGridFilterHelperService } from '@helix/platform/view/components';
import { cloneDeep, compact, includes, isEqual, omit, sortBy, uniq } from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/designer";
import * as i2 from "@helix/platform/view/components";
export class RxApplyGridFilterViewActionDesignManagerService {
    constructor(viewDesignerFacade, rxRecordGridDesignUtilsService, rxRecordGridFilterHelperService) {
        this.viewDesignerFacade = viewDesignerFacade;
        this.rxRecordGridDesignUtilsService = rxRecordGridDesignUtilsService;
        this.rxRecordGridFilterHelperService = rxRecordGridFilterHelperService;
        const applyGridFilterActions$ = this.viewDesignerFacade
            .getComponentsByType(RxViewComponentType.Action)
            .pipe(map((components) => components.filter((comp) => comp.data.name === RxApplyGridFilterActionName)), shareReplay({ refCount: true, bufferSize: 1 }));
        const gridGuids$ = applyGridFilterActions$.pipe(map((actions) => actions.map((action) => RxApplyGridFilterViewActionDesignModelClass.extractGuidFromExpression(action.data.targetApi))), map((guids) => sortBy(uniq(compact(guids)))), filter((guids) => Boolean(guids.length)), distinctUntilChanged((a, b) => isEqual(a, b)), shareReplay({ refCount: true, bufferSize: 1 }));
        const updateActionFiltersOnGridColumnsChange$ = gridGuids$.pipe(switchMap((gridGuids) => {
            const actionsToUpdate$ = gridGuids.map((gridGuid) => this.getActionsToUpdate(gridGuid, applyGridFilterActions$));
            return merge(...actionsToUpdate$);
        }));
        const clearFiltersOnGridDefinitionChange$ = gridGuids$.pipe(switchMap((gridGuids) => {
            const actionsToUpdate$ = gridGuids.map((gridGuid) => this.getGridDefinitionChanges(gridGuid).pipe(skip(1), map(() => gridGuid), withLatestFrom(applyGridFilterActions$), map(([guid, actions]) => {
                const affectedActions = actions.filter((action) => action.data.targetApi.includes(guid));
                return affectedActions.map((actionComponent) => {
                    const updatedActionComponent = cloneDeep(actionComponent);
                    updatedActionComponent.data.filters = null;
                    return {
                        component: updatedActionComponent,
                        children: []
                    };
                });
            })));
            return merge(...actionsToUpdate$);
        }));
        merge(clearFiltersOnGridDefinitionChange$, updateActionFiltersOnGridColumnsChange$).subscribe((components) => {
            components.forEach((item) => {
                this.viewDesignerFacade.updateComponentProperties(item.component.guid, item.component.data);
                this.viewDesignerFacade.setChildren(item.component.guid, item.children);
            });
        });
    }
    getActionsToUpdate(gridGuid, applyGridFilterActions$) {
        return this.getGridColumnChanges(gridGuid).pipe(skip(1), withLatestFrom(applyGridFilterActions$), switchMap(([gridData, actions]) => {
            // getting actions bound to changed grid
            const affectedActions = actions.filter((action) => action.data.targetApi.includes(gridData.guid));
            const actionsWithFilters$ = affectedActions.map((action) => this.viewDesignerFacade.getChildComponents(action.guid).pipe(map((filterComponents) => (Object.assign(Object.assign({}, cloneDeep(action)), { children: filterComponents }))), take(1)));
            return forkJoin(actionsWithFilters$).pipe(map((actionComponents) => {
                const gridColumnIds = gridData.columns.map((col) => col.fieldId);
                return actionComponents.reduce((result, actionComponent) => {
                    const componentsToUpdate = this.getUpdatedFilterComponents(omit(actionComponent, 'children'), actionComponent.children, gridColumnIds);
                    return componentsToUpdate ? result.concat(componentsToUpdate) : result;
                }, []);
            }));
        }));
    }
    getGridColumnChanges(guid) {
        return this.viewDesignerFacade
            .getComponentPropertyValue(guid, 'columns')
            .pipe(filter((columns) => Array.isArray(columns)), map((columns) => ({
            guid,
            columns: columns.map((col) => ({
                fieldId: col.fieldId,
                namedFilterOptions: col.namedFilterOptions
            }))
        })), distinctUntilChanged(isEqual));
    }
    getGridDefinitionChanges(guid) {
        return this.viewDesignerFacade.getComponentPropertyValue(guid, 'recordDefinitionName').pipe(distinctUntilChanged());
    }
    getUpdatedFilterComponents(component, filterComponents, gridColumnIds) {
        const filterComponentsForColumns = filterComponents.filter((item) => gridColumnIds.includes(item.data.fieldId));
        if (filterComponentsForColumns.length !== filterComponents.length) {
            const updatedFilterComponents = this.rxRecordGridDesignUtilsService.getBasicRecordGridFiltersFromChildData(filterComponentsForColumns);
            const newFilterData = this.rxRecordGridFilterHelperService.getRecordGridFilterDataFromPredefinedFilter(component.data.filters, updatedFilterComponents);
            // updating filters JSON after column remove
            component.data.filters = newFilterData
                ? this.rxRecordGridFilterHelperService.denormalizeFilterString(JSON.stringify(newFilterData), updatedFilterComponents)
                : null;
            return {
                component,
                children: filterComponentsForColumns
            };
        }
        return null;
    }
    validate(actionProperties, propertyName) {
        const filterValidation = !actionProperties.filters &&
            !includes([ApplyGridFilterMode.Begin, ApplyGridFilterMode.End, ApplyGridFilterMode.Clear], actionProperties.mode)
            ? {
                type: 'error',
                description: 'Apply grid filter action: Filter is required',
                propertyName
            }
            : null;
        return of(actionProperties.targetApi).pipe(map((targetApi) => RxApplyGridFilterViewActionDesignModelClass.extractGuidFromExpression(targetApi)), switchMap((guid) => (guid ? this.viewDesignerFacade.getComponent(guid) : of(null))), take(1), map((item) => {
            const issues = [];
            if (actionProperties.targetApi && (item === null || item === void 0 ? void 0 : item.type) !== RX_RECORD_GRID.type) {
                issues.push({
                    type: 'error',
                    description: 'Apply grid filter action: Record grid expression must point to a record grid.',
                    propertyName
                });
            }
            if (actionProperties.targetApi && !issues.length && filterValidation) {
                issues.push(filterValidation);
            }
            return issues;
        }));
    }
}
RxApplyGridFilterViewActionDesignManagerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApplyGridFilterViewActionDesignManagerService, deps: [{ token: i1.ViewDesignerFacade }, { token: i2.RxRecordGridDesignUtilsService }, { token: i2.RxRecordGridFilterHelperService }], target: i0.ɵɵFactoryTarget.Injectable });
RxApplyGridFilterViewActionDesignManagerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApplyGridFilterViewActionDesignManagerService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApplyGridFilterViewActionDesignManagerService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.ViewDesignerFacade }, { type: i2.RxRecordGridDesignUtilsService }, { type: i2.RxRecordGridFilterHelperService }]; } });
//# sourceMappingURL=apply-grid-filter-view-action-design-manager.service.js.map