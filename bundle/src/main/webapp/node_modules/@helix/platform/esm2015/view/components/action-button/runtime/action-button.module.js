import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdaptButtonModule, AdaptIconModule } from '@bmc-ux/adapt-angular';
import { RxDefinitionAdapterRegistryService } from '@helix/platform/shared/api';
import { RxViewComponentType } from '@helix/platform/view/api';
import { TranslateModule } from '@ngx-translate/core';
import { ActionButtonAdapterService } from '../action-button-adapter.service';
import { RxActionButtonService } from '../action-button.service';
import { ActionButtonComponent } from './action-button.component';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "../action-button-adapter.service";
export class ActionButtonModule {
    constructor(rxDefinitionAdapterRegistryService, actionButtonAdapterService) {
        this.rxDefinitionAdapterRegistryService = rxDefinitionAdapterRegistryService;
        this.actionButtonAdapterService = actionButtonAdapterService;
        this.rxDefinitionAdapterRegistryService.registerRuntimeAdapter(RxViewComponentType.ActionButton, this.actionButtonAdapterService);
    }
}
ActionButtonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionButtonModule, deps: [{ token: i1.RxDefinitionAdapterRegistryService }, { token: i2.ActionButtonAdapterService }], target: i0.ɵɵFactoryTarget.NgModule });
ActionButtonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionButtonModule, declarations: [ActionButtonComponent], imports: [AdaptButtonModule, CommonModule, TranslateModule, AdaptIconModule], exports: [ActionButtonComponent] });
ActionButtonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionButtonModule, providers: [RxActionButtonService, ActionButtonAdapterService], imports: [[AdaptButtonModule, CommonModule, TranslateModule, AdaptIconModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionButtonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [AdaptButtonModule, CommonModule, TranslateModule, AdaptIconModule],
                    exports: [ActionButtonComponent],
                    declarations: [ActionButtonComponent],
                    entryComponents: [ActionButtonComponent],
                    providers: [RxActionButtonService, ActionButtonAdapterService]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxDefinitionAdapterRegistryService }, { type: i2.ActionButtonAdapterService }]; } });
//# sourceMappingURL=action-button.module.js.map