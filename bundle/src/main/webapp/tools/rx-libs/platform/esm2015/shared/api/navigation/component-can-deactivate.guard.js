import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { RxModalService, RxUtilityModalsService } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@helix/platform/ui-kit";
export class RxComponentCanDeactivateGuard {
    constructor(router, rxModalService, rxUtilityModalsService) {
        this.router = router;
        this.rxModalService = rxModalService;
        this.rxUtilityModalsService = rxUtilityModalsService;
        this.isEnabled = true;
        window.addEventListener('beforeunload', (event) => {
            var _a;
            if (this.isEnabled &&
                (((_a = this.pageComponent) === null || _a === void 0 ? void 0 : _a.canDeactivate()) === false ||
                    this.rxModalService.isAnyDockedPanelDirty() ||
                    this.rxModalService.isAnyModalDirty())) {
                event.returnValue = true;
            }
        });
        this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => this.enable());
    }
    canDeactivate(component) {
        var _a;
        if (this.isEnabled && (this.rxModalService.isAnyDockedPanelDirty() || this.rxModalService.isAnyModalDirty())) {
            return this.rxUtilityModalsService.confirmUnsavedChanges();
        }
        else if (this.isEnabled && ((_a = this.pageComponent) === null || _a === void 0 ? void 0 : _a.canDeactivate()) === false) {
            return this.pageComponent.confirmDeactivation();
        }
        else {
            return true;
        }
    }
    setPageComponent(component) {
        this.pageComponent = component;
    }
    enable() {
        this.isEnabled = true;
    }
    disable() {
        this.isEnabled = false;
    }
}
RxComponentCanDeactivateGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxComponentCanDeactivateGuard, deps: [{ token: i1.Router }, { token: i2.RxModalService }, { token: i2.RxUtilityModalsService }], target: i0.ɵɵFactoryTarget.Injectable });
RxComponentCanDeactivateGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxComponentCanDeactivateGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxComponentCanDeactivateGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.Router }, { type: i2.RxModalService }, { type: i2.RxUtilityModalsService }]; } });
//# sourceMappingURL=component-can-deactivate.guard.js.map