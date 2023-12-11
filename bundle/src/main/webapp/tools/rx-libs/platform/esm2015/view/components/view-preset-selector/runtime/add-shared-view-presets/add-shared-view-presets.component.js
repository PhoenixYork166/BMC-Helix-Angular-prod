import { ChangeDetectionStrategy, Component, Injector, ViewChild } from '@angular/core';
import { RxModalClass } from '@helix/platform/ui-kit';
import { ActiveModalRef, DismissReasons } from '@bmc-ux/adapt-angular';
import { of } from 'rxjs';
import { RecordGridComponent } from '../../../record-grid/runtime/record-grid.component';
import { RowSelectionMode } from '../../../record-grid/runtime/types/row-selection-mode.enum';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';
import { isEmpty } from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@ngx-translate/core";
import * as i3 from "../../../record-grid/runtime/record-grid.component";
import * as i4 from "@angular/common";
export class AddSharedViewPresetsComponent extends RxModalClass {
    constructor(activeModalRef, injector, translateService) {
        super(activeModalRef, injector);
        this.activeModalRef = activeModalRef;
        this.injector = injector;
        this.translateService = translateService;
        this.recordGridConfig$ = of({
            columns: [
                {
                    fieldId: 'label',
                    title: this.translateService.instant('com.bmc.arsys.rx.client.view-components.view-preset-selector.add-shared-view-preset.grid.column.preset-name.title')
                },
                {
                    fieldId: 'ownerFullName',
                    title: this.translateService.instant('com.bmc.arsys.rx.client.view-components.view-preset-selector.add-shared-view-preset.grid.column.shared-by.title')
                }
            ],
            enableFiltering: false,
            enableRowSelection: RowSelectionMode.Multiple,
            recordIdField: 'guid',
            styles: 'flex-fill',
            toolbarConfig: {
                filter: false,
                visibleColumnsMenu: false
            },
            useExternalFiltering: false,
            getRecordDefinition: () => of({
                fieldDefinitions: [
                    {
                        id: 'label',
                        resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                    },
                    {
                        id: 'ownerFullName',
                        resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                    }
                ]
            }),
            getData: () => of({
                data: this.presets,
                totalSize: this.presets.length
            })
        });
        this.modalData = this.activeModalRef.getData();
        this.presets = this.modalData.newPresets;
    }
    ngOnInit() {
        super.ngOnInit();
        this.isAddButtonDisabled$ = this.recordGrid.rowSelectionChanged.pipe(map(isEmpty));
    }
    add() {
        const result = this.recordGrid.api.getSelectedRows().map(({ label, guid }) => ({
            label,
            guid
        }));
        this.activeModalRef.close(result);
    }
    cancel() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
}
AddSharedViewPresetsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AddSharedViewPresetsComponent, deps: [{ token: i1.ActiveModalRef }, { token: i0.Injector }, { token: i2.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
AddSharedViewPresetsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: AddSharedViewPresetsComponent, selector: "rx-add-shared-view-presets", viewQueries: [{ propertyName: "recordGrid", first: true, predicate: RecordGridComponent, descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: "<div class=\"modal-body\">\n  <div class=\"mb-4\" style=\"white-space: pre-line\">\n    {{\n      'com.bmc.arsys.rx.client.view-components.view-preset-selector.add-shared-view-preset.description.label'\n        | translate\n    }}\n  </div>\n\n  <rx-record-grid [config]=\"recordGridConfig$\"></rx-record-grid>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    adapt-button\n    btn-type=\"primary\"\n    type=\"button\"\n    rx-id=\"add-button\"\n    (click)=\"add()\"\n    [disabled]=\"isAddButtonDisabled$ | async\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.add.label' | translate }}\n  </button>\n  <button adapt-button btn-type=\"secondary\" type=\"button\" rx-id=\"cancel-button\" (click)=\"cancel()\">\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", components: [{ type: i3.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], pipes: { "translate": i2.TranslatePipe, "async": i4.AsyncPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AddSharedViewPresetsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-add-shared-view-presets',
                    templateUrl: './add-shared-view-presets.component.html',
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveModalRef }, { type: i0.Injector }, { type: i2.TranslateService }]; }, propDecorators: { recordGrid: [{
                type: ViewChild,
                args: [RecordGridComponent, { static: true }]
            }] } });
//# sourceMappingURL=add-shared-view-presets.component.js.map