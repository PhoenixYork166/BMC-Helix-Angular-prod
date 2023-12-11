import { NgModule } from '@angular/core';
import { ViewDesignerCanvasModule } from '../view-designer-canvas/view-designer-canvas.module';
import { DesignerComponent } from './designer.component';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
export class DesignerModule {
}
DesignerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DesignerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DesignerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DesignerModule, declarations: [DesignerComponent], imports: [ViewDesignerCanvasModule, CommonModule] });
DesignerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DesignerModule, imports: [[ViewDesignerCanvasModule, CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DesignerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ViewDesignerCanvasModule, CommonModule],
                    declarations: [DesignerComponent],
                    entryComponents: [DesignerComponent]
                }]
        }] });
//# sourceMappingURL=designer.module.js.map