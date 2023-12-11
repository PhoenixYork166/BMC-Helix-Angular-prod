import { Observable } from 'rxjs';
import { RxCommandFactoryService } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
export declare class RxEventStatisticsDefinitionService {
    private rxCommandFactoryService;
    constructor(rxCommandFactoryService: RxCommandFactoryService);
    revertCustomization(eventStatisticsDefinitionName: string): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxEventStatisticsDefinitionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxEventStatisticsDefinitionService>;
}
