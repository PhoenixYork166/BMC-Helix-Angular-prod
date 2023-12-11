import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RX_BUNDLE, RxCommandFactoryService, RxFeatureService } from '@helix/platform/shared/api';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RX_NAMED_LIST_DEFINITION } from './named-list-definition.constant';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@helix/platform/shared/api";
export class RxNamedListDefinitionService {
    constructor(httpClient, rxCommandFactoryService, rxFeatureService) {
        this.httpClient = httpClient;
        this.rxCommandFactoryService = rxCommandFactoryService;
        this.rxFeatureService = rxFeatureService;
    }
    get(namedListDefinitionName, options) {
        return this.httpClient.get(this.getUrl(namedListDefinitionName), options).pipe(tap((definition) => {
            var _a;
            if (this.rxFeatureService.isFeatureEnabled('DRD21-43015')) {
                (_a = definition.searchBehavior) !== null && _a !== void 0 ? _a : (definition.searchBehavior = RX_NAMED_LIST_DEFINITION.searchBehaviorTypes.contains);
            }
        }));
    }
    getNew() {
        const definition = {
            name: '',
            allowOverlay: false,
            scope: RX_BUNDLE.definitionScopeTypes.bundle,
            recordDefinitionName: null,
            labelFieldId: null,
            valueFieldId: null
        };
        if (this.rxFeatureService.isFeatureEnabled('DRD21-43015')) {
            definition.searchBehavior = RX_NAMED_LIST_DEFINITION.searchBehaviorTypes.contains;
        }
        return of(definition);
    }
    create(namedListDefinition) {
        return this.httpClient.post(this.getUrl(), namedListDefinition, { observe: 'response' });
    }
    update(namedListDefinition, options) {
        return this.httpClient.put(this.getUrl(namedListDefinition.name), namedListDefinition, options);
    }
    getUrl(namedListDefinitionName) {
        return namedListDefinitionName
            ? `/api/rx/application/namedlist/namedlistdefinition/${encodeURIComponent(namedListDefinitionName)}`
            : '/api/rx/application/namedlist/namedlistdefinition';
    }
    rename(oldNamedListDefinitionName, newNamedListDefinitionName) {
        return this.rxCommandFactoryService
            .forResourceType('com.bmc.arsys.rx.application.namedlist.command.RenameNamedListDefinitionCommand')
            .execute({
            name: oldNamedListDefinitionName,
            newName: newNamedListDefinitionName
        });
    }
    revertCustomization(namedListDefinitionName) {
        return this.rxCommandFactoryService
            .forResourceType('com.bmc.arsys.rx.application.namedlist.command.RevertNamedListDefinitionCommand')
            .execute({ namedListDefinitionName });
    }
    delete(definitionNames) {
        return this.rxCommandFactoryService
            .forResourceType('com.bmc.arsys.rx.application.namedlist.command.DeleteNamedListDefinitionsCommand')
            .execute({ definitionNames });
    }
}
RxNamedListDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedListDefinitionService, deps: [{ token: i1.HttpClient }, { token: i2.RxCommandFactoryService }, { token: i2.RxFeatureService }], target: i0.ɵɵFactoryTarget.Injectable });
RxNamedListDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedListDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedListDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.RxCommandFactoryService }, { type: i2.RxFeatureService }]; } });
//# sourceMappingURL=named-list-definition.service.js.map