import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RX_RECORD_GRID } from '../record-grid.constant';
import { RxRecordGridDesignAdapterService } from './record-grid-design-adapter.service';
import { RecordGridDesignComponent } from './record-grid-design.component';
import { RecordGridSortEditorControlModule } from './editors/record-grid-sort-editor-control/record-grid-sort-editor-control.module';
import { RecordGridColumnEditorControlComponent } from './editors/record-grid-column-editor-control/record-grid-column-editor-control.component';
import { AdaptAccordionModule, AdaptAdvancedFilteringModule, AdaptButtonModule, AdaptEmptyStateModule, AdaptIconModule, AdaptPopoverModule, AdaptRxCheckboxModule, AdaptRxLabelModule, AdaptRxRadiobuttonModule, AdaptRxSearchModule, AdaptRxSelectModule, AdaptRxSwitchModule, AdaptRxTextfieldModule, AdaptTooltipModule, AdaptTreeModule } from '@bmc-ux/adapt-angular';
import { AdaptTextFieldModule } from '@bmc-ux/obsolete';
import { RecordGridColumnEditorModalComponent } from './editors/record-grid-column-editor-control/record-grid-column-editor-modal/record-grid-column-editor-modal.component';
import { ExpressionEditorModule, ExpressionFormControlModule, GroupButtonFormControlModule, IconPickerFormControlModule, RxDefinitionPickerModule, SelectFormControlModule, StepperWithUnitsFormControlModule } from '@helix/platform/shared/components';
import { ColumnEditorAlignmentComponent } from './editors/record-grid-column-editor-control/record-grid-column-editor-modal/column-editor-alignment/column-editor-alignment.component';
import { RecordGridFilterPresetEditorControlComponent } from './editors/record-grid-filter-preset-editor-control/record-grid-filter-preset-editor-control.component';
import { RecordGridFilterPresetEditorModalComponent } from './editors/record-grid-filter-preset-editor-control/record-grid-filter-preset-editor-modal/record-grid-filter-preset-editor-modal.component';
import { RxDirectivesModule } from '@helix/platform/ui-kit';
import { RecordGridCommonModule } from '../common/record-grid-common.module';
import { ActionListControlModule, ViewDesignerCanvasModule } from '@helix/platform/view/designer';
import { AdaptTableModule } from '@bmc-ux/adapt-table';
import { RxDefinitionAdapterRegistryService, RxDefinitionModule } from '@helix/platform/shared/api';
import { RxRecordGridRowActionEditorWidgetComponent } from './editors/record-grid-row-action-editor-control/record-grid-row-action-editor-widget.component';
import { RecordGridRowActionEditorModalComponent } from './editors/record-grid-row-action-editor-control/record-grid-row-action-editor-modal/record-grid-row-action-editor-modal.component';
import { TranslateModule } from '@ngx-translate/core';
import { RecordGridCellDisplayPropertiesComponent } from './editors/record-grid-column-editor-control/record-grid-column-editor-modal/cell-display-properties/cell-display-properties.component';
import { RecordGridCellDisplayPropertiesEditorComponent } from './editors/record-grid-column-editor-control/record-grid-column-editor-modal/cell-display-properties/cell-display-properties-editor.component';
import { RxNoWhitespaceValidatorModule, RxUniqueValidatorModule } from '@helix/platform/utils';
import { RecordGridNamedFilterOptionsComponent } from './editors/record-grid-column-editor-control/record-grid-column-editor-modal/named-filter-options/named-filter-options.component';
import { RecordGridNamedFilterOptionsEditorModalComponent } from './editors/record-grid-column-editor-control/record-grid-column-editor-modal/named-filter-options/named-filter-options-editor/named-filter-options-editor-modal.component';
import { RxAdvancedFilteringFieldsProviderModule } from '../common/components/advanced-filtering-fields-provider/advanced-filtering-fields-provider.module';
import { RecordGridViewPresetsWidgetModule } from './editors/record-grid-view-presets-widget/record-grid-view-presets-widget.module';
import { RecordGridFilterSelectControlModule } from './editors/record-grid-filter-select-control';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "./record-grid-design-adapter.service";
export class RecordGridDesignModule {
    constructor(rxDefinitionAdapterRegistryService, rxRecordGridDesignAdapterService) {
        this.rxDefinitionAdapterRegistryService = rxDefinitionAdapterRegistryService;
        this.rxRecordGridDesignAdapterService = rxRecordGridDesignAdapterService;
        this.rxDefinitionAdapterRegistryService.registerDesignAdapter(RX_RECORD_GRID.type, this.rxRecordGridDesignAdapterService);
    }
}
RecordGridDesignModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridDesignModule, deps: [{ token: i1.RxDefinitionAdapterRegistryService }, { token: i2.RxRecordGridDesignAdapterService }], target: i0.ɵɵFactoryTarget.NgModule });
RecordGridDesignModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridDesignModule, declarations: [RecordGridDesignComponent,
        RecordGridColumnEditorControlComponent,
        RecordGridColumnEditorModalComponent,
        ColumnEditorAlignmentComponent,
        RecordGridFilterPresetEditorControlComponent,
        RecordGridFilterPresetEditorModalComponent,
        RxRecordGridRowActionEditorWidgetComponent,
        RecordGridRowActionEditorModalComponent,
        RecordGridCellDisplayPropertiesComponent,
        RecordGridCellDisplayPropertiesEditorComponent,
        RecordGridNamedFilterOptionsComponent,
        RecordGridNamedFilterOptionsEditorModalComponent], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RecordGridSortEditorControlModule,
        AdaptButtonModule,
        AdaptTooltipModule,
        AdaptAccordionModule,
        AdaptTextFieldModule,
        AdaptRxSearchModule,
        AdaptTreeModule,
        AdaptRxCheckboxModule,
        AdaptRxRadiobuttonModule,
        ActionListControlModule,
        GroupButtonFormControlModule,
        DragDropModule,
        ExpressionEditorModule,
        AdaptAdvancedFilteringModule,
        AdaptRxTextfieldModule,
        RxDirectivesModule,
        AdaptRxLabelModule,
        RecordGridCommonModule,
        ViewDesignerCanvasModule,
        AdaptTableModule,
        AdaptEmptyStateModule,
        RxDefinitionModule,
        AdaptRxSelectModule,
        RxDefinitionPickerModule,
        ExpressionFormControlModule,
        AdaptIconModule,
        TranslateModule,
        SelectFormControlModule,
        RxUniqueValidatorModule,
        AdaptRxSwitchModule,
        IconPickerFormControlModule,
        AdaptPopoverModule,
        RxAdvancedFilteringFieldsProviderModule,
        RecordGridViewPresetsWidgetModule,
        RecordGridFilterSelectControlModule,
        StepperWithUnitsFormControlModule,
        RxNoWhitespaceValidatorModule] });
RecordGridDesignModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridDesignModule, imports: [[
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            RecordGridSortEditorControlModule,
            AdaptButtonModule,
            AdaptTooltipModule,
            AdaptAccordionModule,
            AdaptTextFieldModule,
            AdaptRxSearchModule,
            AdaptTreeModule,
            AdaptRxCheckboxModule,
            AdaptRxRadiobuttonModule,
            ActionListControlModule,
            GroupButtonFormControlModule,
            DragDropModule,
            ExpressionEditorModule,
            AdaptAdvancedFilteringModule,
            AdaptRxTextfieldModule,
            RxDirectivesModule,
            AdaptRxLabelModule,
            RecordGridCommonModule,
            ViewDesignerCanvasModule,
            AdaptTableModule,
            AdaptEmptyStateModule,
            RxDefinitionModule,
            AdaptRxSelectModule,
            RxDefinitionPickerModule,
            ExpressionFormControlModule,
            AdaptIconModule,
            TranslateModule,
            SelectFormControlModule,
            RxUniqueValidatorModule,
            AdaptRxSwitchModule,
            IconPickerFormControlModule,
            AdaptPopoverModule,
            RxAdvancedFilteringFieldsProviderModule,
            RecordGridViewPresetsWidgetModule,
            RecordGridFilterSelectControlModule,
            StepperWithUnitsFormControlModule,
            RxNoWhitespaceValidatorModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridDesignModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        RecordGridSortEditorControlModule,
                        AdaptButtonModule,
                        AdaptTooltipModule,
                        AdaptAccordionModule,
                        AdaptTextFieldModule,
                        AdaptRxSearchModule,
                        AdaptTreeModule,
                        AdaptRxCheckboxModule,
                        AdaptRxRadiobuttonModule,
                        ActionListControlModule,
                        GroupButtonFormControlModule,
                        DragDropModule,
                        ExpressionEditorModule,
                        AdaptAdvancedFilteringModule,
                        AdaptRxTextfieldModule,
                        RxDirectivesModule,
                        AdaptRxLabelModule,
                        RecordGridCommonModule,
                        ViewDesignerCanvasModule,
                        AdaptTableModule,
                        AdaptEmptyStateModule,
                        RxDefinitionModule,
                        AdaptRxSelectModule,
                        RxDefinitionPickerModule,
                        ExpressionFormControlModule,
                        AdaptIconModule,
                        TranslateModule,
                        SelectFormControlModule,
                        RxUniqueValidatorModule,
                        AdaptRxSwitchModule,
                        IconPickerFormControlModule,
                        AdaptPopoverModule,
                        RxAdvancedFilteringFieldsProviderModule,
                        RecordGridViewPresetsWidgetModule,
                        RecordGridFilterSelectControlModule,
                        StepperWithUnitsFormControlModule,
                        RxNoWhitespaceValidatorModule
                    ],
                    declarations: [
                        RecordGridDesignComponent,
                        RecordGridColumnEditorControlComponent,
                        RecordGridColumnEditorModalComponent,
                        ColumnEditorAlignmentComponent,
                        RecordGridFilterPresetEditorControlComponent,
                        RecordGridFilterPresetEditorModalComponent,
                        RxRecordGridRowActionEditorWidgetComponent,
                        RecordGridRowActionEditorModalComponent,
                        RecordGridCellDisplayPropertiesComponent,
                        RecordGridCellDisplayPropertiesEditorComponent,
                        RecordGridNamedFilterOptionsComponent,
                        RecordGridNamedFilterOptionsEditorModalComponent
                    ],
                    entryComponents: [
                        RecordGridDesignComponent,
                        RecordGridColumnEditorControlComponent,
                        RecordGridColumnEditorModalComponent,
                        RecordGridFilterPresetEditorControlComponent,
                        RecordGridFilterPresetEditorModalComponent
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxDefinitionAdapterRegistryService }, { type: i2.RxRecordGridDesignAdapterService }]; } });
//# sourceMappingURL=record-grid-design.module.js.map