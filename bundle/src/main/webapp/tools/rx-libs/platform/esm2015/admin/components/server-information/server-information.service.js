import { Injectable } from '@angular/core';
import { RxSystemConfigurationService } from '@helix/platform/shared/api';
import { find } from 'lodash';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
export class RxServerInformationService {
    constructor(rxSystemConfigurationService) {
        this.rxSystemConfigurationService = rxSystemConfigurationService;
    }
    getServerInformation() {
        const identifiers = [
            'VERSION',
            'SERVER_DIR',
            'OS',
            'HARDWARE',
            'SERVER_NAME',
            'SERVER_TIME',
            'CONFIGURATION_NAME',
            'DB_TYPE',
            'DB_NAME',
            'DB_VERSION',
            'DB_USER'
        ];
        return this.rxSystemConfigurationService.queryConfiguration(identifiers).pipe(map((serverInformation) => {
            return {
                serverVersion: find(serverInformation, { id: 'VERSION' }).value,
                serverDirectory: find(serverInformation, { id: 'SERVER_DIR' }).value,
                operatingSystem: find(serverInformation, { id: 'OS' }).value,
                hardware: find(serverInformation, { id: 'HARDWARE' }).value,
                serverName: find(serverInformation, { id: 'SERVER_NAME' }).value,
                serverTime: new Date(find(serverInformation, { id: 'SERVER_TIME' }).value * 1000).toLocaleString(),
                configurationName: find(serverInformation, { id: 'CONFIGURATION_NAME' }).value,
                databaseType: find(serverInformation, { id: 'DB_TYPE' }).value,
                databaseName: find(serverInformation, { id: 'DB_NAME' }).value,
                databaseVersion: find(serverInformation, { id: 'DB_VERSION' }).value,
                databaseUser: find(serverInformation, { id: 'DB_USER' }).value
            };
        }));
    }
}
RxServerInformationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxServerInformationService, deps: [{ token: i1.RxSystemConfigurationService }], target: i0.ɵɵFactoryTarget.Injectable });
RxServerInformationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxServerInformationService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxServerInformationService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxSystemConfigurationService }]; } });
//# sourceMappingURL=server-information.service.js.map