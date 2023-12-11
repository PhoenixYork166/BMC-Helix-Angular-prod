import { RxViewDesignerActionModel } from '@helix/platform/view/designer';
import { Injector } from '@angular/core';
import { IViewActionDesignSandbox, ViewActionDesignEditableProperties } from '@helix/platform/view/api';
import { ILaunchUrlViewActionParams } from './launch-url-view-action-params.interface';
export declare class RxLaunchUrlViewActionDesignModel extends RxViewDesignerActionModel {
    protected injector: Injector;
    readonly sandbox: IViewActionDesignSandbox<ILaunchUrlViewActionParams>;
    static getInitialProperties(initialProperties: ViewActionDesignEditableProperties<ILaunchUrlViewActionParams>): ViewActionDesignEditableProperties<ILaunchUrlViewActionParams>;
    constructor(injector: Injector, sandbox: IViewActionDesignSandbox<ILaunchUrlViewActionParams>);
    private getActionEditorConfig;
}
