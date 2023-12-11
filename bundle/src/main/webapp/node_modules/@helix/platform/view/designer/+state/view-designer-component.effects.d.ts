import { Injector } from '@angular/core';
import { RxGuidService } from '@helix/platform/utils';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { RxViewDesignerModels } from '../core/view-designer-models.service';
import { IAddNewComponentActionPayload, IInitializeComponentModelActionPayload, IInitializeDataComponentModelActionPayload } from './view-component.types';
import { RxViewDesignerInspectorService } from '../core/view-designer-inspector.service';
import { RxViewExpressionValidatorRegistryService } from '../validation/view-expression-validator-registry.service';
import { RxViewDesignerStateHelperService } from './view-designer-state-helper.service';
import { RxViewDataDictionaryStoreService } from '../core/view-data-dictionary-store.service';
import * as i0 from "@angular/core";
export declare class ViewDesignerComponentEffects {
    private actions$;
    private injector;
    private viewDesignerModels;
    private rxGuidService;
    private store$;
    private rxViewComponentRegistryService;
    private rxViewDesignerInspectorService;
    private rxViewExpressionValidatorRegistryService;
    private rxViewDesignerStateHelperService;
    private rxViewDataDictionaryStoreService;
    initializeComponentModel$: import("rxjs").Observable<import("@ngrx/store/src/models").TypedAction<"[View Designer] View Models Initialized">>;
    registerComponentsValidation$: import("rxjs").Observable<({
        payload: IInitializeComponentModelActionPayload[];
    } & import("@ngrx/store/src/models").TypedAction<"[View Component] Initialize Component Models">) | ({
        payload: IInitializeDataComponentModelActionPayload[];
    } & import("@ngrx/store/src/models").TypedAction<"[View Component] Initialize Data Component Models">)>;
    onComponentsRemoved$: import("rxjs").Observable<{
        guids: string[];
        selectParent?: boolean;
    } & import("@ngrx/store/src/models").TypedAction<"[View Component] Components Removed">>;
    unregisterAllComponentsValidation$: import("rxjs").Observable<import("@ngrx/store/src/models").TypedAction<"[View Designer] Destroy"> | ({
        payload: import("./view-designer.types").IInitViewDesignerActionPayload;
    } & import("@ngrx/store/src/models").TypedAction<"[View Designer] Init">)>;
    insertComponent$: import("rxjs").Observable<({
        payload: IAddNewComponentActionPayload[];
    } & import("@ngrx/store/src/models").TypedAction<"[View Component] Add New Components">) | ({
        guid: any;
        insertIndex: number;
        columnIndex: number;
        outletName: string;
        parentGuid: string;
    } & import("@ngrx/store/src/models").TypedAction<"[View Component] Move Component">)>;
    addNewComponent$: import("rxjs").Observable<({
        guid: string;
    } & import("@ngrx/store/src/models").TypedAction<"[View Component] Select Component">) | ({
        payload: IInitializeComponentModelActionPayload[];
    } & import("@ngrx/store/src/models").TypedAction<"[View Component] Initialize Component Models">) | ({
        payload: IInitializeDataComponentModelActionPayload[];
    } & import("@ngrx/store/src/models").TypedAction<"[View Component] Initialize Data Component Models">)>;
    removeComponent$: import("rxjs").Observable<Action>;
    setChildren$: import("rxjs").Observable<Action>;
    private processAddComponentPayload;
    constructor(actions$: Actions, injector: Injector, viewDesignerModels: RxViewDesignerModels, rxGuidService: RxGuidService, store$: Store<any>, rxViewComponentRegistryService: RxViewComponentRegistryService, rxViewDesignerInspectorService: RxViewDesignerInspectorService, rxViewExpressionValidatorRegistryService: RxViewExpressionValidatorRegistryService, rxViewDesignerStateHelperService: RxViewDesignerStateHelperService, rxViewDataDictionaryStoreService: RxViewDataDictionaryStoreService);
    static ɵfac: i0.ɵɵFactoryDeclaration<ViewDesignerComponentEffects, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ViewDesignerComponentEffects>;
}
