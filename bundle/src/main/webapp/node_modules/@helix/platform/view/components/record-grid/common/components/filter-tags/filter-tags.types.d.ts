import { IRecordGridFilterTag } from '../../types/record-grid-filter.types';
export interface IRemoveFilterTagEvent {
    removedTag: IRecordGridFilterTag;
    newTags: IRecordGridFilterTag[];
}
