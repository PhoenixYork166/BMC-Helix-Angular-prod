import { OnChanges, SimpleChanges } from '@angular/core';
import { ApprovalGridType, IApprovalRequest } from '../approval-console.types';
import { Observable, Subscription } from 'rxjs';
import { IValueWithLabel } from '@helix/platform/utils';
import { RxApprovalConsoleService } from '../approval-console.service';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { RxDefinitionNameService } from '@helix/platform/shared/api';
import { RxApprovalConsoleHelperService } from '../approval-console-helper.service';
import * as i0 from "@angular/core";
export declare class ApprovalRequestGeneralDetailsComponent implements OnChanges {
    private rxApprovalConsoleHelperService;
    private rxDefinitionNameService;
    private datePipe;
    private translateService;
    private rxApprovalConsoleService;
    approvalRequest: IApprovalRequest;
    gridType: ApprovalGridType;
    private approvalRequest$;
    readonly statuses: any;
    busy: Subscription;
    allRequestFields$: Observable<IValueWithLabel[]>;
    constructor(rxApprovalConsoleHelperService: RxApprovalConsoleHelperService, rxDefinitionNameService: RxDefinitionNameService, datePipe: DatePipe, translateService: TranslateService, rxApprovalConsoleService: RxApprovalConsoleService);
    ngOnChanges(changes: SimpleChanges): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ApprovalRequestGeneralDetailsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ApprovalRequestGeneralDetailsComponent, "rx-approval-request-general-details", never, { "approvalRequest": "approvalRequest"; "gridType": "gridType"; }, {}, never, never>;
}
