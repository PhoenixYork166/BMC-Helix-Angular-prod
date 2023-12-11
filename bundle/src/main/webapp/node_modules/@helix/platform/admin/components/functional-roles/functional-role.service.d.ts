import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFunctionalRole, IFunctionalRoleDescriptor } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
export declare class RxFuntionalRoleService {
    private httpClient;
    private path;
    constructor(httpClient: HttpClient);
    private getUrl;
    get(functionalRoleDescriptor: IFunctionalRoleDescriptor): Observable<IFunctionalRole>;
    private deleteFunctionalRole;
    delete(roles: IFunctionalRoleDescriptor[]): Observable<any>;
    create(functionalRole: IFunctionalRole): Observable<any>;
    save(functionalRole: IFunctionalRole, roleName: string): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxFuntionalRoleService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxFuntionalRoleService>;
}
