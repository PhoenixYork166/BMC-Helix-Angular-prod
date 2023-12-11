import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdaptRxCounterModule, AdaptRxValidatorsModule } from '@bmc-ux/adapt-angular';
import { AdaptTextFieldFormBuilderModule } from '@bmc-ux/obsolete';
import { ReadOnlyFieldModule } from '@helix/platform/ui-kit';
import { IntegerFieldComponent } from './integer-field.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import * as i0 from "@angular/core";
export class IntegerFieldModule {
}
IntegerFieldModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IntegerFieldModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
IntegerFieldModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IntegerFieldModule, declarations: [IntegerFieldComponent], imports: [AdaptTextFieldFormBuilderModule,
        AdaptRxCounterModule,
        AdaptRxValidatorsModule,
        CommonModule,
        ReadOnlyFieldModule,
        ReactiveFormsModule,
        TranslateModule] });
IntegerFieldModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IntegerFieldModule, imports: [[
            AdaptTextFieldFormBuilderModule,
            AdaptRxCounterModule,
            AdaptRxValidatorsModule,
            CommonModule,
            ReadOnlyFieldModule,
            ReactiveFormsModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IntegerFieldModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AdaptTextFieldFormBuilderModule,
                        AdaptRxCounterModule,
                        AdaptRxValidatorsModule,
                        CommonModule,
                        ReadOnlyFieldModule,
                        ReactiveFormsModule,
                        TranslateModule
                    ],
                    declarations: [IntegerFieldComponent],
                    entryComponents: [IntegerFieldComponent]
                }]
        }] });
//# sourceMappingURL=integer-field.module.js.map