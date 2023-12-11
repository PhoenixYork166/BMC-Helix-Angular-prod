import * as i5 from '@angular/common';
import { CommonModule, DatePipe } from '@angular/common';
import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, ViewChild, Input, NgModule, Injectable, ElementRef, ViewChildren, EventEmitter, Output } from '@angular/core';
import * as i6 from '@angular/forms';
import { NG_VALUE_ACCESSOR, FormsModule, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import * as i3 from '@bmc-ux/adapt-angular';
import { DismissReasons, AdaptTooltipModule, AdaptRxSelectModule, AdaptButtonModule, AdaptPopoverModule, AdaptIconModule, AdaptRxCheckboxModule, AdaptRxFormControlModule, AdaptRxTextfieldModule, AdaptAccordionModule, AdaptEmptyStateModule, AdaptAccordionTabComponent, AdaptSidebarComponent, AdaptCodeViewerModule, AdaptRxLabelModule, AdaptTabsModule, AdaptBusyModule, AdaptDropdownModule, AdaptSidebarModule, AdaptAlertModule, AdaptRxRadiobuttonModule, AdaptRxSwitchModule, AdaptRxListBuilderModule } from '@bmc-ux/adapt-angular';
import * as i4 from '@bmc-ux/adapt-table';
import { AdaptTableModule } from '@bmc-ux/adapt-table';
import * as i3$1 from '@helix/platform/record/api';
import { RX_RECORD_DEFINITION, RecordFieldOption, RxFieldDefinitionService, RxRecordDefinitionService, ArchiveType, AssociationSelectionType, RxRecordDefinitionCacheService, RxRecordDefinitionFieldOptionPipeModule } from '@helix/platform/record/api';
import * as i2$1 from '@helix/platform/shared/api';
import { RX_OVERLAY, RX_BUNDLE, RX_PERMISSION, Tooltip, RX_APPLICATION, RxExpressionConfigurator, ExpressionOperatorRowsByGroup, ExpressionOperatorGroup, RxDefinitionModule } from '@helix/platform/shared/api';
import * as i11 from '@helix/platform/shared/components';
import { ValueAccessor, TextFormControlComponent, TextareaFormControlComponent, SelectFormControlComponent, SwitchFormControlComponent, RxPermissionEditorComponent, LabelFormControlComponent, BooleanFormControlComponent, CounterFormControlComponent, RxDefinitionPickerComponent, RxDefinitionPickerType, DateFormControlComponent, DateTimeFormControlComponent, LocalizedCharacterFieldValueModalComponent, SelectionFieldOptionsComponent, TimeFormControlComponent, RxDefinitionPickerScope, RxDefinitionPickerModule, RxRevertCustomizationComponent, ExpressionFormControlComponent, RX_EXPRESSION_EDITOR, RxDesignerHeaderModule, RxFormBuilderModule } from '@helix/platform/shared/components';
import * as i1 from '@helix/platform/ui-kit';
import { RxModalClass, RX_MODAL, ValidationIssueType, RxModalModule, RxValidationIssuesModule } from '@helix/platform/ui-kit';
import { RecordGridModule } from '@helix/platform/view/components';
import * as i2 from '@ngx-translate/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AdaptCheckbox2Module } from '@bmc-ux/obsolete';
import { includes, cloneDeep, find, noop, isEmpty, trim, isNumber, inRange, size, isNil, omitBy, forEach, union, keys, map as map$1, pick, remove, some, chain, reverse, reject, filter as filter$1, get, findIndex, omit, orderBy, intersection, concat, invert, capitalize, intersectionBy, isNull, isUndefined, isEqual, mapValues } from 'lodash';
import { BehaviorSubject, combineLatest, ReplaySubject, iif, of, forkJoin, Subject, from } from 'rxjs';
import { map, tap, mergeMap, switchMap, take, filter, shareReplay, defaultIfEmpty, startWith, takeUntil, pluck, distinctUntilChanged, withLatestFrom, scan, skip } from 'rxjs/operators';
import * as i1$1 from '@helix/platform/utils';
import { RxIdService, RX_NUMBER } from '@helix/platform/utils';
import { ComponentStore } from '@ngrx/component-store';
import * as i1$2 from '@ngrx/store';
import { createAction, props, createFeatureSelector, createSelector, createReducer, on, StoreModule } from '@ngrx/store';
import { RX_ASSOCIATION_DEFINITION } from '@helix/platform/association/api';
import { OpenViewActionModalSize } from '@helix/platform/view/api';
import moment from 'moment-es6';
import * as i2$2 from '@ngrx/effects';
import { createEffect, ofType, EffectsModule } from '@ngrx/effects';
import * as i1$3 from '@angular/router';

class RecordCustomizationOptionsEditorComponent extends RxModalClass {
    constructor(rxModalService, activeModalRef, injector, translateService) {
        super(activeModalRef, injector);
        this.rxModalService = rxModalService;
        this.activeModalRef = activeModalRef;
        this.injector = injector;
        this.translateService = translateService;
        this.data = this.activeModalRef.getData();
        this.scopeSelectionOptions = this.data.scopeSelectionOptions;
        this.recordDefinition = this.data.recordDefinition;
        this.customizationControlProperties = [
            'allowPermissionsOverlay',
            'allowOtherPropertiesOverlay',
            'allowIndexesOverlay',
            'allowFieldsOverlay'
        ];
        this.initialCustomizationOptions = this.recordDefinition.customizationOptions;
        this.allowOverlay = includes(Object.values(this.initialCustomizationOptions), true);
        this.fields = cloneDeep(this.recordDefinition.fields);
        this.customizationOptions = {
            allowOtherPropertiesOverlay: this.initialCustomizationOptions.allowOtherPropertiesOverlay || false,
            allowPermissionsOverlay: this.initialCustomizationOptions.allowPermissionsOverlay || false,
            allowIndexesOverlay: this.initialCustomizationOptions.allowIndexesOverlay || false,
            allowFieldsOverlay: this.initialCustomizationOptions.allowFieldsOverlay || false
        };
        this.isFieldsOverlayAllowedSubject = new BehaviorSubject(this.initialCustomizationOptions.allowFieldsOverlay);
        this.isDisabled = this.data.overlayOperation !== RX_OVERLAY.operationTypes.createdInThisOverlayGroup;
        this.definitionScopeName = find(this.scopeSelectionOptions, { name: this.data.definitionScopeName });
        this.scope = [this.definitionScopeName];
        this.isPublicSubject = new BehaviorSubject(this.scope[0].id === RX_BUNDLE.definitionScopes.public.type);
        this.areCustomizationOptionsDisabled$ = this.isPublicSubject.pipe(map((isPublic) => !isPublic || this.isDisabled));
        this.isFieldsOverlayDisabled$ = combineLatest([
            this.areCustomizationOptionsDisabled$,
            this.isFieldsOverlayAllowedSubject
        ]).pipe(map(([areCustomizationOptionsDisabled, isFieldsOverlayAllowed]) => areCustomizationOptionsDisabled || !isFieldsOverlayAllowed));
        this.vm$ = this.areCustomizationOptionsDisabled$.pipe(map((areCustomizationOptionsDisabled) => ({ areCustomizationOptionsDisabled })));
    }
    onFieldsPropertyChange() {
        this.recordCustomizationOptionsEditorForm.control.markAsDirty();
    }
    ngOnInit() {
        super.ngOnInit();
        this.columns = [
            {
                field: 'name',
                header: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label')
            },
            {
                field: 'allowOtherPropertiesOverlay',
                header: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.scope-customization-options.allow-properties-customization.label'),
                cellTemplate: this.recordFieldsColumnTemplate,
                headerClass: 'pl-6'
            },
            {
                field: 'allowPermissionsOverlay',
                header: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.scope-customization-options.allow-permissions-customization.label'),
                cellTemplate: this.recordFieldsColumnTemplate,
                headerClass: 'pl-6'
            }
        ];
    }
    optionFormatter(option) {
        return option.name;
    }
    save() {
        if (this.scope[0].id === RX_BUNDLE.definitionScopeTypes.public) {
            this.rxModalService
                .confirm({
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                modalStyle: RX_MODAL.modalStyles.warning,
                message: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.scope-customization-options.definition-scope-to-public.warning')
            })
                .then((result) => {
                if (result) {
                    this.closeModal();
                }
            })
                .catch(noop);
        }
        else if (this.data.definitionScopeName === RX_BUNDLE.definitionScopeNames.public) {
            this.rxModalService
                .confirm({
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                modalStyle: RX_MODAL.modalStyles.warning,
                message: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.scope-customization-options.change-scope-from-public-warning.message')
            })
                .then((result) => {
                if (result) {
                    this.closeModal();
                }
            })
                .catch(noop);
        }
        else {
            this.closeModal();
        }
    }
    onScopeChange(rxSelectionChangeEvent) {
        this.isPublicSubject.next(rxSelectionChangeEvent[0].id === RX_BUNDLE.definitionScopes.public.type);
    }
    closeModal() {
        const result = Object.assign(Object.assign({}, this.recordCustomizationOptionsEditorForm.form.value), { fields: this.fields });
        result.scope = result.scope[0].id;
        this.activeModalRef.close(result);
    }
    cancel() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
    handleAllowOverlayChange() {
        Object.keys(this.customizationOptions).forEach((option) => (this.customizationOptions[option] = this.allowOverlay));
        this.isFieldsOverlayAllowedSubject.next(this.allowOverlay);
    }
    onRecordCustomizationOptionChange() {
        this.allowOverlay =
            this.customizationOptions.allowFieldsOverlay ||
                this.customizationOptions.allowIndexesOverlay ||
                this.customizationOptions.allowOtherPropertiesOverlay ||
                this.customizationOptions.allowPermissionsOverlay;
        this.isFieldsOverlayAllowedSubject.next(this.customizationOptions.allowFieldsOverlay);
    }
    isDirty() {
        return this.recordCustomizationOptionsEditorForm.dirty;
    }
    ngOnDestroy() {
        this.isFieldsOverlayAllowedSubject.complete();
        this.isPublicSubject.complete();
    }
}
RecordCustomizationOptionsEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordCustomizationOptionsEditorComponent, deps: [{ token: i1.RxModalService }, { token: i3.ActiveModalRef }, { token: i0.Injector }, { token: i2.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
RecordCustomizationOptionsEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RecordCustomizationOptionsEditorComponent, selector: "rx-record-customization-options-editor", viewQueries: [{ propertyName: "recordCustomizationOptionsEditorForm", first: true, predicate: ["recordCustomizationOptionsEditorForm"], descendants: true }, { propertyName: "recordFieldsColumnTemplate", first: true, predicate: ["recordFieldsColumnTemplate"], descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"vm$ | async as vm\">\n  <div class=\"designer-modal-body modal-body\">\n    <form #recordCustomizationOptionsEditorForm=\"ngForm\">\n      <div class=\"w-25\">\n        <adapt-rx-select\n          label=\"{{\n            'com.bmc.arsys.rx.client.record-designer.scope-customization-options-editor.scope.label' | translate\n          }}\"\n          rx-id=\"scope-selection\"\n          [options]=\"scopeSelectionOptions\"\n          [optionFormatter]=\"optionFormatter\"\n          [tooltip]=\"{\n            iconName: 'question_circle_o',\n            content: 'com.bmc.arsys.rx.client.designer.scope-customization-options.scope.tooltip' | translate,\n            placement: 'bottom',\n            popoverMode: true\n          }\"\n          name=\"scope\"\n          [(ngModel)]=\"scope\"\n          (ngModelChange)=\"onScopeChange($event)\"\n          [disabled]=\"isDisabled\"\n        >\n        </adapt-rx-select>\n      </div>\n\n      <div class=\"w-100\">\n        <h5>{{ 'com.bmc.arsys.rx.client.customization-options-editor.customization-options.label' | translate }}</h5>\n        <adapt-rx-checkbox\n          label=\"{{\n            'com.bmc.arsys.rx.client.customization-options-editor.allow-future-customization.label'\n              | translate: { definitionType: data.definitionTypeDisplayName }\n          }}\"\n          rx-id=\"allow-customization-checkbox\"\n          name=\"allowOverlay\"\n          [(ngModel)]=\"allowOverlay\"\n          (ngModelChange)=\"handleAllowOverlayChange()\"\n          [disabled]=\"vm.areCustomizationOptionsDisabled\"\n        >\n        </adapt-rx-checkbox>\n      </div>\n\n      <div class=\"w-100\">\n        <h6>\n          {{\n            'com.bmc.arsys.rx.client.record-designer.scope-customization-options.allow-future-customizations-to.label'\n              | translate\n          }}\n        </h6>\n\n        <div class=\"w-100 d-flex\">\n          <div class=\"w-50\">\n            <div>\n              <adapt-rx-checkbox\n                label=\"{{\n                  'com.bmc.arsys.rx.client.record-designer.scope-customization-options.properties.label' | translate\n                }}\"\n                name=\"allowOtherPropertiesOverlay\"\n                [(ngModel)]=\"customizationOptions.allowOtherPropertiesOverlay\"\n                (ngModelChange)=\"onRecordCustomizationOptionChange()\"\n                [disabled]=\"vm.areCustomizationOptionsDisabled\"\n                rx-id=\"properties-checkbox\"\n              >\n              </adapt-rx-checkbox>\n            </div>\n\n            <div>\n              <adapt-rx-checkbox\n                label=\"{{\n                  'com.bmc.arsys.rx.client.record-designer.scope-customization-options.permissions.label' | translate\n                }}\"\n                name=\"allowPermissionsOverlay\"\n                [(ngModel)]=\"customizationOptions.allowPermissionsOverlay\"\n                (ngModelChange)=\"onRecordCustomizationOptionChange()\"\n                [disabled]=\"vm.areCustomizationOptionsDisabled\"\n                rx-id=\"permissions-checkbox\"\n              >\n              </adapt-rx-checkbox>\n            </div>\n          </div>\n\n          <div class=\"w-50\">\n            <div>\n              <adapt-rx-checkbox\n                label=\"{{\n                  'com.bmc.arsys.rx.client.record-designer.scope-customization-options.search-indexes.label' | translate\n                }}\"\n                name=\"allowIndexesOverlay\"\n                [(ngModel)]=\"customizationOptions.allowIndexesOverlay\"\n                (ngModelChange)=\"onRecordCustomizationOptionChange()\"\n                [disabled]=\"vm.areCustomizationOptionsDisabled\"\n                rx-id=\"search-indexes-checkbox\"\n              >\n              </adapt-rx-checkbox>\n            </div>\n\n            <div>\n              <adapt-rx-checkbox\n                label=\"{{\n                  'com.bmc.arsys.rx.client.record-designer.scope-customization-options.fields.label' | translate\n                }}\"\n                name=\"allowFieldsOverlay\"\n                [(ngModel)]=\"customizationOptions.allowFieldsOverlay\"\n                (ngModelChange)=\"onRecordCustomizationOptionChange()\"\n                [disabled]=\"vm.areCustomizationOptionsDisabled\"\n                rx-id=\"fields-checkbox\"\n              >\n              </adapt-rx-checkbox>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <adapt-table\n        [value]=\"fields\"\n        [columns]=\"columns\"\n        [scrollable]=\"true\"\n        scrollHeight=\"340px\"\n        [sortable]=\"false\"\n        [resizableColumns]=\"false\"\n        [bordered]=\"false\"\n        [filterable]=\"false\"\n        [dataKey]=\"'name'\"\n      >\n      </adapt-table>\n    </form>\n  </div>\n\n  <div class=\"modal-footer\">\n    <button\n      class=\"btn btn-primary\"\n      rx-id=\"save-button\"\n      (click)=\"save()\"\n      type=\"button\"\n      [disabled]=\"!recordCustomizationOptionsEditorForm.dirty\"\n    >\n      {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n    </button>\n\n    <button type=\"button\" class=\"btn btn-secondary btn-sm\" (click)=\"cancel()\" rx-id=\"cancel-button\">\n      {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n    </button>\n  </div>\n</ng-container>\n\n<ng-template #recordFieldsColumnTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n  <div class=\"checkbox m-0 pl-4\">\n    <div class=\"checkbox__label pl-6 ml-6\">\n      <label>\n        <input\n          type=\"checkbox\"\n          role=\"checkbox\"\n          class=\"checkbox__input\"\n          [(ngModel)]=\"dataItem[column.field]\"\n          [disabled]=\"isFieldsOverlayDisabled$ | async\"\n          (change)=\"onFieldsPropertyChange()\"\n        />\n\n        <div class=\"checkbox__item\"></div>\n      </label>\n    </div>\n  </div>\n</ng-template>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.designer-modal-body{height:645px;min-height:calc(100% - 61px)!important}.designer-modal-accordion-wrapper{display:flex;flex-direction:column;height:100%;overflow:auto;padding-top:10px}.designer-modal-accordion-content{position:relative}.designer-modal-accordion-content.cdk-drag-preview{z-index:1200!important}.designer-modal-drag-handle{cursor:move;position:absolute;top:0;left:0;height:46px;padding:14px 10px 14px 14px;z-index:1}.designer-modal-card-title-content{width:100%;display:flex}.designer-modal-card-title-content .left-header-block,.designer-modal-card-title-content .right-header-block{display:flex;align-items:center}.designer-modal-card-title-content .left-header-block{flex-grow:1;min-width:0;font-size:14px;padding-left:22px}.designer-modal-card-sub-title{color:#7c7f81;font-weight:normal}.designer-modal-card-title-index-buttons{display:flex;font-size:19px}.rx-card{overflow:auto}.rx-tree-draggable-node{cursor:pointer}.rx-tree-draggable-node.cdk-drag-preview{z-index:1200!important}.rx-tree-draggable-node.cdk-drag{opacity:1}.rx-tree-node-label{word-break:break-all}rx-form-builder{max-width:400px}\n"], components: [{ type: i3.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i3.AdaptRxCheckboxComponent, selector: "adapt-rx-checkbox", inputs: ["value", "checked", "indeterminate"], outputs: ["indeterminateChange"] }, { type: i4.AdaptTableComponent, selector: "adapt-table", inputs: ["sortable", "filterable", "triggerableFilters", "explicitSearchBtn", "enableReorderableRows", "suppressTooltip", "toolbarConfig", "dataColumnsColsTemplate", "dataColumnsHeaderTemplate", "dataColumnsDataCellsTemplate", "headerGroupsTemplate", "alwaysShowHeaderTooltip", "alwaysShowCellTooltip", "expandedCellClass", "expandedGroupsKeys", "nestedGroupPadding", "expandindCellInitialPadding", "groupValueDataCellTemplate", "tooltipInitialDelayMs", "tooltipClass", "rowsCustomClass", "paginatorAlign", "hasEmptyState", "enableInfiniteScrolling", "updateFirstColumnWidth", "busyConfig", "defaultFiltersMatchMode", "wrapCellText", "minBufferPx", "maxBufferPx", "testID", "headerSelectionMode", "disabledSelectedRowsCount", "disabledNotSelectedRowsCount", "disabledSelectedFilteredRowsCount", "disabledNotSelectedFilteredRowsCount", "selectedFilteredRowsCount", "totalRecordsInGroup", "disableRowSelection", "nestingStructureData", "nestingKey", "enableRowEditing", "autoScrollToTop", "paginationTexts", "toolbarTexts", "tableTexts", "filtersTexts", "headerCellMenuTexts", "texts", "loadingMore", "mergeColumns", "disabledRowSelectionResolver", "allowColumnReorderingResolver", "disableRowExpandingResolver", "rowAriaDataResolver", "tableWidthConfig", "expandedRowTemplate", "isRefreshingRowData", "value", "bordered", "paginator", "striped", "loading"], outputs: ["onLazyLoad", "rowDataRefresh", "savedRowEditing", "canceledRowEditing", "groupSelection", "allGroupedRowsSelection", "groupExpansion", "columnsVisibilityChange", "rowDragStart", "rowDragRelease", "rowDragEnd", "rowDragDrop", "export", "toolbarPopupAnimationDone"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i6.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i6.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i6.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }], pipes: { "async": i5.AsyncPipe, "translate": i2.TranslatePipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordCustomizationOptionsEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-record-customization-options-editor',
                    templateUrl: './record-customization-options-editor.component.html',
                    styleUrls: ['./record-customization-options-editor.component.scss'],
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i1.RxModalService }, { type: i3.ActiveModalRef }, { type: i0.Injector }, { type: i2.TranslateService }]; }, propDecorators: { recordCustomizationOptionsEditorForm: [{
                type: ViewChild,
                args: ['recordCustomizationOptionsEditorForm']
            }], recordFieldsColumnTemplate: [{
                type: ViewChild,
                args: ['recordFieldsColumnTemplate', { static: true }]
            }] } });

class RecordCustomizationOptionsComponent extends ValueAccessor {
    constructor(rxModalService, rxBundleCacheService, rxOverlayService, translateService) {
        super();
        this.rxModalService = rxModalService;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxOverlayService = rxOverlayService;
        this.translateService = translateService;
        this.scopeNameSubject = new BehaviorSubject('');
        this.scopeSelectionOptions$ = this.rxBundleCacheService.getDefinitionScopeSelectionOptions().pipe(map((scopeSelectionOptions) => scopeSelectionOptions), tap((scopeSelectionOptions) => (this.scopeSelectionOptions = scopeSelectionOptions)));
        this.definitionScopeName$ = this.scopeNameSubject.pipe(mergeMap((scopeName) => this.rxBundleCacheService.getDefinitionScopeName(scopeName).pipe(map((definitionScopeName) => definitionScopeName), tap((definitionScopeName) => (this.definitionScopeName = definitionScopeName)))));
        this.vm$ = combineLatest([this.definitionScopeName$, this.scopeSelectionOptions$]).pipe(map(([definitionScopeName, scopeSelectionOptions]) => ({
            definitionScopeName,
            scopeSelectionOptions
        })));
    }
    ngOnInit() {
        if (this.options) {
            this.updateValues();
        }
    }
    ngOnChanges(changes) {
        if (changes.options) {
            this.updateValues();
        }
    }
    getOverlayOperation() {
        var _a;
        return this.rxOverlayService.getOverlayOperation(this.options.recordDefinition.overlayGroupId, ((_a = this.options.recordDefinition.overlayDescriptor) === null || _a === void 0 ? void 0 : _a.parentOverlayGroupId) || null);
    }
    updateValues() {
        this.setAllowOverlayLabel(this.options.recordDefinition.customizationOptions.allowOtherPropertiesOverlay);
        this.scopeNameSubject.next(this.options.recordDefinition.customizationOptions.scope);
        if (this.options.recordDefinition.overlayGroupId) {
            this.overlayOperation = this.getOverlayOperation();
        }
        else {
            this.overlayOperation = RX_OVERLAY.operationTypes.createdInThisOverlayGroup;
        }
    }
    openCustomizationOptionsEditor() {
        this.rxModalService
            .openModal({
            title: this.translateService.instant('com.bmc.arsys.rx.client.designer.scope-customization-options.title'),
            content: RecordCustomizationOptionsEditorComponent,
            blockKeyboard: false,
            data: {
                definitionScopeName: this.definitionScopeName,
                allowOverlay: this.options.recordDefinition.customizationOptions.allowOtherPropertiesOverlay,
                scopeSelectionOptions: this.scopeSelectionOptions,
                isDisabled: this.options.isDisabled,
                overlayOperation: this.overlayOperation,
                definitionTypeDisplayName: this.options.definitionTypeDisplayName,
                recordDefinition: this.options.recordDefinition
            }
        })
            .then((result) => {
            this.setAllowOverlayLabel(result.allowOverlay);
            this.definitionScopeName = this.scopeSelectionOptions.find((value) => value.id === result.scope).name;
            this.value = result;
        })
            .catch(noop);
    }
    setAllowOverlayLabel(allowOverlay) {
        this.allowOverlayLabel = allowOverlay
            ? RX_OVERLAY.overlayAllowedLabels.allowed
            : RX_OVERLAY.overlayAllowedLabels.notAllowed;
    }
    ngOnDestroy() {
        this.scopeNameSubject.complete();
    }
}
RecordCustomizationOptionsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordCustomizationOptionsComponent, deps: [{ token: i1.RxModalService }, { token: i2$1.RxBundleCacheService }, { token: i2$1.RxOverlayService }, { token: i2.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
RecordCustomizationOptionsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RecordCustomizationOptionsComponent, selector: "rx-scope-record-customization-control", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: RecordCustomizationOptionsComponent,
            multi: true
        }
    ], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<ng-container *ngIf=\"vm$ | async as vm\">\n  <adapt-button\n    btn-type=\"tertiary\"\n    rx-id=\"open-customization-options-editor-link\"\n    (click)=\"openCustomizationOptionsEditor()\"\n    class=\"p-0\"\n  >\n    {{ 'com.bmc.arsys.rx.client.designer.scope-customization-options.title' | translate }}\n  </adapt-button>\n\n  <adapt-icon\n    name=\"question_circle_o\"\n    class=\"ml-2\"\n    placement=\"right\"\n    [adaptPopover]=\"'com.bmc.arsys.rx.client.designer.scope-customization-options.scope.tooltip' | translate\"\n  >\n  </adapt-icon>\n\n  <p rx-id=\"scope\" class=\"mb-0 pt-2\">\n    {{\n      'com.bmc.arsys.rx.client.designer.scope-customization-options.scope.label'\n        | translate: { definitionScopeName: vm.definitionScopeName }\n    }}\n  </p>\n\n  <div rx-id=\"customization\" class=\"pt-2\">\n    {{\n      'com.bmc.arsys.rx.client.designer.scope-customization-options.customization.label'\n        | translate: { allowOverlayLabel: allowOverlayLabel }\n    }}\n  </div>\n</ng-container>\n", components: [{ type: i3.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i3.AdaptIconComponent, selector: "adapt-icon", inputs: ["name", "classList", "description", "testID"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.AdaptPopoverDirective, selector: "[adaptPopover]", inputs: ["adaptPopover", "popoverTitle", "placement", "fallbackPlacement", "triggers", "container", "appendToBody", "closeBtn", "popupDelay", "disablePopover", "popoverClass", "autoClose", "closeOnOutOfView", "maxWidth", "minWidth"], outputs: ["shown", "hidden"], exportAs: ["adaptPopover"] }], pipes: { "async": i5.AsyncPipe, "translate": i2.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordCustomizationOptionsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-scope-record-customization-control',
                    templateUrl: './record-customization-options.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: RecordCustomizationOptionsComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxModalService }, { type: i2$1.RxBundleCacheService }, { type: i2$1.RxOverlayService }, { type: i2.TranslateService }]; }, propDecorators: { options: [{
                type: Input
            }] } });

class RecordCustomizationOptionsModule {
}
RecordCustomizationOptionsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordCustomizationOptionsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RecordCustomizationOptionsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordCustomizationOptionsModule, declarations: [RecordCustomizationOptionsComponent, RecordCustomizationOptionsEditorComponent], imports: [CommonModule,
        FormsModule,
        AdaptTooltipModule,
        AdaptRxSelectModule,
        AdaptButtonModule,
        AdaptCheckbox2Module,
        AdaptPopoverModule,
        AdaptIconModule,
        AdaptRxCheckboxModule,
        ReactiveFormsModule,
        TranslateModule,
        AdaptTableModule], exports: [RecordCustomizationOptionsComponent] });
RecordCustomizationOptionsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordCustomizationOptionsModule, imports: [[
            CommonModule,
            FormsModule,
            AdaptTooltipModule,
            AdaptRxSelectModule,
            AdaptButtonModule,
            AdaptCheckbox2Module,
            AdaptPopoverModule,
            AdaptIconModule,
            AdaptRxCheckboxModule,
            ReactiveFormsModule,
            TranslateModule,
            AdaptTableModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordCustomizationOptionsModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RecordCustomizationOptionsComponent, RecordCustomizationOptionsEditorComponent],
                    exports: [RecordCustomizationOptionsComponent],
                    entryComponents: [RecordCustomizationOptionsComponent, RecordCustomizationOptionsEditorComponent],
                    imports: [
                        CommonModule,
                        FormsModule,
                        AdaptTooltipModule,
                        AdaptRxSelectModule,
                        AdaptButtonModule,
                        AdaptCheckbox2Module,
                        AdaptPopoverModule,
                        AdaptIconModule,
                        AdaptRxCheckboxModule,
                        ReactiveFormsModule,
                        TranslateModule,
                        AdaptTableModule
                    ]
                }]
        }] });

class RxFieldDefinitionInspectorHelperService {
    constructor(rxFieldDefinitionService, rxRecordDefinitionService) {
        this.rxFieldDefinitionService = rxFieldDefinitionService;
        this.rxRecordDefinitionService = rxRecordDefinitionService;
    }
    isFieldEditable(fieldDefinition) {
        return (!this.rxFieldDefinitionService.isReadOnly(fieldDefinition) &&
            !this.rxFieldDefinitionService.isJoinedField(fieldDefinition) &&
            this.rxFieldDefinitionService.isPropertiesCustomizationEnabled(fieldDefinition));
    }
    isNameEditable(fieldDefinition) {
        return (!this.rxFieldDefinitionService.isInheritedField(fieldDefinition) &&
            this.rxFieldDefinitionService.isPropertiesCustomizationEnabled(fieldDefinition) &&
            !(fieldDefinition.lastUpdateTime && this.rxFieldDefinitionService.isOverlayMode(fieldDefinition)));
    }
    isDescriptionEditable(fieldDefinition, definitionModel) {
        if (this.rxRecordDefinitionService.isJoinRecord(definitionModel)) {
            return (includes(RX_RECORD_DEFINITION.joinRecordDefinitionCoreFieldIds, fieldDefinition.id) &&
                this.rxFieldDefinitionService.isPropertiesCustomizationEnabled(fieldDefinition));
        }
        else {
            return (!this.rxFieldDefinitionService.isReadOnly(fieldDefinition) &&
                this.rxFieldDefinitionService.isPropertiesCustomizationEnabled(fieldDefinition));
        }
    }
    isRequiredEditable(fieldDefinition) {
        const isAlwaysRequiredNonSystemField = !this.rxFieldDefinitionService.isExternalRecordField(fieldDefinition) &&
            includes(RX_RECORD_DEFINITION.alwaysRequiredNonSystemFieldIds, fieldDefinition.id);
        return this.isFieldEditable(fieldDefinition) && !isAlwaysRequiredNonSystemField;
    }
    isSubmitEditable(fieldDefinition, definitionModel) {
        return this.isFieldEditable(fieldDefinition) && !definitionModel.isAuditRecordDefinition;
    }
    arePermissionsEditable(fieldDefinition, definitionModel) {
        return ((fieldDefinition.id !== RX_RECORD_DEFINITION.coreFieldIds.id &&
            this.rxFieldDefinitionService.isPermissionsCustomizationEnabled(fieldDefinition) &&
            !(this.rxFieldDefinitionService.isJoinedField(fieldDefinition) &&
                fieldDefinition.id !== RX_RECORD_DEFINITION.coreFieldIds.displayId) &&
            !definitionModel.isAuditRecordDefinition &&
            !includes(RX_RECORD_DEFINITION.AR_AUDIT_FIELD_IDS, fieldDefinition.id)) ||
            fieldDefinition.allowPermissionsEdit);
    }
    isAuditingEditable(fieldDefinition, definitionModel) {
        return (!this.rxFieldDefinitionService.isJoinedField(fieldDefinition) &&
            !this.rxFieldDefinitionService.isInheritedField(fieldDefinition) &&
            !definitionModel.isAuditRecordDefinition);
    }
    isFieldIdDisabled(fieldDefinition, skipValidate = false) {
        return (Boolean(fieldDefinition.lastUpdateTime) ||
            (!this.rxFieldDefinitionService.isJoinedField(fieldDefinition) &&
                (this.rxFieldDefinitionService.isReservedField(fieldDefinition, skipValidate) ||
                    this.rxFieldDefinitionService.isInheritedField(fieldDefinition))));
    }
    isDefaultValueEditable(fieldDefinition, definitionModel) {
        return (!(this.rxFieldDefinitionService.isReadOnly(fieldDefinition) &&
            fieldDefinition.id !== RX_RECORD_DEFINITION.coreFieldIds.displayId) &&
            this.rxFieldDefinitionService.isPropertiesCustomizationEnabled(fieldDefinition) &&
            !this.rxRecordDefinitionService.isJoinRecord(definitionModel) &&
            !definitionModel.isAuditRecordDefinition);
    }
    isLengthEditable(fieldDefinition, definitionModel) {
        let isEditable = false;
        if (!this.rxRecordDefinitionService.isJoinRecord(definitionModel)) {
            let isReadonlyField = false;
            // As an exception, the Length of the Display ID field should be editable for Regular records (if customization is enabled)
            if (fieldDefinition.id !== RX_RECORD_DEFINITION.coreFieldIds.displayId) {
                isReadonlyField =
                    this.rxFieldDefinitionService.isReadOnly(fieldDefinition) ||
                        includes(RX_RECORD_DEFINITION.AR_CORE_FIELD_IDS, fieldDefinition.id);
            }
            isEditable =
                !isReadonlyField &&
                    this.rxFieldDefinitionService.isPropertiesCustomizationEnabled(fieldDefinition) &&
                    !definitionModel.isAuditRecordDefinition;
        }
        return isEditable;
    }
    isStoreEncryptedVisible(fieldDefinition, definitionModel) {
        return (!this.rxRecordDefinitionService.isCustomRecord(definitionModel) &&
            !this.rxFieldDefinitionService.isExternalRecordField(fieldDefinition));
    }
    isStoreEncryptedEditable(fieldDefinition) {
        return this.isFieldEditable(fieldDefinition) && !includes(RX_RECORD_DEFINITION.keyFieldIds, fieldDefinition.id);
    }
    isStoreHashedVisible(fieldDefinition, definitionModel) {
        return (!this.rxRecordDefinitionService.isCustomRecord(definitionModel) &&
            !this.rxFieldDefinitionService.isExternalRecordField(fieldDefinition));
    }
    isStoreHashedEditable(fieldDefinition, definitionModel) {
        return (this.isFieldEditable(fieldDefinition) &&
            !includes(RX_RECORD_DEFINITION.coreFieldIds, fieldDefinition.id) &&
            !definitionModel.isAuditRecordDefinition);
    }
    isNamedListEditable(fieldDefinition, definitionModel) {
        return (this.isFieldEditable(fieldDefinition) &&
            !includes(RX_RECORD_DEFINITION.keyFieldIds, fieldDefinition.id) &&
            !definitionModel.isAuditRecordDefinition);
    }
    isFieldMappingEditable(fieldDefinition) {
        return this.rxFieldDefinitionService.isPropertiesCustomizationEnabled(fieldDefinition);
    }
}
RxFieldDefinitionInspectorHelperService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFieldDefinitionInspectorHelperService, deps: [{ token: i3$1.RxFieldDefinitionService }, { token: i3$1.RxRecordDefinitionService }], target: i0.ɵɵFactoryTarget.Injectable });
RxFieldDefinitionInspectorHelperService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFieldDefinitionInspectorHelperService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFieldDefinitionInspectorHelperService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i3$1.RxFieldDefinitionService }, { type: i3$1.RxRecordDefinitionService }]; } });

class FieldOptionEditorComponent extends ValueAccessor {
    ngOnInit() {
        this.isRequired = this.value === RecordFieldOption.Required || this.value === RecordFieldOption.System;
    }
    onSelectionChange() {
        this.value = this.isRequired ? RecordFieldOption.Required : RecordFieldOption.Optional;
    }
}
FieldOptionEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FieldOptionEditorComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
FieldOptionEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: FieldOptionEditorComponent, selector: "rx-field-option-editor", providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: FieldOptionEditorComponent,
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: "<adapt-rx-control-label\n  label=\"{{ 'com.bmc.arsys.rx.client.record-designer.field-properties.required-field.label' | translate }}\"\n>\n</adapt-rx-control-label>\n\n<adapt-rx-switch\n  [(ngModel)]=\"isRequired\"\n  [disabled]=\"isDisabled\"\n  (ngModelChange)=\"onSelectionChange()\"\n></adapt-rx-switch>\n", components: [{ type: i3.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i3.AdaptRxSwitchComponent, selector: "adapt-rx-switch", inputs: ["value", "size", "isLabelBefore", "checked"] }], directives: [{ type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i2.TranslatePipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FieldOptionEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-field-option-editor',
                    templateUrl: './field-option-editor.component.html',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: FieldOptionEditorComponent,
                            multi: true
                        }
                    ]
                }]
        }] });

