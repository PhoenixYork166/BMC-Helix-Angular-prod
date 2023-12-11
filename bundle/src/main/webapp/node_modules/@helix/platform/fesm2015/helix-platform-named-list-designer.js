import * as i6 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Injectable, ElementRef, Component, ChangeDetectionStrategy, ViewChildren, Input, EventEmitter, Output, NgModule, ViewChild } from '@angular/core';
import * as i7$1 from '@angular/cdk/drag-drop';
import { moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';
import * as i2 from '@angular/forms';
import { NG_VALUE_ACCESSOR, FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as i1 from '@bmc-ux/adapt-angular';
import { DismissReasons, AdaptAccordionTabComponent, AdaptAccordionModule, AdaptButtonModule, AdaptCodeViewerModule, AdaptEmptyStateModule, AdaptIconModule, AdaptPopoverModule, AdaptSidebarModule, AdaptTabsModule, AdaptRxFormsModule } from '@bmc-ux/adapt-angular';
import * as i7 from '@helix/platform/shared/components';
import { ValueAccessor, RX_REVERT_CUSTOMIZATION, RX_EXPRESSION_EDITOR, TextFormControlComponent, RxDefinitionPickerComponent, RxDefinitionPickerType, ExpressionFormControlComponent, SelectFormControlComponent, RxRevertCustomizationComponent, CustomizationOptionsComponent, RxDesignerHeaderModule, RxFormBuilderModule, RxDefinitionPickerModule, ExpressionFormControlModule, SelectFormControlModule, CustomizationOptionsModule, RxRevertCustomizationModule } from '@helix/platform/shared/components';
import * as i4$1 from '@helix/platform/ui-kit';
import { RxModalClass, ValidationIssueType, RX_MODAL, RxValidationIssuesModule } from '@helix/platform/ui-kit';
import * as i4 from '@ngx-translate/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import * as i6$1 from '@helix/platform/named-list/api';
import { RX_NAMED_LIST_DEFINITION } from '@helix/platform/named-list/api';
import * as i5 from '@helix/platform/record/api';
import { RxRecordDefinitionCacheService, RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import * as i3$1 from '@helix/platform/shared/api';
import { RxExpressionConfigurator, ExpressionOperatorRowsByGroup, ExpressionOperatorGroup, Tooltip, RX_APPLICATION } from '@helix/platform/shared/api';
import { flow, map as map$1, compact, forEach, isNull, isNil, cloneDeep, noop, without, some, isEmpty, trim, last } from 'lodash';
import { of, BehaviorSubject, ReplaySubject, combineLatest, Subject } from 'rxjs';
import { map, startWith, switchMap, withLatestFrom, shareReplay, filter, tap, skip, takeUntil, take, catchError } from 'rxjs/operators';
import * as i1$1 from '@ngrx/store';
import { createFeatureSelector, createSelector, createAction, props, createReducer, on, StoreModule } from '@ngrx/store';
import * as i3 from '@helix/platform/utils';
import * as i2$1 from '@ngrx/effects';
import { createEffect, ofType, EffectsModule } from '@ngrx/effects';
import * as i1$2 from '@angular/router';

class RxNamedListExpressionConfigurator extends RxExpressionConfigurator {
    constructor(injector) {
        super();
        this.injector = injector;
        this.rxRecordDefinitionCacheService = this.injector.get(RxRecordDefinitionCacheService);
        this.translateService = this.injector.get(TranslateService);
        this.commonDataDictionary$ = of([]);
        this.generalGroup = {
            label: this.translateService.instant('com.bmc.arsys.rx.client.common.general-items.label'),
            hidden: true,
            children: [
                {
                    label: 'NULL',
                    icon: 'd-icon-dollar',
                    expression: '$NULL$'
                }
            ]
        };
    }
    getDefaultConfig() {
        return Object.assign(Object.assign({}, super.getDefaultConfig()), { operators: ExpressionOperatorRowsByGroup.get(ExpressionOperatorGroup.AllClient) });
    }
    namedListExpressionDataDictionary(namedListDefinition) {
        const data = {
            label: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.expression-configurator.record-instance.label'),
            expanded: true
        };
        if (namedListDefinition.recordDefinitionName) {
            return this.rxRecordDefinitionCacheService.getRecordDefinition(namedListDefinition.recordDefinitionName).pipe(map((recordDefinition) => {
                data.children = recordDefinition
                    ? flow((fieldDefinitions) => map$1(fieldDefinitions, (fieldDefinition) => {
                        if (fieldDefinition.resourceType !== RX_RECORD_DEFINITION.dataTypes.attachment.resourceType) {
                            return {
                                label: fieldDefinition.name,
                                icon: 'd-icon-arrow_right_square_input',
                                expression: `'${fieldDefinition.name}'`
                            };
                        }
                    }), compact)(recordDefinition.fieldDefinitions)
                    : [];
                return [data, this.generalGroup];
            }));
        }
        else {
            return of([this.generalGroup]);
        }
    }
}

const RX_NAMED_LIST_DESIGNER = {
    featureSelector: 'namedListDesigner'
};

const namedListDesignerStateSelector = createFeatureSelector(RX_NAMED_LIST_DESIGNER.featureSelector);
const namedListDesignerModelSelector = createSelector(namedListDesignerStateSelector, (namedListDesignerState) => namedListDesignerState.model);
const bundleIdSelector = createSelector(namedListDesignerModelSelector, (namedListDesignerModel) => namedListDesignerModel.bundleId);
const definitionNameSelector = createSelector(namedListDesignerModelSelector, (namedListDesignerModel) => namedListDesignerModel.definitionName);
const isDesignModeSelector = createSelector(namedListDesignerModelSelector, (namedListDesignerModel) => namedListDesignerModel.isDesignMode);
const definitionModelFromDefinitionSelector = createSelector(namedListDesignerModelSelector, (namedListDesignerModel) => namedListDesignerModel.definitionModelFromDefinition);
const definitionModelSelector = createSelector(namedListDesignerModelSelector, (namedListDesignerModel) => namedListDesignerModel.definitionModel);
const isDirtySelector = createSelector(namedListDesignerModelSelector, (namedListDesignerModel) => namedListDesignerModel.isDirty);
const savedDefinitionNameSelector = createSelector(namedListDesignerModelSelector, (namedListDesignerModel) => namedListDesignerModel.savedDefinitionName);
const originalDefinitionSelector = createSelector(namedListDesignerModelSelector, (namedListDesignerModel) => namedListDesignerModel.originalDefinition);

const init = createAction('[Named List Designer] Init', props());
const loadDefinition = createAction('[Named List Designer] Load Definition');
const loadDefinitionSuccess = createAction('[Named List Designer] Load Definition Success', props());
const initDefinitionData = createAction('[Named List Designer] Init Definition Data', props());
const clearFields = createAction('[Named List Designer] Clear Fields');
const markDesignerPristine = createAction('[Named List Designer] Mark Designer Pristine');
const markDesignerDirty = createAction('[Named List Designer] Mark Designer Dirty');
const updateDefinitionModelFromDesigner = createAction('[Named List Designer] Update Definition Model From Designer', props());
const revertCustomization = createAction('[Named List Designer] Revert Customization');
const toggleDesignMode = createAction('[Named List Designer] Toggle Design Mode');
const saveDefinition = createAction('[Named List Designer] Save Definition');
const saveDefinitionSuccess = createAction('[Named List Designer] Save Definition Success', props());
const saveDefinitionError = createAction('[Named List Designer] Save Definition Error');
const destroy = createAction('[Named List Designer] Destroy');

class NamedListDesignerService {
    getDefinitionFromDefinitionModel(model, bundleId) {
        return {
            allowOverlay: model.customizationOptions.allowOverlay,
            description: model.description,
            fields: model.fields,
            guid: model.guid,
            labelFieldId: model.labelFieldId,
            lastChangedBy: model.lastChangedBy,
            lastUpdateTime: model.lastUpdateTime,
            name: model.name ? `${bundleId}:${model.name}` : null,
            overlayDescriptor: model.customizationOptions.overlayDescriptor,
            overlayGroupId: model.customizationOptions.overlayGroupId,
            owner: model.owner,
            queryCriteria: model.queryCriteria,
            recordDefinitionName: model.recordDefinitionName,
            scope: model.customizationOptions.scope,
            searchBehavior: model.searchBehavior,
            tags: model.tags,
            valueFieldId: model.valueFieldId,
            version: model.version
        };
    }
}
NamedListDesignerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: NamedListDesignerService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
NamedListDesignerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: NamedListDesignerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: NamedListDesignerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class ContextualLabelFieldsEditorModalComponent extends RxModalClass {
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
ContextualLabelFieldsEditorModalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ContextualLabelFieldsEditorModalComponent, selector: "rx-contextual-label-fields-editor-modal", viewQueries: [{ propertyName: "accordionTabEls", predicate: AdaptAccordionTabComponent, descendants: true, read: ElementRef }], usesInheritance: true, ngImport: i0, template: "<div class=\"designer-modal-body modal-body d-flex mh-100\">\n  <div class=\"row flex-grow-1 w-100\">\n    <div class=\"d-flex flex-column mh-100 col\">\n      <div class=\"d-flex align-items-start justify-content-between\">\n        <div>\n          <button\n            *ngIf=\"!config.isReadOnly\"\n            class=\"pl-0 pr-0\"\n            rx-id=\"add-contextual-label-field-button\"\n            adapt-button\n            type=\"button\"\n            btn-type=\"tertiary\"\n            [disabled]=\"isAddButtonDisabled$ | async\"\n            (click)=\"addField()\"\n          >\n            <span class=\"d-icon-left-plus_circle\"></span>\n            {{ 'com.bmc.arsys.rx.client.named-list-designer.contextual-label-fields.add-field.label' | translate }}\n          </button>\n        </div>\n\n        <div *ngIf=\"fieldsFormArray.length\" class=\"btn-group\">\n          <button adapt-button btn-type=\"tertiary\" type=\"button\" rx-id=\"expand-all-button\" (click)=\"expandAll()\">\n            {{ 'com.bmc.arsys.rx.client.common.expand-all.label' | translate }}\n          </button>\n\n          <button adapt-button btn-type=\"tertiary\" type=\"button\" rx-id=\"collapse-all-button\" (click)=\"collapseAll()\">\n            {{ 'com.bmc.arsys.rx.client.common.collapse-all.label' | translate }}\n          </button>\n        </div>\n      </div>\n\n      <div\n        *ngIf=\"fieldsFormArray.length\"\n        id=\"selected-field\"\n        class=\"designer-modal-accordion-wrapper\"\n        cdkDropList\n        (cdkDropListDropped)=\"onFieldDrop($event)\"\n      >\n        <adapt-accordion [multiselect]=\"true\">\n          <div\n            *ngFor=\"\n              let fieldFormGroup of fieldsFormArray.controls;\n              let index = index;\n              let first = first;\n              let last = last\n            \"\n            class=\"designer-modal-accordion-content\"\n            cdkDrag\n            cdkDragLockAxis=\"y\"\n            [cdkDragData]=\"fieldFormGroup\"\n            [cdkDragDisabled]=\"config.isReadOnly\"\n          >\n            <div *ngIf=\"!config.isReadOnly\" class=\"designer-modal-drag-handle d-icon-left-dots\" cdkDragHandle></div>\n            <adapt-accordion-tab\n              class=\"d-block\"\n              [formGroup]=\"fieldFormGroup\"\n              [isOpen]=\"fieldFormGroup.invalid || accordionExpansionState[fieldFormGroup.value.guid]\"\n              (open)=\"accordionExpansionState[fieldFormGroup.value.guid] = true\"\n              (close)=\"accordionExpansionState[fieldFormGroup.value.guid] = false\"\n            >\n              <div class=\"card-title-text w-100\">\n                <div class=\"designer-modal-card-title-content\">\n                  <div class=\"left-header-block\" [class.pl-0]=\"config.isReadOnly\">\n                    <div class=\"rx-ellipsis\" [title]=\"fieldFormGroup.value.fieldName\" rx-id=\"card-title\">\n                      {{ fieldFormGroup.value.fieldName }}\n                    </div>\n                  </div>\n\n                  <div *ngIf=\"!config.isReadOnly\" class=\"right-header-block\">\n                    <div class=\"designer-modal-card-title-index-buttons\">\n                      <button\n                        class=\"d-icon-left-triangle_down rx-button-unstyled\"\n                        type=\"button\"\n                        rx-id=\"move-down-button\"\n                        [disabled]=\"last\"\n                        (click)=\"$event.stopPropagation(); moveField(index, index + 1)\"\n                      ></button>\n                      <button\n                        class=\"d-icon-left-triangle_up rx-button-unstyled\"\n                        type=\"button\"\n                        rx-id=\"move-up-button\"\n                        [disabled]=\"first\"\n                        (click)=\"$event.stopPropagation(); moveField(index, index - 1)\"\n                      ></button>\n                    </div>\n\n                    <button\n                      class=\"d-icon-left-cross_adapt p-1 pr-4 ml-3\"\n                      adapt-button\n                      size=\"small\"\n                      type=\"button\"\n                      rx-id=\"remove-button\"\n                      (click)=\"$event.stopPropagation(); removeField(index)\"\n                    >\n                      {{ 'com.bmc.arsys.rx.client.common.remove.label' | translate }}\n                    </button>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"row align-items-start px-3\">\n                <rx-select-form-control\n                  [formControl]=\"fieldFormGroup.controls.id\"\n                  rx-id=\"contextual-label-field-id\"\n                  [options]=\"fieldSelectionConfig\"\n                  (ngModelChange)=\"onFieldSelect(fieldFormGroup, $event)\"\n                ></rx-select-form-control>\n                <adapt-rx-checkbox\n                  class=\"ml-5\"\n                  rx-id=\"contextual-label-field-visible\"\n                  label=\"{{\n                    'com.bmc.arsys.rx.client.named-list-designer.contextual-label-fields.editor.visible-field.label'\n                      | translate\n                  }}\"\n                  formControlName=\"visible\"\n                ></adapt-rx-checkbox>\n                <adapt-rx-checkbox\n                  class=\"ml-5\"\n                  rx-id=\"contextual-label-field-searchable\"\n                  label=\"{{\n                    'com.bmc.arsys.rx.client.named-list-designer.contextual-label-fields.editor.searchable-field.label'\n                      | translate\n                  }}\"\n                  formControlName=\"searchable\"\n                ></adapt-rx-checkbox>\n              </div>\n            </adapt-accordion-tab>\n          </div>\n        </adapt-accordion>\n      </div>\n\n      <div *ngIf=\"!fieldsFormArray.length\" class=\"d-flex justify-content-center h-100 align-items-center mt-2\">\n        <adapt-empty-state\n          class=\"w-100\"\n          label=\"{{\n            'com.bmc.arsys.rx.client.named-list-designer.contextual-label-fields.empty-state.message' | translate\n          }}\"\n          type=\"config\"\n        ></adapt-empty-state>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    *ngIf=\"!config.isReadOnly\"\n    adapt-button\n    btn-type=\"primary\"\n    type=\"button\"\n    rx-id=\"save-button\"\n    [disabled]=\"fieldsFormArray.invalid || fieldsFormArray.pristine\"\n    (click)=\"save()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button adapt-button btn-type=\"secondary\" type=\"button\" rx-id=\"cancel-button\" (click)=\"cancel()\">\n    {{\n      config.isReadOnly\n        ? ('com.bmc.arsys.rx.client.common.close.label' | translate)\n        : ('com.bmc.arsys.rx.client.common.cancel.label' | translate)\n    }}\n  </button>\n</div>\n", styles: [".designer-modal-body{height:645px;min-height:calc(100% - 61px)!important}.designer-modal-accordion-wrapper{display:flex;flex-direction:column;height:100%;overflow:auto;padding-top:10px}.designer-modal-accordion-content{position:relative}.designer-modal-accordion-content.cdk-drag-preview{z-index:1200!important}.designer-modal-drag-handle{cursor:move;position:absolute;top:0;left:0;height:46px;padding:14px 10px 14px 14px;z-index:1}.designer-modal-card-title-content{width:100%;display:flex}.designer-modal-card-title-content .left-header-block,.designer-modal-card-title-content .right-header-block{display:flex;align-items:center}.designer-modal-card-title-content .left-header-block{flex-grow:1;min-width:0;font-size:14px;padding-left:22px}.designer-modal-card-sub-title{color:#7c7f81;font-weight:normal}.designer-modal-card-title-index-buttons{display:flex;font-size:19px}.rx-card{overflow:auto}.rx-tree-draggable-node{cursor:pointer}.rx-tree-draggable-node.cdk-drag-preview{z-index:1200!important}.rx-tree-draggable-node.cdk-drag{opacity:1}.rx-tree-node-label{word-break:break-all}rx-form-builder{max-width:400px}:root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}adapt-accordion-tab adapt-rx-checkbox{height:38px;margin-top:1.5rem}rx-select-form-control{width:400px}\n"], components: [{ type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i1.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }, { type: i7.SelectFormControlComponent, selector: "rx-select-form-control", inputs: ["options", "appendToBody", "formControl"] }, { type: i1.AdaptRxCheckboxComponent, selector: "adapt-rx-checkbox", inputs: ["value", "checked", "indeterminate"], outputs: ["indeterminateChange"] }, { type: i1.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }], directives: [{ type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i7$1.CdkDropList, selector: "[cdkDropList], cdk-drop-list", inputs: ["cdkDropListConnectedTo", "id", "cdkDropListEnterPredicate", "cdkDropListSortPredicate", "cdkDropListDisabled", "cdkDropListSortingDisabled", "cdkDropListAutoScrollDisabled", "cdkDropListOrientation", "cdkDropListLockAxis", "cdkDropListData", "cdkDropListAutoScrollStep"], outputs: ["cdkDropListDropped", "cdkDropListEntered", "cdkDropListExited", "cdkDropListSorted"], exportAs: ["cdkDropList"] }, { type: i6.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i7$1.CdkDrag, selector: "[cdkDrag]", inputs: ["cdkDragDisabled", "cdkDragStartDelay", "cdkDragLockAxis", "cdkDragConstrainPosition", "cdkDragPreviewClass", "cdkDragBoundary", "cdkDragRootElement", "cdkDragPreviewContainer", "cdkDragData", "cdkDragFreeDragPosition"], outputs: ["cdkDragStarted", "cdkDragReleased", "cdkDragEnded", "cdkDragEntered", "cdkDragExited", "cdkDragDropped", "cdkDragMoved"], exportAs: ["cdkDrag"] }, { type: i7$1.CdkDragHandle, selector: "[cdkDragHandle]", inputs: ["cdkDragHandleDisabled"] }, { type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i2.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }], pipes: { "async": i6.AsyncPipe, "translate": i4.TranslatePipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
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

class ContextualLabelFieldsComponent extends ValueAccessor {
    constructor(rxModalService, translateService) {
        super();
        this.rxModalService = rxModalService;
        this.translateService = translateService;
        this.vmSubject = new BehaviorSubject({
            fieldNames: [],
            isEditorDisabled: true,
            isFieldRemovable: false
        });
        this.vm$ = this.vmSubject.asObservable();
    }
    ngOnInit() {
        var _a;
        (_a = this.value) !== null && _a !== void 0 ? _a : (this.value = []);
        this.updateViewValues();
    }
    focus(data) {
        this.openContextualLabelFieldsEditor(data.fieldIndex);
    }
    onWriteValue(value) {
        if (!isNil(value)) {
            this.updateViewValues();
        }
    }
    ngOnChanges(changes) {
        this.updateViewValues();
    }
    updateViewValues() {
        const fieldNames = this.value.map((field) => { var _a, _b; return (_b = (_a = this.options.options.find(({ id }) => id === field.id)) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : ''; });
        this.vmSubject.next({
            fieldNames,
            isEditorDisabled: this.isDisabled && !fieldNames.length,
            isFieldRemovable: !this.isDisabled
        });
    }
    openContextualLabelFieldsEditor(activeFieldIndex) {
        this.rxModalService
            .openModal({
            title: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.contextual-label-fields.edit-fields.label'),
            data: {
                contextualLabelFields: this.value ? cloneDeep(this.value) : [],
                options: this.options.options,
                isReadOnly: this.isDisabled,
                activeFieldIndex
            },
            content: ContextualLabelFieldsEditorModalComponent,
            testID: 'edit-contextual-label-fields'
        })
            .then((contextualLabelFields) => {
            this.value = contextualLabelFields;
        })
            .catch(noop);
    }
    editContextualLabelField(activeFieldIndex) {
        this.openContextualLabelFieldsEditor(activeFieldIndex);
    }
    removeContextualLabelField(activeFieldIndex) {
        this.value = without(this.value, this.value[activeFieldIndex]);
    }
}
ContextualLabelFieldsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ContextualLabelFieldsComponent, deps: [{ token: i4$1.RxModalService }, { token: i4.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
ContextualLabelFieldsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ContextualLabelFieldsComponent, selector: "rx-contextual-label-fields", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: ContextualLabelFieldsComponent,
            multi: true
        }
    ], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<ng-container *ngIf=\"vm$ | async as vm\">\n  <div class=\"pb-1\">\n    <adapt-button\n      btn-type=\"tertiary\"\n      rx-id=\"open-contextual-label-fields-editor-link\"\n      class=\"d-icon-plus_circle p-0\"\n      (click)=\"openContextualLabelFieldsEditor()\"\n      [disabled]=\"vm.isEditorDisabled\"\n    >\n      {{ 'com.bmc.arsys.rx.client.named-list-designer.contextual-label-fields.edit-fields.label' | translate }}\n    </adapt-button>\n    <adapt-icon\n      name=\"question_circle_o\"\n      class=\"ml-2\"\n      placement=\"right\"\n      maxWidth=\"400\"\n      [adaptPopover]=\"\n        'com.bmc.arsys.rx.client.named-list-designer.contextual-label-fields.edit-fields.tooltip' | translate\n      \"\n    ></adapt-icon>\n  </div>\n\n  <span *ngIf=\"!vm.fieldNames.length\" class=\"text-tertiary\" rx-id=\"contextual-label-empty-state\">{{\n    'com.bmc.arsys.rx.client.named-list-designer.contextual-label-fields.empty-state.message' | translate\n  }}</span>\n\n  <div *ngIf=\"vm.fieldNames.length\" rx-id=\"contextual-label-fields\">\n    <div\n      *ngFor=\"let fieldName of vm.fieldNames; let index = index\"\n      class=\"d-flex border rounded px-2 mb-1 align-items-center\"\n    >\n      <strong class=\"flex-grow-1\">{{ fieldName }}</strong>\n      <adapt-button\n        btn-type=\"tertiary\"\n        class=\"d-icon-right-pencil p-1\"\n        rx-id=\"edit-button\"\n        (click)=\"editContextualLabelField(index)\"\n      ></adapt-button>\n      <adapt-button\n        btn-type=\"tertiary\"\n        class=\"d-icon-right-cross_adapt p-1\"\n        rx-id=\"remove-button\"\n        *ngIf=\"vm.isFieldRemovable\"\n        (click)=\"removeContextualLabelField(index)\"\n      ></adapt-button>\n    </div>\n  </div>\n</ng-container>\n", components: [{ type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1.AdaptIconComponent, selector: "adapt-icon", inputs: ["name", "classList", "description", "testID"] }], directives: [{ type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.AdaptPopoverDirective, selector: "[adaptPopover]", inputs: ["adaptPopover", "popoverTitle", "placement", "fallbackPlacement", "triggers", "container", "appendToBody", "closeBtn", "popupDelay", "disablePopover", "popoverClass", "autoClose", "closeOnOutOfView", "maxWidth", "minWidth"], outputs: ["shown", "hidden"], exportAs: ["adaptPopover"] }, { type: i6.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "async": i6.AsyncPipe, "translate": i4.TranslatePipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ContextualLabelFieldsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-contextual-label-fields',
                    templateUrl: './contextual-label-fields.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: ContextualLabelFieldsComponent,
                            multi: true
                        }
                    ],
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i4$1.RxModalService }, { type: i4.TranslateService }]; }, propDecorators: { options: [{
                type: Input
            }] } });

class RxNamedListDesignerComponent {
    constructor(injector, store$, namedListDesignerService, rxGlobalCacheService, rxModalService, rxRecordDefinitionCacheService, translateService, rxOverlayService, rxNotificationService, rxExpressionEditorService, rxFeatureService) {
        this.injector = injector;
        this.store$ = store$;
        this.namedListDesignerService = namedListDesignerService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxModalService = rxModalService;
        this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
        this.translateService = translateService;
        this.rxOverlayService = rxOverlayService;
        this.rxNotificationService = rxNotificationService;
        this.rxExpressionEditorService = rxExpressionEditorService;
        this.rxFeatureService = rxFeatureService;
        this.definitionSaved = new EventEmitter();
        this.definitionErrorLoading = new EventEmitter();
        this.closeDesigner = new EventEmitter();
        this.bundleId$ = this.store$.select(bundleIdSelector);
        this.bundleFriendlyName$ = this.bundleId$.pipe(switchMap((bundleId) => this.rxGlobalCacheService.getBundleFriendlyName(bundleId)));
        this.destroyed$ = new ReplaySubject(1);
        this.expressionConfigurator = new RxNamedListExpressionConfigurator(this.injector);
        this.isFormInitialized = false;
        this.definitionModel$ = this.store$.select(definitionModelSelector);
        this.isDirty$ = this.store$.select(isDirtySelector);
        this.originalDefinition$ = this.store$.select(originalDefinitionSelector);
        this.definitionModelFromDefinition$ = this.store$.select(definitionModelFromDefinitionSelector);
        this.definitionFromDefinitionModel$ = this.definitionModel$.pipe(withLatestFrom(this.bundleId$), map(([definitionModel, bundleId]) => this.namedListDesignerService.getDefinitionFromDefinitionModel(definitionModel, bundleId)));
        this.recordDefinition$ = this.definitionModel$.pipe(switchMap((definitionModel) => definitionModel.recordDefinitionName
            ? this.rxRecordDefinitionCacheService.getRecordDefinition(definitionModel.recordDefinitionName)
            : of(null)), shareReplay(1));
        this.textFieldNameOptions$ = this.recordDefinition$.pipe(map((recordDefinition) => recordDefinition
            ? recordDefinition.fieldDefinitions
                .filter(({ resourceType }) => [
                RX_RECORD_DEFINITION.resourceTypes.character,
                RX_RECORD_DEFINITION.resourceTypes.localizedCharacter
            ].includes(resourceType))
                .map(({ id, name }) => ({ id, name }))
            : []));
        this.validationIssues$ = combineLatest([
            this.definitionModel$,
            this.textFieldNameOptions$
        ]).pipe(map(([definitionModel, textFieldNameOptions]) => this.validate(definitionModel, textFieldNameOptions)), shareReplay(1));
        this.hasValidationErrors$ = this.validationIssues$.pipe(map((issueSections) => some(issueSections, {
            issues: [{ type: ValidationIssueType.Error }]
        })));
        this.areNewDefinitionsAllowed$ = this.bundleId$.pipe(switchMap((bundleId) => this.rxOverlayService.areNewDefinitionsAllowed(bundleId)));
        this.isReadOnly$ = this.definitionFromDefinitionModel$.pipe(filter((definition) => !!definition.lastUpdateTime), withLatestFrom(this.areNewDefinitionsAllowed$), map(([definition, areNewDefinitionsAllowed]) => !areNewDefinitionsAllowed || !this.rxOverlayService.isCustomizationEnabled('allowOverlay', definition)), tap((isReadOnly) => {
            if (isReadOnly) {
                this.rxNotificationService.addWarningMessage(this.translateService.instant('com.bmc.arsys.rx.client.designer.read-only-definition-warning.message'));
            }
        }), startWith(false), shareReplay(1));
        this.isSaveButtonDisabled$ = combineLatest([
            this.hasValidationErrors$,
            this.isReadOnly$,
            this.isDirty$
        ]).pipe(map(([hasValidationErrors, isReadOnly, isDirty]) => hasValidationErrors || isReadOnly || !isDirty));
        this.inspectorFocusEditorSubject = new Subject();
        this.inspectorFocusEditor$ = this.inspectorFocusEditorSubject.asObservable();
        this.isExistingDefinition$ = this.definitionModelFromDefinition$.pipe(map((model) => Boolean(model.lastUpdateTime)));
        this.breadcrumbItems$ = this.definitionModel$.pipe(map((model) => [
            {
                label: model.name ||
                    `<${this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.new-named-list.label')}>`,
                data: {}
            }
        ]));
        this.definitionInspectorConfig$ = combineLatest([
            this.definitionModel$,
            this.recordDefinition$,
            this.textFieldNameOptions$,
            this.isReadOnly$
        ]).pipe(map(([definitionModel, recordDefinition, textFieldNameOptions, isReadOnly]) => this.getFormBuilderConfig(definitionModel, recordDefinition, textFieldNameOptions, isReadOnly)));
        this.isDesignMode$ = this.store$.select(isDesignModeSelector);
        this.definitionForJsonViewer$ = this.isDesignMode$.pipe(switchMap((isDesignMode) => isDesignMode
            ? of(null)
            : combineLatest([this.definitionFromDefinitionModel$, this.originalDefinition$]).pipe(map(([definitionFromDefinitionModel, originalDefinition]) => (Object.assign(Object.assign({}, originalDefinition), definitionFromDefinitionModel))))));
        this.vm$ = combineLatest([
            this.breadcrumbItems$,
            this.bundleFriendlyName$,
            this.hasValidationErrors$,
            this.isExistingDefinition$,
            this.isSaveButtonDisabled$,
            this.definitionForJsonViewer$,
            this.definitionModel$,
            this.definitionInspectorConfig$,
            this.validationIssues$
        ]).pipe(map(([breadcrumbItems, bundleFriendlyName, hasValidationErrors, isExistingDefinition, isSaveButtonDisabled, definitionForJsonViewer, definitionModel, definitionInspectorConfig, validationIssues]) => ({
            breadcrumbItems,
            bundleFriendlyName,
            hasValidationErrors,
            isExistingDefinition,
            isSaveButtonDisabled,
            definitionForJsonViewer,
            definitionModel,
            definitionInspectorConfig,
            validationIssues
        })));
    }
    ngOnChanges(changes) {
        if (changes.configuration.currentValue) {
            this.store$.dispatch(init({ payload: this.configuration }));
        }
    }
    ngOnInit() {
        this.store$
            .select(savedDefinitionNameSelector)
            .pipe(skip(1), filter(Boolean), takeUntil(this.destroyed$))
            .subscribe((savedDefinitionName) => {
            this.definitionSaved.emit(savedDefinitionName);
        });
        this.expressionConfigurator.configureForProperty({
            propertyPath: 'queryCriteria',
            dataDictionary$: this.definitionModel$.pipe(switchMap((definitionModel) => this.expressionConfigurator.namedListExpressionDataDictionary(definitionModel))),
            operators: ExpressionOperatorRowsByGroup.get(ExpressionOperatorGroup.All)
        });
    }
    canDeactivate() {
        let canDeactivate = true;
        this.isDirty$.pipe(take(1)).subscribe((isDirty) => {
            canDeactivate = !isDirty;
        });
        return canDeactivate;
    }
    onToggleDesignMode() {
        this.store$.dispatch(toggleDesignMode());
    }
    onCorrectIssue(validationIssue) {
        this.inspectorFocusEditorSubject.next({
            editorName: validationIssue.data.propertyName,
            data: validationIssue.data.data
        });
    }
    onModelChange(newDefinitionModel) {
        if (this.isFormInitialized) {
            this.store$.dispatch(updateDefinitionModelFromDesigner({
                definitionModelFromDesigner: newDefinitionModel
            }));
        }
    }
    onFormInitialized() {
        this.isFormInitialized = true;
    }
    onEditorEvent(event) {
        if (event.type === RX_REVERT_CUSTOMIZATION.events.revertCustomization) {
            this.revertCustomization();
        }
        if (event.type === RX_EXPRESSION_EDITOR.events.openExpressionEditor) {
            this.openExpressionEditor(event);
        }
    }
    openExpressionEditor(event) {
        this.definitionModel$.pipe(take(1)).subscribe((definitionModel) => {
            this.rxExpressionEditorService
                .openEditor({
                property: {
                    path: event.payload.propertyPath,
                    value: definitionModel.queryCriteria,
                    label: event.payload.propertyLabel
                },
                isReadOnly: event.payload.isReadOnly,
                expressionConfigurator: this.expressionConfigurator,
                legend: [
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.field-name.label'),
                        icon: 'd-icon-arrow_right_square_input'
                    }
                ]
            })
                .subscribe((expression) => {
                this.store$.dispatch(updateDefinitionModelFromDesigner({
                    definitionModelFromDesigner: { queryCriteria: expression.value }
                }));
            });
        });
    }
    revertCustomization() {
        this.store$.dispatch(revertCustomization());
    }
    onSave() {
        this.store$.dispatch(saveDefinition());
    }
    validate(definitionModel, textFieldNameOptions) {
        var _a;
        const validationIssues = [];
        if (isEmpty(trim(definitionModel.name))) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label')
                }),
                data: {
                    propertyName: 'name'
                }
            });
        }
        else if (!RX_RECORD_DEFINITION.validDefinitionNameRegex.test(definitionModel.name)) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.name-validation.message'),
                data: {
                    propertyName: 'name'
                }
            });
        }
        if (isEmpty(trim(definitionModel.recordDefinitionName))) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.record-definition-field.label')
                }),
                data: {
                    propertyName: 'recordDefinitionName'
                }
            });
        }
        if (isNil(definitionModel.labelFieldId)) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.display-name-field.label')
                }),
                data: {
                    propertyName: 'labelFieldId'
                }
            });
        }
        if (isNil(definitionModel.valueFieldId)) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.value-field.label')
                }),
                data: {
                    propertyName: 'valueFieldId'
                }
            });
        }
        if (definitionModel.recordDefinitionName) {
            (_a = definitionModel.fields) === null || _a === void 0 ? void 0 : _a.forEach((field, index) => {
                if (!textFieldNameOptions.some(({ id }) => id === field.id)) {
                    validationIssues.push({
                        type: ValidationIssueType.Error,
                        description: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.contextual-label-fields.unknown-field.message'),
                        data: {
                            propertyName: 'fields',
                            data: {
                                fieldIndex: index
                            }
                        }
                    });
                }
            });
        }
        return validationIssues.length
            ? [
                {
                    title: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.new-named-list.label'),
                    issues: validationIssues
                }
            ]
            : [];
    }
    getFieldNameOptions(recordDefinition) {
        return recordDefinition.fieldDefinitions.map(({ id, name }) => ({ id, name }));
    }
    getFormBuilderConfig(definitionModel, recordDefinition, textFieldNameOptions, isReadOnly) {
        return [
            {
                controls: [
                    {
                        name: 'name',
                        component: TextFormControlComponent,
                        isDisabled: Boolean(definitionModel.lastUpdateTime),
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label'),
                            required: true
                        }
                    },
                    {
                        name: 'recordDefinitionName',
                        component: RxDefinitionPickerComponent,
                        isDisabled: isReadOnly,
                        options: {
                            definitionType: RxDefinitionPickerType.Record,
                            label: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.record-definition-field.label'),
                            required: true,
                            beforeValueChange: (oldValue) => {
                                var _a;
                                if (Boolean(oldValue) &&
                                    (definitionModel.labelFieldId ||
                                        definitionModel.valueFieldId ||
                                        ((_a = definitionModel.fields) === null || _a === void 0 ? void 0 : _a.length) ||
                                        definitionModel.queryCriteria)) {
                                    const message = this.rxFeatureService.isFeatureEnabled('DRD21-43103')
                                        ? this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.clear-values-confirmation.message')
                                        : 'Display name field, Value field, and Filter expression will be cleared. Do you want to continue?';
                                    return this.rxModalService
                                        .confirm({
                                        title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                                        modalStyle: RX_MODAL.modalStyles.warning,
                                        message
                                    })
                                        .then((isConfirmed) => {
                                        if (isConfirmed) {
                                            setTimeout(() => {
                                                this.store$.dispatch(clearFields());
                                            });
                                        }
                                        return isConfirmed;
                                    });
                                }
                                return Promise.resolve(true);
                            }
                        }
                    },
                    {
                        name: 'queryCriteria',
                        component: ExpressionFormControlComponent,
                        isDisabled: !definitionModel.recordDefinitionName || isReadOnly,
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.filter-expression-field.label'),
                            tooltip: new Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.filter-expression-field.tooltip')),
                            dataDictionary$: this.expressionConfigurator.getDataDictionary('queryCriteria'),
                            operators: this.expressionConfigurator.getOperators()
                        }
                    },
                    {
                        name: 'searchBehavior',
                        component: SelectFormControlComponent,
                        isDisabled: isReadOnly,
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.search-behavior-field.label'),
                            tooltip: new Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.search-behavior-field.tooltip')),
                            required: true,
                            options: [
                                {
                                    id: RX_NAMED_LIST_DEFINITION.searchBehaviorTypes.contains,
                                    name: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.search-behavior.contains.label')
                                },
                                {
                                    id: RX_NAMED_LIST_DEFINITION.searchBehaviorTypes.startsWith,
                                    name: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.search-behavior.starts-with.label')
                                },
                                {
                                    id: RX_NAMED_LIST_DEFINITION.searchBehaviorTypes.exactMatch,
                                    name: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.search-behavior.exact-match.label')
                                }
                            ],
                            emptyOption: false,
                            sortAlphabetically: false
                        },
                        hidden: !this.rxFeatureService.isFeatureEnabled('DRD21-43015')
                    },
                    {
                        name: 'labelFieldId',
                        component: SelectFormControlComponent,
                        isDisabled: !definitionModel.recordDefinitionName || isReadOnly,
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.display-name-field.label'),
                            required: true,
                            tooltip: new Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.display-name-field.tooltip')),
                            emptyOption: true,
                            options: recordDefinition ? this.getFieldNameOptions(recordDefinition) : []
                        }
                    },
                    {
                        name: 'valueFieldId',
                        component: SelectFormControlComponent,
                        isDisabled: !definitionModel.recordDefinitionName || isReadOnly,
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.value-field.label'),
                            required: true,
                            tooltip: new Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.value-field.tooltip')),
                            emptyOption: true,
                            options: recordDefinition ? this.getFieldNameOptions(recordDefinition) : []
                        }
                    },
                    {
                        name: 'fields',
                        component: ContextualLabelFieldsComponent,
                        isDisabled: !definitionModel.recordDefinitionName || isReadOnly,
                        options: {
                            options: textFieldNameOptions
                        },
                        hidden: !this.rxFeatureService.isFeatureEnabled('DRD21-43103')
                    },
                    {
                        component: RxRevertCustomizationComponent,
                        options: {
                            allowOverlay: definitionModel.customizationOptions.allowOverlay,
                            scope: definitionModel.customizationOptions.scope,
                            overlayGroupId: definitionModel.customizationOptions.overlayGroupId,
                            overlayDescriptor: definitionModel.customizationOptions.overlayDescriptor
                        }
                    },
                    {
                        name: 'customizationOptions',
                        component: CustomizationOptionsComponent,
                        isDisabled: isReadOnly,
                        options: {
                            definitionTypeDisplayName: this.translateService
                                .instant('com.bmc.arsys.rx.client.named-list-definition.label')
                                .toLowerCase(),
                            allowOverlay: definitionModel.customizationOptions.allowOverlay,
                            scope: definitionModel.customizationOptions.scope,
                            overlayGroupId: definitionModel.customizationOptions.overlayGroupId,
                            overlayDescriptor: definitionModel.customizationOptions.overlayDescriptor
                        }
                    }
                ]
            }
        ];
    }
    ngOnDestroy() {
        this.inspectorFocusEditorSubject.complete();
        this.destroyed$.next(true);
        this.destroyed$.complete();
        this.store$.dispatch(destroy());
    }
}
RxNamedListDesignerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedListDesignerComponent, deps: [{ token: i0.Injector }, { token: i1$1.Store }, { token: NamedListDesignerService }, { token: i3$1.RxGlobalCacheService }, { token: i4$1.RxModalService }, { token: i5.RxRecordDefinitionCacheService }, { token: i4.TranslateService }, { token: i3$1.RxOverlayService }, { token: i3$1.RxNotificationService }, { token: i7.RxExpressionEditorService }, { token: i3$1.RxFeatureService }], target: i0.ɵɵFactoryTarget.Component });
RxNamedListDesignerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxNamedListDesignerComponent, selector: "rx-named-list-designer", inputs: { configuration: "configuration" }, outputs: { definitionSaved: "definitionSaved", definitionErrorLoading: "definitionErrorLoading", closeDesigner: "closeDesigner" }, usesOnChanges: true, ngImport: i0, template: "<ng-container *ngIf=\"vm$ | async as vm\">\n  <rx-designer-header\n    [bundleName]=\"vm.bundleFriendlyName\"\n    [breadcrumbItems]=\"vm.breadcrumbItems\"\n    [isSaveButtonDisabled]=\"vm.isSaveButtonDisabled\"\n    (closeDesigner)=\"closeDesigner.emit()\"\n    (save)=\"onSave()\"\n    (toggleDesignMode)=\"onToggleDesignMode()\"\n    [isDesignMode]=\"!vm.definitionForJsonViewer\"\n  ></rx-designer-header>\n\n  <div class=\"rx-designer-component\" [hidden]=\"vm.definitionForJsonViewer\">\n    <adapt-sidebar position=\"right\" panelWidth=\"280px\" [openedId]=\"0\">\n      <adapt-sidebar-item\n        headerTitle=\"{{ 'com.bmc.arsys.rx.client.designer.validation-issues.label' | translate }}\"\n        tooltipText=\"{{ 'com.bmc.arsys.rx.client.designer.validation-issues.label' | translate }}\"\n        rx-id=\"validation-issues\"\n        [iconClass]=\"vm.hasValidationErrors ? 'd-icon-exclamation_triangle text-danger' : 'd-icon-exclamation_triangle'\"\n      >\n        <rx-validation-issues\n          [definitionTypeDisplayName]=\"'com.bmc.arsys.rx.client.common.named-list-definition.label' | translate\"\n          [issueSections]=\"vm.validationIssues\"\n          (correctIssue)=\"onCorrectIssue($event)\"\n        ></rx-validation-issues>\n      </adapt-sidebar-item>\n\n      <div class=\"main rx-designer-container h-100\">\n        <h1 class=\"mt-0\">\n          {{\n            vm.isExistingDefinition\n              ? ('com.bmc.arsys.rx.client.named-list-designer.edit-named-list.title' | translate)\n              : ('com.bmc.arsys.rx.client.named-list-designer.create-named-list.title' | translate)\n          }}\n        </h1>\n\n        <rx-form-builder\n          [config]=\"vm.definitionInspectorConfig\"\n          [model]=\"vm.definitionModel\"\n          (editorEvent)=\"onEditorEvent($event)\"\n          [focusEditor$]=\"inspectorFocusEditor$\"\n          (formInitialized)=\"onFormInitialized()\"\n          (modelChange)=\"onModelChange($event)\"\n        ></rx-form-builder>\n      </div>\n    </adapt-sidebar>\n  </div>\n\n  <adapt-code-viewer\n    *ngIf=\"vm.definitionForJsonViewer\"\n    [code]=\"vm.definitionForJsonViewer | json\"\n    [lang]=\"'javascript'\"\n    [hasToolbar]=\"false\"\n    [theme]=\"'light'\"\n    class=\"full-size\"\n  ></adapt-code-viewer>\n</ng-container>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:flex;flex-direction:column;height:100%;width:100%}.rx-designer-component{height:calc(100% - 50px)}.rx-designer-container{display:flex;flex-direction:column;flex-grow:1;padding:1rem}rx-form-builder{max-width:400px}:host ::ng-deep .has-validation-errors .nav-link .d-icon-exclamation_triangle{color:#f83200}:host ::ng-deep adapt-tabset .nav-tabs .nav-link-icon{margin-right:0}:host ::ng-deep .adapt-sidebar-main{overflow:auto}\n"], components: [{ type: i7.RxDesignerHeaderComponent, selector: "rx-designer-header", inputs: ["bundleName", "breadcrumbItems", "isDesignMode", "isPreviewAvailable", "isSaveButtonDisabled"], outputs: ["breadcrumbSelected", "toggleDesignMode", "showPreview", "save", "closeDesigner"] }, { type: i1.AdaptSidebarComponent, selector: "adapt-sidebar", inputs: ["className", "navClassName", "panelWidth", "panel2Width", "position", "theme", "widthLimit", "openedId", "adjustMainContainerWidth"], outputs: ["openedIdChange", "isPanelOpenedCurrently"], exportAs: ["adaptSidebar"] }, { type: i1.AdaptSidebarItemComponent, selector: "adapt-sidebar-item", inputs: ["iconClass", "headerTitle", "tooltipText", "aria-label"] }, { type: i4$1.RxValidationIssuesComponent, selector: "rx-validation-issues", inputs: ["definitionTypeDisplayName", "issueSections"], outputs: ["correctIssue"] }, { type: i7.FormBuilderComponent, selector: "rx-form-builder", inputs: ["config", "model", "guid", "isReadOnly", "focusEditor$"], outputs: ["modelChange", "editorEvent", "formInitialized"] }, { type: i1.AdaptCodeViewerComponent, selector: "adapt-code-viewer", inputs: ["code", "theme", "lang", "texts", "hasToolbar"] }], directives: [{ type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "async": i6.AsyncPipe, "translate": i4.TranslatePipe, "json": i6.JsonPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedListDesignerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-named-list-designer',
                    templateUrl: './named-list-designer.component.html',
                    styleUrls: ['./named-list-designer.component.scss'],
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1$1.Store }, { type: NamedListDesignerService }, { type: i3$1.RxGlobalCacheService }, { type: i4$1.RxModalService }, { type: i5.RxRecordDefinitionCacheService }, { type: i4.TranslateService }, { type: i3$1.RxOverlayService }, { type: i3$1.RxNotificationService }, { type: i7.RxExpressionEditorService }, { type: i3$1.RxFeatureService }]; }, propDecorators: { configuration: [{
                type: Input
            }], definitionSaved: [{
                type: Output
            }], definitionErrorLoading: [{
                type: Output
            }], closeDesigner: [{
                type: Output
            }] } });

