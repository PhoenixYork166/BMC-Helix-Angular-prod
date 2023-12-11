import * as i0 from '@angular/core';
import { Injectable, NgModule, Component, HostListener, Input, ViewChild } from '@angular/core';
import * as i1$1 from '@helix/platform/view/api';
import { ApplyGridFilterMode, RecordGridNamedFilterOptionKey, OpenViewActionModalSize, OpenViewActionType, OpenViewActionLaunchBehavior, RxViewDefinitionCacheService, ViewComponentPropertyType, RowDataItemIdFieldName, RX_VIEW_DEFINITION, RxViewComponentType, RX_LAUNCH_BEHAVIOR } from '@helix/platform/view/api';
import * as i1$4 from '@helix/platform/shared/api';
import { Tooltip, RX_APPLICATION, RxDefinitionNameService, RX_ERROR_HANDLING, RX_ADMINISTRATION, ExpressionOperatorGroup, RX_DESIGNER } from '@helix/platform/shared/api';
import * as i1 from '@helix/platform/utils';
import { RxError } from '@helix/platform/utils';
import { EMPTY, throwError, merge, of, combineLatest, from, forkJoin, concat, isObservable, defer, ReplaySubject } from 'rxjs';
import * as i3$3 from '@helix/platform/view/designer';
import { RxViewDesignerActionModel, ViewDesignerFacade, RxViewActionExpressionConfigurator, RxViewDataDictionaryService } from '@helix/platform/view/designer';
import { ExpressionFormControlComponent, RadioFormControlComponent, ValidationFormControlComponent, MessageType, RxDefinitionPickerComponent, RxDefinitionPickerType, SelectFormControlComponent, TextFormControlComponent, SwitchFormControlComponent, ValueAccessor, DefinitionPickerOrExpressionFormControlComponent, RxIframeModule } from '@helix/platform/shared/components';
import { first, withLatestFrom, pluck, takeUntil, distinctUntilChanged, skip, map, filter, switchMap, take, catchError, switchMapTo, mapTo, shareReplay, tap, defaultIfEmpty } from 'rxjs/operators';
import * as i2 from '@helix/platform/view/components';
import { RxRecordGridDesignUtilsService, RxRecordGridFilterSelectHelperService, RX_RECORD_GRID, RecordGridFilterSelectControlComponent, RecordEditorMode, ContainerRowWrap, RxAssociationEditingMode } from '@helix/platform/view/components';
import * as i4 from '@helix/platform/record/api';
import { RxRecordDefinitionCacheService, RX_RECORD_DEFINITION, RX_RECORD_INSTANCE } from '@helix/platform/record/api';
import { omit, includes, transform, isObject, defaults, flow, map as map$1, flatten, compact, uniq, get, isFunction, isArray, some, isEmpty, castArray, noop, forEach, forIn, isNull, values, has, pick, filter as filter$1, assign, isNil, isEqual, last, reduce, keys, sortBy, cloneDeep } from 'lodash';
import * as i1$3 from '@helix/platform/association/api';
import { RX_ASSOCIATED_RECORD_NODE_SIDES, RX_ASSOCIATION_DEFINITION, RxAssociationDefinitionService, RxAssociatedRecordNodeSide } from '@helix/platform/association/api';
import * as i2$1 from '@angular/router';
import * as i1$2 from '@bmc-ux/adapt-angular';
import { DismissReasons, DockedPanelDirection, AdaptDockedPanelModule, AdaptIconModule, AdaptRxTextareaModule, AdaptRxCheckboxModule, AdaptRxLabelModule, AdaptTreeModule, AdaptDropdownModule } from '@bmc-ux/adapt-angular';
import * as i3 from '@helix/platform/view/runtime';
import { RuntimeViewModalComponent, RuntimeViewModule } from '@helix/platform/view/runtime';
import * as i2$3 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i4$1 from '@ngx-translate/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import * as i2$2 from '@helix/platform/ui-kit';
import { RX_MODAL } from '@helix/platform/ui-kit';
import * as i3$1 from '@angular/forms';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i3$2 from '@helix/platform/process/api';
import { RxProcessDefinitionCacheService, RX_PROCESS_DEFINITION, RxProcessApiModule } from '@helix/platform/process/api';
import * as i4$2 from '@angular/platform-browser';

const RxApplyGridFilterActionName = 'rxApplyGridFilterAction';

class RxApplyGridFilterViewActionService {
    execute(params) {
        if (params.targetApi) {
            if (params.targetApi.applyFilters) {
                params.targetApi.applyFilters(params.filters, params.mode);
                return EMPTY;
            }
            else {
                throwError(new RxError(`${RxApplyGridFilterActionName}: target component does not support applyFilters API.`));
            }
            return EMPTY;
        }
        else {
            return throwError(new RxError('rxApplyGridFilterAction: component is not specified.'));
        }
    }
}
RxApplyGridFilterViewActionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApplyGridFilterViewActionService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxApplyGridFilterViewActionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApplyGridFilterViewActionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApplyGridFilterViewActionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class RxApplyGridFilterViewActionDesignModelClass extends RxViewDesignerActionModel {
    constructor(injector, sandbox) {
        super(injector, sandbox);
        this.injector = injector;
        this.sandbox = sandbox;
        this.viewDesignerFacade = this.injector.get(ViewDesignerFacade);
        this.rxRecordDefinitionCacheService = this.injector.get(RxRecordDefinitionCacheService);
        this.rxRecordGridDesignUtilsService = this.injector.get(RxRecordGridDesignUtilsService);
        this.rxRecordGridFilterSelectHelperService = this.injector.get(RxRecordGridFilterSelectHelperService);
        // set initial filters select value from child filter components
        this.sandbox.children$
            .pipe(first(), withLatestFrom(this.sandbox.actionProperties$.pipe(pluck('filters'))), takeUntil(this.sandbox.destroyed$))
            .subscribe(([filterComponents, filtersJson]) => {
            const basicFilters = this.rxRecordGridDesignUtilsService.getBasicRecordGridFiltersFromChildData(filterComponents);
            this.sandbox.updateActionProperties({
                filterValue: {
                    basicFilters,
                    filtersJson
                }
            });
        });
        const filterValue$ = this.sandbox.actionProperties$.pipe(pluck('filterValue'), distinctUntilChanged());
        // set filters data on filter select change
        filterValue$.pipe(skip(1), takeUntil(this.sandbox.destroyed$)).subscribe(({ filtersJson, basicFilters }) => {
            const filterPayloads = this.rxRecordGridDesignUtilsService.getGridFilterComponentPayloads(basicFilters);
            this.sandbox.setChildren(filterPayloads);
            this.sandbox.updateActionProperties({
                filters: filtersJson
            });
        });
        const mode$ = this.sandbox.actionProperties$.pipe(pluck('mode'), distinctUntilChanged());
        const targetApi$ = this.sandbox.actionProperties$.pipe(pluck('targetApi'), distinctUntilChanged());
        const gridGuid$ = targetApi$.pipe(map(RxApplyGridFilterViewActionDesignModelClass.extractGuidFromExpression));
        // reset filters after grid change or when clear mode is selected
        merge(gridGuid$.pipe(skip(1)), mode$.pipe(filter((mode) => mode === ApplyGridFilterMode.Clear)))
            .pipe(takeUntil(this.sandbox.destroyed$))
            .subscribe(() => {
            this.sandbox.updateActionProperties({
                filterValue: {
                    basicFilters: null,
                    filtersJson: null
                }
            });
        });
        const gridProperties$ = gridGuid$.pipe(switchMap((guid) => (guid ? this.viewDesignerFacade.getComponent(guid) : of(null))), map((item) => ((item === null || item === void 0 ? void 0 : item.type) === RX_RECORD_GRID.type ? item.data : null)));
        const recordDefinition$ = gridProperties$.pipe(map((item) => { var _a; return (_a = item === null || item === void 0 ? void 0 : item.recordDefinitionName) !== null && _a !== void 0 ? _a : null; }), switchMap((recordDefinitionName) => recordDefinitionName ? this.rxRecordDefinitionCacheService.getRecordDefinition(recordDefinitionName) : of(null)));
        const gridColumns$ = gridProperties$.pipe(map((gridData) => { var _a; return (_a = gridData === null || gridData === void 0 ? void 0 : gridData.columns) !== null && _a !== void 0 ? _a : []; }));
        const recordDefinitionFiltered$ = recordDefinition$.pipe(withLatestFrom(gridColumns$), map(([recordDefinition, columns]) => {
            const fieldIds = columns.filter((col) => col.filterable).map((col) => col.fieldId);
            return recordDefinition
                ? Object.assign(Object.assign({}, recordDefinition), { fieldDefinitions: recordDefinition.fieldDefinitions.filter((definition) => fieldIds.includes(String(definition.id))) }) : null;
        }));
        const namedFilterOptionsMap$ = gridColumns$.pipe(map((columns) => this.rxRecordGridFilterSelectHelperService.getNamedFilterOptionsFromColumns(columns)));
        combineLatest([recordDefinitionFiltered$, mode$])
            .pipe(withLatestFrom(namedFilterOptionsMap$, gridColumns$), takeUntil(this.sandbox.destroyed$))
            .subscribe(([[recordDefinition, mode], namedFilterOptions, columns]) => {
            this.sandbox.setActionPropertyEditorConfig(this.getActionEditorConfig(recordDefinition, namedFilterOptions, mode, columns));
        });
    }
    static getInitialProperties(initialProperties) {
        return Object.assign({ targetApi: null, mode: ApplyGridFilterMode.Append, filterValue: {
                filtersJson: null,
                basicFilters: null
            } }, initialProperties);
    }
    getPropertiesByName() {
        return omit(super.getPropertiesByName(), 'filterValue');
    }
    getActionEditorConfig(recordDefinition, namedFilterOptions, mode, columns) {
        const tooltip = new Tooltip('<b>Begin</b><p>Begin a batch of filter updates.</p><br><b>Append</b><p>Applied filters are added with the AND operator; existing filters for the specified fields are removed.</p><br><b>Remove</b><p>Existing filters are removed if they match the applied filters.</p><br><b>Overwrite</b><p>All existing filters are replaced with the applied filters.</p><br><b>Merge</b><p>Existing filters with a range of values are replaced with the matching applied filters; existing filters for the other fields are combined with the matching applied filters using the OR operator; applied filters for new fields are added with the AND operator.</p><br><b>Clear</b><p>All existing filters are removed.</p><br><b>End</b><p>Apply all pending filter updates executed in a batch.</p>');
        tooltip.maxWidth = 310;
        const controls = [
            {
                name: 'targetApi',
                component: ExpressionFormControlComponent,
                options: {
                    label: 'Record grid',
                    dataDictionary$: this.expressionConfigurator.getDataDictionary(),
                    operators: this.expressionConfigurator.getOperators(),
                    isRequired: true
                }
            },
            {
                name: 'mode',
                component: RadioFormControlComponent,
                options: {
                    label: 'Mode',
                    tooltip,
                    items: [
                        { label: 'Begin', value: ApplyGridFilterMode.Begin },
                        { label: 'Append', value: ApplyGridFilterMode.Append },
                        { label: 'Remove', value: ApplyGridFilterMode.Remove },
                        { label: 'Overwrite', value: ApplyGridFilterMode.Overwrite },
                        { label: 'Merge', value: ApplyGridFilterMode.Merge },
                        { label: 'Clear', value: ApplyGridFilterMode.Clear },
                        { label: 'End', value: ApplyGridFilterMode.End }
                    ]
                }
            }
        ];
        const filterSelectControl = {
            name: 'filterValue',
            component: RecordGridFilterSelectControlComponent,
            options: {
                primaryRecordDefinition: recordDefinition,
                selectedFieldIds: columns.map((column) => column.fieldId),
                namedFilterOptions,
                anchorDisabled: !recordDefinition
            }
        };
        const emptyFilterMessageControl = {
            name: 'emptyFilterMessage',
            component: ValidationFormControlComponent,
            options: {
                text: 'Record grid expression required to define a filter.',
                messageType: MessageType.Error,
                customStyle: { 'margin-top': '-1rem' }
            }
        };
        if (!includes([ApplyGridFilterMode.Begin, ApplyGridFilterMode.End, ApplyGridFilterMode.Clear], mode)) {
            controls.push(filterSelectControl);
            if (!recordDefinition) {
                controls.push(emptyFilterMessageControl);
            }
        }
        return controls;
    }
    static extractGuidFromExpression(val) {
        var _a;
        const matches = val === null || val === void 0 ? void 0 : val.match(/^\${view\.components\.([0-9a-z-]+)\.api}$/);
        return (_a = (matches && matches[1])) !== null && _a !== void 0 ? _a : null;
    }
}

class RxApplyGridFilterViewActionDefinitionAdapterService {
    constructor(rxJsonParserService, rxRecordGridFilterHelperService) {
        this.rxJsonParserService = rxJsonParserService;
        this.rxRecordGridFilterHelperService = rxRecordGridFilterHelperService;
    }
    adaptDefinition({ componentDefinitions, propertiesByName }) {
        const recordGridFilters = componentDefinitions.map((definition) => {
            let value = definition.propertiesByName.value;
            const parsedValue = this.rxJsonParserService.tryParseJson(value);
            if (parsedValue && parsedValue[RecordGridNamedFilterOptionKey]) {
                value = parsedValue;
            }
            return {
                guid: definition.guid,
                fieldId: definition.propertiesByName.fieldId,
                value
            };
        });
        // @ts-ignore - converting type
        propertiesByName.filters = this.rxRecordGridFilterHelperService.getRecordGridFilterDataFromPredefinedFilter(propertiesByName.filters, recordGridFilters);
    }
}
RxApplyGridFilterViewActionDefinitionAdapterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApplyGridFilterViewActionDefinitionAdapterService, deps: [{ token: i1.RxJsonParserService }, { token: i2.RxRecordGridFilterHelperService }], target: i0.ɵɵFactoryTarget.Injectable });
RxApplyGridFilterViewActionDefinitionAdapterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApplyGridFilterViewActionDefinitionAdapterService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApplyGridFilterViewActionDefinitionAdapterService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxJsonParserService }, { type: i2.RxRecordGridFilterHelperService }]; } });

class ApplyGridFilterViewActionModule {
    constructor(rxViewActionRegistryService, rxApplyGridFilterViewActionService, rxApplyGridFilterViewActionDefinitionAdapterService, rxViewActionDefinitionAdapterRegistryService) {
        this.rxViewActionRegistryService = rxViewActionRegistryService;
        this.rxApplyGridFilterViewActionService = rxApplyGridFilterViewActionService;
        this.rxApplyGridFilterViewActionDefinitionAdapterService = rxApplyGridFilterViewActionDefinitionAdapterService;
        this.rxViewActionDefinitionAdapterRegistryService = rxViewActionDefinitionAdapterRegistryService;
        this.rxViewActionRegistryService.register({
            name: RxApplyGridFilterActionName,
            label: 'Apply grid filter',
            bundleId: RX_APPLICATION.platformBundleId,
            service: rxApplyGridFilterViewActionService,
            designModel: RxApplyGridFilterViewActionDesignModelClass,
            parameters: [
                {
                    name: 'targetApi',
                    label: 'Record grid',
                    isRequired: true,
                    enableExpressionEvaluation: true
                },
                {
                    name: 'mode',
                    label: 'Mode'
                },
                {
                    name: 'filters'
                }
            ]
        });
        rxViewActionDefinitionAdapterRegistryService.registerRuntimeAdapter(RxApplyGridFilterActionName, this.rxApplyGridFilterViewActionDefinitionAdapterService);
    }
}
ApplyGridFilterViewActionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApplyGridFilterViewActionModule, deps: [{ token: i1$1.RxViewActionRegistryService }, { token: RxApplyGridFilterViewActionService }, { token: RxApplyGridFilterViewActionDefinitionAdapterService }, { token: i1$1.RxViewActionDefinitionAdapterRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
ApplyGridFilterViewActionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApplyGridFilterViewActionModule });
ApplyGridFilterViewActionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApplyGridFilterViewActionModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApplyGridFilterViewActionModule, decorators: [{
            type: NgModule
        }], ctorParameters: function () { return [{ type: i1$1.RxViewActionRegistryService }, { type: RxApplyGridFilterViewActionService }, { type: RxApplyGridFilterViewActionDefinitionAdapterService }, { type: i1$1.RxViewActionDefinitionAdapterRegistryService }]; } });

const RX_OPEN_VIEW = {
    actionName: 'rxOpenViewAction',
    modalSize: OpenViewActionModalSize,
    type: OpenViewActionType,
    launchBehavior: OpenViewActionLaunchBehavior
};

