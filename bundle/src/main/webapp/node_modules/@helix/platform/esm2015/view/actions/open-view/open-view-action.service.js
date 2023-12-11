import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AdaptDockedPanelService, AdaptModalService, DismissReasons, DockedPanelDirection } from '@bmc-ux/adapt-angular';
import { RxViewActionUtilsService } from '@helix/platform/view/api';
import { RuntimeViewModalComponent, RxRuntimeViewUtilsService } from '@helix/platform/view/runtime';
import { defaults, isObject, transform } from 'lodash';
import { EMPTY, from, throwError } from 'rxjs';
import { catchError, switchMap, switchMapTo, take } from 'rxjs/operators';
import { RX_OPEN_VIEW } from './open-view-action.constant';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@angular/router";
import * as i3 from "@helix/platform/view/runtime";
import * as i4 from "@helix/platform/view/api";
export class RxOpenViewActionService {
    constructor(adaptDockedPanelService, adaptModalService, router, rxRuntimeViewUtilsService, rxViewActionUtilsService) {
        this.adaptDockedPanelService = adaptDockedPanelService;
        this.adaptModalService = adaptModalService;
        this.router = router;
        this.rxRuntimeViewUtilsService = rxRuntimeViewUtilsService;
        this.rxViewActionUtilsService = rxViewActionUtilsService;
    }
    execute(params) {
        const inputParams = transform(params.viewParams, (result, value, key) => {
            result[key] = isObject(value) ? JSON.stringify(value) : String(value !== null && value !== void 0 ? value : '');
        }, {});
        return this.rxRuntimeViewUtilsService.isViewCancellable(params.viewDefinitionName).pipe(switchMap((isViewCancellable) => {
            let runtimeViewApi;
            const modalData = {
                configuration: {
                    viewDefinitionName: params.viewDefinitionName,
                    inputParams: inputParams,
                    onRegisterApi(api) {
                        runtimeViewApi = api;
                    }
                },
                title: params.presentation.title,
                notification: params.presentation.notification,
                isCancellable: isViewCancellable
            };
            const modalConfig = {
                beforeDismiss: (reason) => {
                    // determine if the view is being closed programmatically,
                    // i.e. via executing the Close View action.
                    const isCloseViewAction = !Object.values(DismissReasons).includes(reason);
                    // do not close modal/blade when user clicked on backdrop except when view is cancellable
                    if (!isCloseViewAction && (reason !== DismissReasons.BACKDROP_CLICK || isViewCancellable)) {
                        runtimeViewApi
                            .cancel()
                            .pipe(take(1), catchError((error) => (error ? throwError(error) : EMPTY)))
                            .subscribe();
                    }
                    // only allow to close view if dismiss is triggered by close view action with act as cancel
                    return isCloseViewAction;
                },
                blockKeyboard: !isViewCancellable,
                content: RuntimeViewModalComponent,
                size: params.presentation.modalSize,
                data: modalData
            };
            switch (params.presentation.type) {
                case RX_OPEN_VIEW.type.FullWidth: {
                    return this.openFullWidth(params.presentation.launchBehavior, params.viewDefinitionName, inputParams);
                }
                case RX_OPEN_VIEW.type.CenteredModal: {
                    return this.adaptModalService.open(modalConfig);
                }
                case RX_OPEN_VIEW.type.DockedLeftModal: {
                    return this.adaptDockedPanelService.open(defaults({ direction: DockedPanelDirection.LEFT }, modalConfig));
                }
                case RX_OPEN_VIEW.type.DockedRightModal: {
                    return this.adaptDockedPanelService.open(defaults({ direction: DockedPanelDirection.RIGHT }, modalConfig));
                }
                default: {
                    return this.openFullWidth(params.presentation.launchBehavior, params.viewDefinitionName, inputParams);
                }
            }
        }));
    }
    openFullWidth(launchBehavior, viewDefinitionName, inputParams) {
        const url = this.rxViewActionUtilsService.generateViewUrl(viewDefinitionName, inputParams);
        if (launchBehavior === RX_OPEN_VIEW.launchBehavior.NewWindow) {
            window.open(`${window.location.pathname}#${url}`);
            return throwError(null);
        }
        else {
            return from(this.router.navigateByUrl(url)).pipe(switchMapTo(throwError(null)));
        }
    }
}
RxOpenViewActionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxOpenViewActionService, deps: [{ token: i1.AdaptDockedPanelService }, { token: i1.AdaptModalService }, { token: i2.Router }, { token: i3.RxRuntimeViewUtilsService }, { token: i4.RxViewActionUtilsService }], target: i0.ɵɵFactoryTarget.Injectable });
RxOpenViewActionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxOpenViewActionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxOpenViewActionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.AdaptDockedPanelService }, { type: i1.AdaptModalService }, { type: i2.Router }, { type: i3.RxRuntimeViewUtilsService }, { type: i4.RxViewActionUtilsService }]; } });
//# sourceMappingURL=open-view-action.service.js.map