import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { assign } from 'lodash';
import { AdaptAlertModule, AdaptCodeViewerModule, AdaptSidebarModule, AdaptTabsModule } from '@bmc-ux/adapt-angular';
import { RxBladeModule, RxJsonViewerModule, RxValidationIssuesModule } from '@helix/platform/ui-kit';
import { RX_DESIGNER_ELEMENT_SHAPE } from '@helix/platform/shared/api';
import { RxDesignerCanvasModule, RxDesignerHeaderModule, RxDesignerPaletteModule, RxFormBuilderModule, RxInspectorModule } from '@helix/platform/shared/components';
import { RxProcessElementsModule } from '@helix/platform/process/elements';
import { RxServerActionsModule } from '@helix/platform/process/server-actions';
import { ProcessDesignerComponent } from './process-designer.component';
import * as i0 from "@angular/core";
joint.shapes.rx = joint.shapes.rx || {};
export class ProcessDesignerModule {
    constructor() {
        assign(joint.shapes.bpmn.icons, RX_DESIGNER_ELEMENT_SHAPE.bpmnIcons);
    }
}
ProcessDesignerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessDesignerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ProcessDesignerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessDesignerModule, declarations: [ProcessDesignerComponent], imports: [AdaptAlertModule,
        AdaptCodeViewerModule,
        AdaptSidebarModule,
        AdaptTabsModule,
        CommonModule,
        RxBladeModule,
        RxDesignerCanvasModule,
        RxDesignerHeaderModule,
        RxDesignerPaletteModule,
        RxFormBuilderModule,
        RxInspectorModule,
        RxJsonViewerModule,
        RxProcessElementsModule,
        RxServerActionsModule,
        RxValidationIssuesModule,
        TranslateModule], exports: [ProcessDesignerComponent] });
ProcessDesignerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessDesignerModule, imports: [[
            AdaptAlertModule,
            AdaptCodeViewerModule,
            AdaptSidebarModule,
            AdaptTabsModule,
            CommonModule,
            RxBladeModule,
            RxDesignerCanvasModule,
            RxDesignerHeaderModule,
            RxDesignerPaletteModule,
            RxFormBuilderModule,
            RxInspectorModule,
            RxJsonViewerModule,
            RxProcessElementsModule,
            RxServerActionsModule,
            RxValidationIssuesModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessDesignerModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ProcessDesignerComponent],
                    imports: [
                        AdaptAlertModule,
                        AdaptCodeViewerModule,
                        AdaptSidebarModule,
                        AdaptTabsModule,
                        CommonModule,
                        RxBladeModule,
                        RxDesignerCanvasModule,
                        RxDesignerHeaderModule,
                        RxDesignerPaletteModule,
                        RxFormBuilderModule,
                        RxInspectorModule,
                        RxJsonViewerModule,
                        RxProcessElementsModule,
                        RxServerActionsModule,
                        RxValidationIssuesModule,
                        TranslateModule
                    ],
                    exports: [ProcessDesignerComponent]
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=process-designer.module.js.map