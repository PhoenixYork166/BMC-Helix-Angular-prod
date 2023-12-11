import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdaptButtonModule } from '@bmc-ux/adapt-angular';
import { RxDefinitionAdapterRegistryService } from '@helix/platform/shared/api';
import { IconPickerFormControlModule } from '@helix/platform/shared/components';
import { RxViewComponentType } from '@helix/platform/view/api';
import { ActionListWidgetModule, ViewDesignerCanvasModule } from '@helix/platform/view/designer';
import { ActionButtonAdapterService } from '../action-button-adapter.service';
import { RxActionButtonService } from '../action-button.service';
import { ActionButtonDesignComponent } from './action-button-design.component';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "../action-button-adapter.service";
export class ActionButtonDesignModule {
    constructor(rxDefinitionAdapterRegistryService, actionButtonAdapterService) {
        this.rxDefinitionAdapterRegistryService = rxDefinitionAdapterRegistryService;
        this.actionButtonAdapterService = actionButtonAdapterService;
        this.rxDefinitionAdapterRegistryService.registerDesignAdapter(RxViewComponentType.ActionButton, this.actionButtonAdapterService);
    }
}
ActionButtonDesignModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionButtonDesignModule, deps: [{ token: i1.RxDefinitionAdapterRegistryService }, { token: i2.ActionButtonAdapterService }], target: i0.ɵɵFactoryTarget.NgModule });
ActionButtonDesignModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionButtonDesignModule, declarations: [ActionButtonDesignComponent], imports: [CommonModule,
        AdaptButtonModule,
        ViewDesignerCanvasModule,
        ActionListWidgetModule,
        IconPickerFormControlModule] });
ActionButtonDesignModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionButtonDesignModule, providers: [RxActionButtonService, ActionButtonAdapterService], imports: [[
            CommonModule,
            AdaptButtonModule,
            ViewDesignerCanvasModule,
            ActionListWidgetModule,
            IconPickerFormControlModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionButtonDesignModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        AdaptButtonModule,
                        ViewDesignerCanvasModule,
                        ActionListWidgetModule,
                        IconPickerFormControlModule
                    ],
                    declarations: [ActionButtonDesignComponent],
                    entryComponents: [ActionButtonDesignComponent],
                    providers: [RxActionButtonService, ActionButtonAdapterService]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxDefinitionAdapterRegistryService }, { type: i2.ActionButtonAdapterService }]; } });
//# sourceMappingURL=action-button-design.module.js.map