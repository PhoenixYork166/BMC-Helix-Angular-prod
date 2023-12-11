import { RxViewDesignerActionModel } from '@helix/platform/view/designer';
import { Injector } from '@angular/core';
import { IViewActionDesignSandbox, ViewActionDesignEditableProperties } from '@helix/platform/view/api';
import { IAssociateViewActionDesignProperties } from './associate-view-action.interfaces';
export declare class RxAssociateViewActionDesignModel extends RxViewDesignerActionModel {
    protected injector: Injector;
    readonly sandbox: IViewActionDesignSandbox<IAssociateViewActionDesignProperties>;
    private rxRecordDefinitionCacheService;
    private rxDefinitionNameService;
    private rxAssociationDefinitionService;
    static getInitialProperties(initialProperties: ViewActionDesignEditableProperties<IAssociateViewActionDesignProperties>): ViewActionDesignEditableProperties<IAssociateViewActionDesignProperties>;
    constructor(injector: Injector, sandbox: IViewActionDesignSandbox<IAssociateViewActionDesignProperties>);
    private getActionEditorConfig;
}
