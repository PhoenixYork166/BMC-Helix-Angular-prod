import { Observable } from 'rxjs';
import { IFieldDefinitionLight, IProcessDefinition } from './process-definition.types';
import { RxProcessDefinitionService } from './process-definition.service';
import * as i0 from "@angular/core";
export declare class RxProcessDefinitionCacheService {
    private rxProcessDefinitionService;
    private consumers;
    private processDefinitionCache;
    private processDefinitionOutputParamCache;
    constructor(rxProcessDefinitionService: RxProcessDefinitionService);
    getProcessDefinition(processDefinitionName: string): Observable<IProcessDefinition>;
    getOutputParams(processDefinitionName: string): Observable<IFieldDefinitionLight[]>;
    registerConsumer(consumerDestroy$: Observable<any>): void;
    clearCache(processDefinitionNames?: string[]): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxProcessDefinitionCacheService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxProcessDefinitionCacheService>;
}
