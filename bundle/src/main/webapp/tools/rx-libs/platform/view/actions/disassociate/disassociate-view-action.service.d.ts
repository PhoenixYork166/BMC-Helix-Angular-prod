import { IViewActionService } from '@helix/platform/view/api';
import { RxLogService } from '@helix/platform/shared/api';
import { RxViewActionUtilsService } from '@helix/platform/view/api';
import { RxAssociationDefinitionService, RxAssociationInstanceService } from '@helix/platform/association/api';
import { IDisassociateViewActionParams } from './disassociate-view-action.interfaces';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class RxDisassociateViewActionService implements IViewActionService<IDisassociateViewActionParams, string[]> {
    private rxLogService;
    private rxViewActionUtilsService;
    private rxAssociationDefinitionService;
    private rxAssociationInstanceService;
    constructor(rxLogService: RxLogService, rxViewActionUtilsService: RxViewActionUtilsService, rxAssociationDefinitionService: RxAssociationDefinitionService, rxAssociationInstanceService: RxAssociationInstanceService);
    execute(params: IDisassociateViewActionParams): Observable<string[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxDisassociateViewActionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxDisassociateViewActionService>;
}
