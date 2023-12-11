import { Actions } from '@ngrx/effects';
import { ErrorHandler } from '@angular/core';
import { IConfigDefinition, RxConfigDefinitionService } from '@helix/platform/config/api';
import { RxGuidService } from '@helix/platform/utils';
import { FieldDefinitionManagerService } from '../../services/field-definition-manager.service';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { RxDefinitionNameService, RxGlobalCacheService, RxNotificationService } from '@helix/platform/shared/api';
import { IConfigDefinitionModel, IConfigFieldDefinitionModel } from '../../config-designer.types';
import { ConfigDesignerService } from '../../config-designer.service';
import { RxModalService } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
export declare class ConfigDesignerEffects {
    private store$;
    private actions$;
    private errorHandler;
    private configDesignerService;
    private rxModalService;
    private rxNotificationService;
    private translateService;
    private fieldDefinitionManagerService;
    private rxGuidService;
    private rxConfigDefinitionService;
    private rxGlobalCacheService;
    private rxDefinitionNameService;
    constructor(store$: Store<any>, actions$: Actions, errorHandler: ErrorHandler, configDesignerService: ConfigDesignerService, rxModalService: RxModalService, rxNotificationService: RxNotificationService, translateService: TranslateService, fieldDefinitionManagerService: FieldDefinitionManagerService, rxGuidService: RxGuidService, rxConfigDefinitionService: RxConfigDefinitionService, rxGlobalCacheService: RxGlobalCacheService, rxDefinitionNameService: RxDefinitionNameService);
    initConfigDesigner$: import("rxjs").Observable<import("@ngrx/store/src/models").TypedAction<"[Config Designer] Load Parent Components">> & import("@ngrx/effects").CreateEffectMetadata;
    loadParentComponents$: import("rxjs").Observable<{
        parentComponents: string[];
    } & import("@ngrx/store/src/models").TypedAction<"[Config Designer] Load Parent Components Success">> & import("@ngrx/effects").CreateEffectMetadata;
    setParentComponents$: import("rxjs").Observable<import("@ngrx/store/src/models").TypedAction<"[Config Designer] Load Definition">> & import("@ngrx/effects").CreateEffectMetadata;
    loadDefinition$: import("rxjs").Observable<{
        definition: IConfigDefinition;
    } & import("@ngrx/store/src/models").TypedAction<"[Config Designer] Load Definition Success">> & import("@ngrx/effects").CreateEffectMetadata;
    loadDefinitionSuccess$: import("rxjs").Observable<{
        definitionModelFromDefinition: IConfigDefinitionModel;
    } & import("@ngrx/store/src/models").TypedAction<"[Config Designer] Init Definition Model">> & import("@ngrx/effects").CreateEffectMetadata;
    markPristine$: import("rxjs").Observable<import("@ngrx/store/src/models").TypedAction<"[Config Designer] Mark Designer Pristine">> & import("@ngrx/effects").CreateEffectMetadata;
    clearSelectedField$: import("rxjs").Observable<import("@ngrx/store/src/models").TypedAction<"[Config Designer] Clear Selected Field GUID">> & import("@ngrx/effects").CreateEffectMetadata;
    markDirty$: import("rxjs").Observable<import("@ngrx/store/src/models").TypedAction<"[Config Designer] Mark Designer Dirty">> & import("@ngrx/effects").CreateEffectMetadata;
    createNewFieldModel$: import("rxjs").Observable<{
        newFieldModel: IConfigFieldDefinitionModel;
    } & import("@ngrx/store/src/models").TypedAction<"[Config Designer] Add Field Model">> & import("@ngrx/effects").CreateEffectMetadata;
    addNewFieldModel$: import("rxjs").Observable<{
        guid: string;
    } & import("@ngrx/store/src/models").TypedAction<"[Config Designer] Set Selected Field GUID">> & import("@ngrx/effects").CreateEffectMetadata;
    editFieldGroups$: import("rxjs").Observable<{
        definitionModelFromDesigner: IConfigDefinitionModel;
    } & import("@ngrx/store/src/models").TypedAction<"[Config Designer] Update Definition Model From Designer">> & import("@ngrx/effects").CreateEffectMetadata;
    deleteSelectedField$: import("rxjs").Observable<import("@ngrx/store/src/models").TypedAction<"[Config Designer] Delete Selected Field Success">> & import("@ngrx/effects").CreateEffectMetadata;
    saveDefinition$: import("rxjs").Observable<import("@ngrx/store/src/models").TypedAction<"[Config Designer] Save Definition Error"> | ({
        savedDefinitionName: string;
    } & import("@ngrx/store/src/models").TypedAction<"[Config Designer] Save Definition Success">) | ({
        definition: IConfigDefinition;
    } & import("@ngrx/store/src/models").TypedAction<"[Config Designer] Update Definition">)> & import("@ngrx/effects").CreateEffectMetadata;
    updateDefinition$: import("rxjs").Observable<import("@ngrx/store/src/models").TypedAction<"[Config Designer] Save Definition Error"> | ({
        savedDefinitionName: string;
    } & import("@ngrx/store/src/models").TypedAction<"[Config Designer] Save Definition Success">)> & import("@ngrx/effects").CreateEffectMetadata;
    saveDefinitionSuccess$: import("rxjs").Observable<import("@ngrx/store/src/models").TypedAction<"[Config Designer] Load Definition">> & import("@ngrx/effects").CreateEffectMetadata;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfigDesignerEffects, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConfigDesignerEffects>;
}
