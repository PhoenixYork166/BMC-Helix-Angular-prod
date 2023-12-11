import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOauthConfig, ISupportConfig } from './issue-reporting-configuration.types';
import { RxRecordInstanceDataPageService } from '@helix/platform/record/api';
import { RxSystemConfigurationService, RxCurrentUserService } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
export declare class RxIssueReportingConfigurationService {
    private httpClient;
    private rxRecordInstanceDataPageService;
    private rxCurrentUserService;
    private rxSystemConfigurationService;
    constructor(httpClient: HttpClient, rxRecordInstanceDataPageService: RxRecordInstanceDataPageService, rxCurrentUserService: RxCurrentUserService, rxSystemConfigurationService: RxSystemConfigurationService);
    getOauthConfig(): Observable<IOauthConfig>;
    getSupportId(): Observable<string>;
    setSupportId(supportId: string): Observable<any>;
    getSupportConfig(): Observable<ISupportConfig | null>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxIssueReportingConfigurationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxIssueReportingConfigurationService>;
}
