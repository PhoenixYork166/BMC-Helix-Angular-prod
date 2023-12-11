import { RxViewActionRegistryService } from './view-action-registry.service';
import { Observable } from 'rxjs';
import { IPlainObject, RxLogService } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
export declare class RxViewActionService {
    private rxViewActionRegistryService;
    private rxLogService;
    constructor(rxViewActionRegistryService: RxViewActionRegistryService, rxLogService: RxLogService);
    execute(actionName: string, parameters?: IPlainObject): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxViewActionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxViewActionService>;
}
