import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldSelectorComponent } from './field-selector/field-selector.component';
import { FieldsInspectorWidgetComponent } from './fields-inspector-widget.component';
import { FormsModule } from '@angular/forms';
import { AdaptButtonModule, AdaptRxTextfieldModule } from '@bmc-ux/adapt-angular';
import * as i0 from "@angular/core";
export class FieldsInspectorWidgetModule {
}
FieldsInspectorWidgetModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FieldsInspectorWidgetModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FieldsInspectorWidgetModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FieldsInspectorWidgetModule, declarations: [FieldSelectorComponent, FieldsInspectorWidgetComponent], imports: [CommonModule, FormsModule, AdaptButtonModule, AdaptRxTextfieldModule], exports: [FieldsInspectorWidgetComponent] });
FieldsInspectorWidgetModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FieldsInspectorWidgetModule, imports: [[CommonModule, FormsModule, AdaptButtonModule, AdaptRxTextfieldModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FieldsInspectorWidgetModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [FieldSelectorComponent, FieldsInspectorWidgetComponent],
                    exports: [FieldsInspectorWidgetComponent],
                    entryComponents: [FieldSelectorComponent, FieldsInspectorWidgetComponent],
                    imports: [CommonModule, FormsModule, AdaptButtonModule, AdaptRxTextfieldModule]
                }]
        }] });
//# sourceMappingURL=fields-inspector-widget.module.js.map