import { IPlainObject, RxCommandFactoryService } from '@helix/platform/shared/api';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class RxProcessInstanceCommandsService {
    private rxCommandFactoryService;
    private startProcessCommand;
    constructor(rxCommandFactoryService: RxCommandFactoryService);
    start(processDefinitionName: string, processInputValues: IPlainObject): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxProcessInstanceCommandsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxProcessInstanceCommandsService>;
}