class RxBaseFieldDefinitionService {
    constructor(injector) {
        this.injector = injector;
        this.translateService = this.injector.get(TranslateService);
        this.rxIdService = this.injector.get(RxIdService);
        this.rxFieldDefinitionService = this.injector.get(RxFieldDefinitionService);
        this.rxFieldDefinitionInspectorHelperService = this.injector.get(RxFieldDefinitionInspectorHelperService);
        this.rxRecordDefinitionService = this.injector.get(RxRecordDefinitionService);
    }
    getNewFieldDefinitionModel(fieldProperties) {
        return Object.assign({ id: this.rxIdService.generate(), name: this.translateService.instant('com.bmc.arsys.rx.client.designer.default-field-name.label'), description: null, fieldOption: RX_RECORD_DEFINITION.fieldOptions.optional, defaultValue: null, allowPermissionsOverlay: true, allowOtherPropertiesOverlay: true, resourceType: this.resourceType }, fieldProperties);
    }
    getFieldInspectorConfig(fieldModel, definitionModel, isReadOnly) {
        const isJoinedField = this.rxFieldDefinitionService.isJoinedField(fieldModel);
        const isExternalRecordField = this.rxFieldDefinitionService.isExternalRecordField(fieldModel);
        return [
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.general-items.label'),
                controls: [
                    {
                        name: 'name',
                        component: TextFormControlComponent,
                        isDisabled: !this.rxFieldDefinitionInspectorHelperService.isNameEditable(fieldModel),
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label'),
                            required: true
                        }
                    },
                    {
                        name: 'description',
                        component: TextareaFormControlComponent,
                        isDisabled: isReadOnly ||
                            !this.rxFieldDefinitionInspectorHelperService.isDescriptionEditable(fieldModel, definitionModel),
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.common.description.label')
                        }
                    },
                    {
                        name: 'resourceType',
                        component: SelectFormControlComponent,
                        isDisabled: true,
                        options: {
                            required: true,
                            label: this.translateService.instant('com.bmc.arsys.rx.client.common.data-type.label'),
                            options: [
                                {
                                    id: RX_RECORD_DEFINITION.dataTypes.attachment.resourceType,
                                    name: this.translateService.instant(RX_RECORD_DEFINITION.dataTypes.attachment.labelKey)
                                },
                                {
                                    id: RX_RECORD_DEFINITION.dataTypes.boolean.resourceType,
                                    name: this.translateService.instant(RX_RECORD_DEFINITION.dataTypes.boolean.labelKey)
                                },
                                {
                                    id: RX_RECORD_DEFINITION.dataTypes.dateOnly.resourceType,
                                    name: this.translateService.instant(RX_RECORD_DEFINITION.dataTypes.dateOnly.labelKey)
                                },
                                {
                                    id: RX_RECORD_DEFINITION.dataTypes.dateTime.resourceType,
                                    name: this.translateService.instant(RX_RECORD_DEFINITION.dataTypes.dateTime.labelKey)
                                },
                                {
                                    id: RX_RECORD_DEFINITION.dataTypes.decimal.resourceType,
                                    name: this.translateService.instant(RX_RECORD_DEFINITION.dataTypes.decimal.labelKey)
                                },
                                {
                                    id: RX_RECORD_DEFINITION.dataTypes.real.resourceType,
                                    name: this.translateService.instant(RX_RECORD_DEFINITION.dataTypes.real.labelKey)
                                },
                                {
                                    id: RX_RECORD_DEFINITION.dataTypes.integer.resourceType,
                                    name: this.translateService.instant(RX_RECORD_DEFINITION.dataTypes.integer.labelKey)
                                },
                                {
                                    id: RX_RECORD_DEFINITION.dataTypes.localizedCharacter.resourceType,
                                    name: this.translateService.instant(RX_RECORD_DEFINITION.dataTypes.localizedCharacter.labelKey)
                                },
                                {
                                    id: RX_RECORD_DEFINITION.dataTypes.selection.resourceType,
                                    name: this.translateService.instant(RX_RECORD_DEFINITION.dataTypes.selection.labelKey)
                                },
                                {
                                    id: RX_RECORD_DEFINITION.dataTypes.character.resourceType,
                                    name: this.translateService.instant(RX_RECORD_DEFINITION.dataTypes.character.labelKey)
                                },
                                {
                                    id: RX_RECORD_DEFINITION.dataTypes.timeOnly.resourceType,
                                    name: this.translateService.instant(RX_RECORD_DEFINITION.dataTypes.timeOnly.labelKey)
                                }
                            ]
                        }
                    }
                ]
            },
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.details.label'),
                controls: [
                    {
                        name: 'fieldOption',
                        component: FieldOptionEditorComponent,
                        isDisabled: isReadOnly || !this.rxFieldDefinitionInspectorHelperService.isRequiredEditable(fieldModel)
                    },
                    {
                        name: 'anyUserAllowedToSubmit',
                        component: SwitchFormControlComponent,
                        isDisabled: isReadOnly || !this.rxFieldDefinitionInspectorHelperService.isSubmitEditable(fieldModel, definitionModel),
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.allow-anyone-to-submit.label')
                        }
                    },
                    {
                        name: 'permissions',
                        component: RxPermissionEditorComponent,
                        isDisabled: isReadOnly ||
                            !this.rxFieldDefinitionInspectorHelperService.arePermissionsEditable(fieldModel, definitionModel),
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.common.permissions.label'),
                            type: 'config',
                            permissionScope: RX_PERMISSION.permissionScope.all
                        }
                    },
                    {
                        name: '',
                        component: LabelFormControlComponent,
                        options: {
                            labelKey: 'com.bmc.arsys.rx.client.record-designer.definition-properties.auditing.title'
                        }
                    },
                    {
                        name: 'audit',
                        component: BooleanFormControlComponent,
                        isDisabled: isReadOnly ||
                            !this.rxFieldDefinitionInspectorHelperService.isAuditingEditable(fieldModel, definitionModel),
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.auditing-options.audit.label'),
                            tooltip: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.auditing-options.audit.tooltip'),
                            shouldDisplayAsCheckbox: true
                        }
                    },
                    {
                        name: 'copy',
                        component: BooleanFormControlComponent,
                        isDisabled: fieldModel.audit ||
                            isReadOnly ||
                            !this.rxFieldDefinitionInspectorHelperService.isAuditingEditable(fieldModel, definitionModel),
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.auditing-options.copy.label'),
                            tooltip: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.auditing-options.copy.tooltip'),
                            shouldDisplayAsCheckbox: true
                        }
                    },
                    {
                        name: 'id',
                        component: CounterFormControlComponent,
                        isDisabled: this.rxFieldDefinitionInspectorHelperService.isFieldIdDisabled(fieldModel, fieldModel.isNewField),
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.common.field-id.label'),
                            allowIntegerOnly: true
                        }
                    }
                ]
            }
        ];
    }
    validate(fieldModel, definitionModel) {
        const issues = [];
        if (isEmpty(trim(fieldModel.name))) {
            issues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.field-name.label')
                }),
                data: {
                    propertyName: 'name',
                    guid: fieldModel.guid
                }
            });
        }
        if (!RX_RECORD_DEFINITION.validDefinitionNameRegex.test(fieldModel.name)) {
            issues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.invalid-definition-name.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.field-name.label')
                }),
                data: {
                    propertyName: 'name',
                    guid: fieldModel.guid
                }
            });
        }
        if (!fieldModel.lastUpdateTime &&
            isNumber(fieldModel.id) &&
            !this.rxFieldDefinitionService.isExternalRecordField(fieldModel) &&
            inRange(fieldModel.id, 1, RX_RECORD_DEFINITION.AR_MAX_RESERVED_FIELD_ID + 1) &&
            !includes(RX_RECORD_DEFINITION.AR_CORE_FIELD_IDS, fieldModel.id)) {
            issues.push({
                type: ValidationIssueType.Warning,
                data: {
                    propertyName: 'id',
                    guid: fieldModel.guid
                },
                description: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.validation.field-id-in-bmc-reserved-range-warning.message')
            });
        }
        if (fieldModel.id && !inRange(fieldModel.id, 1, RX_NUMBER.maxInteger + 1)) {
            issues.push({
                type: ValidationIssueType.Error,
                data: {
                    propertyName: 'id',
                    guid: fieldModel.guid
                },
                description: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.validation.invalid-field-id-range.message', { max: RX_NUMBER.maxInteger })
            });
        }
        return issues;
    }
}

class RxAttachmentFieldDefinitionService extends RxBaseFieldDefinitionService {
    constructor(injector) {
        super(injector);
        this.resourceType = RX_RECORD_DEFINITION.dataTypes.attachment.resourceType;
    }
    getFieldInspectorConfig(fieldModel, definitionModel, isReadOnly) {
        const inspectorConfig = super.getFieldInspectorConfig(fieldModel, definitionModel, isReadOnly);
        // Adding controls specific to attachment field to Details section
        inspectorConfig[1].controls.push({
            name: 'maxSize',
            component: CounterFormControlComponent,
            isDisabled: isReadOnly,
            options: {
                label: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.max-file-size.label'),
                allowIntegerOnly: true,
                minValue: 0,
                maxValue: RX_NUMBER.maxInteger
            }
        });
        return inspectorConfig;
    }
}
RxAttachmentFieldDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAttachmentFieldDefinitionService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxAttachmentFieldDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAttachmentFieldDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAttachmentFieldDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });

class RxBooleanFieldDefinitionService extends RxBaseFieldDefinitionService {
    constructor(injector) {
        super(injector);
        this.resourceType = RX_RECORD_DEFINITION.dataTypes.boolean.resourceType;
    }
    getFieldInspectorConfig(fieldModel, definitionModel, isReadOnly) {
        const inspectorConfig = super.getFieldInspectorConfig(fieldModel, definitionModel, isReadOnly);
        // Adding controls specific to boolean field to Details section
        inspectorConfig[1].controls.push({
            name: 'defaultValue',
            component: SelectFormControlComponent,
            isDisabled: isReadOnly,
            options: {
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label'),
                emptyOption: true,
                options: [
                    {
                        id: '0',
                        name: this.translateService.instant('com.bmc.arsys.rx.client.common.true')
                    },
                    {
                        id: '1',
                        name: this.translateService.instant('com.bmc.arsys.rx.client.common.false')
                    }
                ]
            }
        });
        return inspectorConfig;
    }
}
RxBooleanFieldDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBooleanFieldDefinitionService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxBooleanFieldDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBooleanFieldDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBooleanFieldDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });

class RxCharacterFieldDefinitionService extends RxBaseFieldDefinitionService {
    constructor(injector, rxNumberUtilsService) {
        super(injector);
        this.rxNumberUtilsService = rxNumberUtilsService;
        this.resourceType = RX_RECORD_DEFINITION.dataTypes.character.resourceType;
    }
    getFieldInspectorConfig(fieldModel, definitionModel, isReadOnly) {
        const inspectorConfig = super.getFieldInspectorConfig(fieldModel, definitionModel, isReadOnly);
        if (this.rxFieldDefinitionInspectorHelperService.isStoreEncryptedVisible(fieldModel, definitionModel)) {
            inspectorConfig[1].controls.push({
                name: 'shouldPersistEncrypted',
                component: SwitchFormControlComponent,
                isDisabled: isReadOnly || !this.rxFieldDefinitionInspectorHelperService.isStoreEncryptedEditable(fieldModel),
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.store-encrypted.label')
                }
            });
        }
        if (this.rxFieldDefinitionInspectorHelperService.isStoreHashedVisible(fieldModel, definitionModel)) {
            inspectorConfig[1].controls.push({
                name: 'shouldPersistHashed',
                component: SwitchFormControlComponent,
                isDisabled: isReadOnly ||
                    !this.rxFieldDefinitionInspectorHelperService.isStoreHashedEditable(fieldModel, definitionModel),
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.store-hashed.label')
                }
            });
        }
        inspectorConfig[1].controls = inspectorConfig[1].controls.concat([
            {
                name: 'namedListDefinition',
                component: RxDefinitionPickerComponent,
                isDisabled: isReadOnly || !this.rxFieldDefinitionInspectorHelperService.isNamedListEditable(fieldModel, definitionModel),
                options: {
                    definitionType: RxDefinitionPickerType.NamedList,
                    label: this.translateService.instant('com.bmc.arsys.rx.client.definition-type.named-list.label')
                }
            },
            {
                name: 'maxLength',
                component: CounterFormControlComponent,
                isDisabled: isReadOnly || !this.rxFieldDefinitionInspectorHelperService.isLengthEditable(fieldModel, definitionModel),
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.length.label'),
                    tooltip: fieldModel.id === RX_RECORD_DEFINITION.coreFieldIds.displayId &&
                        !this.rxRecordDefinitionService.isJoinRecord(definitionModel) &&
                        !fieldModel.isNewField
                        ? this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.display-id.length.tooltip')
                        : undefined,
                    allowIntegerOnly: true,
                    minValue: 0
                }
            },
            {
                name: 'defaultValue',
                component: TextFormControlComponent,
                isDisabled: isReadOnly ||
                    !this.rxFieldDefinitionInspectorHelperService.isDefaultValueEditable(fieldModel, definitionModel),
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label'),
                    tooltip: fieldModel.id === RX_RECORD_DEFINITION.coreFieldIds.displayId &&
                        !this.rxRecordDefinitionService.isJoinRecord(definitionModel) &&
                        !fieldModel.isNewField
                        ? new Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.display-id.default-value.tooltip'))
                        : undefined,
                    allowIntegerOnly: true
                }
            },
            {
                name: 'pattern',
                component: SelectFormControlComponent,
                isDisabled: isReadOnly || !this.rxFieldDefinitionInspectorHelperService.isFieldEditable(fieldModel),
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.pattern.label'),
                    emptyOption: true,
                    options: [
                        {
                            name: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.pattern.options.alphabetical.label'),
                            id: '$ALPHA$'
                        },
                        {
                            name: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.pattern.options.alphanumeric.label'),
                            id: '$ALNUM$'
                        },
                        {
                            name: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.pattern.options.lowercase.label'),
                            id: '$LOWER$'
                        },
                        {
                            name: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.pattern.options.named-list.label'),
                            id: '$NAMEDLIST$'
                        },
                        {
                            name: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.pattern.options.numeric.label'),
                            id: '$DIGIT$'
                        },
                        {
                            name: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.pattern.options.uppercase.label'),
                            id: '$UPPER$'
                        }
                    ]
                }
            }
        ]);
        return inspectorConfig;
    }
    validate(fieldModel, definitionModel) {
        const validationIssues = super.validate(fieldModel, definitionModel);
        if (this.rxNumberUtilsService.isFiniteOrNumberString(fieldModel.maxLength) && Number(fieldModel.maxLength) < 0) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.invalid-min-length-error.message'),
                data: {
                    propertyName: 'maxLength',
                    guid: fieldModel.guid
                }
            });
        }
        if (fieldModel.id === RX_RECORD_DEFINITION.coreFieldIds.displayId &&
            (this.rxRecordDefinitionService.isRegularRecord(definitionModel) ||
                this.rxRecordDefinitionService.isExternalRecord(definitionModel))) {
            if (!(fieldModel.maxLength === 1 || inRange(fieldModel.maxLength, 5, 16))) {
                validationIssues.push({
                    type: ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.validation.invalid-max-length.message'),
                    data: {
                        propertyName: 'maxLength',
                        guid: fieldModel.guid
                    }
                });
            }
            if ((fieldModel.maxLength !== 1 && fieldModel.maxLength <= size(fieldModel.defaultValue)) ||
                (fieldModel.maxLength === 1 && size(fieldModel.defaultValue) >= 15)) {
                validationIssues.push({
                    type: ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.validation.invalid-display-id-range.message'),
                    data: {
                        propertyName: 'maxLength',
                        guid: fieldModel.guid
                    }
                });
            }
        }
        return validationIssues;
    }
}
RxCharacterFieldDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCharacterFieldDefinitionService, deps: [{ token: i0.Injector }, { token: i1$1.RxNumberUtilsService }], target: i0.ɵɵFactoryTarget.Injectable });
RxCharacterFieldDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCharacterFieldDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCharacterFieldDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1$1.RxNumberUtilsService }]; } });

class RxDateOnlyFieldDefinitionService extends RxBaseFieldDefinitionService {
    constructor(injector) {
        super(injector);
        this.resourceType = RX_RECORD_DEFINITION.dataTypes.dateOnly.resourceType;
    }
    getFieldInspectorConfig(fieldModel, definitionModel, isReadOnly) {
        const inspectorConfig = super.getFieldInspectorConfig(fieldModel, definitionModel, isReadOnly);
        // Adding controls specific to date only field to Details section
        inspectorConfig[1].controls.push({
            name: 'defaultValue',
            isDisabled: isReadOnly,
            component: DateFormControlComponent,
            options: {
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label')
            }
        });
        return inspectorConfig;
    }
}
RxDateOnlyFieldDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDateOnlyFieldDefinitionService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxDateOnlyFieldDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDateOnlyFieldDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDateOnlyFieldDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });

class RxDateTimeFieldDefinitionService extends RxBaseFieldDefinitionService {
    constructor(injector) {
        super(injector);
        this.resourceType = RX_RECORD_DEFINITION.dataTypes.dateTime.resourceType;
    }
    getFieldInspectorConfig(fieldModel, definitionModel, isReadOnly) {
        const inspectorConfig = super.getFieldInspectorConfig(fieldModel, definitionModel, isReadOnly);
        // Adding controls specific to date only field to Details section
        inspectorConfig[1].controls.push({
            name: 'defaultValue',
            component: DateTimeFormControlComponent,
            isDisabled: isReadOnly || !this.rxFieldDefinitionInspectorHelperService.isFieldEditable(fieldModel),
            options: {
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label')
            }
        });
        return inspectorConfig;
    }
}
RxDateTimeFieldDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDateTimeFieldDefinitionService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxDateTimeFieldDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDateTimeFieldDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDateTimeFieldDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });

class RxNumericFieldDefinitionService extends RxBaseFieldDefinitionService {
    constructor(injector, rxNumberUtilsService) {
        super(injector);
        this.rxNumberUtilsService = rxNumberUtilsService;
    }
    validate(fieldModel, definitionModel) {
        const validationIssues = super.validate(fieldModel, definitionModel);
        if (fieldModel.defaultValue && Number(fieldModel.defaultValue) < this.minValue) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.value-is-too-small-error.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label'),
                    minValue: this.minValue
                }),
                data: {
                    propertyName: 'defaultValue',
                    guid: fieldModel.guid
                }
            });
        }
        if (fieldModel.defaultValue && Number(fieldModel.defaultValue) > this.maxValue) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.value-is-too-large-error.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label'),
                    maxValue: this.maxValue
                }),
                data: {
                    propertyName: 'defaultValue',
                    guid: fieldModel.guid
                }
            });
        }
        if (fieldModel.minValue && Number(fieldModel.minValue) < this.minValue) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.value-is-too-small-error.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-min-value.label'),
                    minValue: this.minValue
                }),
                data: {
                    propertyName: 'minValue',
                    guid: fieldModel.guid
                }
            });
        }
        if (fieldModel.minValue && Number(fieldModel.minValue) > this.maxValue) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.value-is-too-large-error.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-min-value.label'),
                    maxValue: this.maxValue
                }),
                data: {
                    propertyName: 'minValue',
                    guid: fieldModel.guid
                }
            });
        }
        if (fieldModel.maxValue && Number(fieldModel.maxValue) < this.minValue) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.value-is-too-small-error.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-max-value.label'),
                    minValue: this.minValue
                }),
                data: {
                    propertyName: 'maxValue',
                    guid: fieldModel.guid
                }
            });
        }
        if (fieldModel.maxValue && Number(fieldModel.maxValue) > this.maxValue) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.value-is-too-large-error.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-max-value.label'),
                    maxValue: this.maxValue
                }),
                data: {
                    propertyName: 'maxValue',
                    guid: fieldModel.guid
                }
            });
        }
        if (this.rxNumberUtilsService.isFiniteOrNumberString(fieldModel.defaultValue) &&
            this.rxNumberUtilsService.isFiniteOrNumberString(fieldModel.minValue) &&
            Number(fieldModel.defaultValue) >= this.minValue &&
            Number(fieldModel.defaultValue) < Number(fieldModel.minValue)) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.value-is-too-small-error.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label'),
                    minValue: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-min-value.label')
                }),
                data: {
                    propertyName: 'defaultValue',
                    guid: fieldModel.guid
                }
            });
        }
        if (this.rxNumberUtilsService.isFiniteOrNumberString(fieldModel.defaultValue) &&
            this.rxNumberUtilsService.isFiniteOrNumberString(fieldModel.maxValue) &&
            Number(fieldModel.defaultValue) <= this.maxValue &&
            Number(fieldModel.defaultValue) > Number(fieldModel.maxValue)) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.value-is-too-large-error.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label'),
                    maxValue: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-max-value.label')
                }),
                data: {
                    propertyName: 'defaultValue',
                    guid: fieldModel.guid
                }
            });
        }
        if (this.rxNumberUtilsService.isFiniteOrNumberString(fieldModel.minValue) &&
            this.rxNumberUtilsService.isFiniteOrNumberString(fieldModel.maxValue) &&
            Number(fieldModel.minValue) > Number(fieldModel.maxValue)) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.value-is-too-large-error.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-min-value.label'),
                    maxValue: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-max-value.label')
                }),
                data: {
                    propertyName: 'minValue',
                    guid: fieldModel.guid
                }
            });
        }
        if (isNil(fieldModel.minValue)) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-min-value.label')
                }),
                data: {
                    propertyName: 'minValue',
                    guid: fieldModel.guid
                }
            });
        }
        if (isNil(fieldModel.maxValue)) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-max-value.label')
                }),
                data: {
                    propertyName: 'maxValue',
                    guid: fieldModel.guid
                }
            });
        }
        if (this.resourceType !== RX_RECORD_DEFINITION.dataTypes.integer.resourceType && isNil(fieldModel.precision)) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.precision.label')
                }),
                data: {
                    propertyName: 'maxValue',
                    guid: fieldModel.guid
                }
            });
        }
        return validationIssues;
    }
    getFieldInspectorConfig(fieldModel, definitionModel, isReadOnly) {
        const inspectorConfig = super.getFieldInspectorConfig(fieldModel, definitionModel, isReadOnly);
        // Adding controls specific to decimal field to Details section
        inspectorConfig[1].controls = inspectorConfig[1].controls.concat([
            {
                name: 'precision',
                component: CounterFormControlComponent,
                isDisabled: isReadOnly,
                options: omitBy({
                    label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.field-properties.precision.label'),
                    required: true,
                    allowIntegerOnly: true,
                    minValue: this.minPrecision,
                    maxValue: this.maxPrecision
                }, isNil)
            },
            {
                name: 'minValue',
                component: CounterFormControlComponent,
                isDisabled: isReadOnly,
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-min-value.label'),
                    required: true,
                    allowIntegerOnly: this.allowOnlyInteger,
                    minValue: this.minValue,
                    maxValue: this.maxValue
                }
            },
            {
                name: 'maxValue',
                component: CounterFormControlComponent,
                isDisabled: isReadOnly,
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-max-value.label'),
                    required: true,
                    allowIntegerOnly: this.allowOnlyInteger,
                    minValue: this.minValue,
                    maxValue: this.maxValue
                }
            },
            {
                name: 'defaultValue',
                component: CounterFormControlComponent,
                isDisabled: isReadOnly,
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label'),
                    allowIntegerOnly: this.allowOnlyInteger,
                    minValue: this.minValue,
                    maxValue: this.maxValue
                }
            }
        ]);
        return inspectorConfig;
    }
}
RxNumericFieldDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNumericFieldDefinitionService, deps: [{ token: i0.Injector }, { token: i1$1.RxNumberUtilsService }], target: i0.ɵɵFactoryTarget.Injectable });
RxNumericFieldDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNumericFieldDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNumericFieldDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1$1.RxNumberUtilsService }]; } });

class RxDecimalFieldDefinitionService extends RxNumericFieldDefinitionService {
    constructor() {
        super(...arguments);
        this.resourceType = RX_RECORD_DEFINITION.dataTypes.decimal.resourceType;
        this.minPrecision = 0;
        this.maxPrecision = 9;
        this.minValue = RX_NUMBER.minDecimal;
        this.maxValue = RX_NUMBER.maxDecimal;
        this.allowOnlyInteger = false;
    }
    getNewFieldDefinitionModel(fieldProperties) {
        return super.getNewFieldDefinitionModel(Object.assign(Object.assign({}, fieldProperties), { precision: 2, minValue: this.minValue, maxValue: this.maxValue }));
    }
    validate(fieldModel, definitionModel) {
        const validationIssues = super.validate(fieldModel, definitionModel);
        if (!inRange(fieldModel.precision, this.minPrecision, this.maxPrecision + 1)) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.validation.invalid-precision-range.message', {
                    min: this.minPrecision,
                    max: this.maxPrecision
                }),
                data: {
                    propertyName: 'precision',
                    guid: fieldModel.guid
                }
            });
        }
        return validationIssues;
    }
}
RxDecimalFieldDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDecimalFieldDefinitionService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
RxDecimalFieldDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDecimalFieldDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDecimalFieldDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class RxIntegerFieldDefinitionService extends RxNumericFieldDefinitionService {
    constructor() {
        super(...arguments);
        this.resourceType = RX_RECORD_DEFINITION.dataTypes.integer.resourceType;
        this.minPrecision = null;
        this.maxPrecision = null;
        this.minValue = RX_NUMBER.minInteger;
        this.maxValue = RX_NUMBER.maxInteger;
        this.allowOnlyInteger = true;
    }
    getNewFieldDefinitionModel(fieldProperties) {
        return super.getNewFieldDefinitionModel(Object.assign(Object.assign({}, fieldProperties), { minValue: this.minValue, maxValue: this.maxValue }));
    }
    getFieldInspectorConfig(fieldModel, definitionModel, isReadOnly) {
        const inspectorConfig = super.getFieldInspectorConfig(fieldModel, definitionModel, isReadOnly);
        // Removing Precision control not required for integer field
        inspectorConfig[1].controls.splice(7, 1);
        return inspectorConfig;
    }
}
RxIntegerFieldDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIntegerFieldDefinitionService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
RxIntegerFieldDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIntegerFieldDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIntegerFieldDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class LocalizedCharacterFieldEditorComponent extends ValueAccessor {
    constructor(rxModalService, translateService) {
        super();
        this.rxModalService = rxModalService;
        this.translateService = translateService;
    }
    localize() {
        this.rxModalService
            .openModal({
            title: this.translateService.instant('com.bmc.arsys.rx.client.view-components.localized-character-field.dialog.title'),
            data: {
                valueByLocale: Object.assign({}, this.value),
                hideCurrentLocale: true,
                isReadOnly: this.options.isReadOnly
            },
            size: 'sm',
            content: LocalizedCharacterFieldValueModalComponent
        })
            .then((data) => {
            if (data) {
                this.value = data.valueByLocale;
            }
        })
            .catch(noop);
    }
}
LocalizedCharacterFieldEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LocalizedCharacterFieldEditorComponent, deps: [{ token: i1.RxModalService }, { token: i2.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
LocalizedCharacterFieldEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: LocalizedCharacterFieldEditorComponent, selector: "rx-localized-character-field-editor", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: LocalizedCharacterFieldEditorComponent,
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: "<div>\n  <button\n    type=\"button\"\n    class=\"localize-button btn btn-link focusable d-icon-left-pencil p-0 float-end\"\n    (click)=\"localize()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.view-components.localized-character-field.button.localize.label' | translate }}\n  </button>\n\n  <div class=\"pl-1\">{{ value['en-US'] }}</div>\n</div>\n", pipes: { "translate": i2.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LocalizedCharacterFieldEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-localized-character-field-editor',
                    templateUrl: './localized-character-field-editor.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: LocalizedCharacterFieldEditorComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxModalService }, { type: i2.TranslateService }]; }, propDecorators: { options: [{
                type: Input
            }] } });

class RxLocalizedCharacterFieldDefinitionService extends RxBaseFieldDefinitionService {
    constructor(injector, rxNumberUtilsService) {
        super(injector);
        this.rxNumberUtilsService = rxNumberUtilsService;
        this.resourceType = RX_RECORD_DEFINITION.dataTypes.localizedCharacter.resourceType;
    }
    getNewFieldDefinitionModel(fieldProperties) {
        return super.getNewFieldDefinitionModel(Object.assign(Object.assign({}, fieldProperties), { maxLength: 254 }));
    }
    getFieldInspectorConfig(fieldModel, definitionModel, isReadOnly) {
        const inspectorConfig = super.getFieldInspectorConfig(fieldModel, definitionModel, isReadOnly);
        inspectorConfig[1].controls = inspectorConfig[1].controls.concat([
            {
                name: 'maxLength',
                component: CounterFormControlComponent,
                isDisabled: isReadOnly,
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.length.label'),
                    minValue: 0,
                    maxValue: 254,
                    allowIntegerOnly: true
                }
            },
            {
                name: 'defaultValueByLocale',
                component: LocalizedCharacterFieldEditorComponent,
                options: {
                    isReadOnly: isReadOnly
                }
            }
        ]);
        return inspectorConfig;
    }
    validate(fieldModel, definitionModel) {
        const validationIssues = super.validate(fieldModel, definitionModel);
        if (this.rxNumberUtilsService.isFiniteOrNumberString(fieldModel.maxLength) && Number(fieldModel.maxLength) < 0) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.invalid-min-length-error.message'),
                data: {
                    propertyName: 'maxLength',
                    guid: fieldModel.guid
                }
            });
        }
        return validationIssues;
    }
}
RxLocalizedCharacterFieldDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLocalizedCharacterFieldDefinitionService, deps: [{ token: i0.Injector }, { token: i1$1.RxNumberUtilsService }], target: i0.ɵɵFactoryTarget.Injectable });
RxLocalizedCharacterFieldDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLocalizedCharacterFieldDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLocalizedCharacterFieldDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1$1.RxNumberUtilsService }]; } });

class RxRealFieldDefinitionService extends RxNumericFieldDefinitionService {
    constructor() {
        super(...arguments);
        this.resourceType = RX_RECORD_DEFINITION.dataTypes.real.resourceType;
        this.maxPrecision = null;
        this.minValue = -1.845e19;
        this.maxValue = 1.845e19;
        this.allowOnlyInteger = false;
        this.AR_PRECISION_NONE = -1;
    }
    getNewFieldDefinitionModel(fieldProperties) {
        return super.getNewFieldDefinitionModel(Object.assign(Object.assign({}, fieldProperties), { precision: 6, minValue: this.minValue, maxValue: this.maxValue }));
    }
    validate(fieldModel, definitionModel) {
        const validationIssues = super.validate(fieldModel, definitionModel);
        if (!isFinite(fieldModel.precision) ||
            (fieldModel.precision < 1 && fieldModel.precision != this.AR_PRECISION_NONE)) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.validation.invalid-real-field-precision-range.message'),
                data: {
                    propertyName: 'precision',
                    guid: fieldModel.guid
                }
            });
        }
        return validationIssues;
    }
}
RxRealFieldDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRealFieldDefinitionService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
RxRealFieldDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRealFieldDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRealFieldDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class RxSelectionFieldDefinitionService extends RxBaseFieldDefinitionService {
    constructor(injector) {
        super(injector);
        this.resourceType = RX_RECORD_DEFINITION.dataTypes.selection.resourceType;
    }
    getFieldInspectorConfig(fieldModel, definitionModel, isReadOnly) {
        const inspectorConfig = super.getFieldInspectorConfig(fieldModel, definitionModel, isReadOnly);
        inspectorConfig[1].controls.push({
            name: 'selectionFieldOptionProperties',
            component: SelectionFieldOptionsComponent,
            options: {
                isReadOnly: !this.rxFieldDefinitionInspectorHelperService.isFieldEditable(fieldModel)
            }
        });
        return inspectorConfig;
    }
    validate(fieldModel, definitionModel) {
        var _a;
        const validationIssues = super.validate(fieldModel, definitionModel);
        if (isEmpty((_a = fieldModel.selectionFieldOptionProperties) === null || _a === void 0 ? void 0 : _a.optionNamesById)) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', { propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.options.label') }),
                data: {
                    propertyName: 'selectionFieldOptionProperties',
                    guid: fieldModel.guid
                }
            });
        }
        return validationIssues;
    }
}
RxSelectionFieldDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSelectionFieldDefinitionService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxSelectionFieldDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSelectionFieldDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSelectionFieldDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });

class RxTimeOnlyFieldDefinitionService extends RxBaseFieldDefinitionService {
    constructor(injector) {
        super(injector);
        this.resourceType = RX_RECORD_DEFINITION.dataTypes.timeOnly.resourceType;
    }
    getFieldInspectorConfig(fieldModel, definitionModel, isReadOnly) {
        const inspectorConfig = super.getFieldInspectorConfig(fieldModel, definitionModel, isReadOnly);
        inspectorConfig[1].controls.push({
            name: 'defaultValue',
            isDisabled: isReadOnly,
            component: TimeFormControlComponent,
            options: {
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label')
            }
        });
        return inspectorConfig;
    }
}
RxTimeOnlyFieldDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxTimeOnlyFieldDefinitionService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxTimeOnlyFieldDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxTimeOnlyFieldDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxTimeOnlyFieldDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });

class RxFieldDefinitionManagerService {
    constructor(rxAttachmentFieldDefinitionService, rxBooleanFieldDefinitionService, rxCharacterFieldDefinitionService, rxLocalizedCharacterFieldDefinitionService, rxDateTimeFieldDefinitionService, rxDateOnlyFieldDefinitionService, rxTimeOnlyFieldDefinitionService, rxIntegerFieldDefinitionService, rxDecimalFieldDefinitionService, rxRealFieldDefinitionService, rxSelectionFieldDefinitionService) {
        this.fieldServices = new Map();
        this.fieldServices.set(RX_RECORD_DEFINITION.dataTypes.attachment.resourceType, rxAttachmentFieldDefinitionService);
        this.fieldServices.set(RX_RECORD_DEFINITION.dataTypes.boolean.resourceType, rxBooleanFieldDefinitionService);
        this.fieldServices.set(RX_RECORD_DEFINITION.dataTypes.character.resourceType, rxCharacterFieldDefinitionService);
        this.fieldServices.set(RX_RECORD_DEFINITION.dataTypes.localizedCharacter.resourceType, rxLocalizedCharacterFieldDefinitionService);
        this.fieldServices.set(RX_RECORD_DEFINITION.dataTypes.dateTime.resourceType, rxDateTimeFieldDefinitionService);
        this.fieldServices.set(RX_RECORD_DEFINITION.dataTypes.dateOnly.resourceType, rxDateOnlyFieldDefinitionService);
        this.fieldServices.set(RX_RECORD_DEFINITION.dataTypes.timeOnly.resourceType, rxTimeOnlyFieldDefinitionService);
        this.fieldServices.set(RX_RECORD_DEFINITION.dataTypes.integer.resourceType, rxIntegerFieldDefinitionService);
        this.fieldServices.set(RX_RECORD_DEFINITION.dataTypes.decimal.resourceType, rxDecimalFieldDefinitionService);
        this.fieldServices.set(RX_RECORD_DEFINITION.dataTypes.real.resourceType, rxRealFieldDefinitionService);
        this.fieldServices.set(RX_RECORD_DEFINITION.dataTypes.selection.resourceType, rxSelectionFieldDefinitionService);
    }
    getNewFieldDefinitionModel(resourceType, fieldProperties) {
        return this.fieldServices.get(resourceType).getNewFieldDefinitionModel(fieldProperties);
    }
    getFieldInspectorConfig(fieldModel, definitionModel, isReadOnly) {
        return this.fieldServices
            .get(fieldModel.resourceType)
            .getFieldInspectorConfig(fieldModel, definitionModel, isReadOnly);
    }
    validate(fieldModel, definitionModel) {
        return this.fieldServices.get(fieldModel.resourceType).validate(fieldModel, definitionModel);
    }
}
RxFieldDefinitionManagerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFieldDefinitionManagerService, deps: [{ token: RxAttachmentFieldDefinitionService }, { token: RxBooleanFieldDefinitionService }, { token: RxCharacterFieldDefinitionService }, { token: RxLocalizedCharacterFieldDefinitionService }, { token: RxDateTimeFieldDefinitionService }, { token: RxDateOnlyFieldDefinitionService }, { token: RxTimeOnlyFieldDefinitionService }, { token: RxIntegerFieldDefinitionService }, { token: RxDecimalFieldDefinitionService }, { token: RxRealFieldDefinitionService }, { token: RxSelectionFieldDefinitionService }], target: i0.ɵɵFactoryTarget.Injectable });
RxFieldDefinitionManagerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFieldDefinitionManagerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFieldDefinitionManagerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: RxAttachmentFieldDefinitionService }, { type: RxBooleanFieldDefinitionService }, { type: RxCharacterFieldDefinitionService }, { type: RxLocalizedCharacterFieldDefinitionService }, { type: RxDateTimeFieldDefinitionService }, { type: RxDateOnlyFieldDefinitionService }, { type: RxTimeOnlyFieldDefinitionService }, { type: RxIntegerFieldDefinitionService }, { type: RxDecimalFieldDefinitionService }, { type: RxRealFieldDefinitionService }, { type: RxSelectionFieldDefinitionService }]; } });

