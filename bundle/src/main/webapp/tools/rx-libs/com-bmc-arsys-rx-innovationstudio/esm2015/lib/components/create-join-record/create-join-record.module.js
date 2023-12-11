import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AdaptRxTextfieldModule, AdaptRxSelectModule, AdaptButtonModule, AdaptBusyModule } from '@bmc-ux/adapt-angular';
import { RxModalModule } from '@helix/platform/ui-kit';
import { ExpressionFormControlModule, RxDefinitionPickerModule } from '@helix/platform/shared/components';
import { CreateJoinRecordComponent } from './create-join-record.component';
import * as i0 from "@angular/core";
export class CreateJoinRecordModule {
}
/** @nocollapse */ CreateJoinRecordModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CreateJoinRecordModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ CreateJoinRecordModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CreateJoinRecordModule, declarations: [CreateJoinRecordComponent], imports: [CommonModule,
        ReactiveFormsModule,
        RxModalModule,
        AdaptRxTextfieldModule,
        AdaptRxSelectModule,
        AdaptButtonModule,
        AdaptBusyModule,
        TranslateModule,
        ExpressionFormControlModule,
        RxDefinitionPickerModule] });
/** @nocollapse */ CreateJoinRecordModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CreateJoinRecordModule, imports: [[
            CommonModule,
            ReactiveFormsModule,
            RxModalModule,
            AdaptRxTextfieldModule,
            AdaptRxSelectModule,
            AdaptButtonModule,
            AdaptBusyModule,
            TranslateModule,
            ExpressionFormControlModule,
            RxDefinitionPickerModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CreateJoinRecordModule, decorators: [{
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
                        TranslateModule,
                        ExpressionFormControlModule,
                        RxDefinitionPickerModule
                    ],
                    declarations: [CreateJoinRecordComponent]
                }]
        }] });
//# sourceMappingURL=create-join-record.module.js.map