import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxDesignerHeaderComponent } from './designer-header.component';
import { AdaptButtonModule } from '@bmc-ux/adapt-angular';
import { RxBreadcrumbBarModule } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
export class RxDesignerHeaderModule {
}
RxDesignerHeaderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDesignerHeaderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxDesignerHeaderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDesignerHeaderModule, declarations: [RxDesignerHeaderComponent], imports: [CommonModule, AdaptButtonModule, RxBreadcrumbBarModule], exports: [RxDesignerHeaderComponent] });
RxDesignerHeaderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDesignerHeaderModule, imports: [[CommonModule, AdaptButtonModule, RxBreadcrumbBarModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDesignerHeaderModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxDesignerHeaderComponent],
                    exports: [RxDesignerHeaderComponent],
                    imports: [CommonModule, AdaptButtonModule, RxBreadcrumbBarModule]
                }]
        }] });
//# sourceMappingURL=designer-header.module.js.map