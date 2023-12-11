import { Observable } from 'rxjs';
import { IDataDictionary, IExpressionOperator } from '@helix/platform/shared/api';
import { RxDefinitionPickerType } from '../../definition-picker';
export interface IDefinitionPickerOrExpressionFormControlOptions {
    label?: string;
    definitionType: RxDefinitionPickerType;
    dataDictionary$: Observable<IDataDictionary>;
    operators: IExpressionOperator[];
}
