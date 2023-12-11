import { ComponentFactory, Injector, Type } from '@angular/core';
import { IExpressionConfigurator, IExpressionConfiguratorProvider, IPlainObject } from '@helix/platform/shared/api';
import { IExpressionEvaluator } from '../expressions/expression-evaluator.types';
import { IViewDefinitionPermission } from '../domain/view-definition-permission.interface';
export interface IViewComponentDescriptor {
    type: string;
    aliases?: string[];
    outlets?: {
        name: string;
    }[];
    componentFactory?: ComponentFactory<any>;
    properties?: IComponentPropertyDescriptor[];
    configPropertyName?: string;
    name?: string;
    index?: number;
    bundleId?: string;
    availableInBundles?: Array<string | RegExp>;
    designComponentFactory?: ComponentFactory<any>;
    designComponentModel?: IViewDesignerComponentModelConstructor;
    expressionConfigurator?: Type<IExpressionConfigurator>;
    group?: string;
    hidden?: boolean;
    icon?: string;
    isContainerComponent?: boolean;
    isDataComponent?: boolean;
    isPageComponent?: boolean;
    options?: IPlainObject;
    canBeInsertedInto?(componentTypes: string[]): boolean;
}
export interface IViewDesignerComponentModel<TProperties = IPlainObject, TDesignProperties = TProperties> extends IExpressionConfiguratorProvider {
    rxInit?(): void;
    getPropertiesByName?(props: TDesignProperties): TProperties;
}
export interface IViewDesignerComponentModelConstructor {
    new (injector: Injector, sandbox: any): IViewDesignerComponentModel;
    getInitialProperties?(initialProperties: IPlainObject): IPlainObject;
    getDefaultPermissions?(): IViewDefinitionPermission[];
}
export interface IComponentPropertyDescriptor {
    name: string;
    label?: string;
    type?: ViewComponentPropertyType;
    designType?: ViewComponentPropertyType;
    enableExpressionEvaluation?: boolean;
    evaluatorService?: IExpressionEvaluator;
    localizable?: boolean;
}
export declare enum ViewComponentPropertyType {
    Boolean = "boolean",
    String = "string",
    Number = "number",
    Array = "array",
    Object = "object"
}
