import { RxUserPreferencesService } from '@helix/platform/shared/api';
import { RxObjectUtilsService } from '@helix/platform/utils';
import { Observable } from 'rxjs';
import { IAdaptTableConfig } from '../types/adapt-table-config.interface';
import { IRecordGridColumnWithMetadata } from '../types/record-grid-column.types';
import { IRxRecordGridSharedFilterPreset } from '../../common/types/record-grid-filter.types';
import { IRecordGridState } from '../types/record-grid-state.interface';
import { IRecordGridSharedViewPreset, IRecordGridUserPreferences } from '../types/record-grid-user-preferences.interface';
import { RxRecordGridConfigUtilsService } from './record-grid-config-utils.service';
import { RxRecordGridFilterService } from './record-grid-filter.service';
import { RxRecordGridFilterHelperService } from '../../common/services/record-grid-filter-helper.service';
import * as i0 from "@angular/core";
export declare class RxRecordGridUserPreferencesService {
    private recordGridConfigUtilsService;
    private rxUserPreferencesService;
    private rxRecordGridFilterService;
    private rxRecordGridFilterHelperService;
    private rxObjectUtilsService;
    private initialPreferences;
    private preferences;
    private selectedViewPresetGuid;
    constructor(recordGridConfigUtilsService: RxRecordGridConfigUtilsService, rxUserPreferencesService: RxUserPreferencesService, rxRecordGridFilterService: RxRecordGridFilterService, rxRecordGridFilterHelperService: RxRecordGridFilterHelperService, rxObjectUtilsService: RxObjectUtilsService);
    saveUserPreferences(guid: string, adaptTableConfig: IAdaptTableConfig, state: IRecordGridState): void;
    get(guid: string): Observable<IRecordGridUserPreferences>;
    getAppliedSharedFilterPresetGuid(): string;
    applyUserPreferencesForColumns(adaptTableConfig: IAdaptTableConfig, columnsWithMetadata: IRecordGridColumnWithMetadata[], gridGuid: string): void;
    private reviseColumnPreferences;
    applyUserPreferences(adaptTableConfig: IAdaptTableConfig, columnsWithMetadata: IRecordGridColumnWithMetadata[], state: IRecordGridState, sharedFilterPresets?: IRxRecordGridSharedFilterPreset[]): Observable<any>;
    applySharedViewPreset(gridState: IRecordGridState, adaptTableConfig: IAdaptTableConfig, viewPresetGuid: string, viewPresetData: IRecordGridSharedViewPreset): Observable<any>;
    applyViewPreset(gridState: IRecordGridState, adaptTableConfig: IAdaptTableConfig, viewPresetGuid: string): Observable<any>;
    private applyViewPresetInner;
    isCurrentViewPresetEdited(): boolean;
    private addExternalPresetToSelectedFilters;
    private createSystemViewPresetPreferences;
    deleteViewPreset(viewPresetGuid: string): void;
    isExistingViewPreset(viewPresetGuid: string): boolean;
    discardViewPresetChanges(viewPresetGuid: string): void;
    private updateGridSorting;
    private getAdvancedFilterPresets;
    private getColumnsPreferences;
    private getPreferencesFilterPresets;
    private getVisibleCardFieldIds;
    private updateColumnSortPreferences;
    private save;
    private sortColumnsConfigs;
    private updateColumnsOrder;
    private setColumnsVisibility;
    private updateColumnsVisibility;
    private setColumnsWidths;
    private setCardFieldsVisibility;
    private getColumnSortMeta;
    private getFiltersForSelectedColumns;
    private getFilterForAvailableNamedFilterOptions;
    saveViewPreset(viewPresetGuid: string): void;
    getSharedViewPresetData(): IRecordGridSharedViewPreset;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxRecordGridUserPreferencesService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxRecordGridUserPreferencesService>;
}