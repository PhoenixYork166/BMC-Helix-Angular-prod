import { Component, ElementRef, Injector, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { findIndex, isEmpty, map, some } from 'lodash';
import { ActiveModalRef, AdaptAccordionTabComponent, DismissReasons } from '@bmc-ux/adapt-angular';
import { RX_MODAL, RxModalClass, RxModalService } from '@helix/platform/ui-kit';
import { RxGuidService } from '@helix/platform/utils';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@helix/platform/ui-kit";
import * as i3 from "@helix/platform/utils";
import * as i4 from "../../record-grid-filter-select-control/record-grid-filter-select-control.component";
import * as i5 from "@angular/common";
import * as i6 from "@angular/forms";
import * as i7 from "@ngx-translate/core";
export class RecordGridFilterPresetEditorModalComponent extends RxModalClass {
    constructor(activeModalRef, rxModalService, rxGuidService, injector) {
        super(activeModalRef, injector);
        this.activeModalRef = activeModalRef;
        this.rxModalService = rxModalService;
        this.rxGuidService = rxGuidService;
        this.injector = injector;
        this.filterPresets = [];
        this.params = this.activeModalRef.getData();
        const activeFilterPreset = this.params.activeFilterPreset;
        this.recordDefinition = this.params.primaryRecordDefinition;
        this.selectedFieldIds = this.params.selectedFieldIds;
        this.isReadOnly = this.params.isReadOnly;
        this.filterPresets = map(this.params.filterPresets, (filterPreset) => this.createFilterPresetEditorData(filterPreset, filterPreset === activeFilterPreset));
    }
    ngAfterViewInit() {
        const openFilterPresetIndex = findIndex(this.filterPresets, 'isOpen');
        if (openFilterPresetIndex !== -1) {
            this.accordionTabEls.toArray()[openFilterPresetIndex].nativeElement.scrollIntoView({
                block: 'nearest'
            });
        }
    }
    addFilterPreset() {
        this.markAsDirty();
        this.filterPresets.push(this.createFilterPresetEditorData({
            guid: this.rxGuidService.generate(),
            title: 'New preset' + (this.filterPresets.length === 0 ? '' : ' ' + this.filterPresets.length),
            filters: '',
            recordGridFilters: []
        }, true));
        setTimeout(() => {
            this.accordionTabEls.last.nativeElement.scrollIntoView({
                block: 'nearest'
            });
        });
    }
    removeFilterPreset(index) {
        this.markAsDirty();
        this.filterPresets.splice(index, 1);
    }
    createFilterPresetEditorData(filterPreset, isOpen) {
        return Object.assign(Object.assign({}, filterPreset), { isOpen, filterSelectOptions: {
                primaryRecordDefinition: this.recordDefinition,
                tagsLimit: 2,
                namedFilterOptions: this.params.namedFilterOptions,
                selectedFieldIds: this.selectedFieldIds
            }, filterSelect: {
                basicFilters: filterPreset.recordGridFilters,
                filtersJson: filterPreset.filters
            } });
    }
    getCheckPresetTitleDuplicateValidator(currentFilterPreset) {
        return (control) => {
            const title = control.value;
            if (title &&
                this.filterPresets.some((filterPreset) => filterPreset.title === title && filterPreset.guid !== currentFilterPreset.guid)) {
                return { duplicatePresetName: { message: 'Duplicate Name' } };
            }
            return null;
        };
    }
    trackByForFilterPresets(index, filterPreset) {
        return filterPreset.guid;
    }
    toggleOpen(expandAll) {
        this.filterPresets.forEach((action) => (action.isOpen = expandAll));
    }
    onSaveChangesClick() {
        const result = {
            filterPresets: this.filterPresets.map((filterPreset) => ({
                filters: filterPreset.filterSelect.filtersJson,
                recordGridFilters: filterPreset.filterSelect.basicFilters,
                guid: filterPreset.guid,
                title: filterPreset.title
            }))
        };
        const hasEmptyFilterPreset = some(result.filterPresets, (filterPreset) => isEmpty(filterPreset.recordGridFilters));
        if (hasEmptyFilterPreset) {
            this.rxModalService
                .confirm({
                title: 'Warning',
                modalStyle: RX_MODAL.modalStyles.warning,
                message: 'The filter preset will not filter records because no filters have been specified. Do you want to continue?'
            })
                .then((confirmResult) => {
                if (confirmResult) {
                    this.activeModalRef.close(result);
                }
            });
        }
        else {
            this.activeModalRef.close(result);
        }
    }
    cancel() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
}
RecordGridFilterPresetEditorModalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridFilterPresetEditorModalComponent, deps: [{ token: i1.ActiveModalRef }, { token: i2.RxModalService }, { token: i3.RxGuidService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
RecordGridFilterPresetEditorModalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RecordGridFilterPresetEditorModalComponent, selector: "rx-record-grid-filter-preset-editor-modal", viewQueries: [{ propertyName: "filterPresetsForm", first: true, predicate: ["filterPresetsForm"], descendants: true, read: NgForm, static: true }, { propertyName: "accordionTabEls", predicate: AdaptAccordionTabComponent, descendants: true, read: ElementRef }], usesInheritance: true, ngImport: i0, template: "<div class=\"designer-modal-body modal-body d-flex mh-100\">\n  <div class=\"row flex-grow-1 w-100\">\n    <div class=\"d-flex flex-column mh-100 col\">\n      <div class=\"d-flex align-items-start justify-content-between\">\n        <button\n          *ngIf=\"!isReadOnly\"\n          class=\"mt-2 p-0\"\n          rx-id=\"add-button\"\n          adapt-button\n          type=\"button\"\n          btn-type=\"tertiary\"\n          (click)=\"addFilterPreset()\"\n        >\n          <span class=\"d-icon-left-plus_circle\"></span>\n\n          {{\n            'com.bmc.arsys.rx.client.view-components.record-grid-filter-preset.add-filter-preset.button.label'\n              | translate\n          }}\n        </button>\n\n        <div *ngIf=\"filterPresets.length\" class=\"btn-group\">\n          <button adapt-button btn-type=\"tertiary\" type=\"button\" rx-id=\"expand-all-button\" (click)=\"toggleOpen(true)\">\n            {{ 'com.bmc.arsys.rx.client.common.expand-all.label' | translate }}\n          </button>\n\n          <button\n            adapt-button\n            btn-type=\"tertiary\"\n            type=\"button\"\n            rx-id=\"collapse-all-button\"\n            (click)=\"toggleOpen(false)\"\n          >\n            {{ 'com.bmc.arsys.rx.client.common.collapse-all.label' | translate }}\n          </button>\n        </div>\n      </div>\n\n      <div class=\"designer-modal-accordion-wrapper\">\n        <adapt-accordion [multiselect]=\"true\">\n          <form #filterPresetsForm=\"ngForm\">\n            <div\n              *ngFor=\"let filterPreset of filterPresets; let index = index; trackBy: trackByForFilterPresets\"\n              class=\"designer-modal-accordion-content\"\n            >\n              <adapt-accordion-tab\n                class=\"d-block\"\n                [isOpen]=\"filterPreset.isOpen\"\n                (open)=\"filterPreset.isOpen = true\"\n                (close)=\"filterPreset.isOpen = false\"\n                #accordionTab\n              >\n                <div class=\"card-title-text w-100\">\n                  <div class=\"designer-modal-card-title-content\">\n                    <div class=\"left-header-block pl-0\">\n                      <div class=\"rx-ellipsis\" [title]=\"filterPreset.title\" rx-id=\"card-title\">\n                        {{ filterPreset.title }}\n                      </div>\n                    </div>\n\n                    <div *ngIf=\"!isReadOnly\" class=\"right-header-block\">\n                      <button\n                        class=\"d-icon-left-cross_adapt p-1 pr-4 ml-3\"\n                        adapt-button\n                        size=\"small\"\n                        type=\"button\"\n                        (click)=\"$event.stopPropagation(); removeFilterPreset(index)\"\n                        rx-id=\"remove-button\"\n                      >\n                        {{ 'com.bmc.arsys.rx.client.common.remove.label' | translate }}\n                      </button>\n                    </div>\n                  </div>\n                </div>\n\n                <adapt-rx-textfield\n                  label=\"{{\n                    'com.bmc.arsys.rx.client.view-components.record-grid-filter-preset.name-field.label' | translate\n                  }}\"\n                  [name]=\"'filterPresetTitle-' + filterPreset.guid\"\n                  [required]=\"true\"\n                  [disabled]=\"isReadOnly\"\n                  [rxCustomValidators]=\"getCheckPresetTitleDuplicateValidator(filterPreset)\"\n                  (ngModelChange)=\"markAsDirty()\"\n                  [(ngModel)]=\"filterPreset.title\"\n                  rxNoWhitespace\n                ></adapt-rx-textfield>\n\n                <div *ngIf=\"accordionTab.isOpenOrCloseAnimationProcessing\">\n                  <rx-record-grid-filter-select-control\n                    [name]=\"'filterPresetFilterSelect-' + filterPreset.guid\"\n                    [disabled]=\"isReadOnly\"\n                    [options]=\"filterPreset.filterSelectOptions\"\n                    (ngModelChange)=\"markAsDirty()\"\n                    [(ngModel)]=\"filterPreset.filterSelect\"\n                  ></rx-record-grid-filter-select-control>\n                </div>\n              </adapt-accordion-tab>\n            </div>\n          </form>\n        </adapt-accordion>\n      </div>\n\n      <div *ngIf=\"!filterPresets.length\" class=\"d-flex justify-content-center h-100 align-items-center mt-2\">\n        <adapt-empty-state\n          class=\"w-100\"\n          label=\"{{\n            'com.bmc.arsys.rx.client.view-components.record-grid-filter-preset.empty-state.message' | translate\n          }}\"\n          type=\"search\"\n        ></adapt-empty-state>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    *ngIf=\"!isReadOnly\"\n    adapt-button\n    btn-type=\"primary\"\n    type=\"button\"\n    rx-id=\"save-button\"\n    [disabled]=\"filterPresetsForm.form.invalid || !isDirty()\"\n    (click)=\"onSaveChangesClick()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button adapt-button btn-type=\"secondary\" type=\"button\" rx-id=\"cancel-button\" (click)=\"cancel()\">\n    {{\n      isReadOnly\n        ? ('com.bmc.arsys.rx.client.common.close.label' | translate)\n        : ('com.bmc.arsys.rx.client.common.cancel.label' | translate)\n    }}\n  </button>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.designer-modal-body{height:645px;min-height:calc(100% - 61px)!important}.designer-modal-accordion-wrapper{display:flex;flex-direction:column;height:100%;overflow:auto;padding-top:10px}.designer-modal-accordion-content{position:relative}.designer-modal-accordion-content.cdk-drag-preview{z-index:1200!important}.designer-modal-drag-handle{cursor:move;position:absolute;top:0;left:0;height:46px;padding:14px 10px 14px 14px;z-index:1}.designer-modal-card-title-content{width:100%;display:flex}.designer-modal-card-title-content .left-header-block,.designer-modal-card-title-content .right-header-block{display:flex;align-items:center}.designer-modal-card-title-content .left-header-block{flex-grow:1;min-width:0;font-size:14px;padding-left:22px}.designer-modal-card-sub-title{color:#7c7f81;font-weight:normal}.designer-modal-card-title-index-buttons{display:flex;font-size:19px}.rx-card{overflow:auto}.rx-tree-draggable-node{cursor:pointer}.rx-tree-draggable-node.cdk-drag-preview{z-index:1200!important}.rx-tree-draggable-node.cdk-drag{opacity:1}.rx-tree-node-label{word-break:break-all}rx-form-builder{max-width:400px}\n"], components: [{ type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i1.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }, { type: i1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i4.RecordGridFilterSelectControlComponent, selector: "rx-record-grid-filter-select-control", inputs: ["options"] }, { type: i1.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i6.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i6.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3.RxNoWhitespaceValidator, selector: "[rxNoWhitespace]", inputs: ["rxNoWhitespace"] }, { type: i6.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i2.RxCustomValidatorsDirective, selector: "[rxCustomValidators][ngModel],[rxCustomValidators][formControl]", inputs: ["rxCustomValidators"] }, { type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i7.TranslatePipe }, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridFilterPresetEditorModalComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-record-grid-filter-preset-editor-modal',
                    templateUrl: './record-grid-filter-preset-editor-modal.component.html',
                    styleUrls: ['./record-grid-filter-preset-editor-modal.component.scss'],
                    encapsulation: ViewEncapsulation.None
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveModalRef }, { type: i2.RxModalService }, { type: i3.RxGuidService }, { type: i0.Injector }]; }, propDecorators: { accordionTabEls: [{
                type: ViewChildren,
                args: [AdaptAccordionTabComponent, { read: ElementRef }]
            }], filterPresetsForm: [{
                type: ViewChild,
                args: ['filterPresetsForm', { read: NgForm, static: true }]
            }] } });
//# sourceMappingURL=record-grid-filter-preset-editor-modal.component.js.map