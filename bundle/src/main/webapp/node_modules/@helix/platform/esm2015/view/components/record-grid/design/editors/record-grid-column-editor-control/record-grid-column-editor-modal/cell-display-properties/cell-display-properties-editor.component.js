import { Component, ElementRef, Injector, QueryList, ViewChildren } from '@angular/core';
import { ActiveModalRef, AdaptAccordionTabComponent, DismissReasons } from '@bmc-ux/adapt-angular';
import { RX_CELL_PROPERTIES, RxGridCellBgColorCssMap, RxGridCellColor } from '../../../../../common/types/cell-display-properties.types';
import { RxExpressionEditorService } from '@helix/platform/shared/components';
import { ExpressionOperatorGroup } from '@helix/platform/shared/api';
import { FormBuilder, Validators } from '@angular/forms';
import { forEach, get, omit } from 'lodash';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RecordGridCellDisplayPropertiesExpressionConfigurator } from './cell-display-properties-expression-configurator.class';
import { RxModalClass } from '@helix/platform/ui-kit';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@helix/platform/shared/components";
import * as i3 from "@angular/forms";
import * as i4 from "@ngx-translate/core";
import * as i5 from "@angular/common";
import * as i6 from "@angular/cdk/drag-drop";
export class RecordGridCellDisplayPropertiesEditorComponent extends RxModalClass {
    constructor(activeModalRef, rxExpressionEditorService, formBuilder, translateService, injector) {
        super(activeModalRef, injector);
        this.activeModalRef = activeModalRef;
        this.rxExpressionEditorService = rxExpressionEditorService;
        this.formBuilder = formBuilder;
        this.translateService = translateService;
        this.injector = injector;
        this.destroyed$ = new ReplaySubject(1);
        this.config = this.activeModalRef.getData();
        this.propsFormArray = this.formBuilder.array([]);
        this.iconPositions = RX_CELL_PROPERTIES.iconPositions;
        this.textColors = RX_CELL_PROPERTIES.colorsList;
        this.fontSizes = RX_CELL_PROPERTIES.fontSizes;
        this.colorsList = RxGridCellBgColorCssMap;
        this.backgroundColors = RX_CELL_PROPERTIES.colorsList.filter((color) => color.value !== RxGridCellColor.Light);
        this.badgeColors = RX_CELL_PROPERTIES.colorsList.filter((color) => ![RxGridCellColor.Light, RxGridCellColor.Active, null].includes(color.value));
        this.iconPickerOptions = {
            label: 'Icon',
            appendToBody: true,
            required: false
        };
    }
    ngOnInit() {
        super.ngOnInit();
        this.expressionConfigurator = new RecordGridCellDisplayPropertiesExpressionConfigurator();
        this.expressionConfigurator.configureForProperty({
            propertyPath: 'cellDisplayProperties',
            dataDictionary$: this.expressionConfigurator.cellDisplayExpressionDataDictionary(this.config.columns),
            operators: this.expressionConfigurator.getOperatorRowsByGroup(ExpressionOperatorGroup.AllClient)
        });
        this.queryExpressionOptions = {
            label: 'Field value condition',
            dataDictionary$: this.expressionConfigurator.getDataDictionary('cellDisplayProperties'),
            operators: this.expressionConfigurator.getOperators('cellDisplayProperties'),
            isRequired: true
        };
        forEach(this.config.cellDisplayProperties, (props) => this.propsFormArray.push(this.getFormGroup(props)));
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    addCellProperties() {
        this.markAsDirty();
        this.propsFormArray.push(this.getFormGroup({
            fieldValueCondition: '',
            displayAsBadge: false,
            badgeColor: null,
            icon: null,
            iconPosition: null,
            textColor: null,
            backgroundColor: null,
            fontSize: null,
            bold: false,
            italic: false,
            isOpen: true
        }));
        setTimeout(() => {
            this.accordionTabEls.last.nativeElement.scrollIntoView({
                block: 'nearest'
            });
        });
    }
    removeCellProperties(index) {
        this.propsFormArray.removeAt(index);
        this.markAsDirty();
    }
    optionFormatter(selectOption) {
        return selectOption.label;
    }
    getFormGroup(properties) {
        var _a;
        const formGroup = this.formBuilder.group({
            fieldValueCondition: [properties.fieldValueCondition, Validators.required],
            displayAsBadge: [properties.displayAsBadge],
            badgeColor: {
                value: this.getSelectValue(this.badgeColors, 'value', properties.badgeColor),
                disabled: !properties.displayAsBadge
            },
            icon: {
                value: properties.icon,
                disabled: properties.displayAsBadge
            },
            iconPosition: {
                value: this.getSelectValue(this.iconPositions, 'value', properties.iconPosition),
                disabled: !properties.icon
            },
            textColor: {
                value: this.getSelectValue(this.textColors, 'value', properties.textColor),
                disabled: properties.displayAsBadge
            },
            backgroundColor: {
                value: this.getSelectValue(this.backgroundColors, 'value', properties.backgroundColor),
                disabled: properties.displayAsBadge
            },
            fontSize: {
                value: this.getSelectValue(this.fontSizes, 'value', properties.fontSize),
                disabled: properties.displayAsBadge
            },
            bold: [properties.bold],
            italic: [properties.italic],
            isOpen: [(_a = properties.isOpen) !== null && _a !== void 0 ? _a : false]
        });
        formGroup.controls.displayAsBadge.valueChanges
            .pipe(takeUntil(this.destroyed$))
            .subscribe((displayAsBadge) => {
            if (displayAsBadge && formGroup.controls.badgeColor.disabled) {
                formGroup.controls.badgeColor.reset({ value: [this.badgeColors[0]], disabled: false });
            }
            if (!displayAsBadge && formGroup.controls.badgeColor.enabled) {
                formGroup.controls.badgeColor.reset({ value: [], disabled: true });
            }
        });
        formGroup.controls.icon.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe((iconName) => {
            if (iconName && formGroup.controls.iconPosition.disabled) {
                formGroup.controls.iconPosition.reset({ value: [this.iconPositions[0]], disabled: false });
            }
            if (!iconName && formGroup.controls.iconPosition.enabled) {
                formGroup.controls.iconPosition.reset({ value: [], disabled: true });
            }
        });
        return formGroup;
    }
    getSelectValue(optionsList, key, value) {
        const item = optionsList.find((option) => option[key] === value);
        return item ? [item] : [];
    }
    openExpressionEditor(control) {
        this.rxExpressionEditorService
            .openEditor({
            property: {
                path: 'cellDisplayProperties',
                value: control.value,
                label: 'Cell display properties'
            },
            isReadOnly: false,
            expressionConfigurator: this.expressionConfigurator,
            legend: [
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.column.label'),
                    icon: 'd-icon-field_text'
                }
            ]
        })
            .subscribe((expression) => {
            control.setValue(expression.value);
            this.markAsDirty();
        });
    }
    moveCellProperties(fromIndex, toIndex) {
        moveItemInArray(this.propsFormArray.controls, fromIndex, toIndex);
        this.markAsDirty();
    }
    onSelectedCellPropertyDrop(event) {
        moveItemInArray(this.propsFormArray.controls, event.previousIndex, event.currentIndex);
        this.markAsDirty();
    }
    toggleProp(control) {
        control.setValue(!control.value);
        this.markAsDirty();
    }
    toggleOpen(expandAll) {
        this.propsFormArray.controls.forEach((control) => {
            control.get('isOpen').setValue(expandAll);
        });
    }
    resetIconAndTextProps(props) {
        const isDisplayAsBadge = props.get('displayAsBadge').value;
        props.get('icon').reset({ value: null, disabled: isDisplayAsBadge });
        props.get('textColor').reset({ value: [this.textColors[0]], disabled: isDisplayAsBadge });
        props.get('backgroundColor').reset({ value: [this.backgroundColors[0]], disabled: isDisplayAsBadge });
        props.get('fontSize').reset({ value: [this.fontSizes[0]], disabled: isDisplayAsBadge });
        props.get('bold').reset({ value: false, disabled: isDisplayAsBadge });
        props.get('italic').reset({ value: false, disabled: isDisplayAsBadge });
    }
    onSave() {
        const formValues = this.propsFormArray.getRawValue().map((value) => (Object.assign(Object.assign({}, value), { icon: get(value, 'icon', null), badgeColor: get(value, 'badgeColor[0].value', null), iconPosition: get(value, 'iconPosition[0].value', null), textColor: get(value, 'textColor[0].value', null), backgroundColor: get(value, 'backgroundColor[0].value', null), fontSize: get(value, 'fontSize[0].value', null) })));
        const cellProps = formValues.map((value) => (Object.assign({}, omit(value, 'isOpen'))));
        this.activeModalRef.close(cellProps);
    }
    cancel() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
}
RecordGridCellDisplayPropertiesEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridCellDisplayPropertiesEditorComponent, deps: [{ token: i1.ActiveModalRef }, { token: i2.RxExpressionEditorService }, { token: i3.FormBuilder }, { token: i4.TranslateService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
RecordGridCellDisplayPropertiesEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RecordGridCellDisplayPropertiesEditorComponent, selector: "rx-cell-display-properties-editor", viewQueries: [{ propertyName: "accordionTabEls", predicate: AdaptAccordionTabComponent, descendants: true, read: ElementRef }], usesInheritance: true, ngImport: i0, template: "<div class=\"designer-modal-body modal-body d-flex mh-100\">\n  <div class=\"row flex-grow-1 w-100\">\n    <div class=\"d-flex flex-column mh-100 col\">\n      <div class=\"d-flex align-items-start justify-content-between\">\n        <div>\n          <button\n            *ngIf=\"!config.isReadOnly\"\n            class=\"pl-0 pr-0\"\n            rx-id=\"add-button\"\n            adapt-button\n            type=\"button\"\n            btn-type=\"tertiary\"\n            (click)=\"addCellProperties()\"\n          >\n            <span class=\"d-icon-left-plus_circle\"></span>\n\n            {{ 'com.bmc.arsys.rx.client.view-components.cell-display-properties.add-cell-display-property.button.label' | translate }}\n          </button>\n\n          <span\n            class=\"d-icon-right-question_circle_o ml-1 mt-1\"\n            adaptPopover=\"Cell display properties will be applied based on the first field value condition evaluating to true.\"\n            placement=\"bottom\"\n            appendToBody=\"true\"\n          ></span>\n        </div>\n\n        <div *ngIf=\"propsFormArray.controls.length\" class=\"btn-group\">\n          <button\n            adapt-button\n            btn-type=\"tertiary\"\n            type=\"button\"\n            rx-id=\"expand-all-button\"\n            (click)=\"toggleOpen(true)\"\n          >\n            {{ 'com.bmc.arsys.rx.client.common.expand-all.label' | translate }}\n          </button>\n\n          <button\n            adapt-button\n            btn-type=\"tertiary\"\n            type=\"button\"\n            rx-id=\"collapse-all-button\"\n            (click)=\"toggleOpen(false)\"\n          >\n            {{ 'com.bmc.arsys.rx.client.common.collapse-all.label' | translate }}\n          </button>\n        </div>\n      </div>\n\n      <div\n        *ngIf=\"propsFormArray.controls.length\"\n        id=\"selected-cell-property\"\n        class=\"designer-modal-accordion-wrapper\"\n        cdkDropList\n        (cdkDropListDropped)=\"onSelectedCellPropertyDrop($event)\"\n      >\n        <adapt-accordion [multiselect]=\"true\">\n          <div\n            *ngFor=\"\n              let props of propsFormArray.controls;\n              let index = index;\n              let first = first;\n              let last = last;\n            \"\n            class=\"designer-modal-accordion-content\"\n            cdkDrag\n            cdkDragLockAxis=\"y\"\n            [cdkDragData]=\"props\"\n            [cdkDragDisabled]=\"config.isReadOnly\"\n          >\n            <div *ngIf=\"!config.isReadOnly\" class=\"designer-modal-drag-handle d-icon-left-dots\" cdkDragHandle></div>\n\n            <adapt-accordion-tab\n              class=\"d-block\"\n              [formGroup]=\"props\"\n              [isOpen]=\"props.get('isOpen').value\"\n              (open)=\"props.get('isOpen').setValue(true)\"\n              (close)=\"props.get('isOpen').setValue(false)\"\n            >\n              <div class=\"card-title-text w-100\">\n                <div class=\"designer-modal-card-title-content\">\n                  <div class=\"left-header-block\" [class.pl-0]=\"config.isReadOnly\">\n                    <div class=\"rx-ellipsis\" [title]=\"'Cell display properties ' + (index + 1)\" rx-id=\"card-title\">\n                      Cell display properties {{ index + 1 }}\n                    </div>\n                  </div>\n\n                  <div *ngIf=\"!config.isReadOnly\" class=\"right-header-block\">\n                    <div class=\"designer-modal-card-title-index-buttons\">\n                      <button\n                        class=\"d-icon-left-triangle_down rx-button-unstyled\"\n                        type=\"button\"\n                        [disabled]=\"last\"\n                        (click)=\"$event.stopPropagation(); moveCellProperties(index, index + 1)\"\n                        rx-id=\"move-down-button\"\n                      ></button>\n\n                      <button\n                        class=\"d-icon-left-triangle_up rx-button-unstyled\"\n                        type=\"button\"\n                        [disabled]=\"first\"\n                        (click)=\"$event.stopPropagation(); moveCellProperties(index, index - 1)\"\n                        rx-id=\"move-up-button\"\n                      ></button>\n                    </div>\n\n                    <button\n                      class=\"d-icon-left-cross_adapt p-1 pr-4 ml-3\"\n                      adapt-button\n                      size=\"small\"\n                      type=\"button\"\n                      (click)=\"$event.stopPropagation(); removeCellProperties(index)\"\n                      rx-id=\"remove-button\"\n                    >\n                      {{ 'com.bmc.arsys.rx.client.common.remove.label' | translate }}\n                    </button>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"row\">\n                <rx-expression-form-control\n                  formControlName=\"fieldValueCondition\"\n                  class=\"form-group d-block col-12\"\n                  rx-id=\"query-expression-field\"\n                  [options]=\"queryExpressionOptions\"\n                  (events)=\"openExpressionEditor(props.get('fieldValueCondition'))\"\n                ></rx-expression-form-control>\n              </div>\n\n              <div class=\"row form-group\">\n                <div class=\"col-3\">\n                  <adapt-rx-control-label\n                    label=\"{{ 'com.bmc.arsys.rx.client.view-components.cell-display-properties.display-as-badge-field.label' | translate }}\"\n                  ></adapt-rx-control-label>\n\n                  <adapt-rx-switch\n                    [disabled]=\"config.isReadOnly\"\n                    formControlName=\"displayAsBadge\"\n                    (ngModelChange)=\"markAsDirty(); resetIconAndTextProps(props)\"\n                  ></adapt-rx-switch>\n                </div>\n\n                <adapt-rx-select\n                  class=\"d-block col-3\"\n                  label=\"{{ 'com.bmc.arsys.rx.client.view-components.cell-display-properties.badge-color-field.label' | translate }}\"\n                  formControlName=\"badgeColor\"\n                  [disabled]=\"config.isReadOnly\"\n                  [options]=\"badgeColors\"\n                  [optionFormatter]=\"optionFormatter\"\n                  [optionContentTemplate]=\"optionTemplate\"\n                  (ngModelChange)=\"markAsDirty()\"\n                ></adapt-rx-select>\n\n                <rx-icon-picker-form-control\n                  class=\"d-block col-3\"\n                  [disabled]=\"config.isReadOnly\"\n                  [options]=\"iconPickerOptions\"\n                  formControlName=\"icon\"\n                  (ngModelChange)=\"markAsDirty()\"\n                ></rx-icon-picker-form-control>\n\n                <adapt-rx-select\n                  class=\"d-block col-3\"\n                  label=\"{{ 'com.bmc.arsys.rx.client.view-components.cell-display-properties.icon-position-field.label' | translate }}\"\n                  formControlName=\"iconPosition\"\n                  [disabled]=\"config.isReadOnly\"\n                  [options]=\"iconPositions\"\n                  [optionFormatter]=\"optionFormatter\"\n                  (ngModelChange)=\"markAsDirty()\"\n                ></adapt-rx-select>\n              </div>\n\n              <div class=\"row\">\n                <adapt-rx-select\n                  class=\"d-block col-3\"\n                  label=\"{{ 'com.bmc.arsys.rx.client.view-components.cell-display-properties.text-color-field.label' | translate }}\"\n                  formControlName=\"textColor\"\n                  [disabled]=\"config.isReadOnly\"\n                  [options]=\"textColors\"\n                  [optionFormatter]=\"optionFormatter\"\n                  [optionContentTemplate]=\"optionTemplate\"\n                  (ngModelChange)=\"markAsDirty()\"\n                ></adapt-rx-select>\n\n                <adapt-rx-select\n                  class=\"d-block col-3\"\n                  label=\"{{ 'com.bmc.arsys.rx.client.view-components.cell-display-properties.background-color-field.label' | translate }}\"\n                  formControlName=\"backgroundColor\"\n                  [disabled]=\"config.isReadOnly\"\n                  [options]=\"backgroundColors\"\n                  [optionFormatter]=\"optionFormatter\"\n                  [optionContentTemplate]=\"optionTemplate\"\n                  (ngModelChange)=\"markAsDirty()\"\n                ></adapt-rx-select>\n\n                <adapt-rx-select\n                  class=\"d-block col-3\"\n                  label=\"{{ 'com.bmc.arsys.rx.client.view-components.cell-display-properties.font-size-field.label' | translate }}\"\n                  formControlName=\"fontSize\"\n                  [disabled]=\"config.isReadOnly\"\n                  [options]=\"fontSizes\"\n                  [optionFormatter]=\"optionFormatter\"\n                  (ngModelChange)=\"markAsDirty()\"\n                ></adapt-rx-select>\n\n                <div class=\"col-3 pt-4 d-flex align-item-center\">\n                  <div class=\"btn-group btn-group-toggle\" data-toggle=\"buttons\">\n                    <label\n                      class=\"btn btn-secondary d-icon-bold_adapt\"\n                      [ngClass]=\"{\n                        active: props.get('bold').value,\n                        'disabled not-allowed': (props.get('displayAsBadge').value || config.isReadOnly)\n                      }\"\n                    >\n                      <input\n                        (click)=\"toggleProp(props.get('bold'))\"\n                        type=\"checkbox\"\n                        name=\"fontStyle\"\n                        [disabled]=\"props.get('displayAsBadge').value || config.isReadOnly\"\n                      />\n                    </label>\n\n                    <label\n                      class=\"btn btn-secondary ml-2 d-icon-italic_adapt\"\n                      [ngClass]=\"{\n                        active: props.get('italic').value,\n                        'disabled not-allowed': (props.get('displayAsBadge').value || config.isReadOnly)\n                      }\"\n                    >\n                      <input\n                        (click)=\"toggleProp(props.get('italic'))\"\n                        type=\"checkbox\"\n                        name=\"fontStyle\"\n                        [disabled]=\"props.get('displayAsBadge').value || config.isReadOnly\"\n                      />\n                    </label>\n                  </div>\n                </div>\n              </div>\n            </adapt-accordion-tab>\n          </div>\n        </adapt-accordion>\n      </div>\n\n      <div *ngIf=\"!propsFormArray.controls.length\" class=\"d-flex justify-content-center h-100 align-items-center mt-2\">\n        <adapt-empty-state\n          class=\"w-100\"\n          label=\"{{ 'com.bmc.arsys.rx.client.view-components.cell-display-properties.empty-state.message' | translate }}\"\n          type=\"grid\"\n        ></adapt-empty-state>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    *ngIf=\"!config.isReadOnly\"\n    adapt-button\n    btn-type=\"primary\"\n    type=\"button\"\n    rx-id=\"save-button\"\n    [disabled]=\"propsFormArray.invalid || !isDirty()\"\n    (click)=\"onSave()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button adapt-button btn-type=\"secondary\" type=\"button\" rx-id=\"cancel-button\" (click)=\"cancel()\">\n    {{ config.isReadOnly ? ('com.bmc.arsys.rx.client.common.close.label' | translate) : ('com.bmc.arsys.rx.client.common.cancel.label' | translate) }}\n  </button>\n</div>\n\n<ng-template #optionTemplate let-option>\n  <div class=\"d-flex align-items-center\">\n    <div [ngClass]=\"option.value ? 'color-option-box rounded mr-2 ' + colorsList[option.value] : ''\"></div>\n    {{ option.label }}\n  </div>\n</ng-template>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.designer-modal-body{height:645px;min-height:calc(100% - 61px)!important}.designer-modal-accordion-wrapper{display:flex;flex-direction:column;height:100%;overflow:auto;padding-top:10px}.designer-modal-accordion-content{position:relative}.designer-modal-accordion-content.cdk-drag-preview{z-index:1200!important}.designer-modal-drag-handle{cursor:move;position:absolute;top:0;left:0;height:46px;padding:14px 10px 14px 14px;z-index:1}.designer-modal-card-title-content{width:100%;display:flex}.designer-modal-card-title-content .left-header-block,.designer-modal-card-title-content .right-header-block{display:flex;align-items:center}.designer-modal-card-title-content .left-header-block{flex-grow:1;min-width:0;font-size:14px;padding-left:22px}.designer-modal-card-sub-title{color:#7c7f81;font-weight:normal}.designer-modal-card-title-index-buttons{display:flex;font-size:19px}.rx-card{overflow:auto}.rx-tree-draggable-node{cursor:pointer}.rx-tree-draggable-node.cdk-drag-preview{z-index:1200!important}.rx-tree-draggable-node.cdk-drag{opacity:1}.rx-tree-node-label{word-break:break-all}rx-form-builder{max-width:400px}.color-option-box{display:inline-block;width:20px;height:20px}\n"], components: [{ type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i1.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }, { type: i2.ExpressionFormControlComponent, selector: "rx-expression-form-control", inputs: ["options", "isDisabled", "propertyPath"], outputs: ["events"] }, { type: i1.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i1.AdaptRxSwitchComponent, selector: "adapt-rx-switch", inputs: ["value", "size", "isLabelBefore", "checked"] }, { type: i1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i2.IconPickerFormControlComponent, selector: "rx-icon-picker-form-control", inputs: ["options"] }, { type: i1.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.AdaptPopoverDirective, selector: "[adaptPopover]", inputs: ["adaptPopover", "popoverTitle", "placement", "fallbackPlacement", "triggers", "container", "appendToBody", "closeBtn", "popupDelay", "disablePopover", "popoverClass", "autoClose", "closeOnOutOfView", "maxWidth", "minWidth"], outputs: ["shown", "hidden"], exportAs: ["adaptPopover"] }, { type: i6.CdkDropList, selector: "[cdkDropList], cdk-drop-list", inputs: ["cdkDropListConnectedTo", "id", "cdkDropListEnterPredicate", "cdkDropListSortPredicate", "cdkDropListDisabled", "cdkDropListSortingDisabled", "cdkDropListAutoScrollDisabled", "cdkDropListOrientation", "cdkDropListLockAxis", "cdkDropListData", "cdkDropListAutoScrollStep"], outputs: ["cdkDropListDropped", "cdkDropListEntered", "cdkDropListExited", "cdkDropListSorted"], exportAs: ["cdkDropList"] }, { type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i6.CdkDrag, selector: "[cdkDrag]", inputs: ["cdkDragDisabled", "cdkDragStartDelay", "cdkDragLockAxis", "cdkDragConstrainPosition", "cdkDragPreviewClass", "cdkDragBoundary", "cdkDragRootElement", "cdkDragPreviewContainer", "cdkDragData", "cdkDragFreeDragPosition"], outputs: ["cdkDragStarted", "cdkDragReleased", "cdkDragEnded", "cdkDragEntered", "cdkDragExited", "cdkDragDropped", "cdkDragMoved"], exportAs: ["cdkDrag"] }, { type: i6.CdkDragHandle, selector: "[cdkDragHandle]", inputs: ["cdkDragHandleDisabled"] }, { type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i5.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], pipes: { "translate": i4.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridCellDisplayPropertiesEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-cell-display-properties-editor',
                    templateUrl: './cell-display-properties-editor.component.html',
                    styleUrls: ['./cell-display-properties-editor.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveModalRef }, { type: i2.RxExpressionEditorService }, { type: i3.FormBuilder }, { type: i4.TranslateService }, { type: i0.Injector }]; }, propDecorators: { accordionTabEls: [{
                type: ViewChildren,
                args: [AdaptAccordionTabComponent, { read: ElementRef }]
            }] } });
//# sourceMappingURL=cell-display-properties-editor.component.js.map