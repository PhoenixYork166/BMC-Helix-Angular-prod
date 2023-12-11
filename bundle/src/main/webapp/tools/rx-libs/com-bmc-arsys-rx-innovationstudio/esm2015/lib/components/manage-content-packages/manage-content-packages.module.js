import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdaptBusyModule, AdaptButtonModule, AdaptButtonGroupModule, AdaptRxLabelModule, AdaptRxSelectModule, AdaptRxTextfieldModule } from '@bmc-ux/adapt-angular';
import { AdaptTableModule } from '@bmc-ux/adapt-table';
import { RxBusyIndicatorModule } from '@helix/platform/ui-kit';
import { RecordGridModule } from '@helix/platform/view/components';
import { TranslateModule } from '@ngx-translate/core';
import { ManageContentPackagesComponent } from './manage-content-packages.component';
import * as i0 from "@angular/core";
export class ManageContentPackagesModule {
}
/** @nocollapse */ ManageContentPackagesModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ManageContentPackagesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ ManageContentPackagesModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ManageContentPackagesModule, declarations: [ManageContentPackagesComponent], imports: [AdaptButtonModule,
        AdaptButtonGroupModule,
        AdaptRxSelectModule,
        AdaptRxTextfieldModule,
        CommonModule,
        FormsModule,
        TranslateModule,
        RxBusyIndicatorModule,
        ReactiveFormsModule,
        RecordGridModule,
        AdaptRxLabelModule,
        AdaptTableModule,
        AdaptBusyModule] });
/** @nocollapse */ ManageContentPackagesModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ManageContentPackagesModule, providers: [DatePipe], imports: [[
            AdaptButtonModule,
            AdaptButtonGroupModule,
            AdaptRxSelectModule,
            AdaptRxTextfieldModule,
            CommonModule,
            FormsModule,
            TranslateModule,
            RxBusyIndicatorModule,
            ReactiveFormsModule,
            RecordGridModule,
            AdaptRxLabelModule,
            AdaptTableModule,
            AdaptBusyModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ManageContentPackagesModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ManageContentPackagesComponent],
                    imports: [
                        AdaptButtonModule,
                        AdaptButtonGroupModule,
                        AdaptRxSelectModule,
                        AdaptRxTextfieldModule,
                        CommonModule,
                        FormsModule,
                        TranslateModule,
                        RxBusyIndicatorModule,
                        ReactiveFormsModule,
                        RecordGridModule,
                        AdaptRxLabelModule,
                        AdaptTableModule,
                        AdaptBusyModule
                    ],
                    providers: [DatePipe]
                }]
        }] });
//# sourceMappingURL=manage-content-packages.module.js.map