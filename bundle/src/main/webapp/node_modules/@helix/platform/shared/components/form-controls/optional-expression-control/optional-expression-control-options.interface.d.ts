import { Observable } from 'rxjs';
import { IDataDictionary, IExpressionOperator } from '@helix/platform/shared/api';
export interface IOptionalExpressionControlOptions {
    label?: string;
    dataDictionary$: Observable<IDataDictionary>;
    operators: IExpressionOperator[];
    expressionEditorPropertyName?: string;
}
