import { RxDefinitionAdapterRegistryService } from '@helix/platform/shared/api';
import { PageComponentDefinitionAdapterService } from './page-component-definition-adapter.service';
import * as i0 from "@angular/core";
import * as i1 from "./page.component";
import * as i2 from "@angular/common";
import * as i3 from "@helix/platform/view/runtime";
export declare class PageModule {
    private rxDefinitionAdapterRegistryService;
    private pageComponentDefinitionAdapterService;
    constructor(rxDefinitionAdapterRegistryService: RxDefinitionAdapterRegistryService, pageComponentDefinitionAdapterService: PageComponentDefinitionAdapterService);
    static ɵfac: i0.ɵɵFactoryDeclaration<PageModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<PageModule, [typeof i1.PageComponent], [typeof i2.CommonModule, typeof i3.RuntimeViewCanvasModule], [typeof i1.PageComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<PageModule>;
}
