import { Injector } from '@angular/core';
import { RxProcessActionExpressionConfigurator } from '@helix/platform/process/elements';
declare const RxGetRecordProcessActionExpressionConfiguratorClass_base: {
    new (...args: any[]): {
        validateInputMapExpression(propertyName: string, expression: string): import("rxjs").Observable<boolean>;
    };
} & typeof RxProcessActionExpressionConfigurator;
export declare class RxGetRecordProcessActionExpressionConfiguratorClass extends RxGetRecordProcessActionExpressionConfiguratorClass_base {
    protected injector: Injector;
    constructor(injector: Injector);
}
export {};
