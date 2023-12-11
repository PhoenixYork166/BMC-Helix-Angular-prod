import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPlainObject } from '../../common-types';
import { RxJsonParserService } from '@helix/platform/utils';
import { RxServerErrorHandlerService } from '../../error-handling';
import * as i0 from "@angular/core";
export declare class RxSmartReportingService {
    private httpClient;
    private rxJsonParserService;
    private rxServerErrorHandlerService;
    private smartReportingUrl$;
    constructor(httpClient: HttpClient, rxJsonParserService: RxJsonParserService, rxServerErrorHandlerService: RxServerErrorHandlerService);
    openSmartReporting(target?: string, queryParams?: IPlainObject): Observable<boolean>;
    getSmartReportingUrl(): Observable<string>;
    private _getSmartReportingUrl;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxSmartReportingService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxSmartReportingService>;
}