class RecordInheritanceEditorComponent extends ValueAccessor {
    constructor(translateService, rxFieldDefinitionManagerService, rxRecordDefinitionCacheService, rxNotificationService, rxGuidService, rxFieldDefinitionService) {
        super();
        this.translateService = translateService;
        this.rxFieldDefinitionManagerService = rxFieldDefinitionManagerService;
        this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
        this.rxNotificationService = rxNotificationService;
        this.rxGuidService = rxGuidService;
        this.rxFieldDefinitionService = rxFieldDefinitionService;
        this.inheritanceDescriptor = {
            inheritingFrom: '',
            isInheritingRules: true,
            isInheritingFieldPermissions: true,
            isInheritingAssociations: true,
            isInheritingFieldAuditOptions: true
        };
        this.recordDefinitionPickerOptions = {
            label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.record-to-inherit.label'),
            definitionType: RxDefinitionPickerType.InheritableRecord,
            availableDefinitionPickerStates: {
                definitionButtonsGroups: [RxDefinitionPickerScope.Bundle, RxDefinitionPickerScope.All],
                search: RxDefinitionPickerScope.All
            }
        };
        this.destroyed$ = new ReplaySubject(1);
        this.isReadOnlySubject = new BehaviorSubject(false);
        this.isSharedInstanceStorageLockedSubject = new BehaviorSubject(true);
        this.inheritingFromSubject = new BehaviorSubject('');
        this.isMakeFinalDisabledSubject = new BehaviorSubject(false);
        this.isSharedInstanceStorageDisabled$ = combineLatest([
            this.isReadOnlySubject,
            this.isSharedInstanceStorageLockedSubject
        ]).pipe(map(([isReadOnly, isSharedInstanceStorage]) => isReadOnly || isSharedInstanceStorage));
        this.inheritFromRecordDefinition$ = this.inheritingFromSubject.pipe(switchMap((recordDefinitionName) => iif(() => Boolean(recordDefinitionName), this.rxRecordDefinitionCacheService.getRecordDefinition(recordDefinitionName), of(null))), tap((recordDefinition) => {
            if (recordDefinition) {
                this.inheritFromRecordDefinition = recordDefinition;
                this.isInheritingCoreFields = false;
                if (recordDefinition.isSharedInstanceStorage) {
                    this.inheritanceOptions.isSharedInstanceStorage = true;
                    this.updateInheritanceOptions();
                    this.state.inheritCoreFieldsAutomatically = true;
                    this.isInheritingCoreFields = true;
                }
                else {
                    if (this.isNew) {
                        this.inheritanceOptions.isSharedInstanceStorage = false;
                    }
                    this.state.inheritCoreFieldsAutomatically = false;
                }
                this.inheritanceDescriptor.isInheritingRules = true;
                this.inheritedFieldDefinitions = this.getInheritedFieldDefinitions(recordDefinition);
                forEach(recordDefinition.securityLabels, function (securityLabel) {
                    securityLabel.inherited = true;
                });
                this.setValue();
            }
        }));
        this.isCoreFieldsOptionDisabled$ = combineLatest([this.isReadOnlySubject, this.inheritFromRecordDefinition$]).pipe(map(([isReadOnly, inheritingFromRecordDefinition]) => !this.inheritFrom ||
            isReadOnly ||
            this.state.inheritCoreFieldsAutomatically ||
            this.state.lockCoreFieldInheritanceOption));
        this.vm$ = combineLatest([
            this.isReadOnlySubject,
            this.isSharedInstanceStorageDisabled$,
            this.isMakeFinalDisabledSubject,
            this.isCoreFieldsOptionDisabled$
        ]).pipe(map(([isReadOnly, isSharedInstanceStorageDisabled, isMakeFinalDisabled, isCoreFieldsOptionDisabled]) => ({
            isReadOnly,
            isSharedInstanceStorageDisabled,
            isMakeFinalDisabled,
            isCoreFieldsOptionDisabled
        })));
    }
    ngOnInit() {
        if (this.options) {
            this.updateValues();
        }
    }
    updateInheritanceOptions() {
        this.isMakeFinalDisabledSubject.next(this.isReadOnlySubject.value ||
            (this.inheritanceOptions.isSharedInstanceStorage && !this.inheritingFromSubject.value));
        if (this.inheritanceOptions.isSharedInstanceStorage &&
            this.inheritanceOptions.isFinal &&
            !this.inheritFromRecordDefinition) {
            this.inheritanceOptions.isFinal = false;
        }
    }
    onInheritanceOptionsChange() {
        this.updateInheritanceOptions();
        this.setValue();
    }
    onInheritanceDescriptorChange() {
        if (this.inheritanceDescriptor.isInheritingFieldPermissions) {
            this.inheritedFieldDefinitions = this.getInheritedFieldDefinitions(this.inheritFromRecordDefinition);
        }
        this.setValue();
    }
    ngOnChanges(changes) {
        if (changes.options) {
            this.updateValues();
        }
    }
    onRecordDefinitionNameChange(recordDefinitionName) {
        this.rxNotificationService.addInfoMessage(this.translateService.instant('com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.inherited-fields-remaining-info.message'));
        if (recordDefinitionName) {
            this.inheritingFromSubject.next(recordDefinitionName);
        }
        else {
            this.inheritedFieldDefinitions = [];
            this.setValue();
        }
    }
    onInheritCoreFieldsChange() {
        this.inheritedFieldDefinitions = this.getInheritedFieldDefinitions(this.inheritFromRecordDefinition);
        this.setValue();
    }
    getInheritedFieldDefinitions(recordDefinition) {
        var _a;
        const newFieldProperties = union(keys(this.rxFieldDefinitionManagerService.getNewFieldDefinitionModel(RX_RECORD_DEFINITION.resourceTypes.character, null)), [
            'isInherited',
            'anyUserAllowedToSubmit',
            'displayType',
            'explicitPermissions',
            'fieldMapping',
            'fieldTypeName',
            'maxLength',
            'maxSize',
            'maxValue',
            'minValue',
            'namedListDefinition',
            'optionNamesById',
            'optionLabelsById',
            'precision',
            'resourceType',
            'searchable',
            'shouldPersistEncrypted',
            'shouldPersistHashed',
            'tags',
            'version'
        ]);
        if ((_a = this.inheritanceDescriptor) === null || _a === void 0 ? void 0 : _a.isInheritingFieldPermissions) {
            newFieldProperties.push('permissions');
        }
        const inheritedFieldDefinitions = map$1(recordDefinition.fieldDefinitions, (fieldDefinition) => {
            fieldDefinition.isInherited = true;
            return Object.assign(Object.assign({}, pick(fieldDefinition, newFieldProperties)), { guid: this.rxGuidService.generate(), isCoreField: this.rxFieldDefinitionService.isCoreField(fieldDefinition), selectionFieldOptionProperties: fieldDefinition.resourceType === RX_RECORD_DEFINITION.dataTypes.selection.resourceType
                    ? {
                        defaultValue: null,
                        optionNamesById: fieldDefinition.optionNamesById,
                        optionLabelsById: fieldDefinition.optionLabelsById
                    }
                    : null });
        });
        if (!this.isInheritingCoreFields) {
            remove(inheritedFieldDefinitions, function (fieldDefinition) {
                return includes(RX_RECORD_DEFINITION.arCoreFieldIds, fieldDefinition.id);
            });
        }
        return inheritedFieldDefinitions;
    }
    updateValues() {
        var _a;
        if (this.options) {
            const recordDefinition = this.options.recordDefinition;
            this.inheritanceOptions = Object.assign({}, recordDefinition.recordInheritanceSelector.inheritanceOptions);
            if (recordDefinition.recordInheritanceSelector.inheritanceDescriptor) {
                this.inheritanceDescriptor = Object.assign({}, recordDefinition.recordInheritanceSelector.inheritanceDescriptor);
                this.inheritFrom = this.inheritanceDescriptor.inheritingFrom;
            }
            this.isNew = !recordDefinition.lastUpdateTime;
            this.isReadOnlySubject.next(this.options.isReadOnly);
            this.isSharedInstanceStorageLockedSubject.next(!this.isNew || !isEmpty(this.inheritFrom));
            if ((_a = recordDefinition.inheritanceDescriptor) === null || _a === void 0 ? void 0 : _a.inheritingFrom) {
                this.isSharedInstanceStorageLockedSubject.next(true);
                this.rxRecordDefinitionCacheService
                    .getRecordDefinition(recordDefinition.inheritanceDescriptor.inheritingFrom)
                    .pipe(take(1))
                    .subscribe((inheritFromRecordDefinition) => {
                    if (inheritFromRecordDefinition.isSharedInstanceStorage) {
                        this.state.inheritCoreFieldsAutomatically = true;
                        this.isInheritingCoreFields = true;
                    }
                    else {
                        var fieldDefinitions = recordDefinition.fields;
                        this.isInheritingCoreFields = some(fieldDefinitions, function (fieldDefinition) {
                            return fieldDefinition.isInherited && includes(RX_RECORD_DEFINITION.arCoreFieldIds, fieldDefinition.id);
                        });
                    }
                });
            }
            this.state = {
                editMode: !this.isNew,
                inheritCoreFieldsAutomatically: false,
                lockCoreFieldInheritanceOption: !this.isNew
            };
        }
    }
    setValue() {
        this.value = {
            inheritanceOptions: this.inheritanceOptions,
            inheritanceDescriptor: this.inheritFrom
                ? Object.assign(Object.assign({}, this.inheritanceDescriptor), { inheritingFrom: this.inheritFrom }) : null,
            isInheritingCoreFields: this.inheritFrom ? this.isInheritingCoreFields : null,
            inheritedFieldDefinitions: this.inheritedFieldDefinitions
        };
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
        this.isReadOnlySubject.complete();
        this.isSharedInstanceStorageLockedSubject.complete();
        this.inheritingFromSubject.complete();
        this.isMakeFinalDisabledSubject.complete();
    }
}
RecordInheritanceEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordInheritanceEditorComponent, deps: [{ token: i2.TranslateService }, { token: RxFieldDefinitionManagerService }, { token: i3$1.RxRecordDefinitionCacheService }, { token: i2$1.RxNotificationService }, { token: i1$1.RxGuidService }, { token: i3$1.RxFieldDefinitionService }], target: i0.ɵɵFactoryTarget.Component });
RecordInheritanceEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RecordInheritanceEditorComponent, selector: "rx-record-inheritance-selector", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: RecordInheritanceEditorComponent,
            multi: true
        }
    ], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<ng-container *ngIf=\"vm$ | async as vm\">\n  <adapt-rx-checkbox\n    label=\"{{\n      'com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.share-data-with-inheritors.label' | translate\n    }}\"\n    [(ngModel)]=\"inheritanceOptions.isSharedInstanceStorage\"\n    (ngModelChange)=\"onInheritanceOptionsChange()\"\n    [disabled]=\"vm.isSharedInstanceStorageDisabled\"\n    [tooltip]=\"{\n      iconName: 'question_circle_o',\n      content:\n        'com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.share-data-with-inheritors.tooltip'\n        | translate,\n      placement: 'bottom',\n      popoverMode: true\n    }\"\n  >\n  </adapt-rx-checkbox>\n\n  <adapt-rx-checkbox\n    label=\"{{ 'com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.make-abstract.label' | translate }}\"\n    [(ngModel)]=\"inheritanceOptions.isAbstract\"\n    (ngModelChange)=\"onInheritanceOptionsChange()\"\n    [disabled]=\"vm.isReadOnly\"\n    [tooltip]=\"{\n      iconName: 'question_circle_o',\n      content: 'com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.make-abstract.tooltip' | translate,\n      placement: 'bottom',\n      popoverMode: true\n    }\"\n  >\n  </adapt-rx-checkbox>\n\n  <adapt-rx-checkbox\n    label=\"{{ 'com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.make-final.label' | translate }}\"\n    [(ngModel)]=\"inheritanceOptions.isFinal\"\n    (ngModelChange)=\"onInheritanceOptionsChange()\"\n    [disabled]=\"vm.isMakeFinalDisabled || vm.isReadOnly\"\n    [tooltip]=\"{\n      iconName: 'question_circle_o',\n      content: 'com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.make-final.tooltip' | translate,\n      placement: 'bottom',\n      popoverMode: true\n    }\"\n  >\n  </adapt-rx-checkbox>\n\n  <rx-definition-picker\n    class=\"form-group d-block\"\n    name=\"inherit-from\"\n    rx-id=\"record-definition-name-field\"\n    [options]=\"recordDefinitionPickerOptions\"\n    [(ngModel)]=\"inheritFrom\"\n    (ngModelChange)=\"onRecordDefinitionNameChange($event)\"\n    [disabled]=\"vm.isReadOnly\"\n  >\n  </rx-definition-picker>\n\n  <div *ngIf=\"inheritFrom\">\n    <label>\n      <span>{{ 'com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.inherit.label' | translate }}</span>\n    </label>\n\n    <adapt-rx-checkbox\n      label=\"{{ 'com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.core-fields.label' | translate }}\"\n      [(ngModel)]=\"isInheritingCoreFields\"\n      (ngModelChange)=\"onInheritCoreFieldsChange()\"\n      [disabled]=\"vm.isCoreFieldsOptionDisabled\"\n    >\n    </adapt-rx-checkbox>\n\n    <adapt-rx-checkbox\n      label=\"{{ 'com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.rules.label' | translate }}\"\n      [(ngModel)]=\"inheritanceDescriptor.isInheritingRules\"\n      [disabled]=\"vm.isReadOnly\"\n      (ngModelChange)=\"onInheritanceDescriptorChange()\"\n    >\n    </adapt-rx-checkbox>\n\n    <adapt-rx-checkbox\n      label=\"{{\n        'com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.field-permissions.label' | translate\n      }}\"\n      [(ngModel)]=\"inheritanceDescriptor.isInheritingFieldPermissions\"\n      [disabled]=\"vm.isReadOnly\"\n      (ngModelChange)=\"onInheritanceDescriptorChange()\"\n    >\n    </adapt-rx-checkbox>\n\n    <adapt-rx-checkbox\n      label=\"{{ 'com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.associations.label' | translate }}\"\n      [(ngModel)]=\"inheritanceDescriptor.isInheritingAssociations\"\n      [disabled]=\"vm.isReadOnly\"\n      (ngModelChange)=\"onInheritanceDescriptorChange()\"\n    >\n    </adapt-rx-checkbox>\n\n    <adapt-rx-checkbox\n      label=\"{{\n        'com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.audit-field-properties.label' | translate\n      }}\"\n      [(ngModel)]=\"inheritanceDescriptor.isInheritingFieldAuditOptions\"\n      [disabled]=\"vm.isReadOnly\"\n      (ngModelChange)=\"onInheritanceDescriptorChange()\"\n    >\n    </adapt-rx-checkbox>\n  </div>\n</ng-container>\n", components: [{ type: i3.AdaptRxCheckboxComponent, selector: "adapt-rx-checkbox", inputs: ["value", "checked", "indeterminate"], outputs: ["indeterminateChange"] }, { type: i11.RxDefinitionPickerComponent, selector: "rx-definition-picker", inputs: ["options", "isDisabled"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "async": i5.AsyncPipe, "translate": i2.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordInheritanceEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-record-inheritance-selector',
                    templateUrl: './record-inheritance-editor.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: RecordInheritanceEditorComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i2.TranslateService }, { type: RxFieldDefinitionManagerService }, { type: i3$1.RxRecordDefinitionCacheService }, { type: i2$1.RxNotificationService }, { type: i1$1.RxGuidService }, { type: i3$1.RxFieldDefinitionService }]; }, propDecorators: { options: [{
                type: Input
            }] } });

class RecordInheritanceEditorModule {
}
RecordInheritanceEditorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordInheritanceEditorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RecordInheritanceEditorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordInheritanceEditorModule, declarations: [RecordInheritanceEditorComponent], imports: [CommonModule,
        FormsModule,
        AdaptTooltipModule,
        AdaptRxSelectModule,
        AdaptButtonModule,
        AdaptCheckbox2Module,
        AdaptPopoverModule,
        AdaptIconModule,
        AdaptRxCheckboxModule,
        ReactiveFormsModule,
        TranslateModule,
        AdaptTableModule,
        RxDefinitionPickerModule], exports: [RecordInheritanceEditorComponent] });
RecordInheritanceEditorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordInheritanceEditorModule, imports: [[
            CommonModule,
            FormsModule,
            AdaptTooltipModule,
            AdaptRxSelectModule,
            AdaptButtonModule,
            AdaptCheckbox2Module,
            AdaptPopoverModule,
            AdaptIconModule,
            AdaptRxCheckboxModule,
            ReactiveFormsModule,
            TranslateModule,
            AdaptTableModule,
            RxDefinitionPickerModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordInheritanceEditorModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RecordInheritanceEditorComponent],
                    exports: [RecordInheritanceEditorComponent],
                    entryComponents: [RecordInheritanceEditorComponent],
                    imports: [
                        CommonModule,
                        FormsModule,
                        AdaptTooltipModule,
                        AdaptRxSelectModule,
                        AdaptButtonModule,
                        AdaptCheckbox2Module,
                        AdaptPopoverModule,
                        AdaptIconModule,
                        AdaptRxCheckboxModule,
                        ReactiveFormsModule,
                        TranslateModule,
                        AdaptTableModule,
                        RxDefinitionPickerModule
                    ]
                }]
        }] });

class SearchFieldEditorModalStore extends ComponentStore {
    constructor() {
        super({
            searchFields: [],
            isDirty: false,
            isCategoryVisible: true,
            isValid: true,
            availableFields: [],
            searchDefinition: {}
        });
        this.searchFields$ = this.select((state) => state.searchFields);
        this.availableFields$ = this.select((state) => state.availableFields);
        this.isDirty$ = this.select((state) => state.isDirty);
        this.isValid$ = this.select((state) => state.isValid);
        this.vm$ = this.select(this.availableFields$, this.searchFields$, this.isDirty$, this.isValid$, (availableFields, searchFields, isDirty, isValid) => ({
            availableFields,
            searchFields,
            isDirty,
            isValid
        }));
        this.toggleOpen = this.updater((state, toggleValue) => {
            const searchFieldItems = [...state.searchFields];
            searchFieldItems.forEach((control) => {
                control.get('isOpen').setValue(toggleValue);
            });
            return Object.assign(Object.assign({}, state), { searchFields: searchFieldItems });
        });
        this.updateFields = this.updater((state, field) => (Object.assign(Object.assign({}, state), { searchFields: [...state.searchFields, field], isValid: false })));
        this.updateAvailableFields = this.updater((state, field) => {
            const updatedSearchFields = [...state.searchFields];
            updatedSearchFields.forEach((control) => {
                control
                    .get('isCategoryVisible')
                    .setValue(find(state.availableFields, { id: field.id }).resourceType !== RX_RECORD_DEFINITION.resourceTypes.attachment);
            });
            return Object.assign(Object.assign({}, state), { availableFields: state.availableFields.filter((availableField) => availableField.id !== field.id), isDirty: true, searchFields: updatedSearchFields, isValid: !state.searchFields.some((form) => form.invalid) });
        });
        this.removeSearchField = this.updater((state, fieldIndex) => (Object.assign(Object.assign({}, state), { isDirty: true, searchFields: state.searchFields.filter((field, index) => fieldIndex !== index), isValid: !state.searchFields.some((form) => form.invalid) })));
        this.markDirty = this.updater((state) => (Object.assign(Object.assign({}, state), { isDirty: true, isValid: !state.searchFields.some((form) => form.invalid) })));
    }
}
SearchFieldEditorModalStore.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SearchFieldEditorModalStore, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
SearchFieldEditorModalStore.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SearchFieldEditorModalStore });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SearchFieldEditorModalStore, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });

class SearchFieldEditorModalComponent extends RxModalClass {
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
SearchFieldEditorModalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SearchFieldEditorModalComponent, deps: [{ token: SearchFieldEditorModalStore }, { token: i3.ActiveModalRef }, { token: i6.FormBuilder }, { token: i0.Injector }, { token: i3$1.RxFieldDefinitionService }], target: i0.ɵɵFactoryTarget.Component });
SearchFieldEditorModalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: SearchFieldEditorModalComponent, selector: "rx-search-field-editor-modal", providers: [SearchFieldEditorModalStore], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"vm$ | async as vm\">\n  <div class=\"designer-modal-body modal-body d-flex mh-100\">\n    <div class=\"row flex-grow-1 w-100\">\n      <div class=\"d-flex flex-column mh-100 col\">\n        <div class=\"d-flex align-items-start justify-content-between\">\n          <button\n            adapt-button\n            btn-type=\"tertiary\"\n            class=\"mt-2 p-0\"\n            rx-id=\"add-new-search-field-button\"\n            *ngIf=\"!isReadOnly\"\n            (click)=\"addNewSearchField()\"\n          >\n            <span class=\"d-icon-plus_circle\"></span>\n            {{ 'com.bmc.arsys.rx.client.record-designer.search-fields.add-search-field.button.label' | translate }}\n          </button>\n\n          <div *ngIf=\"vm.searchFields.length\" class=\"btn-group ml-auto\">\n            <button adapt-button btn-type=\"tertiary\" type=\"button\" rx-id=\"expand-all-button\" (click)=\"toggleOpen(true)\">\n              {{ 'com.bmc.arsys.rx.client.common.expand-all.label' | translate }}\n            </button>\n\n            <button\n              adapt-button\n              btn-type=\"tertiary\"\n              type=\"button\"\n              rx-id=\"collapse-all-button\"\n              (click)=\"toggleOpen(false)\"\n            >\n              {{ 'com.bmc.arsys.rx.client.common.collapse-all.label' | translate }}\n            </button>\n          </div>\n        </div>\n\n        <div\n          class=\"border-bottom pb-1 d-flex align-items-center\"\n          *ngIf=\"vm.searchFields.length\"\n          id=\"selected-search-field\"\n          class=\"designer-modal-accordion-wrapper\"\n        >\n          <adapt-accordion [multiselect]=\"true\">\n            <div\n              *ngFor=\"let searchField of vm.searchFields; let index = index; let first = first; let last = last\"\n              class=\"designer-modal-accordion-content\"\n            >\n              <adapt-accordion-tab\n                class=\"d-block\"\n                [formGroup]=\"searchField\"\n                [isOpen]=\"searchField.get('isOpen').value\"\n                (open)=\"searchField.get('isOpen').setValue(true)\"\n                (close)=\"searchField.get('isOpen').setValue(false)\"\n              >\n                <div class=\"card-title-text w-100\">\n                  <div class=\"designer-modal-card-title-content\">\n                    <div class=\"left-header-block pl-0\">\n                      <div rx-id=\"card-title\">\n                        {{ searchField.get('searchFieldName').value[0]?.name }}\n                      </div>\n                    </div>\n\n                    <div class=\"right-header-block\">\n                      <button\n                        class=\"d-icon-left-cross_adapt p-1 pr-4 ml-3\"\n                        adapt-button\n                        size=\"small\"\n                        type=\"button\"\n                        rx-id=\"remove-button\"\n                        *ngIf=\"!isReadOnly\"\n                        (click)=\"onRemoveSearchField(index)\"\n                      >\n                        {{ 'com.bmc.arsys.rx.client.common.remove.label' | translate }}\n                      </button>\n                    </div>\n                  </div>\n                </div>\n\n                <div class=\"row form-group\">\n                  <adapt-rx-select\n                    [ngClass]=\"recordDefinition.enableCognitiveSearch ? 'd-block col-12' : 'd-block col-6'\"\n                    rx-id=\"available-fields\"\n                    label=\"{{ 'com.bmc.arsys.rx.client.record-designer.search-fields.field.label' | translate }}\"\n                    formControlName=\"searchFieldName\"\n                    [options]=\"vm.availableFields\"\n                    [optionFormatter]=\"optionFormatter\"\n                    [optionContentTemplate]=\"optionTemplate\"\n                    (ngModelChange)=\"onSelectedFieldChange($event)\"\n                    [disabled]=\"isReadOnly\"\n                  ></adapt-rx-select>\n\n                  <adapt-rx-textfield\n                    *ngIf=\"!recordDefinition.enableCognitiveSearch && searchField.get('isCategoryVisible').value\"\n                    class=\"d-block col-6\"\n                    rx-id=\"search-field-category\"\n                    label=\"{{\n                      'com.bmc.arsys.rx.client.record-designer.search-fields.search-category-name.label' | translate\n                    }}\"\n                    formControlName=\"category\"\n                    (ngModelChange)=\"onSearchCategoryChange()\"\n                    [disabled]=\"isReadOnly\"\n                  ></adapt-rx-textfield>\n                </div>\n              </adapt-accordion-tab>\n            </div>\n          </adapt-accordion>\n        </div>\n\n        <div *ngIf=\"!vm.searchFields.length\" class=\"d-flex justify-content-center h-100 align-items-center mt-2\">\n          <adapt-empty-state\n            class=\"w-100\"\n            label=\"{{ 'com.bmc.arsys.rx.client.record-designer.search-fields.empty-state.message' | translate }}\"\n            type=\"config\"\n          ></adapt-empty-state>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"modal-footer\">\n    <div *ngIf=\"!isReadOnly\">\n      <button\n        adapt-button\n        type=\"button\"\n        btn-type=\"primary\"\n        rx-id=\"save-button\"\n        (click)=\"saveSearchFields()\"\n        [disabled]=\"!vm.isValid || !vm.isDirty\"\n      >\n        {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n      </button>\n      <button adapt-button type=\"button\" btn-type=\"secondary\" (click)=\"cancel()\" rx-id=\"cancel-button\">\n        {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n      </button>\n    </div>\n\n    <button type=\"button\" adapt-button btn-type=\"secondary\" rx-id=\"close-button\" (click)=\"cancel()\" *ngIf=\"isReadOnly\">\n      {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n    </button>\n  </div>\n</ng-container>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.designer-modal-body{height:645px;min-height:calc(100% - 61px)!important}.designer-modal-accordion-wrapper{display:flex;flex-direction:column;height:100%;overflow:auto;padding-top:10px}.designer-modal-accordion-content{position:relative}.designer-modal-accordion-content.cdk-drag-preview{z-index:1200!important}.designer-modal-drag-handle{cursor:move;position:absolute;top:0;left:0;height:46px;padding:14px 10px 14px 14px;z-index:1}.designer-modal-card-title-content{width:100%;display:flex}.designer-modal-card-title-content .left-header-block,.designer-modal-card-title-content .right-header-block{display:flex;align-items:center}.designer-modal-card-title-content .left-header-block{flex-grow:1;min-width:0;font-size:14px;padding-left:22px}.designer-modal-card-sub-title{color:#7c7f81;font-weight:normal}.designer-modal-card-title-index-buttons{display:flex;font-size:19px}.rx-card{overflow:auto}.rx-tree-draggable-node{cursor:pointer}.rx-tree-draggable-node.cdk-drag-preview{z-index:1200!important}.rx-tree-draggable-node.cdk-drag{opacity:1}.rx-tree-node-label{word-break:break-all}rx-form-builder{max-width:400px}\n"], components: [{ type: i3.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i3.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i3.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }, { type: i3.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i3.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i3.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i6.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i6.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i5.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], pipes: { "async": i5.AsyncPipe, "translate": i2.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SearchFieldEditorModalComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-search-field-editor-modal',
                    templateUrl: './search-field-editor-modal.component.html',
                    styleUrls: ['./search-field-editor-modal.component.scss'],
                    providers: [SearchFieldEditorModalStore]
                }]
        }], ctorParameters: function () { return [{ type: SearchFieldEditorModalStore }, { type: i3.ActiveModalRef }, { type: i6.FormBuilder }, { type: i0.Injector }, { type: i3$1.RxFieldDefinitionService }]; } });

class SearchFieldEditorControlComponent extends ValueAccessor {
    constructor(rxModalService, translateService) {
        super();
        this.rxModalService = rxModalService;
        this.translateService = translateService;
        this.searchFieldsSubject = new BehaviorSubject([]);
        this.searchFields$ = this.searchFieldsSubject.asObservable().pipe(shareReplay(1));
    }
    ngOnInit() {
        if (this.options) {
            this.updateValues();
        }
    }
    ngOnChanges(changes) {
        if (changes.options) {
            this.updateValues();
        }
    }
    ngOnDestroy() {
        this.searchFieldsSubject.complete();
    }
    updateValues() {
        const searchFields = this.options.recordDefinitionModel.fields.filter((fieldDefinition) => {
            var _a, _b;
            return (fieldDefinition.resourceType === RX_RECORD_DEFINITION.resourceTypes.character ||
                fieldDefinition.resourceType === RX_RECORD_DEFINITION.resourceTypes.attachment) &&
                Boolean(fieldDefinition.searchDefinition) &&
                (((_a = fieldDefinition.searchDefinition) === null || _a === void 0 ? void 0 : _a.enableFTSSearch) || ((_b = fieldDefinition.searchDefinition) === null || _b === void 0 ? void 0 : _b.enableCognitiveSearch));
        });
        this.searchFieldsSubject.next(searchFields);
    }
    openEditor(searchFieldIndex) {
        this.searchFields$.pipe(take(1)).subscribe((searchFields) => {
            this.rxModalService
                .openModal({
                content: SearchFieldEditorModalComponent,
                title: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.search-fields.search-field-editor.title'),
                data: {
                    searchFields: searchFields,
                    fieldDefinitions: this.options.recordDefinitionModel.fields,
                    recordDefinition: this.options.recordDefinitionModel,
                    searchFieldIndex,
                    isReadOnly: this.options.isReadOnly
                }
            })
                .then((updatedSearchFields) => {
                const searchFieldDefinitions = updatedSearchFields.map((searchField) => {
                    var _a;
                    const field = this.options.recordDefinitionModel.fields.find((fieldDefinition) => { var _a; return ((_a = searchField.get('searchFieldName')) === null || _a === void 0 ? void 0 : _a.value[0].id) === fieldDefinition.id; });
                    if (field) {
                        return Object.assign(Object.assign({}, field), { searchDefinition: Object.assign(Object.assign({}, field.searchDefinition), { enableCognitiveSearch: Boolean(this.options.recordDefinitionModel.enableCognitiveSearch), enableFTSSearch: ((_a = field.searchDefinition) === null || _a === void 0 ? void 0 : _a.enableFTSSearch) ||
                                    !Boolean(this.options.recordDefinitionModel.enableCognitiveSearch), stripTagsForSearch: false, enableLiteralSearch: false, searchCategoryName: searchField.get('category').value }), overlayDescriptor: Object.assign(Object.assign({}, field.overlayDescriptor), { otherPropertiesOverlayType: RX_OVERLAY.overlayTypes.overwrite }) });
                    }
                });
                this.value = searchFieldDefinitions;
                this.searchFieldsSubject.next(searchFieldDefinitions);
            })
                .catch(noop);
        });
    }
    removeSearchField(searchField) {
        this.searchFields$.pipe(take(1)).subscribe((searchFields) => {
            this.rxModalService
                .confirm({
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                modalStyle: RX_MODAL.modalStyles.warning,
                message: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.search-fields.delete-confirmation.message', { name: searchField.name })
            })
                .then((isDeleteConfirmed) => {
                if (isDeleteConfirmed) {
                    const searchFieldsList = searchFields.filter((fieldDefinition) => fieldDefinition.name !== searchField.name);
                    this.value = searchFieldsList;
                    this.searchFieldsSubject.next(searchFieldsList);
                }
            });
        });
    }
}
SearchFieldEditorControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SearchFieldEditorControlComponent, deps: [{ token: i1.RxModalService }, { token: i2.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
SearchFieldEditorControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: SearchFieldEditorControlComponent, selector: "rx-search-field-editor-control-control", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: SearchFieldEditorControlComponent,
            multi: true
        }
    ], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<adapt-button\n  type=\"button\"\n  class=\"p-0 pb-1\"\n  btn-type=\"tertiary\"\n  rx-id=\"add-search-field-button\"\n  *ngIf=\"!isDisabled\"\n  (click)=\"openEditor()\"\n>\n  <span class=\"d-icon-left-plus_circle\"> </span>\n  {{ 'com.bmc.arsys.rx.client.record-designer.search-fields.search-field-editor.title' | translate }}\n</adapt-button>\n\n<div *ngIf=\"searchFields$ | async as searchFields\">\n  <div class=\"rx-search-field\" *ngFor=\"let searchField of searchFields\">\n    <div class=\"rx-selected-column__header-container\">\n      <span rx-id=\"card-title\" class=\"rx-search-field__header-title\">{{ searchField.name }}</span>\n\n      <button\n        type=\"button\"\n        (click)=\"removeSearchField(searchField)\"\n        class=\"rx-button-unstyled d-icon-cross btn-link float-right\"\n        *ngIf=\"!options.isReadOnly\"\n        rx-id=\"remove-search-field\"\n      ></button>\n\n      <button\n        type=\"button\"\n        class=\"rx-button-unstyled d-icon-left-pencil btn-link float-right\"\n        rx-id=\"edit-button\"\n        (click)=\"openEditor(searchField.id)\"\n      ></button>\n    </div>\n\n    <div class=\"rx-search-field-type\" rx-id=\"search-field-type\">\n      <span>\n        {{\n          (searchField.searchDefinition.enableFTSSearch\n            ? 'com.bmc.arsys.rx.client.record-designer.search-fields.full-text-search.label'\n            : 'com.bmc.arsys.rx.client.record-designer.search-fields.cognitive-search.label'\n          ) | translate\n        }}\n      </span>\n    </div>\n  </div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.rx-search-field{margin-bottom:5px;border:1px solid #d6d7d8;border-radius:2px;padding:5px 10px;word-break:break-all;font-weight:var(--font-weight-bold)}.rx-search-field__header-container{display:flex}.rx-search-field__header-title{flex:1 1 auto;overflow:hidden;text-overflow:ellipsis;font-size:14px}.rx-search-field-type{color:#959899;font-size:10px;overflow:hidden;text-overflow:ellipsis}.d-icon-cross,.d-icon-left-pencil{cursor:pointer}.d-icon-cross:not(:hover),.d-icon-left-pencil:not(:hover){color:#313538}\n"], components: [{ type: i3.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "translate": i2.TranslatePipe, "async": i5.AsyncPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SearchFieldEditorControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-search-field-editor-control-control',
                    templateUrl: './search-field-editor-control.component.html',
                    styleUrls: ['./search-field-editor-control.component.scss'],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: SearchFieldEditorControlComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxModalService }, { type: i2.TranslateService }]; }, propDecorators: { options: [{
                type: Input
            }] } });

class SearchFieldEditorModule {
}
SearchFieldEditorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SearchFieldEditorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SearchFieldEditorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SearchFieldEditorModule, declarations: [SearchFieldEditorControlComponent, SearchFieldEditorModalComponent], imports: [CommonModule,
        AdaptTooltipModule,
        AdaptRxSelectModule,
        AdaptButtonModule,
        AdaptRxFormControlModule,
        AdaptRxTextfieldModule,
        AdaptAccordionModule,
        RxModalModule,
        ReactiveFormsModule,
        TranslateModule,
        AdaptEmptyStateModule], exports: [SearchFieldEditorControlComponent, SearchFieldEditorModalComponent] });
SearchFieldEditorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SearchFieldEditorModule, imports: [[
            CommonModule,
            AdaptTooltipModule,
            AdaptRxSelectModule,
            AdaptButtonModule,
            AdaptRxFormControlModule,
            AdaptRxTextfieldModule,
            AdaptAccordionModule,
            RxModalModule,
            ReactiveFormsModule,
            TranslateModule,
            AdaptEmptyStateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SearchFieldEditorModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [SearchFieldEditorControlComponent, SearchFieldEditorModalComponent],
                    exports: [SearchFieldEditorControlComponent, SearchFieldEditorModalComponent],
                    entryComponents: [SearchFieldEditorControlComponent, SearchFieldEditorModalComponent],
                    imports: [
                        CommonModule,
                        AdaptTooltipModule,
                        AdaptRxSelectModule,
                        AdaptButtonModule,
                        AdaptRxFormControlModule,
                        AdaptRxTextfieldModule,
                        AdaptAccordionModule,
                        RxModalModule,
                        ReactiveFormsModule,
                        TranslateModule,
                        AdaptEmptyStateModule
                    ]
                }]
        }] });

