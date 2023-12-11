import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { chain, reject } from 'lodash';
import * as i0 from "@angular/core";
export class FieldGroupsEditorStore extends ComponentStore {
    constructor() {
        super({ fields: [], isDirty: false, groups: [], selectedGroupName: null });
        this.fields$ = this.select((state) => state.fields);
        this.groups$ = this.select((state) => state.groups);
        this.selectedGroupName$ = this.select((state) => state.selectedGroupName);
        this.availableFields$ = this.select(this.fields$, this.selectedGroupName$, (fields, selectedGroupName) => fields
            .filter((field) => field.groupName !== selectedGroupName)
            .map((field, index) => ({
            name: field.name,
            id: index,
            guid: field.guid,
            checked: field.checked
        })));
        this.checkedAvailableFields$ = this.select(this.availableFields$, (fields) => fields.filter((field) => field.checked));
        this.selectedFields$ = this.select(this.fields$, this.selectedGroupName$, (fields, selectedGroupName) => chain(fields)
            .filter((field) => field.groupName === selectedGroupName)
            .sortBy('fieldOrder')
            .map((field, index) => ({
            name: field.name,
            id: index,
            guid: field.guid,
            selected: field.checked
        }))
            .value());
        this.checkedSelectedFields$ = this.select(this.selectedFields$, (fields) => fields.filter((field) => field.selected));
        this.isDirty$ = this.select((state) => state.isDirty);
        this.vm$ = this.select(this.groups$, this.fields$, this.availableFields$, this.checkedAvailableFields$, this.selectedFields$, this.checkedSelectedFields$, this.isDirty$, (groups, fields, availableFields, checkedAvailableFields, selectedFields, checkedSelectedFields, isDirty) => ({
            groups,
            fields,
            availableFields,
            checkedAvailableFields,
            selectedFields,
            checkedSelectedFields,
            isDirty
        }));
        this.selectGroup = this.updater((state, groupName) => {
            const groups = state.groups.map((group) => (Object.assign(Object.assign({}, group), { selected: group.name === groupName })));
            return Object.assign(Object.assign({}, state), { groups, selectedGroupName: groupName });
        });
        this.markDirty = this.updater((state) => (Object.assign(Object.assign({}, state), { isDirty: true })));
        this.checkField = this.updater((state, guid) => (Object.assign(Object.assign({}, state), { fields: state.fields.map((field) => (field.guid === guid ? Object.assign(Object.assign({}, field), { checked: true }) : field)) })));
        this.uncheckField = this.updater((state, guid) => (Object.assign(Object.assign({}, state), { fields: state.fields.map((field) => (field.guid === guid ? Object.assign(Object.assign({}, field), { checked: false }) : field)) })));
        this.sortSelectedFields = this.updater((state, guids) => (Object.assign(Object.assign({}, state), { fields: state.fields.map((field) => {
                const index = guids.indexOf(field.guid);
                return index > -1 ? Object.assign(Object.assign({}, field), { fieldOrder: index }) : field;
            }) })));
        this.assignCheckedFields = this.updater((state) => {
            const selectedFields = state.fields.filter((field) => field.groupName === state.selectedGroupName);
            let fieldOrder = selectedFields.length;
            return Object.assign(Object.assign({}, state), { fields: state.fields.map((field) => field.checked
                    ? Object.assign(Object.assign({}, field), { checked: false, groupName: state.selectedGroupName, fieldOrder: fieldOrder++ }) : field), isDirty: true });
        });
        this.unassignCheckedFields = this.updater((state) => (Object.assign(Object.assign({}, state), { fields: state.fields.map((field) => field.checked ? Object.assign(Object.assign({}, field), { checked: false, fieldOrder: null, groupName: null }) : field), isDirty: true })));
        this.removeField = this.updater((state, guid) => (Object.assign(Object.assign({}, state), { fields: state.fields.map((field) => field.guid === guid ? Object.assign(Object.assign({}, field), { groupName: null, fieldOrder: null }) : field), isDirty: true })));
        this.removeGroup = this.updater((state, groupName) => (Object.assign(Object.assign({}, state), { fields: state.fields.map((field) => field.groupName === groupName ? Object.assign(Object.assign({}, field), { groupName: null, fieldOrder: null }) : field), groups: reject(state.groups, { name: groupName }), isDirty: true })));
        this.renameGroup = this.updater((state, group) => (Object.assign(Object.assign({}, state), { fields: state.fields.map((field) => field.groupName === group.oldName ? Object.assign(Object.assign({}, field), { groupName: group.newName }) : field), isDirty: true })));
    }
}
FieldGroupsEditorStore.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FieldGroupsEditorStore, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
FieldGroupsEditorStore.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FieldGroupsEditorStore });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FieldGroupsEditorStore, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=field-groups-editor.store.js.map