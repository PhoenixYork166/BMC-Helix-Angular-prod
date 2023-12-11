import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdaptMetatagModule, AdaptRxLabelModule, AdaptTagModule } from '@bmc-ux/adapt-angular';
import { TagsFormControlComponent } from './tags-form-control.component';
import * as i0 from "@angular/core";
export class TagsFormControlModule {
}
TagsFormControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TagsFormControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TagsFormControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TagsFormControlModule, declarations: [TagsFormControlComponent], imports: [CommonModule, FormsModule, AdaptMetatagModule, AdaptTagModule, AdaptRxLabelModule], exports: [TagsFormControlComponent] });
TagsFormControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TagsFormControlModule, imports: [[CommonModule, FormsModule, AdaptMetatagModule, AdaptTagModule, AdaptRxLabelModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TagsFormControlModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [TagsFormControlComponent],
                    exports: [TagsFormControlComponent],
                    entryComponents: [TagsFormControlComponent],
                    imports: [CommonModule, FormsModule, AdaptMetatagModule, AdaptTagModule, AdaptRxLabelModule]
                }]
        }] });
//# sourceMappingURL=tags-form-control.module.js.map