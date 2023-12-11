import { ErrorHandler } from '@angular/core';
import { INamedListDefinition, RxNamedListDefinitionService } from '@helix/platform/named-list/api';
import { RxComponentCanDeactivateGuard, RxDefinitionNameService, RxDefinitionUpdateService, RxNotificationService } from '@helix/platform/shared/api';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { NamedListDesignerService } from '../../named-list-designer.service';
import * as i0 from "@angular/core";
export declare class NamedListDesignerEffects {
    private store$;
    private actions$;
    private errorHandler;
    private rxDefinitionUpdateService;
    private namedListDesignerService;
    private rxNotificationService;
    private translateService;
    private rxNamedListDefinitionService;
    private rxDefinitionNameService;
    private rxComponentCanDeactivateGuard;
    constructor(store$: Store<any>, actions$: Actions, errorHandler: ErrorHandler, rxDefinitionUpdateService: RxDefinitionUpdateService, namedListDesignerService: NamedListDesignerService, rxNotificationService: RxNotificationService, translateService: TranslateService, rxNamedListDefinitionService: RxNamedListDefinitionService, rxDefinitionNameService: RxDefinitionNameService, rxComponentCanDeactivateGuard: RxComponentCanDeactivateGuard);
    initNamedListDesigner$: import("rxjs").Observable<import("@ngrx/store/src/models").TypedAction<"[Named List Designer] Load Definition">> & import("@ngrx/effects").CreateEffectMetadata;
    loadDefinition$: import("rxjs").Observable<{
        definition: INamedListDefinition;
    } & import("@ngrx/store/src/models").TypedAction<"[Named List Designer] Load Definition Success">> & import("@ngrx/effects").CreateEffectMetadata;
    loadDefinitionSuccess$: import("rxjs").Observable<{
        definition: INamedListDefinition;
        definitionModel: import("../../named-list-designer.types").INamedListDefinitionModel;
    } & import("@ngrx/store/src/models").TypedAction<"[Named List Designer] Init Definition Data">> & import("@ngrx/effects").CreateEffectMetadata;
    revertCustomization$: import("rxjs").Observable<any> & import("@ngrx/effects").CreateEffectMetadata;
    markPristine$: import("rxjs").Observable<import("@ngrx/store/src/models").TypedAction<"[Named List Designer] Mark Designer Pristine">> & import("@ngrx/effects").CreateEffectMetadata;
    markDirty$: import("rxjs").Observable<import("@ngrx/store/src/models").TypedAction<"[Named List Designer] Mark Designer Dirty">> & import("@ngrx/effects").CreateEffectMetadata;
    saveDefinition$: import("rxjs").Observable<import("@ngrx/store/src/models").TypedAction<"[Named List Designer] Save Definition Error"> | ({
        savedDefinitionName: string;
    } & import("@ngrx/store/src/models").TypedAction<"[Named List Designer] Save Definition Success">)> & import("@ngrx/effects").CreateEffectMetadata;
    saveDefinitionSuccess$: import("rxjs").Observable<import("@ngrx/store/src/models").TypedAction<"[Named List Designer] Load Definition">> & import("@ngrx/effects").CreateEffectMetadata;
    static ɵfac: i0.ɵɵFactoryDeclaration<NamedListDesignerEffects, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NamedListDesignerEffects>;
}
