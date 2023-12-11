import { Component } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RowSelectionMode } from '@helix/platform/view/components';
import { RX_COGNITIVE_CONSUMPTION } from '../../cognitive-consumption.constant';
import { RxCognitiveConsumptionService } from '../../cognitive-consumption.service';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "../../cognitive-consumption.service";
import * as i3 from "@ngx-translate/core";
import * as i4 from "@helix/platform/view/components";
export class CognitiveConsumptionNotificationHistoryModalComponent {
    constructor(activeModalRef, rxCognitiveConsumptionService, translateService) {
        this.activeModalRef = activeModalRef;
        this.rxCognitiveConsumptionService = rxCognitiveConsumptionService;
        this.translateService = translateService;
        this.modalData = this.activeModalRef.getData();
    }
    ngOnInit() {
        const recordDefinition = {
            fieldDefinitions: [
                {
                    id: RX_COGNITIVE_CONSUMPTION.settings.fields.consumedCapacityField,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_COGNITIVE_CONSUMPTION.settings.fields.thresholdReachedField,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_COGNITIVE_CONSUMPTION.settings.fields.notificationDateField,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.dateTime
                },
                {
                    id: RX_COGNITIVE_CONSUMPTION.settings.fields.recipientsField,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                }
            ]
        };
        const columns = [
            {
                index: 0,
                fieldId: RX_COGNITIVE_CONSUMPTION.settings.fields.consumedCapacityField,
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-consumption-notification-history.consumption-measure.title')
            },
            {
                index: 1,
                fieldId: RX_COGNITIVE_CONSUMPTION.settings.fields.thresholdReachedField,
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-consumption-notification-history.threshold-reached.title')
            },
            {
                index: 2,
                fieldId: RX_COGNITIVE_CONSUMPTION.settings.fields.notificationDateField,
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-consumption-notification-history.notification-date.title')
            },
            {
                index: 3,
                fieldId: RX_COGNITIVE_CONSUMPTION.settings.fields.recipientsField,
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.cognitive-consumption-notification-history.email-recipient.title')
            }
        ];
        this.recordGridConfig = of({
            columns,
            enableFiltering: false,
            useExternalFiltering: false,
            enableRowSelection: RowSelectionMode.Multiple,
            styles: 'flex-fill',
            getRecordDefinition: () => of(recordDefinition),
            getData: () => this.rxCognitiveConsumptionService
                .getCognitiveConsumptionNotificationHistory({
                action: this.modalData.groupId,
                domain: this.modalData.domain
            })
                .pipe(map((data) => ({
                data: data.entity,
                totalSize: data.entity.length
            })))
        });
    }
    onCloseClick() {
        this.activeModalRef.close();
    }
}
CognitiveConsumptionNotificationHistoryModalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CognitiveConsumptionNotificationHistoryModalComponent, deps: [{ token: i1.ActiveModalRef }, { token: i2.RxCognitiveConsumptionService }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
CognitiveConsumptionNotificationHistoryModalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: CognitiveConsumptionNotificationHistoryModalComponent, selector: "rx-cognitive-consumption-notification-history-modal", ngImport: i0, template: "<div class=\"modal-body d-flex\">\n  <rx-record-grid [config]=\"recordGridConfig\"></rx-record-grid>\n</div>\n\n<div class=\"modal-footer\">\n  <button rx-id=\"close-button\" adapt-button btn-type=\"secondary\" type=\"button\" (click)=\"onCloseClick()\">\n    {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n  </button>\n</div>\n", styles: [":host ::ng-deep rx-record-grid{height:auto}\n"], components: [{ type: i4.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], pipes: { "translate": i3.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CognitiveConsumptionNotificationHistoryModalComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-cognitive-consumption-notification-history-modal',
                    templateUrl: './cognitive-consumption-notification-history-modal.component.html',
                    styleUrls: ['./cognitive-consumption-notification-history-modal.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveModalRef }, { type: i2.RxCognitiveConsumptionService }, { type: i3.TranslateService }]; } });
//# sourceMappingURL=cognitive-consumption-notification-history-modal.component.js.map