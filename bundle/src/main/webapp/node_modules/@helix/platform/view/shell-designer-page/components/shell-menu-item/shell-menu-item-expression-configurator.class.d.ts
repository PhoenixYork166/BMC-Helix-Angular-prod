import { Observable } from 'rxjs';
import { IDataDictionary, IExpressionConfiguratorDefaultPropertyConfig, RxExpressionConfigurator } from '@helix/platform/shared/api';
export declare class RxShellMenuItemExpressionConfigurator extends RxExpressionConfigurator {
    commonDataDictionary$: Observable<IDataDictionary>;
    getDefaultConfig(): IExpressionConfiguratorDefaultPropertyConfig;
}
