import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessRunModalComponent } from './process-run-modal.component';
import { FormsModule } from '@angular/forms';
import { RxFormBuilderModule } from '@helix/platform/shared/components';
import { TranslateModule } from '@ngx-translate/core';
import { AdaptButtonModule } from '@bmc-ux/adapt-angular';
import * as i0 from "@angular/core";
export class ProcessRunModalModule {
}
/** @nocollapse */ ProcessRunModalModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessRunModalModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ ProcessRunModalModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessRunModalModule, declarations: [ProcessRunModalComponent], imports: [CommonModule, FormsModule, RxFormBuilderModule, TranslateModule, AdaptButtonModule] });
/** @nocollapse */ ProcessRunModalModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessRunModalModule, imports: [[CommonModule, FormsModule, RxFormBuilderModule, TranslateModule, AdaptButtonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessRunModalModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ProcessRunModalComponent],
                    imports: [CommonModule, FormsModule, RxFormBuilderModule, TranslateModule, AdaptButtonModule]
                }]
        }] });
//# sourceMappingURL=process-run-modal.module.js.map