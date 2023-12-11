import { IDataDictionary, IExpressionConfigurator, RxExpressionConfigurator } from '@helix/platform/shared/api';
import { Observable } from 'rxjs';
import { IColumnEditorColumnData } from '../../record-grid-column-editor.types';
export declare class RecordGridCellDisplayPropertiesExpressionConfigurator extends RxExpressionConfigurator implements IExpressionConfigurator {
    commonDataDictionary$: Observable<IDataDictionary>;
    cellDisplayExpressionDataDictionary(columns: IColumnEditorColumnData[]): Observable<IDataDictionary>;
}
