import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormControlsModule, RxDefinitionPickerModule } from '@helix/platform/shared/components';
import { ImageDesignComponent } from './image-design.component';
import * as i0 from "@angular/core";
export class ImageDesignModule {
}
ImageDesignModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ImageDesignModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ImageDesignModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ImageDesignModule, declarations: [ImageDesignComponent], imports: [CommonModule, RxDefinitionPickerModule, FormControlsModule] });
ImageDesignModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ImageDesignModule, imports: [[CommonModule, RxDefinitionPickerModule, FormControlsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ImageDesignModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RxDefinitionPickerModule, FormControlsModule],
                    declarations: [ImageDesignComponent],
                    entryComponents: [ImageDesignComponent]
                }]
        }] });
//# sourceMappingURL=image-design.module.js.map