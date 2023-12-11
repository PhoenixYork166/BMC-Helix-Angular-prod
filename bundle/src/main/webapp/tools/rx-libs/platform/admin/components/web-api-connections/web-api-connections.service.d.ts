import { Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IWebApiConnection } from './web-api-connections.interfaces';
import { IRxRecordGridApi, RxViewActionUtilsService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
export declare class RxWebAPIConnectionsService {
    private httpClient;
    private injector;
    private rxViewActionUtilsService;
    private path;
    constructor(httpClient: HttpClient, injector: Injector, rxViewActionUtilsService: RxViewActionUtilsService);
    private getAuthTypeDetails;
    save(webApiConnection: IWebApiConnection, id: string): Observable<any>;
    create(webApiConnection: IWebApiConnection): Observable<any>;
    private getWebApiConnectionToSave;
    private getUrl;
    private delete;
    deleteRecords(recordsApi: IRxRecordGridApi): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxWebAPIConnectionsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxWebAPIConnectionsService>;
}
