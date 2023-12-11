import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { AdaptModalService } from '@bmc-ux/adapt-angular';
import { RxComponentCanDeactivateGuard } from '../../navigation/component-can-deactivate.guard';
import { debounce, isNaN, noop } from 'lodash';
import moment from 'moment-es6';
import { RX_RESOURCE_URLS } from '../../resource-urls.constant';
import { RxAuthService } from '../auth.service';
import { RX_SESSION } from '../session.constant';
import { RxSessionService } from '../session.service';
import { RxSessionExpirationComponent } from './session-expiration.component';
import { SessionExpirationType } from './session-expiration.interface';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "../auth.service";
import * as i4 from "../session.service";
import * as i5 from "../../navigation/component-can-deactivate.guard";
export class RxSessionExpirationService {
    constructor(httpClient, adaptModalService, rxAuthService, ngZone, rxSessionService, rxComponentCanDeactivateGuard) {
        this.httpClient = httpClient;
        this.adaptModalService = adaptModalService;
        this.rxAuthService = rxAuthService;
        this.ngZone = ngZone;
        this.rxSessionService = rxSessionService;
        this.rxComponentCanDeactivateGuard = rxComponentCanDeactivateGuard;
        this.trackUserInteractionDebounced = debounce(this.trackUserInteraction, RX_SESSION.userInteractionThrottleTimeMs, { leading: true, trailing: false });
        this.sessionExpirationInfos = {
            [SessionExpirationType.Absolute]: {},
            [SessionExpirationType.Idle]: {}
        };
        RX_SESSION.userInteractionEvents.forEach((e) => window.addEventListener(e, this.trackUserInteractionDebounced.bind(this)));
    }
    setTimeout(type, time) {
        const mDate = moment(time);
        const isValid = this.isValidTimeout(mDate);
        if (isValid && mDate.isAfter(this.sessionExpirationInfos[type].timeout)) {
            this.sessionExpirationInfos[type].timeout = mDate.toDate();
            if (this.isIdleTimeout(type)) {
                localStorage.setItem('idleTimeout', this.sessionExpirationInfos[type].timeout.toString());
                localStorage.removeItem('lastUserInteraction');
            }
            this.updateTimeoutHandler(type, this.sessionExpirationInfos[type].timeout);
        }
    }
    keepSessionAlive() {
        const lastUserInteraction = this.getLastUserInteraction();
        return this.httpClient.post(RX_RESOURCE_URLS.command, {
            resourceType: RX_SESSION.keepAliveCommand
        }, {
            headers: {
                'AR-JWT-Refresh-From': lastUserInteraction
                    ? new Date(lastUserInteraction).toUTCString()
                    : new Date().toUTCString()
            }
        });
    }
    logout() {
        this.rxComponentCanDeactivateGuard.disable();
        this.sessionExpirationModal.reject();
        this.rxAuthService.logout().subscribe();
    }
    trackUserInteraction() {
        if (this.rxSessionService.isAlive()) {
            localStorage.setItem('lastUserInteraction', Date.now().toString());
        }
    }
    getLastUserInteraction() {
        const lastUserInteraction = Number(localStorage.getItem('lastUserInteraction'));
        return !isNaN(lastUserInteraction) ? lastUserInteraction : null;
    }
    getIdleSessionTimeout() {
        const idleTimeout = new Date(localStorage.getItem('idleTimeout'));
        return moment(idleTimeout).isValid() ? idleTimeout : null;
    }
    updateTimeoutHandler(type, expirationDate) {
        const showWarnInMs = this.getTimeToSessionExpirationWarning(expirationDate);
        this.clearTimer(type);
        this.sessionExpirationInfos[type].timeout = expirationDate;
        if (showWarnInMs > 0) {
            // run outside angular to keep app 'stable' as required by QA automation
            this.ngZone.runOutsideAngular(() => {
                this.sessionExpirationInfos[type].timer = setTimeout(() => {
                    this.ngZone.run(() => {
                        if (this.isIdleTimeout(type)) {
                            this.showIdleTimeoutWarning(expirationDate);
                        }
                        else if (type === SessionExpirationType.Absolute) {
                            this.showAbsoluteTimeoutWarning();
                        }
                    });
                }, showWarnInMs);
            });
        }
    }
    isIdleTimeout(type) {
        return (type === SessionExpirationType.Idle &&
            !moment(this.sessionExpirationInfos[SessionExpirationType.Idle].timeout).isSame(moment(this.sessionExpirationInfos[SessionExpirationType.Absolute].timeout)));
    }
    getTimeToSessionExpirationWarning(timeout) {
        return moment(timeout).subtract(RX_SESSION.minutesBeforeLogout, 'minutes').diff(moment());
    }
    showIdleTimeoutWarning(expirationDate) {
        if (this.rxSessionService.isAlive() && !this.getLastUserInteraction()) {
            const idleSessionTimeout = new Date(this.getIdleSessionTimeout());
            if (idleSessionTimeout &&
                moment(idleSessionTimeout).isAfter(this.sessionExpirationInfos[SessionExpirationType.Idle].timeout)) {
                this.updateTimeoutHandler(SessionExpirationType.Idle, idleSessionTimeout);
            }
            else {
                this.openModal(SessionExpirationType.Idle, {
                    expirationDate,
                    keepSessionAlive: this.keepSessionAlive.bind(this),
                    logout: this.logout.bind(this)
                });
            }
        }
        else {
            this.keepSessionAlive().subscribe();
        }
    }
    showAbsoluteTimeoutWarning() {
        this.openModal(SessionExpirationType.Absolute);
        // run outside angular to keep app 'stable' as required by QA automation
        this.ngZone.runOutsideAngular(() => {
            setTimeout(() => {
                this.ngZone.run(() => {
                    this.logout();
                });
            }, RX_SESSION.minutesBeforeLogout * 60 * 1000);
        });
    }
    openModal(mode, data) {
        this.sessionExpirationModal = this.adaptModalService.open({
            content: RxSessionExpirationComponent,
            beforeDismiss: () => false,
            size: 'sm',
            data: Object.assign({ mode }, data)
        });
        // should be removed after ADAPT issue is resolved:
        // https://github.bmc.com/bmc-ux/adapt-angular/issues/2746
        this.sessionExpirationModal.then(noop, noop);
    }
    isValidTimeout(date) {
        return this.rxSessionService.isAlive() && date.isValid() && date.isAfter(moment());
    }
    clearTimer(type) {
        if (this.sessionExpirationInfos[type].timer) {
            clearTimeout(this.sessionExpirationInfos[type].timer);
            this.sessionExpirationInfos[type].timer = null;
        }
    }
}
RxSessionExpirationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSessionExpirationService, deps: [{ token: i1.HttpClient }, { token: i2.AdaptModalService }, { token: i3.RxAuthService }, { token: i0.NgZone }, { token: i4.RxSessionService }, { token: i5.RxComponentCanDeactivateGuard }], target: i0.ɵɵFactoryTarget.Injectable });
RxSessionExpirationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSessionExpirationService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSessionExpirationService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.AdaptModalService }, { type: i3.RxAuthService }, { type: i0.NgZone }, { type: i4.RxSessionService }, { type: i5.RxComponentCanDeactivateGuard }]; } });
//# sourceMappingURL=session-expiration.service.js.map