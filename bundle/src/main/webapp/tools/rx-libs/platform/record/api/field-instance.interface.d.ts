import { IPlainObject } from '@helix/platform/shared/api';
export interface IFieldInstance {
    resourceType: string;
    id: number;
    value: any;
    permissionType?: 'CHANGE' | 'VIEW';
    valueByLocale?: IPlainObject;
    hideCurrentLocale?: boolean;
    file?: File;
}
