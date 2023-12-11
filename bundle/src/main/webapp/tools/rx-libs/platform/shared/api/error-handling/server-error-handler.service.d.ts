import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { RxNotificationService } from '../notification/notification.service';
import { IErrorMessage, IServerResponseMessage } from './error-handling.types';
import * as i0 from "@angular/core";
export declare class RxServerErrorHandlerService {
    private translateService;
    private rxNotificationService;
    constructor(translateService: TranslateService, rxNotificationService: RxNotificationService);
    getServerResponseErrorDetails(responseData: any): IServerResponseMessage[];
    buildMessageFromRawResponse(response: any): IErrorMessage;
    buildMessageFromErrorDetails(error: IServerResponseMessage): IErrorMessage;
    handle(error: HttpErrorResponse): void;
    private canIgnore;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxServerErrorHandlerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxServerErrorHandlerService>;
}
