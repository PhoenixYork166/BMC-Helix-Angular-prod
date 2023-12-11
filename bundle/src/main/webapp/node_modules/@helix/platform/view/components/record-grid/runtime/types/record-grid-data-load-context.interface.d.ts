import { IRecordGridNamedFilterOptionsMap } from '../../common/types/record-grid.types';
export interface IRecordGridDataLoadContext {
    associatedRecordId: string;
    associatedRoleName: string;
    filterExpression: string;
    namedFilterOptions: IRecordGridNamedFilterOptionsMap;
}
