import { IExpressionConfiguratorDefaultPropertyConfig, RxExpressionConfigurator } from '@helix/platform/shared/api';
import { Injector } from '@angular/core';
import { IExpressionEvaluator } from '@helix/platform/view/api';
export declare abstract class RxViewExpressionConfigurator extends RxExpressionConfigurator {
    protected injector: Injector;
    private rxExpressionHelperService;
    abstract getExpressionEvaluator(propertyName: string): IExpressionEvaluator;
    constructor(injector: Injector);
    getDefaultConfig(): IExpressionConfiguratorDefaultPropertyConfig;
}