class RxOpenViewActionService {
    constructor(adaptDockedPanelService, adaptModalService, router, rxRuntimeViewUtilsService, rxViewActionUtilsService) {
        this.adaptDockedPanelService = adaptDockedPanelService;
        this.adaptModalService = adaptModalService;
        this.router = router;
        this.rxRuntimeViewUtilsService = rxRuntimeViewUtilsService;
        this.rxViewActionUtilsService = rxViewActionUtilsService;
    }
    execute(params) {
        const inputParams = transform(params.viewParams, (result, value, key) => {
            result[key] = isObject(value) ? JSON.stringify(value) : String(value !== null && value !== void 0 ? value : '');
        }, {});
        return this.rxRuntimeViewUtilsService.isViewCancellable(params.viewDefinitionName).pipe(switchMap((isViewCancellable) => {
            let runtimeViewApi;
            const modalData = {
                configuration: {
                    viewDefinitionName: params.viewDefinitionName,
                    inputParams: inputParams,
                    onRegisterApi(api) {
                        runtimeViewApi = api;
                    }
                },
                title: params.presentation.title,
                notification: params.presentation.notification,
                isCancellable: isViewCancellable
            };
            const modalConfig = {
                beforeDismiss: (reason) => {
                    // determine if the view is being closed programmatically,
                    // i.e. via executing the Close View action.
                    const isCloseViewAction = !Object.values(DismissReasons).includes(reason);
                    // do not close modal/blade when user clicked on backdrop except when view is cancellable
                    if (!isCloseViewAction && (reason !== DismissReasons.BACKDROP_CLICK || isViewCancellable)) {
                        runtimeViewApi
                            .cancel()
                            .pipe(take(1), catchError((error) => (error ? throwError(error) : EMPTY)))
                            .subscribe();
                    }
                    // only allow to close view if dismiss is triggered by close view action with act as cancel
                    return isCloseViewAction;
                },
                blockKeyboard: !isViewCancellable,
                content: RuntimeViewModalComponent,
                size: params.presentation.modalSize,
                data: modalData
            };
            switch (params.presentation.type) {
                case RX_OPEN_VIEW.type.FullWidth: {
                    return this.openFullWidth(params.presentation.launchBehavior, params.viewDefinitionName, inputParams);
                }
                case RX_OPEN_VIEW.type.CenteredModal: {
                    return this.adaptModalService.open(modalConfig);
                }
                case RX_OPEN_VIEW.type.DockedLeftModal: {
                    return this.adaptDockedPanelService.open(defaults({ direction: DockedPanelDirection.LEFT }, modalConfig));
                }
                case RX_OPEN_VIEW.type.DockedRightModal: {
                    return this.adaptDockedPanelService.open(defaults({ direction: DockedPanelDirection.RIGHT }, modalConfig));
                }
                default: {
                    return this.openFullWidth(params.presentation.launchBehavior, params.viewDefinitionName, inputParams);
                }
            }
        }));
    }
    openFullWidth(launchBehavior, viewDefinitionName, inputParams) {
        const url = this.rxViewActionUtilsService.generateViewUrl(viewDefinitionName, inputParams);
        if (launchBehavior === RX_OPEN_VIEW.launchBehavior.NewWindow) {
            window.open(`${window.location.pathname}#${url}`);
            return throwError(null);
        }
        else {
            return from(this.router.navigateByUrl(url)).pipe(switchMapTo(throwError(null)));
        }
    }
}
RxOpenViewActionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxOpenViewActionService, deps: [{ token: i1$2.AdaptDockedPanelService }, { token: i1$2.AdaptModalService }, { token: i2$1.Router }, { token: i3.RxRuntimeViewUtilsService }, { token: i1$1.RxViewActionUtilsService }], target: i0.ɵɵFactoryTarget.Injectable });
RxOpenViewActionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxOpenViewActionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxOpenViewActionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1$2.AdaptDockedPanelService }, { type: i1$2.AdaptModalService }, { type: i2$1.Router }, { type: i3.RxRuntimeViewUtilsService }, { type: i1$1.RxViewActionUtilsService }]; } });

class RxAssociateViewActionService {
    constructor(rxAssociationInstanceService, rxOpenViewActionService, rxAssociationDefinitionService, rxLogService, rxViewActionUtilsService) {
        this.rxAssociationInstanceService = rxAssociationInstanceService;
        this.rxOpenViewActionService = rxOpenViewActionService;
        this.rxAssociationDefinitionService = rxAssociationDefinitionService;
        this.rxLogService = rxLogService;
        this.rxViewActionUtilsService = rxViewActionUtilsService;
    }
    execute(params) {
        if (!params.associatedRecordId) {
            return throwError(new RxError('rxAssociateAction: Associated Record ID is not defined.'));
        }
        return forkJoin([
            this.getInstanceIds(params),
            this.rxAssociationDefinitionService.get(params.associationDefinitionName)
        ]).pipe(switchMap(([instanceIds, associationDefinition]) => {
            let nodeAIds = [];
            let nodeBIds = [];
            if (instanceIds.length) {
                if (params.associationDefinitionRole === RX_ASSOCIATED_RECORD_NODE_SIDES.nodeA.value) {
                    nodeAIds = instanceIds;
                    nodeBIds = [params.associatedRecordId];
                }
                else if (params.associationDefinitionRole === RX_ASSOCIATED_RECORD_NODE_SIDES.nodeB.value) {
                    nodeAIds = [params.associatedRecordId];
                    nodeBIds = instanceIds;
                }
                if (associationDefinition.cardinality === RX_ASSOCIATION_DEFINITION.cardinality.oneToOne.value) {
                    nodeAIds = nodeAIds[0];
                    nodeBIds = nodeBIds[0];
                }
                else if (associationDefinition.cardinality === RX_ASSOCIATION_DEFINITION.cardinality.oneToMany.value) {
                    nodeAIds = nodeAIds[0];
                }
                return this.rxAssociationInstanceService
                    .associateRecords(params.associationDefinitionName, nodeAIds, nodeBIds, params.useDefaultRoles, params.nodeARole, params.nodeBRole)
                    .pipe(mapTo(instanceIds));
            }
            return of(instanceIds);
        }));
    }
    getInstanceIds(params) {
        return this.rxOpenViewActionService
            .execute({
            presentation: {
                modalSize: RX_OPEN_VIEW.modalSize.Large,
                type: RX_OPEN_VIEW.type.DockedRightModal
            },
            viewDefinitionName: params.viewDefinitionName,
            viewParams: null
        })
            .pipe(map((output) => {
            const instanceIds = flow((outs) => map$1(outs, (out) => this.rxViewActionUtilsService.extractRecordIds(out)), flatten, compact, uniq)(output);
            this.rxLogService.debug(`RxAssociateAction: associating ${instanceIds.length} record(s)`);
            return instanceIds;
        }));
    }
}
RxAssociateViewActionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociateViewActionService, deps: [{ token: i1$3.RxAssociationInstanceService }, { token: RxOpenViewActionService }, { token: i1$3.RxAssociationDefinitionService }, { token: i1$4.RxLogService }, { token: i1$1.RxViewActionUtilsService }], target: i0.ɵɵFactoryTarget.Injectable });
RxAssociateViewActionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociateViewActionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociateViewActionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1$3.RxAssociationInstanceService }, { type: RxOpenViewActionService }, { type: i1$3.RxAssociationDefinitionService }, { type: i1$4.RxLogService }, { type: i1$1.RxViewActionUtilsService }]; } });

class RxOpenViewDefinitionAdapterService {
    constructor() {
        this.modalSizeMap = {
            small: RX_OPEN_VIEW.modalSize.Small,
            medium: RX_OPEN_VIEW.modalSize.Medium,
            large: RX_OPEN_VIEW.modalSize.Large
        };
    }
    adaptDefinition(viewComponentDefinition) {
        const propertiesByName = get(viewComponentDefinition, 'propertiesByName', {});
        if (propertiesByName.name === RX_OPEN_VIEW.actionName) {
            const modalSize = propertiesByName.presentation.modalSize;
            if (this.modalSizeMap[modalSize]) {
                propertiesByName.presentation.modalSize = this.modalSizeMap[modalSize];
            }
        }
    }
}
RxOpenViewDefinitionAdapterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxOpenViewDefinitionAdapterService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxOpenViewDefinitionAdapterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxOpenViewDefinitionAdapterService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxOpenViewDefinitionAdapterService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

const RX_OPEN_VIEW_MODAL_SIZE_OPTIONS = [
    {
        id: OpenViewActionModalSize.Xsmall,
        name: 'Extra Small (450 px)'
    },
    {
        id: OpenViewActionModalSize.Small,
        name: 'Small (650 px)'
    },
    {
        id: OpenViewActionModalSize.Medium,
        name: 'Medium (800 px)'
    },
    {
        id: OpenViewActionModalSize.Large,
        name: 'Large (1024 px)'
    },
    {
        id: OpenViewActionModalSize.Xlarge,
        name: 'Extra Large (1200 px)'
    },
    {
        id: OpenViewActionModalSize.Xxlarge,
        name: 'Extra Extra Large (1600 px)'
    },
    {
        id: OpenViewActionModalSize.FullSize,
        name: 'Full Size'
    }
];
const RX_OPEN_VIEW_TYPE_OPTIONS = [
    {
        id: OpenViewActionType.FullWidth,
        name: 'Full width'
    },
    {
        id: OpenViewActionType.CenteredModal,
        name: 'Centered modal'
    },
    {
        id: OpenViewActionType.DockedLeftModal,
        name: 'Docked left modal'
    },
    {
        id: OpenViewActionType.DockedRightModal,
        name: 'Docked right modal'
    }
];
const RX_OPEN_VIEW_LAUNCH_BEHAVIOR_OPTIONS = [
    {
        id: OpenViewActionLaunchBehavior.NewWindow,
        name: 'Open in a new tab'
    },
    {
        id: OpenViewActionLaunchBehavior.SameWindow,
        name: 'Open in the same tab'
    }
];

class RxOpenViewModelHelperService {
    getOpenViewInspector(inputParams, presentationType, presentationModalSize, expressionConfigurator) {
        const viewInputControls = inputParams.map((param) => ({
            name: `viewParams.${param.name}`,
            component: ExpressionFormControlComponent,
            options: {
                label: param.name,
                dataDictionary$: expressionConfigurator.getDataDictionary(param.name),
                operators: expressionConfigurator.getOperators(param.name)
            }
        }));
        const isFullWidthType = presentationType === OpenViewActionType.FullWidth;
        const isCenteredModalWithFullSize = presentationType === OpenViewActionType.CenteredModal &&
            presentationModalSize === OpenViewActionModalSize.FullSize;
        return [
            {
                name: 'viewDefinitionName',
                component: RxDefinitionPickerComponent,
                options: {
                    label: 'View',
                    required: true,
                    definitionType: RxDefinitionPickerType.View
                }
            },
            ...viewInputControls,
            {
                name: 'presentation.type',
                component: SelectFormControlComponent,
                options: {
                    label: 'Presentation',
                    tooltip: new Tooltip('Select how to display the view in the application.'),
                    options: RX_OPEN_VIEW_TYPE_OPTIONS,
                    sortAlphabetically: false
                }
            },
            ...(isFullWidthType
                ? [
                    {
                        name: 'presentation.launchBehavior',
                        component: SelectFormControlComponent,
                        options: {
                            label: 'Launch behavior',
                            options: RX_OPEN_VIEW_LAUNCH_BEHAVIOR_OPTIONS,
                            sortAlphabetically: true
                        }
                    }
                ]
                : [
                    {
                        name: 'presentation.modalSize',
                        component: SelectFormControlComponent,
                        options: {
                            label: 'Size',
                            options: presentationType === OpenViewActionType.CenteredModal
                                ? RX_OPEN_VIEW_MODAL_SIZE_OPTIONS
                                : RX_OPEN_VIEW_MODAL_SIZE_OPTIONS.filter((option) => option.id !== OpenViewActionModalSize.FullSize),
                            sortAlphabetically: false
                        }
                    },
                    ...(isCenteredModalWithFullSize
                        ? []
                        : [
                            {
                                name: 'presentation.title',
                                component: TextFormControlComponent,
                                options: {
                                    label: 'Title'
                                }
                            }
                        ])
                ])
        ];
    }
}
RxOpenViewModelHelperService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxOpenViewModelHelperService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxOpenViewModelHelperService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxOpenViewModelHelperService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxOpenViewModelHelperService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class RxOpenViewActionDesignModel extends RxViewDesignerActionModel {
    constructor(injector, sandbox) {
        super(injector, sandbox);
        this.sandbox = sandbox;
        this.rxViewDefinitionCacheService = this.injector.get(RxViewDefinitionCacheService);
        this.rxOpenViewModelHelperService = this.injector.get(RxOpenViewModelHelperService);
        const viewDefinitionName$ = this.sandbox.actionProperties$.pipe(pluck('viewDefinitionName'), distinctUntilChanged());
        const presentationType$ = this.sandbox.actionProperties$.pipe(pluck('presentation.type'), distinctUntilChanged());
        const presentationModalSize$ = this.sandbox.actionProperties$.pipe(pluck('presentation.modalSize'), distinctUntilChanged());
        combineLatest([viewDefinitionName$, presentationType$, presentationModalSize$])
            .pipe(switchMap(([viewDefinitionName, presentationType, presentationModalSize]) => this.getActionEditorConfig(viewDefinitionName, presentationType, presentationModalSize)))
            .subscribe((config) => this.sandbox.setActionPropertyEditorConfig(config));
        viewDefinitionName$
            .pipe(switchMap((viewDefinitionName) => this.getViewOutputParams(viewDefinitionName)))
            .subscribe((outputParams) => {
            this.sandbox.setActionOutputDataDictionary(outputParams.map(({ name }) => ({
                label: name,
                expression: this.getOutputExpressionForPropertyPath(name)
            })));
        });
        presentationType$.pipe(skip(1)).subscribe((presentationType) => {
            let props = this.sandbox.getActionProperties();
            if (presentationType === OpenViewActionType.FullWidth) {
                props['presentation.launchBehavior'] = OpenViewActionLaunchBehavior.SameWindow;
                props = omit(props, ['presentation.modalSize', 'presentation.title']);
            }
            else {
                props = omit(props, ['presentation.launchBehavior']);
                if (!props['presentation.modalSize'] ||
                    this.sandbox.getActionPropertyValue('presentation.modalSize') === OpenViewActionModalSize.FullSize) {
                    props['presentation.modalSize'] = OpenViewActionModalSize.Medium;
                }
            }
            this.sandbox.setActionProperties(props);
        });
        presentationModalSize$.pipe(skip(1)).subscribe((presentationModalSize) => {
            if (presentationModalSize === OpenViewActionModalSize.FullSize) {
                this.sandbox.setActionProperties(omit(this.sandbox.getActionProperties(), ['presentation.title']));
            }
        });
    }
    static getInitialProperties(initialProperties) {
        return Object.assign({ viewDefinitionName: null, 'presentation.type': OpenViewActionType.FullWidth, 'presentation.launchBehavior': OpenViewActionLaunchBehavior.SameWindow }, initialProperties);
    }
    getActionEditorConfig(viewDefinitionName, presentationType, presentationModalSize) {
        return this.getViewInputParams(viewDefinitionName).pipe(map((inputParams) => this.rxOpenViewModelHelperService.getOpenViewInspector(inputParams, presentationType, presentationModalSize, this.expressionConfigurator)));
    }
    getViewInputParams(viewDefinitionName) {
        return viewDefinitionName
            ? this.rxViewDefinitionCacheService.getViewDefinition(viewDefinitionName).pipe(pluck('inputParams'))
            : of([]);
    }
    getViewOutputParams(viewDefinitionName) {
        return viewDefinitionName
            ? this.rxViewDefinitionCacheService.getViewDefinition(viewDefinitionName).pipe(pluck('outputParams'))
            : of([]);
    }
}

class OpenViewActionModule {
    constructor(rxViewActionDefinitionAdapterRegistryService, openViewDefinitionAdapterService, rxViewActionRegistryService, rxOpenViewActionService) {
        this.rxViewActionDefinitionAdapterRegistryService = rxViewActionDefinitionAdapterRegistryService;
        this.openViewDefinitionAdapterService = openViewDefinitionAdapterService;
        this.rxViewActionRegistryService = rxViewActionRegistryService;
        this.rxOpenViewActionService = rxOpenViewActionService;
        this.rxViewActionRegistryService.register({
            name: RX_OPEN_VIEW.actionName,
            label: 'Open view',
            bundleId: RX_APPLICATION.platformBundleId,
            service: this.rxOpenViewActionService,
            designModel: RxOpenViewActionDesignModel,
            parameters: [
                {
                    name: 'viewDefinitionName',
                    label: 'View',
                    isRequired: true
                },
                {
                    name: 'viewParams',
                    enableExpressionEvaluation: true
                },
                {
                    name: 'presentation',
                    attributes: [
                        {
                            name: 'title',
                            localizable: true
                        }
                    ]
                }
            ]
        });
        rxViewActionDefinitionAdapterRegistryService.registerRuntimeAdapter(RX_OPEN_VIEW.actionName, this.openViewDefinitionAdapterService);
    }
}
OpenViewActionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OpenViewActionModule, deps: [{ token: i1$1.RxViewActionDefinitionAdapterRegistryService }, { token: RxOpenViewDefinitionAdapterService }, { token: i1$1.RxViewActionRegistryService }, { token: RxOpenViewActionService }], target: i0.ɵɵFactoryTarget.NgModule });
OpenViewActionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OpenViewActionModule, imports: [CommonModule, RuntimeViewModule, AdaptDockedPanelModule] });
OpenViewActionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OpenViewActionModule, imports: [[CommonModule, RuntimeViewModule, AdaptDockedPanelModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OpenViewActionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RuntimeViewModule, AdaptDockedPanelModule]
                }]
        }], ctorParameters: function () { return [{ type: i1$1.RxViewActionDefinitionAdapterRegistryService }, { type: RxOpenViewDefinitionAdapterService }, { type: i1$1.RxViewActionRegistryService }, { type: RxOpenViewActionService }]; } });

