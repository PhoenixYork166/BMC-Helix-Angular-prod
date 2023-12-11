import { Injector } from '@angular/core';
import { IExpressionEvaluator, IViewActionExpressionConfigurator } from '@helix/platform/view/api';
import { RxViewExpressionConfigurator } from './view-expression-configurator.class';
export declare class RxViewActionExpressionConfigurator extends RxViewExpressionConfigurator implements IViewActionExpressionConfigurator {
    protected injector: Injector;
    protected actionType: string;
    protected actionGuid: string;
    private rxViewDataDictionaryService;
    private rxDefaultExpressionEvaluatorService;
    private rxViewActionRegistryService;
    commonDataDictionary$: import("rxjs").Observable<import("@helix/platform/shared/api").IDataDictionary>;
    constructor(injector: Injector, actionType: string, actionGuid: string);
    getExpressionEvaluator(propertyName: string): IExpressionEvaluator;
}
