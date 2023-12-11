import { Injectable } from '@angular/core';
import { RxDefinitionNameService, RxLogService } from '@helix/platform/shared/api';
import { RxError } from '@helix/platform/utils';
import { RxViewActionUtilsService } from '@helix/platform/view/api';
import { RxRecordGridUtilsService } from '@helix/platform/view/components';
import { TranslateService } from '@ngx-translate/core';
import { isEmpty, isFunction, isNil } from 'lodash';
import { EMPTY, from, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { RX_OPEN_VIEW } from '../../open-view/open-view-action.constant';
import { RxOpenViewActionService } from '../../open-view/open-view-action.service';
import { RxEditRecordsDataService } from './edit-records-data.service';
import { RxEditRecordsViewBuilder } from './edit-records-view-builder.service';
import * as i0 from "@angular/core";
import * as i1 from "./edit-records-view-builder.service";
import * as i2 from "./edit-records-data.service";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "@helix/platform/view/components";
import * as i5 from "@ngx-translate/core";
import * as i6 from "../../open-view/open-view-action.service";
import * as i7 from "@helix/platform/view/api";
export class RxEditRecordsViewActionService {
    constructor(rxEditRecordsViewBuilder, rxEditRecordsDataService, rxLogService, rxRecordGridUtilsService, translateService, rxDefinitionNameService, openViewAction, rxViewActionUtilsService) {
        this.rxEditRecordsViewBuilder = rxEditRecordsViewBuilder;
        this.rxEditRecordsDataService = rxEditRecordsDataService;
        this.rxLogService = rxLogService;
        this.rxRecordGridUtilsService = rxRecordGridUtilsService;
        this.translateService = translateService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.openViewAction = openViewAction;
        this.rxViewActionUtilsService = rxViewActionUtilsService;
    }
    execute(params) {
        let { recordDefinitionName } = params;
        if (isNil(params.records)) {
            return throwError(new RxError('rxEditRecordsAction: no records to edit.'));
        }
        if (isEmpty(recordDefinitionName) && isFunction(params.records.getRecordDefinitionName)) {
            recordDefinitionName = params.records.getRecordDefinitionName();
        }
        if (recordDefinitionName) {
            const recordIds = this.rxViewActionUtilsService.extractRecordIds(params.records);
            if (recordIds.length) {
                return from(this.rxRecordGridUtilsService.getColumnDescriptors(recordDefinitionName, params.records)).pipe(switchMap((columnDescriptors) => {
                    const localizedViewTitle = this.translateService.instant('com.bmc.arsys.rx.client.view-actions.edit-records.view.title', { recordDefinitionName: this.rxDefinitionNameService.getDisplayName(recordDefinitionName) });
                    const localizedViewNotification = this.translateService.instant('com.bmc.arsys.rx.client.view-actions.edit-records.view.notification');
                    return this.openViewAction
                        .execute({
                        presentation: {
                            modalSize: RX_OPEN_VIEW.modalSize.Large,
                            title: localizedViewTitle,
                            notification: localizedViewNotification,
                            type: RX_OPEN_VIEW.type.DockedRightModal
                        },
                        viewDefinitionName: this.rxEditRecordsViewBuilder.getViewDefinition(recordDefinitionName, columnDescriptors),
                        viewParams: null
                    })
                        .pipe(switchMap((viewOutput) => viewOutput && viewOutput.recordInstance
                        ? this.rxEditRecordsDataService
                            .runAction(recordIds, viewOutput.recordInstance)
                            .pipe(switchMap(() => isFunction(params.records.refresh)
                            ? params.records.refresh()
                            : EMPTY))
                        : EMPTY));
                }));
            }
            else {
                this.rxLogService.debug('rxEditRecordsAction: no records to edit.');
            }
        }
        else {
            this.rxLogService.error('rxEditRecordsAction: Record Definition Name is not defined.');
        }
        return EMPTY;
    }
}
RxEditRecordsViewActionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEditRecordsViewActionService, deps: [{ token: i1.RxEditRecordsViewBuilder }, { token: i2.RxEditRecordsDataService }, { token: i3.RxLogService }, { token: i4.RxRecordGridUtilsService }, { token: i5.TranslateService }, { token: i3.RxDefinitionNameService }, { token: i6.RxOpenViewActionService }, { token: i7.RxViewActionUtilsService }], target: i0.ɵɵFactoryTarget.Injectable });
RxEditRecordsViewActionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEditRecordsViewActionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEditRecordsViewActionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxEditRecordsViewBuilder }, { type: i2.RxEditRecordsDataService }, { type: i3.RxLogService }, { type: i4.RxRecordGridUtilsService }, { type: i5.TranslateService }, { type: i3.RxDefinitionNameService }, { type: i6.RxOpenViewActionService }, { type: i7.RxViewActionUtilsService }]; } });
//# sourceMappingURL=edit-records-view-action.service.js.map