class RxAssociateViewActionDesignModel extends RxViewDesignerActionModel {
    constructor(injector, sandbox) {
        super(injector, sandbox);
        this.injector = injector;
        this.sandbox = sandbox;
        this.rxRecordDefinitionCacheService = this.injector.get(RxRecordDefinitionCacheService);
        this.rxDefinitionNameService = this.injector.get(RxDefinitionNameService);
        this.rxAssociationDefinitionService = this.injector.get(RxAssociationDefinitionService);
        const recordDefinitionName$ = this.sandbox.actionProperties$.pipe(pluck('recordDefinitionName'), distinctUntilChanged());
        const associationDefinitionName$ = this.sandbox.actionProperties$.pipe(pluck('associationDefinitionName'), distinctUntilChanged());
        const associationNameOptions$ = recordDefinitionName$.pipe(switchMap((recordDefinitionName) => recordDefinitionName
            ? this.rxRecordDefinitionCacheService.getRecordAssociationDefinitions(recordDefinitionName).pipe(map((associationDefinitions) => associationDefinitions[recordDefinitionName].map((recordDefinition) => ({
                id: recordDefinition.name,
                name: this.rxDefinitionNameService.getDisplayName(recordDefinition.name)
            }))))
            : of([])));
        const associationDefinition$ = associationDefinitionName$.pipe(switchMap((associationDefinitionName) => associationDefinitionName ? this.rxAssociationDefinitionService.get(associationDefinitionName) : of(null)), shareReplay(1));
        const isSymmetricalAssociation$ = associationDefinition$.pipe(map((association) => (association ? association.nodeAId === association.nodeBId : false)));
        const isManyToManyAssociation$ = associationDefinition$.pipe(map((association) => association ? association.cardinality === RX_ASSOCIATION_DEFINITION.cardinality.manyToMany.value : false));
        const useDefaultRoles$ = this.sandbox.actionProperties$.pipe(pluck('useDefaultRoles'), map(Boolean), distinctUntilChanged());
        useDefaultRoles$.pipe(distinctUntilChanged(), skip(1)).subscribe((useDefaultRoles) => {
            if (useDefaultRoles) {
                this.sandbox.setActionProperties(omit(this.sandbox.getActionProperties(), ['nodeARole', 'nodeBRole']));
            }
        });
        const associationRoleOptions$ = associationDefinition$.pipe(map((association) => association
            ? [
                {
                    id: RxAssociatedRecordNodeSide.NodeA,
                    name: association.nodeAName || RX_ASSOCIATED_RECORD_NODE_SIDES.nodeA.defaultName
                },
                {
                    id: RxAssociatedRecordNodeSide.NodeB,
                    name: association.nodeBName || RX_ASSOCIATED_RECORD_NODE_SIDES.nodeB.defaultName
                }
            ]
            : []));
        // skip initial props set
        recordDefinitionName$.pipe(skip(1)).subscribe(() => {
            this.sandbox.updateActionProperties({
                associationDefinitionName: null,
                associationDefinitionRole: null
            });
        });
        associationDefinition$
            .pipe(
        // skip initial props set
        skip(1), withLatestFrom(isSymmetricalAssociation$, recordDefinitionName$))
            .subscribe(([associationDefinition, isSymmetricalAssociation, recordDefinitionName]) => {
            if (associationDefinition && !isSymmetricalAssociation) {
                const associationDefinitionRole = recordDefinitionName === associationDefinition.nodeAId
                    ? RxAssociatedRecordNodeSide.NodeA
                    : RxAssociatedRecordNodeSide.NodeB;
                this.sandbox.updateActionProperties({
                    associationDefinitionRole
                });
            }
            else {
                this.sandbox.updateActionProperties({
                    associationDefinitionRole: null
                });
            }
        });
        combineLatest([recordDefinitionName$, associationNameOptions$, associationRoleOptions$, useDefaultRoles$])
            .pipe(withLatestFrom(isSymmetricalAssociation$, isManyToManyAssociation$))
            .subscribe(([[recordDefinitionName, associationNameOptions, associationRoleOptions, useDefaultRoles], isSymmetricalAssociation, isManyToManyAssociation]) => {
            this.sandbox.setActionPropertyEditorConfig(this.getActionEditorConfig(recordDefinitionName, associationNameOptions, associationRoleOptions, isSymmetricalAssociation, isManyToManyAssociation, useDefaultRoles));
        });
    }
    static getInitialProperties(initialProperties) {
        return Object.assign({ recordDefinitionName: null, associationDefinitionName: null, associationDefinitionRole: null, associatedRecordId: null, viewDefinitionName: null }, initialProperties);
    }
    getActionEditorConfig(recordDefinitionName, associationNameOptions, associationRoleOptions, isSymmetricalAssociation, isManyToManyAssociation, useDefaultRoles) {
        return [
            {
                name: 'recordDefinitionName',
                component: RxDefinitionPickerComponent,
                options: {
                    label: 'Record definition to associate',
                    definitionType: RxDefinitionPickerType.StandardDataRecord,
                    required: true
                }
            },
            ...(recordDefinitionName
                ? [
                    {
                        name: 'associationDefinitionName',
                        component: SelectFormControlComponent,
                        options: {
                            label: 'Association to use',
                            options: associationNameOptions,
                            required: true
                        }
                    },
                    {
                        name: 'associationDefinitionRole',
                        component: SelectFormControlComponent,
                        isDisabled: !isSymmetricalAssociation,
                        options: {
                            label: 'Associated record node side',
                            required: true,
                            options: associationRoleOptions
                        }
                    },
                    {
                        name: 'associatedRecordId',
                        component: ExpressionFormControlComponent,
                        options: {
                            label: 'Associated record ID',
                            dataDictionary$: this.expressionConfigurator.getDataDictionary(),
                            operators: this.expressionConfigurator.getOperators(),
                            isRequired: true
                        }
                    },
                    {
                        name: 'viewDefinitionName',
                        component: RxDefinitionPickerComponent,
                        options: {
                            label: 'View for selecting or creating associated records',
                            required: true,
                            definitionType: RxDefinitionPickerType.View
                        }
                    },
                    ...(isManyToManyAssociation
                        ? [
                            {
                                name: 'useDefaultRoles',
                                component: SwitchFormControlComponent,
                                options: {
                                    label: 'Use default roles'
                                }
                            },
                            ...(isManyToManyAssociation && useDefaultRoles
                                ? []
                                : [
                                    {
                                        name: 'nodeARole',
                                        component: ExpressionFormControlComponent,
                                        options: {
                                            label: 'First record role',
                                            dataDictionary$: this.expressionConfigurator.getDataDictionary(),
                                            operators: this.expressionConfigurator.getOperators()
                                        }
                                    },
                                    {
                                        name: 'nodeBRole',
                                        component: ExpressionFormControlComponent,
                                        options: {
                                            label: 'Second record role',
                                            dataDictionary$: this.expressionConfigurator.getDataDictionary(),
                                            operators: this.expressionConfigurator.getOperators()
                                        }
                                    }
                                ])
                        ]
                        : [])
                ]
                : [])
        ];
    }
}

class AssociateViewActionModule {
    constructor(rxViewActionRegistryService, rxAssociateViewActionService) {
        this.rxViewActionRegistryService = rxViewActionRegistryService;
        this.rxAssociateViewActionService = rxAssociateViewActionService;
        this.rxViewActionRegistryService.register({
            name: 'rxAssociateAction',
            label: 'Associate records',
            bundleId: RX_APPLICATION.platformBundleId,
            service: this.rxAssociateViewActionService,
            designModel: RxAssociateViewActionDesignModel,
            parameters: [
                {
                    name: 'recordDefinitionName',
                    label: 'Record definition to associate',
                    isRequired: true,
                    type: ViewComponentPropertyType.String
                },
                {
                    name: 'associationDefinitionName',
                    label: 'Association to use',
                    isRequired: true
                },
                {
                    name: 'associationDefinitionRole',
                    label: 'Associated record node side',
                    isRequired: true
                },
                {
                    name: 'associatedRecordId',
                    label: 'Associated record ID',
                    enableExpressionEvaluation: true,
                    isRequired: true
                },
                {
                    name: 'viewDefinitionName',
                    label: 'View for selecting or creating associated records',
                    isRequired: true,
                    type: ViewComponentPropertyType.String
                },
                {
                    name: 'useDefaultRoles'
                },
                {
                    name: 'nodeARole',
                    enableExpressionEvaluation: true
                },
                {
                    name: 'nodeBRole',
                    enableExpressionEvaluation: true
                }
            ]
        });
    }
}
AssociateViewActionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociateViewActionModule, deps: [{ token: i1$1.RxViewActionRegistryService }, { token: RxAssociateViewActionService }], target: i0.ɵɵFactoryTarget.NgModule });
AssociateViewActionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociateViewActionModule, imports: [OpenViewActionModule] });
AssociateViewActionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociateViewActionModule, imports: [[OpenViewActionModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociateViewActionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [OpenViewActionModule]
                }]
        }], ctorParameters: function () { return [{ type: i1$1.RxViewActionRegistryService }, { type: RxAssociateViewActionService }]; } });

class RxAvcAssociateActionService {
    constructor(rxGuidService, rxOpenViewActionService, rxStringService, rxRecordInstanceUtilsService) {
        this.rxGuidService = rxGuidService;
        this.rxOpenViewActionService = rxOpenViewActionService;
        this.rxStringService = rxStringService;
        this.rxRecordInstanceUtilsService = rxRecordInstanceUtilsService;
    }
    execute(params) {
        return this.rxOpenViewActionService
            .execute({
            viewDefinitionName: params.viewDefinitionName,
            viewParams: null,
            presentation: {
                modalSize: OpenViewActionModalSize.Large,
                type: OpenViewActionType.DockedRightModal
            }
        })
            .pipe(tap((output) => {
            const recordInstances = flow((outputs) => map$1(outputs, (outputsItem) => this.extractRecordInstance(outputsItem)), flatten, compact, uniq)(output);
            params.associationViewComponent.associate(recordInstances);
        }), switchMapTo(EMPTY));
    }
    extractRecordInstance(source) {
        let recordInstanceFields = [];
        // for record grid
        if (isFunction(source.getSelectedRows)) {
            recordInstanceFields = map$1(source.getSelectedRows(), this.rxRecordInstanceUtilsService.convertFromDataPageRowToPlainRecordInstance);
            // for record grid row
        }
        else if (isObject(source) && this.rxStringService.isNonEmptyString(source[RowDataItemIdFieldName])) {
            recordInstanceFields.push(this.rxRecordInstanceUtilsService.convertFromDataPageRowToPlainRecordInstance(source));
            // for selected rows
        }
        else if (isArray(source) && some(source, isObject)) {
            recordInstanceFields = map$1(source, this.rxRecordInstanceUtilsService.convertFromDataPageRowToPlainRecordInstance);
            // for existing record instance
        }
        else if (isObject(source) && isObject(source.fieldInstances) && source.id) {
            recordInstanceFields.push(source);
            // for new record instance
        }
        else if (isObject(source) && isObject(source.fieldInstances) && !source.id) {
            const dummyId = this.rxGuidService.generate();
            source.id = dummyId;
            source.fieldInstances[RX_RECORD_DEFINITION.coreFieldIds.id].value = dummyId;
            source.isNewInstance = true;
            recordInstanceFields.push(source);
        }
        return recordInstanceFields;
    }
}
RxAvcAssociateActionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAvcAssociateActionService, deps: [{ token: i1.RxGuidService }, { token: RxOpenViewActionService }, { token: i1.RxStringService }, { token: i4.RxRecordInstanceUtilsService }], target: i0.ɵɵFactoryTarget.Injectable });
RxAvcAssociateActionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAvcAssociateActionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAvcAssociateActionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxGuidService }, { type: RxOpenViewActionService }, { type: i1.RxStringService }, { type: i4.RxRecordInstanceUtilsService }]; } });

class AvcAssociateActionModule {
    constructor(rxViewActionRegistryService, rxAvcAssociateActionService) {
        this.rxViewActionRegistryService = rxViewActionRegistryService;
        this.rxAvcAssociateActionService = rxAvcAssociateActionService;
        this.rxViewActionRegistryService.register({
            name: 'rxAvcAssociate',
            label: 'Avc associate',
            bundleId: RX_APPLICATION.platformBundleId,
            hidden: true,
            service: this.rxAvcAssociateActionService,
            parameters: [
                {
                    name: 'viewDefinitionName'
                },
                {
                    name: 'associationViewComponent',
                    enableExpressionEvaluation: true
                }
            ]
        });
    }
}
AvcAssociateActionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AvcAssociateActionModule, deps: [{ token: i1$1.RxViewActionRegistryService }, { token: RxAvcAssociateActionService }], target: i0.ɵɵFactoryTarget.NgModule });
AvcAssociateActionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AvcAssociateActionModule, imports: [CommonModule] });
AvcAssociateActionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AvcAssociateActionModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AvcAssociateActionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule]
                }]
        }], ctorParameters: function () { return [{ type: i1$1.RxViewActionRegistryService }, { type: RxAvcAssociateActionService }]; } });

class RxCloseViewActionService {
    execute(params) {
        return params.actAsCancel
            ? params.viewApi.cancel()
            : EMPTY.pipe(tap({
                complete() {
                    params.viewApi.close();
                }
            }));
    }
}
RxCloseViewActionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCloseViewActionService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxCloseViewActionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCloseViewActionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCloseViewActionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class CloseViewActionModule {
    constructor(rxViewActionRegistryService, rxCloseViewActionService) {
        this.rxViewActionRegistryService = rxViewActionRegistryService;
        this.rxCloseViewActionService = rxCloseViewActionService;
        this.rxViewActionRegistryService.register({
            name: 'rxCloseViewAction',
            label: 'Close view',
            bundleId: RX_APPLICATION.platformBundleId,
            service: this.rxCloseViewActionService,
            parameters: [
                {
                    name: 'viewApi',
                    enableExpressionEvaluation: true,
                    defaultValue: '${view.api}'
                },
                {
                    name: 'actAsCancel',
                    label: 'Act as cancel',
                    editor: SwitchFormControlComponent,
                    type: ViewComponentPropertyType.Boolean,
                    designType: ViewComponentPropertyType.Boolean
                }
            ]
        });
    }
}
CloseViewActionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CloseViewActionModule, deps: [{ token: i1$1.RxViewActionRegistryService }, { token: RxCloseViewActionService }], target: i0.ɵɵFactoryTarget.NgModule });
CloseViewActionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CloseViewActionModule });
CloseViewActionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CloseViewActionModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CloseViewActionModule, decorators: [{
            type: NgModule
        }], ctorParameters: function () { return [{ type: i1$1.RxViewActionRegistryService }, { type: RxCloseViewActionService }]; } });

class RxDeleteRecordsViewActionService {
    constructor(rxLogService, rxModalService, translateService, rxNotificationService, rxRecordInstanceService, rxViewActionUtilsService, rxStringService) {
        this.rxLogService = rxLogService;
        this.rxModalService = rxModalService;
        this.translateService = translateService;
        this.rxNotificationService = rxNotificationService;
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.rxViewActionUtilsService = rxViewActionUtilsService;
        this.rxStringService = rxStringService;
    }
    execute(params) {
        if (isEmpty(params.recordDefinitionName) &&
            params.records &&
            isFunction(params.records.getRecordDefinitionName)) {
            params.recordDefinitionName = params.records.getRecordDefinitionName();
        }
        if (this.rxStringService.isNonEmptyString(params.recordDefinitionName)) {
            let records = [];
            if (params.records) {
                if (isFunction(params.records.getSelectedRows)) {
                    records = castArray(params.records.getSelectedRows());
                }
                else {
                    records = castArray(params.records);
                }
            }
            const recordIds = this.rxViewActionUtilsService.extractRecordIds(records);
            if (recordIds.length) {
                const message = recordIds.length === 1
                    ? 'com.bmc.arsys.rx.client.view-actions.delete-record.confirmation-dialog.message'
                    : 'com.bmc.arsys.rx.client.view-actions.delete-records.confirmation-dialog.message';
                return from(this.rxModalService.confirm({
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                    modalStyle: RX_MODAL.modalStyles.warning,
                    message: this.translateService.instant(message, { count: recordIds.length })
                })).pipe(switchMap((res) => {
                    if (res) {
                        const deleteObservables = recordIds.map((recordId) => this.rxRecordInstanceService.delete(params.recordDefinitionName, recordId));
                        return forkJoin(deleteObservables).pipe(tap(() => {
                            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.view-actions.delete-records.records-deleted.message'));
                        }), switchMapTo(isFunction(params.records.refresh)
                            ? params.records.refresh()
                            : EMPTY));
                    }
                    else {
                        return throwError(null);
                    }
                }));
            }
            else {
                this.rxLogService.debug('rxDeleteRecordsAction: no records to delete.');
                return EMPTY;
            }
        }
        else {
            return throwError(new RxError('rxDeleteRecordsAction: Record Definition Name is not defined.'));
        }
    }
}
RxDeleteRecordsViewActionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDeleteRecordsViewActionService, deps: [{ token: i1$4.RxLogService }, { token: i2$2.RxModalService }, { token: i4$1.TranslateService }, { token: i1$4.RxNotificationService }, { token: i4.RxRecordInstanceService }, { token: i1$1.RxViewActionUtilsService }, { token: i1.RxStringService }], target: i0.ɵɵFactoryTarget.Injectable });
RxDeleteRecordsViewActionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDeleteRecordsViewActionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDeleteRecordsViewActionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1$4.RxLogService }, { type: i2$2.RxModalService }, { type: i4$1.TranslateService }, { type: i1$4.RxNotificationService }, { type: i4.RxRecordInstanceService }, { type: i1$1.RxViewActionUtilsService }, { type: i1.RxStringService }]; } });

class DeleteRecordsViewActionModule {
    constructor(rxViewActionRegistryService, rxDeleteRecordsViewActionService) {
        this.rxViewActionRegistryService = rxViewActionRegistryService;
        this.rxDeleteRecordsViewActionService = rxDeleteRecordsViewActionService;
        this.rxViewActionRegistryService.register({
            name: 'rxDeleteRecordsAction',
            label: 'Delete records',
            bundleId: RX_APPLICATION.platformBundleId,
            service: this.rxDeleteRecordsViewActionService,
            parameters: [
                {
                    name: 'records',
                    label: 'Records',
                    enableExpressionEvaluation: true,
                    isRequired: true,
                    editor: ExpressionFormControlComponent,
                    tooltip: new Tooltip(`Build an expression that evaluates to one of the following:<br>
            1) Record grid<br>
            2) A collection of record instances or<br>
            3) A collection of record instance IDs. <br>For options 2 and 3, select a record definition in the field below.`)
                },
                {
                    name: 'recordDefinitionName',
                    label: 'Record definition',
                    type: ViewComponentPropertyType.String,
                    editor: RxDefinitionPickerComponent,
                    editorOptions: {
                        definitionType: RxDefinitionPickerType.StandardDataRecord
                    },
                    defaultValue: null
                }
            ]
        });
    }
}
DeleteRecordsViewActionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DeleteRecordsViewActionModule, deps: [{ token: i1$1.RxViewActionRegistryService }, { token: RxDeleteRecordsViewActionService }], target: i0.ɵɵFactoryTarget.NgModule });
DeleteRecordsViewActionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DeleteRecordsViewActionModule });
DeleteRecordsViewActionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DeleteRecordsViewActionModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DeleteRecordsViewActionModule, decorators: [{
            type: NgModule
        }], ctorParameters: function () { return [{ type: i1$1.RxViewActionRegistryService }, { type: RxDeleteRecordsViewActionService }]; } });

