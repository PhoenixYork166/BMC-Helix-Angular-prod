import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { RxNamedListDefinitionCacheService } from '@helix/platform/named-list/api';
import { RxRecordDefinitionCacheService } from '@helix/platform/record/api';
import { RxDefinitionNameService } from '@helix/platform/shared/api';
import { RxDefinitionPickerType } from '@helix/platform/shared/components';
import { head, isEmpty } from 'lodash';
import { of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@helix/platform/named-list/api";
import * as i3 from "@helix/platform/record/api";
import * as i4 from "@bmc-ux/adapt-angular";
import * as i5 from "@helix/platform/shared/components";
import * as i6 from "@angular/forms";
import * as i7 from "@angular/common";
export class SelectGroupFieldComponent {
    constructor(rxDefinitionNameService, rxNamedListDefinitionCacheService, rxRecordDefinitionCacheService) {
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxNamedListDefinitionCacheService = rxNamedListDefinitionCacheService;
        this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
        this.definitionPickerOptions = {
            label: 'Named list for options',
            definitionType: RxDefinitionPickerType.NamedList,
            required: true
        };
        this.filterField = [];
        this.filterFieldIdOptions = [];
        this.sourceRecordDefinitionDisplayName = '';
        this.fieldId = [];
    }
    ngOnInit() {
        this.onNamedListDefinitionNameChange(false);
    }
    onNamedListDefinitionNameChange(emitEvent = true) {
        of(this.fieldformGroup.get('namedListDefinitionName').value)
            .pipe(switchMap((namedListDefinitionName) => {
            if (namedListDefinitionName) {
                return this.rxNamedListDefinitionCacheService
                    .getNamedListDefinition(namedListDefinitionName)
                    .pipe(map((namedListDefinition) => namedListDefinition.recordDefinitionName));
            }
            else {
                return of(null);
            }
        }), take(1))
            .subscribe((sourceRecordDefinitionName) => {
            this.fieldformGroup.get('sourceRecordDefinitionName').setValue(sourceRecordDefinitionName, { emitEvent });
            this.filterFieldIdOptions = [];
            this.setFilterId();
            if (this.index > 0) {
                this.setOptionFilterFieldIdOptions();
                this.setSourceRecordDefinitionDisplayName();
            }
        });
    }
    setFilterId() {
        const fieldId = this.fieldformGroup.get('fieldId').value;
        this.fieldId = isEmpty(fieldId) ? [] : [this.targetFieldOptions.find((option) => option.id === fieldId)];
    }
    setSourceRecordDefinitionDisplayName() {
        const recordDefinitionName = this.fieldformGroup.get('sourceRecordDefinitionName').value;
        this.sourceRecordDefinitionDisplayName =
            recordDefinitionName && this.rxDefinitionNameService.getDisplayName(recordDefinitionName);
    }
    setOptionFilterFieldIdOptions() {
        const recordDefinitionName = this.fieldformGroup.get('sourceRecordDefinitionName').value;
        this.filterField = [];
        if (recordDefinitionName) {
            this.rxRecordDefinitionCacheService
                .getRecordDefinition(recordDefinitionName)
                .pipe(map((recordDefinition) => {
                return recordDefinition.fieldDefinitions.map((fieldDefinition) => ({
                    name: fieldDefinition.name,
                    id: String(fieldDefinition.id)
                }));
            }))
                .subscribe((fieldIdOptions) => {
                const filterFieldId = this.fieldformGroup.get('optionFilterFieldId').value;
                this.filterFieldIdOptions = fieldIdOptions;
                this.filterField = isEmpty(filterFieldId)
                    ? []
                    : [this.filterFieldIdOptions.find((option) => option.id === filterFieldId)];
            });
        }
    }
    optionFormatter(option) {
        return option.name;
    }
    onSelectFilterField(filterField) {
        this.fieldformGroup.get('optionFilterFieldId').setValue(head(filterField).id);
    }
    onSelectField(field) {
        this.fieldformGroup.get('fieldId').setValue(head(field).id);
    }
}
SelectGroupFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectGroupFieldComponent, deps: [{ token: i1.RxDefinitionNameService }, { token: i2.RxNamedListDefinitionCacheService }, { token: i3.RxRecordDefinitionCacheService }], target: i0.ɵɵFactoryTarget.Component });
SelectGroupFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: SelectGroupFieldComponent, selector: "rx-select-group-field", inputs: { fieldformGroup: "fieldformGroup", index: "index", targetFieldOptions: "targetFieldOptions" }, ngImport: i0, template: "<div>\n  <adapt-rx-textfield\n    label=\"Display label\"\n    required=\"true\"\n    rx-id=\"display-label-field\"\n    [formControl]=\"fieldformGroup.get('label')\"\n    class=\"form-group d-block\"\n  ></adapt-rx-textfield>\n\n  <rx-definition-picker\n    [options]=\"definitionPickerOptions\"\n    [formControl]=\"fieldformGroup.get('namedListDefinitionName')\"\n    (ngModelChange)=\"onNamedListDefinitionNameChange()\"\n    required=\"true\"\n    rx-id=\"named-list-definition-name-field\"\n    class=\"form-group d-block\"\n  ></rx-definition-picker>\n\n  <adapt-rx-select\n    label=\"Field for storing selected option value\"\n    rx-id=\"selected-option-value-target-field\"\n    [ngModel]=\"fieldId\"\n    (ngModelChange)=\"onSelectField($event)\"\n    [options]=\"targetFieldOptions\"\n    [optionFormatter]=\"optionFormatter\"\n    [required]=\"true\"\n    [disabled]=\"fieldformGroup.disabled\"\n    [ngClass]=\"{ 'form-group d-block': index > 0 }\"\n  ></adapt-rx-select>\n\n  <adapt-rx-textfield\n    label=\"Source record definition\"\n    *ngIf=\"index > 0\"\n    class=\"form-group d-block\"\n    [ngModel]=\"sourceRecordDefinitionDisplayName\"\n    disabled\n    rx-id=\"source-record-definition-name-field\"\n    [tooltip]=\"{\n      iconName: 'question_circle_o',\n      content: 'This is the record definition that provides the option values for this named list.',\n      placement: 'top',\n      popoverMode: true\n    }\"\n  ></adapt-rx-textfield>\n\n  <adapt-rx-select\n    *ngIf=\"index > 0\"\n    label=\"Field for filtering option values\"\n    rx-id=\"option-values-filter-field\"\n    [ngModel]=\"filterField\"\n    (ngModelChange)=\"onSelectFilterField($event)\"\n    [options]=\"filterFieldIdOptions\"\n    [optionFormatter]=\"optionFormatter\"\n    [disabled]=\"fieldformGroup.disabled\"\n    [tooltip]=\"{\n      iconName: 'question_circle_o',\n      content: 'Select the field in the source record definition that filters the option values for this named list.',\n      placement: 'top',\n      popoverMode: true\n    }\"\n  ></adapt-rx-select>\n</div>\n", components: [{ type: i4.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i5.RxDefinitionPickerComponent, selector: "rx-definition-picker", inputs: ["options", "isDisabled"] }, { type: i4.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }], directives: [{ type: i6.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i6.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i7.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectGroupFieldComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-select-group-field',
                    templateUrl: './select-group-field.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxDefinitionNameService }, { type: i2.RxNamedListDefinitionCacheService }, { type: i3.RxRecordDefinitionCacheService }]; }, propDecorators: { fieldformGroup: [{
                type: Input
            }], index: [{
                type: Input
            }], targetFieldOptions: [{
                type: Input
            }] } });
//# sourceMappingURL=select-group-field.component.js.map