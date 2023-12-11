import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class RxFuntionalRoleService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.path = '/api/rx/application/functionalrole';
    }
    getUrl(functionalRoleDescriptor) {
        return `${this.path}/${encodeURIComponent(functionalRoleDescriptor.applicationName)}/${encodeURIComponent(functionalRoleDescriptor.name)}`;
    }
    get(functionalRoleDescriptor) {
        return this.httpClient.get(this.getUrl(functionalRoleDescriptor));
    }
    deleteFunctionalRole(functionalRoleDescriptor) {
        return this.httpClient.delete(this.getUrl(functionalRoleDescriptor));
    }
    delete(roles) {
        const deleteObservables = roles.map((role) => this.deleteFunctionalRole(role));
        return forkJoin(deleteObservables);
    }
    create(functionalRole) {
        return this.httpClient.post(this.path, functionalRole);
    }
    save(functionalRole, roleName) {
        return this.httpClient.put(this.getUrl({ applicationName: functionalRole.applicationName, name: roleName }), functionalRole);
    }
}
RxFuntionalRoleService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFuntionalRoleService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
RxFuntionalRoleService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFuntionalRoleService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFuntionalRoleService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }]; } });
//# sourceMappingURL=functional-role.service.js.map