import { Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { IDataDictionary, RxServerActionExpressionConfigurator } from '@helix/platform/shared/api';
export declare class RxProcessActionExpressionConfigurator extends RxServerActionExpressionConfigurator {
    protected injector: Injector;
    constructor(injector: Injector);
    protected getDataDictionaryService(): any;
    getOutputMapDataDictionary(): Observable<IDataDictionary>;
}
