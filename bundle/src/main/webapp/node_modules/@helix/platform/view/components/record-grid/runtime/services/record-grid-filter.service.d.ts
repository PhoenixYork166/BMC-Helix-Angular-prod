import { AdvancedFilterOption, SelectedAdvancedFilter } from '@bmc-ux/adapt-angular';
import { IAssociationDescriptor } from '@helix/platform/association/api';
import { IFieldDefinition, IFieldDefinitionsById, IRecordDefinition, RxRecordDefinitionService } from '@helix/platform/record/api';
import { RxJsonParserService, RxObjectUtilsService, RxStringService } from '@helix/platform/utils';
import { IRecordGridFilterData, IRowDataItem } from '@helix/platform/view/api';
import { Observable } from 'rxjs';
import { RxRecordGridAdvancedFilteringService } from '../../common/services/record-grid-advanced-filtering.service';
import { RxRecordGridUtilsService } from '../../common/services/record-grid-utils.service';
import { QueryFiltersLogic } from '../types/query-filters-logic.enum';
import { IAdaptTableColumnConfig, IRecordGridColumnWithMetadata } from '../types/record-grid-column.types';
import { IRecordGridFilterConfigs } from '../../common/types/record-grid-filter-config.interfaces';
import { IRxRecordGridFilter } from '../../common/types/record-grid-filter.types';
import { IRecordGridNamedFilterOptionsMap } from '../../common/types/record-grid.types';
import { RxRecordGridAdvancedFilterValue } from '../../common/types/record-grid-advanced-filter-value.class';
import { RxRecordGridFilterHelperService } from '../../common/services/record-grid-filter-helper.service';
import { IPlainObject } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
export declare class RxRecordGridFilterService {
    rxStringService: RxStringService;
    private rxRecordGridUtilsService;
    private rxJsonParserService;
    private rxRecordGridAdvancedFilteringService;
    private rxRecordDefinitionService;
    private rxObjectUtilsService;
    private rxRecordGridFilterHelperService;
    filtersKeywords: string[];
    constructor(rxStringService: RxStringService, rxRecordGridUtilsService: RxRecordGridUtilsService, rxJsonParserService: RxJsonParserService, rxRecordGridAdvancedFilteringService: RxRecordGridAdvancedFilteringService, rxRecordDefinitionService: RxRecordDefinitionService, rxObjectUtilsService: RxObjectUtilsService, rxRecordGridFilterHelperService: RxRecordGridFilterHelperService);
    clearFilterData(node: IPlainObject): IPlainObject;
    getFilterForAvailableColumns(node: IPlainObject, filterableColumns: IRecordGridColumnWithMetadata[]): IPlainObject;
    replaceKeywords(query: string): string;
    generateTextFilterQuery(text: string, columns: IAdaptTableColumnConfig[]): string;
    addQueries(...queries: string[]): string;
    joinQueryFilters(queries: string[], logic: QueryFiltersLogic): string;
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
    getAdvancedFilterData(filterData: IRecordGridFilterData, fieldDefinitionsById: IFieldDefinitionsById, recordGridFilterConfigs: IRecordGridFilterConfigs, primaryRecordDefinition: IRecordDefinition, filterOptions: AdvancedFilterOption[], associationDescriptors: IAssociationDescriptor[]): Observable<SelectedAdvancedFilter[]>;
    getQueryFromRecordGridFilterData(filterData: IRecordGridFilterData, fieldDefinitionsById: IFieldDefinitionsById): string;
    getSelectedFiltersFromPredefinedFilter(filters: string, recordGridFilters: IRxRecordGridFilter[], fieldDefinitionsById: IFieldDefinitionsById, recordGridFilterConfigs: IRecordGridFilterConfigs, primaryRecordDefinition: IRecordDefinition, filterOptions: AdvancedFilterOption[], associationDescriptors: IAssociationDescriptor[]): Observable<SelectedAdvancedFilter[]>;
    getRecordGridFilterDataFromAdvancedFilter(filters: SelectedAdvancedFilter[], fieldDefinitionsById: IFieldDefinitionsById, recordGridFilterConfigs: IRecordGridFilterConfigs, namedFilterOptions?: IRecordGridNamedFilterOptionsMap): IRecordGridFilterData;
    getQueryFilterField(fieldId: string): string;
    buildQueryFilter(fieldId: string, operator: string, value: string | number): string;
    filterRows(rows: IRowDataItem[], filters: SelectedAdvancedFilter[], recordDefinition: IRecordDefinition, filterConfigs: IRecordGridFilterConfigs): IRowDataItem[];
    private getFilteredItems;
    private matchRow;
    private checkCondition;
    private escapeDoubleQuotes;
    private getQueryExpression;
    getStringDataTypeFilterData(filterValue: string, fieldDefinition: IFieldDefinition): {
        isLikeOperation: boolean;
        filterValue: string;
    };
    clearRemovedNamedFilterOptions(selectedFilters: SelectedAdvancedFilter<RxRecordGridAdvancedFilterValue>[], namedFilterOptions: IRecordGridNamedFilterOptionsMap): SelectedAdvancedFilter[];
    deserializeNamedOptions(recordGridFilters: IRxRecordGridFilter[]): IRxRecordGridFilter[];
    static ɵfac: i0.ɵɵFactoryDeclaration<RxRecordGridFilterService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxRecordGridFilterService>;
}
