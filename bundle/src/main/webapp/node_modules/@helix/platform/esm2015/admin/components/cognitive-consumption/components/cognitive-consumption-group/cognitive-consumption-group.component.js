import { Component, Input } from '@angular/core';
import { RxModalService } from '@helix/platform/ui-kit';
import { TranslateService } from '@ngx-translate/core';
import { forEach, isEmpty, noop, omit } from 'lodash';
import moment from 'moment-es6';
import { RX_COGNITIVE_CONSUMPTION } from '../../cognitive-consumption.constant';
import { RxCognitiveConsumptionService } from '../../cognitive-consumption.service';
import { CognitiveConsumptionNotificationModalComponent } from '../cognitive-consumption-notification-modal/cognitive-consumption-notification-modal.component';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/ui-kit";
import * as i2 from "../../cognitive-consumption.service";
import * as i3 from "@ngx-translate/core";
import * as i4 from "@bmc-ux/adapt-angular";
import * as i5 from "../cognitive-consumption-chart/cognitive-consumption-chart.component";
import * as i6 from "@angular/common";
export class CognitiveConsumptionGroupComponent {
    constructor(rxModalService, rxCognitiveConsumptionService, translateService) {
        this.rxModalService = rxModalService;
        this.rxCognitiveConsumptionService = rxCognitiveConsumptionService;
        this.translateService = translateService;
        this.parameters = {
            startDate: '',
            endDate: moment().format('YYYY-MM'),
            countType: RX_COGNITIVE_CONSUMPTION.settings.countType
        };
    }
    ngOnInit() {
        this.generateCognitiveConsumptionGroup();
    }
    generateCognitiveConsumptionGroup() {
        this.licenceUsageCount = [];
        this.groupData = omit(this.group, ['charts']);
        this.parameters.startDate = moment(this.parameters.endDate, 'YYYY-MM')
            .add(-1 * 36, 'months')
            .format('YYYY-MM');
        this.busy = this.rxCognitiveConsumptionService
            .getCognitiveLicenseUsage(RX_COGNITIVE_CONSUMPTION.settings.licenseType, this.group.id, this.parameters)
            .subscribe((licenseUsage) => {
            forEach(licenseUsage.licenseUsageCount, (licenseUsageCount) => {
                if (licenseUsageCount && !isEmpty(licenseUsageCount.count)) {
                    this.licenceUsageCount.push(licenseUsageCount);
                }
            });
        });
    }
    onNotificationsClick() {
        this.rxModalService
            .openModal({
            title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-consumption-group.add-edit-notifications.title'),
            content: CognitiveConsumptionNotificationModalComponent,
            size: 'rx-lg',
            data: {
                groupId: this.group.id
            }
        })
            .catch(noop);
    }
}
CognitiveConsumptionGroupComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CognitiveConsumptionGroupComponent, deps: [{ token: i1.RxModalService }, { token: i2.RxCognitiveConsumptionService }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
CognitiveConsumptionGroupComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: CognitiveConsumptionGroupComponent, selector: "rx-cognitive-consumption-group", inputs: { group: "group", isAdministrator: "isAdministrator", sectionId: "sectionId" }, ngImport: i0, template: "<button\n  *ngIf=\"isAdministrator\"\n  class=\"d-icon-envelope_o mb-4\"\n  adapt-button\n  btn-type=\"tertiary\"\n  type=\"button\"\n  rx-id=\"notifications-button\"\n  (click)=\"onNotificationsClick()\"\n>\n  {{ 'com.bmc.arsys.rx.client.admin.cognitive-consumption-group.notifications.label' | translate }}\n</button>\n\n<div class=\"d-flex flex-row flex-wrap\">\n  <div class=\"card mb-4 mr-4 placeholder\" *ngFor=\"let chart of group.charts\">\n    <div class=\"card-block p-4\">\n      <rx-busy-indicator [options]=\"{ busy: busy, loaderType: 'section' }\"></rx-busy-indicator>\n\n      <div *ngIf=\"licenceUsageCount.length\">\n        <rx-cognitive-consumption-chart\n          [chart]=\"chart\"\n          [groupData]=\"groupData\"\n          [licenceUsageCount]=\"licenceUsageCount\"\n        ></rx-cognitive-consumption-chart>\n      </div>\n\n      <div *ngIf=\"!licenceUsageCount.length\">\n        <h5 class=\"m-0\">{{ chart.title | translate }}</h5>\n        <div class=\"mt-6 pt-4\">\n          <adapt-empty-state\n            type=\"chart\"\n            label=\"{{ 'com.bmc.arsys.rx.client.empty-state.no-data-to-display.label' | translate }}\"\n          ></adapt-empty-state>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n", styles: [".placeholder{min-width:550px;min-height:400px}\n"], components: [{ type: i4.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1.RxBusyIndicatorComponent, selector: "rx-busy-indicator", inputs: ["options"] }, { type: i5.CognitiveConsumptionChartComponent, selector: "rx-cognitive-consumption-chart", inputs: ["chart", "groupData", "licenceUsageCount"] }, { type: i4.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }], directives: [{ type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "translate": i3.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CognitiveConsumptionGroupComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-cognitive-consumption-group',
                    templateUrl: './cognitive-consumption-group.component.html',
                    styleUrls: ['./cognitive-consumption-group.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.RxModalService }, { type: i2.RxCognitiveConsumptionService }, { type: i3.TranslateService }]; }, propDecorators: { group: [{
                type: Input
            }], isAdministrator: [{
                type: Input
            }], sectionId: [{
                type: Input
            }] } });
//# sourceMappingURL=cognitive-consumption-group.component.js.map