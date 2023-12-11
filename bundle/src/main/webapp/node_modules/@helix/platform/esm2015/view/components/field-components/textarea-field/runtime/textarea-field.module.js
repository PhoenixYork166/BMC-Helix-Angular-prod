import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AdaptRxTextareaModule } from '@bmc-ux/adapt-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ReadOnlyFieldModule } from '@helix/platform/ui-kit';
import { TextareaFieldComponent } from './textarea-field.component';
import * as i0 from "@angular/core";
export class TextareaFieldModule {
}
TextareaFieldModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TextareaFieldModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TextareaFieldModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TextareaFieldModule, declarations: [TextareaFieldComponent], imports: [CommonModule, ReactiveFormsModule, ReadOnlyFieldModule, TranslateModule, AdaptRxTextareaModule] });
TextareaFieldModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TextareaFieldModule, imports: [[CommonModule, ReactiveFormsModule, ReadOnlyFieldModule, TranslateModule, AdaptRxTextareaModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TextareaFieldModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, ReactiveFormsModule, ReadOnlyFieldModule, TranslateModule, AdaptRxTextareaModule],
                    declarations: [TextareaFieldComponent],
                    entryComponents: [TextareaFieldComponent]
                }]
        }] });
//# sourceMappingURL=textarea-field.module.js.map