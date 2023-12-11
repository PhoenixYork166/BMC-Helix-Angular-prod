import { Injector } from '@angular/core';
import { RxViewDesignerActionModel } from '@helix/platform/view/designer';
import { IViewActionDesignSandbox, ViewActionDesignEditableProperties } from '@helix/platform/view/api';
import { RxSetPropertyViewActionExpressionConfigurator } from './set-property-view-action-expression-configurator.class';
import { ISetPropertyViewActionDesignProperties } from './set-property-view-action.interfaces';
export declare class RxSetPropertyViewActionDesignModel extends RxViewDesignerActionModel {
    protected injector: Injector;
    readonly sandbox: IViewActionDesignSandbox<ISetPropertyViewActionDesignProperties>;
    protected expressionConfigurator: RxSetPropertyViewActionExpressionConfigurator;
    static getInitialProperties(initialProperties: ViewActionDesignEditableProperties<ISetPropertyViewActionDesignProperties>): ViewActionDesignEditableProperties<ISetPropertyViewActionDesignProperties>;
    constructor(injector: Injector, sandbox: IViewActionDesignSandbox<ISetPropertyViewActionDesignProperties>);
    private getActionEditorConfig;
}
