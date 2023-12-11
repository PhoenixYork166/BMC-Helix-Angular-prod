import { Injectable } from '@angular/core';
import { combineLatest, of, Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { RxNotificationService } from '../notification/notification.service';
import { RxLocalizationService } from '../localization/localization.service';
import { RxSystemConfigurationService } from '../administration';
import * as i0 from "@angular/core";
import * as i1 from "../localization/localization.service";
import * as i2 from "../notification/notification.service";
import * as i3 from "../administration";
export class RxUpgradeTrackerService {
    constructor(rxLocalizationService, rxNotificationService, rxSystemConfigurationService) {
        this.rxLocalizationService = rxLocalizationService;
        this.rxNotificationService = rxNotificationService;
        this.rxSystemConfigurationService = rxSystemConfigurationService;
        this._isUpgradeInProgress = false;
        this._upgradeMessage = '';
        this.isUpgradeInProgressSubject = new Subject();
        this.isUpgradeInProgress$ = this.isUpgradeInProgressSubject.asObservable();
    }
    set upgradeMessage(message) {
        this._upgradeMessage = message;
    }
    get upgradeMessage() {
        return this._upgradeMessage;
    }
    set isUpgradeInProgress(isUpgradeInProgress) {
        const hasStatusChanged = this._isUpgradeInProgress !== isUpgradeInProgress;
        this._isUpgradeInProgress = isUpgradeInProgress;
        if (!this._isUpgradeInProgress) {
            this._upgradeMessage = '';
        }
        if (hasStatusChanged) {
            this.isUpgradeInProgressSubject.next(isUpgradeInProgress);
        }
    }
    get isUpgradeInProgress() {
        return this._isUpgradeInProgress;
    }
    getUpgradeNotification() {
        let upgradeNotification;
        if (!this._upgradeMessage) {
            upgradeNotification = this.rxSystemConfigurationService.getConfiguration('Upgrade-Notification-Text');
        }
        else {
            upgradeNotification = of({
                id: '',
                name: '',
                value: this._upgradeMessage
            });
        }
        return upgradeNotification;
    }
    displayUpgradeNotification(forceNotification) {
        if (this.isUpgradeInProgress && (!this.upgradeMessage || forceNotification)) {
            combineLatest([this.getUpgradeNotification(), this.rxLocalizationService.onTranslationsLoaded$])
                .pipe(first())
                .subscribe(([upgradeMessage]) => {
                this.upgradeMessage = upgradeMessage.value;
                this.rxNotificationService.addWarningMessage(this.upgradeMessage);
            });
        }
    }
}
RxUpgradeTrackerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUpgradeTrackerService, deps: [{ token: i1.RxLocalizationService }, { token: i2.RxNotificationService }, { token: i3.RxSystemConfigurationService }], target: i0.ɵɵFactoryTarget.Injectable });
RxUpgradeTrackerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUpgradeTrackerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUpgradeTrackerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxLocalizationService }, { type: i2.RxNotificationService }, { type: i3.RxSystemConfigurationService }]; } });
//# sourceMappingURL=upgrade-tracker.service.js.map