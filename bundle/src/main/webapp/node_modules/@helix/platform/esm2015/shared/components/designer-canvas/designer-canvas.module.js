import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AdaptButtonModule, AdaptTooltipModule } from '@bmc-ux/adapt-angular';
import { RxDesignerCanvasComponent } from './designer-canvas.component';
import * as i0 from "@angular/core";
// TODO-VS: mode to shared folder after jointJS is updated
export class RxDesignerCanvasModule {
}
RxDesignerCanvasModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDesignerCanvasModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxDesignerCanvasModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDesignerCanvasModule, declarations: [RxDesignerCanvasComponent], imports: [AdaptButtonModule, AdaptTooltipModule, CommonModule, TranslateModule], exports: [RxDesignerCanvasComponent] });
RxDesignerCanvasModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDesignerCanvasModule, imports: [[AdaptButtonModule, AdaptTooltipModule, CommonModule, TranslateModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDesignerCanvasModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxDesignerCanvasComponent],
                    imports: [AdaptButtonModule, AdaptTooltipModule, CommonModule, TranslateModule],
                    exports: [RxDesignerCanvasComponent]
                }]
        }] });
//# sourceMappingURL=designer-canvas.module.js.map