import { Injectable } from '@angular/core';
import { concat, of } from 'rxjs';
import { mapTo, shareReplay, tap } from 'rxjs/operators';
import { RxSystemConfigurationService } from '../administration';
import { RxOverlayService } from '../overlay/overlay.service';
import { RxCurrentUserService, RxUserService } from '../user';
import * as i0 from "@angular/core";
import * as i1 from "../user";
import * as i2 from "../overlay/overlay.service";
import * as i3 from "../administration";
export class RxSessionService {
    constructor(rxCurrentUserService, rxUserService, rxOverlayService, rxSystemConfigurationService) {
        this.rxCurrentUserService = rxCurrentUserService;
        this.rxUserService = rxUserService;
        this.rxOverlayService = rxOverlayService;
        this.rxSystemConfigurationService = rxSystemConfigurationService;
        this.ssoProviderType = null;
        this.sessionActive$ = concat(this.initCurrentUser(), this.rxSystemConfigurationService.initialize()).pipe(mapTo(true), shareReplay(1));
    }
    initSession() {
        return this.isAlive() ? of(true) : this.sessionActive$;
    }
    isAlive() {
        return Boolean(this.rxCurrentUserService.get());
    }
    getSsoProviderType() {
        return this.ssoProviderType;
    }
    initCurrentUser() {
        return this.rxUserService.getCurrentUser().pipe(tap((user) => {
            this.rxCurrentUserService.set(user);
            this.rxOverlayService.setCurrentOverlayContextOnSessionInit(user);
            this.ssoProviderType = user.ssoProviderType;
        }));
    }
}
RxSessionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSessionService, deps: [{ token: i1.RxCurrentUserService }, { token: i1.RxUserService }, { token: i2.RxOverlayService }, { token: i3.RxSystemConfigurationService }], target: i0.ɵɵFactoryTarget.Injectable });
RxSessionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSessionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSessionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxCurrentUserService }, { type: i1.RxUserService }, { type: i2.RxOverlayService }, { type: i3.RxSystemConfigurationService }]; } });
//# sourceMappingURL=session.service.js.map