class RxDisassociateViewActionService {
    constructor(rxLogService, rxViewActionUtilsService, rxAssociationDefinitionService, rxAssociationInstanceService) {
        this.rxLogService = rxLogService;
        this.rxViewActionUtilsService = rxViewActionUtilsService;
        this.rxAssociationDefinitionService = rxAssociationDefinitionService;
        this.rxAssociationInstanceService = rxAssociationInstanceService;
    }
    execute(params) {
        if (!params.associatedRecordId) {
            return throwError(new RxError('rxDisassociateAction: Associated Record ID is not defined.'));
        }
        const instanceIds = this.rxViewActionUtilsService.extractRecordIds(params.disassociatedRecordIds);
        this.rxLogService.debug(`RxDisassociateAction: disassociating ${instanceIds.length} record(s)`);
        if (instanceIds.length) {
            return this.rxAssociationDefinitionService.get(params.associationDefinitionName).pipe(switchMap(() => {
                let nodeAIds, nodeBIds = [];
                if (params.associationDefinitionRole === RX_ASSOCIATED_RECORD_NODE_SIDES.nodeA.value) {
                    nodeAIds = instanceIds;
                    nodeBIds = [params.associatedRecordId];
                }
                else if (params.associationDefinitionRole === RX_ASSOCIATED_RECORD_NODE_SIDES.nodeB.value) {
                    nodeAIds = [params.associatedRecordId];
                    nodeBIds = instanceIds;
                }
                return this.rxAssociationInstanceService
                    .disassociateRecords(params.associationDefinitionName, nodeAIds, nodeBIds)
                    .pipe(mapTo(instanceIds));
            }));
        }
        else {
            return of([]);
        }
    }
}
RxDisassociateViewActionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDisassociateViewActionService, deps: [{ token: i1$4.RxLogService }, { token: i1$1.RxViewActionUtilsService }, { token: i1$3.RxAssociationDefinitionService }, { token: i1$3.RxAssociationInstanceService }], target: i0.ɵɵFactoryTarget.Injectable });
RxDisassociateViewActionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDisassociateViewActionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDisassociateViewActionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1$4.RxLogService }, { type: i1$1.RxViewActionUtilsService }, { type: i1$3.RxAssociationDefinitionService }, { type: i1$3.RxAssociationInstanceService }]; } });

class RxDisassociateViewActionDesignModel extends RxViewDesignerActionModel {
    constructor(injector, sandbox) {
        super(injector, sandbox);
        this.injector = injector;
        this.sandbox = sandbox;
        this.rxRecordDefinitionCacheService = this.injector.get(RxRecordDefinitionCacheService);
        this.rxDefinitionNameService = this.injector.get(RxDefinitionNameService);
        this.rxAssociationDefinitionService = this.injector.get(RxAssociationDefinitionService);
        const recordDefinitionName$ = this.sandbox.actionProperties$.pipe(pluck('recordDefinitionName'), distinctUntilChanged());
        const associationDefinitionName$ = this.sandbox.actionProperties$.pipe(pluck('associationDefinitionName'), distinctUntilChanged());
        const associationNameOptions$ = recordDefinitionName$.pipe(switchMap((recordDefinitionName) => recordDefinitionName
            ? this.rxRecordDefinitionCacheService.getRecordAssociationDefinitions(recordDefinitionName).pipe(map((associationDefinitions) => associationDefinitions[recordDefinitionName].map((recordDefinition) => ({
                id: recordDefinition.name,
                name: this.rxDefinitionNameService.getDisplayName(recordDefinition.name)
            }))))
            : of([])));
        const associationDefinition$ = associationDefinitionName$.pipe(switchMap((associationDefinitionName) => associationDefinitionName ? this.rxAssociationDefinitionService.get(associationDefinitionName) : of(null)), shareReplay(1));
        const isSymmetricalAssociation$ = associationDefinition$.pipe(map((association) => (association ? association.nodeAId === association.nodeBId : false)));
        const associationRoleOptions$ = associationDefinition$.pipe(map((association) => association
            ? [
                {
                    id: RxAssociatedRecordNodeSide.NodeA,
                    name: association.nodeAName || RX_ASSOCIATED_RECORD_NODE_SIDES.nodeA.defaultName
                },
                {
                    id: RxAssociatedRecordNodeSide.NodeB,
                    name: association.nodeBName || RX_ASSOCIATED_RECORD_NODE_SIDES.nodeB.defaultName
                }
            ]
            : []));
        // skip initial props set
        recordDefinitionName$.pipe(skip(1)).subscribe(() => {
            this.sandbox.updateActionProperties({
                associationDefinitionName: null,
                associationDefinitionRole: null
            });
        });
        associationDefinition$
            .pipe(
        // skip initial props set
        skip(1), withLatestFrom(isSymmetricalAssociation$, recordDefinitionName$))
            .subscribe(([associationDefinition, isSymmetricalAssociation, recordDefinitionName]) => {
            if (associationDefinition && !isSymmetricalAssociation) {
                const associationDefinitionRole = recordDefinitionName === associationDefinition.nodeAId
                    ? RxAssociatedRecordNodeSide.NodeA
                    : RxAssociatedRecordNodeSide.NodeB;
                this.sandbox.updateActionProperties({
                    associationDefinitionRole
                });
            }
            else {
                this.sandbox.updateActionProperties({
                    associationDefinitionRole: null
                });
            }
        });
        combineLatest([recordDefinitionName$, associationNameOptions$, associationRoleOptions$])
            .pipe(withLatestFrom(isSymmetricalAssociation$))
            .subscribe(([[recordDefinitionName, associationNameOptions, associationRoleOptions], isSymmetricalAssociation]) => {
            this.sandbox.setActionPropertyEditorConfig(this.getActionEditorConfig(recordDefinitionName, associationNameOptions, associationRoleOptions, isSymmetricalAssociation));
        });
    }
    static getInitialProperties(initialProperties) {
        return Object.assign({ recordDefinitionName: null, associationDefinitionName: null, associationDefinitionRole: null, associatedRecordId: null, disassociatedRecordIds: null }, initialProperties);
    }
    getActionEditorConfig(recordDefinitionName, associationNameOptions, associationRoleOptions, isSymmetricalAssociation) {
        return [
            {
                name: 'recordDefinitionName',
                component: RxDefinitionPickerComponent,
                options: {
                    label: 'Record definition to disassociate',
                    definitionType: RxDefinitionPickerType.StandardDataRecord,
                    required: true
                }
            },
            ...(recordDefinitionName
                ? [
                    {
                        name: 'associationDefinitionName',
                        component: SelectFormControlComponent,
                        options: {
                            label: 'Association to use',
                            options: associationNameOptions,
                            required: true
                        }
                    },
                    {
                        name: 'associationDefinitionRole',
                        component: SelectFormControlComponent,
                        isDisabled: !isSymmetricalAssociation,
                        options: {
                            label: 'Associated record node side',
                            required: true,
                            options: associationRoleOptions
                        }
                    },
                    {
                        name: 'associatedRecordId',
                        component: ExpressionFormControlComponent,
                        options: {
                            label: 'Associated record ID',
                            dataDictionary$: this.expressionConfigurator.getDataDictionary(),
                            operators: this.expressionConfigurator.getOperators(),
                            isRequired: true
                        }
                    },
                    {
                        name: 'disassociatedRecordIds',
                        component: ExpressionFormControlComponent,
                        options: {
                            label: 'Records to disassociate',
                            dataDictionary$: this.expressionConfigurator.getDataDictionary(),
                            operators: this.expressionConfigurator.getOperators(),
                            isRequired: true
                        }
                    }
                ]
                : [])
        ];
    }
}

class DisassociateViewActionModule {
    constructor(rxViewActionRegistryService, rxDisassociateViewActionService) {
        this.rxViewActionRegistryService = rxViewActionRegistryService;
        this.rxDisassociateViewActionService = rxDisassociateViewActionService;
        this.rxViewActionRegistryService.register({
            name: 'rxDisassociateAction',
            label: 'Disassociate records',
            bundleId: RX_APPLICATION.platformBundleId,
            service: this.rxDisassociateViewActionService,
            designModel: RxDisassociateViewActionDesignModel,
            parameters: [
                {
                    name: 'recordDefinitionName',
                    label: 'Record definition to disassociate',
                    isRequired: true,
                    type: ViewComponentPropertyType.String
                },
                {
                    name: 'associationDefinitionName',
                    label: 'Association to use',
                    isRequired: true
                },
                {
                    name: 'associationDefinitionRole',
                    label: 'Associated record node side',
                    isRequired: true
                },
                {
                    name: 'associatedRecordId',
                    label: 'Associated record ID',
                    enableExpressionEvaluation: true,
                    isRequired: true
                },
                {
                    name: 'disassociatedRecordIds',
                    label: 'Records to disassociate',
                    enableExpressionEvaluation: true,
                    isRequired: true
                }
            ]
        });
    }
}
DisassociateViewActionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DisassociateViewActionModule, deps: [{ token: i1$1.RxViewActionRegistryService }, { token: RxDisassociateViewActionService }], target: i0.ɵɵFactoryTarget.NgModule });
DisassociateViewActionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DisassociateViewActionModule });
DisassociateViewActionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DisassociateViewActionModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DisassociateViewActionModule, decorators: [{
            type: NgModule
        }], ctorParameters: function () { return [{ type: i1$1.RxViewActionRegistryService }, { type: RxDisassociateViewActionService }]; } });

class ResultModalComponent {
    constructor(activeModelRef) {
        this.activeModelRef = activeModelRef;
        this.data = this.activeModelRef.getData();
    }
    close() {
        this.activeModelRef.close();
    }
    hasActionResultDetails(data) {
        return ['warningCount', 'errorCount', 'infoCount', 'successCount'].some((prop) => data.summary[prop]);
    }
}
ResultModalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ResultModalComponent, deps: [{ token: i1$2.ActiveModalRef }], target: i0.ɵɵFactoryTarget.Component });
ResultModalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ResultModalComponent, selector: "rx-edit-records-result-modal", ngImport: i0, template: "<div class=\"modal-body\">\n  <div class=\"mb-2\">\n    <adapt-icon [name]=\"'check_circle'\" class=\"mr-1 text-success-icon\"></adapt-icon>\n    {{'com.bmc.arsys.rx.client.view-actions.edit-records.action-results-dialog.updated-successfully.label' |\n    translate}}: {{data.summary.successCount}}\n  </div>\n\n  <div class=\"mb-2\">\n    <adapt-icon [name]=\"'exclamation_circle'\" class=\"mr-1 text-warning-icon\"></adapt-icon>\n    {{'com.bmc.arsys.rx.client.view-actions.edit-records.action-results-dialog.updated-with-warnings.label' | translate\n    }}: {{data.summary.warningCount}}\n  </div>\n\n  <div>\n    <adapt-icon [name]=\"'exclamation_triangle'\" class=\"mr-1 text-danger-icon\"></adapt-icon>\n    {{'com.bmc.arsys.rx.client.view-actions.edit-records.action-results-dialog.update-failures.label' | translate }}:\n    {{data.summary.errorCount}}\n  </div>\n\n  <div class=\"mt-2\" *ngIf=\"hasActionResultDetails(data) && data.details\">\n    <adapt-rx-textarea\n      class=\"resize-none\"\n      label=\"{{'com.bmc.arsys.rx.client.common.messages.label' | translate }}\"\n      readonly\n      rows=\"15\"\n      [ngModel]=\"data.details\"\n    >\n    </adapt-rx-textarea>\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <button class=\"btn btn-secondary btn-sm\" (click)=\"close()\" type=\"button\">\n    {{'com.bmc.arsys.rx.client.common.close.label' | translate}}\n  </button>\n</div>\n", styles: [":host ::ng-deep .resize-none{resize:none}\n"], components: [{ type: i1$2.AdaptIconComponent, selector: "adapt-icon", inputs: ["name", "classList", "description", "testID"] }, { type: i1$2.AdaptRxTextareaComponent, selector: "adapt-rx-textarea", inputs: ["rows", "maxRows", "autocomplete", "placeholder", "size", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }], directives: [{ type: i2$3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3$1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i4$1.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ResultModalComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-edit-records-result-modal',
                    styleUrls: ['./result-modal.scss'],
                    templateUrl: './result-modal.html'
                }]
        }], ctorParameters: function () { return [{ type: i1$2.ActiveModalRef }]; } });

class RxEditRecordsDataService {
    constructor(adaptModalService, translateService, rxCommandFactoryService) {
        this.adaptModalService = adaptModalService;
        this.translateService = translateService;
        this.rxCommandFactoryService = rxCommandFactoryService;
        this.resourceType = 'com.bmc.arsys.rx.application.record.command.UpdateRecordInstancesCommand';
        this.editRecordsCommand = this.rxCommandFactoryService.forResourceType(this.resourceType);
    }
    editRecords(preparedRecordData) {
        return this.editRecordsCommand.execute(preparedRecordData);
    }
    showActionResults(actionResults) {
        return this.adaptModalService
            .open({
            size: 'sm',
            title: this.translateService.instant('com.bmc.arsys.rx.client.view-actions.edit-records.action-results-dialog.title'),
            data: actionResults,
            content: ResultModalComponent
        })
            .catch(noop);
    }
    runAction(recordInstanceIds, recordInstance) {
        const preparedRecordData = this.prepareRecordData(recordInstanceIds, recordInstance);
        const formData = new FormData();
        formData.append('commandInstance', JSON.stringify(preparedRecordData.commandInstance));
        forEach(preparedRecordData.attachments, (attachment) => {
            formData.append(attachment.key, attachment.file);
        });
        Object.keys(preparedRecordData || {}).map((item) => {
            if (item !== 'commandInstance' && item !== 'attachments') {
                formData.append(item, JSON.stringify(preparedRecordData[item]));
            }
        });
        return this.editRecords(formData).pipe(map((response) => this.prepareActionResults(response, preparedRecordData)), switchMap((actionResults) => {
            return from(Promise.resolve(this.showActionResults(actionResults)));
        }));
    }
    cleanUnchangedFields(recordInstance) {
        return forIn(recordInstance.fieldInstances, (field, key) => {
            if (isNull(field.value)) {
                delete recordInstance.fieldInstances[key];
            }
        });
    }
    prepareFiles(fields, keyPrefix) {
        return values(fields)
            .filter((field) => has(field, 'file'))
            .map((attachment) => ({
            key: keyPrefix ? keyPrefix + '/' + attachment.id : attachment.id,
            file: attachment.file
        }));
    }
    cleanFiles(fields) {
        Object.keys(fields).map((key, index) => {
            fields[key].hasOwnProperty('file') ? delete fields[key] : delete fields[key].file;
        });
        return fields;
    }
    prepareAssociationInstancesForSaving(associationInstances) {
        return transform(associationInstances, (result, associationInstance, associationDefinitionName) => {
            forEach(associationInstance, (associationGroups, role) => {
                if (!isEmpty(associationGroups.pending)) {
                    result.push({
                        associationDefinitionName: associationDefinitionName,
                        recordInstanceIds: map$1(associationGroups.pending, 'id'),
                        nodeSide: role,
                        resourceType: RX_RECORD_INSTANCE.association.operationResourceTypes.associate
                    });
                }
            });
        }, []);
    }
    prepareRecordData(recordInstanceIds, recordInstance) {
        const record = pick(recordInstance, ['resourceType', 'recordDefinitionName', 'fieldInstances']);
        const resourceType = 'com.bmc.arsys.rx.application.record.command.UpdateRecordInstancesCommand';
        record.fieldInstances = this.cleanUnchangedFields(record);
        const attachments = this.prepareFiles(record.fieldInstances);
        record.fieldInstances = this.cleanFiles(record.fieldInstances);
        const associationInstances = this.prepareAssociationInstancesForSaving(recordInstance.associationInstances);
        const data = {
            shouldOverrideOptimisticLock: false,
            commandInstance: { resourceType },
            recordInstanceIds: recordInstanceIds,
            recordInstance: record,
            attachments: attachments
        };
        if (!isEmpty(associationInstances)) {
            data.associationOperations = associationInstances.map((associationInstance) => (Object.assign(Object.assign({}, associationInstance), { nodeSide: associationInstance.nodeSide.split(':')[0] })));
        }
        return data;
    }
    prepareActionResults(response, requestData) {
        const newLine = '\n';
        const updatedInstanceIdsCount = requestData.recordInstanceIds.length;
        const detailsMessageLabel = this.translateService.instant('com.bmc.arsys.rx.client.view-actions.edit-records.action-results-dialog.details.record-instance-id.label');
        const summary = {
            successCount: 0,
            errorCount: 0,
            warningCount: 0,
            infoCount: 0
        };
        let details;
        if (!isEmpty(response)) {
            summary.errorCount = filter$1(response, (messages) => some(messages, ['messageType', RX_ERROR_HANDLING.messageTypes.error])).length;
            summary.warningCount = filter$1(response, (messages) => some(messages, ['messageType', RX_ERROR_HANDLING.messageTypes.warning])).length;
            summary.infoCount = filter$1(response, (messages) => some(messages, ['messageType', RX_ERROR_HANDLING.messageTypes.info])).length;
            summary.successCount = filter$1(response, (messages) => some(messages, ['messageType', RX_ERROR_HANDLING.messageTypes.success])).length;
            details = map$1(response, (messages, recordInstanceId) => {
                const recordInstanceIdMessageHeader = detailsMessageLabel + ': ' + recordInstanceId;
                const messageText = values(messages).map(this.convertMessageToString).join(', ');
                return recordInstanceIdMessageHeader + newLine + messageText;
            }).join(newLine + newLine);
        }
        else {
            details = '';
        }
        summary.successCount = updatedInstanceIdsCount - summary.errorCount - summary.warningCount;
        return { summary, details };
    }
    convertMessageToString(message) {
        return `${message.messageType}: ${values([message.messageText, message.appendedText]).join(' ')}`;
    }
}
RxEditRecordsDataService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEditRecordsDataService, deps: [{ token: i1$2.AdaptModalService }, { token: i4$1.TranslateService }, { token: i1$4.RxCommandFactoryService }], target: i0.ɵɵFactoryTarget.Injectable });
RxEditRecordsDataService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEditRecordsDataService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEditRecordsDataService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1$2.AdaptModalService }, { type: i4$1.TranslateService }, { type: i1$4.RxCommandFactoryService }]; } });

