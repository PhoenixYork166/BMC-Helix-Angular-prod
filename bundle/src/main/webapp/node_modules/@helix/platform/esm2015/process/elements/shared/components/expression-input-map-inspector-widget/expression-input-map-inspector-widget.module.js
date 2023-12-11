import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExpressionFormControlModule, RxFormBuilderModule, RxInspectorModule } from '@helix/platform/shared/components';
import { RxExpressionInputMapInspectorWidgetComponent } from './expression-input-map-inspector-widget.component';
import * as i0 from "@angular/core";
// TODO-VS: move to "@helix/platform/process/components"
export class RxExpressionInputMapInspectorWidgetModule {
}
RxExpressionInputMapInspectorWidgetModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExpressionInputMapInspectorWidgetModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxExpressionInputMapInspectorWidgetModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExpressionInputMapInspectorWidgetModule, declarations: [RxExpressionInputMapInspectorWidgetComponent], imports: [CommonModule, ExpressionFormControlModule, FormsModule, RxFormBuilderModule, RxInspectorModule], exports: [RxExpressionInputMapInspectorWidgetComponent] });
RxExpressionInputMapInspectorWidgetModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExpressionInputMapInspectorWidgetModule, imports: [[CommonModule, ExpressionFormControlModule, FormsModule, RxFormBuilderModule, RxInspectorModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExpressionInputMapInspectorWidgetModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxExpressionInputMapInspectorWidgetComponent],
                    imports: [CommonModule, ExpressionFormControlModule, FormsModule, RxFormBuilderModule, RxInspectorModule],
                    exports: [RxExpressionInputMapInspectorWidgetComponent]
                }]
        }] });
//# sourceMappingURL=expression-input-map-inspector-widget.module.js.map