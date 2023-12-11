import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RxDefinitionAdapterRegistryService } from '@helix/platform/shared/api';
import { RuntimeViewCanvasModule } from '@helix/platform/view/runtime';
import { ContainerComponentDefinitionAdapterService } from './container-component-definition-adapter.service';
import { ContainerComponent } from './container.component';
import { RxViewComponentType } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./container-component-definition-adapter.service";
import * as i2 from "@helix/platform/shared/api";
export class ContainerModule {
    constructor(containerComponentDefinitionAdapterService, rxDefinitionAdapterRegistryService) {
        this.containerComponentDefinitionAdapterService = containerComponentDefinitionAdapterService;
        this.rxDefinitionAdapterRegistryService = rxDefinitionAdapterRegistryService;
        rxDefinitionAdapterRegistryService.registerRuntimeAdapter(RxViewComponentType.Container, this.containerComponentDefinitionAdapterService);
    }
}
ContainerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ContainerModule, deps: [{ token: i1.ContainerComponentDefinitionAdapterService }, { token: i2.RxDefinitionAdapterRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
ContainerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ContainerModule, declarations: [ContainerComponent], imports: [CommonModule, RuntimeViewCanvasModule], exports: [ContainerComponent] });
ContainerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ContainerModule, imports: [[CommonModule, RuntimeViewCanvasModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ContainerModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ContainerComponent],
                    exports: [ContainerComponent],
                    entryComponents: [ContainerComponent],
                    imports: [CommonModule, RuntimeViewCanvasModule]
                }]
        }], ctorParameters: function () { return [{ type: i1.ContainerComponentDefinitionAdapterService }, { type: i2.RxDefinitionAdapterRegistryService }]; } });
//# sourceMappingURL=container.module.js.map