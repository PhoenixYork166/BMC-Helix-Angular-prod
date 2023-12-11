import { Injector } from '@angular/core';
import { RxViewDesignerActionModel } from '@helix/platform/view/designer';
import { IViewActionDesignSandbox, ViewActionDesignEditableProperties } from '@helix/platform/view/api';
import { IDisassociateViewActionDesignProperties } from './disassociate-view-action.interfaces';
export declare class RxDisassociateViewActionDesignModel extends RxViewDesignerActionModel {
    protected injector: Injector;
    readonly sandbox: IViewActionDesignSandbox<IDisassociateViewActionDesignProperties>;
    private rxRecordDefinitionCacheService;
    private rxDefinitionNameService;
    private rxAssociationDefinitionService;
    static getInitialProperties(initialProperties: ViewActionDesignEditableProperties<IDisassociateViewActionDesignProperties>): ViewActionDesignEditableProperties<IDisassociateViewActionDesignProperties>;
    constructor(injector: Injector, sandbox: IViewActionDesignSandbox<IDisassociateViewActionDesignProperties>);
    private getActionEditorConfig;
}
