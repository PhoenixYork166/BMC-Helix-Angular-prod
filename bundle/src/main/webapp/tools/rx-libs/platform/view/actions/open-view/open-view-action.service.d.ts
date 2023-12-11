import { Router } from '@angular/router';
import { AdaptDockedPanelService, AdaptModalService } from '@bmc-ux/adapt-angular';
import { IPlainObject } from '@helix/platform/shared/api';
import { IViewActionService, RxViewActionUtilsService } from '@helix/platform/view/api';
import { RxRuntimeViewUtilsService } from '@helix/platform/view/runtime';
import { Observable } from 'rxjs';
import { IOpenViewActionParams } from './open-view-action.types';
import * as i0 from "@angular/core";
export declare class RxOpenViewActionService implements IViewActionService<IOpenViewActionParams, IPlainObject> {
    private adaptDockedPanelService;
    private adaptModalService;
    private router;
    private rxRuntimeViewUtilsService;
    private rxViewActionUtilsService;
    constructor(adaptDockedPanelService: AdaptDockedPanelService, adaptModalService: AdaptModalService, router: Router, rxRuntimeViewUtilsService: RxRuntimeViewUtilsService, rxViewActionUtilsService: RxViewActionUtilsService);
    execute(params: IOpenViewActionParams): Observable<IPlainObject>;
    private openFullWidth;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxOpenViewActionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxOpenViewActionService>;
}
