import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewPresetSelectorDesignComponent } from './view-preset-selector-design.component';
import { PresetsListWidgetModule } from './presets-list-widget/presets-list-widget.module';
import { AdaptButtonModule } from '@bmc-ux/adapt-angular';
import * as i0 from "@angular/core";
export class ViewPresetSelectorDesignModule {
}
ViewPresetSelectorDesignModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewPresetSelectorDesignModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ViewPresetSelectorDesignModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewPresetSelectorDesignModule, declarations: [ViewPresetSelectorDesignComponent], imports: [CommonModule, PresetsListWidgetModule, AdaptButtonModule] });
ViewPresetSelectorDesignModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewPresetSelectorDesignModule, imports: [[CommonModule, PresetsListWidgetModule, AdaptButtonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewPresetSelectorDesignModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, PresetsListWidgetModule, AdaptButtonModule],
                    declarations: [ViewPresetSelectorDesignComponent],
                    entryComponents: [ViewPresetSelectorDesignComponent]
                }]
        }] });
//# sourceMappingURL=view-preset-selector-design.module.js.map