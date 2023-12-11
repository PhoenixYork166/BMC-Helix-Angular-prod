import { IViewDesignerComponentModel } from '@helix/platform/view/api';
import { IExpressionConfigurator, IPlainObject } from '@helix/platform/shared/api';
import { Injector } from '@angular/core';
import { IViewComponentDesignSandbox } from '../public-interfaces/view-component-design-sandbox.interface';
export declare class ViewDesignerComponentModel<TComponentProperties = IPlainObject, TComponentDesignProperties = TComponentProperties> implements IViewDesignerComponentModel {
    protected injector: Injector;
    protected sandbox: IViewComponentDesignSandbox<TComponentDesignProperties>;
    private _expressionConfigurator;
    get expressionConfigurator(): IExpressionConfigurator;
    constructor(injector: Injector, sandbox: IViewComponentDesignSandbox<TComponentDesignProperties>);
    getExpressionForProperty(propertyPath: string): string;
}
