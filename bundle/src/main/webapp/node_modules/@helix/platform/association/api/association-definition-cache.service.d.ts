import { IHttpGetParams } from '@helix/platform/shared/api';
import { IAssociationDefinition } from './association-definition.types';
import { Observable } from 'rxjs';
import { RxAssociationDefinitionService } from './association-definition.service';
import * as i0 from "@angular/core";
export declare class RxAssociationDefinitionCacheService {
    private rxAssociationDefinitionService;
    private associationDefinitions;
    private consumers;
    constructor(rxAssociationDefinitionService: RxAssociationDefinitionService);
    getAssociationDefinition(associationDefinitionName: any, options?: IHttpGetParams): Observable<IAssociationDefinition>;
    registerConsumer(consumerDestroy$: Observable<any>): void;
    private clearCache;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxAssociationDefinitionCacheService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxAssociationDefinitionCacheService>;
}
