import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RxDocumentDefinitionDataPageService } from '@helix/platform/document/api';
import { IRecordDefinition } from '@helix/platform/record/api';
import { IDataPageResult, RxSessionExpirationService } from '@helix/platform/shared/api';
import { RxWebApiDefinitionDataPageService } from '@helix/platform/web-api/api';
import { RxDataSourceDataPageService } from './data-source-data-page.service';
import * as i0 from "@angular/core";
export declare class RxExternalDataService {
    private httpClient;
    private rxDataSourceDataPageService;
    private rxDocumentDefinitionDataPageService;
    private rxSessionExpirationService;
    private rxWebApiDefinitionDataPageService;
    constructor(httpClient: HttpClient, rxDataSourceDataPageService: RxDataSourceDataPageService, rxDocumentDefinitionDataPageService: RxDocumentDefinitionDataPageService, rxSessionExpirationService: RxSessionExpirationService, rxWebApiDefinitionDataPageService: RxWebApiDefinitionDataPageService);
    getArsTables(pageSize: number, startIndex: number, dataSourceName: string, tableName: string, sortBy?: string[]): Observable<IDataPageResult>;
    getArsTableDefinition(dataSourceName: string, tableName: string): Observable<IRecordDefinition>;
    getDataSourceNames(dataSourceType: string): Observable<string[]>;
    getDataSourceTypes(): Observable<string[]>;
    getWebApiDefinitions(): Observable<IDataPageResult>;
    getWebApiDocuments(webApiRequestDefinitions: {
        [key: string]: string;
    }): Observable<IDataPageResult>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxExternalDataService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxExternalDataService>;
}
