import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxNameValuePairsEditorComponent } from './name-value-pairs-editor.component';
import { AdaptRxTextfieldModule, AdaptButtonModule } from '@bmc-ux/adapt-angular';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export class RxNameValuePairsEditorModule {
}
RxNameValuePairsEditorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNameValuePairsEditorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxNameValuePairsEditorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNameValuePairsEditorModule, declarations: [RxNameValuePairsEditorComponent], imports: [CommonModule, AdaptRxTextfieldModule, AdaptButtonModule, FormsModule, TranslateModule], exports: [RxNameValuePairsEditorComponent] });
RxNameValuePairsEditorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNameValuePairsEditorModule, imports: [[CommonModule, AdaptRxTextfieldModule, AdaptButtonModule, FormsModule, TranslateModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNameValuePairsEditorModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxNameValuePairsEditorComponent],
                    imports: [CommonModule, AdaptRxTextfieldModule, AdaptButtonModule, FormsModule, TranslateModule],
                    exports: [RxNameValuePairsEditorComponent]
                }]
        }] });
//# sourceMappingURL=name-value-pairs-editor.module.js.map