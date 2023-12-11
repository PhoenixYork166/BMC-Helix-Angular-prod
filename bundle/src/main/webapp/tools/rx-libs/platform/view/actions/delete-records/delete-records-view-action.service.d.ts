import { TranslateService } from '@ngx-translate/core';
import { RxModalService } from '@helix/platform/ui-kit';
import { IViewActionService, RxViewActionUtilsService } from '@helix/platform/view/api';
import { RxRecordInstanceService } from '@helix/platform/record/api';
import { RxLogService, RxNotificationService } from '@helix/platform/shared/api';
import { Observable } from 'rxjs';
import { IDeleteRecordsViewActionParams } from './delete-records-view-action-params.interface';
import { RxStringService } from '@helix/platform/utils';
import * as i0 from "@angular/core";
export declare class RxDeleteRecordsViewActionService implements IViewActionService<IDeleteRecordsViewActionParams, never> {
    private rxLogService;
    private rxModalService;
    private translateService;
    private rxNotificationService;
    private rxRecordInstanceService;
    private rxViewActionUtilsService;
    private rxStringService;
    constructor(rxLogService: RxLogService, rxModalService: RxModalService, translateService: TranslateService, rxNotificationService: RxNotificationService, rxRecordInstanceService: RxRecordInstanceService, rxViewActionUtilsService: RxViewActionUtilsService, rxStringService: RxStringService);
    execute(params: IDeleteRecordsViewActionParams): Observable<never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxDeleteRecordsViewActionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxDeleteRecordsViewActionService>;
}
