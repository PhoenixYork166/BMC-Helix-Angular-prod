import { RxViewDefinitionService } from './view-definition.service';
import { RxViewDefinitionDataPageService } from './view-definition-data-page.service';
import { Observable } from 'rxjs';
import { IHttpGetParams } from '@helix/platform/shared/api';
import { IViewDefinition } from '../domain/view-definition.interface';
import * as i0 from "@angular/core";
export declare class RxViewDefinitionCacheService {
    private rxViewDefinitionService;
    private viewDefinitionDataPageService;
    private viewDefinitionCache;
    private viewDefinitionNamesCache;
    private consumers;
    constructor(rxViewDefinitionService: RxViewDefinitionService, viewDefinitionDataPageService: RxViewDefinitionDataPageService);
    getViewDefinitionNames(bundleId: string): Observable<string[]>;
    getViewDefinition(viewDefinitionName: string, options?: IHttpGetParams): Observable<IViewDefinition>;
    registerConsumer(consumerDestroy$: Observable<any>): void;
    private clearCache;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxViewDefinitionCacheService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxViewDefinitionCacheService>;
}
