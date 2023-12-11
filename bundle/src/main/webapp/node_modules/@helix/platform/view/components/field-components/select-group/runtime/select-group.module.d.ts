import { RxDefinitionAdapterRegistryService } from '@helix/platform/shared/api';
import { SelectGroupComponentDefinitionAdapterService } from './select-group-component-definition-adapter.service';
import * as i0 from "@angular/core";
import * as i1 from "./select-group.component";
import * as i2 from "./select-group-field.component";
import * as i3 from "@angular/common";
import * as i4 from "@helix/platform/view/runtime";
import * as i5 from "@angular/forms";
import * as i6 from "@helix/platform/shared/components";
import * as i7 from "@helix/platform/ui-kit";
export declare class SelectGroupModule {
    private viewComponentDefinitionAdapterRegistryService;
    private selectGroupComponentDefinitionAdapterService;
    constructor(viewComponentDefinitionAdapterRegistryService: RxDefinitionAdapterRegistryService, selectGroupComponentDefinitionAdapterService: SelectGroupComponentDefinitionAdapterService);
    static ɵfac: i0.ɵɵFactoryDeclaration<SelectGroupModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<SelectGroupModule, [typeof i1.SelectGroupComponent, typeof i2.SelectGroupFieldComponent], [typeof i3.CommonModule, typeof i4.RuntimeViewCanvasModule, typeof i5.ReactiveFormsModule, typeof i6.RxSelectWithPaginationModule, typeof i7.ReadOnlyFieldModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<SelectGroupModule>;
}
