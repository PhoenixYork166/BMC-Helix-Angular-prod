import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdaptButtonModule, AdaptRxFormControlModule } from '@bmc-ux/adapt-angular';
import { RxDefinitionAdapterRegistryService } from '@helix/platform/shared/api';
import { RxSelectWithPaginationModule } from '@helix/platform/shared/components';
import { RxViewComponentType } from '@helix/platform/view/api';
import { RuntimeViewCanvasModule } from '@helix/platform/view/runtime';
import { TranslateModule } from '@ngx-translate/core';
import { ReadOnlyFieldModule } from '@helix/platform/ui-kit';
import { RxAssociationDefinitionAdapterService } from './association-definition-adapter.service';
import { RxAssociationComponent } from './association.component';
import { RxRecordPreviewCardComponent } from './record-preview-card/record-preview-card.component';
import * as i0 from "@angular/core";
import * as i1 from "./association-definition-adapter.service";
import * as i2 from "@helix/platform/shared/api";
export class AssociationModule {
    constructor(rxAssociationDefinitionAdapterService, rxDefinitionAdapterRegistryService) {
        this.rxAssociationDefinitionAdapterService = rxAssociationDefinitionAdapterService;
        this.rxDefinitionAdapterRegistryService = rxDefinitionAdapterRegistryService;
        this.rxDefinitionAdapterRegistryService.registerRuntimeAdapter(RxViewComponentType.Association, this.rxAssociationDefinitionAdapterService);
    }
}
AssociationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationModule, deps: [{ token: i1.RxAssociationDefinitionAdapterService }, { token: i2.RxDefinitionAdapterRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
AssociationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationModule, declarations: [RxAssociationComponent, RxRecordPreviewCardComponent], imports: [AdaptButtonModule,
        AdaptRxFormControlModule,
        CommonModule,
        FormsModule,
        ReadOnlyFieldModule,
        ReactiveFormsModule,
        RuntimeViewCanvasModule,
        RxSelectWithPaginationModule,
        TranslateModule] });
AssociationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationModule, providers: [DatePipe, RxAssociationDefinitionAdapterService], imports: [[
            AdaptButtonModule,
            AdaptRxFormControlModule,
            CommonModule,
            FormsModule,
            ReadOnlyFieldModule,
            ReactiveFormsModule,
            RuntimeViewCanvasModule,
            RxSelectWithPaginationModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AdaptButtonModule,
                        AdaptRxFormControlModule,
                        CommonModule,
                        FormsModule,
                        ReadOnlyFieldModule,
                        ReactiveFormsModule,
                        RuntimeViewCanvasModule,
                        RxSelectWithPaginationModule,
                        TranslateModule
                    ],
                    declarations: [RxAssociationComponent, RxRecordPreviewCardComponent],
                    entryComponents: [RxAssociationComponent, RxRecordPreviewCardComponent],
                    providers: [DatePipe, RxAssociationDefinitionAdapterService]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxAssociationDefinitionAdapterService }, { type: i2.RxDefinitionAdapterRegistryService }]; } });
//# sourceMappingURL=association.module.js.map