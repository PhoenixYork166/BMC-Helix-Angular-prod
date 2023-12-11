import { Observable } from 'rxjs';
import { RxSystemConfigurationService } from '../administration';
import { RxOverlayService } from '../overlay/overlay.service';
import { RxCurrentUserService, RxUserService } from '../user';
import * as i0 from "@angular/core";
export declare class RxSessionService {
    private rxCurrentUserService;
    private rxUserService;
    private rxOverlayService;
    private rxSystemConfigurationService;
    private ssoProviderType;
    sessionActive$: Observable<boolean>;
    constructor(rxCurrentUserService: RxCurrentUserService, rxUserService: RxUserService, rxOverlayService: RxOverlayService, rxSystemConfigurationService: RxSystemConfigurationService);
    initSession(): Observable<boolean>;
    isAlive(): boolean;
    getSsoProviderType(): string;
    private initCurrentUser;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxSessionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxSessionService>;
}
