import { Component, ViewChild } from '@angular/core';
import { AdaptDockedPanelService } from '@bmc-ux/adapt-angular';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RxCommandFactoryService, RxCurrentUserService, RxNotificationService } from '@helix/platform/shared/api';
import { RxModalService } from '@helix/platform/ui-kit';
import { RxDeleteRecordsViewActionService } from '@helix/platform/view/actions';
import { RecordGridComponent } from '@helix/platform/view/components';
import { TranslateService } from '@ngx-translate/core';
import { map, noop, some } from 'lodash';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { RX_ISSUES } from './application-issues.constant';
import { RxApplicationIssuesService } from './application-issues.service';
import { CloseDuplicateIssuesComponent } from './close-duplicate-issues/close-duplicate-issues.component';
import { IssueDetailsComponent } from './issue-details/issue-details.component';
import { SubmitIssueToSupportComponent } from './submit-issue-to-support/submit-issue-to-support.component';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "./application-issues.service";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "@helix/platform/view/actions";
import * as i5 from "@ngx-translate/core";
import * as i6 from "@helix/platform/ui-kit";
import * as i7 from "@helix/platform/shared/components";
import * as i8 from "@helix/platform/view/components";
import * as i9 from "@angular/common";
export class ApplicationIssuesAdminComponent {
    constructor(adaptDockedPanelService, rxApplicationIssuesService, rxCommandFactoryService, rxCurrentUserService, rxDeleteRecordsViewActionService, translateService, rxNotificationService, rxModalService) {
        this.adaptDockedPanelService = adaptDockedPanelService;
        this.rxApplicationIssuesService = rxApplicationIssuesService;
        this.rxCommandFactoryService = rxCommandFactoryService;
        this.rxCurrentUserService = rxCurrentUserService;
        this.rxDeleteRecordsViewActionService = rxDeleteRecordsViewActionService;
        this.translateService = translateService;
        this.rxNotificationService = rxNotificationService;
        this.rxModalService = rxModalService;
        this.isAdministrator = this.rxCurrentUserService.isAdministrator();
        this.issuesRecordGridConfiguration$ = new Observable((observer) => {
            if (this.isAdministrator) {
                observer.next({
                    recordDefinitionName: RX_ISSUES.issuesRecordDefinitionName,
                    columns: this.getIssueColumns(),
                    actionButtons: this.getActionButtons(),
                    styles: 'flex-fill'
                });
            }
            observer.complete();
        });
    }
    ngOnInit() {
        this.rxApplicationIssuesService.getIssuesResource().subscribe((issues) => {
            const { issueReportingInfo, errorReportingValue } = issues;
            this.issueReportingInfo = issueReportingInfo;
            this.supportCentralUrl = errorReportingValue.supportCentralUrl;
        });
    }
    getIssueColumns() {
        return [
            {
                fieldId: `${RX_ISSUES.issuesRecordFieldIds.applicationName}`,
                index: 0,
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.application-issues.application-name.title')
            },
            {
                fieldId: `${RX_ISSUES.issuesRecordFieldIds.errorNumber}`,
                index: 1,
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.application-issues.error-number.title'),
                clickable: true,
                actions: [
                    {
                        name: (previousActionResult, lastActionRow) => this.showIssueDetails(lastActionRow)
                    }
                ]
            },
            {
                fieldId: `${RX_ISSUES.issuesRecordFieldIds.errorMessage}`,
                index: 2,
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.application-issues.error-message.title')
            },
            {
                fieldId: `${RX_RECORD_DEFINITION.coreFieldIds.createdBy}`,
                index: 3,
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.application-issues.reported-by.title')
            },
            {
                fieldId: `${RX_RECORD_DEFINITION.coreFieldIds.createdDate}`,
                index: 4,
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.application-issues.reported-date.title')
            },
            {
                fieldId: `${RX_RECORD_DEFINITION.coreFieldIds.status}`,
                index: 5,
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.application-issues.issue-status.title')
            },
            {
                fieldId: `${RX_ISSUES.issuesRecordFieldIds.caseId}`,
                index: 6,
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.application-issues.case-id.title')
            },
            {
                fieldId: `${RX_ISSUES.issuesRecordFieldIds.caseStatus}`,
                index: 7,
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.application-issues.case-status.title')
            },
            {
                fieldId: `${RX_ISSUES.issuesRecordFieldIds.caseStatusRefreshDate}`,
                index: 8,
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.application-issues.case-status-refreshed-date.title')
            },
            {
                fieldId: `${RX_RECORD_DEFINITION.coreFieldIds.displayId}`,
                index: 9,
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.id.label'),
                visible: false
            },
            {
                fieldId: `${RX_RECORD_DEFINITION.coreFieldIds.id}`,
                index: 10,
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.guid.label'),
                visible: false
            },
            {
                fieldId: `${RX_ISSUES.issuesRecordFieldIds.userDescription}`,
                index: 11,
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.application-issues.user-description.title'),
                visible: false
            },
            {
                fieldId: `${RX_ISSUES.issuesRecordFieldIds.operationId}`,
                index: 12,
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.application-issues.operation-id.title'),
                visible: false
            },
            {
                fieldId: `${RX_ISSUES.issuesRecordFieldIds.relatedRecordGuid}`,
                index: 13,
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.application-issues.related-issue-guid.title'),
                visible: false
            }
        ];
    }
    getActionButtons() {
        return [
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.admin.application-issues.view-details.label'),
                style: 'tertiary',
                disabled: () => {
                    return this.issuesRecordGrid.api.getSelectedRowCount() !== 1;
                },
                iconCls: 'search_plus',
                actions: [
                    {
                        name: () => {
                            this.showIssueDetails(this.issuesRecordGrid.api.getFirstSelectedRow());
                        }
                    }
                ]
            },
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.admin.application-issues.search-knowledge-articles.label'),
                style: 'tertiary',
                disabled: () => {
                    return (!this.supportCentralUrl ||
                        this.issuesRecordGrid.api.getSelectedRowCount() !== 1 ||
                        this.issuesRecordGrid.api.getSelectedRows()[0][RX_RECORD_DEFINITION.coreFieldIds.status] !==
                            RX_ISSUES.statusOptionValues.new);
                },
                iconCls: 'search',
                actions: [
                    {
                        name: () => {
                            const selectedRow = this.issuesRecordGrid.api.getSelectedRows();
                            const errorMessage = selectedRow[0][RX_ISSUES.issuesRecordFieldIds.errorMessage];
                            const errorNumber = selectedRow[0][RX_ISSUES.issuesRecordFieldIds.errorNumber];
                            const applicationName = selectedRow[0][RX_ISSUES.issuesRecordFieldIds.applicationName];
                            const searchQuery = `?fromproduct=helixplatform#q=${errorMessage}%20OR%20${errorNumber}&t=All&sort=relevancy&f:@bmcproductname=[${applicationName}]`;
                            window.open(this.supportCentralUrl + searchQuery);
                        }
                    }
                ]
            },
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.admin.application-issues.submit-to-bmc.label'),
                style: 'tertiary',
                iconCls: 'file_arrow_right',
                disabled: () => {
                    return (!this.issueReportingInfo.configured ||
                        some(this.issuesRecordGrid.api.getSelectedRows(), (record) => {
                            return record[RX_RECORD_DEFINITION.coreFieldIds.status] !== RX_ISSUES.statusOptionValues.new;
                        }));
                },
                actions: [
                    {
                        name: () => {
                            this.rxModalService
                                .openModal({
                                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.application-issues.submit-to-support.title'),
                                content: SubmitIssueToSupportComponent,
                                size: 'default',
                                data: {
                                    issues: this.issuesRecordGrid.api.getSelectedRows()
                                }
                            })
                                .then((result) => {
                                if (result) {
                                    this.issuesRecordGrid.api.refresh().subscribe();
                                }
                            })
                                .catch(noop);
                        }
                    }
                ]
            },
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.admin.application-issues.refresh-case-status.label'),
                style: 'tertiary',
                iconCls: 'refresh',
                disabled: () => {
                    return (!this.issueReportingInfo.configured ||
                        some(this.issuesRecordGrid.api.getSelectedRows(), (record) => {
                            return !record[RX_ISSUES.issuesRecordFieldIds.caseId];
                        }));
                },
                actions: [
                    {
                        name: () => {
                            const selection = this.issuesRecordGrid.api.getSelectedRows();
                            this.rxCommandFactoryService
                                .forResourceType('com.bmc.arsys.rx.application.support.command.UpdateSupportCaseStatusCommand')
                                .execute({ recordIds: map(selection, RX_RECORD_DEFINITION.coreFieldIds.id) })
                                .pipe(catchError((error) => {
                                if (error.error[0].messageNumber === RX_ISSUES.linkExpiredError.code) {
                                    this.rxNotificationService.addErrorMessage(this.translateService.instant(RX_ISSUES.linkExpiredError.message));
                                }
                                return throwError(error);
                            }), tap(() => this.issuesRecordGrid.api.refresh().subscribe()))
                                .subscribe(() => {
                                this.rxNotificationService.addSuccessMessage(this.translateService.instant(RX_ISSUES.notificationMessages.caseStatusRefreshed));
                            });
                        }
                    }
                ]
            },
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.admin.application-issues.close-as-duplicates.label'),
                style: 'tertiary',
                iconCls: 'cross_adapt',
                disabled: () => {
                    return some(this.issuesRecordGrid.api.getSelectedRows(), (record) => {
                        return record[RX_RECORD_DEFINITION.coreFieldIds.status] !== RX_ISSUES.statusOptionValues.new;
                    });
                },
                actions: [
                    {
                        name: () => {
                            this.adaptDockedPanelService
                                .open({
                                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.application-issues.close-duplicate-issues.title'),
                                content: CloseDuplicateIssuesComponent,
                                data: this.issuesRecordGrid.api.getSelectedRows(),
                                size: 'lg'
                            })
                                .then((result) => {
                                if (result) {
                                    this.issuesRecordGrid.api.refresh().subscribe();
                                }
                            }, () => { });
                        }
                    }
                ]
            },
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.delete.label'),
                style: 'tertiary',
                iconCls: 'trash',
                disabled: () => {
                    return some(this.issuesRecordGrid.api.getSelectedRows(), (record) => {
                        return record[RX_RECORD_DEFINITION.coreFieldIds.status] === RX_ISSUES.statusOptionValues.submitted;
                    });
                },
                actions: [
                    {
                        name: () => {
                            this.rxDeleteRecordsViewActionService
                                .execute({
                                recordDefinitionName: RX_ISSUES.issuesRecordDefinitionName,
                                records: this.issuesRecordGrid.api
                            })
                                .subscribe();
                        }
                    }
                ]
            }
        ];
    }
    showIssueDetails(rowData) {
        this.adaptDockedPanelService.open({
            title: this.translateService.instant('com.bmc.arsys.rx.client.admin.application-issues.issue-details.title'),
            content: IssueDetailsComponent,
            size: 'lg',
            data: rowData
        });
    }
}
ApplicationIssuesAdminComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApplicationIssuesAdminComponent, deps: [{ token: i1.AdaptDockedPanelService }, { token: i2.RxApplicationIssuesService }, { token: i3.RxCommandFactoryService }, { token: i3.RxCurrentUserService }, { token: i4.RxDeleteRecordsViewActionService }, { token: i5.TranslateService }, { token: i3.RxNotificationService }, { token: i6.RxModalService }], target: i0.ɵɵFactoryTarget.Component });
ApplicationIssuesAdminComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ApplicationIssuesAdminComponent, selector: "rx-admin-application-issues", viewQueries: [{ propertyName: "issuesRecordGrid", first: true, predicate: ["issuesRecordGrid"], descendants: true }], ngImport: i0, template: "<rx-admin-settings\n  *ngIf=\"isAdministrator\"\n  header=\"{{ 'com.bmc.arsys.rx.client.admin.application-issues.header.title' | translate }}\"\n>\n  <rx-record-grid rx-id=\"issues-grid\" #issuesRecordGrid [config]=\"issuesRecordGridConfiguration$\"></rx-record-grid>\n</rx-admin-settings>\n\n<adapt-alert\n  *ngIf=\"!isAdministrator\"\n  class=\"p-4\"\n  [config]=\"{\n    title: 'com.bmc.arsys.rx.client.admin.access-denied.title' | translate,\n    content: 'com.bmc.arsys.rx.client.admin.access-denied.message' | translate,\n    variant: 'danger'\n  }\"\n></adapt-alert>\n", styles: [".icon-size{font-size:20px}\n"], components: [{ type: i7.AdminSettingsComponent, selector: "rx-admin-settings", inputs: ["header", "busy"] }, { type: i8.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }, { type: i1.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }], directives: [{ type: i9.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i5.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApplicationIssuesAdminComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-admin-application-issues',
                    templateUrl: './application-issues.component.html',
                    styleUrls: ['./application-issues.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.AdaptDockedPanelService }, { type: i2.RxApplicationIssuesService }, { type: i3.RxCommandFactoryService }, { type: i3.RxCurrentUserService }, { type: i4.RxDeleteRecordsViewActionService }, { type: i5.TranslateService }, { type: i3.RxNotificationService }, { type: i6.RxModalService }]; }, propDecorators: { issuesRecordGrid: [{
                type: ViewChild,
                args: ['issuesRecordGrid']
            }] } });
//# sourceMappingURL=application-issues.component.js.map