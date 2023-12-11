import { Component, Injector } from '@angular/core';
import { cloneDeep, isObject, noop, pick, sortBy } from 'lodash';
import { ActiveModalRef, DismissReasons } from '@bmc-ux/adapt-angular';
import { RxModalClass, RxModalService } from '@helix/platform/ui-kit';
import { OpenViewActionModalSize } from '@helix/platform/view/api';
import { RecordGridViewPresetColumnsModalComponent } from '../record-grid-view-preset-columns-modal/record-grid-view-preset-columns-modal.component';
import { RX_RECORD_GRID } from '../../../../record-grid.constant';
import { RxRecordGridDesignUtilsService } from '../../../record-grid-design-utils.service';
import { RxRecordGridFilterSelectHelperService } from '../../record-grid-filter-select-control/record-grid-filter-select-helper.service';
import { forkJoin, of } from 'rxjs';
import { defaultIfEmpty, map, take } from 'rxjs/operators';
import { RxRecordGridUtilsService } from '../../../../common/services/record-grid-utils.service';
import { RxStringService } from '@helix/platform/utils';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@helix/platform/ui-kit";
import * as i3 from "../../../record-grid-design-utils.service";
import * as i4 from "../../record-grid-filter-select-control/record-grid-filter-select-helper.service";
import * as i5 from "../../../../common/services/record-grid-utils.service";
import * as i6 from "@helix/platform/utils";
import * as i7 from "../../record-grid-sort-editor-control/record-grid-sort-editor-control.component";
import * as i8 from "../../record-grid-filter-select-control/record-grid-filter-select-control.component";
import * as i9 from "@angular/common";
import * as i10 from "@angular/forms";
import * as i11 from "@ngx-translate/core";
export class RecordGridEditViewPresetsModalComponent extends RxModalClass {
    constructor(activeModalRef, injector, rxModalService, rxRecordGridDesignUtilsService, rxRecordGridFilterSelectHelperService, rxRecordGridUtilsService, rxStringService) {
        super(activeModalRef, injector);
        this.activeModalRef = activeModalRef;
        this.injector = injector;
        this.rxModalService = rxModalService;
        this.rxRecordGridDesignUtilsService = rxRecordGridDesignUtilsService;
        this.rxRecordGridFilterSelectHelperService = rxRecordGridFilterSelectHelperService;
        this.rxRecordGridUtilsService = rxRecordGridUtilsService;
        this.rxStringService = rxStringService;
        this.params = this.activeModalRef.getData();
        this.presets = [];
        this.isReadOnly = this.params.isReadOnly;
        this.gridColumns$ = this.params.gridColumns && this.params.recordDefinition
            ? forkJoin(this.params.gridColumns.map((gridColumn) => {
                if (this.rxStringService.isEmptySafe(gridColumn.title)) {
                    return this.rxRecordGridUtilsService
                        .getFieldDefinition(gridColumn.fieldId, this.params.recordDefinition)
                        .pipe(map((fieldDefinition) => (Object.assign(Object.assign({}, gridColumn), { fallbackTitle: `[${fieldDefinition.name}]` }))));
                }
                return of(Object.assign(Object.assign({}, gridColumn), { fallbackTitle: `[${gridColumn.title}]` }));
            })).pipe(defaultIfEmpty([]))
            : of([]);
    }
    ngOnInit() {
        super.ngOnInit();
        this.gridColumns$.pipe(take(1)).subscribe((gridColumns) => {
            this.namedFilterOptions =
                this.rxRecordGridFilterSelectHelperService.getNamedFilterOptionsFromColumns(gridColumns);
            this.presets = this.params.presetsList.map(({ guid, name }, index) => {
                const presetComponent = this.params.viewPresets.find(({ data }) => data.viewPresetGuid === guid);
                const gridColumnsIds = gridColumns.filter((col) => col.filterable).map((col) => col.fieldId);
                const viewPresetGuid = presetComponent.data.viewPresetGuid;
                const presetColumns = cloneDeep(presetComponent.children.filter((col) => col.type === RX_RECORD_GRID.components.columnViewPreset));
                const sortedColumn = presetColumns.find((col) => isObject(col.data.sortable));
                const sortModel = sortedColumn
                    ? {
                        fieldId: sortedColumn.data.fieldId,
                        direction: sortedColumn.data.sortable.direction
                    }
                    : null;
                return {
                    presetName: name,
                    gridColumns,
                    presetColumns,
                    guid: viewPresetGuid,
                    tags: this.getTags(presetColumns, gridColumns),
                    isOpen: this.params.activePreset ? this.params.activePreset === viewPresetGuid : index === 0,
                    sortModel,
                    filters: {
                        basicFilters: this.rxRecordGridDesignUtilsService.getBasicRecordGridFiltersFromChildData(presetComponent.children),
                        filtersJson: presetComponent.data.filters
                    },
                    filterSelectControlOptions: {
                        primaryRecordDefinition: Object.assign(Object.assign({}, this.params.recordDefinition), { fieldDefinitions: this.params.recordDefinition.fieldDefinitions.filter((definition) => gridColumnsIds.includes(String(definition.id))) }),
                        selectedFieldIds: gridColumns.map((column) => column.fieldId),
                        namedFilterOptions: this.namedFilterOptions
                    },
                    sortEditorControlOptions: {
                        label: 'Initial column sort',
                        gridColumns: sortBy(gridColumns, 'title'),
                        recordDefinition: this.params.recordDefinition
                    }
                };
            });
        });
    }
    saveChanges() {
        this.activeModalRef.close({
            presets: this.presets
        });
    }
    cancel() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
    expandAll(event) {
        event.stopPropagation();
        this.presets.forEach((preset) => (preset.isOpen = true));
    }
    collapseAll(event) {
        event.stopPropagation();
        this.presets.forEach((preset) => (preset.isOpen = false));
    }
    openPresetColumnsModal(preset) {
        this.rxModalService
            .openModal({
            title: `Edit grid columns for ${preset.presetName}`,
            content: RecordGridViewPresetColumnsModalComponent,
            size: OpenViewActionModalSize.Large,
            data: {
                gridColumns: preset.gridColumns,
                presetColumns: preset.presetColumns,
                isReadOnly: this.isReadOnly
            },
            testID: 'edit-grid-columns-for-view-preset'
        })
            .then((result) => {
            if (result === null || result === void 0 ? void 0 : result.presetColumns) {
                preset.presetColumns = result.presetColumns;
                preset.tags = this.getTags(preset.presetColumns, preset.gridColumns);
                this.markAsDirty();
            }
        })
            .catch(noop);
    }
    trackByPreset(index, item) {
        return item.guid;
    }
    getTags(presetColumns, gridColumns) {
        const allColumnTitles = presetColumns
            .filter((column) => column.data.visible)
            .map((column) => {
            const gridColumn = gridColumns.find((col) => col.fieldId === column.data.fieldId);
            return gridColumn.title || gridColumn.fallbackTitle;
        });
        const displayedColumnTitles = allColumnTitles.slice(0, 5);
        return {
            items: displayedColumnTitles,
            restCount: allColumnTitles.length - displayedColumnTitles.length
        };
    }
    onSortChange(sortModel, preset) {
        preset.presetColumns.forEach((column) => {
            column.data.sortable = column.data.fieldId === (sortModel === null || sortModel === void 0 ? void 0 : sortModel.fieldId) ? pick(sortModel, 'direction') : null;
        });
        this.markAsDirty();
    }
}
RecordGridEditViewPresetsModalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridEditViewPresetsModalComponent, deps: [{ token: i1.ActiveModalRef }, { token: i0.Injector }, { token: i2.RxModalService }, { token: i3.RxRecordGridDesignUtilsService }, { token: i4.RxRecordGridFilterSelectHelperService }, { token: i5.RxRecordGridUtilsService }, { token: i6.RxStringService }], target: i0.ɵɵFactoryTarget.Component });
RecordGridEditViewPresetsModalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RecordGridEditViewPresetsModalComponent, selector: "rx-record-grid-edit-view-presets-modal", usesInheritance: true, ngImport: i0, template: "<div class=\"designer-modal-body modal-body d-flex mh-100\">\n  <div class=\"row flex-grow-1 w-100\">\n    <div class=\"d-flex flex-column mh-100 col\">\n      <div class=\"d-flex justify-content-end\">\n        <div class=\"btn-group\">\n          <button adapt-button btn-type=\"tertiary\" type=\"button\" rx-id=\"expand-all-button\" (click)=\"expandAll($event)\">\n            {{ 'com.bmc.arsys.rx.client.common.expand-all.label' | translate }}\n          </button>\n\n          <button\n            adapt-button\n            btn-type=\"tertiary\"\n            type=\"button\"\n            rx-id=\"collapse-all-button\"\n            (click)=\"collapseAll($event)\"\n          >\n            {{ 'com.bmc.arsys.rx.client.common.collapse-all.label' | translate }}\n          </button>\n        </div>\n      </div>\n\n      <div class=\"designer-modal-accordion-wrapper\">\n        <adapt-accordion [multiselect]=\"true\">\n          <div\n            *ngFor=\"let preset of presets; let index = index; trackBy: trackByPreset\"\n            class=\"designer-modal-accordion-content\"\n          >\n            <adapt-accordion-tab\n              class=\"d-block\"\n              [isOpen]=\"preset.isOpen\"\n              (open)=\"preset.isOpen = true\"\n              (close)=\"preset.isOpen = false\"\n            >\n              <div class=\"card-title-text w-100\">\n                <div class=\"designer-modal-card-title-content\">\n                  <div class=\"left-header-block pl-0\">\n                    <div class=\"rx-ellipsis\" [title]=\"preset.presetName\" rx-id=\"card-title\">\n                      {{ preset.presetName }}\n                    </div>\n                  </div>\n                </div>\n              </div>\n\n              <adapt-button\n                btn-type=\"tertiary\"\n                rx-id=\"open-grid-preset-columns-modal-button\"\n                class=\"p-0 pb-1\"\n                (click)=\"openPresetColumnsModal(preset)\"\n              >\n                <span class=\"d-icon-plus_circle\"></span>\n\n                Edit grid columns\n              </adapt-button>\n\n              <div class=\"mb-3\">\n                <adapt-tag type=\"active\" *ngFor=\"let tag of preset.tags.items\">{{ tag }}</adapt-tag>\n\n                <button\n                  *ngIf=\"preset.tags.restCount\"\n                  class=\"btn-link rx-button-unstyled ml-1\"\n                  type=\"button\"\n                  (click)=\"openPresetColumnsModal(preset)\"\n                >\n                  +{{ preset.tags.restCount }} more\n                </button>\n              </div>\n\n              <rx-record-grid-sort-editor-control\n                class=\"d-block w-50\"\n                [options]=\"preset.sortEditorControlOptions\"\n                [disabled]=\"isReadOnly\"\n                [(ngModel)]=\"preset.sortModel\"\n                (ngModelChange)=\"onSortChange($event, preset)\"\n              ></rx-record-grid-sort-editor-control>\n\n              <rx-record-grid-filter-select-control\n                [options]=\"preset.filterSelectControlOptions\"\n                [disabled]=\"isReadOnly\"\n                [(ngModel)]=\"preset.filters\"\n                (ngModelChange)=\"markAsDirty()\"\n              ></rx-record-grid-filter-select-control>\n            </adapt-accordion-tab>\n          </div>\n        </adapt-accordion>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    *ngIf=\"!isReadOnly\"\n    adapt-button\n    btn-type=\"primary\"\n    type=\"button\"\n    rx-id=\"save-button\"\n    [disabled]=\"!isDirty()\"\n    (click)=\"saveChanges()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button adapt-button btn-type=\"secondary\" type=\"button\" rx-id=\"cancel-button\" (click)=\"cancel()\">\n    {{\n      isReadOnly\n        ? ('com.bmc.arsys.rx.client.common.close.label' | translate)\n        : ('com.bmc.arsys.rx.client.common.cancel.label' | translate)\n    }}\n  </button>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.designer-modal-body{height:645px;min-height:calc(100% - 61px)!important}.designer-modal-accordion-wrapper{display:flex;flex-direction:column;height:100%;overflow:auto;padding-top:10px}.designer-modal-accordion-content{position:relative}.designer-modal-accordion-content.cdk-drag-preview{z-index:1200!important}.designer-modal-drag-handle{cursor:move;position:absolute;top:0;left:0;height:46px;padding:14px 10px 14px 14px;z-index:1}.designer-modal-card-title-content{width:100%;display:flex}.designer-modal-card-title-content .left-header-block,.designer-modal-card-title-content .right-header-block{display:flex;align-items:center}.designer-modal-card-title-content .left-header-block{flex-grow:1;min-width:0;font-size:14px;padding-left:22px}.designer-modal-card-sub-title{color:#7c7f81;font-weight:normal}.designer-modal-card-title-index-buttons{display:flex;font-size:19px}.rx-card{overflow:auto}.rx-tree-draggable-node{cursor:pointer}.rx-tree-draggable-node.cdk-drag-preview{z-index:1200!important}.rx-tree-draggable-node.cdk-drag{opacity:1}.rx-tree-node-label{word-break:break-all}rx-form-builder{max-width:400px}\n"], components: [{ type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i1.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }, { type: i1.AdaptTagComponent, selector: "adapt-tag", inputs: ["type", "removable", "disabled"], outputs: ["remove"] }, { type: i7.RecordGridSortEditorControlComponent, selector: "rx-record-grid-sort-editor-control", inputs: ["options"] }, { type: i8.RecordGridFilterSelectControlComponent, selector: "rx-record-grid-filter-select-control", inputs: ["options"] }], directives: [{ type: i9.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i9.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i10.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i10.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i11.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridEditViewPresetsModalComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-record-grid-edit-view-presets-modal',
                    templateUrl: './record-grid-edit-view-presets-modal.component.html',
                    styleUrls: ['./record-grid-edit-view-presets-modal.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveModalRef }, { type: i0.Injector }, { type: i2.RxModalService }, { type: i3.RxRecordGridDesignUtilsService }, { type: i4.RxRecordGridFilterSelectHelperService }, { type: i5.RxRecordGridUtilsService }, { type: i6.RxStringService }]; } });
//# sourceMappingURL=record-grid-edit-view-presets-modal.component.js.map