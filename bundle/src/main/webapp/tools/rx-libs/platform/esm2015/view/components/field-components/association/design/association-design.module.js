import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RxAssociationDesignComponent } from './association-design.component';
import { AdaptButtonModule, AdaptEmptyStateModule, AdaptRxSelectModule } from '@bmc-ux/adapt-angular';
import { TranslateModule } from '@ngx-translate/core';
import { AssociationDesignHelperService } from './association-design-helper.service';
import { AssociationRecordFieldSelectorFormControlModule } from './association-record-field-selector-field/association-record-field-selector-form-control.module';
import { ViewDesignerCanvasModule } from '@helix/platform/view/designer';
import { RxAssociationDesignContainerComponent } from './association-design-container.component';
import { AssociationDesignAdapterService } from './association-design-adapter.service';
import { RxDefinitionAdapterRegistryService } from '@helix/platform/shared/api';
import { RxViewComponentType } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./association-design-adapter.service";
import * as i2 from "@helix/platform/shared/api";
export class AssociationDesignModule {
    constructor(associationDesignAdapterService, rxDefinitionAdapterRegistryService) {
        rxDefinitionAdapterRegistryService.registerDesignAdapter(RxViewComponentType.Association, associationDesignAdapterService);
    }
}
AssociationDesignModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationDesignModule, deps: [{ token: i1.AssociationDesignAdapterService }, { token: i2.RxDefinitionAdapterRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
AssociationDesignModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationDesignModule, declarations: [RxAssociationDesignComponent, RxAssociationDesignContainerComponent], imports: [CommonModule,
        AdaptButtonModule,
        TranslateModule,
        AssociationRecordFieldSelectorFormControlModule,
        AdaptRxSelectModule,
        FormsModule,
        AdaptEmptyStateModule,
        ViewDesignerCanvasModule] });
AssociationDesignModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationDesignModule, providers: [AssociationDesignHelperService, AssociationDesignAdapterService], imports: [[
            CommonModule,
            AdaptButtonModule,
            TranslateModule,
            AssociationRecordFieldSelectorFormControlModule,
            AdaptRxSelectModule,
            FormsModule,
            AdaptEmptyStateModule,
            ViewDesignerCanvasModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationDesignModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        AdaptButtonModule,
                        TranslateModule,
                        AssociationRecordFieldSelectorFormControlModule,
                        AdaptRxSelectModule,
                        FormsModule,
                        AdaptEmptyStateModule,
                        ViewDesignerCanvasModule
                    ],
                    declarations: [RxAssociationDesignComponent, RxAssociationDesignContainerComponent],
                    entryComponents: [RxAssociationDesignComponent],
                    providers: [AssociationDesignHelperService, AssociationDesignAdapterService]
                }]
        }], ctorParameters: function () { return [{ type: i1.AssociationDesignAdapterService }, { type: i2.RxDefinitionAdapterRegistryService }]; } });
//# sourceMappingURL=association-design.module.js.map