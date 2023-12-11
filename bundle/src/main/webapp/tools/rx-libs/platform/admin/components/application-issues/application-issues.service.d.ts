import { HttpClient } from '@angular/common/http';
import { IIssueReportingInfo, IIssuesResource } from './application-issues.types';
import { Observable } from 'rxjs';
import { RxSystemConfigurationService } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
export declare class RxApplicationIssuesService {
    private httpClient;
    private rxSystemConfigurationService;
    constructor(httpClient: HttpClient, rxSystemConfigurationService: RxSystemConfigurationService);
    getIssueReportingInfo(): Observable<IIssueReportingInfo>;
    getIssuesResource(): Observable<IIssuesResource>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxApplicationIssuesService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxApplicationIssuesService>;
}
