import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdaptButtonModule, AdaptDropdownModule, AdaptEmptyStateModule, AdaptHighlightModule, AdaptRxLabelModule, AdaptRxTextfieldModule } from '@bmc-ux/adapt-angular';
import { RxBusyIndicatorModule } from '@helix/platform/ui-kit';
import { RxDefinitionPickerCacheService } from './definition-picker-cache.service';
import { RxDefinitionPickerComponent } from './definition-picker.component';
import { RxDefinitionModule } from '@helix/platform/shared/api';
import { TranslateModule } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
export class RxDefinitionPickerModule {
}
RxDefinitionPickerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionPickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxDefinitionPickerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionPickerModule, declarations: [RxDefinitionPickerComponent], imports: [AdaptHighlightModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RxBusyIndicatorModule, i1.AdaptDropdownModule, AdaptButtonModule,
        RxDefinitionModule,
        AdaptRxLabelModule,
        AdaptRxTextfieldModule,
        AdaptEmptyStateModule,
        TranslateModule], exports: [RxDefinitionPickerComponent] });
RxDefinitionPickerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionPickerModule, providers: [RxDefinitionPickerCacheService], imports: [[
            AdaptHighlightModule,
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            RxBusyIndicatorModule,
            AdaptDropdownModule.forRoot(),
            AdaptButtonModule,
            RxDefinitionModule,
            AdaptRxLabelModule,
            AdaptRxTextfieldModule,
            AdaptEmptyStateModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionPickerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AdaptHighlightModule,
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        RxBusyIndicatorModule,
                        AdaptDropdownModule.forRoot(),
                        AdaptButtonModule,
                        RxDefinitionModule,
                        AdaptRxLabelModule,
                        AdaptRxTextfieldModule,
                        AdaptEmptyStateModule,
                        TranslateModule
                    ],
                    declarations: [RxDefinitionPickerComponent],
                    exports: [RxDefinitionPickerComponent],
                    providers: [RxDefinitionPickerCacheService]
                }]
        }] });
//# sourceMappingURL=definition-picker.module.js.map