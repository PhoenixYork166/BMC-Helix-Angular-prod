import { AdvancedFilterOption, AdvancedFilterTexts, SelectedAdvancedFilter } from '@bmc-ux/adapt-angular';
import { IFieldDefinitionsById, IRecordDefinition } from '@helix/platform/record/api';
import { IRecordGridFilterConfigs } from '../../../common/types/record-grid-filter-config.interfaces';
import { IRxRecordGridFilter } from '../../../common/types/record-grid-filter.types';
import { Subject } from 'rxjs';
import { IAssociationDescriptor } from '@helix/platform/association/api';
import { IRecordGridNamedFilterOptionsMap } from '../../../common/types/record-grid.types';
export interface IRecordGridFilterSelectControlOptions {
    primaryRecordDefinition: IRecordDefinition;
    selectedFieldIds?: string[];
    tagsLimit?: number;
    namedFilterOptions?: IRecordGridNamedFilterOptionsMap;
    anchorDisabled?: boolean;
}
export interface IRecordGridFilterModel {
    filtersJson: string;
    basicFilters: IRxRecordGridFilter[];
}
export interface IRecordGridFilterSelectAdvancedFiltering {
    filterOptions: AdvancedFilterOption[];
    associationDescriptors: IAssociationDescriptor[];
    selectedFilters: SelectedAdvancedFilter[];
    filterTexts: AdvancedFilterTexts;
    recordGridFilterConfigs: IRecordGridFilterConfigs;
    fieldDefinitionsById: IFieldDefinitionsById;
    fieldDefinitionsInitialized$: Subject<any>;
    filterValueInitialized$: Subject<any>;
}
export declare enum RecordGridFilterMode {
    Basic = "basic",
    Expression = "expression"
}
export interface IRecordGridFilterDescriptorModel {
    value: string;
    fieldId: string;
    $DISPLAYVALUE$?: string;
}
