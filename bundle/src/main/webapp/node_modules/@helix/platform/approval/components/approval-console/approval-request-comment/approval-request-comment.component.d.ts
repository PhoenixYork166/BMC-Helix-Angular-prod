import { Injector } from '@angular/core';
import { ActiveModalRef, FileObj } from '@bmc-ux/adapt-angular';
import { RxApprovalConsoleService } from '../approval-console.service';
import { RxNotificationService } from '@helix/platform/shared/api';
import { TranslateService } from '@ngx-translate/core';
import { RxModalClass } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
export declare class ApprovalRequestCommentComponent extends RxModalClass {
    private activeModalRef;
    private translateService;
    private rxNotificationService;
    private rxApprovalConsoleService;
    protected injector: Injector;
    comment: string;
    attachment: FileObj[];
    constructor(activeModalRef: ActiveModalRef, translateService: TranslateService, rxNotificationService: RxNotificationService, rxApprovalConsoleService: RxApprovalConsoleService, injector: Injector);
    isDirty(): boolean;
    saveComment(): void;
    cancel(): void;
    isCommentEmpty(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<ApprovalRequestCommentComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ApprovalRequestCommentComponent, "rx-approval-request-comment", never, {}, {}, never, never>;
}
