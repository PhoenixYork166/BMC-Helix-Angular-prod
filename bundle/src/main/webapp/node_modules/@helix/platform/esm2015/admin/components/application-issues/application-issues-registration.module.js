import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { ApplicationIssuesAdminComponent } from './application-issues.component';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { CommonModule } from '@angular/common';
import { RecordGridModule } from '@helix/platform/view/components';
import { IssueDetailsComponent } from './issue-details/issue-details.component';
import { CloseDuplicateIssuesComponent } from './close-duplicate-issues/close-duplicate-issues.component';
import { SubmitIssueToSupportComponent } from './submit-issue-to-support/submit-issue-to-support.component';
import { AdaptRxTextareaModule, AdaptRxSelectModule, AdaptButtonModule, AdaptAlertModule } from '@bmc-ux/adapt-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdaptTableModule } from '@bmc-ux/adapt-table';
import { AdminSettingsModule } from '@helix/platform/shared/components';
import { TranslateModule } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
import * as i2 from "@bmc-ux/adapt-angular";
export class ApplicationIssuesRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: 'rx-admin-application-issues',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(ApplicationIssuesAdminComponent),
            name: 'Application issues',
            isPageComponent: true,
            availableInBundles: [RX_APPLICATION.settingsBundleId]
        });
    }
}
ApplicationIssuesRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApplicationIssuesRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
ApplicationIssuesRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApplicationIssuesRegistrationModule, declarations: [ApplicationIssuesAdminComponent,
        IssueDetailsComponent,
        CloseDuplicateIssuesComponent,
        SubmitIssueToSupportComponent], imports: [i2.AdaptAlertModule, AdaptButtonModule,
        AdaptRxSelectModule,
        AdaptRxTextareaModule,
        AdaptTableModule,
        AdminSettingsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RecordGridModule,
        TranslateModule] });
ApplicationIssuesRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApplicationIssuesRegistrationModule, imports: [[
            AdaptAlertModule.forRoot(),
            AdaptButtonModule,
            AdaptRxSelectModule,
            AdaptRxTextareaModule,
            AdaptTableModule,
            AdminSettingsModule,
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            RecordGridModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApplicationIssuesRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        ApplicationIssuesAdminComponent,
                        IssueDetailsComponent,
                        CloseDuplicateIssuesComponent,
                        SubmitIssueToSupportComponent
                    ],
                    imports: [
                        AdaptAlertModule.forRoot(),
                        AdaptButtonModule,
                        AdaptRxSelectModule,
                        AdaptRxTextareaModule,
                        AdaptTableModule,
                        AdminSettingsModule,
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        RecordGridModule,
                        TranslateModule
                    ],
                    entryComponents: [
                        ApplicationIssuesAdminComponent,
                        IssueDetailsComponent,
                        CloseDuplicateIssuesComponent,
                        SubmitIssueToSupportComponent
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=application-issues-registration.module.js.map