import { IDataDictionary, IExpressionOperator } from '@helix/platform/shared/api';
import { Observable } from 'rxjs';
export interface IListItem {
    label: string;
    propertyName: string;
    dataDictionary$?: Observable<IDataDictionary>;
    operators?: IExpressionOperator[];
}
