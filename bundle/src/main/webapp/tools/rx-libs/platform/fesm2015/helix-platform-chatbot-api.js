import * as i0 from '@angular/core';
import { Injectable } from '@angular/core';
import * as i1 from '@helix/platform/record/api';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { map } from 'lodash';

const RX_CHATBOTS = {
    chatbotSettings: {
        defaultBotId: 'AGGADGG8ECDC0AP0PA6EPJSIGS75QX',
        recordDefinitionName: 'Chatbot Configuration',
        recordFieldIds: {
            name: 1770,
            bundleId: 61001
        }
    },
    componentSettings: {
        componentName: 'Global Chatbot Configuration Settings',
        settingNames: {
            displayChatbotsDropdown: 'DisplayChatbotsDropdown'
        }
    },
    sections: {
        chatbotConfigurations: {
            title: 'com.bmc.arsys.rx.client.admin.chatbots.chatbot-configurations.title',
            isExpanded: true
        },
        globalChatbotSettings: {
            title: 'com.bmc.arsys.rx.client.admin.chatbots.global-chatbot-settings.title',
            displayChatbotsDropdown: false,
            isExpanded: false
        }
    }
};

class RxChatbotDefinitionService {
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

/**
 * Generated bundle index. Do not edit.
 */

export { RX_CHATBOTS, RxChatbotDefinitionService };
//# sourceMappingURL=helix-platform-chatbot-api.js.map
