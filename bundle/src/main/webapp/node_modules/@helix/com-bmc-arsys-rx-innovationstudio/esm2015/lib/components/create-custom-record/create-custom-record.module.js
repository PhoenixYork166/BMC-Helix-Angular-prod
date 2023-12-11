import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AdaptRxTextfieldModule, AdaptRxSelectModule, AdaptButtonModule, AdaptBusyModule } from '@bmc-ux/adapt-angular';
import { RxModalModule } from '@helix/platform/ui-kit';
import { CreateCustomRecordComponent } from './create-custom-record.component';
import * as i0 from "@angular/core";
export class CreateCustomRecordModule {
}
/** @nocollapse */ CreateCustomRecordModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CreateCustomRecordModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ CreateCustomRecordModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CreateCustomRecordModule, declarations: [CreateCustomRecordComponent], imports: [CommonModule,
        ReactiveFormsModule,
        RxModalModule,
        AdaptRxTextfieldModule,
        AdaptRxSelectModule,
        AdaptButtonModule,
        AdaptBusyModule,
        TranslateModule] });
/** @nocollapse */ CreateCustomRecordModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CreateCustomRecordModule, imports: [[
            CommonModule,
            ReactiveFormsModule,
            RxModalModule,
            AdaptRxTextfieldModule,
            AdaptRxSelectModule,
            AdaptButtonModule,
            AdaptBusyModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CreateCustomRecordModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        RxModalModule,
                        AdaptRxTextfieldModule,
                        AdaptRxSelectModule,
                        AdaptButtonModule,
                        AdaptBusyModule,
                        TranslateModule
                    ],
                    declarations: [CreateCustomRecordComponent]
                }]
        }] });
//# sourceMappingURL=create-custom-record.module.js.map