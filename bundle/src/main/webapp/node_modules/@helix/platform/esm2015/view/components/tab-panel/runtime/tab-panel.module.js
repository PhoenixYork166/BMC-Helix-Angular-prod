import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RxDefinitionAdapterRegistryService } from '@helix/platform/shared/api';
import { RuntimeViewCanvasModule } from '@helix/platform/view/runtime';
import { RxTabPanelComponentDefinitionAdapterService } from './tab-panel-component-definition-adapter.service';
import { RxTabPanelComponent } from './tab-panel.component';
import { RxTabContainerComponent } from './tab-container/tab-container.component';
import { AdaptTabsModule } from '@bmc-ux/adapt-angular';
import { RxTabContainerComponentDefinitionAdapterService } from './tab-container/tab-container-component-definition-adapter.service';
import { RxViewComponentType } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./tab-panel-component-definition-adapter.service";
import * as i2 from "./tab-container/tab-container-component-definition-adapter.service";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "@bmc-ux/adapt-angular";
export class RxTabPanelModule {
    constructor(rxTabPanelComponentDefinitionAdapterService, rxTabContainerComponentDefinitionAdapterService, rxDefinitionAdapterRegistryService) {
        this.rxTabPanelComponentDefinitionAdapterService = rxTabPanelComponentDefinitionAdapterService;
        this.rxTabContainerComponentDefinitionAdapterService = rxTabContainerComponentDefinitionAdapterService;
        this.rxDefinitionAdapterRegistryService = rxDefinitionAdapterRegistryService;
        rxDefinitionAdapterRegistryService.registerRuntimeAdapter(RxViewComponentType.TabPanel, rxTabPanelComponentDefinitionAdapterService);
        rxDefinitionAdapterRegistryService.registerRuntimeAdapter(RxViewComponentType.TabContainer, rxTabContainerComponentDefinitionAdapterService);
    }
}
RxTabPanelModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxTabPanelModule, deps: [{ token: i1.RxTabPanelComponentDefinitionAdapterService }, { token: i2.RxTabContainerComponentDefinitionAdapterService }, { token: i3.RxDefinitionAdapterRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
RxTabPanelModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxTabPanelModule, declarations: [RxTabPanelComponent, RxTabContainerComponent], imports: [CommonModule, RuntimeViewCanvasModule, i4.AdaptTabsModule], exports: [RxTabPanelComponent, RxTabContainerComponent] });
RxTabPanelModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxTabPanelModule, providers: [RxTabPanelComponentDefinitionAdapterService, RxTabContainerComponentDefinitionAdapterService], imports: [[CommonModule, RuntimeViewCanvasModule, AdaptTabsModule.forRoot()]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxTabPanelModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxTabPanelComponent, RxTabContainerComponent],
                    exports: [RxTabPanelComponent, RxTabContainerComponent],
                    entryComponents: [RxTabPanelComponent, RxTabContainerComponent],
                    imports: [CommonModule, RuntimeViewCanvasModule, AdaptTabsModule.forRoot()],
                    providers: [RxTabPanelComponentDefinitionAdapterService, RxTabContainerComponentDefinitionAdapterService]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxTabPanelComponentDefinitionAdapterService }, { type: i2.RxTabContainerComponentDefinitionAdapterService }, { type: i3.RxDefinitionAdapterRegistryService }]; } });
//# sourceMappingURL=tab-panel.module.js.map