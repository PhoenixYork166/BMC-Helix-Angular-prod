import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISystemConfiguration, SystemConfigurationValue } from './administration.types';
import * as i0 from "@angular/core";
export declare class RxSystemConfigurationService {
    private httpClient;
    constructor(httpClient: HttpClient);
    private systemConfigurations;
    initialize(): Observable<ISystemConfiguration[]>;
    getConfigurationSync(identifier: string): SystemConfigurationValue;
    getConfiguration(configurationName: string): Observable<ISystemConfiguration>;
    setConfiguration(configurationName: string, configurationValue: any): Observable<any>;
    queryConfiguration(identifiers: string[]): Observable<ISystemConfiguration[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxSystemConfigurationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxSystemConfigurationService>;
}