class RxEditRecordsViewBuilder {
    constructor(rxGuidService, rxDefaultRecordEditorInputType, rxFieldDefinitionService, translateService, rxSystemConfigurationService) {
        this.rxGuidService = rxGuidService;
        this.rxDefaultRecordEditorInputType = rxDefaultRecordEditorInputType;
        this.rxFieldDefinitionService = rxFieldDefinitionService;
        this.translateService = translateService;
        this.rxSystemConfigurationService = rxSystemConfigurationService;
    }
    getViewDefinition(recordDefinitionName, columnDescriptors) {
        const closeButtonId = this.rxGuidService.generate(), containerId = this.rxGuidService.generate(), recordEditorId = this.rxGuidService.generate(), recordInstanceId = null, saveButtonId = this.rxGuidService.generate(), viewDefinitionId = this.rxGuidService.generate(), recordEditorComponentDefinitions = this.getComponentDefinitions(columnDescriptors, recordEditorId);
        return {
            guid: viewDefinitionId,
            layout: JSON.stringify({
                outlets: [
                    {
                        name: RX_VIEW_DEFINITION.defaultOutletName,
                        columns: [
                            {
                                children: [recordEditorId]
                            }
                        ]
                    },
                    {
                        name: 'footer',
                        height: 60,
                        columns: [
                            {
                                children: [containerId]
                            }
                        ]
                    }
                ]
            }),
            outputParams: [
                {
                    name: 'recordInstance',
                    source: '${view.components.' + recordEditorId + '.recordInstance}'
                }
            ],
            inputParams: [],
            componentDefinitions: [
                {
                    resourceType: RX_VIEW_DEFINITION.resourceTypes.containerViewComponent,
                    guid: recordEditorId,
                    type: RxViewComponentType.RecordEditor,
                    propertiesByName: {
                        recordInstanceId: `${recordInstanceId}`,
                        mode: RecordEditorMode.BulkEdit,
                        recordDefinitionName: recordDefinitionName,
                        styles: 'p-0 border-0'
                    },
                    componentDefinitions: recordEditorComponentDefinitions,
                    layout: JSON.stringify({
                        outlets: [
                            {
                                name: RX_VIEW_DEFINITION.defaultOutletName,
                                columns: [
                                    {
                                        children: recordEditorComponentDefinitions.map((componentDefinition) => componentDefinition.guid)
                                    }
                                ]
                            }
                        ]
                    })
                },
                {
                    resourceType: RX_VIEW_DEFINITION.resourceTypes.containerViewComponent,
                    guid: containerId,
                    type: RxViewComponentType.ButtonBar,
                    propertiesByName: {
                        alignment: 'right',
                        hidden: '0'
                    },
                    layout: JSON.stringify({
                        outlets: [
                            {
                                name: RX_VIEW_DEFINITION.defaultOutletName,
                                columns: [
                                    {
                                        children: [saveButtonId, closeButtonId]
                                    }
                                ]
                            }
                        ]
                    }),
                    componentDefinitions: [
                        {
                            resourceType: RX_VIEW_DEFINITION.resourceTypes.containerViewComponent,
                            guid: closeButtonId,
                            type: RxViewComponentType.ActionButton,
                            propertiesByName: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.cancel.label'),
                                style: 'secondary',
                                size: 'default'
                            },
                            componentDefinitions: [
                                {
                                    resourceType: RX_VIEW_DEFINITION.resourceTypes.viewComponent,
                                    guid: this.rxGuidService.generate(),
                                    type: RxViewComponentType.Action,
                                    propertiesByName: {
                                        viewApi: '${view.api}',
                                        name: 'rxCloseViewAction',
                                        actAsCancel: 'true'
                                    }
                                }
                            ]
                        },
                        {
                            resourceType: RX_VIEW_DEFINITION.resourceTypes.containerViewComponent,
                            guid: saveButtonId,
                            type: RxViewComponentType.ActionButton,
                            propertiesByName: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.save.label'),
                                style: 'primary',
                                disabled: 'NOT${view.components.' + recordEditorId + '.canSave}',
                                size: 'default'
                            },
                            componentDefinitions: [
                                {
                                    resourceType: RX_VIEW_DEFINITION.resourceTypes.viewComponent,
                                    guid: this.rxGuidService.generate(),
                                    type: RxViewComponentType.Action,
                                    propertiesByName: {
                                        viewApi: '${view.api}',
                                        name: 'rxCloseViewAction',
                                        actAsCancel: 'false'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    }
    getComponentDefinitions(columnDescriptors, recordEditorId) {
        const submitterMode = this.rxSystemConfigurationService.getConfigurationSync('Submitter-Mode');
        if (submitterMode === RX_ADMINISTRATION.submitterModes.locked) {
            columnDescriptors = columnDescriptors.filter((columnDescriptor) => Number(columnDescriptor.fieldId) !== RX_RECORD_DEFINITION.coreFieldIds.createdBy);
        }
        const fieldContainerComponentDefinitions = this.getFieldContainerComponentDefinitions(columnDescriptors, recordEditorId);
        return [
            {
                resourceType: RX_VIEW_DEFINITION.resourceTypes.containerViewComponent,
                guid: this.rxGuidService.generate(),
                type: RxViewComponentType.Container,
                propertiesByName: {
                    rowWrap: ContainerRowWrap.Sm,
                    columnCount: '1'
                },
                componentDefinitions: fieldContainerComponentDefinitions,
                layout: JSON.stringify({
                    outlets: [
                        {
                            name: RX_VIEW_DEFINITION.defaultOutletName,
                            columns: [
                                {
                                    children: fieldContainerComponentDefinitions.map((componentDefinition) => componentDefinition.guid)
                                }
                            ]
                        }
                    ]
                })
            }
        ];
    }
    getFieldContainerComponentDefinitions(columnDescriptors, recordEditorId) {
        return columnDescriptors
            .filter((columnDescriptor) => !this.rxFieldDefinitionService.isSystemField(columnDescriptor.fieldDefinition))
            .map((columnDescriptor) => {
            let resourceType, componentType;
            const isAssociated = Boolean(columnDescriptor.associationDescriptor);
            if (isAssociated) {
                resourceType = RX_VIEW_DEFINITION.resourceTypes.containerViewComponent;
                componentType = RxViewComponentType.Association;
            }
            else {
                resourceType = RX_VIEW_DEFINITION.resourceTypes.viewComponent;
                componentType = this.rxDefaultRecordEditorInputType.getFieldTypeByFieldDefinition(columnDescriptor.fieldDefinition);
            }
            const componentDefinition = {
                resourceType: resourceType,
                guid: this.rxGuidService.generate(),
                type: componentType,
                propertiesByName: {
                    fieldId: columnDescriptor.fieldDefinition.id,
                    recordDefinition: '${view.components.' + recordEditorId + '.recordDefinition}',
                    recordInstance: '${view.components.' + recordEditorId + '.recordInstance}',
                    label: columnDescriptor.title,
                    fieldOption: RX_RECORD_DEFINITION.fieldOptions.optional
                }
            };
            if (isAssociated) {
                componentDefinition.componentDefinitions = [];
                assign(componentDefinition.propertiesByName, {
                    associatedRecordNodeSide: columnDescriptor.associationDescriptor.nodeSide,
                    editingMode: RxAssociationEditingMode.Dropdown,
                    associationDefinitionName: columnDescriptor.associationDescriptor.associationDefinition.name,
                    recordDefinitionName: columnDescriptor.associationDescriptor.recordDefinitionName
                });
            }
            return componentDefinition;
        })
            .reduce((fieldContainerComponentDefinitions, fieldComponentDefinition, index, fieldComponentDefinitions) => {
            if (index % 2 === 0) {
                fieldContainerComponentDefinitions.push({
                    resourceType: RX_VIEW_DEFINITION.resourceTypes.containerViewComponent,
                    guid: this.rxGuidService.generate(),
                    type: RxViewComponentType.Container,
                    propertiesByName: {
                        rowWrap: ContainerRowWrap.Sm,
                        columnCount: '2'
                    },
                    componentDefinitions: fieldComponentDefinitions.slice(index, index + 2),
                    layout: JSON.stringify({
                        outlets: [
                            {
                                name: RX_VIEW_DEFINITION.defaultOutletName,
                                columns: [
                                    {
                                        children: [fieldComponentDefinition.guid],
                                        span: '6'
                                    },
                                    {
                                        children: fieldComponentDefinitions.length > index + 1
                                            ? [fieldComponentDefinitions[index + 1].guid]
                                            : [],
                                        span: '6'
                                    }
                                ]
                            }
                        ]
                    })
                });
            }
            return fieldContainerComponentDefinitions;
        }, []);
    }
}
RxEditRecordsViewBuilder.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEditRecordsViewBuilder, deps: [{ token: i1.RxGuidService }, { token: i2.RxDefaultRecordEditorInputType }, { token: i4.RxFieldDefinitionService }, { token: i4$1.TranslateService }, { token: i1$4.RxSystemConfigurationService }], target: i0.ɵɵFactoryTarget.Injectable });
RxEditRecordsViewBuilder.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEditRecordsViewBuilder, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEditRecordsViewBuilder, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxGuidService }, { type: i2.RxDefaultRecordEditorInputType }, { type: i4.RxFieldDefinitionService }, { type: i4$1.TranslateService }, { type: i1$4.RxSystemConfigurationService }]; } });

class RxEditRecordsViewActionService {
    constructor(rxEditRecordsViewBuilder, rxEditRecordsDataService, rxLogService, rxRecordGridUtilsService, translateService, rxDefinitionNameService, openViewAction, rxViewActionUtilsService) {
        this.rxEditRecordsViewBuilder = rxEditRecordsViewBuilder;
        this.rxEditRecordsDataService = rxEditRecordsDataService;
        this.rxLogService = rxLogService;
        this.rxRecordGridUtilsService = rxRecordGridUtilsService;
        this.translateService = translateService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.openViewAction = openViewAction;
        this.rxViewActionUtilsService = rxViewActionUtilsService;
    }
    execute(params) {
        let { recordDefinitionName } = params;
        if (isNil(params.records)) {
            return throwError(new RxError('rxEditRecordsAction: no records to edit.'));
        }
        if (isEmpty(recordDefinitionName) && isFunction(params.records.getRecordDefinitionName)) {
            recordDefinitionName = params.records.getRecordDefinitionName();
        }
        if (recordDefinitionName) {
            const recordIds = this.rxViewActionUtilsService.extractRecordIds(params.records);
            if (recordIds.length) {
                return from(this.rxRecordGridUtilsService.getColumnDescriptors(recordDefinitionName, params.records)).pipe(switchMap((columnDescriptors) => {
                    const localizedViewTitle = this.translateService.instant('com.bmc.arsys.rx.client.view-actions.edit-records.view.title', { recordDefinitionName: this.rxDefinitionNameService.getDisplayName(recordDefinitionName) });
                    const localizedViewNotification = this.translateService.instant('com.bmc.arsys.rx.client.view-actions.edit-records.view.notification');
                    return this.openViewAction
                        .execute({
                        presentation: {
                            modalSize: RX_OPEN_VIEW.modalSize.Large,
                            title: localizedViewTitle,
                            notification: localizedViewNotification,
                            type: RX_OPEN_VIEW.type.DockedRightModal
                        },
                        viewDefinitionName: this.rxEditRecordsViewBuilder.getViewDefinition(recordDefinitionName, columnDescriptors),
                        viewParams: null
                    })
                        .pipe(switchMap((viewOutput) => viewOutput && viewOutput.recordInstance
                        ? this.rxEditRecordsDataService
                            .runAction(recordIds, viewOutput.recordInstance)
                            .pipe(switchMap(() => isFunction(params.records.refresh)
                            ? params.records.refresh()
                            : EMPTY))
                        : EMPTY));
                }));
            }
            else {
                this.rxLogService.debug('rxEditRecordsAction: no records to edit.');
            }
        }
        else {
            this.rxLogService.error('rxEditRecordsAction: Record Definition Name is not defined.');
        }
        return EMPTY;
    }
}
RxEditRecordsViewActionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEditRecordsViewActionService, deps: [{ token: RxEditRecordsViewBuilder }, { token: RxEditRecordsDataService }, { token: i1$4.RxLogService }, { token: i2.RxRecordGridUtilsService }, { token: i4$1.TranslateService }, { token: i1$4.RxDefinitionNameService }, { token: RxOpenViewActionService }, { token: i1$1.RxViewActionUtilsService }], target: i0.ɵɵFactoryTarget.Injectable });
RxEditRecordsViewActionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEditRecordsViewActionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEditRecordsViewActionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: RxEditRecordsViewBuilder }, { type: RxEditRecordsDataService }, { type: i1$4.RxLogService }, { type: i2.RxRecordGridUtilsService }, { type: i4$1.TranslateService }, { type: i1$4.RxDefinitionNameService }, { type: RxOpenViewActionService }, { type: i1$1.RxViewActionUtilsService }]; } });

class EditRecordsViewActionModule {
    constructor(rxViewActionRegistryService, rxEditRecordsActionService) {
        this.rxViewActionRegistryService = rxViewActionRegistryService;
        this.rxEditRecordsActionService = rxEditRecordsActionService;
        this.rxViewActionRegistryService.register({
            name: 'rxEditRecordsAction',
            label: 'Edit records',
            bundleId: RX_APPLICATION.platformBundleId,
            service: this.rxEditRecordsActionService,
            parameters: [
                {
                    name: 'records',
                    label: 'Records',
                    isRequired: true,
                    tooltip: new Tooltip(`Build an expression that evaluates to one of the following:<br>
            1) Record Grid;<br>
            2) A collection of Record Instances, or<br>
            3) A collection of Record Instance IDs. <br>For options 2 and 3, select a Record Definition in the field below.`),
                    enableExpressionEvaluation: true,
                    editor: ExpressionFormControlComponent
                },
                {
                    name: 'recordDefinitionName',
                    label: 'Record definition',
                    type: ViewComponentPropertyType.String,
                    editor: RxDefinitionPickerComponent,
                    editorOptions: {
                        definitionType: RxDefinitionPickerType.StandardDataRecord
                    },
                    defaultValue: null
                }
            ]
        });
    }
}
EditRecordsViewActionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: EditRecordsViewActionModule, deps: [{ token: i1$1.RxViewActionRegistryService }, { token: RxEditRecordsViewActionService }], target: i0.ɵɵFactoryTarget.NgModule });
EditRecordsViewActionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: EditRecordsViewActionModule, declarations: [ResultModalComponent], imports: [CommonModule, AdaptIconModule, TranslateModule, FormsModule, AdaptRxTextareaModule] });
EditRecordsViewActionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: EditRecordsViewActionModule, imports: [[CommonModule, AdaptIconModule, TranslateModule, FormsModule, AdaptRxTextareaModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: EditRecordsViewActionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, AdaptIconModule, TranslateModule, FormsModule, AdaptRxTextareaModule],
                    declarations: [ResultModalComponent],
                    entryComponents: [ResultModalComponent]
                }]
        }], ctorParameters: function () { return [{ type: i1$1.RxViewActionRegistryService }, { type: RxEditRecordsViewActionService }]; } });

class RxLaunchProcessViewActionDesignManagerService {
    constructor(rxProcessDefinitionService, rxViewActionRegistryService, rxViewExpressionValidatorService) {
        this.rxProcessDefinitionService = rxProcessDefinitionService;
        this.rxViewActionRegistryService = rxViewActionRegistryService;
        this.rxViewExpressionValidatorService = rxViewExpressionValidatorService;
    }
    validate(properties, propertyName) {
        if (properties.processDefinitionName) {
            return this.rxProcessDefinitionService.get(properties.processDefinitionName).pipe(switchMap((processDefinition) => combineLatest([
                this.validateInputParams(properties, propertyName, processDefinition.inputParams),
                this.validateInputParamExpressions(properties, propertyName, processDefinition.inputParams)
            ])), map(flatten));
        }
        else {
            return of([]);
        }
    }
    validateInputParamExpressions(actionParams, issuePropertyName, processInputParams) {
        const actionDescriptor = this.rxViewActionRegistryService.get(actionParams.name);
        const issues = processInputParams
            .filter((processInputParam) => actionParams[`actionProcessInputParams.${processInputParam.name}`])
            .map((processInputParam) => this.rxViewExpressionValidatorService
            .validate(actionParams[`actionProcessInputParams.${processInputParam.name}`], issuePropertyName, actionDescriptor.label)
            .pipe(map((issues) => issues.map((issue) => (Object.assign(Object.assign({}, issue), { description: `${actionDescriptor.label} action: ${issue.description}` }))))));
        return combineLatest(issues).pipe(defaultIfEmpty([]), map(flatten));
    }
    validateInputParams(actionParams, issuePropertyName, processInputParams) {
        const actionDescriptor = this.rxViewActionRegistryService.get(actionParams.name);
        const validationIssues = [];
        forEach(processInputParams, (processInputParam) => {
            const actionParamName = `actionProcessInputParams.${processInputParam.name}`;
            if (processInputParam.fieldOption === 'REQUIRED' && isEmpty(actionParams[actionParamName])) {
                validationIssues.push({
                    type: 'error',
                    description: `${actionDescriptor.label}: ${processInputParam.name} cannot be blank.`,
                    propertyName: issuePropertyName
                });
            }
        });
        return of(validationIssues);
    }
}
RxLaunchProcessViewActionDesignManagerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLaunchProcessViewActionDesignManagerService, deps: [{ token: i3$2.RxProcessDefinitionService }, { token: i1$1.RxViewActionRegistryService }, { token: i3$3.RxViewExpressionValidatorService }], target: i0.ɵɵFactoryTarget.Injectable });
RxLaunchProcessViewActionDesignManagerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLaunchProcessViewActionDesignManagerService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLaunchProcessViewActionDesignManagerService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i3$2.RxProcessDefinitionService }, { type: i1$1.RxViewActionRegistryService }, { type: i3$3.RxViewExpressionValidatorService }]; } });

