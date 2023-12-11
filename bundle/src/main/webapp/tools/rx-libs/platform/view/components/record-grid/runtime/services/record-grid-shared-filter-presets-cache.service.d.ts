import { RxRecordInstanceDataPageService } from '@helix/platform/record/api';
import { Observable } from 'rxjs';
import { IRxRecordGridSharedFilterPreset } from '../../common/types/record-grid-filter.types';
import * as i0 from "@angular/core";
export declare class RxRecordGridSharedFilterPresetsCacheService {
    private rxRecordInstanceDataPageService;
    private cache;
    constructor(rxRecordInstanceDataPageService: RxRecordInstanceDataPageService);
    getSharedFilterPresets(recordGridGuid: string): Observable<IRxRecordGridSharedFilterPreset[]>;
    private getQueryParams;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxRecordGridSharedFilterPresetsCacheService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxRecordGridSharedFilterPresetsCacheService>;
}
