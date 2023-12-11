import { Observable } from 'rxjs';
import { RxShareViewPresetDataService } from './share-view-preset-data.service';
import { RxJsonParserService, RxStringService } from '@helix/platform/utils';
import { RxCurrentUserService } from '@helix/platform/shared/api';
import { ISaveSharedViewPresetPayload, ISharedViewPresetItem, IShareViewPresetUserPayload, ITagUserAutocompleteValue } from './share-view-preset.types';
import { IViewPresetsByViewComponentGuid } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
export declare class RxShareViewPresetService {
    private rxShareViewPresetDataService;
    private rxStringService;
    private rxJsonParserService;
    private rxCurrentUserService;
    constructor(rxShareViewPresetDataService: RxShareViewPresetDataService, rxStringService: RxStringService, rxJsonParserService: RxJsonParserService, rxCurrentUserService: RxCurrentUserService);
    getAutocompleteSearch(text$: Observable<string>): Observable<ITagUserAutocompleteValue[]>;
    getSharedViewPresetUsers(guid: string): Observable<IShareViewPresetUserPayload[]>;
    getSharedViewPresetData(guid: string): Observable<{
        viewPresetName: string;
        sharedViewPresets: IViewPresetsByViewComponentGuid;
    }>;
    private createUpdateSharedViewPreset;
    saveSharedViewPreset(data: ISaveSharedViewPresetPayload, presetGuid?: string): Observable<string>;
    deleteSharedViewPreset(sharedViewPresetInstanceGuid: string): Observable<any>;
    getSharedViewPresetsForCurrentUser(presetSelectorGuid: string): Observable<ISharedViewPresetItem[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxShareViewPresetService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxShareViewPresetService>;
}
