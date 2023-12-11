import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormControlsModule, RxDefinitionPickerModule } from '@helix/platform/shared/components';
import { ViewDesignerCanvasModule } from '@helix/platform/view/designer';
import { RecordEditorDesignComponent } from './record-editor-design.component';
import { RxRecordEditorDesignHelpersService } from './record-editor-design-helpers.service';
import { FieldsInspectorWidgetModule } from './components/fields-inspector-widget/fields-inspector-widget.module';
import { AdaptEmptyStateModule } from '@bmc-ux/adapt-angular';
import * as i0 from "@angular/core";
export class RecordEditorDesignModule {
}
RecordEditorDesignModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordEditorDesignModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RecordEditorDesignModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordEditorDesignModule, declarations: [RecordEditorDesignComponent], imports: [CommonModule,
        RxDefinitionPickerModule,
        FormsModule,
        FormControlsModule,
        ViewDesignerCanvasModule,
        FieldsInspectorWidgetModule,
        AdaptEmptyStateModule] });
RecordEditorDesignModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordEditorDesignModule, providers: [RxRecordEditorDesignHelpersService], imports: [[
            CommonModule,
            RxDefinitionPickerModule,
            FormsModule,
            FormControlsModule,
            ViewDesignerCanvasModule,
            FieldsInspectorWidgetModule,
            AdaptEmptyStateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordEditorDesignModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RxDefinitionPickerModule,
                        FormsModule,
                        FormControlsModule,
                        ViewDesignerCanvasModule,
                        FieldsInspectorWidgetModule,
                        AdaptEmptyStateModule
                    ],
                    declarations: [RecordEditorDesignComponent],
                    entryComponents: [RecordEditorDesignComponent],
                    providers: [RxRecordEditorDesignHelpersService]
                }]
        }] });
//# sourceMappingURL=record-editor-design.module.js.map