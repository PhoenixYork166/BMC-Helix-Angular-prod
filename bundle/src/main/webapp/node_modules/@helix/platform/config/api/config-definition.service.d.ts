import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { IConfigDefinition } from './config-definition.types';
import * as i0 from "@angular/core";
export declare class RxConfigDefinitionService {
    private httpClient;
    private translateService;
    private url;
    constructor(httpClient: HttpClient, translateService: TranslateService);
    getComponents(): Observable<string[]>;
    get(componentName: string): Observable<IConfigDefinition>;
    update(componentName: string, configDefinition: IConfigDefinition): Observable<any>;
    create(configDefinition: IConfigDefinition): Observable<any>;
    getNew(isApplication: boolean): Observable<IConfigDefinition>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxConfigDefinitionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxConfigDefinitionService>;
}
