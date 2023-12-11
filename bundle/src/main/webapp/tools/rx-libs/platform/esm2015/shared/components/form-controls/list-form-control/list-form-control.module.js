import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListFormControlComponent } from './list-form-control.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdaptRxTextfieldModule } from '@bmc-ux/adapt-angular';
import { ExpressionFormControlModule } from '../expression-form-control/expression-form-control.module';
import { ListItemComponent } from './list-item.component';
import * as i0 from "@angular/core";
export class ListFormControlModule {
}
ListFormControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ListFormControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ListFormControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ListFormControlModule, declarations: [ListFormControlComponent, ListItemComponent], imports: [CommonModule, ReactiveFormsModule, AdaptRxTextfieldModule, ExpressionFormControlModule], exports: [ListFormControlComponent] });
ListFormControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ListFormControlModule, imports: [[CommonModule, ReactiveFormsModule, AdaptRxTextfieldModule, ExpressionFormControlModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ListFormControlModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ListFormControlComponent, ListItemComponent],
                    exports: [ListFormControlComponent],
                    entryComponents: [ListFormControlComponent],
                    imports: [CommonModule, ReactiveFormsModule, AdaptRxTextfieldModule, ExpressionFormControlModule]
                }]
        }] });
//# sourceMappingURL=list-form-control.module.js.map