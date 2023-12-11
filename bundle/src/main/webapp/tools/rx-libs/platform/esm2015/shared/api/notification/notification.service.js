import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { find, isNil, isUndefined, toNumber, values } from 'lodash';
import { EMPTY, Subject, throwError } from 'rxjs';
import { catchError, filter, switchMap, tap } from 'rxjs/operators';
import { RxAdminSettingsService } from '../administration/admin-settings.service';
import { RxLogService } from '../logging/log.service';
import { RxCurrentUserService } from '../user/current-user.service';
import { NotificationType, RX_DEFAULT_NOTIFICATION_SETTINGS } from './notification.constants';
import * as i0 from "@angular/core";
import * as i1 from "../logging/log.service";
import * as i2 from "@ngx-translate/core";
import * as i3 from "../administration/admin-settings.service";
import * as i4 from "../user/current-user.service";
export class RxNotificationService {
    constructor(rxLogService, translateService, rxAdminSettingsService, rxCurrentUserService) {
        this.rxLogService = rxLogService;
        this.translateService = translateService;
        this.rxAdminSettingsService = rxAdminSettingsService;
        this.rxCurrentUserService = rxCurrentUserService;
        this.issuesToReportSubject$ = new Subject();
        this.notificationSettings = RX_DEFAULT_NOTIFICATION_SETTINGS;
        this.componentName = 'InnovationSuiteServerSetting';
        this.messagesSubject = new Subject();
        this.messages$ = this.messagesSubject.asObservable();
        this.issuesToReport$ = this.issuesToReportSubject$.asObservable();
    }
    addErrorMessage(message, title, config = {}) {
        if (isNil(title)) {
            title = this.translateService.instant('com.bmc.arsys.rx.client.common.error.label');
        }
        this.messagesSubject.next({
            severity: 'error',
            summary: title,
            detail: message,
            life: config.ttl || this.notificationSettings[NotificationType.Error].ttl,
            sticky: this.isSticky(config.ttl, NotificationType.Error),
            data: config.issue
        });
        if (!config.suppressLog) {
            this.rxLogService.error(`${title}: ${message}`);
        }
    }
    addWarningMessage(message, title, config = {}) {
        if (isNil(title)) {
            title = this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label');
        }
        this.messagesSubject.next({
            severity: 'warn',
            summary: title,
            detail: message,
            life: config.ttl || this.notificationSettings[NotificationType.Warning].ttl,
            sticky: this.isSticky(config.ttl, NotificationType.Warning),
            data: config.issue
        });
        this.rxLogService.warning(`${title}: ${message}`);
    }
    addInfoMessage(message, title, config = {}) {
        if (isNil(title)) {
            title = this.translateService.instant('com.bmc.arsys.rx.client.common.info.label');
        }
        this.messagesSubject.next({
            severity: 'info',
            summary: title,
            detail: message,
            life: config.ttl || this.notificationSettings[NotificationType.Info].ttl,
            sticky: this.isSticky(config.ttl, NotificationType.Info)
        });
        this.rxLogService.info(`${title}: ${message}`);
    }
    addSuccessMessage(message, title, config = {}) {
        if (isNil(title)) {
            title = this.translateService.instant('com.bmc.arsys.rx.client.common.success.label');
        }
        this.messagesSubject.next({
            severity: 'success',
            summary: title,
            detail: message,
            life: config.ttl || this.notificationSettings[NotificationType.Success].ttl,
            sticky: this.isSticky(config.ttl, NotificationType.Success)
        });
        this.rxLogService.debug(`${title}: ${message}`);
    }
    reportIssue(issue) {
        this.issuesToReportSubject$.next(issue);
    }
    initialize() {
        this.rxCurrentUserService.user$
            .pipe(filter((user) => Boolean(user)), switchMap(() => {
            if (this.rxCurrentUserService.isAdministrator()) {
                return this.rxAdminSettingsService.getComponentSettings(this.componentName).pipe(tap((settings) => {
                    values(NotificationType).forEach((notificationType) => {
                        const notificationSettings = find(settings.values, ['settingName', notificationType]);
                        if (notificationSettings && notificationSettings.settingValue) {
                            this.notificationSettings[notificationType].ttl =
                                toNumber(notificationSettings.settingValue) * 1000;
                        }
                    });
                }), catchError((err) => {
                    this.rxLogService.warning('Notification Message Preferences cannot be applied. Default values will be used.');
                    return throwError(err);
                }));
            }
            else {
                this.rxLogService.debug('Notification Message Preferences cannot be applied since the current user is not a administrator.');
                return EMPTY;
            }
        }))
            .subscribe();
    }
    isSticky(ttl, messageType) {
        return isUndefined(ttl) ? this.notificationSettings[messageType].ttl === 0 : ttl === 0;
    }
}
RxNotificationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNotificationService, deps: [{ token: i1.RxLogService }, { token: i2.TranslateService }, { token: i3.RxAdminSettingsService }, { token: i4.RxCurrentUserService }], target: i0.ɵɵFactoryTarget.Injectable });
RxNotificationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNotificationService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNotificationService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxLogService }, { type: i2.TranslateService }, { type: i3.RxAdminSettingsService }, { type: i4.RxCurrentUserService }]; } });
//# sourceMappingURL=notification.service.js.map