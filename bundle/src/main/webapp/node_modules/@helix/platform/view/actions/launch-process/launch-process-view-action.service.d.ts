import { Observable } from 'rxjs';
import { RxProcessDefinitionCacheService, RxProcessInstanceService, RxProcessInstanceCommandsService } from '@helix/platform/process/api';
import { RxRecordDefinitionCacheService, RxRecordInstanceService } from '@helix/platform/record/api';
import { RxLogService, IPlainObject } from '@helix/platform/shared/api';
import { IViewActionService } from '@helix/platform/view/api';
import { RxJsonParserService } from '@helix/platform/utils';
import { ILaunchProcessViewActionParams } from './launch-process-view-action.types';
import * as i0 from "@angular/core";
export declare class RxLaunchProcessViewActionService implements IViewActionService<ILaunchProcessViewActionParams, IPlainObject> {
    private rxJsonParserService;
    private rxLogService;
    private rxProcessDefinitionCacheService;
    private rxRecordDefinitionCacheService;
    private rxProcessInstanceCommandsService;
    private rxProcessInstanceService;
    private rxRecordInstanceService;
    constructor(rxJsonParserService: RxJsonParserService, rxLogService: RxLogService, rxProcessDefinitionCacheService: RxProcessDefinitionCacheService, rxRecordDefinitionCacheService: RxRecordDefinitionCacheService, rxProcessInstanceCommandsService: RxProcessInstanceCommandsService, rxProcessInstanceService: RxProcessInstanceService, rxRecordInstanceService: RxRecordInstanceService);
    execute(params: ILaunchProcessViewActionParams): Observable<IPlainObject>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxLaunchProcessViewActionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxLaunchProcessViewActionService>;
}
