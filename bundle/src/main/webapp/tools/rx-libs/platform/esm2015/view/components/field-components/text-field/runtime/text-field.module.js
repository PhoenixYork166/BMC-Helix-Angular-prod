import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AdaptRxTextfieldModule } from '@bmc-ux/adapt-angular';
import { TranslateModule } from '@ngx-translate/core';
import { RxSelectWithPaginationModule } from '@helix/platform/shared/components';
import { ReadOnlyFieldModule } from '@helix/platform/ui-kit';
import { TextFieldComponent } from './text-field.component';
import * as i0 from "@angular/core";
export class TextFieldModule {
}
TextFieldModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TextFieldModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TextFieldModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TextFieldModule, declarations: [TextFieldComponent], imports: [CommonModule,
        ReadOnlyFieldModule,
        ReactiveFormsModule,
        TranslateModule,
        RxSelectWithPaginationModule,
        AdaptRxTextfieldModule], exports: [TextFieldComponent] });
TextFieldModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TextFieldModule, imports: [[
            CommonModule,
            ReadOnlyFieldModule,
            ReactiveFormsModule,
            TranslateModule,
            RxSelectWithPaginationModule,
            AdaptRxTextfieldModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TextFieldModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ReadOnlyFieldModule,
                        ReactiveFormsModule,
                        TranslateModule,
                        RxSelectWithPaginationModule,
                        AdaptRxTextfieldModule
                    ],
                    declarations: [TextFieldComponent],
                    exports: [TextFieldComponent],
                    entryComponents: [TextFieldComponent]
                }]
        }] });
//# sourceMappingURL=text-field.module.js.map