import { NgModule } from '@angular/core';
import { RxViewActionRegistryService, ViewComponentPropertyType } from '@helix/platform/view/api';
import { RxEditRecordsViewActionService } from './services/edit-records-view-action.service';
import { ResultModalComponent } from './result-modal/result-modal.component';
import { CommonModule } from '@angular/common';
import { AdaptIconModule, AdaptRxTextareaModule } from '@bmc-ux/adapt-angular';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { RX_APPLICATION, Tooltip } from '@helix/platform/shared/api';
import { ExpressionFormControlComponent, RxDefinitionPickerComponent, RxDefinitionPickerType } from '@helix/platform/shared/components';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
import * as i2 from "./services/edit-records-view-action.service";
export class EditRecordsViewActionModule {
    constructor(rxViewActionRegistryService, rxEditRecordsActionService) {
        this.rxViewActionRegistryService = rxViewActionRegistryService;
        this.rxEditRecordsActionService = rxEditRecordsActionService;
        this.rxViewActionRegistryService.register({
            name: 'rxEditRecordsAction',
            label: 'Edit records',
            bundleId: RX_APPLICATION.platformBundleId,
            service: this.rxEditRecordsActionService,
            parameters: [
                {
                    name: 'records',
                    label: 'Records',
                    isRequired: true,
                    tooltip: new Tooltip(`Build an expression that evaluates to one of the following:<br>
            1) Record Grid;<br>
            2) A collection of Record Instances, or<br>
            3) A collection of Record Instance IDs. <br>For options 2 and 3, select a Record Definition in the field below.`),
                    enableExpressionEvaluation: true,
                    editor: ExpressionFormControlComponent
                },
                {
                    name: 'recordDefinitionName',
                    label: 'Record definition',
                    type: ViewComponentPropertyType.String,
                    editor: RxDefinitionPickerComponent,
                    editorOptions: {
                        definitionType: RxDefinitionPickerType.StandardDataRecord
                    },
                    defaultValue: null
                }
            ]
        });
    }
}
EditRecordsViewActionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: EditRecordsViewActionModule, deps: [{ token: i1.RxViewActionRegistryService }, { token: i2.RxEditRecordsViewActionService }], target: i0.ɵɵFactoryTarget.NgModule });
EditRecordsViewActionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: EditRecordsViewActionModule, declarations: [ResultModalComponent], imports: [CommonModule, AdaptIconModule, TranslateModule, FormsModule, AdaptRxTextareaModule] });
EditRecordsViewActionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: EditRecordsViewActionModule, imports: [[CommonModule, AdaptIconModule, TranslateModule, FormsModule, AdaptRxTextareaModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: EditRecordsViewActionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, AdaptIconModule, TranslateModule, FormsModule, AdaptRxTextareaModule],
                    declarations: [ResultModalComponent],
                    entryComponents: [ResultModalComponent]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxViewActionRegistryService }, { type: i2.RxEditRecordsViewActionService }]; } });
//# sourceMappingURL=edit-records-view-action.module.js.map