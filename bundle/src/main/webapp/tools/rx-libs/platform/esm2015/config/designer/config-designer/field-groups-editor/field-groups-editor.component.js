import { Component, Injector } from '@angular/core';
import { ActiveModalRef, DismissReasons } from '@bmc-ux/adapt-angular';
import { RxNotificationService } from '@helix/platform/shared/api';
import { RxModalClass } from '@helix/platform/ui-kit';
import { TranslateService } from '@ngx-translate/core';
import { chain, some, trim } from 'lodash';
import { FieldGroupsEditorStore } from './field-groups-editor.store';
import { ReplaySubject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./field-groups-editor.store";
import * as i2 from "@ngx-translate/core";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "@bmc-ux/adapt-angular";
import * as i5 from "@angular/common";
import * as i6 from "@angular/forms";
export class FieldGroupsEditorComponent extends RxModalClass {
    constructor(fieldGroupsEditorStore, translateService, rxNotificationService, activeModalRef, injector) {
        super(activeModalRef, injector);
        this.fieldGroupsEditorStore = fieldGroupsEditorStore;
        this.translateService = translateService;
        this.rxNotificationService = rxNotificationService;
        this.activeModalRef = activeModalRef;
        this.destroyed$ = new ReplaySubject(1);
        this.listBuilderTexts = {
            searchPlaceholder: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.field-groups-list.placeholder')
        };
        this.duplicateGroupMsg = this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.duplicate-value.message');
        this.itemValidation = (itemName, items, isEdit) => some(items, (item) => trim(item.name) === trim(itemName)) ? this.duplicateGroupMsg : null;
        this.vm$ = this.fieldGroupsEditorStore.vm$;
    }
    ngOnInit() {
        super.ngOnInit();
        this.fieldGroupsEditorStore.isDirty$.pipe(filter(Boolean), take(1)).subscribe(() => {
            this.markAsDirty();
        });
        const fields = this.activeModalRef.getData().fields.map((field) => ({
            guid: field.guid,
            name: field.id,
            groupName: field.localeList[0].fieldGrouping,
            fieldOrder: field.fieldOrder,
            checked: false
        }));
        const groups = chain(fields)
            .map((field, index) => ({ name: field.groupName, id: index, guid: field.guid }))
            .filter((group) => !!group.name)
            .uniqBy('name')
            .sort((a, b) => a.name.localeCompare(b.name))
            .value();
        this.fieldGroupsEditorStore.patchState({ fields, groups });
    }
    onGroupChange(groups) {
        var _a;
        this.fieldGroupsEditorStore.selectGroup((_a = groups.find((field) => field.selected)) === null || _a === void 0 ? void 0 : _a.name);
    }
    onGroupAdd(addedGroup, groups) {
        groups.forEach((group) => {
            group.selected = group === addedGroup;
        });
    }
    onGroupRemove(removedGroup) {
        this.fieldGroupsEditorStore.removeGroup(removedGroup.name);
    }
    onGroupRename([oldGroup, newGroup]) {
        this.fieldGroupsEditorStore.renameGroup({ oldName: oldGroup.name, newName: newGroup.name });
    }
    onAvailableFieldsChange(checkedFields, availableFields) {
        availableFields.forEach((field) => {
            if (some(checkedFields, { guid: field.guid })) {
                this.fieldGroupsEditorStore.checkField(field.guid);
            }
            else {
                this.fieldGroupsEditorStore.uncheckField(field.guid);
            }
        });
    }
    onSelectedFieldsChange(fields) {
        fields.forEach((field) => {
            if (field.selected) {
                this.fieldGroupsEditorStore.checkField(field.guid);
            }
            else {
                this.fieldGroupsEditorStore.uncheckField(field.guid);
            }
        });
        this.fieldGroupsEditorStore.sortSelectedFields(fields.map((field) => field.guid));
    }
    onDragEnd() {
        this.fieldGroupsEditorStore.markDirty();
    }
    moveToSelected() {
        this.fieldGroupsEditorStore.assignCheckedFields();
    }
    moveToAvailable() {
        this.fieldGroupsEditorStore.unassignCheckedFields();
    }
    onFieldRemove(removedField) {
        this.fieldGroupsEditorStore.removeField(removedField.guid);
    }
    alphabeticSort(a, b) {
        return a.name.localeCompare(b.name);
    }
    optionFormatter(field) {
        return field.name;
    }
    saveFieldGroups() {
        this.fieldGroupsEditorStore.fields$.pipe(take(1)).subscribe((fields) => {
            this.activeModalRef.close({ fields });
        });
    }
    cancel() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
FieldGroupsEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FieldGroupsEditorComponent, deps: [{ token: i1.FieldGroupsEditorStore }, { token: i2.TranslateService }, { token: i3.RxNotificationService }, { token: i4.ActiveModalRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
FieldGroupsEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: FieldGroupsEditorComponent, selector: "rx-field-groups-editor", providers: [FieldGroupsEditorStore], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"vm$ | async as vm\">\n  <div class=\"designer-modal-body modal-body d-flex mh-100 flex-column\">\n    <div class=\"d-flex h-100 flex-fill\">\n      <adapt-rx-list-builder\n        class=\"flex-grow-1 mr-3\"\n        [ngModel]=\"vm.groups\"\n        selectionMode=\"single\"\n        (listItemAdd)=\"onGroupAdd($event, vm.groups)\"\n        (listItemRemove)=\"onGroupRemove($event)\"\n        (listItemUpdate)=\"onGroupRename($event)\"\n        (ngModelChange)=\"onGroupChange($event)\"\n        [customSort]=\"alphabeticSort\"\n        [hideListAreaLabel]=\"true\"\n        [texts]=\"listBuilderTexts\"\n        [itemValidation]=\"itemValidation\"\n        label=\"{{ 'com.bmc.arsys.rx.client.config-designer.field-groups.label' | translate }}\"\n        rx-id=\"field-groups-list\"\n      ></adapt-rx-list-builder>\n\n      <adapt-rx-select\n        class=\"flex-grow-1 h-100 d-flex flex-column\"\n        popupMaxHeight=\"100%\"\n        [options]=\"vm.availableFields\"\n        [ngModel]=\"vm.checkedAvailableFields\"\n        [deselectAllButton]=\"true\"\n        [selectAllButton]=\"true\"\n        [enableFilter]=\"true\"\n        [inline]=\"true\"\n        label=\"{{ 'com.bmc.arsys.rx.client.config-designer.available-fields.label' | translate }}\"\n        [multiple]=\"true\"\n        [singleSelectStyle]=\"'marker'\"\n        [optionFormatter]=\"optionFormatter\"\n        (ngModelChange)=\"onAvailableFieldsChange($event, vm.availableFields)\"\n        rx-id=\"available-fields-list\"\n      ></adapt-rx-select>\n\n      <div class=\"mx-2 d-flex flex-column\">\n        <button\n          type=\"button\"\n          adapt-button\n          class=\"d-icon-right-angle_right mt-auto mb-2\"\n          btn-type=\"secondary\"\n          (click)=\"moveToSelected()\"\n          [disabled]=\"!vm.checkedAvailableFields.length\"\n          rx-id=\"move-to-selected-button\"\n        ></button>\n\n        <button\n          type=\"button\"\n          adapt-button\n          class=\"d-icon-right-angle_left mb-auto\"\n          btn-type=\"secondary\"\n          (click)=\"moveToAvailable()\"\n          [disabled]=\"!vm.checkedSelectedFields.length\"\n          rx-id=\"move-to-available-button\"\n        ></button>\n      </div>\n\n      <adapt-rx-list-builder\n        class=\"flex-grow-1\"\n        [ngModel]=\"vm.selectedFields\"\n        selectionMode=\"multiple\"\n        (listItemRemove)=\"onFieldRemove($event)\"\n        [hideSearchField]=\"true\"\n        [hideListAreaLabel]=\"true\"\n        [hideEdit]=\"true\"\n        (ngModelChange)=\"onSelectedFieldsChange($event)\"\n        (dragend)=\"onDragEnd()\"\n        label=\"{{ 'com.bmc.arsys.rx.client.config-designer.selected-fields.label' | translate }}\"\n        rx-id=\"selected-fields-list\"\n      ></adapt-rx-list-builder>\n    </div>\n  </div>\n\n  <div class=\"modal-footer\">\n    <button\n      type=\"button\"\n      adapt-button\n      btn-type=\"primary\"\n      rx-id=\"save-field-groups-button\"\n      (click)=\"saveFieldGroups()\"\n      [disabled]=\"!vm.isDirty\"\n    >\n      {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n    </button>\n\n    <button type=\"button\" adapt-button btn-type=\"secondary\" rx-id=\"cancel-button\" (click)=\"cancel()\">\n      {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n    </button>\n  </div>\n</ng-container>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.designer-modal-body{height:645px;min-height:calc(100% - 61px)!important}.designer-modal-accordion-wrapper{display:flex;flex-direction:column;height:100%;overflow:auto;padding-top:10px}.designer-modal-accordion-content{position:relative}.designer-modal-accordion-content.cdk-drag-preview{z-index:1200!important}.designer-modal-drag-handle{cursor:move;position:absolute;top:0;left:0;height:46px;padding:14px 10px 14px 14px;z-index:1}.designer-modal-card-title-content{width:100%;display:flex}.designer-modal-card-title-content .left-header-block,.designer-modal-card-title-content .right-header-block{display:flex;align-items:center}.designer-modal-card-title-content .left-header-block{flex-grow:1;min-width:0;font-size:14px;padding-left:22px}.designer-modal-card-sub-title{color:#7c7f81;font-weight:normal}.designer-modal-card-title-index-buttons{display:flex;font-size:19px}.rx-card{overflow:auto}.rx-tree-draggable-node{cursor:pointer}.rx-tree-draggable-node.cdk-drag-preview{z-index:1200!important}.rx-tree-draggable-node.cdk-drag{opacity:1}.rx-tree-node-label{word-break:break-all}rx-form-builder{max-width:400px}:host ::ng-deep adapt-rx-select{width:30%;overflow:auto}:host ::ng-deep adapt-rx-select .rx-select__options-wrapper{flex:1 1 auto}:host ::ng-deep adapt-rx-list-builder{overflow:auto;width:30%}:host ::ng-deep adapt-rx-list-builder .adapt-list-builder{height:100%}:host ::ng-deep adapt-rx-list-builder .adapt-list-container{flex-grow:1}:host ::ng-deep adapt-rx-list-builder .adapt-list-builder,:host ::ng-deep adapt-rx-list-builder .adapt-list-builder__wrp{display:flex;flex-direction:column;height:100%}\n"], components: [{ type: i4.AdaptRxListBuilderComponent, selector: "adapt-rx-list-builder", inputs: ["hideSearchField", "hideEdit", "hideDelete", "hideListAreaLabel", "customSort", "texts", "menuHeight", "listItemMaxLength", "generateListItemId", "itemValidation", "disabled", "treeStructure", "listItemFormatter", "listItemSetterProp", "listItemContentTemplate", "selectionMode"], outputs: ["listItemAdd", "listItemEdit", "listItemUpdate", "listItemRemove"] }, { type: i4.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i4.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "async": i5.AsyncPipe, "translate": i2.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FieldGroupsEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-field-groups-editor',
                    templateUrl: './field-groups-editor.component.html',
                    styleUrls: ['./field-groups-editor.component.scss'],
                    providers: [FieldGroupsEditorStore]
                }]
        }], ctorParameters: function () { return [{ type: i1.FieldGroupsEditorStore }, { type: i2.TranslateService }, { type: i3.RxNotificationService }, { type: i4.ActiveModalRef }, { type: i0.Injector }]; } });
//# sourceMappingURL=field-groups-editor.component.js.map