import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { RxScriptErrorHandler } from './script-error-handler.service';
import { RxServerErrorHandlerService } from './server-error-handler.service';
import { RxLogService } from '../logging/log.service';
import { RxError } from '@helix/platform/utils';
import * as i0 from "@angular/core";
import * as i1 from "./server-error-handler.service";
import * as i2 from "./script-error-handler.service";
import * as i3 from "../logging/log.service";
export class RxErrorHandlerService extends ErrorHandler {
    constructor(rxServerErrorHandler, rxScriptErrorHandler, rxLogService) {
        super();
        this.rxServerErrorHandler = rxServerErrorHandler;
        this.rxScriptErrorHandler = rxScriptErrorHandler;
        this.rxLogService = rxLogService;
    }
    handleError(error) {
        if (error instanceof HttpErrorResponse) {
            this.rxServerErrorHandler.handle(error);
            super.handleError(error);
        }
        else if (error instanceof Error && !(error instanceof RxError)) {
            // Script error is considered when "error" is
            // an instance of Error but not an instance of RxError
            // (RxError's must only be logged in the debug mode).
            this.rxScriptErrorHandler.handle(error);
            super.handleError(error);
        }
        else {
            this.rxLogService.debug(error.message);
        }
    }
}
RxErrorHandlerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxErrorHandlerService, deps: [{ token: i1.RxServerErrorHandlerService }, { token: i2.RxScriptErrorHandler }, { token: i3.RxLogService }], target: i0.ɵɵFactoryTarget.Injectable });
RxErrorHandlerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxErrorHandlerService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxErrorHandlerService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.RxServerErrorHandlerService }, { type: i2.RxScriptErrorHandler }, { type: i3.RxLogService }]; } });
//# sourceMappingURL=error-handler.service.js.map