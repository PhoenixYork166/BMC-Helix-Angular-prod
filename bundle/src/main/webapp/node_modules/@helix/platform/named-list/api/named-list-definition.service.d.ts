import { HttpClient, HttpResponse } from '@angular/common/http';
import { IHttpGetParams, IHttpOptions, RxCommandFactoryService, RxFeatureService } from '@helix/platform/shared/api';
import { Observable } from 'rxjs';
import { INamedListDefinition } from './named-list-definition.types';
import * as i0 from "@angular/core";
export declare class RxNamedListDefinitionService {
    private httpClient;
    private rxCommandFactoryService;
    private rxFeatureService;
    constructor(httpClient: HttpClient, rxCommandFactoryService: RxCommandFactoryService, rxFeatureService: RxFeatureService);
    get(namedListDefinitionName: string, options?: IHttpGetParams): Observable<INamedListDefinition>;
    getNew(): Observable<INamedListDefinition>;
    create(namedListDefinition: INamedListDefinition): Observable<HttpResponse<any>>;
    update(namedListDefinition: INamedListDefinition, options?: IHttpOptions): Observable<any>;
    private getUrl;
    rename(oldNamedListDefinitionName: string, newNamedListDefinitionName: string): Observable<any>;
    revertCustomization(namedListDefinitionName: string): Observable<any>;
    delete(definitionNames: string[]): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxNamedListDefinitionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxNamedListDefinitionService>;
}
