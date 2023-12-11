import { IPlainObject } from '@helix/platform/shared/api';
export interface IRxSelectWithPaginationOption extends IPlainObject {
    displayValue: string;
    value: string;
}
export interface IRxSelectWithPaginationOptionsPage {
    totalSize: number;
    options: IRxSelectWithPaginationOption[];
}
