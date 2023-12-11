import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import { RxProcessDefinitionCacheService } from '@helix/platform/process/api';
import { RxApplicationLoaderService, RxBundleCacheService } from '@helix/platform/shared/api';
import { RxUtilityModalsService } from '@helix/platform/ui-kit';
import { RxJsonParserService } from '@helix/platform/utils';
import * as i0 from "@angular/core";
export declare class ProcessDesignerFrameComponent {
    private rxApplicationLoaderService;
    private rxBundleCacheService;
    private rxJsonParserService;
    private rxProcessDefinitionCacheService;
    private domSanitizer;
    private activeModalRef;
    private rxUtilityModalsService;
    context: ActiveModalRef;
    iframeSrc: SafeResourceUrl;
    isProcessDesignerLoadingInProgress: boolean;
    isDefinitionDirty: boolean;
    onMessage(event: MessageEvent): void;
    constructor(rxApplicationLoaderService: RxApplicationLoaderService, rxBundleCacheService: RxBundleCacheService, rxJsonParserService: RxJsonParserService, rxProcessDefinitionCacheService: RxProcessDefinitionCacheService, domSanitizer: DomSanitizer, activeModalRef: ActiveModalRef, rxUtilityModalsService: RxUtilityModalsService);
    private closeProcessDesigner;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProcessDesignerFrameComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ProcessDesignerFrameComponent, "rx-process-designer-frame", never, {}, {}, never, never>;
}
