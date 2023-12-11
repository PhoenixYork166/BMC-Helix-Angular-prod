import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxShellGlobalSearchRecordsModalComponent } from './shell-global-search-records-modal.component';
import { AdaptAccordionModule, AdaptButtonModule, AdaptEmptyStateModule, AdaptTreeModule } from '@bmc-ux/adapt-angular';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RxDefinitionPickerModule } from '@helix/platform/shared/components';
import { TranslateModule } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export class RxShellGlobalSearchRecordsModalModule {
}
RxShellGlobalSearchRecordsModalModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellGlobalSearchRecordsModalModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxShellGlobalSearchRecordsModalModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellGlobalSearchRecordsModalModule, declarations: [RxShellGlobalSearchRecordsModalComponent], imports: [CommonModule,
        FormsModule,
        DragDropModule,
        AdaptEmptyStateModule,
        AdaptButtonModule,
        AdaptAccordionModule,
        RxDefinitionPickerModule,
        AdaptTreeModule,
        TranslateModule], exports: [RxShellGlobalSearchRecordsModalComponent] });
RxShellGlobalSearchRecordsModalModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellGlobalSearchRecordsModalModule, imports: [[
            CommonModule,
            FormsModule,
            DragDropModule,
            AdaptEmptyStateModule,
            AdaptButtonModule,
            AdaptAccordionModule,
            RxDefinitionPickerModule,
            AdaptTreeModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellGlobalSearchRecordsModalModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxShellGlobalSearchRecordsModalComponent],
                    exports: [RxShellGlobalSearchRecordsModalComponent],
                    entryComponents: [RxShellGlobalSearchRecordsModalComponent],
                    imports: [
                        CommonModule,
                        FormsModule,
                        DragDropModule,
                        AdaptEmptyStateModule,
                        AdaptButtonModule,
                        AdaptAccordionModule,
                        RxDefinitionPickerModule,
                        AdaptTreeModule,
                        TranslateModule
                    ]
                }]
        }] });
//# sourceMappingURL=shell-global-search-records-modal.module.js.map