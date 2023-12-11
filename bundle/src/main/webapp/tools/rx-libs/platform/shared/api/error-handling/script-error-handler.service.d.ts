import { TranslateService } from '@ngx-translate/core';
import { RxLogService } from '../logging/log.service';
import { RxNotificationService } from '../notification/notification.service';
import * as i0 from "@angular/core";
export declare class RxScriptErrorHandler {
    private rxNotificationService;
    private rxLogService;
    private translateService;
    constructor(rxNotificationService: RxNotificationService, rxLogService: RxLogService, translateService: TranslateService);
    handle(error: Error): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxScriptErrorHandler, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxScriptErrorHandler>;
}
