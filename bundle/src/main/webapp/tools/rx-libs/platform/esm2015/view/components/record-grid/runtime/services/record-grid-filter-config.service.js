import { Injectable } from '@angular/core';
import { AdvancedFilterOptionDataType, booleanDataTypeBlankValue } from '@bmc-ux/adapt-angular';
import { RecordFieldOption, RX_RECORD_DEFINITION, RxRecordInstanceUtilsService } from '@helix/platform/record/api';
import { RxDefinitionNameService } from '@helix/platform/shared/api';
import { RxNumberUtilsService } from '@helix/platform/utils';
import { TranslateService } from '@ngx-translate/core';
import { castArray, chain, compact, find, get, isEmpty, isString, map as _map } from 'lodash';
import moment from 'moment-es6';
import { of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { RxRecordGridUtilsService } from '../../common/services/record-grid-utils.service';
import { QueryFiltersLogic } from '../types/query-filters-logic.enum';
import { RecordGridFilterDataLogic, RecordGridFilterOperator, RecordGridNamedFilterOptionKey } from '@helix/platform/view/api';
import { RxRecordGridFilterService } from './record-grid-filter.service';
import { RX_RECORD_GRID } from '../../record-grid.constant';
import { RxRecordGridAdvancedFilterValue } from '../../common/types/record-grid-advanced-filter-value.class';
import { RxNamedListService } from '@helix/platform/named-list/api';
import * as i0 from "@angular/core";
import * as i1 from "./record-grid-filter.service";
import * as i2 from "@helix/platform/utils";
import * as i3 from "@helix/platform/named-list/api";
import * as i4 from "@ngx-translate/core";
import * as i5 from "@helix/platform/record/api";
import * as i6 from "../../common/services/record-grid-utils.service";
import * as i7 from "@helix/platform/shared/api";
export class RxRecordGridFilterConfigService {
    constructor(rxRecordGridFilterService, rxNumberUtilsService, rxNamedListService, translateService, rxRecordInstanceUtilsService, rxRecordGridUtilsService, rxDefinitionNameService) {
        this.rxRecordGridFilterService = rxRecordGridFilterService;
        this.rxNumberUtilsService = rxNumberUtilsService;
        this.rxNamedListService = rxNamedListService;
        this.translateService = translateService;
        this.rxRecordInstanceUtilsService = rxRecordInstanceUtilsService;
        this.rxRecordGridUtilsService = rxRecordGridUtilsService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.associatedFieldIdPatternRegExp = new RegExp(`'(${RX_RECORD_GRID.associatedFieldIdPrefixPattern}\\d+)'`, 'g');
    }
    getConfigs() {
        const textColumnFilterConfig = {
            filterOptionDataType: AdvancedFilterOptionDataType.string,
            getQueryFilter: (filterTag, fieldDefinition, fieldId, namedFilterOptions) => {
                const selectedNamedOptionExpressions = this.getSelectedNamedOptionExpressions(namedFilterOptions, filterTag);
                const builtQuery = chain(filterTag.value.filterValue)
                    .filter(Boolean)
                    .map((optionValue) => {
                    const { isLikeOperation, filterValue } = this.rxRecordGridFilterService.getStringDataTypeFilterData(get(optionValue, 'value', optionValue), fieldDefinition);
                    return this.rxRecordGridFilterService.buildQueryFilter(fieldId, isLikeOperation ? 'like' : '=', filterValue.trim());
                })
                    .concat(selectedNamedOptionExpressions)
                    .value();
                return this.rxRecordGridFilterService.joinQueryFilters(builtQuery, QueryFiltersLogic.Or);
            },
            getRecordGridFilterData: (value, fieldDefinition, fieldId, namedFilterOptions) => {
                const namedFilterOptionOperators = this.getNamedFilterOptionsOperators(value, fieldId);
                const filterOperators = value.filterValue.map((filterValue) => {
                    const operators = this.getRecordGridFilterOperator(RecordGridFilterOperator.Eq, fieldId, get(filterValue, 'value', filterValue).trim());
                    const displayValue = get(filterValue, 'displayValue');
                    if (fieldDefinition.namedListDefinition && displayValue) {
                        operators.eq['$DISPLAYVALUE$'] = displayValue;
                    }
                    return operators;
                });
                return {
                    or: filterOperators.concat(namedFilterOptionOperators)
                };
            },
            getSelectedAdvancedFilterData: (filterLogic, filterOperators, fieldDefinition, fieldId) => {
                const filterValues = [];
                const namedListFilterValues = [];
                const namedFilterOptionsGuids = [];
                if (filterLogic === RecordGridFilterDataLogic.Or) {
                    filterOperators.forEach((filterOperator) => {
                        const operator = Object.keys(filterOperator)[0];
                        const value = filterOperator[operator][fieldId];
                        if (isString(value)) {
                            if (fieldDefinition.namedListDefinition) {
                                const displayValue = filterOperator[operator]['$DISPLAYVALUE$'];
                                namedListFilterValues.push({ displayValue, value, title: '', contextualFields: [] });
                            }
                            else {
                                filterValues.push(value);
                            }
                        }
                        else if (value[RecordGridNamedFilterOptionKey]) {
                            namedFilterOptionsGuids.push(value[RecordGridNamedFilterOptionKey]);
                        }
                    });
                }
                const rxRecordGridAdvancedFilterValue = isEmpty(namedListFilterValues)
                    ? new RxRecordGridAdvancedFilterValue(filterValues, namedFilterOptionsGuids)
                    : new RxRecordGridAdvancedFilterValue(namedListFilterValues, namedFilterOptionsGuids);
                return {
                    filterOptionId: fieldId,
                    value: rxRecordGridAdvancedFilterValue
                };
            },
            getToolbarTagInfo: ({ primaryRecordDefinition, value, tag, fieldId, namedFilterOptions }) => {
                const fieldLocator = this.rxRecordGridUtilsService.getFieldLocator(fieldId);
                let associationDescriptor;
                return this.rxRecordGridUtilsService.getAssociationDescriptor(fieldId, primaryRecordDefinition).pipe(mergeMap((loadedAssociationDescriptor) => {
                    associationDescriptor = loadedAssociationDescriptor;
                    return this.rxRecordGridUtilsService.getDisplayFieldDescriptor(fieldId, primaryRecordDefinition, associationDescriptor && associationDescriptor.recordDefinitionName);
                }), mergeMap((displayFieldDefinition) => {
                    const isRecordDisplayField = fieldLocator.fieldId !== String(displayFieldDefinition.id);
                    let displayValuesData$;
                    if (isRecordDisplayField) {
                        const filterValues = this.rxNamedListService.getNamesFromTypeAheadOptions(value.filterValue);
                        displayValuesData$ = this.rxRecordInstanceUtilsService
                            .getFieldValues(associationDescriptor.recordDefinitionName, filterValues, [
                            String(RX_RECORD_DEFINITION.coreFieldIds.id),
                            String(displayFieldDefinition.id)
                        ])
                            .pipe(map((displayValueRows) => {
                            const nameWithAssociationLabel = compact([
                                this.rxDefinitionNameService.getDisplayName(associationDescriptor.associationDefinition.name),
                                displayFieldDefinition.name
                            ]).join(' > ');
                            const displayValues = value.filterValue.map((strFilterValue) => {
                                const row = find(displayValueRows, (displayValueRow) => displayValueRow[RX_RECORD_DEFINITION.coreFieldIds.id] === strFilterValue);
                                return row ? row[displayFieldDefinition.id] : strFilterValue;
                            });
                            return {
                                displayValues: new RxRecordGridAdvancedFilterValue(displayValues),
                                label: nameWithAssociationLabel
                            };
                        }));
                    }
                    else {
                        displayValuesData$ = of({ displayValues: value, label: tag.data.filterOption.label });
                    }
                    return displayValuesData$.pipe(map(({ displayValues, label }) => {
                        const displayTagValue = displayValues.filterValue
                            .map((filterValue) => {
                            var _a, _b;
                            const filterValueExpression = get(filterValue, 'value', filterValue);
                            const filterDisplayText = (_a = get(filterValue, 'displayValue')) !== null && _a !== void 0 ? _a : get(filterValue, 'value', filterValue);
                            const text = filterValueExpression === '$USER$'
                                ? this.translateService.instant('com.bmc.arsys.rx.client.view-components.record-grid.filters.me.label')
                                : filterDisplayText;
                            const tooltip = (filterValue === null || filterValue === void 0 ? void 0 : filterValue.displayValue)
                                ? `${filterValue.displayValue} (${filterValue.value})`
                                : (_b = filterValue === null || filterValue === void 0 ? void 0 : filterValue.value) !== null && _b !== void 0 ? _b : filterValue;
                            return { tooltip, text };
                        })
                            .concat(displayValues.namedOptions.map((namedOption) => {
                            var _a;
                            const namedFilterOption = ((_a = namedFilterOptions.find((option) => option.guid === namedOption)) === null || _a === void 0 ? void 0 : _a.title) || namedOption;
                            return { text: namedFilterOption, tooltip: namedFilterOption };
                        }));
                        const displayText = displayTagValue.map((tagInfo) => tagInfo.text).join(', ');
                        const tooltip = displayTagValue.map((tagInfo) => tagInfo.tooltip).join(', ');
                        return {
                            text: `${label}: ${displayText}`,
                            tooltip: `${label}: ${tooltip}`
                        };
                    }));
                }));
            },
            getDataForAdvancedFilter: (fieldDefinition) => fieldDefinition
        };
        const numericColumnFilterConfig = {
            filterOptionDataType: AdvancedFilterOptionDataType.number,
            getQueryFilter: (filterTag, fieldDefinition, fieldId, namedFilterOptions) => {
                const selectedNamedOptionExpressions = this.getSelectedNamedOptionExpressions(namedFilterOptions, filterTag);
                const [fromValue, toValue] = filterTag.value.filterValue;
                const queries = [];
                if (this.rxNumberUtilsService.isFiniteOrNumberString(fromValue)) {
                    queries.push(this.rxRecordGridFilterService.buildQueryFilter(fieldId, '>=', String(fromValue)));
                }
                if (this.rxNumberUtilsService.isFiniteOrNumberString(toValue)) {
                    queries.push(this.rxRecordGridFilterService.buildQueryFilter(fieldId, '<=', String(toValue)));
                }
                const valueQuery = this.rxRecordGridFilterService.joinQueryFilters(queries, QueryFiltersLogic.And);
                return this.rxRecordGridFilterService.joinQueryFilters(valueQuery ? [valueQuery, ...selectedNamedOptionExpressions] : selectedNamedOptionExpressions, QueryFiltersLogic.Or);
            },
            getRecordGridFilterData: (value, fieldDefinition, fieldId) => {
                const [fromValue, toValue] = value.filterValue;
                const queries = [];
                if (this.rxNumberUtilsService.isFiniteOrNumberString(fromValue)) {
                    queries.push(this.getRecordGridFilterOperator(RecordGridFilterOperator.Gte, fieldId, String(fromValue)));
                }
                if (this.rxNumberUtilsService.isFiniteOrNumberString(toValue)) {
                    queries.push(this.getRecordGridFilterOperator(RecordGridFilterOperator.Lte, fieldId, String(toValue)));
                }
                return this.getFilterRangeDataOperator(queries, this.getNamedFilterOptionsOperators(value, fieldId));
            },
            getDataForAdvancedFilter: (fieldDefinition) => {
                return {
                    minValue: fieldDefinition.minValue,
                    maxValue: fieldDefinition.maxValue
                };
            },
            getSelectedAdvancedFilterData: (filterLogic, filterOperators, fieldDefinition, fieldId) => {
                /**
                 * Convert from:
                 *
                 *  "and": [
                 *    {
                 *      "gte": {
                 *        "536870917": -5
                 *      }
                 *    },
                 *    {
                 *      "lte": {
                 *        "536870917": -1 // or "-1"
                 *      }
                 *    }
                 *  ]
                 *
                 * to:
                 *
                 * {
                 *   filterOptionId: '536870917',
                 *   value: [-5, -1]
                 * }
                 *
                 */
                let filterValue = [null, null];
                const processRange = (operators) => {
                    const gteOperator = find(operators, (filterOperator) => filterOperator[RecordGridFilterOperator.Gte]);
                    if (gteOperator) {
                        const fromValue = parseFloat(gteOperator[RecordGridFilterOperator.Gte][fieldId]);
                        if (this.rxNumberUtilsService.isFiniteOrNumberString(fromValue)) {
                            filterValue[0] = fromValue;
                        }
                    }
                    const lteOperator = find(operators, (filterOperator) => filterOperator[RecordGridFilterOperator.Lte]);
                    if (lteOperator) {
                        const toValue = parseFloat(lteOperator[RecordGridFilterOperator.Lte][fieldId]);
                        if (this.rxNumberUtilsService.isFiniteOrNumberString(toValue)) {
                            filterValue[1] = toValue;
                        }
                    }
                };
                if (filterLogic === RecordGridFilterDataLogic.And) {
                    processRange(filterOperators);
                }
                else if (filterLogic === RecordGridFilterDataLogic.Or) {
                    const andOperator = find(filterOperators, (filterOperator) => filterOperator[RecordGridFilterDataLogic.And]);
                    if (andOperator) {
                        processRange(andOperator[RecordGridFilterDataLogic.And]);
                    }
                    else if (filterOperators.length === 1) {
                        let eqValue = filterOperators[0][RecordGridFilterOperator.Eq][fieldId];
                        if (eqValue !== '$NULL$' && !eqValue[RecordGridNamedFilterOptionKey]) {
                            eqValue = parseFloat(eqValue);
                            filterValue = [eqValue, eqValue];
                        }
                    }
                }
                const namedFilterOptionGuids = this.getNamedFilterOptionGuids(filterOperators, fieldId);
                return {
                    filterOptionId: fieldId,
                    value: new RxRecordGridAdvancedFilterValue(filterValue, namedFilterOptionGuids)
                };
            }
        };
        return {
            [RX_RECORD_DEFINITION.resourceTypes.character]: textColumnFilterConfig,
            [RX_RECORD_DEFINITION.resourceTypes.localizedCharacter]: textColumnFilterConfig,
            [RX_RECORD_DEFINITION.resourceTypes.attachment]: textColumnFilterConfig,
            [RX_RECORD_DEFINITION.resourceTypes.integer]: numericColumnFilterConfig,
            [RX_RECORD_DEFINITION.resourceTypes.decimal]: numericColumnFilterConfig,
            [RX_RECORD_DEFINITION.resourceTypes.real]: numericColumnFilterConfig,
            [RX_RECORD_DEFINITION.resourceTypes.selection]: {
                filterOptionDataType: AdvancedFilterOptionDataType.selection,
                getQueryFilter: (filterTag, fieldDefinition, fieldId, namedFilterOptions) => {
                    const selectedNamedOptionExpressions = this.getSelectedNamedOptionExpressions(namedFilterOptions, filterTag);
                    return this.rxRecordGridFilterService.joinQueryFilters(filterTag.value.filterValue
                        .map((filterValue) => this.rxRecordGridFilterService.buildQueryFilter(fieldId, '=', filterValue))
                        .concat(selectedNamedOptionExpressions), QueryFiltersLogic.Or);
                },
                getDataForAdvancedFilter: (fieldDefinition) => {
                    const selectOptions = _map(fieldDefinition.optionLabelsById, (label, optionId) => ({
                        id: optionId,
                        name: label
                    }));
                    if (fieldDefinition.fieldOption === RX_RECORD_DEFINITION.fieldOptions.optional) {
                        selectOptions.unshift({
                            id: '$NULL$',
                            name: this.translateService.instant('com.bmc.arsys.rx.client.view-components.record-grid.filters.blank.label')
                        });
                    }
                    return {
                        selectOptions,
                        selectTexts: null
                    };
                },
                getRecordGridFilterData: (value, fieldDefinition, fieldId) => {
                    const namedFilterOptionOperators = this.getNamedFilterOptionsOperators(value, fieldId);
                    return {
                        or: value.filterValue
                            .map((optionId) => {
                            return this.getRecordGridFilterOperator(RecordGridFilterOperator.Eq, fieldId, optionId);
                        })
                            .concat(namedFilterOptionOperators)
                    };
                },
                getSelectedAdvancedFilterData: (filterLogic, filterOperators, fieldDefinition, fieldId) => {
                    const filterValue = [];
                    const namedFilterOptionsGuids = [];
                    if (filterLogic === RecordGridFilterDataLogic.Or) {
                        filterOperators.forEach((filterOperator) => {
                            const operator = Object.keys(filterOperator)[0];
                            if (operator === RecordGridFilterOperator.Eq) {
                                const value = filterOperator[operator][fieldId];
                                if (isString(value)) {
                                    filterValue.push(value);
                                }
                                else if (value[RecordGridNamedFilterOptionKey]) {
                                    namedFilterOptionsGuids.push(value[RecordGridNamedFilterOptionKey]);
                                }
                            }
                        });
                    }
                    return {
                        filterOptionId: fieldId,
                        value: new RxRecordGridAdvancedFilterValue(filterValue, namedFilterOptionsGuids)
                    };
                }
            },
            [RX_RECORD_DEFINITION.resourceTypes.timeOnly]: {
                filterOptionDataType: AdvancedFilterOptionDataType.time,
                getQueryFilter: (filterTag, fieldDefinition, fieldId, namedFilterOptions) => {
                    const selectedNamedOptionExpressions = this.getSelectedNamedOptionExpressions(namedFilterOptions, filterTag);
                    const [fromValue, toValue] = filterTag.value.filterValue.map((value) => moment(value));
                    const queries = [];
                    if (fromValue && fromValue.isValid()) {
                        queries.push(this.rxRecordGridFilterService.buildQueryFilter(fieldId, '>=', fromValue.format('HH:mm:ss')));
                    }
                    if (toValue && toValue.isValid()) {
                        queries.push(this.rxRecordGridFilterService.buildQueryFilter(fieldId, '<=', toValue.format('HH:mm:ss')));
                    }
                    const valueQuery = this.rxRecordGridFilterService.joinQueryFilters(queries, QueryFiltersLogic.And);
                    return this.rxRecordGridFilterService.joinQueryFilters(valueQuery ? [valueQuery, ...selectedNamedOptionExpressions] : selectedNamedOptionExpressions, QueryFiltersLogic.Or);
                },
                getRecordGridFilterData: (value, fieldDefinition, fieldId) => {
                    const [fromValue, toValue] = value.filterValue.map((value) => moment(value));
                    const queries = [];
                    if (fromValue) {
                        queries.push(this.getRecordGridFilterOperator(RecordGridFilterOperator.Gte, fieldId, fromValue && fromValue.isValid() ? fromValue.format('HH:mm:ss') : ''));
                    }
                    if (toValue) {
                        queries.push(this.getRecordGridFilterOperator(RecordGridFilterOperator.Lte, fieldId, toValue && toValue.isValid() ? toValue.format('HH:mm:ss') : ''));
                    }
                    return this.getFilterRangeDataOperator(queries, this.getNamedFilterOptionsOperators(value, fieldId));
                },
                getSelectedAdvancedFilterData: (filterLogic, filterOperators, fieldDefinition, fieldId) => {
                    let filterValue = [null, null];
                    const processRange = (operators) => {
                        const gteOperator = find(operators, (filterOperator) => filterOperator[RecordGridFilterOperator.Gte]);
                        if (gteOperator) {
                            const fromValue = moment(gteOperator[RecordGridFilterOperator.Gte][fieldId], 'LTS');
                            if (fromValue.isValid()) {
                                filterValue[0] = fromValue;
                            }
                        }
                        const lteOperator = find(operators, (filterOperator) => filterOperator[RecordGridFilterOperator.Lte]);
                        if (lteOperator) {
                            const toValue = moment(lteOperator[RecordGridFilterOperator.Lte][fieldId], 'LTS');
                            if (toValue.isValid()) {
                                filterValue[1] = toValue;
                            }
                        }
                    };
                    if (filterLogic === RecordGridFilterDataLogic.And) {
                        processRange(filterOperators);
                    }
                    else if (filterLogic === RecordGridFilterDataLogic.Or) {
                        const andOperator = find(filterOperators, (filterOperator) => filterOperator[RecordGridFilterDataLogic.And]);
                        if (andOperator) {
                            processRange(andOperator[RecordGridFilterDataLogic.And]);
                        }
                        else if (filterOperators.length === 1) {
                            let eqValue = filterOperators[0][RecordGridFilterOperator.Eq][fieldId];
                            if (eqValue !== '$NULL$' && !eqValue[RecordGridNamedFilterOptionKey]) {
                                eqValue = moment(eqValue, 'LTS');
                                filterValue = [eqValue, eqValue];
                            }
                        }
                    }
                    const namedFilterOptionGuids = this.getNamedFilterOptionGuids(filterOperators, fieldId);
                    return {
                        filterOptionId: fieldId,
                        value: new RxRecordGridAdvancedFilterValue(filterValue, namedFilterOptionGuids)
                    };
                }
            },
            [RX_RECORD_DEFINITION.resourceTypes.dateOnly]: {
                filterOptionDataType: AdvancedFilterOptionDataType.date,
                getQueryFilter: (filterTag, fieldDefinition, fieldId, namedFilterOptions) => {
                    const selectedNamedOptionExpressions = this.getSelectedNamedOptionExpressions(namedFilterOptions, filterTag);
                    const [fromValue, toValue] = filterTag.value.filterValue.map((value) => moment(value));
                    const queries = [];
                    if (fromValue && fromValue.isValid()) {
                        queries.push(this.rxRecordGridFilterService.buildQueryFilter(fieldId, '>=', fromValue.format('YYYY-MM-DD')));
                    }
                    if (toValue && toValue.isValid()) {
                        queries.push(this.rxRecordGridFilterService.buildQueryFilter(fieldId, '<=', toValue.format('YYYY-MM-DD')));
                    }
                    const valueQuery = this.rxRecordGridFilterService.joinQueryFilters(queries, QueryFiltersLogic.And);
                    return this.rxRecordGridFilterService.joinQueryFilters(valueQuery ? [valueQuery, ...selectedNamedOptionExpressions] : selectedNamedOptionExpressions, QueryFiltersLogic.Or);
                },
                getRecordGridFilterData: (value, fieldDefinition, fieldId) => {
                    const [fromValue, toValue] = value.filterValue.map((value) => moment(value));
                    const queries = [];
                    if (fromValue) {
                        queries.push(this.getRecordGridFilterOperator(RecordGridFilterOperator.Gte, fieldId, fromValue && fromValue.isValid() ? fromValue.format('YYYY-MM-DD') : ''));
                    }
                    if (toValue) {
                        queries.push(this.getRecordGridFilterOperator(RecordGridFilterOperator.Lte, fieldId, toValue && toValue.isValid() ? toValue.format('YYYY-MM-DD') : ''));
                    }
                    return this.getFilterRangeDataOperator(queries, this.getNamedFilterOptionsOperators(value, fieldId));
                },
                getSelectedAdvancedFilterData: (filterLogic, filterOperators, fieldDefinition, fieldId) => {
                    return this.getDateSelectedAdvancedFilterData(fieldId, filterLogic, filterOperators);
                }
            },
            [RX_RECORD_DEFINITION.resourceTypes.dateTime]: {
                filterOptionDataType: AdvancedFilterOptionDataType.datetime,
                getQueryFilter: (filterTag, fieldDefinition, fieldId, namedFilterOptions) => {
                    const selectedNamedOptionExpressions = this.getSelectedNamedOptionExpressions(namedFilterOptions, filterTag);
                    const [fromValue, toValue] = filterTag.value.filterValue.map((value) => moment(value));
                    const queries = [];
                    if (fromValue === null || fromValue === void 0 ? void 0 : fromValue.isValid()) {
                        queries.push(this.rxRecordGridFilterService.buildQueryFilter(fieldId, '>=', fromValue.toISOString()));
                    }
                    if (toValue === null || toValue === void 0 ? void 0 : toValue.isValid()) {
                        queries.push(this.rxRecordGridFilterService.buildQueryFilter(fieldId, '<=', toValue.toISOString()));
                    }
                    const valueQuery = this.rxRecordGridFilterService.joinQueryFilters(queries, QueryFiltersLogic.And);
                    return this.rxRecordGridFilterService.joinQueryFilters(valueQuery ? [valueQuery, ...selectedNamedOptionExpressions] : selectedNamedOptionExpressions, QueryFiltersLogic.Or);
                },
                getRecordGridFilterData: (value, fieldDefinition, fieldId) => {
                    const [fromValue, toValue] = value.filterValue.map((value) => moment(value));
                    const queries = [];
                    if (fromValue === null || fromValue === void 0 ? void 0 : fromValue.isValid()) {
                        queries.push(this.getRecordGridFilterOperator(RecordGridFilterOperator.Gte, fieldId, fromValue.toISOString()));
                    }
                    if (toValue === null || toValue === void 0 ? void 0 : toValue.isValid()) {
                        queries.push(this.getRecordGridFilterOperator(RecordGridFilterOperator.Lte, fieldId, toValue.toISOString()));
                    }
                    return this.getFilterRangeDataOperator(queries, this.getNamedFilterOptionsOperators(value, fieldId));
                },
                getSelectedAdvancedFilterData: (filterLogic, filterOperators, fieldDefinition, fieldId) => {
                    return this.getDateSelectedAdvancedFilterData(fieldId, filterLogic, filterOperators);
                }
            },
            [RX_RECORD_DEFINITION.resourceTypes.boolean]: {
                filterOptionDataType: AdvancedFilterOptionDataType.boolean,
                getQueryFilter: (filterTag, fieldDefinition, fieldId, namedFilterOptions) => {
                    const selectedNamedOptionExpressions = this.getSelectedNamedOptionExpressions(namedFilterOptions, filterTag);
                    return this.rxRecordGridFilterService.joinQueryFilters(castArray(filterTag.value.filterValue)
                        .map((filterValue) => this.rxRecordGridFilterService.buildQueryFilter(fieldId, '=', this.getBooleanFilterValue(filterValue)))
                        .concat(selectedNamedOptionExpressions), QueryFiltersLogic.Or);
                },
                getRecordGridFilterData: (value, fieldDefinition, fieldId) => {
                    return {
                        or: castArray(value.filterValue)
                            .map((filterValue) => this.getRecordGridFilterOperator(RecordGridFilterOperator.Eq, fieldId, this.getBooleanFilterValue(filterValue)))
                            .concat(this.getNamedFilterOptionsOperators(value, fieldId))
                    };
                },
                getDataForAdvancedFilter: (fieldDefinition) => {
                    return {
                        selectOptions: [
                            {
                                name: this.translateService.instant('com.bmc.arsys.rx.client.common.true'),
                                id: true
                            },
                            {
                                name: this.translateService.instant('com.bmc.arsys.rx.client.common.false'),
                                id: false
                            },
                            {
                                name: this.translateService.instant('com.bmc.arsys.rx.client.view-components.record-grid.filters.blank.label'),
                                id: 'blank'
                            }
                        ],
                        isRequired: fieldDefinition.fieldOption === RecordFieldOption.Required
                    };
                },
                getSelectedAdvancedFilterData: (filterLogic, filterOperators, fieldDefinition, fieldId) => {
                    let filterValue;
                    if (fieldDefinition.fieldOption === RecordFieldOption.Required) {
                        if (filterOperators.length === 1) {
                            const eqOperator = find(filterOperators, (filterOperator) => filterOperator[RecordGridFilterOperator.Eq]);
                            if (eqOperator) {
                                const savedFilterValue = eqOperator[RecordGridFilterOperator.Eq][fieldId];
                                if (savedFilterValue === '$NULL$') {
                                    filterValue = null;
                                }
                                else {
                                    filterValue = [savedFilterValue === 'true'];
                                }
                            }
                        }
                        else {
                            filterValue = null;
                        }
                    }
                    else {
                        filterValue = [];
                        if (filterLogic === RecordGridFilterDataLogic.Or) {
                            filterOperators.forEach((filterOperator) => {
                                const operator = Object.keys(filterOperator)[0];
                                if (operator === RecordGridFilterOperator.Eq) {
                                    const value = filterOperator[operator][fieldId];
                                    if (!value[RecordGridNamedFilterOptionKey]) {
                                        switch (value) {
                                            case 'true':
                                                filterValue.push(true);
                                                break;
                                            case '$NULL$':
                                                filterValue.push(booleanDataTypeBlankValue);
                                                break;
                                            default:
                                                filterValue.push(false);
                                                break;
                                        }
                                    }
                                }
                            });
                        }
                    }
                    const namedFilterOptionGuids = this.getNamedFilterOptionGuids(filterOperators, fieldId);
                    return filterValue
                        ? {
                            filterOptionId: fieldId,
                            value: new RxRecordGridAdvancedFilterValue(filterValue, namedFilterOptionGuids)
                        }
                        : null;
                }
            },
            [RX_RECORD_DEFINITION.resourceTypes.recordInstance]: null,
            [RX_RECORD_DEFINITION.resourceTypes.object]: null,
            [RX_RECORD_DEFINITION.resourceTypes.recordInstanceProcessVariable]: null,
            [RX_RECORD_DEFINITION.resourceTypes.localizedFieldInstance]: null
        };
    }
    getDateSelectedAdvancedFilterData(fieldId, filterLogic, filterOperators) {
        let filterValue = [null, null];
        const processRange = (operators) => {
            const gteOperator = find(operators, (filterOperator) => filterOperator[RecordGridFilterOperator.Gte]);
            if (gteOperator) {
                const fromValue = moment(gteOperator[RecordGridFilterOperator.Gte][fieldId]);
                if (fromValue.isValid()) {
                    filterValue[0] = fromValue;
                }
            }
            const lteOperator = find(operators, (filterOperator) => filterOperator[RecordGridFilterOperator.Lte]);
            if (lteOperator) {
                const toValue = moment(lteOperator[RecordGridFilterOperator.Lte][fieldId]);
                if (toValue.isValid()) {
                    filterValue[1] = toValue;
                }
            }
        };
        if (filterLogic === RecordGridFilterDataLogic.And) {
            processRange(filterOperators);
        }
        else if (filterLogic === RecordGridFilterDataLogic.Or) {
            const andOperator = find(filterOperators, (filterOperator) => filterOperator[RecordGridFilterDataLogic.And]);
            if (andOperator) {
                processRange(andOperator[RecordGridFilterDataLogic.And]);
            }
            else if (filterOperators.length === 1) {
                let eqValue = filterOperators[0][RecordGridFilterOperator.Eq][fieldId];
                if (eqValue !== '$NULL$' && !eqValue[RecordGridNamedFilterOptionKey]) {
                    eqValue = moment(eqValue);
                    filterValue = [eqValue, eqValue];
                }
            }
        }
        return {
            filterOptionId: fieldId,
            value: new RxRecordGridAdvancedFilterValue(filterValue, this.getNamedFilterOptionGuids(filterOperators, fieldId))
        };
    }
    getFilterRangeDataOperator(queries, namedFilterOptionOperators) {
        const andOperator = {
            and: queries
        };
        if (namedFilterOptionOperators.length) {
            return {
                or: queries.length ? namedFilterOptionOperators.concat(andOperator) : namedFilterOptionOperators
            };
        }
        else {
            return andOperator;
        }
    }
    getNamedFilterOptionGuids(filterOperators, fieldId) {
        return filterOperators
            .filter((filterOperator) => filterOperator[RecordGridFilterOperator.Eq])
            .map((operator) => {
            const operatorElementElement = operator[RecordGridFilterOperator.Eq][fieldId];
            return operatorElementElement ? operatorElementElement[RecordGridNamedFilterOptionKey] : null;
        })
            .filter((guid) => Boolean(guid));
    }
    getSelectedNamedOptionExpressions(namedFilterOptions, filterTag) {
        return namedFilterOptions
            .filter((option) => filterTag.value.namedOptions.includes(option.guid))
            .map((option) => option.filterExpression.replace(this.associatedFieldIdPatternRegExp, '${$1}'));
    }
    getNamedFilterOptionsOperators(value, fieldId) {
        return value.namedOptions.map((guid) => this.getRecordGridFilterOperator(RecordGridFilterOperator.Eq, fieldId, {
            [RecordGridNamedFilterOptionKey]: guid
        }));
    }
    getRecordGridFilterOperator(operator, fieldId, value) {
        return { [operator]: { [fieldId]: value } };
    }
    getBooleanFilterValue(filterValue) {
        return filterValue ? (filterValue === booleanDataTypeBlankValue ? '$NULL$' : 'true') : 'false';
    }
}
RxRecordGridFilterConfigService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordGridFilterConfigService, deps: [{ token: i1.RxRecordGridFilterService }, { token: i2.RxNumberUtilsService }, { token: i3.RxNamedListService }, { token: i4.TranslateService }, { token: i5.RxRecordInstanceUtilsService }, { token: i6.RxRecordGridUtilsService }, { token: i7.RxDefinitionNameService }], target: i0.ɵɵFactoryTarget.Injectable });
RxRecordGridFilterConfigService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordGridFilterConfigService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordGridFilterConfigService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.RxRecordGridFilterService }, { type: i2.RxNumberUtilsService }, { type: i3.RxNamedListService }, { type: i4.TranslateService }, { type: i5.RxRecordInstanceUtilsService }, { type: i6.RxRecordGridUtilsService }, { type: i7.RxDefinitionNameService }]; } });
//# sourceMappingURL=record-grid-filter-config.service.js.map