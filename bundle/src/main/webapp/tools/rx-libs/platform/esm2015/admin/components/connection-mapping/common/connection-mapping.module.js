import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdaptRxSelectModule, AdaptRxTextfieldModule } from '@bmc-ux/adapt-angular';
import { ConnectionMappingComponent } from './connection-mapping.component';
import { TranslateModule } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export class RxConnectionMappingModule {
}
RxConnectionMappingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxConnectionMappingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxConnectionMappingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxConnectionMappingModule, declarations: [ConnectionMappingComponent], imports: [CommonModule, AdaptRxSelectModule, FormsModule, AdaptRxTextfieldModule, TranslateModule], exports: [ConnectionMappingComponent] });
RxConnectionMappingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxConnectionMappingModule, imports: [[CommonModule, AdaptRxSelectModule, FormsModule, AdaptRxTextfieldModule, TranslateModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxConnectionMappingModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, AdaptRxSelectModule, FormsModule, AdaptRxTextfieldModule, TranslateModule],
                    declarations: [ConnectionMappingComponent],
                    exports: [ConnectionMappingComponent]
                }]
        }] });
//# sourceMappingURL=connection-mapping.module.js.map