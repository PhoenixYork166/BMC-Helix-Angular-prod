import { ComponentFactoryResolver } from '@angular/core';
import { RxOldViewLayoutAdapterService, RxViewComponentRegistryService, RxViewDefinitionParserService } from '@helix/platform/view/api';
import { RxTreeService, RxJsonParserService } from '@helix/platform/utils';
import { RuntimeViewModelApi } from '../runtime-view-model-api.class';
import { RuntimeViewModel } from '../runtime-view.model';
import { RuntimeLayoutItem } from './runtime-layout-item.class';
import { RxLogService } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
/**
 * @desc Represents runtime component tree
 */
export declare class RuntimeViewLayoutService {
    private rxViewComponentRegistryService;
    private viewDefinitionParserService;
    private factoryResolver;
    private tree;
    private rxJsonParserService;
    private rxLogService;
    private rxOldViewLayoutAdapterService;
    layout: RuntimeLayoutItem;
    private runtimeViewModel;
    private runtimeViewModelApi;
    constructor(rxViewComponentRegistryService: RxViewComponentRegistryService, viewDefinitionParserService: RxViewDefinitionParserService, factoryResolver: ComponentFactoryResolver, tree: RxTreeService, rxJsonParserService: RxJsonParserService, rxLogService: RxLogService, rxOldViewLayoutAdapterService: RxOldViewLayoutAdapterService);
    clear(): void;
    init(runtimeViewModel: RuntimeViewModel, runtimeViewModelApi: RuntimeViewModelApi): void;
    private processDefinition;
    private initializeView;
    private getLayoutItem;
    static ɵfac: i0.ɵɵFactoryDeclaration<RuntimeViewLayoutService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RuntimeViewLayoutService>;
}
