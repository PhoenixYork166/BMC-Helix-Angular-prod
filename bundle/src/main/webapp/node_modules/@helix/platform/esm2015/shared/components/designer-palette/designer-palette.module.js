import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AdaptAccordionModule, AdaptRxSearchModule } from '@bmc-ux/adapt-angular';
import { RxDesignerPaletteComponent } from './designer-palette.component';
import * as i0 from "@angular/core";
// TODO-VS: mode to shared folder after jointJS is updated
export class RxDesignerPaletteModule {
}
RxDesignerPaletteModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDesignerPaletteModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxDesignerPaletteModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDesignerPaletteModule, declarations: [RxDesignerPaletteComponent], imports: [AdaptAccordionModule, AdaptRxSearchModule, CommonModule, DragDropModule, ReactiveFormsModule], exports: [RxDesignerPaletteComponent] });
RxDesignerPaletteModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDesignerPaletteModule, imports: [[AdaptAccordionModule, AdaptRxSearchModule, CommonModule, DragDropModule, ReactiveFormsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDesignerPaletteModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxDesignerPaletteComponent],
                    imports: [AdaptAccordionModule, AdaptRxSearchModule, CommonModule, DragDropModule, ReactiveFormsModule],
                    exports: [RxDesignerPaletteComponent]
                }]
        }] });
//# sourceMappingURL=designer-palette.module.js.map