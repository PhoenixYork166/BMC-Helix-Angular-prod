import { Injectable } from '@angular/core';
import { RX_RECORD_DEFINITION, RxRecordDefinitionService } from '@helix/platform/record/api';
import { RxJsonParserService, RxObjectUtilsService, RxStringService } from '@helix/platform/utils';
import { RecordGridFilterDataLogic, RecordGridFilterOperator, RecordGridNamedFilterOptionKey } from '@helix/platform/view/api';
import { every, filter as _filter, find, findKey, get, has, includes, intersection, isEmpty, isString, keys, map as _map, reduce, some, values } from 'lodash';
import moment from 'moment-es6';
import { forkJoin, of } from 'rxjs';
import { defaultIfEmpty, filter, map } from 'rxjs/operators';
import { RxRecordGridAdvancedFilteringService } from '../../common/services/record-grid-advanced-filtering.service';
import { RxRecordGridUtilsService } from '../../common/services/record-grid-utils.service';
import { QueryFiltersLogic } from '../types/query-filters-logic.enum';
import { RxRecordGridAdvancedFilterValue } from '../../common/types/record-grid-advanced-filter-value.class';
import { RxRecordGridFilterHelperService } from '../../common/services/record-grid-filter-helper.service';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/utils";
import * as i2 from "../../common/services/record-grid-utils.service";
import * as i3 from "../../common/services/record-grid-advanced-filtering.service";
import * as i4 from "@helix/platform/record/api";
import * as i5 from "../../common/services/record-grid-filter-helper.service";
export class RxRecordGridFilterService {
    constructor(rxStringService, rxRecordGridUtilsService, rxJsonParserService, rxRecordGridAdvancedFilteringService, rxRecordDefinitionService, rxObjectUtilsService, rxRecordGridFilterHelperService) {
        this.rxStringService = rxStringService;
        this.rxRecordGridUtilsService = rxRecordGridUtilsService;
        this.rxJsonParserService = rxJsonParserService;
        this.rxRecordGridAdvancedFilteringService = rxRecordGridAdvancedFilteringService;
        this.rxRecordDefinitionService = rxRecordDefinitionService;
        this.rxObjectUtilsService = rxObjectUtilsService;
        this.rxRecordGridFilterHelperService = rxRecordGridFilterHelperService;
        this.filtersKeywords = ['$NULL$', '$TIME$', '$DATE$', '$TIMESTAMP$', '$USER$'];
    }
    clearFilterData(node) {
        const nodeKeys = keys(node);
        let result = node;
        if (!isEmpty(nodeKeys)) {
            const operator = nodeKeys[0];
            switch (true) {
                case includes(['or', 'and'], operator): {
                    const children = node[operator].map(this.clearFilterData.bind(this)).filter((child) => Boolean(child));
                    if (!isEmpty(children)) {
                        node[operator] = children;
                    }
                    else {
                        result = null;
                    }
                    break;
                }
                case isString(node[operator]): {
                    result = null;
                    break;
                }
            }
        }
        return result;
    }
    getFilterForAvailableColumns(node, filterableColumns) {
        const nodeKeys = keys(node);
        let result = node;
        if (!isEmpty(nodeKeys)) {
            const operator = nodeKeys[0];
            const fieldId = Object.keys(node[operator])[0];
            switch (true) {
                case includes(['or', 'and'], operator): {
                    const children = node[operator]
                        .map((nodeChild) => this.getFilterForAvailableColumns(nodeChild, filterableColumns))
                        .filter((child) => Boolean(child));
                    if (!isEmpty(children)) {
                        node[operator] = children;
                    }
                    else {
                        result = null;
                    }
                    break;
                }
                case !some(filterableColumns, { fieldId }): {
                    result = null;
                    break;
                }
                case includes(['eq'], operator): {
                    const fieldDefinition = find(filterableColumns, { fieldId }).fieldDefinition;
                    // remove selection field filter option that is not available
                    if (fieldDefinition.resourceType === RX_RECORD_DEFINITION.resourceTypes.selection &&
                        !has(fieldDefinition.optionNamesById, node[operator][fieldId])) {
                        result = null;
                    }
                    break;
                }
            }
        }
        return result;
    }
    replaceKeywords(query) {
        const singleQuoteRegexTemplate = '([^|^"])"(' + this.filtersKeywords.join('|').replace(/\$/g, '\\$') + ')"(?!")';
        const tripleQuoteRegexTemplate = '([^|^"])"""(' + this.filtersKeywords.join('|').replace(/\$/g, '\\$') + ')"""(?!")';
        const singleQuoteRegex = new RegExp(singleQuoteRegexTemplate, 'g');
        const tripleQuoteRegex = new RegExp(tripleQuoteRegexTemplate, 'g');
        return query.replace(singleQuoteRegex, '$1$2').replace(tripleQuoteRegex, '$1"$2"');
    }
    generateTextFilterQuery(text, columns) {
        let filterQuery = null;
        if (text) {
            const query = columns
                .filter((column) => !column.hidden && column.searchable)
                .map((column) => {
                const fieldId = this.getQueryFilterField(column.field);
                let queryString = '';
                if (column.filterType === RX_RECORD_DEFINITION.dataTypes.character.shortName ||
                    column.filterType === RX_RECORD_DEFINITION.dataTypes.localizedCharacter.shortName) {
                    queryString = `${fieldId} LIKE "%${this.escapeDoubleQuotes(text).replace(/[%_]/g, '\\$&')}%"`;
                }
                else {
                    if (!isNaN(text)) {
                        queryString = `${fieldId} = "${this.escapeDoubleQuotes(text)}"`;
                    }
                }
                return queryString;
            })
                .filter(Boolean)
                .join(' OR ');
            filterQuery = query ? `(${query})` : '';
        }
        return filterQuery;
    }
    addQueries(...queries) {
        return _filter(queries, Boolean).join(' AND ');
    }
    joinQueryFilters(queries, logic) {
        const query = queries.join(logic === QueryFiltersLogic.And ? ' AND ' : ' OR ');
        return query ? `(${query})` : '';
    }
    /**
     * Convert saved filter preset data from:
     * {
     *   and: {
     *     "or": [
     *       {
     *         "eq": {
     *           "1": "bar"
     *         }
     *       },
     *       {
     *         "eq": {
     *           "1": "foo"
     *         }
     *       }
     *     ]
     *   }
     * }
     *
     *
     * to:
     * [{
     *   filterOptionId: '1',
     *   value: ['bar', 'foo']
     * }]
     */
    getAdvancedFilterData(filterData, fieldDefinitionsById, recordGridFilterConfigs, primaryRecordDefinition, filterOptions, associationDescriptors) {
        return forkJoin(filterData && filterData.and
            ? filterData.and.map((gridFilterData) => {
                const filterLogic = Object.keys(gridFilterData)[0];
                const filterOperators = gridFilterData[filterLogic];
                const firstFilterOperator = values(filterOperators[0])[0];
                const columnField = String(Object.keys(firstFilterOperator)[0]);
                let fieldDefinition = fieldDefinitionsById[columnField];
                const fieldDefinition$ = fieldDefinition
                    ? of(fieldDefinition)
                    : this.rxRecordGridUtilsService.getFieldDefinition(columnField, primaryRecordDefinition);
                return fieldDefinition$.pipe(filter(Boolean), map((newFieldDefinition) => {
                    fieldDefinition = newFieldDefinition;
                    const filterConfig = recordGridFilterConfigs[fieldDefinition.resourceType];
                    if (!fieldDefinitionsById[columnField]) {
                        this.rxRecordDefinitionService.addFieldDefinitionToMap(fieldDefinition, fieldDefinitionsById, columnField);
                        fieldDefinitionsById = primaryRecordDefinition.fieldDefinitionsById = Object.assign(Object.assign({}, fieldDefinitionsById), this.rxObjectUtilsService.expandProperties(fieldDefinitionsById));
                        const associationDescriptor = this.rxRecordGridUtilsService.findAssociationDescriptor(associationDescriptors, this.rxRecordGridUtilsService.getFieldLocator(columnField));
                        filterOptions.push(this.rxRecordGridAdvancedFilteringService.getAdvancedFilterOption(columnField, this.rxRecordGridUtilsService.getColumnLabel(fieldDefinition, associationDescriptor), fieldDefinition, filterConfig, true));
                    }
                    return filterConfig.getSelectedAdvancedFilterData(filterLogic, filterOperators, fieldDefinition, columnField);
                }));
            })
            : []).pipe(defaultIfEmpty([]), map((advancedFiltersData) => advancedFiltersData.filter(Boolean)));
    }
    getQueryFromRecordGridFilterData(filterData, fieldDefinitionsById) {
        const primitiveOperators = [
            RecordGridFilterOperator.Eq,
            RecordGridFilterOperator.Like,
            RecordGridFilterOperator.Ne,
            RecordGridFilterOperator.Lt,
            RecordGridFilterOperator.Lte,
            RecordGridFilterOperator.Gt,
            RecordGridFilterOperator.Gte,
            RecordGridFilterOperator.In,
            'regex'
        ];
        const isPrimitive = (expression) => {
            return intersection(primitiveOperators.slice(), keys(expression)).length > 0;
        };
        const evaluatePrimitive = (expression) => {
            return reduce(expression, (operatorsResult, condition, operator) => {
                return (operatorsResult +
                    reduce(condition, (operatorValuesResult, conditionValue, conditionId) => {
                        const fieldDefinition = fieldDefinitionsById[conditionId];
                        let filterOperator = operator;
                        let value = conditionValue;
                        const isTextField = !!fieldDefinition &&
                            includes([
                                RX_RECORD_DEFINITION.dataTypes.character.resourceType,
                                RX_RECORD_DEFINITION.dataTypes.localizedCharacter.resourceType
                            ], fieldDefinition.resourceType);
                        if (isTextField) {
                            const { isLikeOperation, filterValue } = this.getStringDataTypeFilterData(conditionValue, fieldDefinition);
                            filterOperator = isLikeOperation ? RecordGridFilterOperator.Like : filterOperator;
                            value = filterValue;
                        }
                        // following code removes the $DISPLAYVALUE$ from the filter expression
                        // e.g.  {"and":[{"or":[{"eq":{"536870913":"AGGADG1AAXPMRARKA0FGRKA0FG6I01","$DISPLAYVALUE$":"Alex"}}]}]}
                        if (conditionId === '$DISPLAYVALUE$') {
                            return operatorValuesResult;
                        }
                        return operatorValuesResult + this.getQueryExpression(value, conditionId, filterOperator);
                    }, ''));
            }, '');
        };
        let evaluateExpression = (expression) => {
            if (isPrimitive(expression)) {
                return evaluatePrimitive(expression);
            }
            return reduce(expression, (result, childExpression, operator) => {
                const childExpressionResult = _map(childExpression, evaluateExpression);
                switch (operator) {
                    case RecordGridFilterDataLogic.And:
                        return result + `(${childExpressionResult.join(' AND ')})`;
                    case RecordGridFilterDataLogic.Or:
                        return result + `(${childExpressionResult.join(' OR ')})`;
                    default:
                        return result + `(${childExpressionResult.join(' AND ')})`;
                }
            }, '');
        };
        evaluateExpression = evaluateExpression.bind(this);
        return evaluateExpression(filterData);
    }
    getSelectedFiltersFromPredefinedFilter(filters, recordGridFilters, fieldDefinitionsById, recordGridFilterConfigs, primaryRecordDefinition, filterOptions, associationDescriptors) {
        const recordGridFilterData = this.rxRecordGridFilterHelperService.getRecordGridFilterDataFromPredefinedFilter(filters, this.deserializeNamedOptions(recordGridFilters));
        const selectedFilters$ = this.getAdvancedFilterData(recordGridFilterData, fieldDefinitionsById, recordGridFilterConfigs, primaryRecordDefinition, filterOptions, associationDescriptors);
        return selectedFilters$;
    }
    getRecordGridFilterDataFromAdvancedFilter(filters, fieldDefinitionsById, recordGridFilterConfigs, namedFilterOptions) {
        const mappedFilters = filters.map((filterData) => {
            let mappedFilter = null;
            const fieldId = String(filterData.filterOptionId);
            const fieldDefinition = fieldDefinitionsById[fieldId];
            if (fieldDefinition) {
                const filterConfig = recordGridFilterConfigs[fieldDefinition.resourceType];
                mappedFilter = filterConfig.getRecordGridFilterData(filterData.value, fieldDefinition, fieldId, namedFilterOptions && namedFilterOptions[fieldId]);
            }
            return mappedFilter;
        });
        return mappedFilters.length
            ? {
                and: mappedFilters
            }
            : {};
    }
    getQueryFilterField(fieldId) {
        if (this.rxRecordGridUtilsService.isAssociatedRecordFieldId(fieldId)) {
            return `\${${fieldId}}`;
        }
        else {
            return `'${fieldId}'`;
        }
    }
    buildQueryFilter(fieldId, operator, value) {
        const needQuotes = isString(value) && !this.filtersKeywords.includes(value);
        const result = isString(value) ? (needQuotes ? `"${this.escapeDoubleQuotes(value)}"` : value) : String(value);
        return `${this.getQueryFilterField(fieldId)} ${operator} ${result}`;
    }
    filterRows(rows, filters, recordDefinition, filterConfigs) {
        const filterData = this.getRecordGridFilterDataFromAdvancedFilter(filters, recordDefinition.fieldDefinitionsById, filterConfigs);
        return rows.filter((row) => {
            if (row.groupField) {
                row.items = this.getFilteredItems(row.items, filterData, recordDefinition);
                return row.items.length;
            }
            else {
                return every(filterData.and, (filterExpression) => this.matchRow(row, filterExpression, recordDefinition));
            }
        });
    }
    getFilteredItems(rowDataItems, filterData, recordDefinition) {
        return reduce(rowDataItems, (filteredItems, itemsRow) => {
            let { items = [] } = itemsRow;
            if (!itemsRow.items &&
                every(filterData.and, (filterExpression) => this.matchRow(itemsRow, filterExpression, recordDefinition))) {
                filteredItems.push(itemsRow);
            }
            else {
                items = this.getFilteredItems(items, filterData, recordDefinition);
                if (items.length) {
                    filteredItems.push(Object.assign(Object.assign({}, itemsRow), { items }));
                }
            }
            return filteredItems;
        }, []);
    }
    matchRow(row, filterExpression, recordDefinition) {
        const operator = findKey(filterExpression);
        switch (operator) {
            case 'and':
                return every(filterExpression[operator], (childExpression) => this.checkCondition(row, childExpression, recordDefinition));
            case 'or':
                return some(filterExpression[operator], (childExpression) => this.checkCondition(row, childExpression, recordDefinition));
            default:
                return false;
        }
    }
    checkCondition(row, childExpression, recordDefinition) {
        const operator = findKey(childExpression);
        const fieldId = findKey(childExpression[operator]);
        const filterValue = childExpression[operator][fieldId];
        const rowValue = row[fieldId];
        if (recordDefinition.fieldDefinitionsById[fieldId].resourceType ===
            RX_RECORD_DEFINITION.dataTypes.dateTime.resourceType) {
            switch (operator) {
                case 'eq':
                    return moment(rowValue).isSame(filterValue);
                case 'lte':
                    return moment(rowValue).isSameOrBefore(filterValue);
                case 'lt':
                    return moment(rowValue).isBefore(filterValue);
                case 'gte':
                    return moment(rowValue).isSameOrAfter(filterValue);
                case 'gt':
                    return moment(rowValue).isAfter(filterValue);
                default:
                    return false;
            }
        }
        else {
            return operator === 'eq' ? this.rxStringService.caseInsensitiveIsEqual(rowValue, filterValue) : false;
        }
    }
    escapeDoubleQuotes(text) {
        return text.replace(/"/g, '""');
    }
    getQueryExpression(conditionValue, conditionId, operator) {
        const value = isString(conditionValue) ? '"' + conditionValue + '"' : conditionValue;
        conditionId = this.getQueryFilterField(conditionId);
        switch (operator) {
            case RecordGridFilterOperator.Eq:
                return conditionId + '=' + value;
            case RecordGridFilterOperator.Like:
                return conditionId + ' LIKE ' + value;
            case RecordGridFilterOperator.Ne:
                return conditionId + '!=' + value;
            case RecordGridFilterOperator.Lt:
                return conditionId + '<' + value;
            case RecordGridFilterOperator.Lte:
                return conditionId + '<=' + value;
            case RecordGridFilterOperator.Gt:
                return conditionId + '>' + value;
            case RecordGridFilterOperator.Gte:
                return conditionId + '>=' + value;
            case RecordGridFilterOperator.In:
                return conditionId + ' IN ' + value;
            default:
                return conditionId + '=' + value;
        }
    }
    getStringDataTypeFilterData(filterValue, fieldDefinition) {
        let isLikeOperation = false;
        if (!get(fieldDefinition.searchDefinition, 'enableFTSSearch')) {
            if (includes(filterValue, '%')) {
                const filterValueSplitData = filterValue.split(/\\\\/);
                isLikeOperation = some(filterValueSplitData, (value) => value.replace(/\\%/g, '').match('%'));
                if (!isLikeOperation) {
                    filterValue = _map(filterValueSplitData, (value) => value.replace(/\\%/g, '%')).join('\\');
                }
            }
            else {
                filterValue = filterValue.replace('\\\\', '\\');
            }
        }
        return { isLikeOperation, filterValue };
    }
    clearRemovedNamedFilterOptions(selectedFilters, namedFilterOptions) {
        return selectedFilters.reduce((result, filter) => {
            var _a, _b;
            const namedFilterOptionsGuids = (_b = (_a = namedFilterOptions[filter.filterOptionId]) === null || _a === void 0 ? void 0 : _a.map((option) => option.guid)) !== null && _b !== void 0 ? _b : [];
            filter.value.namedOptions = filter.value.namedOptions.filter((option) => namedFilterOptionsGuids.includes(option));
            if (!RxRecordGridAdvancedFilterValue.isEmptyWithRange(filter.value)) {
                result.push(filter);
            }
            return result;
        }, []);
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
}
RxRecordGridFilterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordGridFilterService, deps: [{ token: i1.RxStringService }, { token: i2.RxRecordGridUtilsService }, { token: i1.RxJsonParserService }, { token: i3.RxRecordGridAdvancedFilteringService }, { token: i4.RxRecordDefinitionService }, { token: i1.RxObjectUtilsService }, { token: i5.RxRecordGridFilterHelperService }], target: i0.ɵɵFactoryTarget.Injectable });
RxRecordGridFilterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordGridFilterService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordGridFilterService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.RxStringService }, { type: i2.RxRecordGridUtilsService }, { type: i1.RxJsonParserService }, { type: i3.RxRecordGridAdvancedFilteringService }, { type: i4.RxRecordDefinitionService }, { type: i1.RxObjectUtilsService }, { type: i5.RxRecordGridFilterHelperService }]; } });
//# sourceMappingURL=record-grid-filter.service.js.map