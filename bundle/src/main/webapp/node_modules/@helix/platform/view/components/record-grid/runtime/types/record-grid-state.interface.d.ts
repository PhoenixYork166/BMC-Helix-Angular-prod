import { IRecordDefinition } from '@helix/platform/record/api';
import { IAssociationDescriptor } from '@helix/platform/association/api';
import { IRecordGridColumnWithMetadata } from './record-grid-column.types';
import { IRecordGridConfig } from './record-grid-config.interface';
import { IRecordGridFiltering } from '../../common/types/record-grid-filter.types';
import { IRecordGridFilterData } from '@helix/platform/view/api';
import { IRecordGridNamedFilterOptionsMap } from '../../common/types/record-grid.types';
export interface IRecordGridState extends IRecordGridConfig {
    columnsWithMetadata: IRecordGridColumnWithMetadata[];
    recordDefinition: IRecordDefinition;
    associationDescriptors: IAssociationDescriptor[];
    advancedFiltering: IRecordGridFiltering;
    initialFilters: IRecordGridFilterData;
    namedFilterOptions: IRecordGridNamedFilterOptionsMap;
}
