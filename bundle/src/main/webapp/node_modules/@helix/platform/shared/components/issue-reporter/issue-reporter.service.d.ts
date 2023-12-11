import { Observable } from 'rxjs';
import { ICreatedRecordInstance, RxRecordInstanceService } from '@helix/platform/record/api';
import { IServerResponseMessage, RxBundleCacheService, RxGlobalCacheService } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
export declare class RxIssueReporterService {
    private rxRecordInstanceService;
    private rxGlobalCacheService;
    private rxBundleCacheService;
    constructor(rxRecordInstanceService: RxRecordInstanceService, rxGlobalCacheService: RxGlobalCacheService, rxBundleCacheService: RxBundleCacheService);
    reportIssue(message: string, data: IServerResponseMessage): Observable<ICreatedRecordInstance>;
    private prepareIssueDetails;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxIssueReporterService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxIssueReporterService>;
}
