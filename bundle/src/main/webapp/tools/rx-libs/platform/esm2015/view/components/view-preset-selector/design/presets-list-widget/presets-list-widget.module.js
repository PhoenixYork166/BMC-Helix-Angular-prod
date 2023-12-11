import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresetsListWidgetComponent } from './presets-list-widget.component';
import { AdaptRxListBuilderModule } from '@bmc-ux/adapt-angular';
import { FormsModule } from '@angular/forms';
import * as i0 from "@angular/core";
export class PresetsListWidgetModule {
}
PresetsListWidgetModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: PresetsListWidgetModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PresetsListWidgetModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: PresetsListWidgetModule, declarations: [PresetsListWidgetComponent], imports: [CommonModule, AdaptRxListBuilderModule, FormsModule], exports: [PresetsListWidgetComponent] });
PresetsListWidgetModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: PresetsListWidgetModule, imports: [[CommonModule, AdaptRxListBuilderModule, FormsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: PresetsListWidgetModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [PresetsListWidgetComponent],
                    exports: [PresetsListWidgetComponent],
                    imports: [CommonModule, AdaptRxListBuilderModule, FormsModule]
                }]
        }] });
//# sourceMappingURL=presets-list-widget.module.js.map