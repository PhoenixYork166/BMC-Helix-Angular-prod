import { Observable } from 'rxjs';
import { RecordInstance, RxRecordInstanceService, RxRecordInstanceDataPageService, RxRecordInstanceUpdateService } from '@helix/platform/record/api';
import { RssoOAuthConfiguration } from './rsso-oauth.types';
import * as i0 from "@angular/core";
export declare class RxRssoOAuthConfigurationService {
    private rxRecordInstanceService;
    private rxRecordInstanceUpdateService;
    private rxRecordInstanceDataPageService;
    constructor(rxRecordInstanceService: RxRecordInstanceService, rxRecordInstanceUpdateService: RxRecordInstanceUpdateService, rxRecordInstanceDataPageService: RxRecordInstanceDataPageService);
    getConfigs(): Observable<RssoOAuthConfiguration[]>;
    saveConfigRecordInstance(recordInstance: RecordInstance): Observable<any>;
    getConfigRecordInstance(recordInstanceId: string): Observable<RecordInstance>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxRssoOAuthConfigurationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxRssoOAuthConfigurationService>;
}
