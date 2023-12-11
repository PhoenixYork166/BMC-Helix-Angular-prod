import { ErrorHandler, Injectable } from '@angular/core';
import { RxNamedListDefinitionService } from '@helix/platform/named-list/api';
import { RxComponentCanDeactivateGuard, RxDefinitionNameService, RxDefinitionUpdateService, RxNotificationService } from '@helix/platform/shared/api';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { last } from 'lodash';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { NamedListDesignerService } from '../../named-list-designer.service';
import * as NamedListDesignerActions from './named-list-designer.actions';
import { bundleIdSelector, definitionModelSelector, definitionNameSelector, originalDefinitionSelector } from './named-list-designer.selectors';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "@ngrx/effects";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "../../named-list-designer.service";
import * as i5 from "@ngx-translate/core";
import * as i6 from "@helix/platform/named-list/api";
export class NamedListDesignerEffects {
    constructor(store$, actions$, errorHandler, rxDefinitionUpdateService, namedListDesignerService, rxNotificationService, translateService, rxNamedListDefinitionService, rxDefinitionNameService, rxComponentCanDeactivateGuard) {
        this.store$ = store$;
        this.actions$ = actions$;
        this.errorHandler = errorHandler;
        this.rxDefinitionUpdateService = rxDefinitionUpdateService;
        this.namedListDesignerService = namedListDesignerService;
        this.rxNotificationService = rxNotificationService;
        this.translateService = translateService;
        this.rxNamedListDefinitionService = rxNamedListDefinitionService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxComponentCanDeactivateGuard = rxComponentCanDeactivateGuard;
        this.initNamedListDesigner$ = createEffect(() => this.actions$.pipe(ofType(NamedListDesignerActions.init), map((action) => NamedListDesignerActions.loadDefinition())));
        this.loadDefinition$ = createEffect(() => this.actions$.pipe(ofType(NamedListDesignerActions.loadDefinition), withLatestFrom(this.store$.select(definitionNameSelector)), switchMap(([action, definitionName]) => definitionName
            ? this.rxNamedListDefinitionService.get(definitionName)
            : this.rxNamedListDefinitionService.getNew()), map((definition) => NamedListDesignerActions.loadDefinitionSuccess({
            definition
        }))));
        this.loadDefinitionSuccess$ = createEffect(() => this.actions$.pipe(ofType(NamedListDesignerActions.loadDefinitionSuccess), map((action) => {
            let definitionModelFromDefinition = {
                version: action.definition.version,
                lastUpdateTime: action.definition.lastUpdateTime,
                lastChangedBy: action.definition.lastChangedBy,
                owner: action.definition.owner,
                name: this.rxDefinitionNameService.getDisplayName(action.definition.name),
                tags: action.definition.tags,
                description: action.definition.description,
                guid: action.definition.guid,
                recordDefinitionName: action.definition.recordDefinitionName,
                queryCriteria: action.definition.queryCriteria,
                searchBehavior: action.definition.searchBehavior,
                labelFieldId: action.definition.labelFieldId,
                valueFieldId: action.definition.valueFieldId,
                fields: action.definition.fields,
                customizationOptions: {
                    isDisabled: false,
                    definitionTypeDisplayName: null,
                    allowOverlay: action.definition.allowOverlay,
                    scope: action.definition.scope,
                    overlayGroupId: action.definition.overlayGroupId,
                    overlayDescriptor: action.definition.overlayDescriptor
                }
            };
            return NamedListDesignerActions.initDefinitionData({
                definition: action.definition,
                definitionModel: definitionModelFromDefinition
            });
        })));
        this.revertCustomization$ = createEffect(() => this.actions$.pipe(ofType(NamedListDesignerActions.revertCustomization), withLatestFrom(this.store$.select(definitionModelSelector), this.store$.select(bundleIdSelector)), switchMap(([_, definitionModel, bundleId]) => this.rxNamedListDefinitionService.revertCustomization(`${bundleId}:${definitionModel.name}`)), tap(() => {
            this.rxComponentCanDeactivateGuard.disable();
            window.location.reload();
        })), { dispatch: false });
        this.markPristine$ = createEffect(() => this.actions$.pipe(ofType(NamedListDesignerActions.initDefinitionData, NamedListDesignerActions.saveDefinition), map(() => NamedListDesignerActions.markDesignerPristine())));
        this.markDirty$ = createEffect(() => this.actions$.pipe(ofType(NamedListDesignerActions.updateDefinitionModelFromDesigner, NamedListDesignerActions.saveDefinitionError), map(() => NamedListDesignerActions.markDesignerDirty())));
        this.saveDefinition$ = createEffect(() => this.actions$.pipe(ofType(NamedListDesignerActions.saveDefinition), withLatestFrom(this.store$.select(definitionModelSelector), this.store$.select(originalDefinitionSelector), this.store$.select(bundleIdSelector)), switchMap(([_, definitionModel, originalDefinition, bundleId]) => {
            const definition = Object.assign(Object.assign({}, originalDefinition), this.namedListDesignerService.getDefinitionFromDefinitionModel(definitionModel, bundleId));
            return (definition.lastUpdateTime
                ? this.rxDefinitionUpdateService.execute(this.rxNamedListDefinitionService.update.bind(this.rxNamedListDefinitionService, definition))
                : this.rxNamedListDefinitionService.create(definition)).pipe(map((response) => {
                const definitionName = decodeURIComponent(last(response === null || response === void 0 ? void 0 : response.headers.get('location').split('/')) || '') ||
                    this.rxDefinitionNameService.getDefinitionName(bundleId, definitionModel.name);
                return NamedListDesignerActions.saveDefinitionSuccess({
                    savedDefinitionName: definitionName
                });
            }), catchError((error) => {
                this.errorHandler.handleError(error);
                return of(NamedListDesignerActions.saveDefinitionError());
            }));
        })));
        this.saveDefinitionSuccess$ = createEffect(() => this.actions$.pipe(ofType(NamedListDesignerActions.saveDefinitionSuccess), withLatestFrom(this.store$.select(definitionNameSelector)), tap(() => {
            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.designer.definition-saved-successfully.message', {
                definitionTypeDisplayName: this.translateService.instant('com.bmc.arsys.rx.client.common.named-list-definition.label')
            }));
        }), filter(([action, definitionName]) => !!definitionName), map(() => NamedListDesignerActions.loadDefinition())));
    }
}
NamedListDesignerEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: NamedListDesignerEffects, deps: [{ token: i1.Store }, { token: i2.Actions }, { token: i0.ErrorHandler }, { token: i3.RxDefinitionUpdateService }, { token: i4.NamedListDesignerService }, { token: i3.RxNotificationService }, { token: i5.TranslateService }, { token: i6.RxNamedListDefinitionService }, { token: i3.RxDefinitionNameService }, { token: i3.RxComponentCanDeactivateGuard }], target: i0.ɵɵFactoryTarget.Injectable });
NamedListDesignerEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: NamedListDesignerEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: NamedListDesignerEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i2.Actions }, { type: i0.ErrorHandler }, { type: i3.RxDefinitionUpdateService }, { type: i4.NamedListDesignerService }, { type: i3.RxNotificationService }, { type: i5.TranslateService }, { type: i6.RxNamedListDefinitionService }, { type: i3.RxDefinitionNameService }, { type: i3.RxComponentCanDeactivateGuard }]; } });
//# sourceMappingURL=named-list-designer.effects.js.map