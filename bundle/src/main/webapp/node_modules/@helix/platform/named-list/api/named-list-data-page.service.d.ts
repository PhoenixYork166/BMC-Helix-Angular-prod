import { Injector } from '@angular/core';
import { DataPage, IDataPageRequestConfiguration, IDataPageResult, RxLogService } from '@helix/platform/shared/api';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class RxNamedListDataPageService extends DataPage {
    private rxLogService;
    constructor(injector: Injector, rxLogService: RxLogService);
    get(dataPageRequestConfiguration?: IDataPageRequestConfiguration): Observable<IDataPageResult>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxNamedListDataPageService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxNamedListDataPageService>;
}
