import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { RX_USER_PREFERENCES } from './user-preferences.constants';
import { RxJsonParserService } from '@helix/platform/utils';
import { map as _map, get, isEmpty } from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@helix/platform/utils";
export class RxUserPreferencesService {
    constructor(httpClient, rxJsonParserService) {
        this.httpClient = httpClient;
        this.rxJsonParserService = rxJsonParserService;
        this.settingsByComponentId = new Map();
        this.apiUrl = '/api/rx/application/admin-settings/user-preference/UI Preferences';
    }
    getUiComponentPreferences(guid) {
        return this.httpClient
            .get(this.apiUrl, {
            headers: new HttpHeaders({
                'default-bundle-scope': ''
            }),
            params: {
                componentId: guid
            }
        })
            .pipe(map(({ values }) => {
            this.settingsByComponentId.set(guid, values);
            const preferenceSetting = values.find((value) => value.settingName === RX_USER_PREFERENCES.fieldPreferences);
            const settingValue = preferenceSetting ? preferenceSetting.settingValue : null;
            return this.rxJsonParserService.tryParseJson(settingValue);
        }));
    }
    prepareUiPreferences(data, guid) {
        if (!isEmpty(this.settingsByComponentId.get(guid))) {
            return this.createUpdatedSettings(data, guid);
        }
        const newSettings = _map(data, (value, name) => ({
            componentName: RX_USER_PREFERENCES.componentName,
            settingName: name,
            settingValue: value,
            assigneeGroupPermission: ''
        }));
        return newSettings;
    }
    setUiComponentPreferences(data, guid) {
        const settings = this.prepareUiPreferences(data, guid);
        const currentSettings = this.settingsByComponentId.get(guid);
        const id = get(currentSettings, '[0].ownerKeyValue1');
        const httpOptions = {
            headers: new HttpHeaders({
                'default-bundle-scope': ''
            })
        };
        return id
            ? this.httpClient.put(`${this.apiUrl}/${id}`, settings, httpOptions)
            : this.httpClient
                .post(this.apiUrl, settings, httpOptions)
                .pipe(tap(() => this.getUiComponentPreferences(data.componentId).subscribe()));
    }
    createUpdatedSettings(data, guid) {
        const newSettings = this.settingsByComponentId.get(guid);
        const preferenceSetting = newSettings.find((element) => element.settingName === RX_USER_PREFERENCES.fieldPreferences);
        const index = newSettings.indexOf(preferenceSetting);
        preferenceSetting.settingValue = data.preferences;
        newSettings[index] = preferenceSetting;
        return newSettings;
    }
}
RxUserPreferencesService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserPreferencesService, deps: [{ token: i1.HttpClient }, { token: i2.RxJsonParserService }], target: i0.ɵɵFactoryTarget.Injectable });
RxUserPreferencesService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserPreferencesService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserPreferencesService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.RxJsonParserService }]; } });
//# sourceMappingURL=user-preferences.service.js.map