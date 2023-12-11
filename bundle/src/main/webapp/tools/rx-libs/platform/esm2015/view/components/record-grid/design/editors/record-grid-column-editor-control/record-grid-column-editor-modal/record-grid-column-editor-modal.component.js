import { CdkDrag, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, ElementRef, Injector, NgZone, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { ActiveModalRef, AdaptAccordionTabComponent, DismissReasons, TreeWrap } from '@bmc-ux/adapt-angular';
import { RxFieldDefinitionService, RxRecordDefinitionCacheService } from '@helix/platform/record/api';
import { RxDefinitionNameService, Tooltip } from '@helix/platform/shared/api';
import { RxExpressionEditorService } from '@helix/platform/shared/components';
import { RxModalClass, RxModalService } from '@helix/platform/ui-kit';
import { RxGuidService } from '@helix/platform/utils';
import { ActionListControlComponent, NamedListFilterExpressionConfigurator } from '@helix/platform/view/designer';
import { every, find, findIndex, forEach, isEmpty, isNil, remove } from 'lodash';
import { RxRecordGridUtilsService } from '../../../../common/services/record-grid-utils.service';
import { RX_RECORD_GRID } from '../../../../record-grid.constant';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@helix/platform/ui-kit";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "../../../../common/services/record-grid-utils.service";
import * as i5 from "@helix/platform/record/api";
import * as i6 from "@helix/platform/utils";
import * as i7 from "@ngx-translate/core";
import * as i8 from "@helix/platform/shared/components";
import * as i9 from "./column-editor-alignment/column-editor-alignment.component";
import * as i10 from "./cell-display-properties/cell-display-properties.component";
import * as i11 from "./named-filter-options/named-filter-options.component";
import * as i12 from "@helix/platform/view/designer";
import * as i13 from "@angular/common";
import * as i14 from "@angular/cdk/drag-drop";
import * as i15 from "@angular/forms";
export class RecordGridColumnEditorModalComponent extends RxModalClass {
    constructor(activeModalRef, rxModalService, definitionNameService, rxRecordGridUtilsService, rxFieldDefinitionService, rxRecordDefinitionCacheService, rxGuidService, ngZone, injector, translateService, rxExpressionEditorService) {
        super(activeModalRef, injector);
        this.activeModalRef = activeModalRef;
        this.rxModalService = rxModalService;
        this.definitionNameService = definitionNameService;
        this.rxRecordGridUtilsService = rxRecordGridUtilsService;
        this.rxFieldDefinitionService = rxFieldDefinitionService;
        this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
        this.rxGuidService = rxGuidService;
        this.ngZone = ngZone;
        this.injector = injector;
        this.translateService = translateService;
        this.rxExpressionEditorService = rxExpressionEditorService;
        this.columnProperties = RX_RECORD_GRID.columnProperties;
        this.actionsColumnProperties = RX_RECORD_GRID.actionsColumnProperties;
        this.filteredColumns = [];
        this.availableColumnsTree = [];
        this.startedLoadingAssociationDescriptors = false;
        this.treeWrap = TreeWrap.WrapAll;
        this.columnWidthPropertyOptions = this.columnProperties.find(({ name }) => name === 'width').options;
        this.typeaheadKeystrokeCountOptions = Object.assign(Object.assign({}, this.columnProperties.find(({ name }) => name === 'typeaheadKeystrokeCount').options), { tooltip: new Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.view-components.record-grid-column.keystroke-count.tooltip')) });
        const params = this.activeModalRef.getData().columnParams;
        this.activeColumn = params.activeColumn;
        this.activeActionIndex = params.activeActionIndex;
        this.recordDefinition = params.recordDefinition;
        this.isReadOnly = params.isReadOnly;
        this.columns = params.columns
            .map((column) => {
            const additionalQueryCriteriaExpressionOptions = column.fieldDefinition.namedListDefinition
                ? this.getAdditionalQueryCriteriaExpressionOptions(column)
                : null;
            return Object.assign(Object.assign({}, column), { isOpen: column === this.activeColumn, label: this.rxRecordGridUtilsService.getColumnLabel(column.fieldDefinition, column.associationDescriptor), clickable: !isEmpty(column.actions), additionalQueryCriteriaExpressionOptions });
        })
            .sort((a, b) => a.index - b.index);
        this.getAvailableColumnsTree();
    }
    ngAfterViewInit() {
        this.updateSelectedColumnsDropList();
        this.openActiveAction();
        const openGridColumnIndex = findIndex(this.columns, 'isOpen');
        if (openGridColumnIndex !== -1) {
            this.accordionTabEls.toArray()[openGridColumnIndex].nativeElement.scrollIntoView({
                block: 'nearest'
            });
        }
    }
    isActionsColumn(fieldId) {
        return fieldId === RX_RECORD_GRID.actionsColumnFieldDefinition.id;
    }
    updateSelectedColumnsDropList() {
        this.updateColumnsDropList(this.draggableSelectedColumns, this.selectedColumnsDropList);
    }
    updateAssociatedAvailableColumnsDropList() {
        this.updateColumnsDropList(this.draggableAssociatedAvailableColumns, this.associatedAvailableColumnsDropList);
    }
    updateColumnsDropList(draggableColumnsList, dropList) {
        // Workaround: update due to injection bug with the adapt-accordion and adapt-tree
        const draggableColumns = draggableColumnsList.toArray();
        const columns = this.columns;
        draggableColumns.sort((column1, column2) => {
            return columns.indexOf(column1.data) - columns.indexOf(column2.data);
        });
        dropList._dropListRef.withItems(draggableColumns.map((drag) => {
            const dragRef = drag._dragRef;
            if (!dragRef._initialContainer) {
                dragRef._initialContainer = dropList._dropListRef;
            }
            return drag._dragRef;
        }));
    }
    cancel() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
    onDropInSelectedColumnsContainer(event) {
        if (event.previousContainer !== event.container && this.isColumnEditorAvailableColumn(event.item.data)) {
            this.addColumn(event.item.data, event.currentIndex);
        }
        else if (event.previousIndex !== event.currentIndex) {
            this.moveColumn(event.previousIndex, event.currentIndex);
        }
    }
    onColumnCheckboxPropertyChange(value, column, columnProperty) {
        if (columnProperty.name === 'filterable' && column.fieldDefinition.namedListDefinition) {
            if (value) {
                column.typeaheadKeystrokeCount = RX_RECORD_GRID.defaultTypeaheadKeystrokeCount;
            }
            else {
                column.typeaheadKeystrokeCount = null;
                column.additionalQueryCriteria = null;
            }
        }
        this.markAsDirty();
    }
    onColumnDragStarted() {
        this.updateSelectedColumnsDropList();
    }
    onAssociatedAvailableColumnsDragStarted() {
        this.onColumnDragStarted();
        this.updateAssociatedAvailableColumnsDropList();
    }
    isColumnEditorAvailableColumn(column) {
        return Boolean(column.fieldDefinitionName);
    }
    moveColumn(fromIndex, toIndex) {
        this.markAsDirty();
        moveItemInArray(this.columns, fromIndex, toIndex);
        this.updateColumnIndexes();
    }
    removeColumn(index) {
        this.markAsDirty();
        const column = this.columns[index];
        this.columns.splice(index, 1);
        const associatedAvailableColumnsNode = column.associationDescriptor
            ? this.getAssociatedAvailableColumnsNode(column.associationDescriptor.label)
            : this.availableColumnsTree[0];
        // variable can be null when we want remove column, but associations are not loaded yet
        if (associatedAvailableColumnsNode && associatedAvailableColumnsNode.data.allAvailableColumns) {
            associatedAvailableColumnsNode.data.allAvailableColumns.push(this.getColumnMetadata(column.fieldDefinition, column.associationDescriptor));
            this.updateAvailableColumnsTree();
        }
    }
    getAssociatedAvailableColumnsNode(associationDescriptorLabel) {
        return this.availableColumnsTree.find((associatedAvailableColumn) => associatedAvailableColumn.data.associationDescriptor &&
            associatedAvailableColumn.data.associationDescriptor.label === associationDescriptorLabel);
    }
    getAvailableColumnsTree() {
        const recordNode = {
            children: null,
            leaf: false,
            expanded: true,
            expandedIcon: 'd-icon-file_text',
            collapsedIcon: 'd-icon-file_text',
            label: this.definitionNameService.getDisplayName(this.recordDefinition.name),
            key: this.definitionNameService.getDisplayName(this.recordDefinition.name),
            data: {
                allAvailableColumns: null
            }
        };
        if (!this.startedLoadingAssociationDescriptors) {
            this.startedLoadingAssociationDescriptors = true;
            this.rxRecordGridUtilsService
                .getAssociationDescriptors(this.recordDefinition.name)
                .subscribe((associationDescriptors) => {
                associationDescriptors = associationDescriptors.slice();
                associationDescriptors.sort((descriptor1, descriptor2) => descriptor1.label.localeCompare(descriptor2.label));
                this.availableColumnsTree = associationDescriptors.map((associationDescriptor) => {
                    return {
                        children: null,
                        leaf: false,
                        expandedIcon: 'd-icon-arrow_schema',
                        collapsedIcon: 'd-icon-arrow_schema',
                        label: associationDescriptor.label,
                        key: associationDescriptor.associationDefinition.name,
                        data: {
                            associationDescriptor,
                            allAvailableColumns: null
                        }
                    };
                });
                this.availableColumnsTree.unshift(recordNode);
                this.availableColumnsTree.forEach((node) => {
                    this.onNodeExpand({ node });
                });
            });
        }
    }
    updateAvailableColumnsTree() {
        this.availableColumnsTree.forEach((node) => {
            const allAvailableColumns = node.data.allAvailableColumns;
            if (allAvailableColumns) {
                const availableColumns = this.sortAvailableColumns(allAvailableColumns);
                const definitionName = node.data.associationDescriptor
                    ? node.data.associationDescriptor.associationDefinition.name
                    : this.recordDefinition.name;
                node.children = availableColumns.map((availableColumn) => {
                    return {
                        children: null,
                        leaf: true,
                        label: availableColumn.fieldDefinitionName,
                        key: `${definitionName}-${availableColumn.fieldDefinition.id}`,
                        data: {
                            availableColumn
                        }
                    };
                });
            }
        });
    }
    onNodeExpand({ node }) {
        const associationDescriptor = node.data.associationDescriptor;
        if (associationDescriptor && !node.data.allAvailableColumns) {
            node.data.allAvailableColumns = [];
            this.rxRecordDefinitionCacheService
                .getRecordDefinition(associationDescriptor.recordDefinitionName)
                .subscribe((recordDefinition) => {
                node.data.allAvailableColumns = this.getAvailableColumns(recordDefinition, associationDescriptor);
                this.updateAvailableColumnsTree();
            });
        }
        else if (!associationDescriptor) {
            node.data.allAvailableColumns = this.getAvailableColumns(this.recordDefinition);
            this.updateAvailableColumnsTree();
        }
    }
    addColumn(availableColumn, insertIndex) {
        this.markAsDirty();
        if (!find(this.columns, (column) => column.fieldId === availableColumn.fieldId)) {
            const additionalQueryCriteriaExpressionOptions = availableColumn.fieldDefinition.namedListDefinition
                ? this.getAdditionalQueryCriteriaExpressionOptions(availableColumn)
                : null;
            const newColumn = Object.assign(Object.assign({}, this.getColumnEditorColumnData(availableColumn)), { additionalQueryCriteriaExpressionOptions });
            if (isNil(insertIndex)) {
                this.columns.push(newColumn);
            }
            else {
                this.columns.splice(insertIndex, 0, newColumn);
            }
            this.updateColumnIndexes();
            this.removeFromAvailableColumns(availableColumn);
            setTimeout(() => {
                this.accordionTabEls.toArray()[insertIndex !== null && insertIndex !== void 0 ? insertIndex : this.columns.length - 1].nativeElement.scrollIntoView();
            });
        }
    }
    getColumnEditorColumnData(availableColumn) {
        const column = {
            guid: this.rxGuidService.generate(),
            label: availableColumn.label,
            fieldId: availableColumn.fieldId,
            associationDescriptor: availableColumn.associationDescriptor,
            fieldDefinition: availableColumn.fieldDefinition,
            actions: [],
            title: availableColumn.fieldDefinitionName,
            isOpen: true
        };
        forEach(RX_RECORD_GRID.columnProperties, (columnProperty) => {
            if (columnProperty.name === 'sortable') {
                column.sortable = availableColumn.isSortable;
            }
            else if (columnProperty.name === 'searchable') {
                column.searchable = this.rxRecordGridUtilsService.isSearchable(availableColumn.fieldDefinition, this.recordDefinition);
            }
            else {
                column[columnProperty.name] = columnProperty.defaultValue;
            }
        });
        return column;
    }
    removeFromAvailableColumns(column) {
        if (column.associationDescriptor) {
            const associatedAvailableColumnsNode = this.getAssociatedAvailableColumnsNode(column.associationDescriptor.label);
            remove(associatedAvailableColumnsNode.data.allAvailableColumns, column);
        }
        else {
            remove(this.availableColumnsTree[0].data.allAvailableColumns, column);
        }
        this.updateAvailableColumnsTree();
    }
    sortAvailableColumns(availableColumns) {
        this.filteredColumns = availableColumns.sort((column1, column2) => column1.fieldDefinitionName.localeCompare(column2.fieldDefinitionName));
        return this.filteredColumns;
    }
    getAvailableColumns(recordDefinition, associationDescriptor) {
        return recordDefinition.fieldDefinitions
            .map((fieldDefinition) => this.getColumnMetadata(fieldDefinition, associationDescriptor))
            .filter((availableColumn) => !find(this.columns, (column) => column.fieldId === availableColumn.fieldId));
    }
    getColumnMetadata(fieldDefinition, associationDescriptor) {
        return {
            fieldDefinitionName: fieldDefinition.name,
            label: this.rxRecordGridUtilsService.getColumnLabel(fieldDefinition, associationDescriptor),
            fieldId: this.rxRecordGridUtilsService.getFieldIdForGridColumn(fieldDefinition.id, associationDescriptor),
            isSortable: this.rxFieldDefinitionService.isSortable(fieldDefinition),
            associationDescriptor,
            fieldDefinition
        };
    }
    saveChanges() {
        const result = {
            columns: this.columns.map((column) => {
                const isFilterableColumnWithNamedList = column.filterable && column.fieldDefinition.namedListDefinition;
                return {
                    actions: column.actions,
                    alignment: column.alignment,
                    fieldId: column.fieldId,
                    filterable: column.filterable,
                    filterType: column.filterType,
                    guid: column.guid,
                    index: column.index,
                    sortable: column.sortable,
                    searchable: column.searchable,
                    title: column.title,
                    visible: column.visible,
                    associationDescriptor: column.associationDescriptor,
                    fieldDefinition: column.fieldDefinition,
                    cellDisplayProperties: column.cellDisplayProperties,
                    namedFilterOptions: column.namedFilterOptions,
                    width: column.width,
                    wrapText: column.wrapText,
                    typeaheadKeystrokeCount: isFilterableColumnWithNamedList ? column.typeaheadKeystrokeCount : null,
                    additionalQueryCriteria: isFilterableColumnWithNamedList ? column.additionalQueryCriteria : null
                };
            })
        };
        this.activeModalRef.close(result);
    }
    trackByForColumns(index, column) {
        return column.fieldId;
    }
    trackByForColumnProperties(index, columnProperty) {
        return columnProperty.name;
    }
    isPropertyEditable(column, propertyName) {
        if (propertyName === 'searchable') {
            return (!this.isReadOnly && this.rxRecordGridUtilsService.isSearchable(column.fieldDefinition, this.recordDefinition));
        }
        else {
            return !this.isReadOnly;
        }
    }
    updateColumnIndexes() {
        this.columns.forEach((column, index) => {
            column.index = index;
        });
    }
    openActiveAction() {
        if (this.activeColumn && this.activeActionIndex >= 0) {
            this.ngZone.runOutsideAngular(() => {
                // timeout is required to let control set initial value
                setTimeout(() => {
                    const listControl = this.actionListControlComponents.find((control) => control.value === this.activeColumn.actions);
                    if (listControl) {
                        listControl.focus({ actionIndex: this.activeActionIndex });
                    }
                });
            });
        }
    }
    isTreeEmpty() {
        return every(this.availableColumnsTree, (node) => node.data.allAvailableColumns.length === 0);
    }
    openAdditionalQueryCriteriaExpressionEditor(column, control) {
        const namedListFilterExpressionConfigurator = new NamedListFilterExpressionConfigurator(column.fieldDefinition, this.injector);
        this.rxExpressionEditorService
            .openEditor({
            property: {
                path: 'additionalQueryCriteria',
                value: column.additionalQueryCriteria,
                label: 'Additional named list filter'
            },
            isReadOnly: this.isReadOnly,
            expressionConfigurator: namedListFilterExpressionConfigurator,
            legend: [
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.function.label'),
                    icon: 'd-icon-mathematical_function'
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.keyword.label'),
                    icon: 'd-icon-dollar'
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.view-component.label'),
                    icon: 'd-icon-file_o'
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.view-component-property.label'),
                    icon: 'd-icon-file_o_gear'
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.view-input-parameter.label'),
                    icon: 'd-icon-arrow_right_square_input'
                }
            ]
        })
            .subscribe((expression) => {
            column.additionalQueryCriteria = expression.value;
            control.value = expression.value;
            control.onWriteValue(expression.value);
            this.markAsDirty();
        });
    }
    getAdditionalQueryCriteriaExpressionOptions(column) {
        const namedListFilterExpressionConfigurator = new NamedListFilterExpressionConfigurator(column.fieldDefinition, this.injector);
        return {
            label: 'Additional named list filter',
            tooltip: new Tooltip('Build a filter to apply at runtime in addition to the filter, if any, specified in the named list definition.'),
            dataDictionary$: namedListFilterExpressionConfigurator.getDataDictionary(),
            operators: namedListFilterExpressionConfigurator.getOperators()
        };
    }
}
RecordGridColumnEditorModalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridColumnEditorModalComponent, deps: [{ token: i1.ActiveModalRef }, { token: i2.RxModalService }, { token: i3.RxDefinitionNameService }, { token: i4.RxRecordGridUtilsService }, { token: i5.RxFieldDefinitionService }, { token: i5.RxRecordDefinitionCacheService }, { token: i6.RxGuidService }, { token: i0.NgZone }, { token: i0.Injector }, { token: i7.TranslateService }, { token: i8.RxExpressionEditorService }], target: i0.ɵɵFactoryTarget.Component });
RecordGridColumnEditorModalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RecordGridColumnEditorModalComponent, selector: "ng-component", viewQueries: [{ propertyName: "selectedColumnsDropList", first: true, predicate: ["selectedColumnsDropList"], descendants: true, read: CdkDropList }, { propertyName: "associatedAvailableColumnsDropList", first: true, predicate: ["associatedAvailableColumnsDropList"], descendants: true, read: CdkDropList }, { propertyName: "draggableSelectedColumns", predicate: ["draggableSelectedColumn"], descendants: true, read: CdkDrag }, { propertyName: "draggableAssociatedAvailableColumns", predicate: ["draggableAssociatedAvailableColumn"], descendants: true, read: CdkDrag }, { propertyName: "actionListControlComponents", predicate: ActionListControlComponent, descendants: true }, { propertyName: "accordionTabEls", predicate: AdaptAccordionTabComponent, descendants: true, read: ElementRef }], usesInheritance: true, ngImport: i0, template: "<div class=\"designer-modal-body modal-body d-flex mh-100\">\n  <div class=\"row flex-grow-1 w-100\">\n    <div *ngIf=\"!isReadOnly\" class=\"col-4 border-right d-flex flex-column mh-100\">\n      <div class=\"d-flex align-items-start justify-content-between\">\n        <h4 class=\"mt-2\">\n          {{ 'com.bmc.arsys.rx.client.view-components.record-grid-column.available-columns.title' | translate }}\n        </h4>\n      </div>\n\n      <div class=\"rx-card card flex-grow-1 mt-2\">\n        <div class=\"card-block d-flex flex-column\">\n          <div\n            *ngIf=\"!isTreeEmpty()\"\n            #associatedAvailableColumnsDropList=\"cdkDropList\"\n            cdkDropList\n            [cdkDropListData]=\"filteredColumns\"\n            cdkDropListSortingDisabled\n            [cdkDropListConnectedTo]=\"['selectedColumnsDropList']\"\n          >\n            <adapt-tree\n              [value]=\"availableColumnsTree\"\n              (onNodeExpand)=\"onNodeExpand($event)\"\n              filter=\"true\"\n              [wrap]=\"treeWrap\"\n            >\n              <ng-template let-node adaptTreeNodeTemplate>\n                <span *ngIf=\"!node.data.availableColumn\" [title]=\"node.label\">\n                  {{ node.label }}\n                </span>\n\n                <div\n                  *ngIf=\"node.data.availableColumn\"\n                  class=\"rx-tree-draggable-node\"\n                  #draggableAssociatedAvailableColumn\n                  cdkDrag\n                  [cdkDragData]=\"node.data.availableColumn\"\n                  (cdkDragStarted)=\"onAssociatedAvailableColumnsDragStarted()\"\n                >\n                  <div (dblclick)=\"addColumn(node.data.availableColumn)\">\n                    <button\n                      type=\"button\"\n                      class=\"rx-button-unstyled d-icon-plus_circle\"\n                      (click)=\"addColumn(node.data.availableColumn)\"\n                    ></button>\n\n                    <span class=\"rx-tree-node-label ml-3\">{{ node.label }}</span>\n                  </div>\n                </div>\n              </ng-template>\n            </adapt-tree>\n          </div>\n\n          <div *ngIf=\"isTreeEmpty()\" class=\"d-flex justify-content-center h-100 align-items-center mt-2\">\n            <adapt-empty-state\n              class=\"w-100\"\n              label=\"{{\n                'com.bmc.arsys.rx.client.view-components.record-grid-column.available-columns.empty-state.message'\n                  | translate\n              }}\"\n              type=\"search\"\n            ></adapt-empty-state>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"d-flex flex-column mh-100 {{ isReadOnly ? 'col' : 'col-8' }}\">\n      <div class=\"d-flex align-items-start justify-content-between\">\n        <h4 class=\"mt-2\">\n          {{ 'com.bmc.arsys.rx.client.view-components.record-grid-column.selected-columns.title' | translate }}\n        </h4>\n      </div>\n\n      <div\n        id=\"selectedColumnsDropList\"\n        class=\"designer-modal-accordion-wrapper\"\n        cdkDropList\n        [cdkDropListData]=\"columns\"\n        (cdkDropListDropped)=\"onDropInSelectedColumnsContainer($event)\"\n        #selectedColumnsDropList=\"cdkDropList\"\n      >\n        <adapt-accordion [multiselect]=\"false\" *ngIf=\"columns.length\">\n          <div\n            *ngFor=\"\n              let column of columns;\n              let index = index;\n              let first = first;\n              let last = last;\n              trackBy: trackByForColumns\n            \"\n            class=\"designer-modal-accordion-content\"\n            cdkDrag\n            cdkDragLockAxis=\"y\"\n            [cdkDragData]=\"column\"\n            [cdkDragDisabled]=\"isReadOnly\"\n            (cdkDragStarted)=\"onColumnDragStarted()\"\n            #draggableSelectedColumn\n          >\n            <div *ngIf=\"!isReadOnly\" class=\"designer-modal-drag-handle d-icon-left-dots\" cdkDragHandle></div>\n\n            <adapt-accordion-tab\n              class=\"d-block\"\n              [isOpen]=\"column.isOpen\"\n              (open)=\"column.isOpen = true\"\n              (close)=\"column.isOpen = false\"\n            >\n              <div class=\"card-title-text w-100\">\n                <div class=\"designer-modal-card-title-content\">\n                  <div class=\"left-header-block\" [class.pl-0]=\"isReadOnly\">\n                    <div class=\"rx-ellipsis\" [title]=\"column.label\" rx-id=\"card-title\">\n                      {{ column.label }}\n                    </div>\n                  </div>\n\n                  <div *ngIf=\"!isReadOnly\" class=\"right-header-block\">\n                    <div class=\"designer-modal-card-title-index-buttons\">\n                      <button\n                        class=\"d-icon-left-triangle_down rx-button-unstyled\"\n                        type=\"button\"\n                        [disabled]=\"last\"\n                        (click)=\"$event.stopPropagation(); moveColumn(index, index + 1)\"\n                        rx-id=\"move-down-button\"\n                      ></button>\n\n                      <button\n                        class=\"d-icon-left-triangle_up rx-button-unstyled\"\n                        type=\"button\"\n                        [disabled]=\"first\"\n                        (click)=\"$event.stopPropagation(); moveColumn(index, index - 1)\"\n                        rx-id=\"move-up-button\"\n                      ></button>\n                    </div>\n\n                    <button\n                      *ngIf=\"!isActionsColumn(column.fieldId)\"\n                      class=\"d-icon-left-cross_adapt p-1 pr-4 ml-3\"\n                      adapt-button\n                      size=\"small\"\n                      type=\"button\"\n                      (click)=\"$event.stopPropagation(); removeColumn(index)\"\n                      rx-id=\"remove-button\"\n                    >\n                      {{ 'com.bmc.arsys.rx.client.common.remove.label' | translate }}\n                    </button>\n                  </div>\n                </div>\n              </div>\n\n              <ng-container *ngIf=\"column.isOpen\">\n                <div\n                  *ngIf=\"\n                    isActionsColumn(column.fieldId);\n                    then actionsColumnEditorTemplate;\n                    else dataColumnEditorTemplate\n                  \"\n                ></div>\n              </ng-container>\n\n              <ng-template #dataColumnEditorTemplate>\n                <adapt-rx-textfield\n                  class=\"rx-record-grid-column-editor-text-field\"\n                  label=\"{{\n                    'com.bmc.arsys.rx.client.view-components.record-grid-column.column-header-field.label' | translate\n                  }}\"\n                  [disabled]=\"isReadOnly\"\n                  [(ngModel)]=\"column.title\"\n                  (ngModelChange)=\"markAsDirty()\"\n                ></adapt-rx-textfield>\n\n                <div class=\"d-flex flex-wrap\">\n                  <ng-container *ngFor=\"let columnProperty of columnProperties; trackBy: trackByForColumnProperties\">\n                    <div\n                      class=\"checkbox rx-record-grid-column-editor__checkbox-field\"\n                      *ngIf=\"\n                        ['visible', 'sortable', 'filterable', 'searchable', 'wrapText'].includes(columnProperty.name)\n                      \"\n                    >\n                      <label>\n                        <input\n                          type=\"checkbox\"\n                          [(ngModel)]=\"column[columnProperty.name]\"\n                          (ngModelChange)=\"onColumnCheckboxPropertyChange($event, column, columnProperty)\"\n                          [disabled]=\"!isPropertyEditable(column, columnProperty.name)\"\n                        />\n\n                        <span class=\"checkbox__item\">{{ columnProperty.label }}</span>\n                      </label>\n\n                      <span class=\"ml-1\" *ngIf=\"columnProperty.tooltip\">\n                        <span class=\"letter-space\"></span>\n                        <adapt-icon\n                          [name]=\"'question_circle_o'\"\n                          [adaptPopover]=\"columnProperty.tooltip.content\"\n                          appendToBody=\"true\"\n                        >\n                        </adapt-icon>\n                      </span>\n                    </div>\n                    <rx-column-editor-alignment\n                      *ngIf=\"columnProperty.name === 'alignment'\"\n                      [isReadOnly]=\"isReadOnly\"\n                      [column]=\"column\"\n                      [columnProperty]=\"columnProperty\"\n                      class=\"flex-fill\"\n                      [ngModel]=\"column.alignment\"\n                      (ngModelChange)=\"markAsDirty()\"\n                      ngDefaultControl\n                    ></rx-column-editor-alignment>\n                  </ng-container>\n                </div>\n\n                <div class=\"d-flex flex-row\">\n                  <rx-stepper-with-units-form-control\n                    class=\"d-block col-5 p-0\"\n                    [options]=\"columnWidthPropertyOptions\"\n                    [(ngModel)]=\"column.width\"\n                    (ngModelChange)=\"markAsDirty()\"\n                  ></rx-stepper-with-units-form-control>\n\n                  <rx-select-form-control\n                    *ngIf=\"column.filterable && column.fieldDefinition.namedListDefinition\"\n                    class=\"d-block col-5 p-0 pb-2 pl-5\"\n                    [options]=\"typeaheadKeystrokeCountOptions\"\n                    [(ngModel)]=\"column.typeaheadKeystrokeCount\"\n                    (ngModelChange)=\"markAsDirty()\"\n                    [disabled]=\"isReadOnly\"\n                  ></rx-select-form-control>\n                </div>\n\n                <rx-expression-form-control\n                  #additionalQueryCriteriaExpression\n                  *ngIf=\"column.filterable && column.fieldDefinition.namedListDefinition\"\n                  rx-id=\"additional-query-criteria-expression\"\n                  class=\"d-block p-0 pb-2\"\n                  [options]=\"column.additionalQueryCriteriaExpressionOptions\"\n                  [(ngModel)]=\"column.additionalQueryCriteria\"\n                  (events)=\"openAdditionalQueryCriteriaExpressionEditor(column, additionalQueryCriteriaExpression)\"\n                  [disabled]=\"isReadOnly\"\n                ></rx-expression-form-control>\n\n                <rx-cell-display-properties\n                  class=\"d-block pb-2\"\n                  [columns]=\"columns\"\n                  [columnName]=\"column.title\"\n                  [disabled]=\"isReadOnly\"\n                  [(ngModel)]=\"column.cellDisplayProperties\"\n                  (ngModelChange)=\"markAsDirty()\"\n                ></rx-cell-display-properties>\n\n                <rx-named-filter-options\n                  class=\"d-block pb-2\"\n                  [column]=\"column\"\n                  [disabled]=\"isReadOnly\"\n                  [(ngModel)]=\"column.namedFilterOptions\"\n                  (ngModelChange)=\"markAsDirty()\"\n                  tooltip=\"{{\n                    'com.bmc.arsys.rx.client.view-components.record-grid-column.named-filter-options-field.tooltip'\n                      | translate\n                  }}\"\n                ></rx-named-filter-options>\n\n                <rx-action-list-control\n                  class=\"d-block\"\n                  [disabled]=\"isReadOnly\"\n                  [(ngModel)]=\"column.actions\"\n                  (ngModelChange)=\"markAsDirty()\"\n                  tooltip=\"{{\n                    'com.bmc.arsys.rx.client.view-components.record-grid-column.column-actions-field.tooltip'\n                      | translate\n                  }}\"\n                ></rx-action-list-control>\n              </ng-template>\n\n              <ng-template #actionsColumnEditorTemplate>\n                <adapt-rx-textfield\n                  class=\"rx-record-grid-column-editor-text-field d-block form-group\"\n                  label=\"{{\n                    'com.bmc.arsys.rx.client.view-components.record-grid-column.column-header-field.label' | translate\n                  }}\"\n                  [disabled]=\"isReadOnly\"\n                  [(ngModel)]=\"column.title\"\n                  (ngModelChange)=\"markAsDirty()\"\n                ></adapt-rx-textfield>\n\n                <rx-stepper-with-units-form-control\n                  class=\"d-block col-5 p-0\"\n                  [options]=\"columnWidthPropertyOptions\"\n                  [(ngModel)]=\"column.width\"\n                  (ngModelChange)=\"markAsDirty()\"\n                ></rx-stepper-with-units-form-control>\n\n                <div class=\"d-flex flex-wrap\">\n                  <div\n                    class=\"checkbox rx-record-grid-column-editor__checkbox-field\"\n                    *ngFor=\"let actionsColumnProperty of actionsColumnProperties; trackBy: trackByForColumnProperties\"\n                  >\n                    <label>\n                      <input\n                        type=\"checkbox\"\n                        [(ngModel)]=\"column[actionsColumnProperty.name]\"\n                        (ngModelChange)=\"markAsDirty()\"\n                        [disabled]=\"!isPropertyEditable(column, actionsColumnProperty.name)\"\n                      />\n\n                      <span class=\"checkbox__item\">{{ actionsColumnProperty.label }}</span>\n                    </label>\n                  </div>\n                </div>\n              </ng-template>\n            </adapt-accordion-tab>\n          </div>\n        </adapt-accordion>\n      </div>\n\n      <div *ngIf=\"!columns.length\" class=\"d-flex justify-content-center h-100 align-items-center mt-2\">\n        <adapt-empty-state\n          class=\"w-100\"\n          label=\"{{\n            'com.bmc.arsys.rx.client.view-components.record-grid-column.selected-columns.empty-state.message'\n              | translate\n          }}\"\n          type=\"grid\"\n        ></adapt-empty-state>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    *ngIf=\"!isReadOnly\"\n    adapt-button\n    btn-type=\"primary\"\n    type=\"button\"\n    rx-id=\"save-button\"\n    [disabled]=\"!isDirty()\"\n    (click)=\"saveChanges()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button adapt-button btn-type=\"secondary\" type=\"button\" rx-id=\"cancel-button\" (click)=\"cancel()\">\n    {{\n      isReadOnly\n        ? ('com.bmc.arsys.rx.client.common.close.label' | translate)\n        : ('com.bmc.arsys.rx.client.common.cancel.label' | translate)\n    }}\n  </button>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.designer-modal-body{height:645px;min-height:calc(100% - 61px)!important}.designer-modal-accordion-wrapper{display:flex;flex-direction:column;height:100%;overflow:auto;padding-top:10px}.designer-modal-accordion-content{position:relative}.designer-modal-accordion-content.cdk-drag-preview{z-index:1200!important}.designer-modal-drag-handle{cursor:move;position:absolute;top:0;left:0;height:46px;padding:14px 10px 14px 14px;z-index:1}.designer-modal-card-title-content{width:100%;display:flex}.designer-modal-card-title-content .left-header-block,.designer-modal-card-title-content .right-header-block{display:flex;align-items:center}.designer-modal-card-title-content .left-header-block{flex-grow:1;min-width:0;font-size:14px;padding-left:22px}.designer-modal-card-sub-title{color:#7c7f81;font-weight:normal}.designer-modal-card-title-index-buttons{display:flex;font-size:19px}.rx-card{overflow:auto}.rx-tree-draggable-node{cursor:pointer}.rx-tree-draggable-node.cdk-drag-preview{z-index:1200!important}.rx-tree-draggable-node.cdk-drag{opacity:1}.rx-tree-node-label{word-break:break-all}rx-form-builder{max-width:400px}.rx-record-grid-column-editor__checkbox-field{flex-basis:20%;min-width:140px}.rx-record-grid-column-editor__checkbox-field+.rx-record-grid-column-editor__checkbox-field{margin-top:calc(.5rem + 1px)!important}\n"], components: [{ type: i1.AdaptTreeComponent, selector: "adapt-tree", inputs: ["value", "filter", "texts", "filterBtnClearText", "filterPlaceholder", "testID", "lazy", "lazyLoading", "trim", "wrap", "selectAllButton", "deselectAllButton", "treeScrollHeight", "adaptRadarDisableEventSending", "draggableScope", "droppableScope", "draggableNodes", "droppableNodes", "validateDrop"], outputs: ["onNodeDrop", "lazyLoad"] }, { type: i1.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }, { type: i1.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i1.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1.AdaptIconComponent, selector: "adapt-icon", inputs: ["name", "classList", "description", "testID"] }, { type: i9.ColumnEditorAlignmentComponent, selector: "rx-column-editor-alignment", inputs: ["column", "isReadOnly", "columnProperty"] }, { type: i8.StepperWithUnitsFormControlComponent, selector: "rx-stepper-with-units-form-control", inputs: ["options"] }, { type: i8.SelectFormControlComponent, selector: "rx-select-form-control", inputs: ["options", "appendToBody", "formControl"] }, { type: i8.ExpressionFormControlComponent, selector: "rx-expression-form-control", inputs: ["options", "isDisabled", "propertyPath"], outputs: ["events"] }, { type: i10.RecordGridCellDisplayPropertiesComponent, selector: "rx-cell-display-properties", inputs: ["columnName", "columns"] }, { type: i11.RecordGridNamedFilterOptionsComponent, selector: "rx-named-filter-options", inputs: ["column", "tooltip"] }, { type: i12.ActionListControlComponent, selector: "rx-action-list-control", inputs: ["options", "tooltip"] }], directives: [{ type: i13.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i14.CdkDropList, selector: "[cdkDropList], cdk-drop-list", inputs: ["cdkDropListConnectedTo", "id", "cdkDropListEnterPredicate", "cdkDropListSortPredicate", "cdkDropListDisabled", "cdkDropListSortingDisabled", "cdkDropListAutoScrollDisabled", "cdkDropListOrientation", "cdkDropListLockAxis", "cdkDropListData", "cdkDropListAutoScrollStep"], outputs: ["cdkDropListDropped", "cdkDropListEntered", "cdkDropListExited", "cdkDropListSorted"], exportAs: ["cdkDropList"] }, { type: i1.AdaptTreeNodeTemplateDirective, selector: "[adaptTreeNodeTemplate]", inputs: ["adaptTreeNodeTemplate"] }, { type: i14.CdkDrag, selector: "[cdkDrag]", inputs: ["cdkDragDisabled", "cdkDragStartDelay", "cdkDragLockAxis", "cdkDragConstrainPosition", "cdkDragPreviewClass", "cdkDragBoundary", "cdkDragRootElement", "cdkDragPreviewContainer", "cdkDragData", "cdkDragFreeDragPosition"], outputs: ["cdkDragStarted", "cdkDragReleased", "cdkDragEnded", "cdkDragEntered", "cdkDragExited", "cdkDragDropped", "cdkDragMoved"], exportAs: ["cdkDrag"] }, { type: i13.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i14.CdkDragHandle, selector: "[cdkDragHandle]", inputs: ["cdkDragHandleDisabled"] }, { type: i15.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i15.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i15.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }, { type: i1.AdaptPopoverDirective, selector: "[adaptPopover]", inputs: ["adaptPopover", "popoverTitle", "placement", "fallbackPlacement", "triggers", "container", "appendToBody", "closeBtn", "popupDelay", "disablePopover", "popoverClass", "autoClose", "closeOnOutOfView", "maxWidth", "minWidth"], outputs: ["shown", "hidden"], exportAs: ["adaptPopover"] }, { type: i15.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }], pipes: { "translate": i7.TranslatePipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridColumnEditorModalComponent, decorators: [{
            type: Component,
            args: [{
                    templateUrl: './record-grid-column-editor-modal.component.html',
                    styleUrls: ['./record-grid-column-editor-modal.component.scss'],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveModalRef }, { type: i2.RxModalService }, { type: i3.RxDefinitionNameService }, { type: i4.RxRecordGridUtilsService }, { type: i5.RxFieldDefinitionService }, { type: i5.RxRecordDefinitionCacheService }, { type: i6.RxGuidService }, { type: i0.NgZone }, { type: i0.Injector }, { type: i7.TranslateService }, { type: i8.RxExpressionEditorService }]; }, propDecorators: { draggableSelectedColumns: [{
                type: ViewChildren,
                args: ['draggableSelectedColumn', { read: CdkDrag }]
            }], selectedColumnsDropList: [{
                type: ViewChild,
                args: ['selectedColumnsDropList', { read: CdkDropList }]
            }], draggableAssociatedAvailableColumns: [{
                type: ViewChildren,
                args: ['draggableAssociatedAvailableColumn', { read: CdkDrag }]
            }], actionListControlComponents: [{
                type: ViewChildren,
                args: [ActionListControlComponent]
            }], associatedAvailableColumnsDropList: [{
                type: ViewChild,
                args: ['associatedAvailableColumnsDropList', { read: CdkDropList }]
            }], accordionTabEls: [{
                type: ViewChildren,
                args: [AdaptAccordionTabComponent, { read: ElementRef }]
            }] } });
//# sourceMappingURL=record-grid-column-editor-modal.component.js.map