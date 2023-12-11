import { ErrorHandler } from '@angular/core';
import { RxBundleCacheService, RxDefinitionAdapterRegistryService, RxDefinitionNameService, RxDefinitionUpdateService, RxGlobalCacheService, RxLogService } from '@helix/platform/shared/api';
import { RxModalService, RxUtilityModalsService } from '@helix/platform/ui-kit';
import { RxGuidService, RxJsonParserService } from '@helix/platform/utils';
import { IViewDefinition, RxOldViewLayoutAdapterService, RxViewActionDefinitionAdapterRegistryService, RxViewActionRegistryService, RxViewComponentRegistryService, RxViewDefinitionParserService, RxViewDefinitionService } from '@helix/platform/view/api';
import { Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RxViewDataDictionaryStoreService } from '../core/view-data-dictionary-store.service';
import { RxViewDefinitionGeneratorService } from '../core/view-definition-generator.service';
import { RxViewDesignerInspectorService } from '../core/view-designer-inspector.service';
import { RxViewDesignerModels } from '../core/view-designer-models.service';
import { IViewDesignModel } from '../interfaces/view-design-model.interface';
import { RxViewDesignerStateHelperService } from './view-designer-state-helper.service';
import * as i0 from "@angular/core";
export declare class ViewDesignerEffects {
    private actions$;
    private store$;
    private rxBundleCacheService;
    private rxDefinitionNameService;
    private rxDefinitionUpdateService;
    private rxGlobalCacheService;
    private rxJsonParserService;
    private rxViewComponentRegistryService;
    private rxViewActionRegistryService;
    private rxViewDefinitionService;
    private viewDesignerModels;
    private rxOldViewLayoutAdapterService;
    private rxViewDefinitionParserService;
    private rxLogService;
    private rxModalService;
    private errorHandler;
    private rxUtilityModalsService;
    private rxDefinitionAdapterRegistryService;
    private rxViewDesignerInspectorService;
    private rxViewDefinitionGeneratorService;
    private rxViewDesignerStateHelperService;
    private rxViewActionDefinitionAdapterRegistryService;
    private rxGuidService;
    private rxViewDataDictionaryStoreService;
    constructor(actions$: Actions, store$: Store<any>, rxBundleCacheService: RxBundleCacheService, rxDefinitionNameService: RxDefinitionNameService, rxDefinitionUpdateService: RxDefinitionUpdateService, rxGlobalCacheService: RxGlobalCacheService, rxJsonParserService: RxJsonParserService, rxViewComponentRegistryService: RxViewComponentRegistryService, rxViewActionRegistryService: RxViewActionRegistryService, rxViewDefinitionService: RxViewDefinitionService, viewDesignerModels: RxViewDesignerModels, rxOldViewLayoutAdapterService: RxOldViewLayoutAdapterService, rxViewDefinitionParserService: RxViewDefinitionParserService, rxLogService: RxLogService, rxModalService: RxModalService, errorHandler: ErrorHandler, rxUtilityModalsService: RxUtilityModalsService, rxDefinitionAdapterRegistryService: RxDefinitionAdapterRegistryService, rxViewDesignerInspectorService: RxViewDesignerInspectorService, rxViewDefinitionGeneratorService: RxViewDefinitionGeneratorService, rxViewDesignerStateHelperService: RxViewDesignerStateHelperService, rxViewActionDefinitionAdapterRegistryService: RxViewActionDefinitionAdapterRegistryService, rxGuidService: RxGuidService, rxViewDataDictionaryStoreService: RxViewDataDictionaryStoreService);
    initViewDesigner$: Observable<import("@ngrx/store/src/models").TypedAction<"[View Designer] Load Bundle Friendly Name"> | ({
        viewDefinitionName?: string;
        layoutTemplate?: number;
    } & import("@ngrx/store/src/models").TypedAction<"[View Designer] Load View Definition">)>;
    destroyViewDesigner$: Observable<import("@ngrx/store/src/models").TypedAction<"[View Designer] Destroy">>;
    loadFriendlyBundleName$: Observable<unknown>;
    loadViewDefinition$: Observable<import("@ngrx/store/src/models").TypedAction<"[View Designer] View Definition Load Error"> | ({
        viewDefinition: IViewDefinition;
    } & import("@ngrx/store/src/models").TypedAction<"[View Designer] View Definition Load Success">)>;
    viewDefinitionLoadSuccess$: Observable<Action>;
    selectViewComponent$: Observable<{
        tabId: number;
    } & import("@ngrx/store/src/models").TypedAction<"[View Designer] Select Inspector Tab">>;
    generateViewDefinition$: Observable<{
        payload: IViewDefinition;
    } & import("@ngrx/store/src/models").TypedAction<"[View Designer] Set Generated View Definition">>;
    saveViewDefinition$: Observable<import("@ngrx/store/src/models").TypedAction<"[View Designer] View Definition Save Error"> | ({
        viewDefinitionName: string;
    } & import("@ngrx/store/src/models").TypedAction<"[View Designer] View Definition Save Success">) | ({
        viewDefinitionName?: string;
        layoutTemplate?: number;
    } & import("@ngrx/store/src/models").TypedAction<"[View Designer] Load View Definition">)>;
    clearCanvas$: Observable<{
        guids: string[];
        selectParent?: boolean;
    } & import("@ngrx/store/src/models").TypedAction<"[View Component] Remove Components">>;
    runPreview$: Observable<IViewDesignModel>;
    private clearStorages;
    private convertViewDefinitionToModel;
    private convertComponentDefinitionToModel;
    private processComponentDefinitionProperties;
    private traverseByComponents;
    private isComponentHasLayout;
    private getActionsToInitializeViewModels;
    private getActionsToUpdateExistingViewModels;
    static ɵfac: i0.ɵɵFactoryDeclaration<ViewDesignerEffects, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ViewDesignerEffects>;
}
