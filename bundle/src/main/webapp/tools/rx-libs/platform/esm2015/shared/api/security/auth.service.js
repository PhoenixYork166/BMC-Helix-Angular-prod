import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultUrlSerializer, NavigationCancel, NavigationEnd, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { RxGlobalCacheService } from '../caching/global-cache.service';
import { RxLocalizationService } from '../localization/localization.service';
import { RxLogService } from '../logging/log.service';
import { RX_SESSION } from './session.constant';
import { RxSessionService } from './session.service';
import { RxUrlUtilsService } from '@helix/platform/utils';
import { RxRssoDebugService } from '../dev/rsso-debug.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/common/http";
import * as i3 from "@angular/router";
import * as i4 from "../caching/global-cache.service";
import * as i5 from "../localization/localization.service";
import * as i6 from "./session.service";
import * as i7 from "../logging/log.service";
import * as i8 from "@helix/platform/utils";
import * as i9 from "../dev/rsso-debug.service";
export class RxAuthService {
    constructor(location, httpClient, router, rxGlobalCacheService, rxLocalizationService, rxSessionService, rxLogService, rxUrlUtilsService, rxRssoDebugService) {
        this.location = location;
        this.httpClient = httpClient;
        this.router = router;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxLocalizationService = rxLocalizationService;
        this.rxSessionService = rxSessionService;
        this.rxLogService = rxLogService;
        this.rxUrlUtilsService = rxUrlUtilsService;
        this.rxRssoDebugService = rxRssoDebugService;
        // URL to redirect after login
        this.targetUrl = '';
        this.defaultUrlSerializer = new DefaultUrlSerializer();
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationCancel || event instanceof NavigationEnd) {
                const bundleId = this.rxUrlUtilsService.getBundleIdFromUrl(event.url);
                const bundleLoginRoute = `/${bundleId}/login`;
                if (event.url !== bundleLoginRoute) {
                    this.targetUrl = event.url;
                }
                else if (event.url === bundleLoginRoute && !this.targetUrl) {
                    this.targetUrl = `/${bundleId}`;
                }
            }
        });
    }
    login(userName, password) {
        return this.httpClient
            .post('/api/rx/authentication/loginrequest', {
            userName,
            password,
            locale: this.rxLocalizationService.currentLocale
        }, { responseType: 'text' })
            .pipe(tap((res) => {
            // This is to avoid having additional url encoding when using router.navigate:
            // for example a space %20 would be encoded to %2520
            // https://stackoverflow.com/questions/46440887/url-encoding-breaking-angular-2-navigation
            this.router.navigateByUrl(this.targetUrl);
        }));
    }
    redirectToLoginPage() {
        this.rxLogService.debug('Redirecting to login page.');
        if (this.rxSessionService.getSsoProviderType() === RX_SESSION.ssoProviderTypes.rsso) {
            this.redirectToRssoLogoutPage();
        }
        else {
            if (this.rxRssoDebugService.isRssoDebugEnabled()) {
                this.redirectToRssoDebugLoginPage();
            }
            else {
                this.redirectToApplicationLoginPage();
            }
        }
    }
    logout() {
        const onRequestEnd = () => {
            this.rxLogService.debug('Destroying session after logout.');
            localStorage.removeItem('lastUserInteraction');
            localStorage.removeItem('idleTimeout');
            localStorage.removeItem('rx-overlay-group-id');
            this.redirectToLoginPage();
        };
        this.rxLogService.debug('Before logout.');
        return this.httpClient
            .post('/api/rx/authentication/logoutrequest', {}, {
            headers: new HttpHeaders({
                'default-bundle-scope': this.rxGlobalCacheService.applicationId
            })
        })
            .pipe(tap(() => {
            this.rxLogService.debug('Logout succeeded.');
            onRequestEnd();
        }), catchError((err) => {
            this.rxLogService.debug('Logout failed.');
            onRequestEnd();
            return throwError(err);
        }));
    }
    redirectToRssoLogoutPage() {
        window.location.href = '/api/rsso-logout';
    }
    redirectToRssoDebugLoginPage() {
        this.router.navigate(['rsso-debug/login'], {
            state: {
                shouldReloadPage: this.rxSessionService.isAlive()
            }
        });
    }
    redirectToApplicationLoginPage() {
        const url = this.location.path();
        // Trying to deduce the bundleId from the url. This can happen if the user tried to directly access a view
        // while not logged in. In this case the application resolver does not kick in and does not set
        // the application ID rxGlobalCacheService.
        const bundleId = this.rxGlobalCacheService.applicationId || this.rxUrlUtilsService.getBundleIdFromUrl(url);
        // The login page should be reloaded in case of session timeout but
        // not if the user connects the first time.
        // auth.interceptor.ts detects if a a rest calls returns http 401 and
        // calls the login page redirection.
        // In the case of a session timeout the session object is still 'alive'.
        if (bundleId) {
            // Post PR #776 the event NavigationCancel / NavigationEnd is not triggered anymore.
            // This was used when the user was directly accessing a url (DRIST-21802).
            // The logic has been added here.
            const bundleLoginRoute = `${bundleId}/login`;
            const isLoginRoute = url === `/${bundleLoginRoute}`;
            if (!isLoginRoute) {
                this.targetUrl = url;
            }
            else if (isLoginRoute && !this.targetUrl) {
                this.targetUrl = `/${bundleId}`;
            }
            // The login page should be reloaded in case of session timeout but
            // not if the user connects the first time.
            // auth.interceptor.ts detects if a a rest calls returns http 401 and
            // calls the login page redirection.
            // In the case of a session timeout the session object is still 'alive'.
            this.router.navigate([bundleLoginRoute], {
                state: {
                    shouldReloadPage: this.rxSessionService.isAlive()
                }
            });
        }
        else {
            this.router.navigate(['unknown-application']);
        }
    }
}
RxAuthService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAuthService, deps: [{ token: i1.Location }, { token: i2.HttpClient }, { token: i3.Router }, { token: i4.RxGlobalCacheService }, { token: i5.RxLocalizationService }, { token: i6.RxSessionService }, { token: i7.RxLogService }, { token: i8.RxUrlUtilsService }, { token: i9.RxRssoDebugService }], target: i0.ɵɵFactoryTarget.Injectable });
RxAuthService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAuthService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAuthService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.Location }, { type: i2.HttpClient }, { type: i3.Router }, { type: i4.RxGlobalCacheService }, { type: i5.RxLocalizationService }, { type: i6.RxSessionService }, { type: i7.RxLogService }, { type: i8.RxUrlUtilsService }, { type: i9.RxRssoDebugService }]; } });
//# sourceMappingURL=auth.service.js.map