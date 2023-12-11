import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RxIframeModule } from '@helix/platform/shared/components';
import { RxBusyIndicatorModule } from '@helix/platform/ui-kit';
import { DesignerFrameComponent } from './designer-frame.component';
import * as i0 from "@angular/core";
export class DesignerFrameModule {
}
/** @nocollapse */ DesignerFrameModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DesignerFrameModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ DesignerFrameModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DesignerFrameModule, declarations: [DesignerFrameComponent], imports: [CommonModule, RxIframeModule, RxBusyIndicatorModule], exports: [DesignerFrameComponent] });
/** @nocollapse */ DesignerFrameModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DesignerFrameModule, imports: [[CommonModule, RxIframeModule, RxBusyIndicatorModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DesignerFrameModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RxIframeModule, RxBusyIndicatorModule],
                    declarations: [DesignerFrameComponent],
                    exports: [DesignerFrameComponent]
                }]
        }] });
//# sourceMappingURL=designer-frame.module.js.map