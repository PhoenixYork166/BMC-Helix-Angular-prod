import { Injectable } from '@angular/core';
import { RxCommandFactoryService } from '@helix/platform/shared/api';
import { castArray } from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
export const associateMultipleCommand = 'com.bmc.arsys.rx.application.association.command.AssociateMultipleCommand';
export const disassociateMultipleCommand = 'com.bmc.arsys.rx.application.association.command.DisassociateMultipleCommand';
export class RxAssociationInstanceService {
    constructor(rxCommandFactoryService) {
        this.rxCommandFactoryService = rxCommandFactoryService;
        this.associateCommand = this.rxCommandFactoryService.forResourceType(associateMultipleCommand);
        this.disassociateCommand = this.rxCommandFactoryService.forResourceType(disassociateMultipleCommand);
    }
    associateRecords(associationDefinitionName, nodeAIds, nodeBIds, useDefaultRoles, nodeARole, nodeBRole) {
        return this.associateCommand.execute({
            associationDefinitionName,
            nodeARecordInstanceIds: castArray(nodeAIds),
            nodeBRecordInstanceIds: castArray(nodeBIds),
            useDefaultRoles,
            nodeARole,
            nodeBRole
        });
    }
    disassociateRecords(associationDefinitionName, nodeAIds, nodeBIds) {
        return this.disassociateCommand.execute({
            associationDefinitionName,
            nodeARecordInstanceIds: castArray(nodeAIds),
            nodeBRecordInstanceIds: castArray(nodeBIds)
        });
    }
}
RxAssociationInstanceService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationInstanceService, deps: [{ token: i1.RxCommandFactoryService }], target: i0.ɵɵFactoryTarget.Injectable });
RxAssociationInstanceService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationInstanceService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationInstanceService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxCommandFactoryService }]; } });
//# sourceMappingURL=association-instance.service.js.map