class NamedListDesignerEffects {
    constructor(store$, actions$, errorHandler, rxDefinitionUpdateService, namedListDesignerService, rxNotificationService, translateService, rxNamedListDefinitionService, rxDefinitionNameService, rxComponentCanDeactivateGuard) {
        this.store$ = store$;
        this.actions$ = actions$;
        this.errorHandler = errorHandler;
        this.rxDefinitionUpdateService = rxDefinitionUpdateService;
        this.namedListDesignerService = namedListDesignerService;
        this.rxNotificationService = rxNotificationService;
        this.translateService = translateService;
        this.rxNamedListDefinitionService = rxNamedListDefinitionService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxComponentCanDeactivateGuard = rxComponentCanDeactivateGuard;
        this.initNamedListDesigner$ = createEffect(() => this.actions$.pipe(ofType(init), map((action) => loadDefinition())));
        this.loadDefinition$ = createEffect(() => this.actions$.pipe(ofType(loadDefinition), withLatestFrom(this.store$.select(definitionNameSelector)), switchMap(([action, definitionName]) => definitionName
            ? this.rxNamedListDefinitionService.get(definitionName)
            : this.rxNamedListDefinitionService.getNew()), map((definition) => loadDefinitionSuccess({
            definition
        }))));
        this.loadDefinitionSuccess$ = createEffect(() => this.actions$.pipe(ofType(loadDefinitionSuccess), map((action) => {
            let definitionModelFromDefinition = {
                version: action.definition.version,
                lastUpdateTime: action.definition.lastUpdateTime,
                lastChangedBy: action.definition.lastChangedBy,
                owner: action.definition.owner,
                name: this.rxDefinitionNameService.getDisplayName(action.definition.name),
                tags: action.definition.tags,
                description: action.definition.description,
                guid: action.definition.guid,
                recordDefinitionName: action.definition.recordDefinitionName,
                queryCriteria: action.definition.queryCriteria,
                searchBehavior: action.definition.searchBehavior,
                labelFieldId: action.definition.labelFieldId,
                valueFieldId: action.definition.valueFieldId,
                fields: action.definition.fields,
                customizationOptions: {
                    isDisabled: false,
                    definitionTypeDisplayName: null,
                    allowOverlay: action.definition.allowOverlay,
                    scope: action.definition.scope,
                    overlayGroupId: action.definition.overlayGroupId,
                    overlayDescriptor: action.definition.overlayDescriptor
                }
            };
            return initDefinitionData({
                definition: action.definition,
                definitionModel: definitionModelFromDefinition
            });
        })));
        this.revertCustomization$ = createEffect(() => this.actions$.pipe(ofType(revertCustomization), withLatestFrom(this.store$.select(definitionModelSelector), this.store$.select(bundleIdSelector)), switchMap(([_, definitionModel, bundleId]) => this.rxNamedListDefinitionService.revertCustomization(`${bundleId}:${definitionModel.name}`)), tap(() => {
            this.rxComponentCanDeactivateGuard.disable();
            window.location.reload();
        })), { dispatch: false });
        this.markPristine$ = createEffect(() => this.actions$.pipe(ofType(initDefinitionData, saveDefinition), map(() => markDesignerPristine())));
        this.markDirty$ = createEffect(() => this.actions$.pipe(ofType(updateDefinitionModelFromDesigner, saveDefinitionError), map(() => markDesignerDirty())));
        this.saveDefinition$ = createEffect(() => this.actions$.pipe(ofType(saveDefinition), withLatestFrom(this.store$.select(definitionModelSelector), this.store$.select(originalDefinitionSelector), this.store$.select(bundleIdSelector)), switchMap(([_, definitionModel, originalDefinition, bundleId]) => {
            const definition = Object.assign(Object.assign({}, originalDefinition), this.namedListDesignerService.getDefinitionFromDefinitionModel(definitionModel, bundleId));
            return (definition.lastUpdateTime
                ? this.rxDefinitionUpdateService.execute(this.rxNamedListDefinitionService.update.bind(this.rxNamedListDefinitionService, definition))
                : this.rxNamedListDefinitionService.create(definition)).pipe(map((response) => {
                const definitionName = decodeURIComponent(last(response === null || response === void 0 ? void 0 : response.headers.get('location').split('/')) || '') ||
                    this.rxDefinitionNameService.getDefinitionName(bundleId, definitionModel.name);
                return saveDefinitionSuccess({
                    savedDefinitionName: definitionName
                });
            }), catchError((error) => {
                this.errorHandler.handleError(error);
                return of(saveDefinitionError());
            }));
        })));
        this.saveDefinitionSuccess$ = createEffect(() => this.actions$.pipe(ofType(saveDefinitionSuccess), withLatestFrom(this.store$.select(definitionNameSelector)), tap(() => {
            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.designer.definition-saved-successfully.message', {
                definitionTypeDisplayName: this.translateService.instant('com.bmc.arsys.rx.client.common.named-list-definition.label')
            }));
        }), filter(([action, definitionName]) => !!definitionName), map(() => loadDefinition())));
    }
}
NamedListDesignerEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: NamedListDesignerEffects, deps: [{ token: i1$1.Store }, { token: i2$1.Actions }, { token: i0.ErrorHandler }, { token: i3$1.RxDefinitionUpdateService }, { token: NamedListDesignerService }, { token: i3$1.RxNotificationService }, { token: i4.TranslateService }, { token: i6$1.RxNamedListDefinitionService }, { token: i3$1.RxDefinitionNameService }, { token: i3$1.RxComponentCanDeactivateGuard }], target: i0.ɵɵFactoryTarget.Injectable });
NamedListDesignerEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: NamedListDesignerEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: NamedListDesignerEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$1.Store }, { type: i2$1.Actions }, { type: i0.ErrorHandler }, { type: i3$1.RxDefinitionUpdateService }, { type: NamedListDesignerService }, { type: i3$1.RxNotificationService }, { type: i4.TranslateService }, { type: i6$1.RxNamedListDefinitionService }, { type: i3$1.RxDefinitionNameService }, { type: i3$1.RxComponentCanDeactivateGuard }]; } });

