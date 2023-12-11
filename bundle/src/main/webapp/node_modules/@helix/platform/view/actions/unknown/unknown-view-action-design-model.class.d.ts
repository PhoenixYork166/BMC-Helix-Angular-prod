import { Injector } from '@angular/core';
import { RxViewDesignerActionModel } from '@helix/platform/view/designer';
import { IViewActionDesignSandbox } from '@helix/platform/view/api';
export declare class RxUnknownViewActionDesignModel extends RxViewDesignerActionModel {
    protected injector: Injector;
    readonly sandbox: IViewActionDesignSandbox;
    constructor(injector: Injector, sandbox: IViewActionDesignSandbox);
    private getActionEditorConfig;
}
