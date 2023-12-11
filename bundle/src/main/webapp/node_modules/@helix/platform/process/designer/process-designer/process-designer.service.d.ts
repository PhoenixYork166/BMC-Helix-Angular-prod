import { IActionType, IBundleDescriptor, RxActionTypeUtilsService, RxBundleCacheService, RxDesignerCacheService, RxGlobalCacheService } from '@helix/platform/shared/api';
import { IDesignerPaletteTree } from '@helix/platform/shared/components';
import { RxProcessDefinitionService, RxProcessElementRegistryService } from '@helix/platform/process/api';
import * as i0 from "@angular/core";
export declare class RxProcessDesignerService {
    private rxActionTypeUtilsService;
    private rxBundleCacheService;
    private rxDesignerCacheService;
    private rxGlobalCacheService;
    private rxProcessDefinitionService;
    private rxProcessElementRegistryService;
    constructor(rxActionTypeUtilsService: RxActionTypeUtilsService, rxBundleCacheService: RxBundleCacheService, rxDesignerCacheService: RxDesignerCacheService, rxGlobalCacheService: RxGlobalCacheService, rxProcessDefinitionService: RxProcessDefinitionService, rxProcessElementRegistryService: RxProcessElementRegistryService);
    buildPalette(actionTypes: IActionType[], bundleDescriptors: IBundleDescriptor[]): IDesignerPaletteTree[];
    static ɵfac: i0.ɵɵFactoryDeclaration<RxProcessDesignerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxProcessDesignerService>;
}
