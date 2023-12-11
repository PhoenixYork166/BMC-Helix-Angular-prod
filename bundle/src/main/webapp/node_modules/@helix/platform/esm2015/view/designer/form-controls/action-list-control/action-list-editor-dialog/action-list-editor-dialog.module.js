import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AdaptAccordionModule, AdaptButtonModule, AdaptEmptyStateModule, AdaptIconModule, AdaptPopoverModule, AdaptRxSearchModule, AdaptTreeModule } from '@bmc-ux/adapt-angular';
import { RxFormBuilderModule, ExpressionEditorModule } from '@helix/platform/shared/components';
import { ActionListEditorDialogComponent } from './action-list-editor-dialog.component';
import * as i0 from "@angular/core";
export class ActionListEditorDialogModule {
}
ActionListEditorDialogModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionListEditorDialogModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ActionListEditorDialogModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionListEditorDialogModule, declarations: [ActionListEditorDialogComponent], imports: [CommonModule,
        AdaptRxSearchModule,
        AdaptButtonModule,
        AdaptAccordionModule,
        DragDropModule,
        AdaptEmptyStateModule,
        ExpressionEditorModule,
        FormsModule,
        RxFormBuilderModule,
        AdaptIconModule,
        AdaptPopoverModule,
        TranslateModule,
        AdaptTreeModule], exports: [ActionListEditorDialogComponent] });
ActionListEditorDialogModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionListEditorDialogModule, imports: [[
            CommonModule,
            AdaptRxSearchModule,
            AdaptButtonModule,
            AdaptAccordionModule,
            DragDropModule,
            AdaptEmptyStateModule,
            ExpressionEditorModule,
            FormsModule,
            RxFormBuilderModule,
            AdaptIconModule,
            AdaptPopoverModule,
            TranslateModule,
            AdaptTreeModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionListEditorDialogModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ActionListEditorDialogComponent],
                    exports: [ActionListEditorDialogComponent],
                    entryComponents: [ActionListEditorDialogComponent],
                    imports: [
                        CommonModule,
                        AdaptRxSearchModule,
                        AdaptButtonModule,
                        AdaptAccordionModule,
                        DragDropModule,
                        AdaptEmptyStateModule,
                        ExpressionEditorModule,
                        FormsModule,
                        RxFormBuilderModule,
                        AdaptIconModule,
                        AdaptPopoverModule,
                        TranslateModule,
                        AdaptTreeModule
                    ]
                }]
        }] });
//# sourceMappingURL=action-list-editor-dialog.module.js.map