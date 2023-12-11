import { ErrorHandler } from '@angular/core';
import { RxScriptErrorHandler } from './script-error-handler.service';
import { RxServerErrorHandlerService } from './server-error-handler.service';
import { RxLogService } from '../logging/log.service';
import * as i0 from "@angular/core";
export declare class RxErrorHandlerService extends ErrorHandler {
    private rxServerErrorHandler;
    private rxScriptErrorHandler;
    private rxLogService;
    constructor(rxServerErrorHandler: RxServerErrorHandlerService, rxScriptErrorHandler: RxScriptErrorHandler, rxLogService: RxLogService);
    handleError(error: Error): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxErrorHandlerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxErrorHandlerService>;
}
