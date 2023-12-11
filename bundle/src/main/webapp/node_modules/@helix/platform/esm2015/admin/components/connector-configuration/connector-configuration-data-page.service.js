import { Injectable, Injector } from '@angular/core';
import { DataPage } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
const connectorConfigurationDataPageQuery = 'com.bmc.arsys.rx.application.integration.ConnectorConfigDataPageQuery';
export class RxConnectorConfigurationDataPageService extends DataPage {
    constructor(injector) {
        super(injector, connectorConfigurationDataPageQuery);
        this.injector = injector;
    }
}
RxConnectorConfigurationDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxConnectorConfigurationDataPageService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxConnectorConfigurationDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxConnectorConfigurationDataPageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxConnectorConfigurationDataPageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });
//# sourceMappingURL=connector-configuration-data-page.service.js.map