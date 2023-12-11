import { Component, Injector, Input } from '@angular/core';
import { combineLatest, ReplaySubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, first, map, shareReplay, skip, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { cloneDeep, isEqual, noop } from 'lodash';
import { InspectorWidgetBase } from '@helix/platform/shared/components';
import { RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import { RxGuidService, RxJsonParserService } from '@helix/platform/utils';
import { OpenViewActionModalSize, RecordGridNamedFilterOptionKey, RxViewComponentType } from '@helix/platform/view/api';
import { ViewDesignerFacade } from '@helix/platform/view/designer';
import { RX_RECORD_GRID } from '../../../record-grid.constant';
import { RecordGridEditViewPresetsModalComponent } from './record-grid-edit-view-presets-modal/record-grid-edit-view-presets-modal.component';
import { RxRecordGridDesignUtilsService } from '../../record-grid-design-utils.service';
import { RxRecordGridFilterHelperService } from '../../../common/services/record-grid-filter-helper.service';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/ui-kit";
import * as i2 from "@helix/platform/view/designer";
import * as i3 from "@helix/platform/utils";
import * as i4 from "../../record-grid-design-utils.service";
import * as i5 from "../../../common/services/record-grid-filter-helper.service";
import * as i6 from "@helix/platform/shared/components";
import * as i7 from "@bmc-ux/adapt-angular";
import * as i8 from "@angular/forms";
import * as i9 from "@angular/common";
export class RecordGridViewPresetsWidgetComponent extends InspectorWidgetBase {
    constructor(injector, rxModalService, viewDesignerFacade, rxGuidService, rxRecordGridDesignUtilsService, rxRecordGridFilterHelperService, rxJsonParserService) {
        super(injector);
        this.injector = injector;
        this.rxModalService = rxModalService;
        this.viewDesignerFacade = viewDesignerFacade;
        this.rxGuidService = rxGuidService;
        this.rxRecordGridDesignUtilsService = rxRecordGridDesignUtilsService;
        this.rxRecordGridFilterHelperService = rxRecordGridFilterHelperService;
        this.rxJsonParserService = rxJsonParserService;
        this.currentPresetSelectorGuid$ = new ReplaySubject(1);
        this.presetSelectors$ = this.viewDesignerFacade.getComponentsByType(RxViewComponentType.ViewPresetSelector);
        this.presetSelectorOptions$ = this.presetSelectors$.pipe(map((items) => items.map(({ guid, data }) => ({ id: guid, name: data.name }))));
        this.destroyed$ = new ReplaySubject(1);
        this.selectedPresetsList$ = this.currentPresetSelectorGuid$.pipe(tap((guid) => this.updateViewPresetSelectorProp(guid)), switchMap((guid) => this.rxRecordGridDesignUtilsService.getPresetsList(guid)), shareReplay({ refCount: true, bufferSize: 1 }), takeUntil(this.destroyed$));
        this.viewPresetSelectorProp$ = this.designerItemModel.sandbox.getComponentPropertyValue('viewPresetSelector');
        this.gridColumnGuids$ = this.designerItemModel.sandbox.getChildComponentGuids((component) => component.type === RX_RECORD_GRID.components.column);
        this.selectOptions = {
            options: [],
            emptyOption: true,
            label: 'View preset selector',
            beforeValueChange: (oldValue, newValue) => {
                if (oldValue && oldValue !== newValue) {
                    return this.rxModalService.confirm({
                        title: 'Warning',
                        modalStyle: RX_MODAL.modalStyles.warning,
                        message: 'All record grid view presets will be cleared. Do you want to continue?'
                    });
                }
                else {
                    return Promise.resolve(true);
                }
            }
        };
    }
    ngOnChanges(changes) {
        var _a, _b;
        if (((_a = changes.options.currentValue.recordDefinition) === null || _a === void 0 ? void 0 : _a.name) !== ((_b = changes.options.previousValue.recordDefinition) === null || _b === void 0 ? void 0 : _b.name)) {
            this.currentPresetSelectorGuid = null;
            this.currentPresetSelectorGuid$.next(null);
        }
    }
    ngOnInit() {
        this.presetSelectorOptions$.pipe(takeUntil(this.destroyed$)).subscribe((options) => {
            this.selectOptions.options = options;
        });
        // select current preset selector item
        this.viewPresetSelectorProp$
            .pipe(first(), map((val) => this.designerItemModel.extractViewPresetSelectorGuid(val)), withLatestFrom(this.presetSelectorOptions$), takeUntil(this.destroyed$))
            .subscribe(([guid, presetSelectorOptions]) => {
            var _a;
            const selectedOption = (_a = presetSelectorOptions.find((item) => item.id === guid)) === null || _a === void 0 ? void 0 : _a.id;
            if (selectedOption) {
                this.currentPresetSelectorGuid = selectedOption;
                this.currentPresetSelectorGuid$.next(this.currentPresetSelectorGuid);
            }
        });
        this.gridColumnGuids$
            .pipe(filter(() => !!this.currentPresetSelectorGuid), switchMap((guids) => combineLatest(guids.map((guid) => combineLatest([
            this.designerItemModel.sandbox.getComponentPropertyValue('sortable', guid),
            this.designerItemModel.sandbox.getComponentPropertyValue('filterable', guid),
            this.viewDesignerFacade.getChildComponents(guid, (c) => c.type === RX_RECORD_GRID.components.filterPreset)
        ])))), distinctUntilChanged(isEqual), 
        // in case of removing and adding columns at a same time from columns modal
        // stream updated several times with according to adding/removing columns
        // we need it to be stabilized to proceed with column presets updating
        debounceTime(100), switchMap(() => this.designerItemModel.columns$.pipe(first())), withLatestFrom(this.designerItemModel.childComponentsTree$.pipe(map((components) => cloneDeep(components)))), skip(1), takeUntil(this.destroyed$))
            .subscribe(([gridColumns, allComponents]) => {
            this.updateColumnPresets(allComponents, gridColumns);
        });
    }
    updateColumnPresets(allComponents, gridColumns) {
        const viewPresetsPayload = allComponents
            .filter((component) => component.type === RX_RECORD_GRID.components.viewPreset)
            .map((component) => {
            const presetColumnComponents = component.children.filter((item) => item.type === RX_RECORD_GRID.components.columnViewPreset);
            const presetFilterComponents = this.getPresetFilterComponentsForColumns(component, gridColumns);
            const updatedPresetColumns = gridColumns
                .map((gridColumn) => {
                const existingPresetColumn = presetColumnComponents.find((presetColumn) => presetColumn.data.fieldId === gridColumn.fieldId);
                if (existingPresetColumn) {
                    if (!gridColumn.sortable) {
                        existingPresetColumn.data.sortable = null;
                    }
                    return existingPresetColumn;
                }
                else {
                    const columnPresetPayload = this.rxRecordGridDesignUtilsService.getColumnPresetPayload(gridColumn);
                    columnPresetPayload.data.visible = false;
                    columnPresetPayload.data.index = null;
                    columnPresetPayload.data.width = null;
                    return columnPresetPayload;
                }
            })
                .map((presetCol, i, array) => {
                if (presetCol.data.index === null) {
                    presetCol.data.index = Math.max(...array.map((col) => col.data.index)) + 1;
                }
                return presetCol;
            });
            component.children = [...updatedPresetColumns, ...presetFilterComponents];
            return component;
        });
        this.designerItemModel.sandbox.setChildrenByType(viewPresetsPayload, [RX_RECORD_GRID.components.viewPreset]);
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    getPresetFilterComponentsForColumns(presetComponent, gridColumns) {
        const gridColumnsIds = gridColumns.filter((col) => col.filterable).map((col) => col.fieldId);
        const presetFilterComponents = presetComponent.children.filter((item) => item.type !== RX_RECORD_GRID.components.columnViewPreset);
        // removing filter presets for removed columns or ones that have removed named filter option reference
        const filteredPresetFilterComponents = presetFilterComponents.reduce((result, presetFilterComponent) => {
            var _a, _b, _c;
            // checking if column still can be used for filtering
            if (gridColumnsIds.includes(presetFilterComponent.data.fieldId)) {
                const namedFilterOptions = (_b = (_a = gridColumns.find((col) => col.fieldId === presetFilterComponent.data.fieldId)) === null || _a === void 0 ? void 0 : _a.namedFilterOptions) !== null && _b !== void 0 ? _b : [];
                const namedFilterOptionsGuids = namedFilterOptions.map((option) => option.guid);
                let presetFiltersObj = this.rxRecordGridDesignUtilsService.getBasicRecordGridFiltersFromChildData([
                    presetFilterComponent
                ]);
                presetFiltersObj = this.deserializeNamedOptions(presetFiltersObj);
                const namedFilterOptionGuid = (_c = presetFiltersObj[0].value) === null || _c === void 0 ? void 0 : _c[RecordGridNamedFilterOptionKey];
                // if named filter option selected then check if it's still available
                if (namedFilterOptionGuid) {
                    if (namedFilterOptionsGuids.includes(namedFilterOptionGuid)) {
                        result.push(presetFilterComponent);
                    }
                }
                else {
                    result.push(presetFilterComponent);
                }
            }
            return result;
        }, []);
        if (presetFilterComponents.length) {
            if (filteredPresetFilterComponents.length < presetFilterComponents.length) {
                const presetFilters = this.rxRecordGridDesignUtilsService.getBasicRecordGridFiltersFromChildData(filteredPresetFilterComponents);
                const newFilterData = this.rxRecordGridFilterHelperService.getRecordGridFilterDataFromPredefinedFilter(presetComponent.data.filters, presetFilters);
                // updating filters JSON after column remove
                presetComponent.data.filters = newFilterData
                    ? this.rxRecordGridFilterHelperService.denormalizeFilterString(JSON.stringify(newFilterData), presetFilters)
                    : null;
            }
            return filteredPresetFilterComponents;
        }
        return presetFilterComponents;
    }
    deserializeNamedOptions(recordGridFilters) {
        return recordGridFilters.map((filter) => {
            const value = this.rxJsonParserService.tryParseJson(filter.value);
            if (value && value[RecordGridNamedFilterOptionKey]) {
                return Object.assign(Object.assign({}, filter), { value });
            }
            return filter;
        });
    }
    openEditor(preset) {
        combineLatest([
            this.designerItemModel.gridViewPresets$,
            this.selectedPresetsList$,
            this.designerItemModel.columns$,
            this.designerItemModel.recordDefinition$
        ])
            .pipe(first(), takeUntil(this.destroyed$))
            .subscribe(([viewPresets, presetsList, columns, recordDefinition]) => {
            this.rxModalService
                .openModal({
                title: 'Edit view presets',
                content: RecordGridEditViewPresetsModalComponent,
                size: OpenViewActionModalSize.Large,
                data: {
                    viewPresets,
                    presetsList,
                    gridColumns: columns,
                    recordDefinition,
                    activePreset: preset === null || preset === void 0 ? void 0 : preset.guid,
                    isReadOnly: this.isDisabled
                }
            })
                .then((result) => {
                this.onPresetModalClose(result);
            })
                .catch(noop);
        });
    }
    trackByGuid(index, item) {
        return item.name;
    }
    onPresetModalClose(result) {
        if (result && result.presets) {
            this.designerItemModel.childComponentsTree$
                .pipe(first(), map((components) => cloneDeep(components)), takeUntil(this.destroyed$))
                .subscribe((components) => {
                result.presets.forEach((preset) => {
                    const presetComponent = components.find((c) => c.type === RX_RECORD_GRID.components.viewPreset && c.data.viewPresetGuid === preset.guid);
                    if (presetComponent) {
                        const columnPayloads = preset.presetColumns.map((column) => this.rxRecordGridDesignUtilsService.getColumnPresetPayload(column.data));
                        const filterPayloads = this.rxRecordGridDesignUtilsService.getGridFilterComponentPayloads(preset.filters.basicFilters);
                        presetComponent.data = {
                            viewPresetGuid: preset.guid,
                            filters: preset.filters.filtersJson
                        };
                        presetComponent.children = [...columnPayloads, ...filterPayloads];
                    }
                });
                this.designerItemModel.sandbox.setChildren(components);
            });
        }
    }
    updateViewPresetSelectorProp(guid) {
        this.designerItemModel.sandbox.updateComponentProperties({
            viewPresetSelector: guid ? `\${view.components.${guid}.api}` : null
        });
    }
}
RecordGridViewPresetsWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridViewPresetsWidgetComponent, deps: [{ token: i0.Injector }, { token: i1.RxModalService }, { token: i2.ViewDesignerFacade }, { token: i3.RxGuidService }, { token: i4.RxRecordGridDesignUtilsService }, { token: i5.RxRecordGridFilterHelperService }, { token: i3.RxJsonParserService }], target: i0.ɵɵFactoryTarget.Component });
RecordGridViewPresetsWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RecordGridViewPresetsWidgetComponent, selector: "rx-record-grid-view-presets-widget", inputs: { options: "options" }, usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<rx-select-form-control\n  class=\"d-block mb-3\"\n  rx-id=\"preset-selector\"\n  [options]=\"selectOptions\"\n  [(ngModel)]=\"currentPresetSelectorGuid\"\n  (ngModelChange)=\"currentPresetSelectorGuid$.next($event)\"\n  [disabled]=\"isDisabled\"\n>\n</rx-select-form-control>\n\n<div [hidden]=\"!options.recordDefinition\" *ngIf=\"selectedPresetsList$ | async as presetsList\">\n  <adapt-button\n    *ngIf=\"presetsList.length\"\n    btn-type=\"tertiary\"\n    rx-id=\"edit-view-presets-button\"\n    class=\"p-0 pb-1\"\n    (click)=\"openEditor()\"\n  >\n    <span class=\"d-icon-left-plus_circle\"></span>\n    Edit view presets\n  </adapt-button>\n\n  <span rx-id=\"no-presets\" *ngIf=\"currentPresetSelectorGuid && presetsList.length === 0\" class=\"text-tertiary\">\n    No presets added.\n  </span>\n\n  <div rx-id=\"presets-list\">\n    <div\n      class=\"border mb-1 pr-2 d-flex justify-content-between text-break\"\n      *ngFor=\"let preset of presetsList; let index = index; trackBy: trackByGuid\"\n    >\n      <strong class=\"preset-name\" rx-id=\"preset-name\" [title]=\"preset.name\">\n        {{ preset.name }}\n      </strong>\n\n      <button\n        type=\"button\"\n        class=\"rx-button-unstyled d-icon-pencil btn-link\"\n        rx-id=\"edit-button\"\n        (click)=\"openEditor(preset)\"\n      ></button>\n    </div>\n  </div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.preset-name{padding:5px 10px;font-size:14px}.d-icon-pencil{cursor:pointer}.d-icon-pencil:not(:hover){color:#313538}\n"], components: [{ type: i6.SelectFormControlComponent, selector: "rx-select-form-control", inputs: ["options", "appendToBody", "formControl"] }, { type: i7.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i8.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i8.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i9.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i9.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "async": i9.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridViewPresetsWidgetComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-record-grid-view-presets-widget',
                    templateUrl: './record-grid-view-presets-widget.component.html',
                    styleUrls: ['./record-grid-view-presets-widget.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.RxModalService }, { type: i2.ViewDesignerFacade }, { type: i3.RxGuidService }, { type: i4.RxRecordGridDesignUtilsService }, { type: i5.RxRecordGridFilterHelperService }, { type: i3.RxJsonParserService }]; }, propDecorators: { options: [{
                type: Input
            }] } });
//# sourceMappingURL=record-grid-view-presets-widget.component.js.map