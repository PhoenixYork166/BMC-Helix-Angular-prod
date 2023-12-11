import { RxNotificationService } from '@helix/platform/shared/api';
import { TranslateService } from '@ngx-translate/core';
import { RxModalService } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
import * as i1 from "./issue-reporter.component";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
import * as i5 from "@helix/platform/shared/api";
import * as i6 from "@ngx-translate/core";
export declare class RxIssueReporterModule {
    private rxNotificationService;
    private rxModalService;
    private translateService;
    constructor(rxNotificationService: RxNotificationService, rxModalService: RxModalService, translateService: TranslateService);
    private showModal;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxIssueReporterModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<RxIssueReporterModule, [typeof i1.RxIssueReporterComponent], [typeof i2.AdaptButtonModule, typeof i2.AdaptRxTextareaModule, typeof i3.CommonModule, typeof i4.FormsModule, typeof i4.ReactiveFormsModule, typeof i5.RxNotificationModule, typeof i6.TranslateModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<RxIssueReporterModule>;
}