const init = createAction('[Record Designer] Init', props());
const loadDefinition = createAction('[Record Designer] Load Definition');
const clearSearchFields = createAction('[Record Designer] Clear Search Fields');
const loadDefinitionSuccess = createAction('[Record Designer] Load Definition Success', props());
const initDefinitionModel = createAction('[Record Designer] Init Definition Model', props());
const markDesignerPristine = createAction('[Record Designer] Mark Designer Pristine');
const markDesignerDirty = createAction('[Record Designer] Mark Designer Dirty');
const toggleDesignMode = createAction('[Record Designer] Toggle Design Mode');
const updateDefinitionModelFromDesigner = createAction('[Record Designer] Update Definition Model From Designer', props());
const updateSelectedFieldModel = createAction('[Record Designer] Update Selected Field Model', props());
const setInspectorTabIndex = createAction('[Record Designer] Set Inspector Tab Index', props());
const createNewFieldModel = createAction('[Record Designer] Create New Field Model', props());
const addFieldModel = createAction('[Record Designer] Add Field Model', props());
const addNewFieldModels = createAction('[Record Designer] Add New Field Models', props());
const setSelectedFieldGuid = createAction('[Record Designer] Set Selected Field GUID', props());
const clearSelectedFieldGuid = createAction('[Record Designer] Clear Selected Field GUID');
const deleteSelectedField = createAction('[Record Designer] Delete Selected Field');
const copySelectedField = createAction('[Record Designer] Copy Selected Field');
const checkIfFieldUsedByIndexes = createAction('[Record Designer] Check If Field Used By Indexes');
const deleteSelectedFieldSuccess = createAction('[Record Designer] Delete Selected Field Success');
const deleteSelectedFieldError = createAction('[Record Designer] Delete Selected Field Error');
const saveDefinition = createAction('[Record Designer] Save Definition');
const saveDefinitionSuccess = createAction('[Record Designer] Save Definition Success', props());
const destroy = createAction('[Record Designer] Destroy');

const RX_RECORD_DESIGNER = {
    featureSelector: 'recordDesigner',
    joinCriteriaPath: 'joinCriteria',
    archiveDataCriteriaPath: 'archiveDataCriteria',
    archiving: {
        types: {
            doNotArchive: {
                nameKey: 'com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.types.do-not-archive.label',
                id: ArchiveType.None
            },
            archiveAndDeleteSourceRecord: {
                nameKey: 'com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.types.archive-and-delete-source-record.label',
                id: ArchiveType.CopyToArchiveAndDeleteFromSource
            },
            deleteSourceRecord: {
                nameKey: 'com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.types.delete-source-record.label',
                id: ArchiveType.DeleteFromSource
            }
        }
    }
};

const recordDesignerStateSelector = createFeatureSelector(RX_RECORD_DESIGNER.featureSelector);
const recordDesignerModelSelector = createSelector(recordDesignerStateSelector, (recordDesignerState) => recordDesignerState.model);
const definitionNameSelector = createSelector(recordDesignerModelSelector, (recordDesignerModel) => recordDesignerModel.definitionName);
const bundleIdSelector = createSelector(recordDesignerModelSelector, (recordDesignerModel) => recordDesignerModel.bundleId);
const isDesignModeSelector = createSelector(recordDesignerModelSelector, (recordDesignerModel) => recordDesignerModel.isDesignMode);
const isDirtySelector = createSelector(recordDesignerModelSelector, (recordDesignerModel) => recordDesignerModel.isDirty);
const inspectorTabIndexSelector = createSelector(recordDesignerModelSelector, (recordDesignerModel) => recordDesignerModel.inspectorTabIndex);
const definitionModelSelector = createSelector(recordDesignerModelSelector, (recordDesignerModel) => recordDesignerModel.definitionModel);
const definitionModelFromDefinitionSelector = createSelector(recordDesignerModelSelector, (recordDesignerModel) => recordDesignerModel.definitionModelFromDefinition);
const selectedFieldGuidSelector = createSelector(recordDesignerModelSelector, (recordDesignerModel) => recordDesignerModel.selectedFieldGuid);
const savedDefinitionNameSelector = createSelector(recordDesignerModelSelector, (recordDesignerModel) => recordDesignerModel.savedDefinitionName);

class RxRecordDefinitionValidatorService {
    constructor(rxFieldDefinitionService, translateService, rxDefinitionNameService, rxFieldDefinitionManagerService) {
        this.rxFieldDefinitionService = rxFieldDefinitionService;
        this.translateService = translateService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxFieldDefinitionManagerService = rxFieldDefinitionManagerService;
    }
    validate(definitionModel) {
        var _a;
        const duplicateFieldErrorMsg = this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.must-be-unique.message', { propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.field-name.label') });
        const definitionValidationIssues = [];
        const fieldValidationIssueSections = [];
        chain(definitionModel.fields)
            .clone()
            .reverse()
            .forEach((fieldModel, index, fieldModels) => {
            let issues = [];
            if (find(fieldModels, (model) => fieldModel.name === model.name, index + 1)) {
                issues.push({
                    type: ValidationIssueType.Error,
                    description: duplicateFieldErrorMsg,
                    data: {
                        propertyName: 'name',
                        guid: fieldModel.guid
                    }
                });
            }
            if (fieldModel.id && find(fieldModels, (model) => fieldModel.id === model.id, index + 1)) {
                issues.push({
                    type: ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.validation.duplicate-field-id-error.message'),
                    data: {
                        propertyName: 'id',
                        guid: fieldModel.guid
                    }
                });
            }
            if (definitionModel.resourceType === RX_RECORD_DEFINITION.recordDefinitionTypes.regular.recordDefinitionType &&
                !fieldModel.lastUpdateTime &&
                !includes(RX_RECORD_DEFINITION.coreFieldIds, fieldModel.id) &&
                includes(RX_RECORD_DEFINITION.AR_CORE_FIELD_IDS, fieldModel.id)) {
                issues.push({
                    type: ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.validation.invalid-field-id.message', { fieldId: fieldModel.id }),
                    data: {
                        editFieldGroups: true,
                        guid: fieldModel.guid
                    }
                });
            }
            issues = issues.concat(this.rxFieldDefinitionManagerService.validate(fieldModel, definitionModel));
            if (issues.length) {
                fieldValidationIssueSections.push({
                    title: fieldModel.name,
                    issues: issues
                });
            }
        })
            .value();
        if (isEmpty(trim(definitionModel.name))) {
            definitionValidationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.record-name.label')
                }),
                data: {
                    propertyName: 'name'
                }
            });
        }
        if (!RX_RECORD_DEFINITION.validDefinitionNameRegex.test(definitionModel.name)) {
            definitionValidationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.invalid-definition-name.message', { propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.record-definition.label') }),
                data: {
                    propertyName: 'name'
                }
            });
        }
        if (definitionModel === null || definitionModel === void 0 ? void 0 : definitionModel.isAuditingEnabled) {
            const auditRecordDefinitionName = this.rxDefinitionNameService.getDisplayName(definitionModel.auditRecordDefinitionName);
            if (isEmpty(trim(auditRecordDefinitionName))) {
                definitionValidationIssues.push({
                    type: ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.validation.invalid-audit-definition-name.message'),
                    data: {
                        propertyName: 'auditRecordDefinitionName'
                    }
                });
            }
            if (!RX_RECORD_DEFINITION.validDefinitionNameRegex.test(auditRecordDefinitionName)) {
                definitionValidationIssues.push({
                    type: ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.invalid-definition-name.message', {
                        propertyName: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.audit-record-definition-name.label')
                    }),
                    data: {
                        propertyName: 'auditRecordDefinitionName'
                    }
                });
            }
        }
        if (definitionModel.isArchivingEnabled &&
            definitionModel.archiveType === RX_RECORD_DESIGNER.archiving.types.archiveAndDeleteSourceRecord.id) {
            const archiveRecordDefinitionName = this.rxDefinitionNameService.getDisplayName(definitionModel.archiveRecordDefinitionName);
            if (isEmpty(trim(archiveRecordDefinitionName))) {
                definitionValidationIssues.push({
                    type: ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.validation.invalid-archive-definition-name.message'),
                    data: {
                        propertyName: 'archiveRecordDefinitionName'
                    }
                });
            }
            if (!RX_RECORD_DEFINITION.validDefinitionNameRegex.test(archiveRecordDefinitionName)) {
                definitionValidationIssues.push({
                    type: ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.invalid-definition-name.message', {
                        propertyName: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.archive-record-definition-name.label')
                    }),
                    data: {
                        propertyName: 'archiveRecordDefinitionName'
                    }
                });
            }
        }
        if (definitionModel.weightedRelevancyFields) {
            const searchTitleField = find(definitionModel.fields, { id: (_a = definitionModel.weightedRelevancyFields) === null || _a === void 0 ? void 0 : _a.TITLE });
            if (searchTitleField && !searchTitleField.searchDefinition) {
                definitionValidationIssues.push({
                    type: ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.validation.invalid-text-search-enabled-field.message'),
                    data: {
                        propertyName: 'searchTitleField'
                    }
                });
            }
        }
        forEach(definitionModel.indexDefinitions, (indexDefinitionModel, index) => {
            if (!indexDefinitionModel.indexFieldIds.length) {
                definitionValidationIssues.push({
                    type: ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.indexes.no-field-selected.message', {
                        indexName: indexDefinitionModel.indexName ||
                            this.translateService.instant('com.bmc.arsys.rx.client.record-designer.indexes.new-index.label')
                    }),
                    data: {
                        indexToEditIndex: index,
                        propertyName: 'indexDefinitions'
                    }
                });
            }
        });
        let issues = [];
        if (definitionValidationIssues.length) {
            issues.push({
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.record-definition.label'),
                issues: definitionValidationIssues
            });
        }
        issues = issues.concat(reverse(fieldValidationIssueSections));
        return issues;
    }
}
RxRecordDefinitionValidatorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDefinitionValidatorService, deps: [{ token: i3$1.RxFieldDefinitionService }, { token: i2.TranslateService }, { token: i2$1.RxDefinitionNameService }, { token: RxFieldDefinitionManagerService }], target: i0.ɵɵFactoryTarget.Injectable });
RxRecordDefinitionValidatorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDefinitionValidatorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDefinitionValidatorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i3$1.RxFieldDefinitionService }, { type: i2.TranslateService }, { type: i2$1.RxDefinitionNameService }, { type: RxFieldDefinitionManagerService }]; } });

class ArchiveAssociationSelectorComponent extends RxModalClass {
    constructor(activeModalRef, translateService, injector) {
        super(activeModalRef, injector);
        this.activeModalRef = activeModalRef;
        this.translateService = translateService;
        this.injector = injector;
        this.isOverlayMode = this.activeModalRef.getData().isOverlayMode;
        this.isReadOnly = this.activeModalRef.getData().isReadOnly;
        this.actualAssociationsToFollow = this.activeModalRef.getData().actualAssociationsToFollow;
        this.selectedAssociationsToFollow = this.activeModalRef.getData().selectedAssociationsToFollow;
        this.associationType = this.selectedAssociationsToFollow.selectionType;
        this.associationTypes = {
            followParent: AssociationSelectionType.FollowParent,
            selected: AssociationSelectionType.Selected,
            allEnforced: AssociationSelectionType.AllEnforced,
            all: AssociationSelectionType.All
        };
        this.columns = [];
        this.associationGridRows = this.activeModalRef.getData().associationDefinitions.map((association) => ({
            name: association.name,
            firstRecord: association.nodeAId,
            secondRecord: association.nodeBId,
            enforced: association.nodeAModality === RX_ASSOCIATION_DEFINITION.modality.required,
            isSelectionDisabled: this.isReadOnly,
            isAssociationSelectedInBase: this.isOverlayMode && this.actualAssociationsToFollow.specificAssociationNames.includes(association.name)
        }));
        this.selectedAssociationGridRows = [];
    }
    ngOnInit() {
        super.ngOnInit();
        this.columns = [
            {
                field: 'name',
                header: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label'),
                cellTemplate: this.nameCellTemplate
            },
            {
                field: 'firstRecord',
                header: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.association-first-record.label'),
                cellTemplate: this.nameCellTemplate
            },
            {
                field: 'secondRecord',
                header: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.association-second-record.label'),
                cellTemplate: this.nameCellTemplate
            },
            {
                field: 'enforced',
                header: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.enforced-association.label'),
                cellTemplate: this.enforceCellTemplate
            }
        ];
        this.selectAssociations();
        this.selectedAssociationGridRows = this.selectedAssociationGridRows.concat(this.associationGridRows.filter((associationGridRow) => includes(this.selectedAssociationsToFollow.specificAssociationNames, associationGridRow.name)));
    }
    cancel() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
    onSelectionChange(selectedRows) {
        this.markAsDirty();
        this.selectedAssociationGridRows = selectedRows;
    }
    disabledRowSelectionResolver(rowData) {
        return rowData.isSelectionDisabled || rowData.isAssociationSelectedInBase;
    }
    selectAssociations() {
        this.selectedAssociationGridRows = [];
        if (this.associationType === AssociationSelectionType.Selected) {
            this.enableRowSelection();
        }
        else if (this.associationType === AssociationSelectionType.All) {
            this.selectedAssociationGridRows = [...this.associationGridRows];
            this.disableRowSelection();
        }
        else if (this.associationType === AssociationSelectionType.AllEnforced) {
            this.selectedAssociationGridRows = this.associationGridRows.filter((row) => row.enforced);
            this.disableRowSelectionForEnforcedAssociations();
        }
        else if (this.associationType === AssociationSelectionType.FollowParent) {
            this.disableRowSelection();
        }
        if (this.isOverlayMode &&
            (this.actualAssociationsToFollow.selectionType === AssociationSelectionType.AllEnforced ||
                this.actualAssociationsToFollow.selectionType === AssociationSelectionType.Selected)) {
            this.selectAssociationsFromBase();
        }
    }
    selectAssociationsFromBase() {
        this.selectedAssociationGridRows = this.selectedAssociationGridRows.concat(this.associationGridRows.filter((associationGridRow) => includes(this.actualAssociationsToFollow.specificAssociationNames, associationGridRow.name)));
    }
    disableRowSelectionForEnforcedAssociations() {
        this.associationGridRows.forEach((row) => {
            row.isSelectionDisabled = this.isReadOnly || row.enforced;
        });
    }
    disableRowSelection() {
        this.associationGridRows.forEach((row) => {
            row.isSelectionDisabled = true;
        });
    }
    enableRowSelection() {
        this.associationGridRows.forEach((row) => {
            row.isSelectionDisabled = this.isReadOnly;
        });
    }
    save() {
        let selectedAssociationNames = [];
        if (this.associationType === AssociationSelectionType.Selected) {
            selectedAssociationNames = map$1(this.selectedAssociationGridRows, 'name');
        }
        else if (this.associationType === AssociationSelectionType.AllEnforced) {
            selectedAssociationNames = this.selectedAssociationGridRows
                .filter((associationGridRow) => !associationGridRow.enforced)
                .map((associationGridRow) => associationGridRow.name);
        }
        this.activeModalRef.close({
            specificAssociationNames: selectedAssociationNames,
            selectionType: this.associationType
        });
    }
}
ArchiveAssociationSelectorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ArchiveAssociationSelectorComponent, deps: [{ token: i3.ActiveModalRef }, { token: i2.TranslateService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
ArchiveAssociationSelectorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ArchiveAssociationSelectorComponent, selector: "rx-archive-associations-editor", viewQueries: [{ propertyName: "nameCellTemplate", first: true, predicate: ["nameCellTemplate"], descendants: true, static: true }, { propertyName: "enforceCellTemplate", first: true, predicate: ["enforceCellTemplate"], descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: "<div class=\"modal-body designer-modal-body d-flex mh-100 flex-column\">\n  <span>\n    {{\n      'com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.select-associations-to-follow.message'\n        | translate\n    }}\n  </span>\n\n  <adapt-rx-radiobutton-group [(ngModel)]=\"associationType\" (ngModelChange)=\"markAsDirty(); selectAssociations()\">\n    <adapt-rx-radiobutton\n      class=\"radio-inline\"\n      label=\"{{\n        'com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.selected-associations.label'\n          | translate\n      }}\"\n      [value]=\"associationTypes.selected\"\n      [disabled]=\"\n        isReadOnly ||\n        (isOverlayMode &&\n          (actualAssociationsToFollow.selectionType === associationTypes.all ||\n            actualAssociationsToFollow.selectionType === associationTypes.allEnforced ||\n            actualAssociationsToFollow.selectionType === associationTypes.followParent))\n      \"\n      rx-id=\"selected-associations\"\n    ></adapt-rx-radiobutton>\n\n    <adapt-rx-radiobutton\n      class=\"radio-inline\"\n      label=\"{{ 'com.bmc.arsys.rx.client.common.all.label' | translate }}\"\n      [value]=\"associationTypes.all\"\n      [disabled]=\"\n        isReadOnly ||\n        (isOverlayMode &&\n          (actualAssociationsToFollow.selectionType === associationTypes.all ||\n            actualAssociationsToFollow.selectionType === associationTypes.followParent))\n      \"\n      rx-id=\"all-associations\"\n    ></adapt-rx-radiobutton>\n\n    <adapt-rx-radiobutton\n      class=\"radio-inline\"\n      label=\"{{\n        'com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.all-enforced-associations.label'\n          | translate\n      }}\"\n      [value]=\"associationTypes.allEnforced\"\n      [disabled]=\"\n        isReadOnly ||\n        (isOverlayMode &&\n          (actualAssociationsToFollow.selectionType === associationTypes.all ||\n            actualAssociationsToFollow.selectionType === associationTypes.followParent))\n      \"\n      rx-id=\"all-enforced-associations\"\n    ></adapt-rx-radiobutton>\n\n    <adapt-rx-radiobutton\n      class=\"radio-inline\"\n      label=\"{{\n        'com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.follow-parent-associations.label'\n          | translate\n      }}\"\n      [value]=\"associationTypes.followParent\"\n      [disabled]=\"\n        isReadOnly ||\n        (isOverlayMode &&\n          (actualAssociationsToFollow.selectionType === associationTypes.selected ||\n            actualAssociationsToFollow.selectionType === associationTypes.all ||\n            actualAssociationsToFollow.selectionType === associationTypes.allEnforced ||\n            actualAssociationsToFollow.selectionType === associationTypes.followParent))\n      \"\n      rx-id=\"follow-parent-association\"\n    ></adapt-rx-radiobutton>\n  </adapt-rx-radiobutton-group>\n\n  <adapt-table\n    [value]=\"associationGridRows\"\n    [selection]=\"selectedAssociationGridRows\"\n    [columns]=\"columns\"\n    [scrollable]=\"true\"\n    scrollHeight=\"flex\"\n    [sortable]=\"true\"\n    [resizableColumns]=\"false\"\n    [bordered]=\"true\"\n    [filterable]=\"false\"\n    [dataKey]=\"'name'\"\n    [disableRowSelection]=\"false\"\n    [selectionMode]=\"'multiple'\"\n    (selectionChange)=\"onSelectionChange($event)\"\n    [disabledRowSelectionResolver]=\"disabledRowSelectionResolver\"\n  >\n  </adapt-table>\n</div>\n\n<div class=\"modal-footer\">\n  <button type=\"button\" adapt-button btn-type=\"primary\" (click)=\"save()\" rx-id=\"save-button\" [disabled]=\"!isDirty()\">\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button type=\"button\" adapt-button btn-type=\"secondary\" (click)=\"cancel()\" rx-id=\"cancel-button\">\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n\n<ng-template #nameCellTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n  {{ dataItem[column.field] | rxDefinitionNamePipe }}\n</ng-template>\n\n<ng-template #enforceCellTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n  <span *ngIf=\"dataItem[column.field]\">{{ 'com.bmc.arsys.rx.client.common.yes.label' | translate }}</span>\n  <span *ngIf=\"!dataItem[column.field]\">{{ 'com.bmc.arsys.rx.client.common.no.label' | translate }}</span>\n</ng-template>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.designer-modal-body{height:645px;min-height:calc(100% - 61px)!important}.designer-modal-accordion-wrapper{display:flex;flex-direction:column;height:100%;overflow:auto;padding-top:10px}.designer-modal-accordion-content{position:relative}.designer-modal-accordion-content.cdk-drag-preview{z-index:1200!important}.designer-modal-drag-handle{cursor:move;position:absolute;top:0;left:0;height:46px;padding:14px 10px 14px 14px;z-index:1}.designer-modal-card-title-content{width:100%;display:flex}.designer-modal-card-title-content .left-header-block,.designer-modal-card-title-content .right-header-block{display:flex;align-items:center}.designer-modal-card-title-content .left-header-block{flex-grow:1;min-width:0;font-size:14px;padding-left:22px}.designer-modal-card-sub-title{color:#7c7f81;font-weight:normal}.designer-modal-card-title-index-buttons{display:flex;font-size:19px}.rx-card{overflow:auto}.rx-tree-draggable-node{cursor:pointer}.rx-tree-draggable-node.cdk-drag-preview{z-index:1200!important}.rx-tree-draggable-node.cdk-drag{opacity:1}.rx-tree-node-label{word-break:break-all}rx-form-builder{max-width:400px}\n"], components: [{ type: i3.AdaptRxRadiobuttonGroupComponent, selector: "adapt-rx-radiobutton-group", inputs: ["formControlName"] }, { type: i3.AdaptRxRadiobuttonComponent, selector: "adapt-rx-radiobutton", inputs: ["name", "label", "id", "value", "checked", "disabled", "ariaLabel", "ariaLabeledBy", "ariaDescribedBy", "testID", "tabIndex"], outputs: ["onFocus", "onBlur", "checkedChange"] }, { type: i4.AdaptTableComponent, selector: "adapt-table", inputs: ["sortable", "filterable", "triggerableFilters", "explicitSearchBtn", "enableReorderableRows", "suppressTooltip", "toolbarConfig", "dataColumnsColsTemplate", "dataColumnsHeaderTemplate", "dataColumnsDataCellsTemplate", "headerGroupsTemplate", "alwaysShowHeaderTooltip", "alwaysShowCellTooltip", "expandedCellClass", "expandedGroupsKeys", "nestedGroupPadding", "expandindCellInitialPadding", "groupValueDataCellTemplate", "tooltipInitialDelayMs", "tooltipClass", "rowsCustomClass", "paginatorAlign", "hasEmptyState", "enableInfiniteScrolling", "updateFirstColumnWidth", "busyConfig", "defaultFiltersMatchMode", "wrapCellText", "minBufferPx", "maxBufferPx", "testID", "headerSelectionMode", "disabledSelectedRowsCount", "disabledNotSelectedRowsCount", "disabledSelectedFilteredRowsCount", "disabledNotSelectedFilteredRowsCount", "selectedFilteredRowsCount", "totalRecordsInGroup", "disableRowSelection", "nestingStructureData", "nestingKey", "enableRowEditing", "autoScrollToTop", "paginationTexts", "toolbarTexts", "tableTexts", "filtersTexts", "headerCellMenuTexts", "texts", "loadingMore", "mergeColumns", "disabledRowSelectionResolver", "allowColumnReorderingResolver", "disableRowExpandingResolver", "rowAriaDataResolver", "tableWidthConfig", "expandedRowTemplate", "isRefreshingRowData", "value", "bordered", "paginator", "striped", "loading"], outputs: ["onLazyLoad", "rowDataRefresh", "savedRowEditing", "canceledRowEditing", "groupSelection", "allGroupedRowsSelection", "groupExpansion", "columnsVisibilityChange", "rowDragStart", "rowDragRelease", "rowDragEnd", "rowDragDrop", "export", "toolbarPopupAnimationDone"] }, { type: i3.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i2.TranslatePipe, "rxDefinitionNamePipe": i2$1.RxDefinitionNamePipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ArchiveAssociationSelectorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-archive-associations-editor',
                    templateUrl: './archive-association-selector.component.html',
                    styleUrls: ['./archive-association-selector.component.scss'],
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i3.ActiveModalRef }, { type: i2.TranslateService }, { type: i0.Injector }]; }, propDecorators: { nameCellTemplate: [{
                type: ViewChild,
                args: ['nameCellTemplate', { static: true }]
            }], enforceCellTemplate: [{
                type: ViewChild,
                args: ['enforceCellTemplate', { static: true }]
            }] } });

class MissingArchiveDefinitionsModalComponent extends RxModalClass {
    constructor(activeModalRef, injector) {
        super(activeModalRef, injector);
        this.activeModalRef = activeModalRef;
        this.injector = injector;
        this.missingAssociations = this.activeModalRef.getData().missingAssociations;
    }
    ngOnInit() {
        super.ngOnInit();
    }
    close() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
}
MissingArchiveDefinitionsModalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: MissingArchiveDefinitionsModalComponent, deps: [{ token: i3.ActiveModalRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
MissingArchiveDefinitionsModalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: MissingArchiveDefinitionsModalComponent, selector: "rx-missing-archive-definitions-modal-selector", usesInheritance: true, ngImport: i0, template: "<div class=\"modal-body pt-0\">\n  <div class=\"row\">\n    <div class=\"col-sm\">\n      <h6 class=\"font-weight-bold\">\n        {{\n          'com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.association-name.label' | translate\n        }}\n      </h6>\n    </div>\n    <div class=\"col-sm\">\n      <h6 class=\"font-weight-bold\">\n        {{ 'com.bmc.arsys.rx.client.common.record-definition-name.label' | translate }}\n      </h6>\n    </div>\n  </div>\n\n  <div class=\"row mb-2\" *ngFor=\"let association of missingAssociations\">\n    <div class=\"col-sm\">{{ association.name | rxDefinitionNamePipe }}</div>\n    <div class=\"col-sm\">\n      <a target=\"_blank\" class=\"d-icon-left-pop_up\" [href]=\"association.url\">\n        {{ association.secondRecord | rxDefinitionNamePipe }}\n      </a>\n    </div>\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <button type=\"button\" adapt-button btn-type=\"secondary\" (click)=\"close()\" rx-id=\"close-button\">\n    {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n  </button>\n</div>\n", components: [{ type: i3.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "translate": i2.TranslatePipe, "rxDefinitionNamePipe": i2$1.RxDefinitionNamePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: MissingArchiveDefinitionsModalComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-missing-archive-definitions-modal-selector',
                    templateUrl: './missing-archive-definitions-modal.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i3.ActiveModalRef }, { type: i0.Injector }]; } });

class ArchiveAssociationsControlComponent extends ValueAccessor {
    constructor(rxModalService, translateService, rxRecordDefinitionCacheService, rxNotificationService) {
        super();
        this.rxModalService = rxModalService;
        this.translateService = translateService;
        this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
        this.rxNotificationService = rxNotificationService;
        this.associationLabels = {
            [AssociationSelectionType.Selected]: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.selected-associations.label'),
            [AssociationSelectionType.All]: this.translateService.instant('com.bmc.arsys.rx.client.common.all.label'),
            [AssociationSelectionType.AllEnforced]: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.all-enforced-associations.label'),
            [AssociationSelectionType.FollowParent]: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.follow-parent-associations.label')
        };
        this.recordDefinitionNameSubject = new BehaviorSubject(null);
        this.associationToFollowSubject = new BehaviorSubject({
            specificAssociationNames: [],
            selectionType: AssociationSelectionType.FollowParent
        });
        this.associationDefinitions$ = this.recordDefinitionNameSubject.pipe(switchMap((recordDefinitionName) => recordDefinitionName
            ? this.rxRecordDefinitionCacheService.getRecordAssociationDefinitions(recordDefinitionName).pipe(map((recordAssociationDefinitions) => reject(recordAssociationDefinitions[recordDefinitionName], {
                cardinality: RX_ASSOCIATION_DEFINITION.cardinality.manyToMany
            }).filter((association) => association.nodeAId === recordDefinitionName)))
            : of([])), shareReplay(1));
        this.validAssociations$ = this.associationDefinitions$.pipe(map((associationDefinitions) => {
            const selectedAssociationType = this.value.selectionType;
            const selectedAssociations = associationDefinitions.filter((association) => includes(this.value.specificAssociationNames, association.name));
            let validAssociations = [];
            if (selectedAssociationType === AssociationSelectionType.Selected) {
                validAssociations = selectedAssociations;
            }
            else if (selectedAssociationType === AssociationSelectionType.All) {
                validAssociations = associationDefinitions;
            }
            else if (selectedAssociationType === AssociationSelectionType.AllEnforced) {
                validAssociations = associationDefinitions
                    .filter((association) => association.nodeAModality === RX_ASSOCIATION_DEFINITION.modality.required)
                    .concat(selectedAssociations);
            }
            return validAssociations;
        }));
        this.missingAssociations$ = this.validAssociations$.pipe(switchMap((associations) => forkJoin(associations.map((association) => this.rxRecordDefinitionCacheService.getRecordDefinition(association.nodeBId).pipe(filter((definition) => { var _a; return !((_a = definition.archiveDescriptor) === null || _a === void 0 ? void 0 : _a.isEnabled); }), map(() => ({
            name: association.name,
            secondRecord: association.nodeBId,
            url: `${window.location.origin}/helix/index.html#/${RX_APPLICATION.innovationStudioBundleId}/record/edit2/${association.nodeBId}`
        }))))).pipe(defaultIfEmpty([]))));
        this.associationLabel$ = combineLatest([
            this.associationToFollowSubject,
            this.associationDefinitions$
        ]).pipe(map(([associationToFollow, associationDefinitions]) => {
            let selectedAssociationLabel;
            if (associationToFollow.selectionType === AssociationSelectionType.AllEnforced) {
                const selectedAssociations = filter$1(associationDefinitions, (association) => includes(associationToFollow.specificAssociationNames, association.name));
                if (some(selectedAssociations, (association) => association.nodeAModality !== RX_ASSOCIATION_DEFINITION.modality.required)) {
                    selectedAssociationLabel = `${this.associationLabels[AssociationSelectionType.AllEnforced]} + ${this.associationLabels[AssociationSelectionType.Selected]}`;
                }
                else {
                    selectedAssociationLabel = this.associationLabels[AssociationSelectionType.AllEnforced];
                }
            }
            else {
                selectedAssociationLabel = this.associationLabels[associationToFollow.selectionType];
            }
            return selectedAssociationLabel;
        }));
    }
    ngOnChanges(changes) {
        var _a, _b;
        const prevDefinitionName = changes.options.previousValue.definitionModel.lastUpdateTime
            ? `${changes.options.previousValue.bundleId}:${changes.options.previousValue.definitionModel.name}`
            : (_a = changes.options.previousValue.definitionModel.recordInheritanceSelector.inheritanceDescriptor) === null || _a === void 0 ? void 0 : _a.inheritingFrom;
        const currentDefinitionName = changes.options.currentValue.definitionModel.lastUpdateTime
            ? `${changes.options.currentValue.bundleId}:${changes.options.currentValue.definitionModel.name}`
            : (_b = changes.options.currentValue.definitionModel.recordInheritanceSelector.inheritanceDescriptor) === null || _b === void 0 ? void 0 : _b.inheritingFrom;
        if (currentDefinitionName !== prevDefinitionName) {
            this.recordDefinitionNameSubject.next(currentDefinitionName);
        }
        if (!currentDefinitionName) {
            this.value = {
                specificAssociationNames: [],
                selectionType: AssociationSelectionType.FollowParent
            };
            this.associationToFollowSubject.next(this.value);
        }
    }
    ngOnInit() {
        var _a;
        const definitionName = this.options.definitionModel.lastUpdateTime
            ? `${this.options.bundleId}:${this.options.definitionModel.name}`
            : (_a = this.options.definitionModel.recordInheritanceSelector.inheritanceDescriptor) === null || _a === void 0 ? void 0 : _a.inheritingFrom;
        this.recordDefinitionNameSubject.next(definitionName);
        this.associationToFollowSubject.next(this.value);
    }
    openAssociationSelector() {
        this.associationDefinitions$.pipe(take(1)).subscribe((associationDefinitions) => {
            this.rxModalService
                .openModal({
                title: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.associations-to-follow.label'),
                data: {
                    associationDefinitions,
                    selectedAssociationsToFollow: this.value,
                    actualAssociationsToFollow: this.options.definitionModelFromDefinition.associationsToFollowForArchive,
                    isOverlayMode: this.options.isOverlayMode,
                    isReadOnly: this.options.isReadOnly
                },
                content: ArchiveAssociationSelectorComponent
            })
                .then((result) => {
                this.value = result;
                this.associationToFollowSubject.next(this.value);
            })
                .catch(noop);
        });
    }
    openMissingDefinitionsModal() {
        this.missingAssociations$.pipe(take(1)).subscribe((missingAssociations) => {
            if (missingAssociations.length) {
                this.rxModalService
                    .openModal({
                    title: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.missing-archive-definitions.label'),
                    data: {
                        missingAssociations
                    },
                    size: 'sm',
                    content: MissingArchiveDefinitionsModalComponent
                })
                    .catch(noop);
            }
            else {
                this.rxNotificationService.addInfoMessage(this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.no-missing-archive-definitions.message'));
            }
        });
    }
}
ArchiveAssociationsControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ArchiveAssociationsControlComponent, deps: [{ token: i1.RxModalService }, { token: i2.TranslateService }, { token: i3$1.RxRecordDefinitionCacheService }, { token: i2$1.RxNotificationService }], target: i0.ɵɵFactoryTarget.Component });
ArchiveAssociationsControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ArchiveAssociationsControlComponent, selector: "rx-archive-associations", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: ArchiveAssociationsControlComponent,
            multi: true
        }
    ], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<div class=\"d-inline-flex align-items-center mb-1\">\n  <button\n    class=\"d-icon-plus_circle p-0\"\n    adapt-button\n    type=\"button\"\n    btn-type=\"tertiary\"\n    rx-id=\"associations-to-follow-button\"\n    (click)=\"openAssociationSelector()\"\n  >\n    {{\n      'com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.associations-to-follow.label' | translate\n    }}\n  </button>\n\n  <adapt-icon\n    name=\"question_circle_o\"\n    class=\"ml-2\"\n    placement=\"right\"\n    [adaptPopover]=\"\n      'com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.associations-to-follow.tooltip'\n        | translate\n    \"\n  >\n  </adapt-icon>\n</div>\n\n<div class=\"border pl-2 p-1 form-group\">\n  <span class=\"d-icon-left-arrow_schema font-weight-bold\">\n    {{ associationLabel$ | async }}\n  </span>\n</div>\n\n<div class=\"d-inline-flex align-items-center\">\n  <adapt-icon name=\"exclamation_triangle\" class=\"text-warning-icon\"> </adapt-icon>\n\n  <adapt-button\n    btn-type=\"tertiary\"\n    rx-id=\"open-missing-definitions-button\"\n    (click)=\"openMissingDefinitionsModal()\"\n    class=\"p-0 pl-1\"\n  >\n    {{\n      'com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.missing-archive-definitions.label'\n        | translate\n    }}\n  </adapt-button>\n</div>\n", components: [{ type: i3.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i3.AdaptIconComponent, selector: "adapt-icon", inputs: ["name", "classList", "description", "testID"] }], directives: [{ type: i3.AdaptPopoverDirective, selector: "[adaptPopover]", inputs: ["adaptPopover", "popoverTitle", "placement", "fallbackPlacement", "triggers", "container", "appendToBody", "closeBtn", "popupDelay", "disablePopover", "popoverClass", "autoClose", "closeOnOutOfView", "maxWidth", "minWidth"], outputs: ["shown", "hidden"], exportAs: ["adaptPopover"] }], pipes: { "translate": i2.TranslatePipe, "async": i5.AsyncPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ArchiveAssociationsControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-archive-associations',
                    templateUrl: './archive-associations-control.component.html',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: ArchiveAssociationsControlComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxModalService }, { type: i2.TranslateService }, { type: i3$1.RxRecordDefinitionCacheService }, { type: i2$1.RxNotificationService }]; }, propDecorators: { options: [{
                type: Input
            }] } });

