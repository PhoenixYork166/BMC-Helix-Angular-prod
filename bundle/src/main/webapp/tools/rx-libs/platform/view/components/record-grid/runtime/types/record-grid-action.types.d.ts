import { IRowDataItem } from '@helix/platform/view/api';
export declare type RxRecordGridActionFunction = (previousActionResult: any, lastActionRow?: IRowDataItem) => any;
export interface IRxRecordGridAction {
    component?: string;
    index?: string | number;
    name: string | RxRecordGridActionFunction;
    [paramName: string]: any;
}
