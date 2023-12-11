import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadOnlyFieldsModalComponent } from './read-only-fields-modal.component';
import { ReadOnlyFieldModule } from '../read-only-field/read-only-field.module';
import { TranslateModule } from '@ngx-translate/core';
import { ReadOnlyFieldsModule } from '../read-only-fields/read-only-fields.module';
import { AdaptButtonModule } from '@bmc-ux/adapt-angular';
import * as i0 from "@angular/core";
export class ReadOnlyFieldsModalModule {
}
ReadOnlyFieldsModalModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ReadOnlyFieldsModalModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ReadOnlyFieldsModalModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ReadOnlyFieldsModalModule, declarations: [ReadOnlyFieldsModalComponent], imports: [CommonModule, ReadOnlyFieldModule, TranslateModule, ReadOnlyFieldsModule, AdaptButtonModule], exports: [ReadOnlyFieldsModalComponent] });
ReadOnlyFieldsModalModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ReadOnlyFieldsModalModule, imports: [[CommonModule, ReadOnlyFieldModule, TranslateModule, ReadOnlyFieldsModule, AdaptButtonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ReadOnlyFieldsModalModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ReadOnlyFieldsModalComponent],
                    imports: [CommonModule, ReadOnlyFieldModule, TranslateModule, ReadOnlyFieldsModule, AdaptButtonModule],
                    exports: [ReadOnlyFieldsModalComponent]
                }]
        }] });
//# sourceMappingURL=read-only-fields-modal.module.js.map