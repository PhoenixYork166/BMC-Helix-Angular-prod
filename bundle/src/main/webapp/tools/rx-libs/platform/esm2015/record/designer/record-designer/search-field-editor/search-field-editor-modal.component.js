import { Component, Injector } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RxModalClass } from '@helix/platform/ui-kit';
import { ActiveModalRef, DismissReasons } from '@bmc-ux/adapt-angular';
import { ReplaySubject } from 'rxjs';
import { SearchFieldEditorModalStore } from './search-field-editor-modal.store';
import { filter, take } from 'rxjs/operators';
import { RX_RECORD_DEFINITION, RxFieldDefinitionService } from '@helix/platform/record/api';
import * as i0 from "@angular/core";
import * as i1 from "./search-field-editor-modal.store";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@angular/forms";
import * as i4 from "@helix/platform/record/api";
import * as i5 from "@angular/common";
import * as i6 from "@ngx-translate/core";
export class SearchFieldEditorModalComponent extends RxModalClass {
    constructor(searchFieldsEditorModalStore, activeModalRef, formBuilder, injector, rxFieldDefinitionService) {
        super(activeModalRef, injector);
        this.searchFieldsEditorModalStore = searchFieldsEditorModalStore;
        this.activeModalRef = activeModalRef;
        this.formBuilder = formBuilder;
        this.injector = injector;
        this.rxFieldDefinitionService = rxFieldDefinitionService;
        this.vm$ = this.searchFieldsEditorModalStore.vm$;
        this.destroyed$ = new ReplaySubject(1);
        this.recordDefinition = this.activeModalRef.getData().recordDefinition;
        this.isReadOnly = this.activeModalRef.getData().isReadOnly;
    }
    cancel() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
    ngOnInit() {
        super.ngOnInit();
        this.searchFieldsEditorModalStore.isDirty$.pipe(filter(Boolean), take(1)).subscribe(() => {
            this.markAsDirty();
        });
        const searchFields = this.activeModalRef.getData().searchFields.map((searchField, index) => this.formBuilder.group({
            id: searchField.id,
            searchFieldName: [[searchField], Validators.required],
            category: searchField.searchDefinition.searchCategoryName,
            isOpen: searchField.id === this.activeModalRef.getData().searchFieldIndex,
            isCategoryVisible: searchField.resourceType !== RX_RECORD_DEFINITION.resourceTypes.attachment,
            searchDefinition: searchField.searchDefinition
        }));
        const availableFields = this.recordDefinition.fields
            .filter((fieldDefinition) => this.rxFieldDefinitionService.isSearchable(fieldDefinition, this.recordDefinition))
            .filter((fieldDefinition) => searchFields.every((searchField) => searchField.get('id').value !== fieldDefinition.id));
        this.searchFieldsEditorModalStore.patchState({ searchFields, availableFields });
    }
    optionFormatter(selectOption) {
        return selectOption.name;
    }
    toggleOpen(toggleValue) {
        this.searchFieldsEditorModalStore.toggleOpen(toggleValue);
    }
    addNewSearchField() {
        this.searchFieldsEditorModalStore.updateFields(this.formBuilder.group({
            id: '',
            searchFieldName: [[], Validators.required],
            category: '',
            isOpen: true,
            isCategoryVisible: true,
            searchDefinition: {
                enableFTSSearch: false,
                enableCognitiveSearch: false
            }
        }));
    }
    onSelectedFieldChange(field) {
        this.searchFieldsEditorModalStore.updateAvailableFields(field[0]);
    }
    onSearchCategoryChange() {
        this.searchFieldsEditorModalStore.markDirty();
    }
    onRemoveSearchField(fieldIndex) {
        this.searchFieldsEditorModalStore.removeSearchField(fieldIndex);
    }
    saveSearchFields() {
        this.searchFieldsEditorModalStore.searchFields$.pipe(take(1)).subscribe((searchFields) => {
            this.activeModalRef.close(searchFields);
        });
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
SearchFieldEditorModalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SearchFieldEditorModalComponent, deps: [{ token: i1.SearchFieldEditorModalStore }, { token: i2.ActiveModalRef }, { token: i3.FormBuilder }, { token: i0.Injector }, { token: i4.RxFieldDefinitionService }], target: i0.ɵɵFactoryTarget.Component });
SearchFieldEditorModalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: SearchFieldEditorModalComponent, selector: "rx-search-field-editor-modal", providers: [SearchFieldEditorModalStore], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"vm$ | async as vm\">\n  <div class=\"designer-modal-body modal-body d-flex mh-100\">\n    <div class=\"row flex-grow-1 w-100\">\n      <div class=\"d-flex flex-column mh-100 col\">\n        <div class=\"d-flex align-items-start justify-content-between\">\n          <button\n            adapt-button\n            btn-type=\"tertiary\"\n            class=\"mt-2 p-0\"\n            rx-id=\"add-new-search-field-button\"\n            *ngIf=\"!isReadOnly\"\n            (click)=\"addNewSearchField()\"\n          >\n            <span class=\"d-icon-plus_circle\"></span>\n            {{ 'com.bmc.arsys.rx.client.record-designer.search-fields.add-search-field.button.label' | translate }}\n          </button>\n\n          <div *ngIf=\"vm.searchFields.length\" class=\"btn-group ml-auto\">\n            <button adapt-button btn-type=\"tertiary\" type=\"button\" rx-id=\"expand-all-button\" (click)=\"toggleOpen(true)\">\n              {{ 'com.bmc.arsys.rx.client.common.expand-all.label' | translate }}\n            </button>\n\n            <button\n              adapt-button\n              btn-type=\"tertiary\"\n              type=\"button\"\n              rx-id=\"collapse-all-button\"\n              (click)=\"toggleOpen(false)\"\n            >\n              {{ 'com.bmc.arsys.rx.client.common.collapse-all.label' | translate }}\n            </button>\n          </div>\n        </div>\n\n        <div\n          class=\"border-bottom pb-1 d-flex align-items-center\"\n          *ngIf=\"vm.searchFields.length\"\n          id=\"selected-search-field\"\n          class=\"designer-modal-accordion-wrapper\"\n        >\n          <adapt-accordion [multiselect]=\"true\">\n            <div\n              *ngFor=\"let searchField of vm.searchFields; let index = index; let first = first; let last = last\"\n              class=\"designer-modal-accordion-content\"\n            >\n              <adapt-accordion-tab\n                class=\"d-block\"\n                [formGroup]=\"searchField\"\n                [isOpen]=\"searchField.get('isOpen').value\"\n                (open)=\"searchField.get('isOpen').setValue(true)\"\n                (close)=\"searchField.get('isOpen').setValue(false)\"\n              >\n                <div class=\"card-title-text w-100\">\n                  <div class=\"designer-modal-card-title-content\">\n                    <div class=\"left-header-block pl-0\">\n                      <div rx-id=\"card-title\">\n                        {{ searchField.get('searchFieldName').value[0]?.name }}\n                      </div>\n                    </div>\n\n                    <div class=\"right-header-block\">\n                      <button\n                        class=\"d-icon-left-cross_adapt p-1 pr-4 ml-3\"\n                        adapt-button\n                        size=\"small\"\n                        type=\"button\"\n                        rx-id=\"remove-button\"\n                        *ngIf=\"!isReadOnly\"\n                        (click)=\"onRemoveSearchField(index)\"\n                      >\n                        {{ 'com.bmc.arsys.rx.client.common.remove.label' | translate }}\n                      </button>\n                    </div>\n                  </div>\n                </div>\n\n                <div class=\"row form-group\">\n                  <adapt-rx-select\n                    [ngClass]=\"recordDefinition.enableCognitiveSearch ? 'd-block col-12' : 'd-block col-6'\"\n                    rx-id=\"available-fields\"\n                    label=\"{{ 'com.bmc.arsys.rx.client.record-designer.search-fields.field.label' | translate }}\"\n                    formControlName=\"searchFieldName\"\n                    [options]=\"vm.availableFields\"\n                    [optionFormatter]=\"optionFormatter\"\n                    [optionContentTemplate]=\"optionTemplate\"\n                    (ngModelChange)=\"onSelectedFieldChange($event)\"\n                    [disabled]=\"isReadOnly\"\n                  ></adapt-rx-select>\n\n                  <adapt-rx-textfield\n                    *ngIf=\"!recordDefinition.enableCognitiveSearch && searchField.get('isCategoryVisible').value\"\n                    class=\"d-block col-6\"\n                    rx-id=\"search-field-category\"\n                    label=\"{{\n                      'com.bmc.arsys.rx.client.record-designer.search-fields.search-category-name.label' | translate\n                    }}\"\n                    formControlName=\"category\"\n                    (ngModelChange)=\"onSearchCategoryChange()\"\n                    [disabled]=\"isReadOnly\"\n                  ></adapt-rx-textfield>\n                </div>\n              </adapt-accordion-tab>\n            </div>\n          </adapt-accordion>\n        </div>\n\n        <div *ngIf=\"!vm.searchFields.length\" class=\"d-flex justify-content-center h-100 align-items-center mt-2\">\n          <adapt-empty-state\n            class=\"w-100\"\n            label=\"{{ 'com.bmc.arsys.rx.client.record-designer.search-fields.empty-state.message' | translate }}\"\n            type=\"config\"\n          ></adapt-empty-state>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"modal-footer\">\n    <div *ngIf=\"!isReadOnly\">\n      <button\n        adapt-button\n        type=\"button\"\n        btn-type=\"primary\"\n        rx-id=\"save-button\"\n        (click)=\"saveSearchFields()\"\n        [disabled]=\"!vm.isValid || !vm.isDirty\"\n      >\n        {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n      </button>\n      <button adapt-button type=\"button\" btn-type=\"secondary\" (click)=\"cancel()\" rx-id=\"cancel-button\">\n        {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n      </button>\n    </div>\n\n    <button type=\"button\" adapt-button btn-type=\"secondary\" rx-id=\"close-button\" (click)=\"cancel()\" *ngIf=\"isReadOnly\">\n      {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n    </button>\n  </div>\n</ng-container>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.designer-modal-body{height:645px;min-height:calc(100% - 61px)!important}.designer-modal-accordion-wrapper{display:flex;flex-direction:column;height:100%;overflow:auto;padding-top:10px}.designer-modal-accordion-content{position:relative}.designer-modal-accordion-content.cdk-drag-preview{z-index:1200!important}.designer-modal-drag-handle{cursor:move;position:absolute;top:0;left:0;height:46px;padding:14px 10px 14px 14px;z-index:1}.designer-modal-card-title-content{width:100%;display:flex}.designer-modal-card-title-content .left-header-block,.designer-modal-card-title-content .right-header-block{display:flex;align-items:center}.designer-modal-card-title-content .left-header-block{flex-grow:1;min-width:0;font-size:14px;padding-left:22px}.designer-modal-card-sub-title{color:#7c7f81;font-weight:normal}.designer-modal-card-title-index-buttons{display:flex;font-size:19px}.rx-card{overflow:auto}.rx-tree-draggable-node{cursor:pointer}.rx-tree-draggable-node.cdk-drag-preview{z-index:1200!important}.rx-tree-draggable-node.cdk-drag{opacity:1}.rx-tree-node-label{word-break:break-all}rx-form-builder{max-width:400px}\n"], components: [{ type: i2.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i2.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i2.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }, { type: i2.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i2.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i2.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i5.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], pipes: { "async": i5.AsyncPipe, "translate": i6.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SearchFieldEditorModalComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-search-field-editor-modal',
                    templateUrl: './search-field-editor-modal.component.html',
                    styleUrls: ['./search-field-editor-modal.component.scss'],
                    providers: [SearchFieldEditorModalStore]
                }]
        }], ctorParameters: function () { return [{ type: i1.SearchFieldEditorModalStore }, { type: i2.ActiveModalRef }, { type: i3.FormBuilder }, { type: i0.Injector }, { type: i4.RxFieldDefinitionService }]; } });
//# sourceMappingURL=search-field-editor-modal.component.js.map