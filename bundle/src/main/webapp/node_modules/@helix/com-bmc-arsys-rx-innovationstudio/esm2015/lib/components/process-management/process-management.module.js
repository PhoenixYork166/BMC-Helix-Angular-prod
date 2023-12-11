import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessManagementComponent } from './process-management.component';
import { RxBusyIndicatorModule } from '@helix/platform/ui-kit';
import { AdaptButtonModule, AdaptDockedPanelModule, AdaptEmptyStateModule, AdaptIconModule, AdaptRxFormControlModule, AdaptRxSelectModule, AdaptSidebarModule, AdaptTabsModule, AdaptTooltipModule, AdaptTreeModule } from '@bmc-ux/adapt-angular';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { RecordGridModule } from '@helix/platform/view/components';
import { RxDefinitionModule } from '@helix/platform/shared/api';
import { RxFormBuilderModule } from '@helix/platform/shared/components';
import { ProcessRunModalModule } from './process-run-modal/process-run-modal.module';
import { ProcessPreviewModalModule } from './process-preview-modal/process-preview-modal.module';
import { ProcessViewLogModalModule } from './process-view-log-modal/process-view-log-modal.module';
import { RxBreadcrumbBarModule } from '@helix/platform/ui-kit';
import { RouterModule } from '@angular/router';
import * as i0 from "@angular/core";
export class ProcessManagementModule {
}
/** @nocollapse */ ProcessManagementModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessManagementModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ ProcessManagementModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessManagementModule, declarations: [ProcessManagementComponent], imports: [CommonModule,
        AdaptButtonModule,
        AdaptDockedPanelModule,
        TranslateModule,
        AdaptIconModule,
        AdaptTreeModule,
        AdaptTabsModule,
        AdaptRxSelectModule,
        AdaptRxFormControlModule,
        FormsModule,
        RxDefinitionModule,
        RecordGridModule,
        ProcessPreviewModalModule,
        ProcessViewLogModalModule,
        ProcessRunModalModule,
        RxFormBuilderModule,
        RxBusyIndicatorModule,
        RxBreadcrumbBarModule,
        AdaptTooltipModule,
        AdaptEmptyStateModule,
        AdaptSidebarModule,
        RouterModule] });
/** @nocollapse */ ProcessManagementModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessManagementModule, imports: [[
            CommonModule,
            AdaptButtonModule,
            AdaptDockedPanelModule,
            TranslateModule,
            AdaptIconModule,
            AdaptTreeModule,
            AdaptTabsModule,
            AdaptRxSelectModule,
            AdaptRxFormControlModule,
            FormsModule,
            RxDefinitionModule,
            RecordGridModule,
            ProcessPreviewModalModule,
            ProcessViewLogModalModule,
            ProcessRunModalModule,
            RxFormBuilderModule,
            RxBusyIndicatorModule,
            RxBreadcrumbBarModule,
            AdaptTooltipModule,
            AdaptEmptyStateModule,
            AdaptSidebarModule,
            RouterModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessManagementModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ProcessManagementComponent],
                    imports: [
                        CommonModule,
                        AdaptButtonModule,
                        AdaptDockedPanelModule,
                        TranslateModule,
                        AdaptIconModule,
                        AdaptTreeModule,
                        AdaptTabsModule,
                        AdaptRxSelectModule,
                        AdaptRxFormControlModule,
                        FormsModule,
                        RxDefinitionModule,
                        RecordGridModule,
                        ProcessPreviewModalModule,
                        ProcessViewLogModalModule,
                        ProcessRunModalModule,
                        RxFormBuilderModule,
                        RxBusyIndicatorModule,
                        RxBreadcrumbBarModule,
                        AdaptTooltipModule,
                        AdaptEmptyStateModule,
                        AdaptSidebarModule,
                        RouterModule
                    ]
                }]
        }] });
//# sourceMappingURL=process-management.module.js.map