import { Component, ElementRef, Injector, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActiveModalRef, AdaptAccordionTabComponent, DismissReasons, TreeWrap } from '@bmc-ux/adapt-angular';
import { RxRecordDefinitionDataPageService } from '@helix/platform/record/api';
import { RxDefinitionNameService } from '@helix/platform/shared/api';
import { RxDefinitionPickerType } from '@helix/platform/shared/components';
import { map } from 'rxjs/operators';
import { RxModalClass } from '@helix/platform/ui-kit';
import { findIndex } from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@helix/platform/record/api";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "@helix/platform/shared/components";
import * as i5 from "@angular/common";
import * as i6 from "@angular/cdk/drag-drop";
import * as i7 from "@angular/forms";
import * as i8 from "@ngx-translate/core";
export class RxShellGlobalSearchRecordsModalComponent extends RxModalClass {
    constructor(activeModalRef, recordDefinitionDataPageService, definitionNameService, injector) {
        super(activeModalRef, injector);
        this.activeModalRef = activeModalRef;
        this.recordDefinitionDataPageService = recordDefinitionDataPageService;
        this.definitionNameService = definitionNameService;
        this.injector = injector;
        this.config = this.activeModalRef.getData();
        this.filteredRecordDefinitionItems = [];
        this.treeWrap = TreeWrap.WrapAll;
        this.DismissReasons = DismissReasons;
        this.definitionPickerOptions = {
            label: 'Display view when clicked',
            definitionType: RxDefinitionPickerType.View,
            required: true
        };
    }
    ngOnInit() {
        super.ngOnInit();
        this.selectedRecords = this.config.selectedRecords.map((record) => {
            var _a;
            return (Object.assign(Object.assign({}, record), { isOpen: record.name === ((_a = this.config.recordToEdit) === null || _a === void 0 ? void 0 : _a.name) }));
        });
        this.getRecordDefinitions().subscribe((records) => {
            this.availableRecordDefinitionItems = records;
            this.updateFilteredItems();
        });
    }
    updateFilteredItems() {
        this.filteredRecordDefinitionItems = this.availableRecordDefinitionItems
            .filter((item) => !this.selectedRecords.find((record) => record.name === item.name))
            .map((item) => ({
            data: item,
            label: item.definitionName
        }));
    }
    addRecord(recordItem) {
        this.markAsDirty();
        this.selectedRecords.push(Object.assign(Object.assign({}, recordItem), { isOpen: true, view: null }));
        this.updateFilteredItems();
        setTimeout(() => {
            this.accordionTabEls.last.nativeElement.scrollIntoView({
                block: 'nearest'
            });
        });
    }
    toggleOpen(expandAll) {
        this.selectedRecords.forEach((record) => (record.isOpen = expandAll));
    }
    onSelectedRecordsListDrop(event) {
        this.addRecord(event.item.data);
    }
    removeRecord(record) {
        this.markAsDirty();
        this.selectedRecords = this.selectedRecords.filter((item) => item.name !== record.name);
        this.updateFilteredItems();
    }
    onSave() {
        const result = this.selectedRecords.map((record) => ({
            name: record.name,
            view: record.view,
            definitionName: record.definitionName
        }));
        this.activeModalRef.close(result);
    }
    getRecordDefinitions() {
        return this.recordDefinitionDataPageService
            .get({
            params: {
                propertySelection: 'name',
                excludeCustomRecordDefinitions: true
            }
        })
            .pipe(map((result) => result.data.map((record) => ({
            name: record.name,
            definitionName: this.definitionNameService.getDisplayName(record.name)
        }))));
    }
    ngAfterViewInit() {
        const selectedRecordIndex = findIndex(this.selectedRecords, 'isOpen');
        if (selectedRecordIndex !== -1) {
            this.accordionTabEls.toArray()[selectedRecordIndex].nativeElement.scrollIntoView({
                block: 'nearest'
            });
        }
    }
}
RxShellGlobalSearchRecordsModalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellGlobalSearchRecordsModalComponent, deps: [{ token: i1.ActiveModalRef }, { token: i2.RxRecordDefinitionDataPageService }, { token: i3.RxDefinitionNameService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
RxShellGlobalSearchRecordsModalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxShellGlobalSearchRecordsModalComponent, selector: "rx-shell-global-search-records-modal", viewQueries: [{ propertyName: "selectedRecordsForm", first: true, predicate: ["selectedRecordsForm"], descendants: true, read: NgForm, static: true }, { propertyName: "accordionTabEls", predicate: AdaptAccordionTabComponent, descendants: true, read: ElementRef }], usesInheritance: true, ngImport: i0, template: "<div class=\"designer-modal-body modal-body d-flex mh-100\">\n  <div class=\"row flex-grow-1 w-100\">\n    <div *ngIf=\"!config.isReadOnly\" class=\"col-4 border-right d-flex flex-column mh-100\">\n      <div class=\"d-flex align-items-start justify-content-between\">\n        <h4 class=\"mt-2\">\n          {{ 'com.bmc.arsys.rx.client.shell.shell-global-search-records.available-records.title' | translate }}\n        </h4>\n      </div>\n\n      <div class=\"rx-card card flex-grow-1 mt-2\">\n        <div class=\"card-block\">\n          <div\n            *ngIf=\"filteredRecordDefinitionItems.length\"\n            cdkDropList\n            cdkDropListSortingDisabled\n            [cdkDropListConnectedTo]=\"['selected-record-items']\"\n          >\n            <adapt-tree\n              [value]=\"filteredRecordDefinitionItems\"\n              filter=\"true\"\n              [wrap]=\"treeWrap\"\n            >\n              <ng-template let-record adaptTreeNodeTemplate>\n                <div\n                  *ngIf=\"record.data\"\n                  class=\"rx-tree-draggable-node\"\n                  cdkDrag\n                  [cdkDragData]=\"record.data\"\n                >\n                  <div (dblclick)=\"addRecord(record.data)\">\n                    <button\n                      type=\"button\"\n                      class=\"rx-button-unstyled d-icon-plus_circle\"\n                      (click)=\"addRecord(record.data)\"\n                    ></button>\n\n                    <span class=\"rx-tree-node-label ml-3\">{{ record.data.definitionName }}</span>\n                  </div>\n                </div>\n              </ng-template>\n            </adapt-tree>\n          </div>\n\n          <div *ngIf=\"!filteredRecordDefinitionItems.length\"\n               class=\"d-flex justify-content-center h-100 align-items-center mt-2\">\n            <adapt-empty-state\n              class=\"w-100\"\n              label=\"{{ 'com.bmc.arsys.rx.client.shell.shell-global-search-records.available-records.empty-state.message' | translate }}\"\n              type=\"search\"\n            ></adapt-empty-state>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"d-flex flex-column mh-100 {{ config.isReadOnly ? 'col' : 'col-8' }}\">\n      <div class=\"d-flex align-items-start justify-content-between\">\n        <h4 class=\"mt-2\">\n          {{ 'com.bmc.arsys.rx.client.shell.shell-global-search-records.record-included-in-search-results.title' | translate }}\n        </h4>\n\n        <div *ngIf=\"selectedRecords.length\" class=\"btn-group\">\n          <button\n            adapt-button\n            btn-type=\"tertiary\"\n            type=\"button\"\n            rx-id=\"expand-all-button\"\n            (click)=\"toggleOpen(true)\"\n          >\n            {{ 'com.bmc.arsys.rx.client.common.expand-all.label' | translate }}\n          </button>\n\n          <button\n            adapt-button\n            btn-type=\"tertiary\"\n            type=\"button\"\n            rx-id=\"collapse-all-button\"\n            (click)=\"toggleOpen(false)\"\n          >\n            {{ 'com.bmc.arsys.rx.client.common.collapse-all.label' | translate }}\n          </button>\n        </div>\n      </div>\n\n      <div\n        id=\"selected-record-items\"\n        class=\"designer-modal-accordion-wrapper\"\n        cdkDropList\n        (cdkDropListDropped)=\"onSelectedRecordsListDrop($event)\"\n      >\n        <adapt-accordion [multiselect]=\"true\">\n          <form #selectedRecordsForm=\"ngForm\">\n            <div\n              *ngFor=\"\n              let record of selectedRecords;\n              let index = index;\n              let first = first;\n              let last = last;\n            \"\n              class=\"designer-modal-accordion-content\"\n              cdkDrag\n              cdkDragLockAxis=\"y\"\n              [cdkDragDisabled]=\"true\"\n            >\n              <adapt-accordion-tab\n                class=\"d-block\"\n                [isOpen]=\"record.isOpen\"\n                (open)=\"record.isOpen = true\"\n                (close)=\"record.isOpen = false\"\n              >\n                <div class=\"card-title-text w-100\">\n                  <div class=\"designer-modal-card-title-content\">\n                    <div class=\"left-header-block pl-0\">\n                      <div class=\"rx-ellipsis\" [title]=\"record.definitionName\" rx-id=\"card-title\">\n                        {{ record.definitionName }}\n                      </div>\n                    </div>\n\n                    <div *ngIf=\"!config.isReadOnly\" class=\"right-header-block\">\n                      <button\n                        class=\"d-icon-left-cross_adapt p-1 pr-4 ml-3\"\n                        adapt-button\n                        size=\"small\"\n                        type=\"button\"\n                        (click)=\"$event.stopPropagation(); removeRecord(record)\"\n                        rx-id=\"remove-button\"\n                      >\n                        {{ 'com.bmc.arsys.rx.client.common.remove.label' | translate }}\n                      </button>\n                    </div>\n                  </div>\n                </div>\n\n                <rx-definition-picker\n                  class=\"d-block w-50\"\n                  [name]=\"'selectedRecordName-' + index\"\n                  required=\"true\"\n                  [isDisabled]=\"config.isReadOnly\"\n                  [options]=\"definitionPickerOptions\"\n                  [(ngModel)]=\"record.view\"\n                  (ngModelChange)=\"markAsDirty()\"\n                ></rx-definition-picker>\n              </adapt-accordion-tab>\n            </div>\n          </form>\n        </adapt-accordion>\n      </div>\n\n      <div *ngIf=\"!selectedRecords.length\" class=\"d-flex justify-content-center h-100 align-items-center mt-2\">\n        <adapt-empty-state\n          class=\"w-100\"\n          label=\"{{ 'com.bmc.arsys.rx.client.shell.shell-global-search-records.record-included-in-search-results.empty-state.message' | translate }}\"\n          type=\"config\"\n        ></adapt-empty-state>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    *ngIf=\"!config.isReadOnly\"\n    adapt-button\n    btn-type=\"primary\"\n    type=\"button\"\n    rx-id=\"save-button\"\n    [disabled]=\"selectedRecordsForm.form.invalid || !isDirty()\"\n    (click)=\"onSave()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button\n    adapt-button\n    btn-type=\"secondary\"\n    type=\"button\"\n    rx-id=\"cancel-button\"\n    (click)=\"activeModalRef.dismiss(DismissReasons.CLOSE_BTN)\"\n  >\n    {{ config.isReadOnly ? ('com.bmc.arsys.rx.client.common.close.label' | translate) : ('com.bmc.arsys.rx.client.common.cancel.label' | translate) }}\n  </button>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.designer-modal-body{height:645px;min-height:calc(100% - 61px)!important}.designer-modal-accordion-wrapper{display:flex;flex-direction:column;height:100%;overflow:auto;padding-top:10px}.designer-modal-accordion-content{position:relative}.designer-modal-accordion-content.cdk-drag-preview{z-index:1200!important}.designer-modal-drag-handle{cursor:move;position:absolute;top:0;left:0;height:46px;padding:14px 10px 14px 14px;z-index:1}.designer-modal-card-title-content{width:100%;display:flex}.designer-modal-card-title-content .left-header-block,.designer-modal-card-title-content .right-header-block{display:flex;align-items:center}.designer-modal-card-title-content .left-header-block{flex-grow:1;min-width:0;font-size:14px;padding-left:22px}.designer-modal-card-sub-title{color:#7c7f81;font-weight:normal}.designer-modal-card-title-index-buttons{display:flex;font-size:19px}.rx-card{overflow:auto}.rx-tree-draggable-node{cursor:pointer}.rx-tree-draggable-node.cdk-drag-preview{z-index:1200!important}.rx-tree-draggable-node.cdk-drag{opacity:1}.rx-tree-node-label{word-break:break-all}rx-form-builder{max-width:400px}:host::ng-deep .a-tree__node_leaf .a-tree__toggle{display:none}\n"], components: [{ type: i1.AdaptTreeComponent, selector: "adapt-tree", inputs: ["value", "filter", "texts", "filterBtnClearText", "filterPlaceholder", "testID", "lazy", "lazyLoading", "trim", "wrap", "selectAllButton", "deselectAllButton", "treeScrollHeight", "adaptRadarDisableEventSending", "draggableScope", "droppableScope", "draggableNodes", "droppableNodes", "validateDrop"], outputs: ["onNodeDrop", "lazyLoad"] }, { type: i1.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i1.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }, { type: i4.RxDefinitionPickerComponent, selector: "rx-definition-picker", inputs: ["options", "isDisabled"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6.CdkDropList, selector: "[cdkDropList], cdk-drop-list", inputs: ["cdkDropListConnectedTo", "id", "cdkDropListEnterPredicate", "cdkDropListSortPredicate", "cdkDropListDisabled", "cdkDropListSortingDisabled", "cdkDropListAutoScrollDisabled", "cdkDropListOrientation", "cdkDropListLockAxis", "cdkDropListData", "cdkDropListAutoScrollStep"], outputs: ["cdkDropListDropped", "cdkDropListEntered", "cdkDropListExited", "cdkDropListSorted"], exportAs: ["cdkDropList"] }, { type: i1.AdaptTreeNodeTemplateDirective, selector: "[adaptTreeNodeTemplate]", inputs: ["adaptTreeNodeTemplate"] }, { type: i6.CdkDrag, selector: "[cdkDrag]", inputs: ["cdkDragDisabled", "cdkDragStartDelay", "cdkDragLockAxis", "cdkDragConstrainPosition", "cdkDragPreviewClass", "cdkDragBoundary", "cdkDragRootElement", "cdkDragPreviewContainer", "cdkDragData", "cdkDragFreeDragPosition"], outputs: ["cdkDragStarted", "cdkDragReleased", "cdkDragEnded", "cdkDragEntered", "cdkDragExited", "cdkDragDropped", "cdkDragMoved"], exportAs: ["cdkDrag"] }, { type: i7.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i7.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i7.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i7.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i7.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i7.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i8.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellGlobalSearchRecordsModalComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-shell-global-search-records-modal',
                    templateUrl: './shell-global-search-records-modal.component.html',
                    styleUrls: ['./shell-global-search-records-modal.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveModalRef }, { type: i2.RxRecordDefinitionDataPageService }, { type: i3.RxDefinitionNameService }, { type: i0.Injector }]; }, propDecorators: { accordionTabEls: [{
                type: ViewChildren,
                args: [AdaptAccordionTabComponent, { read: ElementRef }]
            }], selectedRecordsForm: [{
                type: ViewChild,
                args: ['selectedRecordsForm', { read: NgForm, static: true }]
            }] } });
//# sourceMappingURL=shell-global-search-records-modal.component.js.map