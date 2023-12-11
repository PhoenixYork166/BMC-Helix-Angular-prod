import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RxProcessDefinitionDataPageService } from '@helix/platform/process/api';
import { map as _map } from 'lodash';
import { map } from 'rxjs/operators';
import { RX_APPLICATION, RX_RESOURCE_URLS } from '@helix/platform/shared/api';
import { RxCognitiveServiceSystemConfigurationDataPageService } from './cognitive-service-system-configuration-data-page.service';
import { RX_COGNITIVE_SERVICE } from './cognitive-service.constant';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "./cognitive-service-system-configuration-data-page.service";
import * as i3 from "@helix/platform/process/api";
export class RxCognitiveServiceService {
    constructor(httpClient, rxCognitiveServiceSystemConfigurationDataPageService, rxProcessDefinitionDataPageService) {
        this.httpClient = httpClient;
        this.rxCognitiveServiceSystemConfigurationDataPageService = rxCognitiveServiceSystemConfigurationDataPageService;
        this.rxProcessDefinitionDataPageService = rxProcessDefinitionDataPageService;
    }
    filterMaskPassword(password) {
        return password === RX_COGNITIVE_SERVICE.passwordMask ? '' : password;
    }
    getChatbotProcessDefinitionNames() {
        return this.rxProcessDefinitionDataPageService
            .get({
            headers: {
                'default-bundle-scope': RX_APPLICATION.chatbotBundleId
            },
            params: {
                propertySelection: ['name']
            }
        })
            .pipe(map((response) => _map(response.data, 'name')));
    }
    getSystemSettings(settingList) {
        return this.rxCognitiveServiceSystemConfigurationDataPageService.get({
            params: { name: settingList.join(',') }
        });
    }
    testConnection(requestPayload) {
        return this.httpClient.post(RX_RESOURCE_URLS.command, requestPayload);
    }
}
RxCognitiveServiceService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCognitiveServiceService, deps: [{ token: i1.HttpClient }, { token: i2.RxCognitiveServiceSystemConfigurationDataPageService }, { token: i3.RxProcessDefinitionDataPageService }], target: i0.ɵɵFactoryTarget.Injectable });
RxCognitiveServiceService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCognitiveServiceService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCognitiveServiceService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.RxCognitiveServiceSystemConfigurationDataPageService }, { type: i3.RxProcessDefinitionDataPageService }]; } });
//# sourceMappingURL=cognitive-service.service.js.map