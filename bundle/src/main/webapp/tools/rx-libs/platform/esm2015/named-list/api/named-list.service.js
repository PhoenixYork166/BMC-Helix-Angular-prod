import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { RxLogService, RX_DATA_PAGE } from '@helix/platform/shared/api';
import { RxRecordInstanceUtilsService } from '@helix/platform/record/api';
import { RxNamedListDataPageService } from './named-list-data-page.service';
import { chain, has, isEmpty, isString } from 'lodash';
import { RX_NAMED_LIST_DEFINITION } from './named-list-definition.constant';
import { RX_EXPRESSION_EVALUATOR } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./named-list-data-page.service";
import * as i2 from "@helix/platform/record/api";
import * as i3 from "@helix/platform/shared/api";
export class RxNamedListService {
    constructor(rxNamedListDataPageService, rxRecordInstanceUtilsService, rxLogService) {
        this.rxNamedListDataPageService = rxNamedListDataPageService;
        this.rxRecordInstanceUtilsService = rxRecordInstanceUtilsService;
        this.rxLogService = rxLogService;
    }
    getOptionPage(namedListDefinition, searchQuery, queryCriteria = null, startIndex = 0, pageSize = RX_DATA_PAGE.defaultPageSize) {
        return this.getOptionPageByFieldIds(namedListDefinition, searchQuery, [namedListDefinition.labelFieldId], queryCriteria, startIndex, pageSize);
    }
    getOptionPageByLabelOrValue(namedListDefinition, searchQuery, queryCriteria = null, startIndex = 0, pageSize = RX_DATA_PAGE.defaultPageSize) {
        return this.getOptionPageByFieldIds(namedListDefinition, searchQuery, [namedListDefinition.labelFieldId, namedListDefinition.valueFieldId], queryCriteria, startIndex, pageSize);
    }
    getOptionPageByFieldIds(namedListDefinition, searchQuery, fieldIds, queryCriteria, startIndex, pageSize) {
        if (queryCriteria === null || queryCriteria === void 0 ? void 0 : queryCriteria.includes(RX_EXPRESSION_EVALUATOR.operands.undefined)) {
            this.rxLogService.debug(`Query criteria expression contains undefined operands: ${queryCriteria}`);
            return of({ options: [], totalSize: 0 });
        }
        const params = {
            namedlistdefinition: namedListDefinition.name,
            pageSize,
            startIndex
        };
        const startingWildcard = [
            RX_NAMED_LIST_DEFINITION.searchBehaviorTypes.startsWith,
            RX_NAMED_LIST_DEFINITION.searchBehaviorTypes.exactMatch
        ].includes(namedListDefinition.searchBehavior)
            ? ''
            : '%';
        const endingWildcard = namedListDefinition.searchBehavior === RX_NAMED_LIST_DEFINITION.searchBehaviorTypes.exactMatch ? '' : '%';
        const matchingOperator = namedListDefinition.searchBehavior === RX_NAMED_LIST_DEFINITION.searchBehaviorTypes.exactMatch ? '=' : 'LIKE';
        const searchableFieldIds = chain(namedListDefinition.fields)
            .filter((field) => field.searchable)
            .map((field) => Number(field.id))
            .concat(fieldIds)
            .uniq()
            .value();
        const searchQueryCriteria = searchQuery
            ? searchableFieldIds
                .map((fieldId) => {
                const escapedSearchQuery = this.rxRecordInstanceUtilsService.escapeTextWildcards(searchQuery);
                return `('${fieldId}' ${matchingOperator} "${startingWildcard}${escapedSearchQuery}${endingWildcard}")`;
            })
                .join(' OR ')
            : null;
        const additionalQueryCriteria = searchQueryCriteria && queryCriteria
            ? `(${searchQueryCriteria}) AND (${queryCriteria})`
            : searchQueryCriteria || queryCriteria;
        if (additionalQueryCriteria) {
            params.additionalQueryCriteria = `(${additionalQueryCriteria})`;
        }
        return this.rxNamedListDataPageService
            .post({
            params
        })
            .pipe(map((result) => ({
            options: result.data.map((item) => {
                // We are still getting all the keys in the response despite disabling the feature flag 'DRD21-43103'.
                if (Object.keys(item).length === 1) {
                    const displayValue = Object.keys(item)[0];
                    return {
                        displayValue,
                        value: item[displayValue],
                        title: '',
                        contextualFields: []
                    };
                }
                else {
                    const contextualFields = namedListDefinition.fields
                        .filter((field) => field.visible)
                        .map((field) => item[field.id]);
                    return {
                        displayValue: item[namedListDefinition.labelFieldId],
                        value: item[namedListDefinition.valueFieldId],
                        title: contextualFields.join(' / '),
                        contextualFields
                    };
                }
            }),
            totalSize: result.totalSize
        })));
    }
    getOptionsForValues(namedListDefinition, optionValues) {
        if (optionValues.length) {
            const params = {
                namedlistdefinition: namedListDefinition.name,
                pageSize: -1,
                startIndex: 0
            };
            params.additionalQueryCriteria = optionValues
                .map((value) => `'${namedListDefinition.valueFieldId}'="${value.replace(/"/g, '""')}"`)
                .join(' OR ');
            return this.rxNamedListDataPageService
                .post({
                params
            })
                .pipe(map((result) => result.data.map((item) => {
                const displayValue = Object.keys(item)[0];
                return {
                    displayValue,
                    value: item[displayValue],
                    title: '',
                    contextualFields: []
                };
            })));
        }
        else {
            return of([]);
        }
    }
    isNamedListOption(namedListTypeAheadOption) {
        return has(namedListTypeAheadOption, 'value');
    }
    getNamesFromTypeAheadOptions(namedListTypeAheadOptions) {
        if (!isEmpty(namedListTypeAheadOptions)) {
            return isString(namedListTypeAheadOptions[0])
                ? namedListTypeAheadOptions
                : namedListTypeAheadOptions.map((filterValue) => filterValue.value);
        }
        return [];
    }
}
RxNamedListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedListService, deps: [{ token: i1.RxNamedListDataPageService }, { token: i2.RxRecordInstanceUtilsService }, { token: i3.RxLogService }], target: i0.ɵɵFactoryTarget.Injectable });
RxNamedListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedListService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxNamedListDataPageService }, { type: i2.RxRecordInstanceUtilsService }, { type: i3.RxLogService }]; } });
//# sourceMappingURL=named-list.service.js.map