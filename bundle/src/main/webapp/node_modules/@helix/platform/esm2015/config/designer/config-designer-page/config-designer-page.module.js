import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfigDesignerModule } from '../config-designer/config-designer.module';
import { ConfigDesignerPageComponent } from './config-designer-page.component';
import * as i0 from "@angular/core";
export class ConfigDesignerPageModule {
}
ConfigDesignerPageModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConfigDesignerPageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfigDesignerPageModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConfigDesignerPageModule, declarations: [ConfigDesignerPageComponent], imports: [CommonModule, ConfigDesignerModule], exports: [ConfigDesignerPageComponent] });
ConfigDesignerPageModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConfigDesignerPageModule, imports: [[CommonModule, ConfigDesignerModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConfigDesignerPageModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ConfigDesignerPageComponent],
                    exports: [ConfigDesignerPageComponent],
                    imports: [CommonModule, ConfigDesignerModule]
                }]
        }] });
//# sourceMappingURL=config-designer-page.module.js.map