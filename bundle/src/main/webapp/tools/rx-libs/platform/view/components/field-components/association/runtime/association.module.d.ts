import { RxDefinitionAdapterRegistryService } from '@helix/platform/shared/api';
import { RxAssociationDefinitionAdapterService } from './association-definition-adapter.service';
import * as i0 from "@angular/core";
import * as i1 from "./association.component";
import * as i2 from "./record-preview-card/record-preview-card.component";
import * as i3 from "@bmc-ux/adapt-angular";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
import * as i6 from "@helix/platform/ui-kit";
import * as i7 from "@helix/platform/view/runtime";
import * as i8 from "@helix/platform/shared/components";
import * as i9 from "@ngx-translate/core";
export declare class AssociationModule {
    private rxAssociationDefinitionAdapterService;
    private rxDefinitionAdapterRegistryService;
    constructor(rxAssociationDefinitionAdapterService: RxAssociationDefinitionAdapterService, rxDefinitionAdapterRegistryService: RxDefinitionAdapterRegistryService);
    static ɵfac: i0.ɵɵFactoryDeclaration<AssociationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<AssociationModule, [typeof i1.RxAssociationComponent, typeof i2.RxRecordPreviewCardComponent], [typeof i3.AdaptButtonModule, typeof i3.AdaptRxFormControlModule, typeof i4.CommonModule, typeof i5.FormsModule, typeof i6.ReadOnlyFieldModule, typeof i5.ReactiveFormsModule, typeof i7.RuntimeViewCanvasModule, typeof i8.RxSelectWithPaginationModule, typeof i9.TranslateModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<AssociationModule>;
}
