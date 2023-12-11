import { Observable } from 'rxjs';
import { IDataPageResult } from '@helix/platform/shared/api';
import { RxRecordInstanceDataPageService } from './record-instance-data-page.service';
import * as i0 from "@angular/core";
export declare class RxLocaleService {
    private rxRecordInstanceDataPageService;
    private locales;
    constructor(rxRecordInstanceDataPageService: RxRecordInstanceDataPageService);
    getLocales(): Observable<IDataPageResult>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxLocaleService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxLocaleService>;
}
