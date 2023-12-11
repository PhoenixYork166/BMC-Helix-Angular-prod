import { Injectable } from '@angular/core';
import { OpenViewActionModalSize, OpenViewActionType, RowDataItemIdFieldName } from '@helix/platform/view/api';
import { EMPTY } from 'rxjs';
import { switchMapTo, tap } from 'rxjs/operators';
import { RX_RECORD_DEFINITION, RxRecordInstanceUtilsService } from '@helix/platform/record/api';
import { compact, flatten, flow, isArray, isFunction, isObject, map, some, uniq } from 'lodash';
import { RxGuidService, RxStringService } from '@helix/platform/utils';
import { RxOpenViewActionService } from '../open-view/open-view-action.service';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/utils";
import * as i2 from "../open-view/open-view-action.service";
import * as i3 from "@helix/platform/record/api";
export class RxAvcAssociateActionService {
    constructor(rxGuidService, rxOpenViewActionService, rxStringService, rxRecordInstanceUtilsService) {
        this.rxGuidService = rxGuidService;
        this.rxOpenViewActionService = rxOpenViewActionService;
        this.rxStringService = rxStringService;
        this.rxRecordInstanceUtilsService = rxRecordInstanceUtilsService;
    }
    execute(params) {
        return this.rxOpenViewActionService
            .execute({
            viewDefinitionName: params.viewDefinitionName,
            viewParams: null,
            presentation: {
                modalSize: OpenViewActionModalSize.Large,
                type: OpenViewActionType.DockedRightModal
            }
        })
            .pipe(tap((output) => {
            const recordInstances = flow((outputs) => map(outputs, (outputsItem) => this.extractRecordInstance(outputsItem)), flatten, compact, uniq)(output);
            params.associationViewComponent.associate(recordInstances);
        }), switchMapTo(EMPTY));
    }
    extractRecordInstance(source) {
        let recordInstanceFields = [];
        // for record grid
        if (isFunction(source.getSelectedRows)) {
            recordInstanceFields = map(source.getSelectedRows(), this.rxRecordInstanceUtilsService.convertFromDataPageRowToPlainRecordInstance);
            // for record grid row
        }
        else if (isObject(source) && this.rxStringService.isNonEmptyString(source[RowDataItemIdFieldName])) {
            recordInstanceFields.push(this.rxRecordInstanceUtilsService.convertFromDataPageRowToPlainRecordInstance(source));
            // for selected rows
        }
        else if (isArray(source) && some(source, isObject)) {
            recordInstanceFields = map(source, this.rxRecordInstanceUtilsService.convertFromDataPageRowToPlainRecordInstance);
            // for existing record instance
        }
        else if (isObject(source) && isObject(source.fieldInstances) && source.id) {
            recordInstanceFields.push(source);
            // for new record instance
        }
        else if (isObject(source) && isObject(source.fieldInstances) && !source.id) {
            const dummyId = this.rxGuidService.generate();
            source.id = dummyId;
            source.fieldInstances[RX_RECORD_DEFINITION.coreFieldIds.id].value = dummyId;
            source.isNewInstance = true;
            recordInstanceFields.push(source);
        }
        return recordInstanceFields;
    }
}
RxAvcAssociateActionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAvcAssociateActionService, deps: [{ token: i1.RxGuidService }, { token: i2.RxOpenViewActionService }, { token: i1.RxStringService }, { token: i3.RxRecordInstanceUtilsService }], target: i0.ɵɵFactoryTarget.Injectable });
RxAvcAssociateActionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAvcAssociateActionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAvcAssociateActionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxGuidService }, { type: i2.RxOpenViewActionService }, { type: i1.RxStringService }, { type: i3.RxRecordInstanceUtilsService }]; } });
//# sourceMappingURL=avc-associate-action.service.js.map