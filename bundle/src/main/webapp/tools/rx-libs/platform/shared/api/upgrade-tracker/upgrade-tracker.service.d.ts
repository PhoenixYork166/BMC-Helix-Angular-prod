import { Observable } from 'rxjs';
import { RxNotificationService } from '../notification/notification.service';
import { RxLocalizationService } from '../localization/localization.service';
import { RxSystemConfigurationService } from '../administration';
import * as i0 from "@angular/core";
export declare class RxUpgradeTrackerService {
    private rxLocalizationService;
    private rxNotificationService;
    private rxSystemConfigurationService;
    private _isUpgradeInProgress;
    private _upgradeMessage;
    private isUpgradeInProgressSubject;
    isUpgradeInProgress$: Observable<boolean>;
    constructor(rxLocalizationService: RxLocalizationService, rxNotificationService: RxNotificationService, rxSystemConfigurationService: RxSystemConfigurationService);
    set upgradeMessage(message: string);
    get upgradeMessage(): string;
    set isUpgradeInProgress(isUpgradeInProgress: boolean);
    get isUpgradeInProgress(): boolean;
    private getUpgradeNotification;
    displayUpgradeNotification(forceNotification: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxUpgradeTrackerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxUpgradeTrackerService>;
}
