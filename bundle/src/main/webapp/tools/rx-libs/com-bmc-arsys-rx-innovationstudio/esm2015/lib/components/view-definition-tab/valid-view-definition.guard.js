import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RX_APPLICATION, RxDefinitionNameService, RxGlobalCacheService } from '@helix/platform/shared/api';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@angular/router";
export class RxValidViewDefinitionGuard {
    constructor(rxDefinitionNameService, rxGlobalCacheService, router) {
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.router = router;
    }
    canActivate(route) {
        const viewDefinitionName = route.params.definitionName;
        const bundleId = this.rxDefinitionNameService.getBundleId(viewDefinitionName);
        return this.rxGlobalCacheService.getBundleDescriptor(bundleId).pipe(map((bundleDescriptor) => {
            if (bundleDescriptor.isApplication &&
                this.rxDefinitionNameService.getDisplayName(viewDefinitionName) === RX_APPLICATION.shellDefinitionName) {
                return this.router.createUrlTree([RX_APPLICATION.innovationStudioBundleId, 'shell', bundleId]);
            }
            return true;
        }));
    }
}
/** @nocollapse */ RxValidViewDefinitionGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxValidViewDefinitionGuard, deps: [{ token: i1.RxDefinitionNameService }, { token: i1.RxGlobalCacheService }, { token: i2.Router }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ RxValidViewDefinitionGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxValidViewDefinitionGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxValidViewDefinitionGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxDefinitionNameService }, { type: i1.RxGlobalCacheService }, { type: i2.Router }]; } });
//# sourceMappingURL=valid-view-definition.guard.js.map