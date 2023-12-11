import { ValueAccessor } from '@helix/platform/shared/components';
import { ICellDisplayProperties } from '../../../../../common/types/cell-display-properties.types';
import { IColumnEditorColumnData } from '../../record-grid-column-editor.types';
import { RxModalService } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
export declare class RecordGridCellDisplayPropertiesComponent extends ValueAccessor<ICellDisplayProperties[]> {
    private rxModalService;
    columnName: string;
    columns: IColumnEditorColumnData[];
    constructor(rxModalService: RxModalService);
    openPropertiesEditor(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RecordGridCellDisplayPropertiesComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RecordGridCellDisplayPropertiesComponent, "rx-cell-display-properties", never, { "columnName": "columnName"; "columns": "columns"; }, {}, never, never>;
}
