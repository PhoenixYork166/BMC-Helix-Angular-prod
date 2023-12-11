import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdaptRxCounterModule, AdaptRxValidatorsModule } from '@bmc-ux/adapt-angular';
import { AdaptTextFieldFormBuilderModule } from '@bmc-ux/obsolete';
import { ReadOnlyFieldModule } from '@helix/platform/ui-kit';
import { DecimalFieldComponent } from './decimal-field.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import * as i0 from "@angular/core";
export class DecimalFieldModule {
}
DecimalFieldModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DecimalFieldModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DecimalFieldModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DecimalFieldModule, declarations: [DecimalFieldComponent], imports: [AdaptTextFieldFormBuilderModule,
        AdaptRxCounterModule,
        AdaptRxValidatorsModule,
        CommonModule,
        ReactiveFormsModule,
        ReadOnlyFieldModule,
        TranslateModule] });
DecimalFieldModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DecimalFieldModule, imports: [[
            AdaptTextFieldFormBuilderModule,
            AdaptRxCounterModule,
            AdaptRxValidatorsModule,
            CommonModule,
            ReactiveFormsModule,
            ReadOnlyFieldModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DecimalFieldModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AdaptTextFieldFormBuilderModule,
                        AdaptRxCounterModule,
                        AdaptRxValidatorsModule,
                        CommonModule,
                        ReactiveFormsModule,
                        ReadOnlyFieldModule,
                        TranslateModule
                    ],
                    declarations: [DecimalFieldComponent],
                    entryComponents: [DecimalFieldComponent]
                }]
        }] });
//# sourceMappingURL=decimal-field.module.js.map