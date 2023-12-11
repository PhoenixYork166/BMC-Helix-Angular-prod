import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { RxSessionExpirationService } from '../security/session-expiration/session-expiration.service';
import * as i0 from "@angular/core";
export declare class RxKeepSessionAliveResolver implements Resolve<any> {
    private rxSessionExpirationService;
    constructor(rxSessionExpirationService: RxSessionExpirationService);
    resolve(): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxKeepSessionAliveResolver, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxKeepSessionAliveResolver>;
}
