import { Injector, OnDestroy } from '@angular/core';
import { IViewActionDescriptor, IViewActionDesignProperties } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
export declare class RxActionListModelManagerService implements OnDestroy {
    private injector;
    private models;
    constructor(injector: Injector);
    create(descriptor: IViewActionDescriptor, guid: string, initialProps?: IViewActionDesignProperties): import("@helix/platform/view/api").IViewActionDesignModel<IViewActionDesignProperties>;
    remove(guid: string): void;
    get(guid: string): any;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxActionListModelManagerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxActionListModelManagerService>;
}
