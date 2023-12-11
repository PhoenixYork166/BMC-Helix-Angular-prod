import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdaptButtonModule, AdaptRxFormControlModule, AdaptRxTextfieldModule } from '@bmc-ux/adapt-angular';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizedCharacterFieldValueModalComponent } from './localized-character-field-value-modal.component';
import { RxBusyIndicatorModule } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
export class RxLocalizedCharacterFieldValueModalModule {
}
RxLocalizedCharacterFieldValueModalModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLocalizedCharacterFieldValueModalModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxLocalizedCharacterFieldValueModalModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLocalizedCharacterFieldValueModalModule, declarations: [LocalizedCharacterFieldValueModalComponent], imports: [FormsModule,
        CommonModule,
        ReactiveFormsModule,
        AdaptRxFormControlModule,
        AdaptRxTextfieldModule,
        AdaptButtonModule,
        RxBusyIndicatorModule,
        TranslateModule], exports: [LocalizedCharacterFieldValueModalComponent] });
RxLocalizedCharacterFieldValueModalModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLocalizedCharacterFieldValueModalModule, imports: [[
            FormsModule,
            CommonModule,
            ReactiveFormsModule,
            AdaptRxFormControlModule,
            AdaptRxTextfieldModule,
            AdaptButtonModule,
            RxBusyIndicatorModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLocalizedCharacterFieldValueModalModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        FormsModule,
                        CommonModule,
                        ReactiveFormsModule,
                        AdaptRxFormControlModule,
                        AdaptRxTextfieldModule,
                        AdaptButtonModule,
                        RxBusyIndicatorModule,
                        TranslateModule
                    ],
                    declarations: [LocalizedCharacterFieldValueModalComponent],
                    exports: [LocalizedCharacterFieldValueModalComponent]
                }]
        }] });
//# sourceMappingURL=localized-character-field-value-modal.module.js.map