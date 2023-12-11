import { RxStringService } from '@helix/platform/utils';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor } from '../../form-builder/value-accessor';
import { forEach, isEqual } from 'lodash';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@helix/platform/utils";
import * as i3 from "./list-item.component";
import * as i4 from "@angular/common";
export class ListFormControlComponent extends ValueAccessor {
    constructor(formBuilder, stringService) {
        super();
        this.formBuilder = formBuilder;
        this.stringService = stringService;
        this.events = new EventEmitter();
        this.itemList = this.formBuilder.array([]);
        this.destroyed$ = new ReplaySubject(1);
    }
    ngOnInit() {
        this.itemList.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe((value) => {
            this.value = value;
        });
    }
    setDisabledState(isDisabled) {
        super.setDisabledState(isDisabled);
        if (isDisabled) {
            this.itemList.disable();
        }
        else {
            this.itemList.enable();
        }
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
        this.clearItems();
    }
    onWriteValue(modelValue) {
        if (!isEqual(modelValue, this.itemList.value)) {
            this.clearItems();
            // initialize values
            forEach(modelValue, (item) => this.addItem(item));
        }
    }
    clearItems() {
        this.itemList.clear();
    }
    addItem(item) {
        const itemControl = this.createItemFormGroup(item);
        this.itemList.push(itemControl);
    }
    createItemFormGroup(item) {
        const formGroupData = {};
        this.options.items.forEach((i) => {
            formGroupData[i.propertyName] = item[i.propertyName] || null;
        });
        return this.formBuilder.group(formGroupData);
    }
    onItemRemove(index) {
        this.itemList.removeAt(index);
    }
    onAddItem() {
        this.addItem({});
    }
}
ListFormControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ListFormControlComponent, deps: [{ token: i1.FormBuilder }, { token: i2.RxStringService }], target: i0.ɵɵFactoryTarget.Component });
ListFormControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ListFormControlComponent, selector: "rx-list-form-control", inputs: { options: "options", propertyPath: "propertyPath" }, outputs: { events: "events" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: ListFormControlComponent,
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: "<div [formGroup]=\"itemList\">\n  <button\n    (click)=\"onAddItem()\"\n    type=\"button\"\n    class=\"btn btn-sm btn-link px-0 py-0\"\n    [attr.rx-id]=\"'add-item-button'\"\n    *ngIf=\"!isDisabled\"\n  >\n    <span class=\"d-icon-plus_circle mr-1\" aria-hidden=\"true\"></span>\n    {{ options.addItemText }}\n  </button>\n\n  <div class=\"card mt-2\" *ngFor=\"let itemFormGroup of itemList.controls; let i = index\">\n    <div class=\"card-block p-3\">\n      <button\n        *ngIf=\"!isDisabled\"\n        (click)=\"onItemRemove(i)\"\n        class=\"close position-relative\"\n        type=\"button\"\n        aria-label=\"Remove\"\n      ></button>\n\n      <div\n        class=\"form-group\"\n        [ngClass]=\"{ 'mb-0': last, 'mb-3': !last }\"\n        *ngFor=\"let item of options.items; let first = first; let last = last\"\n        [attr.rx-id]=\"stringService.toRxId(item.label)\"\n      >\n        <rx-list-item\n          [config]=\"item\"\n          [control]=\"itemFormGroup.get(item.propertyName)\"\n          [propertyPath]=\"this.propertyPath + '[' + i + '].' + item.propertyName\"\n          (events)=\"events.emit($event)\"\n        >\n        </rx-list-item>\n      </div>\n    </div>\n  </div>\n\n  <div *ngIf=\"isDisabled && options.emptyListText && itemList.controls.length === 0\">{{ options.emptyListText }}</div>\n</div>\n", styles: [".close{z-index:1}\n"], components: [{ type: i3.ListItemComponent, selector: "rx-list-item", inputs: ["config", "propertyPath", "control"], outputs: ["events"] }], directives: [{ type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ListFormControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-list-form-control',
                    templateUrl: './list-form-control.component.html',
                    styleUrls: ['./list-form-control.component.scss'],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: ListFormControlComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1.FormBuilder }, { type: i2.RxStringService }]; }, propDecorators: { options: [{
                type: Input
            }], propertyPath: [{
                type: Input
            }], events: [{
                type: Output
            }] } });
//# sourceMappingURL=list-form-control.component.js.map