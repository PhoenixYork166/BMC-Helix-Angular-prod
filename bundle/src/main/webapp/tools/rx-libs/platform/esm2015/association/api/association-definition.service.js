import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RX_BUNDLE, RxCommandFactoryService } from '@helix/platform/shared/api';
import { of } from 'rxjs';
import { RX_ASSOCIATION_DEFINITION } from './association-definition.constant';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@helix/platform/shared/api";
export class RxAssociationDefinitionService {
    constructor(httpClient, rxCommandFactoryService) {
        this.httpClient = httpClient;
        this.rxCommandFactoryService = rxCommandFactoryService;
    }
    get(associationDefinitionName, options) {
        return this.httpClient.get(this.getUrl(associationDefinitionName), options);
    }
    getNew() {
        return of({
            name: '',
            description: null,
            nodeAId: null,
            nodeBId: null,
            nodeAKeys: [379],
            nodeBKeys: [379],
            nodeAName: null,
            nodeBName: null,
            cardinality: RX_ASSOCIATION_DEFINITION.cardinality.oneToOne.value,
            shouldCascadeDelete: false,
            nodeAModality: RX_ASSOCIATION_DEFINITION.modality.optional,
            isEnabled: true,
            allowOverlay: false,
            scope: RX_BUNDLE.definitionScopeTypes.bundle
        });
    }
    create(associationDefinition) {
        return this.httpClient.post(this.getUrl(), associationDefinition, { observe: 'response' });
    }
    update(associationDefinition, options) {
        return this.httpClient.put(this.getUrl(associationDefinition.name), associationDefinition, options);
    }
    delete(associationDefinitionName) {
        return this.httpClient.delete(this.getUrl(associationDefinitionName));
    }
    revertCustomization(associationDefinitionName) {
        const revertCustomizationCommand = this.rxCommandFactoryService.forResourceType('com.bmc.arsys.rx.application.association.command.RevertAssociationDefinitionCommand');
        return revertCustomizationCommand.execute({ associationDefinitionName });
    }
    rename(oldAssociationDefinitionName, newAssociationDefinitionName) {
        const renameCommand = this.rxCommandFactoryService.forResourceType('com.bmc.arsys.rx.application.association.command.RenameAssociationDefinitionCommand');
        return renameCommand.execute({
            name: oldAssociationDefinitionName,
            newName: newAssociationDefinitionName
        });
    }
    getUrl(associationDefinitionName) {
        return associationDefinitionName
            ? `/api/rx/application/association/associationdefinition/${encodeURIComponent(associationDefinitionName)}`
            : `/api/rx/application/association/associationdefinition`;
    }
}
RxAssociationDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationDefinitionService, deps: [{ token: i1.HttpClient }, { token: i2.RxCommandFactoryService }], target: i0.ɵɵFactoryTarget.Injectable });
RxAssociationDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.RxCommandFactoryService }]; } });
//# sourceMappingURL=association-definition.service.js.map