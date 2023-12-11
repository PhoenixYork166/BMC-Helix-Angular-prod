import { RxDefinitionAdapterRegistryService } from '@helix/platform/shared/api';
import { ViewPresetSelectorAdapterService } from './view-preset-selector-adapter.service';
import * as i0 from "@angular/core";
import * as i1 from "./rename-view-preset/rename-view-preset.component";
import * as i2 from "./view-preset-selector.component";
import * as i3 from "@bmc-ux/adapt-angular";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
import * as i6 from "@helix/platform/utils";
import * as i7 from "@ngx-translate/core";
import * as i8 from "./share-view-preset/share-view-preset.module";
import * as i9 from "./add-shared-view-presets/add-shared-view-presets.module";
export declare class ViewPresetSelectorModule {
    private rxDefinitionAdapterRegistryService;
    private viewPresetSelectorAdapterService;
    constructor(rxDefinitionAdapterRegistryService: RxDefinitionAdapterRegistryService, viewPresetSelectorAdapterService: ViewPresetSelectorAdapterService);
    static ɵfac: i0.ɵɵFactoryDeclaration<ViewPresetSelectorModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ViewPresetSelectorModule, [typeof i1.RenameViewPresetComponent, typeof i2.ViewPresetSelectorComponent], [typeof i3.AdaptButtonModule, typeof i3.AdaptDropdownModule, typeof i3.AdaptRxTextfieldModule, typeof i3.AdaptTooltipModule, typeof i4.CommonModule, typeof i5.ReactiveFormsModule, typeof i6.RxUniqueValidatorModule, typeof i7.TranslateModule, typeof i6.RxNoWhitespaceValidatorModule, typeof i8.ShareViewPresetModule, typeof i9.AddSharedViewPresetsModule, typeof i3.AdaptIconModule], [typeof i2.ViewPresetSelectorComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ViewPresetSelectorModule>;
}
