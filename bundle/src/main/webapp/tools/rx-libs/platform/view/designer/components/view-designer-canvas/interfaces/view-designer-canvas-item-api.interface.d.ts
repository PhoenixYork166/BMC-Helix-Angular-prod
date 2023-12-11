import { ComponentRef, ViewContainerRef } from '@angular/core';
export interface IViewDesignerCanvasItemApi {
    core: {
        registerOutlet(outletName: string, outletViewContainerRef: ViewContainerRef, containerComponent?: any): ComponentRef<any>;
    };
    registerCoreApi(apiObject: object): void;
}
