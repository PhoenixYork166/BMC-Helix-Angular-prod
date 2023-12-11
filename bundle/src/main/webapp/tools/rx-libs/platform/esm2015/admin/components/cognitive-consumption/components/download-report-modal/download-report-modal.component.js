import { Component } from '@angular/core';
import { filter, find, forEach, head, includes, last, map, parseInt, some } from 'lodash';
import { forkJoin } from 'rxjs';
import moment from 'moment-es6';
import { ActiveModalRef, RxDatetimePickerMode } from '@bmc-ux/adapt-angular';
import { RX_COGNITIVE_CONSUMPTION } from '../../cognitive-consumption.constant';
import { RxCognitiveConsumptionService } from '../../cognitive-consumption.service';
import { RX_SIZE_UNITS, RxCsvService, RxFileService, RxUnitService } from '@helix/platform/utils';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "../../cognitive-consumption.service";
import * as i3 from "@helix/platform/utils";
import * as i4 from "@ngx-translate/core";
import * as i5 from "@angular/forms";
import * as i6 from "@angular/common";
export class DownloadReportModalComponent {
    constructor(activeModalRef, rxCognitiveConsumptionService, rxCsvService, rxFileService, rxUnitService, translateService) {
        this.activeModalRef = activeModalRef;
        this.rxCognitiveConsumptionService = rxCognitiveConsumptionService;
        this.rxCsvService = rxCsvService;
        this.rxFileService = rxFileService;
        this.rxUnitService = rxUnitService;
        this.translateService = translateService;
        this.dateTimePickerMode = RxDatetimePickerMode.DateTime;
        this.parameters = {
            startDate: '',
            endDate: '',
            countType: RX_COGNITIVE_CONSUMPTION.settings.countType
        };
        this.periodOptions = [
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-consumption.download-report-modal.last-twelve-months.label'),
                value: '12'
            },
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-consumption.download-report-modal.last-twenty-four-months.label'),
                value: '24'
            },
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-consumption.download-report-modal.last-thirty-six-months.label'),
                value: '36'
            },
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-consumption.download-report-modal.selected-time-period.label'),
                value: 'custom'
            }
        ];
        this.csvData = [['Operation', 'Application', 'Period', 'Count']];
        this.modalData = this.activeModalRef.getData();
    }
    ngOnInit() {
        this.period = head(this.periodOptions).value;
    }
    onDownloadClick() {
        if (this.period === 'custom') {
            this.parameters.endDate = moment(last(this.customRange)).format('YYYY-MM');
            this.parameters.startDate = moment(head(this.customRange)).format('YYYY-MM');
        }
        else {
            this.parameters.endDate = moment().format('YYYY-MM');
            this.parameters.startDate = moment(this.parameters.endDate, 'YYYY-MM')
                .add(-1 * parseInt(this.period, 10), 'months')
                .format('YYYY-MM');
        }
        const sections = filter(RX_COGNITIVE_CONSUMPTION.sections, (section) => includes(this.modalData.sectionIds, section.id));
        const groupIds = [];
        forEach(sections, (section) => {
            forEach(section.groups, (group) => {
                groupIds.push(group.id);
            });
        });
        forkJoin(map(groupIds, (groupId) => {
            return this.rxCognitiveConsumptionService.getCognitiveLicenseUsage(RX_COGNITIVE_CONSUMPTION.settings.licenseType, groupId, this.parameters);
        })).subscribe((licenseUsages) => {
            forEach(licenseUsages, (licenseUsage) => {
                const currentSection = find(sections, (section) => some(section.groups, ['id', licenseUsage.operation]));
                const group = find(currentSection.groups, ['id', licenseUsage.operation]);
                forEach(licenseUsage.licenseUsageCount, (licenseUsageCount) => {
                    forEach(licenseUsageCount.count, (value, period) => {
                        this.csvData.push([
                            `${this.translateService.instant(currentSection.title)} - ${this.translateService.instant(head(group.charts).title)}`,
                            licenseUsageCount.bundleId,
                            period,
                            group.unit === RX_SIZE_UNITS.gigabytes.unit ? this.rxUnitService.getValueWithUnits(value) : value
                        ]);
                    });
                });
            });
            const csv = this.rxCsvService.convertToCsv(this.csvData);
            this.rxFileService.createAndDownloadBlob(csv, 'text/csv;charset=utf-8;', 'report', 'csv');
            this.activeModalRef.close();
        });
    }
    onCancelClick() {
        this.activeModalRef.dismiss();
    }
}
DownloadReportModalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DownloadReportModalComponent, deps: [{ token: i1.ActiveModalRef }, { token: i2.RxCognitiveConsumptionService }, { token: i3.RxCsvService }, { token: i3.RxFileService }, { token: i3.RxUnitService }, { token: i4.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
DownloadReportModalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DownloadReportModalComponent, selector: "rx-download-report-modal", ngImport: i0, template: "<div class=\"modal-body\">\n  <form>\n    <adapt-rx-radiobutton-group name=\"period\" [(ngModel)]=\"period\">\n      <adapt-rx-radiobutton\n        *ngFor=\"let option of periodOptions\"\n        [label]=\"option.label | translate\"\n        [value]=\"option.value\"\n      ></adapt-rx-radiobutton>\n    </adapt-rx-radiobutton-group>\n\n    <adapt-rx-datetime-range\n      name=\"customDatetimeRange\"\n      label=\" {{\n        'com.bmc.arsys.rx.client.admin.cognitive-consumption.download-report-modal.select-range.label' | translate\n      }}\"\n      [mode]=\"dateTimePickerMode\"\n      [disabled]=\"period !== 'custom'\"\n      [(ngModel)]=\"customRange\"\n    ></adapt-rx-datetime-range>\n  </form>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    rx-id=\"download-button\"\n    adapt-button\n    btn-type=\"primary\"\n    type=\"button\"\n    (click)=\"onDownloadClick()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.download.label' | translate }}\n  </button>\n\n  <button rx-id=\"cancel-button\" adapt-button btn-type=\"secondary\" type=\"button\" (click)=\"onCancelClick()\">\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", components: [{ type: i1.AdaptRxRadiobuttonGroupComponent, selector: "adapt-rx-radiobutton-group", inputs: ["formControlName"] }, { type: i1.AdaptRxRadiobuttonComponent, selector: "adapt-rx-radiobutton", inputs: ["name", "label", "id", "value", "checked", "disabled", "ariaLabel", "ariaLabeledBy", "ariaDescribedBy", "testID", "tabIndex"], outputs: ["onFocus", "onBlur", "checkedChange"] }, { type: i1.AdaptRxDatetimeRangeComponent, selector: "adapt-rx-datetime-range", inputs: ["placeholder", "inline", "placement", "appendToBody", "inlineLight", "inlineCompact", "dayFilter", "disableWizard", "mode", "hasSeconds", "use12HoursTime", "firstDayOfWeek", "initialDatetime", "defaultDatetime", "disabledStyleForReadonlyState", "popupClass", "texts", "inputFormat"], outputs: ["onPopupOpenChange", "onDatetimeChange"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i5.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i5.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i5.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i6.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "translate": i4.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DownloadReportModalComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-download-report-modal',
                    templateUrl: './download-report-modal.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveModalRef }, { type: i2.RxCognitiveConsumptionService }, { type: i3.RxCsvService }, { type: i3.RxFileService }, { type: i3.RxUnitService }, { type: i4.TranslateService }]; } });
//# sourceMappingURL=download-report-modal.component.js.map