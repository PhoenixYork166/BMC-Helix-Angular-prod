import { KeyValueObject } from '@bmc-ux/adapt-angular';
export interface IDataPageResult<T = KeyValueObject> {
    data: T[];
    totalSize?: number;
    cursor?: string;
}
