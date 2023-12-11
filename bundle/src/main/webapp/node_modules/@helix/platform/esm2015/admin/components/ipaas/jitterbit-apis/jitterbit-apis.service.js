import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class RxJitterbitApisService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.apiDefinitionUrl = '/api/com.bmc.dsm.ipaas-jitterbit/rx/application/ipaas/jitterbit';
    }
    deleteApiDefinition(apiId) {
        return this.httpClient.delete(`${this.apiDefinitionUrl}/apidefinition/${apiId}`);
    }
    createApiDefinition(apiDefinition) {
        return this.httpClient.post(`${this.apiDefinitionUrl}/apidefinition`, apiDefinition);
    }
    getApiDefinition(apiId) {
        return this.httpClient.get(`${this.apiDefinitionUrl}/apidefinition/${apiId}`);
    }
    editApiDefinition(apiDefinition) {
        return this.httpClient.put(`${this.apiDefinitionUrl}/apidefinition/${apiDefinition.id}`, apiDefinition);
    }
    getOrganizationsAndEnvironments() {
        return this.httpClient.get(`${this.apiDefinitionUrl}/organization-info`);
    }
    getApiPathDefinitions(organization, environment) {
        return this.httpClient.get(`${this.apiDefinitionUrl}/api-specs/${encodeURIComponent(organization)}/${encodeURIComponent(environment)}`);
    }
}
RxJitterbitApisService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxJitterbitApisService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
RxJitterbitApisService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxJitterbitApisService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxJitterbitApisService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }]; } });
//# sourceMappingURL=jitterbit-apis.service.js.map