import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdaptButtonModule, AdaptModalModule, AdaptRxCheckboxModule, AdaptRxLabelModule, AdaptTagModule } from '@bmc-ux/adapt-angular';
import { AdaptSelectModule } from '@bmc-ux/obsolete';
import { RxModalModule } from '@helix/platform/ui-kit';
import { TranslateModule } from '@ngx-translate/core';
import { RxSelectWithPaginationModule } from '../select-with-pagination/select-with-pagination.module';
import { RxPermissionEditorDialogComponent } from './permission-editor-dialog/permission-editor-dialog.component';
import { RxPermissionEditorComponent } from './permission-editor.component';
import * as i0 from "@angular/core";
export class RxPermissionEditorModule {
}
RxPermissionEditorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxPermissionEditorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxPermissionEditorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxPermissionEditorModule, declarations: [RxPermissionEditorComponent, RxPermissionEditorDialogComponent], imports: [CommonModule,
        RxSelectWithPaginationModule,
        RxModalModule,
        FormsModule,
        AdaptSelectModule,
        AdaptModalModule,
        AdaptButtonModule,
        AdaptTagModule,
        TranslateModule,
        AdaptRxCheckboxModule,
        AdaptRxLabelModule], exports: [RxPermissionEditorDialogComponent, RxPermissionEditorComponent] });
RxPermissionEditorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxPermissionEditorModule, imports: [[
            CommonModule,
            RxSelectWithPaginationModule,
            RxModalModule,
            FormsModule,
            AdaptSelectModule,
            AdaptModalModule,
            AdaptButtonModule,
            AdaptTagModule,
            TranslateModule,
            AdaptRxCheckboxModule,
            AdaptRxLabelModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxPermissionEditorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RxSelectWithPaginationModule,
                        RxModalModule,
                        FormsModule,
                        AdaptSelectModule,
                        AdaptModalModule,
                        AdaptButtonModule,
                        AdaptTagModule,
                        TranslateModule,
                        AdaptRxCheckboxModule,
                        AdaptRxLabelModule
                    ],
                    declarations: [RxPermissionEditorComponent, RxPermissionEditorDialogComponent],
                    exports: [RxPermissionEditorDialogComponent, RxPermissionEditorComponent],
                    entryComponents: [RxPermissionEditorComponent, RxPermissionEditorDialogComponent]
                }]
        }] });
//# sourceMappingURL=permission-editor.module.js.map