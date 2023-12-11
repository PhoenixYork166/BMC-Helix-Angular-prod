import { ErrorHandler } from '@angular/core';
import { IAssociationDefinition, RxAssociationDefinitionService } from '@helix/platform/association/api';
import { RxRecordDefinitionService } from '@helix/platform/record/api';
import { RxComponentCanDeactivateGuard, RxDefinitionUpdateService, RxNotificationService } from '@helix/platform/shared/api';
import { RxModalService } from '@helix/platform/ui-kit';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AssociationDesignerService } from '../../association-designer.service';
import { IAssociationDefinitionModel } from '../../association-designer.types';
import * as i0 from "@angular/core";
export declare class AssociationDesignerEffects {
    private store$;
    private actions$;
    private errorHandler;
    private rxDefinitionUpdateService;
    private associationDesignerService;
    private rxRecordDefinitionService;
    private rxComponentCanDeactivateGuard;
    private rxAssociationDefinitionService;
    private rxModalService;
    private rxNotificationService;
    private translateService;
    constructor(store$: Store<any>, actions$: Actions, errorHandler: ErrorHandler, rxDefinitionUpdateService: RxDefinitionUpdateService, associationDesignerService: AssociationDesignerService, rxRecordDefinitionService: RxRecordDefinitionService, rxComponentCanDeactivateGuard: RxComponentCanDeactivateGuard, rxAssociationDefinitionService: RxAssociationDefinitionService, rxModalService: RxModalService, rxNotificationService: RxNotificationService, translateService: TranslateService);
    initAssociationDesigner$: import("rxjs").Observable<import("@ngrx/store/src/models").TypedAction<"[Association Designer] Load Definition">> & import("@ngrx/effects").CreateEffectMetadata;
    loadDefinition$: import("rxjs").Observable<{
        definition: IAssociationDefinition;
    } & import("@ngrx/store/src/models").TypedAction<"[Association Designer] Load Definition Success">> & import("@ngrx/effects").CreateEffectMetadata;
    loadDefinitionSuccess$: import("rxjs").Observable<{
        definition: IAssociationDefinition;
        definitionModel: IAssociationDefinitionModel;
    } & import("@ngrx/store/src/models").TypedAction<"[Association Designer] Init Definition Model">> & import("@ngrx/effects").CreateEffectMetadata;
    saveDefinition$: import("rxjs").Observable<import("@ngrx/store/src/models").TypedAction<"[Association Designer] Create Or Update Definition"> | ({
        checkForMissingFieldAction?: boolean;
        createForeignKeyFieldAction?: boolean;
    } & import("@ngrx/store/src/models").TypedAction<"[Association Designer] Get Record Definition">)> & import("@ngrx/effects").CreateEffectMetadata;
    getRecordDefinition$: import("rxjs").Observable<import("@ngrx/store/src/models").TypedAction<"[Association Designer] Get Record Definition Error"> | ({
        definition: import("@helix/platform/record/api").IRecordDefinition;
    } & import("@ngrx/store/src/models").TypedAction<"[Association Designer] Check For Missing Foreign Key Field">) | ({
        definition: import("@helix/platform/record/api").IRecordDefinition;
    } & import("@ngrx/store/src/models").TypedAction<"[Association Designer] Create Foreign Key Field">)> & import("@ngrx/effects").CreateEffectMetadata;
    checkForMissingForeignKeyField$: import("rxjs").Observable<import("@ngrx/store/src/models").TypedAction<"[Association Designer] Get Foreign Key Field ID Error"> | ({
        payload: {
            isForeignKeyFieldMissing: boolean;
            updatedForeignKeyFieldId: number;
        };
    } & import("@ngrx/store/src/models").TypedAction<"[Association Designer] Foreign Key Field Missing Check Success">)> & import("@ngrx/effects").CreateEffectMetadata;
    foreignKeyFieldMissingCheckSuccess$: import("rxjs").Observable<import("@ngrx/store/src/models").TypedAction<"[Association Designer] Create Or Update Definition"> | ({
        checkForMissingFieldAction?: boolean;
        createForeignKeyFieldAction?: boolean;
    } & import("@ngrx/store/src/models").TypedAction<"[Association Designer] Get Record Definition">)> & import("@ngrx/effects").CreateEffectMetadata;
    createForeignKeyField$: import("rxjs").Observable<import("@ngrx/store/src/models").TypedAction<"[Association Designer] Create Foreign Key Field Success"> | import("@ngrx/store/src/models").TypedAction<"[Association Designer] Create Foreign Key Field Error">> & import("@ngrx/effects").CreateEffectMetadata;
    createForeignKeyFieldSuccess$: import("rxjs").Observable<import("@ngrx/store/src/models").TypedAction<"[Association Designer] Get Created Foreign Key Field ID">> & import("@ngrx/effects").CreateEffectMetadata;
    getCreatedForeignKeyFieldId$: import("rxjs").Observable<import("@ngrx/store/src/models").TypedAction<"[Association Designer] Get Created Foreign Key Field ID Error"> | ({
        fieldId: number;
    } & import("@ngrx/store/src/models").TypedAction<"[Association Designer] Get Created Foreign Key Field ID Success">)> & import("@ngrx/effects").CreateEffectMetadata;
    getCreatedForeignKeyFieldIdSuccess$: import("rxjs").Observable<import("@ngrx/store/src/models").TypedAction<"[Association Designer] Create Or Update Definition">> & import("@ngrx/effects").CreateEffectMetadata;
    createOrUpdateDefinition$: import("rxjs").Observable<import("@ngrx/store/src/models").TypedAction<"[Association Designer] Create Definition Error"> | import("@ngrx/store/src/models").TypedAction<"[Association Designer] Update Definition Error"> | ({
        savedDefinitionName: string;
    } & import("@ngrx/store/src/models").TypedAction<"[Association Designer] Save Definition Success">)> & import("@ngrx/effects").CreateEffectMetadata;
    createDefinitionError$: import("rxjs").Observable<import("@ngrx/store/src/models").TypedAction<"[Association Designer] Get Created Foreign Key Field">> & import("@ngrx/effects").CreateEffectMetadata;
    getCreatedForeignKeyField$: import("rxjs").Observable<import("@ngrx/store/src/models").TypedAction<"[Association Designer] Get Created Foreign Key Field Error"> | ({
        foreignKeyFieldId: number;
        definition: import("@helix/platform/record/api").IRecordDefinition;
    } & import("@ngrx/store/src/models").TypedAction<"[Association Designer] Remove Created Foreign Key Field">)> & import("@ngrx/effects").CreateEffectMetadata;
    removeCreatedForeignKeyField$: import("rxjs").Observable<import("@ngrx/store/src/models").TypedAction<"[Association Designer] Remove Created Foreign Key Field Success"> | import("@ngrx/store/src/models").TypedAction<"[Association Designer] Remove Created Foreign Key Field Error">> & import("@ngrx/effects").CreateEffectMetadata;
    saveDefinitionSuccess$: import("rxjs").Observable<import("@ngrx/store/src/models").TypedAction<"[Association Designer] Load Definition">> & import("@ngrx/effects").CreateEffectMetadata;
    revertCustomization$: import("rxjs").Observable<any> & import("@ngrx/effects").CreateEffectMetadata;
    markPristine$: import("rxjs").Observable<import("@ngrx/store/src/models").TypedAction<"[Association Designer] Mark Designer Pristine">> & import("@ngrx/effects").CreateEffectMetadata;
    markDirty$: import("rxjs").Observable<import("@ngrx/store/src/models").TypedAction<"[Association Designer] Mark Designer Dirty">> & import("@ngrx/effects").CreateEffectMetadata;
    static ɵfac: i0.ɵɵFactoryDeclaration<AssociationDesignerEffects, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AssociationDesignerEffects>;
}
