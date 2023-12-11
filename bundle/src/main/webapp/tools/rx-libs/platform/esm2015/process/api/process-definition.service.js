import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { last } from 'lodash';
import { RxGuidService } from '@helix/platform/utils';
import { RX_BUNDLE } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@helix/platform/utils";
export class RxProcessDefinitionService {
    constructor(httpClient, rxGuidService) {
        this.httpClient = httpClient;
        this.rxGuidService = rxGuidService;
    }
    get(processDefinitionName, options) {
        return this.httpClient.get(this.getUrl(processDefinitionName), options);
    }
    getNew() {
        return of({
            allowOverlay: false,
            artifacts: [],
            contextKeyParam: null,
            description: '',
            flowElements: [],
            guid: this.rxGuidService.generate('rx-'),
            inputParams: [],
            isEnabled: true,
            lastChangedBy: null,
            lastUpdateTime: null,
            layout: JSON.stringify({ cells: [] }),
            localVariables: [],
            localizableStrings: {},
            name: '',
            outputParams: [],
            overlayDescriptor: null,
            overlayGroupId: null,
            owner: null,
            permissions: [],
            runAsUser: false,
            scope: RX_BUNDLE.definitionScopeTypes.bundle,
            synchronous: null
        });
    }
    getServerActionModelType(actionTypeName) {
        return `rx.ProcessActions.${actionTypeName.replace(':', '.')}`;
    }
    getServerActionTypeName(modelType) {
        return last(modelType.split('.'));
    }
    update(processDefinition, options) {
        return this.httpClient.put(this.getUrl(processDefinition.name), processDefinition, options);
    }
    getOutputParams(processDefinitionName, options) {
        return this.httpClient.get(`/api/rx/application/process/processdefinition/${encodeURIComponent(processDefinitionName)}/outputParams`, options);
    }
    getInputParams(processDefinitionName, options) {
        return this.httpClient.get(`/api/rx/application/process/processdefinition/${encodeURIComponent(processDefinitionName)}/inputParams`, options);
    }
    getUrl(processDefinitionName) {
        return processDefinitionName
            ? `/api/rx/application/process/processdefinition/${encodeURIComponent(processDefinitionName)}`
            : '/api/rx/application/process/processdefinition';
    }
}
RxProcessDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessDefinitionService, deps: [{ token: i1.HttpClient }, { token: i2.RxGuidService }], target: i0.ɵɵFactoryTarget.Injectable });
RxProcessDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.RxGuidService }]; } });
//# sourceMappingURL=process-definition.service.js.map