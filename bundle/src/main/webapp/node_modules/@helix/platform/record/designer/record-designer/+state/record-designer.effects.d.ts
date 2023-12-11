import { Actions } from '@ngrx/effects';
import { RxGuidService } from '@helix/platform/utils';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { RxNotificationService } from '@helix/platform/shared/api';
import { RxModalService } from '@helix/platform/ui-kit';
import { IRecordDefinition, RxRecordDefinitionService } from '@helix/platform/record/api';
import { RxFieldDefinitionManagerService } from '../services/field-definition-manager.service';
import { IRecordFieldDefinitionModel } from '../../record-designer.types';
import { RxRecordDesignerService } from '../record-designer.service';
import * as i0 from "@angular/core";
export declare class RecordDesignerEffects {
    private store$;
    private actions$;
    private rxFieldDefinitionManagerService;
    private rxRecordDefinitionService;
    private rxModalService;
    private rxNotificationService;
    private translateService;
    private rxGuidService;
    private rxRecordDesignerService;
    constructor(store$: Store<any>, actions$: Actions, rxFieldDefinitionManagerService: RxFieldDefinitionManagerService, rxRecordDefinitionService: RxRecordDefinitionService, rxModalService: RxModalService, rxNotificationService: RxNotificationService, translateService: TranslateService, rxGuidService: RxGuidService, rxRecordDesignerService: RxRecordDesignerService);
    initRecordDesigner$: import("rxjs").Observable<import("@ngrx/store/src/models").TypedAction<"[Record Designer] Load Definition">> & import("@ngrx/effects").CreateEffectMetadata;
    loadDefinition$: import("rxjs").Observable<{
        definition: IRecordDefinition;
    } & import("@ngrx/store/src/models").TypedAction<"[Record Designer] Load Definition Success">> & import("@ngrx/effects").CreateEffectMetadata;
    loadDefinitionSuccess$: import("rxjs").Observable<{
        definitionModelFromDefinition: import("../../record-designer.types").IRecordDefinitionModel;
    } & import("@ngrx/store/src/models").TypedAction<"[Record Designer] Init Definition Model">> & import("@ngrx/effects").CreateEffectMetadata;
    createNewFieldModel$: import("rxjs").Observable<{
        newFieldModel: IRecordFieldDefinitionModel;
    } & import("@ngrx/store/src/models").TypedAction<"[Record Designer] Add Field Model">> & import("@ngrx/effects").CreateEffectMetadata;
    clearSearchFields$: import("rxjs").Observable<import("@ngrx/store/src/models").TypedAction<"[Record Designer] Clear Search Fields">> & import("@ngrx/effects").CreateEffectMetadata;
    addNewFieldModel$: import("rxjs").Observable<{
        guid: string;
    } & import("@ngrx/store/src/models").TypedAction<"[Record Designer] Set Selected Field GUID">> & import("@ngrx/effects").CreateEffectMetadata;
    copySelectedField$: import("rxjs").Observable<{
        newFieldModel: IRecordFieldDefinitionModel;
    } & import("@ngrx/store/src/models").TypedAction<"[Record Designer] Add Field Model">> & import("@ngrx/effects").CreateEffectMetadata;
    deleteSelectedField$: import("rxjs").Observable<import("@ngrx/store/src/models").TypedAction<"[Record Designer] Check If Field Used By Indexes">> & import("@ngrx/effects").CreateEffectMetadata;
    checkIfFieldUsedByIndexes$: import("rxjs").Observable<import("@ngrx/store/src/models").TypedAction<"[Record Designer] Delete Selected Field Success"> | import("@ngrx/store/src/models").TypedAction<"[Record Designer] Delete Selected Field Error">> & import("@ngrx/effects").CreateEffectMetadata;
    saveDefinitionSuccess$: import("rxjs").Observable<{
        payload: import("./record-designer.types").IInitRecordDesignerActionPayload;
    } & import("@ngrx/store/src/models").TypedAction<"[Record Designer] Init">> & import("@ngrx/effects").CreateEffectMetadata;
    clearSelectedField$: import("rxjs").Observable<import("@ngrx/store/src/models").TypedAction<"[Record Designer] Clear Selected Field GUID">> & import("@ngrx/effects").CreateEffectMetadata;
    markPristine$: import("rxjs").Observable<import("@ngrx/store/src/models").TypedAction<"[Record Designer] Mark Designer Pristine">> & import("@ngrx/effects").CreateEffectMetadata;
    markDirty$: import("rxjs").Observable<import("@ngrx/store/src/models").TypedAction<"[Record Designer] Mark Designer Dirty">> & import("@ngrx/effects").CreateEffectMetadata;
    static ɵfac: i0.ɵɵFactoryDeclaration<RecordDesignerEffects, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RecordDesignerEffects>;
}