class RxLaunchProcessViewActionDesignModel extends RxViewDesignerActionModel {
    constructor(injector, sandbox) {
        super(injector, sandbox);
        this.injector = injector;
        this.sandbox = sandbox;
        this.rxProcessDefinitionCacheService = this.injector.get(RxProcessDefinitionCacheService);
        this.rxRecordDefinitionCacheService = this.injector.get(RxRecordDefinitionCacheService);
        this.defaultProps = {
            processDefinitionName: null,
            waitForProcessCompletion: false
        };
        const processDefinitionName$ = this.sandbox.actionProperties$.pipe(pluck('processDefinitionName'), distinctUntilChanged());
        processDefinitionName$.pipe(skip(1)).subscribe((processDefinitionName) => {
            this.sandbox.setActionProperties({
                processDefinitionName,
                waitForProcessCompletion: false
            });
        });
        processDefinitionName$
            .pipe(switchMap((processDefinitionName) => processDefinitionName
            ? this.rxProcessDefinitionCacheService.getProcessDefinition(processDefinitionName)
            : of(null)))
            .subscribe((processDefinition) => this.sandbox.setActionPropertyEditorConfig(this.getActionEditorConfig(processDefinition)));
        this.sandbox.actionProperties$
            .pipe(map((props) => [props.processDefinitionName, props.waitForProcessCompletion]), distinctUntilChanged(isEqual), switchMap(([processDefinitionName, waitForProcessCompletion]) => this.getActionOutputDataDictionary(processDefinitionName, waitForProcessCompletion)))
            .subscribe((dataDictionary) => this.sandbox.setActionOutputDataDictionary(dataDictionary));
    }
    static getInitialProperties(initialProperties) {
        return Object.assign({ processDefinitionName: null, waitForProcessCompletion: false }, initialProperties);
    }
    getActionEditorConfig(processDefinition) {
        return [
            {
                name: 'processDefinitionName',
                component: RxDefinitionPickerComponent,
                options: {
                    label: 'Process to start',
                    definitionType: RxDefinitionPickerType.Process,
                    required: true
                }
            },
            {
                name: 'waitForProcessCompletion',
                component: SwitchFormControlComponent,
                isDisabled: processDefinition ? !processDefinition.synchronous : true,
                options: {
                    label: 'Wait for process completion',
                    tooltip: new Tooltip('If a process runs synchronously, it is possible to get output data from the process once the process completes. Enable Wait for completion in order to define an output map for the selected process.')
                }
            },
            ...(processDefinition
                ? map$1(processDefinition.inputParams, (param) => ({
                    name: `actionProcessInputParams.${param.name}`,
                    component: ExpressionFormControlComponent,
                    options: {
                        label: param.name,
                        dataDictionary$: this.expressionConfigurator.getDataDictionary(),
                        operators: this.expressionConfigurator.getOperators(),
                        isRequired: param.fieldOption === 'REQUIRED'
                    }
                }))
                : [])
        ];
    }
    getActionOutputDataDictionary(processDefinitionName, waitForProcessCompletion) {
        return waitForProcessCompletion
            ? this.rxProcessDefinitionCacheService.getOutputParams(processDefinitionName).pipe(switchMap((outputParams) => forkJoin(outputParams.map((param) => {
                let dataDictionary;
                if (param.fieldTypeName === RX_PROCESS_DEFINITION.processVariableTypes.record) {
                    const recordInstanceParam = param;
                    dataDictionary = this.rxRecordDefinitionCacheService
                        .getRecordDefinition(recordInstanceParam.recordDefinitionName)
                        .pipe(map((recordDefinition) => ({
                        label: recordInstanceParam.name,
                        expression: this.getOutputExpressionForPropertyPath(recordInstanceParam.name),
                        children: map$1(recordDefinition.fieldDefinitions, (fieldDefinition) => ({
                            label: fieldDefinition.name,
                            expression: this.getOutputExpressionForPropertyPath(`${recordInstanceParam.name}.${fieldDefinition.id}`)
                        }))
                    })));
                }
                else {
                    dataDictionary = of({
                        label: param.name,
                        expression: this.getOutputExpressionForPropertyPath(param.name)
                    });
                }
                return dataDictionary;
            }))))
            : of([]);
    }
}

class RxLaunchProcessViewActionService {
    constructor(rxJsonParserService, rxLogService, rxProcessDefinitionCacheService, rxRecordDefinitionCacheService, rxProcessInstanceCommandsService, rxProcessInstanceService, rxRecordInstanceService) {
        this.rxJsonParserService = rxJsonParserService;
        this.rxLogService = rxLogService;
        this.rxProcessDefinitionCacheService = rxProcessDefinitionCacheService;
        this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
        this.rxProcessInstanceCommandsService = rxProcessInstanceCommandsService;
        this.rxProcessInstanceService = rxProcessInstanceService;
        this.rxRecordInstanceService = rxRecordInstanceService;
    }
    execute(params) {
        let processId;
        let processDefinitionOutputParams;
        return this.rxProcessInstanceCommandsService
            .start(params.processDefinitionName, params.actionProcessInputParams)
            .pipe(switchMap((res) => {
            if (params.waitForProcessCompletion) {
                const location = res.headers.get('location');
                processId = location ? last(location.split('/')) : null;
                return this.rxProcessDefinitionCacheService.getOutputParams(params.processDefinitionName);
            }
            else {
                return of(null);
            }
        }), switchMap((plainOutputParams) => {
            if (!isEmpty(plainOutputParams)) {
                processDefinitionOutputParams = plainOutputParams.reduce((outputParams, value) => {
                    outputParams[value.name] = value;
                    return outputParams;
                }, {});
                return this.rxProcessInstanceService.get(params.processDefinitionName, `${processId}/processOutputVariables`);
            }
            else {
                return of(null);
            }
        }), switchMap((processOutputVariables) => {
            const outputResult = {};
            forEach(processOutputVariables, (variableValue, variableName) => {
                if (processDefinitionOutputParams[variableName].fieldTypeName ===
                    RX_PROCESS_DEFINITION.processVariableTypes.record) {
                    const recordInstanceOutputData = this.rxJsonParserService.tryParseJson(variableValue);
                    if (recordInstanceOutputData &&
                        recordInstanceOutputData.recordDefinitionName &&
                        recordInstanceOutputData.id) {
                        outputResult[variableName] = this.rxRecordInstanceService
                            .get(recordInstanceOutputData.recordDefinitionName, recordInstanceOutputData.id)
                            .pipe(map((recordInstance) => reduce(recordInstance.fieldInstances, (result, fieldInstance) => {
                            result[fieldInstance.id] = fieldInstance.value;
                            return result;
                        }, {})));
                    }
                    else {
                        this.rxLogService.warning('rxLaunchProcessAction: unknown format for record instance as output data for process');
                    }
                }
                else {
                    outputResult[variableName] = of(variableValue);
                }
            });
            return forkJoin(outputResult);
        }));
    }
}
RxLaunchProcessViewActionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLaunchProcessViewActionService, deps: [{ token: i1.RxJsonParserService }, { token: i1$4.RxLogService }, { token: i3$2.RxProcessDefinitionCacheService }, { token: i4.RxRecordDefinitionCacheService }, { token: i3$2.RxProcessInstanceCommandsService }, { token: i3$2.RxProcessInstanceService }, { token: i4.RxRecordInstanceService }], target: i0.ɵɵFactoryTarget.Injectable });
RxLaunchProcessViewActionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLaunchProcessViewActionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLaunchProcessViewActionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxJsonParserService }, { type: i1$4.RxLogService }, { type: i3$2.RxProcessDefinitionCacheService }, { type: i4.RxRecordDefinitionCacheService }, { type: i3$2.RxProcessInstanceCommandsService }, { type: i3$2.RxProcessInstanceService }, { type: i4.RxRecordInstanceService }]; } });

class LaunchProcessViewActionModule {
    constructor(rxViewActionRegistryService, rxLaunchProcessViewActionService, rxLaunchProcessViewActionDesignManagerService) {
        this.rxViewActionRegistryService = rxViewActionRegistryService;
        this.rxLaunchProcessViewActionService = rxLaunchProcessViewActionService;
        this.rxLaunchProcessViewActionDesignManagerService = rxLaunchProcessViewActionDesignManagerService;
        this.rxViewActionRegistryService.register({
            name: 'rxLaunchProcessAction',
            label: 'Launch process',
            bundleId: RX_APPLICATION.platformBundleId,
            service: this.rxLaunchProcessViewActionService,
            designManager: this.rxLaunchProcessViewActionDesignManagerService,
            designModel: RxLaunchProcessViewActionDesignModel,
            parameters: [
                {
                    name: 'processDefinitionName',
                    label: 'Process to start',
                    type: ViewComponentPropertyType.String,
                    isRequired: true
                },
                {
                    name: 'waitForProcessCompletion',
                    type: ViewComponentPropertyType.Boolean,
                    designType: ViewComponentPropertyType.Boolean
                },
                {
                    name: 'actionProcessInputParams',
                    label: 'Input map',
                    enableExpressionEvaluation: true
                }
            ]
        });
    }
}
LaunchProcessViewActionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LaunchProcessViewActionModule, deps: [{ token: i1$1.RxViewActionRegistryService }, { token: RxLaunchProcessViewActionService }, { token: RxLaunchProcessViewActionDesignManagerService }], target: i0.ɵɵFactoryTarget.NgModule });
LaunchProcessViewActionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LaunchProcessViewActionModule });
LaunchProcessViewActionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LaunchProcessViewActionModule, providers: [RxLaunchProcessViewActionDesignManagerService] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LaunchProcessViewActionModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [RxLaunchProcessViewActionDesignManagerService]
                }]
        }], ctorParameters: function () { return [{ type: i1$1.RxViewActionRegistryService }, { type: RxLaunchProcessViewActionService }, { type: RxLaunchProcessViewActionDesignManagerService }]; } });

class RxLaunchUrlViewActionService {
    execute(params) {
        if (params.url) {
            window.open(params.url, RX_LAUNCH_BEHAVIOR[params.launchBehavior].target);
            return EMPTY;
        }
        else {
            return throwError(new RxError('rxLaunchUrlAction: URL is not specified.'));
        }
    }
}
RxLaunchUrlViewActionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLaunchUrlViewActionService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxLaunchUrlViewActionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLaunchUrlViewActionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLaunchUrlViewActionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class RxLaunchUrlViewActionDesignModel extends RxViewDesignerActionModel {
    constructor(injector, sandbox) {
        super(injector, sandbox);
        this.injector = injector;
        this.sandbox = sandbox;
        this.sandbox.setActionPropertyEditorConfig(this.getActionEditorConfig());
    }
    static getInitialProperties(initialProperties) {
        return Object.assign({ url: null, launchBehavior: RX_LAUNCH_BEHAVIOR.newWindow.value }, initialProperties);
    }
    getActionEditorConfig() {
        return [
            {
                name: 'url',
                component: ExpressionFormControlComponent,
                options: {
                    label: 'URL',
                    isRequired: true,
                    dataDictionary$: this.expressionConfigurator.getDataDictionary(),
                    operators: this.expressionConfigurator.getOperators()
                }
            },
            {
                name: 'launchBehavior',
                component: SelectFormControlComponent,
                options: {
                    label: 'Launch behavior',
                    options: map$1(RX_LAUNCH_BEHAVIOR, (value) => ({
                        name: value.content,
                        id: value.value
                    })),
                    sortAlphabetically: false
                }
            }
        ];
    }
}

class RxLaunchUrlViewActionDefinitionAdapterService {
    adaptDefinition(viewComponentDefinition) {
        var _a;
        const propertiesByName = get(viewComponentDefinition, 'propertiesByName', {});
        propertiesByName.launchBehavior = (_a = propertiesByName.launchBehavior) !== null && _a !== void 0 ? _a : RX_LAUNCH_BEHAVIOR.newWindow.value;
    }
}
RxLaunchUrlViewActionDefinitionAdapterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLaunchUrlViewActionDefinitionAdapterService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxLaunchUrlViewActionDefinitionAdapterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLaunchUrlViewActionDefinitionAdapterService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLaunchUrlViewActionDefinitionAdapterService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class LaunchUrlViewActionModule {
    constructor(rxViewActionDefinitionAdapterRegistryService, rxViewActionRegistryService, rxLaunchUrlViewActionService, rxLaunchUrlActionDefinitionAdapterService) {
        this.rxViewActionDefinitionAdapterRegistryService = rxViewActionDefinitionAdapterRegistryService;
        this.rxViewActionRegistryService = rxViewActionRegistryService;
        this.rxLaunchUrlViewActionService = rxLaunchUrlViewActionService;
        this.rxLaunchUrlActionDefinitionAdapterService = rxLaunchUrlActionDefinitionAdapterService;
        this.rxViewActionRegistryService.register({
            name: 'rxLaunchUrlAction',
            label: 'Launch URL',
            bundleId: RX_APPLICATION.platformBundleId,
            service: this.rxLaunchUrlViewActionService,
            designModel: RxLaunchUrlViewActionDesignModel,
            parameters: [
                {
                    name: 'url',
                    label: 'URL',
                    enableExpressionEvaluation: true,
                    isRequired: true
                },
                {
                    name: 'launchBehavior',
                    label: 'Launch behavior'
                }
            ]
        });
        rxViewActionDefinitionAdapterRegistryService.registerRuntimeAdapter('rxLaunchUrlAction', this.rxLaunchUrlActionDefinitionAdapterService);
    }
}
LaunchUrlViewActionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LaunchUrlViewActionModule, deps: [{ token: i1$1.RxViewActionDefinitionAdapterRegistryService }, { token: i1$1.RxViewActionRegistryService }, { token: RxLaunchUrlViewActionService }, { token: RxLaunchUrlViewActionDefinitionAdapterService }], target: i0.ɵɵFactoryTarget.NgModule });
LaunchUrlViewActionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LaunchUrlViewActionModule });
LaunchUrlViewActionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LaunchUrlViewActionModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LaunchUrlViewActionModule, decorators: [{
            type: NgModule
        }], ctorParameters: function () { return [{ type: i1$1.RxViewActionDefinitionAdapterRegistryService }, { type: i1$1.RxViewActionRegistryService }, { type: RxLaunchUrlViewActionService }, { type: RxLaunchUrlViewActionDefinitionAdapterService }]; } });

class RxRefreshViewActionService {
    execute(params) {
        if (params.component) {
            return isFunction(params.component.refresh)
                ? params.component.refresh()
                : throwError(new RxError('rxRefreshAction: target component does not support refresh API.'));
        }
        else {
            return throwError(new RxError('rxRefreshAction: component is not specified.'));
        }
    }
}
RxRefreshViewActionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRefreshViewActionService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxRefreshViewActionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRefreshViewActionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRefreshViewActionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class RefreshViewActionModule {
    constructor(rxViewActionRegistryService, rxRefreshViewActionService) {
        this.rxViewActionRegistryService = rxViewActionRegistryService;
        this.rxRefreshViewActionService = rxRefreshViewActionService;
        this.rxViewActionRegistryService.register({
            name: 'rxRefreshAction',
            label: 'Refresh',
            bundleId: RX_APPLICATION.platformBundleId,
            service: this.rxRefreshViewActionService,
            parameters: [
                {
                    name: 'component',
                    label: 'View/Component',
                    enableExpressionEvaluation: true,
                    isRequired: true,
                    editor: ExpressionFormControlComponent
                }
            ]
        });
    }
}
RefreshViewActionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RefreshViewActionModule, deps: [{ token: i1$1.RxViewActionRegistryService }, { token: RxRefreshViewActionService }], target: i0.ɵɵFactoryTarget.NgModule });
RefreshViewActionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RefreshViewActionModule });
RefreshViewActionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RefreshViewActionModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RefreshViewActionModule, decorators: [{
            type: NgModule
        }], ctorParameters: function () { return [{ type: i1$1.RxViewActionRegistryService }, { type: RxRefreshViewActionService }]; } });

