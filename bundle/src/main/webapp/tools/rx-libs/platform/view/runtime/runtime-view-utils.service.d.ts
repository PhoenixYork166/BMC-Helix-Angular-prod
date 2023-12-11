import { RxDefinitionAdapterRegistryService } from '@helix/platform/shared/api';
import { IContainerViewComponentDefinition, IViewDefinition, RxViewActionDefinitionAdapterRegistryService, RxViewDefinitionCacheService, RxViewDefinitionParserService, RxViewDefinitionService } from '@helix/platform/view/api';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class RxRuntimeViewUtilsService {
    private rxViewDefinitionService;
    private rxViewDefinitionParserService;
    private rxDefinitionAdapterRegistryService;
    private rxViewActionDefinitionAdapterRegistryService;
    private rxViewDefinitionCacheService;
    constructor(rxViewDefinitionService: RxViewDefinitionService, rxViewDefinitionParserService: RxViewDefinitionParserService, rxDefinitionAdapterRegistryService: RxDefinitionAdapterRegistryService, rxViewActionDefinitionAdapterRegistryService: RxViewActionDefinitionAdapterRegistryService, rxViewDefinitionCacheService: RxViewDefinitionCacheService);
    isViewCancellable(viewDefinitionName: string | IViewDefinition): Observable<boolean>;
    runAdaptersForComponents(viewDefinition: IViewDefinition, containerViewComponentDefinition?: IContainerViewComponentDefinition): Observable<any>[];
    private hasViewCancellingAction;
    private hasPageComponent;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxRuntimeViewUtilsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxRuntimeViewUtilsService>;
}
