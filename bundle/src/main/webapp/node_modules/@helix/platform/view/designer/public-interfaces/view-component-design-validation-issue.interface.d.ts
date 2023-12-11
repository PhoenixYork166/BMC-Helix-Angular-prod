import { IPlainObject } from '@helix/platform/shared/api';
export interface IViewComponentDesignValidationIssue<TData = IPlainObject> {
    type: 'error' | 'warning';
    description: string;
    propertyName?: string;
    data?: TData;
    disableCorrection?: boolean;
}
