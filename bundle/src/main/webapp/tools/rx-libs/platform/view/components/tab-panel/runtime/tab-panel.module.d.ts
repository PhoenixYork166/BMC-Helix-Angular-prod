import { RxDefinitionAdapterRegistryService } from '@helix/platform/shared/api';
import { RxTabPanelComponentDefinitionAdapterService } from './tab-panel-component-definition-adapter.service';
import { RxTabContainerComponentDefinitionAdapterService } from './tab-container/tab-container-component-definition-adapter.service';
import * as i0 from "@angular/core";
import * as i1 from "./tab-panel.component";
import * as i2 from "./tab-container/tab-container.component";
import * as i3 from "@angular/common";
import * as i4 from "@helix/platform/view/runtime";
import * as i5 from "@bmc-ux/adapt-angular";
export declare class RxTabPanelModule {
    private rxTabPanelComponentDefinitionAdapterService;
    private rxTabContainerComponentDefinitionAdapterService;
    private rxDefinitionAdapterRegistryService;
    constructor(rxTabPanelComponentDefinitionAdapterService: RxTabPanelComponentDefinitionAdapterService, rxTabContainerComponentDefinitionAdapterService: RxTabContainerComponentDefinitionAdapterService, rxDefinitionAdapterRegistryService: RxDefinitionAdapterRegistryService);
    static ɵfac: i0.ɵɵFactoryDeclaration<RxTabPanelModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<RxTabPanelModule, [typeof i1.RxTabPanelComponent, typeof i2.RxTabContainerComponent], [typeof i3.CommonModule, typeof i4.RuntimeViewCanvasModule, typeof i5.AdaptTabsModule], [typeof i1.RxTabPanelComponent, typeof i2.RxTabContainerComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<RxTabPanelModule>;
}
