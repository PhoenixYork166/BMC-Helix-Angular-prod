import * as i0 from '@angular/core';
import { Injectable } from '@angular/core';
import * as i2 from '@helix/platform/shared/api';
import { DataPage, RX_BUNDLE, RX_DATA_PAGE } from '@helix/platform/shared/api';
import * as i1 from '@angular/common/http';
import { of } from 'rxjs';
import { tap, shareReplay, map } from 'rxjs/operators';
import { isEmpty, chain, has, isString } from 'lodash';
import * as i2$1 from '@helix/platform/record/api';
import { RX_EXPRESSION_EVALUATOR } from '@helix/platform/view/api';

const namedListDefinitionDataPageQuery = 'com.bmc.arsys.rx.application.namedlist.datapage.NamedListDefinitionDataPageQuery';
class RxNamedListDefinitionDataPageService extends DataPage {
    constructor(injector) {
        super(injector, namedListDefinitionDataPageQuery);
        this.injector = injector;
    }
}
RxNamedListDefinitionDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedListDefinitionDataPageService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxNamedListDefinitionDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedListDefinitionDataPageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedListDefinitionDataPageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });

const RX_NAMED_LIST_DEFINITION = {
    searchBehaviorTypes: {
        contains: 'CONTAINS',
        exactMatch: 'EXACT_MATCH',
        startsWith: 'STARTS_WITH'
    },
    maxNumberOfContextualLabelFields: 4
};

class RxNamedListDefinitionService {
    constructor(httpClient, rxCommandFactoryService, rxFeatureService) {
        this.httpClient = httpClient;
        this.rxCommandFactoryService = rxCommandFactoryService;
        this.rxFeatureService = rxFeatureService;
    }
    get(namedListDefinitionName, options) {
        return this.httpClient.get(this.getUrl(namedListDefinitionName), options).pipe(tap((definition) => {
            var _a;
            if (this.rxFeatureService.isFeatureEnabled('DRD21-43015')) {
                (_a = definition.searchBehavior) !== null && _a !== void 0 ? _a : (definition.searchBehavior = RX_NAMED_LIST_DEFINITION.searchBehaviorTypes.contains);
            }
        }));
    }
    getNew() {
        const definition = {
            name: '',
            allowOverlay: false,
            scope: RX_BUNDLE.definitionScopeTypes.bundle,
            recordDefinitionName: null,
            labelFieldId: null,
            valueFieldId: null
        };
        if (this.rxFeatureService.isFeatureEnabled('DRD21-43015')) {
            definition.searchBehavior = RX_NAMED_LIST_DEFINITION.searchBehaviorTypes.contains;
        }
        return of(definition);
    }
    create(namedListDefinition) {
        return this.httpClient.post(this.getUrl(), namedListDefinition, { observe: 'response' });
    }
    update(namedListDefinition, options) {
        return this.httpClient.put(this.getUrl(namedListDefinition.name), namedListDefinition, options);
    }
    getUrl(namedListDefinitionName) {
        return namedListDefinitionName
            ? `/api/rx/application/namedlist/namedlistdefinition/${encodeURIComponent(namedListDefinitionName)}`
            : '/api/rx/application/namedlist/namedlistdefinition';
    }
    rename(oldNamedListDefinitionName, newNamedListDefinitionName) {
        return this.rxCommandFactoryService
            .forResourceType('com.bmc.arsys.rx.application.namedlist.command.RenameNamedListDefinitionCommand')
            .execute({
            name: oldNamedListDefinitionName,
            newName: newNamedListDefinitionName
        });
    }
    revertCustomization(namedListDefinitionName) {
        return this.rxCommandFactoryService
            .forResourceType('com.bmc.arsys.rx.application.namedlist.command.RevertNamedListDefinitionCommand')
            .execute({ namedListDefinitionName });
    }
    delete(definitionNames) {
        return this.rxCommandFactoryService
            .forResourceType('com.bmc.arsys.rx.application.namedlist.command.DeleteNamedListDefinitionsCommand')
            .execute({ definitionNames });
    }
}
RxNamedListDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedListDefinitionService, deps: [{ token: i1.HttpClient }, { token: i2.RxCommandFactoryService }, { token: i2.RxFeatureService }], target: i0.ɵɵFactoryTarget.Injectable });
RxNamedListDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedListDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedListDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.RxCommandFactoryService }, { type: i2.RxFeatureService }]; } });

class RxNamedListDataPageService extends DataPage {
    constructor(injector, rxLogService) {
        super(injector, 'com.bmc.arsys.rx.application.namedlist.datapage.NamedListDataPageQuery');
        this.rxLogService = rxLogService;
    }
    get(dataPageRequestConfiguration = {}) {
        this.rxLogService.warning('RxNamedListDataPageService: The get() method is deprecated. Use post() instead.');
        return super.get(dataPageRequestConfiguration);
    }
}
RxNamedListDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedListDataPageService, deps: [{ token: i0.Injector }, { token: i2.RxLogService }], target: i0.ɵɵFactoryTarget.Injectable });
RxNamedListDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedListDataPageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedListDataPageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i2.RxLogService }]; } });

class RxNamedListDefinitionCacheService {
    constructor(rxNamedListDefinitionService) {
        this.rxNamedListDefinitionService = rxNamedListDefinitionService;
        this.consumers = new Set();
        this.namedListDefinitions = new Map();
    }
    getNamedListDefinition(namedListDefinitionName) {
        if (!this.namedListDefinitions.has(namedListDefinitionName)) {
            const namedListDefinition = this.rxNamedListDefinitionService.get(namedListDefinitionName).pipe(shareReplay(1));
            this.namedListDefinitions.set(namedListDefinitionName, namedListDefinition);
        }
        return this.namedListDefinitions.get(namedListDefinitionName);
    }
    registerConsumer(consumerDestroy$) {
        this.consumers.add(consumerDestroy$);
        consumerDestroy$.subscribe(() => {
            this.consumers.delete(consumerDestroy$);
            if (isEmpty(this.consumers)) {
                this.clearCache();
            }
        });
    }
    clearCache() {
        this.namedListDefinitions.clear();
    }
}
RxNamedListDefinitionCacheService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedListDefinitionCacheService, deps: [{ token: RxNamedListDefinitionService }], target: i0.ɵɵFactoryTarget.Injectable });
RxNamedListDefinitionCacheService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedListDefinitionCacheService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedListDefinitionCacheService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: RxNamedListDefinitionService }]; } });

class RxNamedListService {
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
RxNamedListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedListService, deps: [{ token: RxNamedListDataPageService }, { token: i2$1.RxRecordInstanceUtilsService }, { token: i2.RxLogService }], target: i0.ɵɵFactoryTarget.Injectable });
RxNamedListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedListService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: RxNamedListDataPageService }, { type: i2$1.RxRecordInstanceUtilsService }, { type: i2.RxLogService }]; } });

/**
 * Generated bundle index. Do not edit.
 */

export { RX_NAMED_LIST_DEFINITION, RxNamedListDataPageService, RxNamedListDefinitionCacheService, RxNamedListDefinitionDataPageService, RxNamedListDefinitionService, RxNamedListService };
//# sourceMappingURL=helix-platform-named-list-api.js.map