const initialModel = {
    name: null,
    customizationOptions: {
        allowOverlay: false,
        overlayGroupId: null,
        overlayDescriptor: null,
        scope: 'BUNDLE',
        isDisabled: false,
        definitionTypeDisplayName: null
    }
};
const initialState = {
    bundleId: null,
    definitionName: null,
    isDesignMode: true,
    definitionModel: initialModel,
    definitionModelFromDefinition: initialModel,
    isDirty: false,
    savedDefinitionName: null,
    originalDefinition: null
};
const reducer = createReducer(initialState, on(init, (state, { payload }) => (Object.assign(Object.assign({}, initialState), { bundleId: payload.bundleId, definitionName: payload.definitionName }))), on(initDefinitionData, (state, { definition, definitionModel }) => (Object.assign(Object.assign({}, state), { definitionModel, definitionModelFromDefinition: definitionModel, originalDefinition: definition }))), on(clearFields, (state) => (Object.assign(Object.assign({}, state), { definitionModel: Object.assign(Object.assign({}, state.definitionModel), { fields: [], queryCriteria: null, labelFieldId: null, valueFieldId: null }) }))), on(markDesignerPristine, (state) => (Object.assign(Object.assign({}, state), { isDirty: false }))), on(markDesignerDirty, (state) => (Object.assign(Object.assign({}, state), { isDirty: true }))), on(toggleDesignMode, (state) => (Object.assign(Object.assign({}, state), { isDesignMode: !state.isDesignMode }))), on(updateDefinitionModelFromDesigner, (state, { definitionModelFromDesigner }) => (Object.assign(Object.assign({}, state), { definitionModel: Object.assign(Object.assign({}, state.definitionModel), definitionModelFromDesigner) }))), on(saveDefinitionSuccess, (state, { savedDefinitionName }) => (Object.assign(Object.assign({}, state), { savedDefinitionName }))), on(destroy, (state) => (Object.assign({}, initialState))));
function namedListDesignerModelReducer(state, action) {
    return reducer(state, action);
}

