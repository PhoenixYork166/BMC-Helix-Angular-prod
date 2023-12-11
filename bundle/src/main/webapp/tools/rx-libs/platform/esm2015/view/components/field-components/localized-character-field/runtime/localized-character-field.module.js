import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdaptBusyModule, AdaptButtonModule, AdaptRxFormControlModule, AdaptRxTextfieldModule, AdaptTooltipModule } from '@bmc-ux/adapt-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ReadOnlyFieldModule, RxBusyIndicatorModule } from '@helix/platform/ui-kit';
import { LocalizedCharacterFieldComponent } from './localized-character-field.component';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
export class RxLocalizedCharacterFieldModule {
}
RxLocalizedCharacterFieldModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLocalizedCharacterFieldModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxLocalizedCharacterFieldModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLocalizedCharacterFieldModule, declarations: [LocalizedCharacterFieldComponent], imports: [CommonModule,
        FormsModule,
        AdaptRxFormControlModule,
        ReadOnlyFieldModule,
        AdaptTooltipModule,
        AdaptButtonModule,
        TranslateModule, i1.AdaptBusyModule, RxBusyIndicatorModule,
        AdaptRxTextfieldModule,
        ReactiveFormsModule] });
RxLocalizedCharacterFieldModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLocalizedCharacterFieldModule, imports: [[
            CommonModule,
            FormsModule,
            AdaptRxFormControlModule,
            ReadOnlyFieldModule,
            AdaptTooltipModule,
            AdaptButtonModule,
            TranslateModule,
            AdaptBusyModule.forRoot(),
            RxBusyIndicatorModule,
            AdaptRxTextfieldModule,
            ReactiveFormsModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLocalizedCharacterFieldModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        AdaptRxFormControlModule,
                        ReadOnlyFieldModule,
                        AdaptTooltipModule,
                        AdaptButtonModule,
                        TranslateModule,
                        AdaptBusyModule.forRoot(),
                        RxBusyIndicatorModule,
                        AdaptRxTextfieldModule,
                        ReactiveFormsModule
                    ],
                    declarations: [LocalizedCharacterFieldComponent],
                    entryComponents: [LocalizedCharacterFieldComponent]
                }]
        }] });
//# sourceMappingURL=localized-character-field.module.js.map