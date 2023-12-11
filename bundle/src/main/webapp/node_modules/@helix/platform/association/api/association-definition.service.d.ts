import { HttpClient, HttpResponse } from '@angular/common/http';
import { IHttpGetParams, IHttpOptions, RxCommandFactoryService } from '@helix/platform/shared/api';
import { Observable } from 'rxjs';
import { IAssociationDefinition } from './association-definition.types';
import * as i0 from "@angular/core";
export declare class RxAssociationDefinitionService {
    private httpClient;
    private rxCommandFactoryService;
    constructor(httpClient: HttpClient, rxCommandFactoryService: RxCommandFactoryService);
    get(associationDefinitionName: string, options?: IHttpGetParams): Observable<IAssociationDefinition>;
    getNew(): Observable<IAssociationDefinition>;
    create(associationDefinition: IAssociationDefinition): Observable<HttpResponse<any>>;
    update(associationDefinition: IAssociationDefinition, options?: IHttpOptions): Observable<any>;
    delete(associationDefinitionName: string): Observable<any>;
    revertCustomization(associationDefinitionName: string): Observable<any>;
    rename(oldAssociationDefinitionName: string, newAssociationDefinitionName: string): Observable<any>;
    private getUrl;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxAssociationDefinitionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxAssociationDefinitionService>;
}
