import { AdvancedFilterOptionDataType, SelectedAdvancedFilter } from '@bmc-ux/adapt-angular';
import { IRecordGridFilterData, IRecordGridFilterOperator, RecordGridFilterDataLogic } from '@helix/platform/view/api';
import { IFieldDefinition, IRecordDefinition } from '@helix/platform/record/api';
import { IPlainObject } from '@helix/platform/shared/api';
import { IRecordGridFilterTag } from './record-grid-filter.types';
import { Observable } from 'rxjs';
import { IRecordGridColumnNamedFilterOption } from './record-grid.types';
export interface IGetTagTextParams<TValue = any> {
    primaryRecordDefinition: IRecordDefinition;
    fieldDefinition: IFieldDefinition;
    value: TValue;
    tag: IRecordGridFilterTag;
    fieldId: string;
    namedFilterOptions?: IRecordGridColumnNamedFilterOption[];
}
export interface ITagInfo {
    text: string;
    tooltip: string;
}
export interface IRecordGridFilterConfig<TValue = any> {
    filterOptionDataType: AdvancedFilterOptionDataType;
    getQueryFilter: (selectedFilter: SelectedAdvancedFilter<TValue>, fieldDefinition: IFieldDefinition, fieldId: string, namedFilterOptions?: IRecordGridColumnNamedFilterOption[]) => string;
    getRecordGridFilterData: (value: TValue, fieldDefinition: IFieldDefinition, fieldId: string, namedFilterOptions?: IRecordGridColumnNamedFilterOption[]) => IRecordGridFilterData;
    /**
     * Convert filter model from:
     * {
     *   "or": [
     *     {
     *       "eq": {
     *         "1": "bar"
     *       }
     *     },
     *     {
     *       "eq": {
     *         "1": "foo"
     *       }
     *     }
     *   ]
     * }
     *
     * to:
     * {
     *   filterOptionId: '1',
     *   value: ['bar', 'foo']
     * }
     */
    getSelectedAdvancedFilterData: (filterLogic: RecordGridFilterDataLogic, filterOperators: IRecordGridFilterOperator[], fieldDefinition: IFieldDefinition, fieldId: string) => SelectedAdvancedFilter<TValue>;
    getDataForAdvancedFilter?: (fieldDefinition: IFieldDefinition, fieldId: string) => IPlainObject;
    getToolbarTagInfo?: (params: IGetTagTextParams<TValue>) => Observable<ITagInfo>;
}
export interface IRecordGridFilterConfigs {
    [resourceType: string]: IRecordGridFilterConfig;
}
