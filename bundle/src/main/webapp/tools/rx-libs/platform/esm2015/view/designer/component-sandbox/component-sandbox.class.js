import { Actions, ofType } from '@ngrx/effects';
import { castArray } from 'lodash';
import { BehaviorSubject, merge, of, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, filter, first, map, mapTo, shareReplay, skipWhile, startWith, switchMap, switchMapTo, take, takeUntil } from 'rxjs/operators';
import { ViewDesignerDispatcher } from '../+state/view-designer-dispatcher.service';
import { ViewDesignerFacade } from '../+state/view-designer.facade';
import * as ViewComponentsActions from '../+state/view-component.actions';
import { RxViewDesignerModels } from '../core/view-designer-models.service';
import { RX_VIEW_DEFINITION } from '@helix/platform/view/api';
export class ComponentSandbox {
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
            .pipe(map((model) => Boolean(model.lastUpdateTime || model.name)), switchMap((isExistingViewComponent) => {
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
            this.dispatcher$.next(ViewComponentsActions.setBreadcrumbs({
                guid: this.guid,
                label
            }));
        });
        merge(
        // skip initial batch of setValidationIssues actions that are emitted during view designer initialization with empty payload
        this.dispatcher$.pipe(ofType(ViewComponentsActions.setValidationIssues), skipWhile((action) => action.issues.length === 0)), this.dispatcher$.pipe(filter((action) => action.type !== ViewComponentsActions.setValidationIssues.type)))
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
        this.dispatcher$.next(ViewComponentsActions.setChildComponents({
            payload: {
                guid: parentGuid || this.guid,
                data
            }
        }));
    }
    setChildrenByType(data, types) {
        this.dispatcher$.next(ViewComponentsActions.setChildComponents({
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
        this.dispatcher$.next(ViewComponentsActions.setValidationIssues({ issues, guid: this.guid }));
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
        this.dispatcher$.next(ViewComponentsActions.addNewComponents({ payload: actionPayload }));
    }
    selectComponent(guid) {
        this.dispatcher$.next(ViewComponentsActions.selectComponent({ guid }));
    }
    removeComponents(guids, selectParent) {
        this.viewDesignerFacade.removeViewComponents(guids, selectParent);
    }
    moveComponent(guid, insertIndex, targetGuid) {
        const data = { guid };
        const columnIndex = 0;
        const outletName = RX_VIEW_DEFINITION.defaultOutletName;
        this.dispatcher$.next(ViewComponentsActions.insertComponent({
            data,
            insertIndex,
            columnIndex,
            outletName,
            targetGuid
        }));
    }
    setLayout(cols) {
        this.dispatcher$.next(ViewComponentsActions.setComponentLayout({
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
        const viewComponentsRemovedAction$ = this.systemActions$.pipe(ofType(ViewComponentsActions.componentsRemoved), filter((action) => action.guids.includes(this.guid)));
        this.destroyed$ = merge(viewComponentsRemovedAction$, this.viewDesignerFacade.initViewDesigner$, this.viewDesignerFacade.destroyViewDesigner$).pipe(mapTo(true), first());
        this.componentProperties$ = this.viewDesignerFacade
            .getComponentProperties(this.guid)
            .pipe(filter(Boolean), takeUntil(this.destroyed$), shareReplay(1));
        this.isComponentSelected$ = this.systemActions$.pipe(ofType(ViewComponentsActions.selectComponent), map(({ guid }) => guid === this.guid), distinctUntilChanged(), startWith(false), takeUntil(this.destroyed$), shareReplay(1));
        this.isViewReadOnly$ = this.viewDesignerFacade.isViewReadOnly$;
    }
}
//# sourceMappingURL=component-sandbox.class.js.map