import { Injector } from '@angular/core';
import { IRxSelectWithPaginationOption } from '@helix/platform/shared/components';
import { RxNotificationService } from '@helix/platform/shared/api';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import { RxApprovalConsoleService } from '../approval-console.service';
import { TranslateService } from '@ngx-translate/core';
import { RxModalClass } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
export declare class ApprovalRequestReassignComponent extends RxModalClass {
    private translateService;
    private rxNotificationService;
    private activeModalRef;
    private rxApprovalConsoleService;
    protected injector: Injector;
    selectedUser: IRxSelectWithPaginationOption[];
    userLoaderFunc: any;
    constructor(translateService: TranslateService, rxNotificationService: RxNotificationService, activeModalRef: ActiveModalRef, rxApprovalConsoleService: RxApprovalConsoleService, injector: Injector);
    isDirty(): boolean;
    reassign(): void;
    cancel(): void;
    private getApprovalUsers;
    optionFormatter(option: IRxSelectWithPaginationOption): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ApprovalRequestReassignComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ApprovalRequestReassignComponent, "rx-approval-request-reassign", never, {}, {}, never, never>;
}
