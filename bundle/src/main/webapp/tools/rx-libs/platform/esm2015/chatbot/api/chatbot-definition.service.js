import { Injectable } from '@angular/core';
import { RX_RECORD_DEFINITION, RxRecordInstanceService, RxRecordInstanceUpdateService } from '@helix/platform/record/api';
import { forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { map } from 'lodash';
import { RX_CHATBOTS } from './chatbots.constant';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/record/api";
export class RxChatbotDefinitionService {
    constructor(rxRecordInstanceService, rxRecordInstanceUpdateService) {
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.rxRecordInstanceUpdateService = rxRecordInstanceUpdateService;
    }
    delete(recordInstanceIds) {
        return forkJoin(map(recordInstanceIds, (id) => {
            return this.rxRecordInstanceService.delete(RX_CHATBOTS.chatbotSettings.recordDefinitionName, id);
        }));
    }
    create(chatbotName, bundleDescriptor) {
        return this.rxRecordInstanceService.getNew(RX_CHATBOTS.chatbotSettings.recordDefinitionName).pipe(switchMap((recordInstance) => {
            recordInstance.setFieldValue(RX_CHATBOTS.chatbotSettings.recordFieldIds.name, chatbotName);
            recordInstance.setFieldValue(RX_CHATBOTS.chatbotSettings.recordFieldIds.bundleId, bundleDescriptor.id);
            recordInstance.setFieldValue(RX_RECORD_DEFINITION.coreFieldIds.description, `${bundleDescriptor.friendlyName} Chatbot configuration`);
            return this.rxRecordInstanceService.create(recordInstance);
        }));
    }
    rename(recordInstanceId, newChatbotName) {
        return this.rxRecordInstanceService.get(RX_CHATBOTS.chatbotSettings.recordDefinitionName, recordInstanceId).pipe(switchMap((recordInstance) => {
            recordInstance.setFieldValue(RX_CHATBOTS.chatbotSettings.recordFieldIds.name, newChatbotName);
            return this.rxRecordInstanceUpdateService.execute(recordInstance);
        }));
    }
}
RxChatbotDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxChatbotDefinitionService, deps: [{ token: i1.RxRecordInstanceService }, { token: i1.RxRecordInstanceUpdateService }], target: i0.ɵɵFactoryTarget.Injectable });
RxChatbotDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxChatbotDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxChatbotDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxRecordInstanceService }, { type: i1.RxRecordInstanceUpdateService }]; } });
//# sourceMappingURL=chatbot-definition.service.js.map