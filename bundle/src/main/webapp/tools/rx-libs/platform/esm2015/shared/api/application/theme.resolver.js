import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mapTo, shareReplay, switchMapTo } from 'rxjs/operators';
import { RxSessionService } from '../security/session.service';
import { RxThemingService } from '../theming';
import * as i0 from "@angular/core";
import * as i1 from "../security/session.service";
import * as i2 from "../theming";
export class RxThemeResolver {
    constructor(document, rxSessionService, rxThemingService) {
        this.document = document;
        this.rxSessionService = rxSessionService;
        this.rxThemingService = rxThemingService;
        this.themeLoaded$ = new Observable((observer) => {
            const link = this.document.createElement('link');
            link.rel = 'stylesheet';
            link.href = '/api/rx/application/theme/adapt-css-bs4.css';
            link.onload = () => {
                this.rxThemingService.setCssVariables();
                observer.next();
                observer.complete();
            };
            link.onerror = () => {
                observer.next();
                observer.complete();
            };
            this.document.head.appendChild(link);
        }).pipe(shareReplay(1));
    }
    canActivate() {
        return this.rxSessionService.sessionActive$.pipe(switchMapTo(this.themeLoaded$), mapTo(true));
    }
}
RxThemeResolver.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxThemeResolver, deps: [{ token: DOCUMENT }, { token: i1.RxSessionService }, { token: i2.RxThemingService }], target: i0.ɵɵFactoryTarget.Injectable });
RxThemeResolver.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxThemeResolver, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxThemeResolver, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i1.RxSessionService }, { type: i2.RxThemingService }]; } });
//# sourceMappingURL=theme.resolver.js.map