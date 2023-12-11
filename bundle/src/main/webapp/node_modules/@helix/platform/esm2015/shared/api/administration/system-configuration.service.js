import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isUndefined, isString } from 'lodash';
import { tap } from 'rxjs/operators';
import { RX_ADMINISTRATION } from './administration.constant';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class RxSystemConfigurationService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.systemConfigurations = {};
    }
    initialize() {
        return this.queryConfiguration(['Submitter-Mode']).pipe(tap((systemConfigurations) => {
            this.systemConfigurations = systemConfigurations.reduce((configs, systemConfiguration) => {
                configs[systemConfiguration.id] = systemConfiguration.value;
                return configs;
            }, {});
        }));
    }
    getConfigurationSync(identifier) {
        if (this.systemConfigurations) {
            const configValue = this.systemConfigurations[identifier];
            if (isUndefined(configValue)) {
                throw new Error(`System configuration ${identifier} is not available.`);
            }
            return configValue;
        }
        else {
            throw new Error('System configuration service is not initialized.');
        }
    }
    getConfiguration(configurationName) {
        return this.httpClient.get(`${RX_ADMINISTRATION.systemConfigurationUrl}/${configurationName}`);
    }
    setConfiguration(configurationName, configurationValue) {
        return this.httpClient.put(`${RX_ADMINISTRATION.systemConfigurationUrl}/${configurationName}`, {
            name: configurationName,
            value: isString(configurationValue) ? configurationValue : JSON.stringify(configurationValue)
        });
    }
    queryConfiguration(identifiers) {
        const queryString = identifiers.map((identifier) => `identifier=${encodeURIComponent(identifier)}`).join('&');
        return this.httpClient.get(`${RX_ADMINISTRATION.systemConfigurationUrl}/query?${queryString}`);
    }
}
RxSystemConfigurationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSystemConfigurationService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
RxSystemConfigurationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSystemConfigurationService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSystemConfigurationService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }]; } });
//# sourceMappingURL=system-configuration.service.js.map