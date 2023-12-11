import { ErrorHandler, Injectable } from '@angular/core';
import { castArray, isString } from 'lodash';
import { from } from 'rxjs';
import { map, mergeScan, take } from 'rxjs/operators';
import { RxGlobalEventsService, RxLogService } from '@helix/platform/shared/api';
import { RxViewActionService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@helix/platform/view/api";
export class ViewComponentEventManager {
    constructor(rxGlobalEventsService, rxLogService, rxViewActionService, errorHandler) {
        this.rxGlobalEventsService = rxGlobalEventsService;
        this.rxLogService = rxLogService;
        this.rxViewActionService = rxViewActionService;
        this.errorHandler = errorHandler;
    }
    executeActions(actions, actionCallback) {
        return new Promise((resolve, reject) => {
            let resultValue;
            from(actions)
                .pipe(mergeScan((acc, currentAction) => {
                this.rxLogService.debug('ACTION STARTED: ' + currentAction.name);
                return this.rxViewActionService.execute(currentAction.name, currentAction.parameters).pipe(map((result) => actionCallback(currentAction, result)), take(1));
            }, null, 1))
                .subscribe({
                next: (result) => (resultValue = result),
                error: (error) => {
                    reject(error);
                    this.rxGlobalEventsService.viewActionsCompleted$.next();
                    castArray(error).forEach((e) => {
                        if (isString(e)) {
                            this.rxLogService.warning(e);
                        }
                        else if (e) {
                            this.errorHandler.handleError(e);
                        }
                    });
                },
                complete: () => {
                    this.rxGlobalEventsService.viewActionsCompleted$.next();
                    resolve(resultValue);
                }
            });
        });
    }
}
ViewComponentEventManager.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewComponentEventManager, deps: [{ token: i1.RxGlobalEventsService }, { token: i1.RxLogService }, { token: i2.RxViewActionService }, { token: i0.ErrorHandler }], target: i0.ɵɵFactoryTarget.Injectable });
ViewComponentEventManager.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewComponentEventManager, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewComponentEventManager, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxGlobalEventsService }, { type: i1.RxLogService }, { type: i2.RxViewActionService }, { type: i0.ErrorHandler }]; } });
//# sourceMappingURL=view-component-event-manager.class.js.map