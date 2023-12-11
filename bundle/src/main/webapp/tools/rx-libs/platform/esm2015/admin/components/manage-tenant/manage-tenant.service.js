import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class RxTenantService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.tenantApiUrl = '/api/rx/application/tenant';
    }
    createTenant(tenant) {
        return this.httpClient.post(this.tenantApiUrl, tenant);
    }
    deleteTenant(tenantName) {
        return this.httpClient.delete(`${this.tenantApiUrl}/${tenantName}`);
    }
    editTenant(tenant) {
        return this.httpClient.put(`${this.tenantApiUrl}/${tenant.name}`, tenant);
    }
    getTenant(tenantName) {
        return this.httpClient.get(`${this.tenantApiUrl}/${tenantName}`);
    }
}
RxTenantService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxTenantService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
RxTenantService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxTenantService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxTenantService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }]; } });
//# sourceMappingURL=manage-tenant.service.js.map