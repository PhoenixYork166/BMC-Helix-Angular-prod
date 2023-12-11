import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AdaptAccordionModule, AdaptRxSearchModule } from '@bmc-ux/adapt-angular';
import { AdaptTextFieldModule } from '@bmc-ux/obsolete';
import { ViewDesignerPaletteComponent } from './view-designer-palette.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import * as i0 from "@angular/core";
export class RxViewDesignerPaletteModule {
}
RxViewDesignerPaletteModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDesignerPaletteModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxViewDesignerPaletteModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDesignerPaletteModule, declarations: [ViewDesignerPaletteComponent], imports: [CommonModule,
        DragDropModule,
        ReactiveFormsModule,
        AdaptAccordionModule,
        AdaptTextFieldModule,
        AdaptRxSearchModule], exports: [ViewDesignerPaletteComponent] });
RxViewDesignerPaletteModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDesignerPaletteModule, imports: [[
            CommonModule,
            DragDropModule,
            ReactiveFormsModule,
            AdaptAccordionModule,
            AdaptTextFieldModule,
            AdaptRxSearchModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDesignerPaletteModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        DragDropModule,
                        ReactiveFormsModule,
                        AdaptAccordionModule,
                        AdaptTextFieldModule,
                        AdaptRxSearchModule
                    ],
                    exports: [ViewDesignerPaletteComponent],
                    declarations: [ViewDesignerPaletteComponent]
                }]
        }] });
//# sourceMappingURL=view-designer-palette.module.js.map