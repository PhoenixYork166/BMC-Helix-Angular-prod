import { AssociationDesignAdapterService } from './association-design-adapter.service';
import { RxDefinitionAdapterRegistryService } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
import * as i1 from "./association-design.component";
import * as i2 from "./association-design-container.component";
import * as i3 from "@angular/common";
import * as i4 from "@bmc-ux/adapt-angular";
import * as i5 from "@ngx-translate/core";
import * as i6 from "./association-record-field-selector-field/association-record-field-selector-form-control.module";
import * as i7 from "@angular/forms";
import * as i8 from "@helix/platform/view/designer";
export declare class AssociationDesignModule {
    constructor(associationDesignAdapterService: AssociationDesignAdapterService, rxDefinitionAdapterRegistryService: RxDefinitionAdapterRegistryService);
    static ɵfac: i0.ɵɵFactoryDeclaration<AssociationDesignModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<AssociationDesignModule, [typeof i1.RxAssociationDesignComponent, typeof i2.RxAssociationDesignContainerComponent], [typeof i3.CommonModule, typeof i4.AdaptButtonModule, typeof i5.TranslateModule, typeof i6.AssociationRecordFieldSelectorFormControlModule, typeof i4.AdaptRxSelectModule, typeof i7.FormsModule, typeof i4.AdaptEmptyStateModule, typeof i8.ViewDesignerCanvasModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<AssociationDesignModule>;
}
