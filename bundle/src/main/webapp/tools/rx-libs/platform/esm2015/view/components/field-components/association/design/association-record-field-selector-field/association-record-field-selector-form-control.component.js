import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor } from '@helix/platform/shared/components';
import { noop, sortBy } from 'lodash';
import { AssociationRecordFieldSelectorEditorDialogComponent } from './association-record-field-selector-editor-dialog/association-record-field-selector-editor-dialog.component';
import { RxModalService } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/ui-kit";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@angular/common";
export class AssociationRecordFieldSelectorFormControlComponent extends ValueAccessor {
    constructor(rxModalService, renderer) {
        super();
        this.rxModalService = rxModalService;
        this.renderer = renderer;
        this.selectedFields = [];
    }
    focus() {
        this.renderer.selectRootElement(this.openModalButton.nativeElement, true).click();
    }
    openFieldSelector(fieldToEdit) {
        this.rxModalService
            .openModal({
            title: this.options.label,
            data: {
                fields: this.options.fields,
                selectedFields: this.value,
                fieldToEdit: fieldToEdit,
                isReadOnly: this.isDisabled
            },
            content: AssociationRecordFieldSelectorEditorDialogComponent
        })
            .then((fields) => {
            this.value = fields;
        })
            .catch(noop);
    }
    onSetValue() {
        this.updateSortedFieldList();
    }
    onWriteValue(value) {
        this.updateSortedFieldList();
    }
    removeField(guid) {
        this.value = this.value.filter((field) => field.guid !== guid);
    }
    editField(field) {
        this.openFieldSelector(field);
    }
    updateSortedFieldList() {
        this.selectedFields = sortBy(this.value, (field) => Number(field.data.index)).map((field) => (Object.assign(Object.assign({}, field), { label: this.options.fields.find((fieldDefinition) => fieldDefinition.id === Number(field.data.fieldId)).name })));
    }
}
AssociationRecordFieldSelectorFormControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationRecordFieldSelectorFormControlComponent, deps: [{ token: i1.RxModalService }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
AssociationRecordFieldSelectorFormControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: AssociationRecordFieldSelectorFormControlComponent, selector: "rx-association-record-field-selector-form-control", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: AssociationRecordFieldSelectorFormControlComponent,
            multi: true
        }
    ], viewQueries: [{ propertyName: "openModalButton", first: true, predicate: ["openModalButton"], descendants: true, read: ElementRef, static: true }], usesInheritance: true, ngImport: i0, template: "<button\n  #openModalButton\n  adapt-button\n  type=\"button\"\n  class=\"px-0 py-0\"\n  btn-type=\"tertiary\"\n  (click)=\"openFieldSelector()\"\n  [disabled]=\"isDisabled\"\n>\n  <adapt-icon name=\"plus_circle\" class=\"mr-1\"></adapt-icon>\n  {{ options.label }}\n</button>\n\n<ul class=\"list-unstyled mb-0 mt-2\" *ngIf=\"selectedFields.length > 0\">\n  <li class=\"border px-2 py-1 mb-1 d-flex align-items-center\" *ngFor=\"let field of selectedFields\">\n    <strong class=\"mr-auto\">{{ field.label }}</strong>\n\n    <button\n      class=\"d-icon-left-pencil p-1\"\n      adapt-button\n      btn-type=\"tertiary\"\n      size=\"small\"\n      type=\"button\"\n      [disabled]=\"isDisabled\"\n      (click)=\"editField(field)\"\n    ></button>\n\n    <button\n      class=\"d-icon-left-cross_adapt p-1\"\n      adapt-button\n      btn-type=\"tertiary\"\n      size=\"small\"\n      type=\"button\"\n      [disabled]=\"isDisabled\"\n      (click)=\"removeField(field.guid)\"\n    ></button>\n  </li>\n</ul>\n", components: [{ type: i2.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i2.AdaptIconComponent, selector: "adapt-icon", inputs: ["name", "classList", "description", "testID"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationRecordFieldSelectorFormControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-association-record-field-selector-form-control',
                    templateUrl: './association-record-field-selector-form-control.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: AssociationRecordFieldSelectorFormControlComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxModalService }, { type: i0.Renderer2 }]; }, propDecorators: { options: [{
                type: Input
            }], openModalButton: [{
                type: ViewChild,
                args: ['openModalButton', { read: ElementRef, static: true }]
            }] } });
//# sourceMappingURL=association-record-field-selector-form-control.component.js.map