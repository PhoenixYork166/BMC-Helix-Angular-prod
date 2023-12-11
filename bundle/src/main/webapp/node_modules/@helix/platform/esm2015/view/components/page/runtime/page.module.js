import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RxDefinitionAdapterRegistryService } from '@helix/platform/shared/api';
import { RuntimeViewCanvasModule } from '@helix/platform/view/runtime';
import { PageComponentDefinitionAdapterService } from './page-component-definition-adapter.service';
import { PageComponent } from './page.component';
import { RxViewComponentType } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "./page-component-definition-adapter.service";
export class PageModule {
    constructor(rxDefinitionAdapterRegistryService, pageComponentDefinitionAdapterService) {
        this.rxDefinitionAdapterRegistryService = rxDefinitionAdapterRegistryService;
        this.pageComponentDefinitionAdapterService = pageComponentDefinitionAdapterService;
        this.rxDefinitionAdapterRegistryService.registerRuntimeAdapter(RxViewComponentType.Page, this.pageComponentDefinitionAdapterService);
    }
}
PageModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: PageModule, deps: [{ token: i1.RxDefinitionAdapterRegistryService }, { token: i2.PageComponentDefinitionAdapterService }], target: i0.ɵɵFactoryTarget.NgModule });
PageModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: PageModule, declarations: [PageComponent], imports: [CommonModule, RuntimeViewCanvasModule], exports: [PageComponent] });
PageModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: PageModule, providers: [PageComponentDefinitionAdapterService], imports: [[CommonModule, RuntimeViewCanvasModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: PageModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RuntimeViewCanvasModule],
                    providers: [PageComponentDefinitionAdapterService],
                    declarations: [PageComponent],
                    exports: [PageComponent],
                    entryComponents: [PageComponent]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxDefinitionAdapterRegistryService }, { type: i2.PageComponentDefinitionAdapterService }]; } });
//# sourceMappingURL=page.module.js.map