import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadOnlyFieldsComponent } from './read-only-fields.component';
import { ReadOnlyFieldModule } from '../read-only-field/read-only-field.module';
import * as i0 from "@angular/core";
export class ReadOnlyFieldsModule {
}
ReadOnlyFieldsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ReadOnlyFieldsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ReadOnlyFieldsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ReadOnlyFieldsModule, declarations: [ReadOnlyFieldsComponent], imports: [CommonModule, ReadOnlyFieldModule], exports: [ReadOnlyFieldsComponent] });
ReadOnlyFieldsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ReadOnlyFieldsModule, imports: [[CommonModule, ReadOnlyFieldModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ReadOnlyFieldsModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ReadOnlyFieldsComponent],
                    imports: [CommonModule, ReadOnlyFieldModule],
                    exports: [ReadOnlyFieldsComponent]
                }]
        }] });
//# sourceMappingURL=read-only-fields.module.js.map