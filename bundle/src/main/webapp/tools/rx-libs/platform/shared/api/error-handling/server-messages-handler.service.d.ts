import { RxNotificationService } from '../notification/notification.service';
import { RxJsonParserService, RxStringService } from '@helix/platform/utils';
import * as i0 from "@angular/core";
export declare class RxServerMessageHandlerService {
    private rxNotificationService;
    private rxJsonParserService;
    private rxStringService;
    constructor(rxNotificationService: RxNotificationService, rxJsonParserService: RxJsonParserService, rxStringService: RxStringService);
    handleServerResponseMessage(serverMessage: string): void;
    private addMessage;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxServerMessageHandlerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxServerMessageHandlerService>;
}
