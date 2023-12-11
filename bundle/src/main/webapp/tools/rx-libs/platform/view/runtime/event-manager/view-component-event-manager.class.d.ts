import { ErrorHandler } from '@angular/core';
import { RxGlobalEventsService, RxLogService } from '@helix/platform/shared/api';
import { RxViewActionService } from '@helix/platform/view/api';
import { IViewComponentActionConfig } from './view-component-action-config.interface';
import * as i0 from "@angular/core";
export declare class ViewComponentEventManager {
    private rxGlobalEventsService;
    private rxLogService;
    private rxViewActionService;
    private errorHandler;
    constructor(rxGlobalEventsService: RxGlobalEventsService, rxLogService: RxLogService, rxViewActionService: RxViewActionService, errorHandler: ErrorHandler);
    executeActions(actions: IViewComponentActionConfig[], actionCallback: (action: IViewComponentActionConfig, result: any) => any): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ViewComponentEventManager, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ViewComponentEventManager>;
}
