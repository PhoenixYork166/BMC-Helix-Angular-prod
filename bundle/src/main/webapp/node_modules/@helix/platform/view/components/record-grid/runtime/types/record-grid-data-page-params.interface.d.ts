import { IDataPageParams } from '@helix/platform/shared/api';
export interface IRecordGridDataPageRequestParams extends IDataPageParams {
    associatedRecordInstanceId: string;
    associationDefinition: string;
    nodeToQuery: string;
    recorddefinition: string;
    shouldIncludeTotalSize: boolean;
    propertySelection: string[];
    sortBy: string[];
    queryExpression: string;
    roleName: string;
    recordDefinitionToQuery: string;
}
export interface IRecordGridDataPageParams extends IRecordGridDataPageRequestParams {
    searchText: string;
}
