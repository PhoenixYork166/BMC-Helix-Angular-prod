import { Injectable, Injector } from '@angular/core';
import { tap } from 'rxjs/operators';
import { forEach } from 'lodash';
import { DataPage } from '../data-page';
import * as i0 from "@angular/core";
const botDefinitionDataPageQuery = 'com.bmc.arsys.rx.application.chat.datapage.ChatbotConfigurationDataPageQuery';
export class RxChatbotDefinitionDataPageService extends DataPage {
    constructor(injector) {
        super(injector, botDefinitionDataPageQuery);
        this.injector = injector;
    }
    get(dataPageRequestConfiguration = {}) {
        return super.get(dataPageRequestConfiguration).pipe(tap((result) => {
            forEach(result.data, (entity) => {
                entity.name = entity.chatbotName;
                entity.lastUpdateTime = entity.modifiedDate;
                entity.lastChangedBy = entity.modifiedBy;
            });
        }));
    }
}
RxChatbotDefinitionDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxChatbotDefinitionDataPageService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxChatbotDefinitionDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxChatbotDefinitionDataPageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxChatbotDefinitionDataPageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });
//# sourceMappingURL=chatbot-definition-data-page.service.js.map