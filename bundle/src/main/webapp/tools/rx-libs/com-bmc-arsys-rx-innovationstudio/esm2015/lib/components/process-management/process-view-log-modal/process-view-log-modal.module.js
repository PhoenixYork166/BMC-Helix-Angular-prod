import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessViewLogModalComponent } from './process-view-log-modal.component';
import { TranslateModule } from '@ngx-translate/core';
import { AdaptButtonModule } from '@bmc-ux/adapt-angular';
import { RxProcessPreviewModule } from '@helix/platform/process/components';
import { AdaptEmptyStateModule } from '@bmc-ux/adapt-angular';
import * as i0 from "@angular/core";
export class ProcessViewLogModalModule {
}
/** @nocollapse */ ProcessViewLogModalModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessViewLogModalModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ ProcessViewLogModalModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessViewLogModalModule, declarations: [ProcessViewLogModalComponent], imports: [CommonModule, TranslateModule, AdaptButtonModule, AdaptEmptyStateModule, RxProcessPreviewModule] });
/** @nocollapse */ ProcessViewLogModalModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessViewLogModalModule, imports: [[CommonModule, TranslateModule, AdaptButtonModule, AdaptEmptyStateModule, RxProcessPreviewModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessViewLogModalModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ProcessViewLogModalComponent],
                    imports: [CommonModule, TranslateModule, AdaptButtonModule, AdaptEmptyStateModule, RxProcessPreviewModule]
                }]
        }] });
//# sourceMappingURL=process-view-log-modal.module.js.map