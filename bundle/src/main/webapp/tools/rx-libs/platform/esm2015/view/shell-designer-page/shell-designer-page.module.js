import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxShellDesignerPageComponent } from './shell-designer-page.component';
import { ViewDesignerModule } from '@helix/platform/view/designer';
import { RxShellComponentsModule } from './components/shell-components.module';
import * as i0 from "@angular/core";
export class RxShellDesignerPageModule {
}
RxShellDesignerPageModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellDesignerPageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxShellDesignerPageModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellDesignerPageModule, declarations: [RxShellDesignerPageComponent], imports: [CommonModule, ViewDesignerModule, RxShellComponentsModule], exports: [RxShellDesignerPageComponent] });
RxShellDesignerPageModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellDesignerPageModule, imports: [[CommonModule, ViewDesignerModule, RxShellComponentsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellDesignerPageModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxShellDesignerPageComponent],
                    exports: [RxShellDesignerPageComponent],
                    imports: [CommonModule, ViewDesignerModule, RxShellComponentsModule]
                }]
        }] });
//# sourceMappingURL=shell-designer-page.module.js.map