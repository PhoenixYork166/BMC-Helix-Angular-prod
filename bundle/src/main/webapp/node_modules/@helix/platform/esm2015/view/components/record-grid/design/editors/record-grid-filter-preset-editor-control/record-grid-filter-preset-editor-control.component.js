import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { cloneDeep, noop } from 'lodash';
import { ValueAccessor } from '@helix/platform/shared/components';
import { RecordGridFilterPresetEditorModalComponent } from './record-grid-filter-preset-editor-modal/record-grid-filter-preset-editor-modal.component';
import { RxModalService } from '@helix/platform/ui-kit';
import { OpenViewActionModalSize } from '@helix/platform/view/api';
import { RxRecordGridFilterSelectHelperService } from '../record-grid-filter-select-control/record-grid-filter-select-helper.service';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/ui-kit";
import * as i2 from "../record-grid-filter-select-control/record-grid-filter-select-helper.service";
import * as i3 from "@bmc-ux/adapt-angular";
import * as i4 from "@angular/common";
export class RecordGridFilterPresetEditorControlComponent extends ValueAccessor {
    constructor(rxModalService, rxRecordGridFilterSelectHelperService) {
        super();
        this.rxModalService = rxModalService;
        this.rxRecordGridFilterSelectHelperService = rxRecordGridFilterSelectHelperService;
        this.filterPresets = [];
    }
    onWriteValue(filterPresets) {
        this.filterPresets = filterPresets.slice();
        this.filterPresets.sort((filterPreset1, filterPreset2) => filterPreset1.title.localeCompare(filterPreset2.title));
    }
    removeFilterPreset(filterPresetToRemove) {
        this.updateValue(this.filterPresets.filter((filterPreset) => filterPreset.guid !== filterPresetToRemove.guid));
    }
    updateValue(filterPresets) {
        this.value = filterPresets;
        this.onWriteValue(filterPresets);
    }
    openEditor(filterPreset) {
        const selectedFieldIds = this.options.columns.map((column) => column.fieldId);
        const selectedFieldDefinitions = this.options.primaryRecordDefinition.fieldDefinitions.filter((fieldDefinition) => selectedFieldIds.includes(fieldDefinition.id.toString()));
        const namedFilterOptions = this.rxRecordGridFilterSelectHelperService.getNamedFilterOptionsFromColumns(this.options.columns);
        const data = {
            filterPresets: this.filterPresets,
            activeFilterPreset: filterPreset,
            isReadOnly: this.isDisabled,
            namedFilterOptions,
            primaryRecordDefinition: cloneDeep(Object.assign(Object.assign({}, this.options.primaryRecordDefinition), { fieldDefinitions: selectedFieldDefinitions })),
            selectedFieldIds
        };
        this.rxModalService
            .openModal({
            title: 'Edit filter presets',
            content: RecordGridFilterPresetEditorModalComponent,
            size: OpenViewActionModalSize.Large,
            testID: 'edit-filter-presets',
            data
        })
            .then((result) => {
            if (result && result.filterPresets) {
                this.updateValue(result.filterPresets);
            }
        })
            .catch(noop);
    }
    trackByForFilterPresets(index, filterPreset) {
        return filterPreset.guid;
    }
}
RecordGridFilterPresetEditorControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridFilterPresetEditorControlComponent, deps: [{ token: i1.RxModalService }, { token: i2.RxRecordGridFilterSelectHelperService }], target: i0.ɵɵFactoryTarget.Component });
RecordGridFilterPresetEditorControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RecordGridFilterPresetEditorControlComponent, selector: "rx-record-grid-filter-preset-editor", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: RecordGridFilterPresetEditorControlComponent,
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: "<adapt-rx-control-label *ngIf=\"options.label\" [label]=\"options.label\" [tooltip]=\"options?.tooltip\">\n</adapt-rx-control-label>\n\n<adapt-button *ngIf=\"!isDisabled\" btn-type=\"tertiary\" rx-id=\"open-modal-button\" class=\"p-0 pb-1\" (click)=\"openEditor()\">\n  <span class=\"d-icon-plus_circle\"></span>\n  Edit filter presets\n</adapt-button>\n\n<div>\n  <div class=\"rx-selected-filter-preset\" *ngFor=\"let filterPreset of filterPresets; trackBy: trackByForFilterPresets\">\n    <div class=\"rx-selected-filter-preset__header-container\">\n      <span class=\"rx-selected-filter-preset__header-title\" rx-id=\"card-title\" [title]=\"filterPreset.title\">\n        {{ filterPreset.title }}\n      </span>\n\n      <button\n        type=\"button\"\n        class=\"rx-button-unstyled d-icon-left-pencil btn-link\"\n        rx-id=\"open-editor\"\n        *ngIf=\"!isDisabled\"\n        (click)=\"openEditor(filterPreset)\"\n      ></button>\n      <button\n        type=\"button\"\n        class=\"rx-button-unstyled d-icon-cross btn-link\"\n        rx-id=\"remove-filter-preset\"\n        *ngIf=\"!isDisabled\"\n        (click)=\"removeFilterPreset(filterPreset)\"\n      ></button>\n    </div>\n\n    <div rx-id=\"filter-count\" class=\"rx-filter-count\">Filters: {{ filterPreset.recordGridFilters.length }}</div>\n  </div>\n  <span class=\"text-tertiary\" *ngIf=\"filterPresets.length === 0\"> No filter presets added. </span>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.rx-selected-filter-preset{margin-bottom:5px;border:1px solid #d6d7d8;border-radius:2px;padding:5px 10px;word-break:break-all;font-weight:var(--font-weight-bold)}.rx-selected-filter-preset__header-container{display:flex;margin-bottom:5px}.rx-selected-filter-preset__header-title{flex:1 1 auto;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;font-size:.875rem}.rx-filter-count{font-size:.625rem;color:#959899}.d-icon-cross,.d-icon-left-pencil{cursor:pointer}.d-icon-cross:not(:hover),.d-icon-left-pencil:not(:hover){color:#313538}\n"], components: [{ type: i3.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i3.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridFilterPresetEditorControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-record-grid-filter-preset-editor',
                    templateUrl: './record-grid-filter-preset-editor-control.component.html',
                    styleUrls: ['./record-grid-filter-preset-editor-control.component.scss'],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: RecordGridFilterPresetEditorControlComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxModalService }, { type: i2.RxRecordGridFilterSelectHelperService }]; }, propDecorators: { options: [{
                type: Input
            }] } });
//# sourceMappingURL=record-grid-filter-preset-editor-control.component.js.map