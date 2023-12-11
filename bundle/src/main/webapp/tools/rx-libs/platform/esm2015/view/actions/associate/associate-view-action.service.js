import { Injectable } from '@angular/core';
import { RxViewActionUtilsService } from '@helix/platform/view/api';
import { RX_ASSOCIATED_RECORD_NODE_SIDES, RX_ASSOCIATION_DEFINITION, RxAssociationDefinitionService, RxAssociationInstanceService } from '@helix/platform/association/api';
import { RxOpenViewActionService } from '../open-view/open-view-action.service';
import { RxLogService } from '@helix/platform/shared/api';
import { forkJoin, of, throwError } from 'rxjs';
import { map, mapTo, switchMap } from 'rxjs/operators';
import { compact, flatten, flow, map as _map, uniq } from 'lodash';
import { RX_OPEN_VIEW } from '../open-view/open-view-action.constant';
import { RxError } from '@helix/platform/utils';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/association/api";
import * as i2 from "../open-view/open-view-action.service";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "@helix/platform/view/api";
export class RxAssociateViewActionService {
    constructor(rxAssociationInstanceService, rxOpenViewActionService, rxAssociationDefinitionService, rxLogService, rxViewActionUtilsService) {
        this.rxAssociationInstanceService = rxAssociationInstanceService;
        this.rxOpenViewActionService = rxOpenViewActionService;
        this.rxAssociationDefinitionService = rxAssociationDefinitionService;
        this.rxLogService = rxLogService;
        this.rxViewActionUtilsService = rxViewActionUtilsService;
    }
    execute(params) {
        if (!params.associatedRecordId) {
            return throwError(new RxError('rxAssociateAction: Associated Record ID is not defined.'));
        }
        return forkJoin([
            this.getInstanceIds(params),
            this.rxAssociationDefinitionService.get(params.associationDefinitionName)
        ]).pipe(switchMap(([instanceIds, associationDefinition]) => {
            let nodeAIds = [];
            let nodeBIds = [];
            if (instanceIds.length) {
                if (params.associationDefinitionRole === RX_ASSOCIATED_RECORD_NODE_SIDES.nodeA.value) {
                    nodeAIds = instanceIds;
                    nodeBIds = [params.associatedRecordId];
                }
                else if (params.associationDefinitionRole === RX_ASSOCIATED_RECORD_NODE_SIDES.nodeB.value) {
                    nodeAIds = [params.associatedRecordId];
                    nodeBIds = instanceIds;
                }
                if (associationDefinition.cardinality === RX_ASSOCIATION_DEFINITION.cardinality.oneToOne.value) {
                    nodeAIds = nodeAIds[0];
                    nodeBIds = nodeBIds[0];
                }
                else if (associationDefinition.cardinality === RX_ASSOCIATION_DEFINITION.cardinality.oneToMany.value) {
                    nodeAIds = nodeAIds[0];
                }
                return this.rxAssociationInstanceService
                    .associateRecords(params.associationDefinitionName, nodeAIds, nodeBIds, params.useDefaultRoles, params.nodeARole, params.nodeBRole)
                    .pipe(mapTo(instanceIds));
            }
            return of(instanceIds);
        }));
    }
    getInstanceIds(params) {
        return this.rxOpenViewActionService
            .execute({
            presentation: {
                modalSize: RX_OPEN_VIEW.modalSize.Large,
                type: RX_OPEN_VIEW.type.DockedRightModal
            },
            viewDefinitionName: params.viewDefinitionName,
            viewParams: null
        })
            .pipe(map((output) => {
            const instanceIds = flow((outs) => _map(outs, (out) => this.rxViewActionUtilsService.extractRecordIds(out)), flatten, compact, uniq)(output);
            this.rxLogService.debug(`RxAssociateAction: associating ${instanceIds.length} record(s)`);
            return instanceIds;
        }));
    }
}
RxAssociateViewActionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociateViewActionService, deps: [{ token: i1.RxAssociationInstanceService }, { token: i2.RxOpenViewActionService }, { token: i1.RxAssociationDefinitionService }, { token: i3.RxLogService }, { token: i4.RxViewActionUtilsService }], target: i0.ɵɵFactoryTarget.Injectable });
RxAssociateViewActionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociateViewActionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociateViewActionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxAssociationInstanceService }, { type: i2.RxOpenViewActionService }, { type: i1.RxAssociationDefinitionService }, { type: i3.RxLogService }, { type: i4.RxViewActionUtilsService }]; } });
//# sourceMappingURL=associate-view-action.service.js.map