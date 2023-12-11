import { IViewActionService, RxViewActionUtilsService } from '@helix/platform/view/api';
import { RxAssociationDefinitionService, RxAssociationInstanceService } from '@helix/platform/association/api';
import { RxOpenViewActionService } from '../open-view/open-view-action.service';
import { RxLogService } from '@helix/platform/shared/api';
import { IAssociateViewActionParams } from './associate-view-action.interfaces';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class RxAssociateViewActionService implements IViewActionService<IAssociateViewActionParams> {
    private rxAssociationInstanceService;
    private rxOpenViewActionService;
    private rxAssociationDefinitionService;
    private rxLogService;
    private rxViewActionUtilsService;
    constructor(rxAssociationInstanceService: RxAssociationInstanceService, rxOpenViewActionService: RxOpenViewActionService, rxAssociationDefinitionService: RxAssociationDefinitionService, rxLogService: RxLogService, rxViewActionUtilsService: RxViewActionUtilsService);
    execute(params: IAssociateViewActionParams): Observable<string[]>;
    private getInstanceIds;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxAssociateViewActionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxAssociateViewActionService>;
}
