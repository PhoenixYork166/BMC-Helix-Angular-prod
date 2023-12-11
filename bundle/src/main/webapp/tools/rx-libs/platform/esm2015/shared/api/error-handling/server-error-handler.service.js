import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { compact, includes, isString, some, truncate } from 'lodash';
import { RxNotificationService } from '../notification/notification.service';
import { RX_ERROR_HANDLING } from './error-handling.constant';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
import * as i2 from "../notification/notification.service";
export class RxServerErrorHandlerService {
    constructor(translateService, rxNotificationService) {
        this.translateService = translateService;
        this.rxNotificationService = rxNotificationService;
    }
    getServerResponseErrorDetails(responseData) {
        let messages;
        try {
            messages = JSON.parse(responseData);
        }
        catch (ignored) {
            messages = [...responseData];
        }
        if (Array.isArray(messages)) {
            return messages.filter((message) => message.messageType !== RX_ERROR_HANDLING.messageTypes.success &&
                (message.messageText || message.appendedText));
        }
        else {
            return null;
        }
    }
    buildMessageFromRawResponse(response) {
        const errorMessage = {
            title: '',
            message: ''
        };
        if (response.status === 0) {
            errorMessage.title = this.translateService.instant('com.bmc.arsys.rx.client.error-handling.network-error.title');
            errorMessage.message = this.translateService.instant('com.bmc.arsys.rx.client.error-handling.network-error.message');
        }
        else {
            errorMessage.title = this.translateService.instant('com.bmc.arsys.rx.client.error-handling.server-communication-error.title');
            errorMessage.message = this.translateService.instant('com.bmc.arsys.rx.client.error-handling.server-communication-error.message', {
                status: compact([response.status, response.statusText]).join(' ')
            });
        }
        return errorMessage;
    }
    buildMessageFromErrorDetails(error) {
        return {
            title: `${error.messageType} (${error.messageNumber})`,
            message: truncate([error.messageText, error.appendedText].filter(Boolean).join(' '), {
                length: RX_ERROR_HANDLING.maxErrorMessageLength
            })
        };
    }
    handle(error) {
        if (!this.canIgnore(error)) {
            const operationId = error.headers.get('operation-id');
            if (Array.isArray(error.error) || isString(error.error)) {
                const messages = this.getServerResponseErrorDetails(error.error);
                messages.forEach((message) => {
                    const messageDetails = this.buildMessageFromErrorDetails(message);
                    switch (message.messageType) {
                        case RX_ERROR_HANDLING.messageTypes.error:
                            this.rxNotificationService.addErrorMessage(messageDetails.message, messageDetails.title, {
                                issue: Object.assign(Object.assign({}, message), { operationId, enableIssueReporting: true })
                            });
                            break;
                        case RX_ERROR_HANDLING.messageTypes.warning:
                            this.rxNotificationService.addWarningMessage(messageDetails.message, messageDetails.title, {
                                issue: Object.assign(Object.assign({}, message), { operationId, enableIssueReporting: true })
                            });
                            break;
                        case RX_ERROR_HANDLING.messageTypes.info:
                            this.rxNotificationService.addInfoMessage(messageDetails.message, messageDetails.title);
                            break;
                    }
                });
            }
            else {
                const errorMessage = this.buildMessageFromRawResponse(error);
                this.rxNotificationService.addErrorMessage(errorMessage.message, errorMessage.title);
            }
        }
    }
    canIgnore(err) {
        return some(RX_ERROR_HANDLING.ignoredErrors, (ignoredError) => ignoredError.status === err.status && includes(JSON.stringify(err.error), ignoredError.contains));
    }
}
RxServerErrorHandlerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxServerErrorHandlerService, deps: [{ token: i1.TranslateService }, { token: i2.RxNotificationService }], target: i0.ɵɵFactoryTarget.Injectable });
RxServerErrorHandlerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxServerErrorHandlerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxServerErrorHandlerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.TranslateService }, { type: i2.RxNotificationService }]; } });
//# sourceMappingURL=server-error-handler.service.js.map