class RecordIndexesEditorStore extends ComponentStore {
    constructor(rxGuidService) {
        super({ indexes: [], isDirty: false });
        this.rxGuidService = rxGuidService;
        this.isDirty$ = this.select((state) => state.isDirty);
        this.indexes$ = this.select((state) => state.indexes);
        this.addIndex = this.updater((state, index) => (Object.assign(Object.assign({}, state), { indexes: [...state.indexes, index], isDirty: true })));
        this.updateIndex = this.updater((state, indexToUpdate) => (Object.assign(Object.assign({}, state), { indexes: state.indexes.map((index) => (index.guid === indexToUpdate.guid ? Object.assign({}, indexToUpdate) : index)), isDirty: true })));
        this.removeIndex = this.updater((state, guid) => (Object.assign(Object.assign({}, state), { indexes: state.indexes.filter((field) => field.guid !== guid), isDirty: true })));
        this.checkAvailableFields = this.updater((state, payload) => (Object.assign(Object.assign({}, state), { indexes: state.indexes.map((index) => index.guid === payload.indexGuid
                ? Object.assign(Object.assign({}, index), { checkedAvailableFields: [...payload.checkedFields] }) : index) })));
        this.toggleSelectedFieldChecked = this.updater((state, payload) => (Object.assign(Object.assign({}, state), { indexes: state.indexes.map((index) => {
                if (index.guid === payload.indexGuid) {
                    const selectedFields = index.selectedFields.map((field) => field.id === payload.indexField.id ? Object.assign({}, field) : field);
                    return Object.assign(Object.assign({}, index), { selectedFields, isMoveToAvailableButtonEnabled: some(selectedFields, 'selected') });
                }
                else {
                    return index;
                }
            }) })));
        this.assignCheckedFields = this.updater((state, indexToAssign) => {
            return Object.assign(Object.assign({}, state), { indexes: state.indexes.map((index) => index.guid === indexToAssign.guid
                    ? Object.assign(Object.assign({}, index), { selectedFields: [...index.selectedFields, ...index.checkedAvailableFields].map((field, itemIndex) => (Object.assign(Object.assign({}, field), { selected: false, fieldOrder: itemIndex++ }))), availableFields: [
                            ...index.availableFields.filter((field) => !some(index.checkedAvailableFields, { id: field.id }))
                        ], checkedAvailableFields: [] }) : index), isDirty: true });
        });
        this.unassignCheckedFields = this.updater((state, indexToAssign) => {
            return Object.assign(Object.assign({}, state), { indexes: state.indexes.map((index) => index.guid === indexToAssign.guid
                    ? Object.assign(Object.assign({}, index), { selectedFields: index.selectedFields.filter((field) => !field.selected), availableFields: [...index.availableFields, ...index.selectedFields.filter((field) => field.selected)]
                            .map((field) => (Object.assign(Object.assign({}, field), { fieldOrder: null })))
                            .sort((a, b) => a.name.localeCompare(b.name)), isMoveToAvailableButtonEnabled: false }) : index), isDirty: true });
        });
        this.sortSelectedFields = this.updater((state, payload) => (Object.assign(Object.assign({}, state), { indexes: state.indexes.map((index) => index.guid === payload.indexGuid
                ? Object.assign(Object.assign({}, index), { selectedFields: [
                        ...payload.fields.map((field, itemIndex) => (Object.assign(Object.assign({}, field), { fieldOrder: itemIndex })))
                    ] }) : index) })));
        this.removeField = this.updater((state, payload) => (Object.assign(Object.assign({}, state), { indexes: state.indexes.map((index) => index.guid === payload.indexGuid
                ? Object.assign(Object.assign({}, index), { selectedFields: index.selectedFields.filter((field) => field.id !== payload.field.id), availableFields: [...index.availableFields, payload.field].sort((a, b) => a.name.localeCompare(b.name)) }) : index), isDirty: true })));
        this.expandAll = this.updater((state) => (Object.assign(Object.assign({}, state), { indexes: state.indexes.map((field) => (Object.assign(Object.assign({}, field), { isOpen: true }))) })));
        this.collapseAll = this.updater((state) => (Object.assign(Object.assign({}, state), { indexes: state.indexes.map((field) => (Object.assign(Object.assign({}, field), { isOpen: false }))) })));
        this.markDirty = this.updater((state) => (Object.assign(Object.assign({}, state), { isDirty: true })));
        this.vm$ = this.select(this.indexes$, this.isDirty$, (indexes, isDirty) => ({
            indexes,
            isDirty
        }));
    }
    initialize(indexesEditorOptions) {
        this.patchState({
            isDirty: false,
            indexes: indexesEditorOptions.indexes.map((index, itemIndex) => (Object.assign(Object.assign({}, index), { availableFields: reject(indexesEditorOptions.fields, (field) => field.isNewField || index.indexFieldIds.includes(field.id))
                    .map((field) => ({ id: field.id, name: field.name, fieldOrder: null }))
                    .sort((a, b) => a.name.localeCompare(b.name)), checkedAvailableFields: [], selectedFields: indexesEditorOptions.fields
                    .filter((field) => !field.isNewField && index.indexFieldIds.includes(field.id))
                    .sort((a, b) => index.indexFieldIds.indexOf(a.id) - index.indexFieldIds.indexOf(b.id))
                    .map((field, index) => ({ id: field.id, name: field.name, fieldOrder: index })), guid: this.rxGuidService.generate(), isOpen: (indexesEditorOptions === null || indexesEditorOptions === void 0 ? void 0 : indexesEditorOptions.indexToEditIndex) === itemIndex, isMoveToAvailableButtonEnabled: false })))
        });
    }
}
RecordIndexesEditorStore.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordIndexesEditorStore, deps: [{ token: i1$1.RxGuidService }], target: i0.ɵɵFactoryTarget.Injectable });
RecordIndexesEditorStore.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordIndexesEditorStore });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordIndexesEditorStore, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$1.RxGuidService }]; } });

class RecordIndexesEditorComponent extends RxModalClass {
    constructor(recordIndexesEditorStore, rxGuidService, activeModalRef, injector) {
        super(activeModalRef, injector);
        this.recordIndexesEditorStore = recordIndexesEditorStore;
        this.rxGuidService = rxGuidService;
        this.activeModalRef = activeModalRef;
        this.injector = injector;
        this.isReadOnly = this.activeModalRef.getData().isReadOnly;
        this.indexesEditorOptions = this.activeModalRef.getData();
        this.vm$ = this.recordIndexesEditorStore.vm$;
    }
    ngOnInit() {
        super.ngOnInit();
        this.recordIndexesEditorStore.isDirty$.pipe(filter(Boolean), take(1)).subscribe(() => {
            this.markAsDirty();
        });
        this.recordIndexesEditorStore.initialize(this.indexesEditorOptions);
    }
    ngAfterViewInit() {
        var _a;
        (_a = this.accordionTabEls.get(this.indexesEditorOptions.indexToEditIndex)) === null || _a === void 0 ? void 0 : _a.nativeElement.scrollIntoView({
            block: 'nearest'
        });
    }
    cancel() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
    addIndex() {
        this.recordIndexesEditorStore.addIndex({
            guid: this.rxGuidService.generate(),
            indexName: null,
            unique: false,
            ignoreBlankValues: false,
            indexFieldIds: [],
            availableFields: this.indexesEditorOptions.fields
                .filter((field) => !field.isNewField)
                .map((field) => (Object.assign(Object.assign({}, field), { fieldOrder: null })))
                .sort((a, b) => a.name.localeCompare(b.name)),
            checkedAvailableFields: [],
            selectedFields: [],
            isOpen: true,
            isAutomaticIndex: false,
            isMoveToAvailableButtonEnabled: false
        });
    }
    updateIndexUniqueValue(index, unique) {
        this.recordIndexesEditorStore.updateIndex(Object.assign(Object.assign({}, index), { unique }));
    }
    updateIndexIgnoreBlankValue(index, ignoreBlankValues) {
        this.recordIndexesEditorStore.updateIndex(Object.assign(Object.assign({}, index), { ignoreBlankValues }));
    }
    removeIndex(guid) {
        this.recordIndexesEditorStore.removeIndex(guid);
    }
    moveToSelected(index) {
        this.recordIndexesEditorStore.assignCheckedFields(index);
    }
    moveToAvailable(index) {
        this.recordIndexesEditorStore.unassignCheckedFields(index);
    }
    onAvailableFieldsChange(checkedFields, index) {
        this.recordIndexesEditorStore.checkAvailableFields({ indexGuid: index.guid, checkedFields });
    }
    onSelectedFieldsChange(fields, index) {
        fields.forEach((field) => {
            this.recordIndexesEditorStore.toggleSelectedFieldChecked({ indexGuid: index.guid, indexField: field });
        });
        this.recordIndexesEditorStore.sortSelectedFields({ indexGuid: index.guid, fields });
    }
    onDragEnd() {
        this.recordIndexesEditorStore.markDirty();
    }
    onFieldRemove(removedField, index) {
        this.recordIndexesEditorStore.removeField({ indexGuid: index.guid, field: removedField });
    }
    save() {
        this.recordIndexesEditorStore.indexes$.pipe(take(1)).subscribe((indexes) => {
            this.activeModalRef.close(indexes.map((index) => ({
                isAutomaticIndex: index.isAutomaticIndex,
                indexName: index.indexName,
                unique: index.unique,
                ignoreBlankValues: index.ignoreBlankValues,
                indexFieldIds: map$1(index.selectedFields, 'id')
            })));
        });
    }
    expandAll() {
        this.recordIndexesEditorStore.expandAll();
    }
    collapseAll() {
        this.recordIndexesEditorStore.collapseAll();
    }
    trackByIndex($index) {
        return $index;
    }
    optionFormatter(field) {
        return field.name;
    }
}
RecordIndexesEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordIndexesEditorComponent, deps: [{ token: RecordIndexesEditorStore }, { token: i1$1.RxGuidService }, { token: i3.ActiveModalRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
RecordIndexesEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RecordIndexesEditorComponent, selector: "rx-record-indexes-editor", providers: [RecordIndexesEditorStore], viewQueries: [{ propertyName: "accordionTabEls", predicate: AdaptAccordionTabComponent, descendants: true, read: ElementRef }], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"vm$ | async as vm\">\n  <div class=\"designer-modal-body modal-body d-flex mh-100 flex-column\">\n    <adapt-alert\n      class=\"flex-shrink-0\"\n      [config]=\"{\n        content: 'com.bmc.arsys.rx.client.record-designer.indexes.information' | translate,\n        variant: 'info',\n        type: 'inline'\n      }\"\n    ></adapt-alert>\n\n    <div class=\"text-right btn-group\">\n      <button\n        type=\"button\"\n        adapt-button\n        btn-type=\"tertiary\"\n        rx-id=\"add-index-button\"\n        class=\"d-icon-left-plus_circle float-left px-0\"\n        (click)=\"addIndex()\"\n        *ngIf=\"!isReadOnly\"\n      >\n        {{ 'com.bmc.arsys.rx.client.record-designer.indexes.add-index.label' | translate }}\n      </button>\n\n      <button\n        type=\"button\"\n        adapt-button\n        btn-type=\"tertiary\"\n        rx-id=\"expand-button\"\n        (click)=\"expandAll()\"\n        class=\"ml-auto\"\n      >\n        {{ 'com.bmc.arsys.rx.client.common.expand-all.label' | translate }}\n      </button>\n\n      <button\n        type=\"button\"\n        adapt-button\n        btn-type=\"tertiary\"\n        rx-id=\"collapse-button\"\n        class=\"pr-0\"\n        (click)=\"collapseAll()\"\n      >\n        {{ 'com.bmc.arsys.rx.client.common.collapse-all.label' | translate }}\n      </button>\n    </div>\n\n    <div class=\"designer-modal-accordion-wrapper\">\n      <adapt-accordion\n        [multiselect]=\"true\"\n        class=\"d-block\"\n        *ngFor=\"let index of vm.indexes; let $index = index; trackBy: trackByIndex\"\n      >\n        <div class=\"designer-modal-accordion-content\">\n          <adapt-accordion-tab\n            class=\"d-block\"\n            [isOpen]=\"index.isOpen\"\n            (open)=\"index.isOpen = true\"\n            (close)=\"index.isOpen = false\"\n          >\n            <div class=\"card-title-text w-100\">\n              <div class=\"designer-modal-card-title-content\">\n                <div class=\"left-header-block pl-0\">\n                  <div class=\"rx-ellipsis\" [title]=\"index.indexName\" rx-id=\"card-title\">\n                    <span *ngIf=\"!index.isAutomaticIndex\">\n                      {{\n                        index.indexName || 'com.bmc.arsys.rx.client.record-designer.indexes.new-index.label' | translate\n                      }}\n                    </span>\n                    <span *ngIf=\"index.isAutomaticIndex\">{{\n                      'com.bmc.arsys.rx.client.record-designer.indexes.automatic-index.label'\n                        | translate: { indexName: index.indexName }\n                    }}</span>\n                  </div>\n                </div>\n\n                <div class=\"right-header-block\">\n                  <button\n                    class=\"d-icon-left-cross_adapt py-0 pr-3 btn btn-sm\"\n                    adapt-button\n                    size=\"small\"\n                    type=\"button\"\n                    (click)=\"$event.stopPropagation(); removeIndex(index.guid)\"\n                    *ngIf=\"!isReadOnly && !index.isAutomaticIndex\"\n                    rx-id=\"remove-index-button\"\n                  >\n                    {{ 'com.bmc.arsys.rx.client.common.remove.label' | translate }}\n                  </button>\n                </div>\n              </div>\n            </div>\n\n            <adapt-rx-checkbox\n              [ngModel]=\"index.unique\"\n              (ngModelChange)=\"updateIndexUniqueValue(index, $event)\"\n              [disabled]=\"isReadOnly || index.isAutomaticIndex\"\n              label=\"{{ 'com.bmc.arsys.rx.client.record-designer.indexes.unique-index-checkbox.label' | translate }}\"\n            >\n            </adapt-rx-checkbox>\n\n            <adapt-rx-checkbox\n              [(ngModel)]=\"index.ignoreBlankValues\"\n              (ngModelChange)=\"updateIndexIgnoreBlankValue(index, $event)\"\n              [disabled]=\"isReadOnly || index.isAutomaticIndex\"\n              label=\"{{ 'com.bmc.arsys.rx.client.record-designer.indexes.ignore-blank-values.label' | translate }}\"\n              [tooltip]=\"{\n                iconName: 'question_circle_o',\n                content: 'com.bmc.arsys.rx.client.record-designer.indexes.ignore-blank-values.tooltip' | translate,\n                placement: 'top',\n                popoverMode: true\n              }\"\n            >\n            </adapt-rx-checkbox>\n\n            <div class=\"d-flex flex-fill\">\n              <adapt-rx-select\n                class=\"flex-grow-1 d-flex flex-column\"\n                popupMaxHeight=\"100%\"\n                [options]=\"index.availableFields\"\n                [ngModel]=\"index.checkedAvailableFields\"\n                [disabled]=\"isReadOnly || index.isAutomaticIndex\"\n                [deselectAllButton]=\"true\"\n                [selectAllButton]=\"true\"\n                [enableFilter]=\"true\"\n                [inline]=\"true\"\n                label=\"{{ 'com.bmc.arsys.rx.client.record-designer.indexes.available-fields.label' | translate }}\"\n                [multiple]=\"true\"\n                [singleSelectStyle]=\"'marker'\"\n                [optionFormatter]=\"optionFormatter\"\n                (ngModelChange)=\"onAvailableFieldsChange($event, index)\"\n                rx-id=\"available-field-list\"\n              ></adapt-rx-select>\n\n              <div class=\"mx-2 d-flex flex-column\">\n                <button\n                  type=\"button\"\n                  adapt-button\n                  class=\"d-icon-right-angle_right mt-auto mb-2\"\n                  btn-type=\"secondary\"\n                  (click)=\"moveToSelected(index)\"\n                  [disabled]=\"!index.checkedAvailableFields.length || index.isAutomaticIndex\"\n                  rx-id=\"move-to-selected-button\"\n                ></button>\n\n                <button\n                  type=\"button\"\n                  adapt-button\n                  class=\"d-icon-right-angle_left mb-auto\"\n                  btn-type=\"secondary\"\n                  (click)=\"moveToAvailable(index)\"\n                  [disabled]=\"!index.isMoveToAvailableButtonEnabled || index.isAutomaticIndex\"\n                  rx-id=\"move-to-available-button\"\n                ></button>\n              </div>\n\n              <adapt-rx-list-builder\n                class=\"flex-grow-1\"\n                [ngModel]=\"index.selectedFields\"\n                selectionMode=\"multiple\"\n                (ngModelChange)=\"onSelectedFieldsChange($event, index)\"\n                (listItemRemove)=\"onFieldRemove($event, index)\"\n                [disabled]=\"isReadOnly || index.isAutomaticIndex\"\n                [hideSearchField]=\"true\"\n                [hideEdit]=\"true\"\n                (dragend)=\"onDragEnd()\"\n                [tooltip]=\"{\n                  iconName: 'question_circle_o',\n                  content: 'com.bmc.arsys.rx.client.record-designer.indexes.selected-fields.tooltip' | translate,\n                  placement: 'top',\n                  popoverMode: true\n                }\"\n                label=\"{{ 'com.bmc.arsys.rx.client.record-designer.indexes.selected-fields.label' | translate }}\"\n                rx-id=\"selected-field-list\"\n              ></adapt-rx-list-builder>\n            </div>\n          </adapt-accordion-tab>\n        </div>\n      </adapt-accordion>\n    </div>\n  </div>\n\n  <div class=\"modal-footer\">\n    <div *ngIf=\"!isReadOnly\">\n      <button\n        class=\"mr-2\"\n        type=\"button\"\n        adapt-button\n        btn-type=\"primary\"\n        rx-id=\"save-button\"\n        (click)=\"save()\"\n        [disabled]=\"!vm.isDirty\"\n      >\n        {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n      </button>\n\n      <button type=\"button\" adapt-button btn-type=\"secondary\" rx-id=\"cancel-button\" (click)=\"cancel()\">\n        {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n      </button>\n    </div>\n\n    <div *ngIf=\"isReadOnly\">\n      <button type=\"button\" adapt-button btn-type=\"secondary\" rx-id=\"close-button\" (click)=\"cancel()\">\n        {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n      </button>\n    </div>\n  </div>\n</ng-container>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.designer-modal-body{height:645px;min-height:calc(100% - 61px)!important}.designer-modal-accordion-wrapper{display:flex;flex-direction:column;height:100%;overflow:auto;padding-top:10px}.designer-modal-accordion-content{position:relative}.designer-modal-accordion-content.cdk-drag-preview{z-index:1200!important}.designer-modal-drag-handle{cursor:move;position:absolute;top:0;left:0;height:46px;padding:14px 10px 14px 14px;z-index:1}.designer-modal-card-title-content{width:100%;display:flex}.designer-modal-card-title-content .left-header-block,.designer-modal-card-title-content .right-header-block{display:flex;align-items:center}.designer-modal-card-title-content .left-header-block{flex-grow:1;min-width:0;font-size:14px;padding-left:22px}.designer-modal-card-sub-title{color:#7c7f81;font-weight:normal}.designer-modal-card-title-index-buttons{display:flex;font-size:19px}.rx-card{overflow:auto}.rx-tree-draggable-node{cursor:pointer}.rx-tree-draggable-node.cdk-drag-preview{z-index:1200!important}.rx-tree-draggable-node.cdk-drag{opacity:1}.rx-tree-node-label{word-break:break-all}rx-form-builder{max-width:400px}:host::ng-deep adapt-rx-select{width:30%}:host::ng-deep adapt-rx-select .rx-select__options-wrapper{height:350px;flex:1 1 auto;overflow-y:auto;overflow-x:hidden}:host::ng-deep adapt-rx-list-builder{width:30%}:host::ng-deep adapt-rx-list-builder .adapt-list-builder{height:100%}:host::ng-deep adapt-rx-list-builder .adapt-list-container{height:350px;flex-grow:1;overflow:auto}:host::ng-deep adapt-rx-list-builder .adapt-list-builder,:host::ng-deep adapt-rx-list-builder .adapt-list-builder__wrp{display:flex;flex-direction:column;height:100%}\n"], components: [{ type: i3.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i3.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i3.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i3.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }, { type: i3.AdaptRxCheckboxComponent, selector: "adapt-rx-checkbox", inputs: ["value", "checked", "indeterminate"], outputs: ["indeterminateChange"] }, { type: i3.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i3.AdaptRxListBuilderComponent, selector: "adapt-rx-list-builder", inputs: ["hideSearchField", "hideEdit", "hideDelete", "hideListAreaLabel", "customSort", "texts", "menuHeight", "listItemMaxLength", "generateListItemId", "itemValidation", "disabled", "treeStructure", "listItemFormatter", "listItemSetterProp", "listItemContentTemplate", "selectionMode"], outputs: ["listItemAdd", "listItemEdit", "listItemUpdate", "listItemRemove"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "async": i5.AsyncPipe, "translate": i2.TranslatePipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordIndexesEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-record-indexes-editor',
                    templateUrl: './record-indexes-editor.component.html',
                    styleUrls: ['./record-indexes-editor.component.scss'],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [RecordIndexesEditorStore]
                }]
        }], ctorParameters: function () { return [{ type: RecordIndexesEditorStore }, { type: i1$1.RxGuidService }, { type: i3.ActiveModalRef }, { type: i0.Injector }]; }, propDecorators: { accordionTabEls: [{
                type: ViewChildren,
                args: [AdaptAccordionTabComponent, { read: ElementRef }]
            }] } });

class RecordIndexesControlComponent extends ValueAccessor {
    constructor(rxModalService, translateService) {
        super();
        this.rxModalService = rxModalService;
        this.translateService = translateService;
    }
    openIndexesEditor(indexToEditIndex = null) {
        this.rxModalService
            .openModal({
            title: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.indexes.edit-indexes.label'),
            data: {
                indexes: this.value,
                indexToEditIndex,
                isReadOnly: this.options.isReadOnly,
                fields: this.options.definitionModel.fields
            },
            content: RecordIndexesEditorComponent,
            size: OpenViewActionModalSize.Large
        })
            .then((indexes) => {
            this.value = indexes;
        })
            .catch(noop);
    }
    removeIndex($index) {
        this.rxModalService
            .confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.indexes.delete-index-confirmation.message')
        })
            .then((result) => {
            if (result) {
                this.value = this.value.filter((index, itemIndex) => itemIndex !== $index);
            }
        });
    }
    focus(data) {
        if (data === null || data === void 0 ? void 0 : data.indexToEditIndex) {
            this.openIndexesEditor(data.indexToEditIndex);
        }
        else {
            this.openIndexesEditor();
        }
    }
}
RecordIndexesControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordIndexesControlComponent, deps: [{ token: i1.RxModalService }, { token: i2.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
RecordIndexesControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RecordIndexesControlComponent, selector: "rx-record-indexes", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: RecordIndexesControlComponent,
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: "<adapt-button btn-type=\"tertiary\" rx-id=\"open-indexes-editor\" class=\"p-0 pb-1\" (click)=\"openIndexesEditor()\">\n  <span class=\"d-icon-plus_circle\"></span>\n  {{ 'com.bmc.arsys.rx.client.record-designer.indexes.edit-indexes.label' | translate }}\n</adapt-button>\n\n<div class=\"record-index rounded mb-1 border font-weight-bold\" *ngFor=\"let index of value; let $index = index\">\n  <div class=\"d-flex mb-1\">\n    <span rx-id=\"record-index-name\" [title]=\"index.indexName\">\n      <span *ngIf=\"!index.isAutomaticIndex\">{{\n        index.indexName || 'com.bmc.arsys.rx.client.record-designer.indexes.new-index.label' | translate\n      }}</span>\n      <span *ngIf=\"index.isAutomaticIndex\"\n        >{{\n          'com.bmc.arsys.rx.client.record-designer.indexes.automatic-index.label'\n            | translate\n              : {\n                  indexName:\n                    index.indexName || 'com.bmc.arsys.rx.client.record-designer.indexes.new-index.label' | translate\n                }\n        }}\n        <adapt-icon\n          name=\"question_circle_o\"\n          class=\"ml-2\"\n          [adaptPopover]=\"'com.bmc.arsys.rx.client.record-designer.indexes.system-index.tooltip' | translate\"\n        >\n        </adapt-icon>\n      </span>\n    </span>\n\n    <button\n      class=\"ml-auto rx-button-unstyled d-icon-left-pencil btn-link\"\n      type=\"button\"\n      rx-id=\"open-index-editor\"\n      (click)=\"openIndexesEditor($index)\"\n      *ngIf=\"!index.isAutomaticIndex\"\n    ></button>\n\n    <button\n      type=\"button\"\n      class=\"rx-button-unstyled d-icon-cross btn-link\"\n      rx-id=\"remove-index\"\n      (click)=\"removeIndex($index)\"\n      *ngIf=\"!options.isReadOnly && !index.isAutomaticIndex\"\n    ></button>\n  </div>\n\n  <div class=\"caption ellipsis\">\n    {{\n      (index.unique\n        ? 'com.bmc.arsys.rx.client.record-designer.indexes.unique-index.label'\n        : 'com.bmc.arsys.rx.client.record-designer.indexes.non-unique-index.label.value'\n      ) | translate\n    }},\n    {{\n      index.indexFieldIds.length === 1\n        ? ('com.bmc.arsys.rx.client.record-designer.indexes.one-field-index.label' | translate)\n        : ('com.bmc.arsys.rx.client.record-designer.indexes.many-fields-index.label'\n          | translate: { fieldCount: index.indexFieldIds.length })\n    }}\n  </div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.record-index{padding:5px 10px;word-break:break-all}.record-index .caption{color:#959899;font-size:10px}.d-icon-cross,.d-icon-left-pencil{cursor:pointer}.d-icon-cross:not(:hover),.d-icon-left-pencil:not(:hover){color:#313538}\n"], components: [{ type: i3.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i3.AdaptIconComponent, selector: "adapt-icon", inputs: ["name", "classList", "description", "testID"] }], directives: [{ type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.AdaptPopoverDirective, selector: "[adaptPopover]", inputs: ["adaptPopover", "popoverTitle", "placement", "fallbackPlacement", "triggers", "container", "appendToBody", "closeBtn", "popupDelay", "disablePopover", "popoverClass", "autoClose", "closeOnOutOfView", "maxWidth", "minWidth"], outputs: ["shown", "hidden"], exportAs: ["adaptPopover"] }], pipes: { "translate": i2.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordIndexesControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-record-indexes',
                    templateUrl: './record-indexes-control.component.html',
                    styleUrls: ['./record-indexes-control.component.scss'],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: RecordIndexesControlComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxModalService }, { type: i2.TranslateService }]; }, propDecorators: { options: [{
                type: Input
            }] } });

class RxRecordDesignerInspectorService {
    constructor(rxFieldDefinitionService, rxOverlayService, translateService) {
        this.rxFieldDefinitionService = rxFieldDefinitionService;
        this.rxOverlayService = rxOverlayService;
        this.translateService = translateService;
    }
    getDefinitionInspectorConfig(isNewDefinition, definitionModel, definitionModelFromDefinition, bundleId, isPropertiesCustomizationAllowed, isIndexCustomizationAllowed, isPermissionsCustomizationAllowed, isFieldsCustomizationAllowed, isReadOnly, expressionConfigurator) {
        var _a, _b;
        let configs = [];
        const isOverlayMode = !isNewDefinition && definitionModel.overlayOperation !== RX_OVERLAY.operationTypes.createdInThisOverlayGroup;
        const isAuditRecordDefinition = Boolean(definitionModel.isAuditRecordDefinition);
        const isDeleteSourceRecordOperation = definitionModel.archiveType === RX_RECORD_DESIGNER.archiving.types.deleteSourceRecord.id;
        const doNotArchive = definitionModel.archiveType === RX_RECORD_DESIGNER.archiving.types.doNotArchive.id;
        const archivingOptions = Object.values(RX_RECORD_DESIGNER.archiving.types).map((value) => (Object.assign(Object.assign({}, value), { name: this.translateService.instant(value.nameKey) })));
        const joinTypeOptions = Object.values(RX_RECORD_DEFINITION.joinTypes).map((joinType) => (Object.assign(Object.assign({}, joinType), { name: this.translateService.instant(joinType.displayName), id: joinType.value })));
        const weightedRelevancyFields = [
            {
                name: 'weightedRelevancyTitle',
                component: SelectFormControlComponent,
                isDisabled: !isPropertiesCustomizationAllowed || isReadOnly,
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.title-field.label'),
                    options: definitionModel.fields
                        .filter((fieldDefinition) => isNumber(fieldDefinition.id) &&
                        (get(fieldDefinition, 'searchDefinition.enableFTSSearch') ||
                            get(fieldDefinition, 'searchDefinition.enableCognitiveSearch')) &&
                        !includes([definitionModel.weightedRelevancyEnvironment, definitionModel.weightedRelevancyKeywords], fieldDefinition.id))
                        .map((fieldDefinition) => ({
                        name: fieldDefinition.name,
                        id: fieldDefinition.id
                    })),
                    tooltip: new Tooltip(this.translateService.instant(definitionModel.enableCognitiveSearch
                        ? 'com.bmc.arsys.rx.client.record-designer.definition-properties.title-field-cognitive-search.tooltip'
                        : 'com.bmc.arsys.rx.client.record-designer.definition-properties.title-field-fts.tooltip'))
                }
            },
            {
                name: 'weightedRelevancyEnvironment',
                component: SelectFormControlComponent,
                isDisabled: !isPropertiesCustomizationAllowed || isReadOnly,
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.environment-field.label'),
                    options: definitionModel.fields
                        .filter((fieldDefinition) => isNumber(fieldDefinition.id) &&
                        (get(fieldDefinition, 'searchDefinition.enableFTSSearch') ||
                            get(fieldDefinition, 'searchDefinition.enableCognitiveSearch')) &&
                        !includes([definitionModel.weightedRelevancyTitle, definitionModel.weightedRelevancyKeywords], fieldDefinition.id))
                        .map((fieldDefinition) => ({
                        name: fieldDefinition.name,
                        id: fieldDefinition.id
                    })),
                    tooltip: new Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.environment-field.tooltip'))
                }
            },
            {
                name: 'weightedRelevancyKeywords',
                component: SelectFormControlComponent,
                isDisabled: !isPropertiesCustomizationAllowed || isReadOnly,
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.keywords-field.label'),
                    options: definitionModel.fields
                        .filter((fieldDefinition) => isNumber(fieldDefinition.id) &&
                        (get(fieldDefinition, 'searchDefinition.enableFTSSearch') ||
                            get(fieldDefinition, 'searchDefinition.enableCognitiveSearch')) &&
                        !includes([definitionModel.weightedRelevancyTitle, definitionModel.weightedRelevancyEnvironment], fieldDefinition.id))
                        .map((fieldDefinition) => ({
                        name: fieldDefinition.name,
                        id: fieldDefinition.id
                    })),
                    tooltip: new Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.keywords-field.tooltip'))
                }
            }
        ];
        if (definitionModel.resourceType === RX_RECORD_DEFINITION.recordDefinitionTypes.regular.recordDefinitionType) {
            configs = [
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.general-items.label'),
                    controls: [
                        {
                            name: 'name',
                            component: TextFormControlComponent,
                            isDisabled: !isNewDefinition,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label'),
                                required: true
                            }
                        },
                        {
                            name: 'description',
                            component: TextareaFormControlComponent,
                            isDisabled: !isPropertiesCustomizationAllowed || isReadOnly,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.description.label'),
                                rows: 3
                            }
                        },
                        {
                            component: RxRevertCustomizationComponent,
                            options: {
                                overlayGroupId: definitionModel.overlayGroupId,
                                overlayDescriptor: definitionModel.overlayDescriptor
                            }
                        },
                        {
                            name: 'customizationOptions',
                            component: RecordCustomizationOptionsComponent,
                            isDisabled: !isPropertiesCustomizationAllowed || isReadOnly,
                            options: {
                                definitionTypeDisplayName: this.translateService
                                    .instant('com.bmc.arsys.rx.client.record-definition.label')
                                    .toLowerCase(),
                                recordDefinition: definitionModel
                            }
                        },
                        {
                            name: 'allowNonAdminToDeleteRecordInstances',
                            component: SwitchFormControlComponent,
                            isDisabled: isAuditRecordDefinition || isReadOnly,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.allow-non-admin-users-to-delete-records.label')
                            }
                        },
                        {
                            name: 'owner',
                            component: TextFormControlComponent,
                            isDisabled: true,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.owner.label')
                            }
                        },
                        {
                            name: 'lastUpdateTime',
                            component: TextFormControlComponent,
                            isDisabled: true,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.modified-date.label')
                            }
                        },
                        {
                            name: 'lastChangedBy',
                            component: TextFormControlComponent,
                            isDisabled: true,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.modified-by.label')
                            }
                        },
                        {
                            name: 'permissions',
                            component: RxPermissionEditorComponent,
                            isDisabled: !isPermissionsCustomizationAllowed || isReadOnly,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.permissions.label'),
                                type: RX_PERMISSION.editorContexts.record
                            }
                        },
                        {
                            name: 'shouldExportData',
                            component: SwitchFormControlComponent,
                            isDisabled: !isPropertiesCustomizationAllowed || isAuditRecordDefinition || isReadOnly,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.should-export-data.label'),
                                tooltip: new Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.should-export-data.tooltip'))
                            }
                        }
                    ]
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.title'),
                    controls: [
                        {
                            name: 'recordInheritanceSelector',
                            component: RecordInheritanceEditorComponent,
                            options: {
                                recordDefinition: definitionModel,
                                isReadOnly: isOverlayMode || !isPropertiesCustomizationAllowed || isAuditRecordDefinition
                            }
                        }
                    ]
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.search.label'),
                    controls: [
                        {
                            name: 'enableCognitiveSearch',
                            component: SwitchFormControlComponent,
                            isDisabled: isReadOnly,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.enable-cognitive-search.label')
                            }
                        },
                        {
                            name: 'recordSearchFields',
                            component: SearchFieldEditorControlComponent,
                            options: {
                                recordDefinitionModel: definitionModel,
                                isReadOnly: !isPropertiesCustomizationAllowed || isAuditRecordDefinition || isReadOnly
                            }
                        },
                        ...weightedRelevancyFields
                    ]
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.indexes.title'),
                    controls: [
                        {
                            name: 'indexDefinitions',
                            component: RecordIndexesControlComponent,
                            options: {
                                isReadOnly: !isIndexCustomizationAllowed || isReadOnly,
                                definitionModel
                            }
                        }
                    ]
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.display-value.title'),
                    controls: [
                        {
                            name: 'displayFieldIdInAssociation',
                            component: SelectFormControlComponent,
                            isDisabled: !isPropertiesCustomizationAllowed || isReadOnly,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.associated-display-field.title'),
                                options: definitionModel.fields
                                    .filter((field) => this.rxFieldDefinitionService.canBeAssociatedDisplayField(field))
                                    .map((field) => ({ id: field.id, name: field.name }))
                                    .sort((a, b) => a.name.localeCompare(b.name)),
                                tooltip: new Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.associated-display-field.tooltip'))
                            }
                        }
                    ]
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.auditing.title'),
                    controls: [
                        {
                            name: 'isAuditingEnabled',
                            component: SwitchFormControlComponent,
                            isDisabled: isReadOnly,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.enabled.label')
                            }
                        },
                        {
                            name: 'auditRecordDefinitionName',
                            component: TextFormControlComponent,
                            isDisabled: !isPropertiesCustomizationAllowed || isReadOnly,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.audit-record-definition-name.label')
                            }
                        },
                        {
                            name: 'auditSourceRecordDefinitionName',
                            component: TextFormControlComponent,
                            isDisabled: true,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.audited-from.label')
                            }
                        }
                    ]
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.title'),
                    controls: [
                        {
                            name: 'isArchivingEnabled',
                            component: SwitchFormControlComponent,
                            isDisabled: !isPropertiesCustomizationAllowed || isOverlayMode || isReadOnly,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.enabled.label')
                            }
                        },
                        {
                            name: 'archiveType',
                            component: SelectFormControlComponent,
                            isDisabled: !isPropertiesCustomizationAllowed || isOverlayMode || isReadOnly,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.audit-record-operation.label'),
                                options: archivingOptions
                            }
                        },
                        {
                            name: 'includeAttachments',
                            component: BooleanFormControlComponent,
                            isDisabled: !isPropertiesCustomizationAllowed ||
                                doNotArchive ||
                                isOverlayMode ||
                                isDeleteSourceRecordOperation ||
                                isReadOnly,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.include-attachments.label'),
                                shouldDisplayAsCheckbox: true
                            }
                        },
                        {
                            name: 'archiveRecordDefinitionName',
                            component: TextFormControlComponent,
                            isDisabled: !isPropertiesCustomizationAllowed ||
                                doNotArchive ||
                                isOverlayMode ||
                                isDeleteSourceRecordOperation ||
                                isReadOnly,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.archive-record-definition-name.label')
                            }
                        },
                        {
                            name: 'ageQualifierInDays',
                            component: CounterFormControlComponent,
                            isDisabled: !isPropertiesCustomizationAllowed || doNotArchive || isReadOnly,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.record-age.label'),
                                tooltip: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.record-age.tooltip'),
                                allowIntegerOnly: true
                            }
                        },
                        {
                            name: 'ageQualifierFieldId',
                            component: SelectFormControlComponent,
                            isDisabled: !isPropertiesCustomizationAllowed || doNotArchive || isReadOnly,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.record-age-field.label'),
                                options: definitionModel.fields
                                    .filter((field) => field.resourceType === RX_RECORD_DEFINITION.resourceTypes.dateTime)
                                    .map((fieldDefinition) => ({
                                    name: fieldDefinition.name,
                                    id: fieldDefinition.id
                                }))
                                    .sort((a, b) => a.name.localeCompare(b.name))
                            }
                        },
                        {
                            name: 'archiveDescription',
                            component: TextFormControlComponent,
                            isDisabled: !isPropertiesCustomizationAllowed || doNotArchive || isReadOnly,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.description.label')
                            }
                        },
                        {
                            name: 'archiveDataCriteria',
                            component: ExpressionFormControlComponent,
                            isDisabled: !isPropertiesCustomizationAllowed || doNotArchive || isReadOnly,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.record-filter.label'),
                                dataDictionary$: expressionConfigurator.getDataDictionary(RX_RECORD_DESIGNER.archiveDataCriteriaPath),
                                operators: expressionConfigurator.getOperators(RX_RECORD_DESIGNER.archiveDataCriteriaPath),
                                tooltip: new Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.record-filter.tooltip'))
                            }
                        },
                        {
                            name: 'associationsToFollowForArchive',
                            component: ArchiveAssociationsControlComponent,
                            options: {
                                definitionModel,
                                definitionModelFromDefinition,
                                bundleId,
                                isOverlayMode,
                                isReadOnly: !isPropertiesCustomizationAllowed || doNotArchive
                            }
                        }
                    ]
                }
            ];
        }
        if (definitionModel.resourceType === RX_RECORD_DEFINITION.recordDefinitionTypes.join.recordDefinitionType) {
            configs = [
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.general-items.label'),
                    controls: [
                        {
                            name: 'name',
                            component: TextFormControlComponent,
                            isDisabled: !isNewDefinition,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label'),
                                required: true
                            }
                        },
                        {
                            name: 'description',
                            component: TextareaFormControlComponent,
                            isDisabled: !isPropertiesCustomizationAllowed || isReadOnly,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.description.label'),
                                rows: 3
                            }
                        },
                        {
                            name: 'primaryRecordDefinitionName',
                            component: RxDefinitionPickerComponent,
                            isDisabled: true,
                            options: {
                                definitionType: RxDefinitionPickerType.Record,
                                label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.primary-record.label')
                            }
                        },
                        {
                            name: 'secondaryRecordDefinitionName',
                            component: RxDefinitionPickerComponent,
                            isDisabled: true,
                            options: {
                                definitionType: RxDefinitionPickerType.Record,
                                label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.secondary-record.label')
                            }
                        },
                        {
                            name: 'joinType',
                            component: SelectFormControlComponent,
                            isDisabled: true,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.join-type.label'),
                                options: joinTypeOptions
                            }
                        },
                        {
                            name: 'joinCriteria',
                            component: ExpressionFormControlComponent,
                            isDisabled: isReadOnly,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.join-criteria.label'),
                                dataDictionary$: expressionConfigurator.getDataDictionary(RX_RECORD_DESIGNER.joinCriteriaPath),
                                operators: expressionConfigurator.getOperators(RX_RECORD_DESIGNER.joinCriteriaPath)
                            }
                        },
                        {
                            component: RxRevertCustomizationComponent,
                            options: {
                                overlayGroupId: definitionModel.overlayGroupId,
                                overlayDescriptor: definitionModel.overlayDescriptor
                            }
                        },
                        {
                            name: 'customizationOptions',
                            component: RecordCustomizationOptionsComponent,
                            isDisabled: !isPropertiesCustomizationAllowed || isReadOnly,
                            options: {
                                definitionTypeDisplayName: this.translateService
                                    .instant('com.bmc.arsys.rx.client.record-definition.label')
                                    .toLowerCase(),
                                recordDefinition: definitionModel
                            }
                        },
                        {
                            name: 'owner',
                            component: TextFormControlComponent,
                            isDisabled: true,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.owner.label')
                            }
                        },
                        {
                            name: 'lastUpdateTime',
                            component: TextFormControlComponent,
                            isDisabled: true,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.modified-date.label')
                            }
                        },
                        {
                            name: 'lastChangedBy',
                            component: TextFormControlComponent,
                            isDisabled: true,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.modified-by.label')
                            }
                        },
                        {
                            name: 'permissions',
                            component: RxPermissionEditorComponent,
                            isDisabled: !isPermissionsCustomizationAllowed || isReadOnly,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.permissions.label'),
                                type: RX_PERMISSION.editorContexts.record
                            }
                        },
                        {
                            name: 'shouldExportData',
                            component: SwitchFormControlComponent,
                            isDisabled: !isPropertiesCustomizationAllowed || isAuditRecordDefinition || isReadOnly,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.should-export-data.label'),
                                tooltip: new Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.should-export-data.tooltip'))
                            }
                        }
                    ]
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.search.label'),
                    controls: [
                        {
                            name: 'enableCognitiveSearch',
                            component: SwitchFormControlComponent,
                            isDisabled: isReadOnly,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.enable-cognitive-search.label')
                            }
                        },
                        {
                            name: 'recordSearchFields',
                            component: SearchFieldEditorControlComponent,
                            options: {
                                recordDefinitionModel: definitionModel,
                                isReadOnly: !isPropertiesCustomizationAllowed || isAuditRecordDefinition || isReadOnly
                            }
                        },
                        ...weightedRelevancyFields
                    ]
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.auditing.title'),
                    controls: [
                        {
                            name: 'isAuditingEnabled',
                            component: SwitchFormControlComponent,
                            isDisabled: isReadOnly,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.enabled.label')
                            }
                        },
                        {
                            name: 'auditRecordDefinitionName',
                            component: TextFormControlComponent,
                            isDisabled: !isPropertiesCustomizationAllowed || isReadOnly,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.audit-record-definition-name.label')
                            }
                        },
                        {
                            name: 'auditSourceRecordDefinitionName',
                            component: TextFormControlComponent,
                            isDisabled: true,
                            options: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.audited-from.label')
                            }
                        }
                    ]
                }
            ];
        }
        if (isOverlayMode) {
            (_a = configs[0]) === null || _a === void 0 ? void 0 : _a.controls.splice(findIndex(configs[0].controls, { name: 'shouldExportData' }), 1);
        }
        if (isNewDefinition) {
            (_b = configs[0]) === null || _b === void 0 ? void 0 : _b.controls.splice(findIndex(configs[0].controls, { name: 'owner' }), 3);
        }
        return configs;
    }
}
RxRecordDesignerInspectorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDesignerInspectorService, deps: [{ token: i3$1.RxFieldDefinitionService }, { token: i2$1.RxOverlayService }, { token: i2.TranslateService }], target: i0.ɵɵFactoryTarget.Injectable });
RxRecordDesignerInspectorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDesignerInspectorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDesignerInspectorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i3$1.RxFieldDefinitionService }, { type: i2$1.RxOverlayService }, { type: i2.TranslateService }]; } });

