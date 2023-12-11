import { Component, Injector, Input, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor } from '@helix/platform/shared/components';
import { RxDefinitionNameService, RxGlobalCacheService } from '@helix/platform/shared/api';
import { RxModalService } from '@helix/platform/ui-kit';
import { cloneDeep, every, find, findIndex, isEmpty, isEqual, isFunction, reduce, uniq, values } from 'lodash';
import { combineLatest, forkJoin, of, Subject, Subscription } from 'rxjs';
import { RxRecordDefinitionCacheService, RxRecordDefinitionService } from '@helix/platform/record/api';
import { RxRecordGridUtilsService } from '../../../common/services/record-grid-utils.service';
import { RxRecordGridFilterConfigService } from '../../../runtime/services/record-grid-filter-config.service';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { RxRecordGridFilterService } from '../../../runtime/services/record-grid-filter.service';
import { RxGuidService } from '@helix/platform/utils';
import { RxRecordGridAdvancedFilteringService } from '../../../common/services/record-grid-advanced-filtering.service';
import { RxAdvancedFilteringFieldsProviderComponent } from '../../../common/components/advanced-filtering-fields-provider/advanced-filtering-fields-provider.component';
import { RxRecordGridFilterHelperService } from '../../../common/services/record-grid-filter-helper.service';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/ui-kit";
import * as i2 from "../../../common/services/record-grid-utils.service";
import * as i3 from "../../../runtime/services/record-grid-filter-config.service";
import * as i4 from "@helix/platform/record/api";
import * as i5 from "../../../runtime/services/record-grid-filter.service";
import * as i6 from "../../../common/services/record-grid-filter-helper.service";
import * as i7 from "@helix/platform/utils";
import * as i8 from "../../../common/services/record-grid-advanced-filtering.service";
import * as i9 from "@helix/platform/shared/api";
import * as i10 from "@bmc-ux/adapt-angular";
import * as i11 from "../../../common/components/filter-tags/filter-tags.component";
import * as i12 from "../../../common/components/advanced-filtering-fields-provider/advanced-filtering-fields-provider.component";
import * as i13 from "@angular/common";
import * as i14 from "@angular/forms";
export class RecordGridFilterSelectControlComponent extends ValueAccessor {
    constructor(injector, rxModalService, rxRecordGridUtilsService, rxRecordGridFilterConfigService, rxRecordDefinitionCacheService, rxRecordGridFilterService, rxRecordGridFilterHelperService, rxRecordDefinitionService, rxGuidService, rxRecordGridAdvancedFilteringService, rxGlobalCacheService, rxDefinitionNameService) {
        super();
        this.injector = injector;
        this.rxModalService = rxModalService;
        this.rxRecordGridUtilsService = rxRecordGridUtilsService;
        this.rxRecordGridFilterConfigService = rxRecordGridFilterConfigService;
        this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
        this.rxRecordGridFilterService = rxRecordGridFilterService;
        this.rxRecordGridFilterHelperService = rxRecordGridFilterHelperService;
        this.rxRecordDefinitionService = rxRecordDefinitionService;
        this.rxGuidService = rxGuidService;
        this.rxRecordGridAdvancedFilteringService = rxRecordGridAdvancedFilteringService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.advancedFilterData = {
            filterOptions: [],
            selectedFilters: [],
            filterTexts: {
                initialDropdownAnchorLabel: 'Filter'
            },
            recordGridFilterConfigs: null,
            fieldDefinitionsById: {},
            fieldDefinitionsInitialized$: new Subject(),
            filterValueInitialized$: new Subject(),
            associationDescriptors: []
        };
        this.subscription = new Subscription();
        this.getNamedFilterOptions = this.getNamedFilterOptions.bind(this);
        this.initEmptyValue();
        this.advancedFilterData.recordGridFilterConfigs = this.rxRecordGridFilterConfigService.getConfigs();
        this.subscription.add(combineLatest([
            this.advancedFilterData.filterValueInitialized$,
            this.advancedFilterData.fieldDefinitionsInitialized$
        ]).subscribe(() => {
            this.initSelectedAdvancedFilters(this.value);
        }));
    }
    getGroupFilterName(model) {
        var _a;
        return (_a = this.groupFilterItems.find((item) => item.value === model)) === null || _a === void 0 ? void 0 : _a.name;
    }
    onGroupFilterValueModelChange(model) {
        this.groupFilterValue = model;
    }
    ngOnInit() {
        this.initFilterOptions();
    }
    initEmptyValue() {
        this.innerValue = {
            basicFilters: null,
            filtersJson: null
        };
    }
    ngOnChanges(changes) {
        var _a, _b;
        if (changes.options &&
            changes.options.previousValue &&
            ((_a = changes.options.currentValue.primaryRecordDefinition) === null || _a === void 0 ? void 0 : _a.name) !==
                ((_b = changes.options.previousValue.primaryRecordDefinition) === null || _b === void 0 ? void 0 : _b.name)) {
            this.initEmptyValue();
            this.advancedFilterData.selectedFilters = [];
            this.advancedFilterData.filterOptions = [];
            this.initFilterOptions();
        }
    }
    initFilterOptions() {
        this.groupFilterItems = [];
        if (this.options.primaryRecordDefinition) {
            this.rxRecordGridUtilsService
                .getAssociationDescriptors(this.options.primaryRecordDefinition.name)
                .pipe(switchMap((associationDescriptors) => {
                this.advancedFilterData.associationDescriptors = associationDescriptors;
                const recordDefinitionNames = uniq(associationDescriptors.map((associationDescriptor) => associationDescriptor.recordDefinitionName));
                const recordDefinitions$ = recordDefinitionNames.length
                    ? forkJoin(recordDefinitionNames.map((name) => this.rxRecordDefinitionCacheService.getRecordDefinition(name)))
                    : of([]);
                return recordDefinitions$.pipe(map((recordDefinitions) => ({ recordDefinitions, associationDescriptors })));
            }), take(1))
                .subscribe(({ recordDefinitions, associationDescriptors }) => {
                const primaryRecordDefinition = cloneDeep(this.options.primaryRecordDefinition);
                [primaryRecordDefinition, ...recordDefinitions].forEach((recordDefinition) => {
                    if (!recordDefinition.fieldDefinitionsById) {
                        recordDefinition.fieldDefinitionsById =
                            this.rxRecordDefinitionService.buildFieldDefinitionsByIdMap(recordDefinition);
                    }
                });
                this.groupFilterValue = primaryRecordDefinition.name;
                this.advancedFilterData.fieldDefinitionsById =
                    this.rxRecordGridAdvancedFilteringService.addAssociationFieldsToFieldDefinitionsById(primaryRecordDefinition.fieldDefinitionsById, associationDescriptors, recordDefinitions);
                associationDescriptors.forEach((associationDescriptor) => {
                    const currentRecordDefinition = find(recordDefinitions, (recordDefinition) => recordDefinition.name === associationDescriptor.recordDefinitionName);
                    this.groupFilterItems.push({
                        name: associationDescriptor.label,
                        value: associationDescriptor.label
                    });
                    this.advancedFilterData.filterOptions.push(...this.getFilterOptions(currentRecordDefinition, associationDescriptor, associationDescriptor.label));
                });
                this.groupFilterItems = this.groupFilterItems.sort((gropFilter, gropFilterToCompare) => gropFilter.name.localeCompare(gropFilterToCompare.name));
                const mainRecordDefinitionName = this.rxDefinitionNameService.getDisplayName(primaryRecordDefinition.name);
                this.advancedFilterData.filterOptions.push(...this.getFilterOptions(primaryRecordDefinition, null, null));
                this.groupFilterItems.unshift({
                    name: mainRecordDefinitionName,
                    value: primaryRecordDefinition.name
                });
                this.advancedFilterData.fieldDefinitionsInitialized$.next();
            });
        }
    }
    onRemoveFilterTag(event) {
        const selectedFilters = this.advancedFilterData.selectedFilters.slice();
        const filterOptionId = event.removedTag.data.filterOption.id;
        const index = findIndex(selectedFilters, (selectedFilter) => selectedFilter.filterOptionId === filterOptionId);
        selectedFilters.splice(index, 1);
        this.onAdvancedFiltersChange(selectedFilters);
    }
    getFilterOptions(recordDefinition, associationDescriptor, prefix) {
        const fieldDefinitions = recordDefinition.fieldDefinitions;
        return fieldDefinitions
            .map((fieldDefinition) => {
            const filterConfig = this.advancedFilterData.recordGridFilterConfigs[fieldDefinition.resourceType];
            const label = this.rxRecordGridUtilsService.getColumnLabel(fieldDefinition, null);
            const fieldId = this.rxRecordGridUtilsService.getFieldIdForGridColumn(fieldDefinition.id, associationDescriptor);
            const filterOption = this.rxRecordGridAdvancedFilteringService.getAdvancedFilterOption(fieldId, label, fieldDefinition, filterConfig, false, {
                optionalBooleanFilter: this.fieldsProvider.optionalBooleanFilter,
                requiredBooleanFilter: this.fieldsProvider.requiredBooleanFilter,
                inputsForStringWithTypeAheadTemplate: this.fieldsProvider.inputsForStringWithTypeAheadTemplate,
                inputsForStringTypeTemplate: this.fieldsProvider.inputsForStringTypeTemplate,
                inputsForNumberTypeTemplate: this.fieldsProvider.inputsForNumberTypeTemplate,
                inputsForTimeTypeTemplate: this.fieldsProvider.inputsForTimeTypeTemplate,
                inputsForDateTypeTemplate: this.fieldsProvider.inputsForDateTypeTemplate,
                inputsForDatetimeTypeTemplate: this.fieldsProvider.inputsForDatetimeTypeTemplate,
                inputsForSelectionTypeTemplate: this.fieldsProvider.inputsForSelectionTypeTemplate
            }, prefix ? `${prefix} > ${label}` : null, this.options.namedFilterOptions ? this.options.namedFilterOptions[fieldId] : []);
            const recordDefinitionName = associationDescriptor
                ? associationDescriptor.label
                : this.options.primaryRecordDefinition.name;
            filterOption.isHidden = () => { var _a; return this.groupFilterValue !== recordDefinitionName || ((_a = this.options.selectedFieldIds) === null || _a === void 0 ? void 0 : _a.includes(fieldId)) === false; };
            return filterOption;
        })
            .sort((filterOption1, filterOption2) => filterOption1.label.localeCompare(filterOption2.label));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    onAdvancedFiltersChange(selectedFilters) {
        this.advancedFilterData.selectedFilters = selectedFilters;
        const oldBasicFilters = this.value.basicFilters || [];
        const basicFilters = reduce(selectedFilters, (recordGridFilters, selectedFilter) => {
            const fieldId = selectedFilter.filterOptionId;
            const fieldDefinition = this.advancedFilterData.fieldDefinitionsById[fieldId];
            const filterConfig = this.advancedFilterData.recordGridFilterConfigs[fieldDefinition.resourceType];
            const columnRecordGridFilterData = filterConfig.getRecordGridFilterData(selectedFilter.value, fieldDefinition, fieldId);
            (columnRecordGridFilterData.or || columnRecordGridFilterData.and).forEach((recordGridFilterOperator) => {
                const gridFilterValue = values(recordGridFilterOperator)[0][fieldId];
                const gridFilterDisplayValue = values(recordGridFilterOperator)[0]['$DISPLAYVALUE$'];
                const columnOldBasicFilter = find(oldBasicFilters, (oldBasicFilter) => oldBasicFilter.fieldId === fieldId &&
                    oldBasicFilter.value === gridFilterValue &&
                    every(recordGridFilters, (gridFilter) => gridFilter.guid !== oldBasicFilter.guid));
                const recordGridFilter = {
                    fieldId,
                    value: gridFilterValue,
                    $DISPLAYVALUE$: gridFilterDisplayValue,
                    guid: (columnOldBasicFilter && columnOldBasicFilter.guid) || this.rxGuidService.generate()
                };
                recordGridFilters.push(recordGridFilter);
            });
            return recordGridFilters;
        }, []);
        const recordGridFilterData = this.rxRecordGridFilterService.getRecordGridFilterDataFromAdvancedFilter(selectedFilters, this.advancedFilterData.fieldDefinitionsById, this.advancedFilterData.recordGridFilterConfigs);
        let filtersJson = isEmpty(recordGridFilterData) ? null : JSON.stringify(recordGridFilterData);
        if (filtersJson) {
            filtersJson = this.rxRecordGridFilterHelperService.denormalizeFilterString(filtersJson, basicFilters);
        }
        this.filtersModel = {
            basicFilters,
            filtersJson
        };
        this.value = {
            basicFilters,
            filtersJson
        };
    }
    onWriteValue(value) {
        if (!isEqual(this.filtersModel, value)) {
            this.advancedFilterData.filterValueInitialized$.next();
        }
    }
    initSelectedAdvancedFilters(value) {
        if ((value === null || value === void 0 ? void 0 : value.filtersJson) && !isEmpty(value.basicFilters)) {
            this.rxRecordGridFilterService
                .getSelectedFiltersFromPredefinedFilter(value.filtersJson, value.basicFilters, this.advancedFilterData.fieldDefinitionsById, this.advancedFilterData.recordGridFilterConfigs, this.options.primaryRecordDefinition, this.advancedFilterData.filterOptions, this.advancedFilterData.associationDescriptors)
                .pipe(map((selectedFilters) => this.options.namedFilterOptions
                ? this.rxRecordGridFilterService.clearRemovedNamedFilterOptions(selectedFilters, this.options.namedFilterOptions)
                : selectedFilters))
                .subscribe((selectedFilters) => {
                this.advancedFilterData.selectedFilters = selectedFilters;
            });
        }
    }
    getNamedFilterOptions(filterOptionConfig) {
        return this.options.namedFilterOptions ? this.options.namedFilterOptions[filterOptionConfig.id] : [];
    }
    getTags(filtersExpressionsTags) {
        var _a;
        const tags = (_a = filtersExpressionsTags === null || filtersExpressionsTags === void 0 ? void 0 : filtersExpressionsTags.filter((filterTag) => isEmpty(filterTag.data.validationErrors))) !== null && _a !== void 0 ? _a : [];
        const tags$ = tags.map((tag) => {
            var _a, _b;
            if (tag.data.filterOption) {
                const fieldId = tag.data.filterOption.id;
                const fieldDefinition = tag.data.filterOption.data;
                const filterConfig = this.advancedFilterData.recordGridFilterConfigs[fieldDefinition === null || fieldDefinition === void 0 ? void 0 : fieldDefinition.resourceType];
                if (isFunction(filterConfig === null || filterConfig === void 0 ? void 0 : filterConfig.getToolbarTagInfo)) {
                    return filterConfig
                        .getToolbarTagInfo({
                        primaryRecordDefinition: this.options.primaryRecordDefinition,
                        fieldDefinition,
                        value: tag.data.value,
                        tag,
                        fieldId,
                        namedFilterOptions: (_b = (_a = this.options.namedFilterOptions) === null || _a === void 0 ? void 0 : _a[fieldId]) !== null && _b !== void 0 ? _b : []
                    })
                        .pipe(tap((tagInfo) => (tag.data.value.title = tagInfo.tooltip)), map((tagInfo) => (Object.assign(Object.assign({}, tag), { text: tagInfo.text }))));
                }
            }
            return of(Object.assign({}, tag));
        });
        return tags$.length ? forkJoin(tags$) : of([]);
    }
}
RecordGridFilterSelectControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridFilterSelectControlComponent, deps: [{ token: i0.Injector }, { token: i1.RxModalService }, { token: i2.RxRecordGridUtilsService }, { token: i3.RxRecordGridFilterConfigService }, { token: i4.RxRecordDefinitionCacheService }, { token: i5.RxRecordGridFilterService }, { token: i6.RxRecordGridFilterHelperService }, { token: i4.RxRecordDefinitionService }, { token: i7.RxGuidService }, { token: i8.RxRecordGridAdvancedFilteringService }, { token: i9.RxGlobalCacheService }, { token: i9.RxDefinitionNameService }], target: i0.ɵɵFactoryTarget.Component });
RecordGridFilterSelectControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RecordGridFilterSelectControlComponent, selector: "rx-record-grid-filter-select-control", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: RecordGridFilterSelectControlComponent,
            multi: true
        }
    ], viewQueries: [{ propertyName: "fieldsProvider", first: true, predicate: RxAdvancedFilteringFieldsProviderComponent, descendants: true, static: true }], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<ng-container *ngIf=\"advancedFilterData.filterOptions\">\n  <adapt-advanced-filter\n    #advancedFilter\n    [hidden]=\"isDisabled\"\n    [appendDropdownToBody]=\"true\"\n    [enableSavedFilters]=\"false\"\n    [filterOptions]=\"advancedFilterData.filterOptions\"\n    (selectedFiltersChange)=\"onAdvancedFiltersChange($event)\"\n    [selectedFilters]=\"advancedFilterData.selectedFilters\"\n    [texts]=\"advancedFilterData.filterTexts\"\n    [applyFiltersByUserAction]=\"true\"\n    [filterOptionsCustomAreaTemplate]=\"filterOptionsCustomAreaTemplate\"\n    [selectedFiltersIndicationStyle]=\"'mark'\"\n    [anchorDisabled]=\"options.anchorDisabled\"\n  ></adapt-advanced-filter>\n\n  <rx-filter-tags\n    [isDisabled]=\"isDisabled\"\n    [tags]=\"getTags(advancedFilter.filtersExpressionsTags) | async\"\n    [tagsLimit]=\"options.tagsLimit\"\n    (removeTag)=\"onRemoveFilterTag($event)\"\n    [restTagsDropdownPlacement]=\"['right', 'bottom', 'bottom-right', 'auto']\"\n  ></rx-filter-tags>\n</ng-container>\n\n<ng-template #filterOptionsCustomAreaTemplate>\n  <div class=\"p-3 pt-4 pb-4\" *ngIf=\"this.groupFilterItems.length > 1\">\n    <adapt-accordion>\n      <adapt-accordion-tab [title]=\"'Show filters for: ' + getGroupFilterName(groupFilterValue)\" [multiline]=\"true\">\n        <adapt-rx-radiobutton-group\n          class=\"advanced-filter__radiobutton-group\"\n          [ngModel]=\"groupFilterValue\"\n          (ngModelChange)=\"onGroupFilterValueModelChange($event)\"\n        >\n          <adapt-rx-radiobutton\n            name=\"booleanTypeGroup\"\n            class=\"advanced-filter__radiobutton\"\n            *ngFor=\"let groupItem of groupFilterItems\"\n            [value]=\"groupItem.value\"\n            [label]=\"groupItem.name\"\n          >\n          </adapt-rx-radiobutton>\n        </adapt-rx-radiobutton-group>\n      </adapt-accordion-tab>\n    </adapt-accordion>\n  </div>\n</ng-template>\n\n<rx-advanced-filtering-fields-provider\n  [namedFilterOptionsGetter]=\"getNamedFilterOptions\"\n></rx-advanced-filtering-fields-provider>\n", styles: [":host ::ng-deep .filter-tags__tag-text{max-width:185px!important}\n"], components: [{ type: i10.AdaptAdvancedFilterComponent, selector: "adapt-advanced-filter", inputs: ["filterOptions", "savedFilters", "enableDefaultSavedFilter", "defaultSavedFilterId", "busyConfig", "activeSavedFilter", "disableExpressionEditing", "showAnchorButtonLabel", "getCustomExpressionTagFieldModel", "enableSavedFilters", "applyFiltersByUserAction", "canCloseDropdownResolver", "showTabToolbar", "disabledTabResolver", "disabledInputResolver", "showSelectedFiltersCount", "selectedFiltersIndicationStyle", "filterOptionsCustomAreaTemplate", "showTags", "anchorDisabled", "fullWidthEdit", "translateFilterEditingTitleXPixels", "selectedFilters", "isLoading"], outputs: ["selectedFiltersChange", "filterSelectionChange", "deleteSavedFilter", "createNewFilter", "updateSavedFilter", "beforeActiveSavedFilterChange", "activeSavedFilterChange", "removeTag", "filtersCleared", "saveNewFilterClick", "filtersSelectionCanceled", "editSavedFilterClick", "markDefaultSavedFilterClick", "editingSavedFilterCanceled", "filterExpressionTagsChanged"] }, { type: i11.FilterTagsComponent, selector: "rx-filter-tags", inputs: ["tags", "isDisabled", "tagsLimit", "restTagsDropdownPlacement"], outputs: ["removeTag"] }, { type: i10.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i10.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }, { type: i10.AdaptRxRadiobuttonGroupComponent, selector: "adapt-rx-radiobutton-group", inputs: ["formControlName"] }, { type: i10.AdaptRxRadiobuttonComponent, selector: "adapt-rx-radiobutton", inputs: ["name", "label", "id", "value", "checked", "disabled", "ariaLabel", "ariaLabeledBy", "ariaDescribedBy", "testID", "tabIndex"], outputs: ["onFocus", "onBlur", "checkedChange"] }, { type: i12.RxAdvancedFilteringFieldsProviderComponent, selector: "rx-advanced-filtering-fields-provider", inputs: ["namedFilterOptionsGetter"] }], directives: [{ type: i13.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i14.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i14.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i13.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "async": i13.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridFilterSelectControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-record-grid-filter-select-control',
                    templateUrl: './record-grid-filter-select-control.component.html',
                    styleUrls: ['./record-grid-filter-select-control.component.scss'],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: RecordGridFilterSelectControlComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.RxModalService }, { type: i2.RxRecordGridUtilsService }, { type: i3.RxRecordGridFilterConfigService }, { type: i4.RxRecordDefinitionCacheService }, { type: i5.RxRecordGridFilterService }, { type: i6.RxRecordGridFilterHelperService }, { type: i4.RxRecordDefinitionService }, { type: i7.RxGuidService }, { type: i8.RxRecordGridAdvancedFilteringService }, { type: i9.RxGlobalCacheService }, { type: i9.RxDefinitionNameService }]; }, propDecorators: { options: [{
                type: Input
            }], fieldsProvider: [{
                type: ViewChild,
                args: [RxAdvancedFilteringFieldsProviderComponent, { static: true }]
            }] } });
//# sourceMappingURL=record-grid-filter-select-control.component.js.map