class RxNamedListDesignerModule {
}
RxNamedListDesignerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedListDesignerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxNamedListDesignerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedListDesignerModule, declarations: [ContextualLabelFieldsComponent,
        ContextualLabelFieldsEditorModalComponent,
        RxNamedListDesignerComponent], imports: [AdaptAccordionModule,
        AdaptButtonModule,
        AdaptCodeViewerModule,
        AdaptEmptyStateModule,
        AdaptIconModule,
        AdaptPopoverModule,
        AdaptSidebarModule,
        AdaptTabsModule,
        AdaptRxFormsModule,
        CommonModule,
        DragDropModule,
        FormsModule,
        ReactiveFormsModule,
        RxDesignerHeaderModule,
        RxFormBuilderModule,
        RxValidationIssuesModule,
        RxDefinitionPickerModule,
        ExpressionFormControlModule,
        SelectFormControlModule,
        CustomizationOptionsModule,
        RxRevertCustomizationModule,
        TranslateModule, i1$1.StoreFeatureModule, i2$1.EffectsFeatureModule], exports: [RxNamedListDesignerComponent] });
RxNamedListDesignerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedListDesignerModule, imports: [[
            AdaptAccordionModule,
            AdaptButtonModule,
            AdaptCodeViewerModule,
            AdaptEmptyStateModule,
            AdaptIconModule,
            AdaptPopoverModule,
            AdaptSidebarModule,
            AdaptTabsModule,
            AdaptRxFormsModule,
            CommonModule,
            DragDropModule,
            FormsModule,
            ReactiveFormsModule,
            RxDesignerHeaderModule,
            RxFormBuilderModule,
            RxValidationIssuesModule,
            RxDefinitionPickerModule,
            ExpressionFormControlModule,
            SelectFormControlModule,
            CustomizationOptionsModule,
            RxRevertCustomizationModule,
            TranslateModule,
            StoreModule.forFeature(RX_NAMED_LIST_DESIGNER.featureSelector, {
                model: namedListDesignerModelReducer
            }),
            EffectsModule.forFeature([NamedListDesignerEffects])
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedListDesignerModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        ContextualLabelFieldsComponent,
                        ContextualLabelFieldsEditorModalComponent,
                        RxNamedListDesignerComponent
                    ],
                    imports: [
                        AdaptAccordionModule,
                        AdaptButtonModule,
                        AdaptCodeViewerModule,
                        AdaptEmptyStateModule,
                        AdaptIconModule,
                        AdaptPopoverModule,
                        AdaptSidebarModule,
                        AdaptTabsModule,
                        AdaptRxFormsModule,
                        CommonModule,
                        DragDropModule,
                        FormsModule,
                        ReactiveFormsModule,
                        RxDesignerHeaderModule,
                        RxFormBuilderModule,
                        RxValidationIssuesModule,
                        RxDefinitionPickerModule,
                        ExpressionFormControlModule,
                        SelectFormControlModule,
                        CustomizationOptionsModule,
                        RxRevertCustomizationModule,
                        TranslateModule,
                        StoreModule.forFeature(RX_NAMED_LIST_DESIGNER.featureSelector, {
                            model: namedListDesignerModelReducer
                        }),
                        EffectsModule.forFeature([NamedListDesignerEffects])
                    ],
                    exports: [RxNamedListDesignerComponent]
                }]
        }] });

