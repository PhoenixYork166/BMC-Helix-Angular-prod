import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AdaptDropdownDirective } from '@bmc-ux/adapt-angular';
import { RxRecordDefinitionCacheService } from '@helix/platform/record/api';
import { ValueAccessor } from '@helix/platform/shared/components';
import { RxDefinitionNameService } from '@helix/platform/shared/api';
import { RxRecordGridUtilsService } from '@helix/platform/view/components';
import { TranslateService } from '@ngx-translate/core';
import { RxFieldDefinitionPickerService } from './field-definition-picker.service';
import { RxObjectUtilsService, RxStringService } from '@helix/platform/utils';
import { map, mergeMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@helix/platform/view/components";
import * as i3 from "@helix/platform/record/api";
import * as i4 from "@ngx-translate/core";
import * as i5 from "./field-definition-picker.service";
import * as i6 from "@helix/platform/utils";
import * as i7 from "@bmc-ux/adapt-angular";
import * as i8 from "@angular/common";
import * as i9 from "@angular/forms";
export class RxFieldDefinitionPickerComponent extends ValueAccessor {
    constructor(rxDefinitionNameService, rxRecordGridUtilsService, rxRecordDefinitionCacheService, translateService, rxFieldDefinitionPickerService, rxStringService, rxObjectUtilsService, renderer) {
        super();
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxRecordGridUtilsService = rxRecordGridUtilsService;
        this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
        this.translateService = translateService;
        this.rxFieldDefinitionPickerService = rxFieldDefinitionPickerService;
        this.rxStringService = rxStringService;
        this.rxObjectUtilsService = rxObjectUtilsService;
        this.renderer = renderer;
        this.defaultText = this.translateService.instant('com.bmc.arsys.rx.client.common.select.label');
        this.filteredFieldsTree = [];
        this.searchText = '';
    }
    ngOnChanges(changes) {
        var _a;
        const fieldsTree = (_a = changes.options.currentValue) === null || _a === void 0 ? void 0 : _a.fieldsTree;
        if (fieldsTree === null || fieldsTree === void 0 ? void 0 : fieldsTree.length) {
            this.filteredFieldsTree = this.rxObjectUtilsService.cloneDeep(fieldsTree);
        }
        else {
            this.filteredFieldsTree = [];
        }
        this.updateFieldLabel();
    }
    setDropdownWidth() {
        const dropdownButton = this.renderer.selectRootElement(this.dropdownButton.nativeElement, true);
        this.dropdownWidth = dropdownButton.clientWidth + 2;
    }
    selectField(fieldNode) {
        this.dropdown.close();
        this.label = fieldNode.label;
        this.value = fieldNode.value;
    }
    clearFieldDefinition(e) {
        e.stopPropagation();
        this.reset();
    }
    reset() {
        this.label = '';
        this.value = '';
    }
    updateFieldLabel() {
        if (this.value) {
            if (this.value.indexOf('associations') !== -1) {
                this.initializeAssociatedFieldLabel().subscribe((fieldLabel) => (this.label = fieldLabel));
            }
            else {
                this.label = this.value;
            }
        }
        else {
            this.label = '';
        }
    }
    initializeAssociatedFieldLabel() {
        if (this.options.recordDefinitionName) {
            return this.rxRecordDefinitionCacheService
                .getRecordDefinition(this.options.recordDefinitionName)
                .pipe(mergeMap((recordDefinition) => this.rxRecordGridUtilsService
                .getFieldDefinition(this.value, recordDefinition)
                .pipe(map((fieldDefinition) => fieldDefinition.name))));
        }
    }
    filterFields(searchText) {
        this.filteredFieldsTree = this.rxObjectUtilsService.cloneDeep(this.options.fieldsTree);
        if (searchText) {
            this.filteredFieldsTree = this.filteredFieldsTree
                .map((recordFields) => (Object.assign(Object.assign({}, recordFields), { fields: recordFields.fields.filter((fieldDefinitionData) => this.rxStringService.caseInsensitiveSearch(fieldDefinitionData.label, searchText)) })))
                .filter((recordFields) => recordFields.fields.length);
        }
    }
}
RxFieldDefinitionPickerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFieldDefinitionPickerComponent, deps: [{ token: i1.RxDefinitionNameService }, { token: i2.RxRecordGridUtilsService }, { token: i3.RxRecordDefinitionCacheService }, { token: i4.TranslateService }, { token: i5.RxFieldDefinitionPickerService }, { token: i6.RxStringService }, { token: i6.RxObjectUtilsService }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
RxFieldDefinitionPickerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxFieldDefinitionPickerComponent, selector: "rx-field-definition-picker", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: RxFieldDefinitionPickerComponent,
            multi: true
        }
    ], viewQueries: [{ propertyName: "dropdownButton", first: true, predicate: ["dropdownButton"], descendants: true, static: true }, { propertyName: "dropdown", first: true, predicate: ["fieldDefinitionPicker"], descendants: true, static: true }], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<div class=\"d-flex\">\n  <adapt-rx-control-label *ngIf=\"options.label\" [label]=\"options.label\" [showRequiredLabel]=\"options.required\">\n  </adapt-rx-control-label>\n\n  <span\n    *ngIf=\"options?.tooltip\"\n    class=\"d-icon-right-question_circle_o ml-2\"\n    [adaptPopover]=\"options.tooltip\"\n    placement=\"right\"\n    appendToBody=\"true\"\n  >\n  </span>\n</div>\n\n<div\n  class=\"dropdown\"\n  adaptDropdown\n  appendToBody=\"true\"\n  [autoClose]=\"'outside'\"\n  [autoFocusFirst]=\"false\"\n  #fieldDefinitionPicker=\"adaptDropdown\"\n>\n  <button\n    rx-id=\"toggle-button\"\n    #dropdownButton\n    class=\"btn btn-secondary\"\n    (click)=\"setDropdownWidth()\"\n    adaptDropdownToggle\n    type=\"button\"\n    [disabled]=\"!options.recordDefinitionName\"\n  >\n    <span class=\"rx-selected-item rx-ellipsis\">{{ label || defaultText }}</span>\n\n    <span\n      rx-id=\"clear-button\"\n      class=\"d-icon-cross_adapt btn-link\"\n      *ngIf=\"value && !isDisabled\"\n      (click)=\"clearFieldDefinition($event)\"\n    >\n    </span>\n  </button>\n\n  <div class=\"dropdown-menu p-0\" [style.width.px]=\"dropdownWidth\" adaptDropdownMenu>\n    <div class=\"dropdown-header\">\n      <adapt-rx-search\n        [(ngModel)]=\"searchText\"\n        placeholder=\"{{ 'com.bmc.arsys.rx.client.common.filter-data.label' | translate }}\"\n        debounceTime=\"250\"\n        class=\"py-2\"\n        (ngModelChange)=\"filterFields($event)\"\n      >\n      </adapt-rx-search>\n    </div>\n\n    <ul class=\"records\" *ngIf=\"filteredFieldsTree.length\">\n      <li\n        class=\"record rx-ellipsis\"\n        *ngFor=\"let recordNode of filteredFieldsTree\"\n        (click)=\"recordNode.isExpanded = !recordNode.isExpanded\"\n      >\n        <span rx-id=\"expand-button\" class=\"expand-arrow d-icon-angle_right\" [class.open]=\"recordNode.isExpanded\"></span>\n\n        <span\n          class=\"px-1\"\n          [ngClass]=\"recordNode.isAssociatedRecord ? 'd-icon-arrow_schema' : 'd-icon-file_text'\"\n        ></span>\n\n        <span> {{ recordNode.label }} </span>\n\n        <div class=\"fields\" *ngIf=\"recordNode.isExpanded\">\n          <button\n            class=\"dropdown-item rx-ellipsis\"\n            (click)=\"$event.stopPropagation(); selectField(fieldNode)\"\n            type=\"button\"\n            [class.active]=\"value === fieldNode.label\"\n            *ngFor=\"let fieldNode of recordNode.fields\"\n          >\n            <adapt-highlight [result]=\"fieldNode.label\" [term]=\"searchText\"></adapt-highlight>\n          </button>\n        </div>\n      </li>\n    </ul>\n  </div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.dropdown-header{border-bottom:1px solid #d6d7d8;display:flex;align-items:center;padding:0 10px;width:100%;height:50px}adapt-rx-search{flex-grow:1;align-items:center;margin:0}.expand-arrow{padding:5px;transition:.2s}.expand-arrow.open{transform:rotate(90deg)}.records{overflow-y:auto;margin:0;list-style:none;padding:5px 0;width:100%;height:275px}.record{width:100%;padding:0 5px;line-height:30px;cursor:pointer}span[rx-id=clear-button]{cursor:pointer;margin-right:5px}span[rx-id=clear-button]:not(:hover){color:#313538}span[rx-id=expand-button]{display:inline-flex;width:15px}.rx-selected-item{flex-grow:1}.dropdown-menu{height:330px}.dropdown-toggle{width:100%;display:flex;text-align:left}.dropdown-item{padding:0 15px 0 30px}\n"], components: [{ type: i7.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i7.AdaptDropdownDirective, selector: "adapt-dropdown, [adaptDropdown]", inputs: ["autoClose", "customClass", "closeOnEscape", "placement", "animationPlacement", "holdFocusInMenu", "holdFocusOnOpen", "autoFocusFirst", "restoreFocusAfterClose", "focusNextElementAfterClose", "appendToBody", "appendTo", "positionTo", "anchorPositionTrackingIntervalMs", "enableAnchorPositionTracking", "recalculatePositionOnElementResize", "setMobileState", "mobileView"], outputs: ["onOpen", "onClose", "anchorPositionChange", "popupAnimationDone"], exportAs: ["adaptDropdown"] }, { type: i7.AdaptRxSearchComponent, selector: "adapt-rx-search", inputs: ["mode", "autocomplete", "placeholder", "size", "searchButton", "searchButtonText", "clearButtonText", "debounceTime", "ariaControlsPopupId", "ariaActiveDescendant", "initialAlign"], outputs: ["editModeChange"] }, { type: i7.AdaptHighlightDirective, selector: "adapt-highlight, ngb-highlight", inputs: ["highlightClass", "result", "term"], outputs: ["wordMatch"] }], directives: [{ type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i7.AdaptPopoverDirective, selector: "[adaptPopover]", inputs: ["adaptPopover", "popoverTitle", "placement", "fallbackPlacement", "triggers", "container", "appendToBody", "closeBtn", "popupDelay", "disablePopover", "popoverClass", "autoClose", "closeOnOutOfView", "maxWidth", "minWidth"], outputs: ["shown", "hidden"], exportAs: ["adaptPopover"] }, { type: i7.AdaptDropdownToggleDirective, selector: "[adaptDropdownToggle]", inputs: ["showCaret", "dropdownTogglerType"] }, { type: i7.AdaptDropdownMenuDirective, selector: "[adaptDropdownMenu]" }, { type: i9.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i9.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i8.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i8.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], pipes: { "translate": i4.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFieldDefinitionPickerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-field-definition-picker',
                    templateUrl: './field-definition-picker.component.html',
                    styleUrls: ['./field-definition-picker.component.scss'],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: RxFieldDefinitionPickerComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxDefinitionNameService }, { type: i2.RxRecordGridUtilsService }, { type: i3.RxRecordDefinitionCacheService }, { type: i4.TranslateService }, { type: i5.RxFieldDefinitionPickerService }, { type: i6.RxStringService }, { type: i6.RxObjectUtilsService }, { type: i0.Renderer2 }]; }, propDecorators: { options: [{
                type: Input
            }], dropdownButton: [{
                type: ViewChild,
                args: ['dropdownButton', { static: true }]
            }], dropdown: [{
                type: ViewChild,
                args: ['fieldDefinitionPicker', { static: true }]
            }] } });
//# sourceMappingURL=field-definition-picker.component.js.map