import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxComponentPermissionEditorWidgetComponent } from './component-permission-editor-widget.component';
import { RxPermissionEditorModule } from '@helix/platform/shared/components';
import { FormsModule } from '@angular/forms';
import * as i0 from "@angular/core";
export class RxComponentPermissionEditorWidgetModule {
}
RxComponentPermissionEditorWidgetModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxComponentPermissionEditorWidgetModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxComponentPermissionEditorWidgetModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxComponentPermissionEditorWidgetModule, declarations: [RxComponentPermissionEditorWidgetComponent], imports: [CommonModule, FormsModule, RxPermissionEditorModule] });
RxComponentPermissionEditorWidgetModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxComponentPermissionEditorWidgetModule, imports: [[CommonModule, FormsModule, RxPermissionEditorModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxComponentPermissionEditorWidgetModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxComponentPermissionEditorWidgetComponent],
                    imports: [CommonModule, FormsModule, RxPermissionEditorModule]
                }]
        }] });
//# sourceMappingURL=component-permission-editor-widget.module.js.map