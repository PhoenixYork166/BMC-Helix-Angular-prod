import { ChangeDetectionStrategy, Component, ElementRef, Injector, QueryList, ViewChildren } from '@angular/core';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ActiveModalRef, AdaptAccordionTabComponent, DismissReasons } from '@bmc-ux/adapt-angular';
import { forEach, isNull } from 'lodash';
import { map, startWith } from 'rxjs/operators';
import { RxModalClass } from '@helix/platform/ui-kit';
import { RxGuidService } from '@helix/platform/utils';
import { RX_NAMED_LIST_DEFINITION } from '@helix/platform/named-list/api';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@angular/forms";
import * as i3 from "@helix/platform/utils";
import * as i4 from "@ngx-translate/core";
import * as i5 from "@helix/platform/shared/components";
import * as i6 from "@angular/common";
import * as i7 from "@angular/cdk/drag-drop";
export class ContextualLabelFieldsEditorModalComponent extends RxModalClass {
    constructor(activeModalRef, formBuilder, rxGuidService, translateService, injector) {
        super(activeModalRef, injector);
        this.activeModalRef = activeModalRef;
        this.formBuilder = formBuilder;
        this.rxGuidService = rxGuidService;
        this.translateService = translateService;
        this.config = this.activeModalRef.getData();
        this.fieldsFormArray = this.formBuilder.array([]);
        this.accordionExpansionState = {};
        this.fieldSelectionConfig = {
            label: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.contextual-label-fields.editor.field.label'),
            required: true,
            options: this.config.options
        };
        this.fieldNameById = this.config.options.reduce((result, { id, name }) => {
            result[id] = name;
            return result;
        }, {});
        this.isAddButtonDisabled$ = this.fieldsFormArray.valueChanges.pipe(startWith([]), map(() => this.fieldsFormArray.length >= RX_NAMED_LIST_DEFINITION.maxNumberOfContextualLabelFields));
    }
    ngOnInit() {
        super.ngOnInit();
        forEach(this.config.contextualLabelFields, (field, index) => {
            var _a;
            const guid = this.rxGuidService.generate();
            this.accordionExpansionState[guid] = this.config.activeFieldIndex === index;
            this.fieldsFormArray.push(this.getFormGroup(Object.assign(Object.assign({ guid }, field), { fieldName: (_a = this.fieldNameById[field.id]) !== null && _a !== void 0 ? _a : '' })));
        });
        if (this.config.isReadOnly) {
            this.fieldsFormArray.disable();
        }
    }
    isDirty() {
        return this.fieldsFormArray.dirty;
    }
    ngAfterViewInit() {
        if (this.config.activeFieldIndex) {
            this.accordionTabEls.toArray()[this.config.activeFieldIndex].nativeElement.scrollIntoView({
                block: 'nearest'
            });
        }
    }
    save() {
        const formValues = this.fieldsFormArray.getRawValue();
        const fields = formValues.map(({ id, searchable, visible }) => ({ id, searchable, visible }));
        this.activeModalRef.close(fields);
    }
    cancel() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
    addField() {
        const guid = this.rxGuidService.generate();
        this.fieldsFormArray.push(this.getFormGroup({
            guid,
            fieldName: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.contextual-label-fields.editor.new-field.title'),
            id: null,
            searchable: false,
            visible: true
        }));
        this.accordionExpansionState[guid] = true;
        setTimeout(() => {
            this.accordionTabEls.last.nativeElement.scrollIntoView({
                block: 'nearest'
            });
        });
    }
    moveField(fromIndex, toIndex) {
        moveItemInArray(this.fieldsFormArray.controls, fromIndex, toIndex);
        this.fieldsFormArray.markAsDirty();
    }
    onFieldDrop(event) {
        moveItemInArray(this.fieldsFormArray.controls, event.previousIndex, event.currentIndex);
        this.fieldsFormArray.markAsDirty();
    }
    removeField(index) {
        this.fieldsFormArray.removeAt(index);
        this.fieldsFormArray.markAsDirty();
    }
    collapseAll() {
        forEach(this.accordionExpansionState, (value, key) => {
            this.accordionExpansionState[key] = false;
        });
    }
    expandAll() {
        forEach(this.accordionExpansionState, (value, key) => (this.accordionExpansionState[key] = true));
    }
    onFieldSelect(formGroup, value) {
        formGroup.get('fieldName').setValue(this.fieldNameById[value]);
    }
    getFormGroup(fieldData) {
        return this.formBuilder.group(Object.assign(Object.assign({}, fieldData), { id: [fieldData.id, [this.isFieldIdUnknown(), this.isDoubleUsedField.bind(this)]] }));
    }
    isFieldIdUnknown() {
        const fieldIds = this.config.options.map(({ id }) => id);
        return (control) => control.parent && !isNull(control.value) && !fieldIds.includes(control.value)
            ? {
                unknownField: {
                    message: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.contextual-label-fields.unknown-field.message')
                }
            }
            : null;
    }
    isDoubleUsedField(control) {
        return control.dirty &&
            control.value &&
            control.root.value.length > 1 &&
            control.root.value.some((field) => field.id === control.value)
            ? {
                duplicated: {
                    message: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.contextual-label-fields.editor.duplicated-field.message')
                }
            }
            : null;
    }
}
ContextualLabelFieldsEditorModalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ContextualLabelFieldsEditorModalComponent, deps: [{ token: i1.ActiveModalRef }, { token: i2.FormBuilder }, { token: i3.RxGuidService }, { token: i4.TranslateService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
ContextualLabelFieldsEditorModalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ContextualLabelFieldsEditorModalComponent, selector: "rx-contextual-label-fields-editor-modal", viewQueries: [{ propertyName: "accordionTabEls", predicate: AdaptAccordionTabComponent, descendants: true, read: ElementRef }], usesInheritance: true, ngImport: i0, template: "<div class=\"designer-modal-body modal-body d-flex mh-100\">\n  <div class=\"row flex-grow-1 w-100\">\n    <div class=\"d-flex flex-column mh-100 col\">\n      <div class=\"d-flex align-items-start justify-content-between\">\n        <div>\n          <button\n            *ngIf=\"!config.isReadOnly\"\n            class=\"pl-0 pr-0\"\n            rx-id=\"add-contextual-label-field-button\"\n            adapt-button\n            type=\"button\"\n            btn-type=\"tertiary\"\n            [disabled]=\"isAddButtonDisabled$ | async\"\n            (click)=\"addField()\"\n          >\n            <span class=\"d-icon-left-plus_circle\"></span>\n            {{ 'com.bmc.arsys.rx.client.named-list-designer.contextual-label-fields.add-field.label' | translate }}\n          </button>\n        </div>\n\n        <div *ngIf=\"fieldsFormArray.length\" class=\"btn-group\">\n          <button adapt-button btn-type=\"tertiary\" type=\"button\" rx-id=\"expand-all-button\" (click)=\"expandAll()\">\n            {{ 'com.bmc.arsys.rx.client.common.expand-all.label' | translate }}\n          </button>\n\n          <button adapt-button btn-type=\"tertiary\" type=\"button\" rx-id=\"collapse-all-button\" (click)=\"collapseAll()\">\n            {{ 'com.bmc.arsys.rx.client.common.collapse-all.label' | translate }}\n          </button>\n        </div>\n      </div>\n\n      <div\n        *ngIf=\"fieldsFormArray.length\"\n        id=\"selected-field\"\n        class=\"designer-modal-accordion-wrapper\"\n        cdkDropList\n        (cdkDropListDropped)=\"onFieldDrop($event)\"\n      >\n        <adapt-accordion [multiselect]=\"true\">\n          <div\n            *ngFor=\"\n              let fieldFormGroup of fieldsFormArray.controls;\n              let index = index;\n              let first = first;\n              let last = last\n            \"\n            class=\"designer-modal-accordion-content\"\n            cdkDrag\n            cdkDragLockAxis=\"y\"\n            [cdkDragData]=\"fieldFormGroup\"\n            [cdkDragDisabled]=\"config.isReadOnly\"\n          >\n            <div *ngIf=\"!config.isReadOnly\" class=\"designer-modal-drag-handle d-icon-left-dots\" cdkDragHandle></div>\n            <adapt-accordion-tab\n              class=\"d-block\"\n              [formGroup]=\"fieldFormGroup\"\n              [isOpen]=\"fieldFormGroup.invalid || accordionExpansionState[fieldFormGroup.value.guid]\"\n              (open)=\"accordionExpansionState[fieldFormGroup.value.guid] = true\"\n              (close)=\"accordionExpansionState[fieldFormGroup.value.guid] = false\"\n            >\n              <div class=\"card-title-text w-100\">\n                <div class=\"designer-modal-card-title-content\">\n                  <div class=\"left-header-block\" [class.pl-0]=\"config.isReadOnly\">\n                    <div class=\"rx-ellipsis\" [title]=\"fieldFormGroup.value.fieldName\" rx-id=\"card-title\">\n                      {{ fieldFormGroup.value.fieldName }}\n                    </div>\n                  </div>\n\n                  <div *ngIf=\"!config.isReadOnly\" class=\"right-header-block\">\n                    <div class=\"designer-modal-card-title-index-buttons\">\n                      <button\n                        class=\"d-icon-left-triangle_down rx-button-unstyled\"\n                        type=\"button\"\n                        rx-id=\"move-down-button\"\n                        [disabled]=\"last\"\n                        (click)=\"$event.stopPropagation(); moveField(index, index + 1)\"\n                      ></button>\n                      <button\n                        class=\"d-icon-left-triangle_up rx-button-unstyled\"\n                        type=\"button\"\n                        rx-id=\"move-up-button\"\n                        [disabled]=\"first\"\n                        (click)=\"$event.stopPropagation(); moveField(index, index - 1)\"\n                      ></button>\n                    </div>\n\n                    <button\n                      class=\"d-icon-left-cross_adapt p-1 pr-4 ml-3\"\n                      adapt-button\n                      size=\"small\"\n                      type=\"button\"\n                      rx-id=\"remove-button\"\n                      (click)=\"$event.stopPropagation(); removeField(index)\"\n                    >\n                      {{ 'com.bmc.arsys.rx.client.common.remove.label' | translate }}\n                    </button>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"row align-items-start px-3\">\n                <rx-select-form-control\n                  [formControl]=\"fieldFormGroup.controls.id\"\n                  rx-id=\"contextual-label-field-id\"\n                  [options]=\"fieldSelectionConfig\"\n                  (ngModelChange)=\"onFieldSelect(fieldFormGroup, $event)\"\n                ></rx-select-form-control>\n                <adapt-rx-checkbox\n                  class=\"ml-5\"\n                  rx-id=\"contextual-label-field-visible\"\n                  label=\"{{\n                    'com.bmc.arsys.rx.client.named-list-designer.contextual-label-fields.editor.visible-field.label'\n                      | translate\n                  }}\"\n                  formControlName=\"visible\"\n                ></adapt-rx-checkbox>\n                <adapt-rx-checkbox\n                  class=\"ml-5\"\n                  rx-id=\"contextual-label-field-searchable\"\n                  label=\"{{\n                    'com.bmc.arsys.rx.client.named-list-designer.contextual-label-fields.editor.searchable-field.label'\n                      | translate\n                  }}\"\n                  formControlName=\"searchable\"\n                ></adapt-rx-checkbox>\n              </div>\n            </adapt-accordion-tab>\n          </div>\n        </adapt-accordion>\n      </div>\n\n      <div *ngIf=\"!fieldsFormArray.length\" class=\"d-flex justify-content-center h-100 align-items-center mt-2\">\n        <adapt-empty-state\n          class=\"w-100\"\n          label=\"{{\n            'com.bmc.arsys.rx.client.named-list-designer.contextual-label-fields.empty-state.message' | translate\n          }}\"\n          type=\"config\"\n        ></adapt-empty-state>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    *ngIf=\"!config.isReadOnly\"\n    adapt-button\n    btn-type=\"primary\"\n    type=\"button\"\n    rx-id=\"save-button\"\n    [disabled]=\"fieldsFormArray.invalid || fieldsFormArray.pristine\"\n    (click)=\"save()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button adapt-button btn-type=\"secondary\" type=\"button\" rx-id=\"cancel-button\" (click)=\"cancel()\">\n    {{\n      config.isReadOnly\n        ? ('com.bmc.arsys.rx.client.common.close.label' | translate)\n        : ('com.bmc.arsys.rx.client.common.cancel.label' | translate)\n    }}\n  </button>\n</div>\n", styles: [".designer-modal-body{height:645px;min-height:calc(100% - 61px)!important}.designer-modal-accordion-wrapper{display:flex;flex-direction:column;height:100%;overflow:auto;padding-top:10px}.designer-modal-accordion-content{position:relative}.designer-modal-accordion-content.cdk-drag-preview{z-index:1200!important}.designer-modal-drag-handle{cursor:move;position:absolute;top:0;left:0;height:46px;padding:14px 10px 14px 14px;z-index:1}.designer-modal-card-title-content{width:100%;display:flex}.designer-modal-card-title-content .left-header-block,.designer-modal-card-title-content .right-header-block{display:flex;align-items:center}.designer-modal-card-title-content .left-header-block{flex-grow:1;min-width:0;font-size:14px;padding-left:22px}.designer-modal-card-sub-title{color:#7c7f81;font-weight:normal}.designer-modal-card-title-index-buttons{display:flex;font-size:19px}.rx-card{overflow:auto}.rx-tree-draggable-node{cursor:pointer}.rx-tree-draggable-node.cdk-drag-preview{z-index:1200!important}.rx-tree-draggable-node.cdk-drag{opacity:1}.rx-tree-node-label{word-break:break-all}rx-form-builder{max-width:400px}:root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}adapt-accordion-tab adapt-rx-checkbox{height:38px;margin-top:1.5rem}rx-select-form-control{width:400px}\n"], components: [{ type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i1.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }, { type: i5.SelectFormControlComponent, selector: "rx-select-form-control", inputs: ["options", "appendToBody", "formControl"] }, { type: i1.AdaptRxCheckboxComponent, selector: "adapt-rx-checkbox", inputs: ["value", "checked", "indeterminate"], outputs: ["indeterminateChange"] }, { type: i1.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }], directives: [{ type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i7.CdkDropList, selector: "[cdkDropList], cdk-drop-list", inputs: ["cdkDropListConnectedTo", "id", "cdkDropListEnterPredicate", "cdkDropListSortPredicate", "cdkDropListDisabled", "cdkDropListSortingDisabled", "cdkDropListAutoScrollDisabled", "cdkDropListOrientation", "cdkDropListLockAxis", "cdkDropListData", "cdkDropListAutoScrollStep"], outputs: ["cdkDropListDropped", "cdkDropListEntered", "cdkDropListExited", "cdkDropListSorted"], exportAs: ["cdkDropList"] }, { type: i6.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i7.CdkDrag, selector: "[cdkDrag]", inputs: ["cdkDragDisabled", "cdkDragStartDelay", "cdkDragLockAxis", "cdkDragConstrainPosition", "cdkDragPreviewClass", "cdkDragBoundary", "cdkDragRootElement", "cdkDragPreviewContainer", "cdkDragData", "cdkDragFreeDragPosition"], outputs: ["cdkDragStarted", "cdkDragReleased", "cdkDragEnded", "cdkDragEntered", "cdkDragExited", "cdkDragDropped", "cdkDragMoved"], exportAs: ["cdkDrag"] }, { type: i7.CdkDragHandle, selector: "[cdkDragHandle]", inputs: ["cdkDragHandleDisabled"] }, { type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i2.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }], pipes: { "async": i6.AsyncPipe, "translate": i4.TranslatePipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ContextualLabelFieldsEditorModalComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-contextual-label-fields-editor-modal',
                    templateUrl: './contextual-label-fields-editor-modal.component.html',
                    styleUrls: ['./contextual-label-fields-editor-modal.component.scss'],
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveModalRef }, { type: i2.FormBuilder }, { type: i3.RxGuidService }, { type: i4.TranslateService }, { type: i0.Injector }]; }, propDecorators: { accordionTabEls: [{
                type: ViewChildren,
                args: [AdaptAccordionTabComponent, { read: ElementRef }]
            }] } });
//# sourceMappingURL=contextual-label-fields-editor-modal.component.js.map