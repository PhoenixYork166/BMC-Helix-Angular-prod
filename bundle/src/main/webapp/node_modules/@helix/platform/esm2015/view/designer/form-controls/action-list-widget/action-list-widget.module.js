import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionListWidgetComponent } from './action-list-widget.component';
import { ActionListControlModule } from '../action-list-control/action-list-control.module';
import { FormsModule } from '@angular/forms';
import * as i0 from "@angular/core";
export class ActionListWidgetModule {
}
ActionListWidgetModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionListWidgetModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ActionListWidgetModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionListWidgetModule, declarations: [ActionListWidgetComponent], imports: [CommonModule, ActionListControlModule, FormsModule] });
ActionListWidgetModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionListWidgetModule, imports: [[CommonModule, ActionListControlModule, FormsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionListWidgetModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ActionListWidgetComponent],
                    imports: [CommonModule, ActionListControlModule, FormsModule]
                }]
        }] });
//# sourceMappingURL=action-list-widget.module.js.map