class RxSaveViewActionService {
    execute(params) {
        if (isFunction(params.targetApi.save)) {
            const closeAfterSave$ = isFunction(params.viewApi.close)
                ? EMPTY.pipe(tap({
                    complete() {
                        params.viewApi.close();
                    }
                }))
                : throwError(new RxError('rxSaveAction: target view does not support close API.'));
            return concat(params.targetApi.save(params.closeAfterSave), params.closeAfterSave ? closeAfterSave$ : EMPTY);
        }
        else {
            return throwError(new RxError('rxSaveAction: target view/component does not support save API.'));
        }
    }
}
RxSaveViewActionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSaveViewActionService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxSaveViewActionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSaveViewActionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSaveViewActionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class SaveViewActionModule {
    constructor(rxViewActionRegistryService, rxSaveViewActionService) {
        this.rxViewActionRegistryService = rxViewActionRegistryService;
        this.rxSaveViewActionService = rxSaveViewActionService;
        this.rxViewActionRegistryService.register({
            name: 'rxSaveAction',
            label: 'Save',
            bundleId: RX_APPLICATION.platformBundleId,
            service: this.rxSaveViewActionService,
            parameters: [
                {
                    name: 'targetApi',
                    label: 'View/Component',
                    editor: ExpressionFormControlComponent,
                    isRequired: true,
                    enableExpressionEvaluation: true
                },
                {
                    name: 'closeAfterSave',
                    label: 'Close after save',
                    editor: SwitchFormControlComponent,
                    type: ViewComponentPropertyType.Boolean,
                    designType: ViewComponentPropertyType.Boolean
                },
                {
                    name: 'viewApi',
                    enableExpressionEvaluation: true,
                    defaultValue: '${view.api}'
                }
            ]
        });
    }
}
SaveViewActionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SaveViewActionModule, deps: [{ token: i1$1.RxViewActionRegistryService }, { token: RxSaveViewActionService }], target: i0.ɵɵFactoryTarget.NgModule });
SaveViewActionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SaveViewActionModule });
SaveViewActionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SaveViewActionModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SaveViewActionModule, decorators: [{
            type: NgModule
        }], ctorParameters: function () { return [{ type: i1$1.RxViewActionRegistryService }, { type: RxSaveViewActionService }]; } });

class RxSetPropertyViewActionService {
    execute(params) {
        let executionResult = throwError(new RxError('rxSetPropertyAction: component is not specified.'));
        if (params.componentApi && isFunction(params.componentApi.setProperty) && params.propertyPath) {
            // Extract <Path> from  ${view.components.<ID>.<Path>}
            const matches = params.propertyPath.match(/^\$\{view\.components\.[0-9a-z-]+\.(.+)}$/);
            if (matches && matches[1]) {
                executionResult = params.componentApi.setProperty(matches[1], params.propertyValue);
            }
        }
        return isObservable(executionResult) ? executionResult : EMPTY;
    }
}
RxSetPropertyViewActionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSetPropertyViewActionService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxSetPropertyViewActionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSetPropertyViewActionService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSetPropertyViewActionService, decorators: [{
            type: Injectable
        }] });

class RxSetPropertyViewActionExpressionConfigurator extends RxViewActionExpressionConfigurator {
    constructor(injector, actionType, actionGuid) {
        super(injector, actionType, actionGuid);
        this.configureForProperty({
            propertyPath: 'propertyPath',
            dataDictionary$: injector.get(RxViewDataDictionaryService).settablePropertiesDataDictionary$,
            operators: this.getOperatorRowsByGroup(ExpressionOperatorGroup.MathClient)
        });
    }
}

class RxSetPropertyViewActionDesignModel extends RxViewDesignerActionModel {
    constructor(injector, sandbox) {
        super(injector, sandbox);
        this.injector = injector;
        this.sandbox = sandbox;
        this.expressionConfigurator = new RxSetPropertyViewActionExpressionConfigurator(this.injector, this.sandbox.descriptor.name, this.guid);
        this.sandbox.actionProperties$
            .pipe(take(1))
            .subscribe(() => this.sandbox.setActionPropertyEditorConfig(this.getActionEditorConfig()));
        this.sandbox.actionProperties$.pipe(pluck('propertyPath'), distinctUntilChanged()).subscribe((propertyPath) => {
            let componentApi = null;
            if (propertyPath && propertyPath.length) {
                // Extract <ID> from ${view.components.<ID>.<Path>}
                const matches = propertyPath.match(/\${view\.components\.([0-9a-z-]+)\..+}/);
                if (matches && matches[1]) {
                    componentApi = `\${view.components.${matches[1]}.api}`;
                }
            }
            this.sandbox.updateActionProperties({
                componentApi
            });
        });
    }
    static getInitialProperties(initialProperties) {
        return Object.assign({ componentApi: null, propertyPath: null, propertyValue: null }, initialProperties);
    }
    getActionEditorConfig() {
        return [
            {
                name: 'propertyPath',
                component: ExpressionFormControlComponent,
                options: {
                    label: 'Property path',
                    dataDictionary$: this.expressionConfigurator.getDataDictionary('propertyPath'),
                    operators: this.expressionConfigurator.getOperators('propertyPath'),
                    isRequired: true
                }
            },
            {
                name: 'propertyValue',
                component: ExpressionFormControlComponent,
                options: {
                    label: 'Property value',
                    dataDictionary$: this.expressionConfigurator.getDataDictionary('propertyValue'),
                    operators: this.expressionConfigurator.getOperators('propertyValue')
                }
            }
        ];
    }
}

class RxSetPropertyViewActionDesignManagerService {
    validate(actionProperties, propertyName) {
        return of(actionProperties.propertyPath && !/\${view\.components\.([0-9a-z-]+)\..+}/.test(actionProperties.propertyPath)
            ? [
                {
                    type: 'error',
                    description: 'Set property action: Property path is invalid.',
                    propertyName
                }
            ]
            : []);
    }
}
RxSetPropertyViewActionDesignManagerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSetPropertyViewActionDesignManagerService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxSetPropertyViewActionDesignManagerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSetPropertyViewActionDesignManagerService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSetPropertyViewActionDesignManagerService, decorators: [{
            type: Injectable
        }] });

class SetPropertyViewActionModule {
    constructor(rxViewActionRegistryService, rxSetPropertyViewActionService, rxSetPropertyViewActionDesignManagerService) {
        this.rxViewActionRegistryService = rxViewActionRegistryService;
        this.rxSetPropertyViewActionService = rxSetPropertyViewActionService;
        this.rxSetPropertyViewActionDesignManagerService = rxSetPropertyViewActionDesignManagerService;
        this.rxViewActionRegistryService.register({
            name: 'rxSetPropertyAction',
            label: 'Set property',
            bundleId: RX_APPLICATION.platformBundleId,
            service: this.rxSetPropertyViewActionService,
            designModel: RxSetPropertyViewActionDesignModel,
            designManager: rxSetPropertyViewActionDesignManagerService,
            parameters: [
                {
                    name: 'componentApi',
                    label: 'Component API',
                    enableExpressionEvaluation: true
                },
                {
                    name: 'propertyPath',
                    label: 'Property path',
                    isRequired: true
                },
                {
                    name: 'propertyValue',
                    enableExpressionEvaluation: true
                }
            ]
        });
    }
}
SetPropertyViewActionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SetPropertyViewActionModule, deps: [{ token: i1$1.RxViewActionRegistryService }, { token: RxSetPropertyViewActionService }, { token: RxSetPropertyViewActionDesignManagerService }], target: i0.ɵɵFactoryTarget.NgModule });
SetPropertyViewActionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SetPropertyViewActionModule });
SetPropertyViewActionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SetPropertyViewActionModule, providers: [RxSetPropertyViewActionService, RxSetPropertyViewActionDesignManagerService] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SetPropertyViewActionModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [RxSetPropertyViewActionService, RxSetPropertyViewActionDesignManagerService]
                }]
        }], ctorParameters: function () { return [{ type: i1$1.RxViewActionRegistryService }, { type: RxSetPropertyViewActionService }, { type: RxSetPropertyViewActionDesignManagerService }]; } });

class ProcessDesignerFrameComponent {
    constructor(rxApplicationLoaderService, rxBundleCacheService, rxJsonParserService, rxProcessDefinitionCacheService, domSanitizer, activeModalRef, rxUtilityModalsService) {
        this.rxApplicationLoaderService = rxApplicationLoaderService;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxJsonParserService = rxJsonParserService;
        this.rxProcessDefinitionCacheService = rxProcessDefinitionCacheService;
        this.domSanitizer = domSanitizer;
        this.activeModalRef = activeModalRef;
        this.rxUtilityModalsService = rxUtilityModalsService;
        this.isProcessDesignerLoadingInProgress = true;
        this.isDefinitionDirty = false;
        this.context = activeModalRef;
        const data = this.context.getData();
        localStorage.setItem('ProcessDesignerPaletteElements', data.paletteElements);
        this.iframeSrc = this.domSanitizer.bypassSecurityTrustResourceUrl(`/com.bmc.arsys.rx.innovationstudio/index.html#/app/bundle/${this.rxBundleCacheService.bundleId}/iprocess/${data.processDefinitionName ? data.processDefinitionName : ''}`);
    }
    onMessage(event) {
        if (event.data) {
            const message = this.rxJsonParserService.tryParseJson(event.data);
            if (message) {
                switch (message.messageType) {
                    case RX_DESIGNER.messageTypes.designerLoaded: {
                        this.isProcessDesignerLoadingInProgress = false;
                        break;
                    }
                    case RX_DESIGNER.messageTypes.afterSave: {
                        this.isDefinitionDirty = false;
                        break;
                    }
                    case RX_DESIGNER.messageTypes.definitionStatusChanged: {
                        this.isDefinitionDirty = message.payload.isDirty;
                        break;
                    }
                    case RX_DESIGNER.messageTypes.closeDesigner: {
                        if (message.payload.processDefinitionName) {
                            if (this.isDefinitionDirty) {
                                this.rxUtilityModalsService.confirmUnsavedChanges().then((isConfirmed) => {
                                    if (isConfirmed) {
                                        this.closeProcessDesigner(message.payload.processDefinitionName);
                                    }
                                });
                            }
                            else {
                                this.closeProcessDesigner(message.payload.processDefinitionName);
                            }
                        }
                        else {
                            if (this.isDefinitionDirty) {
                                this.rxUtilityModalsService.confirmUnsavedChanges().then((isConfirmed) => {
                                    if (isConfirmed) {
                                        this.context.dismiss(DismissReasons.CLOSE_BTN);
                                    }
                                });
                            }
                            else {
                                this.context.dismiss(DismissReasons.CLOSE_BTN);
                            }
                        }
                        break;
                    }
                }
            }
        }
    }
    closeProcessDesigner(processDefinitionName) {
        this.rxProcessDefinitionCacheService.clearCache([processDefinitionName]);
        this.context.close({ processDefinitionName });
    }
}
ProcessDesignerFrameComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessDesignerFrameComponent, deps: [{ token: i1$4.RxApplicationLoaderService }, { token: i1$4.RxBundleCacheService }, { token: i1.RxJsonParserService }, { token: i3$2.RxProcessDefinitionCacheService }, { token: i4$2.DomSanitizer }, { token: i1$2.ActiveModalRef }, { token: i2$2.RxUtilityModalsService }], target: i0.ɵɵFactoryTarget.Component });
ProcessDesignerFrameComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ProcessDesignerFrameComponent, selector: "rx-process-designer-frame", host: { listeners: { "window:message": "onMessage($event)" } }, ngImport: i0, template: "<div id=\"rx-application-loader-container\" class=\"position-absolute w-100\" *ngIf=\"isProcessDesignerLoadingInProgress\">\n  <div class=\"rx-application-loader\"></div>\n</div>\n\n<iframe [src]=\"iframeSrc\" class=\"h-100\"></iframe>\n", styles: [":host{height:100vh}\n"], directives: [{ type: i2$3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessDesignerFrameComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-process-designer-frame',
                    templateUrl: './process-designer-frame.component.html',
                    styleUrls: ['./process-designer-frame.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1$4.RxApplicationLoaderService }, { type: i1$4.RxBundleCacheService }, { type: i1.RxJsonParserService }, { type: i3$2.RxProcessDefinitionCacheService }, { type: i4$2.DomSanitizer }, { type: i1$2.ActiveModalRef }, { type: i2$2.RxUtilityModalsService }]; }, propDecorators: { onMessage: [{
                type: HostListener,
                args: ['window:message', ['$event']]
            }] } });

class RxLaunchProcessDesignerActionService {
    constructor(adaptModalService, rxProcessDefinitionCacheService) {
        this.adaptModalService = adaptModalService;
        this.rxProcessDefinitionCacheService = rxProcessDefinitionCacheService;
    }
    execute(parameters) {
        return parameters.processDefinitionName
            ? this.rxProcessDefinitionCacheService
                .getProcessDefinition(parameters.processDefinitionName)
                .pipe(switchMap(() => this.openModal(parameters)))
            : defer(() => from(this.openModal(parameters)));
    }
    openModal(parameters) {
        return this.adaptModalService.open({
            content: ProcessDesignerFrameComponent,
            size: OpenViewActionModalSize.FullSize,
            data: parameters
        });
    }
}
RxLaunchProcessDesignerActionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLaunchProcessDesignerActionService, deps: [{ token: i1$2.AdaptModalService }, { token: i3$2.RxProcessDefinitionCacheService }], target: i0.ɵɵFactoryTarget.Injectable });
RxLaunchProcessDesignerActionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLaunchProcessDesignerActionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLaunchProcessDesignerActionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1$2.AdaptModalService }, { type: i3$2.RxProcessDefinitionCacheService }]; } });

class RxProcessDesignerElementPickerComponent extends ValueAccessor {
    constructor(rxDesignerStencilBuilder, rxJsonParserService, rxProcessElementsService, renderer, translateService) {
        super();
        this.rxDesignerStencilBuilder = rxDesignerStencilBuilder;
        this.rxJsonParserService = rxJsonParserService;
        this.rxProcessElementsService = rxProcessElementsService;
        this.renderer = renderer;
        this.translateService = translateService;
        this.selection = [];
        this.destroyed$ = new ReplaySubject(1);
    }
    ngOnInit() {
        const paletteElementsControl = this.innerValue;
        this.selectedPaletteElements =
            paletteElementsControl === '*' ? '*' : this.rxJsonParserService.tryParseJson(paletteElementsControl, null);
        this.rxDesignerStencilBuilder
            .buildElementsTree(this.rxProcessElementsService.getProcessElements(), RX_PROCESS_DEFINITION.standardProcessElementGroups)
            .pipe(take(1))
            .subscribe((processElementsTree) => {
            forEach(processElementsTree, (group) => {
                var _a;
                group.expanded = true;
                group.allChildElementsSelected = true;
                if ((_a = this.selectedPaletteElements) === null || _a === void 0 ? void 0 : _a.length) {
                    forEach(group.children, (element) => {
                        if (this.selectedPaletteElements === '*' ||
                            some(this.selectedPaletteElements, (selectedPaletteElement) => isEqual(selectedPaletteElement, element.value))) {
                            this.selection.push(element);
                        }
                        else {
                            group.allChildElementsSelected = false;
                        }
                    });
                    if (group.allChildElementsSelected) {
                        this.selection.push(group);
                    }
                }
            });
            this.processElementsTree = [
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.process-designer.all-elements.label'),
                    expanded: true,
                    children: processElementsTree
                }
            ];
            this.stencilElements = flatten(map$1(processElementsTree, 'children'));
            if (this.selectedPaletteElements === '*') {
                this.selection.push(...this.processElementsTree);
                this.selectedPaletteElements = map$1(this.stencilElements, 'value');
            }
            this.updatePickerFakeInputValue();
        });
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    onSelectionChange() {
        this.selectedPaletteElements = this.selection.filter((node) => !node.children).map((node) => node.value);
        if (this.selectedPaletteElements.length === 0) {
            this.selectedPaletteElements = null;
            this.value = null;
        }
        else if (this.stencilElements.length === this.selectedPaletteElements.length) {
            this.value = '*';
        }
        else {
            this.value = JSON.stringify(this.selectedPaletteElements);
        }
        this.updatePickerFakeInputValue();
    }
    updatePickerFakeInputValue() {
        if (isEmpty(this.selectedPaletteElements)) {
            this.selectedPaletteElementsByLabel = '';
        }
        else if (this.stencilElements.length === this.selectedPaletteElements.length) {
            this.selectedPaletteElementsByLabel = this.translateService.instant('com.bmc.arsys.rx.client.common.all.label');
        }
        else if (this.selectedPaletteElements.length === 1) {
            this.selectedPaletteElementsByLabel = this.translateService.instant('com.bmc.arsys.rx.client.process-designer.one-element-selected.label');
        }
        else {
            this.selectedPaletteElementsByLabel = this.translateService.instant('com.bmc.arsys.rx.client.process-designer.many-elements-selected.label', {
                count: this.selectedPaletteElements.length
            });
        }
    }
    clearDefinition(e) {
        e.stopPropagation();
        this.selection = [];
        this.selectedPaletteElements = null;
        this.selectedPaletteElementsByLabel = '';
        this.value = null;
    }
    setDropdownWidth() {
        setTimeout(() => {
            const dropdownButton = this.renderer.selectRootElement(this.dropdownButton.nativeElement, true);
            // 2px - border
            this.dropdownWidth = Math.max(dropdownButton.clientWidth) + 2;
        });
    }
}
RxProcessDesignerElementPickerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessDesignerElementPickerComponent, deps: [{ token: i1$4.RxDesignerStencilBuilder }, { token: i1.RxJsonParserService }, { token: i3$2.RxProcessElementsService }, { token: i0.Renderer2 }, { token: i4$1.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
RxProcessDesignerElementPickerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxProcessDesignerElementPickerComponent, selector: "rx-process-designer-element-picker", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: RxProcessDesignerElementPickerComponent,
            multi: true
        }
    ], viewQueries: [{ propertyName: "dropdownButton", first: true, predicate: ["dropdownButton"], descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: "<adapt-rx-control-label [label]=\"options.label\"></adapt-rx-control-label>\n\n<div\n  adaptDropdown\n  appendToBody=\"true\"\n  autoClose=\"outside\"\n  class=\"dropdown\"\n  placement=\"bottom-left\"\n  (onOpen)=\"setDropdownWidth()\"\n>\n  <button\n    adaptDropdownToggle\n    class=\"btn btn-secondary d-flex text-center w-100\"\n    rx-id=\"toggle-button\"\n    type=\"button\"\n    #dropdownButton\n  >\n    <span class=\"rx-selected-item text-left flex-grow-1\">{{ selectedPaletteElementsByLabel }}</span>\n\n    <span rx-id=\"clear-button\" class=\"d-icon-cross_adapt btn-link\" (click)=\"clearDefinition($event)\" *ngIf=\"value\">\n    </span>\n  </button>\n\n  <div class=\"dropdown-menu px-3\" [style.width.px]=\"dropdownWidth\" adaptDropdownMenu>\n    <adapt-tree\n      [value]=\"processElementsTree\"\n      [selectionMode]=\"'checkbox'\"\n      [(selection)]=\"selection\"\n      (selectionChange)=\"onSelectionChange()\"\n    ></adapt-tree>\n  </div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.rx-selected-item{min-height:20px}span[rx-id=clear-button]{cursor:pointer;margin-right:5px}span[rx-id=clear-button]:not(:hover){color:#313538}.dropdown-menu{height:400px}\n"], components: [{ type: i1$2.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i1$2.AdaptDropdownDirective, selector: "adapt-dropdown, [adaptDropdown]", inputs: ["autoClose", "customClass", "closeOnEscape", "placement", "animationPlacement", "holdFocusInMenu", "holdFocusOnOpen", "autoFocusFirst", "restoreFocusAfterClose", "focusNextElementAfterClose", "appendToBody", "appendTo", "positionTo", "anchorPositionTrackingIntervalMs", "enableAnchorPositionTracking", "recalculatePositionOnElementResize", "setMobileState", "mobileView"], outputs: ["onOpen", "onClose", "anchorPositionChange", "popupAnimationDone"], exportAs: ["adaptDropdown"] }, { type: i1$2.AdaptTreeComponent, selector: "adapt-tree", inputs: ["value", "filter", "texts", "filterBtnClearText", "filterPlaceholder", "testID", "lazy", "lazyLoading", "trim", "wrap", "selectAllButton", "deselectAllButton", "treeScrollHeight", "adaptRadarDisableEventSending", "draggableScope", "droppableScope", "draggableNodes", "droppableNodes", "validateDrop"], outputs: ["onNodeDrop", "lazyLoad"] }], directives: [{ type: i1$2.AdaptDropdownToggleDirective, selector: "[adaptDropdownToggle]", inputs: ["showCaret", "dropdownTogglerType"] }, { type: i2$3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1$2.AdaptDropdownMenuDirective, selector: "[adaptDropdownMenu]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessDesignerElementPickerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-process-designer-element-picker',
                    templateUrl: './process-designer-element-picker.component.html',
                    styleUrls: ['./process-designer-element-picker.component.scss'],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: RxProcessDesignerElementPickerComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1$4.RxDesignerStencilBuilder }, { type: i1.RxJsonParserService }, { type: i3$2.RxProcessElementsService }, { type: i0.Renderer2 }, { type: i4$1.TranslateService }]; }, propDecorators: { options: [{
                type: Input
            }], dropdownButton: [{
                type: ViewChild,
                args: ['dropdownButton', { static: true }]
            }] } });

