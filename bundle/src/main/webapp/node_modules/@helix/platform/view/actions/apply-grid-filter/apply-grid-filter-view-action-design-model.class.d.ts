import { RxViewDesignerActionModel } from '@helix/platform/view/designer';
import { Injector } from '@angular/core';
import { IViewActionDesignSandbox, ViewActionDesignEditableProperties } from '@helix/platform/view/api';
import { IApplyGridFilterViewActionDesignProperties } from './apply-grid-filter-view-action.types';
export declare class RxApplyGridFilterViewActionDesignModelClass extends RxViewDesignerActionModel {
    protected injector: Injector;
    readonly sandbox: IViewActionDesignSandbox<IApplyGridFilterViewActionDesignProperties>;
    private viewDesignerFacade;
    private rxRecordDefinitionCacheService;
    private rxRecordGridDesignUtilsService;
    private rxRecordGridFilterSelectHelperService;
    static getInitialProperties(initialProperties: ViewActionDesignEditableProperties<IApplyGridFilterViewActionDesignProperties>): ViewActionDesignEditableProperties<IApplyGridFilterViewActionDesignProperties>;
    constructor(injector: Injector, sandbox: IViewActionDesignSandbox<IApplyGridFilterViewActionDesignProperties>);
    getPropertiesByName(): IApplyGridFilterViewActionDesignProperties;
    private getActionEditorConfig;
    static extractGuidFromExpression(val: string): string;
}
