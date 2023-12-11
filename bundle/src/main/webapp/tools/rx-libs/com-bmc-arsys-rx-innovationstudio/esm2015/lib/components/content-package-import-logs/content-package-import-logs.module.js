import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdaptBusyModule, AdaptButtonModule, AdaptButtonGroupModule, AdaptRxLabelModule, AdaptRxSelectModule, AdaptRxTextfieldModule } from '@bmc-ux/adapt-angular';
import { AdaptTableModule } from '@bmc-ux/adapt-table';
import { RxBusyIndicatorModule } from '@helix/platform/ui-kit';
import { RecordGridModule } from '@helix/platform/view/components';
import { TranslateModule } from '@ngx-translate/core';
import { ContentPackageImportLogsComponent } from './content-package-import-logs.component';
import * as i0 from "@angular/core";
export class ContentPackageImportLogsModule {
}
/** @nocollapse */ ContentPackageImportLogsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ContentPackageImportLogsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ ContentPackageImportLogsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ContentPackageImportLogsModule, declarations: [ContentPackageImportLogsComponent], imports: [AdaptButtonModule,
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
/** @nocollapse */ ContentPackageImportLogsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ContentPackageImportLogsModule, providers: [DatePipe], imports: [[
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ContentPackageImportLogsModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ContentPackageImportLogsComponent],
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
//# sourceMappingURL=content-package-import-logs.module.js.map