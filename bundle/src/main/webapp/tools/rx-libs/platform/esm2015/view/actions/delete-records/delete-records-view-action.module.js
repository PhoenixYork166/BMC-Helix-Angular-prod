import { NgModule } from '@angular/core';
import { RxViewActionRegistryService, ViewComponentPropertyType } from '@helix/platform/view/api';
import { RxDeleteRecordsViewActionService } from './delete-records-view-action.service';
import { RX_APPLICATION, Tooltip } from '@helix/platform/shared/api';
import { ExpressionFormControlComponent, RxDefinitionPickerComponent, RxDefinitionPickerType } from '@helix/platform/shared/components';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
import * as i2 from "./delete-records-view-action.service";
export class DeleteRecordsViewActionModule {
    constructor(rxViewActionRegistryService, rxDeleteRecordsViewActionService) {
        this.rxViewActionRegistryService = rxViewActionRegistryService;
        this.rxDeleteRecordsViewActionService = rxDeleteRecordsViewActionService;
        this.rxViewActionRegistryService.register({
            name: 'rxDeleteRecordsAction',
            label: 'Delete records',
            bundleId: RX_APPLICATION.platformBundleId,
            service: this.rxDeleteRecordsViewActionService,
            parameters: [
                {
                    name: 'records',
                    label: 'Records',
                    enableExpressionEvaluation: true,
                    isRequired: true,
                    editor: ExpressionFormControlComponent,
                    tooltip: new Tooltip(`Build an expression that evaluates to one of the following:<br>
            1) Record grid<br>
            2) A collection of record instances or<br>
            3) A collection of record instance IDs. <br>For options 2 and 3, select a record definition in the field below.`)
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
DeleteRecordsViewActionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DeleteRecordsViewActionModule, deps: [{ token: i1.RxViewActionRegistryService }, { token: i2.RxDeleteRecordsViewActionService }], target: i0.ɵɵFactoryTarget.NgModule });
DeleteRecordsViewActionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DeleteRecordsViewActionModule });
DeleteRecordsViewActionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DeleteRecordsViewActionModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DeleteRecordsViewActionModule, decorators: [{
            type: NgModule
        }], ctorParameters: function () { return [{ type: i1.RxViewActionRegistryService }, { type: i2.RxDeleteRecordsViewActionService }]; } });
//# sourceMappingURL=delete-records-view-action.module.js.map