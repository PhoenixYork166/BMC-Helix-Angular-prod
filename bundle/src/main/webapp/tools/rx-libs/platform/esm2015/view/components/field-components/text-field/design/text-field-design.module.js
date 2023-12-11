import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdaptRxTextfieldModule } from '@bmc-ux/adapt-angular';
import { TextFieldDesignComponent } from './text-field-design.component';
import * as i0 from "@angular/core";
export class TextFieldDesignModule {
}
TextFieldDesignModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TextFieldDesignModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TextFieldDesignModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TextFieldDesignModule, declarations: [TextFieldDesignComponent], imports: [CommonModule, AdaptRxTextfieldModule, FormsModule] });
TextFieldDesignModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TextFieldDesignModule, imports: [[CommonModule, AdaptRxTextfieldModule, FormsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TextFieldDesignModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, AdaptRxTextfieldModule, FormsModule],
                    declarations: [TextFieldDesignComponent],
                    entryComponents: [TextFieldDesignComponent]
                }]
        }] });
//# sourceMappingURL=text-field-design.module.js.map