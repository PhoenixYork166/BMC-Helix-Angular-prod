import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor } from '@helix/platform/shared/components';
import { OpenViewActionModalSize } from '@helix/platform/view/api';
import { cloneDeep, noop } from 'lodash';
import { RecordGridCellDisplayPropertiesEditorComponent } from './cell-display-properties-editor.component';
import { RxModalService } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/ui-kit";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@angular/common";
export class RecordGridCellDisplayPropertiesComponent extends ValueAccessor {
    constructor(rxModalService) {
        super();
        this.rxModalService = rxModalService;
    }
    openPropertiesEditor() {
        this.rxModalService
            .openModal({
            title: `Edit cell display properties for ${this.columnName}`,
            data: {
                cellDisplayProperties: this.value ? cloneDeep(this.value) : [],
                isReadOnly: this.isDisabled,
                columns: this.columns
            },
            content: RecordGridCellDisplayPropertiesEditorComponent,
            size: OpenViewActionModalSize.Large,
            testID: 'edit-cell-display-properties'
        })
            .then((properties) => {
            this.value = properties;
        })
            .catch(noop);
    }
}
RecordGridCellDisplayPropertiesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridCellDisplayPropertiesComponent, deps: [{ token: i1.RxModalService }], target: i0.ɵɵFactoryTarget.Component });
RecordGridCellDisplayPropertiesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RecordGridCellDisplayPropertiesComponent, selector: "rx-cell-display-properties", inputs: { columnName: "columnName", columns: "columns" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: RecordGridCellDisplayPropertiesComponent,
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: "<adapt-button rx-id=\"open-modal-button\" btn-type=\"tertiary\" class=\"px-0 py-0\" (click)=\"openPropertiesEditor()\">\n  <adapt-icon name=\"plus_circle\" class=\"mr-1\"></adapt-icon>\n  Edit cell display properties\n</adapt-button>\n\n<div rx-id=\"columns\">\n  <span *ngIf=\"!value?.length\" class=\"text-tertiary\">No cell display properties added.</span>\n  <span *ngIf=\"value?.length > 0\" class=\"text-tertiary\">Cell display properties added.</span>\n</div>\n", components: [{ type: i2.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i2.AdaptIconComponent, selector: "adapt-icon", inputs: ["name", "classList", "description", "testID"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridCellDisplayPropertiesComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-cell-display-properties',
                    templateUrl: './cell-display-properties.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: RecordGridCellDisplayPropertiesComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxModalService }]; }, propDecorators: { columnName: [{
                type: Input
            }], columns: [{
                type: Input
            }] } });
//# sourceMappingURL=cell-display-properties.component.js.map