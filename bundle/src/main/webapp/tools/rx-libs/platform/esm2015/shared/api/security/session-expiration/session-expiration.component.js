import { Component, NgZone } from '@angular/core';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment-es6';
import { ReplaySubject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SessionExpirationType } from './session-expiration.interface';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@ngx-translate/core";
import * as i3 from "@angular/common";
export class RxSessionExpirationComponent {
    constructor(context, translateService, ngZone) {
        this.context = context;
        this.translateService = translateService;
        this.ngZone = ngZone;
        this.isLoading = false;
        this.SessionExpirationType = SessionExpirationType;
        this.destroyed$ = new ReplaySubject(1);
        const data = context.getData();
        this.mode = data.mode;
        this.expirationDate = data.expirationDate;
        this.keepSessionAlive = data.keepSessionAlive;
        this.logout = data.logout;
    }
    ngOnInit() {
        if (this.mode === SessionExpirationType.Idle) {
            this.ngZone.runOutsideAngular(() => {
                timer(0, 1000)
                    .pipe(takeUntil(this.destroyed$))
                    .subscribe(() => {
                    this.ngZone.run(this.checkTime.bind(this));
                });
            });
        }
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    keepAlive() {
        this.isLoading = true;
        this.keepSessionAlive().subscribe(() => {
            this.isLoading = false;
            this.close();
        }, () => {
            this.isLoading = false;
        });
    }
    close() {
        this.context.close();
    }
    checkTime() {
        if (moment().isBefore(this.expirationDate)) {
            const counter = moment.utc(this.expirationDate.getTime() - Date.now()).format('m:ss');
            this.remainingTime = this.translateService.instant('com.bmc.arsys.rx.client.session-expiration-dialog.timer', {
                time: counter
            });
        }
        else {
            this.remainingTime = '0:00';
            this.logout();
        }
    }
}
RxSessionExpirationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSessionExpirationComponent, deps: [{ token: i1.ActiveModalRef }, { token: i2.TranslateService }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
RxSessionExpirationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxSessionExpirationComponent, selector: "rx-session-expiration", ngImport: i0, template: "<div class=\"modal-header\">\n  <h5 class=\"modal-title\">{{ 'com.bmc.arsys.rx.client.common.alert.label' | translate }}</h5>\n\n  <button\n    *ngIf=\"mode === SessionExpirationType.Absolute\"\n    class=\"close dp-close\"\n    aria-label=\"Close\"\n    data-dismiss=\"modal\"\n    type=\"button\"\n    rx-id=\"x-button\"\n    (click)=\"close()\"\n  ></button>\n</div>\n\n<div class=\"modal-body\" [ngSwitch]=\"mode\">\n  <div *ngSwitchCase=\"SessionExpirationType.Idle\">\n    <p>{{ 'com.bmc.arsys.rx.client.session-expiration-dialog.idle-session-message1' | translate }}</p>\n    <p>{{ 'com.bmc.arsys.rx.client.session-expiration-dialog.idle-session-message2' | translate }}</p>\n  </div>\n\n  <div *ngSwitchCase=\"SessionExpirationType.Absolute\">\n    <p>{{ 'com.bmc.arsys.rx.client.session-expiration-dialog.expiring-session-message1' | translate }}</p>\n    <p>{{ 'com.bmc.arsys.rx.client.session-expiration-dialog.expiring-session-message2' | translate }}</p>\n  </div>\n</div>\n\n<div class=\"modal-footer\" [ngSwitch]=\"mode\">\n  <div\n    class=\"rx-session-expiration-countdown text-primary d-icon-left-clock_o\"\n    *ngSwitchCase=\"SessionExpirationType.Idle\"\n    rx-id=\"timer\"\n  >\n    {{ remainingTime }}\n  </div>\n\n  <button\n    *ngSwitchCase=\"SessionExpirationType.Idle\"\n    adapt-button\n    btn-type=\"primary\"\n    size=\"small\"\n    type=\"button\"\n    rx-id=\"continue-button\"\n    [disabled]=\"isLoading\"\n    (click)=\"keepAlive()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.continue.label' | translate }}\n  </button>\n\n  <button\n    *ngSwitchCase=\"SessionExpirationType.Idle\"\n    adapt-button\n    btn-type=\"secondary\"\n    size=\"small\"\n    type=\"button\"\n    rx-id=\"logout-button\"\n    [disabled]=\"isLoading\"\n    (click)=\"logout()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.sign-out.label' | translate }}\n  </button>\n\n  <button\n    *ngSwitchCase=\"SessionExpirationType.Absolute\"\n    adapt-button\n    btn-type=\"primary\"\n    size=\"small\"\n    type=\"button\"\n    rx-id=\"ok-button\"\n    (click)=\"close()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.ok.label' | translate }}\n  </button>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.rx-session-expiration-countdown{font-weight:var(--font-weight-bold);margin-right:auto}\n"], components: [{ type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i3.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }], pipes: { "translate": i2.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSessionExpirationComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-session-expiration',
                    templateUrl: './session-expiration.component.html',
                    styleUrls: ['./session-expiration.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveModalRef }, { type: i2.TranslateService }, { type: i0.NgZone }]; } });
//# sourceMappingURL=session-expiration.component.js.map