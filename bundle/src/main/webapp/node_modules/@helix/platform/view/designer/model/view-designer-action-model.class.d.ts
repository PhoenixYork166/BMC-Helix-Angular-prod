import { Injector } from '@angular/core';
import { RxViewActionExpressionConfigurator } from '../expression-configurator/view-action-expression-configurator.class';
import { IExpressionConfigurator } from '@helix/platform/shared/api';
import { IViewActionDesignModel, IViewActionDesignProperties, IViewActionDesignSandbox } from '@helix/platform/view/api';
import { IViewComponentDesignSetPayload } from '../public-interfaces';
export declare abstract class RxViewDesignerActionModel implements IViewActionDesignModel {
    protected injector: Injector;
    readonly sandbox: IViewActionDesignSandbox;
    readonly guid: string;
    protected expressionConfigurator: RxViewActionExpressionConfigurator;
    constructor(injector: Injector, sandbox: IViewActionDesignSandbox);
    getExpressionConfigurator(): IExpressionConfigurator;
    getPropertiesByName(): IViewActionDesignProperties;
    getChildren(): IViewComponentDesignSetPayload[];
    getOutputExpressionForPropertyPath(propertyPath: string): string;
}
