import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxDefinitionAdapterRegistryService } from '@helix/platform/shared/api';
import { RxExtensionContainerComponent } from './extension-container.component';
import { RX_EXTENSION_CONTAINER } from '../extension-container.constant';
import { RuntimeViewCanvasModule } from '@helix/platform/view/runtime';
import { RxExtensionContainerDefinitionAdapterService } from './extension-container-definition-adapter.service';
import { RxExtensionContainerHelperService } from './extension-container-helper.service';
import { ExtensionContainerSectionComponent } from './extension-container-section/extension-container-section.component';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "./extension-container-definition-adapter.service";
export class RxExtensionContainerModule {
    constructor(rxDefinitionAdapterRegistryService, rxExtensionContainerDefinitionAdapterService) {
        this.rxDefinitionAdapterRegistryService = rxDefinitionAdapterRegistryService;
        this.rxExtensionContainerDefinitionAdapterService = rxExtensionContainerDefinitionAdapterService;
        rxDefinitionAdapterRegistryService.registerRuntimeAdapter(RX_EXTENSION_CONTAINER.type, this.rxExtensionContainerDefinitionAdapterService);
    }
}
RxExtensionContainerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExtensionContainerModule, deps: [{ token: i1.RxDefinitionAdapterRegistryService }, { token: i2.RxExtensionContainerDefinitionAdapterService }], target: i0.ɵɵFactoryTarget.NgModule });
RxExtensionContainerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExtensionContainerModule, declarations: [RxExtensionContainerComponent, ExtensionContainerSectionComponent], imports: [CommonModule, RuntimeViewCanvasModule], exports: [RxExtensionContainerComponent] });
RxExtensionContainerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExtensionContainerModule, providers: [RxExtensionContainerDefinitionAdapterService, RxExtensionContainerHelperService], imports: [[CommonModule, RuntimeViewCanvasModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExtensionContainerModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [RxExtensionContainerDefinitionAdapterService, RxExtensionContainerHelperService],
                    declarations: [RxExtensionContainerComponent, ExtensionContainerSectionComponent],
                    exports: [RxExtensionContainerComponent],
                    entryComponents: [RxExtensionContainerComponent, ExtensionContainerSectionComponent],
                    imports: [CommonModule, RuntimeViewCanvasModule]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxDefinitionAdapterRegistryService }, { type: i2.RxExtensionContainerDefinitionAdapterService }]; } });
//# sourceMappingURL=extension-container.module.js.map