import { ChangeDetectorRef, OnInit } from '@angular/core';
import { AdaptMessageService } from '@bmc-ux/adapt-angular';
import { TranslateService } from '@ngx-translate/core';
import { RxNotificationService } from '../notification.service';
import { RxSessionService } from '../../security/session.service';
import * as i0 from "@angular/core";
export declare class RxNotificationComponent implements OnInit {
    private rxNotificationService;
    private rxSessionService;
    private translateService;
    private changeDetector;
    private adaptMessageService;
    constructor(rxNotificationService: RxNotificationService, rxSessionService: RxSessionService, translateService: TranslateService, changeDetector: ChangeDetectorRef, adaptMessageService: AdaptMessageService);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxNotificationComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxNotificationComponent, "rx-notification", never, {}, {}, never, never>;
}
