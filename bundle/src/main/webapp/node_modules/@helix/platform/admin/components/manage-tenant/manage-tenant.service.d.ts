import { HttpClient } from '@angular/common/http';
import { ITenant } from './manage-tenant.types';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class RxTenantService {
    private httpClient;
    private tenantApiUrl;
    constructor(httpClient: HttpClient);
    createTenant(tenant: ITenant): Observable<any>;
    deleteTenant(tenantName: string): Observable<any>;
    editTenant(tenant: ITenant): Observable<any>;
    getTenant(tenantName: string): Observable<ITenant>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxTenantService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxTenantService>;
}
