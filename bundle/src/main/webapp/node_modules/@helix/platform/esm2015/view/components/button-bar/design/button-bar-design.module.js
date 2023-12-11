import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonBarDesignComponent } from './button-bar-design.component';
import { ViewDesignerCanvasModule } from '@helix/platform/view/designer';
import { RxButtonBarService } from '../button-bar.service';
import * as i0 from "@angular/core";
export class ButtonBarDesignModule {
}
ButtonBarDesignModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ButtonBarDesignModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ButtonBarDesignModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ButtonBarDesignModule, declarations: [ButtonBarDesignComponent], imports: [CommonModule, ViewDesignerCanvasModule] });
ButtonBarDesignModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ButtonBarDesignModule, providers: [RxButtonBarService], imports: [[CommonModule, ViewDesignerCanvasModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ButtonBarDesignModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, ViewDesignerCanvasModule],
                    declarations: [ButtonBarDesignComponent],
                    entryComponents: [ButtonBarDesignComponent],
                    providers: [RxButtonBarService]
                }]
        }] });
//# sourceMappingURL=button-bar-design.module.js.map