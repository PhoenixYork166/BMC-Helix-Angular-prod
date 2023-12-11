import { RxViewActionRegistryService } from '@helix/platform/view/api';
import { RxLaunchProcessDesignerActionService } from './launch-process-designer-action.service';
import { RxLaunchProcessDesignerExpressionEvaluatorService } from './launch-process-designer-expression-evaluator.service';
import * as i0 from "@angular/core";
import * as i1 from "./process-designer-frame.component";
import * as i2 from "@angular/common";
import * as i3 from "@helix/platform/process/api";
import * as i4 from "@helix/platform/shared/components";
export declare class LaunchProcessDesignerActionModule {
    private rxViewActionRegistryService;
    private rxLaunchProcessDesignerActionService;
    private rxLaunchProcessDesignerExpressionActionEvaluatorService;
    constructor(rxViewActionRegistryService: RxViewActionRegistryService, rxLaunchProcessDesignerActionService: RxLaunchProcessDesignerActionService, rxLaunchProcessDesignerExpressionActionEvaluatorService: RxLaunchProcessDesignerExpressionEvaluatorService);
    static ɵfac: i0.ɵɵFactoryDeclaration<LaunchProcessDesignerActionModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<LaunchProcessDesignerActionModule, [typeof i1.ProcessDesignerFrameComponent], [typeof i2.CommonModule, typeof i3.RxProcessApiModule, typeof i4.RxIframeModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<LaunchProcessDesignerActionModule>;
}
