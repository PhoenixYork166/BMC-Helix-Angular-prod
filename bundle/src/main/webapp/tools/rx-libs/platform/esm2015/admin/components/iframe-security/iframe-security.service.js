import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { RX_IFRAME_SECURITY } from './iframe-security.constant';
import { RxSystemConfigurationService } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
export class RxIframeSecurityService {
    constructor(rxSystemConfigurationService) {
        this.rxSystemConfigurationService = rxSystemConfigurationService;
    }
    getIframeSecurities() {
        return forkJoin({
            iframeAllowedSites: this.rxSystemConfigurationService.getConfiguration(RX_IFRAME_SECURITY.sections.iframeAllowedSites.settingName),
            trustedWebsites: this.rxSystemConfigurationService.getConfiguration(RX_IFRAME_SECURITY.sections.trustedWebsites.settingName)
        });
    }
    postIframeSecurities(allowedSitesData, trustedWebsitesData) {
        return forkJoin([
            this.rxSystemConfigurationService.setConfiguration(RX_IFRAME_SECURITY.sections.iframeAllowedSites.settingName, allowedSitesData.value),
            this.rxSystemConfigurationService.setConfiguration(RX_IFRAME_SECURITY.sections.trustedWebsites.settingName, trustedWebsitesData.value)
        ]);
    }
}
RxIframeSecurityService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIframeSecurityService, deps: [{ token: i1.RxSystemConfigurationService }], target: i0.ɵɵFactoryTarget.Injectable });
RxIframeSecurityService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIframeSecurityService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIframeSecurityService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxSystemConfigurationService }]; } });
//# sourceMappingURL=iframe-security.service.js.map