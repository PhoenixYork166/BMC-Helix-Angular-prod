import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { RX_RECORD_DEFINITION, RxFieldDefinitionService } from '@helix/platform/record/api';
import { ValueAccessor } from '@helix/platform/shared/components';
import { RxModalService } from '@helix/platform/ui-kit';
import { OpenViewActionModalSize } from '@helix/platform/view/api';
import { get, has, noop } from 'lodash';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { defaultIfEmpty, map, shareReplay, switchMap, take } from 'rxjs/operators';
import { RxRecordGridUtilsService } from '../../../common/services/record-grid-utils.service';
import { RX_RECORD_GRID } from '../../../record-grid.constant';
import { RxRecordGridConfigUtilsService } from '../../../runtime/services/record-grid-config-utils.service';
import { RecordGridColumnEditorModalComponent } from './record-grid-column-editor-modal/record-grid-column-editor-modal.component';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/ui-kit";
import * as i2 from "@helix/platform/record/api";
import * as i3 from "../../../runtime/services/record-grid-config-utils.service";
import * as i4 from "../../../common/services/record-grid-utils.service";
import * as i5 from "@bmc-ux/adapt-angular";
import * as i6 from "@angular/common";
export class RecordGridColumnEditorControlComponent extends ValueAccessor {
    constructor(rxModalService, rxFieldDefinitionService, rxRecordGridConfigUtilsService, rxRecordGridUtilsService) {
        super();
        this.rxModalService = rxModalService;
        this.rxFieldDefinitionService = rxFieldDefinitionService;
        this.rxRecordGridConfigUtilsService = rxRecordGridConfigUtilsService;
        this.rxRecordGridUtilsService = rxRecordGridUtilsService;
        this.updateColumnsSubject = new BehaviorSubject([]);
        this.columns$ = this.updateColumnsSubject.pipe(switchMap((inspectorColumns) => forkJoin(inspectorColumns.map((inspectorColumn) => forkJoin([
            this.rxRecordGridUtilsService.getAssociationDescriptor(inspectorColumn.fieldId, this.options.recordDefinition),
            this.rxRecordGridUtilsService.getFieldDefinition(inspectorColumn.fieldId, this.options.recordDefinition)
        ]).pipe(map(([associationDescriptor, fieldDefinition]) => ({
            associationDescriptor,
            fieldDefinition,
            inspectorColumn
        }))))).pipe(defaultIfEmpty([]), map((columnsData) => columnsData.map((columnData) => {
            var _a;
            return Object.assign(Object.assign({}, columnData.inspectorColumn), { fieldDefinition: columnData.fieldDefinition, associationDescriptor: columnData.associationDescriptor, title: (_a = columnData.inspectorColumn.title) === null || _a === void 0 ? void 0 : _a.trim(), searchable: has(columnData.inspectorColumn, 'searchable')
                    ? this.rxRecordGridConfigUtilsService.getBooleanValue(columnData.inspectorColumn.searchable)
                    : columnData.inspectorColumn.filterable &&
                        this.rxRecordGridUtilsService.isSearchable(columnData.fieldDefinition, this.options.recordDefinition), fallbackTitle: `[${columnData.fieldDefinition.name}]` });
        })), shareReplay(1))));
    }
    ngOnChanges(changes) {
        var _a;
        if (((_a = changes.options) === null || _a === void 0 ? void 0 : _a.previousValue) &&
            changes.options.currentValue.recordDefinition.name !==
                changes.options.previousValue.recordDefinition.name) {
            this.updateColumnsSubject.next(this.value);
        }
    }
    onWriteValue(inspectorColumns) {
        this.updateColumnsSubject.next(inspectorColumns);
    }
    removeColumn(columnData) {
        this.updateValue(this.value.filter((column) => column.fieldId !== columnData.fieldId));
    }
    updateValue(columns) {
        this.value = columns;
        this.onWriteValue(columns);
    }
    openEditor(columnGuid, activeActionIndex) {
        this.columns$.pipe(take(1)).subscribe((columns) => {
            const data = {
                isReadOnly: this.isDisabled,
                columns,
                activeColumn: columns.find((item) => item.guid === columnGuid),
                recordDefinition: this.options.recordDefinition,
                activeActionIndex
            };
            this.rxModalService
                .openModal({
                title: 'Edit grid columns',
                content: RecordGridColumnEditorModalComponent,
                data: {
                    columnParams: data
                },
                size: OpenViewActionModalSize.Large,
                testID: 'edit-grid-columns'
            })
                .then((result) => {
                if (result && result.columns) {
                    this.updateValue(result.columns);
                }
            })
                .catch(noop);
        });
    }
    focus(data) {
        this.openEditor(data === null || data === void 0 ? void 0 : data.columnGuid, data === null || data === void 0 ? void 0 : data.actionIndex);
    }
    getColumnResourceTypeName(column) {
        const resourceType = RX_RECORD_DEFINITION.resourceTypesByFullName[column.fieldDefinition.resourceType];
        return get(RX_RECORD_DEFINITION.dataTypes[resourceType], 'displayName', '');
    }
    getSortedColumns(columns) {
        return columns.sort((column1, column2) => column1.index - column2.index);
    }
    trackByForColumns(index, column) {
        return column.fieldId;
    }
    isActionsColumn(fieldId) {
        return fieldId === RX_RECORD_GRID.actionsColumnFieldDefinition.id;
    }
    ngOnDestroy() {
        this.updateColumnsSubject.complete();
    }
}
RecordGridColumnEditorControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridColumnEditorControlComponent, deps: [{ token: i1.RxModalService }, { token: i2.RxFieldDefinitionService }, { token: i3.RxRecordGridConfigUtilsService }, { token: i4.RxRecordGridUtilsService }], target: i0.ɵɵFactoryTarget.Component });
RecordGridColumnEditorControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RecordGridColumnEditorControlComponent, selector: "rx-record-grid-column-editor", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: RecordGridColumnEditorControlComponent,
            multi: true
        }
    ], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<adapt-button btn-type=\"tertiary\" rx-id=\"open-modal-button\" class=\"p-0 pb-1\" (click)=\"openEditor()\">\n  <span class=\"d-icon-plus_circle\"></span>\n  Edit grid columns\n</adapt-button>\n\n<div *ngIf=\"columns$ | async as columns\">\n  <div rx-id=\"columns\">\n    <span *ngIf=\"columns.length === 0\" class=\"text-tertiary\"> No grid columns added. </span>\n  </div>\n\n  <div class=\"rx-selected-column\" *ngFor=\"let column of getSortedColumns(columns); trackBy: trackByForColumns\">\n    <div class=\"rx-selected-column__header-container\">\n      <span\n        class=\"rx-selected-column__header-title\"\n        rx-id=\"card-title\"\n        [ngClass]=\"{ 'd-icon-left-arrow_schema': column.associationDescriptor }\"\n        [title]=\"column.title\"\n      >\n        {{ column.title || column.fallbackTitle }}\n      </span>\n\n      <button\n        type=\"button\"\n        class=\"rx-button-unstyled d-icon-left-pencil btn-link\"\n        rx-id=\"open-editor\"\n        (click)=\"openEditor(column.guid)\"\n        *ngIf=\"!isDisabled\"\n      ></button>\n      <button\n        type=\"button\"\n        class=\"rx-button-unstyled d-icon-cross btn-link\"\n        rx-id=\"remove-column\"\n        (click)=\"removeColumn(column)\"\n        *ngIf=\"!isActionsColumn(column.fieldId) && !isDisabled\"\n      ></button>\n    </div>\n\n    <div class=\"rx-column-type\" rx-id=\"column-type\">\n      {{ getColumnResourceTypeName(column) }}\n      <span *ngIf=\"column.associationDescriptor\">\u2013 {{ column.associationDescriptor.label }}</span>\n    </div>\n  </div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.rx-selected-column{margin-bottom:5px;border:1px solid #d6d7d8;border-radius:2px;padding:5px 10px;word-break:break-all;font-weight:var(--font-weight-bold)}.rx-selected-column__header-container{display:flex;margin-bottom:5px}.rx-selected-column__header-title{flex:1 1 auto;overflow:hidden;text-overflow:ellipsis;font-size:14px}.rx-column-type{color:#959899;font-size:10px;overflow:hidden;text-overflow:ellipsis}.d-icon-cross,.d-icon-left-pencil{cursor:pointer}.d-icon-cross:not(:hover),.d-icon-left-pencil:not(:hover){color:#313538}\n"], components: [{ type: i5.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i6.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], pipes: { "async": i6.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridColumnEditorControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-record-grid-column-editor',
                    templateUrl: './record-grid-column-editor-control.component.html',
                    styleUrls: ['./record-grid-column-editor-control.component.scss'],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: RecordGridColumnEditorControlComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxModalService }, { type: i2.RxFieldDefinitionService }, { type: i3.RxRecordGridConfigUtilsService }, { type: i4.RxRecordGridUtilsService }]; }, propDecorators: { options: [{
                type: Input
            }] } });
//# sourceMappingURL=record-grid-column-editor-control.component.js.map