class ProcessDesignerElementPickerModule {
}
ProcessDesignerElementPickerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessDesignerElementPickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ProcessDesignerElementPickerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessDesignerElementPickerModule, declarations: [RxProcessDesignerElementPickerComponent], imports: [CommonModule,
        FormsModule,
        AdaptRxCheckboxModule, i1$2.AdaptDropdownModule, AdaptRxLabelModule,
        AdaptTreeModule], exports: [RxProcessDesignerElementPickerComponent] });
ProcessDesignerElementPickerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessDesignerElementPickerModule, imports: [[
            CommonModule,
            FormsModule,
            AdaptRxCheckboxModule,
            AdaptDropdownModule.forRoot(),
            AdaptRxLabelModule,
            AdaptTreeModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessDesignerElementPickerModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxProcessDesignerElementPickerComponent],
                    exports: [RxProcessDesignerElementPickerComponent],
                    entryComponents: [RxProcessDesignerElementPickerComponent],
                    imports: [
                        CommonModule,
                        FormsModule,
                        AdaptRxCheckboxModule,
                        AdaptDropdownModule.forRoot(),
                        AdaptRxLabelModule,
                        AdaptTreeModule
                    ]
                }]
        }] });

class LaunchProcessDesignerActionDesignModelClass extends RxViewDesignerActionModel {
    constructor(injector, sandbox) {
        super(injector, sandbox);
        this.sandbox = sandbox;
        this.translateService = this.injector.get(TranslateService);
        this.sandbox.actionProperties$.pipe(take(1)).subscribe(() => {
            this.sandbox.setActionPropertyEditorConfig(this.getActionEditorConfig());
            this.sandbox.setActionOutputDataDictionary([
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.process-definition-name.label'),
                    expression: this.getOutputExpressionForPropertyPath('processDefinitionName')
                }
            ]);
        });
    }
    static getInitialProperties(initialProperties) {
        return Object.assign({ processDefinitionName: null, paletteElements: null }, initialProperties);
    }
    getActionEditorConfig() {
        return [
            {
                name: 'processDefinitionName',
                component: DefinitionPickerOrExpressionFormControlComponent,
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.process-definition-name.label'),
                    definitionType: RxDefinitionPickerType.Process,
                    dataDictionary$: this.expressionConfigurator.getDataDictionary(),
                    operators: this.expressionConfigurator.getOperators()
                }
            },
            {
                name: 'paletteElements',
                component: RxProcessDesignerElementPickerComponent,
                options: {
                    label: 'Available palette elements'
                }
            }
        ];
    }
}

class RxLaunchProcessDesignerExpressionEvaluatorService {
    constructor(rxDefaultExpressionEvaluatorService) {
        this.rxDefaultExpressionEvaluatorService = rxDefaultExpressionEvaluatorService;
    }
    evaluate(expression, data) {
        let evaluatedExpression = expression;
        if (!RX_RECORD_DEFINITION.validFullDefinitionName.test(expression)) {
            evaluatedExpression = this.rxDefaultExpressionEvaluatorService.evaluate(expression, data);
        }
        return evaluatedExpression;
    }
    parseExpression(expression) {
        let parsedExpression;
        if (!RX_RECORD_DEFINITION.validFullDefinitionName.test(expression)) {
            parsedExpression = this.rxDefaultExpressionEvaluatorService.parseExpression(expression);
        }
        return parsedExpression;
    }
}
RxLaunchProcessDesignerExpressionEvaluatorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLaunchProcessDesignerExpressionEvaluatorService, deps: [{ token: i1$1.RxDefaultExpressionEvaluatorService }], target: i0.ɵɵFactoryTarget.Injectable });
RxLaunchProcessDesignerExpressionEvaluatorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLaunchProcessDesignerExpressionEvaluatorService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLaunchProcessDesignerExpressionEvaluatorService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$1.RxDefaultExpressionEvaluatorService }]; } });

class LaunchProcessDesignerActionModule {
    constructor(rxViewActionRegistryService, rxLaunchProcessDesignerActionService, rxLaunchProcessDesignerExpressionActionEvaluatorService) {
        this.rxViewActionRegistryService = rxViewActionRegistryService;
        this.rxLaunchProcessDesignerActionService = rxLaunchProcessDesignerActionService;
        this.rxLaunchProcessDesignerExpressionActionEvaluatorService = rxLaunchProcessDesignerExpressionActionEvaluatorService;
        this.rxViewActionRegistryService.register({
            name: 'rxLaunchProcessDesignerAction',
            label: 'Launch process designer',
            bundleId: RX_APPLICATION.platformBundleId,
            service: this.rxLaunchProcessDesignerActionService,
            designModel: LaunchProcessDesignerActionDesignModelClass,
            parameters: [
                {
                    name: 'processDefinitionName',
                    label: 'Process definition name',
                    type: ViewComponentPropertyType.String,
                    enableExpressionEvaluation: true,
                    evaluatorService: this.rxLaunchProcessDesignerExpressionActionEvaluatorService
                },
                {
                    name: 'paletteElements',
                    label: 'Available palette elements',
                    type: ViewComponentPropertyType.String
                }
            ]
        });
    }
}
LaunchProcessDesignerActionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LaunchProcessDesignerActionModule, deps: [{ token: i1$1.RxViewActionRegistryService }, { token: RxLaunchProcessDesignerActionService }, { token: RxLaunchProcessDesignerExpressionEvaluatorService }], target: i0.ɵɵFactoryTarget.NgModule });
LaunchProcessDesignerActionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LaunchProcessDesignerActionModule, declarations: [ProcessDesignerFrameComponent], imports: [CommonModule, RxProcessApiModule, RxIframeModule] });
LaunchProcessDesignerActionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LaunchProcessDesignerActionModule, providers: [RxLaunchProcessDesignerExpressionEvaluatorService], imports: [[CommonModule, RxProcessApiModule, RxIframeModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LaunchProcessDesignerActionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RxProcessApiModule, RxIframeModule],
                    declarations: [ProcessDesignerFrameComponent],
                    entryComponents: [ProcessDesignerFrameComponent],
                    providers: [RxLaunchProcessDesignerExpressionEvaluatorService]
                }]
        }], ctorParameters: function () { return [{ type: i1$1.RxViewActionRegistryService }, { type: RxLaunchProcessDesignerActionService }, { type: RxLaunchProcessDesignerExpressionEvaluatorService }]; } });

class RxUnknownViewActionService {
    execute() {
        return EMPTY;
    }
}
RxUnknownViewActionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUnknownViewActionService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxUnknownViewActionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUnknownViewActionService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUnknownViewActionService, decorators: [{
            type: Injectable
        }] });

class RxUnknownViewActionDesignManager {
    validate(actionProperties, propertyName) {
        return of([
            {
                type: 'error',
                description: `Unknown action: ${actionProperties.name}`,
                propertyName
            }
        ]);
    }
}
RxUnknownViewActionDesignManager.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUnknownViewActionDesignManager, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxUnknownViewActionDesignManager.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUnknownViewActionDesignManager });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUnknownViewActionDesignManager, decorators: [{
            type: Injectable
        }] });

class RxUnknownViewActionDesignModel extends RxViewDesignerActionModel {
    constructor(injector, sandbox) {
        super(injector, sandbox);
        this.injector = injector;
        this.sandbox = sandbox;
        this.sandbox.actionProperties$.pipe(take(1)).subscribe((actionProperties) => {
            this.sandbox.setActionPropertyEditorConfig(this.getActionEditorConfig(actionProperties));
        });
    }
    getActionEditorConfig(actionProperties) {
        return keys(actionProperties).map((propertyName) => ({
            name: propertyName,
            component: TextFormControlComponent,
            isDisabled: true,
            options: {
                label: propertyName
            }
        }));
    }
}

class UnknownViewActionModule {
    constructor(rxViewActionRegistryService, rxUnknownViewActionService, rxUnknownViewActionDesignManager) {
        this.rxViewActionRegistryService = rxViewActionRegistryService;
        this.rxUnknownViewActionService = rxUnknownViewActionService;
        this.rxUnknownViewActionDesignManager = rxUnknownViewActionDesignManager;
        this.rxViewActionRegistryService.register({
            name: 'rxUnknownViewAction',
            label: 'Unknown',
            bundleId: RX_APPLICATION.platformBundleId,
            designModel: RxUnknownViewActionDesignModel,
            designManager: this.rxUnknownViewActionDesignManager,
            service: this.rxUnknownViewActionService,
            parameters: [],
            hidden: true
        });
    }
}
UnknownViewActionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: UnknownViewActionModule, deps: [{ token: i1$1.RxViewActionRegistryService }, { token: RxUnknownViewActionService }, { token: RxUnknownViewActionDesignManager }], target: i0.ɵɵFactoryTarget.NgModule });
UnknownViewActionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: UnknownViewActionModule });
UnknownViewActionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: UnknownViewActionModule, providers: [RxUnknownViewActionService, RxUnknownViewActionDesignManager] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: UnknownViewActionModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [RxUnknownViewActionService, RxUnknownViewActionDesignManager]
                }]
        }], ctorParameters: function () { return [{ type: i1$1.RxViewActionRegistryService }, { type: RxUnknownViewActionService }, { type: RxUnknownViewActionDesignManager }]; } });

class ViewActionsModule {
}
ViewActionsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewActionsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ViewActionsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewActionsModule, imports: [ApplyGridFilterViewActionModule,
        AssociateViewActionModule,
        AvcAssociateActionModule,
        CloseViewActionModule,
        DeleteRecordsViewActionModule,
        DisassociateViewActionModule,
        EditRecordsViewActionModule,
        LaunchProcessViewActionModule,
        LaunchProcessDesignerActionModule,
        LaunchUrlViewActionModule,
        OpenViewActionModule,
        RefreshViewActionModule,
        SaveViewActionModule,
        SetPropertyViewActionModule,
        UnknownViewActionModule] });
ViewActionsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewActionsModule, imports: [[
            ApplyGridFilterViewActionModule,
            AssociateViewActionModule,
            AvcAssociateActionModule,
            CloseViewActionModule,
            DeleteRecordsViewActionModule,
            DisassociateViewActionModule,
            EditRecordsViewActionModule,
            LaunchProcessViewActionModule,
            LaunchProcessDesignerActionModule,
            LaunchUrlViewActionModule,
            OpenViewActionModule,
            RefreshViewActionModule,
            SaveViewActionModule,
            SetPropertyViewActionModule,
            UnknownViewActionModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewActionsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        ApplyGridFilterViewActionModule,
                        AssociateViewActionModule,
                        AvcAssociateActionModule,
                        CloseViewActionModule,
                        DeleteRecordsViewActionModule,
                        DisassociateViewActionModule,
                        EditRecordsViewActionModule,
                        LaunchProcessViewActionModule,
                        LaunchProcessDesignerActionModule,
                        LaunchUrlViewActionModule,
                        OpenViewActionModule,
                        RefreshViewActionModule,
                        SaveViewActionModule,
                        SetPropertyViewActionModule,
                        UnknownViewActionModule
                    ]
                }]
        }] });

class RxApplyGridFilterViewActionDesignManagerService {
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
RxApplyGridFilterViewActionDesignManagerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApplyGridFilterViewActionDesignManagerService, deps: [{ token: i3$3.ViewDesignerFacade }, { token: i2.RxRecordGridDesignUtilsService }, { token: i2.RxRecordGridFilterHelperService }], target: i0.ɵɵFactoryTarget.Injectable });
RxApplyGridFilterViewActionDesignManagerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApplyGridFilterViewActionDesignManagerService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApplyGridFilterViewActionDesignManagerService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i3$3.ViewDesignerFacade }, { type: i2.RxRecordGridDesignUtilsService }, { type: i2.RxRecordGridFilterHelperService }]; } });

class ApplyGridFilterViewActionDesignModule {
    constructor(rxViewActionRegistryService, rxApplyGridFilterViewActionDesignManagerService) {
        this.rxViewActionRegistryService = rxViewActionRegistryService;
        this.rxApplyGridFilterViewActionDesignManagerService = rxApplyGridFilterViewActionDesignManagerService;
        this.rxViewActionRegistryService.registerDesignManager(RxApplyGridFilterActionName, rxApplyGridFilterViewActionDesignManagerService);
    }
}
ApplyGridFilterViewActionDesignModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApplyGridFilterViewActionDesignModule, deps: [{ token: i1$1.RxViewActionRegistryService }, { token: RxApplyGridFilterViewActionDesignManagerService }], target: i0.ɵɵFactoryTarget.NgModule });
ApplyGridFilterViewActionDesignModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApplyGridFilterViewActionDesignModule });
ApplyGridFilterViewActionDesignModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApplyGridFilterViewActionDesignModule, providers: [RxApplyGridFilterViewActionDesignManagerService] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApplyGridFilterViewActionDesignModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [RxApplyGridFilterViewActionDesignManagerService]
                }]
        }], ctorParameters: function () { return [{ type: i1$1.RxViewActionRegistryService }, { type: RxApplyGridFilterViewActionDesignManagerService }]; } });

class ViewActionsDesignModule {
}
ViewActionsDesignModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewActionsDesignModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ViewActionsDesignModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewActionsDesignModule, imports: [ViewActionsModule, ApplyGridFilterViewActionDesignModule] });
ViewActionsDesignModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewActionsDesignModule, imports: [[ViewActionsModule, ApplyGridFilterViewActionDesignModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewActionsDesignModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ViewActionsModule, ApplyGridFilterViewActionDesignModule]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { ApplyGridFilterViewActionModule, AssociateViewActionModule, AvcAssociateActionModule, CloseViewActionModule, DeleteRecordsViewActionModule, DisassociateViewActionModule, EditRecordsViewActionModule, LaunchProcessDesignerActionModule, LaunchProcessViewActionModule, LaunchUrlViewActionModule, OpenViewActionModule, ProcessDesignerElementPickerModule, RX_OPEN_VIEW, RefreshViewActionModule, RxApplyGridFilterActionName, RxApplyGridFilterViewActionService, RxAssociateViewActionService, RxAvcAssociateActionService, RxCloseViewActionService, RxDeleteRecordsViewActionService, RxDisassociateViewActionService, RxEditRecordsViewActionService, RxLaunchProcessDesignerActionService, RxLaunchProcessViewActionService, RxLaunchUrlViewActionService, RxOpenViewActionService, RxOpenViewModelHelperService, RxProcessDesignerElementPickerComponent, RxRefreshViewActionService, RxSaveViewActionService, RxSetPropertyViewActionService, RxUnknownViewActionDesignManager, RxUnknownViewActionService, SaveViewActionModule, SetPropertyViewActionModule, UnknownViewActionModule, ViewActionsDesignModule, ViewActionsModule };
//# sourceMappingURL=helix-platform-view-actions.js.map
