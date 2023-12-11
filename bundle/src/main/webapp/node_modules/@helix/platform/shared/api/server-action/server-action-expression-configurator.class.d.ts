import { Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { IExpressionConfiguratorDefaultPropertyConfig } from '../expression-configurator/expression-configurator.interfaces';
import { RxExpressionConfigurator } from '../expression-configurator/expression-configurator.class';
import { IDataDictionary } from '../data-dictionary/data-dictionary.types';
export declare abstract class RxServerActionExpressionConfigurator extends RxExpressionConfigurator {
    protected injector: Injector;
    commonDataDictionary$: Observable<IDataDictionary>;
    private dataDictionaryService;
    protected constructor(injector: Injector);
    protected abstract getDataDictionaryService(): any;
    getDefaultConfig(): IExpressionConfiguratorDefaultPropertyConfig;
    getInputMapDataDictionary(): Observable<IDataDictionary>;
    validateInputMapExpression(propertyPath: string, expression: string): Observable<boolean>;
}
