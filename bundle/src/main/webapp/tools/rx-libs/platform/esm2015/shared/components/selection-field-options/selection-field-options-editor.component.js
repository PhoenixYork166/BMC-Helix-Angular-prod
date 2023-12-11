import { Component, Injector, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActiveModalRef, DismissReasons } from '@bmc-ux/adapt-angular';
import { RxModalClass } from '@helix/platform/ui-kit';
import { RxGuidService } from '@helix/platform/utils';
import { TranslateService } from '@ngx-translate/core';
import { filter, find, forEach, lowerCase, map, max, some, trim } from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@helix/platform/utils";
import * as i3 from "@ngx-translate/core";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
export class SelectionFieldOptionsEditorComponent extends RxModalClass {
    constructor(activeModalRef, injector, rxGuidService, translateService) {
        super(activeModalRef, injector);
        this.activeModalRef = activeModalRef;
        this.injector = injector;
        this.rxGuidService = rxGuidService;
        this.translateService = translateService;
        this.isReadOnly = this.activeModalRef.getData().isReadOnly;
        this.selectionOptions = map(this.activeModalRef.getData().existingOptions, (option) => ({
            name: option.name,
            id: option.id,
            stringKey: option.stringKey,
            isOpen: false
        }));
        this.duplicateOptionNameMsg = this.translateService.instant('com.bmc.arsys.rx.client.selection-field-options-editor.duplicate-option-name.error');
        this.duplicateOptionIdMsg = this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.duplicate-value.message');
    }
    isDirty() {
        var _a;
        return (_a = this.optionSelectionForm) === null || _a === void 0 ? void 0 : _a.dirty;
    }
    saveOptions() {
        const optionNamesById = {};
        const optionKeysById = {};
        forEach(this.selectionOptions, (option) => {
            optionNamesById[option.id] = option.name;
        });
        forEach(this.selectionOptions, (option) => {
            optionKeysById[option.id] = option.stringKey;
        });
        this.activeModalRef.close({
            optionNamesById,
            optionLabelsById: optionKeysById
        });
    }
    addOption() {
        let name;
        let counter = 0;
        let existingOption;
        const newOptionLabel = this.translateService.instant('com.bmc.arsys.rx.client.selection-field-options-editor.new-option.label');
        do {
            name = counter === 0 ? newOptionLabel : `${newOptionLabel} ` + counter;
            counter++;
            existingOption = find(this.selectionOptions, { name });
        } while (existingOption);
        this.selectionOptions.push({
            name,
            id: this.selectionOptions.length
                ? max(this.selectionOptions.map((option) => option.id)) + 10
                : 0,
            stringKey: this.rxGuidService.generate(),
            isOpen: true
        });
        this.optionSelectionForm.form.markAsDirty();
    }
    removeOption(index) {
        this.selectionOptions.splice(index, 1);
        this.optionSelectionForm.form.markAsDirty();
        this.validateIdAndNames('name');
        this.validateIdAndNames('id');
    }
    expandAll() {
        this.selectionOptions.forEach((option) => (option.isOpen = true));
    }
    collapseAll() {
        this.selectionOptions.forEach((option) => (option.isOpen = false));
    }
    cancel() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
    getDuplicateOptions(type) {
        return filter(this.selectionOptions, (option) => filter(this.selectionOptions, (item) => type === 'name' ? lowerCase(item.name) === trim(lowerCase(option.name)) : item.id === option.id).length > 1);
    }
    validateIdAndNames(type) {
        if (this.optionSelectionForm.invalid) {
            return;
        }
        if (type === 'name') {
            forEach(this.selectionOptions, (option) => {
                option.invalidNameError = null;
            });
            this.getDuplicateOptions(type).forEach((option) => {
                option.invalidNameError = this.duplicateOptionNameMsg;
            });
        }
        if (type === 'id') {
            forEach(this.selectionOptions, (option) => {
                option.invalidIdError = null;
            });
            this.getDuplicateOptions(type).forEach((option) => {
                option.invalidIdError = this.duplicateOptionIdMsg;
            });
        }
    }
    isSaveButtonDisabled() {
        var _a, _b;
        return (!((_a = this.optionSelectionForm) === null || _a === void 0 ? void 0 : _a.dirty) ||
            ((_b = this.optionSelectionForm) === null || _b === void 0 ? void 0 : _b.invalid) ||
            some(this.selectionOptions, (option) => option.invalidNameError || option.invalidIdError));
    }
    trackByIndex(index) {
        return index;
    }
}
SelectionFieldOptionsEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectionFieldOptionsEditorComponent, deps: [{ token: i1.ActiveModalRef }, { token: i0.Injector }, { token: i2.RxGuidService }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
SelectionFieldOptionsEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: SelectionFieldOptionsEditorComponent, selector: "rx-selection-field-options-editor", viewQueries: [{ propertyName: "optionSelectionForm", first: true, predicate: ["optionSelectionForm"], descendants: true }], usesInheritance: true, ngImport: i0, template: "<div class=\"designer-modal-body modal-body d-flex mh-100 flex-column\">\n  <div class=\"text-right btn-group\">\n    <button\n      type=\"button\"\n      adapt-button\n      btn-type=\"tertiary\"\n      rx-id=\"add-option-button\"\n      class=\"d-icon-left-plus_circle float-left px-0\"\n      (click)=\"addOption()\"\n      *ngIf=\"!isReadOnly\"\n    >\n      {{ 'com.bmc.arsys.rx.client.selection-field-options-editor.add-option.label' | translate }}\n    </button>\n\n    <button type=\"button\" adapt-button btn-type=\"tertiary\" rx-id=\"expand-button\" (click)=\"expandAll()\" class=\"ml-auto\">\n      {{ 'com.bmc.arsys.rx.client.common.expand-all.label' | translate }}\n    </button>\n\n    <button type=\"button\" adapt-button btn-type=\"tertiary\" rx-id=\"collapse-button\" class=\"pr-0\" (click)=\"collapseAll()\">\n      {{ 'com.bmc.arsys.rx.client.common.collapse-all.label' | translate }}\n    </button>\n  </div>\n\n  <div class=\"designer-modal-accordion-wrapper\">\n    <form #optionSelectionForm=\"ngForm\">\n      <adapt-accordion [multiselect]=\"true\" class=\"d-block\">\n        <div\n          *ngFor=\"let option of selectionOptions; let $index = index; trackBy: trackByIndex\"\n          class=\"designer-modal-accordion-content\"\n        >\n          <adapt-accordion-tab\n            class=\"d-block\"\n            [isOpen]=\"option.isOpen\"\n            (open)=\"option.isOpen = true\"\n            (close)=\"option.isOpen = false\"\n          >\n            <div class=\"card-title-text w-100\">\n              <div class=\"designer-modal-card-title-content\">\n                <div class=\"left-header-block pl-0\">\n                  <div class=\"rx-ellipsis\" [title]=\"option.name\" rx-id=\"card-title\">\n                    {{ option.name }}\n                  </div>\n                </div>\n\n                <div class=\"right-header-block\">\n                  <button\n                    class=\"d-icon-left-cross_adapt py-0 pr-3 btn btn-sm\"\n                    adapt-button\n                    size=\"small\"\n                    type=\"button\"\n                    (click)=\"$event.stopPropagation(); removeOption($index)\"\n                    *ngIf=\"!isReadOnly\"\n                  >\n                    {{ 'com.bmc.arsys.rx.client.common.remove.label' | translate }}\n                  </button>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"d-flex\">\n              <div class=\"w-50 pr-2\">\n                <adapt-rx-textfield\n                  maxlength=\"254\"\n                  rx-id=\"option-name\"\n                  label=\"{{ 'com.bmc.arsys.rx.client.common.name.label' | translate }}\"\n                  required=\"true\"\n                  [(ngModel)]=\"option.name\"\n                  [autofocus]=\"true\"\n                  name=\"{{ 'name' + $index }}\"\n                  (ngModelChange)=\"validateIdAndNames('name')\"\n                  [disabled]=\"isReadOnly\"\n                >\n                </adapt-rx-textfield>\n\n                <adapt-alert\n                  *ngIf=\"option.invalidNameError\"\n                  [config]=\"{\n                    variant: 'danger',\n                    dismissible: false,\n                    type: 'inline',\n                    content: option.invalidNameError\n                  }\"\n                ></adapt-alert>\n              </div>\n\n              <div class=\"w-50 pl-2\">\n                <adapt-rx-counter\n                  rx-id=\"option-name\"\n                  label=\"{{ 'com.bmc.arsys.rx.client.selection-field-options-editor.integer-value.label' | translate }}\"\n                  required=\"true\"\n                  [(ngModel)]=\"option.id\"\n                  name=\"{{ 'integerValue' + $index }}\"\n                  (ngModelChange)=\"validateIdAndNames('id')\"\n                  [min]=\"0\"\n                  [max]=\"2147483647\"\n                  [adaptMax]=\"2147483647\"\n                  [adaptMin]=\"0\"\n                  [step]=\"1\"\n                  adaptIntegerNumber\n                  [disabled]=\"isReadOnly\"\n                >\n                </adapt-rx-counter>\n\n                <adapt-alert\n                  *ngIf=\"option.invalidIdError\"\n                  [config]=\"{\n                    variant: 'danger',\n                    dismissible: false,\n                    type: 'inline',\n                    content: option.invalidIdError\n                  }\"\n                ></adapt-alert>\n              </div>\n            </div>\n          </adapt-accordion-tab>\n        </div>\n      </adapt-accordion>\n    </form>\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <div *ngIf=\"!isReadOnly\">\n    <button\n      type=\"button\"\n      adapt-button\n      btn-type=\"primary\"\n      rx-id=\"save-button\"\n      (click)=\"saveOptions()\"\n      [disabled]=\"isSaveButtonDisabled()\"\n    >\n      {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n    </button>\n\n    <button type=\"button\" adapt-button btn-type=\"secondary\" rx-id=\"cancel-button\" (click)=\"cancel()\">\n      {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n    </button>\n  </div>\n\n  <div *ngIf=\"isReadOnly\">\n    <button type=\"button\" adapt-button btn-type=\"secondary\" rx-id=\"close-button\" (click)=\"cancel()\">\n      {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n    </button>\n  </div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.designer-modal-body{height:645px;min-height:calc(100% - 61px)!important}.designer-modal-accordion-wrapper{display:flex;flex-direction:column;height:100%;overflow:auto;padding-top:10px}.designer-modal-accordion-content{position:relative}.designer-modal-accordion-content.cdk-drag-preview{z-index:1200!important}.designer-modal-drag-handle{cursor:move;position:absolute;top:0;left:0;height:46px;padding:14px 10px 14px 14px;z-index:1}.designer-modal-card-title-content{width:100%;display:flex}.designer-modal-card-title-content .left-header-block,.designer-modal-card-title-content .right-header-block{display:flex;align-items:center}.designer-modal-card-title-content .left-header-block{flex-grow:1;min-width:0;font-size:14px;padding-left:22px}.designer-modal-card-sub-title{color:#7c7f81;font-weight:normal}.designer-modal-card-title-index-buttons{display:flex;font-size:19px}.rx-card{overflow:auto}.rx-tree-draggable-node{cursor:pointer}.rx-tree-draggable-node.cdk-drag-preview{z-index:1200!important}.rx-tree-draggable-node.cdk-drag{opacity:1}.rx-tree-node-label{word-break:break-all}rx-form-builder{max-width:400px}\n"], components: [{ type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i1.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }, { type: i1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i1.AdaptRxCounterComponent, selector: "adapt-rx-counter", inputs: ["prefix", "suffix", "max", "min", "step", "size", "placeholder", "disabledStyleForReadonlyState"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i5.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i5.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i5.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { type: i5.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i1.AdaptIntegerNumberValidatorDirective, selector: "[adaptIntegerNumber][ngModel], [adaptIntegerNumber][formControl]", inputs: ["adaptIntegerNumberMessageFn"] }, { type: i1.AdaptMaxValidatorDirective, selector: "[adaptMax][ngModel],[adaptMax][formControl]", inputs: ["adaptMax", "adaptMaxMessageFn"] }, { type: i1.AdaptMinValidatorDirective, selector: "[adaptMin][ngModel],[adaptMin][formControl]", inputs: ["adaptMin", "adaptMinMessageFn"] }], pipes: { "translate": i3.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectionFieldOptionsEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-selection-field-options-editor',
                    templateUrl: './selection-field-options-editor.component.html',
                    styleUrls: ['./selection-field-options-editor.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveModalRef }, { type: i0.Injector }, { type: i2.RxGuidService }, { type: i3.TranslateService }]; }, propDecorators: { optionSelectionForm: [{
                type: ViewChild,
                args: ['optionSelectionForm']
            }] } });
//# sourceMappingURL=selection-field-options-editor.component.js.map