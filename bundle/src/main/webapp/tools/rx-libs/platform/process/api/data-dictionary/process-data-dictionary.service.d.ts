import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { RxIdService, RxObjectUtilsService } from '@helix/platform/utils';
import { IDataDictionary, IDataDictionaryBranch, RxDataDictionaryUtils, RxDesignerCacheService, RxGlobalCacheService } from '@helix/platform/shared/api';
import { IActivitiesDataDictionaryState } from './activities-data-dictionary-state.interface';
import * as i0 from "@angular/core";
export declare class RxProcessDataDictionaryService {
    private rxDataDictionaryUtils;
    private rxDesignerCacheService;
    private rxGlobalCacheService;
    private rxIdService;
    private rxObjectUtilsService;
    private translateService;
    private commonActivities;
    private commonActivitiesSubject;
    commonActivities$: Observable<IActivitiesDataDictionaryState>;
    private commonActivitiesDataDictionaryStateClone$;
    commonDataDictionary$: Observable<IDataDictionary>;
    constructor(rxDataDictionaryUtils: RxDataDictionaryUtils, rxDesignerCacheService: RxDesignerCacheService, rxGlobalCacheService: RxGlobalCacheService, rxIdService: RxIdService, rxObjectUtilsService: RxObjectUtilsService, translateService: TranslateService);
    clear(): void;
    getCommonDataDictionary(): Observable<IDataDictionary>;
    setCommonActivitiesDataDictionaryBranch(guid: string, activityDataDictionaryBranch: Observable<IDataDictionaryBranch>): void;
    private setCommonActivities;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxProcessDataDictionaryService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxProcessDataDictionaryService>;
}
