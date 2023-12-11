import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RxDefinitionAdapterRegistryService } from '@helix/platform/shared/api';
import { RxSelectWithPaginationModule } from '@helix/platform/shared/components';
import { RxViewComponentType } from '@helix/platform/view/api';
import { RuntimeViewCanvasModule } from '@helix/platform/view/runtime';
import { ReadOnlyFieldModule } from '@helix/platform/ui-kit';
import { SelectGroupComponentDefinitionAdapterService } from './select-group-component-definition-adapter.service';
import { SelectGroupFieldComponent } from './select-group-field.component';
import { SelectGroupComponent } from './select-group.component';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "./select-group-component-definition-adapter.service";
export class SelectGroupModule {
    constructor(viewComponentDefinitionAdapterRegistryService, selectGroupComponentDefinitionAdapterService) {
        this.viewComponentDefinitionAdapterRegistryService = viewComponentDefinitionAdapterRegistryService;
        this.selectGroupComponentDefinitionAdapterService = selectGroupComponentDefinitionAdapterService;
        viewComponentDefinitionAdapterRegistryService.registerRuntimeAdapter(RxViewComponentType.SelectGroup, this.selectGroupComponentDefinitionAdapterService);
    }
}
SelectGroupModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectGroupModule, deps: [{ token: i1.RxDefinitionAdapterRegistryService }, { token: i2.SelectGroupComponentDefinitionAdapterService }], target: i0.ɵɵFactoryTarget.NgModule });
SelectGroupModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectGroupModule, declarations: [SelectGroupComponent, SelectGroupFieldComponent], imports: [CommonModule,
        RuntimeViewCanvasModule,
        ReactiveFormsModule,
        RxSelectWithPaginationModule,
        ReadOnlyFieldModule] });
SelectGroupModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectGroupModule, providers: [SelectGroupComponentDefinitionAdapterService], imports: [[
            CommonModule,
            RuntimeViewCanvasModule,
            ReactiveFormsModule,
            RxSelectWithPaginationModule,
            ReadOnlyFieldModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectGroupModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RuntimeViewCanvasModule,
                        ReactiveFormsModule,
                        RxSelectWithPaginationModule,
                        ReadOnlyFieldModule
                    ],
                    declarations: [SelectGroupComponent, SelectGroupFieldComponent],
                    providers: [SelectGroupComponentDefinitionAdapterService],
                    entryComponents: [SelectGroupComponent, SelectGroupFieldComponent]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxDefinitionAdapterRegistryService }, { type: i2.SelectGroupComponentDefinitionAdapterService }]; } });
//# sourceMappingURL=select-group.module.js.map