class InheritanceIssueInfoComponent extends RxModalClass {
    constructor(injector, activeModalRef) {
        super(activeModalRef, injector);
        this.injector = injector;
        this.activeModalRef = activeModalRef;
        this.overriddenRecordProperties = this.activeModalRef.getData().overriddenRecordProperties;
    }
    close(value) {
        this.activeModalRef.close(value);
    }
}
InheritanceIssueInfoComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: InheritanceIssueInfoComponent, deps: [{ token: i0.Injector }, { token: i3.ActiveModalRef }], target: i0.ɵɵFactoryTarget.Component });
InheritanceIssueInfoComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: InheritanceIssueInfoComponent, selector: "rx-localized-character-default-value-selector", usesInheritance: true, ngImport: i0, template: "<div class=\"modal-body\">\n  <ng-container *ngIf=\"overriddenRecordProperties\">\n    <div *ngIf=\"overriddenRecordProperties.fields.length > 0\">\n      <p>\n        {{ 'com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.issues-info.message' | translate }}\n      </p>\n\n      <ul>\n        <li>\n          <span>{{\n            'com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.issues-overridden-properties-info.message'\n              | translate: { overriddenFields: overriddenRecordProperties.fields }\n          }}</span>\n        </li>\n      </ul>\n    </div>\n\n    <div *ngIf=\"overriddenRecordProperties.securityLabels?.length > 0\">\n      <p>\n        {{\n          'com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.issues-overridden-security-labels-info.message'\n            | translate\n        }}\n      </p>\n\n      <ul>\n        <li>\n          <span>{{\n            'com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.issues-security-labels-info.message'\n              | translate: { overriddenSecurityLabels: overriddenRecordProperties.securityLabels }\n          }}</span>\n        </li>\n      </ul>\n    </div>\n  </ng-container>\n  <p>\n    {{ 'com.bmc.arsys.rx.client.common.continue-confirmation.message' | translate }}\n  </p>\n</div>\n\n<div class=\"modal-footer\">\n  <button adapt-button type=\"button\" btn-type=\"primary\" rx-id=\"yes-button\" (click)=\"close('continue')\">\n    {{ 'com.bmc.arsys.rx.client.common.yes.label' | translate }}\n  </button>\n\n  <button adapt-button type=\"button\" btn-type=\"secondary\" rx-id=\"no-button\" (click)=\"close('cancel')\">\n    {{ 'com.bmc.arsys.rx.client.common.no.label' | translate }}\n  </button>\n</div>\n", components: [{ type: i3.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i2.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: InheritanceIssueInfoComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-localized-character-default-value-selector',
                    templateUrl: './inheritance-issue-info.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i3.ActiveModalRef }]; } });

class RxRecordDesignerService {
    constructor(rxDefinitionNameService, rxFieldDefinitionService, rxGuidService, rxOverlayService, rxRecordDefinitionService, rxLocalizationService, rxDateUtilService) {
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxFieldDefinitionService = rxFieldDefinitionService;
        this.rxGuidService = rxGuidService;
        this.rxOverlayService = rxOverlayService;
        this.rxRecordDefinitionService = rxRecordDefinitionService;
        this.rxLocalizationService = rxLocalizationService;
        this.rxDateUtilService = rxDateUtilService;
    }
    // Convert "$ID$ = 'ID'" to ${Record1.PRIMARY_RECORD_DEFINITION.ID} = ${Record2.SECONDARY_RECORD_DEFINITION.ID}
    getJoinCriteriaExpression(joinCriteria, primaryRecordDefinitionName, secondaryRecordDefinitionName) {
        const primaryFieldRegExp = new RegExp('\\$(?!NULL)([\\w .]+)\\$', 'g');
        const secondaryFieldRegExp = new RegExp("'([^']+)'", 'g');
        return (joinCriteria || '')
            .replace(primaryFieldRegExp, '${' +
            this.rxDefinitionNameService.getDisplayName(primaryRecordDefinitionName) +
            '.' +
            RX_RECORD_DEFINITION.sourceRecordTypes.primary +
            '.$1}')
            .replace(secondaryFieldRegExp, '${' +
            this.rxDefinitionNameService.getDisplayName(secondaryRecordDefinitionName) +
            '.' +
            RX_RECORD_DEFINITION.sourceRecordTypes.secondary +
            '.$1}');
    }
    // Convert ${Record1.PRIMARY_RECORD_DEFINITION.ID} = ${Record2.SECONDARY_RECORD_DEFINITION.ID} to "$ID$ = 'ID'"
    getJoinCriteriaArExpression(joinCriteria, primaryRecordDefinitionName, secondaryRecordDefinitionName) {
        const primaryFieldRegExp = new RegExp('\\${' +
            this.rxDefinitionNameService.getDisplayName(primaryRecordDefinitionName) +
            '\\.' +
            RX_RECORD_DEFINITION.sourceRecordTypes.primary +
            '\\.([^}]+)}', 'g');
        const secondaryFieldRegExp = new RegExp('\\${' +
            this.rxDefinitionNameService.getDisplayName(secondaryRecordDefinitionName) +
            '\\.' +
            RX_RECORD_DEFINITION.sourceRecordTypes.secondary +
            '\\.([^}]+)}', 'g');
        return (joinCriteria || '')
            .replace(primaryFieldRegExp, '#$1#')
            .replace(/#/g, '$')
            .replace(secondaryFieldRegExp, "'$1'");
    }
    getDefinitionFromDefinitionModel(model, bundleId) {
        var _a, _b, _c;
        return {
            allowFieldsOverlay: model.customizationOptions.allowFieldsOverlay,
            allowNonAdminToDeleteRecordInstances: model.allowNonAdminToDeleteRecordInstances,
            allowIndexesOverlay: model.customizationOptions.allowIndexesOverlay,
            allowOtherPropertiesOverlay: model.customizationOptions.allowOtherPropertiesOverlay,
            allowPermissionsOverlay: model.customizationOptions.allowPermissionsOverlay,
            enableCognitiveSearch: model.enableCognitiveSearch,
            description: model.description,
            guid: model.guid,
            indexDefinitions: model.resourceType === RX_RECORD_DEFINITION.recordDefinitionTypes.regular.recordDefinitionType
                ? model.indexDefinitions.map((indexDefinitionModel) => omit(indexDefinitionModel, 'isAutomaticIndex'))
                : undefined,
            inheritanceDescriptor: model.recordInheritanceSelector.inheritanceDescriptor,
            isAbstract: (_a = model.recordInheritanceSelector.inheritanceOptions) === null || _a === void 0 ? void 0 : _a.isAbstract,
            isFinal: (_b = model.recordInheritanceSelector.inheritanceOptions) === null || _b === void 0 ? void 0 : _b.isFinal,
            isSharedInstanceStorage: (_c = model.recordInheritanceSelector.inheritanceOptions) === null || _c === void 0 ? void 0 : _c.isSharedInstanceStorage,
            joinCriteria: model.joinCriteria
                ? this.getJoinCriteriaArExpression(model.joinCriteria, model.primaryRecordDefinitionName, model.secondaryRecordDefinitionName)
                : undefined,
            joinType: model.joinType,
            lastChangedBy: model.lastChangedBy,
            lastUpdateTime: model.lastUpdateTime ? moment(model.lastUpdateTime).format() : null,
            name: `${bundleId}:${model.name}`,
            overlayGroupId: model.overlayGroupId,
            owner: model.owner,
            overlayDescriptor: model.overlayDescriptor,
            permissions: model.permissions,
            primaryRecordDefinitionName: model.primaryRecordDefinitionName,
            resourceType: model.resourceType,
            secondaryRecordDefinitionName: model.secondaryRecordDefinitionName,
            shouldExportData: model.shouldExportData,
            scope: model.customizationOptions.scope,
            tags: model.tags,
            version: model.version,
            weightedRelevancyFields: {
                TITLE: model.weightedRelevancyTitle,
                ENVIRONMENT: model.weightedRelevancyEnvironment,
                KEYWORDS: model.weightedRelevancyKeywords
            },
            displayFieldIdInAssociation: find(model.fields, { id: model.displayFieldIdInAssociation })
                ? model.displayFieldIdInAssociation
                : null,
            archiveDescriptor: {
                ageQualifierFieldId: model.ageQualifierFieldId,
                ageQualifierInDays: model.ageQualifierInDays,
                archiveRecordDefinitionName: model.archiveRecordDefinitionName,
                description: model.archiveDescription,
                archiveType: model.archiveType,
                includeAttachments: model.includeAttachments,
                archiveDataCriteria: model.archiveDataCriteria,
                isEnabled: model.isArchivingEnabled
            },
            associationsToFollowForArchive: model.associationsToFollowForArchive,
            auditDescriptor: {
                isEnabled: model.isAuditingEnabled,
                auditRecordDefinitionName: model.auditRecordDefinitionName,
                auditDataCriteria: model.auditDataCriteria,
                associatedAuditFieldsByAssociationName: model.associatedAuditFieldsByAssociationName
            },
            auditSourceRecordDefinitionName: model.auditSourceRecordDefinitionName,
            fieldDefinitions: model.fields.map((fieldModel) => {
                var _a, _b;
                const field = {
                    resourceType: fieldModel.resourceType,
                    lastUpdateTime: fieldModel.lastUpdateTime,
                    lastChangedBy: fieldModel.lastChangedBy,
                    owner: fieldModel.owner,
                    name: fieldModel.name,
                    tags: fieldModel.tags,
                    description: fieldModel.description,
                    overlayGroupId: fieldModel.overlayGroupId,
                    id: isNumber(fieldModel.id) ? fieldModel.id : '',
                    fieldOption: fieldModel.fieldOption,
                    permissions: fieldModel.permissions,
                    fieldTypeName: fieldModel.fieldTypeName,
                    isInherited: fieldModel.isInherited,
                    explicitPermissions: fieldModel.explicitPermissions,
                    overlayDescriptor: fieldModel.overlayDescriptor,
                    fieldMapping: fieldModel.fieldMapping,
                    allowPermissionsOverlay: fieldModel.allowPermissionsOverlay,
                    allowOtherPropertiesOverlay: fieldModel.allowOtherPropertiesOverlay,
                    auditOption: fieldModel.audit ? 'AUDIT_AND_COPY' : fieldModel.copy ? 'COPY' : null,
                    allowPermissionsEdit: fieldModel.allowPermissionsEdit,
                    maxLength: fieldModel.maxLength,
                    searchDefinition: fieldModel.searchDefinition,
                    namedListDefinition: fieldModel.namedListDefinition,
                    shouldPersistEncrypted: fieldModel.shouldPersistEncrypted,
                    shouldPersistHashed: fieldModel.shouldPersistHashed,
                    pattern: fieldModel.pattern,
                    anyUserAllowedToSubmit: fieldModel.anyUserAllowedToSubmit
                };
                if (fieldModel.resourceType === RX_RECORD_DEFINITION.dataTypes.localizedCharacter.resourceType) {
                    field.defaultValueByLocale = fieldModel.defaultValueByLocale;
                }
                else if (fieldModel.resourceType === RX_RECORD_DEFINITION.dataTypes.selection.resourceType) {
                    field.defaultValue = fieldModel.selectionFieldOptionProperties.defaultValue;
                    field.optionNamesById = (_a = fieldModel.selectionFieldOptionProperties) === null || _a === void 0 ? void 0 : _a.optionNamesById;
                    field.optionLabelsById = (_b = fieldModel.selectionFieldOptionProperties) === null || _b === void 0 ? void 0 : _b.optionLabelsById;
                }
                else if (fieldModel.resourceType !== RX_RECORD_DEFINITION.dataTypes.attachment.resourceType) {
                    field.defaultValue = fieldModel.defaultValue;
                }
                return field;
            })
            // TODO-VM: update when new custom component in inspector config is implemented
        };
    }
    getDefinitionModelFromDefinition(recordDefinition) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
        return {
            allowNonAdminToDeleteRecordInstances: recordDefinition.allowNonAdminToDeleteRecordInstances,
            isArchivingEnabled: (_a = recordDefinition.archiveDescriptor) === null || _a === void 0 ? void 0 : _a.isEnabled,
            ageQualifierFieldId: (_b = recordDefinition.archiveDescriptor) === null || _b === void 0 ? void 0 : _b.ageQualifierFieldId,
            ageQualifierInDays: (_c = recordDefinition.archiveDescriptor) === null || _c === void 0 ? void 0 : _c.ageQualifierInDays,
            archiveRecordDefinitionName: (_d = recordDefinition.archiveDescriptor) === null || _d === void 0 ? void 0 : _d.archiveRecordDefinitionName,
            archiveDescription: (_e = recordDefinition.archiveDescriptor) === null || _e === void 0 ? void 0 : _e.description,
            archiveType: (_f = recordDefinition.archiveDescriptor) === null || _f === void 0 ? void 0 : _f.archiveType,
            includeAttachments: (_g = recordDefinition.archiveDescriptor) === null || _g === void 0 ? void 0 : _g.includeAttachments,
            archiveDataCriteria: (_h = recordDefinition.archiveDescriptor) === null || _h === void 0 ? void 0 : _h.archiveDataCriteria,
            associationsToFollowForArchive: {
                specificAssociationNames: ((_j = recordDefinition.associationsToFollowForArchive) === null || _j === void 0 ? void 0 : _j.specificAssociationNames) || [],
                selectionType: ((_k = recordDefinition.associationsToFollowForArchive) === null || _k === void 0 ? void 0 : _k.selectionType) || AssociationSelectionType.FollowParent
            },
            isAuditingEnabled: (_l = recordDefinition.auditDescriptor) === null || _l === void 0 ? void 0 : _l.isEnabled,
            auditRecordDefinitionName: (_m = recordDefinition.auditDescriptor) === null || _m === void 0 ? void 0 : _m.auditRecordDefinitionName,
            auditDataCriteria: (_o = recordDefinition.auditDescriptor) === null || _o === void 0 ? void 0 : _o.auditDataCriteria,
            associatedAuditFieldsByAssociationName: (_p = recordDefinition.auditDescriptor) === null || _p === void 0 ? void 0 : _p.associatedAuditFieldsByAssociationName,
            auditSourceRecordDefinitionName: recordDefinition.auditSourceRecordDefinitionName,
            customizationOptions: {
                allowFieldsOverlay: recordDefinition.allowFieldsOverlay,
                allowIndexesOverlay: recordDefinition.allowIndexesOverlay,
                allowOtherPropertiesOverlay: recordDefinition.allowOtherPropertiesOverlay,
                allowPermissionsOverlay: recordDefinition.allowPermissionsOverlay,
                allowOverlay: false,
                fields: recordDefinition.fieldDefinitions,
                scope: recordDefinition.scope
            },
            description: recordDefinition.description,
            displayFieldIdInAssociation: recordDefinition.displayFieldIdInAssociation,
            enableCognitiveSearch: recordDefinition.enableCognitiveSearch,
            fullPermissions: recordDefinition.fullPermissions,
            guid: recordDefinition.guid || this.rxGuidService.generate(),
            indexDefinitions: (_q = recordDefinition.indexDefinitions) === null || _q === void 0 ? void 0 : _q.map((indexDefinition) => (Object.assign(Object.assign({}, indexDefinition), { isAutomaticIndex: this.rxRecordDefinitionService.isAutomaticIndex(indexDefinition) }))),
            isAuditRecordDefinition: recordDefinition.isAuditRecordDefinition,
            joinCriteria: this.getJoinCriteriaExpression(recordDefinition.joinCriteria, recordDefinition.primaryRecordDefinitionName, recordDefinition.secondaryRecordDefinitionName),
            joinType: recordDefinition.joinType,
            lastUpdateTime: recordDefinition.lastUpdateTime
                ? this.rxDateUtilService.formatDate(recordDefinition.lastUpdateTime, 'medium')
                : recordDefinition.lastUpdateTime,
            lastChangedBy: recordDefinition.lastChangedBy,
            localizableStringsByFieldId: recordDefinition.localizableStringsByFieldId,
            name: this.rxDefinitionNameService.getDisplayName(recordDefinition.name),
            overlayDescriptor: recordDefinition.overlayDescriptor,
            overlayGroupId: recordDefinition.overlayGroupId,
            overlayOperation: this.rxOverlayService.getOverlayOperation(recordDefinition.overlayGroupId, recordDefinition.overlayDescriptor ? recordDefinition.overlayDescriptor.parentOverlayGroupId : null),
            owner: recordDefinition.owner,
            permissions: recordDefinition.permissions,
            primaryRecordDefinitionName: recordDefinition.primaryRecordDefinitionName,
            secondaryRecordDefinitionName: recordDefinition.secondaryRecordDefinitionName,
            recordInheritanceSelector: {
                inheritanceDescriptor: recordDefinition.inheritanceDescriptor,
                inheritanceOptions: {
                    isAbstract: recordDefinition.isAbstract,
                    isSharedInstanceStorage: recordDefinition.isSharedInstanceStorage,
                    isFinal: recordDefinition.isFinal
                },
                isInheritingCoreFields: null,
                inheritedFieldDefinitions: []
            },
            recordSearchFields: recordDefinition.fieldDefinitions.filter((field) => field.searchDefinition),
            recordInstancePrefix: recordDefinition.recordInstancePrefix,
            recordTypeName: recordDefinition.recordTypeName,
            resourceType: recordDefinition.resourceType,
            rowSecurityPropagations: recordDefinition.rowSecurityPropagations,
            securityLabels: recordDefinition.securityLabels,
            shouldExportData: recordDefinition.shouldExportData,
            tags: recordDefinition.tags,
            upgradeVersion: recordDefinition.upgradeVersion,
            version: recordDefinition.version,
            weightedRelevancyTitle: (_r = recordDefinition.weightedRelevancyFields) === null || _r === void 0 ? void 0 : _r.TITLE,
            weightedRelevancyEnvironment: (_s = recordDefinition.weightedRelevancyFields) === null || _s === void 0 ? void 0 : _s.ENVIRONMENT,
            weightedRelevancyKeywords: (_t = recordDefinition.weightedRelevancyFields) === null || _t === void 0 ? void 0 : _t.KEYWORDS,
            fields: recordDefinition.fieldDefinitions.map((fieldDefinition) => ({
                allowOtherPropertiesOverlay: fieldDefinition.allowOtherPropertiesOverlay,
                allowPermissionsEdit: fieldDefinition.allowPermissionsEdit,
                allowPermissionsOverlay: fieldDefinition.allowPermissionsOverlay,
                anyUserAllowedToSubmit: fieldDefinition.anyUserAllowedToSubmit,
                audit: fieldDefinition.auditOption === 'AUDIT_AND_COPY',
                copy: fieldDefinition.auditOption === 'AUDIT_AND_COPY' || fieldDefinition.auditOption === 'COPY',
                defaultValue: fieldDefinition.defaultValue,
                defaultValueByLocale: fieldDefinition.defaultValueByLocale,
                description: fieldDefinition.description,
                explicitPermissions: fieldDefinition.explicitPermissions,
                fieldMapping: fieldDefinition.fieldMapping,
                fieldOption: fieldDefinition.fieldOption,
                fieldTypeName: fieldDefinition.fieldTypeName,
                guid: this.rxGuidService.generate(),
                id: isNumber(fieldDefinition.id) ? fieldDefinition.id : fieldDefinition.customId || '',
                isCoreField: this.rxFieldDefinitionService.isCoreField(fieldDefinition),
                isInherited: fieldDefinition.isInherited,
                isNewField: false,
                lastChangedBy: fieldDefinition.lastChangedBy,
                lastUpdateTime: fieldDefinition.lastUpdateTime,
                maxLength: fieldDefinition.maxLength,
                maxSize: fieldDefinition.maxSize,
                maxValue: fieldDefinition.maxValue,
                minValue: fieldDefinition.minValue,
                name: fieldDefinition.name,
                overlayDescriptor: fieldDefinition.overlayDescriptor,
                overlayGroupId: fieldDefinition.overlayGroupId,
                owner: fieldDefinition.owner,
                permissions: fieldDefinition.permissions,
                precision: fieldDefinition.precision,
                resourceType: fieldDefinition.resourceType,
                searchDefinition: fieldDefinition.searchDefinition,
                selectionFieldOptionProperties: {
                    defaultValue: fieldDefinition.defaultValue,
                    optionNamesById: fieldDefinition.optionNamesById,
                    optionLabelsById: fieldDefinition.optionLabelsById
                },
                shouldPersistEncrypted: fieldDefinition.shouldPersistEncrypted,
                shouldPersistHashed: fieldDefinition.shouldPersistHashed,
                namedListDefinition: fieldDefinition.namedListDefinition,
                pattern: fieldDefinition.pattern,
                tags: fieldDefinition.tags
            }))
        };
    }
}
RxRecordDesignerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDesignerService, deps: [{ token: i2$1.RxDefinitionNameService }, { token: i3$1.RxFieldDefinitionService }, { token: i1$1.RxGuidService }, { token: i2$1.RxOverlayService }, { token: i3$1.RxRecordDefinitionService }, { token: i2$1.RxLocalizationService }, { token: i1$1.RxDateUtilsService }], target: i0.ɵɵFactoryTarget.Injectable });
RxRecordDesignerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDesignerService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDesignerService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i2$1.RxDefinitionNameService }, { type: i3$1.RxFieldDefinitionService }, { type: i1$1.RxGuidService }, { type: i2$1.RxOverlayService }, { type: i3$1.RxRecordDefinitionService }, { type: i2$1.RxLocalizationService }, { type: i1$1.RxDateUtilsService }]; } });

class RecordDesignerExpressionConfigurator extends RxExpressionConfigurator {
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
    recordExpressionDataDictionary(definitionModel, bundleId) {
        const data = {
            label: this.translateService.instant('com.bmc.arsys.rx.client.common.record-definition.label'),
            expanded: true
        };
        return iif(() => !!definitionModel.lastUpdateTime, this.rxRecordDefinitionCacheService.getRecordDefinition(`${bundleId}:${definitionModel.name}`).pipe(map((definition) => ({
            fields: definition.fieldDefinitions
        }))), of(definitionModel)).pipe(map((model) => {
            data.children = model.fields
                .filter((field) => field.resourceType !== RX_RECORD_DEFINITION.dataTypes.attachment.resourceType)
                .map((field) => ({
                label: field.name,
                icon: 'd-icon-arrow_right_square_input',
                expression: `'${field.name}'`
            }));
            return [data, this.generalGroup];
        }));
    }
}

class AddJoinFieldsEditorComponent extends RxModalClass {
    constructor(translateService, rxGuidService, rxRecordDefinitionService, activeModalRef, rxDefinitionNameService, rxFieldDefinitionService, injector) {
        super(activeModalRef, injector);
        this.translateService = translateService;
        this.rxGuidService = rxGuidService;
        this.rxRecordDefinitionService = rxRecordDefinitionService;
        this.activeModalRef = activeModalRef;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxFieldDefinitionService = rxFieldDefinitionService;
        this.injector = injector;
        this.notificationMessage = this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.notification.message');
        this.destroyed$ = new ReplaySubject(1);
        this.primaryRecordDefinitionName = this.activeModalRef.getData().primaryRecordDefinitionName;
        this.secondaryRecordDefinitionName = this.activeModalRef.getData().secondaryRecordDefinitionName;
        this.selectLabel = this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.select.label', {
            primaryRecordDefinitionName: this.rxDefinitionNameService.getDisplayName(this.primaryRecordDefinitionName),
            secondaryRecordDefinitionName: this.rxDefinitionNameService.getDisplayName(this.secondaryRecordDefinitionName)
        });
        this.addedPrimaryFields = this.activeModalRef
            .getData()
            .addedFields.filter((field) => !includes(RX_RECORD_DEFINITION.joinRecordDefinitionCoreFieldIds, field.id) &&
            get(field, 'fieldMapping.source') === RX_RECORD_DEFINITION.sourceRecordTypes.primary);
        this.addedSecondaryFields = this.activeModalRef
            .getData()
            .addedFields.filter((field) => !includes(RX_RECORD_DEFINITION.joinRecordDefinitionCoreFieldIds, field.id) &&
            get(field, 'fieldMapping.source') === RX_RECORD_DEFINITION.sourceRecordTypes.secondary);
        this.primarySelectedFieldsFormControl = new FormControl([]);
        this.secondarySelectedFieldsFormControl = new FormControl([]);
        this.primarySelectedFields$ = this.primarySelectedFieldsFormControl.valueChanges.pipe(startWith([]), shareReplay(1));
        this.secondarySelectedFields$ = this.secondarySelectedFieldsFormControl.valueChanges.pipe(startWith([]));
        this.primaryAvailableFields$ = this.rxRecordDefinitionService
            .get(this.primaryRecordDefinitionName, {}, true)
            .pipe(map((recordDefinition) => orderBy(this.getJoinFieldDefinitions(recordDefinition, RX_RECORD_DEFINITION.sourceRecordTypes.primary).filter((field) => !includes(map$1(this.addedPrimaryFields, this.getSourceFieldId), this.getSourceFieldId(field))), ['name'], ['asc'])));
        this.secondaryAvailableFields$ = this.rxRecordDefinitionService
            .get(this.secondaryRecordDefinitionName, {}, true)
            .pipe(map((recordDefinition) => orderBy(this.getJoinFieldDefinitions(recordDefinition, RX_RECORD_DEFINITION.sourceRecordTypes.secondary).filter((field) => !includes(map$1(this.addedSecondaryFields, this.getSourceFieldId), this.getSourceFieldId(field))), ['name'], ['asc'])));
        this.duplicateNames$ = combineLatest([this.primarySelectedFields$, this.secondarySelectedFields$]).pipe(map(([primarySelectedFields, secondarySelectedFields]) => {
            const selectedPrimaryFieldNames = [
                ...map$1(primarySelectedFields, 'name'),
                ...map$1(this.addedPrimaryFields, 'name')
            ];
            const selectedSecondaryFieldNames = [
                ...map$1(secondarySelectedFields, 'name'),
                ...map$1(this.addedSecondaryFields, 'name')
            ];
            return intersection(selectedPrimaryFieldNames, selectedSecondaryFieldNames).concat(intersection(map$1(RX_RECORD_DEFINITION.joinRecordDefinitionCoreFields, 'name'), selectedPrimaryFieldNames.concat(selectedSecondaryFieldNames)));
        }), shareReplay(1));
        this.hasDuplicates$ = this.duplicateNames$.pipe(map((duplicateNames) => !!duplicateNames.length));
        this.selectedFields$ = combineLatest([
            this.primarySelectedFields$,
            this.secondarySelectedFields$,
            this.duplicateNames$
        ]).pipe(map(([primarySelectedFields, secondarySelectedFields, duplicateNames]) => {
            const nonRetainableFieldIds = chain(primarySelectedFields)
                .concat(secondarySelectedFields)
                .map('fieldMapping.sourceFieldId')
                .filter((fieldId, index, selectedFieldIds) => includes(selectedFieldIds, fieldId, index + 1))
                .value();
            return concat(primarySelectedFields, secondarySelectedFields)
                .filter((fieldDefinition) => this.rxFieldDefinitionService.isJoinedField(fieldDefinition))
                .map((fieldDefinition) => {
                const field = cloneDeep(fieldDefinition);
                if (includes(duplicateNames, field.name)) {
                    if (field.fieldMapping.source === RX_RECORD_DEFINITION.sourceRecordTypes.primary) {
                        field.name = `${field.name} - ${this.rxDefinitionNameService.getDisplayName(this.primaryRecordDefinitionName)}`;
                    }
                    else {
                        field.name = `${field.name} - ${this.rxDefinitionNameService.getDisplayName(this.secondaryRecordDefinitionName)}`;
                    }
                }
                if (!includes(nonRetainableFieldIds, field.fieldMapping.sourceFieldId)) {
                    field.customId = field.fieldMapping.sourceFieldId;
                }
                return field;
            });
        }), shareReplay(1));
        this.vm$ = combineLatest([
            this.primaryAvailableFields$,
            this.secondaryAvailableFields$,
            this.hasDuplicates$,
            this.selectedFields$
        ]).pipe(map(([primaryAvailableFields, secondaryAvailableFields, hasDuplicates, selectedFields]) => ({
            primaryAvailableFields,
            secondaryAvailableFields,
            hasDuplicates,
            selectedFields
        })));
        this.alertConfig = {
            content: this.notificationMessage,
            variant: 'info',
            type: 'inline',
            dismissible: false
        };
        this.selectTexts = {
            headerText: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.select.header.label'),
            numberOptionsText: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.select.fields.label'),
            checked: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.select.selected.label'),
            searchPlaceholder: this.translateService.instant('com.bmc.arsys.rx.client.common.search.label')
        };
    }
    ngOnInit() {
        super.ngOnInit();
        this.selectedFields$
            .pipe(takeUntil(this.destroyed$))
            .subscribe((selectedFields) => (this.selectedFields = selectedFields));
    }
    save() {
        this.activeModalRef.close(this.selectedFields);
    }
    cancel() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
    optionFormatter(field) {
        return field.name;
    }
    getSourceFieldId(field) {
        return field.fieldMapping.sourceFieldId;
    }
    getJoinFieldDefinitions(record, sourceType) {
        return map$1(record === null || record === void 0 ? void 0 : record.fieldDefinitions, (fieldDefinition) => {
            const joinFieldDefinition = cloneDeep(fieldDefinition);
            joinFieldDefinition.fieldMapping = {
                resourceType: RX_RECORD_DEFINITION.joinFieldMapping,
                sourceFieldId: fieldDefinition.id,
                source: sourceType
            };
            joinFieldDefinition.id = this.rxGuidService.generate('rx-');
            // Join record should not carry forward FTS properties from primary and secondary record.
            if (joinFieldDefinition.searchDefinition) {
                joinFieldDefinition.searchDefinition = null;
            }
            delete joinFieldDefinition.lastUpdateTime;
            return joinFieldDefinition;
        });
    }
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}
AddJoinFieldsEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AddJoinFieldsEditorComponent, deps: [{ token: i2.TranslateService }, { token: i1$1.RxGuidService }, { token: i3$1.RxRecordDefinitionService }, { token: i3.ActiveModalRef }, { token: i2$1.RxDefinitionNameService }, { token: i3$1.RxFieldDefinitionService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
AddJoinFieldsEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: AddJoinFieldsEditorComponent, selector: "rx-add-join-fields-editor", usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"vm$ | async as vm\">\n  <div class=\"modal-body d-flex flex-column mh-100\">\n    <div>\n      <adapt-alert *ngIf=\"vm.hasDuplicates\" class=\"mb-3\" [config]=\"alertConfig\"></adapt-alert>\n    </div>\n\n    <label>{{ selectLabel }}</label>\n\n    <div class=\"d-flex flex-row select-container\">\n      <adapt-rx-select\n        rx-id=\"primary-fields\"\n        class=\"d-flex flex-column h-100\"\n        *ngIf=\"vm.primaryAvailableFields\"\n        [inline]=\"true\"\n        [multiple]=\"true\"\n        [options]=\"vm.primaryAvailableFields\"\n        [optionFormatter]=\"optionFormatter\"\n        [selectAllButton]=\"true\"\n        [deselectAllButton]=\"true\"\n        [texts]=\"selectTexts\"\n        [popupMaxHeight]=\"'100%'\"\n        [formControl]=\"primarySelectedFieldsFormControl\"\n        enableFilter=\"true\"\n        [label]=\"'com.bmc.arsys.rx.client.record-designer.definition-properties.primary.label' | translate\"\n      >\n      </adapt-rx-select>\n\n      <adapt-rx-select\n        rx-id=\"secondary-fields\"\n        class=\"ml-3 d-flex flex-column h-100\"\n        *ngIf=\"vm.secondaryAvailableFields\"\n        [inline]=\"true\"\n        [multiple]=\"true\"\n        [options]=\"vm.secondaryAvailableFields\"\n        [optionFormatter]=\"optionFormatter\"\n        [selectAllButton]=\"true\"\n        [deselectAllButton]=\"true\"\n        [texts]=\"selectTexts\"\n        [popupMaxHeight]=\"'100%'\"\n        [formControl]=\"secondarySelectedFieldsFormControl\"\n        enableFilter=\"true\"\n        [label]=\"'com.bmc.arsys.rx.client.record-designer.definition-properties.secondary.label' | translate\"\n      >\n      </adapt-rx-select>\n    </div>\n  </div>\n\n  <div class=\"modal-footer\">\n    <button\n      adapt-button\n      type=\"button\"\n      btn-type=\"primary\"\n      rx-id=\"save-button\"\n      [disabled]=\"vm.selectedFields.length === 0\"\n      (click)=\"save()\"\n    >\n      {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n    </button>\n\n    <button adapt-button type=\"button\" btn-type=\"secondary\" (click)=\"cancel()\" rx-id=\"cancel-button\">\n      {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n    </button>\n  </div>\n</ng-container>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:flex;flex-direction:column;position:relative;height:100%}:host .modal-body{height:645px!important}:host ::ng-deep adapt-rx-select{width:100%;max-width:400px}:host ::ng-deep adapt-rx-select .rx-select__options-wrapper{flex:1 1 auto;overflow-y:auto;overflow-x:hidden;height:625px}.select-container{overflow:auto}\n"], components: [{ type: i3.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i3.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i3.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }], pipes: { "async": i5.AsyncPipe, "translate": i2.TranslatePipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AddJoinFieldsEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-add-join-fields-editor',
                    templateUrl: './add-join-fields-editor.component.html',
                    styleUrls: ['./add-join-fields-editor.component.scss'],
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i2.TranslateService }, { type: i1$1.RxGuidService }, { type: i3$1.RxRecordDefinitionService }, { type: i3.ActiveModalRef }, { type: i2$1.RxDefinitionNameService }, { type: i3$1.RxFieldDefinitionService }, { type: i0.Injector }]; } });

