import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RxCommandFactoryService } from '@helix/platform/shared/api';
import { RxGuidService } from '@helix/platform/utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@helix/platform/utils";
import * as i3 from "@helix/platform/shared/api";
export const renameRuleDefinitionCommand = 'com.bmc.arsys.rx.application.rule.command.RenameRuleDefinitionCommand';
export const revertRuleCustomizationResourceType = 'com.bmc.arsys.rx.application.rule.command.RevertRuleDefinitionCommand';
export class RxRuleDefinitionService {
    constructor(httpClient, rxGuidService, rxCommandFactoryService) {
        this.httpClient = httpClient;
        this.rxGuidService = rxGuidService;
        this.rxCommandFactoryService = rxCommandFactoryService;
        this.renameCommand = rxCommandFactoryService.forResourceType(renameRuleDefinitionCommand);
        this.revertCustomizationCommand = rxCommandFactoryService.forResourceType(revertRuleCustomizationResourceType);
    }
    get(ruleDefinitionName) {
        return this.httpClient.get(this.getUrl(ruleDefinitionName));
    }
    rename(oldRuleDefinitionName, newRuleDefinitionName) {
        return this.renameCommand.execute({
            name: oldRuleDefinitionName,
            newName: newRuleDefinitionName
        });
    }
    revertCustomization(ruleDefinitionName) {
        return this.revertCustomizationCommand.execute({ ruleDefinitionName });
    }
    update(ruleDefinition) {
        return this.httpClient.put(this.getUrl(ruleDefinition.name), ruleDefinition);
    }
    getUrl(ruleDefinitionName) {
        return `/api/rx/application/rule/ruledefinition/${encodeURIComponent(ruleDefinitionName)}`;
    }
}
RxRuleDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRuleDefinitionService, deps: [{ token: i1.HttpClient }, { token: i2.RxGuidService }, { token: i3.RxCommandFactoryService }], target: i0.ɵɵFactoryTarget.Injectable });
RxRuleDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRuleDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRuleDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.RxGuidService }, { type: i3.RxCommandFactoryService }]; } });
//# sourceMappingURL=rule-definition.service.js.map