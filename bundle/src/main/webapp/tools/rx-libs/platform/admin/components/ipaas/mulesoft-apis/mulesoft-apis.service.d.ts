import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IApiPath, IIpaasApiDefinition, IOrganizationData } from '../ipaas-base-apis/ipaas-base-apis.types';
import * as i0 from "@angular/core";
export declare class RxMulesoftApisService {
    private httpClient;
    private readonly apiDefinitionUrl;
    constructor(httpClient: HttpClient);
    deleteApiDefinition(apiId: string): Observable<any>;
    createApiDefinition(apiDefinition: IIpaasApiDefinition): Observable<any>;
    getApiDefinition(apiId: string): Observable<IIpaasApiDefinition>;
    editApiDefinition(apiDefinition: IIpaasApiDefinition): Observable<any>;
    getOrganizationsAndEnvironments(): Observable<IOrganizationData[]>;
    getApiPathDefinitions(organization: string, environment: string): Observable<IApiPath>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxMulesoftApisService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxMulesoftApisService>;
}
