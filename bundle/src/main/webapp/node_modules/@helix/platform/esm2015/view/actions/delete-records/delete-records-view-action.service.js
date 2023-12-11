import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import { RxViewActionUtilsService } from '@helix/platform/view/api';
import { RxRecordInstanceService } from '@helix/platform/record/api';
import { RxLogService, RxNotificationService } from '@helix/platform/shared/api';
import { EMPTY, forkJoin, from, throwError } from 'rxjs';
import { switchMap, switchMapTo, tap } from 'rxjs/operators';
import { RxError, RxStringService } from '@helix/platform/utils';
import { castArray, isEmpty, isFunction } from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@helix/platform/ui-kit";
import * as i3 from "@ngx-translate/core";
import * as i4 from "@helix/platform/record/api";
import * as i5 from "@helix/platform/view/api";
import * as i6 from "@helix/platform/utils";
export class RxDeleteRecordsViewActionService {
    constructor(rxLogService, rxModalService, translateService, rxNotificationService, rxRecordInstanceService, rxViewActionUtilsService, rxStringService) {
        this.rxLogService = rxLogService;
        this.rxModalService = rxModalService;
        this.translateService = translateService;
        this.rxNotificationService = rxNotificationService;
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.rxViewActionUtilsService = rxViewActionUtilsService;
        this.rxStringService = rxStringService;
    }
    execute(params) {
        if (isEmpty(params.recordDefinitionName) &&
            params.records &&
            isFunction(params.records.getRecordDefinitionName)) {
            params.recordDefinitionName = params.records.getRecordDefinitionName();
        }
        if (this.rxStringService.isNonEmptyString(params.recordDefinitionName)) {
            let records = [];
            if (params.records) {
                if (isFunction(params.records.getSelectedRows)) {
                    records = castArray(params.records.getSelectedRows());
                }
                else {
                    records = castArray(params.records);
                }
            }
            const recordIds = this.rxViewActionUtilsService.extractRecordIds(records);
            if (recordIds.length) {
                const message = recordIds.length === 1
                    ? 'com.bmc.arsys.rx.client.view-actions.delete-record.confirmation-dialog.message'
                    : 'com.bmc.arsys.rx.client.view-actions.delete-records.confirmation-dialog.message';
                return from(this.rxModalService.confirm({
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                    modalStyle: RX_MODAL.modalStyles.warning,
                    message: this.translateService.instant(message, { count: recordIds.length })
                })).pipe(switchMap((res) => {
                    if (res) {
                        const deleteObservables = recordIds.map((recordId) => this.rxRecordInstanceService.delete(params.recordDefinitionName, recordId));
                        return forkJoin(deleteObservables).pipe(tap(() => {
                            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.view-actions.delete-records.records-deleted.message'));
                        }), switchMapTo(isFunction(params.records.refresh)
                            ? params.records.refresh()
                            : EMPTY));
                    }
                    else {
                        return throwError(null);
                    }
                }));
            }
            else {
                this.rxLogService.debug('rxDeleteRecordsAction: no records to delete.');
                return EMPTY;
            }
        }
        else {
            return throwError(new RxError('rxDeleteRecordsAction: Record Definition Name is not defined.'));
        }
    }
}
RxDeleteRecordsViewActionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDeleteRecordsViewActionService, deps: [{ token: i1.RxLogService }, { token: i2.RxModalService }, { token: i3.TranslateService }, { token: i1.RxNotificationService }, { token: i4.RxRecordInstanceService }, { token: i5.RxViewActionUtilsService }, { token: i6.RxStringService }], target: i0.ɵɵFactoryTarget.Injectable });
RxDeleteRecordsViewActionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDeleteRecordsViewActionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDeleteRecordsViewActionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxLogService }, { type: i2.RxModalService }, { type: i3.TranslateService }, { type: i1.RxNotificationService }, { type: i4.RxRecordInstanceService }, { type: i5.RxViewActionUtilsService }, { type: i6.RxStringService }]; } });
//# sourceMappingURL=delete-records-view-action.service.js.map