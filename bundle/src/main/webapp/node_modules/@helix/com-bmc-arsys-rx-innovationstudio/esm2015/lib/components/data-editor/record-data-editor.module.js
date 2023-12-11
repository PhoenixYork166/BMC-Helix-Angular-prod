import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RxIframeModule } from '@helix/platform/shared/components';
import { RxBusyIndicatorModule } from '@helix/platform/ui-kit';
import { RecordDataEditorComponent } from './record-data-editor.component';
import { TranslateModule } from '@ngx-translate/core';
import { RecordGridModule, ActionButtonModule } from '@helix/platform/view/components';
import { AdaptButtonModule } from '@bmc-ux/adapt-angular';
import { RxDefinitionModule } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
export class RecordDataEditorModule {
}
/** @nocollapse */ RecordDataEditorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDataEditorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ RecordDataEditorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDataEditorModule, declarations: [RecordDataEditorComponent], imports: [CommonModule,
        RxIframeModule,
        RxBusyIndicatorModule,
        TranslateModule,
        RecordGridModule,
        AdaptButtonModule,
        RxDefinitionModule,
        ActionButtonModule], exports: [RecordDataEditorComponent] });
/** @nocollapse */ RecordDataEditorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDataEditorModule, imports: [[
            CommonModule,
            RxIframeModule,
            RxBusyIndicatorModule,
            TranslateModule,
            RecordGridModule,
            AdaptButtonModule,
            RxDefinitionModule,
            ActionButtonModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDataEditorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RxIframeModule,
                        RxBusyIndicatorModule,
                        TranslateModule,
                        RecordGridModule,
                        AdaptButtonModule,
                        RxDefinitionModule,
                        ActionButtonModule
                    ],
                    declarations: [RecordDataEditorComponent],
                    exports: [RecordDataEditorComponent]
                }]
        }] });
//# sourceMappingURL=record-data-editor.module.js.map