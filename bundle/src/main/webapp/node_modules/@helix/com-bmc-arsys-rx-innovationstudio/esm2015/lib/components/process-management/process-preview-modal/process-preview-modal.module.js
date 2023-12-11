import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessPreviewModalComponent } from './process-preview-modal.component';
import { TranslateModule } from '@ngx-translate/core';
import { AdaptButtonModule } from '@bmc-ux/adapt-angular';
import { RxProcessPreviewModule } from '@helix/platform/process/components';
import * as i0 from "@angular/core";
export class ProcessPreviewModalModule {
}
/** @nocollapse */ ProcessPreviewModalModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessPreviewModalModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ ProcessPreviewModalModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessPreviewModalModule, declarations: [ProcessPreviewModalComponent], imports: [CommonModule, TranslateModule, AdaptButtonModule, RxProcessPreviewModule] });
/** @nocollapse */ ProcessPreviewModalModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessPreviewModalModule, imports: [[CommonModule, TranslateModule, AdaptButtonModule, RxProcessPreviewModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessPreviewModalModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ProcessPreviewModalComponent],
                    imports: [CommonModule, TranslateModule, AdaptButtonModule, RxProcessPreviewModule]
                }]
        }] });
//# sourceMappingURL=process-preview-modal.module.js.map