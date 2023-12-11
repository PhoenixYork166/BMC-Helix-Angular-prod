import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./application-issues.component";
import * as i2 from "./issue-details/issue-details.component";
import * as i3 from "./close-duplicate-issues/close-duplicate-issues.component";
import * as i4 from "./submit-issue-to-support/submit-issue-to-support.component";
import * as i5 from "@bmc-ux/adapt-angular";
import * as i6 from "@bmc-ux/adapt-table";
import * as i7 from "@helix/platform/shared/components";
import * as i8 from "@angular/common";
import * as i9 from "@angular/forms";
import * as i10 from "@helix/platform/view/components";
import * as i11 from "@ngx-translate/core";
export declare class ApplicationIssuesRegistrationModule {
    private componentFactoryResolver;
    private rxViewComponentRegistryService;
    constructor(componentFactoryResolver: ComponentFactoryResolver, rxViewComponentRegistryService: RxViewComponentRegistryService);
    static ɵfac: i0.ɵɵFactoryDeclaration<ApplicationIssuesRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ApplicationIssuesRegistrationModule, [typeof i1.ApplicationIssuesAdminComponent, typeof i2.IssueDetailsComponent, typeof i3.CloseDuplicateIssuesComponent, typeof i4.SubmitIssueToSupportComponent], [typeof i5.AdaptAlertModule, typeof i5.AdaptButtonModule, typeof i5.AdaptRxSelectModule, typeof i5.AdaptRxTextareaModule, typeof i6.AdaptTableModule, typeof i7.AdminSettingsModule, typeof i8.CommonModule, typeof i9.FormsModule, typeof i9.ReactiveFormsModule, typeof i10.RecordGridModule, typeof i11.TranslateModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ApplicationIssuesRegistrationModule>;
}
