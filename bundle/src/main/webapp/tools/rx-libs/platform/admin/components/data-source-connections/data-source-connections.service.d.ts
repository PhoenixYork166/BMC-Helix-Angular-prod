import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDataSourceConnection } from './data-source-connections.types';
import * as i0 from "@angular/core";
export declare class RxDataSourceConnectionsService {
    private httpClient;
    constructor(httpClient: HttpClient);
    getDataSourceConnection(connectionId: string): Observable<any>;
    createDataSourceConnection(dataSourceConnection: IDataSourceConnection): Observable<any>;
    updateDataSourceConnection(connectionId: string, dataSourceConnection: IDataSourceConnection): Observable<any>;
    deleteDataSourceConnections(recordInstanceIds: string[]): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxDataSourceConnectionsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxDataSourceConnectionsService>;
}
