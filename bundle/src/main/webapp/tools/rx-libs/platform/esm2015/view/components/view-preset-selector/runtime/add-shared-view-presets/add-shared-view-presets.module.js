import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSharedViewPresetsComponent } from './add-shared-view-presets.component';
import { TranslateModule } from '@ngx-translate/core';
import { AdaptButtonModule } from '@bmc-ux/adapt-angular';
import { RecordGridModule } from '../../../record-grid/runtime/record-grid.module';
import * as i0 from "@angular/core";
export class AddSharedViewPresetsModule {
}
AddSharedViewPresetsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AddSharedViewPresetsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AddSharedViewPresetsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AddSharedViewPresetsModule, declarations: [AddSharedViewPresetsComponent], imports: [CommonModule, TranslateModule, AdaptButtonModule, RecordGridModule] });
AddSharedViewPresetsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AddSharedViewPresetsModule, imports: [[CommonModule, TranslateModule, AdaptButtonModule, RecordGridModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AddSharedViewPresetsModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [AddSharedViewPresetsComponent],
                    imports: [CommonModule, TranslateModule, AdaptButtonModule, RecordGridModule]
                }]
        }] });
//# sourceMappingURL=add-shared-view-presets.module.js.map