class RxNamedListDesignerPageComponent {
    constructor(activatedRoute, router, rxBundleCacheService, rxComponentCanDeactivateGuard, rxDefinitionNameService, rxPageTitleService, rxUtilityModalsService, translateService) {
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxComponentCanDeactivateGuard = rxComponentCanDeactivateGuard;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxPageTitleService = rxPageTitleService;
        this.rxUtilityModalsService = rxUtilityModalsService;
        this.translateService = translateService;
        this.isInitialized = false;
        this.definitionsRoute = 'named-list-definitions';
        this.pageTitle = this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.title');
    }
    ngOnInit() {
        this.rxComponentCanDeactivateGuard.setPageComponent(this);
        this.subscription = this.activatedRoute.params.subscribe(({ definitionName, bundleId }) => {
            this.rxBundleCacheService.bundleId = bundleId || this.rxDefinitionNameService.getBundleId(definitionName);
            this.isInitialized = true;
            this.isNewDefinition = !definitionName;
            this.configuration = {
                bundleId: this.rxBundleCacheService.bundleId,
                definitionName
            };
            this.rxPageTitleService.set([this.rxDefinitionNameService.getDisplayName(definitionName), this.pageTitle]);
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.rxComponentCanDeactivateGuard.setPageComponent(null);
    }
    canDeactivate() {
        var _a, _b;
        return (_b = (_a = this.designerComponent) === null || _a === void 0 ? void 0 : _a.canDeactivate()) !== null && _b !== void 0 ? _b : true;
    }
    confirmDeactivation() {
        return this.rxUtilityModalsService.confirmUnsavedChanges();
    }
    onCloseDesigner() {
        this.router.navigate([
            RX_APPLICATION.innovationStudioBundleId,
            this.rxBundleCacheService.bundleId,
            this.definitionsRoute
        ]);
    }
    onDefinitionSaved(definitionName) {
        if (this.isNewDefinition) {
            this.router.navigate(['edit', definitionName], { relativeTo: this.activatedRoute.parent });
        }
    }
    onDefinitionErrorLoading() {
        this.router.navigate(['new2', this.rxBundleCacheService.bundleId], { relativeTo: this.activatedRoute.parent });
    }
}
RxNamedListDesignerPageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedListDesignerPageComponent, deps: [{ token: i1$2.ActivatedRoute }, { token: i1$2.Router }, { token: i3$1.RxBundleCacheService }, { token: i3$1.RxComponentCanDeactivateGuard }, { token: i3$1.RxDefinitionNameService }, { token: i3$1.RxPageTitleService }, { token: i4$1.RxUtilityModalsService }, { token: i4.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
RxNamedListDesignerPageComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxNamedListDesignerPageComponent, selector: "rx-named-list-designer-page", viewQueries: [{ propertyName: "designerComponent", first: true, predicate: RxNamedListDesignerComponent, descendants: true }], ngImport: i0, template: "<rx-named-list-designer\n  *ngIf=\"isInitialized\"\n  [configuration]=\"configuration\"\n  (definitionSaved)=\"onDefinitionSaved($event)\"\n  (definitionErrorLoading)=\"onDefinitionErrorLoading()\"\n  (closeDesigner)=\"onCloseDesigner()\"\n></rx-named-list-designer>\n", components: [{ type: RxNamedListDesignerComponent, selector: "rx-named-list-designer", inputs: ["configuration"], outputs: ["definitionSaved", "definitionErrorLoading", "closeDesigner"] }], directives: [{ type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedListDesignerPageComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-named-list-designer-page',
                    templateUrl: './named-list-designer-page.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1$2.ActivatedRoute }, { type: i1$2.Router }, { type: i3$1.RxBundleCacheService }, { type: i3$1.RxComponentCanDeactivateGuard }, { type: i3$1.RxDefinitionNameService }, { type: i3$1.RxPageTitleService }, { type: i4$1.RxUtilityModalsService }, { type: i4.TranslateService }]; }, propDecorators: { designerComponent: [{
                type: ViewChild,
                args: [RxNamedListDesignerComponent]
            }] } });

class RxNamedListDesignerPageModule {
}
RxNamedListDesignerPageModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedListDesignerPageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxNamedListDesignerPageModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedListDesignerPageModule, declarations: [RxNamedListDesignerPageComponent], imports: [CommonModule, RxNamedListDesignerModule], exports: [RxNamedListDesignerPageComponent] });
RxNamedListDesignerPageModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedListDesignerPageModule, imports: [[CommonModule, RxNamedListDesignerModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedListDesignerPageModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxNamedListDesignerPageComponent],
                    imports: [CommonModule, RxNamedListDesignerModule],
                    exports: [RxNamedListDesignerPageComponent]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { RxNamedListDesignerComponent, RxNamedListDesignerModule, RxNamedListDesignerPageComponent, RxNamedListDesignerPageModule, RxNamedListExpressionConfigurator };
//# sourceMappingURL=helix-platform-named-list-designer.js.map
