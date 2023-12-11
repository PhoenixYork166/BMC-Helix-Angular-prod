import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { RxProcessApiModule } from '@helix/platform/process/api';
import { RxViewActionRegistryService, ViewComponentPropertyType } from '@helix/platform/view/api';
import { RxIframeModule } from '@helix/platform/shared/components';
import { RxLaunchProcessDesignerActionService } from './launch-process-designer-action.service';
import { LaunchProcessDesignerActionDesignModelClass } from './launch-process-designer-action-design-model.class';
import { RxLaunchProcessDesignerExpressionEvaluatorService } from './launch-process-designer-expression-evaluator.service';
import { ProcessDesignerFrameComponent } from './process-designer-frame.component';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
import * as i2 from "./launch-process-designer-action.service";
import * as i3 from "./launch-process-designer-expression-evaluator.service";
export class LaunchProcessDesignerActionModule {
    constructor(rxViewActionRegistryService, rxLaunchProcessDesignerActionService, rxLaunchProcessDesignerExpressionActionEvaluatorService) {
        this.rxViewActionRegistryService = rxViewActionRegistryService;
        this.rxLaunchProcessDesignerActionService = rxLaunchProcessDesignerActionService;
        this.rxLaunchProcessDesignerExpressionActionEvaluatorService = rxLaunchProcessDesignerExpressionActionEvaluatorService;
        this.rxViewActionRegistryService.register({
            name: 'rxLaunchProcessDesignerAction',
            label: 'Launch process designer',
            bundleId: RX_APPLICATION.platformBundleId,
            service: this.rxLaunchProcessDesignerActionService,
            designModel: LaunchProcessDesignerActionDesignModelClass,
            parameters: [
                {
                    name: 'processDefinitionName',
                    label: 'Process definition name',
                    type: ViewComponentPropertyType.String,
                    enableExpressionEvaluation: true,
                    evaluatorService: this.rxLaunchProcessDesignerExpressionActionEvaluatorService
                },
                {
                    name: 'paletteElements',
                    label: 'Available palette elements',
                    type: ViewComponentPropertyType.String
                }
            ]
        });
    }
}
LaunchProcessDesignerActionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LaunchProcessDesignerActionModule, deps: [{ token: i1.RxViewActionRegistryService }, { token: i2.RxLaunchProcessDesignerActionService }, { token: i3.RxLaunchProcessDesignerExpressionEvaluatorService }], target: i0.ɵɵFactoryTarget.NgModule });
LaunchProcessDesignerActionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LaunchProcessDesignerActionModule, declarations: [ProcessDesignerFrameComponent], imports: [CommonModule, RxProcessApiModule, RxIframeModule] });
LaunchProcessDesignerActionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LaunchProcessDesignerActionModule, providers: [RxLaunchProcessDesignerExpressionEvaluatorService], imports: [[CommonModule, RxProcessApiModule, RxIframeModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LaunchProcessDesignerActionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RxProcessApiModule, RxIframeModule],
                    declarations: [ProcessDesignerFrameComponent],
                    entryComponents: [ProcessDesignerFrameComponent],
                    providers: [RxLaunchProcessDesignerExpressionEvaluatorService]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxViewActionRegistryService }, { type: i2.RxLaunchProcessDesignerActionService }, { type: i3.RxLaunchProcessDesignerExpressionEvaluatorService }]; } });
//# sourceMappingURL=launch-process-designer-action.module.js.map