import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { last } from 'lodash';
import { map } from 'rxjs/operators';
import { RxCommandFactoryService } from '../command';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "../command";
const API_URL = '/api/rx/application/admin-settings/local';
const SETTINGS_API_URL = '/api/rx/application/admin-settings/component';
export class RxAdminSettingsService {
    constructor(httpClient, rxCommandFactoryService) {
        this.httpClient = httpClient;
        this.rxCommandFactoryService = rxCommandFactoryService;
    }
    getComponentGridData(componentName, customHeaders) {
        return this.httpClient.get(`${API_URL}/component-griddata/${componentName}`, {
            headers: new HttpHeaders(customHeaders || {})
        });
    }
    getComponentDefinition(componentName, customHeaders) {
        return this.httpClient.get(`${API_URL}/component-definition/${componentName}`, {
            headers: new HttpHeaders(customHeaders || {})
        });
    }
    getAdminNavigationMenuItems() {
        return this.httpClient
            .get(`${API_URL}/navigation-menu`)
            .pipe(map((navigationMenu) => navigationMenu.AdminNavigationMenu.items));
    }
    getComponentSettings(componentName, customHeaders) {
        return this.httpClient.get(`${API_URL}/component-settings/${componentName}`, {
            headers: new HttpHeaders(customHeaders || {})
        });
    }
    deleteComponentSettings(componentName, customHeaders) {
        return this.httpClient.delete(`${API_URL}/component-settings/${componentName}`, {
            headers: new HttpHeaders(customHeaders || {})
        });
    }
    createComponentSettings(componentName, data, customHeaders) {
        return this.httpClient
            .post(`${API_URL}/component-settings/${componentName}`, data, {
            headers: new HttpHeaders(customHeaders || {}),
            observe: 'response'
        })
            .pipe(map((response) => { var _a; return last((_a = response.headers.get('location')) === null || _a === void 0 ? void 0 : _a.split('/')) || ''; }));
    }
    updateComponentSettings(componentName, data, customHeaders) {
        return this.httpClient.put(`${API_URL}/component-settings/${componentName}`, data, {
            headers: new HttpHeaders(customHeaders || {})
        });
    }
    getAdminSetting(componentName, customHeaders) {
        return this.httpClient.get(`${SETTINGS_API_URL}/${componentName}`, {
            headers: new HttpHeaders(customHeaders || {})
        });
    }
    createAdminSetting(data) {
        return this.httpClient.post(SETTINGS_API_URL, data);
    }
    updateAdminSetting(data) {
        return this.httpClient.put(`${SETTINGS_API_URL}/${data.componentName}`, data);
    }
    deleteAdminSetting(definitionNames) {
        return this.rxCommandFactoryService
            .forResourceType('com.bmc.arsys.rx.application.admin.command.DeleteAdminSettingsComponentDefinitionsCommand')
            .execute({ definitionNames });
    }
}
RxAdminSettingsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAdminSettingsService, deps: [{ token: i1.HttpClient }, { token: i2.RxCommandFactoryService }], target: i0.ɵɵFactoryTarget.Injectable });
RxAdminSettingsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAdminSettingsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAdminSettingsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.RxCommandFactoryService }]; } });
//# sourceMappingURL=admin-settings.service.js.map