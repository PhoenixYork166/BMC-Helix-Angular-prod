import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdaptButtonModule, AdaptModalService, AdaptRxTextareaModule } from '@bmc-ux/adapt-angular';
import { RxNotificationModule, RxNotificationService } from '@helix/platform/shared/api';
import { RxIssueReporterComponent } from './issue-reporter.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RxIssueReporterService } from './issue-reporter.service';
import { noop } from 'lodash';
import { RxModalService } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@helix/platform/ui-kit";
import * as i3 from "@ngx-translate/core";
export class RxIssueReporterModule {
    constructor(rxNotificationService, rxModalService, translateService) {
        this.rxNotificationService = rxNotificationService;
        this.rxModalService = rxModalService;
        this.translateService = translateService;
        this.rxNotificationService.issuesToReport$.subscribe((issue) => {
            this.showModal(issue);
        });
    }
    showModal(issue) {
        this.rxModalService
            .openModal({
            title: this.translateService.instant('com.bmc.arsys.rx.client.issue-reporter.report-issue.label'),
            data: issue,
            size: 'sm',
            content: RxIssueReporterComponent
        })
            .catch(noop);
    }
}
RxIssueReporterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIssueReporterModule, deps: [{ token: i1.RxNotificationService }, { token: i2.RxModalService }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.NgModule });
RxIssueReporterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIssueReporterModule, declarations: [RxIssueReporterComponent], imports: [AdaptButtonModule,
        AdaptRxTextareaModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RxNotificationModule,
        TranslateModule] });
RxIssueReporterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIssueReporterModule, providers: [AdaptModalService, RxIssueReporterService], imports: [[
            AdaptButtonModule,
            AdaptRxTextareaModule,
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            RxNotificationModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIssueReporterModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AdaptButtonModule,
                        AdaptRxTextareaModule,
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        RxNotificationModule,
                        TranslateModule
                    ],
                    declarations: [RxIssueReporterComponent],
                    entryComponents: [RxIssueReporterComponent],
                    providers: [AdaptModalService, RxIssueReporterService]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxNotificationService }, { type: i2.RxModalService }, { type: i3.TranslateService }]; } });
//# sourceMappingURL=issue-reporter.module.js.map