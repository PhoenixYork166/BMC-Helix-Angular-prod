import { Component, ViewChild } from '@angular/core';
import { AdaptIconConfig } from '@bmc-ux/adapt-angular';
import { ai_info_circle_o_adapt } from '@bmc-ux/dpl-iconfont';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RecordGridComponent } from '@helix/platform/view/components';
import { assign } from 'lodash';
import moment from 'moment-es6';
import { of } from 'rxjs';
import { RxOutgoingMailboxStatusDataPageService } from './outgoing-mailbox-status-data-page.service';
import { RX_OUTGOING_MAILBOX_STATUS } from './outgoing-mailbox-status.constant';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "./outgoing-mailbox-status-data-page.service";
import * as i2 from "@ngx-translate/core";
import * as i3 from "@bmc-ux/adapt-angular";
import * as i4 from "@helix/platform/shared/components";
import * as i5 from "@helix/platform/view/components";
import * as i6 from "@angular/forms";
export class OutgoingMailboxStatusAdminComponent {
    constructor(rxOutgoingMailboxStatusDataPageService, translateService, iconConfig) {
        this.rxOutgoingMailboxStatusDataPageService = rxOutgoingMailboxStatusDataPageService;
        this.translateService = translateService;
        this.iconConfig = iconConfig;
        this.availableTimeFrames = RX_OUTGOING_MAILBOX_STATUS.availableTimeFrames.map((timeFrame) => (Object.assign(Object.assign({}, timeFrame), { name: this.translateService.instant(timeFrame.name) })));
        this.selectedTimeFrame = [this.availableTimeFrames[0]];
        iconConfig.registerIcons([ai_info_circle_o_adapt]);
    }
    ngOnInit() {
        const gridColumns = [
            {
                index: 0,
                fieldId: RX_OUTGOING_MAILBOX_STATUS.fields.mailboxName,
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.outgoing-mailbox-status.mailbox-name.label')
            },
            {
                index: 1,
                fieldId: RX_OUTGOING_MAILBOX_STATUS.fields.pending,
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.outgoing-mailbox-status.pending.label'),
                filterable: false
            },
            {
                index: 2,
                fieldId: RX_OUTGOING_MAILBOX_STATUS.fields.error,
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.error.label'),
                filterable: false
            },
            {
                index: 3,
                fieldId: RX_OUTGOING_MAILBOX_STATUS.fields.sent,
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.outgoing-mailbox-status.sent.label'),
                filterable: false
            }
        ];
        const recordDefinition = {
            fieldDefinitions: [
                {
                    id: RX_OUTGOING_MAILBOX_STATUS.fields.mailboxName,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_OUTGOING_MAILBOX_STATUS.fields.pending,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_OUTGOING_MAILBOX_STATUS.fields.error,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_OUTGOING_MAILBOX_STATUS.fields.sent,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                }
            ]
        };
        this.recordGridConfig = of({
            columns: gridColumns,
            enableFiltering: true,
            enableRowSelection: null,
            getRecordDefinition: () => of(recordDefinition),
            getData: (queryParams) => {
                assign(queryParams, {
                    messagesBefore: moment().subtract(this.selectedTimeFrame[0].duration).toISOString()
                });
                return this.rxOutgoingMailboxStatusDataPageService.get({ params: queryParams });
            },
            styles: 'flex-fill',
            useExternalFiltering: false
        });
    }
    onTimeFrameChange(timeFrame) {
        this.selectedTimeFrame = timeFrame;
        this.recordGrid.api.refresh().subscribe();
    }
    optionFormatter(timeFrame) {
        return timeFrame.name;
    }
}
OutgoingMailboxStatusAdminComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OutgoingMailboxStatusAdminComponent, deps: [{ token: i1.RxOutgoingMailboxStatusDataPageService }, { token: i2.TranslateService }, { token: i3.AdaptIconConfig }], target: i0.ɵɵFactoryTarget.Component });
OutgoingMailboxStatusAdminComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: OutgoingMailboxStatusAdminComponent, selector: "rx-admin-outgoing-mailbox-status", viewQueries: [{ propertyName: "recordGrid", first: true, predicate: ["recordGrid"], descendants: true }], ngImport: i0, template: "<rx-admin-settings header=\"Outgoing mailbox status\">\n  <div class=\"d-flex flex-wrap\">\n    <adapt-rx-select\n      label=\"{{ 'com.bmc.arsys.rx.client.admin.outgoing-mailbox-status.time-frame.label' | translate }}\"\n      class=\"form-group\"\n      rx-id=\"time-frame\"\n      [options]=\"availableTimeFrames\"\n      [ngModel]=\"selectedTimeFrame\"\n      [optionFormatter]=\"optionFormatter\"\n      (ngModelChange)=\"onTimeFrameChange($event)\"\n    >\n    </adapt-rx-select>\n\n    <button\n      adapt-button\n      btn-type=\"tertiary\"\n      class=\"form-group ml-auto align-self-end\"\n      placement=\"bottom\"\n      type=\"button\"\n      [adaptPopover]=\"'com.bmc.arsys.rx.client.admin.outgoing-mailbox-status.about-sent-email.tooltip' | translate\"\n    >\n      <span>\n        <adapt-icon name=\"info_circle_o_adapt\"></adapt-icon>\n        {{ 'com.bmc.arsys.rx.client.admin.outgoing-mailbox-status.about-sent-email.label' | translate }}\n      </span>\n    </button>\n  </div>\n\n  <rx-record-grid rx-id=\"outgoing-mailbox-status-grid\" #recordGrid [config]=\"recordGridConfig\"></rx-record-grid>\n</rx-admin-settings>\n", styles: ["adapt-rx-select[rx-id=time-frame]{width:150px}\n"], components: [{ type: i4.AdminSettingsComponent, selector: "rx-admin-settings", inputs: ["header", "busy"] }, { type: i3.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i3.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i3.AdaptIconComponent, selector: "adapt-icon", inputs: ["name", "classList", "description", "testID"] }, { type: i5.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }], directives: [{ type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i3.AdaptPopoverDirective, selector: "[adaptPopover]", inputs: ["adaptPopover", "popoverTitle", "placement", "fallbackPlacement", "triggers", "container", "appendToBody", "closeBtn", "popupDelay", "disablePopover", "popoverClass", "autoClose", "closeOnOutOfView", "maxWidth", "minWidth"], outputs: ["shown", "hidden"], exportAs: ["adaptPopover"] }], pipes: { "translate": i2.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OutgoingMailboxStatusAdminComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-admin-outgoing-mailbox-status',
                    templateUrl: './outgoing-mailbox-status.component.html',
                    styleUrls: ['./outgoing-mailbox-status.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.RxOutgoingMailboxStatusDataPageService }, { type: i2.TranslateService }, { type: i3.AdaptIconConfig }]; }, propDecorators: { recordGrid: [{
                type: ViewChild,
                args: ['recordGrid']
            }] } });
//# sourceMappingURL=outgoing-mailbox-status.component.js.map