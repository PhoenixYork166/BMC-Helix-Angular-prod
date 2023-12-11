import { AdaptModalService } from '@bmc-ux/adapt-angular';
import { RxProcessDefinitionCacheService } from '@helix/platform/process/api';
import { IViewActionService } from '@helix/platform/view/api';
import { Observable } from 'rxjs';
import { ILaunchProcessDesignerActionParams } from './launch-process-designer-action.types';
import * as i0 from "@angular/core";
export declare class RxLaunchProcessDesignerActionService implements IViewActionService<ILaunchProcessDesignerActionParams> {
    private adaptModalService;
    private rxProcessDefinitionCacheService;
    constructor(adaptModalService: AdaptModalService, rxProcessDefinitionCacheService: RxProcessDefinitionCacheService);
    execute(parameters: ILaunchProcessDesignerActionParams): Observable<any>;
    private openModal;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxLaunchProcessDesignerActionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxLaunchProcessDesignerActionService>;
}
