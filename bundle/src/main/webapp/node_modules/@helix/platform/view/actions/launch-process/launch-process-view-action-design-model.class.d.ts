import { RxViewDesignerActionModel } from '@helix/platform/view/designer';
import { Injector } from '@angular/core';
import { IViewActionDesignSandbox, ViewActionDesignEditableProperties } from '@helix/platform/view/api';
import { ILaunchProcessViewDesignProperties } from './launch-process-view-action.types';
export declare class RxLaunchProcessViewActionDesignModel extends RxViewDesignerActionModel {
    protected injector: Injector;
    readonly sandbox: IViewActionDesignSandbox<ILaunchProcessViewDesignProperties>;
    private rxProcessDefinitionCacheService;
    private rxRecordDefinitionCacheService;
    defaultProps: ViewActionDesignEditableProperties<ILaunchProcessViewDesignProperties>;
    static getInitialProperties(initialProperties: ViewActionDesignEditableProperties<ILaunchProcessViewDesignProperties>): ViewActionDesignEditableProperties<ILaunchProcessViewDesignProperties>;
    constructor(injector: Injector, sandbox: IViewActionDesignSandbox<ILaunchProcessViewDesignProperties>);
    private getActionEditorConfig;
    private getActionOutputDataDictionary;
}
