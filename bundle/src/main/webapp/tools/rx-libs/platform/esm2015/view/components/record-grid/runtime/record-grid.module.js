import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdaptAccordionModule, AdaptAdvancedFilteringModule, AdaptAlertModule, AdaptButtonModule, AdaptDropdownModule, AdaptPopoverModule, AdaptRxCheckboxModule, AdaptRxSelectModule, AdaptSubnavModule, AdaptRxSearchModule, AdaptEmptyStateModule } from '@bmc-ux/adapt-angular';
import { AdaptSelectModule } from '@bmc-ux/obsolete';
import { AdaptTableModule } from '@bmc-ux/adapt-table';
import { RxBooleanPipe, RxDefinitionAdapterRegistryService, RxDefinitionModule } from '@helix/platform/shared/api';
import { RuntimeViewCanvasModule } from '@helix/platform/view/runtime';
import { TranslateModule } from '@ngx-translate/core';
import { ActionButtonModule } from '../../action-button/runtime/action-button.module';
import { RecordGridCommonModule } from '../common/record-grid-common.module';
import { RxRecordGridAdvancedFilteringService } from '../common/services/record-grid-advanced-filtering.service';
import { RxRecordGridUtilsService } from '../common/services/record-grid-utils.service';
import { RX_RECORD_GRID } from '../record-grid.constant';
import { CardLayoutCellHeaderComponent } from './card-layout-cell-header/card-layout-cell-header.component';
import { RxFilterByCardSelectionDialogComponent } from './filter-by-card-selection-dialog/filter-by-card-selection-dialog.component';
import { GridCardLayoutDirective } from './record-grid-card-layout/record-grid-card-layout.directive';
import { RxRecordGridDefinitionAdapterService } from './record-grid-definition-adapter.service';
import { RecordGridComponent } from './record-grid.component';
import { RxRecordGridConfigUtilsService } from './services/record-grid-config-utils.service';
import { RxRecordGridConfiguratorService } from './services/record-grid-configurator.service';
import { RxRecordGridFilterConfigService } from './services/record-grid-filter-config.service';
import { RxRecordGridFilterService } from './services/record-grid-filter.service';
import { RxRecordGridQueryExpressionEvaluatorService } from './services/record-grid-query-expression-evaluator.service';
import { RxRecordGridSharedFilterPresetsCacheService } from './services/record-grid-shared-filter-presets-cache.service';
import { CellDisplayPropertiesDirective } from './cell-display-properties/cell-display-properties.directive';
import { RxAdvancedFilteringFieldsProviderModule } from '../common/components/advanced-filtering-fields-provider/advanced-filtering-fields-provider.module';
import * as i0 from "@angular/core";
import * as i1 from "./record-grid-definition-adapter.service";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@bmc-ux/adapt-table";
import * as i4 from "@bmc-ux/adapt-angular";
export class RecordGridModule {
    constructor(rxRecordGridDefinitionAdapterService, rxDefinitionAdapterRegistryService) {
        this.rxRecordGridDefinitionAdapterService = rxRecordGridDefinitionAdapterService;
        this.rxDefinitionAdapterRegistryService = rxDefinitionAdapterRegistryService;
        rxDefinitionAdapterRegistryService.registerRuntimeAdapter(RX_RECORD_GRID.type, this.rxRecordGridDefinitionAdapterService);
    }
}
RecordGridModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridModule, deps: [{ token: i1.RxRecordGridDefinitionAdapterService }, { token: i2.RxDefinitionAdapterRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
RecordGridModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridModule, declarations: [RecordGridComponent,
        GridCardLayoutDirective,
        CardLayoutCellHeaderComponent,
        RxFilterByCardSelectionDialogComponent,
        CellDisplayPropertiesDirective], imports: [RxDefinitionModule,
        CommonModule,
        RuntimeViewCanvasModule, i3.AdaptTableModule, AdaptSelectModule,
        FormsModule,
        AdaptRxCheckboxModule,
        AdaptRxSelectModule, i4.AdaptAlertModule, i4.AdaptPopoverModule, AdaptAccordionModule,
        AdaptButtonModule,
        AdaptDropdownModule,
        TranslateModule,
        ActionButtonModule,
        AdaptSubnavModule,
        AdaptAdvancedFilteringModule,
        RecordGridCommonModule,
        RouterModule,
        RxAdvancedFilteringFieldsProviderModule,
        AdaptRxSearchModule,
        AdaptEmptyStateModule], exports: [RecordGridComponent] });
RecordGridModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridModule, providers: [
        DatePipe,
        DecimalPipe,
        RxBooleanPipe,
        RxRecordGridConfiguratorService,
        RxRecordGridConfigUtilsService,
        RxRecordGridDefinitionAdapterService,
        RxRecordGridFilterService,
        RxRecordGridUtilsService,
        RxRecordGridFilterConfigService,
        RxRecordGridQueryExpressionEvaluatorService,
        RxRecordGridSharedFilterPresetsCacheService,
        RxRecordGridAdvancedFilteringService
    ], imports: [[
            RxDefinitionModule,
            CommonModule,
            RuntimeViewCanvasModule,
            AdaptTableModule.forRoot(),
            AdaptSelectModule,
            FormsModule,
            AdaptRxCheckboxModule,
            AdaptRxSelectModule,
            AdaptAlertModule.forRoot(),
            AdaptPopoverModule.forRoot(),
            AdaptAccordionModule,
            AdaptButtonModule,
            AdaptDropdownModule,
            TranslateModule,
            ActionButtonModule,
            AdaptSubnavModule,
            AdaptAdvancedFilteringModule,
            RecordGridCommonModule,
            RouterModule,
            RxAdvancedFilteringFieldsProviderModule,
            AdaptRxSearchModule,
            AdaptEmptyStateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        RxDefinitionModule,
                        CommonModule,
                        RuntimeViewCanvasModule,
                        AdaptTableModule.forRoot(),
                        AdaptSelectModule,
                        FormsModule,
                        AdaptRxCheckboxModule,
                        AdaptRxSelectModule,
                        AdaptAlertModule.forRoot(),
                        AdaptPopoverModule.forRoot(),
                        AdaptAccordionModule,
                        AdaptButtonModule,
                        AdaptDropdownModule,
                        TranslateModule,
                        ActionButtonModule,
                        AdaptSubnavModule,
                        AdaptAdvancedFilteringModule,
                        RecordGridCommonModule,
                        RouterModule,
                        RxAdvancedFilteringFieldsProviderModule,
                        AdaptRxSearchModule,
                        AdaptEmptyStateModule
                    ],
                    providers: [
                        DatePipe,
                        DecimalPipe,
                        RxBooleanPipe,
                        RxRecordGridConfiguratorService,
                        RxRecordGridConfigUtilsService,
                        RxRecordGridDefinitionAdapterService,
                        RxRecordGridFilterService,
                        RxRecordGridUtilsService,
                        RxRecordGridFilterConfigService,
                        RxRecordGridQueryExpressionEvaluatorService,
                        RxRecordGridSharedFilterPresetsCacheService,
                        RxRecordGridAdvancedFilteringService
                    ],
                    exports: [RecordGridComponent],
                    declarations: [
                        RecordGridComponent,
                        GridCardLayoutDirective,
                        CardLayoutCellHeaderComponent,
                        RxFilterByCardSelectionDialogComponent,
                        CellDisplayPropertiesDirective
                    ],
                    entryComponents: [RecordGridComponent]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxRecordGridDefinitionAdapterService }, { type: i2.RxDefinitionAdapterRegistryService }]; } });
//# sourceMappingURL=record-grid.module.js.map