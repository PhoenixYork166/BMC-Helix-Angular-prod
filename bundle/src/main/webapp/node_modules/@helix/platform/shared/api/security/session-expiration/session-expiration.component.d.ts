import { NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import { TranslateService } from '@ngx-translate/core';
import { SessionExpirationType } from './session-expiration.interface';
import * as i0 from "@angular/core";
export declare class RxSessionExpirationComponent implements OnInit, OnDestroy {
    context: ActiveModalRef;
    private translateService;
    private ngZone;
    isLoading: boolean;
    remainingTime: string;
    mode: SessionExpirationType;
    SessionExpirationType: typeof SessionExpirationType;
    logout: () => void;
    private destroyed$;
    private keepSessionAlive;
    readonly expirationDate: Date;
    constructor(context: ActiveModalRef, translateService: TranslateService, ngZone: NgZone);
    ngOnInit(): void;
    ngOnDestroy(): void;
    keepAlive(): void;
    close(): void;
    private checkTime;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxSessionExpirationComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxSessionExpirationComponent, "rx-session-expiration", never, {}, {}, never, never>;
}
