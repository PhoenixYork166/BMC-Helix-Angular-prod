import { RxRecordGridDesignAdapterService } from './record-grid-design-adapter.service';
import { RxDefinitionAdapterRegistryService } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
import * as i1 from "./record-grid-design.component";
import * as i2 from "./editors/record-grid-column-editor-control/record-grid-column-editor-control.component";
import * as i3 from "./editors/record-grid-column-editor-control/record-grid-column-editor-modal/record-grid-column-editor-modal.component";
import * as i4 from "./editors/record-grid-column-editor-control/record-grid-column-editor-modal/column-editor-alignment/column-editor-alignment.component";
import * as i5 from "./editors/record-grid-filter-preset-editor-control/record-grid-filter-preset-editor-control.component";
import * as i6 from "./editors/record-grid-filter-preset-editor-control/record-grid-filter-preset-editor-modal/record-grid-filter-preset-editor-modal.component";
import * as i7 from "./editors/record-grid-row-action-editor-control/record-grid-row-action-editor-widget.component";
import * as i8 from "./editors/record-grid-row-action-editor-control/record-grid-row-action-editor-modal/record-grid-row-action-editor-modal.component";
import * as i9 from "./editors/record-grid-column-editor-control/record-grid-column-editor-modal/cell-display-properties/cell-display-properties.component";
import * as i10 from "./editors/record-grid-column-editor-control/record-grid-column-editor-modal/cell-display-properties/cell-display-properties-editor.component";
import * as i11 from "./editors/record-grid-column-editor-control/record-grid-column-editor-modal/named-filter-options/named-filter-options.component";
import * as i12 from "./editors/record-grid-column-editor-control/record-grid-column-editor-modal/named-filter-options/named-filter-options-editor/named-filter-options-editor-modal.component";
import * as i13 from "@angular/common";
import * as i14 from "@angular/forms";
import * as i15 from "./editors/record-grid-sort-editor-control/record-grid-sort-editor-control.module";
import * as i16 from "@bmc-ux/adapt-angular";
import * as i17 from "@bmc-ux/obsolete";
import * as i18 from "@helix/platform/view/designer";
import * as i19 from "@helix/platform/shared/components";
import * as i20 from "@angular/cdk/drag-drop";
import * as i21 from "@helix/platform/ui-kit";
import * as i22 from "../common/record-grid-common.module";
import * as i23 from "@bmc-ux/adapt-table";
import * as i24 from "@helix/platform/shared/api";
import * as i25 from "@ngx-translate/core";
import * as i26 from "@helix/platform/utils";
import * as i27 from "../common/components/advanced-filtering-fields-provider/advanced-filtering-fields-provider.module";
import * as i28 from "./editors/record-grid-view-presets-widget/record-grid-view-presets-widget.module";
import * as i29 from "./editors/record-grid-filter-select-control/record-grid-filter-select-control.module";
export declare class RecordGridDesignModule {
    private rxDefinitionAdapterRegistryService;
    private rxRecordGridDesignAdapterService;
    constructor(rxDefinitionAdapterRegistryService: RxDefinitionAdapterRegistryService, rxRecordGridDesignAdapterService: RxRecordGridDesignAdapterService);
    static ɵfac: i0.ɵɵFactoryDeclaration<RecordGridDesignModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<RecordGridDesignModule, [typeof i1.RecordGridDesignComponent, typeof i2.RecordGridColumnEditorControlComponent, typeof i3.RecordGridColumnEditorModalComponent, typeof i4.ColumnEditorAlignmentComponent, typeof i5.RecordGridFilterPresetEditorControlComponent, typeof i6.RecordGridFilterPresetEditorModalComponent, typeof i7.RxRecordGridRowActionEditorWidgetComponent, typeof i8.RecordGridRowActionEditorModalComponent, typeof i9.RecordGridCellDisplayPropertiesComponent, typeof i10.RecordGridCellDisplayPropertiesEditorComponent, typeof i11.RecordGridNamedFilterOptionsComponent, typeof i12.RecordGridNamedFilterOptionsEditorModalComponent], [typeof i13.CommonModule, typeof i14.FormsModule, typeof i14.ReactiveFormsModule, typeof i15.RecordGridSortEditorControlModule, typeof i16.AdaptButtonModule, typeof i16.AdaptTooltipModule, typeof i16.AdaptAccordionModule, typeof i17.AdaptTextFieldModule, typeof i16.AdaptRxSearchModule, typeof i16.AdaptTreeModule, typeof i16.AdaptRxCheckboxModule, typeof i16.AdaptRxRadiobuttonModule, typeof i18.ActionListControlModule, typeof i19.GroupButtonFormControlModule, typeof i20.DragDropModule, typeof i19.ExpressionEditorModule, typeof i16.AdaptAdvancedFilteringModule, typeof i16.AdaptRxTextfieldModule, typeof i21.RxDirectivesModule, typeof i16.AdaptRxLabelModule, typeof i22.RecordGridCommonModule, typeof i18.ViewDesignerCanvasModule, typeof i23.AdaptTableModule, typeof i16.AdaptEmptyStateModule, typeof i24.RxDefinitionModule, typeof i16.AdaptRxSelectModule, typeof i19.RxDefinitionPickerModule, typeof i19.ExpressionFormControlModule, typeof i16.AdaptIconModule, typeof i25.TranslateModule, typeof i19.SelectFormControlModule, typeof i26.RxUniqueValidatorModule, typeof i16.AdaptRxSwitchModule, typeof i19.IconPickerFormControlModule, typeof i16.AdaptPopoverModule, typeof i27.RxAdvancedFilteringFieldsProviderModule, typeof i28.RecordGridViewPresetsWidgetModule, typeof i29.RecordGridFilterSelectControlModule, typeof i19.StepperWithUnitsFormControlModule, typeof i26.RxNoWhitespaceValidatorModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<RecordGridDesignModule>;
}