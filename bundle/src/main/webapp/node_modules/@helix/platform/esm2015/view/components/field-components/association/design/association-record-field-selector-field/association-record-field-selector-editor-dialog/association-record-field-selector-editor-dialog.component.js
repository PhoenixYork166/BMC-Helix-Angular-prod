import { Component, Injector } from '@angular/core';
import { ActiveModalRef, DismissReasons, TreeWrap } from '@bmc-ux/adapt-angular';
import { RxGuidService, RxStringService } from '@helix/platform/utils';
import { includes, map, pull, sortBy, transform } from 'lodash';
import { RxModalClass } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/utils";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@angular/common";
import * as i4 from "@angular/cdk/drag-drop";
import * as i5 from "@angular/forms";
import * as i6 from "@ngx-translate/core";
export class AssociationRecordFieldSelectorEditorDialogComponent extends RxModalClass {
    constructor(rxStringService, rxGuidService, activeModalRef, injector) {
        super(activeModalRef, injector);
        this.rxStringService = rxStringService;
        this.rxGuidService = rxGuidService;
        this.activeModalRef = activeModalRef;
        this.injector = injector;
        this.availableFieldTreeNodes = [];
        this.canSave = false;
        this.selectedFields = [];
        this.treeWrap = TreeWrap.WrapAll;
        this.config = this.activeModalRef.getData();
    }
    isDirty() {
        return this.canSave;
    }
    ngOnInit() {
        super.ngOnInit();
        this.fieldLabelsMap = transform(this.config.fields, (result, field) => {
            result[field.id] = field.name;
        }, {});
        this.availableFieldTreeNodes = this.config.fields
            .map((field) => ({
            data: field,
            label: field.name
        }))
            .sort((field1, field2) => field1.label.localeCompare(field2.label));
        this.selectedFields = map(this.config.selectedFields, (field) => {
            const descriptor = this.config.fields.find((fieldItem) => fieldItem.id === Number(field.data.fieldId));
            return Object.assign(Object.assign({}, field), { labelText: field.data.label, indexOrder: Number(field.data.index), descriptor, isOpen: field === this.config.fieldToEdit });
        });
        this.refreshFieldDescriptorsList();
    }
    addField(field) {
        this.canSave = true;
        this.selectedFields.push({
            guid: this.rxGuidService.generate(),
            data: {
                fieldId: String(field.id),
                label: field.name,
                index: String(this.selectedFields.length)
            },
            descriptor: field,
            labelText: field.name,
            indexOrder: this.selectedFields.length,
            isOpen: true
        });
        this.refreshFieldDescriptorsList();
    }
    onSelectedFieldsListDrop(event) {
        this.addField(event.item.data);
    }
    onSave() {
        const result = this.selectedFields.map((field) => {
            return {
                guid: field.guid,
                type: 'rx-associated-record-field',
                data: {
                    fieldId: field.data.fieldId,
                    index: String(field.indexOrder),
                    label: field.labelText
                }
            };
        });
        this.activeModalRef.close(result);
    }
    onRemove(field) {
        this.canSave = true;
        pull(this.selectedFields, field);
        this.refreshFieldDescriptorsList();
    }
    onMoveUp(field, index) {
        this.canSave = true;
        const prevField = this.selectedFields[index - 1];
        if (prevField) {
            prevField.indexOrder++;
            field.indexOrder--;
            this.sortFields();
        }
    }
    onMoveDown(field, index) {
        this.canSave = true;
        const nextAction = this.selectedFields[index + 1];
        if (nextAction) {
            nextAction.indexOrder--;
            field.indexOrder++;
            this.sortFields();
        }
    }
    toggleOpen(expandAll) {
        this.selectedFields.forEach((field) => (field.isOpen = expandAll));
    }
    sortFields() {
        this.selectedFields = sortBy(this.selectedFields, (field) => field.indexOrder);
    }
    refreshFieldDescriptorsList() {
        const selectedFieldIds = this.selectedFields.map((field) => String(field.data.fieldId));
        this.filteredFieldDescriptors = this.config.fields
            .filter((fieldDescriptor) => !includes(selectedFieldIds, String(fieldDescriptor.id)))
            .sort((field1, field2) => field1.name.localeCompare(field2.name));
    }
    cancel() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
}
AssociationRecordFieldSelectorEditorDialogComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationRecordFieldSelectorEditorDialogComponent, deps: [{ token: i1.RxStringService }, { token: i1.RxGuidService }, { token: i2.ActiveModalRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
AssociationRecordFieldSelectorEditorDialogComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: AssociationRecordFieldSelectorEditorDialogComponent, selector: "rx-association-record-field-selector-editor-dialog", usesInheritance: true, ngImport: i0, template: "<div class=\"designer-modal-body modal-body d-flex mh-100\">\n  <div class=\"row flex-grow-1 w-100\">\n    <div *ngIf=\"!config.isReadOnly\" class=\"col-4 border-right d-flex flex-column mh-100\">\n      <div class=\"d-flex align-items-start justify-content-between\">\n        <h4 class=\"mt-2\">Available fields</h4>\n      </div>\n\n      <div class=\"rx-card card flex-grow-1 mt-2\">\n        <div class=\"card-block\">\n          <div\n            *ngIf=\"availableFieldTreeNodes.length; else adaptTreeEmptyStateTemplate\"\n            cdkDropList\n            cdkDropListSortingDisabled\n            [cdkDropListConnectedTo]=\"['selected-fields']\"\n          >\n            <adapt-tree [value]=\"availableFieldTreeNodes\" filter=\"true\" [wrap]=\"treeWrap\">\n              <ng-template let-field adaptTreeNodeTemplate>\n                <div *ngIf=\"field.data\" class=\"rx-tree-draggable-node\" cdkDrag [cdkDragData]=\"field.data\">\n                  <div (dblclick)=\"addField(field.data)\">\n                    <button\n                      type=\"button\"\n                      class=\"rx-button-unstyled d-icon-plus_circle\"\n                      (click)=\"addField(field.data)\"\n                    ></button>\n\n                    <span class=\"rx-tree-node-label ml-3\">{{ field.data.name }}</span>\n                  </div>\n                </div>\n              </ng-template>\n            </adapt-tree>\n          </div>\n\n          <ng-template #adaptTreeEmptyStateTemplate>\n            <div class=\"d-flex justify-content-center h-100 align-items-center mt-2\">\n              <adapt-empty-state class=\"w-100\" label=\"No fields found\" type=\"search\"></adapt-empty-state>\n            </div>\n          </ng-template>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"d-flex flex-column mh-100 {{ config.isReadOnly ? 'col' : 'col-8' }}\">\n      <div class=\"d-flex align-items-start justify-content-between\">\n        <h4 class=\"mt-2\">Selected fileds</h4>\n\n        <div *ngIf=\"selectedFields.length\" class=\"btn-group\">\n          <button adapt-button btn-type=\"tertiary\" type=\"button\" rx-id=\"expand-all-button\" (click)=\"toggleOpen(true)\">\n            {{ 'com.bmc.arsys.rx.client.common.expand-all.label' | translate }}\n          </button>\n\n          <button\n            adapt-button\n            btn-type=\"tertiary\"\n            type=\"button\"\n            rx-id=\"collapse-all-button\"\n            (click)=\"toggleOpen(false)\"\n          >\n            {{ 'com.bmc.arsys.rx.client.common.collapse-all.label' | translate }}\n          </button>\n        </div>\n      </div>\n\n      <div\n        id=\"selected-fields\"\n        class=\"designer-modal-accordion-wrapper\"\n        cdkDropList\n        (cdkDropListDropped)=\"onSelectedFieldsListDrop($event)\"\n      >\n        <adapt-accordion [multiselect]=\"true\">\n          <div\n            *ngFor=\"let field of selectedFields; let index = index; let first = first; let last = last\"\n            class=\"designer-modal-accordion-content\"\n            cdkDrag\n            cdkDragLockAxis=\"y\"\n            [cdkDragDisabled]=\"true\"\n          >\n            <adapt-accordion-tab\n              class=\"d-block\"\n              [isOpen]=\"field.isOpen\"\n              (open)=\"field.isOpen = true\"\n              (close)=\"field.isOpen = false\"\n            >\n              <div class=\"card-title-text w-100\">\n                <div class=\"designer-modal-card-title-content\">\n                  <div class=\"left-header-block pl-0\">\n                    <div class=\"rx-ellipsis\" [title]=\"fieldLabelsMap[field.data.fieldId]\" rx-id=\"card-title\">\n                      {{ fieldLabelsMap[field.data.fieldId] }}\n                    </div>\n                  </div>\n\n                  <div *ngIf=\"!config.isReadOnly\" class=\"right-header-block\">\n                    <div class=\"designer-modal-card-title-index-buttons\">\n                      <button\n                        class=\"d-icon-left-triangle_down rx-button-unstyled\"\n                        type=\"button\"\n                        [disabled]=\"last\"\n                        (click)=\"$event.stopPropagation(); onMoveDown(field, index)\"\n                        rx-id=\"move-down-button\"\n                      ></button>\n\n                      <button\n                        class=\"d-icon-left-triangle_up rx-button-unstyled\"\n                        type=\"button\"\n                        [disabled]=\"first\"\n                        (click)=\"$event.stopPropagation(); onMoveUp(field, index)\"\n                        rx-id=\"move-up-button\"\n                      ></button>\n                    </div>\n\n                    <button\n                      class=\"d-icon-left-cross_adapt p-1 pr-4 ml-3\"\n                      adapt-button\n                      size=\"small\"\n                      type=\"button\"\n                      (click)=\"onRemove(field)\"\n                      rx-id=\"remove-button\"\n                    >\n                      {{ 'com.bmc.arsys.rx.client.common.remove.label' | translate }}\n                    </button>\n                  </div>\n                </div>\n              </div>\n\n              <adapt-rx-textfield\n                class=\"text-aria-resize\"\n                label=\"Label\"\n                [(ngModel)]=\"field.labelText\"\n                (ngModelChange)=\"canSave = true\"\n              >\n              </adapt-rx-textfield>\n            </adapt-accordion-tab>\n          </div>\n        </adapt-accordion>\n      </div>\n\n      <div *ngIf=\"!selectedFields.length\" class=\"d-flex justify-content-center h-100 align-items-center mt-2\">\n        <adapt-empty-state class=\"w-100\" label=\"No fields selected\" type=\"config\"></adapt-empty-state>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    *ngIf=\"!config.isReadOnly\"\n    adapt-button\n    btn-type=\"primary\"\n    type=\"button\"\n    rx-id=\"save-button\"\n    [disabled]=\"!canSave\"\n    (click)=\"onSave()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button adapt-button btn-type=\"secondary\" type=\"button\" rx-id=\"cancel-button\" (click)=\"cancel()\">\n    {{\n      config.isReadOnly\n        ? ('com.bmc.arsys.rx.client.common.close.label' | translate)\n        : ('com.bmc.arsys.rx.client.common.cancel.label' | translate)\n    }}\n  </button>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.designer-modal-body{height:645px;min-height:calc(100% - 61px)!important}.designer-modal-accordion-wrapper{display:flex;flex-direction:column;height:100%;overflow:auto;padding-top:10px}.designer-modal-accordion-content{position:relative}.designer-modal-accordion-content.cdk-drag-preview{z-index:1200!important}.designer-modal-drag-handle{cursor:move;position:absolute;top:0;left:0;height:46px;padding:14px 10px 14px 14px;z-index:1}.designer-modal-card-title-content{width:100%;display:flex}.designer-modal-card-title-content .left-header-block,.designer-modal-card-title-content .right-header-block{display:flex;align-items:center}.designer-modal-card-title-content .left-header-block{flex-grow:1;min-width:0;font-size:14px;padding-left:22px}.designer-modal-card-sub-title{color:#7c7f81;font-weight:normal}.designer-modal-card-title-index-buttons{display:flex;font-size:19px}.rx-card{overflow:auto}.rx-tree-draggable-node{cursor:pointer}.rx-tree-draggable-node.cdk-drag-preview{z-index:1200!important}.rx-tree-draggable-node.cdk-drag{opacity:1}.rx-tree-node-label{word-break:break-all}rx-form-builder{max-width:400px}\n"], components: [{ type: i2.AdaptTreeComponent, selector: "adapt-tree", inputs: ["value", "filter", "texts", "filterBtnClearText", "filterPlaceholder", "testID", "lazy", "lazyLoading", "trim", "wrap", "selectAllButton", "deselectAllButton", "treeScrollHeight", "adaptRadarDisableEventSending", "draggableScope", "droppableScope", "draggableNodes", "droppableNodes", "validateDrop"], outputs: ["onNodeDrop", "lazyLoad"] }, { type: i2.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }, { type: i2.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i2.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i2.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }, { type: i2.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.CdkDropList, selector: "[cdkDropList], cdk-drop-list", inputs: ["cdkDropListConnectedTo", "id", "cdkDropListEnterPredicate", "cdkDropListSortPredicate", "cdkDropListDisabled", "cdkDropListSortingDisabled", "cdkDropListAutoScrollDisabled", "cdkDropListOrientation", "cdkDropListLockAxis", "cdkDropListData", "cdkDropListAutoScrollStep"], outputs: ["cdkDropListDropped", "cdkDropListEntered", "cdkDropListExited", "cdkDropListSorted"], exportAs: ["cdkDropList"] }, { type: i2.AdaptTreeNodeTemplateDirective, selector: "[adaptTreeNodeTemplate]", inputs: ["adaptTreeNodeTemplate"] }, { type: i4.CdkDrag, selector: "[cdkDrag]", inputs: ["cdkDragDisabled", "cdkDragStartDelay", "cdkDragLockAxis", "cdkDragConstrainPosition", "cdkDragPreviewClass", "cdkDragBoundary", "cdkDragRootElement", "cdkDragPreviewContainer", "cdkDragData", "cdkDragFreeDragPosition"], outputs: ["cdkDragStarted", "cdkDragReleased", "cdkDragEnded", "cdkDragEntered", "cdkDragExited", "cdkDragDropped", "cdkDragMoved"], exportAs: ["cdkDrag"] }, { type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i6.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationRecordFieldSelectorEditorDialogComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-association-record-field-selector-editor-dialog',
                    templateUrl: './association-record-field-selector-editor-dialog.component.html',
                    styleUrls: ['./association-record-field-selector-editor-dialog.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.RxStringService }, { type: i1.RxGuidService }, { type: i2.ActiveModalRef }, { type: i0.Injector }]; } });
//# sourceMappingURL=association-record-field-selector-editor-dialog.component.js.map