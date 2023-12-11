import { Observable } from 'rxjs';
import { RecordInstance, RxRecordInstanceDataPageService, RxRecordInstanceService } from '@helix/platform/record/api';
import { HttpClient } from '@angular/common/http';
import { RxJsonParserService } from '@helix/platform/utils';
import { KeyValueObject } from '@bmc-ux/adapt-angular';
import { IShareViewPresetPayload } from './share-view-preset.types';
import * as i0 from "@angular/core";
export declare class RxShareViewPresetDataService {
    private rxRecordInstanceDataPageService;
    private rxRecordInstanceService;
    private httpClient;
    private rxJsonParserService;
    constructor(rxRecordInstanceDataPageService: RxRecordInstanceDataPageService, rxRecordInstanceService: RxRecordInstanceService, httpClient: HttpClient, rxJsonParserService: RxJsonParserService);
    searchUsers(query: string): Observable<KeyValueObject[]>;
    getSharedViewPresets(viewPresetSelectorGuid: string, loginId: string): Observable<KeyValueObject[]>;
    getSharedViewPreset(guid: string): Observable<RecordInstance>;
    createSharedViewPreset(payload: IShareViewPresetPayload): Observable<string>;
    updateSharedViewPreset(guid: string, payload: IShareViewPresetPayload): Observable<any>;
    deleteSharedViewPreset(guid: string): Observable<any>;
    private getUrl;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxShareViewPresetDataService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxShareViewPresetDataService>;
}
