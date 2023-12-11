import { Component, QueryList, ViewChildren } from '@angular/core';
import { filter, find, includes, noop } from 'lodash';
import { AdaptModalService } from '@bmc-ux/adapt-angular';
import { RxCurrentUserService, RxLicenseDataPageService } from '@helix/platform/shared/api';
import { RX_COGNITIVE_CONSUMPTION } from './cognitive-consumption.constant';
import { ChartGroup } from './cognitive-consumption.types';
import { DownloadReportModalComponent } from './components/download-report-modal/download-report-modal.component';
import { CognitiveConsumptionGroupComponent } from './components/cognitive-consumption-group/cognitive-consumption-group.component';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@ngx-translate/core";
import * as i4 from "@helix/platform/shared/components";
import * as i5 from "./components/cognitive-consumption-group/cognitive-consumption-group.component";
import * as i6 from "@angular/common";
export class CognitiveConsumptionAdminComponent {
    constructor(adaptModalService, rxLicenseDataPageService, rxCurrentUserService, translateService) {
        this.adaptModalService = adaptModalService;
        this.rxLicenseDataPageService = rxLicenseDataPageService;
        this.rxCurrentUserService = rxCurrentUserService;
        this.translateService = translateService;
    }
    ngOnInit() {
        this.isAdministrator = this.rxCurrentUserService.isAdministrator();
        this.busy = this.rxLicenseDataPageService
            .get({
            params: {
                startIndex: -1,
                pageSize: 0,
                propertySelection: ['name', 'serviceLicensedCount'].join(',')
            }
        })
            .subscribe((result) => {
            const isHelixCognitiveChatbotPerUserLicensed = find(result.data[0].serviceLicenseDescriptors, [
                'name',
                'HelixCognitiveChatbotPerUser'
            ]).licensed;
            this.sectionIds = [
                isHelixCognitiveChatbotPerUserLicensed ? ChartGroup.ChatByUser : ChartGroup.Chat,
                ChartGroup.Classify,
                ChartGroup.Search
            ];
            this.sections = filter(RX_COGNITIVE_CONSUMPTION.sections, (section) => includes(this.sectionIds, section.id));
        });
    }
    onDownloadClick() {
        this.adaptModalService
            .open({
            title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-consumption.download-csv-file.title'),
            type: 'default',
            size: 'sm',
            content: DownloadReportModalComponent,
            data: {
                sectionIds: this.sectionIds
            }
        })
            .catch(noop);
    }
    onRefreshClick() {
        this.cognitiveConsumptionGroups.forEach((cognitiveConsumptionGroup) => {
            cognitiveConsumptionGroup.generateCognitiveConsumptionGroup();
        });
    }
}
CognitiveConsumptionAdminComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CognitiveConsumptionAdminComponent, deps: [{ token: i1.AdaptModalService }, { token: i2.RxLicenseDataPageService }, { token: i2.RxCurrentUserService }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
CognitiveConsumptionAdminComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: CognitiveConsumptionAdminComponent, selector: "rx-admin-cognitive-consumption", viewQueries: [{ propertyName: "cognitiveConsumptionGroups", predicate: CognitiveConsumptionGroupComponent, descendants: true }], ngImport: i0, template: "<rx-admin-settings\n  header=\"{{ 'com.bmc.arsys.rx.client.admin.cognitive-consumption.header.title' | translate }}\"\n  [busy]=\"busy\"\n>\n  <div class=\"mb-4\">\n    <button\n      class=\"d-icon-refresh_adapt\"\n      adapt-button\n      btn-type=\"tertiary\"\n      type=\"button\"\n      rx-id=\"refresh-button\"\n      (click)=\"onRefreshClick()\"\n    >\n      {{ 'com.bmc.arsys.rx.client.common.refresh.label' | translate }}\n    </button>\n\n    <button\n      class=\"d-icon-download_csv\"\n      adapt-button\n      btn-type=\"tertiary\"\n      type=\"button\"\n      rx-id=\"download-button\"\n      (click)=\"onDownloadClick()\"\n    >\n      {{ 'com.bmc.arsys.rx.client.common.download.label' | translate }}\n    </button>\n  </div>\n\n  <div *ngFor=\"let section of sections\">\n    <h4 class=\"m-0 mb-4\">{{ section.title | translate }}</h4>\n\n    <rx-cognitive-consumption-group\n      *ngFor=\"let group of section.groups\"\n      [group]=\"group\"\n      [sectionId]=\"section.id\"\n      [isAdministrator]=\"isAdministrator\"\n    >\n    </rx-cognitive-consumption-group>\n  </div>\n</rx-admin-settings>\n", components: [{ type: i4.AdminSettingsComponent, selector: "rx-admin-settings", inputs: ["header", "busy"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i5.CognitiveConsumptionGroupComponent, selector: "rx-cognitive-consumption-group", inputs: ["group", "isAdministrator", "sectionId"] }], directives: [{ type: i6.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "translate": i3.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CognitiveConsumptionAdminComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-admin-cognitive-consumption',
                    templateUrl: './cognitive-consumption.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.AdaptModalService }, { type: i2.RxLicenseDataPageService }, { type: i2.RxCurrentUserService }, { type: i3.TranslateService }]; }, propDecorators: { cognitiveConsumptionGroups: [{
                type: ViewChildren,
                args: [CognitiveConsumptionGroupComponent]
            }] } });
//# sourceMappingURL=cognitive-consumption.component.js.map