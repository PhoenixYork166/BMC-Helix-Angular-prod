import { Injector } from '@angular/core';
import { IRxSelectWithPaginationOption } from '@helix/platform/shared/components';
import { RxApprovalConsoleService } from '../approval-console.service';
import { ActiveModalRef, FileObj } from '@bmc-ux/adapt-angular';
import { TranslateService } from '@ngx-translate/core';
import { RxNotificationService } from '@helix/platform/shared/api';
import { RxModalClass } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
export declare class ApprovalRequestQuestionComponent extends RxModalClass {
    private rxApprovalConsoleService;
    private rxNotificationService;
    private translateService;
    private activeModalRef;
    protected injector: Injector;
    selectedUser: IRxSelectWithPaginationOption[];
    userLoaderFunc: any;
    question: string;
    attachment: FileObj[];
    constructor(rxApprovalConsoleService: RxApprovalConsoleService, rxNotificationService: RxNotificationService, translateService: TranslateService, activeModalRef: ActiveModalRef, injector: Injector);
    isDirty(): boolean;
    saveQuestion(): void;
    cancel(): void;
    private getApprovalUsers;
    optionFormatter(option: IRxSelectWithPaginationOption): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ApprovalRequestQuestionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ApprovalRequestQuestionComponent, "rx-approval-request-question", never, {}, {}, never, never>;
}
