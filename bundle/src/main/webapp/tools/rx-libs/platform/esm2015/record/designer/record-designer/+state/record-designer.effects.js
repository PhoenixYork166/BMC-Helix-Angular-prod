import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { RxGuidService } from '@helix/platform/utils';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { RxNotificationService } from '@helix/platform/shared/api';
import { RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import { RX_RECORD_DEFINITION, RxRecordDefinitionService } from '@helix/platform/record/api';
import { distinctUntilChanged, filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import * as RecordDesignerActions from './record-designer.actions';
import { bundleIdSelector, definitionModelSelector, definitionNameSelector, selectedFieldGuidSelector } from './record-designer.selectors';
import { find, includes, isEmpty, isEqual, mapValues, some } from 'lodash';
import { RxFieldDefinitionManagerService } from '../services/field-definition-manager.service';
import { from } from 'rxjs';
import { RxRecordDesignerService } from '../record-designer.service';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "@ngrx/effects";
import * as i3 from "../services/field-definition-manager.service";
import * as i4 from "@helix/platform/record/api";
import * as i5 from "@helix/platform/ui-kit";
import * as i6 from "@helix/platform/shared/api";
import * as i7 from "@ngx-translate/core";
import * as i8 from "@helix/platform/utils";
import * as i9 from "../record-designer.service";
export class RecordDesignerEffects {
    constructor(store$, actions$, rxFieldDefinitionManagerService, rxRecordDefinitionService, rxModalService, rxNotificationService, translateService, rxGuidService, rxRecordDesignerService) {
        this.store$ = store$;
        this.actions$ = actions$;
        this.rxFieldDefinitionManagerService = rxFieldDefinitionManagerService;
        this.rxRecordDefinitionService = rxRecordDefinitionService;
        this.rxModalService = rxModalService;
        this.rxNotificationService = rxNotificationService;
        this.translateService = translateService;
        this.rxGuidService = rxGuidService;
        this.rxRecordDesignerService = rxRecordDesignerService;
        this.initRecordDesigner$ = createEffect(() => this.actions$.pipe(ofType(RecordDesignerActions.init), map(() => RecordDesignerActions.loadDefinition())));
        this.loadDefinition$ = createEffect(() => this.actions$.pipe(ofType(RecordDesignerActions.loadDefinition), withLatestFrom(this.store$.select(definitionNameSelector)), switchMap(([action, definitionName]) => definitionName
            ? this.rxRecordDefinitionService.get(definitionName, {}, true)
            : this.rxRecordDefinitionService.getNew()), map((definition) => RecordDesignerActions.loadDefinitionSuccess({
            definition
        }))));
        this.loadDefinitionSuccess$ = createEffect(() => this.actions$.pipe(ofType(RecordDesignerActions.loadDefinitionSuccess), map((action) => RecordDesignerActions.initDefinitionModel({
            definitionModelFromDefinition: this.rxRecordDesignerService.getDefinitionModelFromDefinition(action.definition)
        }))));
        this.createNewFieldModel$ = createEffect(() => this.actions$.pipe(ofType(RecordDesignerActions.createNewFieldModel), withLatestFrom(this.store$.select(definitionModelSelector)), map(([action, definitionModel]) => {
            let newFieldName;
            let fieldNameSuffix = 0;
            const defaultFieldName = this.translateService.instant('com.bmc.arsys.rx.client.designer.default-field-name.label');
            do {
                newFieldName = `${defaultFieldName} ${++fieldNameSuffix}`;
            } while (some(definitionModel.fields, { name: newFieldName }));
            const guid = this.rxGuidService.generate();
            const newFieldModel = this.rxFieldDefinitionManagerService.getNewFieldDefinitionModel(action.resourceType, {
                id: null,
                isNewField: true,
                name: newFieldName,
                guid,
                minValue: null,
                maxValue: null,
                defaultValueByLocale: {},
                selectionFieldOptionProperties: action.resourceType === RX_RECORD_DEFINITION.dataTypes.selection.resourceType
                    ? { defaultValue: null, optionNamesById: null, optionLabelsById: null }
                    : null
            });
            return RecordDesignerActions.addFieldModel({ newFieldModel });
        })));
        this.clearSearchFields$ = createEffect(() => this.actions$.pipe(ofType(RecordDesignerActions.updateDefinitionModelFromDesigner), withLatestFrom(this.store$.select(definitionModelSelector)), map(([action, definitionModel]) => definitionModel), distinctUntilChanged((a, b) => isEqual(a.enableCognitiveSearch, b.enableCognitiveSearch)), filter((definitionModel) => definitionModel.enableCognitiveSearch && !isEmpty(definitionModel.recordSearchFields)), switchMap(() => from(this.rxModalService.confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.search-fields.clear-search-fields-confirmation.message')
        }))), filter(Boolean), map(() => RecordDesignerActions.clearSearchFields())));
        this.addNewFieldModel$ = createEffect(() => this.actions$.pipe(ofType(RecordDesignerActions.addFieldModel), map((action) => RecordDesignerActions.setSelectedFieldGuid({ guid: action.newFieldModel.guid }))));
        this.copySelectedField$ = createEffect(() => this.actions$.pipe(ofType(RecordDesignerActions.copySelectedField), withLatestFrom(this.store$.select(definitionModelSelector), this.store$.select(selectedFieldGuidSelector)), map(([action, definitionModel, selectedFieldGuid]) => {
            const selectedField = definitionModel.fields.find((field) => field.guid === selectedFieldGuid);
            const selectedFieldCopy = Object.assign(Object.assign({}, selectedField), { id: null, guid: this.rxGuidService.generate(), name: this.translateService.instant('com.bmc.arsys.rx.client.designer.default-field-copy-name.label', {
                    fieldName: selectedField.name
                }), selectionFieldOptionProperties: Object.assign(Object.assign({}, selectedField.selectionFieldOptionProperties), { optionLabelsById: selectedField.resourceType === RX_RECORD_DEFINITION.resourceTypes.selection
                        ? mapValues(selectedField.selectionFieldOptionProperties.optionNamesById, () => this.rxGuidService.generate())
                        : null }) });
            return RecordDesignerActions.addFieldModel({ newFieldModel: selectedFieldCopy });
        })));
        this.deleteSelectedField$ = createEffect(() => this.actions$.pipe(ofType(RecordDesignerActions.deleteSelectedField), switchMap(() => from(this.rxModalService.confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.delete-field-warning.message')
        }))), filter(Boolean), map(() => RecordDesignerActions.checkIfFieldUsedByIndexes())));
        this.checkIfFieldUsedByIndexes$ = createEffect(() => this.actions$.pipe(ofType(RecordDesignerActions.checkIfFieldUsedByIndexes), withLatestFrom(this.store$.select(definitionModelSelector), this.store$.select(selectedFieldGuidSelector)), switchMap(([result, definitionModel, guid]) => {
            const field = find(definitionModel.fields, { guid });
            const isUsedByIndexes = some(definitionModel.indexDefinitions, (indexDefinition) => includes(indexDefinition.indexFieldIds, field.id));
            return isUsedByIndexes
                ? from(this.rxModalService.alert({
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                    modalStyle: RX_MODAL.modalStyles.warning,
                    message: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.indexes.field-used-by-indexes.message', { fieldName: field.name })
                })).pipe(map(() => RecordDesignerActions.deleteSelectedFieldError()))
                : [RecordDesignerActions.deleteSelectedFieldSuccess()];
        })));
        this.saveDefinitionSuccess$ = createEffect(() => this.actions$.pipe(ofType(RecordDesignerActions.saveDefinitionSuccess), withLatestFrom(this.store$.select(definitionNameSelector), this.store$.select(bundleIdSelector)), tap(() => {
            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.designer.definition-saved-successfully.message', {
                definitionTypeDisplayName: this.translateService.instant('com.bmc.arsys.rx.client.record-definition.label')
            }));
        }), filter(([action, definitionName, bundleId]) => !!definitionName), map(([action, definitionName, bundleId]) => RecordDesignerActions.init({
            payload: { definitionName, bundleId }
        }))));
        this.clearSelectedField$ = createEffect(() => this.actions$.pipe(ofType(RecordDesignerActions.initDefinitionModel, RecordDesignerActions.deleteSelectedFieldSuccess), map(() => RecordDesignerActions.clearSelectedFieldGuid())));
        this.markPristine$ = createEffect(() => this.actions$.pipe(ofType(RecordDesignerActions.initDefinitionModel, RecordDesignerActions.saveDefinitionSuccess), map(() => RecordDesignerActions.markDesignerPristine())));
        this.markDirty$ = createEffect(() => this.actions$.pipe(ofType(RecordDesignerActions.addFieldModel, RecordDesignerActions.updateDefinitionModelFromDesigner, RecordDesignerActions.updateSelectedFieldModel, RecordDesignerActions.deleteSelectedFieldSuccess), map(() => RecordDesignerActions.markDesignerDirty())));
    }
}
RecordDesignerEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDesignerEffects, deps: [{ token: i1.Store }, { token: i2.Actions }, { token: i3.RxFieldDefinitionManagerService }, { token: i4.RxRecordDefinitionService }, { token: i5.RxModalService }, { token: i6.RxNotificationService }, { token: i7.TranslateService }, { token: i8.RxGuidService }, { token: i9.RxRecordDesignerService }], target: i0.ɵɵFactoryTarget.Injectable });
RecordDesignerEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDesignerEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDesignerEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i2.Actions }, { type: i3.RxFieldDefinitionManagerService }, { type: i4.RxRecordDefinitionService }, { type: i5.RxModalService }, { type: i6.RxNotificationService }, { type: i7.TranslateService }, { type: i8.RxGuidService }, { type: i9.RxRecordDesignerService }]; } });
//# sourceMappingURL=record-designer.effects.js.map