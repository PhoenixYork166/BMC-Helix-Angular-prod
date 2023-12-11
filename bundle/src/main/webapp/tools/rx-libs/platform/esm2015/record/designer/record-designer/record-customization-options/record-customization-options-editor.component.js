import { ChangeDetectionStrategy, Component, Injector, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActiveModalRef, DismissReasons } from '@bmc-ux/adapt-angular';
import { RX_BUNDLE, RX_OVERLAY } from '@helix/platform/shared/api';
import { RX_MODAL, RxModalClass, RxModalService } from '@helix/platform/ui-kit';
import { TranslateService } from '@ngx-translate/core';
import { cloneDeep, find, includes, noop } from 'lodash';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/ui-kit";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@ngx-translate/core";
import * as i4 from "@bmc-ux/adapt-table";
import * as i5 from "@angular/common";
import * as i6 from "@angular/forms";
export class RecordCustomizationOptionsEditorComponent extends RxModalClass {
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
RecordCustomizationOptionsEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordCustomizationOptionsEditorComponent, deps: [{ token: i1.RxModalService }, { token: i2.ActiveModalRef }, { token: i0.Injector }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
RecordCustomizationOptionsEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RecordCustomizationOptionsEditorComponent, selector: "rx-record-customization-options-editor", viewQueries: [{ propertyName: "recordCustomizationOptionsEditorForm", first: true, predicate: ["recordCustomizationOptionsEditorForm"], descendants: true }, { propertyName: "recordFieldsColumnTemplate", first: true, predicate: ["recordFieldsColumnTemplate"], descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"vm$ | async as vm\">\n  <div class=\"designer-modal-body modal-body\">\n    <form #recordCustomizationOptionsEditorForm=\"ngForm\">\n      <div class=\"w-25\">\n        <adapt-rx-select\n          label=\"{{\n            'com.bmc.arsys.rx.client.record-designer.scope-customization-options-editor.scope.label' | translate\n          }}\"\n          rx-id=\"scope-selection\"\n          [options]=\"scopeSelectionOptions\"\n          [optionFormatter]=\"optionFormatter\"\n          [tooltip]=\"{\n            iconName: 'question_circle_o',\n            content: 'com.bmc.arsys.rx.client.designer.scope-customization-options.scope.tooltip' | translate,\n            placement: 'bottom',\n            popoverMode: true\n          }\"\n          name=\"scope\"\n          [(ngModel)]=\"scope\"\n          (ngModelChange)=\"onScopeChange($event)\"\n          [disabled]=\"isDisabled\"\n        >\n        </adapt-rx-select>\n      </div>\n\n      <div class=\"w-100\">\n        <h5>{{ 'com.bmc.arsys.rx.client.customization-options-editor.customization-options.label' | translate }}</h5>\n        <adapt-rx-checkbox\n          label=\"{{\n            'com.bmc.arsys.rx.client.customization-options-editor.allow-future-customization.label'\n              | translate: { definitionType: data.definitionTypeDisplayName }\n          }}\"\n          rx-id=\"allow-customization-checkbox\"\n          name=\"allowOverlay\"\n          [(ngModel)]=\"allowOverlay\"\n          (ngModelChange)=\"handleAllowOverlayChange()\"\n          [disabled]=\"vm.areCustomizationOptionsDisabled\"\n        >\n        </adapt-rx-checkbox>\n      </div>\n\n      <div class=\"w-100\">\n        <h6>\n          {{\n            'com.bmc.arsys.rx.client.record-designer.scope-customization-options.allow-future-customizations-to.label'\n              | translate\n          }}\n        </h6>\n\n        <div class=\"w-100 d-flex\">\n          <div class=\"w-50\">\n            <div>\n              <adapt-rx-checkbox\n                label=\"{{\n                  'com.bmc.arsys.rx.client.record-designer.scope-customization-options.properties.label' | translate\n                }}\"\n                name=\"allowOtherPropertiesOverlay\"\n                [(ngModel)]=\"customizationOptions.allowOtherPropertiesOverlay\"\n                (ngModelChange)=\"onRecordCustomizationOptionChange()\"\n                [disabled]=\"vm.areCustomizationOptionsDisabled\"\n                rx-id=\"properties-checkbox\"\n              >\n              </adapt-rx-checkbox>\n            </div>\n\n            <div>\n              <adapt-rx-checkbox\n                label=\"{{\n                  'com.bmc.arsys.rx.client.record-designer.scope-customization-options.permissions.label' | translate\n                }}\"\n                name=\"allowPermissionsOverlay\"\n                [(ngModel)]=\"customizationOptions.allowPermissionsOverlay\"\n                (ngModelChange)=\"onRecordCustomizationOptionChange()\"\n                [disabled]=\"vm.areCustomizationOptionsDisabled\"\n                rx-id=\"permissions-checkbox\"\n              >\n              </adapt-rx-checkbox>\n            </div>\n          </div>\n\n          <div class=\"w-50\">\n            <div>\n              <adapt-rx-checkbox\n                label=\"{{\n                  'com.bmc.arsys.rx.client.record-designer.scope-customization-options.search-indexes.label' | translate\n                }}\"\n                name=\"allowIndexesOverlay\"\n                [(ngModel)]=\"customizationOptions.allowIndexesOverlay\"\n                (ngModelChange)=\"onRecordCustomizationOptionChange()\"\n                [disabled]=\"vm.areCustomizationOptionsDisabled\"\n                rx-id=\"search-indexes-checkbox\"\n              >\n              </adapt-rx-checkbox>\n            </div>\n\n            <div>\n              <adapt-rx-checkbox\n                label=\"{{\n                  'com.bmc.arsys.rx.client.record-designer.scope-customization-options.fields.label' | translate\n                }}\"\n                name=\"allowFieldsOverlay\"\n                [(ngModel)]=\"customizationOptions.allowFieldsOverlay\"\n                (ngModelChange)=\"onRecordCustomizationOptionChange()\"\n                [disabled]=\"vm.areCustomizationOptionsDisabled\"\n                rx-id=\"fields-checkbox\"\n              >\n              </adapt-rx-checkbox>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <adapt-table\n        [value]=\"fields\"\n        [columns]=\"columns\"\n        [scrollable]=\"true\"\n        scrollHeight=\"340px\"\n        [sortable]=\"false\"\n        [resizableColumns]=\"false\"\n        [bordered]=\"false\"\n        [filterable]=\"false\"\n        [dataKey]=\"'name'\"\n      >\n      </adapt-table>\n    </form>\n  </div>\n\n  <div class=\"modal-footer\">\n    <button\n      class=\"btn btn-primary\"\n      rx-id=\"save-button\"\n      (click)=\"save()\"\n      type=\"button\"\n      [disabled]=\"!recordCustomizationOptionsEditorForm.dirty\"\n    >\n      {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n    </button>\n\n    <button type=\"button\" class=\"btn btn-secondary btn-sm\" (click)=\"cancel()\" rx-id=\"cancel-button\">\n      {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n    </button>\n  </div>\n</ng-container>\n\n<ng-template #recordFieldsColumnTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n  <div class=\"checkbox m-0 pl-4\">\n    <div class=\"checkbox__label pl-6 ml-6\">\n      <label>\n        <input\n          type=\"checkbox\"\n          role=\"checkbox\"\n          class=\"checkbox__input\"\n          [(ngModel)]=\"dataItem[column.field]\"\n          [disabled]=\"isFieldsOverlayDisabled$ | async\"\n          (change)=\"onFieldsPropertyChange()\"\n        />\n\n        <div class=\"checkbox__item\"></div>\n      </label>\n    </div>\n  </div>\n</ng-template>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.designer-modal-body{height:645px;min-height:calc(100% - 61px)!important}.designer-modal-accordion-wrapper{display:flex;flex-direction:column;height:100%;overflow:auto;padding-top:10px}.designer-modal-accordion-content{position:relative}.designer-modal-accordion-content.cdk-drag-preview{z-index:1200!important}.designer-modal-drag-handle{cursor:move;position:absolute;top:0;left:0;height:46px;padding:14px 10px 14px 14px;z-index:1}.designer-modal-card-title-content{width:100%;display:flex}.designer-modal-card-title-content .left-header-block,.designer-modal-card-title-content .right-header-block{display:flex;align-items:center}.designer-modal-card-title-content .left-header-block{flex-grow:1;min-width:0;font-size:14px;padding-left:22px}.designer-modal-card-sub-title{color:#7c7f81;font-weight:normal}.designer-modal-card-title-index-buttons{display:flex;font-size:19px}.rx-card{overflow:auto}.rx-tree-draggable-node{cursor:pointer}.rx-tree-draggable-node.cdk-drag-preview{z-index:1200!important}.rx-tree-draggable-node.cdk-drag{opacity:1}.rx-tree-node-label{word-break:break-all}rx-form-builder{max-width:400px}\n"], components: [{ type: i2.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i2.AdaptRxCheckboxComponent, selector: "adapt-rx-checkbox", inputs: ["value", "checked", "indeterminate"], outputs: ["indeterminateChange"] }, { type: i4.AdaptTableComponent, selector: "adapt-table", inputs: ["sortable", "filterable", "triggerableFilters", "explicitSearchBtn", "enableReorderableRows", "suppressTooltip", "toolbarConfig", "dataColumnsColsTemplate", "dataColumnsHeaderTemplate", "dataColumnsDataCellsTemplate", "headerGroupsTemplate", "alwaysShowHeaderTooltip", "alwaysShowCellTooltip", "expandedCellClass", "expandedGroupsKeys", "nestedGroupPadding", "expandindCellInitialPadding", "groupValueDataCellTemplate", "tooltipInitialDelayMs", "tooltipClass", "rowsCustomClass", "paginatorAlign", "hasEmptyState", "enableInfiniteScrolling", "updateFirstColumnWidth", "busyConfig", "defaultFiltersMatchMode", "wrapCellText", "minBufferPx", "maxBufferPx", "testID", "headerSelectionMode", "disabledSelectedRowsCount", "disabledNotSelectedRowsCount", "disabledSelectedFilteredRowsCount", "disabledNotSelectedFilteredRowsCount", "selectedFilteredRowsCount", "totalRecordsInGroup", "disableRowSelection", "nestingStructureData", "nestingKey", "enableRowEditing", "autoScrollToTop", "paginationTexts", "toolbarTexts", "tableTexts", "filtersTexts", "headerCellMenuTexts", "texts", "loadingMore", "mergeColumns", "disabledRowSelectionResolver", "allowColumnReorderingResolver", "disableRowExpandingResolver", "rowAriaDataResolver", "tableWidthConfig", "expandedRowTemplate", "isRefreshingRowData", "value", "bordered", "paginator", "striped", "loading"], outputs: ["onLazyLoad", "rowDataRefresh", "savedRowEditing", "canceledRowEditing", "groupSelection", "allGroupedRowsSelection", "groupExpansion", "columnsVisibilityChange", "rowDragStart", "rowDragRelease", "rowDragEnd", "rowDragDrop", "export", "toolbarPopupAnimationDone"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i6.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i6.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i6.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }], pipes: { "async": i5.AsyncPipe, "translate": i3.TranslatePipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordCustomizationOptionsEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-record-customization-options-editor',
                    templateUrl: './record-customization-options-editor.component.html',
                    styleUrls: ['./record-customization-options-editor.component.scss'],
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i1.RxModalService }, { type: i2.ActiveModalRef }, { type: i0.Injector }, { type: i3.TranslateService }]; }, propDecorators: { recordCustomizationOptionsEditorForm: [{
                type: ViewChild,
                args: ['recordCustomizationOptionsEditorForm']
            }], recordFieldsColumnTemplate: [{
                type: ViewChild,
                args: ['recordFieldsColumnTemplate', { static: true }]
            }] } });
//# sourceMappingURL=record-customization-options-editor.component.js.map