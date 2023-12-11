import { IDataPageRequestConfiguration } from './data-page-request-configuration.interface';
import { Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDataPageResult } from './data-page-result.interface';
export declare class DataPage {
    http: HttpClient;
    dataPageType: string;
    configuration: IDataPageRequestConfiguration;
    private requiredRequestParams;
    constructor(injector: Injector, dataPageType: string, defaultDataPageRequestConfiguration?: IDataPageRequestConfiguration);
    get(dataPageRequestConfiguration?: IDataPageRequestConfiguration): Observable<IDataPageResult>;
    getEmptyDataPage(): Observable<IDataPageResult>;
    post(dataPageRequestConfiguration?: IDataPageRequestConfiguration): Observable<IDataPageResult>;
}
