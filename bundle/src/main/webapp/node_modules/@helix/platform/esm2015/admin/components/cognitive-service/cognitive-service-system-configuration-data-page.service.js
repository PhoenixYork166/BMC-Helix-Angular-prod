import { Injectable, Injector } from '@angular/core';
import { DataPage } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
const systemConfigurationDataPageQuery = 'com.bmc.arsys.rx.application.common.datapage.SystemConfigurationDataPageQuery';
export class RxCognitiveServiceSystemConfigurationDataPageService extends DataPage {
    constructor(injector) {
        super(injector, systemConfigurationDataPageQuery);
        this.injector = injector;
    }
}
RxCognitiveServiceSystemConfigurationDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCognitiveServiceSystemConfigurationDataPageService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxCognitiveServiceSystemConfigurationDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCognitiveServiceSystemConfigurationDataPageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCognitiveServiceSystemConfigurationDataPageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });
//# sourceMappingURL=cognitive-service-system-configuration-data-page.service.js.map