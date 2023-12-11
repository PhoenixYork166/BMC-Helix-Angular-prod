import { IViewActionService } from '@helix/platform/view/api';
import { Observable } from 'rxjs';
import { RxRecordInstanceUtilsService } from '@helix/platform/record/api';
import { RxGuidService, RxStringService } from '@helix/platform/utils';
import { RxOpenViewActionService } from '../open-view/open-view-action.service';
import { IAvcAssociateActionParams } from './avc-associate-action-params.interface';
import * as i0 from "@angular/core";
export declare class RxAvcAssociateActionService implements IViewActionService<IAvcAssociateActionParams, never> {
    private rxGuidService;
    private rxOpenViewActionService;
    private rxStringService;
    private rxRecordInstanceUtilsService;
    constructor(rxGuidService: RxGuidService, rxOpenViewActionService: RxOpenViewActionService, rxStringService: RxStringService, rxRecordInstanceUtilsService: RxRecordInstanceUtilsService);
    execute(params: IAvcAssociateActionParams): Observable<never>;
    private extractRecordInstance;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxAvcAssociateActionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxAvcAssociateActionService>;
}
