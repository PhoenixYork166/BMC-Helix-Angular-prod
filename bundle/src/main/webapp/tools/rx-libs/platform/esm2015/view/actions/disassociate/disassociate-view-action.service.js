import { Injectable } from '@angular/core';
import { RxLogService } from '@helix/platform/shared/api';
import { RxViewActionUtilsService } from '@helix/platform/view/api';
import { RX_ASSOCIATED_RECORD_NODE_SIDES, RxAssociationDefinitionService, RxAssociationInstanceService } from '@helix/platform/association/api';
import { of, throwError } from 'rxjs';
import { switchMap, mapTo } from 'rxjs/operators';
import { RxError } from '@helix/platform/utils';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@helix/platform/view/api";
import * as i3 from "@helix/platform/association/api";
export class RxDisassociateViewActionService {
    constructor(rxLogService, rxViewActionUtilsService, rxAssociationDefinitionService, rxAssociationInstanceService) {
        this.rxLogService = rxLogService;
        this.rxViewActionUtilsService = rxViewActionUtilsService;
        this.rxAssociationDefinitionService = rxAssociationDefinitionService;
        this.rxAssociationInstanceService = rxAssociationInstanceService;
    }
    execute(params) {
        if (!params.associatedRecordId) {
            return throwError(new RxError('rxDisassociateAction: Associated Record ID is not defined.'));
        }
        const instanceIds = this.rxViewActionUtilsService.extractRecordIds(params.disassociatedRecordIds);
        this.rxLogService.debug(`RxDisassociateAction: disassociating ${instanceIds.length} record(s)`);
        if (instanceIds.length) {
            return this.rxAssociationDefinitionService.get(params.associationDefinitionName).pipe(switchMap(() => {
                let nodeAIds, nodeBIds = [];
                if (params.associationDefinitionRole === RX_ASSOCIATED_RECORD_NODE_SIDES.nodeA.value) {
                    nodeAIds = instanceIds;
                    nodeBIds = [params.associatedRecordId];
                }
                else if (params.associationDefinitionRole === RX_ASSOCIATED_RECORD_NODE_SIDES.nodeB.value) {
                    nodeAIds = [params.associatedRecordId];
                    nodeBIds = instanceIds;
                }
                return this.rxAssociationInstanceService
                    .disassociateRecords(params.associationDefinitionName, nodeAIds, nodeBIds)
                    .pipe(mapTo(instanceIds));
            }));
        }
        else {
            return of([]);
        }
    }
}
RxDisassociateViewActionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDisassociateViewActionService, deps: [{ token: i1.RxLogService }, { token: i2.RxViewActionUtilsService }, { token: i3.RxAssociationDefinitionService }, { token: i3.RxAssociationInstanceService }], target: i0.ɵɵFactoryTarget.Injectable });
RxDisassociateViewActionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDisassociateViewActionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDisassociateViewActionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxLogService }, { type: i2.RxViewActionUtilsService }, { type: i3.RxAssociationDefinitionService }, { type: i3.RxAssociationInstanceService }]; } });
//# sourceMappingURL=disassociate-view-action.service.js.map