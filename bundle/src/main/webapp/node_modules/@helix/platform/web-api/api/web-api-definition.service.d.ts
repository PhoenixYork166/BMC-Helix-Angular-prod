import { Observable } from 'rxjs';
import { RxCommandFactoryService } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
export declare class RxWebApiDefinitionService {
    private rxCommandFactoryService;
    constructor(rxCommandFactoryService: RxCommandFactoryService);
    rename(oldWebApiDefinitionName: string, newWebApiDefinitionName: string): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxWebApiDefinitionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxWebApiDefinitionService>;
}
