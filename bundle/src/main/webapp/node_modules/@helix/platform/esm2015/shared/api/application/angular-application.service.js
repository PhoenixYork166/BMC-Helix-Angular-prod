import { Injectable } from '@angular/core';
import { RxStringService } from '@helix/platform/utils';
import { includes } from 'lodash';
import { map, shareReplay } from 'rxjs/operators';
import { RX_ADMINISTRATION, RxAdminSettingsService } from '../administration';
import { RX_APPLICATION } from './application.constant';
import * as i0 from "@angular/core";
import * as i1 from "../administration";
import * as i2 from "@helix/platform/utils";
export class RxAngularApplicationService {
    constructor(rxAdminSettingsService, rxStringService) {
        this.rxAdminSettingsService = rxAdminSettingsService;
        this.rxStringService = rxStringService;
        this.angularJsApplicationBundleIds$ = this.rxAdminSettingsService
            .getComponentGridData(RX_ADMINISTRATION.settingNames.newApplicationUiOptOut, {
            'default-bundle-scope': RX_APPLICATION.environmentConfigurationBundleId
        })
            .pipe(map((gridComponentSettings) => gridComponentSettings.rows
            .filter((newApplicationUiOptOutSetting) => newApplicationUiOptOutSetting['Use old application UI'] === 'true')
            .map((newApplicationUiOptOutSetting) => newApplicationUiOptOutSetting['Application ID'])
            .concat(RX_APPLICATION.angularJsApplicationBundleIds)), shareReplay(1));
        this.angularJsViewDesignerBundleIds$ = this.rxAdminSettingsService
            .getComponentGridData(RX_ADMINISTRATION.settingNames.newViewDesignerOptOut, {
            'default-bundle-scope': RX_APPLICATION.environmentConfigurationBundleId
        })
            .pipe(map((gridComponentSettings) => gridComponentSettings.rows
            .filter((newViewDesignerOptOutSetting) => newViewDesignerOptOutSetting['Use old view designer'] === 'true')
            .map((newViewDesignerOptOutSetting) => newViewDesignerOptOutSetting['Application ID'])
            .concat(RX_APPLICATION.angularJsViewDesignerBundleIds)), shareReplay(1));
    }
    isAngularJsApplication(bundleId) {
        return this.angularJsApplicationBundleIds$.pipe(map((angularJsApplicationBundleIds) => includes(angularJsApplicationBundleIds, bundleId)));
    }
    isAngularJsViewDesignerBundle(bundleId) {
        return this.angularJsViewDesignerBundleIds$.pipe(map((angularJsViewDesignerBundleIds) => this.rxStringService.isIncluded(bundleId, angularJsViewDesignerBundleIds)));
    }
}
RxAngularApplicationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAngularApplicationService, deps: [{ token: i1.RxAdminSettingsService }, { token: i2.RxStringService }], target: i0.ɵɵFactoryTarget.Injectable });
RxAngularApplicationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAngularApplicationService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAngularApplicationService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxAdminSettingsService }, { type: i2.RxStringService }]; } });
//# sourceMappingURL=angular-application.service.js.map