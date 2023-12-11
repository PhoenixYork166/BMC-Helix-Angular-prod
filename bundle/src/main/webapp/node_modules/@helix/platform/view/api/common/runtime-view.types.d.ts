import { IPlainObject } from '@helix/platform/shared/api';
export interface IRuntimeComponentApiCallResult<T = IPlainObject> {
    guid: string;
    data: T;
}
