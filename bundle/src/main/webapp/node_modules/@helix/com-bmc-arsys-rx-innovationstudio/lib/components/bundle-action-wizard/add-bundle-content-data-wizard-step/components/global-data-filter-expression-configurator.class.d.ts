import { Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { IDataDictionary, RxExpressionConfigurator } from '@helix/platform/shared/api';
export declare class GlobalDataFilterExpressionConfiguratorClass extends RxExpressionConfigurator {
    private injector;
    private translateService;
    constructor(injector: Injector);
    commonDataDictionary$: Observable<IDataDictionary>;
}
