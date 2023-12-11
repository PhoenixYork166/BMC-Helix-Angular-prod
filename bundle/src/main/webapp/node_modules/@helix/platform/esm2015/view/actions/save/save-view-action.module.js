import { RxSaveViewActionService } from './save-view-action.service';
import { NgModule } from '@angular/core';
import { RxViewActionRegistryService, ViewComponentPropertyType } from '@helix/platform/view/api';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { ExpressionFormControlComponent, SwitchFormControlComponent } from '@helix/platform/shared/components';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
import * as i2 from "./save-view-action.service";
export class SaveViewActionModule {
    constructor(rxViewActionRegistryService, rxSaveViewActionService) {
        this.rxViewActionRegistryService = rxViewActionRegistryService;
        this.rxSaveViewActionService = rxSaveViewActionService;
        this.rxViewActionRegistryService.register({
            name: 'rxSaveAction',
            label: 'Save',
            bundleId: RX_APPLICATION.platformBundleId,
            service: this.rxSaveViewActionService,
            parameters: [
                {
                    name: 'targetApi',
                    label: 'View/Component',
                    editor: ExpressionFormControlComponent,
                    isRequired: true,
                    enableExpressionEvaluation: true
                },
                {
                    name: 'closeAfterSave',
                    label: 'Close after save',
                    editor: SwitchFormControlComponent,
                    type: ViewComponentPropertyType.Boolean,
                    designType: ViewComponentPropertyType.Boolean
                },
                {
                    name: 'viewApi',
                    enableExpressionEvaluation: true,
                    defaultValue: '${view.api}'
                }
            ]
        });
    }
}
SaveViewActionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SaveViewActionModule, deps: [{ token: i1.RxViewActionRegistryService }, { token: i2.RxSaveViewActionService }], target: i0.ɵɵFactoryTarget.NgModule });
SaveViewActionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SaveViewActionModule });
SaveViewActionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SaveViewActionModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SaveViewActionModule, decorators: [{
            type: NgModule
        }], ctorParameters: function () { return [{ type: i1.RxViewActionRegistryService }, { type: i2.RxSaveViewActionService }]; } });
//# sourceMappingURL=save-view-action.module.js.map