import { Component } from '@angular/core';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import { groupBy, isEmpty, reduce, xor } from 'lodash';
import { RxStringService } from '@helix/platform/utils';
import { RecordFieldOption } from '@helix/platform/record/api';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@helix/platform/utils";
import * as i3 from "@angular/forms";
import * as i4 from "@angular/common";
export class FieldSelectorComponent {
    constructor(context, stringService) {
        this.context = context;
        this.stringService = stringService;
        this.selectedFieldIdsModel = {};
        this.availableFieldGroups = [];
        this.hideSystemFields = false;
        this.isApplyButtonDisabled = true;
        this.selectedFieldDefinitionIds = [];
        this.availableFieldDefinitions = [];
    }
    ngOnInit() {
        const data = this.context.getData();
        this.availableFieldDefinitions = data.availableFields;
        this.selectedFieldDefinitionIds = data.selectedFieldIds;
        this.hideSystemFields = Boolean(data.hideSystemFields);
        this.availableFieldGroups = this.groupFieldsByFieldOption(this.availableFieldDefinitions);
        this.selectedFieldIdsModel = this.idsToModel(this.selectedFieldDefinitionIds);
    }
    closeModal() {
        this.context.close(this.modelToIds(this.selectedFieldIdsModel));
    }
    search(searchQuery) {
        this.availableFieldGroups = this.groupFieldsByFieldOption(this.availableFieldDefinitions)
            .map((fieldGroup) => (Object.assign(Object.assign({}, fieldGroup), { fields: fieldGroup.fields.filter((field) => this.stringService.caseInsensitiveSearch(field.name, searchQuery)) })))
            .filter((fieldGroup) => !isEmpty(fieldGroup.fields));
    }
    select(groupName) {
        if (groupName === 'all') {
            const ids = this.availableFieldDefinitions
                .filter((recordField) => {
                return recordField.fieldOption !== RecordFieldOption.System || !this.hideSystemFields;
            })
                .map((recordField) => recordField.id);
            this.selectedFieldIdsModel = this.idsToModel(ids);
        }
        else {
            const ids = this.availableFieldGroups
                .find((group) => group.groupLabel === groupName)
                .fields.map((recordField) => recordField.id);
            this.selectedFieldIdsModel = Object.assign(Object.assign({}, this.selectedFieldIdsModel), this.idsToModel(ids));
        }
        this.updateApplyButtonDisabledStatus();
    }
    updateApplyButtonDisabledStatus() {
        this.isApplyButtonDisabled = !xor(this.selectedFieldDefinitionIds, this.modelToIds(this.selectedFieldIdsModel))
            .length;
    }
    groupFieldsByFieldOption(availableFields) {
        const groups = groupBy(availableFields, 'fieldOption');
        const groupTypes = [RecordFieldOption.Required, RecordFieldOption.Optional];
        if (!this.hideSystemFields) {
            groupTypes.push(RecordFieldOption.System);
        }
        return groupTypes
            .filter((groupType) => groups[groupType])
            .map((groupType) => ({
            groupLabel: `${this.stringService.prettify(groupType)} fields`,
            selectAllFieldsInGroupButtonLabel: `Select all ${groupType.toLowerCase()} fields`,
            fields: groups[groupType].map(({ id, name }) => ({ id, name })).sort((a, b) => a.name.localeCompare(b.name))
        }));
    }
    trackByLabel(index, item) {
        return item.groupLabel;
    }
    trackById(index, item) {
        return item.id;
    }
    idsToModel(ids, selected = true) {
        return ids.filter(Boolean).reduce((result, id) => {
            result[id] = selected;
            return result;
        }, {});
    }
    modelToIds(model) {
        return reduce(model, (result, value, id) => {
            if (value) {
                result.push(id);
            }
            return result;
        }, []);
    }
}
FieldSelectorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FieldSelectorComponent, deps: [{ token: i1.ActiveModalRef }, { token: i2.RxStringService }], target: i0.ɵɵFactoryTarget.Component });
FieldSelectorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: FieldSelectorComponent, selector: "ng-component", ngImport: i0, template: "<div class=\"modal-header pr-0\">\n  <h5 class=\"modal-title pl-0 mr-auto\">Quick edit fields</h5>\n\n  <button\n    adapt-button\n    type=\"button\"\n    size=\"small\"\n    btn-type=\"primary\"\n    rx-id=\"apply-button\"\n    (click)=\"closeModal()\"\n    [disabled]=\"isApplyButtonDisabled\"\n    class=\"mr-5\"\n  >\n    Apply\n  </button>\n\n  <button\n    class=\"close my-1\"\n    adapt-button\n    type=\"button\"\n    size=\"small\"\n    btn-type=\"tertiary\"\n    (click)=\"context.dismiss(0)\"\n    rx-id=\"x-button\"\n  ></button>\n</div>\n\n<div class=\"modal-body\">\n  <div class=\"body-controls\">\n    <adapt-button btn-type=\"tertiary\" rx-id=\"select-all-button\" class=\"pl-0\" (click)=\"select('all')\">\n      Select all\n    </adapt-button>\n\n    <adapt-rx-textfield\n      [placeholder]=\"'Search fields'\"\n      [ngModel]=\"searchQuery\"\n      [attr.rx-id]=\"'search-field'\"\n      (ngModelChange)=\"search($event)\"\n      class=\"form-group\"\n    >\n    </adapt-rx-textfield>\n  </div>\n\n  <div class=\"rx-record-definition-fields\">\n    <div\n      class=\"rx-record-definition-field-group\"\n      *ngFor=\"let availableFieldsGroup of availableFieldGroups; trackBy: trackByLabel\"\n    >\n      <div class=\"font-weight-bold\">\n        {{ availableFieldsGroup.groupLabel }}\n      </div>\n\n      <adapt-button btn-type=\"tertiary\" class=\"py-0 pl-0\" (click)=\"select(availableFieldsGroup.groupLabel)\">\n        {{ availableFieldsGroup.selectAllFieldsInGroupButtonLabel }}\n      </adapt-button>\n\n      <div class=\"checkbox\" *ngFor=\"let availableField of availableFieldsGroup.fields; trackBy: trackById\">\n        <label>\n          <input\n            type=\"checkbox\"\n            [(ngModel)]=\"selectedFieldIdsModel[availableField.id]\"\n            (ngModelChange)=\"updateApplyButtonDisabledStatus()\"\n          />\n\n          <span class=\"checkbox__item\">{{ availableField.name }}</span>\n        </label>\n      </div>\n    </div>\n\n    <div *ngIf=\"availableFieldGroups.length === 0\">No Fields Found</div>\n  </div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.modal-title{margin:auto 0}span[rx-id=x-button]{cursor:pointer;margin:auto 0}span[rx-id=x-button]:hover{color:#959899}.body-controls{display:flex}.body-controls adapt-rx-textfield{flex:1}.rx-record-definition-fields{padding:10px;border:1px solid #d6d7d8;max-height:300px;overflow:auto}.rx-record-definition-field-group{margin-bottom:20px}\n"], components: [{ type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }], directives: [{ type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }, { type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FieldSelectorComponent, decorators: [{
            type: Component,
            args: [{
                    templateUrl: './field-selector.component.html',
                    styleUrls: ['./field-selector.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveModalRef }, { type: i2.RxStringService }]; } });
//# sourceMappingURL=field-selector.component.js.map