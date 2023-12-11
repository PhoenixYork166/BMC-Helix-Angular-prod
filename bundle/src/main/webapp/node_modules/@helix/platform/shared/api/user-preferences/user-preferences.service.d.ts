import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RxJsonParserService } from '@helix/platform/utils';
import { IUserPreferencesSetting } from './interfaces/user-preferences-setting.interface';
import { IUserPreferencesData } from './interfaces/user-preferences-data.interface';
import { IPlainObject } from '../common-types/plain-object.interface';
import * as i0 from "@angular/core";
export declare class RxUserPreferencesService {
    private httpClient;
    private rxJsonParserService;
    settingsByComponentId: Map<string, IUserPreferencesSetting[]>;
    apiUrl: string;
    constructor(httpClient: HttpClient, rxJsonParserService: RxJsonParserService);
    getUiComponentPreferences<T = IPlainObject>(guid: string): Observable<T>;
    prepareUiPreferences(data: IUserPreferencesData, guid: string): IUserPreferencesSetting[];
    setUiComponentPreferences(data: IUserPreferencesData, guid: string): Observable<any>;
    private createUpdatedSettings;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxUserPreferencesService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxUserPreferencesService>;
}
