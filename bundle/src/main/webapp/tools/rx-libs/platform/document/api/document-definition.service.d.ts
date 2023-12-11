import { HttpClient, HttpResponse } from '@angular/common/http';
import { IHttpGetParams, IHttpOptions, RxCommandFactoryService } from '@helix/platform/shared/api';
import { Observable } from 'rxjs';
import { IDocumentDefinition } from './document-definition.interface';
import * as i0 from "@angular/core";
export declare class RxDocumentDefinitionService {
    private httpClient;
    private rxCommandFactoryService;
    constructor(httpClient: HttpClient, rxCommandFactoryService: RxCommandFactoryService);
    get(documentDefinitionName: string, options?: IHttpGetParams): Observable<IDocumentDefinition>;
    getNew(): Observable<IDocumentDefinition>;
    create(documentDefinition: IDocumentDefinition): Observable<HttpResponse<any>>;
    update(documentDefinition: IDocumentDefinition, options?: IHttpOptions): Observable<any>;
    delete(documentDefinitionName: string): Observable<any>;
    revertCustomization(documentDefinitionName: string): Observable<any>;
    rename(oldDocumentDefinitionName: string, newDocumentDefinitionName: string): Observable<any>;
    private getUrl;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxDocumentDefinitionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxDocumentDefinitionService>;
}
