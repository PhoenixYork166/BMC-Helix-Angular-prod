import { ChangeDetectionStrategy, Component, ElementRef, Injector, QueryList, ViewChildren } from '@angular/core';
import { ActiveModalRef, AdaptAccordionTabComponent, DismissReasons } from '@bmc-ux/adapt-angular';
import { RxModalClass } from '@helix/platform/ui-kit';
import { RecordIndexesEditorStore } from './record-indexes-editor.store';
import { RxGuidService } from '@helix/platform/utils';
import { filter, take } from 'rxjs/operators';
import { map } from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "./record-indexes-editor.store";
import * as i2 from "@helix/platform/utils";
import * as i3 from "@bmc-ux/adapt-angular";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
import * as i6 from "@ngx-translate/core";
export class RecordIndexesEditorComponent extends RxModalClass {
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
                indexFieldIds: map(index.selectedFields, 'id')
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
RecordIndexesEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordIndexesEditorComponent, deps: [{ token: i1.RecordIndexesEditorStore }, { token: i2.RxGuidService }, { token: i3.ActiveModalRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
RecordIndexesEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RecordIndexesEditorComponent, selector: "rx-record-indexes-editor", providers: [RecordIndexesEditorStore], viewQueries: [{ propertyName: "accordionTabEls", predicate: AdaptAccordionTabComponent, descendants: true, read: ElementRef }], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"vm$ | async as vm\">\n  <div class=\"designer-modal-body modal-body d-flex mh-100 flex-column\">\n    <adapt-alert\n      class=\"flex-shrink-0\"\n      [config]=\"{\n        content: 'com.bmc.arsys.rx.client.record-designer.indexes.information' | translate,\n        variant: 'info',\n        type: 'inline'\n      }\"\n    ></adapt-alert>\n\n    <div class=\"text-right btn-group\">\n      <button\n        type=\"button\"\n        adapt-button\n        btn-type=\"tertiary\"\n        rx-id=\"add-index-button\"\n        class=\"d-icon-left-plus_circle float-left px-0\"\n        (click)=\"addIndex()\"\n        *ngIf=\"!isReadOnly\"\n      >\n        {{ 'com.bmc.arsys.rx.client.record-designer.indexes.add-index.label' | translate }}\n      </button>\n\n      <button\n        type=\"button\"\n        adapt-button\n        btn-type=\"tertiary\"\n        rx-id=\"expand-button\"\n        (click)=\"expandAll()\"\n        class=\"ml-auto\"\n      >\n        {{ 'com.bmc.arsys.rx.client.common.expand-all.label' | translate }}\n      </button>\n\n      <button\n        type=\"button\"\n        adapt-button\n        btn-type=\"tertiary\"\n        rx-id=\"collapse-button\"\n        class=\"pr-0\"\n        (click)=\"collapseAll()\"\n      >\n        {{ 'com.bmc.arsys.rx.client.common.collapse-all.label' | translate }}\n      </button>\n    </div>\n\n    <div class=\"designer-modal-accordion-wrapper\">\n      <adapt-accordion\n        [multiselect]=\"true\"\n        class=\"d-block\"\n        *ngFor=\"let index of vm.indexes; let $index = index; trackBy: trackByIndex\"\n      >\n        <div class=\"designer-modal-accordion-content\">\n          <adapt-accordion-tab\n            class=\"d-block\"\n            [isOpen]=\"index.isOpen\"\n            (open)=\"index.isOpen = true\"\n            (close)=\"index.isOpen = false\"\n          >\n            <div class=\"card-title-text w-100\">\n              <div class=\"designer-modal-card-title-content\">\n                <div class=\"left-header-block pl-0\">\n                  <div class=\"rx-ellipsis\" [title]=\"index.indexName\" rx-id=\"card-title\">\n                    <span *ngIf=\"!index.isAutomaticIndex\">\n                      {{\n                        index.indexName || 'com.bmc.arsys.rx.client.record-designer.indexes.new-index.label' | translate\n                      }}\n                    </span>\n                    <span *ngIf=\"index.isAutomaticIndex\">{{\n                      'com.bmc.arsys.rx.client.record-designer.indexes.automatic-index.label'\n                        | translate: { indexName: index.indexName }\n                    }}</span>\n                  </div>\n                </div>\n\n                <div class=\"right-header-block\">\n                  <button\n                    class=\"d-icon-left-cross_adapt py-0 pr-3 btn btn-sm\"\n                    adapt-button\n                    size=\"small\"\n                    type=\"button\"\n                    (click)=\"$event.stopPropagation(); removeIndex(index.guid)\"\n                    *ngIf=\"!isReadOnly && !index.isAutomaticIndex\"\n                    rx-id=\"remove-index-button\"\n                  >\n                    {{ 'com.bmc.arsys.rx.client.common.remove.label' | translate }}\n                  </button>\n                </div>\n              </div>\n            </div>\n\n            <adapt-rx-checkbox\n              [ngModel]=\"index.unique\"\n              (ngModelChange)=\"updateIndexUniqueValue(index, $event)\"\n              [disabled]=\"isReadOnly || index.isAutomaticIndex\"\n              label=\"{{ 'com.bmc.arsys.rx.client.record-designer.indexes.unique-index-checkbox.label' | translate }}\"\n            >\n            </adapt-rx-checkbox>\n\n            <adapt-rx-checkbox\n              [(ngModel)]=\"index.ignoreBlankValues\"\n              (ngModelChange)=\"updateIndexIgnoreBlankValue(index, $event)\"\n              [disabled]=\"isReadOnly || index.isAutomaticIndex\"\n              label=\"{{ 'com.bmc.arsys.rx.client.record-designer.indexes.ignore-blank-values.label' | translate }}\"\n              [tooltip]=\"{\n                iconName: 'question_circle_o',\n                content: 'com.bmc.arsys.rx.client.record-designer.indexes.ignore-blank-values.tooltip' | translate,\n                placement: 'top',\n                popoverMode: true\n              }\"\n            >\n            </adapt-rx-checkbox>\n\n            <div class=\"d-flex flex-fill\">\n              <adapt-rx-select\n                class=\"flex-grow-1 d-flex flex-column\"\n                popupMaxHeight=\"100%\"\n                [options]=\"index.availableFields\"\n                [ngModel]=\"index.checkedAvailableFields\"\n                [disabled]=\"isReadOnly || index.isAutomaticIndex\"\n                [deselectAllButton]=\"true\"\n                [selectAllButton]=\"true\"\n                [enableFilter]=\"true\"\n                [inline]=\"true\"\n                label=\"{{ 'com.bmc.arsys.rx.client.record-designer.indexes.available-fields.label' | translate }}\"\n                [multiple]=\"true\"\n                [singleSelectStyle]=\"'marker'\"\n                [optionFormatter]=\"optionFormatter\"\n                (ngModelChange)=\"onAvailableFieldsChange($event, index)\"\n                rx-id=\"available-field-list\"\n              ></adapt-rx-select>\n\n              <div class=\"mx-2 d-flex flex-column\">\n                <button\n                  type=\"button\"\n                  adapt-button\n                  class=\"d-icon-right-angle_right mt-auto mb-2\"\n                  btn-type=\"secondary\"\n                  (click)=\"moveToSelected(index)\"\n                  [disabled]=\"!index.checkedAvailableFields.length || index.isAutomaticIndex\"\n                  rx-id=\"move-to-selected-button\"\n                ></button>\n\n                <button\n                  type=\"button\"\n                  adapt-button\n                  class=\"d-icon-right-angle_left mb-auto\"\n                  btn-type=\"secondary\"\n                  (click)=\"moveToAvailable(index)\"\n                  [disabled]=\"!index.isMoveToAvailableButtonEnabled || index.isAutomaticIndex\"\n                  rx-id=\"move-to-available-button\"\n                ></button>\n              </div>\n\n              <adapt-rx-list-builder\n                class=\"flex-grow-1\"\n                [ngModel]=\"index.selectedFields\"\n                selectionMode=\"multiple\"\n                (ngModelChange)=\"onSelectedFieldsChange($event, index)\"\n                (listItemRemove)=\"onFieldRemove($event, index)\"\n                [disabled]=\"isReadOnly || index.isAutomaticIndex\"\n                [hideSearchField]=\"true\"\n                [hideEdit]=\"true\"\n                (dragend)=\"onDragEnd()\"\n                [tooltip]=\"{\n                  iconName: 'question_circle_o',\n                  content: 'com.bmc.arsys.rx.client.record-designer.indexes.selected-fields.tooltip' | translate,\n                  placement: 'top',\n                  popoverMode: true\n                }\"\n                label=\"{{ 'com.bmc.arsys.rx.client.record-designer.indexes.selected-fields.label' | translate }}\"\n                rx-id=\"selected-field-list\"\n              ></adapt-rx-list-builder>\n            </div>\n          </adapt-accordion-tab>\n        </div>\n      </adapt-accordion>\n    </div>\n  </div>\n\n  <div class=\"modal-footer\">\n    <div *ngIf=\"!isReadOnly\">\n      <button\n        class=\"mr-2\"\n        type=\"button\"\n        adapt-button\n        btn-type=\"primary\"\n        rx-id=\"save-button\"\n        (click)=\"save()\"\n        [disabled]=\"!vm.isDirty\"\n      >\n        {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n      </button>\n\n      <button type=\"button\" adapt-button btn-type=\"secondary\" rx-id=\"cancel-button\" (click)=\"cancel()\">\n        {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n      </button>\n    </div>\n\n    <div *ngIf=\"isReadOnly\">\n      <button type=\"button\" adapt-button btn-type=\"secondary\" rx-id=\"close-button\" (click)=\"cancel()\">\n        {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n      </button>\n    </div>\n  </div>\n</ng-container>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.designer-modal-body{height:645px;min-height:calc(100% - 61px)!important}.designer-modal-accordion-wrapper{display:flex;flex-direction:column;height:100%;overflow:auto;padding-top:10px}.designer-modal-accordion-content{position:relative}.designer-modal-accordion-content.cdk-drag-preview{z-index:1200!important}.designer-modal-drag-handle{cursor:move;position:absolute;top:0;left:0;height:46px;padding:14px 10px 14px 14px;z-index:1}.designer-modal-card-title-content{width:100%;display:flex}.designer-modal-card-title-content .left-header-block,.designer-modal-card-title-content .right-header-block{display:flex;align-items:center}.designer-modal-card-title-content .left-header-block{flex-grow:1;min-width:0;font-size:14px;padding-left:22px}.designer-modal-card-sub-title{color:#7c7f81;font-weight:normal}.designer-modal-card-title-index-buttons{display:flex;font-size:19px}.rx-card{overflow:auto}.rx-tree-draggable-node{cursor:pointer}.rx-tree-draggable-node.cdk-drag-preview{z-index:1200!important}.rx-tree-draggable-node.cdk-drag{opacity:1}.rx-tree-node-label{word-break:break-all}rx-form-builder{max-width:400px}:host::ng-deep adapt-rx-select{width:30%}:host::ng-deep adapt-rx-select .rx-select__options-wrapper{height:350px;flex:1 1 auto;overflow-y:auto;overflow-x:hidden}:host::ng-deep adapt-rx-list-builder{width:30%}:host::ng-deep adapt-rx-list-builder .adapt-list-builder{height:100%}:host::ng-deep adapt-rx-list-builder .adapt-list-container{height:350px;flex-grow:1;overflow:auto}:host::ng-deep adapt-rx-list-builder .adapt-list-builder,:host::ng-deep adapt-rx-list-builder .adapt-list-builder__wrp{display:flex;flex-direction:column;height:100%}\n"], components: [{ type: i3.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i3.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i3.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i3.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }, { type: i3.AdaptRxCheckboxComponent, selector: "adapt-rx-checkbox", inputs: ["value", "checked", "indeterminate"], outputs: ["indeterminateChange"] }, { type: i3.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i3.AdaptRxListBuilderComponent, selector: "adapt-rx-list-builder", inputs: ["hideSearchField", "hideEdit", "hideDelete", "hideListAreaLabel", "customSort", "texts", "menuHeight", "listItemMaxLength", "generateListItemId", "itemValidation", "disabled", "treeStructure", "listItemFormatter", "listItemSetterProp", "listItemContentTemplate", "selectionMode"], outputs: ["listItemAdd", "listItemEdit", "listItemUpdate", "listItemRemove"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "async": i4.AsyncPipe, "translate": i6.TranslatePipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordIndexesEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-record-indexes-editor',
                    templateUrl: './record-indexes-editor.component.html',
                    styleUrls: ['./record-indexes-editor.component.scss'],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [RecordIndexesEditorStore]
                }]
        }], ctorParameters: function () { return [{ type: i1.RecordIndexesEditorStore }, { type: i2.RxGuidService }, { type: i3.ActiveModalRef }, { type: i0.Injector }]; }, propDecorators: { accordionTabEls: [{
                type: ViewChildren,
                args: [AdaptAccordionTabComponent, { read: ElementRef }]
            }] } });
//# sourceMappingURL=record-indexes-editor.component.js.map