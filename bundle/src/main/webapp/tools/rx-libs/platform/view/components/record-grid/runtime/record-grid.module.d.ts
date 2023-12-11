import { RxDefinitionAdapterRegistryService } from '@helix/platform/shared/api';
import { RxRecordGridDefinitionAdapterService } from './record-grid-definition-adapter.service';
import * as i0 from "@angular/core";
import * as i1 from "./record-grid.component";
import * as i2 from "./record-grid-card-layout/record-grid-card-layout.directive";
import * as i3 from "./card-layout-cell-header/card-layout-cell-header.component";
import * as i4 from "./filter-by-card-selection-dialog/filter-by-card-selection-dialog.component";
import * as i5 from "./cell-display-properties/cell-display-properties.directive";
import * as i6 from "@helix/platform/shared/api";
import * as i7 from "@angular/common";
import * as i8 from "@helix/platform/view/runtime";
import * as i9 from "@bmc-ux/adapt-table";
import * as i10 from "@bmc-ux/obsolete";
import * as i11 from "@angular/forms";
import * as i12 from "@bmc-ux/adapt-angular";
import * as i13 from "@ngx-translate/core";
import * as i14 from "../../action-button/runtime/action-button.module";
import * as i15 from "../common/record-grid-common.module";
import * as i16 from "@angular/router";
import * as i17 from "../common/components/advanced-filtering-fields-provider/advanced-filtering-fields-provider.module";
export declare class RecordGridModule {
    private rxRecordGridDefinitionAdapterService;
    private rxDefinitionAdapterRegistryService;
    constructor(rxRecordGridDefinitionAdapterService: RxRecordGridDefinitionAdapterService, rxDefinitionAdapterRegistryService: RxDefinitionAdapterRegistryService);
    static ɵfac: i0.ɵɵFactoryDeclaration<RecordGridModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<RecordGridModule, [typeof i1.RecordGridComponent, typeof i2.GridCardLayoutDirective, typeof i3.CardLayoutCellHeaderComponent, typeof i4.RxFilterByCardSelectionDialogComponent, typeof i5.CellDisplayPropertiesDirective], [typeof i6.RxDefinitionModule, typeof i7.CommonModule, typeof i8.RuntimeViewCanvasModule, typeof i9.AdaptTableModule, typeof i10.AdaptSelectModule, typeof i11.FormsModule, typeof i12.AdaptRxCheckboxModule, typeof i12.AdaptRxSelectModule, typeof i12.AdaptAlertModule, typeof i12.AdaptPopoverModule, typeof i12.AdaptAccordionModule, typeof i12.AdaptButtonModule, typeof i12.AdaptDropdownModule, typeof i13.TranslateModule, typeof i14.ActionButtonModule, typeof i12.AdaptSubnavModule, typeof i12.AdaptAdvancedFilteringModule, typeof i15.RecordGridCommonModule, typeof i16.RouterModule, typeof i17.RxAdvancedFilteringFieldsProviderModule, typeof i12.AdaptRxSearchModule, typeof i12.AdaptEmptyStateModule], [typeof i1.RecordGridComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<RecordGridModule>;
}
