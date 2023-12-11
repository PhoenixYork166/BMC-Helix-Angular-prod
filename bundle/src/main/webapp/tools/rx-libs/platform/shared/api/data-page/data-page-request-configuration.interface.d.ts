import { IDataPageParams } from './data-page-params.interface';
export interface IDataPageRequestConfiguration {
    headers?: {
        [name: string]: string;
    };
    params?: IDataPageParams;
}
