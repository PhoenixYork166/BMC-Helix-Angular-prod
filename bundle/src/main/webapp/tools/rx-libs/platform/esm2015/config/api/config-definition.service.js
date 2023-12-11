import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { ImpactRowVisibility, ShowInLocationOptions } from './config-definition.types';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@ngx-translate/core";
export class RxConfigDefinitionService {
    constructor(httpClient, translateService) {
        this.httpClient = httpClient;
        this.translateService = translateService;
        this.url = '/api/rx/application/admin-settings/component';
    }
    getComponents() {
        return this.httpClient.get('/api/rx/application/admin-settings/components-list');
    }
    get(componentName) {
        return this.httpClient.get(`${this.url}/${encodeURIComponent(componentName)}`);
    }
    update(componentName, configDefinition) {
        return this.httpClient.put(`${this.url}/${encodeURIComponent(componentName)}`, configDefinition);
    }
    create(configDefinition) {
        return this.httpClient.post(`${this.url}`, configDefinition);
    }
    getNew(isApplication) {
        return of({
            viewToOpen: 'CommonSettings',
            componentName: null,
            externalLink: null,
            impactRowVisibility: ImpactRowVisibility.None,
            localeList: [
                {
                    componentLabel: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.default-component-label.label'),
                    firstMenu: null,
                    locale: 'en',
                    secondMenu: null
                }
            ],
            parentComponentName: null,
            permissions: [],
            registeredModuleName: null,
            settingMetaData: [],
            showInLocation: isApplication ? ShowInLocationOptions.Application : ShowInLocationOptions.InnovationStudio,
            supportsMultiple: false,
            viewComponent: false
        });
    }
}
RxConfigDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxConfigDefinitionService, deps: [{ token: i1.HttpClient }, { token: i2.TranslateService }], target: i0.ɵɵFactoryTarget.Injectable });
RxConfigDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxConfigDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxConfigDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.TranslateService }]; } });
//# sourceMappingURL=config-definition.service.js.map