import { Injector } from '@angular/core';
import { IViewActionDesignSandbox, ViewActionDesignEditableProperties } from '@helix/platform/view/api';
import { RxViewDesignerActionModel } from '@helix/platform/view/designer';
import { ILaunchProcessDesignerViewActionDesignProperties } from './launch-process-designer-action.types';
export declare class LaunchProcessDesignerActionDesignModelClass extends RxViewDesignerActionModel {
    readonly sandbox: IViewActionDesignSandbox<ILaunchProcessDesignerViewActionDesignProperties>;
    private translateService;
    static getInitialProperties(initialProperties: ViewActionDesignEditableProperties<ILaunchProcessDesignerViewActionDesignProperties>): ViewActionDesignEditableProperties<ILaunchProcessDesignerViewActionDesignProperties>;
    constructor(injector: Injector, sandbox: IViewActionDesignSandbox<ILaunchProcessDesignerViewActionDesignProperties>);
    private getActionEditorConfig;
}
