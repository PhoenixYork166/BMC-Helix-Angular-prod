import { Injectable } from '@angular/core';
import { RxAssociationDefinitionDataPageService } from '@helix/platform/association/api';
import { RxNamedListDefinitionDataPageService } from '@helix/platform/named-list/api';
import { RxProcessDefinitionDataPageService } from '@helix/platform/process/api';
import { RX_RECORD_DEFINITION, RxRecordDefinitionDataPageService } from '@helix/platform/record/api';
import { RX_VIEW_DEFINITION, RxViewDefinitionDataPageService } from '@helix/platform/view/api';
import { map, shareReplay } from 'rxjs/operators';
import { RX_BUNDLE, RxChatbotDefinitionDataPageService } from '@helix/platform/shared/api';
import { filter } from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/record/api";
import * as i2 from "@helix/platform/process/api";
import * as i3 from "@helix/platform/view/api";
import * as i4 from "@helix/platform/named-list/api";
import * as i5 from "@helix/platform/association/api";
import * as i6 from "@helix/platform/shared/api";
export class RxDefinitionPickerCacheService {
    constructor(recordDefinitionDataPageService, processDefinitionDataPageService, viewDefinitionDataPageService, namedListDefinitionDataPageService, associationDefinitionDataPageService, rxChatbotDefinitionDataPageService) {
        this.recordDefinitionDataPageService = recordDefinitionDataPageService;
        this.processDefinitionDataPageService = processDefinitionDataPageService;
        this.viewDefinitionDataPageService = viewDefinitionDataPageService;
        this.namedListDefinitionDataPageService = namedListDefinitionDataPageService;
        this.associationDefinitionDataPageService = associationDefinitionDataPageService;
        this.rxChatbotDefinitionDataPageService = rxChatbotDefinitionDataPageService;
        this.registeredConsumerCount = 0;
        this.bundleRecordDefinitionDescriptors = {};
        this.bundleDataRecordDefinitionDescriptors = {};
        this.bundleRegularRecordDefinitionDescriptors = {};
        this.bundleRegularDataRecordDefinitionDescriptors = {};
        this.bundleStandardDataRecordDefinitionDescriptors = {};
        this.bundlePublicRegularDataRecordDefinitionDescriptors = {};
        this.bundleInheritableRecordDefinitionDescriptors = {};
        this.bundleProcessDefinitionDescriptors = {};
        this.bundlePublicProcessDefinitionDescriptors = {};
        this.bundleViewDefinitionDescriptor = {};
        this.bundleNamedListDefinitionDescriptors = {};
        this.bundleAssociationDefinitionDescriptors = {};
        this.bundleChatbotDefinitionDescriptors = {};
    }
    getBundleRecordDefinitionDescriptors(bundleId) {
        if (!this.bundleRecordDefinitionDescriptors[bundleId]) {
            this.bundleRecordDefinitionDescriptors[bundleId] = this.recordDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': bundleId
                },
                params: {
                    propertySelection: ['name', 'scope'],
                    requireDependent: true
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.bundleRecordDefinitionDescriptors[bundleId];
    }
    getBundleDataRecordDefinitionDescriptors(bundleId) {
        if (!this.bundleDataRecordDefinitionDescriptors[bundleId]) {
            this.bundleDataRecordDefinitionDescriptors[bundleId] = this.recordDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': bundleId
                },
                params: {
                    propertySelection: ['name', 'scope'],
                    requireDependent: true,
                    excludeAuditRecordDefinitions: true
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.bundleDataRecordDefinitionDescriptors[bundleId];
    }
    getBundleStandardDataRecordDefinitionDescriptors(bundleId) {
        if (!this.bundleStandardDataRecordDefinitionDescriptors[bundleId]) {
            this.bundleStandardDataRecordDefinitionDescriptors[bundleId] = this.recordDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': bundleId
                },
                params: {
                    propertySelection: ['name', 'scope'],
                    requireDependent: true,
                    excludeAuditRecordDefinitions: true,
                    excludeCustomRecordDefinitions: true
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.bundleStandardDataRecordDefinitionDescriptors[bundleId];
    }
    getAllRecordDefinitionDescriptors() {
        if (!this.allRecordDefinitionDescriptors) {
            this.allRecordDefinitionDescriptors = this.recordDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': ''
                },
                params: {
                    propertySelection: ['name', 'scope']
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.allRecordDefinitionDescriptors;
    }
    getAllDataRecordDefinitionDescriptors() {
        if (!this.allDataRecordDefinitionDescriptors) {
            this.allDataRecordDefinitionDescriptors = this.recordDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': ''
                },
                params: {
                    propertySelection: ['name', 'scope'],
                    excludeAuditRecordDefinitions: true
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.allDataRecordDefinitionDescriptors;
    }
    getAllStandardDataRecordDefinitionDescriptors() {
        if (!this.allStandardDataRecordDefinitionDescriptors) {
            this.allStandardDataRecordDefinitionDescriptors = this.recordDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': ''
                },
                params: {
                    propertySelection: ['name', 'scope'],
                    excludeAuditRecordDefinitions: true,
                    excludeCustomRecordDefinitions: true
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.allStandardDataRecordDefinitionDescriptors;
    }
    getRxRecordDefinitionDescriptors() {
        if (!this.rxRecordDefinitionDescriptors) {
            this.rxRecordDefinitionDescriptors = this.recordDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': ''
                },
                params: {
                    rxDefinitionsOnly: true,
                    propertySelection: ['name', 'scope']
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.rxRecordDefinitionDescriptors;
    }
    getRxDataRecordDefinitionDescriptors() {
        if (!this.rxDataRecordDefinitionDescriptors) {
            this.rxDataRecordDefinitionDescriptors = this.recordDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': ''
                },
                params: {
                    propertySelection: ['name', 'scope'],
                    rxDefinitionsOnly: true,
                    excludeAuditRecordDefinitions: true
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.rxDataRecordDefinitionDescriptors;
    }
    getRxStandardDataRecordDefinitionDescriptors() {
        if (!this.rxStandardDataRecordDefinitionDescriptors) {
            this.rxStandardDataRecordDefinitionDescriptors = this.recordDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': ''
                },
                params: {
                    propertySelection: ['name', 'scope'],
                    rxDefinitionsOnly: true,
                    excludeAuditRecordDefinitions: true,
                    excludeCustomRecordDefinitions: true
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.rxStandardDataRecordDefinitionDescriptors;
    }
    getAllRegularRecordDefinitionDescriptors() {
        if (!this.allRegularRecordDefinitionDescriptors) {
            this.allRegularRecordDefinitionDescriptors = this.recordDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': ''
                },
                params: {
                    propertySelection: ['name', 'scope'],
                    resourceType: RX_RECORD_DEFINITION.recordDefinitionTypes.regular.recordDefinitionType
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.allRegularRecordDefinitionDescriptors;
    }
    getAllRegularDataRecordDefinitionDescriptors() {
        if (!this.allRegularDataRecordDefinitionDescriptors) {
            this.allRegularDataRecordDefinitionDescriptors = this.recordDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': ''
                },
                params: {
                    propertySelection: ['name', 'scope'],
                    excludeAuditRecordDefinitions: true,
                    resourceType: RX_RECORD_DEFINITION.recordDefinitionTypes.regular.recordDefinitionType
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.allRegularDataRecordDefinitionDescriptors;
    }
    getRxRegularRecordDefinitionDescriptors() {
        if (!this.rxRegularRecordDefinitionDescriptors) {
            this.rxRegularRecordDefinitionDescriptors = this.recordDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': ''
                },
                params: {
                    propertySelection: ['name', 'scope'],
                    rxDefinitionsOnly: true,
                    resourceType: RX_RECORD_DEFINITION.recordDefinitionTypes.regular.recordDefinitionType
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.rxRegularRecordDefinitionDescriptors;
    }
    getRxRegularDataRecordDefinitionDescriptors() {
        if (!this.rxRegularDataRecordDefinitionDescriptors) {
            this.rxRegularDataRecordDefinitionDescriptors = this.recordDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': ''
                },
                params: {
                    propertySelection: ['name', 'scope'],
                    rxDefinitionsOnly: true,
                    resourceType: RX_RECORD_DEFINITION.recordDefinitionTypes.regular.recordDefinitionType,
                    excludeAuditRecordDefinitions: true
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.rxRegularDataRecordDefinitionDescriptors;
    }
    getBundleRegularRecordDefinitionDescriptors(bundleId) {
        if (!this.bundleRegularRecordDefinitionDescriptors[bundleId]) {
            this.bundleRegularRecordDefinitionDescriptors[bundleId] = this.recordDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': bundleId
                },
                params: {
                    propertySelection: ['name', 'scope'],
                    requireDependent: true,
                    resourceType: RX_RECORD_DEFINITION.recordDefinitionTypes.regular.recordDefinitionType
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.bundleRegularRecordDefinitionDescriptors[bundleId];
    }
    getBundleRegularDataRecordDefinitionDescriptors(bundleId) {
        if (!this.bundleRegularDataRecordDefinitionDescriptors[bundleId]) {
            this.bundleRegularDataRecordDefinitionDescriptors[bundleId] = this.recordDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': bundleId
                },
                params: {
                    propertySelection: ['name', 'scope'],
                    requireDependent: true,
                    resourceType: RX_RECORD_DEFINITION.recordDefinitionTypes.regular.recordDefinitionType,
                    excludeAuditRecordDefinitions: true
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.bundleRegularDataRecordDefinitionDescriptors[bundleId];
    }
    getAllPublicRegularDataRecordDefinitionDescriptors() {
        if (!this.allPublicRegularDataRecordDefinitionDescriptors) {
            this.allPublicRegularDataRecordDefinitionDescriptors = this.getAllRegularDataRecordDefinitionDescriptors().pipe(map((recordDefinitionDescriptors) => filter(recordDefinitionDescriptors, { scope: RX_BUNDLE.definitionScopeTypes.public })), shareReplay(1));
        }
        return this.allPublicRegularDataRecordDefinitionDescriptors;
    }
    getRxPublicRegularDataRecordDefinitionDescriptors() {
        if (!this.rxPublicRegularDataRecordDefinitionDescriptors) {
            this.rxPublicRegularDataRecordDefinitionDescriptors = this.getRxRegularDataRecordDefinitionDescriptors().pipe(map((recordDefinitionDescriptors) => filter(recordDefinitionDescriptors, { scope: RX_BUNDLE.definitionScopeTypes.public })), shareReplay(1));
        }
        return this.rxPublicRegularDataRecordDefinitionDescriptors;
    }
    getBundlePublicRegularDataRecordDefinitionDescriptors(bundleId) {
        if (!this.bundlePublicRegularDataRecordDefinitionDescriptors[bundleId]) {
            this.bundlePublicRegularDataRecordDefinitionDescriptors[bundleId] =
                this.getBundleRegularDataRecordDefinitionDescriptors(bundleId).pipe(map((recordDefinitionDescriptors) => filter(recordDefinitionDescriptors, { scope: RX_BUNDLE.definitionScopeTypes.public })));
        }
        return this.bundlePublicRegularDataRecordDefinitionDescriptors[bundleId];
    }
    getAllInheritableRecordDefinitionDescriptors() {
        if (!this.allInheritableRecordDefinitionDescriptors) {
            this.allInheritableRecordDefinitionDescriptors = this.recordDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': ''
                },
                params: {
                    propertySelection: ['name', 'scope'],
                    inheritableDefinitionsOnly: true
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.allInheritableRecordDefinitionDescriptors;
    }
    getBundleInheritableRecordDefinitionDescriptors(bundleId) {
        if (!this.bundleInheritableRecordDefinitionDescriptors[bundleId]) {
            this.bundleInheritableRecordDefinitionDescriptors[bundleId] = this.recordDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': bundleId
                },
                params: {
                    propertySelection: ['name', 'scope'],
                    requireDependent: true,
                    inheritableDefinitionsOnly: true
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.bundleInheritableRecordDefinitionDescriptors[bundleId];
    }
    getAllProcessDefinitionDescriptors() {
        if (!this.allProcessDefinitionDescriptors) {
            this.allProcessDefinitionDescriptors = this.processDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': ''
                },
                params: {
                    propertySelection: ['name', 'scope']
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.allProcessDefinitionDescriptors;
    }
    getAllPublicProcessDefinitionDescriptors() {
        if (!this.allPublicProcessDefinitionDescriptors) {
            this.allPublicProcessDefinitionDescriptors = this.getAllProcessDefinitionDescriptors().pipe(map((processDefinitionDescriptors) => filter(processDefinitionDescriptors, { scope: RX_BUNDLE.definitionScopeTypes.public })), shareReplay(1));
        }
        return this.allPublicProcessDefinitionDescriptors;
    }
    getBundleProcessDefinitionDescriptors(bundleId) {
        if (!this.bundleProcessDefinitionDescriptors[bundleId]) {
            this.bundleProcessDefinitionDescriptors[bundleId] = this.processDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': bundleId
                },
                params: {
                    propertySelection: ['name', 'scope'],
                    requireDependent: true
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.bundleProcessDefinitionDescriptors[bundleId];
    }
    getBundlePublicProcessDefinitionDescriptors(bundleId) {
        if (!this.bundlePublicProcessDefinitionDescriptors[bundleId]) {
            this.bundlePublicProcessDefinitionDescriptors[bundleId] = this.getBundleProcessDefinitionDescriptors(bundleId).pipe(map((processDefinitionDescriptors) => filter(processDefinitionDescriptors, { scope: RX_BUNDLE.definitionScopeTypes.public })));
        }
        return this.bundlePublicProcessDefinitionDescriptors[bundleId];
    }
    getAllViewDefinitionDescriptors() {
        if (!this.allViewDefinitionDescriptors) {
            this.allViewDefinitionDescriptors = this.viewDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': ''
                },
                params: {
                    propertySelection: ['name', 'scope'],
                    viewType: RX_VIEW_DEFINITION.types.regular
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.allViewDefinitionDescriptors;
    }
    getBundleViewDefinitionDescriptors(bundleId) {
        if (!this.bundleViewDefinitionDescriptor[bundleId]) {
            this.bundleViewDefinitionDescriptor[bundleId] = this.viewDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': bundleId
                },
                params: {
                    propertySelection: ['name', 'scope'],
                    requireDependent: true,
                    viewType: RX_VIEW_DEFINITION.types.regular
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.bundleViewDefinitionDescriptor[bundleId];
    }
    getAllNamedListDefinitionDescriptors() {
        if (!this.allNamedListDefinitionDescriptors) {
            this.allNamedListDefinitionDescriptors = this.namedListDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': ''
                },
                params: {
                    propertySelection: ['name', 'scope']
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.allNamedListDefinitionDescriptors;
    }
    getBundleNamedListDefinitionDescriptors(bundleId) {
        if (!this.bundleNamedListDefinitionDescriptors[bundleId]) {
            this.bundleNamedListDefinitionDescriptors[bundleId] = this.namedListDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': bundleId
                },
                params: {
                    propertySelection: ['name', 'scope'],
                    requireDependent: true
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.bundleNamedListDefinitionDescriptors[bundleId];
    }
    getAllAssociationDefinitionDescriptors() {
        if (!this.allAssociationDefinitionDescriptors) {
            this.allAssociationDefinitionDescriptors = this.associationDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': ''
                },
                params: {
                    propertySelection: ['name', 'scope']
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.allAssociationDefinitionDescriptors;
    }
    getBundleAssociationDefinitionDescriptors(bundleId) {
        if (!this.bundleAssociationDefinitionDescriptors[bundleId]) {
            this.bundleAssociationDefinitionDescriptors[bundleId] = this.associationDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': bundleId
                },
                params: {
                    propertySelection: ['name', 'scope'],
                    requireDependent: true
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.bundleAssociationDefinitionDescriptors[bundleId];
    }
    getAllChatbotDefinitionDescriptors() {
        if (!this.allChatbotDefinitionDescriptors) {
            this.allChatbotDefinitionDescriptors = this.rxChatbotDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': ''
                },
                params: {
                    propertySelection: ['chatbotName']
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.allChatbotDefinitionDescriptors;
    }
    getBundleChatbotDefinitionDescriptors(bundleId) {
        if (!this.bundleChatbotDefinitionDescriptors[bundleId]) {
            this.bundleChatbotDefinitionDescriptors[bundleId] = this.rxChatbotDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': bundleId
                },
                params: {
                    propertySelection: ['chatbotName']
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.bundleChatbotDefinitionDescriptors[bundleId];
    }
    registerConsumer() {
        this.registeredConsumerCount++;
    }
    unRegisterConsumer() {
        this.registeredConsumerCount--;
        if (this.registeredConsumerCount === 0) {
            this.clear();
        }
    }
    clear() {
        this.bundleRecordDefinitionDescriptors = {};
        this.bundleDataRecordDefinitionDescriptors = {};
        this.bundleRegularRecordDefinitionDescriptors = {};
        this.bundleRegularDataRecordDefinitionDescriptors = {};
        this.bundleStandardDataRecordDefinitionDescriptors = {};
        this.bundleInheritableRecordDefinitionDescriptors = {};
        this.bundleProcessDefinitionDescriptors = {};
        this.bundlePublicProcessDefinitionDescriptors = {};
        this.bundleViewDefinitionDescriptor = {};
        this.bundleNamedListDefinitionDescriptors = {};
        this.bundleAssociationDefinitionDescriptors = {};
        this.bundleChatbotDefinitionDescriptors = {};
        this.bundlePublicRegularDataRecordDefinitionDescriptors = {};
        this.rxRecordDefinitionDescriptors = null;
        this.rxDataRecordDefinitionDescriptors = null;
        this.rxStandardDataRecordDefinitionDescriptors = null;
        this.allRecordDefinitionDescriptors = null;
        this.allDataRecordDefinitionDescriptors = null;
        this.allStandardDataRecordDefinitionDescriptors = null;
        this.allRegularRecordDefinitionDescriptors = null;
        this.allRegularDataRecordDefinitionDescriptors = null;
        this.rxRegularRecordDefinitionDescriptors = null;
        this.rxRegularDataRecordDefinitionDescriptors = null;
        this.allInheritableRecordDefinitionDescriptors = null;
        this.allProcessDefinitionDescriptors = null;
        this.allPublicProcessDefinitionDescriptors = null;
        this.allViewDefinitionDescriptors = null;
        this.allNamedListDefinitionDescriptors = null;
        this.allAssociationDefinitionDescriptors = null;
        this.allChatbotDefinitionDescriptors = null;
        this.allPublicRegularDataRecordDefinitionDescriptors = null;
        this.rxPublicRegularDataRecordDefinitionDescriptors = null;
    }
}
RxDefinitionPickerCacheService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionPickerCacheService, deps: [{ token: i1.RxRecordDefinitionDataPageService }, { token: i2.RxProcessDefinitionDataPageService }, { token: i3.RxViewDefinitionDataPageService }, { token: i4.RxNamedListDefinitionDataPageService }, { token: i5.RxAssociationDefinitionDataPageService }, { token: i6.RxChatbotDefinitionDataPageService }], target: i0.ɵɵFactoryTarget.Injectable });
RxDefinitionPickerCacheService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionPickerCacheService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionPickerCacheService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxRecordDefinitionDataPageService }, { type: i2.RxProcessDefinitionDataPageService }, { type: i3.RxViewDefinitionDataPageService }, { type: i4.RxNamedListDefinitionDataPageService }, { type: i5.RxAssociationDefinitionDataPageService }, { type: i6.RxChatbotDefinitionDataPageService }]; } });
//# sourceMappingURL=definition-picker-cache.service.js.map