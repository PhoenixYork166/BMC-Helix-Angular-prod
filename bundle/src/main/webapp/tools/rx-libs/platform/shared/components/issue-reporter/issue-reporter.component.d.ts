import { Injector, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import { RxIssueReporterService } from './issue-reporter.service';
import { IServerResponseMessage, RxNotificationService } from '@helix/platform/shared/api';
import { TranslateService } from '@ngx-translate/core';
import { RxModalClass } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
export declare class RxIssueReporterComponent extends RxModalClass implements OnDestroy {
    private activeModalRef;
    private formBuilder;
    private rxIssueReporterService;
    private rxNotificationService;
    private translateService;
    protected injector: Injector;
    private destroyed$;
    data: IServerResponseMessage;
    reportForm: FormGroup;
    constructor(activeModalRef: ActiveModalRef, formBuilder: FormBuilder, rxIssueReporterService: RxIssueReporterService, rxNotificationService: RxNotificationService, translateService: TranslateService, injector: Injector);
    isDirty(): boolean;
    reportIssue(): void;
    private initForm;
    cancel(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxIssueReporterComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxIssueReporterComponent, "rx-issue-reporter", never, {}, {}, never, never>;
}
