import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProcessInstance, IProcessInstanceLog } from './process-instance.interfaces';
import * as i0 from "@angular/core";
export declare class RxProcessInstanceService {
    private httpClient;
    constructor(httpClient: HttpClient);
    get(processDefinitionName: string, processInstanceId: string): Observable<IProcessInstance>;
    getLog(processDefinitionName: string, processInstanceId: string): Observable<IProcessInstanceLog>;
    downloadLog(processDefinitionName: string, processInstanceId: string): Observable<Blob>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxProcessInstanceService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxProcessInstanceService>;
}
