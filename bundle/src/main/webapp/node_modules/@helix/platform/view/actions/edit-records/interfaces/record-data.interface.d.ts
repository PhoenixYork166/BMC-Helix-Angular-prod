import { IPreparedRecordInstance } from './prepared-record-instance.interface';
import { IPreparedFile } from './prepared-file.interface';
import { IAssociationRecords } from '@helix/platform/association/api';
export interface IRecordData {
    shouldOverrideOptimisticLock: boolean;
    commandInstance: {
        resourceType: string;
    };
    recordInstanceIds: string[];
    recordInstance: IPreparedRecordInstance;
    attachments: IPreparedFile[];
    associationOperations?: IAssociationRecords[];
}
