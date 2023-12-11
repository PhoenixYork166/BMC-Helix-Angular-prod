import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { find } from 'lodash';
import * as i0 from "@angular/core";
export class SearchFieldEditorModalStore extends ComponentStore {
    constructor() {
        super({
            searchFields: [],
            isDirty: false,
            isCategoryVisible: true,
            isValid: true,
            availableFields: [],
            searchDefinition: {}
        });
        this.searchFields$ = this.select((state) => state.searchFields);
        this.availableFields$ = this.select((state) => state.availableFields);
        this.isDirty$ = this.select((state) => state.isDirty);
        this.isValid$ = this.select((state) => state.isValid);
        this.vm$ = this.select(this.availableFields$, this.searchFields$, this.isDirty$, this.isValid$, (availableFields, searchFields, isDirty, isValid) => ({
            availableFields,
            searchFields,
            isDirty,
            isValid
        }));
        this.toggleOpen = this.updater((state, toggleValue) => {
            const searchFieldItems = [...state.searchFields];
            searchFieldItems.forEach((control) => {
                control.get('isOpen').setValue(toggleValue);
            });
            return Object.assign(Object.assign({}, state), { searchFields: searchFieldItems });
        });
        this.updateFields = this.updater((state, field) => (Object.assign(Object.assign({}, state), { searchFields: [...state.searchFields, field], isValid: false })));
        this.updateAvailableFields = this.updater((state, field) => {
            const updatedSearchFields = [...state.searchFields];
            updatedSearchFields.forEach((control) => {
                control
                    .get('isCategoryVisible')
                    .setValue(find(state.availableFields, { id: field.id }).resourceType !== RX_RECORD_DEFINITION.resourceTypes.attachment);
            });
            return Object.assign(Object.assign({}, state), { availableFields: state.availableFields.filter((availableField) => availableField.id !== field.id), isDirty: true, searchFields: updatedSearchFields, isValid: !state.searchFields.some((form) => form.invalid) });
        });
        this.removeSearchField = this.updater((state, fieldIndex) => (Object.assign(Object.assign({}, state), { isDirty: true, searchFields: state.searchFields.filter((field, index) => fieldIndex !== index), isValid: !state.searchFields.some((form) => form.invalid) })));
        this.markDirty = this.updater((state) => (Object.assign(Object.assign({}, state), { isDirty: true, isValid: !state.searchFields.some((form) => form.invalid) })));
    }
}
SearchFieldEditorModalStore.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SearchFieldEditorModalStore, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
SearchFieldEditorModalStore.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SearchFieldEditorModalStore });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SearchFieldEditorModalStore, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=search-field-editor-modal.store.js.map