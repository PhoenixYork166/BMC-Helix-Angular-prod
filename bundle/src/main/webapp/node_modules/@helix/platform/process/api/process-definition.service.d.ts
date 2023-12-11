import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RxGuidService } from '@helix/platform/utils';
import { IHttpGetParams, IHttpOptions } from '@helix/platform/shared/api';
import { IFieldDefinitionLight, IProcessDefinition } from './process-definition.types';
import * as i0 from "@angular/core";
export declare class RxProcessDefinitionService {
    private httpClient;
    private rxGuidService;
    constructor(httpClient: HttpClient, rxGuidService: RxGuidService);
    get(processDefinitionName: string, options?: IHttpGetParams): Observable<IProcessDefinition>;
    getNew(): Observable<IProcessDefinition>;
    getServerActionModelType(actionTypeName: string): string;
    getServerActionTypeName(modelType: string): string;
    update(processDefinition: IProcessDefinition, options?: IHttpOptions): Observable<any>;
    getOutputParams(processDefinitionName: string, options?: IHttpGetParams): Observable<IFieldDefinitionLight[]>;
    getInputParams(processDefinitionName: string, options?: IHttpGetParams): Observable<IFieldDefinitionLight[]>;
    private getUrl;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxProcessDefinitionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxProcessDefinitionService>;
}
