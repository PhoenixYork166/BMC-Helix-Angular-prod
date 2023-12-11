import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordGridViewPresetsWidgetComponent } from './record-grid-view-presets-widget.component';
import { AdaptButtonModule } from '@bmc-ux/adapt-angular';
import { FormsModule } from '@angular/forms';
import { RecordGridEditViewPresetsModalModule } from './record-grid-edit-view-presets-modal/record-grid-edit-view-presets-modal.module';
import { SelectFormControlModule } from '@helix/platform/shared/components';
import * as i0 from "@angular/core";
export class RecordGridViewPresetsWidgetModule {
}
RecordGridViewPresetsWidgetModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridViewPresetsWidgetModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RecordGridViewPresetsWidgetModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridViewPresetsWidgetModule, declarations: [RecordGridViewPresetsWidgetComponent], imports: [CommonModule, AdaptButtonModule, FormsModule, RecordGridEditViewPresetsModalModule, SelectFormControlModule], exports: [RecordGridViewPresetsWidgetComponent] });
RecordGridViewPresetsWidgetModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridViewPresetsWidgetModule, imports: [[CommonModule, AdaptButtonModule, FormsModule, RecordGridEditViewPresetsModalModule, SelectFormControlModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridViewPresetsWidgetModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RecordGridViewPresetsWidgetComponent],
                    exports: [RecordGridViewPresetsWidgetComponent],
                    imports: [CommonModule, AdaptButtonModule, FormsModule, RecordGridEditViewPresetsModalModule, SelectFormControlModule]
                }]
        }] });
//# sourceMappingURL=record-grid-view-presets-widget.module.js.map