import { Injectable } from '@angular/core';
import { reject, truncate } from 'lodash';
import { RxNotificationService } from '../notification/notification.service';
import { RX_ERROR_HANDLING } from './error-handling.constant';
import { RxJsonParserService, RxStringService } from '@helix/platform/utils';
import * as i0 from "@angular/core";
import * as i1 from "../notification/notification.service";
import * as i2 from "@helix/platform/utils";
export class RxServerMessageHandlerService {
    constructor(rxNotificationService, rxJsonParserService, rxStringService) {
        this.rxNotificationService = rxNotificationService;
        this.rxJsonParserService = rxJsonParserService;
        this.rxStringService = rxStringService;
    }
    handleServerResponseMessage(serverMessage) {
        const decodedMessage = this.rxStringService.decodeQ(serverMessage);
        const messages = reject(this.rxJsonParserService.tryParseJson(decodedMessage, []), (message) => message.messageNumber === RX_ERROR_HANDLING.arNoteLogInfo);
        messages.forEach(this.addMessage.bind(this));
    }
    addMessage(message) {
        let messageTitle = `${message.messageType}`;
        if (message.messageType !== RX_ERROR_HANDLING.messageTypes.success) {
            messageTitle += ` (${message.messageNumber})`;
        }
        const messageString = truncate(`${[message.appendedText, message.messageText].filter(Boolean).join(' ')}`, {
            length: RX_ERROR_HANDLING.maxArMessageLength
        });
        switch (message.messageType) {
            case RX_ERROR_HANDLING.messageTypes.warning: {
                this.rxNotificationService.addWarningMessage(messageString, messageTitle);
                break;
            }
            case RX_ERROR_HANDLING.messageTypes.success: {
                this.rxNotificationService.addSuccessMessage(messageString, messageTitle);
                break;
            }
            default: {
                this.rxNotificationService.addInfoMessage(messageString, messageTitle);
                break;
            }
        }
    }
}
RxServerMessageHandlerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxServerMessageHandlerService, deps: [{ token: i1.RxNotificationService }, { token: i2.RxJsonParserService }, { token: i2.RxStringService }], target: i0.ɵɵFactoryTarget.Injectable });
RxServerMessageHandlerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxServerMessageHandlerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxServerMessageHandlerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxNotificationService }, { type: i2.RxJsonParserService }, { type: i2.RxStringService }]; } });
//# sourceMappingURL=server-messages-handler.service.js.map