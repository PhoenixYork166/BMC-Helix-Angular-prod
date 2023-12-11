import { Component, ViewChild } from '@angular/core';
import { RX_ISSUES } from '../application-issues.constant';
import { RecordGridComponent } from '@helix/platform/view/components';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { of } from 'rxjs';
import { AdaptDockedPanelService, DockedPanelContext } from '@bmc-ux/adapt-angular';
import { head, map } from 'lodash';
import { RxCommandFactoryService, RxNotificationService } from '@helix/platform/shared/api';
import { IssueDetailsComponent } from '../issue-details/issue-details.component';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@ngx-translate/core";
import * as i4 from "@bmc-ux/adapt-table";
import * as i5 from "@helix/platform/view/components";
export class CloseDuplicateIssuesComponent {
    constructor(adaptDockedPanelService, dockedPanelContext, rxCommandFactoryService, rxNotificationService, translateService) {
        this.adaptDockedPanelService = adaptDockedPanelService;
        this.dockedPanelContext = dockedPanelContext;
        this.rxCommandFactoryService = rxCommandFactoryService;
        this.rxNotificationService = rxNotificationService;
        this.translateService = translateService;
        this.selectedIssuesGridColumns = [
            {
                field: `${RX_ISSUES.issuesRecordFieldIds.applicationName}`,
                header: this.translateService.instant('com.bmc.arsys.rx.client.admin.application-issues.application-name.title')
            },
            {
                field: `${RX_ISSUES.issuesRecordFieldIds.errorNumber}`,
                header: this.translateService.instant('com.bmc.arsys.rx.client.admin.application-issues.error-number.title')
            },
            {
                field: `${RX_ISSUES.issuesRecordFieldIds.errorMessage}`,
                header: this.translateService.instant('com.bmc.arsys.rx.client.admin.application-issues.error-message.title'),
                sortable: false
            }
        ];
    }
    ngOnInit() {
        this.selectedIssuesData = this.dockedPanelContext.getData();
        this.submittedIssuesGridConfiguration();
    }
    getSubmittedIssuesGridColumns() {
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
                fieldId: `${RX_RECORD_DEFINITION.coreFieldIds.createdDate}`,
                index: 3,
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.application-issues.reported-date.title')
            },
            {
                fieldId: `${RX_ISSUES.issuesRecordFieldIds.caseId}`,
                index: 4,
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.application-issues.case-id.title')
            }
        ];
    }
    submittedIssuesGridConfiguration() {
        this.submittedIssuesGridConfiguration$ = of({
            recordDefinitionName: RX_ISSUES.issuesRecordDefinitionName,
            columns: this.getSubmittedIssuesGridColumns(),
            filterExpression: `'${RX_RECORD_DEFINITION.coreFieldIds.status}' = "${RX_ISSUES.statusOptionValues.submitted}"`,
            styles: 'flex-fill'
        });
    }
    cancel() {
        this.dockedPanelContext.close('');
    }
    closeSelectedIssues() {
        const selection = head(this.submittedIssuesGrid.api.getSelectedRows());
        this.rxCommandFactoryService
            .forResourceType('com.bmc.arsys.rx.application.support.command.UpdateIssuesAsDuplicateCommand')
            .execute({
            recordId: selection[RX_RECORD_DEFINITION.coreFieldIds.id],
            recordIds: map(this.dockedPanelContext.getData(), (record) => record[RX_RECORD_DEFINITION.coreFieldIds.id])
        })
            .subscribe(() => {
            this.rxNotificationService.addSuccessMessage(this.translateService.instant(RX_ISSUES.notificationMessages.duplicateIssuesClosed));
            this.dockedPanelContext.close('close');
        });
    }
    isCloseSelectedIssuesButtonDisabled() {
        return this.submittedIssuesGrid.api.getSelectedRows().length === 0;
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
CloseDuplicateIssuesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CloseDuplicateIssuesComponent, deps: [{ token: i1.AdaptDockedPanelService }, { token: i1.DockedPanelContext }, { token: i2.RxCommandFactoryService }, { token: i2.RxNotificationService }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
CloseDuplicateIssuesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: CloseDuplicateIssuesComponent, selector: "rx-close-duplicate-issues", viewQueries: [{ propertyName: "submittedIssuesGrid", first: true, predicate: ["submittedIssuesGrid"], descendants: true, static: true }], ngImport: i0, template: "<div class=\"dp-body d-flex flex-column\">\n  <div class=\"row\">\n    <div class=\"col-12\">\n      <h5 class=\"mt-0\">\n        {{ 'com.bmc.arsys.rx.client.admin.application-issues.selected-issues.title' | translate }}\n      </h5>\n      <adapt-table\n        rx-id=\"selected-issues-grid\"\n        [columns]=\"selectedIssuesGridColumns\"\n        [bordered]=\"true\"\n        [sortable]=\"true\"\n        [value]=\"selectedIssuesData\"\n      >\n      </adapt-table>\n    </div>\n  </div>\n  <div class=\"row flex-fill\">\n    <div class=\"col-12 d-flex flex-column\">\n      <h5>\n        {{ 'com.bmc.arsys.rx.client.admin.application-issues.duplicates.title' | translate }}\n      </h5>\n      <rx-record-grid\n        class=\"flex-fill\"\n        rx-id=\"submitted-issues-grid\"\n        #submittedIssuesGrid\n        [config]=\"submittedIssuesGridConfiguration$\"\n      ></rx-record-grid>\n    </div>\n  </div>\n</div>\n<div class=\"dp-footer\">\n  <button\n    rx-id=\"close-selected-issues-button\"\n    adapt-button\n    btn-type=\"primary\"\n    class=\"mr-2\"\n    [disabled]=\"isCloseSelectedIssuesButtonDisabled()\"\n    (click)=\"closeSelectedIssues()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.admin.application-issues.close-selected.label' | translate }}\n  </button>\n  <button adapt-button btn-type=\"secondary\" rx-id=\"cancel-button\" class=\"mr-2\" (click)=\"cancel()\">\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", components: [{ type: i4.AdaptTableComponent, selector: "adapt-table", inputs: ["sortable", "filterable", "triggerableFilters", "explicitSearchBtn", "enableReorderableRows", "suppressTooltip", "toolbarConfig", "dataColumnsColsTemplate", "dataColumnsHeaderTemplate", "dataColumnsDataCellsTemplate", "headerGroupsTemplate", "alwaysShowHeaderTooltip", "alwaysShowCellTooltip", "expandedCellClass", "expandedGroupsKeys", "nestedGroupPadding", "expandindCellInitialPadding", "groupValueDataCellTemplate", "tooltipInitialDelayMs", "tooltipClass", "rowsCustomClass", "paginatorAlign", "hasEmptyState", "enableInfiniteScrolling", "updateFirstColumnWidth", "busyConfig", "defaultFiltersMatchMode", "wrapCellText", "minBufferPx", "maxBufferPx", "testID", "headerSelectionMode", "disabledSelectedRowsCount", "disabledNotSelectedRowsCount", "disabledSelectedFilteredRowsCount", "disabledNotSelectedFilteredRowsCount", "selectedFilteredRowsCount", "totalRecordsInGroup", "disableRowSelection", "nestingStructureData", "nestingKey", "enableRowEditing", "autoScrollToTop", "paginationTexts", "toolbarTexts", "tableTexts", "filtersTexts", "headerCellMenuTexts", "texts", "loadingMore", "mergeColumns", "disabledRowSelectionResolver", "allowColumnReorderingResolver", "disableRowExpandingResolver", "rowAriaDataResolver", "tableWidthConfig", "expandedRowTemplate", "isRefreshingRowData", "value", "bordered", "paginator", "striped", "loading"], outputs: ["onLazyLoad", "rowDataRefresh", "savedRowEditing", "canceledRowEditing", "groupSelection", "allGroupedRowsSelection", "groupExpansion", "columnsVisibilityChange", "rowDragStart", "rowDragRelease", "rowDragEnd", "rowDragDrop", "export", "toolbarPopupAnimationDone"] }, { type: i5.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], pipes: { "translate": i3.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CloseDuplicateIssuesComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-close-duplicate-issues',
                    templateUrl: './close-duplicate-issues.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.AdaptDockedPanelService }, { type: i1.DockedPanelContext }, { type: i2.RxCommandFactoryService }, { type: i2.RxNotificationService }, { type: i3.TranslateService }]; }, propDecorators: { submittedIssuesGrid: [{
                type: ViewChild,
                args: ['submittedIssuesGrid', { static: true }]
            }] } });
//# sourceMappingURL=close-duplicate-issues.component.js.map