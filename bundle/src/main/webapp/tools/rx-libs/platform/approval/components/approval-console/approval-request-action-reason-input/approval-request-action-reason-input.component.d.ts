import { Injector, OnInit } from '@angular/core';
import { IRequestConfig } from '../approval-console.types';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import { RxApprovalConsoleService } from '../approval-console.service';
import { RxNotificationService } from '@helix/platform/shared/api';
import { TranslateService } from '@ngx-translate/core';
import { RxModalClass } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
export declare class ApprovalRequestActionReasonInputComponent extends RxModalClass implements OnInit {
    private activeModalRef;
    private rxNotificationService;
    private translateService;
    private rxApprovalConsoleService;
    protected injector: Injector;
    currentRequestIndex: number;
    shouldApplySameReasonToAll: boolean;
    requests: IRequestConfig[];
    title: any;
    private commandType;
    constructor(activeModalRef: ActiveModalRef, rxNotificationService: RxNotificationService, translateService: TranslateService, rxApprovalConsoleService: RxApprovalConsoleService, injector: Injector);
    isDirty(): boolean;
    ngOnInit(): void;
    isSaveButtonDisabled(): boolean;
    goToPreviousRequest(): void;
    goToNextRequest(): void;
    saveRequests(): void;
    cancel(): void;
    isReasonEmpty(reason: string): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<ApprovalRequestActionReasonInputComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ApprovalRequestActionReasonInputComponent, "rx-approval-request-action-reason-input", never, {}, {}, never, never>;
}
