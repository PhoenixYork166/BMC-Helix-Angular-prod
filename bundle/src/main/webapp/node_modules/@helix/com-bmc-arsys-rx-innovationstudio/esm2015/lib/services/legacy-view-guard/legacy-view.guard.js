import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RX_APPLICATION, RxAngularApplicationService, RxDefinitionNameService, RxLogService } from '@helix/platform/shared/api';
import { RxViewDefinitionService } from '@helix/platform/view/api';
import { includes } from 'lodash';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@helix/platform/view/api";
export class AxLegacyViewGuard {
    constructor(router, rxAngularApplicationService, rxDefinitionNameService, rxViewDefinitionService, rxLogService) {
        this.router = router;
        this.rxAngularApplicationService = rxAngularApplicationService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxViewDefinitionService = rxViewDefinitionService;
        this.rxLogService = rxLogService;
    }
    canActivate(route, state) {
        const { bundleId, definitionName } = route.params;
        const effectiveBundleId = bundleId || this.rxDefinitionNameService.getBundleId(definitionName);
        return forkJoin({
            isAngularJsViewDesigner: this.rxAngularApplicationService.isAngularJsViewDesignerBundle(effectiveBundleId),
            viewDefinition: definitionName
                ? this.rxViewDefinitionService.get(definitionName, {
                    headers: new HttpHeaders({
                        'Design-Time': 'true',
                        'default-bundle-scope': effectiveBundleId
                    })
                })
                : of(null)
        }).pipe(map(({ isAngularJsViewDesigner, viewDefinition }) => {
            var _a, _b, _c, _d;
            if (route.routeConfig.path.includes('new')) {
                if (isAngularJsViewDesigner && ((_a = route.routeConfig.data) === null || _a === void 0 ? void 0 : _a.routerGroup) !== 'legacy-designer') {
                    return this.router.createUrlTree([RX_APPLICATION.innovationStudioBundleId, 'view', 'new-legacy', effectiveBundleId], {
                        queryParams: route.queryParams
                    });
                }
                else if (!isAngularJsViewDesigner && ((_b = route.routeConfig.data) === null || _b === void 0 ? void 0 : _b.routerGroup) === 'legacy-designer') {
                    return this.router.createUrlTree([RX_APPLICATION.innovationStudioBundleId, 'view', 'new', effectiveBundleId], {
                        queryParams: route.queryParams
                    });
                }
                else {
                    return true;
                }
            }
            const isAngularJsEditMode = isAngularJsViewDesigner && !includes(viewDefinition === null || viewDefinition === void 0 ? void 0 : viewDefinition.layout, '"outlets"');
            if (!isAngularJsEditMode && ((_c = route.routeConfig.data) === null || _c === void 0 ? void 0 : _c.routerGroup) === 'legacy-designer') {
                return this.router.createUrlTree([RX_APPLICATION.innovationStudioBundleId, 'view', 'edit', definitionName]);
            }
            else if (isAngularJsEditMode && ((_d = route.routeConfig.data) === null || _d === void 0 ? void 0 : _d.routerGroup) !== 'legacy-designer') {
                return this.router.createUrlTree([
                    RX_APPLICATION.innovationStudioBundleId,
                    'view',
                    'edit-legacy',
                    definitionName
                ]);
            }
            else {
                return true;
            }
        }), catchError((error) => {
            this.rxLogService.error(error.message);
            return of(this.router.createUrlTree([RX_APPLICATION.innovationStudioBundleId, effectiveBundleId, 'view-definitions']));
        }));
    }
}
/** @nocollapse */ AxLegacyViewGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AxLegacyViewGuard, deps: [{ token: i1.Router }, { token: i2.RxAngularApplicationService }, { token: i2.RxDefinitionNameService }, { token: i3.RxViewDefinitionService }, { token: i2.RxLogService }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ AxLegacyViewGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AxLegacyViewGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AxLegacyViewGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.Router }, { type: i2.RxAngularApplicationService }, { type: i2.RxDefinitionNameService }, { type: i3.RxViewDefinitionService }, { type: i2.RxLogService }]; } });
//# sourceMappingURL=legacy-view.guard.js.map