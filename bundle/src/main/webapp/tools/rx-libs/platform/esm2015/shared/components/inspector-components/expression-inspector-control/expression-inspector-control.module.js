import { NgModule } from '@angular/core';
import { ExpressionInspectorControlComponent } from './expression-inspector-control.component';
import { ExpressionFormControlModule } from '../../form-controls/expression-form-control/expression-form-control.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as i0 from "@angular/core";
export class ExpressionInspectorControlModule {
}
ExpressionInspectorControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExpressionInspectorControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ExpressionInspectorControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExpressionInspectorControlModule, declarations: [ExpressionInspectorControlComponent], imports: [ExpressionFormControlModule, FormsModule, ReactiveFormsModule], exports: [ExpressionInspectorControlComponent] });
ExpressionInspectorControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExpressionInspectorControlModule, imports: [[ExpressionFormControlModule, FormsModule, ReactiveFormsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExpressionInspectorControlModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ExpressionInspectorControlComponent],
                    imports: [ExpressionFormControlModule, FormsModule, ReactiveFormsModule],
                    exports: [ExpressionInspectorControlComponent]
                }]
        }] });
//# sourceMappingURL=expression-inspector-control.module.js.map