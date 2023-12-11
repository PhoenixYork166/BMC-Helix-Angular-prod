import { Observable } from 'rxjs';
import { RxDataPageFactoryService } from '@helix/platform/shared/api';
import { IRulePoolStatistics } from './rule-pool-management.interfaces';
import * as i0 from "@angular/core";
export declare class RxRulePoolDataService {
    private rxDataPageService;
    private resource;
    constructor(rxDataPageService: RxDataPageFactoryService);
    getRulePoolStatistics(): Observable<IRulePoolStatistics[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxRulePoolDataService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxRulePoolDataService>;
}
