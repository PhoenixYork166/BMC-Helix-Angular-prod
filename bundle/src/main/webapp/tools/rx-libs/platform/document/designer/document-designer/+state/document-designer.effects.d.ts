import { ErrorHandler } from '@angular/core';
import { IDocumentDefinition, RxDocumentDefinitionService } from '@helix/platform/document/api';
import { RxDefinitionNameService, RxDefinitionUpdateService, RxNotificationService } from '@helix/platform/shared/api';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { DocumentDesignerService } from '../../document-designer.service';
import * as i0 from "@angular/core";
export declare class DocumentDesignerEffects {
    private store$;
    private actions$;
    private errorHandler;
    private rxDefinitionUpdateService;
    private documentDesignerService;
    private rxNotificationService;
    private translateService;
    private rxDocumentDefinitionService;
    private rxDefinitionNameService;
    constructor(store$: Store<any>, actions$: Actions, errorHandler: ErrorHandler, rxDefinitionUpdateService: RxDefinitionUpdateService, documentDesignerService: DocumentDesignerService, rxNotificationService: RxNotificationService, translateService: TranslateService, rxDocumentDefinitionService: RxDocumentDefinitionService, rxDefinitionNameService: RxDefinitionNameService);
    initDocumentDesigner$: import("rxjs").Observable<import("@ngrx/store/src/models").TypedAction<"[Document Designer] Load Definition">> & import("@ngrx/effects").CreateEffectMetadata;
    loadDefinition$: import("rxjs").Observable<{
        definition: IDocumentDefinition;
    } & import("@ngrx/store/src/models").TypedAction<"[Document Designer] Load Definition Success">> & import("@ngrx/effects").CreateEffectMetadata;
    loadDefinitionSuccess$: import("rxjs").Observable<{
        definition: IDocumentDefinition;
        definitionModel: import("../../document-designer.types").IDocumentDefinitionModel;
    } & import("@ngrx/store/src/models").TypedAction<"[Document Designer] Init Definition Model">> & import("@ngrx/effects").CreateEffectMetadata;
    revertCustomization$: import("rxjs").Observable<import("@ngrx/store/src/models").TypedAction<"[Document Designer] Load Definition">> & import("@ngrx/effects").CreateEffectMetadata;
    markPristine$: import("rxjs").Observable<import("@ngrx/store/src/models").TypedAction<"[Document Designer] Mark Designer Pristine">> & import("@ngrx/effects").CreateEffectMetadata;
    markDirty$: import("rxjs").Observable<import("@ngrx/store/src/models").TypedAction<"[Document Designer] Mark Designer Dirty">> & import("@ngrx/effects").CreateEffectMetadata;
    saveDefinition$: import("rxjs").Observable<import("@ngrx/store/src/models").TypedAction<"[Document Designer] Save Definition Error"> | ({
        savedDefinitionName: string;
    } & import("@ngrx/store/src/models").TypedAction<"[Document Designer] Save Definition Success">)> & import("@ngrx/effects").CreateEffectMetadata;
    saveDefinitionSuccess$: import("rxjs").Observable<import("@ngrx/store/src/models").TypedAction<"[Document Designer] Load Definition">> & import("@ngrx/effects").CreateEffectMetadata;
    static ɵfac: i0.ɵɵFactoryDeclaration<DocumentDesignerEffects, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DocumentDesignerEffects>;
}
