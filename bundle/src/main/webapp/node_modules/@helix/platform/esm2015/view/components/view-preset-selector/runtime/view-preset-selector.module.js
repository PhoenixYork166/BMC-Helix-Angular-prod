import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AdaptButtonModule, AdaptDropdownModule, AdaptIconModule, AdaptRxTextfieldModule, AdaptTooltipModule } from '@bmc-ux/adapt-angular';
import { RxNoWhitespaceValidatorModule, RxUniqueValidatorModule } from '@helix/platform/utils';
import { RxDefinitionAdapterRegistryService } from '@helix/platform/shared/api';
import { RxViewComponentType } from '@helix/platform/view/api';
import { ViewPresetSelectorComponent } from './view-preset-selector.component';
import { ViewPresetSelectorAdapterService } from './view-preset-selector-adapter.service';
import { RenameViewPresetComponent } from './rename-view-preset/rename-view-preset.component';
import { ShareViewPresetModule } from './share-view-preset/share-view-preset.module';
import { AddSharedViewPresetsModule } from './add-shared-view-presets/add-shared-view-presets.module';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "./view-preset-selector-adapter.service";
export class ViewPresetSelectorModule {
    constructor(rxDefinitionAdapterRegistryService, viewPresetSelectorAdapterService) {
        this.rxDefinitionAdapterRegistryService = rxDefinitionAdapterRegistryService;
        this.viewPresetSelectorAdapterService = viewPresetSelectorAdapterService;
        rxDefinitionAdapterRegistryService.registerRuntimeAdapter(RxViewComponentType.ViewPresetSelector, this.viewPresetSelectorAdapterService);
    }
}
ViewPresetSelectorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewPresetSelectorModule, deps: [{ token: i1.RxDefinitionAdapterRegistryService }, { token: i2.ViewPresetSelectorAdapterService }], target: i0.ɵɵFactoryTarget.NgModule });
ViewPresetSelectorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewPresetSelectorModule, declarations: [RenameViewPresetComponent, ViewPresetSelectorComponent], imports: [AdaptButtonModule,
        AdaptDropdownModule,
        AdaptRxTextfieldModule,
        AdaptTooltipModule,
        CommonModule,
        ReactiveFormsModule,
        RxUniqueValidatorModule,
        TranslateModule,
        RxNoWhitespaceValidatorModule,
        ShareViewPresetModule,
        AddSharedViewPresetsModule,
        AdaptIconModule], exports: [ViewPresetSelectorComponent] });
ViewPresetSelectorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewPresetSelectorModule, providers: [ViewPresetSelectorAdapterService], imports: [[
            AdaptButtonModule,
            AdaptDropdownModule,
            AdaptRxTextfieldModule,
            AdaptTooltipModule,
            CommonModule,
            ReactiveFormsModule,
            RxUniqueValidatorModule,
            TranslateModule,
            RxNoWhitespaceValidatorModule,
            ShareViewPresetModule,
            AddSharedViewPresetsModule,
            AdaptIconModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewPresetSelectorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AdaptButtonModule,
                        AdaptDropdownModule,
                        AdaptRxTextfieldModule,
                        AdaptTooltipModule,
                        CommonModule,
                        ReactiveFormsModule,
                        RxUniqueValidatorModule,
                        TranslateModule,
                        RxNoWhitespaceValidatorModule,
                        ShareViewPresetModule,
                        AddSharedViewPresetsModule,
                        AdaptIconModule
                    ],
                    exports: [ViewPresetSelectorComponent],
                    declarations: [RenameViewPresetComponent, ViewPresetSelectorComponent],
                    entryComponents: [ViewPresetSelectorComponent],
                    providers: [ViewPresetSelectorAdapterService]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxDefinitionAdapterRegistryService }, { type: i2.ViewPresetSelectorAdapterService }]; } });
//# sourceMappingURL=view-preset-selector.module.js.map