class RecordDesignerComponent {
    constructor(store$, rxNotificationService, rxOverlayService, rxRecordDefinitionValidatorService, rxRecordDesignerInspectorService, rxDefinitionNameService, rxFieldDefinitionManagerService, rxRecordDefinitionService, rxGlobalCacheService, translateService, datePipe, rxModalService, rxFieldDefinitionService, rxRecordDesignerService, rxExpressionEditorService, rxRecordDefinitionCacheService, rxGuidService, injector) {
        this.store$ = store$;
        this.rxNotificationService = rxNotificationService;
        this.rxOverlayService = rxOverlayService;
        this.rxRecordDefinitionValidatorService = rxRecordDefinitionValidatorService;
        this.rxRecordDesignerInspectorService = rxRecordDesignerInspectorService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxFieldDefinitionManagerService = rxFieldDefinitionManagerService;
        this.rxRecordDefinitionService = rxRecordDefinitionService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.translateService = translateService;
        this.datePipe = datePipe;
        this.rxModalService = rxModalService;
        this.rxFieldDefinitionService = rxFieldDefinitionService;
        this.rxRecordDesignerService = rxRecordDesignerService;
        this.rxExpressionEditorService = rxExpressionEditorService;
        this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
        this.rxGuidService = rxGuidService;
        this.injector = injector;
        this.definitionSaved = new EventEmitter();
        this.definitionErrorLoading = new EventEmitter();
        this.closeDesigner = new EventEmitter();
        this.newTitle = `<${this.translateService.instant('com.bmc.arsys.rx.client.record-designer.new-record.title')}>`;
        this.definition = null;
        this.isInheritColumnHidden = true;
        this.isJoinRecordDefinition = false;
        this.dataTypes = [
            RX_RECORD_DEFINITION.dataTypes.attachment,
            RX_RECORD_DEFINITION.dataTypes.boolean,
            RX_RECORD_DEFINITION.dataTypes.character,
            RX_RECORD_DEFINITION.dataTypes.dateOnly,
            RX_RECORD_DEFINITION.dataTypes.dateTime,
            RX_RECORD_DEFINITION.dataTypes.localizedCharacter,
            RX_RECORD_DEFINITION.dataTypes.timeOnly,
            RX_RECORD_DEFINITION.dataTypes.integer,
            RX_RECORD_DEFINITION.dataTypes.selection,
            RX_RECORD_DEFINITION.dataTypes.decimal,
            RX_RECORD_DEFINITION.dataTypes.real
        ].sort((a, b) => a.displayName.localeCompare(b.displayName));
        this.inspectorTabIndexSubject = new Subject();
        this.inspectorTabIndex$ = this.store$.select(inspectorTabIndexSelector);
        this.selectedFieldGuid$ = this.store$.select(selectedFieldGuidSelector);
        this.destroyed$ = new ReplaySubject(1);
        this.inspectorFocusEditorSubject = new Subject();
        this.inspectorFocusEditor$ = this.inspectorFocusEditorSubject.asObservable();
        this.bundleId$ = this.store$.select(bundleIdSelector);
        this.isDesignMode$ = this.store$.select(isDesignModeSelector);
        this.definitionModel$ = this.store$.select(definitionModelSelector);
        this.isDirty$ = this.store$.select(isDirtySelector);
        this.bundleFriendlyName$ = this.bundleId$.pipe(switchMap((bundleId) => this.rxGlobalCacheService.getBundleFriendlyName(bundleId)));
        this.definitionDisplayName$ = this.definitionModel$.pipe(map((updatedModel) => this.rxDefinitionNameService.getDisplayName(updatedModel.name)), startWith(null));
        this.definitionModelFromDefinition$ = this.store$
            .select(definitionModelFromDefinitionSelector)
            .pipe(shareReplay(1));
        this.primaryRecordDefinition$ = this.definitionModelFromDefinition$.pipe(pluck('primaryRecordDefinitionName'), distinctUntilChanged(), filter(Boolean), switchMap((primaryRecordDefinitionName) => this.rxRecordDefinitionCacheService.getRecordDefinition(primaryRecordDefinitionName)));
        this.secondaryRecordDefinition$ = this.definitionModelFromDefinition$.pipe(pluck('secondaryRecordDefinitionName'), distinctUntilChanged(), filter(Boolean), switchMap((secondaryRecordDefinitionName) => this.rxRecordDefinitionCacheService.getRecordDefinition(secondaryRecordDefinitionName)));
        this.joinRecordDataDictionary$ = combineLatest([
            this.primaryRecordDefinition$,
            this.secondaryRecordDefinition$
        ]).pipe(map(([primaryRecordDefinition, secondaryRecordDefinition]) => [
            {
                recordDefinitionName: this.rxDefinitionNameService.getDisplayName(primaryRecordDefinition.name),
                label: `(${this.translateService.instant('com.bmc.arsys.rx.innovation-studio.join-record-wizard.join-criteria.primary.label')})`,
                type: RX_RECORD_DEFINITION.sourceRecordTypes.primary,
                fieldDefinitions: primaryRecordDefinition.fieldDefinitions
            },
            {
                recordDefinitionName: this.rxDefinitionNameService.getDisplayName(secondaryRecordDefinition.name),
                label: `(${this.translateService.instant('com.bmc.arsys.rx.innovation-studio.join-record-wizard.join-criteria.secondary.label')})`,
                type: RX_RECORD_DEFINITION.sourceRecordTypes.secondary,
                fieldDefinitions: secondaryRecordDefinition.fieldDefinitions
            }
        ]), map((records) => {
            return records.map((record) => ({
                label: `${record.recordDefinitionName} ${record.label}`,
                expanded: true,
                children: chain(record.fieldDefinitions)
                    .map((fieldDefinition) => {
                    if (fieldDefinition.resourceType !== RX_RECORD_DEFINITION.dataTypes.attachment.resourceType) {
                        return {
                            label: `${record.recordDefinitionName}.${fieldDefinition.name}`,
                            icon: 'd-icon-field_text',
                            expression: `\${${record.recordDefinitionName}.${record.type}.${fieldDefinition.name}}`
                        };
                    }
                })
                    .compact()
                    .sortBy((item) => item.label.toLocaleLowerCase())
                    .value()
            }));
        }));
        this.isNewDefinition$ = this.definitionModelFromDefinition$.pipe(map((definitionModel) => !Boolean(definitionModel.lastUpdateTime)));
        this.isJoinRecordDefinition$ = this.definitionModelFromDefinition$.pipe(map((definitionModel) => this.rxRecordDefinitionService.isJoinRecord(definitionModel)), shareReplay(1));
        this.definitionFromDefinitionModel$ = combineLatest([
            this.definitionModel$,
            this.bundleId$
        ]).pipe(map(([definitionModel, bundleId]) => this.rxRecordDesignerService.getDefinitionFromDefinitionModel(definitionModel, bundleId)));
        this.isFieldsCustomizationAllowed$ = this.definitionFromDefinitionModel$.pipe(map((recordDefinition) => this.rxOverlayService.isCustomizationEnabled('allowFieldsOverlay', recordDefinition)), distinctUntilChanged(), shareReplay(1));
        this.isPropertiesCustomizationAllowed$ = this.definitionFromDefinitionModel$.pipe(map((recordDefinition) => this.rxOverlayService.isCustomizationEnabled('allowOtherPropertiesOverlay', recordDefinition)), distinctUntilChanged(), shareReplay(1));
        this.isPermissionsCustomizationAllowed$ = this.definitionFromDefinitionModel$.pipe(map((recordDefinition) => this.rxOverlayService.isCustomizationEnabled('allowPermissionsOverlay', recordDefinition)), distinctUntilChanged(), shareReplay(1));
        this.isIndexCustomizationAllowed$ = this.definitionFromDefinitionModel$.pipe(map((recordDefinition) => this.rxOverlayService.isCustomizationEnabled('allowIndexesOverlay', recordDefinition)), distinctUntilChanged(), shareReplay(1));
        this.areNewDefinitionsAllowed$ = this.bundleId$.pipe(switchMap((bundleId) => this.rxOverlayService.areNewDefinitionsAllowed(bundleId)));
        this.isReadOnly$ = this.definitionFromDefinitionModel$.pipe(filter((definition) => !!definition.lastUpdateTime), withLatestFrom(this.areNewDefinitionsAllowed$, this.isFieldsCustomizationAllowed$, this.isPropertiesCustomizationAllowed$, this.isPermissionsCustomizationAllowed$, this.isIndexCustomizationAllowed$), map(([definition, areNewDefinitionsAllowed, isFieldsCustomizationAllowed, isPropertiesCustomizationAllowed, isPermissionsCustomizationAllowed, isIndexCustomizationAllowed]) => !areNewDefinitionsAllowed ||
            (!isFieldsCustomizationAllowed &&
                !isPropertiesCustomizationAllowed &&
                !isPermissionsCustomizationAllowed &&
                !isIndexCustomizationAllowed)), tap((isReadOnly) => {
            if (isReadOnly) {
                this.rxNotificationService.addWarningMessage(this.translateService.instant('com.bmc.arsys.rx.client.designer.read-only-definition-warning.message'));
            }
        }), startWith(false), shareReplay(1));
        this.definitionInspectorConfig$ = combineLatest([
            this.isNewDefinition$,
            this.definitionModel$,
            this.definitionModelFromDefinition$,
            this.bundleId$,
            this.isPropertiesCustomizationAllowed$,
            this.isIndexCustomizationAllowed$,
            this.isPermissionsCustomizationAllowed$,
            this.isFieldsCustomizationAllowed$,
            this.isReadOnly$
        ]).pipe(map(([isNewDefinition, definitionModel, definitionModelFromDefinition, bundleId, isPropertiesCustomizationAllowed, isIndexCustomizationAllowed, isPermissionsCustomizationAllowed, isFieldsCustomizationAllowed, isReadOnly]) => this.rxRecordDesignerInspectorService.getDefinitionInspectorConfig(isNewDefinition, definitionModel, definitionModelFromDefinition, bundleId, isPropertiesCustomizationAllowed, isIndexCustomizationAllowed, isPermissionsCustomizationAllowed, isFieldsCustomizationAllowed, isReadOnly, this.expressionConfigurator)));
        this.fieldGridRows$ = this.definitionModel$.pipe(map((model) => model.fields.map((field) => {
            var _a, _b;
            const invertedSourceRecordTypes = invert(RX_RECORD_DEFINITION.sourceRecordTypes);
            const type = invertedSourceRecordTypes[(_a = field.fieldMapping) === null || _a === void 0 ? void 0 : _a.source];
            return {
                guid: field.guid,
                name: field.name,
                id: isNumber(field.id) ? field.id : '',
                isInherited: field.isInherited,
                fieldOption: field.fieldOption,
                defaultValue: field.resourceType === RX_RECORD_DEFINITION.resourceTypes.selection
                    ? (_b = field.selectionFieldOptionProperties.optionNamesById) === null || _b === void 0 ? void 0 : _b[field.selectionFieldOptionProperties.defaultValue]
                    : field.resourceType === RX_RECORD_DEFINITION.resourceTypes.dateOnly
                        ? this.datePipe.transform(field.defaultValue)
                        : field.resourceType === RX_RECORD_DEFINITION.resourceTypes.dateTime
                            ? this.datePipe.transform(field.defaultValue, 'medium')
                            : field.defaultValue,
                resourceType: this.translateService.instant(find(RX_RECORD_DEFINITION.dataTypes, { resourceType: field.resourceType }).labelKey),
                isCoreField: this.rxFieldDefinitionService.isCoreField(field),
                sourceRecord: includes(RX_RECORD_DEFINITION.joinRecordDefinitionCoreFieldIds, field.id)
                    ? ''
                    : this.translateService.instant('com.bmc.arsys.rx.client.record-designer.grid.column.source-record.label', {
                        recordName: this.rxDefinitionNameService.getDisplayName(model[type + 'RecordDefinitionName']),
                        recordType: capitalize(type)
                    })
            };
        })));
        this.isExternalRecordDefinition$ = this.definitionModel$.pipe(map((definitionModel) => this.rxRecordDefinitionService.isExternalRecord(definitionModel)));
        this.selectedFieldGridRows$ = this.selectedFieldGuid$.pipe(withLatestFrom(this.fieldGridRows$), map(([guid, fieldGridRows]) => (guid ? [find(fieldGridRows, { guid })] : [])), startWith([]));
        this.selectedFieldModel$ = combineLatest([
            this.selectedFieldGuid$,
            this.definitionModel$
        ]).pipe(map(([guid, definitionModel]) => find(definitionModel.fields, { guid })), startWith(null), shareReplay(1));
        this.selectedFieldInspectorConfig$ = this.selectedFieldModel$.pipe(withLatestFrom(this.definitionModel$, this.isReadOnly$), map(([fieldModel, definitionModel, isReadOnly]) => fieldModel
            ? this.rxFieldDefinitionManagerService.getFieldInspectorConfig(fieldModel, definitionModel, isReadOnly)
            : null));
        this.isJoinOrExternalRecord$ = combineLatest([
            this.isJoinRecordDefinition$,
            this.isExternalRecordDefinition$
        ]).pipe(map(([isJoinRecordDefinition, isExternalRecordDefinition]) => isJoinRecordDefinition || isExternalRecordDefinition));
        this.validationIssues$ = this.definitionModel$.pipe(map((definitionModel) => this.rxRecordDefinitionValidatorService.validate(definitionModel)));
        this.hasValidationErrors$ = this.validationIssues$.pipe(map((issueSections) => some(issueSections, {
            issues: [{ type: ValidationIssueType.Error }]
        })), distinctUntilChanged());
        this.hasValidationWarnings$ = this.validationIssues$.pipe(map((issueSections) => some(issueSections, {
            issues: [{ type: ValidationIssueType.Warning }]
        })), distinctUntilChanged());
        this.isSaveButtonDisabled$ = combineLatest([
            this.hasValidationErrors$,
            this.isDirty$,
            this.isReadOnly$
        ]).pipe(map(([hasValidationErrors, isDirty, isReadOnly]) => hasValidationErrors || !isDirty || isReadOnly), startWith(true));
        this.breadcrumbItems$ = combineLatest([
            this.definitionDisplayName$,
            this.selectedFieldModel$
        ]).pipe(map(([definitionDisplayName, selectedFieldModel]) => {
            var _a;
            return [
                {
                    data: null,
                    label: this.rxDefinitionNameService.getDisplayName((_a = this.definition) === null || _a === void 0 ? void 0 : _a.name) || definitionDisplayName || this.newTitle
                },
                { data: null, label: selectedFieldModel === null || selectedFieldModel === void 0 ? void 0 : selectedFieldModel.name }
            ].filter((item) => item.label);
        }));
        this.definitionForJsonViewer$ = this.isDesignMode$.pipe(switchMap((isDesignMode) => (isDesignMode ? of(null) : this.definitionFromDefinitionModel$)));
        this.overriddenRecordProperties$ = combineLatest([
            this.definitionModelFromDefinition$,
            this.definitionModel$
        ]).pipe(scan((acc, [definitionModelFromDefinition, definitionModel]) => {
            const overriddenRecordFields = intersectionBy(definitionModelFromDefinition.fields, definitionModel.recordInheritanceSelector.inheritedFieldDefinitions, 'id');
            acc = Object.assign(Object.assign({}, acc), { fields: map$1(overriddenRecordFields, 'name').join(', ') });
            return acc;
        }, {}));
        this.isDeleteFieldButtonDisabled$ = this.selectedFieldModel$.pipe(withLatestFrom(this.definitionModel$), map(([selectedFieldModel, definitionModel]) => !selectedFieldModel ||
            definitionModel.isAuditRecordDefinition ||
            this.rxFieldDefinitionService.isCoreField(selectedFieldModel) ||
            selectedFieldModel.isInherited ||
            !this.rxFieldDefinitionService.isFieldInUserOverlay(selectedFieldModel)));
        this.isCopyFieldButtonDisabled$ = this.selectedFieldModel$.pipe(withLatestFrom(this.isFieldsCustomizationAllowed$, this.bundleId$), map(([selectedFieldModel, isFieldsCustomizationAllowed, bundleId]) => !selectedFieldModel ||
            this.rxFieldDefinitionService.isCoreField(selectedFieldModel) ||
            selectedFieldModel.isInherited ||
            !isFieldsCustomizationAllowed ||
            !this.rxOverlayService.isBundleEditable(bundleId)));
        this.expressionConfigurator = new RecordDesignerExpressionConfigurator(this.injector);
        this.dataDictionary$ = this.definitionModelFromDefinition$.pipe(withLatestFrom(this.store$.select(bundleIdSelector)), takeUntil(this.destroyed$), switchMap(([definitionModel, bundleId]) => this.expressionConfigurator.recordExpressionDataDictionary(definitionModel, bundleId)));
        this.isInheritColumnHidden$ = this.definitionModel$.pipe(map((definitionModel) => { var _a; return isEmpty((_a = definitionModel.recordInheritanceSelector) === null || _a === void 0 ? void 0 : _a.inheritedFieldDefinitions); }), distinctUntilChanged(), startWith(true));
        this.vm$ = combineLatest([
            this.breadcrumbItems$,
            this.bundleFriendlyName$,
            this.definitionDisplayName$,
            this.definitionInspectorConfig$,
            this.definitionModel$,
            this.hasValidationErrors$,
            this.hasValidationWarnings$,
            this.validationIssues$,
            this.isSaveButtonDisabled$,
            this.fieldGridRows$,
            this.selectedFieldGridRows$,
            this.definitionForJsonViewer$,
            this.isDesignMode$,
            this.selectedFieldModel$,
            this.selectedFieldInspectorConfig$,
            this.selectedFieldGuid$,
            this.isFieldsCustomizationAllowed$,
            this.isDeleteFieldButtonDisabled$,
            this.isCopyFieldButtonDisabled$,
            this.isJoinOrExternalRecord$,
            this.isReadOnly$
        ]).pipe(map(([breadcrumbItems, bundleFriendlyName, definitionDisplayName, definitionInspectorConfig, definitionModel, hasValidationErrors, hasValidationWarnings, validationIssues, isSaveButtonDisabled, fieldGridRows, selectedFieldGridRows, definitionForJsonViewer, isDesignMode, selectedFieldModel, selectedFieldInspectorConfig, selectedFieldGuid, isFieldsCustomizationAllowed, isDeleteFieldButtonDisabled, isCopyFieldButtonDisabled, isJoinOrExternalRecord, isReadOnly]) => ({
            breadcrumbItems,
            bundleFriendlyName,
            definitionDisplayName,
            definitionInspectorConfig,
            definitionModel,
            hasValidationErrors,
            hasValidationWarnings,
            validationIssues,
            isSaveButtonDisabled,
            fieldGridRows,
            selectedFieldGridRows,
            definitionForJsonViewer,
            isDesignMode,
            selectedFieldModel,
            selectedFieldInspectorConfig,
            selectedFieldGuid,
            isFieldsCustomizationAllowed,
            isDeleteFieldButtonDisabled,
            isCopyFieldButtonDisabled,
            isJoinOrExternalRecord,
            isReadOnly
        })));
        this.rxRecordDefinitionCacheService.registerConsumer(this.destroyed$);
    }
    ngOnInit() {
        this.inspectorTabIndex$.pipe(skip(1), takeUntil(this.destroyed$)).subscribe((inspectorTabIndex) => {
            if (!isNull(inspectorTabIndex)) {
                this.adaptSidebarComponent.openPanel(inspectorTabIndex);
            }
        });
        this.inspectorTabIndexSubject.pipe(skip(1), takeUntil(this.destroyed$)).subscribe((inspectorTabIndex) => {
            this.store$.dispatch(setInspectorTabIndex({ inspectorTabIndex }));
        });
        this.store$
            .select(savedDefinitionNameSelector)
            .pipe(skip(1), takeUntil(this.destroyed$))
            .subscribe((savedDefinitionName) => {
            this.definitionSaved.emit(savedDefinitionName);
        });
        this.expressionConfigurator.configureForProperty({
            propertyPath: RX_RECORD_DESIGNER.archiveDataCriteriaPath,
            dataDictionary$: this.dataDictionary$,
            operators: ExpressionOperatorRowsByGroup.get(ExpressionOperatorGroup.All)
        });
        this.expressionConfigurator.configureForProperty({
            propertyPath: RX_RECORD_DESIGNER.joinCriteriaPath,
            dataDictionary$: this.joinRecordDataDictionary$,
            operators: ExpressionOperatorRowsByGroup.get(ExpressionOperatorGroup.All)
        });
        combineLatest([this.isInheritColumnHidden$, this.isJoinRecordDefinition$])
            .pipe(takeUntil(this.destroyed$))
            .subscribe(([isInheritColumnHidden, isJoinRecordDefinition]) => {
            this.isInheritColumnHidden = isInheritColumnHidden;
            this.isJoinRecordDefinition = isJoinRecordDefinition;
        });
        this.columns = [
            {
                field: 'name',
                header: this.translateService.instant('com.bmc.arsys.rx.client.common.field-name.label')
            },
            {
                field: 'sourceRecord',
                header: this.translateService.instant('Source Record'),
                hidden: () => !this.isJoinRecordDefinition
            },
            {
                field: 'id',
                header: this.translateService.instant('com.bmc.arsys.rx.client.common.field-id.label')
            },
            {
                field: 'isInherited',
                header: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.grid.column.inherited.title'),
                hidden: () => this.isInheritColumnHidden,
                cellTemplate: this.inheritedCellTemplate
            },
            {
                field: 'resourceType',
                header: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.grid.column.data-type.title'),
                cellTemplate: this.dataTypeCellTemplate
            },
            {
                field: 'fieldOption',
                header: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.grid.column.is-required-field.title'),
                cellTemplate: this.requiredCellTemplate
            },
            {
                field: 'defaultValue',
                header: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.grid.column.default-value.title')
            }
        ];
    }
    ngOnChanges(changes) {
        if (changes.configuration.currentValue) {
            this.store$.dispatch(init({ payload: this.configuration }));
        }
    }
    onEditorEvent(event) {
        if (event.type === RX_EXPRESSION_EDITOR.events.openExpressionEditor &&
            event.payload.propertyPath === RX_RECORD_DESIGNER.archiveDataCriteriaPath) {
            this.definitionModel$.pipe(take(1)).subscribe((definitionModel) => {
                this.rxExpressionEditorService
                    .openEditor({
                    property: {
                        path: RX_RECORD_DESIGNER.archiveDataCriteriaPath,
                        value: definitionModel.archiveDataCriteria,
                        label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.record-filter.label')
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
                        definitionModelFromDesigner: { archiveDataCriteria: expression.value }
                    }));
                });
            });
        }
        if (event.type === RX_EXPRESSION_EDITOR.events.openExpressionEditor &&
            event.payload.propertyPath === RX_RECORD_DESIGNER.joinCriteriaPath) {
            this.definitionModel$.pipe(take(1)).subscribe((definitionModel) => {
                this.rxExpressionEditorService
                    .openEditor({
                    property: {
                        path: RX_RECORD_DESIGNER.joinCriteriaPath,
                        value: definitionModel.joinCriteria,
                        label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.join-record-wizard.join-criteria.on-statement.label')
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
                        definitionModelFromDesigner: { joinCriteria: expression.value }
                    }));
                });
            });
        }
    }
    onSelectionChange(selectedFieldModel) {
        this.store$.dispatch(setSelectedFieldGuid({ guid: selectedFieldModel === null || selectedFieldModel === void 0 ? void 0 : selectedFieldModel.guid }));
    }
    onDefinitionModelChange(newDefinitionModel) {
        this.store$.dispatch(updateDefinitionModelFromDesigner({
            definitionModelFromDesigner: newDefinitionModel
        }));
    }
    onSelectedFieldModelChange(newSelectedFieldModel) {
        this.store$.dispatch(updateSelectedFieldModel({ selectedFieldModel: newSelectedFieldModel }));
    }
    toggleDesignMode() {
        this.store$.dispatch(toggleDesignMode());
    }
    onSidebarToggle(event) {
        this.inspectorTabIndexSubject.next(event.id);
    }
    addNewField(resourceType) {
        this.store$.dispatch(createNewFieldModel({ resourceType: resourceType }));
    }
    openAddNewField() {
        this.definitionModel$.pipe(take(1)).subscribe((definitionModel) => {
            this.rxModalService
                .openModal({
                title: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.add-fields.title'),
                content: AddJoinFieldsEditorComponent,
                size: 'rx-md',
                blockKeyboard: false,
                data: {
                    primaryRecordDefinitionName: definitionModel.primaryRecordDefinitionName,
                    secondaryRecordDefinitionName: definitionModel.secondaryRecordDefinitionName,
                    addedFields: definitionModel.fields
                }
            })
                .then((fieldModels) => {
                const newFieldModels = fieldModels.map((newField) => (Object.assign(Object.assign({}, newField), { guid: this.rxGuidService.generate(), id: null, defaultValueByLocale: {}, selectionFieldOptionProperties: newField.resourceType === RX_RECORD_DEFINITION.dataTypes.selection.resourceType
                        ? {
                            defaultValue: newField.defaultValue,
                            optionNamesById: newField.optionNamesById,
                            optionLabelsById: newField.optionLabelsById
                        }
                        : null })));
                this.store$.dispatch(addNewFieldModels({ newFieldModels: newFieldModels }));
            })
                .catch(noop);
        });
    }
    copySelectedField() {
        this.store$.dispatch(copySelectedField());
    }
    deleteSelectedField() {
        this.store$.dispatch(deleteSelectedField());
    }
    onBreadcrumbSelected() {
        this.store$.dispatch(clearSelectedFieldGuid());
    }
    canDeactivate() {
        let canDeactivate = true;
        this.isDirty$.pipe(take(1)).subscribe((isDirty) => {
            canDeactivate = !isDirty;
        });
        return canDeactivate;
    }
    saveDefinition() {
        combineLatest([this.definitionFromDefinitionModel$, this.isNewDefinition$, this.overriddenRecordProperties$])
            .pipe(take(1), switchMap(([definition, isNewDefinition, overriddenRecordProperties]) => {
            if (isNewDefinition) {
                return this.rxRecordDefinitionService.create(definition);
            }
            else if (!isNewDefinition && !isEmpty(overriddenRecordProperties.fields)) {
                return from(this.rxModalService.openModal({
                    title: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.inheritance-issue-modal.title'),
                    content: InheritanceIssueInfoComponent,
                    data: { overriddenRecordProperties },
                    size: 'sm'
                })).pipe(filter((result) => result === 'continue'), switchMap(() => this.rxRecordDefinitionService.update(definition)));
            }
            else {
                return this.rxRecordDefinitionService.update(definition);
            }
        }), withLatestFrom(this.store$.select(definitionModelSelector), this.store$.select(bundleIdSelector)))
            .subscribe(([response, definitionModel, bundleId]) => {
            this.store$.dispatch(saveDefinitionSuccess({
                savedDefinitionName: `${bundleId}:${definitionModel.name}`
            }));
        });
    }
    onCorrectIssue(validationIssue) {
        if (validationIssue.data.guid) {
            this.store$.dispatch(setSelectedFieldGuid({ guid: validationIssue.data.guid }));
        }
        else {
            this.store$.dispatch(setInspectorTabIndex({ inspectorTabIndex: 0 }));
        }
        setTimeout(() => this.inspectorFocusEditorSubject.next({
            editorName: validationIssue.data.propertyName,
            data: validationIssue.data
        }), 10);
    }
    onFormInitialized() {
        this.inspectorFocusEditorSubject.next({
            editorName: 'name',
            data: {}
        });
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
        this.inspectorTabIndexSubject.complete();
        this.inspectorFocusEditorSubject.complete();
        this.store$.dispatch(destroy());
    }
}
RecordDesignerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDesignerComponent, deps: [{ token: i1$2.Store }, { token: i2$1.RxNotificationService }, { token: i2$1.RxOverlayService }, { token: RxRecordDefinitionValidatorService }, { token: RxRecordDesignerInspectorService }, { token: i2$1.RxDefinitionNameService }, { token: RxFieldDefinitionManagerService }, { token: i3$1.RxRecordDefinitionService }, { token: i2$1.RxGlobalCacheService }, { token: i2.TranslateService }, { token: i5.DatePipe }, { token: i1.RxModalService }, { token: i3$1.RxFieldDefinitionService }, { token: RxRecordDesignerService }, { token: i11.RxExpressionEditorService }, { token: i3$1.RxRecordDefinitionCacheService }, { token: i1$1.RxGuidService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
RecordDesignerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RecordDesignerComponent, selector: "rx-record-designer", inputs: { configuration: "configuration" }, outputs: { definitionSaved: "definitionSaved", definitionErrorLoading: "definitionErrorLoading", closeDesigner: "closeDesigner" }, viewQueries: [{ propertyName: "adaptSidebarComponent", first: true, predicate: AdaptSidebarComponent, descendants: true }, { propertyName: "requiredCellTemplate", first: true, predicate: ["requiredCellTemplate"], descendants: true, static: true }, { propertyName: "dataTypeCellTemplate", first: true, predicate: ["dataTypeCellTemplate"], descendants: true, static: true }, { propertyName: "inheritedCellTemplate", first: true, predicate: ["inheritedCellTemplate"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: "<ng-container class=\"p-0\" *ngIf=\"vm$ | async as vm\">\n  <rx-designer-header\n    [bundleName]=\"vm.bundleFriendlyName\"\n    [isSaveButtonDisabled]=\"vm.isSaveButtonDisabled\"\n    (save)=\"saveDefinition()\"\n    (closeDesigner)=\"closeDesigner.emit()\"\n    [breadcrumbItems]=\"vm.breadcrumbItems\"\n    (breadcrumbSelected)=\"onBreadcrumbSelected()\"\n    (toggleDesignMode)=\"toggleDesignMode()\"\n    [isDesignMode]=\"vm.isDesignMode\"\n  ></rx-designer-header>\n\n  <adapt-sidebar\n    [openedId]=\"0\"\n    [adjustMainContainerWidth]=\"true\"\n    position=\"right\"\n    class=\"h-100\"\n    [hidden]=\"vm.definitionForJsonViewer\"\n    (isPanelOpenedCurrently)=\"onSidebarToggle($event)\"\n  >\n    <adapt-sidebar-item\n      iconClass=\"d-icon-pencil\"\n      [headerTitle]=\"'com.bmc.arsys.rx.client.common.properties.label' | translate\"\n      [tooltipText]=\"'com.bmc.arsys.rx.client.common.properties.label' | translate\"\n    >\n      <rx-form-builder\n        [config]=\"vm.definitionInspectorConfig\"\n        [model]=\"vm.definitionModel\"\n        [focusEditor$]=\"inspectorFocusEditor$\"\n        (modelChange)=\"onDefinitionModelChange($event)\"\n        (formInitialized)=\"onFormInitialized()\"\n        (editorEvent)=\"onEditorEvent($event)\"\n      ></rx-form-builder>\n    </adapt-sidebar-item>\n\n    <adapt-sidebar-item\n      iconClass=\"d-icon-gear\"\n      [headerTitle]=\"'com.bmc.arsys.rx.client.common.settings.label' | translate\"\n      [tooltipText]=\"'com.bmc.arsys.rx.client.common.settings.label' | translate\"\n    >\n      <rx-form-builder\n        [config]=\"vm.selectedFieldInspectorConfig\"\n        [model]=\"vm.selectedFieldModel\"\n        (modelChange)=\"onSelectedFieldModelChange($event)\"\n        [guid]=\"vm.selectedFieldGuid\"\n        [focusEditor$]=\"inspectorFocusEditor$\"\n      ></rx-form-builder>\n\n      <adapt-alert\n        [hidden]=\"vm.selectedFieldModel\"\n        class=\"p-3\"\n        [config]=\"{\n          content: 'com.bmc.arsys.rx.client.designer.validation.no-field-selected.message' | translate,\n          variant: 'info',\n          type: 'inline'\n        }\"\n      ></adapt-alert>\n    </adapt-sidebar-item>\n\n    <adapt-sidebar-item\n      [iconClass]=\"\n        vm.hasValidationErrors\n          ? 'd-icon-exclamation_triangle text-danger'\n          : vm.hasValidationWarnings\n          ? 'd-icon-exclamation_triangle text-warning-icon'\n          : 'd-icon-exclamation_triangle'\n      \"\n      headerTitle=\"{{ 'com.bmc.arsys.rx.client.designer.validation-issues.label' | translate }}\"\n      tooltipText=\"{{ 'com.bmc.arsys.rx.client.designer.validation-issues.label' | translate }}\"\n    >\n      <rx-validation-issues\n        (correctIssue)=\"onCorrectIssue($event)\"\n        [issueSections]=\"vm.validationIssues\"\n        [definitionTypeDisplayName]=\"'com.bmc.arsys.rx.client.record-definition.label' | translate\"\n      ></rx-validation-issues>\n    </adapt-sidebar-item>\n\n    <div class=\"main h-100 d-flex flex-column\">\n      <h1 class=\"mt-0 mb-2\">\n        {{ (configuration.definitionName | rxDefinitionNamePipe) || vm.definitionDisplayName || newTitle }}\n      </h1>\n\n      <div *ngIf=\"vm.isJoinOrExternalRecord\" class=\"d-flex border border-bottom-0\">\n        <button\n          adapt-button\n          type=\"button\"\n          btn-type=\"tertiary\"\n          class=\"d-icon-plus_circle align-self-start\"\n          rx-id=\"new-field-button\"\n          (click)=\"openAddNewField()\"\n          [disabled]=\"vm.isReadOnly\"\n        >\n          {{ 'com.bmc.arsys.rx.client.common.new.label' | translate }}\n        </button>\n\n        <button\n          adapt-button\n          btn-type=\"tertiary\"\n          type=\"button\"\n          class=\"d-icon-trash\"\n          rx-id=\"delete-field-button\"\n          (click)=\"deleteSelectedField()\"\n          [disabled]=\"vm.isDeleteFieldButtonDisabled\"\n        >\n          {{ 'com.bmc.arsys.rx.client.common.delete.label' | translate }}\n        </button>\n      </div>\n\n      <div *ngIf=\"!vm.isJoinOrExternalRecord\" class=\"d-flex border border-bottom-0\">\n        <div class=\"dropdown\" adaptDropdown>\n          <button\n            adapt-button\n            type=\"button\"\n            adaptDropdownToggle\n            btn-type=\"tertiary\"\n            class=\"d-icon-plus_circle\"\n            rx-id=\"new-field-button\"\n          >\n            {{ 'com.bmc.arsys.rx.client.designer.new-field.button.label' | translate }}\n          </button>\n\n          <div class=\"dropdown-menu\" adaptDropdownMenu>\n            <button\n              *ngFor=\"let dataType of dataTypes\"\n              class=\"dropdown-item\"\n              (click)=\"addNewField(dataType.resourceType)\"\n              [attr.rx-id]=\"'field-data-type-' + dataType.shortName\"\n              [disabled]=\"!vm.isFieldsCustomizationAllowed || vm.isReadOnly\"\n            >\n              {{ dataType.displayName }}\n            </button>\n          </div>\n        </div>\n\n        <button\n          adapt-button\n          btn-type=\"tertiary\"\n          type=\"button\"\n          class=\"d-icon-trash\"\n          rx-id=\"delete-field-button\"\n          (click)=\"deleteSelectedField()\"\n          [disabled]=\"vm.isDeleteFieldButtonDisabled || vm.isReadOnly\"\n        >\n          {{ 'com.bmc.arsys.rx.client.common.delete.label' | translate }}\n        </button>\n\n        <button\n          adapt-button\n          btn-type=\"tertiary\"\n          type=\"button\"\n          class=\"d-icon-list_ordered\"\n          (click)=\"copySelectedField()\"\n          rx-id=\"copy-field-button\"\n          [disabled]=\"vm.isCopyFieldButtonDisabled || vm.isReadOnly\"\n        >\n          {{ 'com.bmc.arsys.rx.client.common.copy.label' | translate }}\n        </button>\n      </div>\n\n      <adapt-table\n        [value]=\"vm.fieldGridRows\"\n        [selection]=\"vm.selectedFieldGridRows\"\n        [columns]=\"columns\"\n        [scrollable]=\"true\"\n        scrollHeight=\"flex\"\n        [sortable]=\"true\"\n        [resizableColumns]=\"true\"\n        [bordered]=\"true\"\n        [filterable]=\"false\"\n        [dataKey]=\"'guid'\"\n        [disableRowSelection]=\"false\"\n        [selectionMode]=\"'single'\"\n        (selectionChange)=\"onSelectionChange($event)\"\n      >\n      </adapt-table>\n    </div>\n  </adapt-sidebar>\n\n  <adapt-code-viewer\n    *ngIf=\"vm.definitionForJsonViewer\"\n    [code]=\"vm.definitionForJsonViewer | json\"\n    [lang]=\"'javascript'\"\n    [hasToolbar]=\"false\"\n    [theme]=\"'light'\"\n    class=\"full-size\"\n  ></adapt-code-viewer>\n</ng-container>\n\n<ng-template #dataTypeCellTemplate let-dataItem=\"dataItem\">\n  <span\n    class=\"icon d-icon-lock pr-2\"\n    *ngIf=\"dataItem.isCoreField\"\n    [adaptPopover]=\"'com.bmc.arsys.rx.client.record-designer.core-field.tooltip' | translate\"\n  ></span>\n  {{ dataItem.resourceType }}\n</ng-template>\n\n<ng-template #requiredCellTemplate let-dataItem=\"dataItem\">\n  {{ dataItem.fieldOption | rxRecordDefinitionFieldOption }}\n</ng-template>\n\n<ng-template #inheritedCellTemplate let-dataItem=\"dataItem\">\n  <span *ngIf=\"dataItem.isInherited\" class=\"icon d-icon-check pr-2\"></span>\n</ng-template>\n\n<ng-template #sourceFieldCellTemplate let-dataItem=\"dataItem\">\n  {{ dataItem.sourceRecord }}\n</ng-template>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:flex;flex-direction:column;height:100%;width:100%}.rx-component-designer{display:flex;flex-grow:1;height:calc(100% - 50px);overflow:hidden}.rx-designer-container{display:flex;flex-direction:column;flex-grow:1;overflow:auto;padding:1rem}:host ::ng-deep adapt-sidebar .adapt-sidebar-wrapper{border-top:0}:host ::ng-deep adapt-sidebar .adapt-sidebar-wrapper .adapt-sidebar-panel-content{padding:0}:host ::ng-deep adapt-sidebar .adapt-sidebar-wrapper .card{border-left:0;border-right:0}\n"], components: [{ type: i11.RxDesignerHeaderComponent, selector: "rx-designer-header", inputs: ["bundleName", "breadcrumbItems", "isDesignMode", "isPreviewAvailable", "isSaveButtonDisabled"], outputs: ["breadcrumbSelected", "toggleDesignMode", "showPreview", "save", "closeDesigner"] }, { type: i3.AdaptSidebarComponent, selector: "adapt-sidebar", inputs: ["className", "navClassName", "panelWidth", "panel2Width", "position", "theme", "widthLimit", "openedId", "adjustMainContainerWidth"], outputs: ["openedIdChange", "isPanelOpenedCurrently"], exportAs: ["adaptSidebar"] }, { type: i3.AdaptSidebarItemComponent, selector: "adapt-sidebar-item", inputs: ["iconClass", "headerTitle", "tooltipText", "aria-label"] }, { type: i11.FormBuilderComponent, selector: "rx-form-builder", inputs: ["config", "model", "guid", "isReadOnly", "focusEditor$"], outputs: ["modelChange", "editorEvent", "formInitialized"] }, { type: i3.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i1.RxValidationIssuesComponent, selector: "rx-validation-issues", inputs: ["definitionTypeDisplayName", "issueSections"], outputs: ["correctIssue"] }, { type: i3.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i3.AdaptDropdownDirective, selector: "adapt-dropdown, [adaptDropdown]", inputs: ["autoClose", "customClass", "closeOnEscape", "placement", "animationPlacement", "holdFocusInMenu", "holdFocusOnOpen", "autoFocusFirst", "restoreFocusAfterClose", "focusNextElementAfterClose", "appendToBody", "appendTo", "positionTo", "anchorPositionTrackingIntervalMs", "enableAnchorPositionTracking", "recalculatePositionOnElementResize", "setMobileState", "mobileView"], outputs: ["onOpen", "onClose", "anchorPositionChange", "popupAnimationDone"], exportAs: ["adaptDropdown"] }, { type: i4.AdaptTableComponent, selector: "adapt-table", inputs: ["sortable", "filterable", "triggerableFilters", "explicitSearchBtn", "enableReorderableRows", "suppressTooltip", "toolbarConfig", "dataColumnsColsTemplate", "dataColumnsHeaderTemplate", "dataColumnsDataCellsTemplate", "headerGroupsTemplate", "alwaysShowHeaderTooltip", "alwaysShowCellTooltip", "expandedCellClass", "expandedGroupsKeys", "nestedGroupPadding", "expandindCellInitialPadding", "groupValueDataCellTemplate", "tooltipInitialDelayMs", "tooltipClass", "rowsCustomClass", "paginatorAlign", "hasEmptyState", "enableInfiniteScrolling", "updateFirstColumnWidth", "busyConfig", "defaultFiltersMatchMode", "wrapCellText", "minBufferPx", "maxBufferPx", "testID", "headerSelectionMode", "disabledSelectedRowsCount", "disabledNotSelectedRowsCount", "disabledSelectedFilteredRowsCount", "disabledNotSelectedFilteredRowsCount", "selectedFilteredRowsCount", "totalRecordsInGroup", "disableRowSelection", "nestingStructureData", "nestingKey", "enableRowEditing", "autoScrollToTop", "paginationTexts", "toolbarTexts", "tableTexts", "filtersTexts", "headerCellMenuTexts", "texts", "loadingMore", "mergeColumns", "disabledRowSelectionResolver", "allowColumnReorderingResolver", "disableRowExpandingResolver", "rowAriaDataResolver", "tableWidthConfig", "expandedRowTemplate", "isRefreshingRowData", "value", "bordered", "paginator", "striped", "loading"], outputs: ["onLazyLoad", "rowDataRefresh", "savedRowEditing", "canceledRowEditing", "groupSelection", "allGroupedRowsSelection", "groupExpansion", "columnsVisibilityChange", "rowDragStart", "rowDragRelease", "rowDragEnd", "rowDragDrop", "export", "toolbarPopupAnimationDone"] }, { type: i3.AdaptCodeViewerComponent, selector: "adapt-code-viewer", inputs: ["code", "theme", "lang", "texts", "hasToolbar"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.AdaptDropdownToggleDirective, selector: "[adaptDropdownToggle]", inputs: ["showCaret", "dropdownTogglerType"] }, { type: i3.AdaptDropdownMenuDirective, selector: "[adaptDropdownMenu]" }, { type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3.AdaptPopoverDirective, selector: "[adaptPopover]", inputs: ["adaptPopover", "popoverTitle", "placement", "fallbackPlacement", "triggers", "container", "appendToBody", "closeBtn", "popupDelay", "disablePopover", "popoverClass", "autoClose", "closeOnOutOfView", "maxWidth", "minWidth"], outputs: ["shown", "hidden"], exportAs: ["adaptPopover"] }], pipes: { "async": i5.AsyncPipe, "translate": i2.TranslatePipe, "rxDefinitionNamePipe": i2$1.RxDefinitionNamePipe, "json": i5.JsonPipe, "rxRecordDefinitionFieldOption": i3$1.RxRecordDefinitionFieldOptionPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDesignerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-record-designer',
                    templateUrl: './record-designer.component.html',
                    styleUrls: ['./record-designer.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1$2.Store }, { type: i2$1.RxNotificationService }, { type: i2$1.RxOverlayService }, { type: RxRecordDefinitionValidatorService }, { type: RxRecordDesignerInspectorService }, { type: i2$1.RxDefinitionNameService }, { type: RxFieldDefinitionManagerService }, { type: i3$1.RxRecordDefinitionService }, { type: i2$1.RxGlobalCacheService }, { type: i2.TranslateService }, { type: i5.DatePipe }, { type: i1.RxModalService }, { type: i3$1.RxFieldDefinitionService }, { type: RxRecordDesignerService }, { type: i11.RxExpressionEditorService }, { type: i3$1.RxRecordDefinitionCacheService }, { type: i1$1.RxGuidService }, { type: i0.Injector }]; }, propDecorators: { adaptSidebarComponent: [{
                type: ViewChild,
                args: [AdaptSidebarComponent, { static: false }]
            }], requiredCellTemplate: [{
                type: ViewChild,
                args: ['requiredCellTemplate', { static: true }]
            }], dataTypeCellTemplate: [{
                type: ViewChild,
                args: ['dataTypeCellTemplate', { static: true }]
            }], inheritedCellTemplate: [{
                type: ViewChild,
                args: ['inheritedCellTemplate', { static: true }]
            }], configuration: [{
                type: Input
            }], definitionSaved: [{
                type: Output
            }], definitionErrorLoading: [{
                type: Output
            }], closeDesigner: [{
                type: Output
            }] } });

const initialDefinitionModel = {
    isArchivingEnabled: false,
    archiveDescription: null,
    ageQualifierFieldId: null,
    ageQualifierInDays: null,
    archiveRecordDefinitionName: null,
    archiveType: ArchiveType.None,
    includeAttachments: null,
    archiveDataCriteria: null,
    associationsToFollowForArchive: {
        selectionType: AssociationSelectionType.FollowParent,
        specificAssociationNames: []
    },
    isAuditingEnabled: false,
    auditRecordDefinitionName: null,
    auditDataCriteria: null,
    associatedAuditFieldsByAssociationName: {},
    customizationOptions: {
        allowOverlay: false,
        allowFieldsOverlay: false,
        allowIndexesOverlay: false,
        allowOtherPropertiesOverlay: false,
        allowPermissionsOverlay: false,
        fields: [],
        scope: null
    },
    recordInheritanceSelector: {
        inheritanceOptions: {
            isSharedInstanceStorage: false,
            isAbstract: false,
            isFinal: false
        },
        inheritanceDescriptor: {
            inheritingFrom: null,
            isInheritingRules: false,
            isInheritingFieldPermissions: false,
            isInheritingAssociations: false,
            isInheritingFieldAuditOptions: false
        },
        isInheritingCoreFields: false,
        inheritedFieldDefinitions: []
    },
    recordSearchFields: [],
    overlayOperation: null,
    weightedRelevancyTitle: undefined,
    weightedRelevancyKeywords: undefined,
    weightedRelevancyEnvironment: undefined,
    fields: [],
    indexDefinitions: []
};
const initialState = {
    bundleId: null,
    definitionName: null,
    selectedFieldGuid: null,
    inspectorTabIndex: 0,
    isDesignMode: true,
    definitionModel: initialDefinitionModel,
    definitionModelFromDefinition: initialDefinitionModel,
    isDirty: false,
    savedDefinitionName: null
};
const reducer = createReducer(initialState, on(init, (state, { payload }) => (Object.assign(Object.assign({}, initialState), { bundleId: payload.bundleId, definitionName: payload.definitionName }))), on(initDefinitionModel, (state, { definitionModelFromDefinition }) => (Object.assign(Object.assign({}, state), { definitionModelFromDefinition, definitionModel: definitionModelFromDefinition }))), on(updateDefinitionModelFromDesigner, (state, { definitionModelFromDesigner }) => {
    const updatedDefinitionModel = Object.assign(Object.assign({}, state.definitionModel), definitionModelFromDesigner);
    const inheritedFieldDefinitions = updatedDefinitionModel.recordInheritanceSelector.inheritanceDescriptor
        ? updatedDefinitionModel.recordInheritanceSelector.inheritedFieldDefinitions
        : [];
    return Object.assign(Object.assign({}, state), { definitionModel: Object.assign(Object.assign({}, updatedDefinitionModel), { includeAttachments: updatedDefinitionModel.archiveType === RX_RECORD_DESIGNER.archiving.types.deleteSourceRecord.id, fields: chain(updatedDefinitionModel.fields)
                .differenceBy(inheritedFieldDefinitions, 'id')
                .concat(inheritedFieldDefinitions)
                .map((field) => {
                const searchField = updatedDefinitionModel.recordSearchFields.find((searchField) => searchField.id === field.id);
                const searchDefinition = searchField
                    ? searchField.searchDefinition
                    : isUndefined(field.searchDefinition)
                        ? undefined
                        : null;
                const customizationOptionField = updatedDefinitionModel.customizationOptions.allowFieldsOverlay &&
                    updatedDefinitionModel.customizationOptions.fields.find((customizationOptionsField) => customizationOptionsField.id === field.id);
                return Object.assign(Object.assign({}, field), { searchDefinition, allowOtherPropertiesOverlay: customizationOptionField
                        ? customizationOptionField.allowOtherPropertiesOverlay
                        : field.allowOtherPropertiesOverlay, allowPermissionsOverlay: customizationOptionField
                        ? customizationOptionField.allowPermissionsOverlay
                        : field.allowPermissionsOverlay, isInherited: field.isCoreField
                        ? Boolean(updatedDefinitionModel.recordInheritanceSelector.isInheritingCoreFields)
                        : field.isInherited });
            })
                .orderBy('id')
                .value() }) });
}), on(updateSelectedFieldModel, (state, { selectedFieldModel }) => {
    return Object.assign(Object.assign({}, state), { definitionModel: Object.assign(Object.assign({}, state.definitionModel), { fields: state.definitionModel.fields.map((field) => {
                return field.guid === selectedFieldModel.guid
                    ? Object.assign(Object.assign({}, selectedFieldModel), { copy: selectedFieldModel.audit ? true : selectedFieldModel.copy }) : field;
            }) }) });
}), on(clearSearchFields, (state) => (Object.assign(Object.assign({}, state), { definitionModel: Object.assign(Object.assign({}, state.definitionModel), { recordSearchFields: [], fields: state.definitionModel.fields.map((field) => {
            return Object.assign(Object.assign({}, field), { searchDefinition: isUndefined(field.searchDefinition) ? undefined : null });
        }) }) }))), on(toggleDesignMode, (state) => (Object.assign(Object.assign({}, state), { isDesignMode: !state.isDesignMode }))), on(markDesignerPristine, (state) => (Object.assign(Object.assign({}, state), { isDirty: false }))), on(markDesignerDirty, (state) => (Object.assign(Object.assign({}, state), { isDirty: true }))), on(setInspectorTabIndex, (state, { inspectorTabIndex }) => (Object.assign(Object.assign({}, state), { inspectorTabIndex }))), on(setSelectedFieldGuid, (state, { guid }) => (Object.assign(Object.assign({}, state), { selectedFieldGuid: guid, inspectorTabIndex: guid && !isNull(state.inspectorTabIndex) ? 1 : state.inspectorTabIndex }))), on(clearSelectedFieldGuid, (state) => (Object.assign(Object.assign({}, state), { selectedFieldGuid: null, inspectorTabIndex: !isNull(state.inspectorTabIndex) ? 0 : state.inspectorTabIndex }))), on(addFieldModel, (state, { newFieldModel }) => (Object.assign(Object.assign({}, state), { definitionModel: Object.assign(Object.assign({}, state.definitionModel), { fields: [...state.definitionModel.fields, Object.assign({}, newFieldModel)] }) }))), on(addNewFieldModels, (state, { newFieldModels }) => (Object.assign(Object.assign({}, state), { definitionModel: Object.assign(Object.assign({}, state.definitionModel), { fields: [...state.definitionModel.fields, ...newFieldModels] }), isDirty: true }))), on(deleteSelectedFieldSuccess, (state) => (Object.assign(Object.assign({}, state), { definitionModel: Object.assign(Object.assign({}, state.definitionModel), { fields: state.definitionModel.fields.filter((field) => field.guid !== state.selectedFieldGuid) }) }))), on(saveDefinitionSuccess, (state, { savedDefinitionName }) => (Object.assign(Object.assign({}, state), { savedDefinitionName }))), on(destroy, (state) => (Object.assign({}, initialState))));
function recordDesignerModelReducer(state, action) {
    return reducer(state, action);
}

class RecordDesignerEffects {
    constructor(store$, actions$, rxFieldDefinitionManagerService, rxRecordDefinitionService, rxModalService, rxNotificationService, translateService, rxGuidService, rxRecordDesignerService) {
        this.store$ = store$;
        this.actions$ = actions$;
        this.rxFieldDefinitionManagerService = rxFieldDefinitionManagerService;
        this.rxRecordDefinitionService = rxRecordDefinitionService;
        this.rxModalService = rxModalService;
        this.rxNotificationService = rxNotificationService;
        this.translateService = translateService;
        this.rxGuidService = rxGuidService;
        this.rxRecordDesignerService = rxRecordDesignerService;
        this.initRecordDesigner$ = createEffect(() => this.actions$.pipe(ofType(init), map(() => loadDefinition())));
        this.loadDefinition$ = createEffect(() => this.actions$.pipe(ofType(loadDefinition), withLatestFrom(this.store$.select(definitionNameSelector)), switchMap(([action, definitionName]) => definitionName
            ? this.rxRecordDefinitionService.get(definitionName, {}, true)
            : this.rxRecordDefinitionService.getNew()), map((definition) => loadDefinitionSuccess({
            definition
        }))));
        this.loadDefinitionSuccess$ = createEffect(() => this.actions$.pipe(ofType(loadDefinitionSuccess), map((action) => initDefinitionModel({
            definitionModelFromDefinition: this.rxRecordDesignerService.getDefinitionModelFromDefinition(action.definition)
        }))));
        this.createNewFieldModel$ = createEffect(() => this.actions$.pipe(ofType(createNewFieldModel), withLatestFrom(this.store$.select(definitionModelSelector)), map(([action, definitionModel]) => {
            let newFieldName;
            let fieldNameSuffix = 0;
            const defaultFieldName = this.translateService.instant('com.bmc.arsys.rx.client.designer.default-field-name.label');
            do {
                newFieldName = `${defaultFieldName} ${++fieldNameSuffix}`;
            } while (some(definitionModel.fields, { name: newFieldName }));
            const guid = this.rxGuidService.generate();
            const newFieldModel = this.rxFieldDefinitionManagerService.getNewFieldDefinitionModel(action.resourceType, {
                id: null,
                isNewField: true,
                name: newFieldName,
                guid,
                minValue: null,
                maxValue: null,
                defaultValueByLocale: {},
                selectionFieldOptionProperties: action.resourceType === RX_RECORD_DEFINITION.dataTypes.selection.resourceType
                    ? { defaultValue: null, optionNamesById: null, optionLabelsById: null }
                    : null
            });
            return addFieldModel({ newFieldModel });
        })));
        this.clearSearchFields$ = createEffect(() => this.actions$.pipe(ofType(updateDefinitionModelFromDesigner), withLatestFrom(this.store$.select(definitionModelSelector)), map(([action, definitionModel]) => definitionModel), distinctUntilChanged((a, b) => isEqual(a.enableCognitiveSearch, b.enableCognitiveSearch)), filter((definitionModel) => definitionModel.enableCognitiveSearch && !isEmpty(definitionModel.recordSearchFields)), switchMap(() => from(this.rxModalService.confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.search-fields.clear-search-fields-confirmation.message')
        }))), filter(Boolean), map(() => clearSearchFields())));
        this.addNewFieldModel$ = createEffect(() => this.actions$.pipe(ofType(addFieldModel), map((action) => setSelectedFieldGuid({ guid: action.newFieldModel.guid }))));
        this.copySelectedField$ = createEffect(() => this.actions$.pipe(ofType(copySelectedField), withLatestFrom(this.store$.select(definitionModelSelector), this.store$.select(selectedFieldGuidSelector)), map(([action, definitionModel, selectedFieldGuid]) => {
            const selectedField = definitionModel.fields.find((field) => field.guid === selectedFieldGuid);
            const selectedFieldCopy = Object.assign(Object.assign({}, selectedField), { id: null, guid: this.rxGuidService.generate(), name: this.translateService.instant('com.bmc.arsys.rx.client.designer.default-field-copy-name.label', {
                    fieldName: selectedField.name
                }), selectionFieldOptionProperties: Object.assign(Object.assign({}, selectedField.selectionFieldOptionProperties), { optionLabelsById: selectedField.resourceType === RX_RECORD_DEFINITION.resourceTypes.selection
                        ? mapValues(selectedField.selectionFieldOptionProperties.optionNamesById, () => this.rxGuidService.generate())
                        : null }) });
            return addFieldModel({ newFieldModel: selectedFieldCopy });
        })));
        this.deleteSelectedField$ = createEffect(() => this.actions$.pipe(ofType(deleteSelectedField), switchMap(() => from(this.rxModalService.confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.delete-field-warning.message')
        }))), filter(Boolean), map(() => checkIfFieldUsedByIndexes())));
        this.checkIfFieldUsedByIndexes$ = createEffect(() => this.actions$.pipe(ofType(checkIfFieldUsedByIndexes), withLatestFrom(this.store$.select(definitionModelSelector), this.store$.select(selectedFieldGuidSelector)), switchMap(([result, definitionModel, guid]) => {
            const field = find(definitionModel.fields, { guid });
            const isUsedByIndexes = some(definitionModel.indexDefinitions, (indexDefinition) => includes(indexDefinition.indexFieldIds, field.id));
            return isUsedByIndexes
                ? from(this.rxModalService.alert({
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                    modalStyle: RX_MODAL.modalStyles.warning,
                    message: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.indexes.field-used-by-indexes.message', { fieldName: field.name })
                })).pipe(map(() => deleteSelectedFieldError()))
                : [deleteSelectedFieldSuccess()];
        })));
        this.saveDefinitionSuccess$ = createEffect(() => this.actions$.pipe(ofType(saveDefinitionSuccess), withLatestFrom(this.store$.select(definitionNameSelector), this.store$.select(bundleIdSelector)), tap(() => {
            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.designer.definition-saved-successfully.message', {
                definitionTypeDisplayName: this.translateService.instant('com.bmc.arsys.rx.client.record-definition.label')
            }));
        }), filter(([action, definitionName, bundleId]) => !!definitionName), map(([action, definitionName, bundleId]) => init({
            payload: { definitionName, bundleId }
        }))));
        this.clearSelectedField$ = createEffect(() => this.actions$.pipe(ofType(initDefinitionModel, deleteSelectedFieldSuccess), map(() => clearSelectedFieldGuid())));
        this.markPristine$ = createEffect(() => this.actions$.pipe(ofType(initDefinitionModel, saveDefinitionSuccess), map(() => markDesignerPristine())));
        this.markDirty$ = createEffect(() => this.actions$.pipe(ofType(addFieldModel, updateDefinitionModelFromDesigner, updateSelectedFieldModel, deleteSelectedFieldSuccess), map(() => markDesignerDirty())));
    }
}
RecordDesignerEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDesignerEffects, deps: [{ token: i1$2.Store }, { token: i2$2.Actions }, { token: RxFieldDefinitionManagerService }, { token: i3$1.RxRecordDefinitionService }, { token: i1.RxModalService }, { token: i2$1.RxNotificationService }, { token: i2.TranslateService }, { token: i1$1.RxGuidService }, { token: RxRecordDesignerService }], target: i0.ɵɵFactoryTarget.Injectable });
RecordDesignerEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDesignerEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDesignerEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$2.Store }, { type: i2$2.Actions }, { type: RxFieldDefinitionManagerService }, { type: i3$1.RxRecordDefinitionService }, { type: i1.RxModalService }, { type: i2$1.RxNotificationService }, { type: i2.TranslateService }, { type: i1$1.RxGuidService }, { type: RxRecordDesignerService }]; } });

