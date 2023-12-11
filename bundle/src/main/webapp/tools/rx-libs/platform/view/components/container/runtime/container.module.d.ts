import { RxDefinitionAdapterRegistryService } from '@helix/platform/shared/api';
import { ContainerComponentDefinitionAdapterService } from './container-component-definition-adapter.service';
import * as i0 from "@angular/core";
import * as i1 from "./container.component";
import * as i2 from "@angular/common";
import * as i3 from "@helix/platform/view/runtime";
export declare class ContainerModule {
    private containerComponentDefinitionAdapterService;
    private rxDefinitionAdapterRegistryService;
    constructor(containerComponentDefinitionAdapterService: ContainerComponentDefinitionAdapterService, rxDefinitionAdapterRegistryService: RxDefinitionAdapterRegistryService);
    static ɵfac: i0.ɵɵFactoryDeclaration<ContainerModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ContainerModule, [typeof i1.ContainerComponent], [typeof i2.CommonModule, typeof i3.RuntimeViewCanvasModule], [typeof i1.ContainerComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ContainerModule>;
}
