import { RxDefinitionNameService, RxLogService } from '@helix/platform/shared/api';
import { IViewActionService, RxViewActionUtilsService } from '@helix/platform/view/api';
import { RxRecordGridUtilsService } from '@helix/platform/view/components';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { RxOpenViewActionService } from '../../open-view/open-view-action.service';
import { IEditRecordsViewActionParams } from '../interfaces/edit-records-view-action-params.interface';
import { RxEditRecordsDataService } from './edit-records-data.service';
import { RxEditRecordsViewBuilder } from './edit-records-view-builder.service';
import * as i0 from "@angular/core";
export declare class RxEditRecordsViewActionService implements IViewActionService<IEditRecordsViewActionParams, never> {
    private rxEditRecordsViewBuilder;
    private rxEditRecordsDataService;
    private rxLogService;
    private rxRecordGridUtilsService;
    private translateService;
    private rxDefinitionNameService;
    private openViewAction;
    private rxViewActionUtilsService;
    constructor(rxEditRecordsViewBuilder: RxEditRecordsViewBuilder, rxEditRecordsDataService: RxEditRecordsDataService, rxLogService: RxLogService, rxRecordGridUtilsService: RxRecordGridUtilsService, translateService: TranslateService, rxDefinitionNameService: RxDefinitionNameService, openViewAction: RxOpenViewActionService, rxViewActionUtilsService: RxViewActionUtilsService);
    execute(params: IEditRecordsViewActionParams): Observable<never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxEditRecordsViewActionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxEditRecordsViewActionService>;
}
