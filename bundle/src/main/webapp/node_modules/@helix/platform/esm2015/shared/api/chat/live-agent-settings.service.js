import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class RxLiveAgentSettingsService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.chatbotConfigurationUrl = '/api/rx/application/chat/chatbotconfiguration';
    }
    getAvailableTopics() {
        return this.httpClient.get(`${this.chatbotConfigurationUrl}/virtualchattopics`);
    }
}
RxLiveAgentSettingsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLiveAgentSettingsService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
RxLiveAgentSettingsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLiveAgentSettingsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLiveAgentSettingsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }]; } });
//# sourceMappingURL=live-agent-settings.service.js.map