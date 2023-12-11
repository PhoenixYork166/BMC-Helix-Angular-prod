import { RxDefinitionAdapterRegistryService } from '@helix/platform/shared/api';
import { RxExtensionContainerDefinitionAdapterService } from './extension-container-definition-adapter.service';
import * as i0 from "@angular/core";
import * as i1 from "./extension-container.component";
import * as i2 from "./extension-container-section/extension-container-section.component";
import * as i3 from "@angular/common";
import * as i4 from "@helix/platform/view/runtime";
export declare class RxExtensionContainerModule {
    private rxDefinitionAdapterRegistryService;
    private rxExtensionContainerDefinitionAdapterService;
    constructor(rxDefinitionAdapterRegistryService: RxDefinitionAdapterRegistryService, rxExtensionContainerDefinitionAdapterService: RxExtensionContainerDefinitionAdapterService);
    static ɵfac: i0.ɵɵFactoryDeclaration<RxExtensionContainerModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<RxExtensionContainerModule, [typeof i1.RxExtensionContainerComponent, typeof i2.ExtensionContainerSectionComponent], [typeof i3.CommonModule, typeof i4.RuntimeViewCanvasModule], [typeof i1.RxExtensionContainerComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<RxExtensionContainerModule>;
}
