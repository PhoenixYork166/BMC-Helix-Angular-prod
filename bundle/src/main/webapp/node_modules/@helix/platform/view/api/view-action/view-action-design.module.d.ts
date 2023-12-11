import { RxViewComponentRegistryService } from '../registries/view-component-registry.service';
import { RxDefinitionAdapterRegistryService } from '@helix/platform/shared/api';
import { RxViewActionDesignAdapterService } from './view-action-design-adapter.service';
import * as i0 from "@angular/core";
export declare class ViewActionDesignModule {
    constructor(rxViewComponentRegistryService: RxViewComponentRegistryService, rxDefinitionAdapterRegistryService: RxDefinitionAdapterRegistryService, rxViewActionDesignAdapterService: RxViewActionDesignAdapterService);
    static ɵfac: i0.ɵɵFactoryDeclaration<ViewActionDesignModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ViewActionDesignModule, never, never, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ViewActionDesignModule>;
}
