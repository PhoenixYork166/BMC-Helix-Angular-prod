import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IGainsightUserPreferences } from './gainsight.types';
import { RxFeatureService } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
export declare class RxGainsightUserPreferencesService {
    private httpClient;
    private rxFeatureService;
    constructor(httpClient: HttpClient, rxFeatureService: RxFeatureService);
    getGainsightUserPreferences(): Observable<IGainsightUserPreferences>;
    saveGainsightUserPreferences(gainsightUserPreferences: IGainsightUserPreferences): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxGainsightUserPreferencesService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxGainsightUserPreferencesService>;
}
