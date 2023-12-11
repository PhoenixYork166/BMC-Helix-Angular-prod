import { Observable } from 'rxjs';
import { INamedListDefinition } from './named-list-definition.types';
import { RxNamedListDefinitionService } from './named-list-definition.service';
import * as i0 from "@angular/core";
export declare class RxNamedListDefinitionCacheService {
    private rxNamedListDefinitionService;
    private consumers;
    private namedListDefinitions;
    constructor(rxNamedListDefinitionService: RxNamedListDefinitionService);
    getNamedListDefinition(namedListDefinitionName: string): Observable<INamedListDefinition>;
    registerConsumer(consumerDestroy$: Observable<any>): void;
    private clearCache;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxNamedListDefinitionCacheService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxNamedListDefinitionCacheService>;
}
