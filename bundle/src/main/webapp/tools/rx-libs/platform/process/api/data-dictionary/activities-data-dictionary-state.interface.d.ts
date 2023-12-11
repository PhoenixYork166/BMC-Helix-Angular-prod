import { IDataDictionaryBranch } from '@helix/platform/shared/api';
export interface IActivitiesDataDictionaryState {
    [guid: string]: IDataDictionaryBranch;
}
