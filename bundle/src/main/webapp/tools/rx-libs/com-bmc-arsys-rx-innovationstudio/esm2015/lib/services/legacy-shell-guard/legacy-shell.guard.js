import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { includes } from 'lodash';
import { RX_APPLICATION, RxAngularApplicationService, RxDefinitionNameService, RxLogService } from '@helix/platform/shared/api';
import { RxViewDefinitionService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@helix/platform/view/api";
export class AxLegacyShellGuard {
    constructor(router, rxAngularApplicationService, rxDefinitionNameService, rxViewDefinitionService, rxLogService) {
        this.router = router;
        this.rxAngularApplicationService = rxAngularApplicationService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxViewDefinitionService = rxViewDefinitionService;
        this.rxLogService = rxLogService;
    }
    canActivate(route, state) {
        const { bundleId } = route.params;
        return forkJoin({
            isAngularJsApplication: this.rxAngularApplicationService.isAngularJsApplication(bundleId),
            shellViewDefinition: this.rxViewDefinitionService.get(this.rxDefinitionNameService.getDefinitionName(bundleId, RX_APPLICATION.shellDefinitionName))
        }).pipe(map(({ isAngularJsApplication, shellViewDefinition }) => {
            const isAngularJs = isAngularJsApplication && !includes(shellViewDefinition.layout, '"outlets"');
            if (isAngularJs && route.parent.routeConfig.path === 'shell') {
                return this.router.createUrlTree([RX_APPLICATION.innovationStudioBundleId, 'shell-legacy', bundleId]);
            }
            else if (!isAngularJs && route.parent.routeConfig.path === 'shell-legacy') {
                return this.router.createUrlTree([RX_APPLICATION.innovationStudioBundleId, 'shell', bundleId]);
            }
            else {
                return true;
            }
        }), catchError((error) => {
            this.rxLogService.error(error.message);
            return of(this.router.createUrlTree([RX_APPLICATION.innovationStudioBundleId, bundleId, 'record-definitions']));
        }));
    }
}
/** @nocollapse */ AxLegacyShellGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AxLegacyShellGuard, deps: [{ token: i1.Router }, { token: i2.RxAngularApplicationService }, { token: i2.RxDefinitionNameService }, { token: i3.RxViewDefinitionService }, { token: i2.RxLogService }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ AxLegacyShellGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AxLegacyShellGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AxLegacyShellGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.Router }, { type: i2.RxAngularApplicationService }, { type: i2.RxDefinitionNameService }, { type: i3.RxViewDefinitionService }, { type: i2.RxLogService }]; } });
//# sourceMappingURL=legacy-shell.guard.js.map