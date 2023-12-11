import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class RxRolePermissionsService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.path = '/api/rx/application/role';
    }
    getUrl(roleDescriptor) {
        return `${this.path}/${encodeURIComponent(roleDescriptor.applicationName)}/${encodeURIComponent(roleDescriptor.name)}`;
    }
    get(roleDescriptor) {
        return this.httpClient.get(this.getUrl(roleDescriptor));
    }
    deleteRole(roleDescriptor) {
        return this.httpClient.delete(this.getUrl(roleDescriptor));
    }
    delete(roles) {
        const deleteObservables = roles.map((role) => this.deleteRole(role));
        return forkJoin(deleteObservables);
    }
    create(role) {
        return this.httpClient.post(this.path, role);
    }
    update(role, roleName) {
        return this.httpClient.put(this.getUrl({ applicationName: role.applicationName, name: roleName }), role);
    }
}
RxRolePermissionsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRolePermissionsService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
RxRolePermissionsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRolePermissionsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRolePermissionsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }]; } });
//# sourceMappingURL=role-permissions.service.js.map