import { HttpClient } from '@angular/common/http';
import { IFunctionalRoleDescriptor, IRole } from '@helix/platform/shared/api';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class RxRolePermissionsService {
    private httpClient;
    private path;
    constructor(httpClient: HttpClient);
    private getUrl;
    get(roleDescriptor: IFunctionalRoleDescriptor): Observable<IRole>;
    private deleteRole;
    delete(roles: IFunctionalRoleDescriptor[]): Observable<any>;
    create(role: IRole): Observable<any>;
    update(role: IRole, roleName: string): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxRolePermissionsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxRolePermissionsService>;
}
