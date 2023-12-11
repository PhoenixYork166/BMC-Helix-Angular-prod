import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor } from '@helix/platform/shared/components';
import { OpenViewActionModalSize } from '@helix/platform/view/api';
import { cloneDeep, noop, without } from 'lodash';
import { RxModalService } from '@helix/platform/ui-kit';
import { RecordGridNamedFilterOptionsEditorModalComponent } from './named-filter-options-editor/named-filter-options-editor-modal.component';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/ui-kit";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@angular/common";
export class RecordGridNamedFilterOptionsComponent extends ValueAccessor {
    constructor(rxModalService) {
        super();
        this.rxModalService = rxModalService;
    }
    openNamedFilterOptions(activeIndex) {
        this.rxModalService
            .openModal({
            title: `Edit named filter options for ${this.column.title}`,
            data: {
                namedFilterOptions: this.value ? cloneDeep(this.value) : [],
                isReadOnly: this.isDisabled,
                activeIndex,
                column: this.column
            },
            content: RecordGridNamedFilterOptionsEditorModalComponent,
            size: OpenViewActionModalSize.Large,
            testID: 'edit-named-filter-options'
        })
            .then((namedFilterOptions) => {
            this.value = namedFilterOptions;
        })
            .catch(noop);
    }
    editNamedFilterOption(activeIndex) {
        this.openNamedFilterOptions(activeIndex);
    }
    removeFilterOption(namedFilterOption) {
        this.value = without(this.value, namedFilterOption);
    }
}
RecordGridNamedFilterOptionsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridNamedFilterOptionsComponent, deps: [{ token: i1.RxModalService }], target: i0.ɵɵFactoryTarget.Component });
RecordGridNamedFilterOptionsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RecordGridNamedFilterOptionsComponent, selector: "rx-named-filter-options", inputs: { column: "column", tooltip: "tooltip" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: RecordGridNamedFilterOptionsComponent,
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: "<adapt-button rx-id=\"open-modal-button\" btn-type=\"tertiary\" class=\"px-0 py-0 pb-1\" (click)=\"openNamedFilterOptions()\">\n  <adapt-icon name=\"plus_circle\" class=\"mr-1\"></adapt-icon>\n  Edit named filter options\n</adapt-button>\n\n<span *ngIf=\"tooltip\" class=\"align-middle\">\n  <span class=\"letter-space\"></span>\n  <adapt-icon [name]=\"'question_circle_o'\" [adaptPopover]=\"tooltip\" appendToBody=\"true\"></adapt-icon>\n</span>\n\n<div rx-id=\"named-filter-options\">\n  <div *ngIf=\"!value?.length\" class=\"text-tertiary\">No named filter options added.</div>\n  <ul class=\"list-unstyled mb-0\" *ngIf=\"value?.length > 0\">\n    <li class=\"border px-2 py-1 mb-1 d-flex align-items-center\" *ngFor=\"let option of value; let index = index\">\n      <strong class=\"mr-auto text-break\">{{ option.data.title }}</strong>\n\n      <button\n        class=\"d-icon-left-pencil p-1\"\n        adapt-button\n        btn-type=\"tertiary\"\n        size=\"small\"\n        type=\"button\"\n        (click)=\"editNamedFilterOption(index)\"\n        rx-id=\"edit-button\"\n      ></button>\n\n      <button\n        class=\"d-icon-left-cross_adapt p-1\"\n        adapt-button\n        btn-type=\"tertiary\"\n        size=\"small\"\n        type=\"button\"\n        *ngIf=\"!isDisabled\"\n        (click)=\"removeFilterOption(option)\"\n        rx-id=\"remove-button\"\n      ></button>\n    </li>\n  </ul>\n</div>\n", components: [{ type: i2.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i2.AdaptIconComponent, selector: "adapt-icon", inputs: ["name", "classList", "description", "testID"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.AdaptPopoverDirective, selector: "[adaptPopover]", inputs: ["adaptPopover", "popoverTitle", "placement", "fallbackPlacement", "triggers", "container", "appendToBody", "closeBtn", "popupDelay", "disablePopover", "popoverClass", "autoClose", "closeOnOutOfView", "maxWidth", "minWidth"], outputs: ["shown", "hidden"], exportAs: ["adaptPopover"] }, { type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridNamedFilterOptionsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-named-filter-options',
                    templateUrl: './named-filter-options.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: RecordGridNamedFilterOptionsComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxModalService }]; }, propDecorators: { column: [{
                type: Input
            }], tooltip: [{
                type: Input
            }] } });
//# sourceMappingURL=named-filter-options.component.js.map