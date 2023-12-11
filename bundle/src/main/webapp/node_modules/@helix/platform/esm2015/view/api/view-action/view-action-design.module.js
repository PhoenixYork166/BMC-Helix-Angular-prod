import { NgModule } from '@angular/core';
import { RxViewComponentRegistryService } from '../registries/view-component-registry.service';
import { RxViewComponentType } from '../domain/view-component.types';
import { RxDefinitionAdapterRegistryService } from '@helix/platform/shared/api';
import { RxViewActionDesignAdapterService } from './view-action-design-adapter.service';
import * as i0 from "@angular/core";
import * as i1 from "../registries/view-component-registry.service";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "./view-action-design-adapter.service";
export class ViewActionDesignModule {
    constructor(rxViewComponentRegistryService, rxDefinitionAdapterRegistryService, rxViewActionDesignAdapterService) {
        rxDefinitionAdapterRegistryService.registerDesignAdapter(RxViewComponentType.Action, rxViewActionDesignAdapterService);
        rxViewComponentRegistryService.register({
            type: RxViewComponentType.Action,
            isDataComponent: true,
            isContainerComponent: true
        });
    }
}
ViewActionDesignModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewActionDesignModule, deps: [{ token: i1.RxViewComponentRegistryService }, { token: i2.RxDefinitionAdapterRegistryService }, { token: i3.RxViewActionDesignAdapterService }], target: i0.ɵɵFactoryTarget.NgModule });
ViewActionDesignModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewActionDesignModule });
ViewActionDesignModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewActionDesignModule, providers: [RxViewActionDesignAdapterService] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewActionDesignModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [RxViewActionDesignAdapterService]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxViewComponentRegistryService }, { type: i2.RxDefinitionAdapterRegistryService }, { type: i3.RxViewActionDesignAdapterService }]; } });
//# sourceMappingURL=view-action-design.module.js.map