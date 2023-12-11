import { Injector } from '@angular/core';
import { IViewActionDesignPropertyEditorConfig, IViewActionDesignProperties, IViewActionDesignSandbox, ViewActionDesignEditableProperties } from '@helix/platform/view/api';
import { RxViewDesignerActionModel } from './view-designer-action-model.class';
export declare class RxViewDesignerDefaultActionModel extends RxViewDesignerActionModel {
    protected injector: Injector;
    readonly sandbox: IViewActionDesignSandbox;
    defaultProps: ViewActionDesignEditableProperties<IViewActionDesignProperties>;
    constructor(injector: Injector, sandbox: IViewActionDesignSandbox);
    getActionEditorConfig(): IViewActionDesignPropertyEditorConfig;
}
