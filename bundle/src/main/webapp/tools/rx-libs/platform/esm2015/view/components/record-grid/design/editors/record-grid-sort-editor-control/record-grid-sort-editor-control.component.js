import { Component, Input, Renderer2, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { head, isEmpty, isEqual } from 'lodash';
import { AdaptRxSelectComponent } from '@bmc-ux/adapt-angular';
import { ValueAccessor } from '@helix/platform/shared/components';
import { ColumnSortDirection } from '../../../common/types/record-grid.types';
import { BehaviorSubject, forkJoin, of } from 'rxjs';
import { RxRecordGridUtilsService } from '../../../common/services/record-grid-utils.service';
import { defaultIfEmpty, map, switchMap, take } from 'rxjs/operators';
import { RxStringService } from '@helix/platform/utils';
import * as i0 from "@angular/core";
import * as i1 from "../../../common/services/record-grid-utils.service";
import * as i2 from "@helix/platform/utils";
import * as i3 from "@bmc-ux/adapt-angular";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
export class RecordGridSortEditorControlComponent extends ValueAccessor {
    constructor(renderer, rxRecordGridUtilsService, rxStringService) {
        super();
        this.renderer = renderer;
        this.rxRecordGridUtilsService = rxRecordGridUtilsService;
        this.rxStringService = rxStringService;
        this.ColumnSortDirection = ColumnSortDirection;
        this.updateOptionsSubject = new BehaviorSubject(null);
        this.columnOptions$ = this.updateOptionsSubject.pipe(switchMap(() => this.options.gridColumns && this.options.recordDefinition
            ? forkJoin(this.options.gridColumns
                .filter((gridColumn) => gridColumn.sortable)
                .map((gridColumn) => {
                if (this.rxStringService.isEmptySafe(gridColumn.title)) {
                    return this.rxRecordGridUtilsService
                        .getFieldDefinition(gridColumn.fieldId, this.options.recordDefinition)
                        .pipe(map((fieldDefinition) => ({ id: gridColumn.fieldId, name: `[${fieldDefinition.name}]` })));
                }
                return of({ id: gridColumn.fieldId, name: gridColumn.title });
            })).pipe(defaultIfEmpty([]))
            : of([])));
        this.selectedColumnOption = [];
    }
    get selectedSortDirection() {
        return this.value ? this.value.direction : null;
    }
    ngOnChanges(changes) {
        var _a, _b, _c;
        if (((_a = changes.options) === null || _a === void 0 ? void 0 : _a.previousValue) &&
            (!isEqual(changes.options.currentValue.gridColumns, changes.options.previousValue.gridColumns) ||
                ((_b = changes.options.currentValue.recordDefinition) === null || _b === void 0 ? void 0 : _b.name) !==
                    ((_c = changes.options.previousValue.recordDefinition) === null || _c === void 0 ? void 0 : _c.name))) {
            this.updateOptionsSubject.next();
        }
    }
    onWriteValue(value) {
        this.columnOptions$.pipe(take(1)).subscribe((columnOptions) => {
            this.selectedColumnOption = value ? [columnOptions.find((option) => option.id === value.fieldId)] : [];
        });
    }
    focus() {
        this.renderer.selectRootElement(this.adaptRxSelect.selectButtonRef.nativeElement, true).focus();
    }
    onSelectModelChange(value) {
        this.selectedColumnOption = value;
        this.value = isEmpty(value) ? null : { fieldId: head(value).id, direction: ColumnSortDirection.Asc };
    }
    setSortDirection(sortDirection) {
        this.value = Object.assign(Object.assign({}, this.value), { direction: sortDirection });
    }
    optionFormatter(option) {
        return option.name;
    }
    ngOnDestroy() {
        this.updateOptionsSubject.complete();
    }
}
RecordGridSortEditorControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridSortEditorControlComponent, deps: [{ token: i0.Renderer2 }, { token: i1.RxRecordGridUtilsService }, { token: i2.RxStringService }], target: i0.ɵɵFactoryTarget.Component });
RecordGridSortEditorControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RecordGridSortEditorControlComponent, selector: "rx-record-grid-sort-editor-control", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: RecordGridSortEditorControlComponent,
            multi: true
        }
    ], viewQueries: [{ propertyName: "adaptRxSelect", first: true, predicate: ["adaptRxSelect"], descendants: true, static: true }], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<div class=\"form-group\" [ngClass]=\"{ 'is-required': options.required }\">\n  <label class=\"form-control-label\" *ngIf=\"options.label\">{{ options.label }}</label>\n\n  <div class=\"d-flex\">\n    <adapt-rx-select\n      #adaptRxSelect\n      class=\"pr-1 w-100\"\n      *ngIf=\"columnOptions$ | async as columnOptions\"\n      [options]=\"columnOptions\"\n      [required]=\"options.required\"\n      [disabled]=\"isDisabled\"\n      [ngModel]=\"selectedColumnOption\"\n      (ngModelChange)=\"onSelectModelChange($event)\"\n      [optionFormatter]=\"optionFormatter\"\n      [emptyOption]=\"true\"\n    ></adapt-rx-select>\n\n    <div class=\"btn-group\" data-toggle=\"buttons\" *ngIf=\"selectedColumnOption.length\">\n      <button\n        adapt-button\n        btn-type=\"secondary\"\n        type=\"button\"\n        class=\"pl-2 pr-2 d-icon-arrow_up\"\n        (click)=\"setSortDirection(ColumnSortDirection.Asc)\"\n        [class.active]=\"selectedSortDirection === ColumnSortDirection.Asc\"\n      ></button>\n      <button\n        adapt-button\n        btn-type=\"secondary\"\n        type=\"button\"\n        class=\"pl-2 pr-2 d-icon-arrow_down\"\n        (click)=\"setSortDirection(ColumnSortDirection.Desc)\"\n        [class.active]=\"selectedSortDirection === ColumnSortDirection.Desc\"\n      ></button>\n    </div>\n  </div>\n</div>\n", components: [{ type: i3.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i3.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "async": i4.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridSortEditorControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-record-grid-sort-editor-control',
                    templateUrl: './record-grid-sort-editor-control.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: RecordGridSortEditorControlComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i1.RxRecordGridUtilsService }, { type: i2.RxStringService }]; }, propDecorators: { options: [{
                type: Input
            }], adaptRxSelect: [{
                type: ViewChild,
                args: ['adaptRxSelect', { static: true }]
            }] } });
//# sourceMappingURL=record-grid-sort-editor-control.component.js.map