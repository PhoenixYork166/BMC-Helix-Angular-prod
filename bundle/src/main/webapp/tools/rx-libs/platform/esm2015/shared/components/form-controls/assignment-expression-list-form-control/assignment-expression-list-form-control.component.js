import { Component, ElementRef, Input, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { isEqual } from 'lodash';
import { RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import { ValueAccessor } from '../../form-builder/value-accessor';
import { RxExpressionEditorService } from '../../expression-editor/expression-editor.service';
import { AssignmentExpressionListTargetFieldType } from './assignment-expression-list-form-control.types';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../expression-editor/expression-editor.service";
import * as i3 from "@helix/platform/ui-kit";
import * as i4 from "@ngx-translate/core";
import * as i5 from "../text-form-control/text-form-control.component";
import * as i6 from "../select-form-control/select-form-control.component";
import * as i7 from "../expression-form-control/expression-form-control.component";
import * as i8 from "@angular/common";
export class AssignmentExpressionListFormControlComponent extends ValueAccessor {
    constructor(formBuilder, renderer, rxExpressionEditorService, rxModalService, translateService) {
        super();
        this.formBuilder = formBuilder;
        this.renderer = renderer;
        this.rxExpressionEditorService = rxExpressionEditorService;
        this.rxModalService = rxModalService;
        this.translateService = translateService;
        this.formArray = this.formBuilder.array([]);
        this.defaultOptions = {
            addItemText: 'com.bmc.arsys.rx.client.common.add.label',
            confirmationMessage: 'com.bmc.arsys.rx.client.common.delete-item-confirmation.message',
            sourceFieldOptions: {
                options: {
                    label: 'com.bmc.arsys.rx.client.designer.assignment-expression.source.label',
                    required: true
                },
                propertyName: 'expression'
            },
            targetFieldOptions: {
                options: {
                    label: 'com.bmc.arsys.rx.client.designer.assignment-expression.target.label',
                    required: true
                },
                propertyName: 'assignTarget'
            }
        };
        this.destroyed$ = new ReplaySubject(1);
    }
    ngOnInit() {
        this.formArray.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe((value) => {
            this.value = value;
        });
        this.patchOptions(this.options);
    }
    ngOnChanges(changes) {
        if (changes.options.currentValue !== changes.options.previousValue) {
            this.patchOptions(changes.options.currentValue);
        }
    }
    ngOnDestroy() {
        this.formArray.clear();
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    focus(data) {
        const fieldGroup = this.fieldGroups.get(data.index);
        if (data.fieldName === this.currentOptions.targetFieldOptions.propertyName) {
            const targetFieldElement = this.currentOptions.targetFieldOptions.type === AssignmentExpressionListTargetFieldType.Text
                ? fieldGroup.nativeElement.querySelector('rx-text-form-control input')
                : fieldGroup.nativeElement.querySelector('rx-select-form-control button');
            targetFieldElement.focus();
        }
        else if (data.fieldName === this.currentOptions.sourceFieldOptions.propertyName) {
            const sourceFieldButton = fieldGroup.nativeElement.querySelector('rx-expression-form-control button');
            sourceFieldButton.focus();
            sourceFieldButton.click();
        }
    }
    onWriteValue(value) {
        if (!isEqual(value, this.formArray.value)) {
            this.formArray.clear();
            value.forEach((item) => this.addItem(item));
        }
    }
    setDisabledState(isDisabled) {
        super.setDisabledState(isDisabled);
        if (isDisabled) {
            this.formArray.disable();
        }
        else {
            this.formArray.enable();
        }
    }
    addItem(item) {
        this.formArray.push(this.formBuilder.group(item !== null && item !== void 0 ? item : {
            [this.currentOptions.targetFieldOptions.propertyName]: null,
            [this.currentOptions.sourceFieldOptions.propertyName]: null
        }));
    }
    openExpressionEditor(event, formControl) {
        this.rxExpressionEditorService
            .openEditor({
            expressionConfigurator: this.currentOptions.sourceFieldOptions.expressionConfigurator,
            isReadOnly: this.isDisabled,
            property: {
                path: event.payload.propertyPath,
                value: formControl.value,
                label: event.payload.propertyLabel
            }
        })
            .subscribe((expression) => {
            formControl.setValue(expression.value);
        });
    }
    removeItem(index) {
        if (!this.isDisabled) {
            this.rxModalService
                .confirm({
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                modalStyle: RX_MODAL.modalStyles.warning,
                message: this.currentOptions.confirmationMessage
            })
                .then((confirmed) => {
                if (confirmed) {
                    this.formArray.removeAt(index);
                }
            });
        }
    }
    patchOptions(options) {
        this.currentOptions = {
            addItemText: this.translateService.instant(options.addItemText || this.defaultOptions.addItemText),
            confirmationMessage: this.translateService.instant(options.confirmationMessage || this.defaultOptions.confirmationMessage),
            sourceFieldOptions: {
                expressionConfigurator: options.sourceFieldOptions.expressionConfigurator,
                options: Object.assign({ label: this.translateService.instant(this.defaultOptions.sourceFieldOptions.options.label), isRequired: this.defaultOptions.sourceFieldOptions.options.required }, options.sourceFieldOptions.options),
                propertyName: options.sourceFieldOptions.propertyName || this.defaultOptions.sourceFieldOptions.propertyName
            },
            targetFieldOptions: {
                options: Object.assign({ label: this.translateService.instant(this.defaultOptions.targetFieldOptions.options.label), required: this.defaultOptions.targetFieldOptions.options.required }, options.targetFieldOptions.options),
                propertyName: options.targetFieldOptions.propertyName || this.defaultOptions.targetFieldOptions.propertyName,
                type: options.targetFieldOptions.type
            }
        };
    }
}
AssignmentExpressionListFormControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssignmentExpressionListFormControlComponent, deps: [{ token: i1.FormBuilder }, { token: i0.Renderer2 }, { token: i2.RxExpressionEditorService }, { token: i3.RxModalService }, { token: i4.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
AssignmentExpressionListFormControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: AssignmentExpressionListFormControlComponent, selector: "rx-assignment-expression-list-form-control", inputs: { options: "options", propertyPath: "propertyPath" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: AssignmentExpressionListFormControlComponent,
            multi: true
        }
    ], viewQueries: [{ propertyName: "fieldGroups", predicate: ["fieldGroups"], descendants: true, read: ElementRef }], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<button\n  *ngIf=\"!isDisabled\"\n  class=\"btn btn-sm btn-link px-0 py-0\"\n  type=\"button\"\n  aria-label=\"{{ 'com.bmc.arsys.rx.client.common.add.label' | translate }}\"\n  rx-id=\"add-item-button\"\n  (click)=\"addItem()\"\n>\n  <span class=\"d-icon-plus_circle mr-1\" aria-hidden=\"true\"></span>\n\n  {{ currentOptions.addItemText }}\n</button>\n\n<div *ngFor=\"let formGroup of formArray.controls; let index = index\" class=\"card mt-2\">\n  <div class=\"card-block p-3\" #fieldGroups>\n    <button\n      *ngIf=\"!isDisabled\"\n      class=\"close position-relative\"\n      type=\"button\"\n      aria-label=\"{{ 'com.bmc.arsys.rx.client.common.remove.label' | translate }}\"\n      rx-id=\"remove-item-button\"\n      (click)=\"removeItem(index)\"\n    ></button>\n\n    <div class=\"pb-3\">\n      <rx-text-form-control\n        *ngIf=\"currentOptions.targetFieldOptions.type === 'text'\"\n        [formControl]=\"formGroup.get(currentOptions.targetFieldOptions.propertyName)\"\n        [options]=\"currentOptions.targetFieldOptions.options\"\n      ></rx-text-form-control>\n\n      <rx-select-form-control\n        *ngIf=\"currentOptions.targetFieldOptions.type === 'select'\"\n        [formControl]=\"formGroup.get(currentOptions.targetFieldOptions.propertyName)\"\n        [options]=\"currentOptions.targetFieldOptions.options\"\n      ></rx-select-form-control>\n    </div>\n\n    <rx-expression-form-control\n      [formControl]=\"formGroup.get(currentOptions.sourceFieldOptions.propertyName)\"\n      [options]=\"currentOptions.sourceFieldOptions.options\"\n      [isDisabled]=\"isDisabled\"\n      [propertyPath]=\"this.propertyPath + '[' + index + '].' + currentOptions.sourceFieldOptions.propertyName\"\n      (events)=\"openExpressionEditor($event, formGroup.get(currentOptions.sourceFieldOptions.propertyName))\"\n    ></rx-expression-form-control>\n  </div>\n</div>\n", components: [{ type: i5.TextFormControlComponent, selector: "rx-text-form-control", inputs: ["options"] }, { type: i6.SelectFormControlComponent, selector: "rx-select-form-control", inputs: ["options", "appendToBody", "formControl"] }, { type: i7.ExpressionFormControlComponent, selector: "rx-expression-form-control", inputs: ["options", "isDisabled", "propertyPath"], outputs: ["events"] }], directives: [{ type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i8.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i1.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }], pipes: { "translate": i4.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssignmentExpressionListFormControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-assignment-expression-list-form-control',
                    templateUrl: './assignment-expression-list-form-control.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: AssignmentExpressionListFormControlComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1.FormBuilder }, { type: i0.Renderer2 }, { type: i2.RxExpressionEditorService }, { type: i3.RxModalService }, { type: i4.TranslateService }]; }, propDecorators: { options: [{
                type: Input
            }], propertyPath: [{
                type: Input
            }], fieldGroups: [{
                type: ViewChildren,
                args: ['fieldGroups', { read: ElementRef }]
            }] } });
//# sourceMappingURL=assignment-expression-list-form-control.component.js.map