import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { find } from 'lodash';
import { map, shareReplay } from 'rxjs/operators';
import { RxConnectorConfigurationDataPageService } from './connector-configuration-data-page.service';
import { RxConnectorsDataPageService } from './connectors-data-page.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "./connectors-data-page.service";
import * as i3 from "./connector-configuration-data-page.service";
export class RxConnectorConfigurationService {
    constructor(httpClient, rxConnectorsDataPageService, rxConnectorConfigurationDataPageService) {
        this.httpClient = httpClient;
        this.rxConnectorsDataPageService = rxConnectorsDataPageService;
        this.rxConnectorConfigurationDataPageService = rxConnectorConfigurationDataPageService;
        this.connectorConfigs = {};
        this.connectorProfiles = {};
    }
    getConnectors() {
        return this.rxConnectorsDataPageService.get().pipe(map((response) => {
            return response.data.map((connector) => ({
                id: connector.id,
                name: connector.name
            }));
        }));
    }
    getConnectorConfigurations(connectorId) {
        if (!this.connectorConfigs[connectorId]) {
            this.connectorConfigs[connectorId] = this.rxConnectorConfigurationDataPageService
                .get({
                params: {
                    connectorId: connectorId
                }
            })
                .pipe(map((response) => {
                return response.data.map((connectorConfig) => ({
                    id: connectorConfig.id,
                    name: connectorConfig.name,
                    profiles: connectorConfig.profiles
                }));
            }), shareReplay(1));
        }
        return this.connectorConfigs[connectorId];
    }
    getConnectorProfiles(connectorId, configId) {
        if (!this.connectorProfiles[configId]) {
            this.connectorProfiles[configId] = this.getConnectorConfigurations(connectorId).pipe(map((configs) => {
                const config = find(configs, { id: configId });
                return config.profiles;
            }));
        }
        return this.connectorProfiles[configId];
    }
}
RxConnectorConfigurationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxConnectorConfigurationService, deps: [{ token: i1.HttpClient }, { token: i2.RxConnectorsDataPageService }, { token: i3.RxConnectorConfigurationDataPageService }], target: i0.ɵɵFactoryTarget.Injectable });
RxConnectorConfigurationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxConnectorConfigurationService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxConnectorConfigurationService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.RxConnectorsDataPageService }, { type: i3.RxConnectorConfigurationDataPageService }]; } });
//# sourceMappingURL=connector-configuration.service.js.map