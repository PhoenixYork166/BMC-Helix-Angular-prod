import { Injectable } from '@angular/core';
import { RxTreeService } from '@helix/platform/utils';
import { find, get, includes, isNull } from 'lodash';
import { RxBundleService } from '../bundle/bundle.service';
import { RxLogService } from '../logging/log.service';
import { RxCurrentUserService } from '../user/current-user.service';
import { RX_OVERLAY } from './overlay.constant';
import { DevelopmentMode } from './overlay.types';
import { RxGlobalCacheService } from '../caching/global-cache.service';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/utils";
import * as i2 from "../logging/log.service";
import * as i3 from "../bundle/bundle.service";
import * as i4 from "../user/current-user.service";
import * as i5 from "../caching/global-cache.service";
export class RxOverlayService {
    constructor(rxTreeService, rxLogService, rxBundleService, rxCurrentUserService, rxGlobalCacheService) {
        this.rxTreeService = rxTreeService;
        this.rxLogService = rxLogService;
        this.rxBundleService = rxBundleService;
        this.rxCurrentUserService = rxCurrentUserService;
        this.rxGlobalCacheService = rxGlobalCacheService;
    }
    areNewDefinitionsAllowed(bundleId) {
        return this.rxGlobalCacheService
            .getBundleDescriptor(bundleId)
            .pipe(map((bundleDescriptor) => this.areNewDefinitionsAllowedSync(bundleDescriptor)));
    }
    areNewDefinitionsAllowedSync(bundleDescriptor) {
        return (this.isBundleEditable(bundleDescriptor.id) &&
            !(bundleDescriptor.platformBundle && this.getCurrentOverlayGroupId() === RX_OVERLAY.overlayGroupIds.overlay));
    }
    setCurrentOverlayContextOnSessionInit(user) {
        const userOverlayGroupDescriptors = user.userOverlayGroupDescriptors;
        const defaultOverlayGroupId = user.defaultOverlayGroupId;
        if (!this.userHasAccessToMultipleOverlays(userOverlayGroupDescriptors)) {
            return;
        }
        const savedOverlayGroupId = localStorage.getItem('rx-overlay-group-id');
        const contextDescriptors = this.rxTreeService.flattenTree(userOverlayGroupDescriptors[0], 'userOverlayGroupDescriptorChildren');
        if (savedOverlayGroupId) {
            this.overlay = find(contextDescriptors, { overlayGroupId: savedOverlayGroupId });
            // use default defaultOverlayGroupId if the saved overlay context is missing in contextDescriptors
            if (!this.overlay) {
                this.overlay = find(contextDescriptors, { overlayGroupId: defaultOverlayGroupId });
                this.rxLogService.debug(`Invalid Overlay Group ID: ${savedOverlayGroupId}. The Overlay Group ID has been set to the default value: ${defaultOverlayGroupId}`);
            }
        }
        else {
            this.overlay = find(contextDescriptors, { overlayGroupId: defaultOverlayGroupId });
        }
    }
    getOverlayOperation(overlayGroupId, parentOverlayGroupId) {
        const currentOverlayGroupId = this.getCurrentOverlayGroupId();
        let operationType = RX_OVERLAY.operationTypes.notCustomizedInThisOverlayGroup;
        if (currentOverlayGroupId === overlayGroupId) {
            operationType = parentOverlayGroupId
                ? RX_OVERLAY.operationTypes.customizedInThisOverlayGroup
                : RX_OVERLAY.operationTypes.createdInThisOverlayGroup;
        }
        return operationType;
    }
    isCustomizationEnabled(type, definition) {
        if (definition.lastUpdateTime) {
            const overlayDescriptor = definition.overlayDescriptor || { parentOverlayGroupId: null };
            const overlayOperation = this.getOverlayOperation(definition.overlayGroupId, overlayDescriptor.parentOverlayGroupId);
            if (overlayOperation === RX_OVERLAY.operationTypes.createdInThisOverlayGroup) {
                return true;
            }
            return isNull(type) ? false : definition[type];
        }
        else {
            return true;
        }
    }
    isBundleEditable(bundleId) {
        return (this.isCurrentOverlayGroupWritable() &&
            (!this.rxCurrentUserService.isBusinessAnalyst() ||
                includes(this.rxCurrentUserService.getEditableBundles(), bundleId)));
    }
    isCurrentOverlayGroupWritable() {
        const user = this.rxCurrentUserService.get();
        const contextDescriptors = [
            ...user.userOverlayGroupDescriptors,
            ...user.userOverlayGroupDescriptors[0].userOverlayGroupDescriptorChildren
        ];
        const currentOverlayGroupId = this.getCurrentOverlayGroupId();
        return find(contextDescriptors, { overlayGroupId: currentOverlayGroupId }).isWritable;
    }
    getCurrentOverlayContext() {
        return this.overlay;
    }
    setDevelopmentMode(developmentMode) {
        const overlayGroupId = developmentMode === DevelopmentMode.Base ? RX_OVERLAY.overlayGroupIds.base : RX_OVERLAY.overlayGroupIds.overlay;
        localStorage.setItem('rx-overlay-group-id', overlayGroupId);
    }
    getDevelopmentMode() {
        const overlayGroupId = this.getCurrentOverlayContext().overlayGroupId;
        return overlayGroupId === RX_OVERLAY.overlayGroupIds.base ? DevelopmentMode.Base : DevelopmentMode.BestPractice;
    }
    userHasAccessToMultipleOverlays(overlayGroup) {
        return get(overlayGroup, '[0].userOverlayGroupDescriptorChildren.length') >= 1;
    }
    getCurrentOverlayGroupId() {
        return this.overlay.overlayGroupId || this.rxCurrentUserService.get().defaultOverlayGroupId;
    }
    getUserDefaultOverlayGroupId() {
        var _a, _b;
        return (_b = (_a = this.getCurrentOverlayContext()) === null || _a === void 0 ? void 0 : _a.overlayGroupId) !== null && _b !== void 0 ? _b : this.rxCurrentUserService.get().defaultOverlayGroupId;
    }
}
RxOverlayService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxOverlayService, deps: [{ token: i1.RxTreeService }, { token: i2.RxLogService }, { token: i3.RxBundleService }, { token: i4.RxCurrentUserService }, { token: i5.RxGlobalCacheService }], target: i0.ɵɵFactoryTarget.Injectable });
RxOverlayService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxOverlayService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxOverlayService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxTreeService }, { type: i2.RxLogService }, { type: i3.RxBundleService }, { type: i4.RxCurrentUserService }, { type: i5.RxGlobalCacheService }]; } });
//# sourceMappingURL=overlay.service.js.map