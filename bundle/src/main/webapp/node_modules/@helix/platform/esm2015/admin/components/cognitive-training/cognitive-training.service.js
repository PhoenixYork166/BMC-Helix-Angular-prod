import { Injectable } from '@angular/core';
import { RxRecordInstanceDataPageService } from '@helix/platform/record/api';
import { RxSystemConfigurationService, RX_CHATBOT } from '@helix/platform/shared/api';
import { values } from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@helix/platform/record/api";
export class RxCognitiveTrainingService {
    constructor(rxSystemConfigurationService, rxRecordInstanceDataPageService) {
        this.rxSystemConfigurationService = rxSystemConfigurationService;
        this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
    }
    getClassificationServiceProvider() {
        return this.rxSystemConfigurationService.getConfiguration('classificationServiceProvider');
    }
    getChatbotLocalesById(id) {
        return this.rxRecordInstanceDataPageService.post({
            params: {
                recorddefinition: RX_CHATBOT.chatbotLocales.recordDefinitionName,
                propertySelection: values(RX_CHATBOT.chatbotLocales.fieldIds).join(','),
                queryExpression: `'${RX_CHATBOT.chatbotLocales.fieldIds.botConfigurationId}'="${id}"`
            }
        });
    }
}
RxCognitiveTrainingService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCognitiveTrainingService, deps: [{ token: i1.RxSystemConfigurationService }, { token: i2.RxRecordInstanceDataPageService }], target: i0.ɵɵFactoryTarget.Injectable });
RxCognitiveTrainingService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCognitiveTrainingService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCognitiveTrainingService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxSystemConfigurationService }, { type: i2.RxRecordInstanceDataPageService }]; } });
//# sourceMappingURL=cognitive-training.service.js.map