class RecordDesignerModule {
}
RecordDesignerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDesignerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RecordDesignerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDesignerModule, declarations: [RecordDesignerComponent,
        LocalizedCharacterFieldEditorComponent,
        InheritanceIssueInfoComponent,
        ArchiveAssociationsControlComponent,
        ArchiveAssociationSelectorComponent,
        MissingArchiveDefinitionsModalComponent,
        FieldOptionEditorComponent,
        AddJoinFieldsEditorComponent,
        RecordIndexesControlComponent,
        RecordIndexesEditorComponent], imports: [AdaptCodeViewerModule,
        AdaptRxLabelModule,
        AdaptTabsModule,
        AdaptBusyModule,
        AdaptButtonModule,
        AdaptDropdownModule,
        AdaptRxCheckboxModule,
        AdaptRxSelectModule,
        AdaptRxTextfieldModule,
        AdaptPopoverModule,
        AdaptIconModule,
        CommonModule,
        FormsModule,
        RxDesignerHeaderModule,
        RxModalModule,
        RxValidationIssuesModule,
        TranslateModule,
        ReactiveFormsModule,
        RecordGridModule,
        RxFormBuilderModule,
        RxDefinitionModule,
        RxRecordDefinitionFieldOptionPipeModule,
        RecordCustomizationOptionsModule,
        RecordInheritanceEditorModule,
        SearchFieldEditorModule,
        AdaptTableModule,
        AdaptSidebarModule, i1$2.StoreFeatureModule, i2$2.EffectsFeatureModule, AdaptAlertModule,
        AdaptRxRadiobuttonModule,
        AdaptRxSwitchModule,
        AdaptPopoverModule,
        AdaptAccordionModule,
        AdaptRxListBuilderModule], exports: [RecordDesignerComponent] });
RecordDesignerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDesignerModule, providers: [DatePipe, RxRecordDesignerService], imports: [[
            AdaptCodeViewerModule,
            AdaptRxLabelModule,
            AdaptTabsModule,
            AdaptBusyModule,
            AdaptButtonModule,
            AdaptDropdownModule,
            AdaptRxCheckboxModule,
            AdaptRxSelectModule,
            AdaptRxTextfieldModule,
            AdaptPopoverModule,
            AdaptIconModule,
            CommonModule,
            FormsModule,
            RxDesignerHeaderModule,
            RxModalModule,
            RxValidationIssuesModule,
            TranslateModule,
            ReactiveFormsModule,
            RecordGridModule,
            RxFormBuilderModule,
            RxDefinitionModule,
            RxRecordDefinitionFieldOptionPipeModule,
            RecordCustomizationOptionsModule,
            RecordInheritanceEditorModule,
            SearchFieldEditorModule,
            AdaptTableModule,
            AdaptSidebarModule,
            StoreModule.forFeature(RX_RECORD_DESIGNER.featureSelector, {
                model: recordDesignerModelReducer
            }),
            EffectsModule.forFeature([RecordDesignerEffects]),
            AdaptAlertModule,
            AdaptRxRadiobuttonModule,
            AdaptRxSwitchModule,
            AdaptPopoverModule,
            AdaptAccordionModule,
            AdaptRxListBuilderModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDesignerModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        RecordDesignerComponent,
                        LocalizedCharacterFieldEditorComponent,
                        InheritanceIssueInfoComponent,
                        ArchiveAssociationsControlComponent,
                        ArchiveAssociationSelectorComponent,
                        MissingArchiveDefinitionsModalComponent,
                        FieldOptionEditorComponent,
                        AddJoinFieldsEditorComponent,
                        RecordIndexesControlComponent,
                        RecordIndexesEditorComponent
                    ],
                    exports: [RecordDesignerComponent],
                    imports: [
                        AdaptCodeViewerModule,
                        AdaptRxLabelModule,
                        AdaptTabsModule,
                        AdaptBusyModule,
                        AdaptButtonModule,
                        AdaptDropdownModule,
                        AdaptRxCheckboxModule,
                        AdaptRxSelectModule,
                        AdaptRxTextfieldModule,
                        AdaptPopoverModule,
                        AdaptIconModule,
                        CommonModule,
                        FormsModule,
                        RxDesignerHeaderModule,
                        RxModalModule,
                        RxValidationIssuesModule,
                        TranslateModule,
                        ReactiveFormsModule,
                        RecordGridModule,
                        RxFormBuilderModule,
                        RxDefinitionModule,
                        RxRecordDefinitionFieldOptionPipeModule,
                        RecordCustomizationOptionsModule,
                        RecordInheritanceEditorModule,
                        SearchFieldEditorModule,
                        AdaptTableModule,
                        AdaptSidebarModule,
                        StoreModule.forFeature(RX_RECORD_DESIGNER.featureSelector, {
                            model: recordDesignerModelReducer
                        }),
                        EffectsModule.forFeature([RecordDesignerEffects]),
                        AdaptAlertModule,
                        AdaptRxRadiobuttonModule,
                        AdaptRxSwitchModule,
                        AdaptPopoverModule,
                        AdaptAccordionModule,
                        AdaptRxListBuilderModule
                    ],
                    providers: [DatePipe, RxRecordDesignerService]
                }]
        }] });

class RecordDesignerPageComponent {
    constructor(activatedRoute, rxBundleCacheService, rxDefinitionNameService, rxUtilityModalsService, rxPageTitleService, router, translateService, rxComponentCanDeactivateGuard) {
        this.activatedRoute = activatedRoute;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxUtilityModalsService = rxUtilityModalsService;
        this.rxPageTitleService = rxPageTitleService;
        this.router = router;
        this.translateService = translateService;
        this.rxComponentCanDeactivateGuard = rxComponentCanDeactivateGuard;
        this.isInitialized = false;
    }
    ngOnInit() {
        this.rxComponentCanDeactivateGuard.setPageComponent(this);
        this.subscription = this.activatedRoute.params.subscribe(({ definitionName, bundleId }) => {
            this.rxBundleCacheService.bundleId = bundleId || this.rxDefinitionNameService.getBundleId(definitionName);
            this.isInitialized = true;
            this.isNewRecord = !definitionName;
            this.configuration = {
                definitionName: definitionName,
                bundleId: this.rxBundleCacheService.bundleId
            };
            this.rxPageTitleService.set([
                this.rxDefinitionNameService.getDisplayName(definitionName),
                this.translateService.instant('com.bmc.arsys.rx.client.record-designer.title')
            ]);
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.rxComponentCanDeactivateGuard.setPageComponent(null);
    }
    onDefinitionSaved(recordDefinitionName) {
        if (this.isNewRecord) {
            this.router.navigate(['edit2', recordDefinitionName], { relativeTo: this.activatedRoute.parent });
        }
    }
    onDefinitionErrorLoading() {
        this.router.navigate(['new2', this.rxBundleCacheService.bundleId], { relativeTo: this.activatedRoute.parent });
    }
    onCloseDesigner() {
        this.router.navigate([
            RX_APPLICATION.innovationStudioBundleId,
            this.rxBundleCacheService.bundleId,
            'record-definitions'
        ]);
    }
    canDeactivate() {
        var _a, _b;
        return (_b = (_a = this.recordDesignerComponent) === null || _a === void 0 ? void 0 : _a.canDeactivate()) !== null && _b !== void 0 ? _b : true;
    }
    confirmDeactivation() {
        return this.rxUtilityModalsService.confirmUnsavedChanges();
    }
}
RecordDesignerPageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDesignerPageComponent, deps: [{ token: i1$3.ActivatedRoute }, { token: i2$1.RxBundleCacheService }, { token: i2$1.RxDefinitionNameService }, { token: i1.RxUtilityModalsService }, { token: i2$1.RxPageTitleService }, { token: i1$3.Router }, { token: i2.TranslateService }, { token: i2$1.RxComponentCanDeactivateGuard }], target: i0.ɵɵFactoryTarget.Component });
RecordDesignerPageComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RecordDesignerPageComponent, selector: "rx-record-designer-page", viewQueries: [{ propertyName: "recordDesignerComponent", first: true, predicate: RecordDesignerComponent, descendants: true }], ngImport: i0, template: "<rx-record-designer\n  *ngIf=\"isInitialized\"\n  [configuration]=\"configuration\"\n  (definitionSaved)=\"onDefinitionSaved($event)\"\n  (definitionErrorLoading)=\"onDefinitionErrorLoading()\"\n  (closeDesigner)=\"onCloseDesigner()\"\n></rx-record-designer>\n", components: [{ type: RecordDesignerComponent, selector: "rx-record-designer", inputs: ["configuration"], outputs: ["definitionSaved", "definitionErrorLoading", "closeDesigner"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDesignerPageComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-record-designer-page',
                    templateUrl: './record-designer-page.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1$3.ActivatedRoute }, { type: i2$1.RxBundleCacheService }, { type: i2$1.RxDefinitionNameService }, { type: i1.RxUtilityModalsService }, { type: i2$1.RxPageTitleService }, { type: i1$3.Router }, { type: i2.TranslateService }, { type: i2$1.RxComponentCanDeactivateGuard }]; }, propDecorators: { recordDesignerComponent: [{
                type: ViewChild,
                args: [RecordDesignerComponent]
            }] } });

class RecordDesignerPageModule {
}
RecordDesignerPageModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDesignerPageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RecordDesignerPageModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDesignerPageModule, declarations: [RecordDesignerPageComponent], imports: [CommonModule, RecordDesignerModule], exports: [RecordDesignerPageComponent] });
RecordDesignerPageModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDesignerPageModule, imports: [[CommonModule, RecordDesignerModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDesignerPageModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RecordDesignerPageComponent],
                    exports: [RecordDesignerPageComponent],
                    imports: [CommonModule, RecordDesignerModule]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { RecordDesignerComponent, RecordDesignerModule, RecordDesignerPageComponent, RecordDesignerPageModule, RxFieldDefinitionManagerService, RxRecordDesignerService };
//# sourceMappingURL=helix-platform-record-designer.js.map
