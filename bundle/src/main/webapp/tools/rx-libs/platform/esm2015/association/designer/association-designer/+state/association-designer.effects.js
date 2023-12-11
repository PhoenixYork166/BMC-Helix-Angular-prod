import { ErrorHandler, Injectable } from '@angular/core';
import { RX_ASSOCIATION_DEFINITION, RxAssociationDefinitionService } from '@helix/platform/association/api';
import { RecordFieldOption, RX_RECORD_DEFINITION, RxRecordDefinitionService } from '@helix/platform/record/api';
import { RxComponentCanDeactivateGuard, RxDefinitionUpdateService, RxNotificationService } from '@helix/platform/shared/api';
import { RxModalService } from '@helix/platform/ui-kit';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { cloneDeep, last, reject, some } from 'lodash';
import { forkJoin, of } from 'rxjs';
import { catchError, filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { AssociationDesignerService } from '../../association-designer.service';
import * as AssociationDesignerActions from './association-designer.actions';
import { definitionModelSelector, definitionNameSelector, isForeignKeyCreatedSelector, isForeignKeyMissingSelector, originalDefinitionSelector } from './association-designer.selectors';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "@ngrx/effects";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "../../association-designer.service";
import * as i5 from "@helix/platform/record/api";
import * as i6 from "@helix/platform/association/api";
import * as i7 from "@helix/platform/ui-kit";
import * as i8 from "@ngx-translate/core";
export class AssociationDesignerEffects {
    constructor(store$, actions$, errorHandler, rxDefinitionUpdateService, associationDesignerService, rxRecordDefinitionService, rxComponentCanDeactivateGuard, rxAssociationDefinitionService, rxModalService, rxNotificationService, translateService) {
        this.store$ = store$;
        this.actions$ = actions$;
        this.errorHandler = errorHandler;
        this.rxDefinitionUpdateService = rxDefinitionUpdateService;
        this.associationDesignerService = associationDesignerService;
        this.rxRecordDefinitionService = rxRecordDefinitionService;
        this.rxComponentCanDeactivateGuard = rxComponentCanDeactivateGuard;
        this.rxAssociationDefinitionService = rxAssociationDefinitionService;
        this.rxModalService = rxModalService;
        this.rxNotificationService = rxNotificationService;
        this.translateService = translateService;
        this.initAssociationDesigner$ = createEffect(() => this.actions$.pipe(ofType(AssociationDesignerActions.init), map(() => AssociationDesignerActions.loadDefinition())));
        this.loadDefinition$ = createEffect(() => this.actions$.pipe(ofType(AssociationDesignerActions.loadDefinition), withLatestFrom(this.store$.select(definitionNameSelector)), switchMap(([_, definitionName]) => definitionName
            ? this.rxAssociationDefinitionService.get(definitionName)
            : this.rxAssociationDefinitionService.getNew()), map((definition) => AssociationDesignerActions.loadDefinitionSuccess({ definition }))));
        this.loadDefinitionSuccess$ = createEffect(() => this.actions$.pipe(ofType(AssociationDesignerActions.loadDefinitionSuccess), map((action) => AssociationDesignerActions.initDefinitionData({
            definition: action.definition,
            definitionModel: this.associationDesignerService.getDefinitionModelFromDefinition(action.definition)
        }))));
        this.saveDefinition$ = createEffect(() => this.actions$.pipe(ofType(AssociationDesignerActions.saveDefinition), withLatestFrom(this.store$.select(definitionModelSelector)), map(([action, definitionModel]) => definitionModel.cardinality[0].value === RX_ASSOCIATION_DEFINITION.cardinality.manyToMany.value
            ? AssociationDesignerActions.createOrUpdateDefinition()
            : AssociationDesignerActions.getRecordDefinition({ checkForMissingFieldAction: true }))));
        this.getRecordDefinition$ = createEffect(() => this.actions$.pipe(ofType(AssociationDesignerActions.getRecordDefinition), withLatestFrom(this.store$.select(definitionModelSelector)), switchMap(([action, definitionModel]) => this.associationDesignerService.getRecordDefinition(definitionModel.nodeBId, true).pipe(map((definition) => {
            if (action.checkForMissingFieldAction) {
                return AssociationDesignerActions.checkForMissingForeignKeyField({ definition });
            }
            else if (action.createForeignKeyFieldAction) {
                return AssociationDesignerActions.createForeignKeyField({ definition });
            }
        }), catchError((error) => {
            this.errorHandler.handleError(error);
            return of(AssociationDesignerActions.getRecordDefinitionError());
        })))));
        this.checkForMissingForeignKeyField$ = createEffect(() => this.actions$.pipe(ofType(AssociationDesignerActions.checkForMissingForeignKeyField), withLatestFrom(this.store$.select(definitionModelSelector)), switchMap(([action, definitionModel]) => {
            if (!definitionModel.lastUpdateTime) {
                return this.associationDesignerService.getForeignKeyFieldId(definitionModel, true).pipe(map((foreignKeyFieldId) => 
                // Update nodeBKeys again in case we get new foreign key field ID in force reload definition
                AssociationDesignerActions.foreignKeyFieldMissingCheckSuccess({
                    payload: {
                        updatedForeignKeyFieldId: foreignKeyFieldId,
                        isForeignKeyFieldMissing: !foreignKeyFieldId
                    }
                })), catchError((error) => {
                    this.errorHandler.handleError(error);
                    return of(AssociationDesignerActions.getForeignKeyFieldIdError());
                }));
            }
            else if (definitionModel.lastUpdateTime) {
                const missingForeignKeyFields = reject(definitionModel.nodeBKeys, (fieldId) => some(action.definition.fieldDefinitions, { id: fieldId }));
                return [
                    AssociationDesignerActions.foreignKeyFieldMissingCheckSuccess({
                        payload: {
                            updatedForeignKeyFieldId: null,
                            isForeignKeyFieldMissing: missingForeignKeyFields.length > 0
                        }
                    })
                ];
            }
            else {
                return [
                    AssociationDesignerActions.foreignKeyFieldMissingCheckSuccess({
                        payload: {
                            updatedForeignKeyFieldId: null,
                            isForeignKeyFieldMissing: false
                        }
                    })
                ];
            }
        })));
        this.foreignKeyFieldMissingCheckSuccess$ = createEffect(() => this.actions$.pipe(ofType(AssociationDesignerActions.foreignKeyFieldMissingCheckSuccess), withLatestFrom(this.store$.select(isForeignKeyMissingSelector)), map(([action, isForeignKeyMissing]) => isForeignKeyMissing
            ? AssociationDesignerActions.getRecordDefinition({ createForeignKeyFieldAction: true })
            : AssociationDesignerActions.createOrUpdateDefinition())));
        this.createForeignKeyField$ = createEffect(() => this.actions$.pipe(ofType(AssociationDesignerActions.createForeignKeyField), withLatestFrom(this.store$.select(definitionModelSelector)), switchMap(([action, definitionModel]) => {
            const definition = cloneDeep(action.definition);
            definition.fieldDefinitions.push({
                resourceType: RX_RECORD_DEFINITION.dataTypes.character.resourceType,
                name: this.associationDesignerService.getForeignKeyFieldName(definitionModel),
                description: null,
                fieldOption: RecordFieldOption.Optional,
                maxLength: 254,
                defaultValue: null
            });
            return this.rxRecordDefinitionService.update(definition).pipe(map(() => AssociationDesignerActions.createForeignKeyFieldSuccess()), catchError((error) => {
                this.errorHandler.handleError(error);
                return of(AssociationDesignerActions.createForeignKeyFieldError());
            }));
        })));
        this.createForeignKeyFieldSuccess$ = createEffect(() => this.actions$.pipe(ofType(AssociationDesignerActions.createForeignKeyFieldSuccess), map(() => AssociationDesignerActions.getCreatedForeignKeyFieldId())));
        this.getCreatedForeignKeyFieldId$ = createEffect(() => this.actions$.pipe(ofType(AssociationDesignerActions.getCreatedForeignKeyFieldId), withLatestFrom(this.store$.select(definitionModelSelector)), switchMap(([action, definitionModel]) => this.associationDesignerService.getForeignKeyFieldId(definitionModel, true).pipe(map((fieldId) => AssociationDesignerActions.getCreatedForeignKeyFieldIdSuccess({ fieldId })), catchError((error) => {
            this.errorHandler.handleError(error);
            return of(AssociationDesignerActions.getCreatedForeignKeyFieldIdError());
        })))));
        this.getCreatedForeignKeyFieldIdSuccess$ = createEffect(() => this.actions$.pipe(ofType(AssociationDesignerActions.getCreatedForeignKeyFieldIdSuccess), map(() => AssociationDesignerActions.createOrUpdateDefinition())));
        this.createOrUpdateDefinition$ = createEffect(() => this.actions$.pipe(ofType(AssociationDesignerActions.createOrUpdateDefinition), withLatestFrom(this.store$.select(definitionModelSelector), this.store$.select(originalDefinitionSelector)), switchMap(([action, definitionModel, originalDefinition]) => {
            const definition = this.associationDesignerService.getDefinitionFromDefinitionModel(definitionModel);
            return definitionModel.lastUpdateTime
                ? this.rxDefinitionUpdateService
                    .execute(this.rxAssociationDefinitionService.update.bind(this.rxAssociationDefinitionService, Object.assign(Object.assign({}, originalDefinition), definition)))
                    .pipe(map(() => AssociationDesignerActions.saveDefinitionSuccess({
                    savedDefinitionName: definitionModel.name
                })), catchError((error) => {
                    this.errorHandler.handleError(error);
                    return of(AssociationDesignerActions.updateDefinitionError());
                }))
                : this.rxAssociationDefinitionService.create(definition).pipe(map((response) => {
                    var _a;
                    const savedDefinitionName = decodeURIComponent(last((_a = response === null || response === void 0 ? void 0 : response.headers) === null || _a === void 0 ? void 0 : _a.get('location').split('/')) || '') || definitionModel.name;
                    return AssociationDesignerActions.saveDefinitionSuccess({
                        savedDefinitionName
                    });
                }), catchError((error) => {
                    this.errorHandler.handleError(error);
                    // If POST of AssociationDefinition fails and the foreign key field has been added,
                    // that field will be removed via createDefinitionError action.
                    return of(AssociationDesignerActions.createDefinitionError());
                }));
        })));
        this.createDefinitionError$ = createEffect(() => this.actions$.pipe(ofType(AssociationDesignerActions.createDefinitionError), map(() => AssociationDesignerActions.getCreatedForeignKeyField())));
        this.getCreatedForeignKeyField$ = createEffect(() => this.actions$.pipe(ofType(AssociationDesignerActions.getCreatedForeignKeyField), withLatestFrom(this.store$.select(isForeignKeyCreatedSelector)), filter(([action, isForeignKeyCreated]) => isForeignKeyCreated), withLatestFrom(this.store$.select(definitionModelSelector)), switchMap(([action, definitionModel]) => forkJoin([
            this.associationDesignerService.getForeignKeyFieldId(definitionModel, true),
            this.associationDesignerService.getRecordDefinition(definitionModel.nodeBId, true)
        ]).pipe(map(([foreignKeyFieldId, definition]) => {
            definition.fieldDefinitions = reject(definition.fieldDefinitions, {
                id: foreignKeyFieldId
            });
            return AssociationDesignerActions.removeCreatedForeignKeyField({ foreignKeyFieldId, definition });
        }), catchError((error) => {
            this.errorHandler.handleError(error);
            return of(AssociationDesignerActions.getCreatedForeignKeyFieldError());
        })))));
        this.removeCreatedForeignKeyField$ = createEffect(() => this.actions$.pipe(ofType(AssociationDesignerActions.removeCreatedForeignKeyField), withLatestFrom(this.store$.select(isForeignKeyCreatedSelector)), filter(([action, isForeignKeyCreated]) => isForeignKeyCreated), switchMap(([action]) => {
            const definition = Object.assign(Object.assign({}, action.definition), { fieldDefinitions: reject(action.definition.fieldDefinitions, {
                    id: action.foreignKeyFieldId
                }) });
            return this.rxRecordDefinitionService.update(definition).pipe(map(() => AssociationDesignerActions.removeCreatedForeignKeyFieldSuccess()), catchError((error) => {
                this.errorHandler.handleError(error);
                return of(AssociationDesignerActions.removeCreatedForeignKeyFieldError());
            }));
        })));
        this.saveDefinitionSuccess$ = createEffect(() => this.actions$.pipe(ofType(AssociationDesignerActions.saveDefinitionSuccess), withLatestFrom(this.store$.select(definitionNameSelector)), tap(() => {
            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.designer.definition-saved-successfully.message', {
                definitionTypeDisplayName: this.translateService.instant('com.bmc.arsys.rx.client.common.association-definition.label')
            }));
        }), filter(([_, definitionName]) => !!definitionName), map(() => AssociationDesignerActions.loadDefinition())));
        this.revertCustomization$ = createEffect(() => this.actions$.pipe(ofType(AssociationDesignerActions.revertCustomization), withLatestFrom(this.store$.select(definitionModelSelector)), switchMap(([_, definitionModel]) => this.rxAssociationDefinitionService.revertCustomization(definitionModel.name)), tap(() => {
            this.rxComponentCanDeactivateGuard.disable();
            window.location.reload();
        })), { dispatch: false });
        this.markPristine$ = createEffect(() => this.actions$.pipe(ofType(AssociationDesignerActions.initDefinitionData, AssociationDesignerActions.saveDefinition, AssociationDesignerActions.saveDefinitionSuccess), map(() => AssociationDesignerActions.markDesignerPristine())));
        this.markDirty$ = createEffect(() => this.actions$.pipe(ofType(AssociationDesignerActions.updateDefinitionModelFromDesigner, AssociationDesignerActions.getRecordDefinitionError, AssociationDesignerActions.getForeignKeyFieldIdError, AssociationDesignerActions.createForeignKeyFieldError, AssociationDesignerActions.getCreatedForeignKeyFieldError, AssociationDesignerActions.createDefinitionError, AssociationDesignerActions.updateDefinitionError, AssociationDesignerActions.removeCreatedForeignKeyFieldError), map(() => AssociationDesignerActions.markDesignerDirty())));
    }
}
AssociationDesignerEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationDesignerEffects, deps: [{ token: i1.Store }, { token: i2.Actions }, { token: i0.ErrorHandler }, { token: i3.RxDefinitionUpdateService }, { token: i4.AssociationDesignerService }, { token: i5.RxRecordDefinitionService }, { token: i3.RxComponentCanDeactivateGuard }, { token: i6.RxAssociationDefinitionService }, { token: i7.RxModalService }, { token: i3.RxNotificationService }, { token: i8.TranslateService }], target: i0.ɵɵFactoryTarget.Injectable });
AssociationDesignerEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationDesignerEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationDesignerEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i2.Actions }, { type: i0.ErrorHandler }, { type: i3.RxDefinitionUpdateService }, { type: i4.AssociationDesignerService }, { type: i5.RxRecordDefinitionService }, { type: i3.RxComponentCanDeactivateGuard }, { type: i6.RxAssociationDefinitionService }, { type: i7.RxModalService }, { type: i3.RxNotificationService }, { type: i8.TranslateService }]; } });
//# sourceMappingURL=association-designer.effects.js.map