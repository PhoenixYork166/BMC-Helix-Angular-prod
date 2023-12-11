import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionListControlComponent } from './action-list-control.component';
import { ActionListEditorDialogModule } from './action-list-editor-dialog/action-list-editor-dialog.module';
import { AdaptButtonModule, AdaptIconModule, AdaptPopoverModule } from '@bmc-ux/adapt-angular';
import * as i0 from "@angular/core";
export class ActionListControlModule {
}
ActionListControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionListControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ActionListControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionListControlModule, declarations: [ActionListControlComponent], imports: [CommonModule, AdaptIconModule, AdaptButtonModule, ActionListEditorDialogModule, AdaptPopoverModule], exports: [ActionListControlComponent] });
ActionListControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionListControlModule, imports: [[CommonModule, AdaptIconModule, AdaptButtonModule, ActionListEditorDialogModule, AdaptPopoverModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionListControlModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ActionListControlComponent],
                    exports: [ActionListControlComponent],
                    entryComponents: [ActionListControlComponent],
                    imports: [CommonModule, AdaptIconModule, AdaptButtonModule, ActionListEditorDialogModule, AdaptPopoverModule]
                }]
        }] });
//# sourceMappingURL=action-list-control.module.js.map