import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewDesignerCanvasModule } from '@helix/platform/view/designer';
import { RxActionButtonService } from '../../action-button/action-button.service';
import { ContainerDesignComponent } from './container-design.component';
import { ContainerCanvasItemComponent } from './container-canvas-item.component';
import { AngularSplitModule } from 'angular-split';
import { DragDropModule } from '@angular/cdk/drag-drop';
import * as i0 from "@angular/core";
export class ContainerDesignModule {
}
ContainerDesignModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ContainerDesignModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ContainerDesignModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ContainerDesignModule, declarations: [ContainerDesignComponent, ContainerCanvasItemComponent], imports: [CommonModule, ViewDesignerCanvasModule, AngularSplitModule, DragDropModule] });
ContainerDesignModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ContainerDesignModule, providers: [RxActionButtonService], imports: [[CommonModule, ViewDesignerCanvasModule, AngularSplitModule, DragDropModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ContainerDesignModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, ViewDesignerCanvasModule, AngularSplitModule, DragDropModule],
                    declarations: [ContainerDesignComponent, ContainerCanvasItemComponent],
                    entryComponents: [ContainerDesignComponent, ContainerCanvasItemComponent],
                    providers: [RxActionButtonService]
                }]
        }] });
//# sourceMappingURL=container-design.module.js.map