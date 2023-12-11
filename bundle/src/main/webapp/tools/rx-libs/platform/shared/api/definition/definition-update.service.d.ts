import { RxUtilityModalsService } from '@helix/platform/ui-kit';
import { Observable } from 'rxjs';
import { IHttpOptions } from '../http';
import * as i0 from "@angular/core";
export declare class RxDefinitionUpdateService {
    private rxUtilityModalsService;
    constructor(rxUtilityModalsService: RxUtilityModalsService);
    execute(updateFn: (httpOptions?: IHttpOptions) => Observable<any>): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxDefinitionUpdateService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxDefinitionUpdateService>;
}
