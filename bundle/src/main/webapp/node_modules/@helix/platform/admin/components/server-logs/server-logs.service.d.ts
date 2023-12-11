import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILogFileNames, IServerLogsConfig } from './server-logs.types';
import * as i0 from "@angular/core";
export declare class RxServerLogsService {
    private httpClient;
    constructor(httpClient: HttpClient);
    getConfig(): Observable<IServerLogsConfig>;
    save(logsConfig: IServerLogsConfig): Observable<any>;
    downloadServerLogs(logFileNames: ILogFileNames): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxServerLogsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxServerLogsService>;
}
