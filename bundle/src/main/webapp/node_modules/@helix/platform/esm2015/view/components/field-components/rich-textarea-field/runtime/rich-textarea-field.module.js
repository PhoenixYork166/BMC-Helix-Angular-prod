import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdaptRxFormControlModule } from '@bmc-ux/adapt-angular';
import { TranslateModule } from '@ngx-translate/core';
import { CKEditorModule } from 'ckeditor4-angular';
import { RichTextareaFieldComponent } from './rich-textarea-field.component';
import * as i0 from "@angular/core";
export class RichTextareaFieldModule {
}
RichTextareaFieldModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RichTextareaFieldModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RichTextareaFieldModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RichTextareaFieldModule, declarations: [RichTextareaFieldComponent], imports: [CommonModule, FormsModule, AdaptRxFormControlModule, TranslateModule, ReactiveFormsModule, CKEditorModule] });
RichTextareaFieldModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RichTextareaFieldModule, imports: [[CommonModule, FormsModule, AdaptRxFormControlModule, TranslateModule, ReactiveFormsModule, CKEditorModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RichTextareaFieldModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, AdaptRxFormControlModule, TranslateModule, ReactiveFormsModule, CKEditorModule],
                    declarations: [RichTextareaFieldComponent],
                    entryComponents: [RichTextareaFieldComponent]
                }]
        }] });
//# sourceMappingURL=rich-textarea-field.module.js.map