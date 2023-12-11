import { ValueAccessor } from '@helix/platform/shared/components';
import { IColumnEditorColumnData } from '../../record-grid-column-editor.types';
import { RxModalService } from '@helix/platform/ui-kit';
import { INamedFilterOptionDesignData } from './named-filter-options.types';
import * as i0 from "@angular/core";
export declare class RecordGridNamedFilterOptionsComponent extends ValueAccessor<INamedFilterOptionDesignData[]> {
    private rxModalService;
    column: IColumnEditorColumnData;
    tooltip: string;
    constructor(rxModalService: RxModalService);
    openNamedFilterOptions(activeIndex?: number): void;
    editNamedFilterOption(activeIndex: number): void;
    removeFilterOption(namedFilterOption: INamedFilterOptionDesignData): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RecordGridNamedFilterOptionsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RecordGridNamedFilterOptionsComponent, "rx-named-filter-options", never, { "column": "column"; "tooltip": "tooltip"; }, {}, never, never>;
}
