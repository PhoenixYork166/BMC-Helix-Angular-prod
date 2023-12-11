import { Injector } from '@angular/core';
import { RxViewDesignerActionModel } from '@helix/platform/view/designer';
import { IViewActionDesignSandbox, ViewActionDesignEditableProperties } from '@helix/platform/view/api';
import { IOpenViewActionDesignProperties } from './open-view-action.types';
export declare class RxOpenViewActionDesignModel extends RxViewDesignerActionModel {
    readonly sandbox: IViewActionDesignSandbox<IOpenViewActionDesignProperties>;
    private rxViewDefinitionCacheService;
    private rxOpenViewModelHelperService;
    static getInitialProperties(initialProperties: ViewActionDesignEditableProperties<IOpenViewActionDesignProperties>): ViewActionDesignEditableProperties<IOpenViewActionDesignProperties>;
    constructor(injector: Injector, sandbox: IViewActionDesignSandbox<IOpenViewActionDesignProperties>);
    private getActionEditorConfig;
    private getViewInputParams;
    private getViewOutputParams;
}
