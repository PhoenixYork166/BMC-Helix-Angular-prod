import { RxViewDesignerActionModel, ViewDesignerFacade } from '@helix/platform/view/designer';
import { ApplyGridFilterMode } from '@helix/platform/view/api';
import { ExpressionFormControlComponent, MessageType, RadioFormControlComponent, ValidationFormControlComponent } from '@helix/platform/shared/components';
import { distinctUntilChanged, filter, first, map, pluck, skip, switchMap, takeUntil, withLatestFrom } from 'rxjs/operators';
import { combineLatest, merge, of } from 'rxjs';
import { RecordGridFilterSelectControlComponent, RX_RECORD_GRID, RxRecordGridDesignUtilsService, RxRecordGridFilterSelectHelperService } from '@helix/platform/view/components';
import { RxRecordDefinitionCacheService } from '@helix/platform/record/api';
import { includes, omit } from 'lodash';
import { Tooltip } from '@helix/platform/shared/api';
export class RxApplyGridFilterViewActionDesignModelClass extends RxViewDesignerActionModel {
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
//# sourceMappingURL=apply-grid-filter-view-action-design-model.class.js.map