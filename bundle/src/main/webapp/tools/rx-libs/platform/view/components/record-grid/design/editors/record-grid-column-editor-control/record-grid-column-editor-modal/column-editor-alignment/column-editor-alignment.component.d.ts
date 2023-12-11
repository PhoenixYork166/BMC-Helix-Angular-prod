import { IRecordGridDesignColumnData } from '../../record-grid-column-editor.types';
import { RecordGridColumnAlignment } from '../../../../../common/types/record-grid-column-alignment.enum';
import { IColumnEditorProperty } from '../types/column-editor-property.types';
import * as i0 from "@angular/core";
export declare class ColumnEditorAlignmentComponent {
    column: IRecordGridDesignColumnData;
    isReadOnly: boolean;
    columnProperty: IColumnEditorProperty;
    trackByForAlignmentOptions(index: number, alignment: RecordGridColumnAlignment): string | number;
    static ɵfac: i0.ɵɵFactoryDeclaration<ColumnEditorAlignmentComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ColumnEditorAlignmentComponent, "rx-column-editor-alignment", never, { "column": "column"; "isReadOnly": "isReadOnly"; "columnProperty": "columnProperty"; }, {}, never, never>;
}
