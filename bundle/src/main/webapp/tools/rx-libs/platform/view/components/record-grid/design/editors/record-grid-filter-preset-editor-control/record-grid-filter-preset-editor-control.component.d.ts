import { ValueAccessor } from '@helix/platform/shared/components';
import { IFormControlComponent } from '@helix/platform/shared/api';
import { IRecordGridFilterPresetEditorControlOptions } from './record-grid-filter-preset-editor.types';
import { IRecordGridPredefinedFilterPreset } from '../../../runtime/types/record-grid-predefined-filter-preset.interface';
import { RxModalService } from '@helix/platform/ui-kit';
import { RxRecordGridFilterSelectHelperService } from '../record-grid-filter-select-control/record-grid-filter-select-helper.service';
import * as i0 from "@angular/core";
export declare class RecordGridFilterPresetEditorControlComponent extends ValueAccessor<IRecordGridPredefinedFilterPreset[]> implements IFormControlComponent {
    private rxModalService;
    private rxRecordGridFilterSelectHelperService;
    options: IRecordGridFilterPresetEditorControlOptions;
    filterPresets: IRecordGridPredefinedFilterPreset[];
    constructor(rxModalService: RxModalService, rxRecordGridFilterSelectHelperService: RxRecordGridFilterSelectHelperService);
    onWriteValue(filterPresets: IRecordGridPredefinedFilterPreset[]): void;
    removeFilterPreset(filterPresetToRemove: IRecordGridPredefinedFilterPreset): void;
    updateValue(filterPresets: IRecordGridPredefinedFilterPreset[]): void;
    openEditor(filterPreset?: IRecordGridPredefinedFilterPreset): void;
    trackByForFilterPresets(index: number, filterPreset: IRecordGridPredefinedFilterPreset): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<RecordGridFilterPresetEditorControlComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RecordGridFilterPresetEditorControlComponent, "rx-record-grid-filter-preset-editor", never, { "options": "options"; }, {}, never, never>;
}
