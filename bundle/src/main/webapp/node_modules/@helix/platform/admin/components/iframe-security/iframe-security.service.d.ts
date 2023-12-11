import { Observable } from 'rxjs';
import { IIframeSecurities } from './iframe-security.types';
import { RxSystemConfigurationService, ISystemConfiguration } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
export declare class RxIframeSecurityService {
    private rxSystemConfigurationService;
    constructor(rxSystemConfigurationService: RxSystemConfigurationService);
    getIframeSecurities(): Observable<IIframeSecurities>;
    postIframeSecurities(allowedSitesData: ISystemConfiguration, trustedWebsitesData: ISystemConfiguration): Observable<any[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxIframeSecurityService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxIframeSecurityService>;
}
