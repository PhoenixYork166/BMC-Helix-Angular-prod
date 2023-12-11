import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { reject, some } from 'lodash';
import { RxGuidService } from '@helix/platform/utils';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/utils";
export class RecordIndexesEditorStore extends ComponentStore {
    constructor(rxGuidService) {
        super({ indexes: [], isDirty: false });
        this.rxGuidService = rxGuidService;
        this.isDirty$ = this.select((state) => state.isDirty);
        this.indexes$ = this.select((state) => state.indexes);
        this.addIndex = this.updater((state, index) => (Object.assign(Object.assign({}, state), { indexes: [...state.indexes, index], isDirty: true })));
        this.updateIndex = this.updater((state, indexToUpdate) => (Object.assign(Object.assign({}, state), { indexes: state.indexes.map((index) => (index.guid === indexToUpdate.guid ? Object.assign({}, indexToUpdate) : index)), isDirty: true })));
        this.removeIndex = this.updater((state, guid) => (Object.assign(Object.assign({}, state), { indexes: state.indexes.filter((field) => field.guid !== guid), isDirty: true })));
        this.checkAvailableFields = this.updater((state, payload) => (Object.assign(Object.assign({}, state), { indexes: state.indexes.map((index) => index.guid === payload.indexGuid
                ? Object.assign(Object.assign({}, index), { checkedAvailableFields: [...payload.checkedFields] }) : index) })));
        this.toggleSelectedFieldChecked = this.updater((state, payload) => (Object.assign(Object.assign({}, state), { indexes: state.indexes.map((index) => {
                if (index.guid === payload.indexGuid) {
                    const selectedFields = index.selectedFields.map((field) => field.id === payload.indexField.id ? Object.assign({}, field) : field);
                    return Object.assign(Object.assign({}, index), { selectedFields, isMoveToAvailableButtonEnabled: some(selectedFields, 'selected') });
                }
                else {
                    return index;
                }
            }) })));
        this.assignCheckedFields = this.updater((state, indexToAssign) => {
            return Object.assign(Object.assign({}, state), { indexes: state.indexes.map((index) => index.guid === indexToAssign.guid
                    ? Object.assign(Object.assign({}, index), { selectedFields: [...index.selectedFields, ...index.checkedAvailableFields].map((field, itemIndex) => (Object.assign(Object.assign({}, field), { selected: false, fieldOrder: itemIndex++ }))), availableFields: [
                            ...index.availableFields.filter((field) => !some(index.checkedAvailableFields, { id: field.id }))
                        ], checkedAvailableFields: [] }) : index), isDirty: true });
        });
        this.unassignCheckedFields = this.updater((state, indexToAssign) => {
            return Object.assign(Object.assign({}, state), { indexes: state.indexes.map((index) => index.guid === indexToAssign.guid
                    ? Object.assign(Object.assign({}, index), { selectedFields: index.selectedFields.filter((field) => !field.selected), availableFields: [...index.availableFields, ...index.selectedFields.filter((field) => field.selected)]
                            .map((field) => (Object.assign(Object.assign({}, field), { fieldOrder: null })))
                            .sort((a, b) => a.name.localeCompare(b.name)), isMoveToAvailableButtonEnabled: false }) : index), isDirty: true });
        });
        this.sortSelectedFields = this.updater((state, payload) => (Object.assign(Object.assign({}, state), { indexes: state.indexes.map((index) => index.guid === payload.indexGuid
                ? Object.assign(Object.assign({}, index), { selectedFields: [
                        ...payload.fields.map((field, itemIndex) => (Object.assign(Object.assign({}, field), { fieldOrder: itemIndex })))
                    ] }) : index) })));
        this.removeField = this.updater((state, payload) => (Object.assign(Object.assign({}, state), { indexes: state.indexes.map((index) => index.guid === payload.indexGuid
                ? Object.assign(Object.assign({}, index), { selectedFields: index.selectedFields.filter((field) => field.id !== payload.field.id), availableFields: [...index.availableFields, payload.field].sort((a, b) => a.name.localeCompare(b.name)) }) : index), isDirty: true })));
        this.expandAll = this.updater((state) => (Object.assign(Object.assign({}, state), { indexes: state.indexes.map((field) => (Object.assign(Object.assign({}, field), { isOpen: true }))) })));
        this.collapseAll = this.updater((state) => (Object.assign(Object.assign({}, state), { indexes: state.indexes.map((field) => (Object.assign(Object.assign({}, field), { isOpen: false }))) })));
        this.markDirty = this.updater((state) => (Object.assign(Object.assign({}, state), { isDirty: true })));
        this.vm$ = this.select(this.indexes$, this.isDirty$, (indexes, isDirty) => ({
            indexes,
            isDirty
        }));
    }
    initialize(indexesEditorOptions) {
        this.patchState({
            isDirty: false,
            indexes: indexesEditorOptions.indexes.map((index, itemIndex) => (Object.assign(Object.assign({}, index), { availableFields: reject(indexesEditorOptions.fields, (field) => field.isNewField || index.indexFieldIds.includes(field.id))
                    .map((field) => ({ id: field.id, name: field.name, fieldOrder: null }))
                    .sort((a, b) => a.name.localeCompare(b.name)), checkedAvailableFields: [], selectedFields: indexesEditorOptions.fields
                    .filter((field) => !field.isNewField && index.indexFieldIds.includes(field.id))
                    .sort((a, b) => index.indexFieldIds.indexOf(a.id) - index.indexFieldIds.indexOf(b.id))
                    .map((field, index) => ({ id: field.id, name: field.name, fieldOrder: index })), guid: this.rxGuidService.generate(), isOpen: (indexesEditorOptions === null || indexesEditorOptions === void 0 ? void 0 : indexesEditorOptions.indexToEditIndex) === itemIndex, isMoveToAvailableButtonEnabled: false })))
        });
    }
}
RecordIndexesEditorStore.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordIndexesEditorStore, deps: [{ token: i1.RxGuidService }], target: i0.ɵɵFactoryTarget.Injectable });
RecordIndexesEditorStore.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordIndexesEditorStore });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordIndexesEditorStore, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.RxGuidService }]; } });
//# sourceMappingURL=record-indexes-editor.store.js.map