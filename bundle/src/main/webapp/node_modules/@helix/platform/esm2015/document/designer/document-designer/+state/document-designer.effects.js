import { ErrorHandler, Injectable } from '@angular/core';
import { RxDocumentDefinitionService } from '@helix/platform/document/api';
import { RxDefinitionNameService, RxDefinitionUpdateService, RxNotificationService } from '@helix/platform/shared/api';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { last } from 'lodash';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { DocumentDesignerService } from '../../document-designer.service';
import * as DocumentDesignerActions from './document-designer.actions';
import { bundleIdSelector, definitionModelSelector, definitionNameSelector, originalDefinitionSelector } from './document-designer.selectors';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "@ngrx/effects";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "../../document-designer.service";
import * as i5 from "@ngx-translate/core";
import * as i6 from "@helix/platform/document/api";
export class DocumentDesignerEffects {
    constructor(store$, actions$, errorHandler, rxDefinitionUpdateService, documentDesignerService, rxNotificationService, translateService, rxDocumentDefinitionService, rxDefinitionNameService) {
        this.store$ = store$;
        this.actions$ = actions$;
        this.errorHandler = errorHandler;
        this.rxDefinitionUpdateService = rxDefinitionUpdateService;
        this.documentDesignerService = documentDesignerService;
        this.rxNotificationService = rxNotificationService;
        this.translateService = translateService;
        this.rxDocumentDefinitionService = rxDocumentDefinitionService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.initDocumentDesigner$ = createEffect(() => this.actions$.pipe(ofType(DocumentDesignerActions.init), map((action) => DocumentDesignerActions.loadDefinition())));
        this.loadDefinition$ = createEffect(() => this.actions$.pipe(ofType(DocumentDesignerActions.loadDefinition), withLatestFrom(this.store$.select(definitionNameSelector)), switchMap(([action, definitionName]) => definitionName
            ? this.rxDocumentDefinitionService.get(definitionName)
            : this.rxDocumentDefinitionService.getNew()), map((definition) => DocumentDesignerActions.loadDefinitionSuccess({
            definition
        }))));
        this.loadDefinitionSuccess$ = createEffect(() => this.actions$.pipe(ofType(DocumentDesignerActions.loadDefinitionSuccess), map((action) => {
            let definitionModelFromDefinition = {
                customizationOptions: {
                    scope: action.definition.scope,
                    allowOverlay: action.definition.allowOverlay
                },
                description: action.definition.description,
                documentSchema: action.definition.documentSchema,
                guid: action.definition.guid,
                lastChangedBy: action.definition.lastChangedBy,
                lastUpdateTime: action.definition.lastUpdateTime,
                name: this.rxDefinitionNameService.getDisplayName(action.definition.name),
                overlayDescriptor: action.definition.overlayDescriptor,
                overlayGroupId: action.definition.overlayGroupId,
                owner: action.definition.owner
            };
            return DocumentDesignerActions.initDefinitionData({
                definition: action.definition,
                definitionModel: definitionModelFromDefinition
            });
        })));
        this.revertCustomization$ = createEffect(() => this.actions$.pipe(ofType(DocumentDesignerActions.revertCustomization), withLatestFrom(this.store$.select(definitionModelSelector), this.store$.select(bundleIdSelector)), switchMap(([_, definitionModel, bundleId]) => this.rxDocumentDefinitionService.revertCustomization(`${bundleId}:${definitionModel.name}`)), map(() => DocumentDesignerActions.loadDefinition())));
        this.markPristine$ = createEffect(() => this.actions$.pipe(ofType(DocumentDesignerActions.initDefinitionData, DocumentDesignerActions.saveDefinition), map(() => DocumentDesignerActions.markDesignerPristine())));
        this.markDirty$ = createEffect(() => this.actions$.pipe(ofType(DocumentDesignerActions.updateDefinitionModelFromDesigner, DocumentDesignerActions.saveDefinitionError), map(() => DocumentDesignerActions.markDesignerDirty())));
        this.saveDefinition$ = createEffect(() => this.actions$.pipe(ofType(DocumentDesignerActions.saveDefinition), withLatestFrom(this.store$.select(definitionModelSelector), this.store$.select(originalDefinitionSelector), this.store$.select(bundleIdSelector)), switchMap(([_, definitionModel, originalDefinition, bundleId]) => {
            const definition = this.documentDesignerService.getDefinitionFromDefinitionModel(definitionModel, bundleId);
            return (definition.lastUpdateTime
                ? this.rxDefinitionUpdateService.execute(this.rxDocumentDefinitionService.update.bind(this.rxDocumentDefinitionService, Object.assign(Object.assign({}, originalDefinition), definition)))
                : this.rxDocumentDefinitionService.create(definition)).pipe(map((response) => {
                const definitionName = decodeURIComponent(last(response === null || response === void 0 ? void 0 : response.headers.get('location').split('/')) || '') ||
                    this.rxDefinitionNameService.getDefinitionName(bundleId, definitionModel.name);
                return DocumentDesignerActions.saveDefinitionSuccess({
                    savedDefinitionName: definitionName
                });
            }), catchError((error) => {
                this.errorHandler.handleError(error);
                return of(DocumentDesignerActions.saveDefinitionError());
            }));
        })));
        this.saveDefinitionSuccess$ = createEffect(() => this.actions$.pipe(ofType(DocumentDesignerActions.saveDefinitionSuccess), withLatestFrom(this.store$.select(definitionNameSelector)), tap(() => {
            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.designer.definition-saved-successfully.message', {
                definitionTypeDisplayName: this.translateService.instant('com.bmc.arsys.rx.client.document-definition.label')
            }));
        }), filter(([action, definitionName]) => !!definitionName), map(() => DocumentDesignerActions.loadDefinition())));
    }
}
DocumentDesignerEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DocumentDesignerEffects, deps: [{ token: i1.Store }, { token: i2.Actions }, { token: i0.ErrorHandler }, { token: i3.RxDefinitionUpdateService }, { token: i4.DocumentDesignerService }, { token: i3.RxNotificationService }, { token: i5.TranslateService }, { token: i6.RxDocumentDefinitionService }, { token: i3.RxDefinitionNameService }], target: i0.ɵɵFactoryTarget.Injectable });
DocumentDesignerEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DocumentDesignerEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DocumentDesignerEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i2.Actions }, { type: i0.ErrorHandler }, { type: i3.RxDefinitionUpdateService }, { type: i4.DocumentDesignerService }, { type: i3.RxNotificationService }, { type: i5.TranslateService }, { type: i6.RxDocumentDefinitionService }, { type: i3.RxDefinitionNameService }]; } });
//# sourceMappingURL=document-designer.effects.js.map