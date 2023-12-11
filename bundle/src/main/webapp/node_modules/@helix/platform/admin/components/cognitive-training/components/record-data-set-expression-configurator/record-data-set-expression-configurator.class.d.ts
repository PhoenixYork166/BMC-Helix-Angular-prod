import { Observable } from 'rxjs';
import { IDataDictionary, RxExpressionConfigurator } from '@helix/platform/shared/api';
export declare class RxRecordDataSetExpressionConfigurator extends RxExpressionConfigurator {
    commonDataDictionary$: Observable<IDataDictionary>;
}
